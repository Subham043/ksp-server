import {
  count,
  createCourt,
  getAll,
  getById,
  paginate,
  remove,
  updateCourt,
} from "./court.repository";
import { NotFoundError } from "../../utils/exceptions";
import {
  CourtCreateType,
  CourtType,
  CourtUpdateType,
} from "../../@types/court.type";
import { getPaginationKeys, getPaginationParams } from "../../utils/pagination";
import { PaginationType } from "../../@types/pagination.type";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";
import {
  ExcelBuffer,
  generateExcel,
  readExcel,
  storeExcel,
} from "../../utils/excel";
import {
  CourtExcelData,
  CourtExcelType,
  ExcelCourtsColumns,
  ExcelFailedCourtsColumns,
} from "./court.model";
import { PostExcelBody } from "../../common/schemas/excel.schema";
import {
  createCourtBodySchema,
  createCourtUniqueSchema,
} from "./schemas/create.schema";

/**
 * Create a new court with the provided court information.
 *
 * @param {CourtCreateType} court - the court information
 * @return {Promise<CourtType>} a promise that resolves with the created court data
 */
export async function create(data: CourtCreateType): Promise<CourtType> {
  return await createCourt({
    ...data,
  });
}

/**
 * Update CourtType information.
 *
 * @param {CreateCourtBody} CourtType - the CourtType information to be updated
 * @param {GetIdParam} param - the parameter used to identify the CourtType to be updated
 * @return {Promise<CourtType>} the updated CourtType information
 */
export async function update(
  data: CourtUpdateType,
  param: GetIdParam
): Promise<CourtType> {
  return await updateCourt({ ...data }, param.id);
}

/**
 * Find a court by ID.
 *
 * @param {GetIdParam} params - the parameters for finding the court
 * @return {Promise<CourtType>} the court found by ID
 */
export async function findById(params: GetIdParam): Promise<CourtType> {
  const { id } = params;

  const court = await getById(id);
  if (!court) {
    throw new NotFoundError();
  }
  return court;
}

/**
 * Find court by pagination.
 *
 * @param {GetPaginationQuery} querystring - the parameters for finding the court
 * @return {Promise<{court:CourtType[]} & PaginationType>} the court found by ID
 */
export async function list(querystring: GetPaginationQuery): Promise<
  {
    court: CourtType[];
  } & PaginationType
> {
  const { limit, offset } = getPaginationParams({
    page: querystring.page,
    size: querystring.limit,
  });
  const court = await paginate(limit, offset, querystring.search);
  const courtCount = await count(querystring.search);
  return {
    court,
    ...getPaginationKeys({
      count: courtCount,
      page: querystring.page,
      size: querystring.limit,
    }),
  };
}

/**
 * Export court by pagination.
 *
 * @param {GetSearchQuery} querystring - the parameters for finding the court
 * @return {Promise<{file: ExcelBuffer}>} the court found by ID
 */
export async function exportExcel(querystring: GetSearchQuery): Promise<{
  file: ExcelBuffer;
}> {
  const courts = await getAll(querystring.search);
  const data = courts.map((court) => {
    return {
      ...court,
      accused_name: court.accused?.name ?? null,
      crime_typeOfCrime: court.crime?.typeOfCrime ?? null,
      crime_sectionOfLaw: court.crime?.sectionOfLaw ?? null,
      crime_mobFileNo: court.crime?.mobFileNo,
      crime_hsNo: court.crime?.hsNo,
      crime_hsOpeningDate: court.crime?.hsOpeningDate,
      crime_hsClosingDate: court.crime?.hsClosingDate,
    };
  });

  const buffer = await generateExcel<CourtExcelType>(
    "Courts",
    ExcelCourtsColumns,
    data
  );

  return {
    file: buffer,
  };
}

/**
 * Destroys a court based on the provided parameters.
 *
 * @param {GetIdParam} params - the parameters for destroying the court
 * @return {Promise<CourtType>} the destroyed court
 */
export async function destroy(params: GetIdParam): Promise<CourtType> {
  const { id } = params;
  return await remove(id);
}

export async function importExcel(
  data: PostExcelBody,
  userId: number
): Promise<{
  successCount: number;
  errorCount: number;
  fileName: string | null;
}> {
  let successCount = 0;
  let errorCount = 0;
  const courtInsertData: CourtExcelData[] = [];
  const failedCourtsImport: (CourtExcelData & { error: string })[] = [];
  const worksheet = await readExcel(data.file);
  worksheet?.eachRow(function (row, rowNumber) {
    if (rowNumber > 1) {
      const courtData = {
        courtName: row.getCell(1).value?.toString() as string,
        ccScNo: row.getCell(2).value?.toString(),
        psName: row.getCell(3).value?.toString(),
        firNo: row.getCell(4).value?.toString(),
        lawyerName: row.getCell(5).value?.toString(),
        lawyerContact: row.getCell(6).value?.toString(),
        suretyProviderDetail: row.getCell(7).value?.toString(),
        suretyProviderContact: row.getCell(8).value?.toString(),
        stageOfCase: row.getCell(9).value?.toString(),
        additionalRemarks: row.getCell(10).value?.toString(),
        criminalId: isNaN(Number(row.getCell(11).value?.toString()))
          ? undefined
          : Number(row.getCell(11).value?.toString()),
        crimeId: isNaN(Number(row.getCell(12).value?.toString()))
          ? undefined
          : Number(row.getCell(12).value?.toString()),
      };
      courtInsertData.push(courtData);
    }
  });
  for (let i = 0; i < courtInsertData.length; i++) {
    try {
      await createCourtBodySchema.parseAsync(courtInsertData[i]);
      await createCourtUniqueSchema.parseAsync({
        crimeId: courtInsertData[i].crimeId,
        criminalId: courtInsertData[i].criminalId,
      });
      const validatedCourtData = {
        ...courtInsertData[i],
      };
      await createCourt(validatedCourtData);
      successCount = successCount + 1;
    } catch (error) {
      failedCourtsImport.push({
        ...courtInsertData[i],
        error: JSON.stringify(error),
      });
      errorCount = errorCount + 1;
    }
  }
  if (failedCourtsImport.length > 0 && errorCount > 0) {
    const fileName = await storeExcel<CourtExcelData & { error: string }>(
      "Failed Courts Import",
      ExcelFailedCourtsColumns,
      failedCourtsImport
    );
    return {
      successCount,
      errorCount,
      fileName,
    };
  }
  return {
    successCount,
    errorCount,
    fileName: null,
  };
}

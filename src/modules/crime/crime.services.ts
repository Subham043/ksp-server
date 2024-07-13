import {
  count,
  createCrime,
  getAll,
  getById,
  getByIdForPdf,
  paginate,
  remove,
  updateCrime,
} from "./crime.repository";
import { NotFoundError } from "../../utils/exceptions";
import {
  CrimeCreateType,
  CrimeExcelType,
  CrimeQueryType,
  CrimeUpdateType,
} from "../../@types/crime.type";
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
  CrimeExcelData,
  ExcelCrimesColumns,
  ExcelFailedCrimesColumns,
} from "./crime.model";
import { PostExcelBody } from "../../common/schemas/excel.schema";
import { createCrimeBodySchema } from "./schemas/create.schema";

/**
 * Create a new crime with the provided crime information.
 *
 * @param {CrimeCreateType} crime - the crime information
 * @return {Promise<CrimeType>} a promise that resolves with the created crime data
 */
export async function create(
  data: CrimeCreateType,
  userId: number
): Promise<CrimeQueryType | null> {
  return await createCrime({
    ...data,
    createdBy: userId,
  });
}

/**
 * Update CrimeType information.
 *
 * @param {CreateCrimeBody} CrimeType - the CrimeType information to be updated
 * @param {GetIdParam} param - the parameter used to identify the CrimeType to be updated
 * @return {Promise<CrimeType>} the updated CrimeType information
 */
export async function update(
  data: CrimeUpdateType,
  param: GetIdParam
): Promise<CrimeQueryType | null> {
  return await updateCrime({ ...data }, param.id);
}

/**
 * Find a crime by ID.
 *
 * @param {GetIdParam} params - the parameters for finding the crime
 * @return {Promise<CrimeType>} the crime found by ID
 */
export async function findById(params: GetIdParam): Promise<CrimeQueryType> {
  const { id } = params;

  const crime = await getById(id);
  if (!crime) {
    throw new NotFoundError();
  }
  return crime;
}

export async function findByIdForPdf(
  params: GetIdParam
): Promise<CrimeQueryType> {
  const { id } = params;

  const crime = await getByIdForPdf(id);
  if (!crime) {
    throw new NotFoundError();
  }
  return crime;
}

/**
 * Find crime by pagination.
 *
 * @param {GetPaginationQuery} querystring - the parameters for finding the crime
 * @return {Promise<{crime:CrimeQueryType[]} & PaginationType>} the crime found by ID
 */
export async function list(querystring: GetPaginationQuery): Promise<
  {
    crime: CrimeQueryType[];
  } & PaginationType
> {
  const { limit, offset } = getPaginationParams({
    page: querystring.page,
    size: querystring.limit,
  });
  const crime = await paginate(limit, offset, querystring.search);
  const crimeCount = await count(querystring.search);
  return {
    crime,
    ...getPaginationKeys({
      count: crimeCount,
      page: querystring.page,
      size: querystring.limit,
    }),
  };
}

/**
 * Export crime by pagination.
 *
 * @param {GetSearchQuery} querystring - the parameters for finding the crime
 * @return {Promise<{file: ExcelBuffer}>} the crime found by ID
 */
export async function exportExcel(querystring: GetSearchQuery): Promise<{
  file: ExcelBuffer;
}> {
  const crimes = await getAll(querystring.search);

  const buffer = await generateExcel<CrimeExcelType>(
    "Crimes",
    ExcelCrimesColumns,
    crimes
  );

  return {
    file: buffer,
  };
}

/**
 * Destroys a crime based on the provided parameters.
 *
 * @param {GetIdParam} params - the parameters for destroying the crime
 * @return {Promise<CrimeType>} the destroyed crime
 */
export async function destroy(
  params: GetIdParam
): Promise<CrimeQueryType | undefined> {
  const { id } = params;
  const crime = await findById(params);
  await remove(id);
  return crime;
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
  const crimeInsertData: CrimeExcelData[] = [];
  const failedCrimesImport: (CrimeExcelData & { error: string })[] = [];
  const worksheet = await readExcel(data.file);
  worksheet?.eachRow(function (row, rowNumber) {
    if (rowNumber > 1) {
      const crimeData = {
        typeOfCrime: row.getCell(1).value?.toString() || "",
        sectionOfLaw: row.getCell(2).value?.toString() || "",
        mobFileNo: row.getCell(3).value?.toString(),
        hsNo: row.getCell(4).value?.toString(),
        dateOfCrime: (row.getCell(5).value as Date | undefined)?.toISOString(),
        hsOpeningDate: (
          row.getCell(6).value as Date | undefined
        )?.toISOString(),
        hsClosingDate: (
          row.getCell(7).value as Date | undefined
        )?.toISOString(),
        policeStation: row.getCell(8).value?.toString(),
        firNo: row.getCell(9).value?.toString(),
        crimeGroup: row.getCell(10).value?.toString(),
        crimeHead: row.getCell(11).value?.toString(),
        crimeClass: row.getCell(12).value?.toString(),
        briefFact: row.getCell(13).value?.toString(),
        gang: row.getCell(14).value?.toString() as "Yes" | "No",
        gangStrength: row.getCell(15).value?.toString(),
      };
      crimeInsertData.push(crimeData);
    }
  });
  for (let i = 0; i < crimeInsertData.length; i++) {
    try {
      await createCrimeBodySchema.parseAsync(crimeInsertData[i]);
      const validatedCrimeData = {
        ...crimeInsertData[i],
        typeOfCrime: crimeInsertData[i].typeOfCrime || "",
        sectionOfLaw: crimeInsertData[i].sectionOfLaw || "",
        dateOfCrime: new Date(crimeInsertData[i].dateOfCrime || ""),
        hsOpeningDate: new Date(crimeInsertData[i].hsOpeningDate || ""),
        hsClosingDate: new Date(crimeInsertData[i].hsClosingDate || ""),
        createdBy: userId,
      };
      await createCrime(validatedCrimeData);
      successCount = successCount + 1;
    } catch (error) {
      failedCrimesImport.push({
        ...crimeInsertData[i],
        error: JSON.stringify(error),
      });
      errorCount = errorCount + 1;
    }
  }
  if (failedCrimesImport.length > 0 && errorCount > 0) {
    const fileName = await storeExcel<CrimeExcelData & { error: string }>(
      "Failed Crimes Import",
      ExcelFailedCrimesColumns,
      failedCrimesImport
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

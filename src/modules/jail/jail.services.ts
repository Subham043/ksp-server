import {
  count,
  createJail,
  getAll,
  getById,
  paginate,
  remove,
  updateJail,
} from "./jail.repository";
import { NotFoundError } from "../../utils/exceptions";
import {
  JailCreateType,
  JailType,
  JailUpdateType,
} from "../../@types/jail.type";
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
  ExcelFailedJailsColumns,
  ExcelJailsColumns,
  JailExcelData,
  JailExportType,
} from "./jail.model";
import { PostExcelBody } from "../../common/schemas/excel.schema";
import {
  createJailBodySchema,
  createJailUniqueSchema,
} from "./schemas/create.schema";

/**
 * Create a new jail with the provided jail information.
 *
 * @param {JailCreateType} jail - the jail information
 * @return {Promise<JailType>} a promise that resolves with the created jail data
 */
export async function create(data: JailCreateType): Promise<JailType> {
  return await createJail({
    ...data,
  });
}

/**
 * Update JailType information.
 *
 * @param {CreateJailBody} JailType - the JailType information to be updated
 * @param {GetIdParam} param - the parameter used to identify the JailType to be updated
 * @return {Promise<JailType>} the updated JailType information
 */
export async function update(
  data: JailUpdateType,
  param: GetIdParam
): Promise<JailType> {
  return await updateJail({ ...data }, param.id);
}

/**
 * Find a jail by ID.
 *
 * @param {GetIdParam} params - the parameters for finding the jail
 * @return {Promise<JailType>} the jail found by ID
 */
export async function findById(params: GetIdParam): Promise<JailType> {
  const { id } = params;

  const jail = await getById(id);
  if (!jail) {
    throw new NotFoundError();
  }
  return jail;
}

/**
 * Find jail by pagination.
 *
 * @param {GetPaginationQuery} querystring - the parameters for finding the jail
 * @return {Promise<{jail:JailType[]} & PaginationType>} the jail found by ID
 */
export async function list(querystring: GetPaginationQuery): Promise<
  {
    jail: JailType[];
  } & PaginationType
> {
  const { limit, offset } = getPaginationParams({
    page: querystring.page,
    size: querystring.limit,
  });
  const jail = await paginate(limit, offset, querystring.search);
  const jailCount = await count(querystring.search);
  return {
    jail,
    ...getPaginationKeys({
      count: jailCount,
      page: querystring.page,
      size: querystring.limit,
    }),
  };
}

/**
 * Export jail by pagination.
 *
 * @param {GetSearchQuery} querystring - the parameters for finding the jail
 * @return {Promise<{file: ExcelBuffer}>} the jail found by ID
 */
export async function exportExcel(querystring: GetSearchQuery): Promise<{
  file: ExcelBuffer;
}> {
  const jails = await getAll(querystring.search);
  const data = jails.map((jail) => {
    return {
      ...jail,
      accused_name: jail.accused?.name ?? null,
      crime_typeOfCrime: jail.crime?.typeOfCrime ?? null,
      crime_sectionOfLaw: jail.crime?.sectionOfLaw ?? null,
      crime_mobFileNo: jail.crime?.mobFileNo,
      crime_hsNo: jail.crime?.hsNo,
      crime_hsOpeningDate: jail.crime?.hsOpeningDate,
      crime_hsClosingDate: jail.crime?.hsClosingDate,
    };
  });

  const buffer = await generateExcel<JailExportType>(
    "Jails",
    ExcelJailsColumns,
    data
  );

  return {
    file: buffer,
  };
}

/**
 * Destroys a jail based on the provided parameters.
 *
 * @param {GetIdParam} params - the parameters for destroying the jail
 * @return {Promise<JailType>} the destroyed jail
 */
export async function destroy(params: GetIdParam): Promise<JailType> {
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
  const jailInsertData: JailExcelData[] = [];
  const failedJailsImport: (JailExcelData & { error: string })[] = [];
  const worksheet = await readExcel(data.file);
  worksheet?.eachRow(function (row, rowNumber) {
    if (rowNumber > 1) {
      const jailData = {
        lawSection: row.getCell(1).value?.toString(),
        policeStation: row.getCell(2).value?.toString(),
        jailName: row.getCell(3).value?.toString(),
        jailId: row.getCell(4).value?.toString(),
        prisonerId: row.getCell(5).value?.toString(),
        prisonerType: row.getCell(6).value?.toString(),
        ward: row.getCell(7).value?.toString(),
        barrack: row.getCell(8).value?.toString(),
        registerNo: row.getCell(9).value?.toString(),
        periodUndergone: row.getCell(10).value?.toString(),
        firstAdmissionDate: (
          row.getCell(11).value as Date | undefined
        )?.toISOString(),
        jailEntryDate: (
          row.getCell(12).value as Date | undefined
        )?.toISOString(),
        jailReleaseDate: (
          row.getCell(13).value as Date | undefined
        )?.toISOString(),
        utpNo: row.getCell(14).value?.toString(),
        additionalRemarks: row.getCell(15).value?.toString(),
        criminalId: isNaN(Number(row.getCell(16).value?.toString()))
          ? undefined
          : Number(row.getCell(16).value?.toString()),
        crimeId: isNaN(Number(row.getCell(17).value?.toString()))
          ? undefined
          : Number(row.getCell(17).value?.toString()),
      };
      jailInsertData.push(jailData);
    }
  });
  for (let i = 0; i < jailInsertData.length; i++) {
    try {
      await createJailBodySchema.parseAsync(jailInsertData[i]);
      await createJailUniqueSchema.parseAsync({
        crimeId: jailInsertData[i].crimeId,
        criminalId: jailInsertData[i].criminalId,
      });
      const validatedJailData = {
        ...jailInsertData[i],
        firstAdmissionDate: new Date(
          jailInsertData[i].firstAdmissionDate || ""
        ),
        jailEntryDate: new Date(jailInsertData[i].jailEntryDate || ""),
        jailReleaseDate: new Date(jailInsertData[i].jailReleaseDate || ""),
      };
      await createJail(validatedJailData);
      successCount = successCount + 1;
    } catch (error) {
      failedJailsImport.push({
        ...jailInsertData[i],
        error: JSON.stringify(error),
      });
      errorCount = errorCount + 1;
    }
  }
  if (failedJailsImport.length > 0 && errorCount > 0) {
    const fileName = await storeExcel<JailExcelData & { error: string }>(
      "Failed Jails Import",
      ExcelFailedJailsColumns,
      failedJailsImport
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

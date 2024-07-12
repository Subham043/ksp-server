import {
  count,
  createHearing,
  getAll,
  getById,
  paginate,
  remove,
  updateHearing,
} from "./hearing.repository";
import { NotFoundError } from "../../utils/exceptions";
import {
  HearingCreateType,
  HearingType,
  HearingUpdateType,
} from "../../@types/hearing.type";
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
  ExcelFailedHearingsColumns,
  ExcelHearingsColumns,
  HearingExcelData,
  HearingExportType,
} from "./hearing.model";
import { PostExcelBody } from "../../common/schemas/excel.schema";
import {
  courtExistSchema,
  createHearingBodySchema,
} from "./schemas/create.schema";

/**
 * Create a new hearing with the provided hearing information.
 *
 * @param {HearingCreateType} hearing - the hearing information
 * @return {Promise<HearingType>} a promise that resolves with the created hearing data
 */
export async function create(
  data: HearingCreateType,
  courtId: number
): Promise<HearingType> {
  return await createHearing(
    {
      ...data,
    },
    courtId
  );
}

/**
 * Update HearingType information.
 *
 * @param {CreateHearingBody} HearingType - the HearingType information to be updated
 * @param {GetIdParam} param - the parameter used to identify the HearingType to be updated
 * @return {Promise<HearingType>} the updated HearingType information
 */
export async function update(
  data: HearingUpdateType,
  param: GetIdParam
): Promise<HearingType> {
  return await updateHearing({ ...data }, param.id);
}

/**
 * Find a hearing by ID.
 *
 * @param {GetIdParam} params - the parameters for finding the hearing
 * @return {Promise<HearingType>} the hearing found by ID
 */
export async function findById(params: GetIdParam): Promise<HearingType> {
  const { id } = params;

  const hearing = await getById(id);
  if (!hearing) {
    throw new NotFoundError();
  }
  return hearing;
}

/**
 * Find hearing by pagination.
 *
 * @param {GetPaginationQuery} querystring - the parameters for finding the hearing
 * @return {Promise<{hearing:HearingType[]} & PaginationType>} the hearing found by ID
 */
export async function list(
  querystring: GetPaginationQuery,
  courtId: number
): Promise<
  {
    hearing: HearingType[];
  } & PaginationType
> {
  const { limit, offset } = getPaginationParams({
    page: querystring.page,
    size: querystring.limit,
  });
  const hearing = await paginate(courtId, limit, offset, querystring.search);
  const hearingCount = await count(courtId, querystring.search);
  return {
    hearing,
    ...getPaginationKeys({
      count: hearingCount,
      page: querystring.page,
      size: querystring.limit,
    }),
  };
}

/**
 * Export hearing by pagination.
 *
 * @param {GetSearchQuery} querystring - the parameters for finding the hearing
 * @return {Promise<{file: ExcelBuffer}>} the hearing found by ID
 */
export async function exportExcel(
  querystring: GetSearchQuery,
  courtId: number
): Promise<{
  file: ExcelBuffer;
}> {
  const hearings = await getAll(courtId, querystring.search);
  const data = hearings.map((hearing) => {
    return {
      ...hearing,
    };
  });

  const buffer = await generateExcel<HearingExportType>(
    "Hearings",
    ExcelHearingsColumns,
    data
  );

  return {
    file: buffer,
  };
}

/**
 * Destroys a hearing based on the provided parameters.
 *
 * @param {GetIdParam} params - the parameters for destroying the hearing
 * @return {Promise<HearingType>} the destroyed hearing
 */
export async function destroy(params: GetIdParam): Promise<HearingType> {
  const { id } = params;
  return await remove(id);
}

export async function importExcel(
  data: PostExcelBody,
  courtId: number
): Promise<{
  successCount: number;
  errorCount: number;
  fileName: string | null;
}> {
  let successCount = 0;
  let errorCount = 0;
  const hearingInsertData: HearingExcelData[] = [];
  const failedHearingsImport: (HearingExcelData & { error: string })[] = [];
  const worksheet = await readExcel(data.file);
  worksheet?.eachRow(function (row, rowNumber) {
    if (rowNumber > 1) {
      const jailData = {
        hearingDate: row.getCell(1).value?.toString(),
        nextHearingDate: row.getCell(2).value?.toString(),
        attendance: row.getCell(3).value?.toString(),
        judgeName: row.getCell(4).value?.toString(),
        actionCodejudgeName: row.getCell(5).value?.toString(),
        additionalRemarks: row.getCell(6).value?.toString(),
        courtId: courtId,
      };
      hearingInsertData.push(jailData);
    }
  });
  for (let i = 0; i < hearingInsertData.length; i++) {
    try {
      await createHearingBodySchema.parseAsync(hearingInsertData[i]);
      await courtExistSchema.parseAsync({
        courtId: hearingInsertData[i].courtId,
      });
      const validatedHearingData = {
        ...hearingInsertData[i],
        hearingDate: new Date(hearingInsertData[i].hearingDate || ""),
        nextHearingDate: new Date(hearingInsertData[i].nextHearingDate || ""),
      };
      await createHearing(validatedHearingData, courtId);
      successCount = successCount + 1;
    } catch (error) {
      failedHearingsImport.push({
        ...hearingInsertData[i],
        error: JSON.stringify(error),
      });
      errorCount = errorCount + 1;
    }
  }
  if (failedHearingsImport.length > 0 && errorCount > 0) {
    const fileName = await storeExcel<HearingExcelData & { error: string }>(
      "Failed Hearings Import",
      ExcelFailedHearingsColumns,
      failedHearingsImport
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

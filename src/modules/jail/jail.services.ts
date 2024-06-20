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
import { ExcelBuffer, generateExcel } from "../../utils/excel";
import { ExcelJailsColumns, JailExportType } from "./jail.model";

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

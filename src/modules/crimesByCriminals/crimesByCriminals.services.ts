import {
  count,
  createCrimesByCriminals,
  getAll,
  getById,
  paginate,
  remove,
  updateCrimesByCriminals,
} from "./crimesByCriminals.repository";
import { NotFoundError } from "../../utils/exceptions";
import {
  CrimesByCriminalsCreateType,
  CrimesByCriminalsExcelType,
  CrimesByCriminalsQueryType,
  CrimesByCriminalsUpdateType,
} from "../../@types/crimesByCriminals.type";
import { getPaginationKeys, getPaginationParams } from "../../utils/pagination";
import { PaginationType } from "../../@types/pagination.type";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";
import { ExcelBuffer, generateExcel } from "../../utils/excel";
import { ExcelCrimesByCriminalsColumns } from "./crimesByCriminals.model";

/**
 * Create a new crimesByCriminals with the provided crimesByCriminals information.
 *
 * @param {CrimesByCriminalsCreateType} crimesByCriminals - the crimesByCriminals information
 * @return {Promise<CrimesByCriminalsType>} a promise that resolves with the created crimesByCriminals data
 */
export async function create(
  data: CrimesByCriminalsCreateType,
  crimeId: number
): Promise<CrimesByCriminalsQueryType | null> {
  return await createCrimesByCriminals(
    {
      ...data,
    },
    crimeId
  );
}

/**
 * Update CrimesByCriminalsType information.
 *
 * @param {CreateCrimesByCriminalsBody} CrimesByCriminalsType - the CrimesByCriminalsType information to be updated
 * @param {GetIdParam} param - the parameter used to identify the CrimesByCriminalsType to be updated
 * @return {Promise<CrimesByCriminalsType>} the updated CrimesByCriminalsType information
 */
export async function update(
  data: CrimesByCriminalsUpdateType,
  param: GetIdParam
): Promise<CrimesByCriminalsQueryType | null> {
  return await updateCrimesByCriminals({ ...data }, param.id);
}

/**
 * Find a crimesByCriminals by ID.
 *
 * @param {GetIdParam} params - the parameters for finding the crimesByCriminals
 * @return {Promise<CrimesByCriminalsType>} the crimesByCriminals found by ID
 */
export async function findById(
  params: GetIdParam
): Promise<CrimesByCriminalsQueryType> {
  const { id } = params;

  const crimesByCriminals = await getById(id);
  if (!crimesByCriminals) {
    throw new NotFoundError();
  }
  return crimesByCriminals;
}

/**
 * Find crimesByCriminals by pagination.
 *
 * @param {GetPaginationQuery} querystring - the parameters for finding the crimesByCriminals
 * @return {Promise<{crimesByCriminals:CrimesByCriminalsQueryType[]} & PaginationType>} the crimesByCriminals found by ID
 */
export async function list(
  querystring: GetPaginationQuery,
  crimeId: number
): Promise<
  {
    crimesByCriminals: CrimesByCriminalsQueryType[];
  } & PaginationType
> {
  const { limit, offset } = getPaginationParams({
    page: querystring.page,
    size: querystring.limit,
  });
  const crimesByCriminals = await paginate(
    crimeId,
    limit,
    offset,
    querystring.search
  );
  const crimesByCriminalsCount = await count(crimeId, querystring.search);
  return {
    crimesByCriminals,
    ...getPaginationKeys({
      count: crimesByCriminalsCount,
      page: querystring.page,
      size: querystring.limit,
    }),
  };
}

/**
 * Export crimesByCriminals by pagination.
 *
 * @param {GetSearchQuery} querystring - the parameters for finding the crimesByCriminals
 * @return {Promise<{file: ExcelBuffer}>} the crimesByCriminals found by ID
 */
export async function exportExcel(
  querystring: GetSearchQuery,
  crimeId: number
): Promise<{
  file: ExcelBuffer;
}> {
  const crimesByCriminals = await getAll(crimeId, querystring.search);

  const buffer = await generateExcel<CrimesByCriminalsExcelType>(
    "CrimesByCriminals",
    ExcelCrimesByCriminalsColumns,
    crimesByCriminals
  );

  return {
    file: buffer,
  };
}

/**
 * Destroys a crimesByCriminals based on the provided parameters.
 *
 * @param {GetIdParam} params - the parameters for destroying the crimesByCriminals
 * @return {Promise<CrimesByCriminalsType>} the destroyed crimesByCriminals
 */
export async function destroy(
  params: GetIdParam
): Promise<CrimesByCriminalsQueryType | undefined> {
  const { id } = params;
  const crimesByCriminals = await findById(params);
  await remove(id);
  return crimesByCriminals;
}

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
import { ExcelBuffer, generateExcel } from "../../utils/excel";
import { ExcelCrimesColumns } from "./crime.model";

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

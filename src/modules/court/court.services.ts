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
import { ExcelBuffer, generateExcel } from "../../utils/excel";
import { CourtExcelType, ExcelCourtsColumns } from "./court.model";

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

import {
  count,
  createVisitor,
  getAll,
  getById,
  paginate,
  remove,
  updateVisitor,
} from "./visitor.repository";
import { NotFoundError } from "../../utils/exceptions";
import {
  VisitorCreateType,
  VisitorType,
  VisitorUpdateType,
} from "../../@types/visitor.type";
import { getPaginationKeys, getPaginationParams } from "../../utils/pagination";
import { PaginationType } from "../../@types/pagination.type";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";
import { ExcelBuffer, generateExcel } from "../../utils/excel";
import { ExcelVisitorsColumns, VisitorExportType } from "./visitor.model";

/**
 * Create a new visitor with the provided visitor information.
 *
 * @param {VisitorCreateType} visitor - the visitor information
 * @return {Promise<VisitorType>} a promise that resolves with the created visitor data
 */
export async function create(
  data: VisitorCreateType,
  jailId: number
): Promise<VisitorType> {
  return await createVisitor(
    {
      ...data,
    },
    jailId
  );
}

/**
 * Update VisitorType information.
 *
 * @param {CreateVisitorBody} VisitorType - the VisitorType information to be updated
 * @param {GetIdParam} param - the parameter used to identify the VisitorType to be updated
 * @return {Promise<VisitorType>} the updated VisitorType information
 */
export async function update(
  data: VisitorUpdateType,
  param: GetIdParam
): Promise<VisitorType> {
  return await updateVisitor({ ...data }, param.id);
}

/**
 * Find a visitor by ID.
 *
 * @param {GetIdParam} params - the parameters for finding the visitor
 * @return {Promise<VisitorType>} the visitor found by ID
 */
export async function findById(params: GetIdParam): Promise<VisitorType> {
  const { id } = params;

  const visitor = await getById(id);
  if (!visitor) {
    throw new NotFoundError();
  }
  return visitor;
}

/**
 * Find visitor by pagination.
 *
 * @param {GetPaginationQuery} querystring - the parameters for finding the visitor
 * @return {Promise<{visitor:VisitorType[]} & PaginationType>} the visitor found by ID
 */
export async function list(
  querystring: GetPaginationQuery,
  jailId: number
): Promise<
  {
    visitor: VisitorType[];
  } & PaginationType
> {
  const { limit, offset } = getPaginationParams({
    page: querystring.page,
    size: querystring.limit,
  });
  const visitor = await paginate(jailId, limit, offset, querystring.search);
  const visitorCount = await count(jailId, querystring.search);
  return {
    visitor,
    ...getPaginationKeys({
      count: visitorCount,
      page: querystring.page,
      size: querystring.limit,
    }),
  };
}

/**
 * Export visitor by pagination.
 *
 * @param {GetSearchQuery} querystring - the parameters for finding the visitor
 * @return {Promise<{file: ExcelBuffer}>} the visitor found by ID
 */
export async function exportExcel(
  querystring: GetSearchQuery,
  jailId: number
): Promise<{
  file: ExcelBuffer;
}> {
  const visitors = await getAll(jailId, querystring.search);
  const data = visitors.map((visitor) => {
    return {
      ...visitor,
    };
  });

  const buffer = await generateExcel<VisitorExportType>(
    "Visitors",
    ExcelVisitorsColumns,
    data
  );

  return {
    file: buffer,
  };
}

/**
 * Destroys a visitor based on the provided parameters.
 *
 * @param {GetIdParam} params - the parameters for destroying the visitor
 * @return {Promise<VisitorType>} the destroyed visitor
 */
export async function destroy(params: GetIdParam): Promise<VisitorType> {
  const { id } = params;
  return await remove(id);
}

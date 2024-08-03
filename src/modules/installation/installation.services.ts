import {
  count,
  createInstallation,
  getAll,
  getById,
  paginate,
  remove,
} from "./installation.repository";
import { NotFoundError } from "../../utils/exceptions";
import { CreateInstallationBody } from "./schemas/create.schema";
import { InstallationType } from "../../@types/installation.type";
import { getPaginationKeys, getPaginationParams } from "../../utils/pagination";
import { PaginationType } from "../../@types/pagination.type";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";
import { ExcelBuffer, generateExcel } from "../../utils/excel";
import { ExcelInstallationsColumn } from "./installation.model";

/**
 * Create a new installation with the provided installation information.
 *
 * @param {CreateInstallationBody} installation - the installation information
 * @return {Promise<InstallationType>} a promise that resolves with the created installation data
 */
export async function create(
  installation: CreateInstallationBody
): Promise<InstallationType> {
  return await createInstallation(installation);
}

/**
 * Find a installation by ID.
 *
 * @param {GetIdParam} params - the parameters for finding the installation
 * @return {Promise<Installation>} the installation found by ID
 */
export async function findById(params: GetIdParam): Promise<InstallationType> {
  const { id } = params;

  const installation = await getById(id);
  if (!installation) {
    throw new NotFoundError();
  }
  return installation;
}

/**
 * Find installations by pagination.
 *
 * @param {GetPaginationQuery} querystring - the parameters for finding the installation
 * @return {Promise<{installation:InstallationType[]} & PaginationType>} the installation found by ID
 */
export async function list(querystring: GetPaginationQuery): Promise<
  {
    installation: InstallationType[];
  } & PaginationType
> {
  const { limit, offset } = getPaginationParams({
    page: querystring.page,
    size: querystring.limit,
  });
  const installation = await paginate(limit, offset, querystring.search);
  const installationCount = await count(querystring.search);
  return {
    installation,
    ...getPaginationKeys({
      count: installationCount,
      page: querystring.page,
      size: querystring.limit,
    }),
  };
}

/**
 * Export installations by pagination.
 *
 * @param {GetSearchQuery} querystring - the parameters for finding the installation
 * @return {Promise<{file: ExcelBuffer}>} the installation found by ID
 */
export async function exportExcel(querystring: GetSearchQuery): Promise<{
  file: ExcelBuffer;
}> {
  const installations = await getAll(querystring.search);

  const buffer = await generateExcel<InstallationType>(
    "Installations",
    ExcelInstallationsColumn,
    installations
  );

  return {
    file: buffer,
  };
}

/**
 * Destroys a installation based on the provided parameters.
 *
 * @param {GetIdParam} params - the parameters for destroying the installation
 * @return {Promise<Installation>} the destroyed installation
 */
export async function destroy(params: GetIdParam): Promise<InstallationType> {
  const { id } = params;

  const installation = await findById(params);
  await remove(id);
  return installation;
}

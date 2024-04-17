import {
  count,
  createCriminal,
  getAll,
  getById,
  paginate,
  remove,
  updateCriminal,
} from "./criminal.repository";
import { NotFoundError } from "../../utils/exceptions";
import {
  CriminalCreateType,
  CriminalType,
  CriminalUpdateType,
} from "../../@types/criminal.type";
import { getPaginationKeys, getPaginationParams } from "../../utils/pagination";
import { PaginationType } from "../../@types/pagination.type";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";
import { ExcelBuffer, generateExcel } from "../../utils/excel";
import { ExcelCriminalsColumns } from "./criminal.model";
import { saveImage } from "../../utils/file";

/**
 * Create a new criminal with the provided criminal information.
 *
 * @param {CriminalCreateType} criminal - the criminal information
 * @return {Promise<CriminalType>} a promise that resolves with the created criminal data
 */
export async function create(
  data: CriminalCreateType,
  userId: number
): Promise<CriminalType> {
  let savePhotoFile: string | null = null;
  let saveAadharFile: string | null = null;
  if (data.aadhar_photo) {
    saveAadharFile = await saveImage(data.aadhar_photo);
  }
  if (data.photo) {
    savePhotoFile = await saveImage(data.photo);
  }
  return await createCriminal({
    ...data,
    aadhar_photo: saveAadharFile,
    photo: savePhotoFile,
    createdBy: userId,
  });
}

/**
 * Update CriminalType information.
 *
 * @param {CreateCriminalBody} CriminalType - the CriminalType information to be updated
 * @param {GetIdParam} param - the parameter used to identify the CriminalType to be updated
 * @return {Promise<CriminalType>} the updated CriminalType information
 */
export async function update(
  data: CriminalUpdateType,
  param: GetIdParam
): Promise<CriminalType> {
  let savePhotoFile: string | null = null;
  let saveAadharFile: string | null = null;
  if (data.aadhar_photo) {
    saveAadharFile = await saveImage(data.aadhar_photo);
  }
  if (data.photo) {
    savePhotoFile = await saveImage(data.photo);
  }
  return await updateCriminal(
    { ...data, aadhar_photo: saveAadharFile, photo: savePhotoFile },
    param.id
  );
}

/**
 * Find a criminal by ID.
 *
 * @param {GetIdParam} params - the parameters for finding the criminal
 * @return {Promise<CriminalType>} the criminal found by ID
 */
export async function findById(params: GetIdParam): Promise<CriminalType> {
  const { id } = params;

  const criminal = await getById(id);
  if (!criminal) {
    throw new NotFoundError();
  }
  return criminal;
}

/**
 * Find criminal by pagination.
 *
 * @param {GetPaginationQuery} querystring - the parameters for finding the criminal
 * @return {Promise<{criminal:CriminalType[]} & PaginationType>} the criminal found by ID
 */
export async function list(querystring: GetPaginationQuery): Promise<
  {
    criminal: CriminalType[];
  } & PaginationType
> {
  const { limit, offset } = getPaginationParams({
    page: querystring.page,
    size: querystring.limit,
  });
  const criminal = await paginate(limit, offset, querystring.search);
  const criminalCount = await count(querystring.search);
  return {
    criminal,
    ...getPaginationKeys({
      count: criminalCount,
      page: querystring.page,
      size: querystring.limit,
    }),
  };
}

/**
 * Export criminal by pagination.
 *
 * @param {GetSearchQuery} querystring - the parameters for finding the criminal
 * @return {Promise<{file: ExcelBuffer}>} the criminal found by ID
 */
export async function exportExcel(querystring: GetSearchQuery): Promise<{
  file: ExcelBuffer;
}> {
  const criminals = await getAll(querystring.search);

  const buffer = await generateExcel<CriminalType>(
    "Criminals",
    ExcelCriminalsColumns,
    criminals
  );

  return {
    file: buffer,
  };
}

/**
 * Destroys a criminal based on the provided parameters.
 *
 * @param {GetIdParam} params - the parameters for destroying the criminal
 * @return {Promise<CriminalType>} the destroyed criminal
 */
export async function destroy(params: GetIdParam): Promise<CriminalType> {
  const { id } = params;

  const criminal = await findById(params);
  await remove(id);
  return criminal;
}

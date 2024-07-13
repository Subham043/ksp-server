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
import {
  ExcelBuffer,
  generateExcel,
  readExcel,
  storeExcel,
} from "../../utils/excel";
import {
  CriminalExcelData,
  ExcelCriminalsColumns,
  ExcelFailedCriminalsColumns,
} from "./criminal.model";
import { deleteImage, saveImage } from "../../utils/file";
import { PostExcelBody } from "../../common/schemas/excel.schema";
import {
  createCriminalBodySchema,
  createCriminalUniqueSchema,
} from "./schemas/create.schema";

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
  let savePhotoFile: string | null | undefined = null;
  let saveAadharFile: string | null | undefined = null;
  const existingCriminal = await getById(param.id);
  if (data.aadhar_photo) {
    saveAadharFile = await saveImage(data.aadhar_photo);
    existingCriminal?.aadhar_photo &&
      deleteImage(existingCriminal.aadhar_photo);
  } else {
    saveAadharFile = existingCriminal?.aadhar_photo;
  }
  if (data.photo) {
    savePhotoFile = await saveImage(data.photo);
    existingCriminal?.photo && deleteImage(existingCriminal.photo);
  } else {
    savePhotoFile = existingCriminal?.photo;
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
  criminal?.aadhar_photo && deleteImage(criminal.aadhar_photo);
  criminal?.photo && deleteImage(criminal.photo);
  return criminal;
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
  const criminalInsertData: CriminalExcelData[] = [];
  const failedCriminalsImport: (CriminalExcelData & { error: string })[] = [];
  const worksheet = await readExcel(data.file);
  worksheet?.eachRow(function (row, rowNumber) {
    if (rowNumber > 1) {
      const criminalData = {
        name: row.getCell(1).value?.toString(),
        sex: row.getCell(2).value?.toString() as "Male" | "Female" | "Others",
        dob: (row.getCell(3).value as Date | undefined)?.toISOString(),
        permanent_address: row.getCell(4).value?.toString(),
        present_address: row.getCell(5).value?.toString(),
        phone: row.getCell(6).value?.toString(),
        aadhar_no: row.getCell(7).value?.toString(),
        father_name: row.getCell(8).value?.toString(),
        mother_name: row.getCell(9).value?.toString(),
        spouse_name: row.getCell(10).value?.toString(),
        religion: row.getCell(11).value?.toString(),
        caste: row.getCell(12).value?.toString(),
        fpb_sl_no: row.getCell(13).value?.toString(),
        fpb_classn_no: row.getCell(14).value?.toString(),
        occupation: row.getCell(15).value?.toString(),
        educational_qualification: row.getCell(16).value?.toString(),
        native_ps: row.getCell(17).value?.toString(),
        native_district: row.getCell(18).value?.toString(),
      };
      criminalInsertData.push(criminalData);
    }
  });
  for (let i = 0; i < criminalInsertData.length; i++) {
    try {
      await createCriminalBodySchema.parseAsync(criminalInsertData[i]);
      await createCriminalUniqueSchema.parseAsync({
        aadhar_no: criminalInsertData[i].aadhar_no,
      });
      const validatedCriminalData = {
        ...criminalInsertData[i],
        name: criminalInsertData[i].name || "",
        dob: new Date(criminalInsertData[i].dob || ""),
        createdBy: userId,
      };
      await createCriminal(validatedCriminalData);
      successCount = successCount + 1;
    } catch (error) {
      failedCriminalsImport.push({
        ...criminalInsertData[i],
        error: JSON.stringify(error),
      });
      errorCount = errorCount + 1;
    }
  }
  if (failedCriminalsImport.length > 0 && errorCount > 0) {
    const fileName = await storeExcel<CriminalExcelData & { error: string }>(
      "Failed Criminals Import",
      ExcelFailedCriminalsColumns,
      failedCriminalsImport
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

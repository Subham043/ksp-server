import prisma from "../../db";
import {
  CriminalPostRepositoryType,
  CriminalType,
} from "../../@types/criminal.type";
import { CriminalColumn } from "./criminal.model";

/**
 * Create a new criminal with the provided data.
 *
 * @param {CriminalPostRepositoryType} data - the data for creating the criminal
 * @return {Promise<CriminalType>} a promise that resolves to the newly created criminal
 */
export async function createCriminal(
  data: CriminalPostRepositoryType & { createdBy: number }
): Promise<CriminalType> {
  const { dob, createdBy, ...rest } = data;
  return await prisma.criminal.create({
    data: { ...rest, dob: dob ? new Date(dob) : undefined, userId: createdBy },
    select: CriminalColumn,
  });
}

/**
 * Update criminal information in the database.
 *
 * @param {CriminalUpdateType} data - the data to update the criminal with
 * @param {number} id - the id of the criminal to update
 * @return {Promise<CriminalType>} the updated criminal information
 */
export async function updateCriminal(
  data: CriminalPostRepositoryType,
  id: number
): Promise<CriminalType> {
  const { dob, ...rest } = data;
  const updateData = { ...rest } as CriminalPostRepositoryType;
  if (dob) {
    updateData.dob = new Date(dob);
  }
  return await prisma.criminal.update({
    where: { id },
    data: { ...updateData },
    select: CriminalColumn,
  });
}

/**
 * Asynchronously paginates the data from the database.
 *
 * @param {number} limit - the maximum number of items to retrieve
 * @param {number} offset - the number of items to skip before starting to return data
 * @return {Promise<CriminalType[]>} the paginated criminal data as a promise
 */
export async function paginate(
  limit: number,
  offset: number,
  search?: string
): Promise<CriminalType[]> {
  return await prisma.criminal.findMany({
    skip: offset,
    take: limit,
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              permanent_address: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              present_address: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              aadhar_no: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              relation_name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              caste: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              fpb_sl_no: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              fpb_classn_no: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              occupation: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              educational_qualification: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              native_ps: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              native_district: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              voice: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              build: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              complexion: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              teeth: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              hair: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              eyes: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              habbits: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              burnMarks: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              tattoo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mole: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              scar: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              leucoderma: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              faceHead: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              otherPartsBody: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              dressUsed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              beard: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              face: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              moustache: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              nose: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
    select: CriminalColumn,
    orderBy: {
      id: "desc",
    },
  });
}

/**
 * Asynchronously get all the data from the database.
 *
 * @param {string} search - the maximum number of items to retrieve
 * @return {Promise<CriminalType[]>} the paginated criminal data as a promise
 */
export async function getAll(search?: string): Promise<CriminalType[]> {
  return await prisma.criminal.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              permanent_address: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              present_address: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              aadhar_no: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              relation_name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              caste: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              fpb_sl_no: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              fpb_classn_no: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              occupation: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              educational_qualification: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              native_ps: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              native_district: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              voice: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              build: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              complexion: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              teeth: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              hair: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              eyes: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              habbits: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              burnMarks: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              tattoo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mole: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              scar: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              leucoderma: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              faceHead: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              otherPartsBody: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              dressUsed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              beard: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              face: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              moustache: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              nose: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
    select: CriminalColumn,
    orderBy: {
      id: "desc",
    },
  });
}

/**
 * Asynchronously counts the number of records.
 *
 * @return {Promise<number>} The number of records.
 */
export async function count(search?: string): Promise<number> {
  return await prisma.criminal.count({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              permanent_address: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              present_address: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              aadhar_no: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              relation_name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              caste: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              fpb_sl_no: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              fpb_classn_no: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              occupation: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              educational_qualification: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              native_ps: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              native_district: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              voice: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              build: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              complexion: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              teeth: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              hair: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              eyes: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              habbits: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              burnMarks: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              tattoo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mole: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              scar: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              leucoderma: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              faceHead: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              otherPartsBody: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              dressUsed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              beard: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              face: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              moustache: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              nose: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
  });
}

/**
 * Retrieves criminal data by the given ID.
 *
 * @param {number} id - The ID of the criminal to retrieve
 * @return {Promise<CriminalType|null>} The criminal data if found, otherwise null
 */
export async function getById(id: number): Promise<CriminalType | null> {
  return await prisma.criminal.findFirst({
    where: { id },
    select: CriminalColumn,
  });
}

/**
 * Retrieves criminal information by aadhar_no from the database.
 *
 * @param {string} aadhar_no - The aadhar_no of the criminal to retrieve
 * @return {Promise<CriminalType | null>} The criminal information if found, otherwise null
 */
export async function getByAadhar(
  aadhar_no: string
): Promise<CriminalType | null> {
  return await prisma.criminal.findFirst({
    where: { aadhar_no },
    select: {
      id: true,
      name: true,
      sex: true,
      aadhar_no: true,
      createdAt: true,
    },
  });
}

/**
 * Removes a criminal from the database by their ID.
 *
 * @param {number} id - the ID of the criminal to be removed
 * @return {Promise<CriminalType>} a promise that resolves once the criminal is removed
 */
export async function remove(id: number): Promise<CriminalType> {
  return await prisma.criminal.delete({
    where: { id },
    select: CriminalColumn,
  });
}

import prisma from "../../db";
import {
  HearingCreateType,
  HearingType,
  HearingUpdateType,
} from "../../@types/hearing.type";
import { HearingColumn } from "./hearing.model";

/**
 * Create a new jail with the provided data.
 *
 * @param {HearingCreateType} data - the data for creating the jail
 * @return {Promise<HearingType>} a promise that resolves to the newly created jail
 */
export async function createHearing(
  data: HearingCreateType,
  courtId: number
): Promise<HearingType> {
  const { hearingDate, nextHearingDate, ...rest } = data;
  return await prisma.courtHearingDetail.create({
    data: {
      ...rest,
      hearingDate: hearingDate ? new Date(hearingDate) : undefined,
      nextHearingDate: nextHearingDate ? new Date(nextHearingDate) : undefined,
      courtId,
    },
    select: {
      ...HearingColumn,
    },
  });
}

/**
 * Update court information in the database.
 *
 * @param {HearingUpdateType} data - the data to update the court with
 * @param {number} id - the id of the court to update
 * @return {Promise<HearingType>} the updated court information
 */
export async function updateHearing(
  data: HearingUpdateType,
  id: number
): Promise<HearingType> {
  const { hearingDate, nextHearingDate, ...rest } = data;
  const updateData = { ...rest } as HearingUpdateType;
  if (hearingDate) {
    updateData.hearingDate = new Date(hearingDate);
  }
  if (nextHearingDate) {
    updateData.nextHearingDate = new Date(nextHearingDate);
  }
  return await prisma.courtHearingDetail.update({
    where: { id },
    data: { ...updateData },
    select: {
      ...HearingColumn,
    },
  });
}

/**
 * Asynchronously paginates the data from the database.
 *
 * @param {number} limit - the maximum number of items to retrieve
 * @param {number} offset - the number of items to skip before starting to return data
 * @return {Promise<HearingType[]>} the paginated court data as a promise
 */
export async function paginate(
  courtId: number,
  limit: number,
  offset: number,
  search?: string
): Promise<HearingType[]> {
  return await prisma.courtHearingDetail.findMany({
    skip: offset,
    take: limit,
    where: search
      ? {
          courtId,
          OR: [
            {
              attendance: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              judgeName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              actionCode: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              additionalRemarks: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {
          courtId,
        },
    select: {
      ...HearingColumn,
    },
    orderBy: {
      id: "desc",
    },
  });
}

/**
 * Asynchronously get all the data from the database.
 *
 * @param {string} search - the maximum number of items to retrieve
 * @return {Promise<HearingType[]>} the paginated court data as a promise
 */
export async function getAll(
  courtId: number,
  search?: string
): Promise<HearingType[]> {
  return await prisma.courtHearingDetail.findMany({
    where: search
      ? {
          courtId,
          OR: [
            {
              attendance: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              judgeName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              actionCode: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              additionalRemarks: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {
          courtId,
        },
    select: {
      ...HearingColumn,
    },
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
export async function count(courtId: number, search?: string): Promise<number> {
  return await prisma.courtHearingDetail.count({
    where: search
      ? {
          courtId,
          OR: [
            {
              attendance: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              judgeName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              actionCode: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              additionalRemarks: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {
          courtId,
        },
  });
}

/**
 * Retrieves court data by the given ID.
 *
 * @param {number} id - The ID of the court to retrieve
 * @return {Promise<HearingType|null>} The court data if found, otherwise null
 */
export async function getById(id: number): Promise<HearingType | null> {
  return await prisma.courtHearingDetail.findFirst({
    where: { id },
    select: {
      ...HearingColumn,
    },
  });
}

/**
 * Removes a court from the database by their ID.
 *
 * @param {number} id - the ID of the court to be removed
 * @return {Promise<HearingType>} a promise that resolves once the court is removed
 */
export async function remove(id: number): Promise<HearingType> {
  return await prisma.courtHearingDetail.delete({
    where: { id },
    select: {
      ...HearingColumn,
    },
  });
}

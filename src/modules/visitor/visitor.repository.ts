import prisma from "../../db";
import {
  VisitorCreateType,
  VisitorType,
  VisitorUpdateType,
} from "../../@types/visitor.type";
import { VisitorColumn } from "./visitor.model";

/**
 * Create a new jail with the provided data.
 *
 * @param {VisitorCreateType} data - the data for creating the jail
 * @return {Promise<VisitorType>} a promise that resolves to the newly created jail
 */
export async function createVisitor(
  data: VisitorCreateType,
  jailId: number
): Promise<VisitorType> {
  const { visitonDate, ...rest } = data;
  return await prisma.jailVisitorDetail.create({
    data: {
      ...rest,
      visitonDate: visitonDate ? new Date(visitonDate) : undefined,
      jailId,
    },
    select: {
      ...VisitorColumn,
    },
  });
}

/**
 * Update court information in the database.
 *
 * @param {VisitorUpdateType} data - the data to update the court with
 * @param {number} id - the id of the court to update
 * @return {Promise<VisitorType>} the updated court information
 */
export async function updateVisitor(
  data: VisitorUpdateType,
  id: number
): Promise<VisitorType> {
  const { visitonDate, ...rest } = data;
  const updateData = { ...rest } as VisitorUpdateType;
  if (visitonDate) {
    updateData.visitonDate = new Date(visitonDate);
  }
  return await prisma.jailVisitorDetail.update({
    where: { id },
    data: { ...updateData },
    select: {
      ...VisitorColumn,
    },
  });
}

/**
 * Asynchronously paginates the data from the database.
 *
 * @param {number} limit - the maximum number of items to retrieve
 * @param {number} offset - the number of items to skip before starting to return data
 * @return {Promise<VisitorType[]>} the paginated court data as a promise
 */
export async function paginate(
  jailId: number,
  limit: number,
  offset: number,
  search?: string
): Promise<VisitorType[]> {
  return await prisma.jailVisitorDetail.findMany({
    skip: offset,
    take: limit,
    where: search
      ? {
          jailId,
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              relation: {
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
      : {},
    select: {
      ...VisitorColumn,
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
 * @return {Promise<VisitorType[]>} the paginated court data as a promise
 */
export async function getAll(
  jailId: number,
  search?: string
): Promise<VisitorType[]> {
  return await prisma.jailVisitorDetail.findMany({
    where: search
      ? {
          jailId,
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              relation: {
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
      : {},
    select: {
      ...VisitorColumn,
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
export async function count(jailId: number, search?: string): Promise<number> {
  return await prisma.jailVisitorDetail.count({
    where: search
      ? {
          jailId,
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              relation: {
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
      : {},
  });
}

/**
 * Retrieves court data by the given ID.
 *
 * @param {number} id - The ID of the court to retrieve
 * @return {Promise<VisitorType|null>} The court data if found, otherwise null
 */
export async function getById(id: number): Promise<VisitorType | null> {
  return await prisma.jailVisitorDetail.findFirst({
    where: { id },
    select: {
      ...VisitorColumn,
    },
  });
}

/**
 * Removes a court from the database by their ID.
 *
 * @param {number} id - the ID of the court to be removed
 * @return {Promise<VisitorType>} a promise that resolves once the court is removed
 */
export async function remove(id: number): Promise<VisitorType> {
  return await prisma.jailVisitorDetail.delete({
    where: { id },
    select: {
      ...VisitorColumn,
    },
  });
}

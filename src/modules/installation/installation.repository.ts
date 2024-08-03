import prisma from "../../db";
import {
  InstallationCreateType,
  InstallationType,
} from "../../@types/installation.type";
import { InstallationColumn } from "./installation.model";

/**
 * Create a new installation with the provided data.
 *
 * @param {InstallationCreateType} data - the data for creating the installation
 * @return {Promise<InstallationType>} a promise that resolves to the newly created installation
 */
export async function createInstallation(
  data: InstallationCreateType
): Promise<InstallationType> {
  return await prisma.installation.upsert({
    where: { IPv4: data.IPv4 },
    create: data,
    update: data,
    select: InstallationColumn,
  });
}

/**
 * Asynchronously paginates the data from the database.
 *
 * @param {number} limit - the maximum number of items to retrieve
 * @param {number} offset - the number of items to skip before starting to return data
 * @return {Promise<InstallationType[]>} the paginated installation data as a promise
 */
export async function paginate(
  limit: number,
  offset: number,
  search?: string
): Promise<InstallationType[]> {
  return await prisma.installation.findMany({
    skip: offset,
    take: limit,
    where: search
      ? {
          OR: [
            {
              IPv4: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
    select: InstallationColumn,
    orderBy: {
      id: "desc",
    },
  });
}

/**
 * Asynchronously get all the data from the database.
 *
 * @param {string} search - the number of items to skip before starting to return data
 * @return {Promise<InstallationType[]>} the paginated installation data as a promise
 */
export async function getAll(search?: string): Promise<InstallationType[]> {
  return await prisma.installation.findMany({
    where: search
      ? {
          OR: [
            {
              IPv4: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
    select: InstallationColumn,
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
  return await prisma.installation.count({
    where: search
      ? {
          OR: [
            {
              IPv4: {
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
 * Retrieves installation data by the given ID.
 *
 * @param {number} id - The ID of the installation to retrieve
 * @return {Promise<InstallationType|null>} The installation data if found, otherwise null
 */
export async function getById(id: number): Promise<InstallationType | null> {
  return await prisma.installation.findFirst({
    where: { id },
    select: InstallationColumn,
  });
}

/**
 * Removes a installation from the database by their ID.
 *
 * @param {number} id - the ID of the installation to be removed
 * @return {Promise<InstallationType>} a promise that resolves once the installation is removed
 */
export async function remove(id: number): Promise<InstallationType> {
  return await prisma.installation.delete({
    where: { id },
    select: InstallationColumn,
  });
}

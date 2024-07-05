import prisma from "../../db";
import {
  CrimesByCriminalsCreateType,
  CrimesByCriminalsExcelType,
  CrimesByCriminalsQueryType,
  CrimesByCriminalsUpdateType,
} from "../../@types/crimesByCriminals.type";
import {
  CrimeColumn,
  CriminalColumn,
  CrimesByCriminalsColumn,
} from "./crimesByCriminals.model";

/**
 * Create a new crime with the provided data.
 *
 * @param {CrimesByCriminalsPostRepositoryType} data - the data for creating the crime
 * @return {Promise<CrimesByCriminalsType>} a promise that resolves to the newly created crime
 */
export async function createCrimesByCriminals(
  data: CrimesByCriminalsCreateType,
  crimeId: number
): Promise<CrimesByCriminalsQueryType | null> {
  const result = await prisma.crimesByCriminals.create({
    data: {
      ...data,
      crimeId,
    },
    select: {
      id: true,
    },
  });
  return await getById(result.id);
}

/**
 * Update crime information in the database.
 *
 * @param {CrimesByCriminalsUpdateType} data - the data to update the crime with
 * @param {number} id - the id of the crime to update
 * @return {Promise<CrimesByCriminalsType>} the updated crime information
 */
export async function updateCrimesByCriminals(
  data: CrimesByCriminalsUpdateType,
  id: number
): Promise<CrimesByCriminalsQueryType | null> {
  await prisma.crimesByCriminals.updateMany({
    data: {
      ...data,
    },
    where: {
      id,
    },
  });
  return await getById(id);
}

/**
 * Asynchronously paginates the data from the database.
 *
 * @param {number} limit - the maximum number of items to retrieve
 * @param {number} offset - the number of items to skip before starting to return data
 * @return {Promise<CrimesByCriminalsType[]>} the paginated crime data as a promise
 */
export async function paginate(
  crimeId: number,
  limit: number,
  offset: number,
  search?: string
): Promise<CrimesByCriminalsQueryType[]> {
  return await prisma.crimesByCriminals.findMany({
    skip: offset,
    take: limit,
    where: search
      ? {
          crimeId,
          OR: [
            {
              aliases: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              ageWhileOpening: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              crimeArrestOrder: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              criminal: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {
          crimeId,
        },
    select: {
      ...CrimesByCriminalsColumn,
      criminal: {
        select: CriminalColumn,
      },
      crime: {
        select: CrimeColumn,
      },
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
 * @return {Promise<CrimesByCriminalsType[]>} the paginated crime data as a promise
 */
export async function getAll(
  crimeId: number,
  search?: string
): Promise<CrimesByCriminalsExcelType[]> {
  return await prisma.crimesByCriminals.findMany({
    where: search
      ? {
          crimeId,
          OR: [
            {
              aliases: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              ageWhileOpening: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              crimeArrestOrder: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              criminal: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {
          crimeId,
        },
    select: {
      ...CrimesByCriminalsColumn,
      criminal: {
        select: CriminalColumn,
      },
      crime: {
        select: CrimeColumn,
      },
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
export async function count(crimeId: number, search?: string): Promise<number> {
  return await prisma.crimesByCriminals.count({
    where: search
      ? {
          crimeId,
          OR: [
            {
              aliases: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              ageWhileOpening: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              crimeArrestOrder: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              criminal: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {
          crimeId,
        },
  });
}

/**
 * Retrieves crime data by the given ID.
 *
 * @param {number} id - The ID of the crime to retrieve
 * @return {Promise<CrimesByCriminalsType|null>} The crime data if found, otherwise null
 */
export async function getById(
  id: number
): Promise<CrimesByCriminalsQueryType | null> {
  return prisma.crimesByCriminals.findFirst({
    where: {
      id,
    },
    select: {
      ...CrimesByCriminalsColumn,
      criminal: {
        select: CriminalColumn,
      },
      crime: {
        select: CrimeColumn,
      },
    },
  });
}

export async function getByCrimeIdAndcriminalId(
  crimeId: number,
  criminalId: number
): Promise<CrimesByCriminalsQueryType | null> {
  return prisma.crimesByCriminals.findFirst({
    where: {
      crimeId,
      criminalId,
    },
    select: {
      ...CrimesByCriminalsColumn,
      criminal: {
        select: CriminalColumn,
      },
      crime: {
        select: CrimeColumn,
      },
    },
  });
}

/**
 * Removes a crime from the database by their ID.
 *
 * @param {number} id - the ID of the crime to be removed
 * @return {Promise<CrimeType>} a promise that resolves once the crime is removed
 */
export async function remove(
  id: number
): Promise<CrimesByCriminalsQueryType | null> {
  const data = await getById(id);
  await prisma.crimesByCriminals.deleteMany({
    where: {
      id,
    },
  });
  return data;
}

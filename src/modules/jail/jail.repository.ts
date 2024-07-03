import prisma from "../../db";
import {
  JailCreateType,
  JailType,
  JailUpdateType,
} from "../../@types/jail.type";
import { AccusedColumn, JailColumn, CrimeColumn } from "./jail.model";

/**
 * Create a new jail with the provided data.
 *
 * @param {JailCreateType} data - the data for creating the jail
 * @return {Promise<JailType>} a promise that resolves to the newly created jail
 */
export async function createJail(data: JailCreateType): Promise<JailType> {
  const { jailEntryDate, jailReleaseDate, ...rest } = data;
  return await prisma.jailDetail.create({
    data: {
      ...rest,
      jailEntryDate: jailEntryDate ? new Date(jailEntryDate) : undefined,
      jailReleaseDate: jailReleaseDate ? new Date(jailReleaseDate) : undefined,
    },
    select: {
      ...JailColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
    },
  });
}

/**
 * Update court information in the database.
 *
 * @param {JailUpdateType} data - the data to update the court with
 * @param {number} id - the id of the court to update
 * @return {Promise<JailType>} the updated court information
 */
export async function updateJail(
  data: JailUpdateType,
  id: number
): Promise<JailType> {
  const { jailEntryDate, jailReleaseDate, ...rest } = data;
  const updateData = { ...rest } as JailUpdateType;
  if (jailEntryDate) {
    updateData.jailEntryDate = new Date(jailEntryDate);
  }
  if (jailReleaseDate) {
    updateData.jailReleaseDate = new Date(jailReleaseDate);
  }
  return await prisma.jailDetail.update({
    where: { id },
    data: { ...updateData },
    select: {
      ...JailColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
    },
  });
}

/**
 * Asynchronously paginates the data from the database.
 *
 * @param {number} limit - the maximum number of items to retrieve
 * @param {number} offset - the number of items to skip before starting to return data
 * @return {Promise<JailType[]>} the paginated court data as a promise
 */
export async function paginate(
  limit: number,
  offset: number,
  search?: string
): Promise<JailType[]> {
  return await prisma.jailDetail.findMany({
    skip: offset,
    take: limit,
    where: search
      ? {
          OR: [
            {
              lawSection: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              policeStation: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              utpNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              jailName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              jailId: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              prisonerId: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              prisonerType: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              ward: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              barrack: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              registerNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              periodUndergone: {
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
            {
              accused: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                typeOfCrime: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                sectionOfLaw: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                mobFileNo: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                hsNo: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {},
    select: {
      ...JailColumn,
      accused: {
        select: AccusedColumn,
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
 * @return {Promise<JailType[]>} the paginated court data as a promise
 */
export async function getAll(search?: string): Promise<JailType[]> {
  return await prisma.jailDetail.findMany({
    where: search
      ? {
          OR: [
            {
              lawSection: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              policeStation: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              utpNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              jailName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              jailId: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              prisonerId: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              prisonerType: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              ward: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              barrack: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              registerNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              periodUndergone: {
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
            {
              accused: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                typeOfCrime: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                sectionOfLaw: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                mobFileNo: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                hsNo: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {},
    select: {
      ...JailColumn,
      accused: {
        select: AccusedColumn,
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
export async function count(search?: string): Promise<number> {
  return await prisma.jailDetail.count({
    where: search
      ? {
          OR: [
            {
              lawSection: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              policeStation: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              utpNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              jailName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              jailId: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              prisonerId: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              prisonerType: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              ward: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              barrack: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              registerNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              periodUndergone: {
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
            {
              accused: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                typeOfCrime: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                sectionOfLaw: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                mobFileNo: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              crime: {
                hsNo: {
                  contains: search,
                  mode: "insensitive",
                },
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
 * @return {Promise<JailType|null>} The court data if found, otherwise null
 */
export async function getById(id: number): Promise<JailType | null> {
  return await prisma.jailDetail.findFirst({
    where: { id },
    select: {
      ...JailColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
    },
  });
}

/**
 * Removes a court from the database by their ID.
 *
 * @param {number} id - the ID of the court to be removed
 * @return {Promise<JailType>} a promise that resolves once the court is removed
 */
export async function remove(id: number): Promise<JailType> {
  return await prisma.jailDetail.delete({
    where: { id },
    select: {
      ...JailColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
    },
  });
}

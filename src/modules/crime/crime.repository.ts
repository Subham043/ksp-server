import prisma from "../../db";
import {
  CrimeCreateType,
  CrimeExcelType,
  CrimeQueryType,
  CrimeUpdateType,
} from "../../@types/crime.type";
import { CrimeColumn, CriminalColumn } from "./crime.model";

/**
 * Create a new crime with the provided data.
 *
 * @param {CrimePostRepositoryType} data - the data for creating the crime
 * @return {Promise<CrimeType>} a promise that resolves to the newly created crime
 */
export async function createCrime(
  data: CrimeCreateType & { createdBy: number }
): Promise<CrimeQueryType | null> {
  const { hsClosingDate, hsOpeningDate, createdBy, criminals, ...rest } = data;
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Code running in a transaction...
      const crime = await tx.crime.create({
        data: {
          ...rest,
          hsClosingDate: hsClosingDate ? new Date(hsClosingDate) : undefined,
          hsOpeningDate: hsOpeningDate ? new Date(hsOpeningDate) : undefined,
          userId: createdBy,
        },
        select: {
          id: true,
        },
      });

      await tx.crimesByCriminals.deleteMany({ where: { crimeId: crime.id } });
      await tx.crimesByCriminals.createMany({
        data: criminals.map((c) => ({ crimeId: crime.id, criminalId: c })),
      });

      return crime;
    });

    return await getById(result.id);
  } catch (error) {
    throw error;
  }
}

/**
 * Update crime information in the database.
 *
 * @param {CrimeUpdateType} data - the data to update the crime with
 * @param {number} id - the id of the crime to update
 * @return {Promise<CrimeType>} the updated crime information
 */
export async function updateCrime(
  data: CrimeUpdateType,
  id: number
): Promise<CrimeQueryType | null> {
  const { hsClosingDate, hsOpeningDate, criminals, ...rest } = data;
  const updateData = { ...rest } as Omit<CrimeUpdateType, "criminals">;
  if (hsClosingDate) {
    updateData.hsClosingDate = new Date(hsClosingDate);
  }
  if (hsOpeningDate) {
    updateData.hsOpeningDate = new Date(hsOpeningDate);
  }
  try {
    await prisma.$transaction(async (tx) => {
      // Code running in a transaction...
      await tx.crime.update({
        data: {
          ...updateData,
        },
        where: {
          id,
        },
      });
      await tx.crimesByCriminals.deleteMany({ where: { crimeId: id } });
      await tx.crimesByCriminals.createMany({
        data: criminals.map((c) => ({ crimeId: id, criminalId: c })),
      });
    });

    return await getById(id);
  } catch (error) {
    throw error;
  }
}

/**
 * Asynchronously paginates the data from the database.
 *
 * @param {number} limit - the maximum number of items to retrieve
 * @param {number} offset - the number of items to skip before starting to return data
 * @return {Promise<CrimeType[]>} the paginated crime data as a promise
 */
export async function paginate(
  limit: number,
  offset: number,
  search?: string
): Promise<CrimeQueryType[]> {
  return await prisma.crime.findMany({
    skip: offset,
    take: limit,
    where: search
      ? {
          OR: [
            {
              typeOfCrime: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              sectionOfLaw: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mobFileNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              hsNo: {
                contains: search,
                mode: "insensitive",
              },
            },
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
              crimeGroup: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              crimeHead: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              crimeClass: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              briefFact: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              cluesLeft: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              languagesKnown: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              languagesUsed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              placeAttacked: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              placeOfAssemblyAfterOffence: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              placeOfAssemblyBeforeOffence: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              propertiesAttacked: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              styleAssumed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              toolsUsed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              tradeMarks: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              transportUsedAfter: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              transportUsedBefore: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              gangStrength: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              criminals: {
                some: {
                  criminal: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          ],
        }
      : {},
    select: {
      ...CrimeColumn,
      criminals: {
        select: {
          criminal: {
            select: CriminalColumn,
          },
        },
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
 * @return {Promise<CrimeType[]>} the paginated crime data as a promise
 */
export async function getAll(search?: string): Promise<CrimeExcelType[]> {
  const data = await prisma.crime.findMany({
    where: search
      ? {
          OR: [
            {
              typeOfCrime: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              sectionOfLaw: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mobFileNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              hsNo: {
                contains: search,
                mode: "insensitive",
              },
            },
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
              crimeGroup: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              crimeHead: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              crimeClass: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              briefFact: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              cluesLeft: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              languagesKnown: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              languagesUsed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              placeAttacked: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              placeOfAssemblyAfterOffence: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              placeOfAssemblyBeforeOffence: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              propertiesAttacked: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              styleAssumed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              toolsUsed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              tradeMarks: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              transportUsedAfter: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              transportUsedBefore: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              gangStrength: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              criminals: {
                some: {
                  criminal: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          ],
        }
      : {},
    select: {
      ...CrimeColumn,
      criminals: {
        select: {
          criminal: {
            select: CriminalColumn,
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return data.map((c) => ({
    ...c,
    criminal_names: c.criminals
      .map((c) => (c.criminal ? c.criminal.name : ""))
      .join(", "),
    criminal_ids: c.criminals
      .map((c) => (c.criminal ? c.criminal.id : ""))
      .join(", "),
  }));
}

/**
 * Asynchronously counts the number of records.
 *
 * @return {Promise<number>} The number of records.
 */
export async function count(search?: string): Promise<number> {
  return await prisma.crime.count({
    where: search
      ? {
          OR: [
            {
              typeOfCrime: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              sectionOfLaw: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mobFileNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              hsNo: {
                contains: search,
                mode: "insensitive",
              },
            },
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
              crimeGroup: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              crimeHead: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              crimeClass: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              briefFact: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              cluesLeft: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              languagesKnown: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              languagesUsed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              placeAttacked: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              placeOfAssemblyAfterOffence: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              placeOfAssemblyBeforeOffence: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              propertiesAttacked: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              styleAssumed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              toolsUsed: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              tradeMarks: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              transportUsedAfter: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              transportUsedBefore: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              gangStrength: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              criminals: {
                some: {
                  criminal: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          ],
        }
      : {},
  });
}

/**
 * Retrieves crime data by the given ID.
 *
 * @param {number} id - The ID of the crime to retrieve
 * @return {Promise<CrimeType|null>} The crime data if found, otherwise null
 */
export async function getById(id: number): Promise<CrimeQueryType | null> {
  return prisma.crime.findFirst({
    where: {
      id,
    },
    select: {
      ...CrimeColumn,
      criminals: {
        select: {
          criminal: {
            select: CriminalColumn,
          },
        },
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
export async function remove(id: number): Promise<CrimeQueryType | undefined> {
  return prisma.crime.delete({
    where: {
      id,
    },
    select: {
      ...CrimeColumn,
      criminals: {
        select: {
          criminal: {
            select: CriminalColumn,
          },
        },
      },
    },
  });
}

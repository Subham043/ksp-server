import prisma from "../../db";
import {
  CourtCreateType,
  CourtType,
  CourtUpdateType,
} from "../../@types/court.type";
import {
  AccusedColumn,
  CourtColumn,
  CourtHearingColumn,
  CrimeColumn,
} from "./court.model";

/**
 * Create a new court with the provided data.
 *
 * @param {CourtCreateType} data - the data for creating the court
 * @return {Promise<CourtType>} a promise that resolves to the newly created court
 */
export async function createCourt(data: CourtCreateType): Promise<CourtType> {
  return await prisma.courtDetail.create({
    data,
    select: {
      ...CourtColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
      courtHearing: {
        select: CourtHearingColumn,
        orderBy: { id: "desc" },
        take: 1,
      },
    },
  });
}

/**
 * Update court information in the database.
 *
 * @param {CourtUpdateType} data - the data to update the court with
 * @param {number} id - the id of the court to update
 * @return {Promise<CourtType>} the updated court information
 */
export async function updateCourt(
  data: CourtUpdateType,
  id: number
): Promise<CourtType> {
  return await prisma.courtDetail.update({
    where: { id },
    data,
    select: {
      ...CourtColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
      courtHearing: {
        select: CourtHearingColumn,
        orderBy: { id: "desc" },
        take: 1,
      },
    },
  });
}

/**
 * Asynchronously paginates the data from the database.
 *
 * @param {number} limit - the maximum number of items to retrieve
 * @param {number} offset - the number of items to skip before starting to return data
 * @return {Promise<CourtType[]>} the paginated court data as a promise
 */
export async function paginate(
  limit: number,
  offset: number,
  search?: string
): Promise<CourtType[]> {
  return await prisma.courtDetail.findMany({
    skip: offset,
    take: limit,
    where: search
      ? {
          OR: [
            {
              courtName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              ccScNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              psName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              firNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lawyerName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lawyerContact: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              suretyProviderDetail: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              suretyProviderContact: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              stageOfCase: {
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
      ...CourtColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
      courtHearing: {
        select: CourtHearingColumn,
        orderBy: { id: "desc" },
        take: 1,
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
 * @return {Promise<CourtType[]>} the paginated court data as a promise
 */
export async function getAll(search?: string): Promise<CourtType[]> {
  return await prisma.courtDetail.findMany({
    where: search
      ? {
          OR: [
            {
              courtName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              ccScNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              psName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              firNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lawyerName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lawyerContact: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              suretyProviderDetail: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              suretyProviderContact: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              stageOfCase: {
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
      ...CourtColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
      courtHearing: {
        select: CourtHearingColumn,
        orderBy: { id: "desc" },
        take: 1,
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
  return await prisma.courtDetail.count({
    where: search
      ? {
          OR: [
            {
              courtName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              ccScNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              psName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              firNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lawyerName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lawyerContact: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              suretyProviderDetail: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              suretyProviderContact: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              stageOfCase: {
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
 * @return {Promise<CourtType|null>} The court data if found, otherwise null
 */
export async function getById(id: number): Promise<CourtType | null> {
  return await prisma.courtDetail.findFirst({
    where: { id },
    select: {
      ...CourtColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
      courtHearing: {
        select: CourtHearingColumn,
        orderBy: { id: "desc" },
        take: 1,
      },
    },
  });
}

/**
 * Removes a court from the database by their ID.
 *
 * @param {number} id - the ID of the court to be removed
 * @return {Promise<CourtType>} a promise that resolves once the court is removed
 */
export async function remove(id: number): Promise<CourtType> {
  return await prisma.courtDetail.delete({
    where: { id },
    select: {
      ...CourtColumn,
      accused: {
        select: AccusedColumn,
      },
      crime: {
        select: CrimeColumn,
      },
      courtHearing: {
        select: CourtHearingColumn,
        orderBy: { id: "desc" },
        take: 1,
      },
    },
  });
}

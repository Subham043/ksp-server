import { eq, sql } from "drizzle-orm";
import db from "../../db";
import { crimes } from "../../db/schema/crime";
import {
  CrimeCreateType,
  CrimeExcelType,
  CrimeQueryType,
  CrimeUpdateType,
} from "../../@types/crime.type";
import {
  CrimeColumn,
  CrimeSelect,
  CriminalColumn,
  Descending_Crime_CreatedAt,
  Search_Query,
} from "./crime.model";
import { crimesByCriminals } from "../../db/schema/crimesByCriminals";

/**
 * Create a new crime with the provided data.
 *
 * @param {CrimePostRepositoryType} data - the data for creating the crime
 * @return {Promise<CrimeType>} a promise that resolves to the newly created crime
 */
export async function createCrime(
  data: CrimeCreateType & { createdBy: number }
): Promise<CrimeQueryType | undefined> {
  const { hsClosingDate, hsOpeningDate, criminals, ...rest } = data;
  const result = await db.transaction(async (tx) => {
    try {
      const res = await db
        .insert(crimes)
        .values({
          ...rest,
          hsClosingDate: hsClosingDate ? new Date(hsClosingDate) : undefined,
          hsOpeningDate: hsOpeningDate ? new Date(hsOpeningDate) : undefined,
        })
        .onConflictDoNothing()
        .returning(CrimeSelect);
      await tx
        .delete(crimesByCriminals)
        .where(eq(crimesByCriminals.crimeId, res[0].id));
      await tx
        .insert(crimesByCriminals)
        .values(criminals.map((c) => ({ crimeId: res[0].id, criminalId: c })));
      return res;
    } catch (error) {
      tx.rollback();
      throw error;
    }
  });
  const crime = await getById(result[0].id);
  return crime;
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
): Promise<CrimeQueryType | undefined> {
  const { hsClosingDate, hsOpeningDate, criminals, ...rest } = data;
  const updateData = { ...rest } as CrimeUpdateType;
  if (hsClosingDate) {
    updateData.hsClosingDate = new Date(hsClosingDate);
  }
  if (hsOpeningDate) {
    updateData.hsOpeningDate = new Date(hsOpeningDate);
  }
  await db.transaction(async (tx) => {
    try {
      await tx
        .update(crimes)
        .set({
          ...updateData,
        })
        .where(eq(crimes.id, id));
      await tx
        .delete(crimesByCriminals)
        .where(eq(crimesByCriminals.crimeId, id));
      await tx
        .insert(crimesByCriminals)
        .values(criminals.map((c) => ({ crimeId: id, criminalId: c })));
    } catch (error) {
      tx.rollback();
      throw error;
    }
  });
  const crime = await getById(id);
  return crime;
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
  const data = await db.query.crimes.findMany({
    columns: CrimeColumn,
    with: {
      criminals: {
        with: {
          criminal: {
            columns: CriminalColumn,
          },
        },
      },
    },
    where: search ? Search_Query(search) : undefined,
    orderBy: Descending_Crime_CreatedAt,
    limit,
    offset,
  });

  return data;
}

/**
 * Asynchronously get all the data from the database.
 *
 * @param {string} search - the maximum number of items to retrieve
 * @return {Promise<CrimeType[]>} the paginated crime data as a promise
 */
export async function getAll(search?: string): Promise<CrimeExcelType[]> {
  const data = await db.query.crimes.findMany({
    columns: CrimeColumn,
    with: {
      criminals: {
        with: {
          criminal: {
            columns: CriminalColumn,
          },
        },
      },
    },
    where: search ? Search_Query(search) : undefined,
    orderBy: Descending_Crime_CreatedAt,
  });

  return data.map((c) => ({
    ...c,
    criminal_names: c.criminals.map((c) => c.criminal.name).join(", "),
    criminal_ids: c.criminals.map((c) => c.criminal.id).join(", "),
  }));
}

/**
 * Asynchronously counts the number of records.
 *
 * @return {Promise<number>} The number of records.
 */
export async function count(search?: string): Promise<number> {
  const data = await db
    .select({
      count: sql<number>`cast(count(${crimes.id}) as int)`,
    })
    .from(crimes)
    .where(search ? Search_Query(search) : undefined);

  return data[0].count;
}

/**
 * Retrieves crime data by the given ID.
 *
 * @param {number} id - The ID of the crime to retrieve
 * @return {Promise<CrimeType|null>} The crime data if found, otherwise null
 */
export async function getById(id: number): Promise<CrimeQueryType | undefined> {
  const data = await db.query.crimes.findFirst({
    columns: CrimeColumn,
    with: {
      criminals: {
        with: {
          criminal: {
            columns: CriminalColumn,
          },
        },
      },
    },
    where: eq(crimes.id, id),
  });
  return data;
}

/**
 * Removes a crime from the database by their ID.
 *
 * @param {number} id - the ID of the crime to be removed
 * @return {Promise<CrimeType>} a promise that resolves once the crime is removed
 */
export async function remove(id: number): Promise<CrimeQueryType | undefined> {
  const crime = await getById(id);
  await db.delete(crimes).where(eq(crimes.id, id)).returning(CrimeSelect);
  return crime;
}

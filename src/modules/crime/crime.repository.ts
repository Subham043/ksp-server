import { eq, sql } from "drizzle-orm";
import db from "../../db";
import { crimes } from "../../db/schema/crime";
import {
  CrimeCreateType,
  CrimeType,
  CrimeUpdateType,
} from "../../@types/crime.type";
import {
  CrimeSelect,
  Descending_Crime_CreatedAt,
  Search_Query,
  Select_Master_Query,
} from "./crime.model";

/**
 * Create a new crime with the provided data.
 *
 * @param {CrimePostRepositoryType} data - the data for creating the crime
 * @return {Promise<CrimeType>} a promise that resolves to the newly created crime
 */
export async function createCrime(
  data: CrimeCreateType & { createdBy: number }
): Promise<CrimeType> {
  const { hsClosingDate, hsOpeningDate, ...rest } = data;
  const result = await db
    .insert(crimes)
    .values({
      ...rest,
      hsClosingDate: hsClosingDate ? new Date(hsClosingDate) : undefined,
      hsOpeningDate: hsOpeningDate ? new Date(hsOpeningDate) : undefined,
    })
    .onConflictDoNothing()
    .returning(CrimeSelect);
  const crime = await getById(result[0].id);
  if (crime) {
    return crime;
  }
  return result[0];
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
): Promise<CrimeType> {
  const { hsClosingDate, hsOpeningDate, ...rest } = data;
  const updateData = { ...rest } as CrimeUpdateType;
  if (hsClosingDate) {
    updateData.hsClosingDate = new Date(hsClosingDate);
  }
  if (hsOpeningDate) {
    updateData.hsOpeningDate = new Date(hsOpeningDate);
  }
  const result = await db
    .update(crimes)
    .set({
      ...updateData,
    })
    .where(eq(crimes.id, id))
    .returning(CrimeSelect);
  const crime = await getById(id);
  if (crime) {
    return crime;
  }
  return result[0];
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
): Promise<CrimeType[]> {
  const data = await Select_Master_Query.where(
    search ? Search_Query(search) : undefined
  )
    .orderBy(Descending_Crime_CreatedAt)
    .limit(limit)
    .offset(offset);

  return data;
}

/**
 * Asynchronously get all the data from the database.
 *
 * @param {string} search - the maximum number of items to retrieve
 * @return {Promise<CrimeType[]>} the paginated crime data as a promise
 */
export async function getAll(search?: string): Promise<CrimeType[]> {
  const data = await Select_Master_Query.where(
    search ? Search_Query(search) : undefined
  ).orderBy(Descending_Crime_CreatedAt);

  return data;
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
export async function getById(id: number): Promise<CrimeType | null> {
  const data = await Select_Master_Query.where(eq(crimes.id, id));
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

/**
 * Retrieves crime information by aadhar_no from the database.
 *
 * @param {string} aadhar_no - The aadhar_no of the crime to retrieve
 * @return {Promise<CrimeType | null>} The crime information if found, otherwise null
 */
export async function getByCrime(criminal: number): Promise<CrimeType | null> {
  const data = await db
    .select({
      id: crimes.id,
      typeOfCrime: crimes.typeOfCrime,
      sectionOfLaw: crimes.sectionOfLaw,
      gang: crimes.gang,
      criminal: crimes.criminal,
      createdAt: crimes.createdAt,
    })
    .from(crimes)
    .where(eq(crimes.criminal, criminal));
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

/**
 * Removes a crime from the database by their ID.
 *
 * @param {number} id - the ID of the crime to be removed
 * @return {Promise<CrimeType>} a promise that resolves once the crime is removed
 */
export async function remove(id: number): Promise<CrimeType> {
  const crime = await getById(id);
  const result = await db
    .delete(crimes)
    .where(eq(crimes.id, id))
    .returning(CrimeSelect);
  if (crime) {
    return crime;
  }
  return result[0];
}

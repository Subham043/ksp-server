import { eq, sql } from "drizzle-orm";
import db from "../../db";
import { criminals } from "../../db/schema/criminal";
import {
  CriminalPostRepositoryType,
  CriminalType,
} from "../../@types/criminal.type";
import {
  CriminalSelect,
  Descending_Criminal_CreatedAt,
  Search_Query,
  Select_Master_Query,
} from "./criminal.model";

/**
 * Create a new criminal with the provided data.
 *
 * @param {CriminalPostRepositoryType} data - the data for creating the criminal
 * @return {Promise<CriminalType>} a promise that resolves to the newly created criminal
 */
export async function createCriminal(
  data: CriminalPostRepositoryType & { createdBy: number }
): Promise<CriminalType> {
  const result = await db
    .insert(criminals)
    .values(data)
    .onConflictDoNothing()
    .returning(CriminalSelect);
  return result[0];
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
  const result = await db
    .update(criminals)
    .set(data)
    .where(eq(criminals.id, id))
    .returning(CriminalSelect);
  return result[0];
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
  const data = await Select_Master_Query.where(
    search ? Search_Query(search) : undefined
  )
    .orderBy(Descending_Criminal_CreatedAt)
    .limit(limit)
    .offset(offset);

  return data;
}

/**
 * Asynchronously get all the data from the database.
 *
 * @param {string} search - the maximum number of items to retrieve
 * @return {Promise<CriminalType[]>} the paginated criminal data as a promise
 */
export async function getAll(search?: string): Promise<CriminalType[]> {
  const data = await Select_Master_Query.where(
    search ? Search_Query(search) : undefined
  ).orderBy(Descending_Criminal_CreatedAt);

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
      count: sql<number>`cast(count(${criminals.id}) as int)`,
    })
    .from(criminals)
    .where(search ? Search_Query(search) : undefined);

  return data[0].count;
}

/**
 * Retrieves criminal data by the given ID.
 *
 * @param {number} id - The ID of the criminal to retrieve
 * @return {Promise<CriminalType|null>} The criminal data if found, otherwise null
 */
export async function getById(id: number): Promise<CriminalType | null> {
  const data = await Select_Master_Query.where(eq(criminals.id, id));
  if (data.length > 0) {
    return data[0];
  }
  return null;
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
  const data = await db
    .select({
      id: criminals.id,
      name: criminals.name,
      sex: criminals.sex,
      aadhar_no: criminals.aadhar_no,
      createdAt: criminals.createdAt,
    })
    .from(criminals)
    .where(eq(criminals.aadhar_no, aadhar_no));
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

/**
 * Removes a criminal from the database by their ID.
 *
 * @param {number} id - the ID of the criminal to be removed
 * @return {Promise<CriminalType>} a promise that resolves once the criminal is removed
 */
export async function remove(id: number): Promise<CriminalType> {
  const result = await db
    .delete(criminals)
    .where(eq(criminals.id, id))
    .returning(CriminalSelect);
  return result[0];
}
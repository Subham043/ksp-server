import prisma from "../../db";
import { UserCreateType, UserType } from "../../@types/user.type";
import { UpdateUserBody } from "./schemas/update.schema";
import { UserColumn } from "./user.model";

/**
 * Create a new user with the provided data.
 *
 * @param {UserCreateType} data - the data for creating the user
 * @return {Promise<UserType>} a promise that resolves to the newly created user
 */
export async function createUser(data: UserCreateType): Promise<UserType> {
  return await prisma.user.create({
    data,
    select: UserColumn,
  });
}

/**
 * Update user information in the database.
 *
 * @param {UpdateUserBody} data - the data to update the user with
 * @param {number} id - the id of the user to update
 * @return {Promise<UserType>} the updated user information
 */
export async function updateUser(
  data: Omit<UpdateUserBody, "confirm_password">,
  id: number
): Promise<UserType> {
  return await prisma.user.update({
    where: { id },
    data: data,
  });
}

/**
 * Asynchronously paginates the data from the database.
 *
 * @param {number} limit - the maximum number of items to retrieve
 * @param {number} offset - the number of items to skip before starting to return data
 * @return {Promise<UserType[]>} the paginated user data as a promise
 */
export async function paginate(
  limit: number,
  offset: number,
  search?: string
): Promise<UserType[]> {
  return await prisma.user.findMany({
    skip: offset,
    take: limit,
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
    select: UserColumn,
    orderBy: {
      id: "desc",
    },
  });
}

/**
 * Asynchronously get all the data from the database.
 *
 * @param {string} search - the number of items to skip before starting to return data
 * @return {Promise<UserType[]>} the paginated user data as a promise
 */
export async function getAll(search?: string): Promise<UserType[]> {
  return await prisma.user.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
    select: UserColumn,
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
  return await prisma.user.count({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
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
 * Retrieves user data by the given ID.
 *
 * @param {number} id - The ID of the user to retrieve
 * @return {Promise<UserType|null>} The user data if found, otherwise null
 */
export async function getById(id: number): Promise<UserType | null> {
  return await prisma.user.findFirst({
    where: { id },
    select: UserColumn,
  });
}

/**
 * Retrieves user information by email from the database.
 *
 * @param {string} email - The email of the user to retrieve
 * @return {Promise<UserType | null>} The user information if found, otherwise null
 */
export async function getByEmail(email: string): Promise<UserType | null> {
  return await prisma.user.findFirst({
    where: { email },
    select: UserColumn,
  });
}

/**
 * Removes a user from the database by their ID.
 *
 * @param {number} id - the ID of the user to be removed
 * @return {Promise<UserType>} a promise that resolves once the user is removed
 */
export async function remove(id: number): Promise<UserType> {
  return await prisma.user.delete({
    where: { id },
    select: UserColumn,
  });
}

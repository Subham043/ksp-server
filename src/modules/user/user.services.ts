import {
  count,
  createUser,
  getByEmail,
  getById,
  paginate,
  remove,
  updateUser,
} from "./user.repository";
import { v4 as uuidv4 } from "uuid";
import {
  CustomInputValidationError,
  CustomNotFoundError,
} from "../../utils/exceptions";
import { fastifyApp } from "../../index";
import { CreateUserBody } from "./schemas/create.schema";
import { UserType } from "../../@types/user.type";
import { getPaginationKeys, getPaginationParams } from "../../utils/pagination";
import { PaginationType } from "../../@types/pagination.type";
import { logger } from "../../utils/logger";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";

/**
 * Create a new user with the provided user information.
 *
 * @param {CreateUserBody} user - the user information
 * @return {Promise<UserType>} a promise that resolves with the created user data
 */
export async function create(user: CreateUserBody): Promise<UserType> {
  const app = await fastifyApp;
  const { name, email, password } = user;
  const hashedPassword = await app.bcrypt.hash(password);
  const data = {
    name,
    email,
    password: hashedPassword,
    key: uuidv4(),
  };

  const userByEmail = await getByEmail(email);
  if (userByEmail) {
    throw new CustomInputValidationError({
      email: "Email is taken",
    });
  }

  const userData = await createUser(data);
  app.mailer.sendMail(
    {
      to: userData.email,
      subject: "example",
      text: "hello world !",
    },
    (errors, info) => {
      if (errors) {
        logger.error(errors);
      }
      if (info) {
        logger.info(info);
      }
    }
  );
  return userData;
}

/**
 * Update user information.
 *
 * @param {CreateUserBody} user - the user information to be updated
 * @param {GetIdParam} param - the parameter used to identify the user to be updated
 * @return {Promise<UserType>} the updated user information
 */
export async function update(
  user: CreateUserBody,
  param: GetIdParam
): Promise<UserType> {
  const app = await fastifyApp;
  const { name, email, password } = user;
  const hashedPassword = await app.bcrypt.hash(password);
  const data = {
    name,
    email,
    password: hashedPassword,
    key: uuidv4(),
  };

  const userByEmail = await getByEmail(email);
  if (userByEmail && userByEmail.id !== param.id) {
    throw new CustomInputValidationError({
      email: "Email is taken",
    });
  }

  return await updateUser(data, param.id);
}

/**
 * Find a user by ID.
 *
 * @param {GetIdParam} params - the parameters for finding the user
 * @return {Promise<User>} the user found by ID
 */
export async function findById(params: GetIdParam): Promise<UserType> {
  const { id } = params;

  const user = await getById(id);
  if (!user) {
    throw new CustomNotFoundError();
  }
  return user;
}

/**
 * Find users by pagination.
 *
 * @param {GetPaginationQuery} querystring - the parameters for finding the user
 * @return {Promise<{user:UserType[]} & PaginationType>} the user found by ID
 */
export async function list(querystring: GetPaginationQuery): Promise<
  {
    user: UserType[];
  } & PaginationType
> {
  const { limit, offset } = getPaginationParams({
    page: querystring.page,
    size: querystring.limit,
  });
  const user = await paginate(limit, offset);
  const userCount = await count();
  return {
    user,
    ...getPaginationKeys({
      count: userCount,
      page: querystring.page,
      size: querystring.limit,
    }),
  };
}

/**
 * Destroys a user based on the provided parameters.
 *
 * @param {GetIdParam} params - the parameters for destroying the user
 * @return {Promise<User>} the destroyed user
 */
export async function destroy(params: GetIdParam): Promise<UserType> {
  const { id } = params;

  const user = await findById(params);
  await remove(id);
  return user;
}

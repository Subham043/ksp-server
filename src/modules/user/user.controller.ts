import { FastifyReply, FastifyRequest } from "fastify";
import {
  create,
  destroy,
  exportExcel,
  findById,
  importExcel,
  list,
  update,
  updatePassword,
} from "./user.services";
import {
  CreateUserBody,
  createUserUniqueEmailSchema,
} from "./schemas/create.schema";
import {
  UpdateUserBody,
  updateUserUniqueEmailSchema,
} from "./schemas/update.schema";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";
import { PostExcelBody } from "../../common/schemas/excel.schema";
import { UpdateUserPasswordBody } from "./schemas/passwordUpdate.schema";

export async function listUsers(
  request: FastifyRequest<{
    Querystring: GetPaginationQuery;
  }>,
  reply: FastifyReply
) {
  const result = await list(request.query);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Users Fetched",
    data: result,
  });
}

export async function exportUsers(
  request: FastifyRequest<{
    Querystring: GetSearchQuery;
  }>,
  reply: FastifyReply
) {
  const result = await exportExcel(request.query);
  reply
    .header("Content-Disposition", 'attachment; filename="countries.xlsx"')
    .send(result.file);
}

export async function importUsers(
  request: FastifyRequest<{
    Body: PostExcelBody;
  }>,
  reply: FastifyReply
) {
  const result = await importExcel(request.body);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Users Imported",
    data: result,
  });
}

/**
 * Retrieves a user based on the provided parameters.
 *
 * @param {FastifyRequest} request - the request object containing the parameters
 * @param {FastifyReply} reply - the reply object for sending the response
 * @return {Promise<void>} a promise resolving to the fetched user data
 */
export async function getUser(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await findById(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "User Fetched",
    data: result,
  });
}

/**
 * Creates a new user using the request body and sends back the result with a 201 status code.
 *
 * @param {FastifyRequest} request - the request object containing the user information
 * @param {FastifyReply} reply - the reply object for sending the response
 * @return {Promise<void>} A promise that resolves when the user is successfully created
 */
export async function createUser(
  request: FastifyRequest<{
    Body: CreateUserBody;
  }>,
  reply: FastifyReply
): Promise<void> {
  await createUserUniqueEmailSchema.parseAsync(request.body.email);
  const result = await create(request.body);
  return reply.code(201).type("application/json").send({
    code: 201,
    success: true,
    message: "User Created",
    data: result,
  });
}

/**
 * Update user information based on the request body and parameters.
 *
 * @param {FastifyRequest} request - The request object containing the body and parameters
 * @param {FastifyReply} reply - The reply object for sending the response
 * @return {Promise<void>} A promise that resolves when the user is successfully updated
 */
export async function updateUser(
  request: FastifyRequest<{
    Body: UpdateUserBody;
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  await updateUserUniqueEmailSchema.parseAsync({
    id: request.params.id,
    email: request.body.email,
  });
  const result = await update(request.body, request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "User Updated",
    data: result,
  });
}

export async function updateUserPwd(
  request: FastifyRequest<{
    Body: UpdateUserPasswordBody;
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await updatePassword(request.body, request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "User Updated",
    data: result,
  });
}

/**
 * Remove a user based on the request parameter.
 *
 * @param {FastifyRequest<{ Params: GetIdParam }>} request - The request object containing user parameters
 * @param {FastifyReply} reply - The reply object for sending the response
 * @return {Promise<void>} A promise that resolves after removing the user
 */
export async function removeUser(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await destroy(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "User Removed",
    data: result,
  });
}

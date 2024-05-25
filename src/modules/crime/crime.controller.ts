import { FastifyReply, FastifyRequest } from "fastify";
import {
  create,
  destroy,
  exportExcel,
  findById,
  list,
  update,
} from "./crime.services";
import { createCrimeUniqueSchema } from "./schemas/create.schema";
import { updateCrimeUniqueSchema } from "./schemas/update.schema";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import { CrimeCreateType, CrimeUpdateType } from "../../@types/crime.type";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";

export async function listCrimes(
  request: FastifyRequest<{
    Querystring: GetPaginationQuery;
  }>,
  reply: FastifyReply
) {
  const result = await list(request.query);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crimes Fetched",
    data: result,
  });
}

export async function exportCrimes(
  request: FastifyRequest<{
    Querystring: GetSearchQuery;
  }>,
  reply: FastifyReply
) {
  const result = await exportExcel(request.query);
  return reply
    .header("Content-Disposition", 'attachment; filename="crimes.xlsx"')
    .send(result.file);
}

/**
 * Retrieves a criminal based on the provided parameters.
 *
 * @param {FastifyRequest} request - the request object containing the parameters
 * @param {FastifyReply} reply - the reply object for sending the response
 * @return {Promise<void>} a promise resolving to the fetched criminal data
 */
export async function getCrime(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await findById(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crime Fetched",
    data: result,
  });
}

/**
 * Creates a new criminal using the request body and sends back the result with a 201 status code.
 *
 * @param {FastifyRequest} request - the request object containing the criminal information
 * @param {FastifyReply} reply - the reply object for sending the response
 * @return {Promise<void>} A promise that resolves when the criminal is successfully created
 */
export async function createCrime(
  request: FastifyRequest<{
    Body: CrimeCreateType;
  }>,
  reply: FastifyReply
): Promise<void> {
  await createCrimeUniqueSchema.parseAsync({
    criminals: request.body.criminals,
  });
  const result = await create(request.body, request.authenticatedUser!.id);
  return reply.code(201).type("application/json").send({
    code: 201,
    success: true,
    message: "Crime Created",
    data: result,
  });
}

/**
 * Update criminal information based on the request body and parameters.
 *
 * @param {FastifyRequest} request - The request object containing the body and parameters
 * @param {FastifyReply} reply - The reply object for sending the response
 * @return {Promise<void>} A promise that resolves when the criminal is successfully updated
 */
export async function updateCrime(
  request: FastifyRequest<{
    Body: CrimeUpdateType;
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  await updateCrimeUniqueSchema.parseAsync({
    id: request.params.id,
    criminals: request.body.criminals,
  });
  const result = await update(request.body, request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crime Updated",
    data: result,
  });
}

/**
 * Remove a criminal based on the request parameter.
 *
 * @param {FastifyRequest<{ Params: GetIdParam }>} request - The request object containing criminal parameters
 * @param {FastifyReply} reply - The reply object for sending the response
 * @return {Promise<void>} A promise that resolves after removing the criminal
 */
export async function removeCrime(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await destroy(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crime Removed",
    data: result,
  });
}

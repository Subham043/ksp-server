import { FastifyReply, FastifyRequest } from "fastify";
import {
  create,
  destroy,
  exportExcel,
  findById,
  importExcel,
  list,
  update,
} from "./jail.services";
import { createJailUniqueSchema } from "./schemas/create.schema";
import { updateJailUniqueSchema } from "./schemas/update.schema";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import { JailCreateType, JailUpdateType } from "../../@types/jail.type";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";
import { PostExcelBody } from "../../common/schemas/excel.schema";

export async function listJails(
  request: FastifyRequest<{
    Querystring: GetPaginationQuery;
  }>,
  reply: FastifyReply
) {
  const result = await list(request.query);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Jails Fetched",
    data: result,
  });
}

export async function exportJails(
  request: FastifyRequest<{
    Querystring: GetSearchQuery;
  }>,
  reply: FastifyReply
) {
  const result = await exportExcel(request.query);
  return reply
    .header("Content-Disposition", 'attachment; filename="jailDetails.xlsx"')
    .send(result.file);
}

/**
 * Retrieves a criminal based on the provided parameters.
 *
 * @param {FastifyRequest} request - the request object containing the parameters
 * @param {FastifyReply} reply - the reply object for sending the response
 * @return {Promise<void>} a promise resolving to the fetched criminal data
 */
export async function getJail(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await findById(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Jail Fetched",
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
export async function createJail(
  request: FastifyRequest<{
    Body: JailCreateType;
  }>,
  reply: FastifyReply
): Promise<void> {
  await createJailUniqueSchema.parseAsync({
    crimeId: request.body.crimeId,
    criminalId: request.body.criminalId,
  });
  const result = await create(request.body);
  return reply.code(201).type("application/json").send({
    code: 201,
    success: true,
    message: "Jail Created",
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
export async function updateJail(
  request: FastifyRequest<{
    Body: JailUpdateType;
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  await updateJailUniqueSchema.parseAsync({
    id: request.params.id,
    crimeId: request.body.crimeId,
    criminalId: request.body.criminalId,
  });
  const result = await update(request.body, request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Jail Updated",
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
export async function removeJail(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await destroy(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Jail Removed",
    data: result,
  });
}

export async function importJails(
  request: FastifyRequest<{
    Body: PostExcelBody;
  }>,
  reply: FastifyReply
) {
  const result = await importExcel(request.body, request.authenticatedUser!.id);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Jails Imported",
    data: result,
  });
}

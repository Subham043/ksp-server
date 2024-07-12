import { FastifyReply, FastifyRequest } from "fastify";
import {
  create,
  destroy,
  exportExcel,
  findById,
  importExcel,
  list,
  update,
} from "./crimesByCriminals.services";
import { createCrimesByCriminalsUniqueSchema } from "./schemas/create.schema";
import { updateCrimesByCriminalsUniqueSchema } from "./schemas/update.schema";
import {
  GetCrimeIdAndIdParam,
  GetCrimeIdParam,
  GetIdParam,
} from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import {
  CrimesByCriminalsCreateType,
  CrimesByCriminalsUpdateType,
} from "../../@types/crimesByCriminals.type";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";
import { PostExcelBody } from "../../common/schemas/excel.schema";

export async function listCrimesByCriminals(
  request: FastifyRequest<{
    Querystring: GetPaginationQuery;
    Params: GetCrimeIdParam;
  }>,
  reply: FastifyReply
) {
  const result = await list(request.query, request.params.crimeId);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crimes By Criminals Fetched",
    data: result,
  });
}

export async function exportCrimesByCriminals(
  request: FastifyRequest<{
    Querystring: GetSearchQuery;
    Params: GetCrimeIdParam;
  }>,
  reply: FastifyReply
) {
  const result = await exportExcel(request.query, request.params.crimeId);
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
export async function getCrimesByCriminals(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await findById(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crimes By Criminals Fetched",
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
export async function createCrimesByCriminals(
  request: FastifyRequest<{
    Body: CrimesByCriminalsCreateType;
    Params: GetCrimeIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  await createCrimesByCriminalsUniqueSchema.parseAsync({
    criminalId: request.body.criminalId,
    crimeId: request.params.crimeId,
  });
  const result = await create(request.body, request.params.crimeId);
  return reply.code(201).type("application/json").send({
    code: 201,
    success: true,
    message: "Crimes By Criminals Created",
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
export async function updateCrimesByCriminals(
  request: FastifyRequest<{
    Body: CrimesByCriminalsUpdateType;
    Params: GetCrimeIdAndIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  await updateCrimesByCriminalsUniqueSchema.parseAsync({
    id: request.params.id,
    crimeId: request.params.crimeId,
    criminalId: request.body.criminalId,
  });
  const result = await update(request.body, request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crimes By Criminals Updated",
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
export async function removeCrimesByCriminals(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await destroy(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crimes By Criminals Removed",
    data: result,
  });
}

export async function importCrimesByCriminals(
  request: FastifyRequest<{
    Body: PostExcelBody;
    Params: GetCrimeIdParam;
  }>,
  reply: FastifyReply
) {
  const result = await importExcel(request.body, request.params.crimeId);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crimes By Criminals Imported",
    data: result,
  });
}

import { FastifyReply, FastifyRequest } from "fastify";
import {
  create,
  destroy,
  exportExcel,
  findById,
  list,
} from "./installation.services";
import { CreateInstallationBody } from "./schemas/create.schema";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";

export async function listInstallations(
  request: FastifyRequest<{
    Querystring: GetPaginationQuery;
  }>,
  reply: FastifyReply
) {
  const result = await list(request.query);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Installations Fetched",
    data: result,
  });
}

export async function exportInstallations(
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

/**
 * Retrieves a installation based on the provided parameters.
 *
 * @param {FastifyRequest} request - the request object containing the parameters
 * @param {FastifyReply} reply - the reply object for sending the response
 * @return {Promise<void>} a promise resolving to the fetched installation data
 */
export async function getInstallation(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await findById(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Installation Fetched",
    data: result,
  });
}

/**
 * Creates a new installation using the request body and sends back the result with a 201 status code.
 *
 * @param {FastifyRequest} request - the request object containing the installation information
 * @param {FastifyReply} reply - the reply object for sending the response
 * @return {Promise<void>} A promise that resolves when the installation is successfully created
 */
export async function createInstallation(
  request: FastifyRequest<{
    Body: CreateInstallationBody;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await create(request.body);
  return reply.code(201).type("application/json").send({
    code: 201,
    success: true,
    message: "Installation Created",
    data: result,
  });
}

/**
 * Remove a installation based on the request parameter.
 *
 * @param {FastifyRequest<{ Params: GetIdParam }>} request - The request object containing installation parameters
 * @param {FastifyReply} reply - The reply object for sending the response
 * @return {Promise<void>} A promise that resolves after removing the installation
 */
export async function removeInstallation(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await destroy(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Installation Removed",
    data: result,
  });
}

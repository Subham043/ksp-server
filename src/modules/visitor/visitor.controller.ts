import { FastifyReply, FastifyRequest } from "fastify";
import {
  create,
  destroy,
  exportExcel,
  findById,
  list,
  update,
} from "./visitor.services";
import { jailExistSchema } from "./schemas/create.schema";
import {
  GetIdParam,
  GetJailIdParam,
} from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import {
  VisitorCreateType,
  VisitorUpdateType,
} from "../../@types/visitor.type";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";

export async function listVisitors(
  request: FastifyRequest<{
    Querystring: GetPaginationQuery;
    Params: GetJailIdParam;
  }>,
  reply: FastifyReply
) {
  const result = await list(request.query, request.params.jailId);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Visitors Fetched",
    data: result,
  });
}

export async function exportVisitors(
  request: FastifyRequest<{
    Querystring: GetSearchQuery;
    Params: GetJailIdParam;
  }>,
  reply: FastifyReply
) {
  const result = await exportExcel(request.query, request.params.jailId);
  return reply
    .header("Content-Disposition", 'attachment; filename="visitorDetails.xlsx"')
    .send(result.file);
}

/**
 * Retrieves a criminal based on the provided parameters.
 *
 * @param {FastifyRequest} request - the request object containing the parameters
 * @param {FastifyReply} reply - the reply object for sending the response
 * @return {Promise<void>} a promise resolving to the fetched criminal data
 */
export async function getVisitor(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await findById(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Visitor Fetched",
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
export async function createVisitor(
  request: FastifyRequest<{
    Body: VisitorCreateType;
    Params: GetJailIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  await jailExistSchema.parseAsync({
    jailId: request.params.jailId,
  });
  const result = await create(request.body, request.params.jailId);
  return reply.code(201).type("application/json").send({
    code: 201,
    success: true,
    message: "Visitor Created",
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
export async function updateVisitor(
  request: FastifyRequest<{
    Body: VisitorUpdateType;
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await update(request.body, request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Visitor Updated",
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
export async function removeVisitor(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await destroy(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Visitor Removed",
    data: result,
  });
}

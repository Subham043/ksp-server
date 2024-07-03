import { FastifyReply, FastifyRequest } from "fastify";
import {
  create,
  destroy,
  exportExcel,
  findById,
  list,
  update,
} from "./hearing.services";
import { courtExistSchema } from "./schemas/create.schema";
import {
  GetIdParam,
  GetCourtIdParam,
} from "../../common/schemas/id_param.schema";
import { GetPaginationQuery } from "../../common/schemas/pagination_query.schema";
import {
  HearingCreateType,
  HearingUpdateType,
} from "../../@types/hearing.type";
import { GetSearchQuery } from "../../common/schemas/search_query.schema";

export async function listHearings(
  request: FastifyRequest<{
    Querystring: GetPaginationQuery;
    Params: GetCourtIdParam;
  }>,
  reply: FastifyReply
) {
  const result = await list(request.query, request.params.courtId);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Hearings Fetched",
    data: result,
  });
}

export async function exportHearings(
  request: FastifyRequest<{
    Querystring: GetSearchQuery;
    Params: GetCourtIdParam;
  }>,
  reply: FastifyReply
) {
  const result = await exportExcel(request.query, request.params.courtId);
  return reply
    .header("Content-Disposition", 'attachment; filename="hearingDetails.xlsx"')
    .send(result.file);
}

/**
 * Retrieves a criminal based on the provided parameters.
 *
 * @param {FastifyRequest} request - the request object containing the parameters
 * @param {FastifyReply} reply - the reply object for sending the response
 * @return {Promise<void>} a promise resolving to the fetched criminal data
 */
export async function getHearing(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await findById(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Hearing Fetched",
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
export async function createHearing(
  request: FastifyRequest<{
    Body: HearingCreateType;
    Params: GetCourtIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  await courtExistSchema.parseAsync({
    courtId: request.params.courtId,
  });
  const result = await create(request.body, request.params.courtId);
  return reply.code(201).type("application/json").send({
    code: 201,
    success: true,
    message: "Hearing Created",
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
export async function updateHearing(
  request: FastifyRequest<{
    Body: HearingUpdateType;
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await update(request.body, request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Hearing Updated",
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
export async function removeHearing(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  const result = await destroy(request.params);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Hearing Removed",
    data: result,
  });
}

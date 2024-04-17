import { FastifyInstance } from "fastify";
import {
  createCriminal,
  exportCriminals,
  getCriminal,
  listCriminals,
  removeCriminal,
  updateCriminal,
} from "./criminal.controller";
import { updateCriminalBodySchema } from "./schemas/update.schema";
import { getPaginationQuerySchema } from "../../common/schemas/pagination_query.schema";
import { getIdParamSchema } from "../../common/schemas/id_param.schema";
import { createCriminalBodySchema } from "./schemas/create.schema";
import { getSearchQuerySchema } from "../../common/schemas/search_query.schema";

export async function criminalRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: { querystring: getPaginationQuerySchema },
      preHandler: app.verifyJwt,
    },
    listCriminals
  );
  app.get(
    "/export",
    {
      schema: { querystring: getSearchQuerySchema },
      preHandler: app.verifyJwt,
    },
    exportCriminals
  );
  app.get(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    getCriminal
  );
  app.post(
    "/",
    {
      schema: { body: createCriminalBodySchema },
      preHandler: app.verifyJwt,
    },
    createCriminal
  );
  app.put(
    "/:id",
    {
      schema: { body: updateCriminalBodySchema, params: getIdParamSchema },
      preHandler: app.verifyJwt,
    },
    updateCriminal
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    removeCriminal
  );
}

import { FastifyInstance } from "fastify";
import {
  createCrime,
  exportCrimes,
  getCrime,
  listCrimes,
  removeCrime,
  updateCrime,
} from "./crime.controller";
import { updateCrimeBodySchema } from "./schemas/update.schema";
import { getPaginationQuerySchema } from "../../common/schemas/pagination_query.schema";
import { getIdParamSchema } from "../../common/schemas/id_param.schema";
import { createCrimeBodySchema } from "./schemas/create.schema";
import { getSearchQuerySchema } from "../../common/schemas/search_query.schema";

export async function crimeRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: { querystring: getPaginationQuerySchema },
      preHandler: app.verifyJwt,
    },
    listCrimes
  );
  app.get(
    "/export",
    {
      schema: { querystring: getSearchQuerySchema },
      preHandler: app.verifyJwt,
    },
    exportCrimes
  );
  app.get(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    getCrime
  );
  app.post(
    "/",
    {
      schema: { body: createCrimeBodySchema },
      preHandler: app.verifyJwt,
    },
    createCrime
  );
  app.put(
    "/:id",
    {
      schema: { body: updateCrimeBodySchema, params: getIdParamSchema },
      preHandler: app.verifyJwt,
    },
    updateCrime
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    removeCrime
  );
}

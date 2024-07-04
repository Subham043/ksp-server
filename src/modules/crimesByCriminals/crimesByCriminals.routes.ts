import { FastifyInstance } from "fastify";
import {
  createCrimesByCriminals,
  exportCrimesByCriminals,
  getCrimesByCriminals,
  listCrimesByCriminals,
  removeCrimesByCriminals,
  updateCrimesByCriminals,
} from "./crimesByCriminals.controller";
import { updateCrimesByCriminalsBodySchema } from "./schemas/update.schema";
import { getPaginationQuerySchema } from "../../common/schemas/pagination_query.schema";
import {
  getCrimeIdAndIdParamSchema,
  getCrimeIdParamSchema,
  getIdParamSchema,
} from "../../common/schemas/id_param.schema";
import { createCrimesByCriminalsBodySchema } from "./schemas/create.schema";
import { getSearchQuerySchema } from "../../common/schemas/search_query.schema";

export async function crimesByCriminalsRoutes(app: FastifyInstance) {
  app.get(
    "/list/:crimeId",
    {
      schema: {
        querystring: getPaginationQuerySchema,
        params: getCrimeIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    listCrimesByCriminals
  );
  app.get(
    "/export/:crimeId",
    {
      schema: {
        querystring: getSearchQuerySchema,
        params: getCrimeIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    exportCrimesByCriminals
  );
  app.post(
    "/create/:crimeId",
    {
      schema: {
        body: createCrimesByCriminalsBodySchema,
        params: getCrimeIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    createCrimesByCriminals
  );
  app.put(
    "/update/:id/:crimeId",
    {
      schema: {
        body: updateCrimesByCriminalsBodySchema,
        params: getCrimeIdAndIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    updateCrimesByCriminals
  );
  app.get(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    getCrimesByCriminals
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    removeCrimesByCriminals
  );
}

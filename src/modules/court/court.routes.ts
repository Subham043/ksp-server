import { FastifyInstance } from "fastify";
import {
  createCourt,
  exportCourts,
  getCourt,
  importCourts,
  listCourts,
  removeCourt,
  updateCourt,
} from "./court.controller";
import { updateCourtBodySchema } from "./schemas/update.schema";
import { getPaginationQuerySchema } from "../../common/schemas/pagination_query.schema";
import { getIdParamSchema } from "../../common/schemas/id_param.schema";
import { createCourtBodySchema } from "./schemas/create.schema";
import { getSearchQuerySchema } from "../../common/schemas/search_query.schema";
import { postExcelBodySchema } from "../../common/schemas/excel.schema";

export async function courtRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: { querystring: getPaginationQuerySchema },
      preHandler: app.verifyJwt,
    },
    listCourts
  );
  app.get(
    "/export",
    {
      schema: { querystring: getSearchQuerySchema },
      preHandler: app.verifyJwt,
    },
    exportCourts
  );
  app.post(
    "/import",
    {
      schema: { body: postExcelBodySchema },
      preHandler: app.verifyJwt,
    },
    importCourts
  );
  app.get(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    getCourt
  );
  app.post(
    "/",
    {
      schema: { body: createCourtBodySchema },
      preHandler: app.verifyJwt,
    },
    createCourt
  );
  app.put(
    "/:id",
    {
      schema: { body: updateCourtBodySchema, params: getIdParamSchema },
      preHandler: app.verifyJwt,
    },
    updateCourt
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    removeCourt
  );
}

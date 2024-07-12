import { FastifyInstance } from "fastify";
import {
  createJail,
  exportJails,
  getJail,
  importJails,
  listJails,
  removeJail,
  updateJail,
} from "./jail.controller";
import { updateJailBodySchema } from "./schemas/update.schema";
import { getPaginationQuerySchema } from "../../common/schemas/pagination_query.schema";
import { getIdParamSchema } from "../../common/schemas/id_param.schema";
import { createJailBodySchema } from "./schemas/create.schema";
import { getSearchQuerySchema } from "../../common/schemas/search_query.schema";
import { postExcelBodySchema } from "../../common/schemas/excel.schema";

export async function jailRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: { querystring: getPaginationQuerySchema },
      preHandler: app.verifyJwt,
    },
    listJails
  );
  app.get(
    "/export",
    {
      schema: { querystring: getSearchQuerySchema },
      preHandler: app.verifyJwt,
    },
    exportJails
  );
  app.post(
    "/import",
    {
      schema: { body: postExcelBodySchema },
      preHandler: app.verifyJwt,
    },
    importJails
  );
  app.get(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    getJail
  );
  app.post(
    "/",
    {
      schema: { body: createJailBodySchema },
      preHandler: app.verifyJwt,
    },
    createJail
  );
  app.put(
    "/:id",
    {
      schema: { body: updateJailBodySchema, params: getIdParamSchema },
      preHandler: app.verifyJwt,
    },
    updateJail
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    removeJail
  );
}

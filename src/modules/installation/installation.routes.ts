import { FastifyInstance } from "fastify";
import {
  createInstallation,
  exportInstallations,
  getInstallation,
  listInstallations,
  removeInstallation,
} from "./installation.controller";
import { getPaginationQuerySchema } from "../../common/schemas/pagination_query.schema";
import { getIdParamSchema } from "../../common/schemas/id_param.schema";
import { createInstallationBodySchema } from "./schemas/create.schema";
import { getSearchQuerySchema } from "../../common/schemas/search_query.schema";

export async function installationRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: { querystring: getPaginationQuerySchema },
      preHandler: app.verifyAdmin,
    },
    listInstallations
  );
  app.get(
    "/export",
    {
      schema: { querystring: getSearchQuerySchema },
      preHandler: app.verifyAdmin,
    },
    exportInstallations
  );
  app.get(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyAdmin,
    },
    getInstallation
  );
  app.post(
    "/",
    {
      schema: { body: createInstallationBodySchema },
    },
    createInstallation
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyAdmin,
    },
    removeInstallation
  );
}

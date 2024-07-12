import { FastifyInstance } from "fastify";
import {
  createVisitor,
  exportVisitors,
  getVisitor,
  importVisitors,
  listVisitors,
  removeVisitor,
  updateVisitor,
} from "./visitor.controller";
import { updateVisitorBodySchema } from "./schemas/update.schema";
import { getPaginationQuerySchema } from "../../common/schemas/pagination_query.schema";
import {
  getIdParamSchema,
  getJailIdParamSchema,
} from "../../common/schemas/id_param.schema";
import { createVisitorBodySchema } from "./schemas/create.schema";
import { getSearchQuerySchema } from "../../common/schemas/search_query.schema";
import { postExcelBodySchema } from "../../common/schemas/excel.schema";

export async function visitorRoutes(app: FastifyInstance) {
  app.get(
    "/list/:jailId",
    {
      schema: {
        querystring: getPaginationQuerySchema,
        params: getJailIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    listVisitors
  );
  app.get(
    "/export/:jailId",
    {
      schema: {
        querystring: getSearchQuerySchema,
        params: getJailIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    exportVisitors
  );
  app.post(
    "/import/:jailId",
    {
      schema: { body: postExcelBodySchema, params: getJailIdParamSchema },
      preHandler: app.verifyJwt,
    },
    importVisitors
  );
  app.post(
    "/create/:jailId",
    {
      schema: { body: createVisitorBodySchema, params: getJailIdParamSchema },
      preHandler: app.verifyJwt,
    },
    createVisitor
  );
  app.get(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    getVisitor
  );
  app.put(
    "/:id",
    {
      schema: { body: updateVisitorBodySchema, params: getIdParamSchema },
      preHandler: app.verifyJwt,
    },
    updateVisitor
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    removeVisitor
  );
}

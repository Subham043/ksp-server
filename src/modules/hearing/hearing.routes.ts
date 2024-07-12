import { FastifyInstance } from "fastify";
import {
  createHearing,
  exportHearings,
  getHearing,
  importHearings,
  listHearings,
  removeHearing,
  updateHearing,
} from "./hearing.controller";
import { updateHearingBodySchema } from "./schemas/update.schema";
import { getPaginationQuerySchema } from "../../common/schemas/pagination_query.schema";
import {
  getIdParamSchema,
  getCourtIdParamSchema,
} from "../../common/schemas/id_param.schema";
import { createHearingBodySchema } from "./schemas/create.schema";
import { getSearchQuerySchema } from "../../common/schemas/search_query.schema";
import { postExcelBodySchema } from "../../common/schemas/excel.schema";

export async function hearingRoutes(app: FastifyInstance) {
  app.get(
    "/list/:courtId",
    {
      schema: {
        querystring: getPaginationQuerySchema,
        params: getCourtIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    listHearings
  );
  app.get(
    "/export/:courtId",
    {
      schema: {
        querystring: getSearchQuerySchema,
        params: getCourtIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    exportHearings
  );
  app.post(
    "/import/:courtId",
    {
      schema: { body: postExcelBodySchema, params: getCourtIdParamSchema },
      preHandler: app.verifyJwt,
    },
    importHearings
  );
  app.post(
    "/create/:courtId",
    {
      schema: { body: createHearingBodySchema, params: getCourtIdParamSchema },
      preHandler: app.verifyJwt,
    },
    createHearing
  );
  app.get(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    getHearing
  );
  app.put(
    "/:id",
    {
      schema: { body: updateHearingBodySchema, params: getIdParamSchema },
      preHandler: app.verifyJwt,
    },
    updateHearing
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    removeHearing
  );
}

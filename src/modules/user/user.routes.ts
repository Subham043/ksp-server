import { FastifyInstance } from "fastify";
import {
  createUser,
  exportUsers,
  getUser,
  importUsers,
  listUsers,
  removeUser,
  updateUser,
  updateUserPwd,
} from "./user.controller";
import { updateUserBodySchema } from "./schemas/update.schema";
import { getPaginationQuerySchema } from "../../common/schemas/pagination_query.schema";
import { getIdParamSchema } from "../../common/schemas/id_param.schema";
import { createUserBodySchema } from "./schemas/create.schema";
import { getSearchQuerySchema } from "../../common/schemas/search_query.schema";
import { postExcelBodySchema } from "../../common/schemas/excel.schema";
import { updateUserPasswordBodySchema } from "./schemas/passwordUpdate.schema";

export async function userRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: { querystring: getPaginationQuerySchema },
      preHandler: app.verifyAdmin,
    },
    listUsers
  );
  app.get(
    "/export",
    {
      schema: { querystring: getSearchQuerySchema },
      preHandler: app.verifyAdmin,
    },
    exportUsers
  );
  app.post(
    "/import",
    {
      schema: { body: postExcelBodySchema },
      preHandler: app.verifyAdmin,
    },
    importUsers
  );
  app.put(
    "/password/:id",
    {
      schema: { body: updateUserPasswordBodySchema, params: getIdParamSchema },
      preHandler: app.verifyAdmin,
    },
    updateUserPwd
  );
  app.get(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyAdmin,
    },
    getUser
  );
  app.post(
    "/",
    {
      schema: { body: createUserBodySchema },
      preHandler: app.verifyAdmin,
    },
    createUser
  );
  app.put(
    "/:id",
    {
      schema: { body: updateUserBodySchema, params: getIdParamSchema },
      preHandler: app.verifyAdmin,
    },
    updateUser
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyAdmin,
    },
    removeUser
  );
}

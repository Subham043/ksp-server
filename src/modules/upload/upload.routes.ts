import { FastifyInstance } from "fastify";
import { getUuidParamSchema } from "../../common/schemas/uuid_param.schema";
import { downloadFailedExcel } from "./upload.controller";

export async function uploadRoutes(app: FastifyInstance) {
  app.get(
    "/failed-excel/:id",
    {
      schema: {
        params: getUuidParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    downloadFailedExcel
  );
}

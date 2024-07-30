import { FastifyInstance } from "fastify";
import { getUuidParamSchema } from "../../common/schemas/uuid_param.schema";
import {
  downloadFailedExcel,
  downloadSampleExcel,
  sendImageStream,
  sendLogoStream,
} from "./upload.controller";

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
  app.get(
    "/sample-excel/:id",
    {
      schema: {
        params: getUuidParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    downloadSampleExcel
  );
  app.get(
    "/images/:id",
    {
      schema: {
        params: getUuidParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    sendImageStream
  );
  app.get(
    "/logo",
    {
      preHandler: app.verifyJwt,
    },
    sendLogoStream
  );
}

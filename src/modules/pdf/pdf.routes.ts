import { FastifyInstance } from "fastify";
import { downloadCrimePdf } from "./pdf.controller";
import { getIdParamSchema } from "../../common/schemas/id_param.schema";

export async function pdfRoutes(app: FastifyInstance) {
  app.get(
    "/crime/:id",
    {
      schema: {
        params: getIdParamSchema,
      },
      preHandler: app.verifyJwt,
    },
    downloadCrimePdf
  );
}

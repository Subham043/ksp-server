import { FastifyReply, FastifyRequest } from "fastify";
import ejs from "ejs";
import { generatePdf } from "../../utils/pdf";
import { InvalidRequestError } from "../../utils/exceptions";
import { GetIdParam } from "../../common/schemas/id_param.schema";
import { findByIdForPdf as findCrimeById } from "../crime/crime.services";
import env from "../../config/env";

export async function downloadCrimePdf(
  request: FastifyRequest<{
    Params: GetIdParam;
  }>,
  reply: FastifyReply
): Promise<string> {
  const data = await findCrimeById(request.params);
  try {
    const template = await ejs.renderFile("views/pdf/crime.ejs", {
      data,
      main_url: env.MAIN_URL,
      token: request.authenticatedUser?.access_token,
    });
    const buffer = await generatePdf(
      template,
      "crime_" + request.params.id + ".pdf"
    );
    return reply
      .header("Content-Disposition", 'attachment; filename="Crime.pdf"')
      .send(buffer);
  } catch (error) {
    throw new InvalidRequestError("Something went wrong! Please try again.");
  }
}

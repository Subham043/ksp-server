import { FastifyReply, FastifyRequest } from "fastify";
import {
  courtCount,
  crimeCount,
  criminalCount,
  jailCount,
} from "./dashboard.services";

export async function dashboard(request: FastifyRequest, reply: FastifyReply) {
  const result = {
    crimes: await crimeCount(),
    criminals: await criminalCount(),
    courts: await courtCount(),
    punishments: await jailCount(),
  };
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Crimes Fetched",
    data: result,
  });
}

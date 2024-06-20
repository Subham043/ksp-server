import { FastifyInstance } from "fastify";
import { dashboard } from "./dashboard.controller";

export async function dashboardRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: app.verifyJwt,
    },
    dashboard
  );
}

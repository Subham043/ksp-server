import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import bcrypt from "fastify-bcrypt";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import auth from "@fastify/auth";
import multipartFileUpload from "fastify-file-upload";
import mailer from "fastify-mailer";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import fastifyView from "@fastify/view";
import { logger } from "./logger";
import { corsOptions } from "../constants/corsOptions";
import { helmetOptions } from "../constants/helmetOptions";
import { userRoutes } from "../modules/user/user.routes";
import { mailOptions } from "../constants/mailOptions";
import { FastifyMailer } from "../@types/mail.type";
import { authRoutes } from "../modules/auth/auth.routes";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import env from "../config/env";
import {
  PreHandlerHookDecoratorType,
  ServerErrorHandler,
  verifyJwtDecorator,
} from "./decorator";
import { AuthType } from "../@types/user.type";
import closeWithGrace from "close-with-grace";
import { accountRoutes } from "../modules/account/account.routes";
import { uploadRoutes } from "../modules/upload/upload.routes";
import { criminalRoutes } from "../modules/criminal/criminal.routes";
import { crimeRoutes } from "../modules/crime/crime.routes";
import prisma from "../db";
import { courtRoutes } from "../modules/court/court.routes";
import { jailRoutes } from "../modules/jail/jail.routes";
import { pdfRoutes } from "../modules/pdf/pdf.routes";
import { dashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { visitorRoutes } from "../modules/visitor/visitor.routes";
import { hearingRoutes } from "../modules/hearing/hearing.routes";
import { crimesByCriminalsRoutes } from "../modules/crimesByCriminals/crimesByCriminals.routes";

declare module "fastify" {
  interface FastifyInstance {
    // mailer: FastifyMailType;
    mailer: FastifyMailer;
    verifyJwt: PreHandlerHookDecoratorType;
  }
  interface FastifyRequest {
    authenticatedUser: AuthType | undefined;
  }
}

export async function buildServer() {
  const server = await fastify({
    logger: logger,
    disableRequestLogging: env.NODE_ENV !== "production",
    ajv: {
      customOptions: {
        allErrors: true,
      },
      plugins: [require("ajv-errors")],
    },
  });

  await prisma.$connect();

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  server.setErrorHandler((error, request, reply) =>
    ServerErrorHandler(error, request, reply)
  );

  await server.register(fastifyRequestLogger);

  await server.register(jwt, {
    secret: env.JWT_KEY,
  });

  await server.register(cookie, {
    secret: env.JWT_KEY,
  });
  await server
    .decorate(
      "verifyJwt",
      (request: FastifyRequest, reply: FastifyReply, done) =>
        verifyJwtDecorator(request, reply, done)
    )
    .register(auth);

  await server.register(mailer, mailOptions);

  await server.register(cors, corsOptions);

  await server.register(helmet, helmetOptions);

  await server.register(multipartFileUpload, {
    safeFileNames: true,
    uriDecodeFileNames: true,
    preserveExtension: false,
    useTempFiles: true,
    tempFileDir: "../../static/temp",
    parseNested: true,
    debug: false,
  });

  await server.register(bcrypt, {
    saltWorkFactor: 12,
  });

  await server.register(fastifyView, {
    engine: {
      ejs: require("ejs"),
    },
    production: false,
  });

  await server.register(authRoutes, { prefix: "/api/auth" });
  await server.register(userRoutes, { prefix: "/api/users" });
  await server.register(criminalRoutes, { prefix: "/api/criminals" });
  await server.register(crimeRoutes, { prefix: "/api/crimes" });
  await server.register(crimesByCriminalsRoutes, {
    prefix: "/api/crimes-by-criminals",
  });
  await server.register(courtRoutes, { prefix: "/api/courts" });
  await server.register(hearingRoutes, { prefix: "/api/hearings" });
  await server.register(jailRoutes, { prefix: "/api/jails" });
  await server.register(visitorRoutes, { prefix: "/api/visitors" });
  await server.register(accountRoutes, { prefix: "/api/account" });
  await server.register(uploadRoutes, { prefix: "/api/upload" });
  await server.register(pdfRoutes, { prefix: "/api/pdf" });
  await server.register(dashboardRoutes, { prefix: "/api/dashboard" });

  // delay is the number of milliseconds for the graceful close to finish
  const closeListeners = closeWithGrace(
    { delay: env.CLOSE_GRACE_DELAY || 500 },
    async function ({ signal, err, manual }) {
      server.log.info("Closing server...");
      if (err) {
        server.log.error(err);
      }
      await prisma.$disconnect();
      await server.close();
    } as closeWithGrace.CloseWithGraceAsyncCallback
  );

  server.addHook("onClose", (instance, done) => {
    closeListeners.uninstall();
    done();
  });

  await server.ready();

  return server;
}

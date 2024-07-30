import {
  FastifyBaseLogger,
  FastifyError,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProviderDefault,
  RawServerDefault,
  preHandlerHookHandler,
} from "fastify";
import { IncomingMessage, ServerResponse } from "http";
import { UnauthorizedError } from "./exceptions";
import { AuthType } from "../@types/user.type";
import { getById } from "../modules/user/user.repository";
import { ZodError } from "zod";
import env from "../config/env";
import { deleteToken, getToken } from "../modules/auth/auth.repository";

export type PreHandlerHookDecoratorType = preHandlerHookHandler<
  RawServerDefault,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  unknown,
  FastifySchema,
  FastifyTypeProviderDefault,
  FastifyBaseLogger
>;

export const ServerErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  request.server.log.error(error);
  if (error instanceof ZodError) {
    return reply.status(422).type("application/json").send({
      statusCode: 422,
      success: false,
      message: "Bad Request",
      formErrors: error.formErrors.fieldErrors,
    });
  }
  return reply
    .status(error.statusCode || 500)
    .type("application/json")
    .send({
      // ...error,
      message: error.message || "Internal Server Error",
      statusCode: error.statusCode || 500,
      success: false,
    });
};

export const verifyJwtDecorator = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  try {
    const customRequestQuery = request.query as { token?: string };
    const authQuery = customRequestQuery.token ?? undefined;
    const authHeader = request.headers.authorization ?? undefined;
    const authCookie = request.cookies[env.APP_NAME + "_Auth"] ?? undefined;
    if (authHeader || authQuery || authCookie) {
      const token =
        authCookie ||
        authQuery ||
        (authHeader ? authHeader.replace("Bearer ", "") : "");
      const user = request.server.jwt.verify<AuthType>(token);
      if (user) {
        const verifyUser = await getById(user.id);
        if (verifyUser && verifyUser.status === "active") {
          const getTokenData = await getToken({ token, userId: user.id });
          if (getTokenData.length > 0) {
            request.user = { ...user, ...verifyUser };
            request.authenticatedUser = {
              ...user,
              ...verifyUser,
              access_token: token,
            };
            return;
          }
          // done(); // pass an error if the authentication fails
        }
        await deleteToken({ token, userId: user.id });
        throw new UnauthorizedError();
      } else {
        throw new UnauthorizedError();
      }
    } else {
      throw new UnauthorizedError();
    }
  } catch (err) {
    throw new UnauthorizedError();
  }
};

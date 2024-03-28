import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateProfileBody } from "./schemas/profile.schema";
import { update } from "./account.services";
import { updateUserUniqueEmailSchema } from "../user/schemas/update.schema";

export async function getProfile(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Profile Fetched",
    data: request.authenticatedUser,
  });
}

export async function updateProfile(
  request: FastifyRequest<{
    Body: UpdateProfileBody;
  }>,
  reply: FastifyReply
): Promise<void> {
  await updateUserUniqueEmailSchema.parseAsync({
    id: request.authenticatedUser!.id,
    email: request.body.email,
  });
  const result = await update(request.body, request.authenticatedUser!.id);
  return reply.code(200).type("application/json").send({
    code: 200,
    success: true,
    message: "Profile Updated",
    data: result,
  });
}

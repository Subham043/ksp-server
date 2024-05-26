import { UserType } from "../../@types/user.type";
import prisma from "../../db";
import { ForgotPasswordBody } from "./schemas/forgot_password.schema";
import { AuthColumn, AuthTokenColumn } from "./auth.model";
import { Prisma } from "@prisma/client";

export async function getByEmail(
  email: string
): Promise<(UserType & { password: string }) | null> {
  return await prisma.user.findFirst({
    where: { email },
    select: AuthColumn,
  });
}

export async function forgotPassword(
  data: ForgotPasswordBody & { key: string }
): Promise<void> {
  await prisma.user.update({
    where: { email: data.email },
    data: {
      key: data.key,
    },
  });
}

export async function getByKey(key: string): Promise<{ id: number } | null> {
  return await prisma.user.findFirst({
    where: { key },
    select: {
      id: true,
    },
  });
}

export async function resetPassword(
  data: { password: string; key: string },
  id: number
): Promise<void> {
  await prisma.user.update({
    where: { id },
    data,
  });
}

export async function insertToken(
  data: Prisma.Args<typeof prisma.token, "create">["data"]
): Promise<void> {
  await prisma.token.create({
    data,
  });
}

export async function getToken(data: {
  token: string;
  userId: number;
}): Promise<{ id: number; token: string }[]> {
  return await prisma.token.findMany({
    select: {
      id: true,
      token: true,
      createdAt: true,
    },
    where: {
      token: data.token,
      userId: data.userId,
    },
  });
}

export async function deleteToken(data: {
  token: string;
  userId: number;
}): Promise<{ id: number; token: string; createdAt: Date | null } | null> {
  const result = await prisma.token.findFirst({
    select: AuthTokenColumn,
    where: {
      token: data.token,
      userId: data.userId,
    },
  });
  if (result !== null) {
    return await prisma.token.delete({
      select: AuthTokenColumn,
      where: {
        id: result.id,
        token: data.token,
        userId: data.userId,
      },
    });
  }
  return result;
}

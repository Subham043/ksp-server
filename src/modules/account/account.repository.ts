import prisma from "../../db";
import { UpdateProfileBody } from "./schemas/profile.schema";

export async function updateProfile(
  data: UpdateProfileBody,
  id: number
): Promise<{
  name: string;
  email: string;
}> {
  return await prisma.user.update({
    where: { id },
    data: data,
    select: {
      name: true,
      email: true,
    },
  });
}

export async function getById(
  id: number
): Promise<{ id: number; password: string } | null> {
  return await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      password: true,
    },
  });
}

export async function updatePassword(
  data: { password: string },
  id: number
): Promise<void> {
  await prisma.user.update({
    where: { id },
    data: data,
  });
}

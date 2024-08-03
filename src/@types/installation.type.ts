import { Prisma } from "@prisma/client";
import prisma from "../db";

export type InstallationType = {
  id: number;
  IPv4: string;
  createdAt: Date | null;
};

export type InstallationCreateType = Prisma.Args<
  typeof prisma.installation,
  "create"
>["data"];
export type InstallationUpdateType = Prisma.Args<
  typeof prisma.installation,
  "update"
>["data"];

import { z } from "zod";

export const createInstallationBodySchema = z.object({
  IPv4: z
    .string({
      errorMap: () => ({ message: "Name must be a string" }),
    })
    .trim(),
});

export type CreateInstallationBody = z.infer<
  typeof createInstallationBodySchema
>;

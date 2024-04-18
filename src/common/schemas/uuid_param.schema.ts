import { z } from "zod";

export const getUuidParamSchema = z
  .object({
    id: z.string({
      errorMap: () => ({ message: "ID must be a string" }),
    }),
  })
  .required();

export type GetUuidParam = z.infer<typeof getUuidParamSchema>;

export const getTokenQuerySchema = z.object({
  token: z.string({
    errorMap: () => ({ message: "Token must be a string" }),
  }),
});

export type GetTokenQuery = z.infer<typeof getTokenQuerySchema>;

import { z } from "zod";

export const getIdParamSchema = z
  .object({
    id: z
      .string({
        errorMap: () => ({ message: "ID must be a number" }),
      })
      .regex(/^\d+$/, { message: "ID must be a number" })
      .transform((value) => parseInt(value)),
  })
  .required();

export type GetIdParam = z.infer<typeof getIdParamSchema>;

export const getCompanyIdParamSchema = z
  .object({
    companyId: z
      .string({
        errorMap: () => ({ message: "Company ID must be a number" }),
      })
      .regex(/^\d+$/, { message: "Company ID must be a number" })
      .transform((value) => parseInt(value)),
  })
  .required();

export type GetCompanyIdParam = z.infer<typeof getCompanyIdParamSchema>;

export const getJailIdParamSchema = z
  .object({
    jailId: z
      .string({
        errorMap: () => ({ message: "Jail ID must be a number" }),
      })
      .regex(/^\d+$/, { message: "Jail ID must be a number" })
      .transform((value) => parseInt(value)),
  })
  .required();

export type GetJailIdParam = z.infer<typeof getJailIdParamSchema>;

export const getCourtIdParamSchema = z
  .object({
    courtId: z
      .string({
        errorMap: () => ({ message: "Court ID must be a number" }),
      })
      .regex(/^\d+$/, { message: "Court ID must be a number" })
      .transform((value) => parseInt(value)),
  })
  .required();

export type GetCourtIdParam = z.infer<typeof getCourtIdParamSchema>;

export const getCompanyIdAndIdParamSchema = z
  .object({
    id: z
      .string({
        errorMap: () => ({ message: "ID must be a number" }),
      })
      .regex(/^\d+$/, { message: "ID must be a number" })
      .transform((value) => parseInt(value)),
    companyId: z
      .string({
        errorMap: () => ({ message: "Company ID must be a number" }),
      })
      .regex(/^\d+$/, { message: "Company ID must be a number" })
      .transform((value) => parseInt(value)),
  })
  .required();

export type GetCompanyIdAndIdParam = z.infer<
  typeof getCompanyIdAndIdParamSchema
>;

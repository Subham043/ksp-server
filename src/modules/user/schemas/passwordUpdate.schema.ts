import { z } from "zod";

export const updateUserPasswordBodySchema = z.object({
  password: z
    .string({
      errorMap: () => ({ message: "Password must be a string" }),
    })
    .min(3, { message: "Password must be at least 3 characters" })
    .max(256, { message: "Password must be less than 256 characters" })
    .trim(),
  confirm_password: z
    .string({
      errorMap: () => ({ message: "Confirm Password must be a string" }),
    })
    .min(3, { message: "Confirm Password must be at least 3 characters" })
    .max(256, {
      message: "Confirm Password must be less than 256 characters",
    })
    .trim(),
});

export type UpdateUserPasswordBody = z.infer<
  typeof updateUserPasswordBodySchema
>;

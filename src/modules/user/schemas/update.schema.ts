import { z } from "zod";
import { getByEmail, getById } from "../user.repository";

export const updateUserBodySchema = z.object({
  name: z
    .string({
      errorMap: () => ({ message: "Name must be a string" }),
    })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(256, { message: "Name must be less than 256 characters" })
    .trim(),
  email: z
    .string({
      errorMap: () => ({ message: "Email must be a string" }),
    })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(256, { message: "Email must be less than 256 characters" })
    .email({ message: "Email must be a valid email" })
    .trim(),
  role: z.enum(["user", "admin"], {
    errorMap: () => ({
      message: "Role must be one of [user, admin]",
    }),
  }),
  status: z.enum(["active", "blocked"], {
    errorMap: () => ({
      message: "Role must be one of [active, blocked]",
    }),
  }),
});

export const updateUserUniqueEmailSchema = z
  .object({
    id: z
      .number({
        errorMap: () => ({ message: "Id must be number" }),
      })
      .positive({ message: "Id must be a positive number" })
      .superRefine(async (id, ctx) => {
        const user = await getById(id);
        if (!user) {
          ctx.addIssue({
            code: "custom",
            message: "Id doesn't exist",
            path: ["id"],
          });
          return false;
        }
      }),
    email: z
      .string({
        errorMap: () => ({ message: "Email must be a string" }),
      })
      .min(3, { message: "Email must be at least 3 characters" })
      .max(256, { message: "Email must be less than 256 characters" })
      .email({ message: "Email must be a valid email" })
      .trim(),
  })
  .superRefine(async ({ id, email }, ctx) => {
    const user = await getByEmail(email);
    if (user && user.id !== id) {
      ctx.addIssue({
        code: "custom",
        message: "Email is taken",
        path: ["email"],
      });
      return false;
    }
  });

export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;

import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { getIdJsonSchema } from "../../../common/schemas/id_param.schema";

const updateUserBodySchema = z.object({
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
  password: z
    .string({
      errorMap: () => ({ message: "Password must be a string" }),
    })
    .min(3, { message: "Password must be at least 3 characters" })
    .max(256, { message: "Password must be less than 256 characters" })
    .trim(),
});

export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;

export const updateUserJsonSchema = {
  body: zodToJsonSchema(updateUserBodySchema, {
    name: "updateUserBodySchema",
    errorMessages: true,
  }),
  ...getIdJsonSchema,
};

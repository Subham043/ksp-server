import { z } from "zod";

export const updateVisitorBodySchema = z.object({
  visitonDate: z
    .string({
      errorMap: () => ({ message: "Visiting Date must be a string" }),
    })
    .datetime({
      message: "Visiting Date must be a valid date",
    })
    .trim()
    .optional(),
  name: z
    .string({
      errorMap: () => ({ message: "Name must be a string" }),
    })
    .max(256, { message: "Name must be less than 256 characters" })
    .trim()
    .optional(),
  relation: z
    .string({
      errorMap: () => ({ message: "Relation must be a string" }),
    })
    .max(256, { message: "Relation must be less than 256 characters" })
    .trim()
    .optional(),
  additionalRemarks: z
    .string({
      errorMap: () => ({ message: "Additional Remarks must be a string" }),
    })
    .trim()
    .optional(),
});

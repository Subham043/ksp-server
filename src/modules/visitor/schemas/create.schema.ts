import { z } from "zod";
import { getById as getByJailId } from "../../jail/jail.repository";

export const createVisitorBodySchema = z.object({
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

export const jailExistSchema = z
  .object({
    jailId: z.number({
      errorMap: () => ({ message: "Jail Id must be a number" }),
    }),
  })
  .superRefine(async ({ jailId }, ctx) => {
    const jail = await getByJailId(jailId);
    if (!jail) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid Jail Id",
        path: ["jailId"],
      });
      return false;
    }
  });

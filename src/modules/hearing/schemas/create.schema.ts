import { z } from "zod";
import { getById as getByCourtId } from "../../court/court.repository";

export const createHearingBodySchema = z.object({
  hearingDate: z
    .string({
      errorMap: () => ({ message: "Hearing Date must be a string" }),
    })
    .datetime({
      message: "Hearing Date must be a valid date",
    })
    .trim()
    .optional(),
  nextHearingDate: z
    .string({
      errorMap: () => ({ message: "Next Hearing Date must be a string" }),
    })
    .datetime({
      message: "Next Hearing Date must be a valid date",
    })
    .trim()
    .optional(),
  attendance: z
    .string({
      errorMap: () => ({ message: "Attendance must be a string" }),
    })
    .max(256, { message: "Attendance must be less than 256 characters" })
    .trim()
    .optional(),
  judgeName: z
    .string({
      errorMap: () => ({ message: "Judge Name must be a string" }),
    })
    .max(256, { message: "Judge Name must be less than 256 characters" })
    .trim()
    .optional(),
  actionCode: z
    .string({
      errorMap: () => ({ message: "Action Code must be a string" }),
    })
    .max(256, { message: "Action Code must be less than 256 characters" })
    .trim()
    .optional(),
  additionalRemarks: z
    .string({
      errorMap: () => ({ message: "Additional Remarks must be a string" }),
    })
    .trim()
    .optional(),
});

export const courtExistSchema = z
  .object({
    courtId: z.number({
      errorMap: () => ({ message: "Court Id must be a number" }),
    }),
  })
  .superRefine(async ({ courtId }, ctx) => {
    const court = await getByCourtId(courtId);
    if (!court) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid Court Id",
        path: ["courtId"],
      });
      return false;
    }
  });

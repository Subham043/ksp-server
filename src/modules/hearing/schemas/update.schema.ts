import { z } from "zod";

export const updateHearingBodySchema = z.object({
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

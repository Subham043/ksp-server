import { z } from "zod";
import prisma from "../../../db";
import { getById } from "../court.repository";
import { getById as getByCrimeId } from "../../crime/crime.repository";
import { getById as getByCriminalId } from "../../criminal/criminal.repository";

export const updateCourtBodySchema = z.object({
  courtName: z
    .string({
      errorMap: () => ({ message: "Court Name must be a string" }),
    })
    .trim(),
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
  ccScNo: z
    .string({
      errorMap: () => ({ message: "CC/SC No. must be a string" }),
    })
    .trim()
    .optional(),
  psName: z
    .string({
      errorMap: () => ({ message: "PS Name must be a string" }),
    })
    .trim()
    .optional(),
  attendance: z
    .string({
      errorMap: () => ({ message: "Attendance must be a number" }),
    })
    .regex(/^\d+$/, { message: "Attendance must be a number" })
    .optional(),
  lawyerName: z
    .string({
      errorMap: () => ({ message: "Lawyer Name must be a string" }),
    })
    .max(256, { message: "Lawyer Name must be less than 256 characters" })
    .trim()
    .optional(),
  lawyerContact: z
    .string({
      errorMap: () => ({ message: "Lawyer Contact must be a string" }),
    })
    .max(256, { message: "Lawyer Contact must be less than 256 characters" })
    .trim()
    .optional(),
  suretyProviderDetail: z
    .string({
      errorMap: () => ({ message: "Surety Provider Detail must be a string" }),
    })
    .max(256, {
      message: "Surety Provider Detail must be less than 256 characters",
    })
    .trim()
    .optional(),
  suretyProviderContact: z
    .string({
      errorMap: () => ({ message: "Surety Provider Contact must be a string" }),
    })
    .max(256, {
      message: "Surety Provider Contact must be less than 256 characters",
    })
    .trim()
    .optional(),
  stageOfCase: z
    .string({
      errorMap: () => ({ message: "Stage Of Case must be a string" }),
    })
    .max(256, { message: "Stage Of Case must be less than 256 characters" })
    .trim()
    .optional(),
  additionalRemarks: z
    .string({
      errorMap: () => ({ message: "Additional Remarks must be a string" }),
    })
    .trim()
    .optional(),
  crimeId: z.number({
    errorMap: () => ({ message: "Crime Id must be a number" }),
  }),
  criminalId: z.number({
    errorMap: () => ({ message: "Criminal Id must be a number" }),
  }),
});

export const updateCourtUniqueSchema = z
  .object({
    id: z
      .number({
        errorMap: () => ({ message: "Id must be number" }),
      })
      .positive({ message: "Id must be a positive number" })
      .superRefine(async (id, ctx) => {
        const court = await getById(id);
        if (!court) {
          ctx.addIssue({
            code: "custom",
            message: "Id doesn't exist",
            path: ["id"],
          });
          return false;
        }
      }),
    crimeId: z.number({
      errorMap: () => ({ message: "Crime Id must be a number" }),
    }),
    criminalId: z.number({
      errorMap: () => ({ message: "Criminal Id must be a number" }),
    }),
  })
  .superRefine(async ({ crimeId, criminalId }, ctx) => {
    const crime = await getByCrimeId(crimeId);
    if (!crime) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid Crime Id",
        path: ["crimeId"],
      });
      return false;
    }
    const criminal = await getByCriminalId(criminalId);
    if (!criminal) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid Criminal Id",
        path: ["criminalId"],
      });
      return false;
    }

    const crimeByCriminal = await prisma.crimesByCriminals.findFirst({
      where: { crimeId, criminalId },
    });
    if (!crimeByCriminal) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid Criminal Id",
        path: ["criminalId"],
      });
      return false;
    }
  });

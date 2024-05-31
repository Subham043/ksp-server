import { z } from "zod";
import prisma from "../../../db";
import { getById } from "../jail.repository";
import { getById as getByCrimeId } from "../../crime/crime.repository";
import { getById as getByCriminalId } from "../../criminal/criminal.repository";

export const updateJailBodySchema = z.object({
  jailEntryDate: z
    .string({
      errorMap: () => ({ message: "Jail Entry Date must be a string" }),
    })
    .datetime({
      message: "Jail Entry Date must be a valid date",
    })
    .trim()
    .optional(),
  jailReleaseDate: z
    .string({
      errorMap: () => ({ message: "Jail Release Date must be a string" }),
    })
    .datetime({
      message: "Jail Release Date must be a valid date",
    })
    .trim()
    .optional(),
  lawSection: z
    .string({
      errorMap: () => ({ message: "Law Section must be a string" }),
    })
    .trim()
    .optional(),
  policeStation: z
    .string({
      errorMap: () => ({ message: "Police Station must be a string" }),
    })
    .trim()
    .optional(),
  utpNo: z
    .string({
      errorMap: () => ({ message: "UTP No. must be a string" }),
    })
    .max(256, { message: "UTP No. must be less than 256 characters" })
    .trim()
    .optional(),
  jailVisitorDetail: z
    .string({
      errorMap: () => ({ message: "Jail Visitor Detail must be a string" }),
    })
    .max(256, {
      message: "Jail Visitor Detail must be less than 256 characters",
    })
    .trim()
    .optional(),
  visitorRelationship: z
    .string({
      errorMap: () => ({ message: "Visitor Relationship must be a string" }),
    })
    .max(256, {
      message: "Visitor Relationship must be less than 256 characters",
    })
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

export const updateJailUniqueSchema = z
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

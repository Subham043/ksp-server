import { z } from "zod";
import { getById as getByCriminalId } from "../../criminal/criminal.repository";
import { getById as getByCrimeId } from "../../crime/crime.repository";
import { getByCrimeIdAndcriminalId } from "../crimesByCriminals.repository";

export const createCrimesByCriminalsBodySchema = z.object({
  crimeArrestOrder: z
    .string({
      errorMap: () => ({ message: "Crime Arrest Order must be a string" }),
    })
    .trim()
    .optional(),
  aliases: z
    .string({
      errorMap: () => ({ message: "Aliases must be a string" }),
    })
    .trim()
    .optional(),
  ageWhileOpening: z
    .string({
      errorMap: () => ({ message: "Age While Opening must be a string" }),
    })
    .trim()
    .optional(),
  criminalId: z.number({
    errorMap: () => ({ message: "Criminal Id must be a number" }),
  }),
});

export const createCrimesByCriminalsUniqueSchema = z
  .object({
    criminalId: z.number({
      errorMap: () => ({ message: "Criminal Id must be a number" }),
    }),
    crimeId: z.number({
      errorMap: () => ({ message: "Crime Id must be a number" }),
    }),
  })
  .superRefine(async ({ criminalId, crimeId }, ctx) => {
    const criminalData = await getByCriminalId(criminalId);
    if (!criminalData) {
      ctx.addIssue({
        code: "custom",
        message: "Criminal doen't exists",
        path: ["criminalId"],
      });
      return false;
    }
    const crimeData = await getByCrimeId(crimeId);
    if (!crimeData) {
      ctx.addIssue({
        code: "custom",
        message: "Crime doen't exists",
        path: ["crime"],
      });
      return false;
    }
    const crimesByCriminalsData = await getByCrimeIdAndcriminalId(
      crimeId,
      criminalId
    );
    if (crimesByCriminalsData) {
      ctx.addIssue({
        code: "custom",
        message: "Criminal already exists in this crime",
        path: ["criminalId"],
      });
      return false;
    }
  });

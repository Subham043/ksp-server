import { z } from "zod";
import { getById as getByCriminalId } from "../../criminal/criminal.repository";
import { getById as getByCrimeId } from "../../crime/crime.repository";
import {
  getByCrimeIdAndcriminalId,
  getById,
} from "../crimesByCriminals.repository";

export const updateCrimesByCriminalsBodySchema = z.object({
  crimeArrestOrder: z
    .string({
      errorMap: () => ({ message: "Crime Arrest Order must be a string" }),
    })
    .trim(),
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

export const updateCrimesByCriminalsUniqueSchema = z
  .object({
    id: z
      .string({
        errorMap: () => ({ message: "Id must be a number" }),
      })
      .regex(/^\d+$/, { message: "Id must be a number" })
      .transform((value) => parseInt(value)),
    criminalId: z.number({
      errorMap: () => ({ message: "Criminal Id must be a number" }),
    }),
    crimeId: z
      .string({
        errorMap: () => ({ message: "Crime Id must be a number" }),
      })
      .regex(/^\d+$/, { message: "Crime Id must be a number" })
      .transform((value) => parseInt(value)),
  })
  .superRefine(async ({ id, criminalId, crimeId }, ctx) => {
    const criminalData = await getByCriminalId(criminalId);
    if (!criminalData) {
      ctx.addIssue({
        code: "custom",
        message: "Criminal doen't exists",
        path: ["criminal"],
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
    const data = await getById(id);
    if (!data) {
      ctx.addIssue({
        code: "custom",
        message: "Id doen't exists",
        path: ["id"],
      });
      return false;
    }
    const crimesByCriminalsData = await getByCrimeIdAndcriminalId(
      crimeId,
      criminalId
    );
    if (crimesByCriminalsData && crimesByCriminalsData.id !== id) {
      ctx.addIssue({
        code: "custom",
        message: "Criminal already exists in this crime",
        path: ["criminal"],
      });
      return false;
    }
  });

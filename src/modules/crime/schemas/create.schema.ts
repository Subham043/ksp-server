import { z } from "zod";

export const createCrimeBodySchema = z.object({
  mobFileNo: z
    .string({
      errorMap: () => ({ message: "Mob. File No. must be a string" }),
    })
    .trim()
    .optional(),
  hsNo: z
    .string({
      errorMap: () => ({ message: "HS No. must be a string" }),
    })
    .trim()
    .optional(),
  typeOfCrime: z
    .string({
      errorMap: () => ({ message: "Type of Crime must be a string" }),
    })
    .trim(),
  sectionOfLaw: z
    .string({
      errorMap: () => ({ message: "Type of Crime must be a string" }),
    })
    .trim(),
  firNo: z
    .string({
      errorMap: () => ({ message: "FIR No. must be a string" }),
    })
    .trim()
    .optional(),
  policeStation: z
    .string({
      errorMap: () => ({ message: "Police Station must be a string" }),
    })
    .trim()
    .optional(),
  crimeGroup: z
    .string({
      errorMap: () => ({ message: "Crime Group must be a string" }),
    })
    .trim()
    .optional(),
  crimeHead: z
    .string({
      errorMap: () => ({ message: "Crime Head must be a string" }),
    })
    .trim()
    .optional(),
  crimeClass: z
    .string({
      errorMap: () => ({ message: "Crime Class must be a string" }),
    })
    .trim()
    .optional(),
  briefFact: z
    .string({
      errorMap: () => ({ message: "Brief Fact must be a string" }),
    })
    .trim()
    .optional(),
  cluesLeft: z
    .string({
      errorMap: () => ({ message: "Clues Left must be a string" }),
    })
    .trim()
    .optional(),
  languagesKnown: z
    .string({
      errorMap: () => ({ message: "Languages Known must be a string" }),
    })
    .trim()
    .optional(),
  languagesUsed: z
    .string({
      errorMap: () => ({ message: "Languages Used must be a string" }),
    })
    .trim()
    .optional(),
  placeAttacked: z
    .string({
      errorMap: () => ({ message: "Place Attacked must be a string" }),
    })
    .trim()
    .optional(),
  placeOfAssemblyAfterOffence: z
    .string({
      errorMap: () => ({
        message: "Place of Assembly After Offence must be a string",
      }),
    })
    .trim()
    .optional(),
  placeOfAssemblyBeforeOffence: z
    .string({
      errorMap: () => ({
        message: "Place of Assembly Before Offence must be a string",
      }),
    })
    .trim()
    .optional(),
  propertiesAttacked: z
    .string({
      errorMap: () => ({ message: "Properties Attacked must be a string" }),
    })
    .trim()
    .optional(),
  styleAssumed: z
    .string({
      errorMap: () => ({ message: "Style Assumed must be a string" }),
    })
    .trim()
    .optional(),
  toolsUsed: z
    .string({
      errorMap: () => ({ message: "Tools Used must be a string" }),
    })
    .trim()
    .optional(),
  tradeMarks: z
    .string({
      errorMap: () => ({ message: "Trade Marks must be a string" }),
    })
    .trim()
    .optional(),
  transportUsedAfter: z
    .string({
      errorMap: () => ({ message: "Transport Used After must be a string" }),
    })
    .trim()
    .optional(),
  transportUsedBefore: z
    .string({
      errorMap: () => ({ message: "Transport Used Before must be a string" }),
    })
    .trim()
    .optional(),
  gangStrength: z
    .string({
      errorMap: () => ({ message: "Nose must be a string" }),
    })
    .trim()
    .optional(),
  gang: z.enum(["Yes", "No"], {
    errorMap: () => ({
      message: "Gang must be one of [Yes, No]",
    }),
  }),
  hsOpeningDate: z
    .string({
      errorMap: () => ({ message: "HS Opening Date must be a string" }),
    })
    .datetime({
      message: "HS Opening Date must be a valid date",
    })
    .trim()
    .optional(),
  hsClosingDate: z
    .string({
      errorMap: () => ({ message: "HS Closing Date must be a string" }),
    })
    .datetime({
      message: "HS Closing Date must be a valid date",
    })
    .trim()
    .optional(),
  dateOfCrime: z
    .string({
      errorMap: () => ({ message: "Date Of Crime must be a string" }),
    })
    .datetime({
      message: "Date Of Crime must be a valid date",
    })
    .trim()
    .optional(),
});

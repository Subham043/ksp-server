import { z } from "zod";
import { getById } from "../crime.repository";
import { getById as getByCriminalId } from "../../criminal/criminal.repository";

export const updateCrimeBodySchema = z.object({
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
  aliases: z
    .string({
      errorMap: () => ({ message: "Type of Crime must be a string" }),
    })
    .trim()
    .optional(),
  ageWhileOpening: z
    .string({
      errorMap: () => ({ message: "Age While Opening must be a string" }),
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
  voice: z
    .string({
      errorMap: () => ({ message: "Voice must be a string" }),
    })
    .trim()
    .optional(),
  build: z
    .string({
      errorMap: () => ({ message: "Build must be a string" }),
    })
    .trim()
    .optional(),
  complexion: z
    .string({
      errorMap: () => ({ message: "Complexion must be a string" }),
    })
    .trim()
    .optional(),
  teeth: z
    .string({
      errorMap: () => ({ message: "Teeth must be a string" }),
    })
    .trim()
    .optional(),
  hair: z
    .string({
      errorMap: () => ({ message: "Hair must be a string" }),
    })
    .trim()
    .optional(),
  eyes: z
    .string({
      errorMap: () => ({ message: "Eyes must be a string" }),
    })
    .trim()
    .optional(),
  habbits: z
    .string({
      errorMap: () => ({ message: "Habbits must be a string" }),
    })
    .trim()
    .optional(),
  burnMarks: z
    .string({
      errorMap: () => ({ message: "Burn Marks must be a string" }),
    })
    .trim()
    .optional(),
  tattoo: z
    .string({
      errorMap: () => ({ message: "Tattoo must be a string" }),
    })
    .trim()
    .optional(),
  mole: z
    .string({
      errorMap: () => ({ message: "Mole must be a string" }),
    })
    .trim()
    .optional(),
  scar: z
    .string({
      errorMap: () => ({ message: "Scar must be a string" }),
    })
    .trim()
    .optional(),
  leucoderma: z
    .string({
      errorMap: () => ({ message: "Leucoderma must be a string" }),
    })
    .trim()
    .optional(),
  faceHead: z
    .string({
      errorMap: () => ({ message: "Face/Head must be a string" }),
    })
    .trim()
    .optional(),
  otherPartsBody: z
    .string({
      errorMap: () => ({ message: "Other Parts of Body must be a string" }),
    })
    .trim()
    .optional(),
  dressUsed: z
    .string({
      errorMap: () => ({ message: "Dress Used must be a string" }),
    })
    .trim()
    .optional(),
  beard: z
    .string({
      errorMap: () => ({ message: "Beard must be a string" }),
    })
    .trim()
    .optional(),
  face: z
    .string({
      errorMap: () => ({ message: "Face must be a string" }),
    })
    .trim()
    .optional(),
  moustache: z
    .string({
      errorMap: () => ({ message: "Moustache must be a string" }),
    })
    .trim()
    .optional(),
  nose: z
    .string({
      errorMap: () => ({ message: "Nose must be a string" }),
    })
    .trim()
    .optional(),
  gangStength: z
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
  criminal: z.number({
    errorMap: () => ({ message: "Criminal must be a number" }),
  }),
});

export const updateCrimeUniqueSchema = z.object({
  id: z
    .number({
      errorMap: () => ({ message: "Id must be number" }),
    })
    .positive({ message: "Id must be a positive number" })
    .superRefine(async (id, ctx) => {
      const crime = await getById(id);
      if (!crime) {
        ctx.addIssue({
          code: "custom",
          message: "Id doesn't exist",
          path: ["id"],
        });
        return false;
      }
    }),
  criminal: z
    .number({
      errorMap: () => ({ message: "Criminal must be a number" }),
    })
    .superRefine(async (criminal, ctx) => {
      const criminalData = await getByCriminalId(criminal);
      if (!criminalData) {
        ctx.addIssue({
          code: "custom",
          message: "Criminal doen't exists",
          path: ["criminal"],
        });
        return false;
      }
    }),
});

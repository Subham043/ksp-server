import { z } from "zod";
import { getByAadhar } from "../criminal.repository";
import { MultipartFile } from "../../../@types/multipart_file.type";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

export const createCriminalBodySchema = z.object({
  name: z
    .string({
      errorMap: () => ({ message: "Name must be a string" }),
    })
    .trim(),
  sex: z.enum(["Male", "Female", "Others"], {
    errorMap: () => ({
      message: "Sex must be one of [Male, Female, Others]",
    }),
  }),
  dob: z
    .string({
      errorMap: () => ({ message: "Date of Birth must be a string" }),
    })
    .datetime({
      message: "Date of Birth must be a valid date",
    })
    .trim()
    .optional(),
  permanent_address: z
    .string({
      errorMap: () => ({ message: "Permanent Address must be a string" }),
    })
    .trim()
    .optional(),
  present_address: z
    .string({
      errorMap: () => ({ message: "Present Address must be a string" }),
    })
    .trim()
    .optional(),
  phone: z
    .string({
      errorMap: () => ({ message: "Phone must be a number" }),
    })
    .regex(/^\d+$/, { message: "Phone must be a number" })
    .optional(),
  aadhar_no: z
    .string({
      errorMap: () => ({ message: "Aadhar number must be a string" }),
    })
    .max(256, { message: "Aadhar number must be less than 256 characters" })
    .trim()
    .optional(),
  father_name: z
    .string({
      errorMap: () => ({ message: "Father Name must be a string" }),
    })
    .max(256, { message: "Father Name must be less than 256 characters" })
    .trim()
    .optional(),
  mother_name: z
    .string({
      errorMap: () => ({ message: "Mother Name must be a string" }),
    })
    .max(256, { message: "Mother Name must be less than 256 characters" })
    .trim()
    .optional(),
  spouse_name: z
    .string({
      errorMap: () => ({ message: "Spouse Name must be a string" }),
    })
    .max(256, { message: "Spouse Name must be less than 256 characters" })
    .trim()
    .optional(),
  religion: z
    .string({
      errorMap: () => ({ message: "Religion must be a string" }),
    })
    .max(256, { message: "Religion must be less than 256 characters" })
    .trim()
    .optional(),
  caste: z
    .string({
      errorMap: () => ({ message: "Caste must be a string" }),
    })
    .max(256, { message: "Caste must be less than 256 characters" })
    .trim()
    .optional(),
  fpb_sl_no: z
    .string({
      errorMap: () => ({ message: "FPB Sl.No must be a string" }),
    })
    .max(256, { message: "FPB Sl.No must be less than 256 characters" })
    .trim()
    .optional(),
  fpb_classn_no: z
    .string({
      errorMap: () => ({ message: "FPB Classn.No must be a string" }),
    })
    .max(256, { message: "FPB Classn.No must be less than 256 characters" })
    .trim()
    .optional(),
  occupation: z
    .string({
      errorMap: () => ({ message: "Occupation must be a string" }),
    })
    .max(256, { message: "Occupation must be less than 256 characters" })
    .trim()
    .optional(),
  educational_qualification: z
    .string({
      errorMap: () => ({
        message: "Educational qualification must be a string",
      }),
    })
    .trim()
    .optional(),
  native_ps: z
    .string({
      errorMap: () => ({ message: "Native PS must be a string" }),
    })
    .max(256, {
      message: "Native PS must be less than 256 characters",
    })
    .trim()
    .optional(),
  native_district: z
    .string({
      errorMap: () => ({
        message: "Native District must be a string",
      }),
    })
    .max(256, {
      message: "Native District must be less than 256 characters",
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
  photo: z
    .any()
    .refine((photo) => {
      if (photo) {
        return ACCEPTED_FILE_TYPES.includes(photo.mimetype);
      }
      return true;
    }, "Invalid photo file type")
    .refine(
      (photo) => (photo ? photo.size <= MAX_UPLOAD_SIZE : true),
      "File size must be less than 3MB"
    )
    .transform((photo) => {
      if (photo) {
        return photo as MultipartFile;
      }
      return undefined;
    }),
  aadhar_photo: z
    .any()
    .refine((aadhar_photo) => {
      if (aadhar_photo) {
        return ACCEPTED_FILE_TYPES.includes(aadhar_photo.mimetype);
      }
      return true;
    }, "Invalid photo file type")
    .refine(
      (aadhar_photo) =>
        aadhar_photo ? aadhar_photo.size <= MAX_UPLOAD_SIZE : true,
      "File size must be less than 3MB"
    )
    .transform((aadhar_photo) =>
      aadhar_photo ? (aadhar_photo as MultipartFile) : undefined
    ),
});

export const createCriminalUniqueSchema = z.object({
  aadhar_no: z
    .string({
      errorMap: () => ({ message: "Aadhar Number must be a string" }),
    })
    .max(256, { message: "Aadhar Number must be less than 256 characters" })
    .trim()
    .optional()
    .superRefine(async (aadhar_no, ctx) => {
      if (aadhar_no) {
        const companyMaster = await getByAadhar(aadhar_no);
        if (companyMaster) {
          ctx.addIssue({
            code: "custom",
            message: "Aadhar number already exists",
            path: ["aadhar_no"],
          });
          return false;
        }
      }
    }),
});

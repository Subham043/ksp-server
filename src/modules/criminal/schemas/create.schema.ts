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
      errorMap: () => ({ message: "Date of Birth Change must be a string" }),
    })
    .datetime({
      message: "Date of Birth Change must be a valid date",
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
      errorMap: () => ({ message: "ID must be a number" }),
    })
    .regex(/^\d+$/, { message: "ID must be a number" })
    .transform((value) => parseInt(value))
    .optional(),
  aadhar_no: z
    .string({
      errorMap: () => ({ message: "Aadhar number must be a string" }),
    })
    .max(256, { message: "Aadhar number must be less than 256 characters" })
    .trim()
    .optional(),
  relation_name: z
    .string({
      errorMap: () => ({ message: "Relation Name must be a string" }),
    })
    .max(256, { message: "Relation Name must be less than 256 characters" })
    .trim()
    .optional(),
  relation_type: z
    .enum(["Father", "Husband", "Mother", "Wife"], {
      errorMap: () => ({
        message: "Relation Type must be one of [Father, Husband, Mother, Wife]",
      }),
    })
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

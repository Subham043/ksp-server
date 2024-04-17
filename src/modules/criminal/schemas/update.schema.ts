import { Stream } from "stream";
import { z } from "zod";
import { MultipartFile } from "@fastify/multipart";
import { getByAadhar, getById } from "../criminal.repository";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

export const updateCriminalBodySchema = z.object({
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
    .number({
      errorMap: () => ({ message: "Phone must be a number" }),
    })
    .positive({ message: "Phone must be a positive number" })
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
    .enum(["Father", "Husband"], {
      errorMap: () => ({
        message: "Relation Type must be one of [Father, Husband]",
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
    .url({ message: "Educational qualification must be a valid url" })
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
        if (!photo.file) {
          return false;
        }
        return photo.file instanceof Stream;
      }
      return true;
    }, "Photo file is required")
    .refine(
      (photo) => photo && ACCEPTED_FILE_TYPES.includes(photo.mimetype),
      "Invalid photo file type"
    )
    .refine(
      (photo) => photo && photo.file.bytesRead <= MAX_UPLOAD_SIZE,
      "File size must be less than 3MB"
    )
    .transform((photo) => photo as MultipartFile),
  aadhar_photo: z
    .any()
    .refine((aadhar_photo) => {
      if (aadhar_photo) {
        if (!aadhar_photo.file) {
          return false;
        }
        return aadhar_photo.file instanceof Stream;
      }
      return true;
    }, "Photo file is required")
    .refine(
      (aadhar_photo) =>
        aadhar_photo && ACCEPTED_FILE_TYPES.includes(aadhar_photo.mimetype),
      "Invalid photo file type"
    )
    .refine(
      (aadhar_photo) =>
        aadhar_photo && aadhar_photo.file.bytesRead <= MAX_UPLOAD_SIZE,
      "File size must be less than 3MB"
    )
    .transform((aadhar_photo) => aadhar_photo as MultipartFile),
});

export const updateCriminalUniqueSchema = z
  .object({
    id: z
      .number({
        errorMap: () => ({ message: "Id must be number" }),
      })
      .positive({ message: "Id must be a positive number" })
      .superRefine(async (id, ctx) => {
        const company = await getById(id);
        if (!company) {
          ctx.addIssue({
            code: "custom",
            message: "Id doesn't exist",
            path: ["id"],
          });
          return false;
        }
      }),
    aadhar_no: z
      .string({
        errorMap: () => ({ message: "CIN must be a string" }),
      })
      .max(256, { message: "CIN must be less than 256 characters" })
      .trim()
      .optional(),
  })
  .superRefine(async ({ id, aadhar_no }, ctx) => {
    if (aadhar_no) {
      const criminal = await getByAadhar(aadhar_no);
      if (criminal && criminal.id !== id) {
        ctx.addIssue({
          code: "custom",
          message: "Aadhar number already exists",
          path: ["aadhar_no"],
        });
        return false;
      }
    }
  });

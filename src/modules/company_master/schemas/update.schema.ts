import { z } from "zod";
import { getByCIN, getByISIN, getById } from "../company_master.repository";
import {
  getByBSE,
  getByNSE,
} from "../../name_change_master/name_change_master.repository";

export const updateCompanyMasterBodySchema = z.object({
  newName: z
    .string({
      errorMap: () => ({ message: "New Name must be a string" }),
    })
    .trim(),
  NSE: z
    .string({
      errorMap: () => ({ message: "NSE must be a string" }),
    })
    .trim()
    .optional(),
  BSE: z
    .string({
      errorMap: () => ({ message: "BSE must be a string" }),
    })
    .trim()
    .optional(),
  CIN: z
    .string({
      errorMap: () => ({ message: "CIN must be a string" }),
    })
    .max(256, { message: "CIN must be less than 256 characters" })
    .trim()
    .optional(),
  ISIN: z
    .string({
      errorMap: () => ({ message: "ISIN must be a string" }),
    })
    .max(256, { message: "ISIN must be less than 256 characters" })
    .trim(),
  registeredOffice: z
    .string({
      errorMap: () => ({ message: "Registered Office must be a string" }),
    })
    .max(256, { message: "Registered Office must be less than 256 characters" })
    .trim()
    .optional(),
  city: z
    .string({
      errorMap: () => ({ message: "city must be a string" }),
    })
    .max(256, { message: "city must be less than 256 characters" })
    .trim()
    .optional(),
  state: z
    .string({
      errorMap: () => ({ message: "state must be a string" }),
    })
    .max(256, { message: "state must be less than 256 characters" })
    .trim()
    .optional(),
  pincode: z
    .number({
      errorMap: () => ({ message: "pincode must be a number" }),
    })
    .positive({ message: "pincode must be a positive number" })
    .optional(),
  telephone: z
    .string({
      errorMap: () => ({ message: "telephone must be a string" }),
    })
    .max(256, { message: "telephone must be less than 256 characters" })
    .trim()
    .optional(),
  fax: z
    .string({
      errorMap: () => ({ message: "fax must be a string" }),
    })
    .max(256, { message: "fax must be less than 256 characters" })
    .trim()
    .optional(),
  email: z
    .string({
      errorMap: () => ({ message: "email must be a string" }),
    })
    .email({ message: "email must be a valid email" })
    .max(256, { message: "email must be less than 256 characters" })
    .trim()
    .optional(),
  website: z
    .string({
      errorMap: () => ({ message: "website must be a string" }),
    })
    .url({ message: "website must be a valid url" })
    .trim()
    .optional(),
  nameContactPerson: z
    .string({
      errorMap: () => ({ message: "Name of Contact Person must be a string" }),
    })
    .max(256, {
      message: "Name of Contact Person must be less than 256 characters",
    })
    .trim()
    .optional(),
  designationContactPerson: z
    .string({
      errorMap: () => ({
        message: "Designation of Contact Person must be a string",
      }),
    })
    .max(256, {
      message: "Designation of Contact Person must be less than 256 characters",
    })
    .trim()
    .optional(),
  emailContactPerson: z
    .string({
      errorMap: () => ({
        message: "Email of Contact Person must be a string",
      }),
    })
    .email({ message: "Email of Contact Person must be a valid email" })
    .max(256, {
      message: "Email of Contact Person must be less than 256 characters",
    })
    .trim()
    .optional(),
  phoneContactPerson: z
    .string({
      errorMap: () => ({
        message: "Phone of Contact Person must be a string",
      }),
    })
    .optional(),
  faceValue: z
    .number({
      errorMap: () => ({
        message: "Face Value must be a number",
      }),
    })
    .transform((value) => value.toFixed(2)),
  closingPriceNSE: z
    .number({
      errorMap: () => ({
        message: "Closing Price in NSE must be a number",
      }),
    })
    .transform((value) => value.toFixed(2)),
  closingPriceBSE: z
    .number({
      errorMap: () => ({
        message: "Closing Price in BSE must be a number",
      }),
    })
    .transform((value) => value.toFixed(2)),
});

export const updateCompanyMasterUniqueSchema = z
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
    CIN: z
      .string({
        errorMap: () => ({ message: "CIN must be a string" }),
      })
      .max(256, { message: "CIN must be less than 256 characters" })
      .trim()
      .optional(),
    ISIN: z
      .string({
        errorMap: () => ({ message: "ISIN must be a string" }),
      })
      .max(256, { message: "ISIN must be less than 256 characters" })
      .trim(),
    NSE: z
      .string({
        errorMap: () => ({ message: "NSE must be a string" }),
      })
      .max(256, { message: "NSE must be less than 256 characters" })
      .trim()
      .optional(),
    BSE: z
      .string({
        errorMap: () => ({ message: "BSE must be a string" }),
      })
      .max(256, { message: "BSE must be less than 256 characters" })
      .trim()
      .optional(),
  })
  .superRefine(async ({ id, CIN, ISIN, BSE, NSE }, ctx) => {
    if (CIN) {
      const companyMaster = await getByCIN(CIN);
      if (companyMaster && companyMaster.id !== id) {
        ctx.addIssue({
          code: "custom",
          message: "CIN already exists",
          path: ["CIN"],
        });
        return false;
      }
    }
    const companyMaster = await getByISIN(ISIN);
    if (companyMaster && companyMaster.id !== id) {
      ctx.addIssue({
        code: "custom",
        message: "ISIN already exists",
        path: ["ISIN"],
      });
      return false;
    }
    if (BSE) {
      const nameChangeMaster = await getByBSE(BSE);
      if (nameChangeMaster && nameChangeMaster.companyId !== id) {
        ctx.addIssue({
          code: "custom",
          message: "BSE already exists",
          path: ["BSE"],
        });
        return false;
      }
    }
    if (NSE) {
      const nameChangeMaster = await getByNSE(NSE);
      if (nameChangeMaster && nameChangeMaster.companyId !== id) {
        ctx.addIssue({
          code: "custom",
          message: "NSE already exists",
          path: ["NSE"],
        });
        return false;
      }
    }
  });

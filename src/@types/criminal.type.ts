import { MultipartFile } from "./multipart_file.type";

export type CriminalType = {
  id: number;
  name: string;
  sex: "Male" | "Female" | "Others";
  permanent_address?: string | null | undefined;
  present_address?: string | null | undefined;
  phone?: string | null | undefined;
  aadhar_no?: string | null | undefined;
  aadhar_photo?: string | null | undefined;
  photo?: string | null | undefined;
  relation_name?: string | null | undefined;
  relation_type?: "Father" | "Husband" | "Mother" | "Wife" | null | undefined;
  caste?: string | null | undefined;
  fpb_sl_no?: string | null | undefined;
  fpb_classn_no?: string | null | undefined;
  occupation?: string | null | undefined;
  educational_qualification?: string | null | undefined;
  native_ps?: string | null | undefined;
  native_district?: string | null | undefined;
  createdAt?: Date | null;
};

export type CriminalOmitType = Omit<
  CriminalType,
  "id" | "createdAt" | "aadhar_photo" | "photo"
>;
export interface CriminalCreateType extends CriminalOmitType {
  aadhar_photo?: MultipartFile | null | undefined;
  photo?: MultipartFile | null | undefined;
}

export interface CriminalUpdateType extends CriminalCreateType {}

export interface CriminalPostRepositoryType extends CriminalOmitType {
  aadhar_photo?: string | null | undefined;
  photo?: string | null | undefined;
}

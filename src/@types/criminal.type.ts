import { MultipartFile } from "./multipart_file.type";

export type CriminalType = {
  id: number;
  name: string;
  sex: "Male" | "Female" | "Others";
  dob?: Date | null;
  permanent_address?: string | null | undefined;
  present_address?: string | null | undefined;
  phone?: string | null | undefined;
  aadhar_no?: string | null | undefined;
  aadhar_photo?: string | null | undefined;
  photo?: string | null | undefined;
  father_name?: string | null | undefined;
  mother_name?: string | null | undefined;
  spouse_name?: string | null | undefined;
  religion?: string | null | undefined;
  caste?: string | null | undefined;
  fpb_sl_no?: string | null | undefined;
  fpb_classn_no?: string | null | undefined;
  occupation?: string | null | undefined;
  educational_qualification?: string | null | undefined;
  native_ps?: string | null | undefined;
  native_district?: string | null | undefined;
  voice?: string | null;
  build?: string | null;
  complexion?: string | null;
  teeth?: string | null;
  hair?: string | null;
  eyes?: string | null;
  habbits?: string | null;
  burnMarks?: string | null;
  tattoo?: string | null;
  mole?: string | null;
  scar?: string | null;
  leucoderma?: string | null;
  faceHead?: string | null;
  otherPartsBody?: string | null;
  dressUsed?: string | null;
  beard?: string | null;
  face?: string | null;
  moustache?: string | null;
  nose?: string | null;
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

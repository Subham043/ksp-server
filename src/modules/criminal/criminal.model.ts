import { WorksheetColumnsType } from "../../utils/excel";

export type CriminalExcelData = {
  name: string | undefined;
  sex: "Male" | "Female" | "Others";
  dob?: string | undefined;
  permanent_address?: string | undefined;
  present_address?: string | undefined;
  phone?: string | undefined;
  aadhar_no?: string | undefined;
  aadhar_photo?: string | undefined;
  photo?: string | undefined;
  father_name?: string | undefined;
  mother_name?: string | undefined;
  spouse_name?: string | undefined;
  religion?: string | undefined;
  caste?: string | undefined;
  fpb_sl_no?: string | undefined;
  fpb_classn_no?: string | undefined;
  occupation?: string | undefined;
  educational_qualification?: string | undefined;
  native_ps?: string | undefined;
  native_district?: string | undefined;
  voice?: string;
  build?: string;
  complexion?: string;
  teeth?: string;
  hair?: string;
  eyes?: string;
  habbits?: string;
  burnMarks?: string;
  tattoo?: string;
  mole?: string;
  scar?: string;
  leucoderma?: string;
  faceHead?: string;
  otherPartsBody?: string;
  dressUsed?: string;
  beard?: string;
  face?: string;
  moustache?: string;
  nose?: string;
  createdAt?: string;
};

export const ExcelFailedCriminalsColumns: WorksheetColumnsType = [
  { key: "name", header: "Name" },
  { key: "sex", header: "Sex" },
  { key: "dob", header: "Date Of Birth" },
  {
    key: "permanent_address",
    header: "Permanent Address",
  },
  { key: "present_address", header: "Present Address" },
  { key: "phone", header: "Phone" },
  { key: "aadhar_no", header: "Aadhar No." },
  { key: "father_name", header: "Father Name" },
  { key: "mother_name", header: "Mother Name" },
  { key: "spouse_name", header: "Spouse Name" },
  { key: "religion", header: "Religion" },
  { key: "caste", header: "Caste" },
  { key: "fpb_sl_no", header: "FPB Sl.No" },
  { key: "fpb_classn_no", header: "FPB Classn.No" },
  { key: "occupation", header: "Occupation" },
  { key: "educational_qualification", header: "Educational Qualification" },
  { key: "native_ps", header: "Native PS" },
  { key: "native_district", header: "Native District" },
  { key: "voice", header: "Voice" },
  { key: "build", header: "Build" },
  { key: "complexion", header: "Complexion" },
  { key: "teeth", header: "Teeth" },
  { key: "hair", header: "Hair" },
  { key: "eyes", header: "Eyes" },
  { key: "habbits", header: "Habbits" },
  { key: "burnMarks", header: "Burn Marks" },
  { key: "tattoo", header: "Tattoo" },
  { key: "mole", header: "Mole" },
  { key: "scar", header: "Scar" },
  { key: "leucoderma", header: "Leucoderma" },
  { key: "faceHead", header: "Face/Head" },
  { key: "otherPartsBody", header: "Other Parts Of Body" },
  { key: "dressUsed", header: "Dress Used" },
  { key: "beard", header: "Beard" },
  { key: "face", header: "Face" },
  { key: "moustache", header: "Moustache" },
  { key: "nose", header: "Nose" },
  { key: "error", header: "Error" },
];

export const ExcelCriminalsColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "sex", header: "Sex" },
  { key: "dob", header: "Date Of Birth" },
  {
    key: "permanent_address",
    header: "Permanent Address",
  },
  { key: "present_address", header: "Present Address" },
  { key: "phone", header: "Phone" },
  { key: "aadhar_no", header: "Aadhar No." },
  { key: "father_name", header: "Father Name" },
  { key: "mother_name", header: "Mother Name" },
  { key: "spouse_name", header: "Spouse Name" },
  { key: "religion", header: "Religion" },
  { key: "caste", header: "Caste" },
  { key: "fpb_sl_no", header: "FPB Sl.No" },
  { key: "fpb_classn_no", header: "FPB Classn.No" },
  { key: "occupation", header: "Occupation" },
  { key: "educational_qualification", header: "Educational Qualification" },
  { key: "native_ps", header: "Native PS" },
  { key: "native_district", header: "Native District" },
  { key: "voice", header: "Voice" },
  { key: "build", header: "Build" },
  { key: "complexion", header: "Complexion" },
  { key: "teeth", header: "Teeth" },
  { key: "hair", header: "Hair" },
  { key: "eyes", header: "Eyes" },
  { key: "habbits", header: "Habbits" },
  { key: "burnMarks", header: "Burn Marks" },
  { key: "tattoo", header: "Tattoo" },
  { key: "mole", header: "Mole" },
  { key: "scar", header: "Scar" },
  { key: "leucoderma", header: "Leucoderma" },
  { key: "faceHead", header: "Face/Head" },
  { key: "otherPartsBody", header: "Other Parts Of Body" },
  { key: "dressUsed", header: "Dress Used" },
  { key: "beard", header: "Beard" },
  { key: "face", header: "Face" },
  { key: "moustache", header: "Moustache" },
  { key: "nose", header: "Nose" },
];

export const CriminalColumn = {
  id: true,
  name: true,
  sex: true,
  dob: true,
  permanent_address: true,
  present_address: true,
  phone: true,
  aadhar_no: true,
  aadhar_photo: true,
  photo: true,
  father_name: true,
  mother_name: true,
  spouse_name: true,
  religion: true,
  caste: true,
  fpb_sl_no: true,
  fpb_classn_no: true,
  occupation: true,
  educational_qualification: true,
  native_ps: true,
  native_district: true,
  voice: true,
  build: true,
  complexion: true,
  teeth: true,
  hair: true,
  eyes: true,
  habbits: true,
  burnMarks: true,
  tattoo: true,
  mole: true,
  scar: true,
  leucoderma: true,
  faceHead: true,
  otherPartsBody: true,
  dressUsed: true,
  beard: true,
  face: true,
  moustache: true,
  nose: true,
  createdAt: true,
} as const;

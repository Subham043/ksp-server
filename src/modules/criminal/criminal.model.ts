import { desc, eq, ilike, or } from "drizzle-orm";
import db from "../../db";
import { criminals } from "../../db/schema/criminal";
import { WorksheetColumnsType } from "../../utils/excel";

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
  { key: "relation_name", header: "Relation Name" },
  { key: "relation_type", header: "Relation Type" },
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

export const CriminalSelect = {
  id: criminals.id,
  name: criminals.name,
  sex: criminals.sex,
  dob: criminals.dob,
  permanent_address: criminals.permanent_address,
  present_address: criminals.present_address,
  phone: criminals.phone,
  aadhar_no: criminals.aadhar_no,
  aadhar_photo: criminals.aadhar_photo,
  photo: criminals.photo,
  relation_name: criminals.relation_name,
  relation_type: criminals.relation_type,
  caste: criminals.caste,
  fpb_sl_no: criminals.fpb_sl_no,
  fpb_classn_no: criminals.fpb_classn_no,
  occupation: criminals.occupation,
  educational_qualification: criminals.educational_qualification,
  native_ps: criminals.native_ps,
  native_district: criminals.native_district,
  voice: criminals.voice,
  build: criminals.build,
  complexion: criminals.complexion,
  teeth: criminals.teeth,
  hair: criminals.hair,
  eyes: criminals.eyes,
  habbits: criminals.habbits,
  burnMarks: criminals.burnMarks,
  tattoo: criminals.tattoo,
  mole: criminals.mole,
  scar: criminals.scar,
  leucoderma: criminals.leucoderma,
  faceHead: criminals.faceHead,
  otherPartsBody: criminals.otherPartsBody,
  dressUsed: criminals.dressUsed,
  beard: criminals.beard,
  face: criminals.face,
  moustache: criminals.moustache,
  nose: criminals.nose,
  createdAt: criminals.createdAt,
};

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
  relation_name: true,
  relation_type: true,
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

export const Descending_Criminal_CreatedAt = desc(criminals.createdAt);

export const Select_Master_Query = db.select(CriminalSelect).from(criminals);

export const Search_Query = (search: string) =>
  or(
    isNaN(Number(search)) ? undefined : eq(criminals.id, Number(search)),
    ilike(criminals.name, `%${search}%`),
    ilike(criminals.permanent_address, `%${search}%`),
    ilike(criminals.present_address, `%${search}%`),
    ilike(criminals.phone, `%${search}%`),
    ilike(criminals.aadhar_no, `%${search}%`),
    ilike(criminals.relation_name, search),
    ilike(criminals.caste, `%${search}%`),
    ilike(criminals.fpb_sl_no, `%${search}%`),
    ilike(criminals.fpb_classn_no, `%${search}%`),
    ilike(criminals.occupation, `%${search}%`),
    ilike(criminals.educational_qualification, `%${search}%`),
    ilike(criminals.native_ps, `%${search}%`),
    ilike(criminals.native_district, `%${search}%`),
    ilike(criminals.voice, `%${search}%`),
    ilike(criminals.build, `%${search}%`),
    ilike(criminals.complexion, `%${search}%`),
    ilike(criminals.teeth, `%${search}%`),
    ilike(criminals.hair, `%${search}%`),
    ilike(criminals.eyes, `%${search}%`),
    ilike(criminals.habbits, `%${search}%`),
    ilike(criminals.burnMarks, `%${search}%`),
    ilike(criminals.tattoo, `%${search}%`),
    ilike(criminals.mole, `%${search}%`),
    ilike(criminals.scar, `%${search}%`),
    ilike(criminals.leucoderma, `%${search}%`),
    ilike(criminals.faceHead, `%${search}%`),
    ilike(criminals.otherPartsBody, `%${search}%`),
    ilike(criminals.dressUsed, `%${search}%`),
    ilike(criminals.beard, `%${search}%`),
    ilike(criminals.face, `%${search}%`),
    ilike(criminals.moustache, `%${search}%`),
    ilike(criminals.nose, `%${search}%`)
  );

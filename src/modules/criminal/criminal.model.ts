import { desc, ilike, or } from "drizzle-orm";
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
  createdAt: criminals.createdAt,
};

export const Descending_Criminal_CreatedAt = desc(criminals.createdAt);

export const Select_Master_Query = db.select(CriminalSelect).from(criminals);

export const Search_Query = (search: string) =>
  or(
    ilike(criminals.name, `%${search}%`),
    ilike(criminals.permanent_address, `%${search}%`),
    ilike(criminals.present_address, `%${search}%`),
    ilike(criminals.phone, `%${search}%`),
    ilike(criminals.aadhar_no, `%${search}%`),
    ilike(criminals.relation_name, search),
    ilike(criminals.relation_type, `%${search}%`),
    ilike(criminals.caste, `%${search}%`),
    ilike(criminals.fpb_sl_no, `%${search}%`),
    ilike(criminals.fpb_classn_no, `%${search}%`),
    ilike(criminals.occupation, `%${search}%`),
    ilike(criminals.educational_qualification, `%${search}%`),
    ilike(criminals.native_ps, `%${search}%`),
    ilike(criminals.native_district, `%${search}%`)
  );

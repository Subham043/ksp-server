import { WorksheetColumnsType } from "../../utils/excel";

export type CrimesByCriminalsExcelData = {
  aliases?: string | undefined;
  ageWhileOpening?: string | undefined;
  crimeArrestOrder?: string | undefined;
  criminalId?: number | undefined;
};

export const ExcelFailedCrimesByCriminalsColumns: WorksheetColumnsType = [
  { key: "aliases", header: "Aliases" },
  { key: "ageWhileOpening", header: "Age While Opening" },
  { key: "crimeArrestOrder", header: "Crime Arrest Order" },
  { key: "criminalId", header: "Criminal Id" },
  { key: "error", header: "Error" },
];

export const ExcelCrimesByCriminalsColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "aliases", header: "Aliases" },
  { key: "ageWhileOpening", header: "Age While Opening" },
  { key: "crimeArrestOrder", header: "Crime Arrest Order" },
  { key: "createdAt", header: "Created At" },
];

export const CriminalColumn = {
  id: true,
  name: true,
  sex: true,
  dob: true,
  phone: true,
  aadhar_no: true,
  aadhar_photo: true,
  photo: true,
} as const;

export const CrimeColumn = {
  id: true,
  typeOfCrime: true,
  sectionOfLaw: true,
  mobFileNo: true,
  hsNo: true,
  hsOpeningDate: true,
  hsClosingDate: true,
  firNo: true,
  policeStation: true,
} as const;

export const CrimesByCriminalsColumn = {
  id: true,
  crimeId: true,
  criminalId: true,
  aliases: true,
  ageWhileOpening: true,
  crimeArrestOrder: true,
  createdAt: true,
} as const;

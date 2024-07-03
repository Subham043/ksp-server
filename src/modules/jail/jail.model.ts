import { WorksheetColumnsType } from "../../utils/excel";

export const ExcelJailsColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "lawSection", header: "Law Section" },
  { key: "policeStation", header: "Police Station" },
  {
    key: "firstAdmissionDate",
    header: "First Admission Date",
  },
  {
    key: "jailEntryDate",
    header: "Jail Entry Date",
  },
  { key: "jailReleaseDate", header: "Jail Release Date" },
  { key: "utpNo", header: "UTP No." },
  { key: "jailName", header: "Jail Name" },
  { key: "jailId", header: "Jail Id" },
  { key: "prisonerId", header: "Prisoner Id" },
  { key: "prisonerType", header: "Prisoner Type" },
  { key: "ward", header: "Ward" },
  { key: "barrack", header: "Barrack" },
  { key: "registerNo", header: "Register No." },
  { key: "periodUndergone", header: "Period Undergone" },
  { key: "additionalRemarks", header: "Additional Remarks" },
  { key: "criminalId", header: "Criminal Id" },
  { key: "accused_name", header: "Accused Name" },
  { key: "crimeId", header: "Crime Id" },
  { key: "crime_typeOfCrime", header: "Type Of Crime" },
  { key: "crime_sectionOfLaw", header: "Section Of Law" },
  { key: "crime_mobFileNo", header: "Mob File No" },
  { key: "crime_hsNo", header: "HS No" },
  { key: "crime_hsOpeningDate", header: "HS Opening Date" },
  { key: "crime_hsClosingDate", header: "HS Closing Date" },
];

export type JailExportType = {
  id: number;
  lawSection?: string | null | undefined;
  policeStation?: string | null | undefined;
  firstAdmissionDate?: Date | null;
  jailEntryDate?: Date | null;
  jailReleaseDate?: Date | null;
  utpNo?: string | null | undefined;
  jailName?: string | null | undefined;
  jailId?: string | null | undefined;
  prisonerId?: string | null | undefined;
  prisonerType?: string | null | undefined;
  ward?: string | null | undefined;
  barrack?: string | null | undefined;
  registerNo?: string | null | undefined;
  periodUndergone?: string | null | undefined;
  additionalRemarks?: string | null | undefined;
  criminalId?: number | null | undefined;
  accused: {
    id: number;
    name: string;
  } | null;
  crimeId?: number | null | undefined;
  crime: {
    id: number;
    typeOfCrime: string | null;
    sectionOfLaw: string | null;
    mobFileNo?: string | null;
    hsNo?: string | null;
    hsOpeningDate?: Date | null;
    hsClosingDate?: Date | null;
  } | null;
  accused_name: string | null;
  crime_typeOfCrime: string | null;
  crime_sectionOfLaw: string | null;
  crime_mobFileNo?: string | null;
  crime_hsNo?: string | null;
  crime_hsOpeningDate?: Date | null;
  crime_hsClosingDate?: Date | null;
  createdAt?: Date | null;
};

export const JailColumn = {
  id: true,
  lawSection: true,
  policeStation: true,
  firstAdmissionDate: true,
  jailEntryDate: true,
  jailReleaseDate: true,
  utpNo: true,
  jailName: true,
  jailId: true,
  prisonerId: true,
  prisonerType: true,
  ward: true,
  barrack: true,
  registerNo: true,
  periodUndergone: true,
  additionalRemarks: true,
  criminalId: true,
  crimeId: true,
  createdAt: true,
} as const;

export const CrimeColumn = {
  id: true,
  typeOfCrime: true,
  sectionOfLaw: true,
  mobFileNo: true,
  hsNo: true,
  hsOpeningDate: true,
  hsClosingDate: true,
} as const;

export const AccusedColumn = {
  id: true,
  name: true,
} as const;

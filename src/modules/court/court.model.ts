import { WorksheetColumnsType } from "../../utils/excel";

export type CourtExcelData = {
  courtName: string;
  ccScNo?: string | undefined;
  psName?: string | undefined;
  firNo?: string | undefined;
  lawyerName?: string | undefined;
  lawyerContact?: string | undefined;
  suretyProviderDetail?: string | undefined;
  suretyProviderContact?: string | undefined;
  stageOfCase?: string | undefined;
  additionalRemarks?: string | undefined;
  criminalId?: number | undefined;
  crimeId?: number | undefined;
};

export const ExcelFailedCourtsColumns: WorksheetColumnsType = [
  { key: "courtName", header: "Court Name" },
  { key: "ccScNo", header: "cc/sc No" },
  { key: "psName", header: "ps Name" },
  { key: "firNo", header: "FIR No." },
  { key: "lawyerName", header: "Lawyer Name" },
  { key: "lawyerContact", header: "Lawyer Contact" },
  { key: "suretyProviderDetail", header: "Surety Provider Detail" },
  { key: "suretyProviderContact", header: "Surety Provider Contact" },
  { key: "stageOfCase", header: "Stage Of Case" },
  { key: "additionalRemarks", header: "Additional Remarks" },
  { key: "criminalId", header: "Criminal Id" },
  { key: "crimeId", header: "Crime Id" },
  { key: "error", header: "Error" },
];

export const ExcelCourtsColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "courtName", header: "Court Name" },
  { key: "ccScNo", header: "cc/sc No" },
  { key: "psName", header: "ps Name" },
  { key: "firNo", header: "FIR No." },
  { key: "lawyerName", header: "Lawyer Name" },
  { key: "lawyerContact", header: "Lawyer Contact" },
  { key: "suretyProviderDetail", header: "Surety Provider Detail" },
  { key: "suretyProviderContact", header: "Surety Provider Contact" },
  { key: "stageOfCase", header: "Stage Of Case" },
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

export type CourtExcelType = {
  id: number;
  courtName: string;
  ccScNo?: string | null | undefined;
  psName?: string | null | undefined;
  firNo?: string | null | undefined;
  lawyerName?: string | null | undefined;
  lawyerContact?: string | null | undefined;
  suretyProviderDetail?: string | null | undefined;
  suretyProviderContact?: string | null | undefined;
  stageOfCase?: string | null | undefined;
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

export const CourtColumn = {
  id: true,
  courtName: true,
  ccScNo: true,
  psName: true,
  firNo: true,
  lawyerName: true,
  lawyerContact: true,
  suretyProviderDetail: true,
  suretyProviderContact: true,
  stageOfCase: true,
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

export const CourtHearingColumn = {
  hearingDate: true,
  nextHearingDate: true,
} as const;

import { WorksheetColumnsType } from "../../utils/excel";

export const ExcelCourtsColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "courtName", header: "Court Name" },
  { key: "ccScNo", header: "cc/sc No" },
  { key: "psName", header: "ps Name" },
  {
    key: "hearingDate",
    header: "Hearing Date",
  },
  { key: "nextHearingDate", header: "Next Hearing Date" },
  { key: "attendance", header: "Attendance" },
  { key: "lawyerName", header: "Lawyer Name" },
  { key: "lawyerContact", header: "Lawyer Contact" },
  { key: "suretyProviderDetail", header: "Surety Provider Detail" },
  { key: "suretyProviderContact", header: "Surety Provider Contact" },
  { key: "stageOfCase", header: "Stage Of Case" },
  { key: "additionalRemarks", header: "Additional Remarks" },
  { key: "criminalId", header: "Criminal Id" },
  { key: "accused", header: "Accused" },
  { key: "crimeId", header: "Crime Id" },
  { key: "crime", header: "Crime" },
];

export const CourtColumn = {
  id: true,
  courtName: true,
  ccScNo: true,
  psName: true,
  hearingDate: true,
  nextHearingDate: true,
  attendance: true,
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

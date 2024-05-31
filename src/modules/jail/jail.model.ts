import { WorksheetColumnsType } from "../../utils/excel";

export const ExcelJailsColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "lawSection", header: "Law Section" },
  { key: "policeStation", header: "Police Station" },
  {
    key: "jailEntryDate",
    header: "Jail Entry Date",
  },
  { key: "jailReleaseDate", header: "Jail Release Date" },
  { key: "utpNo", header: "UTP No." },
  { key: "jailVisitorDetail", header: "Jail Visitior Detail" },
  { key: "visitorRelationship", header: "Visitor Relationship" },
  { key: "additionalRemarks", header: "Additional Remarks" },
  { key: "criminalId", header: "Criminal Id" },
  { key: "accused", header: "Accused" },
  { key: "crimeId", header: "Crime Id" },
  { key: "crime", header: "Crime" },
];

export const JailColumn = {
  id: true,
  lawSection: true,
  policeStation: true,
  jailEntryDate: true,
  jailReleaseDate: true,
  utpNo: true,
  jailVisitorDetail: true,
  visitorRelationship: true,
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

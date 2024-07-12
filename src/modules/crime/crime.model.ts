import { WorksheetColumnsType } from "../../utils/excel";

export type CrimeExcelData = {
  typeOfCrime: string;
  sectionOfLaw: string;
  mobFileNo?: string | undefined;
  hsNo?: string | undefined;
  dateOfCrime?: string | undefined;
  hsOpeningDate?: string | undefined;
  hsClosingDate?: string | undefined;
  policeStation?: string | undefined;
  firNo?: string | undefined;
  crimeGroup?: string | undefined;
  crimeHead?: string | undefined;
  crimeClass?: string | undefined;
  briefFact?: string | undefined;
  cluesLeft?: string | undefined;
  languagesKnown?: string | undefined;
  languagesUsed?: string | undefined;
  placeAttacked?: string | undefined;
  placeOfAssemblyAfterOffence?: string | undefined;
  placeOfAssemblyBeforeOffence?: string | undefined;
  propertiesAttacked?: string | undefined;
  styleAssumed?: string | undefined;
  toolsUsed?: string | undefined;
  tradeMarks?: string | undefined;
  transportUsedAfter?: string | undefined;
  transportUsedBefore?: string | undefined;
  gang: "Yes" | "No";
  gangStrength?: string | undefined;
};

export const ExcelFailedCrimesColumns: WorksheetColumnsType = [
  { key: "typeOfCrime", header: "Type Of Crime" },
  { key: "sectionOfLaw", header: "Section Of Law" },
  { key: "mobFileNo", header: "Mob File No" },
  { key: "dateOfCrime", header: "Date Of Crime" },
  {
    key: "hsNo",
    header: "HS No.",
  },
  { key: "hsOpeningDate", header: "HS Opening Date" },
  { key: "hsClosingDate", header: "HS Closing Date" },
  { key: "policeStation", header: "Police Station" },
  { key: "firNo", header: "FIR No." },
  { key: "crimeGroup", header: "Crime Group" },
  { key: "crimeHead", header: "Crime Head" },
  { key: "crimeClass", header: "Crime Class" },
  { key: "briefFact", header: "Brief Fact" },
  { key: "cluesLeft", header: "Clues Left" },
  { key: "languagesKnown", header: "Languages Known" },
  { key: "languagesUsed", header: "Languages Used" },
  { key: "placeAttacked", header: "Place Attacked" },
  {
    key: "placeOfAssemblyAfterOffence",
    header: "Place Of Assembly After Offence",
  },
  {
    key: "placeOfAssemblyBeforeOffence",
    header: "Place Of Assembly Before Offence",
  },
  { key: "propertiesAttacked", header: "Properties Attacked" },
  { key: "styleAssumed", header: "Style Assumed" },
  { key: "toolsUsed", header: "Tools Used" },
  { key: "tradeMarks", header: "Trade Marks" },
  { key: "transportUsedAfter", header: "Transport Used After" },
  { key: "transportUsedBefore", header: "Transport Used Before" },
  { key: "gang", header: "Gang" },
  { key: "gangStrength", header: "Gang Stength" },
  { key: "error", header: "Error" },
];

export const ExcelCrimesColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "typeOfCrime", header: "Type Of Crime" },
  { key: "sectionOfLaw", header: "Section Of Law" },
  { key: "mobFileNo", header: "Mob File No" },
  { key: "dateOfCrime", header: "Date Of Crime" },
  {
    key: "hsNo",
    header: "HS No.",
  },
  { key: "hsOpeningDate", header: "HS Opening Date" },
  { key: "hsClosingDate", header: "HS Closing Date" },
  { key: "policeStation", header: "Police Station" },
  { key: "firNo", header: "FIR No." },
  { key: "crimeGroup", header: "Crime Group" },
  { key: "crimeHead", header: "Crime Head" },
  { key: "crimeClass", header: "Crime Class" },
  { key: "briefFact", header: "Brief Fact" },
  { key: "cluesLeft", header: "Clues Left" },
  { key: "languagesKnown", header: "Languages Known" },
  { key: "languagesUsed", header: "Languages Used" },
  { key: "placeAttacked", header: "Place Attacked" },
  {
    key: "placeOfAssemblyAfterOffence",
    header: "Place Of Assembly After Offence",
  },
  {
    key: "placeOfAssemblyBeforeOffence",
    header: "Place Of Assembly Before Offence",
  },
  { key: "propertiesAttacked", header: "Properties Attacked" },
  { key: "styleAssumed", header: "Style Assumed" },
  { key: "toolsUsed", header: "Tools Used" },
  { key: "tradeMarks", header: "Trade Marks" },
  { key: "transportUsedAfter", header: "Transport Used After" },
  { key: "transportUsedBefore", header: "Transport Used Before" },
  { key: "gang", header: "Gang" },
  { key: "gangStrength", header: "Gang Stength" },
  { key: "criminal_ids", header: "Criminal Ids" },
  { key: "criminal_names", header: "Criminal Names" },
];

export const CriminalColumn = {
  id: true,
  name: true,
} as const;

export const CrimeColumn = {
  id: true,
  typeOfCrime: true,
  sectionOfLaw: true,
  mobFileNo: true,
  dateOfCrime: true,
  hsNo: true,
  hsOpeningDate: true,
  hsClosingDate: true,
  policeStation: true,
  firNo: true,
  crimeGroup: true,
  crimeHead: true,
  crimeClass: true,
  briefFact: true,
  cluesLeft: true,
  languagesKnown: true,
  languagesUsed: true,
  placeAttacked: true,
  placeOfAssemblyAfterOffence: true,
  placeOfAssemblyBeforeOffence: true,
  propertiesAttacked: true,
  styleAssumed: true,
  toolsUsed: true,
  tradeMarks: true,
  transportUsedAfter: true,
  transportUsedBefore: true,
  gang: true,
  gangStrength: true,
  createdAt: true,
} as const;

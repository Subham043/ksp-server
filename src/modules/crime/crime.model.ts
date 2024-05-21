import { desc, eq, ilike, or } from "drizzle-orm";
import db from "../../db";
import { crimes } from "../../db/schema/crime";
import { WorksheetColumnsType } from "../../utils/excel";
import { criminals } from "../../db/schema/criminal";

export const ExcelCrimesColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "typeOfCrime", header: "Type Of Crime" },
  { key: "sectionOfLaw", header: "Section Of Law" },
  { key: "mobFileNo", header: "Mob File No" },
  {
    key: "hsNo",
    header: "HS No.",
  },
  { key: "hsOpeningDate", header: "HS Opening Date" },
  { key: "hsClosingDate", header: "HS Closing Date" },
  { key: "aliases", header: "Aliases" },
  { key: "ageWhileOpening", header: "Age While Opening" },
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
  { key: "criminal", header: "Criminal Id" },
  { key: "name", header: "Criminal Name" },
];

export const CriminalSelect = {
  name: criminals.name,
};
export const CriminalColumn = {
  id: true,
  name: true,
} as const;
export const CrimeSelect = {
  id: crimes.id,
  typeOfCrime: crimes.typeOfCrime,
  sectionOfLaw: crimes.sectionOfLaw,
  mobFileNo: crimes.mobFileNo,
  hsNo: crimes.hsNo,
  hsOpeningDate: crimes.hsOpeningDate,
  hsClosingDate: crimes.hsClosingDate,
  aliases: crimes.aliases,
  ageWhileOpening: crimes.ageWhileOpening,
  crimeGroup: crimes.crimeGroup,
  crimeHead: crimes.crimeHead,
  crimeClass: crimes.crimeClass,
  briefFact: crimes.briefFact,
  cluesLeft: crimes.cluesLeft,
  languagesKnown: crimes.languagesKnown,
  languagesUsed: crimes.languagesUsed,
  placeAttacked: crimes.placeAttacked,
  placeOfAssemblyAfterOffence: crimes.placeOfAssemblyAfterOffence,
  placeOfAssemblyBeforeOffence: crimes.placeOfAssemblyBeforeOffence,
  propertiesAttacked: crimes.propertiesAttacked,
  styleAssumed: crimes.styleAssumed,
  toolsUsed: crimes.toolsUsed,
  tradeMarks: crimes.tradeMarks,
  transportUsedAfter: crimes.transportUsedAfter,
  transportUsedBefore: crimes.transportUsedBefore,
  gang: crimes.gang,
  gangStrength: crimes.gangStrength,
  criminal: crimes.criminal,
  createdAt: crimes.createdAt,
};

export const CrimeColumn = {
  id: true,
  typeOfCrime: true,
  sectionOfLaw: true,
  mobFileNo: true,
  hsNo: true,
  hsOpeningDate: true,
  hsClosingDate: true,
  aliases: true,
  ageWhileOpening: true,
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

export const MasterSelect = {
  ...CrimeSelect,
  ...CriminalSelect,
};

export const Descending_Crime_CreatedAt = desc(crimes.createdAt);

export const Select_Master_Query = db
  .select(MasterSelect)
  .from(crimes)
  .leftJoin(criminals, eq(crimes.criminal, criminals.id));

export const Search_Query = (search: string) =>
  or(
    ilike(crimes.typeOfCrime, `%${search}%`),
    ilike(crimes.sectionOfLaw, `%${search}%`),
    ilike(crimes.mobFileNo, `%${search}%`),
    ilike(crimes.hsNo, `%${search}%`),
    ilike(crimes.aliases, `%${search}%`),
    ilike(crimes.ageWhileOpening, `%${search}%`),
    ilike(crimes.crimeGroup, `%${search}%`),
    ilike(crimes.crimeHead, `%${search}%`),
    ilike(crimes.crimeClass, `%${search}%`),
    ilike(crimes.briefFact, `%${search}%`),
    ilike(crimes.cluesLeft, `%${search}%`),
    ilike(crimes.languagesKnown, `%${search}%`),
    ilike(crimes.languagesUsed, `%${search}%`),
    ilike(crimes.placeAttacked, `%${search}%`),
    ilike(crimes.placeOfAssemblyAfterOffence, `%${search}%`),
    ilike(crimes.placeOfAssemblyBeforeOffence, `%${search}%`),
    ilike(crimes.propertiesAttacked, `%${search}%`),
    ilike(crimes.styleAssumed, `%${search}%`),
    ilike(crimes.toolsUsed, `%${search}%`),
    ilike(crimes.tradeMarks, `%${search}%`),
    ilike(crimes.transportUsedAfter, `%${search}%`),
    ilike(crimes.transportUsedBefore, `%${search}%`)
  );

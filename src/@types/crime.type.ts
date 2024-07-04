export type CrimeQueryType = {
  id: number;
  typeOfCrime: string;
  sectionOfLaw: string;
  mobFileNo?: string | null;
  hsNo?: string | null;
  dateOfCrime?: Date | null;
  hsOpeningDate?: Date | null;
  hsClosingDate?: Date | null;
  policeStation?: string | null;
  firNo?: string | null;
  crimeGroup?: string | null;
  crimeHead?: string | null;
  crimeClass?: string | null;
  briefFact?: string | null;
  cluesLeft?: string | null;
  languagesKnown?: string | null;
  languagesUsed?: string | null;
  placeAttacked?: string | null;
  placeOfAssemblyAfterOffence?: string | null;
  placeOfAssemblyBeforeOffence?: string | null;
  propertiesAttacked?: string | null;
  styleAssumed?: string | null;
  toolsUsed?: string | null;
  tradeMarks?: string | null;
  transportUsedAfter?: string | null;
  transportUsedBefore?: string | null;
  gang: "Yes" | "No";
  gangStrength?: string | null;
  createdAt?: Date | null;
  criminals: {
    criminal: {
      id: number;
      name: string;
    };
  }[];
};

export type CrimeType = {
  id: number;
  typeOfCrime: string;
  sectionOfLaw: string;
  mobFileNo?: string | null;
  hsNo?: string | null;
  dateOfCrime?: Date | null;
  hsOpeningDate?: Date | null;
  hsClosingDate?: Date | null;
  policeStation?: string | null;
  firNo?: string | null;
  crimeGroup?: string | null;
  crimeHead?: string | null;
  crimeClass?: string | null;
  briefFact?: string | null;
  cluesLeft?: string | null;
  languagesKnown?: string | null;
  languagesUsed?: string | null;
  placeAttacked?: string | null;
  placeOfAssemblyAfterOffence?: string | null;
  placeOfAssemblyBeforeOffence?: string | null;
  propertiesAttacked?: string | null;
  styleAssumed?: string | null;
  toolsUsed?: string | null;
  tradeMarks?: string | null;
  transportUsedAfter?: string | null;
  transportUsedBefore?: string | null;
  gang: "Yes" | "No";
  gangStrength?: string | null;
  criminals: number[];
  createdAt?: Date | null;
};

export type CrimeOmitType = Omit<CrimeType, "id" | "createdAt" | "criminals">;
export interface CrimeCreateType extends CrimeOmitType {}

export interface CrimeUpdateType extends CrimeCreateType {}

export interface CrimePostRepositoryType extends CrimeOmitType {}

export interface CrimeExcelType extends CrimeQueryType {
  criminal_ids: string;
  criminal_names: string;
}

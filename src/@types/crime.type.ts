export type CrimeType = {
  id: number;
  typeOfCrime: string;
  sectionOfLaw: string;
  mobFileNo?: string | null;
  hsNo?: string | null;
  hsOpeningDate?: Date | null;
  hsClosingDate?: Date | null;
  aliases?: string | null;
  ageWhileOpening?: string | null;
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
  voice?: string | null;
  build?: string | null;
  complexion?: string | null;
  teeth?: string | null;
  hair?: string | null;
  eyes?: string | null;
  habbits?: string | null;
  burnMarks?: string | null;
  tattoo?: string | null;
  mole?: string | null;
  scar?: string | null;
  leucoderma?: string | null;
  faceHead?: string | null;
  otherPartsBody?: string | null;
  dressUsed?: string | null;
  beard?: string | null;
  face?: string | null;
  moustache?: string | null;
  nose?: string | null;
  gang: "Yes" | "No";
  gangStength?: string | null;
  criminal: number;
  name?: string | null;
  createdAt?: Date | null;
};

export type CrimeOmitType = Omit<CrimeType, "id" | "createdAt" | "name">;
export interface CrimeCreateType extends CrimeOmitType {}

export interface CrimeUpdateType extends CrimeCreateType {}

export interface CrimePostRepositoryType extends CrimeOmitType {}

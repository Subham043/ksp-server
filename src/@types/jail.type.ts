export type JailType = {
  id: number;
  lawSection?: string | null | undefined;
  policeStation?: string | null | undefined;
  jailEntryDate?: Date | null;
  jailReleaseDate?: Date | null;
  utpNo?: string | null | undefined;
  jailVisitorDetail?: string | null | undefined;
  visitorRelationship?: string | null | undefined;
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
  createdAt?: Date | null;
};

export type JailOmitType = Omit<
  JailType,
  "id" | "createdAt" | "crime" | "accused"
>;
export interface JailCreateType extends JailOmitType {}

export interface JailUpdateType extends JailCreateType {}

export interface JailPostRepositoryType extends JailType {}

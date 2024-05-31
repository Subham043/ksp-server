export type CourtType = {
  id: number;
  courtName: string;
  ccScNo?: string | null | undefined;
  psName?: string | null | undefined;
  hearingDate?: Date | null;
  nextHearingDate?: Date | null;
  attendance?: string | null | undefined;
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
  createdAt?: Date | null;
};

export type CourtOmitType = Omit<
  CourtType,
  "id" | "createdAt" | "crime" | "accused"
>;
export interface CourtCreateType extends CourtOmitType {}

export interface CourtUpdateType extends CourtCreateType {}

export interface CourtPostRepositoryType extends CourtType {}

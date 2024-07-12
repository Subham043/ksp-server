export type CrimesByCriminalsQueryType = {
  id: number;
  aliases?: string | null;
  ageWhileOpening?: string | null;
  crimeArrestOrder?: string | null;
  createdAt?: Date | null;
  crimeId: number;
  crime: {
    id: number;
    typeOfCrime: string;
    sectionOfLaw: string;
    mobFileNo?: string | null;
    hsNo?: string | null;
    hsOpeningDate?: Date | null;
    hsClosingDate?: Date | null;
    policeStation?: string | null;
    firNo?: string | null;
  };
  criminalId: number;
  criminal: {
    id: number;
    name: string;
    sex: "Male" | "Female" | "Others";
    dob?: Date | null;
    phone?: string | null | undefined;
    aadhar_no?: string | null | undefined;
    aadhar_photo?: string | null | undefined;
    photo?: string | null | undefined;
  };
};

export type CrimesByCriminalsType = {
  id: number;
  aliases?: string | null;
  ageWhileOpening?: string | null;
  crimeArrestOrder?: string | null;
  crimeId: number;
  criminalId: number;
  createdAt?: Date | null;
};

export type CrimesByCriminalsOmitType = Omit<
  CrimesByCriminalsType,
  "id" | "createdAt" | "crimeId"
>;
export interface CrimesByCriminalsCreateType
  extends CrimesByCriminalsOmitType {}

export interface CrimesByCriminalsUpdateType
  extends CrimesByCriminalsCreateType {}

export interface CrimesByCriminalsPostRepositoryType
  extends CrimesByCriminalsOmitType {}

export interface CrimesByCriminalsExcelType
  extends CrimesByCriminalsQueryType {}

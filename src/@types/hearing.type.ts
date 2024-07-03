export type HearingType = {
  id: number;
  hearingDate?: Date | null;
  nextHearingDate?: Date | null;
  attendance?: string | null | undefined;
  judgeName?: string | null | undefined;
  actionCode?: string | null | undefined;
  additionalRemarks?: string | null | undefined;
  courtId?: number | null | undefined;
};

export type HearingOmitType = Omit<HearingType, "id" | "createdAt" | "courtId">;
export interface HearingCreateType extends HearingOmitType {}

export interface HearingUpdateType extends HearingCreateType {}

export interface HearingPostRepositoryType extends HearingType {}

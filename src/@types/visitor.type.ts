export type VisitorType = {
  id: number;
  visitonDate?: Date | null;
  name?: string | null | undefined;
  relation?: string | null | undefined;
  additionalRemarks?: string | null | undefined;
  jailId?: number | null | undefined;
};

export type VisitorOmitType = Omit<VisitorType, "id" | "createdAt" | "jailId">;
export interface VisitorCreateType extends VisitorOmitType {}

export interface VisitorUpdateType extends VisitorCreateType {}

export interface VisitorPostRepositoryType extends VisitorType {}

import { WorksheetColumnsType } from "../../utils/excel";

export type HearingExcelData = {
  hearingDate?: string | undefined;
  nextHearingDate?: string | undefined;
  attendance?: string | undefined;
  judgeName?: string | undefined;
  actionCodejudgeName?: string | undefined;
  additionalRemarks?: string | undefined;
  courtId?: number | undefined;
};

export const ExcelFailedHearingsColumns: WorksheetColumnsType = [
  {
    key: "hearingDate",
    header: "Hearing Date",
  },
  {
    key: "nextHearingDate",
    header: "Next Hearing Date",
  },
  { key: "attendance", header: "Attendance" },
  { key: "judgeName", header: "Judge Name" },
  { key: "actionCode", header: "Action Code" },
  { key: "additionalRemarks", header: "Additional Remarks" },
  { key: "courtId", header: "Court Id" },
  { key: "error", header: "Error" },
];

export const ExcelHearingsColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  {
    key: "hearingDate",
    header: "Hearing Date",
  },
  {
    key: "nextHearingDate",
    header: "Next Hearing Date",
  },
  { key: "attendance", header: "Attendance" },
  { key: "judgeName", header: "Judge Name" },
  { key: "actionCode", header: "Action Code" },
  { key: "additionalRemarks", header: "Additional Remarks" },
  { key: "courtId", header: "Court Id" },
];

export type HearingExportType = {
  id: number;
  hearingDate?: Date | null;
  nextHearingDate?: Date | null;
  attendance?: string | null | undefined;
  judgeName?: string | null | undefined;
  actionCode?: string | null | undefined;
  additionalRemarks?: string | null | undefined;
  courtId?: number | null | undefined;
};

export const HearingColumn = {
  id: true,
  hearingDate: true,
  nextHearingDate: true,
  attendance: true,
  judgeName: true,
  actionCode: true,
  additionalRemarks: true,
  courtId: true,
  createdAt: true,
} as const;

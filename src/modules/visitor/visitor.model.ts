import { WorksheetColumnsType } from "../../utils/excel";

export type VisitorExcelData = {
  visitonDate?: string | undefined;
  name?: string | undefined;
  relation?: string | undefined;
  additionalRemarks?: string | undefined;
  jailId?: number | undefined;
};

export const ExcelFailedVisitorsColumns: WorksheetColumnsType = [
  {
    key: "visitonDate",
    header: "Visiting Date",
  },
  { key: "name", header: "Name" },
  { key: "relation", header: "Relation" },
  { key: "additionalRemarks", header: "Additional Remarks" },
  { key: "jailId", header: "Jail Id" },
  { key: "error", header: "Error" },
];

export const ExcelVisitorsColumns: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  {
    key: "visitonDate",
    header: "Visiting Date",
  },
  { key: "name", header: "Name" },
  { key: "relation", header: "Relation" },
  { key: "additionalRemarks", header: "Additional Remarks" },
  { key: "jailId", header: "Jail Id" },
];

export type VisitorExportType = {
  id: number;
  visitonDate?: Date | null;
  name?: string | null | undefined;
  relation?: string | null | undefined;
  additionalRemarks?: string | null | undefined;
  jailId?: number | null | undefined;
};

export const VisitorColumn = {
  id: true,
  visitonDate: true,
  name: true,
  relation: true,
  additionalRemarks: true,
  jailId: true,
  createdAt: true,
} as const;

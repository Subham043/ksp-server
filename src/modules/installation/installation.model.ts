import { WorksheetColumnsType } from "../../utils/excel";

export const ExcelInstallationsColumn: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "IPv4", header: "IPv4" },
  { key: "createdAt", header: "Created At" },
];

export const InstallationColumn = {
  id: true,
  IPv4: true,
  createdAt: true,
} as const;

import { WorksheetColumnsType } from "../../utils/excel";

export type UserExcelData = {
  name: string | undefined;
  email: string | undefined;
  role: string | undefined;
  password: string | undefined;
  confirm_password: string | undefined;
};

export const ExcelFailedUsersColumn: WorksheetColumnsType = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  { key: "password", header: "Password" },
  { key: "confirm_password", header: "Confirm Password" },
  { key: "error", header: "Error" },
];

export const ExcelUsersColumn: WorksheetColumnsType = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
  { key: "role", header: "Role" },
  { key: "createdAt", header: "Created At" },
];

export const UserColumn = {
  id: true,
  name: true,
  email: true,
  status: true,
  role: true,
  createdAt: true,
} as const;

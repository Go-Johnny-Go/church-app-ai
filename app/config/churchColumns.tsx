import { TableColumn, Church } from "../types/types";

export const churchColumns: TableColumn<Church>[] = [
  { key: "photo", label: "Photo", render: (value) => <img src={value} alt="church" className="h-10 w-10 rounded-full" /> },
  { key: "name", label: "Church Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" }
];

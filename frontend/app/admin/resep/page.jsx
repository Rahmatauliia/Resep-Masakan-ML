import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function AdminResepPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Kelola Resep</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <DataTable columns={columns} />
      </div>
    </div>
  );
}

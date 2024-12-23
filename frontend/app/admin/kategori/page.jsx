import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function KategoriPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Kelola Kategori</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <DataTable columns={columns} />
      </div>
    </div>
  );
}

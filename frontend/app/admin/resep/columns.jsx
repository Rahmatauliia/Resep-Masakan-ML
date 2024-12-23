"use client";
import DataTableRowActions from "./dataTableRowActions";

export const columns = [
  {
    accessorKey: "nama",
    header: "Nama Resep",
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Buat",
    cell: ({ cell }) => {
      return new Date(cell.getValue()).toLocaleDateString("en-GB");
    },
  },
  {
    accessorKey: "updated_at",
    header: "Tanggal Update",
    cell: ({ cell }) => {
      return (
        <span suppressHydrationWarning={true}>
          {new Date(cell.getValue()).toLocaleDateString("en-GB")}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

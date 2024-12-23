"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Swal from "sweetalert2";
import MySwal from "@/lib/sweetAlert";
import axios from "axios";
import { useContext } from "react";
import { RefreshDataTableContext } from "@/context/RefreshDataTableContext";

export default function DataTableRowActions({ row }) {
  const { setRefresh, setLoading } = useContext(RefreshDataTableContext);
  const handleClickHapus = () => {
    Swal.fire({
      title: "Yakin?",
      text: "Kamu akan menghapus resep ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        await axios.delete(
          `http://127.0.0.1:8000/api/resep/${row.original.id}`
        );
        MySwal.fire({
          title: "Berhasil",
          text: "Data resep berhasil dihapus",
          icon: "success",
        }).then(() => {
          setRefresh((prev) => !prev);
        });
      }
    });
  };

  return (
    <>
      <Link href={`/admin/resep/${row.original.id}`}>
        <Button
          className="bg-yellow-300 hover:bg-yellow-500 text-black"
          size="sm"
        >
          Edit <FaPencil className="ms-2" />
        </Button>
      </Link>
      <Button
        className="bg-red-400 hover:bg-red-500 text-black ms-2"
        size="sm"
        onClick={handleClickHapus}
      >
        Hapus <FaTrash className="ms-2" />
      </Button>
    </>
  );
}

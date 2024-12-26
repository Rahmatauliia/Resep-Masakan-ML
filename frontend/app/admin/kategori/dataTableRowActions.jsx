"use client";

import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Swal from "sweetalert2";
import MySwal from "@/lib/sweetAlert";
import axios from "axios";
import { useContext } from "react";
import { KategoriContext } from "./data-table";
import API_URL from "@/utils/api-url";

export default function DataTableRowActions({ row }) {
  const { setEditKategori, setDataEditKategori, setAddKategori, setRefresh } =
    useContext(KategoriContext);
  const handleClickHapus = () => {
    Swal.fire({
      title: "Yakin?",
      text: "Kamu akan menghapus kategori ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(
          `${API_URL}/api/kategori/${row.original.id}`
        );
        MySwal.fire({
          title: "Berhasil",
          text: "Data kategori berhasil dihapus",
          icon: "success",
        }).then(() => {
          setRefresh((prev) => !prev);
        });
      }
    });
  };

  return (
    <>
      <Button
        className="bg-yellow-300 hover:bg-yellow-500 text-black"
        size="sm"
        onClick={() => {
          setEditKategori(true);
          setAddKategori(false);
          setDataEditKategori(row.original);
        }}
      >
        Edit <FaPencil className="ms-2" />
      </Button>
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

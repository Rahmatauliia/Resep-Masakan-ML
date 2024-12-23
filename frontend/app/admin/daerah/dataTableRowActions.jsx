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
import { DaerahContext } from "./data-table";

export default function DataTableRowActions({ row }) {
  const { setEditDaerah, setDataEditDaerah, setAddDaerah, setRefresh } =
    useContext(DaerahContext);
  const handleClickHapus = () => {
    Swal.fire({
      title: "Yakin?",
      text: "Kamu akan menghapus daerah ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(
          `http://127.0.0.1:8000/api/daerah/${row.original.id}`
        );
        MySwal.fire({
          title: "Berhasil",
          text: "Data daerah berhasil dihapus",
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
          setEditDaerah(true);
          setAddDaerah(false);
          setDataEditDaerah(row.original);
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
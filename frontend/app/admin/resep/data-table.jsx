"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddResep from "./addResep";
import { RefreshDataTableContext } from "@/context/RefreshDataTableContext";
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen";

export function DataTable({ columns }) {
  const { refresh, loading, setLoading } = useContext(RefreshDataTableContext);
  const [columnFilters, setColumnFilters] = useState([]);
  const [addResep, setAddResep] = useState(false);
  const [data, setData] = useState([]);
  const [dataDaerah, setDataDaerah] = useState([]);
  const [dataKategori, setDataKategori] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/resep");
      setData(response.data.data);
    };
    const fetchDaerah = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/daerah");
      setDataDaerah(response.data.data);
    };

    const fetchKategori = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/kategori");
      setDataKategori(response.data.data);
    };
    fetchData();
    fetchDaerah();
    fetchKategori();
    setLoading(false);
  }, [refresh]);

  const table = useReactTable({
    data: data || 0,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      {loading && <LoadingScreen />}
      {addResep ? (
        <AddResep
          setAddResep={setAddResep}
          dataDaerah={dataDaerah}
          dataKategori={dataKategori}
        />
      ) : (
        <>
          {/* Filter */}
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Filter nama..."
              value={table.getColumn("nama")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("nama")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Button onClick={() => setAddResep(true)}>
              Tambah Resep <FaPlus className="inline ms-2" />
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel()?.rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          {/* End Pagination */}
        </>
      )}
    </div>
  );
}

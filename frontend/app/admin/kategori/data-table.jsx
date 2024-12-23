"use client";
import {
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
import { createContext, useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import AddKategori from "./addKategori";
import EditKategori from "./editKategori";

export const KategoriContext = createContext();

export function DataTable({ columns }) {
  //   const { refresh, setRefresh } = useContext(RefreshDataTableContext);
  const [columnFilters, setColumnFilters] = useState([]);
  const [addKategori, setAddKategori] = useState(false);
  const [editKategori, setEditKategori] = useState(false);
  const [dataEditKategori, setDataEditKategori] = useState({});
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/kategori");
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
    <KategoriContext.Provider
      value={{
        setEditKategori,
        setDataEditKategori,
        setAddKategori,
        dataEditKategori,
        setRefresh,
      }}
    >
      <div>
        <>
          {addKategori && (
            <AddKategori setAddKategori={setAddKategori} setData={setData} />
          )}
          {editKategori && (
            <EditKategori
              setEditKategori={setEditKategori}
              dataEditKategori={dataEditKategori}
              setData={setData}
              setRefresh={setRefresh}
            />
          )}
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
            {!addKategori && (
              <Button
                onClick={() => {
                  setAddKategori(true);
                  setEditKategori(false);
                }}
              >
                Tambah Kategori <FaPlus className="inline ms-2" />
              </Button>
            )}
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
      </div>
    </KategoriContext.Provider>
  );
}

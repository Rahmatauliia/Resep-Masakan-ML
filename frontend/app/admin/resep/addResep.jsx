"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/Tiptap";
import { useContext, useRef, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import InputImage from "@/components/InputImage";
import axios from "axios";
import MySwal from "@/lib/sweetAlert";
import { RefreshDataTableContext } from "@/context/RefreshDataTableContext";
import API_URL from "@/utils/api-url";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const validationSchema = z.object({
  nama: z
    .string()
    .min(1, "Judul tidak boleh kosong")
    .min(5, "Minimal 5 karakter")
    .max(50),
  daerah: z.string().min(1, "Daerah harus diisi"),
  kategori: z.string().min(1, "Kategori harus diisi"),
  bahan: z
    .string()
    .min(1, "Bahan tidak boleh kosong")
    .min(5, "Minimal 5 karakter"),
  langkah: z
    .string()
    .min(1, "Langkah tidak boleh kosong")
    .min(5, "Minimal 5 karakter"),
  gambar: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function AddResep({ setAddResep, dataDaerah, dataKategori }) {
  const [loading, setLoading] = useState(false);
  const { setRefresh } = useContext(RefreshDataTableContext);
  const daerahRef = useRef();
  const kategoriRef = useRef();

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      nama: "",
      daerah: "",
      kategori: "",
      bahan: "",
      langkah: "",
      gambar: "",
    },
  });

  const onSubmit = async (data) => {
    const langkah = JSON.parse(data.langkah);
    const bahan = JSON.parse(data.bahan);
    if (
      langkah.content[0].content === undefined ||
      bahan.content[0].content === undefined
    ) {
      if (langkah.content[0].content === undefined) {
        form.setError("langkah", {
          type: "custom",
          message: "Langkah tidak boleh kosong",
        });
      }
      if (bahan.content[0].content === undefined) {
        form.setError("bahan", {
          type: "custom",
          message: "Bahan tidak boleh kosong",
        });
      }
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/resep`,
        {
          nama: data.nama,
          bahan: data.bahan,
          langkah: data.langkah,
          gambar: data.gambar,
          id_daerah: data.daerah,
          id_kategori: data.kategori,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessTokenResep")}`,
          },
        }
      );

      MySwal.fire({
        title: <p>{response.data.message}</p>,
        icon: "success",
      });

      setRefresh((prev) => !prev);
      setAddResep(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      {loading && <LoadingScreen />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Nama Resep" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="daerah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daerah</FormLabel>
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={field.onChange}
              >
                <option selected>Pilih Daerah</option>
                {dataDaerah.map((daerah) => (
                  <option key={daerah.id} value={daerah.id}>
                    {daerah.nama}
                  </option>
                ))}
              </select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kategori"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={field.onChange}
              >
                <option selected>Pilih Kategori</option>
                {dataKategori.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.nama}
                  </option>
                ))}
              </select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gambar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <FormControl>
                <InputImage {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bahan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bahan</FormLabel>
              <FormControl>
                <div>
                  <Tiptap
                    content={field.value}
                    onChange={(newContent) => {
                      field.onChange(JSON.stringify(newContent));
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="langkah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Langkah</FormLabel>
              <FormControl>
                <div>
                  <Tiptap
                    content={field.value}
                    onChange={(newContent) => {
                      field.onChange(JSON.stringify(newContent));
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
        <Button
          variant="outline"
          className="ms-2"
          onClick={() => setAddResep(false)}
        >
          Batal
        </Button>
      </form>
    </Form>
  );
}

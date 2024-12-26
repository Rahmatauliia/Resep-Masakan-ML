"use client";

import InputImage from "@/components/InputImage";
import LoadingScreen from "@/components/LoadingScreen";
import Tiptap from "@/components/Tiptap";
import { generateHTML } from "@tiptap/core";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import MySwal from "@/lib/sweetAlert";

import generateConfig from "@/lib/configTiptap";
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
  gambar: z.any().optional(),
});

export default function EditResep({ resep, dataKategori, dataDaerah }) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const bahan = useMemo(() => {
    return generateHTML(JSON.parse(resep.bahan), generateConfig);
  }, [resep.bahan]);
  const langkah = useMemo(() => {
    return generateHTML(JSON.parse(resep.langkah), generateConfig);
  }, [resep.langkah]);

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      nama: resep.nama,
      bahan: bahan,
      langkah: langkah,
      daerah: resep.id_daerah + "",
      kategori: resep.id_kategori + "",
      gambar: resep.gambar,
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
      const formData = new FormData();
      formData.append("_method", "put");
      formData.append("nama", data.nama);
      formData.append("bahan", data.bahan);
      formData.append("langkah", data.langkah);
      formData.append("id_daerah", data.daerah);
      formData.append("id_kategori", data.kategori);
      if (data.gambar) {
        formData.append("gambar", data.gambar);
      }
      const response = await axios.post(
        `${API_URL}/api/resep/${resep.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessTokenResep")}`,
          },
        }
      );

      MySwal.fire({
        title: <p>{response.data.message}</p>,
        icon: "success",
      });

      router.push("/admin/resep");
      setLoading(false);
    } catch (error) {
      console.log(error);
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
                defaultValue={resep.id_daerah}
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
                defaultValue={resep.id_kategori}
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
              <Image
                src={`${API_URL}/storage/images/${resep.gambar}`}
                alt="Gambar Resep"
                width={200}
                height={200}
                className="pb-4"
              />
              <FormLabel>Ganti Gambar</FormLabel>
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
          type="button"
          onClick={() => router.push("/admin/resep")}
        >
          Batal
        </Button>
      </form>
    </Form>
  );
}

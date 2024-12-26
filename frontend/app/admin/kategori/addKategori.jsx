"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import axios from "axios";
import MySwal from "@/lib/sweetAlert";
import API_URL from "@/utils/api-url";

const validationSchema = z.object({
  nama: z.string().min(1, "Nama kategori harus diisi"),
});
export default function AddKategori({ setAddKategori, setData }) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      nama: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/kategori`,
        {
          nama: data.nama,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessTokenResep")}`,
          },
        }
      );
      if (response.status === 200) {
        MySwal.fire({
          title: <p>Tambah Kategori Berhasil</p>,
          icon: "success",
        });
        setLoading(false);
        setData((prev) => [...prev, response.data.data]);
        form.reset();
        document.querySelector('[name="nama"]').focus();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      {loading && <LoadingScreen />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-5">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Nama kategori" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Tambah</Button>
        <Button
          variant="outline"
          className="ms-2"
          onClick={() => setAddKategori(false)}
        >
          Batal
        </Button>
      </form>
    </Form>
  );
}

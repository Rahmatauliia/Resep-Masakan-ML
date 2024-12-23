"use client";

import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import MySwal from "@/lib/sweetAlert";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
  password: z.string().min(1, "Password harus diisi"),
  password_confirmation: z.string().min(1, "Konfirmasi Password harus diisi"),
});

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
  const onSubmit = async (values) => {
    const { name, email, password, password_confirmation } = values;
    try {
      await register({ name, email, password, password_confirmation });
      MySwal.fire({
        title: <p>Register Berhasil</p>,
        icon: "success",
      });
      router.push("/");
    } catch (error) {
      console.log("register gagal : ", error);
      MySwal.fire({
        title: <p>Register Gagal</p>,
        icon: "error",
        text: error.response.data.message,
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Nama Lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Konfirmasi Password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={"block w-full font-semibold"}>
          Register
        </Button>
      </form>
    </Form>
  );
}

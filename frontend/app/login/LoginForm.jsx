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
  email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
  password: z.string().min(1, "Password harus diisi"),
});

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      await login({ email, password });
      MySwal.fire({
        title: <p>Login Berhasil</p>,
        icon: "success",
      });
      router.push("/");
    } catch (error) {
      MySwal.fire({
        title: <p>{error.response.data.message}</p>,
        icon: "error",
      })
      console.log("login gagal : ", error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" className={"block w-full font-semibold"}>
          Login
        </Button>
      </form>
    </Form>
  );
}

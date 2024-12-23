'use client'

import { useAuth } from "@/context/AuthContext";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RegisterForm from "./registerForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (user) {
      router.back()
    }

  }, [user])
  return (
    <main>
      <Navbar />
      <div className="w-[600px] mx-auto mt-36 shadow-xl bg-white border rounded-md p-8">
        <h1 className="text-center text-2xl font-bold mb-10">REGISTER</h1>
        <RegisterForm />
      </div>
      <Footer />
    </main>
  );
}

'use client';

import { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import LoginForm from "./LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const {user} = useAuth()
  const router = useRouter()
  useEffect(()=> {
    if(user) {
      router.back()
    }
    
  }, [user])
  return (
    <main>
      <Navbar />
      <div className="w-[600px] mx-auto mt-36 shadow-xl border rounded-md p-8 bg-white">
        <h1 className="text-center text-2xl font-bold mb-10">LOGIN</h1>
        <LoginForm />
      </div>
      <Footer />
    </main>
  );
}

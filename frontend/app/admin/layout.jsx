'use client'

import LoadingScreen from "@/components/LoadingScreen";
import NavAdmin from "@/components/NavAdmin";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [render, setRender] = useState(false)
  useEffect(() => {
    // if(loading) setRender(true)
    if (user && user.role !== 'admin') {
      router.push('/')
    }
    if (user && user.role === 'admin') {
      setRender(true)
    }
  }, [user])

  if (!render) {
    return <LoadingScreen />
  } else {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <NavAdmin />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            {children}
          </main>
        </div>
      </div>
    );
  }
}

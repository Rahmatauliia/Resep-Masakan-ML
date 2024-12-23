'use client'

import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { FaArrowRight, FaSignOutAlt, FaUser } from "react-icons/fa";
import ChangePassword from "./changePassword";
import { TbLogout2 } from "react-icons/tb";
import MySwal from "@/lib/sweetAlert";
import ChangeName from "./changeName";

export default function Page() {
    const { user, logout } = useAuth()

    const [editUsername, setEditUsername] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const handleLogout = async () => {
        try {
          await logout();
          MySwal.fire({
            title: <p>Logout Berhasil</p>,
            icon: "success",
          });
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

    useEffect(() => {
        if (user) {
            console.log(user)
        }
    }, [user])
    return (
        <main>
            <Navbar />
            <div className="w-[600px] mx-auto mt-36 shadow-xl bg-white border rounded-md p-8">
                <div className="w-[180px] h-[180px] rounded-full border shadow-lg flex justify-center items-center mx-auto">
                    <FaUser className="text-[100px]" />
                </div>
                {editUsername && (
                    <ChangeName setEditUsername={setEditUsername} />
                )}

                {editPassword && (
                    <ChangePassword setEditPassword={setEditPassword} />
                )}

                {!editUsername && !editPassword && (
                    <>
                        <h1 className="text-center text-2xl font-bold mt-5 mb-2">{user?.name}</h1>
                        <h1 className="text-center text-slate-500">{user?.email}</h1>

                        <button className="w-full flex justify-between border shadow-md p-3 mt-5 mb-3 hover:bg-slate-50 rounded-lg" onClick={() => setEditUsername(true)}>Ubah Nama <FaArrowRight className="inline mr-3 mt-1" /></button>
                        <button className="w-full mb-5 flex justify-between border shadow-md p-3 hover:bg-slate-50 rounded-lg" onClick={() => setEditPassword(true)}>Ubah Password <FaArrowRight className="inline mr-3 mt-1" /></button>
                        <button className="bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 font-semibold" onClick={() => handleLogout()}>Logout <TbLogout2 className="inline ml-1 -mt-1 text-lg" /></button>
                    </>
                )}
            </div>
        </main>
    )
}
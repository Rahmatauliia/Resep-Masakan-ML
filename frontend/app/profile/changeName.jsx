'use client'

import { useAuth } from "@/context/AuthContext";
import MySwal from "@/lib/sweetAlert";
import axios from "axios";
import { useState } from "react";
import { FaBan, FaSave } from "react-icons/fa";

export default function ChangeName({ setEditUsername }) {
    const [name, setName] = useState("")

    const { setUser } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:8000/api/change-name', {
                name
            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("accessTokenResep")}`,
                }
            })

            if (res.data.status = 200) {
                MySwal.fire({
                    title: <p>{res.data.message}</p>,
                    icon: "success",
                });
                setUser(res.data.user)
                setEditUsername(false)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <input type="text" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-200 shadow-sm p-3 rounded-lg focus:outline-red-500" />
            <button className="bg-yellow-300 hover:bg-yellow-400 px-5 py-2 mt-5 mr-2 rounded-lg shadow-sm"><FaSave className="inline -mt-1 mr-1" /> Simpan</button>
            <button onClick={() => setEditUsername(false)} className="border rounded-lg px-5 py-2 hover:bg-slate-100 shadow-sm"><FaBan className="inline -mt-1 mr-1" /> Batal</button>
        </form>
    )
}
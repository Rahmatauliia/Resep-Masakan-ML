'use client'

import MySwal from "@/lib/sweetAlert";
import API_URL from "@/utils/api-url";
import axios from "axios";
import { useState } from "react";
import { FaBan, FaRegEye, FaRegEyeSlash, FaSave } from "react-icons/fa";

export default function ChangePassword({ setEditPassword }) {
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const [showPassword, setShowPassword] = useState(true)
    const [showNewPassword, setShowNewPassword] = useState(true)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(password, newPassword, passwordConfirmation)
        try {
            const res = await axios.post(`${API_URL}/api/change-password`, {
                password,
                'new_password': newPassword,
                'new_password_confirmation': passwordConfirmation
            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("accessTokenResep")}`,
                }
            })

            if (res.data.status == 200) {
                MySwal.fire({
                    title: <p>{res.data.message}</p>,
                    icon: "success",
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="relative">
                <input type={!showPassword ? "text" : "password"} placeholder="Password Lama" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-slate-200 shadow-sm p-3 mb-3 rounded-lg focus:outline-red-500" />
                {showPassword ? <FaRegEyeSlash className="absolute top-3.5 text-xl right-5 cursor-pointer" onClick={() => setShowPassword(false)} /> : <FaRegEye className="absolute top-3.5 text-xl right-5 cursor-pointer" onClick={() => setShowPassword(true)} />}
            </div>
            <div className="relative">
                <input type={!showNewPassword ? "text" : "password"} placeholder="Password Baru" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border border-slate-200 shadow-sm p-3 mb-3 rounded-lg focus:outline-red-500" />
                {showNewPassword ? <FaRegEyeSlash className="absolute top-3.5 text-xl right-5 cursor-pointer" onClick={() => setShowNewPassword(false)} /> : <FaRegEye className="absolute top-3.5 text-xl right-5 cursor-pointer" onClick={() => setShowNewPassword(true)} />}
            </div>
            <div className="relative">
                <input type={!showPasswordConfirmation ? "text" : "password"} placeholder="Konfirmasi Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="w-full border border-slate-200 shadow-sm p-3 rounded-lg focus:outline-red-500" />
                {showPasswordConfirmation ? <FaRegEyeSlash className="absolute top-3.5 text-xl right-5 cursor-pointer" onClick={() => setShowPasswordConfirmation(false)} /> : <FaRegEye className="absolute top-3.5 text-xl right-5 cursor-pointer" onClick={() => setShowPasswordConfirmation(true)} />}
            </div>
            <button className="bg-yellow-300 hover:bg-yellow-400 px-5 py-2 mt-5 mr-2 rounded-lg shadow-sm"><FaSave className="inline -mt-1 mr-1" /> Simpan</button>
            <button onClick={() => setEditPassword(false)} className="border rounded-lg px-5 py-2 hover:bg-slate-100 shadow-sm"><FaBan className="inline -mt-1 mr-1" /> Batal</button>
        </form>
    )
}
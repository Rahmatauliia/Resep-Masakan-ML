'use client'

import API_URL from "@/utils/api-url";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function KategoriPage() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/banner`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('accessTokenResep')}`,
          }
        });
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/banner`, {
        image
      }, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessTokenResep')}`,
          "Content-Type": "multipart/form-data",
        },

      });
      console.log(response.data);
      setImage('');
      setLoading(false);
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      const response = await axios.delete(`${API_URL}/api/banner/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessTokenResep')}`,
        }
      });
      console.log(response.data);
      setRender((prev) => !prev);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Kelola Banner</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div className="" key={item.id}>
              <Image src={`${API_URL}/storage/${item.image_url}`} alt="mie-aceh" width={1000} height={500} className="w-full h-[200px] object-fill" />
              <button className="bg-red-500 text-white flex items-center justify-center mx-auto mt-4 w-8 h-8 rounded-md hover:bg-red-600" onClick={() => handleDelete(item.id)}><FaTrash /></button>
            </div>
          ))}

        </div>

        <form action="" onSubmit={handleSubmit} className="mt-16">

          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
          <button className="block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed" type="submit" disabled={loading}>Tambah Banner</button>
        </form>
      </div>
    </div>
  );
}

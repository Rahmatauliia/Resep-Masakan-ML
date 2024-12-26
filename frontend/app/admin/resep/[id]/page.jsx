"use client";

import axios from "axios";
import EditResep from "./editResep";
import { useEffect, useState } from "react";
import API_URL from "@/utils/api-url";

export default function EditResepPage({ params }) {
  const [data, setData] = useState([]);
  const [dataKategori, setDataKategori] = useState([]);
  const [dataDaerah, setDataDaerah] = useState([]);
  const [render, setRender] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/resep/${params.id}`
      );
      const responseKategori = await axios.get(
        `${API_URL}/api/kategori`
      );
      const responseDaerah = await axios.get(
        `${API_URL}/api/daerah`
      );
      console.log(response.data.data);
      setData(response.data.data);
      setDataKategori(responseKategori.data.data);
      setDataDaerah(responseDaerah.data.data);
      setRender(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Kelola Resep</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {render && (
          <EditResep
            resep={data}
            dataKategori={dataKategori}
            dataDaerah={dataDaerah}
          />
        )}
      </div>
    </div>
  );
}

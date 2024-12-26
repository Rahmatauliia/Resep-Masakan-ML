"use client";

import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import API_URL from "@/utils/api-url";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [reseps, setReseps] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/search?search=${search}`
        );
        setReseps(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search]);
  return (
    <>
      <Navbar />
      <div className="w-[80%] mx-auto mt-24 ">
        <h1 className="font-bold text-red-600 text-2xl mt-14 mb-5">
          Hasil Pencarian "{search}"
        </h1>

        {reseps.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 pb-20">
            {reseps.map((resep) => (
              <Card resep={resep} key={resep.id} className={"w-full"} />
            ))}
          </div>
        ) : (
          <div className="h-screen w-full">
            <h1 className=" text-red-500">Tidak ada resep yang ditemukan</h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

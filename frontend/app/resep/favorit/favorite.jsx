"use client";

import Card from "@/components/Card";
import API_URL from "@/utils/api-url";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Favorite() {
  const [reseps, setReseps] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/favorit`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessTokenResep"
            )}`,
          },
        });
        setReseps(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {reseps.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {reseps.map((resep) => (
            <Card resep={resep} key={resep.id} />
          ))}
        </div>
      ) : (
        <div className="h-screen">
          <h1 className="text-center text-red-500">Tidak ada resep favorit</h1>
        </div>
      )}
    </>
  );
}

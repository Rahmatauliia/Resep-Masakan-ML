"use client";

import Card from "@/components/Card";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Rekomendasi({ data }) {
  const [reseps, setReseps] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:5000/products?usr=" + user.id
          );
          setReseps(response.data.data);
          console.log(response.data);
        } catch (error) {
          //
        }
      };
      fetchData();
    }
    setReseps(data);
  }, [user]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {reseps?.map((resep) => (
        <Card resep={resep} key={resep.id} className={"w-full"} />
      ))}
    </div>
  );
}

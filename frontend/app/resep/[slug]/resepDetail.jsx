"use client";
import { useEffect, useMemo, useState } from "react";
import generateConfig from "@/lib/configTiptap";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { generateHTML } from "@tiptap/core";
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/context/AuthContext";
import MySwal from "@/lib/sweetAlert";

export default function ResepDetail({ resep }) {
  const bahan = useMemo(() => {
    return generateHTML(JSON.parse(resep.bahan), generateConfig);
  }, [resep.bahan]);
  const langkah = useMemo(() => {
    return generateHTML(JSON.parse(resep.langkah), generateConfig);
  }, [resep.langkah]);

  const { user } = useAuth();

  const [favoriteCount, setFavoriteCount] = useState(resep?.jumlah_favorit);
  const [like, setLike] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (user) {
        try {
          const favorite = await axios.get(
            "http://127.0.0.1:8000/api/favorituser/" + resep.id,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "accessTokenResep"
                )}`,
              },
            }
          );
          setLike(true);
          setFavoriteCount(favorite.data.jumlah_favorit);
        } catch (error) {
          setLike(false);
          console.log(error);
          setFavoriteCount(error.response.data.jumlah_favorit);
        }
      } else {
        try {
          const favorite = await axios.get(
            "http://127.0.0.1:8000/api/favorit/" + resep.id
          );
          setLike(false);
          setFavoriteCount(favorite.data.jumlah_favorit);
        } catch (error) {
          setFavoriteCount(error.response.data.jumlah_favorit);
          console.log(error);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const toggleFavorite = async () => {
    if (!user) {
      return MySwal.fire({
        title: <p className="text-red-500 text-lg">Anda belum login!</p>,
        text: "Anda harus login terlebih dahulu untuk menambah resep ke favorit.",
        icon: "error",
      });
    }
    if (isProcessing) return;
    setIsProcessing(true);
    setLike((prev) => !prev);
    setFavoriteCount((prev) => (prev += like ? -1 : 1));
    await axios.post(
      "http://127.0.0.1:8000/api/favorit",
      {
        id_resep: resep.id,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "accessTokenResep"
          )}`,
          Accept: "application/json",
        },
      }
    );

    setIsProcessing(false);
  };
  return (
    <div className="w-[80%] mx-auto mt-24 border rounded-xl shadow-md py-10">
      {loading && <LoadingScreen />}
      <div className="w-full h-60 relative">
        <Image
          src={`http://127.0.0.1:8000/storage/images/${resep.gambar}`}
          alt="mie aceh"
          fill
          className="mx-auto object-contain w-full h-full"
        />
      </div>
      <div className="mt-5 w-[80%] mx-auto">
        <div className="flex justify-between mb-3">
          <h1 className="font-bold text-xl capitalize">{resep.nama}</h1>
          <div className="flex items-center">
            {!like ? (
              <button>
                <FaRegHeart
                  onClick={toggleFavorite}
                  className="text-red-600 text-3xl me-2"
                />
              </button>
            ) : (
              <button>
                <FaHeart
                  onClick={toggleFavorite}
                  className="text-red-600 text-3xl me-2"
                />
              </button>
            )}
            <span>{favoriteCount}</span>
          </div>
        </div>
        <hr />
        <h1 className="font-bold text-xl mt-5 mb-3 text-red-600">BAHAN</h1>

        <div className="my-tiptap">
          <div dangerouslySetInnerHTML={{ __html: bahan }} />
        </div>

        <h1 className="font-bold text-xl mt-5 mb-3 text-red-600">Langkah</h1>
        <div className="my-tiptap">
          <div dangerouslySetInnerHTML={{ __html: langkah }} />
        </div>
      </div>
    </div>
  );
}

'use client'

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FaHeart } from "react-icons/fa";
import { generateHTML } from "@tiptap/core";
import generateConfig from "@/lib/configTiptap";
import API_URL from "@/utils/api-url";

export default function Card({ resep, className }) {
  console.log(resep)
  const bahan = useMemo(() => {
    return generateHTML(JSON.parse(resep.bahan), generateConfig);
  }, [resep.bahan]);
  const langkah = useMemo(() => {
    return generateHTML(JSON.parse(resep.langkah), generateConfig);
  }, [resep.langkah]);
  return (
    <Link href={`/resep/${resep.slug}`}>
      <div
        className={`w-52 h-[20rem] relative shadow-lg rounded-lg bg-white hover:shadow-2xl hover:shadow-red-600 hover:translate-y-[-5px] transition-all duration-300 ${className}`}
      >
        <span className="bg-white inline-block absolute top-0 right-0 p-2 rounded-bl-lg rounded-tr-lg"><FaHeart className="text-2xl text-red-600 inline me-2" />{resep.jumlah_favorit}</span>
        <Image
          alt="gambar"
          src={`${API_URL}/storage/images/${resep.gambar}`}
          width={500}
          height={500}
          className="w-full h-[50%] object-cover rounded-t-lg"
        />
        <p className="text-center uppercase mt-3 line-clamp-1 px-3 font-bold mb-3">{resep.nama}</p>
        <div className="my-tiptap overflow-hidden line-clamp-2">
          <div dangerouslySetInnerHTML={{ __html: bahan }} />
        </div>
          <p className="text-sm text-gray-600 ms-3 mt-3">Lihat selengkapnya</p>
      </div>
    </Link>
  );
}

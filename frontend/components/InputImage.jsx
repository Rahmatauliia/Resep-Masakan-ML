"use client";

import { useRef, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";

export default function InputImage(field) {
  const [preview, setPreview] = useState(null);
  const inputFile = useRef(null);

  // Fungsi untuk mengunggah gambar
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Membuat URL untuk menampilkan pratinjau gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi untuk menghapus gambar
  const handleRemoveImage = () => {
    setPreview(null);
    inputFile.current.value = "";
    field.onChange(null);
  };

  return (
    <div className="flex flex-col items-center">
      <Input
        type="file"
        onChange={(file) => {
          handleImageUpload(file);
          field.onChange(file.target.files[0]);
        }}
        ref={inputFile}
      />

      {preview ? (
        <div className="relative">
          <Image
            src={preview}
            width={100}
            height={100}
            alt="Image Preview"
            className="w-64 h-64 object-cover mt-3"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-4 right-2 bg-red-600 text-white p-1 rounded-full"
          >
            X
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No image selected</p>
      )}
    </div>
  );
}

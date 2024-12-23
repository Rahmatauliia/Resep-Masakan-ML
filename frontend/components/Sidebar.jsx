"use client";
import Link from "next/link";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { CgMenuLeft } from "react-icons/cg";
import { FaHome, FaReceipt } from "react-icons/fa";
import { FaGear, FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`bg-gray-800 text-white ${
        isOpen ? "md:w-64 w-16" : "w-16"
      } py-7 px-2 inset-y-0 left-0 transition-all duration-200 ease-in-out relative `}
    >
      <nav>
        <Link
          href="/"
          className="block md:text-left py-2.5 px-4 rounded transition-all duration-200 hover:bg-gray-700 hover:text-white mb-2"
        >
          <FaHome className="inline md:me-3 text-2xl" />
          <span className={`${isOpen ? "hidden md:inline" : "hidden"}`}>
            Home
          </span>
        </Link>
        <Link
          href="/admin"
          className={
            "block md:text-left py-2.5 px-4 rounded transition-all duration-200 mb-2 " +
            (pathName === "/admin"
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-700 hover:text-white")
          }
        >
          <MdDashboard className="inline md:me-3 text-2xl" />
          <span className={`${isOpen ? "hidden md:inline" : "hidden"}`}>
            Dashboard
          </span>
        </Link>
        <Link
          href="/admin/resep"
          className={
            "block md:text-left py-2.5 px-4 rounded transition-all duration-200 mb-2 " +
            (pathName === "/admin/resep"
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-700 hover:text-white")
          }
        >
          <FaReceipt className="inline md:me-3 text-2xl" />
          <span className={`${isOpen ? "hidden md:inline" : "hidden"}`}>
            Resep
          </span>
        </Link>
        <Link
          href="/admin/daerah"
          className={
            "block md:text-left py-2.5 px-4 rounded transition-all duration-200 mb-2 " +
            (pathName === "/admin/daerah"
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-700 hover:text-white")
          }
        >
          <FaMapLocationDot className="inline md:me-3 text-2xl" />
          <span className={`${isOpen ? "hidden md:inline" : "hidden"}`}>
            Daerah
          </span>
        </Link>
        <Link
          href="/admin/kategori"
          className={
            "block md:text-left py-2.5 px-4 rounded transition-all duration-200 mb-2 " +
            (pathName === "/admin/kategori"
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-700 hover:text-white")
          }
        >
          <MdCategory className="inline md:me-3 text-2xl" />
          <span className={`${isOpen ? "hidden md:inline" : "hidden"}`}>
            Kategori
          </span>
        </Link>
        <Link
          href="/admin/settings"
          className={
            "block md:text-left py-2.5 px-4 rounded transition-all duration-200 mb-2 " +
            (pathName === "/admin/settings"
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-700 hover:text-white")
          }
        >
          <FaGear className="inline md:me-3 text-2xl" />
          <span className={`${isOpen ? "hidden md:inline" : "hidden"}`}>
            Pengaturan
          </span>
        </Link>
      </nav>
      <CgMenuLeft
        className="absolute -right-10 top-4 text-3xl text-black hover:cursor-pointer"
        onClick={() => toggleSidebar()}
      />
    </div>
  );
}

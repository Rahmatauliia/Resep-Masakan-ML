"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FaSearch, FaStar, FaUser, FaUserCircle, FaUserLock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import MySwal from "@/lib/sweetAlert";
import LoadingScreen from "./LoadingScreen";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      MySwal.fire({
        title: <p>Logout Berhasil</p>,
        icon: "success",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log(query);
      router.push("/resep?search=" + query);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="bg-red-600 text-white w-full h-20 flex items-center px-10 shadow-md fixed top-0 z-20">
        <Link href={"/"}>
          <h1 className="font-bold text-lg">Resep Makanan Aceh</h1>
        </Link>
        <form className="xl:w-[55%] lg:w-[50%] md:w-[38%] relative mx-auto hidden md:block" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full rounded-md h-12 ps-5 focus:outline-none text-black"
            placeholder="Cari Makanan, Resep, dll"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit">
            <FaSearch className="absolute top-4 right-5 text-gray-500 active:border-none" />
          </button>
        </form>
        <div className="-mr-2 flex md:hidden ms-auto">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
        <>
          {!user ? (
            <div className="hidden md:block ms-auto">
              <Link href={"/login"} >
                <button className="px-4 py-2 rounded-md border border-yellow-300 text-yellow-300 me-2 hover:bg-yellow-300 hover:text-black transition-all duration-300 font-semibold">
                  Login
                </button>
              </Link>
              <Link href={"/register"}>
                <button className="bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 font-semibold">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <>
              <NavigationMenu className="ms-auto hidden md:block">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className=" bg-transparent border border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black">
                      <FaUserCircle className="me-2 text-2xl" /> {user.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[500px] h-">
                      <Link
                        href="/profile"
                        legacyBehavior
                        passHref
                        className="w-full"
                      >
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Profile <FaUser className="ms-2" />
                        </NavigationMenuLink>
                      </Link>
                      <Link
                        href="/resep/favorit"
                        legacyBehavior
                        passHref
                        className="w-full"
                      >
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Favorite <FaStar className="ms-2" />
                        </NavigationMenuLink>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          legacyBehavior
                          passHref
                          className="w-full"
                        >
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            Admin <FaUserLock className="ms-2" />
                          </NavigationMenuLink>
                        </Link>
                      )}
                      <NavigationMenuLink
                        className={
                          navigationMenuTriggerStyle() +
                          " cursor-pointer w-full block"
                        }
                        onClick={async () => handleLogout()}
                      >
                        Logout <FiLogOut className="ms-2" />
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </>
          )}
        </>

      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden fixed top-20 z-10 bg-red-600 text-white w-full transition duration-300`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form className="w-full relative block md:hidden" onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                id="search"
                className="w-full rounded-md h-12 ps-5 focus:outline-none text-black"
                placeholder="Cari Makanan, Resep, dll"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              <button type="submit">
                <FaSearch className="absolute top-4 right-5 text-gray-500 active:border-none" />
              </button>
            </form>
            {!user ? (
              <>
                <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link href="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/resep/favorit" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Favorite
                </Link>
                <p className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={async () => handleLogout()}>
                  Logout
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

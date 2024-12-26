"use client";
import API_URL from "@/utils/api-url";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Periksa status login saat aplikasi dimuat
    checkUserLoggedIn();
  }, []);

  // Fungsi untuk memeriksa apakah pengguna sudah login
  const checkUserLoggedIn = async () => {
    try {
      // Di sini Anda bisa melakukan pengecekan ke server atau local storage
      const response = await axios.get(`${API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessTokenResep")}`,
        },
      });
      console.log(response.data)
      setUser(response.data)
    } catch (error) {
      logout();
      console.error("Error checking user login status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk login
  const login = async (user) => {
    // Di sini Anda bisa menambahkan logika autentikasi ke server
    const response = await axios.post(
      `${API_URL}/api/login`,
      {
        email: user.email,
        password: user.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    // Hapus semua properti yang tidak dibutuhkan
    setUser(response.data.user);
    // Simpan data user ke local storage dengan menggunakan JSON.stringify
    // Agar data tidak dapat diakses dengan mudah oleh attacker
    localStorage.setItem("user-resep", JSON.stringify(response.data.user));
    // Simpan access token ke local storage
    localStorage.setItem("accessTokenResep", response.data.access_token);
    setAccessToken(response.data.access_token);
  };

  // Fungsi untuk register
  const register = async (user) => {
    const response = await axios.post(
      `${API_URL}/api/register`,
      {
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const { id, name, email } = response.data.user;
    setUser({ id, name, email });
    // Simpan data user ke local storage dengan menggunakan JSON.stringify
    // Agar data tidak dapat diakses dengan mudah oleh attacker
    localStorage.setItem("user-resep", JSON.stringify({ id, name, email }));
    // Simpan access token ke local storage
    localStorage.setItem("accessTokenResep", response.data.access_token);
    setAccessToken(response.data.access_token);
  };

  // Fungsi untuk logout
  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessTokenResep")}`,
          },
        }
      );
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("user-resep");
      localStorage.removeItem("accessTokenResep");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, loading, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => useContext(AuthContext);

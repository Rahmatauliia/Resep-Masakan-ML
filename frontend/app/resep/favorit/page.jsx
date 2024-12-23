import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Favorite from "./favorite";

export default function FavoritePage() {
  return (
    <>
      <Navbar />
      <div className="w-[80%] mx-auto mt-24 ">
        <h1 className="font-bold text-red-600 text-2xl mt-14 mb-5">
          RESEP FAVORIT SAYA
        </h1>

        <Favorite />
      </div>
      <Footer />
    </>
  );
}

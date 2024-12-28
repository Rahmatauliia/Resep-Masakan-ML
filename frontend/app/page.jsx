import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Card from "../components/Card";
import CardDaerah from "../components/CardDaerah";
import Footer from "../components/Footer";
import axios from "axios";
import Rekomendasi from "./rekomendasi";
import API_URL from "@/utils/api-url";

export default async function Home() {
  const responseResep = await fetch(`${API_URL}/api/resep`, {
    cache: "no-store",
  });
  const responseResepTerbaru = await fetch(
    `${API_URL}/api/resep?latest&limit=5`,
    {
      cache: "no-store",
    }
  );
  const reseposeResepFavorite = await fetch(
    `${API_URL}/api/resep?favorite&limit=10`
  );
  const responseDaerah = await fetch(`${API_URL}/api/daerah`, {
    cache: "no-store",
  });
  const responseBanner = await fetch(`${API_URL}/api/banner`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  });

  const responseJson = await responseResep.json();
  const responseResepFavoriteJson = await reseposeResepFavorite.json();
  const responseDaerahJson = await responseDaerah.json();
  const responseResepTerbaruJson = await responseResepTerbaru.json();
  const responseBannerJson = await responseBanner.json();

  const banner = responseBannerJson;

  const daerahs = responseDaerahJson.data;
  const reseps = responseJson.data;
  const resepTerbaru = responseResepTerbaruJson.data;
  const resepFavorite = responseResepFavoriteJson.data;

  return (
    <main>
      <Navbar />
      <div className="md:w-[80%] w-[90%] mx-auto mt-24 ">
        <Header banner={banner} />
        <h1 className="font-bold text-red-600 text-2xl mt-14 mb-5">
          RESEP TERBARU
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {resepTerbaru.map((resep) => (
            <Card resep={resep} key={resep.id} className={"w-full"} />
          ))}
        </div>

        <h1 className="font-bold text-red-600 text-2xl mt-14 mb-5">
          PILIH SESUAI DAERAH
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {daerahs.map((daerah) => (
            <CardDaerah key={daerah.id} daerah={daerah} />
          ))}
        </div>
        <h1 className="font-bold text-red-600 text-2xl mt-14 mb-5">
          RESEP TERFAVORIT
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {resepFavorite.map((resep) => (
            <Card resep={resep} key={resep.id} className={"w-full"} />
          ))}
        </div>

        <h1 className="font-bold text-red-600 text-2xl mt-14 mb-5">
          REKOMENDASI
        </h1>
        <Rekomendasi data={reseps} />
      </div>

      <Footer />
    </main>
  );
}

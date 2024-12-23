import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default async function DaerahPage({ params }) {
  try {
    const responseResep = await fetch(
      "http://127.0.0.1:8000/api/resep/daerah/" + params.slug,
      {
        cache: "no-store",
      }
    );
    const responseResepJson = await responseResep.json();
    const reseps = responseResepJson.data;

    return (
      <main>
        <Navbar />
        <div className="w-[80%] mx-auto mt-24 ">
          <h1 className="font-bold text-red-600 text-2xl mt-14 mb-5">
            Resep Berdasarkan Daerah {reseps[0].nama_daerah}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {reseps.map((resep) => (
              <Card resep={resep} key={resep.id} className={"w-full"} />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    );
  } catch (error) {
    console.log(error);
    return;
  }
}

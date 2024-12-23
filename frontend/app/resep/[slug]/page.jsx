import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import ResepDetail from "./resepDetail";

export default async function Page({ params }) {
  const resep = await axios.get(
    "http://127.0.0.1:8000/api/resep/" + params.slug
  );

  return (
    <main>
      <Navbar />
      <ResepDetail resep={resep.data.data} />
      <Footer />
    </main>
  );
}

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import ResepDetail from "./resepDetail";
import API_URL from "@/utils/api-url";

export default async function Page({ params }) {
  const resep = await axios.get(
    `${API_URL}/api/resep/${params.slug}`
  );

  return (
    <main>
      <Navbar />
      <ResepDetail resep={resep.data.data} />
      <Footer />
    </main>
  );
}

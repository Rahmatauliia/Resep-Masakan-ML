export default async function DashboardPage() {
  const fetchTotalResep = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/resep', {
      cache: "no-store",
    })
    const responseResepJson = await response.json();
    return responseResepJson?.data?.length
  }
  const fetchTotalUser = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/total-user', {
      cache: "no-store",
    })
    const responseJson = await response.json();
    return responseJson?.total;
  }
  const fetchTotalDaerah = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/daerah', {
      cache: "no-store",
    })
    const responseJson = await response.json();
    return responseJson?.data?.length;
  }
  const fetchTotalKategori = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/kategori', {
      cache: "no-store",
    })
    const responseJson = await response.json();
    return responseJson?.data?.length;
  }

  const totalResep = await fetchTotalResep()
  const totalUser = await fetchTotalUser()
  const totalDaerah = await fetchTotalDaerah()
  const totalKategori = await fetchTotalKategori()
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{totalUser}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Total Resep</h2>
          <p className="text-3xl font-bold">{totalResep}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Total Daerah</h2>
          <p className="text-3xl font-bold">{totalDaerah}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Total Kategori</h2>
          <p className="text-3xl font-bold">{totalKategori}</p>
        </div>
      </div>
    </div>
  );
}

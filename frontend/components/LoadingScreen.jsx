export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center flex-col bg-gray-900 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-white"></div>
      <p className="text-white mt-2">Loading...</p>
    </div>
  );
}

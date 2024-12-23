import Image from "next/image";
import Link from "next/link";

export default function CardDaerah({ daerah }) {
  return (
    <>
      <Link
        className="w-full h-28 shadow-lg rounded-lg overflow-hidden relative hover:shadow-2xl hover:shadow-red-600 hover:translate-y-[-5px] transition-all duration-300"
        href={`/daerah/${daerah.nama}`}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Image
          src={"/images/sabang.png"}
          alt="mie-aceh"
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-xl font-bold">{daerah.nama}</p>
        </div>
      </Link>
    </>
  );
}

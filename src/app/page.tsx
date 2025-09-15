'use client';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return(
    <main className="bg-[#1E1E2F] h-screen w-full">
      <div className="relative">
        <Image 
          height={600}
          width={500}
          src={"/pokemon.png"} 
          alt={""}
          className="w-full -z-10 object-cover"
        />
        <div className="absolute flex flex-col inset-0 justify-center max-w-xs">
          <p className="text-slate-100 font-bold px-10 text-2xl">Reimagined Pokemon Platform</p>
          <p className="text-slate-100 px-10 text-sm max-w-2xs">Discover, create, track your favorite pokemon</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 w-full md:p-16 lg:p-20 xl:p-30 p-10 bg-[#1E1E2F]">
        <Link href="/pokemon/page/1"><div className="tile bg-gradient-to-br from-[#e60b09] to-[#FF9A3C]">
          <h1>Pokemon Finder</h1>
        </div></Link>
        <Link href={"/search"}><div className="tile bg-gradient-to-br from-[#3C8DFF] to-[#3CFFF3]">
          <h1>Build Team</h1>
        </div></Link>
        <Link className="col-span-2" href={"/teams"}><div className="flex items-center justify-center aspect-[2/1] font-bold md:text-4xl sm:text-3xl text-xl border-2 border-white hover:cursor-pointer hover:shadow-lg shadow-white bg-gradient-to-br from-[#2a8d08] to-[#fff95b]">
          <h1>Created Teams</h1>
        </div></Link>
      </div> 
    </main>
  )
}
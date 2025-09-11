'use client';
import Image from "next/image";
import Link from "next/link";

type pokemonSummary = {
  name: string,
  url: string
}

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
          <button className="bg-sky-400 text-sm rounded-lg w-30 p-1 ml-10">Build Team</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 w-full md:p-16 lg:p-20 xl:p-30 p-10 bg-[#1E1E2F]">
        <Link href="/pokemon/page/1"><div className="tile bg-gradient-to-br from-[#e60b09] to-[#FF9A3C]">
          <h1>Pokemon Finder</h1>
        </div></Link>
        <Link href={"/team"}><div className="tile bg-gradient-to-br from-[#3C8DFF] to-[#3CFFF3]">
          <h1>Build Team</h1>
        </div></Link>
        <Link href={"/userTeams"}><div className="tile bg-gradient-to-br from-[#2a8d08] to-[#fff95b]">
          <h1>Created Teams</h1>
        </div></Link>
       <Link href={"/settings"}><div className="tile bg-gradient-to-br from-[#6d90b9] to-[#bbc7dc]">
          <h1>Settings</h1>
        </div></Link>
      </div> 
    </main>
  )
}
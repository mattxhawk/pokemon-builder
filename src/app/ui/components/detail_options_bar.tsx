import Link from "next/link";

export default function PokeNavBar({name}: {name :string}){
    return(
        
        <div className="relative w-full flex flex-col">
            <Link href={"/"}><button className="absolute top-5 left-5 text-white hover:underline hover: cursor-pointer">← Home</button></Link>
            <div className="mt-12">
                <div className="flex justify-center items-center md:gap-12 gap-4 px-6 pb-8 font-bold rounded-xl z-1000">
                    <Link className="bg-sky-600 px-4 py-1 rounded-lg hover:underline" href={`/pokemon/${name}`}>Stats</Link>
                    <Link className="bg-sky-600 px-4 py-1 rounded-lg hover:underline" href={`/pokemon/${name}/abilities`}>Abilities</Link>
                    <Link className="bg-sky-600 px-4 py-1 rounded-lg hover:underline" href={`/pokemon/${name}/moves`}>Moves</Link>
                </div>
            </div>
        </div>
    )
}
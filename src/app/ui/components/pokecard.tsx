import Image from "next/image";
import { Pokemon } from "@/app/lib/poke_api"; 
import { getBoxShadow } from "@/app/ui/styles/cardStyling";
import Link from "next/link";

type PokeCardProps = {
    pokemonList: Pokemon[];
}
export default function PokeCard({ pokemonList }: PokeCardProps){

    return(
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-10 px-8 py-6 w-full bg-[##1E1E2F] text-center">
            {pokemonList.map((pokemon)=>{
                const boxShadow = getBoxShadow(pokemon.types);

                return(
                    <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}><div  className="flex flex-col gap-8 items-center text-white font-semibold bg-gradient-to-br from-[#6d90b9] rounded-2xl border-2 border-blue-950 hover:cursor-pointer hover:bg-[#343454]"
                        style={{ boxShadow }}
                    >
                    <Image
                        src={pokemon.imageURL || "/placeholder.jpg"}
                        alt={pokemon.name}
                        height={100}
                        width={100}
                        className="pt-3"
                    />
                    <h1 className="pb-2">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                </div></Link>
                )
            })}
        </div>
    )
}
import { getPokeCardDetails, getPokeStats } from "@/app/lib/poke_api";
import StatChart from "@/app/ui/components/pokemon_stat_chart";
import PokeNavBar from "@/app/ui/components/detail_options_bar";
import { getBoxShadow, getDisplayName, getTypeIcons } from "@/app/ui/styles/cardStyling";
import Image from "next/image";
import { typeIcon } from "@/app/ui/styles/cardStyling";

export default async function PokemonPage({
    params, 
}: {
    params: {name: string};
} ){

    const { name } = await params;
    const pokemonStats = await getPokeStats(name);
    const pokemon = await getPokeCardDetails(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const displayName = getDisplayName(pokemon.name);

    const boxShadow = getBoxShadow(pokemon.types);
    const typeIconList = getTypeIcons(pokemon.types);

    return(
        <div className="flex flex-col h-screen w-full bg-neutral-900 items-center justify-center">
            <PokeNavBar name={name}/>
            <div className="relative flex flex-col items-center h-5/6 w-9/12 mb-10 bg-amber-50 border-2 border-black rounded-2xl"
                style={{boxShadow}}
            >
                <h1 className="font-bold text-2xl pt-2">{displayName}</h1>
                <div className="sm:absolute sm:left-5 sm:top-2 sm:flex-col flex gap-2">
                    {typeIconList.map((typeIcon: typeIcon)=>(
                        <Image
                        key={typeIcon.typeColor}
                        width={50}
                        height={50}
                        src={typeIcon.url}
                        alt="Type Icon"
                        className="rounded-full my-2 p-2"
                        style={{
                            backgroundColor: `${typeIcon.typeColor}`
                        }}
                        />
                    ))}
                </div>
                <div className="sm:p-3 p-2 border-5 border-black rounded-full">
                    <Image
                        width={150}
                        height={150}
                        src={pokemon.imageURL}
                        alt={displayName}
                    />
                </div>
                <StatChart stats={pokemonStats}/>
            </div>
        </div>
    )
}
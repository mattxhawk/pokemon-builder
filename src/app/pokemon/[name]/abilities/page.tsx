import { getAbilities, getAbilityDetails, getPokeCardDetails } from "@/src/app/lib/poke_api";
import PokeNavBar from "@/src/app/ui/components/detail_options_bar";
import { getBoxShadow, getDisplayName, typeColorMapping } from "@/src/app/ui/styles/cardStyling";

type abilityEntry = {
    abilityName: string,
    effectString: string
}
interface ability{
    ability:{
        name: string;
    }
}

export default async function AbilitiesPage({params,}: {params: {name: string}}){
    const { name } = await params;
    const abilities = await getAbilities(name);
    const abilityEntries: abilityEntry[] = await Promise.all(
        abilities.map(async (ability: ability) => await getAbilityDetails(ability.ability.name))
    );
    const pokemonDisplayName = getDisplayName(name);
    const pokemonDetails = await getPokeCardDetails(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonTypeColor1 = typeColorMapping[pokemonDetails?.types[0] as keyof typeof typeColorMapping];
    const pokemonTypeColor2 = typeColorMapping[pokemonDetails?.types[1] as keyof typeof typeColorMapping] || "#FFF";
    const boxShadow = getBoxShadow(pokemonDetails?.types ?? []);



    return(
        <div className="flex flex-col items-center min-h-screen w-full bg-[#1E1E2F]">
            <PokeNavBar name={name}/>
            <h1 className="text-white text-2xl font-bold underline">{pokemonDisplayName} Abilities List</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-8 py-14">
                {abilityEntries.map((ability: abilityEntry)=>{
                    return(
                    <div key={ability.abilityName} className="flex flex-col items-center justify-between px-4 pt-2 rounded-xl h-full"
                        style={{
                            backgroundImage: `linear-gradient(to bottom right, ${
                                    pokemonTypeColor1
                                }, ${pokemonTypeColor2})`,
                            boxShadow
                        }}
                    >
                        <h1 className="text-xl font-bold pb-4">{ability.abilityName.charAt(0).toUpperCase() + ability.abilityName.slice(1)}</h1>
                        <p>{ability.effectString}</p>
                        <div className="bottom-0 flex w-full justify-around pt-10 pb-2">
                            <button className="border-2 rounded-lg p-1 bg-white hover:underline hover:bg-slate-400 hover:cursor-pointer">Add</button>
                            <button className="border-2 rounded-lg p-1 bg-white hover:underline hover:bg-slate-400  hover:cursor-pointer">Remove</button>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
}
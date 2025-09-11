import { getMoveDetails, getPokeCardDetails, getPokemonMoveSet, move, Pokemon } from "@/app/lib/poke_api";
import PokeNavBar from "@/app/ui/components/detail_options_bar";
import { getDisplayName, typeColorMapping } from "@/app/ui/styles/cardStyling";

export default async function MovesPage({params,}: {params:{name: string}}){
    const pokemonMoveSet = await getPokemonMoveSet(params.name);
    const pokemonDetails = await getPokeCardDetails(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    const detailedMoveList: move[] = await Promise.all(
        pokemonMoveSet.map( async (move: any)=> await getMoveDetails(move.move.name))
    );  
    const pokemonDisplayName = getDisplayName(params.name);

    return(
        <div className="flex flex-col items-center min-h-screen w-full bg-[#1E1E2F]">
            <PokeNavBar name={params.name}/>
            <h1 className="text-white text-2xl font-bold underline">{pokemonDisplayName} Move List</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-8 py-14 ">
                {detailedMoveList.map((move) => {

                    return(
                        <div key={move.moveName} className="flex flex-col items-center justify-between pt-2 px-4 pb-2 rounded-xl h-full"
                            style={{
                                backgroundImage: `linear-gradient(to bottom right, ${
                                    typeColorMapping[move.type as keyof typeof typeColorMapping]
                                }, white)`,
                                boxShadow: `0 0 10px ${typeColorMapping[move.type as keyof typeof typeColorMapping]}`
                            }}
                        >
                            <div className="relative flex justify-center">
                                
                                <h1 className="font-bold">{move.moveName.charAt(0).toUpperCase() + move.moveName.slice(1)}</h1>    
                            </div>
                            
                            <div className="flex gap-8 w-full pt-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex w-full">
                                        <span className="font-semibold pr-2">Power:</span>
                                        <span>{move.power}</span>
                                    </div>
                                    <div className="flex w-full">
                                        <span className="font-semibold pr-2">Accuracy:</span>
                                        <span>{move.accuracy}</span>
                                    </div>
                                    <div className="flex w-full">
                                        <span className="font-semibold pr-2">PP:</span>
                                        <span>{move.pp}/{move.pp}</span>
                                    </div>
                                    <div className="flex w-full">
                                        <span className="font-semibold pr-2">Type:</span>
                                        <span>{move.type.charAt(0).toUpperCase() + move.type.slice(1)}</span>
                                    </div>
                                </div>
                                <div className="">
                                    <p>{move.effectString}</p>
                                </div>
                                
                            </div>
                            <div className="flex w-full justify-around py-4">
                                <button className="border-2 rounded-lg p-1 bg-white hover:underline hover:bg-slate-400 hover:cursor-pointer">Add</button>
                                <button className="border-2 rounded-lg p-1 bg-white hover:underline hover:bg-slate-400  hover:cursor-pointer">Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
"use client"
import { useEffect, useState } from "react";
import { getAllPokemonNames } from "../lib/poke_api";
import { getDisplayName } from "../ui/styles/cardStyling";
import Link from "next/link";


export default function Page(){
    const [pokemonList, setPokemonList] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState("");

    useEffect(() =>{
        async function fetchPokemonNames() {
            const pokemonNames = await getAllPokemonNames();
            const capitalizedList = pokemonNames.map((pokemon: any) => getDisplayName(pokemon.name));
            
            setPokemonList(capitalizedList);

        }
        fetchPokemonNames();
    },[]);

    const filteredPokemon = pokemonList.filter((pokemon) =>  
        pokemon.toLowerCase().includes(currentInput.toLowerCase())
    );

    return(
        <div className="flex flex-col items-center min-h-screen w-full bg-[#1E1E2F]">
            <div className="flex flex-col items-center w-full">
            
                <h1 className="text-white text-4xl font-bold py-4">Search Pokemon Name</h1>
                <input 
                    type="text" 
                    onChange={(input) => setCurrentInput(input.target.value)} 
                    placeholder="Type a Pokemon Name..." 
                    value={currentInput} 
                    className="w-1/2 bg-white rounded-xl py-1.5 px-3"
                />
                <div className="mt-4 w-1/2 bg-white rounded-lg gap-6 py-2 px-4 max-h-96 overflow-y-auto divide-y divide-black">
                    {filteredPokemon.map((name: string) =>(
                        <Link key={name} href={`/pokemon/${name.toLowerCase()}`} className="block border-b border-black last:border-none">    
                            <h1 className="text-lg font-black">{name}</h1>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
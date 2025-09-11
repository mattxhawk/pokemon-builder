import names from "@/pokemon-names.json";

export interface Pokemon{
  name: string,
  imageURL: string,
  types: Array<string>,
  baseHp: number,
  id: number
}

export type StatEntry = {
  name: string,
  value: number
}

export function devGetAllPokemonNames() {
  if (process.env.NODE_ENV === "development") {
    // Use local JSON cache in dev
    return names;
  }
}

  // In production, fetch + revalidate normally
  export async function getAllPokemonNames() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`, {
    next: { revalidate: 31556952 }, // 1 year
  });
  if (!res.ok) {
    throw new Error("Failed to fetch all names");
  }
  const data = await res.json();
  return data.results;
}


export async function getPokemonList(limit: number, offset: number){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
    }
    const data = await res.json(); 

    return data.results;
}

export async function getPokemon(name:string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if(!res.ok){
    throw new Error("Failed to fetch Pokémon");
  }
  const data = res.json();
  return data;
  
}

export async function getPokeCardDetails(url: string): Promise<Pokemon | null>{
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch Pokémon details from ${url}`);
    }
    const data = await res.json();
    const id = data.id;
    const name = data.name;
    const imageURL = data.sprites.other['official-artwork'].front_default;
    const types = data.types.map((t: any) => t.type.name);
    const baseHp = data.stats[0].base_stat;
   
    return {name, imageURL, types, baseHp, id}

  }catch(e){
    console.warn("Skip Pokemon where fetch failed", url, e);
    return null;
  }
}

export async function getPokeStats(name: string){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon details form url`);
  }
  const data = await res.json();
  const stats: StatEntry[] = data.stats.map((s: any) => ({
    name: s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1),
    value: s.base_stat
  }));
  return stats;
}

export type move = {
  moveName: string,
  type: string,
  accuracy: number,
  power: number,
  pp: number,
  effectString: string,
  damageClass: string
}

export type moveEntry ={
  name: string,
  url: string,
}

export async function getPokemonMoveSet(name: string): Promise<moveEntry[]>{
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if(!res.ok){
    throw new Error("Failed to fetch Pokemon moves");
  }
  const pokemon = await res.json();
  const moves = pokemon.moves
  return moves;
}

export async function getMoveDetails(name: string): Promise<move>{
  const res = await fetch(`https://pokeapi.co/api/v2/move/${name}`);
  const move = await res.json();

  const moveName = move.name;
  const type = move.type.name;
  const accuracy = move.accuracy;
  const power = move.power;
  const pp = move.pp
  const effectString: string = 
    move.effect_entries?.[0]?.effect ?? 
    move.flavor_text_entries.find((entry: any) => entry.language.name === "en")?.flavor_text ??
    "No description available"
  
  const damageClass = move.damage_class.name;

  return {moveName, type, accuracy, power, pp, effectString, damageClass}
}

export async function getAbilities(name: string){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if(!res.ok){
    throw new Error("Failed to fetch Pokemon moves");
  }
  const pokemon = await res.json();
  const abilities = pokemon.abilities;
  return abilities;
}

export async function getAbilityDetails(name: string){
  const res = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);
  if(!res.ok){
    throw new Error("Failed to fetch Pokemon ");
  }
  const ability = await res.json();
  const abilityName = ability.name;
  const effectString: string = 
    ability.effect_entries.find((entry: any) => entry.language.name === "en").effect ??
    ability.flavor_text_entries.find((entry: any) => entry.language.name === "en")?.flavor_text ??
    "No description available"

  return { abilityName, effectString };
}
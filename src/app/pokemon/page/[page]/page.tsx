import Link from 'next/link';
import { getPokeCardDetails, getPokemonList } from '@/app/lib/poke_api';
import PokeCard from '@/app/ui/components/pokecard';


type pokemonSummary = {
    name: string,
    url: string
}

const PAGE_SIZE = 150;
export default async function Page({ params, }: { params: { page: string } }){
    const { page } = await params;
    const currentPage = parseInt(page, 10);
    const offset = (currentPage - 1) * PAGE_SIZE;
    
    const pokemonList = await getPokemonList(PAGE_SIZE, offset);
    const detailPokemonList = (
            await Promise.all(
                pokemonList.map(async (pokemon: pokemonSummary)=> getPokeCardDetails(pokemon.url))
        )
    ).filter(Boolean);

    return(
        <main className='flex flex-col items-center bg-[#1E1E2F] min-h-screen w-full p-6'>
            <h1 className='text-white text-5xl font-extrabold underline pb-4'>Pokedex Page {page}</h1>
            <PokeCard pokemonList={detailPokemonList}/>
            <div className="flex justify-between rounded-lg px-6 mt-8 bg-slate-100">
                {currentPage > 1 && (
                <Link href={`/pokemon/page/${currentPage - 1}`} className="hover:underline p-2 rounded-2xl">
                    ← Previous
                </Link>
                )}
                {detailPokemonList.length >= 1 && detailPokemonList.length <= PAGE_SIZE && (
                <Link href={`/pokemon/page/${currentPage + 1}`} className="hover:underline p-2 rounded-2xl">
                    Next →
                </Link>
                )}
            </div>
        </main>
    )
}
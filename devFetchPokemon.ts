import { writeFileSync } from "fs";

async function main() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
  const data = await res.json();

  // Just keep names + urls
  const results = data.results.map((p: any) => ({
    name: p.name,
    url: p.url,
  }));

  writeFileSync("pokemon-names.json", JSON.stringify(results, null, 2));
  console.log("✅ Saved pokemon-names.json with", results.length, "entries");
}

main();
export const typeColorMapping = {
    fire: "#BE5103",
    water: "#539AE2",
    electric: "#ff3",
    grass: "#089000",
    psychic: "#E5709B",
    steel: "#5F8A8B",
    rock: "#B2A061",
    ground: "#cc9f4f",
    dark: "#333333",
    ghost: "#7B62A3",
    ice: "#99FFFF",
    dragon: "#6F35FC",
    fairy: "#FFB7FA",
    fighting: "#CB5F48",
    normal: "#C0C0C0",
    poison: "#A33EA1",
    bug: "#A6B91A",
    flying: "#A98FF3"
}

export function getBoxShadow(types: string[]){
    const firstColor = typeColorMapping[types[0] as keyof typeof typeColorMapping]
    const secondColor = types[1]
        ? typeColorMapping[types[1] as keyof typeof typeColorMapping]
        : undefined

    const boxShadow: string = secondColor
        ? `0 0 10px ${firstColor}, 0 0 25px ${secondColor}`
        : `0 0 15px ${firstColor}`;

    return boxShadow;
}

export function getDisplayName(name: string){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export type typeIcon = {
    url: string,
    typeColor: string
}

export function getTypeIcons(types: string[]){
    const typeIconList: typeIcon[] = types.map((type: string) => {
       return{
        url: `/type-icons/${type}.svg`,
        typeColor: typeColorMapping[type as keyof typeof typeColorMapping]
       } 
    });
    return typeIconList;
}
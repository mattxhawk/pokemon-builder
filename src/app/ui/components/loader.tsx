import Image from "next/image";

export default function Loader(){
    const pokeballs = [1,2,3];
    return(
        <div className="h-screen bg-[#1E1E2F] flex flex-col flex-wrap items-center justify-center">
            <div className="flex gap-6"></div>
                {pokeballs.map((i) =>(
                    <Image 
                        key={i}
                        width={100}
                        height={100}
                        src={"/masterball.png"} 
                        alt={"MasterBall Loading"}
                        className="animate-spin"
                    />
                ))}       
            <h1 className="text-slate-100 text-2xl font-bold ">Loading...</h1>
        </div>
    )
}
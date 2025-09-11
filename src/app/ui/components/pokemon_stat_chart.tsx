"use client";
import { Bar, BarChart, YAxis, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { StatEntry } from "@/app/lib/poke_api";

export default function StatChart({ stats }: {stats: StatEntry[]}){
    return(
        <ResponsiveContainer height="100%" width="100%">
            <BarChart className="px-8"  height={400} width={600} layout="vertical" data={stats}>
                <XAxis type="number"/>
                <YAxis width={117} type="category" dataKey="name"/>
                <Bar fill="#AE7C39" activeBar={{ stroke: 'blue', strokeWidth: 2 }} dataKey="value"></Bar>  
                <Tooltip/>
            </BarChart>
        </ResponsiveContainer>
    )
}
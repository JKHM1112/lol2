// my-app/app/detail/[id]/page.tsx

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import React from "react";

async function getAccount(puuid: string, api_key: string) {
    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`;
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache"
        }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error fetching account data: ${response.statusText}`);
    }
    return await response.json();
}

export default async function Detail(props: any) {
    const api_key = process.env.RIOT_API_KEY as string;
    const db = (await connectDB).db("dream");
    const result = await db.collection('dataEnteredDirectly').findOne({ _id: new ObjectId(props.params.id) });
    const chams = await db.collection('dataEnteredDirectly').find().toArray();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || '';
    const { line, chams: [cham1, cham2] } = result;
    const filteredChamps = chams.filter((item: any) =>
        item.email === email && item.line === line && (item.chams.includes(cham1) && item.chams.includes(cham2))
    );

    const summonerAccount = await getAccount(result.puuid, api_key);
    const name = summonerAccount.gameName;
    const tagLine = summonerAccount.tagLine;
    return (
        <div>
            {result.chams}
        </div>
    );
}

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import React from "react";
import ViewMyDetail from "./components/viewMyDetail";
import ViewSimilarDetail from "./components/viewSimilarDetail";

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
    const mydetail = await db.collection('dataEnteredDirectly').findOne({ _id: new ObjectId(props.params.id) });//상세보기한 게임 정보.
    const chams = await db.collection('dataEnteredDirectly').find().sort({ _id: -1 }).toArray();//모든 게임 정보를 불러온다.

    const session = await getServerSession(authOptions);
    // const email = session?.user?.email || '';
    const { chams: [cham1] } = mydetail;
    const filteredChamps = chams.filter((item: any) =>
        item.chams[0] === cham1
    );//내 챔피언과 동일한 것
    const summonerAccount = await getAccount(mydetail.puuid, api_key);
    const name = summonerAccount.gameName;
    const tagLine = summonerAccount.tagLine;
    const nameTagLine = name + "#" + tagLine
    return (
        <div className="flex">
            <div className="w-[300px] h-[700px] flex flex-col m-4">
                <div className="border border-gray-300 rounded-md  p-2">
                    <ViewMyDetail mydetail={mydetail} nameTagLine={nameTagLine} />
                </div>
            </div>
            <div className="w-[500px] h-[700px] flex flex-col m-4">
                <ViewSimilarDetail filteredChamps={filteredChamps} mydetail={mydetail}/>
            </div>
        </div>
    );
}

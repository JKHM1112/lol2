import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import React from "react";
import ViewMyDetail from "./components/viewMyDetail";
import ViewSimilarDetail from "./components/viewSimilarDetail";
import { getAccount } from "@/app/riotApi";

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
        <div className="min-w-[1200px]">
            <div className="flex">
                <div >
                    <div className="border border-gray-300 rounded-md  p-2">
                        <ViewMyDetail mydetail={JSON.parse(JSON.stringify(mydetail))} nameTagLine={JSON.parse(JSON.stringify(nameTagLine))} />
                    </div>
                </div>
                <div>
                    <ViewSimilarDetail filteredChamps={JSON.parse(JSON.stringify(filteredChamps))} mydetail={JSON.parse(JSON.stringify(mydetail))} />
                </div>
            </div>
        </div>
    );
}

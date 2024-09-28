//my-app/app/api/post/newListWrite/route.ts

import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextRequest } from "next/server";
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
const schema = zfd.formData({
    puuid: zfd.text(z.string().optional()),
    tier: zfd.text(z.string().optional()),
    line: zfd.text(z.string().optional()),
    chams: zfd.text(z.string().optional()),
    runes: zfd.text(z.string().optional()),
    summoners: zfd.text(z.string().optional()),
    items: zfd.text(z.string().optional()),
    timeLineLevel1: zfd.text(z.string().optional()),
    timeLineLevel2: zfd.text(z.string().optional()),
    gameExtracted1: zfd.text(z.string().optional()),
    gameExtracted2: zfd.text(z.string().optional()),
    timeLineKda1: zfd.text(z.string().optional()),
    timeLineKda2: zfd.text(z.string().optional()),
    timeLineObject1: zfd.text(z.string().optional()),
    timeLineObject2: zfd.text(z.string().optional()),
    turretPlatesTaken: zfd.text(z.string().optional()),
    visionScore: zfd.text(z.string().optional()),
    skillOrder: zfd.text(z.string().optional()),
    before6: zfd.numeric(z.number().min(0).max(5).optional()),
    after6: zfd.numeric(z.number().min(0).max(5).optional()),
    side1: zfd.numeric(z.number().min(0).max(5).optional()),
    teamFight1: zfd.numeric(z.number().min(0).max(5).optional()),
    lineResult: zfd.text(z.string().optional()),
    gameResult: zfd.text(z.string().optional()),
    review: zfd.text(z.string().optional()),
    date: zfd.text(z.string().optional()),
});

export async function POST(request: NextRequest) {
    let session = await getServerSession(authOptions)

    if (!session) {
        return Response.redirect(new URL('/register', request.nextUrl.origin))
    }

    const formData = await request.formData()
    let parsedData = schema.parse(formData);

    parsedData = Object.fromEntries(
        Object.entries(parsedData).map(([key, value]) => [key, value === undefined ? null : value])
    );
    const chamsArray = JSON.parse(parsedData.chams || '[]');
    const runesArray = JSON.parse(parsedData.runes || '[]');
    const summonersArray = JSON.parse(parsedData.summoners || '[]');
    const itemsArray = JSON.parse(parsedData.items || '[]');
    const timeLineLevel1Array = JSON.parse(parsedData.timeLineLevel1 || '[]');
    const timeLineLevel2Array = JSON.parse(parsedData.timeLineLevel2 || '[]');
    const gameExtracted1Array = JSON.parse(parsedData.gameExtracted1 || '[]');
    const gameExtracted2Array = JSON.parse(parsedData.gameExtracted2 || '[]');
    const timeLineKda1Array = JSON.parse(parsedData.timeLineKda1 || '[]');
    const timeLineKda2Array = JSON.parse(parsedData.timeLineKda2 || '[]');
    const timeLineObject1Array = JSON.parse(parsedData.timeLineObject1 || '[]');
    const timeLineObject2Array = JSON.parse(parsedData.timeLineObject2 || '[]');
    const turretPlatesTakenArray = JSON.parse(parsedData.turretPlatesTaken || '[]');
    const visionScoreArray = JSON.parse(parsedData.visionScore || '[]');
    const skillOrderArray = JSON.parse(parsedData.skillOrder || '[]');

    const data = {
        ...parsedData,
        chams: chamsArray,
        runes: runesArray,
        summoners: summonersArray,
        items: itemsArray,
        timeLineLevel1: timeLineLevel1Array,
        timeLineLevel2: timeLineLevel2Array,
        gameExtracted1: gameExtracted1Array,
        gameExtracted2: gameExtracted2Array,
        timeLineKda1: timeLineKda1Array,
        timeLineKda2: timeLineKda2Array,
        timeLineObject1: timeLineObject1Array,
        timeLineObject2: timeLineObject2Array,
        turretPlatesTaken: turretPlatesTakenArray,
        visionScore: visionScoreArray,
        skillOrder: skillOrderArray,
        email: session?.user?.email,
    };
    const api_key = process.env.RIOT_API_KEY as string;
    let puuid = parsedData.puuid;
    let summonerAccount;
    if (puuid) {
        try {
            summonerAccount = await getAccount(puuid, api_key);
        } catch (error) {
            console.error("Error fetching Riot account:", error);
        }
    }
    console.log(data)
    if (summonerAccount) {
        const name = summonerAccount.gameName;
        const tagLine = summonerAccount.tagLine;
        const nameTagLine = `${name}#${tagLine}`;

        // MongoDB에 데이터 저장
        const db = (await connectDB).db('dream');
        await db.collection('dataEnteredDirectly').insertOne(data);

        return Response.redirect(new URL(`/games/${nameTagLine}`, request.nextUrl.origin));
    } else {
        // Riot API로부터 정보를 얻지 못했을 때
        const db = (await connectDB).db('dream');
        await db.collection('dataEnteredDirectly').insertOne(data);
        return Response.redirect(new URL('/', request.nextUrl.origin));
    }
}
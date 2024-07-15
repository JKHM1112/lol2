import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import { z } from "zod";

const api_key = process.env.RIOT_API_KEY as string;

const schema = z.object({
    email: z.string(),
    nickname: z.string(),
    tag: z.string(),
});

async function getAccount(nickname: string, tag: string) {
    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nickname}/${tag}`;
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
        throw new Error('Failed to fetch account from Riot API');
    }

    return await response.json();
}
async function getSummonerData(puuid: string) {
    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            "Accept-Language": "ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache"
        }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to fetch account from Riot API');
    }

    return await response.json();
}
async function getLeagueData(encryptedSummonerId: string) {

    const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`;
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
        throw new Error('Failed to fetch account from Riot API');
    }

    return await response.json();
}
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { email, nickname, tag } = schema.parse(await request.json());
        const db = (await connectDB).db('dream');

        const account = await getAccount(nickname, tag);
        const puuid = account.puuid;

        const existingEntry = await db.collection('saveGameNickname').findOne({ nickname, tag });

        if (existingEntry) {
            return NextResponse.json({ error: "이미 등록되어 있습니다." }, { status: 409 });
        }
        const summonerData = await getSummonerData(puuid)
        const summonerDataId = summonerData.id;
        const summonerLeaueDataResult = await getLeagueData(summonerDataId);
        let tier = null;
        if (summonerLeaueDataResult && summonerLeaueDataResult.length > 0) {
            const soloQueueData = summonerLeaueDataResult.find((data: any) => data.queueType === "RANKED_SOLO_5x5");
            if (soloQueueData) {
                tier = soloQueueData.tier;
            }
        }

        await db.collection('saveGameNickname').insertOne({
            email,
            nickname,
            tag,
            puuid,
            tier
        });

        return NextResponse.json({ message: "성공적으로 등록되었습니다." }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

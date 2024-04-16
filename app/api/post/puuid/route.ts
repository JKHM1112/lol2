//api/post/puuid/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log("puuid/route.ts")
    const api_key = process.env.RIOT_API_KEY as string

    const body = await request.json()
    const fullSummonerName = body.summonerName;
    console.log(fullSummonerName)
    const [summonerName, tag] = fullSummonerName.split('#')
    const encodedName = encodeURIComponent(summonerName)
    const nextTag = tag || 'KR1'

    // console.log("summonerName: " + summonerName)
    // console.log("encodedName:" + encodedName)
    // console.log("nextTag:" + nextTag)

    const response = await fetch(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodedName}/${nextTag}`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
            "Accept-Language": "ko,en-US;q=0.9,en;q=0.8,es;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        },
    })
    const data = await response.json()
    const puuid = data.puuid
    // console.log(puuid)
    return NextResponse.json(JSON.stringify(puuid));
}
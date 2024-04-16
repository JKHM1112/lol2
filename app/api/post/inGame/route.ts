//api/post/puuid/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log("inGame/route.ts")
    const api_key = process.env.RIOT_API_KEY as string

    const body = await request.json()
    const allMatchId = JSON.parse(body.matchId)
    console.log("allMatchId: " + allMatchId)

    const response = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${allMatchId[0]}`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
            "Accept-Language": "ko,en-US;q=0.9,en;q=0.8,es;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        },
    })
    const inGame = await response.json()
    // console.log(inGame)

    return NextResponse.json(JSON.stringify(inGame));
}
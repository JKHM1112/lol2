//api/post/search/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log("search/route.ts")
    const summonerName = (await request.formData()).get('summonerName') as string

    const responsePuuid = await fetch(`http://localhost:3000/api/post/puuid`, {
        method: "POST",
        body: JSON.stringify({ summonerName: summonerName })
    })
    const puuid = await responsePuuid.json()
    // const recentMatchesIds: string[] = await responsePuuid.json(puuid, 10)
    // console.log(puuid)


    const reponseMatchId = await fetch(`http://localhost:3000/api/post/matchId`, {
        method: 'POST',
        body: JSON.stringify({ puuid: puuid })
    })
    const matchId = await reponseMatchId.json()
    // console.log(matchId)

    const reponseInGame = await fetch(`http://localhost:3000/api/post/inGame`, {
        method: 'POST',
        body: JSON.stringify({ matchId: matchId })
    })
    const inGame = await reponseInGame.json()
    console.log(inGame)
 
    // const participants = await reponseInGame.json().then(data=>data.info.participants)
    // console.log(participants)
    return NextResponse.json('inGame')
}
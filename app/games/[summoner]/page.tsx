import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import * as React from "react"
import { items } from "@/app/data/item"
import { champions } from "@/app/data/champion"
import Image from "next/image"

const api_key = process.env.RIOT_API_KEY as string
async function getAccountData(summonerName: string, nextTag: string) {
    const res = await fetch(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${nextTag}`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }
    })
    return res.json()
}

async function getRecentMatchesIds(puuid: string, games: number) {
    const res = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${games}`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }
    })
    return res.json()
}


async function getMatchData(matchId: string) {
    const res = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }
    })
    return res.json()
}

interface Participant {
    puuid: string
    lane?: string
}


export default async function Tables({ params }: { params: { summoner: string } }) {
    const fullsummonerName = params.summoner
    const [summonerName, tag] = fullsummonerName.split('-')
    const nextTag = tag || 'KR1'
    const puuid = await getAccountData(summonerName, nextTag).then(data => data.puuid)
    const recentMatchesIds: string[] = await getRecentMatchesIds(puuid, 10)
    const recentMatchesData = await Promise.all(
        recentMatchesIds.map(async (matchId) => {
            const matchData = await getMatchData(matchId)
            return matchData
        })
    )
    const participants = recentMatchesData.map((data) => data.info.participants)

    // console.log(puuid)
    const getItemName = (itemCode: number) => items.data[itemCode]?.name
    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/itemN/${itemCode}.png`} width={40} height={40} />
    const getChampionImg = (championCode: string) => <Image  alt={'champion1'} src={`/championE/${championCode}.png`} width={40} height={40} />
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>라인</TableHead>
                        <TableHead>내 챔피언</TableHead>
                        <TableHead>상대 챔피언</TableHead>
                        <TableHead>내 챔피언 아이템0 이미지</TableHead>
                        <TableHead>내 챔피언 아이템0</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {participants.map((data, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{data.find((p: Participant) => p.puuid === puuid)?.lane}</TableCell>
                            <TableCell>{getChampionImg(data.find((p: Participant) => p.puuid === puuid)?.championName)}</TableCell>
                            <TableCell>{getChampionImg(data.find((p: Participant) => p.puuid !== puuid && p.lane === data.find((p: Participant) => p.puuid === puuid)?.lane)?.championName)}</TableCell>
                            <TableCell className="flex items-center gap-1" >
                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item0)}
                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item1)}
                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item2)}
                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item3)}
                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item4)}
                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item5)}
                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item6)}
                            </TableCell>
                            <TableCell>{data.find((p: Participant) => p.puuid === puuid)?.championName}</TableCell>
                            <TableCell>{data.find((p: Participant) => p.puuid !== puuid && p.lane === data.find((p: Participant) => p.puuid === puuid)?.lane)?.championName}</TableCell>
                            <TableCell>{getItemName(data.find((p: Participant) => p.puuid === puuid)?.item1)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
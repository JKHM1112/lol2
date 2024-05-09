//games/[summoner]/page.tsx
import Games from "../page"
import * as React from "react"
import SearchResults from "./components/searchResults"
import Link from "next/link"

const api_key = process.env.RIOT_API_KEY as string

async function getAccountData(summonerName: string, nextTag: string) {
    try {
        const res = await fetch(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${nextTag}`, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                "Accept-Language": "ko-KR,ko;q=0.9",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": api_key
            }
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error ${res.status}: ${errorData.status.message}`);
        }

        return await res.json();
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
}

async function getRecentMatchesIds(puuid: string, games: number) {
    const res = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&type=ranked&start=0&count=${games}`, {
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

export default async function Tables({ params }: { params: { summoner: string } }) {

    const fullsummonerName = params.summoner
    const [summonerName, tag] = fullsummonerName.split('-')
    const nextTag = tag || 'KR1'
    let puuid, recentMatchesIds, recentMatchesData, participants
    try {
        puuid = await getAccountData(summonerName, nextTag).then(data => data.puuid);
        recentMatchesIds = await getRecentMatchesIds(puuid, 5);
        recentMatchesData = await Promise.all(
            recentMatchesIds.map(async (matchId: any) => {
                return await getMatchData(matchId);
            })
        );
        participants = (recentMatchesData.map(data => data.info.participants));
    } catch (error) {
        return (
            <div>
                <Games />
                <h4>&apos;소환사가 존재하지 않습니다. 다시 입력해주세요.&apos;</h4>
            </div>
        )

    }
    return (
        <div>
            <Link href={`/games/${params.summoner}/progressGame`}> 진행중인 게임 확인</Link>
            <Games />
            <SearchResults participants={participants} puuid={puuid} />
        </div >
    )
}
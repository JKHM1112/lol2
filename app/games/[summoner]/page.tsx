//games/[summoner]/page.tsx
import * as React from "react"
import Link from "next/link"
import Games from "@/app/games/page"
import SearchResults from "@/app/games/components/searchResults";
import ReloadButton from "./progressGame/components/reloadButton";

export default async function Tables({ params }: { params: { summoner: string } }) {
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

    async function getRecentMatchesIds(puuid: string, queue: number, games: number) {
        const res = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${queue}&start=0&count=${games}`, {
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

    

    const fullsummonerName = params.summoner
    const [summonerName, tag] = fullsummonerName.split('-')
    const nextTag = tag || 'KR1'
    const summonernameTag = summonerName + '#' + nextTag

    let puuid, rankedMatchIds, aramMatchIds
    try {
        puuid = await getAccountData(summonerName, nextTag).then(data => data.puuid);
        rankedMatchIds = await getRecentMatchesIds(puuid, 420 ,5);
        aramMatchIds = await getRecentMatchesIds(puuid, 450 ,5);
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
            <Games />
            <ReloadButton />
            <Link href={`/games/${params.summoner}/progressGame`}> 진행중인 게임 확인</Link>
            <SearchResults rankedMatchIds={rankedMatchIds} aramMatchIds={aramMatchIds} puuid={puuid} />
        </div >
    )
}
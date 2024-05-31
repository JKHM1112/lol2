import Games from "../page";
import SelectedGames from "./components/selectedGame";

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
        return null; // Return null on error
    }
}
async function getRecentMatchesIds(puuid: string, queue: number, start: number, games: number) {
    const res = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${queue}&start=${start}&count=${games}`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache"
        }
    });
    return res.json();
}
async function getMatchData(matchId: string) {
    try {
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
        if (!res.ok) {
            return null;
        }
        return await res.json();
    } catch (error) {
        console.error("API call failed:", error);
        return null;
    }
}

async function getMatchDataTimeline(matchId: string) {
    try {
        const res = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                "Accept-Language": "ko-KR,ko;q=0.9",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": api_key
            }
        })
        if (!res.ok) {
            return null;
        }
        return await res.json();
    } catch (error) {
        console.error("API call failed:", error);
        return null;
    }
}
export default async function GameSelect({ params }: { params: { summoner: string } }) {


    const fullsummonerName = params.summoner;
    const [summonerName, tag] = fullsummonerName.split('-');
    const nextTag = tag || 'KR1';
    const decodedSummonerName = decodeURIComponent(summonerName);
    const decodedSummonerTag = decodeURIComponent(nextTag);
    const summonernameTag = `${decodedSummonerName}#${decodedSummonerTag}`;

    const accountData = await getAccountData(summonerName, nextTag);

    if (!accountData) {
        return (
            <div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Games />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className="flex items-center gap-4">
                    {"소환사 닉네임: " + summonernameTag}
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    소환사 정보를 찾을 수 없습니다.
                </div>
            </div>

        )
    }

    let aramMatchIds, rankedMatchIds, aramResult, rankResult, rankResultTimelines, puuid;
    try {
        puuid = await getAccountData(summonerName, nextTag).then(data => data.puuid);
        rankedMatchIds = await getRecentMatchesIds(puuid, 420, 0, 10);
        aramMatchIds = await getRecentMatchesIds(puuid, 450, 0, 10);
        rankResult = await Promise.all(
            rankedMatchIds.map(async (matchId: any) => {
                return await getMatchData(matchId);
            })
        );
        aramResult = await Promise.all(
            aramMatchIds.map(async (matchId: any) => {
                return await getMatchData(matchId);
            })
        );
        rankResultTimelines = await Promise.all(
            rankedMatchIds.map(async (matchId: any) => {
                return await getMatchDataTimeline(matchId);
            })
        );

    } catch (error) {
        return (
            <div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Games />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <h4>소환사가 존재하지 않습니다. 다시 입력해주세요.</h4>
                </div>
            </div>
        );
    }



    return (
        <div>
            <SelectedGames summonernameTag={summonernameTag} fullsummonerName={fullsummonerName} aramResult={aramResult} rankResult={rankResult} puuid={puuid} rankResultTimelines={rankResultTimelines} />
        </div>
    );
}

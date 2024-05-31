import Games from "../page";
import SelectedGames from "./components/selectedGame";

const api_key = process.env.RIOT_API_KEY as string;

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            if (res.ok) {
                return await res.json();
            } else {
                const errorData = await res.json();
                console.error(`Attempt ${i + 1} failed: ${res.status} ${errorData.status.message}`);
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed: ${error}`);
        }
        await delay(1000); // 1초 지연 후 재시도
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

async function getAccountData(summonerName: string, nextTag: string) {
    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${nextTag}`;
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }
    };
    return await fetchWithRetry(url, options);
}

async function getRecentMatchesIds(puuid: string, queue: number, start: number, games: number) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${queue}&start=${start}&count=${games}`;
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
    return await fetchWithRetry(url, options);
}

async function getMatchData(matchId: string) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }
    };
    return await fetchWithRetry(url, options);
}

async function getMatchDataTimeline(matchId: string) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`;
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }
    };
    return await fetchWithRetry(url, options);
}

export default async function GameSelect({ params }: { params: { summoner: string } }) {

    const fullsummonerName = params.summoner;
    const [summonerName, tag] = fullsummonerName.split('-');
    const nextTag = tag || 'KR1';
    const decodedSummonerName = decodeURIComponent(summonerName);
    const decodedSummonerTag = decodeURIComponent(nextTag);
    const summonernameTag = `${decodedSummonerName}#${decodedSummonerTag}`;

    let aramMatchIds, rankedMatchIds, aramResult = [], rankResult = [], rankResultTimelines = [], puuid;
    try {
        const accountData = await getAccountData(summonerName, nextTag);
        if (!accountData) throw new Error("Account data not found");

        puuid = accountData.puuid;
        rankedMatchIds = await getRecentMatchesIds(puuid, 420, 0, 20);
        aramMatchIds = await getRecentMatchesIds(puuid, 450, 0, 20);

        if (!rankedMatchIds || !aramMatchIds) {
            throw new Error("Failed to fetch match IDs");
        }

        for (const matchId of rankedMatchIds) {
            const matchData = await getMatchData(matchId);
            if (matchData) {
                rankResult.push(matchData);
            }

            const matchTimeline = await getMatchDataTimeline(matchId);
            if (matchTimeline) {
                rankResultTimelines.push(matchTimeline);
            }
        }

        for (const matchId of aramMatchIds) {
            const matchData = await getMatchData(matchId);
            if (matchData) {
                aramResult.push(matchData);
            }
        }

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

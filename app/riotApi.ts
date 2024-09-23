const api_key = process.env.RIOT_API_KEY as string;

const defaultHeaders = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept-Language": "ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": api_key,
    "Cache-Control": "no-cache"
};

async function fetchWithRetry(url: string, options: RequestInit, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, { ...options, headers: { ...defaultHeaders, ...options.headers } });
            if (res.ok) {
                return await res.json();
            } else {
                const errorData = await res.json();
                console.error(`Attempt ${i + 1} failed: ${res.status} ${errorData.status.message}`);
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed: ${error}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // 딜레이
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

export async function getAccount(summonerName: string, nextTag: string) {
    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${nextTag}`;
    return fetchWithRetry(url, { method: "GET" });
}

export async function getRecentMatchIds(searchedpuuid: string, queue: number, start: number, games: number) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${searchedpuuid}/ids?queue=${queue}&start=${start}&count=${games}`;
    return fetchWithRetry(url, { method: "GET" });
}

export async function getMatchData(matchId: string) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    return fetchWithRetry(url, { method: "GET" });
}

export async function getMatchDataTimeline(matchId: string) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`;
    return fetchWithRetry(url, { method: "GET" });
}

export async function getSummonerData(encryptedPUUID: string) {
    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encryptedPUUID}`;
    return fetchWithRetry(url, { method: "GET" });
}

export async function getLeagueData(encryptedSummonerId: string) {
    const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`;
    return fetchWithRetry(url, { method: "GET" });
}

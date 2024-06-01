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
        await delay(100); // 0.1초 지연 후 재시도
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

async function getAccount(summonerName: string, nextTag: string) {
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

async function getRecentMatchIds(searchedpuuid: string, queue: number, start: number, games: number) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${searchedpuuid}/ids?queue=${queue}&start=${start}&count=${games}`;
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

async function getSummonerData(encryptedPUUID: string) {
    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encryptedPUUID}`;
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            "Accept-Language": "ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }
    };
    return await fetchWithRetry(url, options);
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
            "X-Riot-Token": api_key
        }
    };
    return await fetchWithRetry(url, options);
}

function chunkArray(array: any, size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        result.push({ data: chunk });
    }
    return result;
}
interface MatchData {
    info: {
        participants: Participant[];
    };
}

interface Participant {
    summonerId: string;
}

interface LeagueData {
    summonerId: string;
    leagueData: any[];
}
export default async function GameSelect({ params }: { params: { summoner: string } }) {
    const fullSummonerName = params.summoner;   //인코딩된 summoner
    const [gameName, tagLines] = fullSummonerName.split('-');
    const tagLine = tagLines || 'KR1';
    const decodedGameName = decodeURIComponent(gameName);
    const decodedTagLine = decodeURIComponent(tagLine);
    const gameNameTagLine = `${decodedGameName}#${decodedTagLine}`; //디코딩된 gameName#Tagline

    let searchedpuuid, aramMatchIds, rankedMatchIds, summonerData, summonerLeaueDataResult;
    let rankResults: MatchData[] = [], rankResultTimelines: any[] = [], aramResults: MatchData[] = [], leagueDataResults: LeagueData[] = [];
    try {
        const account = await getAccount(gameName, tagLine);    //puuid,gameName,tagLine
        if (!account) throw new Error("소환사 정보가 없다.");

        searchedpuuid = account.puuid;

        // 비동기 작업을 병렬로 수행
        [rankedMatchIds, aramMatchIds, summonerData] = await Promise.all([
            getRecentMatchIds(searchedpuuid, 420, 0, 10),
            getRecentMatchIds(searchedpuuid, 450, 0, 10),
            getSummonerData(searchedpuuid)
        ]);

        const summonerDataId = summonerData.id;
        summonerLeaueDataResult = await getLeagueData(summonerDataId);
        if (!rankedMatchIds || !aramMatchIds) {
            throw new Error("getMatchIds api오류");
        }

        // 각 매치 데이터 비동기 병렬 처리
        for (const matchId of rankedMatchIds) {
            const matchData = await getMatchData(matchId);
            if (matchData) rankResults.push(matchData);

            const matchTimeline = await getMatchDataTimeline(matchId);
            if (matchTimeline) rankResultTimelines.push(matchTimeline);
        }

        for (const matchId of aramMatchIds) {
            const matchData = await getMatchData(matchId);
            if (matchData) aramResults.push(matchData);
        }
        // const leagueDataPromises = matchData.info.participants.map(async (participant: any) => {
        //     const leagueData = await getLeagueData(participant.summonerId);
        //     leagueDataResults.push({ summonerId: participant.summonerId, leagueData });
        // });
        // await Promise.all(leagueDataPromises);

    } catch (error) {
        console.error("Error: ", error); // 추가적인 디버깅 정보를 위해
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
    // const summonersInformations = chunkArray(leagueDataResults, 10);
    return (
        <div>
            <SelectedGames gameNameTagLine={gameNameTagLine} fullSummonerName={fullSummonerName} searchedpuuid={searchedpuuid} summonerData={summonerData} summonerLeaueDataResult={summonerLeaueDataResult}
                rankResults={rankResults} rankResultTimelines={rankResultTimelines} aramResults={aramResults} />
        </div>
    );
}

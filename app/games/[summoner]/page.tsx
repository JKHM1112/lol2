//처음 랭크 20게임 전적 검색
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SelectedGames from "@/app/games/components/selectedGames";
import SelectedProfile from "@/app/games/components/selectedProfile";
import Games from "@/app/games/page";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";

const api_key = process.env.RIOT_API_KEY as string;

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Cache-Control': 'no-cache', // 캐시 무효화
                },
            });
            if (res.ok) {
                return await res.json();
            } else {
                const errorData = await res.json();
                console.error(`Attempt ${i + 1} failed: ${res.status} ${errorData.status.message}`);
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed: ${error}`);
        }
        await delay(1000);
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
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache"
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
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache"
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
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache"
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
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache"
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
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache"
        }
    };
    return await fetchWithRetry(url, options);
}

interface MatchData {
    info: {
        participants: Participant[];
    };
}

interface Participant {
    summonerId: string;
}

interface Session {
    user: {
        email: string;
    }
}
interface user_cred_DB {
    favorites: string[]
    email: string
}
export default async function GameSelect({ params }: { params: { summoner: string } }) {
    const db = (await connectDB).db('dream')
    let result = await db.collection('user_cred').find().sort({ _id: -1 }).toArray()
    let email: string | null | undefined = ''
    let searchFavorites: string[] | undefined = []
    let session: Session | null = await getServerSession(authOptions)
    if (session) {
        email = session.user.email
        searchFavorites = result.find((favorite: user_cred_DB) => favorite.email === email).favorites
    }

    const [gameName, tagLines] = params.summoner.split('-');
    const tagLine = tagLines || 'KR1';

    let searchedpuuid, rankedMatchIds, summonerData, summonerLeaueDataResult;
    let results: MatchData[] = [], resultTimelines: MatchData[] = []
    try {
        const account = await getAccount(gameName, tagLine);    // puuid, gameName, tagLine
        if (!account) throw new Error("소환사 정보가 없다.");

        searchedpuuid = account.puuid;

        // 비동기 작업을 병렬로 수행
        [rankedMatchIds, summonerData] = await Promise.all([
            getRecentMatchIds(searchedpuuid, 420, 0, 20),
            getSummonerData(searchedpuuid)
        ]);

        const summonerDataId = summonerData.id;
        summonerLeaueDataResult = await getLeagueData(summonerDataId);
        if (!rankedMatchIds) {
            throw new Error("getMatchIds api오류");
        }

        // 각 매치 데이터 비동기 병렬 처리
        const rankDataPromises = rankedMatchIds.map(async (matchId: string) => {
            const matchData = await getMatchData(matchId);
            const matchTimeline = await getMatchDataTimeline(matchId);
            return { matchData, matchTimeline };
        });

        const rankDataResults = await Promise.all(rankDataPromises);
        results = rankDataResults.map(result => result.matchData);
        resultTimelines = rankDataResults.map(result => result.matchTimeline);


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
    return (
        <div className="overflow-x-auto">
            <Games />
            <SelectedProfile fullSummonerName={params.summoner} summonerData={summonerData} summonerLeaueDataResult={summonerLeaueDataResult} searchFavorites={searchFavorites}/>
            <SelectedGames fullSummonerName={params.summoner} results={results} resultTimelines={resultTimelines} searchedpuuid={searchedpuuid} queue={420} />
        </div>
    );
}
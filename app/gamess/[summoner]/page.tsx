import Link from "next/link";
import Games from "../page";
import RecentlyResult from "./components/recentlyResult";
import ReloadButton from "./components/reloadButton";
import SelectedGames from "./components/selectedGame";
import Image from "next/image";

const api_key = process.env.RIOT_API_KEY as string;

async function getAccount(summonerName: string, nextTag: string) {
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

async function getRecentMatchIds(searchedpuuid: string, queue: number, start: number, games: number) {
    const res = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${searchedpuuid}/ids?queue=${queue}&start=${start}&count=${games}`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache"
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

async function getMatchDataTimeline(matchId: string) {
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
    return res.json()
}

async function getSummonerData(encryptedPUUID: string) {
    const res = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encryptedPUUID}`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            "Accept-Language": "ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }
    })
    return res.json()
}

async function getLeagueData(encryptedSummonerId: string) {
    const res = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`, {
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

export default async function GameSelect({ params }: { params: { summoner: string } }) {
    const [gameName, tagLines] = params.summoner.split('-');
    const tagLine = tagLines || 'KR1';

    let searchedpuuid, summonerDataId, summonerData, summonerLeaueDataResult, recentlyMatchIds, recentlyMatchData, recentlyMatchTimeline;
    try {
        const account = await getAccount(gameName, tagLine);    //puuid,gameName,tagLine
        if (!account) throw new Error("소환사 정보가 없다.");
        searchedpuuid = account.puuid;
        summonerData = await getSummonerData(searchedpuuid)
        summonerDataId = summonerData.id;
        summonerLeaueDataResult = await getLeagueData(summonerDataId);

        recentlyMatchIds = await getRecentMatchIds(searchedpuuid, 420, 0, 20)
        const recentlyMatchDataPromises = recentlyMatchIds.map((matchId: string) => getMatchData(matchId));
        const recentlyMatchTimelinePromises = recentlyMatchIds.map((matchId: string) => getMatchDataTimeline(matchId));

        recentlyMatchData = await Promise.all(recentlyMatchDataPromises);
        recentlyMatchTimeline = await Promise.all(recentlyMatchTimelinePromises);

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

    const fullSummonerName = params.summoner
    const decodedGameName = decodeURIComponent(gameName);
    const decodedTagLine = decodeURIComponent(tagLine);
    const gameNameTagLine = `${decodedGameName}#${decodedTagLine}`; //디코딩된 gameName#Tagline

    const soloQueueData = summonerLeaueDataResult.find((data: any) => data.queueType === "RANKED_SOLO_5x5");
    const leagueData = soloQueueData ? soloQueueData : {
        tier: "UNRANK",
        rank: "",
        leaguePoints: 0,
        wins: 0,
        losses: 0
    };
    const tierIcon = leagueData.tier !== "UNRANK" ? leagueData.tier.toUpperCase() : "UNRANK";
    const oddsWinning = (leagueData.wins + leagueData.losses) > 0 ? (leagueData.wins / (leagueData.wins + leagueData.losses) * 100).toFixed(1) : 0;

    return (
        <div>
            <div>
                <div>
                    <div className="w-full flex justify-center">
                        <Games />
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col items-center w-[700px] h-[130px] p-4 box-border border-2 rounded-md shadow-lg bg-white">
                                <div className="flex items-center h-[100px] w-full space-x-4">
                                    <div>
                                        <Image className='rounded-md' alt='profileIconId' src={`/profileicon/${summonerData.profileIconId}.png`} width={40} height={40} />
                                        <div className=" flex justify-center font-semibold">
                                            {summonerData.summonerLevel}
                                        </div>
                                    </div>
                                    <Image className='rounded-md' alt='tierIcon' src={`/emblems/${tierIcon}.png`} width={50} height={50} />
                                    <div className="text-lg font-semibold">
                                        {gameNameTagLine}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {leagueData.tier} {leagueData.rank} {leagueData.leaguePoints}LP
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        승률 {oddsWinning}%
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {leagueData.wins}승 {leagueData.losses}패
                                    </div>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Link href={`/games/${fullSummonerName}/rankResult`}>솔로랭크420</Link>
                                    <Link href={`/games/${fullSummonerName}/flexResult`}>자유랭크440</Link>
                                    <Link href={`/games/${fullSummonerName}/normResult`}>일반게임400</Link>
                                    <Link href={`/games/${fullSummonerName}/aramResult`}>무작위 총력전450</Link>
                                    <Link href={`/games/${fullSummonerName}/progressGame`}>진행중인 게임 확인</Link>
                                    <ReloadButton />
                                </div>
                            </div>
                        </div>
                        <div>
                            <RecentlyResult searchedpuuid={summonerData.puuid} recentlyMatchData={recentlyMatchData} recentlyMatchTimeline={recentlyMatchTimeline} tier={leagueData.tier} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <SelectedGames fullSummonerName={params.summoner} summonerData={summonerData} summonerLeaueDataResult={summonerLeaueDataResult}
                recentlyMatchData={recentlyMatchData} recentlyMatchTimeline={recentlyMatchTimeline}
            /> */}
        </div>
    );
}

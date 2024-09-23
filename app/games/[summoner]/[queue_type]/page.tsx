//queue_type이 적혀 있는 최근 10게임.
import SelectedGames from "@/app/games/components/selectedGames";
import SelectedProfile from "@/app/games/components/selectedProfile";
import { getAccount, getLeagueData, getMatchData, getMatchDataTimeline, getRecentMatchIds, getSummonerData } from "@/app/riotApi";


interface MatchData {
    info: {
        participants: Participant[];
    };
}

interface Participant {
    summonerId: string;
}
export default async function Queue_type({ params }: { params: { summoner: string, queue_type: number } }) {
    const [gameName, tagLines] = params.summoner.split('-');
    const tagLine = tagLines || 'KR1';

    let searchedpuuid, matchIds, summonerData, summonerLeaueDataResult;
    let resultData: MatchData[] = [], resultTimelines: MatchData[] = []
    try {
        const account = await getAccount(gameName, tagLine);    // puuid, gameName, tagLine
        if (!account) throw new Error("소환사 정보가 없다.");

        searchedpuuid = account.puuid;

        // 비동기 작업을 병렬로 수행
        [matchIds, summonerData] = await Promise.all([
            getRecentMatchIds(searchedpuuid, params.queue_type, 0, 20),
            getSummonerData(searchedpuuid)
        ]);

        const summonerDataId = summonerData.id;
        summonerLeaueDataResult = await getLeagueData(summonerDataId);
        if (!matchIds) {
            throw new Error("getMatchIds api오류");
        }

        // 각 매치 데이터 비동기 병렬 처리
        const rankDataPromises = matchIds.map(async (matchId: string) => {
            const matchData = await getMatchData(matchId);
            const matchTimeline = await getMatchDataTimeline(matchId);
            return { matchData, matchTimeline };
        });

        const rankDataResults = await Promise.all(rankDataPromises);
        resultData = rankDataResults.map(result => result.matchData);
        resultTimelines = rankDataResults.map(result => result.matchTimeline);


    } catch (error) {
        console.error("Error: ", error); // 추가적인 디버깅 정보를 위해
        return (
            <div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <h4>소환사가 존재하지 않습니다. 다시 입력해주세요.</h4>
                </div>
            </div>
        );
    }
    const soloQueueData = summonerLeaueDataResult.find((data: any) => data.queueType === "RANKED_SOLO_5x5");
    const soloLeagueData = soloQueueData ? soloQueueData : {
        tier: "UNRANK",
        rank: "",
        leaguePoints: 0,
        wins: 0,
        losses: 0
    };
    return (
        <div>
            <SelectedProfile fullSummonerName={params.summoner} summonerData={summonerData} summonerLeaueDataResult={summonerLeaueDataResult} />
            <SelectedGames fullSummonerName={params.summoner} resultData={resultData} resultTimelines={resultTimelines} searchedpuuid={searchedpuuid} queue={params.queue_type} tier={soloLeagueData.tier} />
        </div>
    )
}
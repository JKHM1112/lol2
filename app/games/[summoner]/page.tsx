import SelectedGames from "@/app/games/components/selectedGames";
import { getAccount, getLeagueData, getMatchData, getMatchDataTimeline, getRecentMatchIds, getSummonerData } from "@/app/riotApi";
import ProfileSection from "../components/profileSection";
import LeftSection from "../components/leftSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

interface UserSession {
    user: {
        name: string;
        email: string;
    };
}

export default async function GameSelect({ params }: { params: { summoner: string } }) {
    let session: UserSession | null = await getServerSession(authOptions);

    const [gameName, tagLines] = params.summoner.split('-');
    const tagLine = tagLines || 'KR1';

    let searchedpuuid, rankedMatchIds, summonerData, summonerLeaueDataResult;
    let resultData = [], resultTimelines = [];

    try {
        const account = await getAccount(gameName, tagLine);
        if (!account) throw new Error("소환사 정보가 없습니다.");
        searchedpuuid = account.puuid;

        // 비동기 작업 병렬 처리
        [rankedMatchIds, summonerData] = await Promise.all([
            getRecentMatchIds(searchedpuuid, 420, 0, 10),
            getSummonerData(searchedpuuid)
        ]);
        const summonerDataId = summonerData.id;
        summonerLeaueDataResult = await getLeagueData(summonerDataId);
        if (!rankedMatchIds) throw new Error("경기 ID를 가져오는 API에 문제가 발생했습니다.");

        // 각 매치 데이터를 병렬 처리
        const rankDataPromises = rankedMatchIds.map(async (matchId: string) => {
            const matchData = await getMatchData(matchId);
            const matchTimeline = await getMatchDataTimeline(matchId);
            return { matchData, matchTimeline };
        });

        const rankDataResults = await Promise.all(rankDataPromises);
        resultData = rankDataResults.map(result => result.matchData);
        resultTimelines = rankDataResults.map(result => result.matchTimeline);
    } catch (error) {
        console.error("Error: ", error);
        return (
            <div className="flex justify-center w-full">
                <h4>소환사가 존재하지 않습니다. 다시 입력해주세요.</h4>
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-100">
            <div className="flex-row bg-gray-100 flex-col items-center min-w-[1200px]">
                <ProfileSection fullSummonerName={params.summoner} summonerData={summonerData} summonerLeaueDataResult={summonerLeaueDataResult} resultData={resultData} />
                <div className="flex bg-gray-100 w-full min-w-[1200px] justify-center">
                    <LeftSection fullSummonerName={params.summoner} summonerData={summonerData} summonerLeaueDataResult={summonerLeaueDataResult} resultData={resultData} />
                    <SelectedGames fullSummonerName={params.summoner} resultData={resultData} resultTimelines={resultTimelines} searchedpuuid={searchedpuuid} queue={420} session={session} />
                </div>
            </div>
        </div>
    );
}

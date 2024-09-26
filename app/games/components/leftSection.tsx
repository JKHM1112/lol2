import Image from "next/image";
import PlayedTogether from "./playedTogether";

export default function LeftSection({ fullSummonerName, summonerLeaueDataResult, resultData }: any) {
    const [gameName, tagLines] = fullSummonerName.split("-");
    const tagLine = tagLines || "KR1";
    const decodedGameName = decodeURIComponent(gameName);
    const decodedTagLine = decodeURIComponent(tagLine);

    const getLeagueData = (queueType: string) => {
        const data = summonerLeaueDataResult.find((entry: any) => entry.queueType === queueType);
        return data || { tier: "UNRANK", rank: "", leaguePoints: 0, wins: 0, losses: 0 };
    };

    const soloLeagueData = getLeagueData("RANKED_SOLO_5x5");
    const flexLeagueData = getLeagueData("RANKED_FLEX_SR");

    const winRate = (wins: number, losses: number) => {
        const totalGames = wins + losses;
        return totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : "0";
    };
    const getTierColor = (tier: string) => {
        switch (tier.toUpperCase()) {
            case "DIAMOND": return "blue";
            case "EMERALD": return "green";
            case "PLATINUM": return "teal";
            case "GOLD": return "yellow";
            case "SILVER": return "gray";
            case "BRONZE": return "orange";
            case "IRON": return "yellow";
            default: return "";
        }
    };

    const renderLeagueData = (leagueData: any, queueType: string) => {
        return (
            <div>
                <div className="border p-2 rounded-t-lg shadow-md w-[320px] bg-white">
                    <div className="justify-between items-center">
                        <p className="font-bold">{queueType === "RANKED_SOLO_5x5" ? "솔로 랭크" : "자유 랭크"}</p>
                    </div>
                </div>
                <div className="border p-1 rounded-b-lg shadow-md w-[320px] bg-white">
                    <div className="flex">
                        <Image className="w-1/4" alt={`${queueType}-tier`} src={`/emblems/${leagueData.tier}.png`} width={50} height={50} />
                        <div className="p-1">
                            <p className="text-lg" style={{ color: getTierColor(leagueData.tier) }}> {`${leagueData.tier} ${leagueData.rank} `} </p>
                            <p style={{ color: getTierColor(leagueData.tier) }}> {`${leagueData.leaguePoints} LP`} </p>
                        </div>
                        <div className="p-2">
                            <p className="text-sm font-bold" > 승률 {winRate(leagueData.wins, leagueData.losses)}% </p>
                            <p className="text-sm font-bold" > {`${leagueData.wins}승 ${leagueData.losses}패`} </p>
                        </div>
                    </div>

                    {/* LP 진행바와 동그라미 */}
                    <div className="mt-4">
                        {renderTierProgressBar(leagueData.tier, leagueData.rank, leagueData.leaguePoints)}
                    </div>
                </div>
            </div>
        );
    };

    const renderTierProgressBar = (tier: string, rank: string, lp: number) => {
        const ranks = ["IV", "III", "II", "I", "0"]; // 티어 구간
        const currentTierIndex = ranks.indexOf(rank); // 현재 티어 위치
        const totalLPInTier = 100; // 각 티어는 100LP로 설정
        const progress = Math.min(lp / totalLPInTier, 1) * 100; // 현재 LP에 따른 진행도 계산

        // 티어에 따라 진행바 색상을 변경
        const progressBarColor = getTierColor(tier);

        return (
            <div className="flex items-center justify-between w-full mt-4 relative">
                {ranks.map((t, index) => {
                    const isCurrentTier = index === currentTierIndex; // 현재 티어인지 확인
                    const isPastTier = index < currentTierIndex; // 현재 티어보다 낮은 티어인지 확인

                    return (
                        <div key={index} className="relative flex items-center">
                            {/* 동그라미: 현재 티어는 체크 표시, 이전 티어는 채워짐 */}
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${isCurrentTier
                                ? `bg-${progressBarColor}-500 text-white border-${progressBarColor}-500`
                                : isPastTier
                                    ? `bg-${progressBarColor}-300 text-white border-${progressBarColor}-300`
                                    : `bg-white text-${progressBarColor}-500 border-${progressBarColor}-500`
                                }`}>
                                {t}
                            </div>
                            {/* 동그라미 사이의 진행바 */}
                            {index !== ranks.length - 1 && (
                                <div className={`h-1.5 w-10 bg-gray-300 relative ${isPastTier ? `bg-${progressBarColor}-300` : isCurrentTier ? `bg-${progressBarColor}-500` : ""}`}>
                                    {/* 현재 티어에 있을 때 진행바 채우기 */}
                                    {isCurrentTier && (
                                        <div className="absolute left-0 top-0 h-full" style={{ width: `${progress}%`, backgroundColor: `${progressBarColor}` }}></div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            {/* 티어 및 승률 표시 구역 */}
            <div className="flex justify-center items-center p-1">
                {renderLeagueData(soloLeagueData, "RANKED_SOLO_5x5")}
            </div>
            <div className="flex justify-center items-center p-1">
                {renderLeagueData(flexLeagueData, "RANKED_FLEX_SR")}
            </div>
            <div className="flex justify-center items-center p-1">
                <PlayedTogether resultData={resultData} decodedGameName={decodedGameName} decodedTagLine={decodedTagLine} />
            </div>
        </div>
    )
}
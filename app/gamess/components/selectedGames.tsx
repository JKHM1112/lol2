import Link from "next/link";
import React from "react";
import Image from "next/image";
import ReloadButton from "@/app/gamess/components/reloadButton";
import RankResult from "@/app/gamess/components/rankResult";
import AramResult from "@/app/gamess/components/aramResult";

export default function SelectedGames({ fullSummonerName, summonerData, summonerLeaueDataResult, results, resultTimelines, searchedpuuid, queue }: any) {
    const [gameName, tagLines] = fullSummonerName.split('-');
    const tagLine = tagLines || 'KR1';
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
                    </div>
                </div>
                <div className='flex justify-between'>
                    <Link className={`w-1/3 px-4 py-2 ${queue == 420 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} href={`/gamess/${fullSummonerName}/420`}>솔로랭크
                    </Link>
                    <Link className={`w-1/3 px-4 py-2 ${queue == 440 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} href={`/gamess/${fullSummonerName}/440`}>자유랭크
                    </Link>
                    <Link className={`w-1/3 px-4 py-2 ${queue == 450 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} href={`/gamess/${fullSummonerName}/450`}>무작위 총격전
                    </Link>
                </div>
                <div className='flex justify-between'>
                    <Link href={`/gamess/${fullSummonerName}/progressGame`}>진행중인 게임 확인</Link>
                    <ReloadButton />
                </div>
                <div>
                    {queue == 420 && (
                        <RankResult searchedpuuid={summonerData.puuid} rankResults={results} rankResultTimelines={resultTimelines} queue={queue} />
                    )}
                    {queue == 440 && (
                        <RankResult searchedpuuid={summonerData.puuid} rankResults={results} rankResultTimelines={resultTimelines} queue={queue} />
                    )}
                    {queue == 450 && (
                        <AramResult searchedpuuid={summonerData.puuid} rankResults={results} rankResultTimelines={resultTimelines} queue={queue} />
                    )}
                </div>
            </div>
        </div>
    );
}

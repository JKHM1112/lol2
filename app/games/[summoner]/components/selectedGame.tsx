'use client'
import Link from "next/link";
import Games from "../../page";
import React from "react";
import { Button } from "@/components/ui/button";
import RankResult from "./rankResult";
import AramResult from "./aramResult";
import ReloadButton from "./reloadButton";
import Image from "next/image";

export default function SelectedGames({ fullSummonerName, summonerData, summonerLeaueDataResult, rankResults, rankResultTimelines, aramResults }: any) {
    const [gameName, tagLines] = fullSummonerName.split('-');
    const tagLine = tagLines || 'KR1';
    const decodedGameName = decodeURIComponent(gameName);
    const decodedTagLine = decodeURIComponent(tagLine);
    const gameNameTagLine = `${decodedGameName}#${decodedTagLine}`; //디코딩된 gameName#Tagline

    const [activeTab, setActiveTab] = React.useState("RankGame");
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
                            <Link href={`/games/${fullSummonerName}/progressGame`}>진행중인 게임 확인</Link>
                            <Button className="" onClick={() => setActiveTab("RankGame")}>랭크게임</Button>
                            <Button className="" onClick={() => setActiveTab("AramGame")}>칼바람나락</Button>
                            <ReloadButton />
                        </div>
                    </div>
                </div>

                <div>
                    {activeTab === "RankGame" && (
                        <RankResult rankResults={rankResults} searchedpuuid={summonerData.puuid} rankResultTimelines={rankResultTimelines} tier={leagueData.tier} />
                    )}
                    {activeTab === "AramGame" && (
                        <AramResult aramResults={aramResults} searchedpuuid={summonerData.puuid} />
                    )}
                </div>
            </div>
        </div>
    );
}

'use client'
import Link from "next/link";
import Games from "../../page";
import React from "react";
import { Button } from "@/components/ui/button";
import RankResult from "./rankResult";
import AramResult from "./aramResult";
import ReloadButton from "./reloadButton";
import Image from "next/image";

export default function SelectedGames({ gameNameTagLine, fullSummonerName, searchedpuuid, summonerData, summonerLeaueDataResult, rankResults, rankResultTimelines, aramResults }: any) {
    const [activeTab, setActiveTab] = React.useState("RankGame");
    const leagueData = summonerLeaueDataResult && summonerLeaueDataResult.length > 0 ? summonerLeaueDataResult[0] : {
        tier: "UNRANK",
        rank: "",
        leaguePoints: 0,
        wins: 0,
        losses: 0
    };
    const tierIcon = leagueData.tier !== "Unrank" ? leagueData.tier : "unrank";
    const oddsWinning = 0 || (leagueData.wins / (leagueData.wins + leagueData.losses) * 100).toFixed(1)
    return (
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Games />
            </div>
            <div style={{ width: '100%', justifyContent: 'center' }}>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center w-[700px] h-[130px] p-4 box-border border-2 rounded-md shadow-lg bg-white">
                        <div className="flex items-center h-[100px] w-full space-x-4">
                            <Image className='rounded-md ' alt='profileIconId' src={`/profileicon/${summonerData.profileIconId}.png`} width={40} height={40} />
                            <Image className='rounded-md ' alt='tierIcon' src={`/emblems/${tierIcon}.png`} width={40} height={40} />
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
                        <RankResult rankResults={rankResults} searchedpuuid={searchedpuuid} rankResultTimelines={rankResultTimelines} />
                    )}
                    {activeTab === "AramGame" && (
                        <AramResult aramResults={aramResults} searchedpuuid={searchedpuuid} />
                    )}
                </div>
            </div>
        </div>
    )
}

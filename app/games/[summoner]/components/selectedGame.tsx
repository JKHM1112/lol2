'use client'
import Link from "next/link";
import Games from "../../page";
import React from "react";
import { Button } from "@/components/ui/button";
import RankResult from "./rankResult";
import AramResult from "./aramResult";
import ReloadButton from "./reloadButton";

export default function SelectedGames({ gameNameTagLine, fullSummonerName, searchedpuuid, summonerData, summonerLeaueDataResult, rankResults, rankResultTimelines, summonerInformations, aramResults }: any) {
    const [activeTab, setActiveTab] = React.useState("RankGame");
    return (
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Games />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className="flex items-center gap-4">
                {"소환사 닉네임: " + gameNameTagLine}
                <Link href={`/games/${fullSummonerName}/progressGame`}>진행중인 게임 확인</Link>
            </div>
            <div style={{ width: '100%', justifyContent: 'center' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button className="" onClick={() => setActiveTab("RankGame")}>랭크게임</Button>
                    <Button className="" onClick={() => setActiveTab("AramGame")}>칼바람나락</Button>
                    <ReloadButton />
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
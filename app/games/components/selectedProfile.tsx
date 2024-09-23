'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SelectedProfile({ fullSummonerName, summonerData, summonerLeaueDataResult}: any) {
    const [gameName, tagLines] = fullSummonerName.split('-');
    const tagLine = tagLines || 'KR1';
    const decodedGameName = decodeURIComponent(gameName);
    const decodedTagLine = decodeURIComponent(tagLine);
    const gameNameTagLine = `${decodedGameName}#${decodedTagLine}`;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('닉네임이 복사되었습니다: ' + text);
    };

    const soloQueueData = summonerLeaueDataResult.find((data: any) => data.queueType === "RANKED_SOLO_5x5");
    const flexQueueData = summonerLeaueDataResult.find((data: any) => data.queueType === "RANKED_FLEX_SR");

    const soloLeagueData = soloQueueData ? soloQueueData : {
        tier: "UNRANK",
        rank: "",
        leaguePoints: 0,
        wins: 0,
        losses: 0
    };

    const flexLeagueData = flexQueueData ? flexQueueData : {
        tier: "UNRANK",
        rank: "",
        leaguePoints: 0,
        wins: 0,
        losses: 0
    };

    const [selectedQueue, setSelectedQueue] = useState("RANKED_SOLO_5x5");

    const tierIcon = (queueType: string) => {
        if (queueType === "RANKED_SOLO_5x5") {
            return soloLeagueData.tier !== "UNRANK" ? soloLeagueData.tier.toUpperCase() : "UNRANK";
        } else if (queueType === "RANKED_FLEX_SR") {
            return flexLeagueData.tier !== "UNRANK" ? flexLeagueData.tier.toUpperCase() : "UNRANK";
        }
        return "UNRANK";
    };

    const oddsWinning = (wins: number, losses: number) => {
        return (wins + losses) > 0 ? (wins / (wins + losses) * 100).toFixed(1) : 0;
    };

    const renderLeagueData = (queueType: string) => {
        const leagueData = queueType === "RANKED_SOLO_5x5" ? soloLeagueData : flexLeagueData;

        return (
            <div className="items-center space-x-4">
                <div className="flex items-center text-lg font-semibold">
                    <Image className="rounded-md" alt='tierIcon' src={`/emblems/${tierIcon(queueType)}.png`} width={50} height={50} />
                    {leagueData.tier} {leagueData.rank} {leagueData.leaguePoints}LP
                </div>
                <div className="flex flex-col text-sm text-gray-500 mt-2">
                    승률 {oddsWinning(leagueData.wins, leagueData.losses)}%
                    {leagueData.wins}승 {leagueData.losses}패
                </div>
            </div>
        );
    };

    return (
        <div className="flex justify-center items-center p-4 bg-gray-100">
            <div className="w-[800px] h-[200px] flex items-center p-2 border-2 rounded-lg shadow-lg bg-white">
                {/* <div className="w-1/5 flex flex-col items-center">
                    <Image className="rounded-md" alt='profileIconId' src={`/profileicon/${summonerData.profileIconId}.png`} width={60} height={60} />
                    <div className="text-lg font-semibold mt-2">
                        {summonerData.summonerLevel}
                    </div>
                </div> */}
                <div className="w-2/5 flex flex-col items-center">
                    {/* <div className="h-1/2 flex items-center justify-between mb-4">
                        <div className=" cursor-pointer" onClick={() => copyToClipboard(gameNameTagLine)}>
                            {gameNameTagLine}
                        </div>
                    </div> */}
                    <div className="h-1/2 flex space-x-4">
                        <button className={`px-4 py-2 rounded-lg ${selectedQueue === 'RANKED_SOLO_5x5' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} onClick={() => setSelectedQueue('RANKED_SOLO_5x5')} > 솔로랭크 </button>
                        <button className={`px-4 py-2 rounded-lg ${selectedQueue === 'RANKED_FLEX_SR' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} onClick={() => setSelectedQueue('RANKED_FLEX_SR')} > 자유랭크 </button>
                    </div>
                </div>
                <div className="w-2/5 flex flex-col items-center">
                    {selectedQueue === "RANKED_SOLO_5x5" && renderLeagueData("RANKED_SOLO_5x5")}
                    {selectedQueue === "RANKED_FLEX_SR" && renderLeagueData("RANKED_FLEX_SR")}
                </div>
            </div>
        </div>
    );
}

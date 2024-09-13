import Link from "next/link";
import React from "react";
import RankResult from "@/app/games/components/rankResult";
import AramResult from "@/app/games/components/aramResult";

export default function SelectedGames({ fullSummonerName, resultData, resultTimelines, searchedpuuid, queue, tier }: any) {
    return (
        <div className="flex flex-col items-center p-4 bg-gray-100">
            <div className="flex justify-center mb-6 space-x-2">
                <Link href={`/games/${fullSummonerName}/420`}>
                    <button className={`px-4 py-2 rounded-lg ${queue == 420 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>솔로랭크</button>
                </Link>
                {/* <Link href={`/games/${fullSummonerName}/440`}>
                    <button className={`px-4 py-2 rounded-lg ${queue == 440 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>자유랭크</button>
                </Link> */}
                <Link href={`/games/${fullSummonerName}/450`}>
                    <button className={`px-4 py-2 rounded-lg ${queue == 450 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>무작위 총격전</button>
                </Link>
            </div>
            <div className="w-full flex justify-center">
                {/* <Link href={`/games/${fullSummonerName}/progressGame`}>진행중인 게임 확인</Link> */}
            </div>
            <div className="w-full flex justify-center">
                {queue == 420 && (
                    <RankResult searchedpuuid={searchedpuuid} rankResults={resultData} rankResultTimelines={resultTimelines} queue={queue} tier={tier} />
                )}
                {queue == 440 && (
                    <RankResult searchedpuuid={searchedpuuid} flexResults={resultData} flexResultTimelines={resultTimelines} queue={queue} tier={tier} />
                )}
                {queue == 450 && (
                    <AramResult searchedpuuid={searchedpuuid} aramResults={resultData} aramResultTimelines={resultTimelines} />
                )}
            </div>
        </div>
    );
}

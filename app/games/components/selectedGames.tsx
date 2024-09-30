import Link from "next/link";
import React from "react";
import RankResult from "@/app/games/components/rankResult";
import AramResult from "@/app/games/components/aramResult";

export default function SelectedGames({ fullSummonerName, resultData, resultTimelines, searchedpuuid, queue, tier, session }: any) {

    return (
        <div>
            <div className="mt-1">
                <Link href={`/games/${fullSummonerName}/420`}>
                    <button className={`mr-4 px-4 py-2  border-2 border-gray-300 rounded-lg ${queue == 420 ? 'bg-blue-500 text-white' : 'bg-white'}`}>솔로랭크</button>
                </Link>
                <Link href={`/games/${fullSummonerName}/440`}>
                    <button className={`mr-4 px-4 py-2 border-2 border-gray-300 rounded-lg ${queue == 440 ? 'bg-blue-500 text-white' : 'bg-white'}`}>자유랭크</button>
                </Link>
                <Link href={`/games/${fullSummonerName}/450`}>
                    <button className={`mr-4 px-4 py-2 border-2 border-gray-300 rounded-lg ${queue == 450 ? 'bg-blue-500 text-white' : 'bg-white'}`}>무작위 총격전</button>
                </Link>
            </div>
            <div className="w-full flex justify-center">
                {queue == 420 && (
                    <RankResult searchedpuuid={searchedpuuid} rankResults={resultData} rankResultTimelines={resultTimelines} queue={queue} tier={tier} session={session} />
                )}
                {queue == 440 && (
                    <RankResult searchedpuuid={searchedpuuid} rankResults={resultData} rankResultTimelines={resultTimelines} queue={queue} tier={tier} session={session} />
                )}
                {queue == 450 && (
                    <AramResult searchedpuuid={searchedpuuid} aramResults={resultData} aramResultTimelines={resultTimelines} />
                )}
            </div>
        </div>
    );
}


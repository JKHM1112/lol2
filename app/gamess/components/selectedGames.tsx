import Link from "next/link";
import React from "react";
import RankResult from "@/app/gamess/components/rankResult";
import AramResult from "@/app/gamess/components/aramResult";

export default function SelectedGames({ fullSummonerName, results, resultTimelines, searchedpuuid, queue, tier }: any) {
    return (
        <div className="flex flex-col items-center p-4 bg-gray-100">
            <div className="flex justify-center mb-6 space-x-2">
                <Link href={`/gamess/${fullSummonerName}/420`}>
                    <button className={`px-4 py-2 rounded-lg ${queue == 420 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>솔로랭크</button>
                </Link>
                <Link href={`/gamess/${fullSummonerName}/440`}>
                    <button className={`px-4 py-2 rounded-lg ${queue == 440 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>자유랭크</button>
                </Link>
                <Link href={`/gamess/${fullSummonerName}/450`}>
                    <button className={`px-4 py-2 rounded-lg ${queue == 450 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>무작위 총격전</button>
                </Link>
            </div>
            <div className="w-full flex justify-center">
                {/* <Link href={`/gamess/${fullSummonerName}/progressGame`}>진행중인 게임 확인</Link> */}
            </div>
            <div className="w-full flex justify-center">
                {queue == 420 && (
                    <RankResult searchedpuuid={searchedpuuid} rankResults={results} rankResultTimelines={resultTimelines} queue={queue} tier={tier} />
                )}
                {queue == 440 && (
                    <RankResult searchedpuuid={searchedpuuid} rankResults={results} rankResultTimelines={resultTimelines} queue={queue} tier={tier} />
                )}
                {queue == 450 && (
                    <AramResult searchedpuuid={searchedpuuid} rankResults={results} rankResultTimelines={resultTimelines} queue={queue} tier={tier} />
                )}
            </div>
        </div>
    );
}

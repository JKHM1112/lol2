//my-app/app/edit/[id]/page.tsx
'use client'
import Difficulty from "@/app/write/components/difficulty";
import Items from "@/app/write/components/items";
import Lines from "@/app/write/components/lines";
import useUserStore from "@/app/hooks/useUserStore";
import React from "react";
import ChampionLineSelect from "@/app/write/components/championLineSelect";
import Summoners from "@/app/write/components/summoner";
import RuneSelect from "@/app/write/components/runeSelect";

export default function EditsItem({ props }: any) {

    const { champions, lines, runes, items, summoners, lineResults, gameResults, review, before, after, side, teamFight
    } = useUserStore();
    const [dataActiveTab, setDataActiveTab] = React.useState("MyData");

    return (
        <div className="min-w-[1200px] flex justify-center">
            <div className="min-w-[1000px] bg-gray-100 rounded-md mt-4">
                <div className="flex flex-row justify-center gap-8 m-4">
                    <button className={`border-2 px-4 py-2 rounded-md transition-all duration-300 ease-in-out ${dataActiveTab === "MyData"
                        ? "bg-sky-500 text-white border-sky-500 scale-110"
                        : "bg-sky-300 text-white hover:bg-sky-200 scale-90"
                        }`} onClick={() => setDataActiveTab("MyData")}>
                        내 기록
                    </button>

                    <button className={`border-2 px-4 py-2 rounded-md transition-all duration-300 ease-in-out ${dataActiveTab === "YourData"
                        ? "bg-sky-500 text-white border-sky-500 scale-110"
                        : "bg-sky-300 text-white hover:bg-sky-200 scale-90"
                        }`} onClick={() => setDataActiveTab("YourData")}>
                        네 기록
                    </button>
                </div>

                <div>
                    <div className="flex flex-row justify-center gap-8">
                        <div>
                            <ChampionLineSelect dataActiveTab={dataActiveTab} />
                        </div>
                        <form action="/api/post/edit" method="POST">
                            <input style={{ display: 'none' }} name="_id" defaultValue={props.params.id} />
                            <input style={{ display: 'none' }} name="chams" value={JSON.stringify(champions)} readOnly />
                            <input style={{ display: 'none' }} name="line" value={lines} readOnly />
                            <input style={{ display: 'none' }} name="runes" value={JSON.stringify(runes)} readOnly />
                            <input style={{ display: 'none' }} name="items" value={JSON.stringify(items)} readOnly />
                            <input style={{ display: 'none' }} name="summoners" value={JSON.stringify(summoners)} readOnly />
                            <input style={{ display: 'none' }} name="lineResult" value={lineResults} readOnly />
                            <input style={{ display: 'none' }} name="gameResult" value={gameResults} readOnly />
                            <input style={{ display: 'none' }} name="review" value={review} readOnly />
                            <input style={{ display: 'none' }} name="before6" value={before} readOnly />
                            <input style={{ display: 'none' }} name="after6" value={after} readOnly />
                            <input style={{ display: 'none' }} name="side1" value={side} readOnly />
                            <input style={{ display: 'none' }} name="teamFight1" value={teamFight} readOnly />
                            <button className="border-2 px-4 py-2 rounded-md">전송</button>
                        </form>
                    </div>

                    <div>
                        <div className="flex justify-center">
                            {/* 아이템박스 / 스펠*/}
                            <div className="flex flex-col">
                                <div className="w-[180px] bg-gray-200 rounded-md my-4">
                                    <Items dataActiveTab={dataActiveTab} />
                                </div>
                                <div className="w-[180px] bg-gray-200 rounded-md mb-4 ">
                                    <Summoners dataActiveTab={dataActiveTab} />
                                </div>
                            </div>
                            {/* 룬박스*/}
                            <div className="w-[450px] bg-gray-200 rounded-md m-4">
                                <RuneSelect dataActiveTab={dataActiveTab} />
                            </div>
                            {/* 난이도 박스 */}
                            <div className="w-[250px] bg-gray-200 rounded-md m-4">
                                <Difficulty />
                                <Lines />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
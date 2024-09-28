'use client'
import useUserStore from "../hooks/useUserStore";
import React from "react";
import ChampionLineSelect from "./components/championLineSelect";
import RuneSelect from "./components/runeSelect";
import Items from "./components/items";
import Summoners from "./components/summoner";
import Difficulty from "./components/difficulty";
import Lines from "./components/lines";

export default function Write() {
    const { timeLineLevelUp1, timeLineLevelUp2, gameExtracted1, gameExtracted2, timeLineKda1, timeLineKda2,
        timeLineObject1, timeLineObject2, turretPlatesTaken, visionScore, tier, puuid, skillOrder,
        champions, lines, runes, items, summoners, lineResults, gameResults, review, before, after, side, teamFight
    } = useUserStore();
    const currentDate = new Date().toISOString().split('T')[0]
    const [dataActiveTab, setDataActiveTab] = React.useState("MyData");
    return (
        <div className="flex justify-center min-w-[1200px]">
            <div className="min-w-[1000px] bg-gray-100 rounded-md mt-4">
                <div className="flex flex-row justify-center gap-8 m-4">
                    <button className={`border-2 px-4 py-2 rounded-md transition-all duration-300 ease-in-out ${dataActiveTab === "MyData"
                        ? "bg-sky-500 text-white border-sky-500 scale-110"
                        : "bg-sky-300 text-white hover:bg-sky-200 scale-90"
                        }`} onClick={() => setDataActiveTab("MyData")}>
                        내 기록
                    </button>

                    <button className={`border-2 px-4 py-2 rounded-md transition-all duration-300 ease-in-out ${dataActiveTab === "YourData"
                        ? "bg-red-500 text-white border-red-500 scale-110"
                        : "bg-red-300 text-white hover:bg-red-200 scale-90"
                        }`} onClick={() => setDataActiveTab("YourData")}>
                        네 기록
                    </button>
                </div>

                <div>
                    <div className="flex flex-row justify-center gap-8">
                        <div>
                            <ChampionLineSelect dataActiveTab={dataActiveTab} />
                        </div>
                        <form action="/api/post/newListWrite" method="POST">
                            <input style={{ display: 'none' }} name="chams" value={JSON.stringify(champions)} readOnly />
                            <input style={{ display: 'none' }} name="line" value={lines} readOnly />
                            <input style={{ display: 'none' }} name="runes" value={JSON.stringify(runes)} readOnly />
                            <input style={{ display: 'none' }} name="items" value={JSON.stringify(items)} readOnly />
                            <input style={{ display: 'none' }} name="summoners" value={JSON.stringify(summoners)} readOnly />
                            <input style={{ display: 'none' }} name="date" defaultValue={currentDate}></input>
                            <input style={{ display: 'none' }} name="timeLineLevel1" defaultValue={JSON.stringify(timeLineLevelUp1)}></input>
                            <input style={{ display: 'none' }} name="timeLineLevel2" defaultValue={JSON.stringify(timeLineLevelUp2)}></input>
                            <input style={{ display: 'none' }} name="gameExtracted1" defaultValue={JSON.stringify(gameExtracted1)}></input>
                            <input style={{ display: 'none' }} name="gameExtracted2" defaultValue={JSON.stringify(gameExtracted2)}></input>
                            <input style={{ display: 'none' }} name="timeLineObject1" defaultValue={JSON.stringify(timeLineObject1)}></input>
                            <input style={{ display: 'none' }} name="timeLineObject2" defaultValue={JSON.stringify(timeLineObject2)}></input>
                            <input style={{ display: 'none' }} name="timeLineKda1" defaultValue={JSON.stringify(timeLineKda1)}></input>
                            <input style={{ display: 'none' }} name="timeLineKda2" defaultValue={JSON.stringify(timeLineKda2)}></input>
                            <input style={{ display: 'none' }} name="turretPlatesTaken" defaultValue={JSON.stringify(turretPlatesTaken)}></input>
                            <input style={{ display: 'none' }} name="visionScore" defaultValue={JSON.stringify(visionScore)}></input>
                            <input style={{ display: 'none' }} name="skillOrder" defaultValue={JSON.stringify(skillOrder)}></input>
                            <input style={{ display: 'none' }} name="tier" defaultValue={tier}></input>
                            <input style={{ display: 'none' }} name="puuid" defaultValue={puuid}></input>
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
                                <div className={`w-[180px] m-2 rounded-md ${dataActiveTab === "MyData" ? "bg-blue-200" : "bg-red-200"}`} >
                                    <Items dataActiveTab={dataActiveTab} />
                                </div>
                                <div className={`w-[180px] m-2 rounded-md ${dataActiveTab === "MyData" ? "bg-blue-200" : "bg-red-200"}`} >
                                    <Summoners dataActiveTab={dataActiveTab} />
                                </div>
                            </div>
                            {/* 룬박스*/}
                            <div className={`w-[450px] m-2 rounded-md ${dataActiveTab === "MyData" ? "bg-blue-200" : "bg-red-200"}`}>
                                <RuneSelect dataActiveTab={dataActiveTab} />
                            </div>
                            {/* 난이도 박스 */}
                            <div className="flex flex-col">
                                <div className={`w-[250] m-2 rounded-md ${dataActiveTab === "MyData" ? "bg-blue-200" : "bg-red-200"}`} >
                                    <Difficulty />
                                </div>
                                <div className={`w-[250] m-2 rounded-md ${dataActiveTab === "MyData" ? "bg-blue-200" : "bg-red-200"}`} >
                                    <Lines />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
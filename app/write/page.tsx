'use client'
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable"
import Items from "./components/items";
import Runes from "./components/runes";
import Summoners from "./components/summoner";
import Difficulty from "./components/difficulty";
import Lines from "./components/lineResult";
import LineChampions from "./components/lineChampions";
import useUserStore from "../hooks/useUserStore";
export default function Write() {
    const { timeLineLevelUp1, timeLineLevelUp2, gameExtracted1, gameExtracted2, timeLineKda1, timeLineKda2,
        timeLineObject1, timeLineObject2, turretPlatesTaken, visionScore, tier, puuid ,skillOrder} = useUserStore();
    const currentDate = new Date().toISOString().split('T')[0]

    return (
        <div className="flex items-center gap-4 justify-center">
            <form action="/api/post/newListWrite" method="POST">
                <ResizablePanelGroup direction="horizontal" className="items-center justify-center p-2 ">
                    <ResizablePanelGroup direction="horizontal" className="min-h-[600px] min-w-[600px] rounded-lg border">
                        <ResizablePanel defaultSize={18}>
                            <ResizablePanelGroup direction="vertical" className="rounded-lg border">
                                <ResizablePanel defaultSize={30} className="flex items-center justify-center p-2">
                                    <div className="p-2">
                                        <LineChampions />
                                        <Difficulty />
                                        <Lines />
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel defaultSize={9} className="flex  items-center justify-center p-2">
                                    <div className="p-2">
                                        <Summoners />
                                    </div>
                                    <Button type="submit">전송하기</Button>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={18}>
                            <ResizablePanelGroup direction="horizontal" className=" rounded-lg border">
                                <ResizablePanel defaultSize={10} className="flex items-center justify-center p-2">
                                    <div >
                                        <Runes />
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel defaultSize={10} className="flex items-center justify-center p-2">
                                    <div className="p-2">
                                        <Items />
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanelGroup>

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
            </form>
        </div >
    )
}
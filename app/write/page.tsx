'use client'
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable"
import Items from "./components/items";
import Runes from "./components/runes";
import Spells from "./components/spells";
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
                                        <Spells />
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

                <input style={{ display: 'none' }} name="date" value={currentDate}></input>
                <input style={{ display: 'none' }} name="timeLineLevel1" value={JSON.stringify(timeLineLevelUp1)}></input>
                <input style={{ display: 'none' }} name="timeLineLevel2" value={JSON.stringify(timeLineLevelUp2)}></input>
                <input style={{ display: 'none' }} name="gameExtracted1" value={JSON.stringify(gameExtracted1)}></input>
                <input style={{ display: 'none' }} name="gameExtracted2" value={JSON.stringify(gameExtracted2)}></input>
                <input style={{ display: 'none' }} name="timeLineObject1" value={JSON.stringify(timeLineObject1)}></input>
                <input style={{ display: 'none' }} name="timeLineObject2" value={JSON.stringify(timeLineObject2)}></input>
                <input style={{ display: 'none' }} name="timeLineKda1" value={JSON.stringify(timeLineKda1)}></input>
                <input style={{ display: 'none' }} name="timeLineKda2" value={JSON.stringify(timeLineKda2)}></input>
                <input style={{ display: 'none' }} name="turretPlatesTaken" value={JSON.stringify(turretPlatesTaken)}></input>
                <input style={{ display: 'none' }} name="visionScore" value={JSON.stringify(visionScore)}></input>
                <input style={{ display: 'none' }} name="skillOrder" value={JSON.stringify(skillOrder)}></input>
                <input style={{ display: 'none' }} name="tier" value={tier}></input>
                <input style={{ display: 'none' }} name="puuid" value={puuid}></input>
            </form>
        </div >
    )
}
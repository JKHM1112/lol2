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
    const { participantsTimeLine1Filtered, participantsTimeLine2Filtered,
        participantsGameTimeline1Extracted, participantsGameTimeline2Extracted } = useUserStore();
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
                <input style={{ display: 'none' }} name="timeLine1" value={JSON.stringify(participantsTimeLine1Filtered)}></input>
                <input style={{ display: 'none' }} name="timeLine2" value={JSON.stringify(participantsTimeLine2Filtered)}></input>
                <input style={{ display: 'none' }} name="gameTimeLine1" value={JSON.stringify(participantsGameTimeline1Extracted)}></input>
                <input style={{ display: 'none' }} name="gameTimeLine2" value={JSON.stringify(participantsGameTimeline2Extracted)}></input>

            </form>
        </div >
    )
}
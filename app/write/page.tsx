'use client'
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable"
import Items from "./components/items";
import Runes from "./components/runes";
import Spells from "./components/spells";
import Difficulty from "./components/difficulty";
import Lines from "./components/lineResult";
import LineChampions from "./components/lineChampions";
export default function Write() {

    const currentDate = new Date().toISOString().split('T')[0]

    return (
        <div className="flex items-center gap-4">
            <form action="/api/post/newListWrite" method="POST">

                <ResizablePanelGroup direction="horizontal" className="items-center justify-center p-6">
                    <ResizablePanelGroup direction="horizontal" className="min-h-[700px] min-w-[1000px] rounded-lg border">
                        <ResizablePanel defaultSize={10}>
                            <ResizablePanelGroup direction="vertical" className="rounded-lg border">
                                <ResizablePanel defaultSize={10} className="flex h-full items-center justify-center p-6">
                                    <div className="p-6">
                                        <LineChampions />
                                        <Difficulty />
                                        <Lines />
                                    </div>
                                </ResizablePanel>

                                <ResizableHandle />

                                <ResizablePanel defaultSize={10} className="flex h-full items-center justify-center p-6">
                                    <div className="p-6">
                                        <Spells />
                                    </div>
                                    <Button type="submit">전송하기</Button>


                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>

                        <ResizableHandle />

                        <ResizablePanel defaultSize={10}>
                            <ResizablePanelGroup direction="horizontal" className="min-h-[400px] min-w-[400px] rounded-lg border">
                                <ResizablePanel defaultSize={10} className="flex min-h-[200px] min-w-[200px] items-center justify-center p-6">
                                    <div >
                                        <Runes />
                                    </div>
                                </ResizablePanel>

                                <ResizableHandle />

                                <ResizablePanel defaultSize={10} className="flex min-h-[200px] min-w-[200px] items-center justify-center p-6">
                                    <div className="p-6">
                                        <Items />
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanelGroup>

                <input style={{ display: 'none' }} name="date" defaultValue={currentDate}></input>

            </form>
        </div >
    )
}
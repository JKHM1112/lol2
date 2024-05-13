//my-app/app/edit/[id]/page.tsx
'use client'
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable"
import Lines from "@/app/write/components/lineResult";
import LineChampions from "@/app/write/components/lineChampions";
import Difficulty from "@/app/write/components/difficulty";
import Spells from "@/app/write/components/spells";
import Runes from "@/app/write/components/runes";
import Items from "@/app/write/components/items";

export default function EditsItem(props: any) {
    console.log(props)
    return (
        <div className="flex items-center gap-4 justify-center">
            <form action="/api/post/edit" method="POST">
                <ResizablePanelGroup direction="horizontal" className="items-center justify-center p-6 ">
                    <ResizablePanelGroup direction="horizontal" className="min-h-[650px] min-w-[1000px] rounded-lg border">
                        <ResizablePanel defaultSize={10}>
                            <ResizablePanelGroup direction="vertical" className="rounded-lg border">
                                <ResizablePanel defaultSize={30} className="flex h-full items-center justify-center p-6">
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
                <input style={{ display: 'none' }} name="_id" defaultValue={props.props.params.id} />
            </form>
        </div >
    )
}
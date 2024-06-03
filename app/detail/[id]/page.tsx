//my-app/app/detail/[id]/page.tsx

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable"
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
export default async function Detail(props: any) {
    interface Session {
        user: {
            email: string;
        }
    }
    const db = (await connectDB).db("dream")
    let result = await db.collection('dataEnteredDirectly').findOne({ _id: new ObjectId(props.params.id) })
    let chams = await db.collection('dataEnteredDirectly').find().toArray()
    let session: Session | null = await getServerSession(authOptions)
    let email: string | null | undefined = ''
    if (session) {
        email = session.user.email
    }

    const { line, cham1, cham2 } = result;
    const filteredChamps = chams.filter((item: any) =>
        item.email === email && item.line === line && (item.cham1 === cham1 && item.cham2 === cham2)
    );
    return (
        <ResizablePanelGroup direction="horizontal" className="max-w-[2000px] rounded-lg border">
            <ResizablePanel defaultSize={20}>
                <div>
                    <h4>자세히보기</h4>
                    <p>라인: {result.line}</p>
                    <p>챔피언: {result.chams[0]}</p>
                    <p>챔피언: {result.chams[1]}</p>
                    <p>챔피언: {result.chams[2]}</p>
                    <p>챔피언: {result.chams[3]}</p>
                    <p>6전: {result.before6}</p>
                    <p>6후: {result.after6}</p>
                    <p>후반: {result.half}</p>
                    <p>라인결과: {result.lineResult}</p>
                    <p>게임결과: {result.gameResult}</p>
                    <p>룬: {result.runes.join(', ')}</p>
                    <p>스펠: {result.spells.join(', ')}</p>
                    <p>템: {result.items.join(', ')}</p>
                    <p>후기: {result.review}</p>
                    <p>{result.timeLine1}</p>
                    <p>{result.timeLine2}</p>
                    <p>{result.gameTimeLine1}</p>
                    <p>{result.gameTimeLine2}</p>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={100}>
                <ResizablePanelGroup direction="vertical">

                    <ResizablePanel defaultSize={100}>
                        <div>
                            <p>내 데이터만 보기</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>라인</th>
                                        <th>6전</th>
                                        <th>6후</th>
                                        <th>후반</th>
                                        <th>라인결과</th>
                                        <th>게임결과</th>
                                        <th>내룬</th>
                                        <th>상대룬</th>
                                        <th>내스펠1</th>
                                        <th>내스펠2</th>
                                        <th>상대스펠1</th>
                                        <th>상대스펠2</th>
                                        <th>템1</th>
                                        <th>템2</th>
                                        <th>템3</th>
                                        <th>템4</th>
                                        <th>템5</th>
                                        <th>템6</th>
                                        <th>날짜</th>
                                        <th>리뷰</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredChamps.map((item: any, index: any) => (
                                        item.email === email && (
                                            <tr key={index}>
                                                <td>{item.line}</td>
                                                <td>{item.before6}</td>
                                                <td>{item.after6}</td>
                                                <td>{item.half}</td>
                                                <td>{item.lineResult}</td>
                                                <td>{item.gameResult}</td>
                                                <td>{item.runes.join(', ')}</td>
                                                <td>{item.runes.join(', ')}</td>
                                                <td>{item.spells.join(', ')}</td>
                                                <td>{item.spells.join(', ')}</td>
                                                <td>{item.items.join(', ')}</td>
                                                <td>{item.date}</td>
                                                <td>{item.review}</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />

                    <ResizablePanel defaultSize={100}>
                        <div>
                            <p>다른 데이터만 보기</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>라인</th>
                                        <th>6전</th>
                                        <th>6후</th>
                                        <th>후반</th>
                                        <th>라인결과</th>
                                        <th>게임결과</th>
                                        <th>내룬</th>
                                        <th>상대룬</th>
                                        <th>내스펠1</th>
                                        <th>내스펠2</th>
                                        <th>상대스펠1</th>
                                        <th>상대스펠2</th>
                                        <th>템1</th>
                                        <th>템2</th>
                                        <th>템3</th>
                                        <th>템4</th>
                                        <th>템5</th>
                                        <th>템6</th>
                                        <th>날짜</th>
                                        <th>리뷰</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredChamps.map((item: any, index: any) => (
                                        item.email !== email && (
                                            <tr key={index}>
                                                <td>{item.line}</td>
                                                <td>{item.before6}</td>
                                                <td>{item.after6}</td>
                                                <td>{item.half}</td>
                                                <td>{item.lineResult}</td>
                                                <td>{item.gameResult}</td>
                                                <td>{item.runes.join(', ')}</td>
                                                <td>{item.runes.join(', ')}</td>
                                                <td>{item.spells.join(', ')}</td>
                                                <td>{item.spells.join(', ')}</td>
                                                <td>{item.items.join(', ')}</td>
                                                <td>{item.date}</td>
                                                <td>{item.review}</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
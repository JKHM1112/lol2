//app/detail/[id]/page.tsx세부사항 클릭하면 나오는 page
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
    let result = await db.collection('data').findOne({ _id: new ObjectId(props.params.id) })
    let chams = await db.collection('data').find().toArray()
    // console.log(result)//이건 상세보기에 있던 data이다
    // console.log(champs)//이건 전체 data이다.
    let session: Session | null = await getServerSession(authOptions)
    let email: string | null | undefined = ''
    if (session) {
        email = session.user.email
    }

    // console.log(result.email)
    // console.log(email)
    const { line, cham1, cham2 } = result;
    const filteredChamps = chams.filter((item: any) =>
        item.email === email && item.line === line && (item.cham1 === cham1 || item.cham2 === cham2)
    );
    return (
        <ResizablePanelGroup direction="horizontal" className="max-w-[2000px] rounded-lg border">
            <ResizablePanel defaultSize={20}>
                <div>
                    <h4>자세히보기</h4>
                    <p>라인: {result.line}</p>
                    <p>챔피언: {result.cham1}</p>
                    <p>챔피언: {result.cham2}</p>
                    <p>챔피언: {result.cham3}</p>
                    <p>챔피언: {result.cham4}</p>
                    <p>6전: {result.before6}</p>
                    <p>6후: {result.after6}</p>
                    <p>사이드: {result.half}</p>
                    <p>룬: {result.rune1}</p>
                    <p>룬: {result.rune2}</p>
                    <p>스펠1: {result.spell1}</p>
                    <p>스펠2: {result.spell2}</p>
                    <p>스펠1: {result.spell3}</p>
                    <p>스펠2: {result.spell4}</p>
                    <p>첫템: {result.firstItem}</p>
                    <p>전설템1: {result.legendaryItem1}</p>
                    <p>전설템2: {result.legendaryItem2}</p>
                    <p>전설템3: {result.legendaryItem3}</p>
                    <p>전설템4: {result.legendaryItem4}</p>
                    <p>전설템5: {result.legendaryItem5}</p>
                    <p>전설템6: {result.legendaryItem6}</p>
                    <p>신발템: {result.shoesItem}</p>
                    <p>라인결과: {result.lineResult}</p>
                    <p>게임결과: {result.gameResult}</p>
                    <p>작성자: {result.author}</p>
                    <p>후기: {result.review}</p>
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
                                        <th>내챔피언</th>
                                        <th>상대챔피언</th>
                                        <th>6전</th>
                                        <th>6후</th>
                                        <th>후반</th>
                                        <th>내룬</th>
                                        <th>상대룬</th>
                                        <th>내스펠1</th>
                                        <th>내스펠2</th>
                                        <th>상대스펠1</th>
                                        <th>상대스펠2</th>
                                        <th>초반템</th>
                                        <th>전설템1</th>
                                        <th>전설템2</th>
                                        <th>전설템3</th>
                                        <th>전설템4</th>
                                        <th>전설템5</th>
                                        <th>전설템6</th>
                                        <th>신발템</th>
                                        <th>라인결과</th>
                                        <th>게임결과</th>
                                        <th>작성자</th>
                                        <th>날짜</th>
                                        <th>리뷰</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {filteredChamps.map((item: any, index: any) => (
                                        item.email === email && (
                                            <tr key={index}>
                                                <td>{item.line}</td>
                                                <td>{item.cham1}</td>
                                                <td>{item.cham2}</td>
                                                <td>{item.before6}</td>
                                                <td>{item.after6}</td>
                                                <td>{item.half}</td>
                                                <td>{item.rune1}</td>
                                                <td>{item.rune2}</td>
                                                <td>{item.spell1}</td>
                                                <td>{item.spell2}</td>
                                                <td>{item.spell3}</td>
                                                <td>{item.spell4}</td>
                                                <td>{item.firstItem}</td>
                                                <td>{item.legendaryItem1}</td>
                                                <td>{item.legendaryItem2}</td>
                                                <td>{item.legendaryItem3}</td>
                                                <td>{item.legendaryItem4}</td>
                                                <td>{item.legendaryItem5}</td>
                                                <td>{item.legendaryItem6}</td>
                                                <td>{item.shoesItem}</td>
                                                <td>{item.lineResult}</td>
                                                <td>{item.gameResult}</td>
                                                <td>{item.author}</td>
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
                                        <th>내챔피언</th>
                                        <th>상대챔피언</th>
                                        <th>6전</th>
                                        <th>6후</th>
                                        <th>후반</th>
                                        <th>내룬</th>
                                        <th>상대룬</th>
                                        <th>내스펠1</th>
                                        <th>내스펠2</th>
                                        <th>상대스펠1</th>
                                        <th>상대스펠2</th>
                                        <th>초반템</th>
                                        <th>전설템1</th>
                                        <th>전설템2</th>
                                        <th>전설템3</th>
                                        <th>전설템4</th>
                                        <th>전설템5</th>
                                        <th>전설템6</th>
                                        <th>신발템</th>
                                        <th>라인결과</th>
                                        <th>게임결과</th>
                                        <th>작성자</th>
                                        <th>날짜</th>
                                        <th>리뷰</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {filteredChamps.map((item: any, index: any) => (
                                        item.email !== email && (
                                            <tr key={index}>
                                                <td>{item.line}</td>
                                                <td>{item.cham1}</td>
                                                <td>{item.cham2}</td>
                                                <td>{item.before6}</td>
                                                <td>{item.after6}</td>
                                                <td>{item.half}</td>
                                                <td>{item.rune1}</td>
                                                <td>{item.rune2}</td>
                                                <td>{item.spell1}</td>
                                                <td>{item.spell2}</td>
                                                <td>{item.spell3}</td>
                                                <td>{item.spell4}</td>
                                                <td>{item.firstItem}</td>
                                                <td>{item.legendaryItem1}</td>
                                                <td>{item.legendaryItem2}</td>
                                                <td>{item.legendaryItem3}</td>
                                                <td>{item.legendaryItem4}</td>
                                                <td>{item.legendaryItem5}</td>
                                                <td>{item.legendaryItem6}</td>
                                                <td>{item.shoesItem}</td>
                                                <td>{item.lineResult}</td>
                                                <td>{item.gameResult}</td>
                                                <td>{item.author}</td>
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
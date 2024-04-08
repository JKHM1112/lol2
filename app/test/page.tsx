import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ObjectId } from "mongodb"
export default async function ResizableDemo() {
    let result = {
        _id: new ObjectId("661372bcfc7b21de0276da7b"),
        line: '미드',
        before6: 1,
        after6: 3,
        half: 4,
        cham1: '트리스타나',
        cham2: '카타리나',
        cham3: null,
        cham4: null,
        rune1: '집중 공격',
        rune2: '집중 공격',
        spell1: '순간이동',
        spell2: '점멸',
        spell3: '점화',
        spell4: '점멸',
        firstItem: '도란의 검',
        legendaryItem1: '크라켄 학살자',
        legendaryItem2: '나보리 신속검',
        legendaryItem3: '피바라기',
        legendaryItem4: null,
        legendaryItem5: null,
        legendaryItem6: null,
        shoesItem: '광전사의 군화',
        lineResult: 'win',
        gameResult: 'lose',
        date: '2024-04-08',
        review: null,
        author: '이한호',
        email: 'jk007125@naver.com'
    }
    let result2 = {
        _id: new ObjectId("66137327fc7b21de0276da7c"),
        line: '미드',
        before6: 2,
        after6: 4,
        half: 5,
        cham1: '트리스타나',
        cham2: '카타리나',
        cham3: null,
        cham4: null,
        rune1: '집중 공격',
        rune2: '집중 공격',
        spell1: '순간이동',
        spell2: '점멸',
        spell3: '점화',
        spell4: '점멸',
        firstItem: '도란의 검',
        legendaryItem1: '크라켄 학살자',
        legendaryItem2: '나보리 신속검',
        legendaryItem3: '유령 무희',
        legendaryItem4: null,
        legendaryItem5: null,
        legendaryItem6: null,
        shoesItem: '광전사의 군화',
        lineResult: 'lose',
        gameResult: 'lose',
        date: '2024-04-08',
        review: '둘이 성장률이 비슷하면 카타리나가 우세하다',
        author: '이한호',
        email: 'jk007125@naver.com'
    }
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-lg border"
        >
            <ResizablePanel defaultSize={100}>
                <div>
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
                    <ResizablePanel defaultSize={25}>
                    <div>
                    <p>라인: {result2.line}</p>
                    <p>챔피언: {result2.cham1}</p>
                    <p>챔피언: {result2.cham2}</p>
                    <p>챔피언: {result2.cham3}</p>
                    <p>챔피언: {result2.cham4}</p>
                    <p>6전: {result2.before6}</p>
                    <p>6후: {result2.after6}</p>
                    <p>사이드: {result2.half}</p>
                    <p>룬: {result2.rune1}</p>
                    <p>룬: {result2.rune2}</p>
                    <p>스펠1: {result2.spell1}</p>
                    <p>스펠2: {result2.spell2}</p>
                    <p>스펠1: {result2.spell3}</p>
                    <p>스펠2: {result2.spell4}</p>
                    <p>첫템: {result2.firstItem}</p>
                    <p>전설템1: {result2.legendaryItem1}</p>
                    <p>전설템2: {result2.legendaryItem2}</p>
                    <p>전설템3: {result2.legendaryItem3}</p>
                    <p>전설템4: {result2.legendaryItem4}</p>
                    <p>전설템5: {result2.legendaryItem5}</p>
                    <p>전설템6: {result2.legendaryItem6}</p>
                    <p>신발템: {result2.shoesItem}</p>
                    <p>라인결과: {result2.lineResult}</p>
                    <p>게임결과: {result2.gameResult}</p>
                    <p>작성자: {result2.author}</p>
                    <p>후기: {result2.review}</p>
                </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Three</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

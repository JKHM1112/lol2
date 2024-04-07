//app/detail/[id]/page.js세부사항 클릭하면 나오는 page
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
export default async function Detail(props: any) {
    const db = (await connectDB).db("dream")
    let result = await db.collection('data').findOne({ _id: new ObjectId(props.params.id) })

    return (
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
            <p>작성자: {result.aythor}</p>
            <p>후기: {result.review}</p>
        </div>
    )
}
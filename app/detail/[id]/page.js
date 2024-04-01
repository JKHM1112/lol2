import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function Detail(props) {
    const db = (await connectDB).db("dream")
    let result = await db.collection('data').findOne({ _id: new ObjectId(props.params.id) })

    return (
        <div>
            <h4>자세히보기</h4>
            <p>라인: {result.line}</p>
            <p>챔피언: {result.cham1}</p>
            <p>챔피언: {result.cham2}</p>
            <p>6전: {result.before6}</p>
            <p>6후: {result.after6}</p>
            <p>사이드: {result.half}</p>
            <p>룬: {result.rune1}</p>
            <p>룬: {result.rune2}</p>
            <p>스펠1: {result.spell1}</p>
            <p>스펠2: {result.spell11}</p>
            <p>스펠1: {result.spell2}</p>
            <p>스펠2: {result.spell22}</p>
            <p>후기: {result.review}</p>
            <p>작성자: {result.name}</p>
        </div>
    )
}
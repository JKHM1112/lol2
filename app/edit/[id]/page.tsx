//app/edit/[id]/page.js 수정 버튼 누르면 나오는 page
import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function Edit(props: any) {
    const db = (await connectDB).db("dream")
    let result = await db.collection('data').findOne({ _id: new ObjectId(props.params.id) })
    return (
        <div>
            <h4>수정</h4>
            <form action="/api/post/edit" method="POST">
                <input className="edit-in" name="line" defaultValue={result.line} placeholder="라인"></input>
                <input className="edit-in" name="cham1" defaultValue={result.cham1} placeholder="챔피언"></input>
                <input className="edit-in" name="cham2" defaultValue={result.cham2} placeholder="챔피언"></input>
                <input className="edit-in" name="cham3" defaultValue={result.cham3} placeholder="챔피언"></input>
                <input className="edit-in" name="cham4" defaultValue={result.cham4} placeholder="챔피언"></input>
                <input className="edit-in" name="before6" defaultValue={result.before6} placeholder="6전"></input>
                <input className="edit-in" name="after6" defaultValue={result.after6} placeholder="6후"></input>
                <input className="edit-in" name="half" defaultValue={result.half} placeholder="후반"></input>
                <input className="edit-in" name="rune1" defaultValue={result.rune1} placeholder="룬"></input>
                <input className="edit-in" name="rune2" defaultValue={result.rune2} placeholder="룬"></input>
                <input className="edit-in" name="spell1" defaultValue={result.spell1} placeholder="스펠1"></input>
                <input className="edit-in" name="spell2" defaultValue={result.spell2} placeholder="스펠2"></input>
                <input className="edit-in" name="spell3" defaultValue={result.spell3} placeholder="스펠1"></input>
                <input className="edit-in" name="spell4" defaultValue={result.spell4} placeholder="스펠2"></input>
                <input className="edit-in" name="firstItem" defaultValue={result.firstItem} placeholder="첫템"></input>
                <input className="edit-in" name="legendaryItem1" defaultValue={result.legendaryItem1} placeholder="전설템1"></input>
                <input className="edit-in" name="legendaryItem2" defaultValue={result.legendaryItem2} placeholder="전설템2"></input>
                <input className="edit-in" name="legendaryItem3" defaultValue={result.legendaryItem3} placeholder="전설템3"></input>
                <input className="edit-in" name="legendaryItem4" defaultValue={result.legendaryItem4} placeholder="전설템4"></input>
                <input className="edit-in" name="legendaryItem5" defaultValue={result.legendaryItem5} placeholder="전설템5"></input>
                <input className="edit-in" name="legendaryItem6" defaultValue={result.legendaryItem6} placeholder="전설템6"></input>
                <input className="edit-in" name="shoesItem" defaultValue={result.shoesItem} placeholder="신발템"></input>
                <input className="edit-in" name="lineResult" defaultValue={result.lineResult} placeholder="라인결과"></input>
                <input className="edit-in" name="gameResult" defaultValue={result.gameResult} placeholder="게임결과"></input>
                <input className="edit-in" name="review" defaultValue={result.review} placeholder="후기"></input>
                <input style={{ display: 'none' }} name="_id" defaultValue={result._id.toString()}></input>
                <button type="submit">수정</button>
            </form>
        </div>
    )
}
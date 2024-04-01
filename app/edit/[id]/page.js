import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function Edit(props) {
    const db = (await connectDB).db("dream")
    let result = await db.collection('data').findOne({ _id: new ObjectId(props.params.id) })
    //result = ObjectId가 _id인 것의 data 컬렉션이 나온다.
    //props.params.id =  _id 도큐먼트가 나온다.
    return (
        <divs>
            <h4>수정</h4>
            <form action="/api/post/edit" method="POST">
                <input className="edit-in" name="line" defaultValue={result.line} placeholder="라인"></input>
                <input className="edit-in" name="cham1" defaultValue={result.cham1} placeholder="챔피언"></input>
                <input className="edit-in" name="cham2" defaultValue={result.cham2} placeholder="챔피언"></input>
                <input className="edit-in" name="before6" defaultValue={result.before6} placeholder="6전"></input>
                <input className="edit-in" name="after6" defaultValue={result.after6} placeholder="6후"></input>
                <input className="edit-in" name="half" defaultValue={result.side} placeholder="후반"></input>
                <input className="edit-in" name="rune1" defaultValue={result.rune1} placeholder="룬"></input>
                <input className="edit-in" name="rune2" defaultValue={result.rune2} placeholder="룬"></input>
                <input className="edit-in" name="spell1" defaultValue={result.spell1} placeholder="스펠1"></input>
                <input className="edit-in" name="spell11" defaultValue={result.spell11} placeholder="스펠2"></input>
                <input className="edit-in" name="spell2" defaultValue={result.spell2} placeholder="스펠1"></input>
                <input className="edit-in" name="spell22" defaultValue={result.spell22} placeholder="스펠2"></input>
                <input className="edit-in" name="review" defaultValue={result.review} placeholder="후기"></input>
                <input style={{display:'none'}} name="_id" defaultValue={result._id.toString()}></input>
                <button type="submit">수정</button>
            </form>
        </divs>
    )
    //_id도 보냈다
}
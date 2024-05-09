import { connectDB } from "@/util/database"
// import EditsItem, { EditItemProps } from "./EditsItem"
import { _id } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";

export default async function Write(props: any) {
    const db = (await connectDB).db('dream')
    let result = await db.collection('data').findOne({ _id: new ObjectId(props.params.id) })
    result = JSON.parse(JSON.stringify(result))
    // let result2 = await db.collection('data').find().toArray()
    return (
        <div>
            {/* <EditsItem result={result} /> */}
        </div>
    )
}
//my-app/app/edit/[id]/page.tsx
import { connectDB } from "@/util/database"
import EditsItem from "./EditsItem"
import { _id } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";

export default async function Edit(props: any) {
    const db = (await connectDB).db('dream')
    let result = await db.collection('data').findOne({ _id: new ObjectId(props.params.id) })
    result = JSON.parse(JSON.stringify(result))
    return (
        <div>
            <EditsItem props={props}/>
        </div>
    )
}
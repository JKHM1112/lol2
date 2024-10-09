//my-app/app/edit/[id]/page.tsx
import { connectDB } from "@/util/database"
import EditsItem from "./EditsItem"
import { _id } from "@next-auth/mongodb-adapter";

export default async function RecordEdit(props: any) {
    const db = (await connectDB).db('dream')

    return (
        <div>
            <EditsItem props={props}/>
        </div>
    )
}
//app/lists/page.js
import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import ListsItem from "./ListsItem"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function List() {
    interface Session {
        user: {
            email: string;
        }
    }
    const db = (await connectDB).db('dream')
    let result = await db.collection('data').find().toArray()
    let session: Session | null = await getServerSession(authOptions)
    let email: string | null | undefined = ''
    if (session) {
        email = session.user.email
    }
    const serializedResult = result.map((item: any) => ({
        ...item,
        _id: item._id.toString(), // ObjectId를 문자열로 변환
    }));
    //result가 dream안 data를 전체다 출력한다.
    return (
        <div>
            <ListsItem result={serializedResult} email={email} />
        </div>
    )
}
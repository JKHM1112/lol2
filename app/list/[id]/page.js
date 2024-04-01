//app/list/[id]/page.js 에 따른 개인 list인데 ListItem.js에서 import한다.
import { connectDB } from "@/util/database"
import ListItem from "./ListItem"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route";


export default async function List() {
    const db = (await connectDB).db('dream')
    let result = await db.collection('data').find().toArray()
    let session = await getServerSession(authOptions)
    let email = ''
    if (session) {
        email = session.user.email
    }
    //result가 dream안 data를 전체다 출력한다.

    return (
        <div>
            <ListItem result={result} email={email} />
        </div>
    )
}

import { connectDB } from "@/util/database"
import ListItem from "./ListItem"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"


export default async function List() {
    const db = (await connectDB).db('dream')
    let result = await db.collection('data').find().toArray()
    let session = await getServerSession(authOptions)
    let email = ''
    if(session){
        email=session.user.email
    }
    //result가 dream안 data를 전체다 출력한다.

    return (
        <div>
            <ListItem result={result} email={email}/>
        </div>
    )
}

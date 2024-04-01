import { connectDB } from "@/util/database"
import ListsItem from "./ListsItem"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function List() {
    const db = (await connectDB).db('dream')
    let result = await db.collection('data').find().toArray()
    // let session = await getServerSession(authOptions)
    let email = ''
    // if(session){
    //     email=session.user.email
    // }
    const serializedResult = result.map(item => ({
        ...item,
        _id: item._id.toString(), // ObjectId를 문자열로 변환
    }));
    //result가 dream안 data를 전체다 출력한다.
    return (
        <div>
            <ListsItem result={serializedResult} email={email}/>
        </div>
    )
}

//app/lists/page.js
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import ListsItem from "@/app/lists/ListsItem";
import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"

export default async function List() {
    interface Session {
        user: {
            email: string;
        }
    }
    const db = (await connectDB).db('dream')
    let result = await db.collection('dataEnteredDirectly').find().sort({ _id: -1 }).toArray()
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
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center w-[1000px] h-[600px] p-4 box-border border-2 m-0">
                <ListsItem result={serializedResult} email={email} />
            </div>
        </div>
    )
    
}
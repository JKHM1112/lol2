//app/lists/page.js
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import ListsCards from "./listsCards"

export default async function Lists() {
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

    result = result.map((item: any) => ({
        ...item,
        _id: item._id.toString(),  // MongoDB ObjectId를 문자열로 변환
    }));

    return (
        <div>
            <ListsCards result={result} email={email} />
        </div>
    )

}
// app/lists/page.js
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import ListItem from "./ListItem";

export default async function List() {
    interface Session {
        user: {
            email: string;
        }
    }
    const db = (await connectDB).db('dream');
    let session: Session | null = await getServerSession(authOptions);
    let email: string | null | undefined = '';
    if (session) {
        email = session.user.email;
    }
    
    let result = [];
    if (email) {
        result = await db.collection('dataEnteredDirectly').find({ "email": email }).sort({ _id: -1 }).toArray();
    }

    const serializedResult = result.map((item: any) => ({
        ...item,
        _id: item._id.toString(), // ObjectId를 문자열로 변환
    }));

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center w-[1000px] h-[600px] p-4 box-border border-2 m-0">
                <ListItem result={serializedResult} email={email} />
            </div>
        </div>
    )
}

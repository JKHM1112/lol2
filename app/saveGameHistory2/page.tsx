import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import SaveGame from "./components/saveGame";
import CheckNickname from "./components/checkNickname";

interface UserSession {
    user: {
        name: string;
        email: string;
    }
}

export default async function SaveGameHistory() {
    let session: UserSession | null = await getServerSession(authOptions);
    const db = (await connectDB).db('dream');
    let user = null;
    let saveNickname = [];
    if (session?.user) {
        user = await db.collection('user_cred').findOne({ email: session.user.email });
        saveNickname = await db.collection('saveGameNickname').find().sort({ _id: -1 }).toArray();
    }

    saveNickname = saveNickname.map((item: any) => ({
        ...item,
        _id: item._id.toString(),  // MongoDB ObjectId를 문자열로 변환
    }));
    if (session)
        return (
            <div>
                <CheckNickname saveNickname={saveNickname} session={session} />
                <SaveGame session={session} />
            </div>
        );
}

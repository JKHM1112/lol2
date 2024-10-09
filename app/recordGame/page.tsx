import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import SaveGame from "./components/saveGame";
import CheckNickname from "./components/checkNickname";
import VersionDelete from "./components/versionDelete";

interface UserSession {
    user: {
        name: string;
        email: string;
    }
}

export default async function RecordGame() {
    let session: UserSession | null = await getServerSession(authOptions);
    const db = (await connectDB).db('dream');
    let user = null;
    if (session?.user) {
        user = await db.collection('user_cred').findOne({ email: session.user.email });
    }

    let saveNickname = await db.collection('saveGameNickname').find().sort({ _id: -1 }).toArray();
    let versusCollection = await db.collection('versusData').find().toArray();

    saveNickname = saveNickname.map((item: any) => ({
        ...item,
        _id: item._id.toString(),  // MongoDB ObjectId를 문자열로 변환
    }));

    versusCollection = versusCollection.map((item: any) => ({
        ...item,
        _id: item._id.toString(),  // MongoDB ObjectId를 문자열로 변환
    }));

    return (
        <div className="flex justify-center min-w-[1200px] ">
            <div className="min-w-[1000px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">
                <div className="flex flex-row justify-center gap-8">
                    {session?.user.email != null ? (
                        <>
                            <CheckNickname saveNickname={saveNickname} session={session} />
                            <SaveGame session={session} />
                        </>
                    ) : (
                        <></>
                    )}

                </div>
                <div className="mt-4 flex justify-center">
                    {session?.user.email == "admin" ? (
                        <VersionDelete versusCollection={versusCollection} />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

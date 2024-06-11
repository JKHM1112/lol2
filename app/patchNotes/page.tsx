import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import DeleteButton from "./components/deleteButton";

interface PatchNote {
    _id: string;
    title: string;
    date: string;
}

interface UserSession {
    user: {
        name: string;
        email: string;
    }
}

export default async function PatchNotes() {
    const db = (await connectDB).db('dream');

    let patchNotes = await db.collection('patchNotes').find().sort({ _id: -1 }).toArray();
    let session: UserSession | null = await getServerSession(authOptions);
    let result = null;
    if (session?.user) {
        result = await db.collection('user_cred').findOne({ email: session.user.email });
    }

    return (
        <div className="flex justify-center items-center min-h-[300px]">
            <div className="container mx-auto p-4 w-[500px]">
                <div className="flex justify-between items-center mb-4 w-[500px]">
                    <h1 className="text-2xl font-bold">Patch Notes</h1>
                    {result && result.name === 'admin' && (
                        <Link href="/patchNotes/new">
                            <div className="bg-blue-500 text-white px-4 py-2 rounded">
                                작성하기
                            </div>
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {patchNotes.map((note: PatchNote) => (
                        <div key={note._id} className="border p-4 rounded flex items-center w-[500px]">
                            <div className="flex-grow">
                                <Link href={`/patchNotes/${note.title}`}>
                                    <div className="text-xl font-semibold">패치노트 {note.title}</div>
                                </Link>
                                <div className="text-gray-500">날짜: {note.date}</div>
                            </div>
                            <DeleteButton result={result} note={note} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

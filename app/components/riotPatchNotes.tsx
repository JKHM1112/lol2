import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserSession {
    user: {
        name: string;
        email: string;
    };
}

interface PatchNote {
    url: string;
    date: string;
    title: string;
}

export default async function RiotPatchNotes() {
    const db = (await connectDB).db('dream');
    const patchNoteUrl = await db.collection('riotPatchNotes').find().sort({ _id: -1 }).toArray();
    let session: UserSession | null = await getServerSession(authOptions);
    let result = null;
    if (session?.user) {
        result = await db
            .collection("user_cred")
            .findOne({ email: session.user.email });
    }

    const calculateDaysAgo = (dateString: string) => {
        const today = new Date(); // 오늘 날짜
        const noteDate = new Date(dateString); // 입력된 날짜

        // 날짜 차이를 밀리초로 계산
        const differenceInTime = today.getTime() - noteDate.getTime();

        // 밀리초를 일수로 변환
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays;
    };

    return (
        <div>
            <div className="flex justify-between items-center p-1 mb-2 mt-10">
                <h2 className="text-xl font-bold text-green-500">RIOT 공지사항</h2>
                <Link href="https://www.leagueoflegends.com/ko-kr/news/tags/patch-notes/">
                    <span className="text-sm text-blue-500 hover:underline">더보기</span>
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md w-[400px] p-4">
                <ul className="space-y-2">
                    {patchNoteUrl.slice(0, 3).map((note: PatchNote, index: number) => (
                        <li key={index} className="flex justify-between items-center py-2 border-b last:border-none">
                            <Link href={note.url}>
                                <span className="text-black-600 hover:underline">{note.title}</span>
                            </Link>
                            <span className="text-sm text-gray-500">{calculateDaysAgo(note.date)}일 전</span>
                        </li>
                    ))}
                </ul>
                {result && result.name === 'admin' && (
                    <div className="mt-4">
                        <form action="/api/post/riotPatchNotes" method="POST">
                            <Input name="url" placeholder="패치 노트 URL" className="mb-2" />
                            <Input name="urlDate" placeholder="날짜 (YYYY-MM-DD)" className="mb-2" />
                            <Input name="title" placeholder="패치 노트 제목" className="mb-2" />
                            <Button type="submit" className="bg-blue-500 text-white">
                                패치 노트 추가하기
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
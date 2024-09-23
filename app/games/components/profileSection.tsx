import Image from "next/image";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SummonerTitleBar from "./summonerTitleBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserSession {
    user: {
        name: string;
        email: string;
    };
}

export default async function ProfileSection({ fullSummonerName, summonerData }: any) {

    const [gameName, tagLines] = fullSummonerName.split("-");
    const tagLine = tagLines || "KR1";
    const decodedGameName = decodeURIComponent(gameName);
    const decodedTagLine = decodeURIComponent(tagLine);
    const gameNameTagLine = `${decodedGameName}#${decodedTagLine}`;

    const db = (await connectDB).db("dream");
    let session: UserSession | null = await getServerSession(authOptions);
    let favorites: string[] = [];

    if (session?.user) {
        const result = await db.collection("user_cred").findOne({ email: session.user.email });
        favorites = result?.favorites || [];
    }

    return (
        <div className="bg-gray-100">
            {/* 프로필 아이콘 및 닉네임 구역 */}
            <div className="flex justify-center items-center p-2">
                <div className="w-[1000px] flex items-center p-4 border rounded-lg bg-white">
                    <div className="relative w-1/5 flex flex-col items-center">
                        <Image className="rounded-md" alt='profileIconId' src={`/profileicon/${summonerData.profileIconId}.png`} width={80} height={80} />
                        <div className="absolute bottom-0 transform translate-y-1/2 bg-black text-white px-2 py-1 rounded-md text-sm">
                            {summonerData.summonerLevel}
                        </div>
                    </div>
                    <div className="w-4/5 flex flex-col pl-6">
                        <SummonerTitleBar gameNameTagLine={gameNameTagLine} favorites={favorites} email={session?.user.email} />
                    </div>
                </div>
            </div>

            {/* 종합/인게임 버튼 구역 */}
            <div className="flex justify-center items-center p-4">
                <div className="w-[1000px] flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white shadow-lg">
                    <Link href={`/games/${decodedGameName}-${decodedTagLine}`}>
                        <Button className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
                            종합
                        </Button>
                    </Link>

                    <Link href={`/games/${decodedGameName}-${decodedTagLine}/progressGame`}>
                        <Button className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out">
                            인게임
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
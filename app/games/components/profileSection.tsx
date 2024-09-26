import Image from "next/image";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SummonerTitleBar from "./summonerTitleBar";
import Link from "next/link";

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
        <div>
            {/* 프로필 아이콘 및 닉네임 구역 */}
            <div className="flex justify-center">
                <div className="flex flex-row w-[1000px] h-[120px] bg-white rounded-md border m-4">
                    <div className="w-[200px] flex flex-col items-center">
                        <Image className="rounded-md translate-y-3" alt='profileIconId' src={`/profileicon/${summonerData.profileIconId}.png`} width={80} height={80} />
                        <div className="bg-black -translate-y-1 text-white rounded-md py-1 px-2">
                            {summonerData.summonerLevel}
                        </div>
                    </div>
                    <div className="w-[800px]">
                        <SummonerTitleBar gameNameTagLine={gameNameTagLine} favorites={favorites} email={session?.user.email} />
                    </div>
                </div>
            </div>

            {/* 종합/인게임 버튼 구역 */}
            <div className="flex justify-center">
                <div className="w-[1000px] bg-white flex justify-between rounded-md border p-4">
                    <Link href={`/games/${decodedGameName}-${decodedTagLine}`}>
                        <button className="bg-blue-500 text-white rounded-full px-8 py-2 hover:bg-blue-600 transition-all duration-300 ease-in-out">
                            종합
                        </button>
                    </Link>

                    <Link href={`/games/${decodedGameName}-${decodedTagLine}/progressGame`}>
                        <button className="bg-green-500 text-white rounded-full px-6 py-2 hover:bg-green-600 transition-all duration-300 ease-in-out">
                            인게임
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
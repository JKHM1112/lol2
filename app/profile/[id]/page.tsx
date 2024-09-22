import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import EditProfile from "./editProfile";

interface UserSession {
    user: {
        name: string;
        email: string;
    };
}

export default async function Profile({ params }: { params: { id: string } }) {
    const db = (await connectDB).db("dream");
    let session: UserSession | null = await getServerSession(authOptions);

    // 세션 정보가 없으면 리다이렉트 처리 (예시로 "/"로 이동)
    if (!session) {
        return (
            <div>
                <h1>로그인이 필요합니다.</h1>
            </div>
        );
    }

    // 사용자의 고유 ID를 이용해 데이터베이스에서 사용자 정보 가져오기
    let result = await db.collection("user_cred").findOne({ _id: new ObjectId(params.id) });
    // 프로필 페이지에 표시할 데이터
    if (!result) {
        return (
            <div>
                <h1>사용자 정보를 찾을 수 없습니다.</h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 p-6">
            <EditProfile profileInformation={result} />
        </div>
    );
}

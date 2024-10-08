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

    // 세션 정보가 없으면 리다이렉트 처리
    if (!session) {
        return (
            <div>
                <h1>로그인이 필요합니다.</h1>
            </div>
        );
    }

    // 사용자 정보 조회
    let result = await db.collection("user_cred").findOne({ _id: new ObjectId(params.id) });

    if (!result) {
        return (
            <div>
                <h1>사용자 정보를 찾을 수 없습니다.</h1>
            </div>
        );
    }

    return (
        <div className="flex justify-center min-w-[1200px]">
            <div className="min-w-[800px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">
                <h2 className="text-2xl font-semibold mb-6 text-center">{result.name}님의 프로필</h2>
                <div className="flex flex-row">
                    <div className="w-1/3">
                        <h3 className="font-semibold text-lg">내 정보</h3>
                        <div className="flex">
                            <span className="font-medium">이름: </span>
                            <span>{result.name}</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium">이메일: </span>
                            <span>{result.email}</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium">생일: </span>
                            <span>{result.birthday}</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium">성별: </span>
                            <span>{result.gender}</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium">가입일: </span>
                            <span>{new Date(result.signupDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex">
                            <h3 className="font-medium">주소: </h3>
                            <p>{result.address || "등록된 주소 없음"}</p>
                        </div>
                    </div>

                    <div className="w-1/3">
                        <h3 className="font-semibold text-lg">즐겨찾기 목록</h3>
                        {result.favorites.length > 0 ? (
                            result.favorites.map((favorite: string, index: number) => (
                                <div key={index}>{favorite}</div>
                            ))
                        ) : (
                            <div>즐겨찾기 없음</div>
                        )}
                    </div>

                    <div className="w-1/3">
                        <h3 className="font-semibold text-lg">최근 검색 기록</h3>
                        {result.recently.length > 0 ? (
                            result.recently.map((recent: string, index: number) => (
                                <div key={index}>{recent}</div>
                            ))
                        ) : (
                            <div>최근 검색 기록 없음</div>
                        )}
                    </div>
                </div>

                {/* 프로필 수정 버튼 */}
                <div className="mt-4 text-center">
                    <EditProfile profileInformation={result} />
                </div>
            </div>
        </div>
    );
}

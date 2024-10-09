import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import ListsCards from "./listsCards";

export default async function Lists() {
    interface Session {
        user: {
            email: string;
        }
    }

    const db = (await connectDB).db('dream');

    try {
        // 병렬로 데이터 가져오기
        const [dataEnteredDirectly, riotPatchNotes, versusCollection] = await Promise.all([
            db.collection('dataEnteredDirectly').find().sort({ _id: -1 }).toArray(),
            db.collection('riotPatchNotes').find().sort({ _id: -1 }).toArray(),
            db.collection('versusData').find().sort({ _id: -1 }).toArray(),
        ]);

        let session: Session | null = await getServerSession(authOptions);

        let email: string | null | undefined = '';
        if (session) {
            email = session.user.email;
        }

        // ObjectId를 문자열로 변환
        const dataEnteredDirectlyMapped = dataEnteredDirectly.map((item: any) => ({
            ...item,
            _id: item._id.toString(),
        }));

        const riotPatchNotesMapped = riotPatchNotes.map((item: any) => ({
            ...item,
            _id: item._id.toString(),
        }));

        const versusCollectionMapped = versusCollection.map((item: any) => ({
            ...item,
            _id: item._id.toString(),
        }));

        return (
            <div>
                <ListsCards
                    dataEnteredDirectly={dataEnteredDirectlyMapped}
                    email={email}
                    riotPatchNotes={riotPatchNotesMapped}
                    versusCollection={versusCollectionMapped}
                />
            </div>
        );
    } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }
}

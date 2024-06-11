import { connectDB } from "@/util/database";

interface changeInterface {
    key: string
    value: string
    index: number
}

export default async function PatchNoteDetailPage({ params }: { params: { title: string } }) {
    const db = (await connectDB).db("dream");
    let result = await db.collection('patchNotes').findOne({ title: params.title });

    if (!result) {
        return <div>패치 노트를 찾을 수 없습니다.</div>;
    }

    const { title, date, generalChanges, championChanges, itemChanges } = result;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">패치노트 {title}</h1>
            <p className="text-gray-500 mb-4">작성일: {date}</p>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">일반 변경사항</h2>
                <ul className="list-disc pl-5">
                    {generalChanges.map((change: changeInterface, index: number) => (
                        <li key={index}>
                            <strong>{change.key}:</strong> {change.value}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">챔피언 변경사항</h2>
                <ul className="list-disc pl-5">
                    {championChanges.map((change: changeInterface, index: number) => (
                        <li key={index}>
                            <strong>{change.key}:</strong> {change.value}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">아이템 변경사항</h2>
                <ul className="list-disc pl-5">
                    {itemChanges.map((change: changeInterface, index: number) => (
                        <li key={index}>
                            <strong>{change.key}:</strong> {change.value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

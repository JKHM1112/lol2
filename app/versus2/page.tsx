import { connectDB } from "@/util/database";
import SelectedChampions from "./selectedChampions";

export default async function versus2() {
    const db = (await connectDB).db('dream');
    let versusCollection = await db.collection('versusData').find().toArray();


    versusCollection = versusCollection.map((item: any) => ({
        ...item,
        _id: item._id.toString(),  // MongoDB ObjectId를 문자열로 변환
    }));


    return (
        <div className="flex justify-center min-w-[1200px] ">
            <div className="min-w-[1000px] min-h-[600px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">

                <SelectedChampions versusCollection={versusCollection} />
            </div>
        </div>
    )
}
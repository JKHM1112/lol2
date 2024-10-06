import { connectDB } from "@/util/database";
import SelectedChampions from "./components/selectedChampions";

export default async function versus2() {
    const db = (await connectDB).db('dream');
    let versusCollection = await db.collection('versusData').find().toArray();


    versusCollection = versusCollection.map((item: any) => ({
        ...item,
        _id: item._id.toString(),  // MongoDB ObjectId를 문자열로 변환
    }));


    return (
        <div>
            <SelectedChampions versusCollection={versusCollection} />
        </div>
    )
}
import { connectDB } from "@/util/database";
import SelectedChampions from "./components/selectedChampions";

export default async function Versus() {
    const db = (await connectDB).db('dream');

    let topData = await db.collection('matchDataTOP').find().toArray()
    let jungleData = await db.collection('matchDataJUNGLE').find().toArray()
    let middleData = await db.collection('matchDataMIDDLE').find().toArray()
    let bottomData = await db.collection('matchDataBOTTOM').find().toArray()
    let utilityData = await db.collection('matchDataUTILITY').find().toArray()
    return (
        <div className="flex justify-center min-w-[1200px] ">
            <div className="min-w-[1000px] min-h-[600px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">
                <SelectedChampions topMatches={JSON.stringify(topData)}
                    jungleMatches={JSON.stringify(jungleData)}
                    middleMatches={JSON.stringify(middleData)}
                    bottomMatches={JSON.stringify(bottomData)}
                    utilityMatches={JSON.stringify(utilityData)} />
            </div>
        </div >
    );
}

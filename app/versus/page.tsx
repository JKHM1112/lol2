import { connectDB } from "@/util/database"
import SelectedChampions from "./components/selectedChampions";

export default async function Versus() {
    const db = (await connectDB).db('dream');

    let topData = await db.collection('matchDataTOP').find().sort({ _id: -1 }).toArray()
    let jungleData = await db.collection('matchDataJUNGLE').find().sort({ _id: -1 }).toArray()
    let middleData = await db.collection('matchDataMIDDLE').find().sort({ _id: -1 }).toArray()
    let bottomData = await db.collection('matchDataBOTTOM').find().sort({ _id: -1 }).toArray()
    let utilityData = await db.collection('matchDataUTILITY').find().sort({ _id: -1 }).toArray()
    
    return (
        <div>
            <SelectedChampions topMatches={JSON.stringify(topData)}
                jungleMatches={JSON.stringify(jungleData)}
                middleMatches={JSON.stringify(middleData)}
                bottomMatches={JSON.stringify(bottomData)}
                utilityMatches={JSON.stringify(utilityData)} />
        </div>
    )
}
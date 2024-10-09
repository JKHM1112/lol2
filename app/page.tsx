import Games from "./games/page";
import RiotPatchNotes from "./components/riotPatchNotes";
import { connectDB } from "@/util/database";
import PopularSearches from "./components/popularSearches";

export default async function Home() {

  const db = (await connectDB).db('dream')

  let versusCollection = await db.collection('versusData').find().sort({ _id: -1 }).toArray()
  versusCollection = versusCollection.map((item: any) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return (
    <div className="flex min-w-[1200px] min-h-[800px] bg-gray-100">
      <div className="w-1/3">
      </div>
      <div className="w-1/3">
        <div className="h-[150px]">
          <div className=" searchLogo flex items-center justify-center pt-8">
            <span className="lolL">LOL</span>
            <span className="recordL">RECORD</span>
          </div>
        </div>
        <div className="h-[100px]">
          <Games />
        </div>
        <div className="h-[200px]">
          <RiotPatchNotes />
        </div>
      </div>
      <div className="w-1/3">
        <div className="h-[150px]">
        </div>
        <div className="h-[150px]">
          <PopularSearches versusCollection={versusCollection} />
        </div>
      </div>
    </div>
  );
}

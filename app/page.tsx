import { connectDB } from "@/util/database"
import CharCarousel from "./components/charCarousel"
import Games from "./games/page"

interface dataInterface {
  chams: string[]
  date: string
  _id: string
}

export default async function Home() {
  const db = (await connectDB).db("dream")

  const today = new Date()
  const fourteenDaysAgo = new Date()
  fourteenDaysAgo.setDate(today.getDate() - 14)
  const fourteenDaysAgoString = fourteenDaysAgo.toISOString().split('T')[0]

  let data1: dataInterface[] = await db.collection('dataEnteredDirectly').find().sort({ _id: -1 }).toArray()
  let data2 = await db.collection('patchNotes').findOne({}, { sort: { _id: -1 } });
  let data3 = await db.collection('patchNotes').find({}, { sort: { _id: -1 } }).skip(1).limit(1).toArray();
  
  if (data2) {
    data2._id = data2._id.toString();
  }
  
  if (data3.length > 0) {
    data3[0]._id = data3[0]._id.toString();
  }

  let recentData = []
  for (let item of data1) {
    if (item.date >= fourteenDaysAgoString) {
      recentData.push({
        ...item,
        _id: item._id.toString()
      })
    } else {
      break
    }
  }

  return (
    <div>
      <div>
        <Games />
      </div>
      <div>
        <CharCarousel recentData={recentData} data2={data2} data3={data3[0]} />
      </div>
    </div>
  )
}

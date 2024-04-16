import { connectDB } from "@/util/database"
import Games from "./games/page"

export default async function Home() {
  const db = (await connectDB).db("dream")
  let result = await db.collection('data').find().toArray()

  return (
    <div>
      <Games/>
    </div>
  )
}

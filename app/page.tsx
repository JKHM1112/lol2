import { connectDB } from "@/util/database"

export default async function Home() {
  const db = (await connectDB).db("dream")
  let result = await db.collection('data').find().toArray()

  return (
    <div>
      <h4>로그인</h4>
    </div>
  )
}

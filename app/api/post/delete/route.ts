//api/post/delete.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (request.method == 'POST') {
    const data = await request.json()
    //data에 내가 request한게 json방식으로 들어있음
    let session = await getServerSession(authOptions)
    const db = (await connectDB).db('dream')
    console.log(data.email)//jk007125@naver.com
    console.log(session?.user?.email)//jk007125@naver.com
    if (data.email == session?.user?.email) {
      await db.collection('data').deleteOne({ "_id": new ObjectId(data._id) })
    }
    return NextResponse.json(request.body)
  }
}
//api/post/delete.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request, response: Response) {
  if (request.method == 'POST') {
    const data = await request.json()
    //data에 내가 request한게 json방식으로 들어있음
    console.log(data)//{ author: 'jk007125@naver.com' }
    console.log(data.author)//jk007125@naver.com
    let session = await getServerSession(authOptions)
    console.log(session?.user?.email)//jk007125@naver.com
    const db = (await connectDB).db('dream')
    const documentId = new ObjectId(data._id)

    if (data.author == session?.user?.email) {
      await db.collection('data').deleteOne({ "_id": new ObjectId(data._id) })
    }
    return NextResponse.json(request.body)
  }
}
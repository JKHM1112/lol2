//my-app/app/api/post/delete/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (request.method == 'POST') {
    const data = await request.json()
    let session = await getServerSession(authOptions)
    const db = (await connectDB).db('dream')
    if (data.email == session?.user?.email) {
      await db.collection('dataEnteredDirectly').deleteOne({ "_id": new ObjectId(data._id) })
    }
    return NextResponse.json(request.body)
  }
} 
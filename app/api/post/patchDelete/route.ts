//my-app/app/api/post/delete/route.ts

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    if (request.method == 'POST') {
        const data = await request.json()
        const db = (await connectDB).db('dream')
        await db.collection('patchNotes').deleteOne({ "_id": new ObjectId(data._id) })
        return NextResponse.json(request.body)
    }
} 
//signin.ts
import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(요청: NextApiRequest, 응답: NextApiResponse) {
    if (요청.method == 'POST') {
        let hash = await bcrypt.hash(요청.body.password, 10)
        요청.body.password = hash
        let db = (await connectDB).db('dream');
        await db.collection('user_cred').insertOne(요청.body);
        응답.status(200).redirect('/')
    }
}
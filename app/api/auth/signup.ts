//signup.ts 이건 회원가입 action에 필요하다.
import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        // let hash = await bcrypt.hash(req.body.password, 10)
        // req.body.password = hash
        // console.log(hash)
        console.log(req.body)
        let db = (await connectDB).db('dream');
        await db.collection('user_cred').insertOne(req.body);
        res.status(200).json('가입성공')
    }
}
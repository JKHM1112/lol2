import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
interface UserSession {
    user: {
        email: string;
        name: string;
    }
}
export default async function handler(요청: NextApiRequest, 응답: NextApiResponse) {
    let session: UserSession | null = await getServerSession(요청, 응답, authOptions)
    if (session) {
        요청.body.author = session.user.email
        요청.body.name = session.user.name
    }

    //요청.body는 내가 입력한 값이 도규먼트랑 같을 요청받는다.
    if (요청.method == 'POST') {
        const db = (await connectDB).db('dream')
        let result = await db.collection('data').insertOne(요청.body)
        //result = data 컬렉션에 하나의 도큐먼트 요청.body에서 받아서 넣는다.
        return 응답.status(200).redirect('/')
    }
}
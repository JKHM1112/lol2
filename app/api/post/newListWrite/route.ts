import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
interface UserSession {
    user: {
        email: string;
        name: string;
    }
}
export async function POST(request: Request) {
    const formData = await request.formData()
    console.log(formData)
    return Response.json('1111111')
    // let session: UserSession | null = await getServerSession(request, response, authOptions)
    // if (session) {
    //     request.body.author = session.user.email
    //     request.body.name = session.user.name
    // }

    // //요청.body는 내가 입력한 값이 도규먼트랑 같을 요청받는다.
    // if (request.method == 'POST') {
    //     const db = (await connectDB).db('dream')
    //     let result = await db.collection('data').insertOne(request.body)
    //     //result = data 컬렉션에 하나의 도큐먼트 요청.body에서 받아서 넣는다.
    //     return response.status(200).redirect('/')
    // }
}
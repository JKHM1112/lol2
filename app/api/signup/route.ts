//api/signup/route.ts
import { connectDB } from "@/util/database"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';
export async function POST(request: Request, response: Response) {
    if (request.method == 'POST') {

        const formData = await request.formData();
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')

        if (password) {
            let hash = await bcrypt.hash(password.toString(), 10)
            let db = (await connectDB).db('dream')
            await db.collection('user_cred').insertOne({ name, email, password: hash })
        }
        return NextResponse.json(request.body)

    }
}
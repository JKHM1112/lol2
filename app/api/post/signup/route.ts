//api/signup/route.ts
import { connectDB } from "@/util/database"
import { NextRequest } from "next/server"
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    if (request.method == 'POST') {
        const db = (await connectDB).db('dream')
        const formData = await request.formData();
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        console.log(name)
        console.log(email)
        const DBName = await db.collection('user_cred').findOne({ name: name })
        const DBEmail = await db.collection('user_cred').findOne({ email: email })
        console.log(DBName)
        console.log(DBEmail)
        if ((DBName && DBName.name === name) || (DBEmail && DBEmail.email === email)) {
            console.log("회원가입 중복 문제");
            return Response.redirect(new URL('/', request.nextUrl.origin));
        }

        if (password) {
            const hash = await bcrypt.hash(password.toString(), 10)
            await db.collection('user_cred').insertOne({ name, email, password: hash })
        }

        return Response.redirect(new URL('/', request.nextUrl.origin))
    }
}
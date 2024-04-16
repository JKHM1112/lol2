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
        const DBName = await db.collection('user_cred').findOne({ name: name })
        const DBEmail = await db.collection('user_cred').findOne({ email: email })
        if (DBName.name == name||DBEmail.email == email) {
            return Response.redirect(new URL('/', request.nextUrl.origin))
        }
        if (password) {
            let hash = await bcrypt.hash(password.toString(), 10)
            let db = (await connectDB).db('dream')
            await db.collection('user_cred').insertOne({ name, email, password: hash })
        }
        return Response.redirect(new URL('/', request.nextUrl.origin))

    }
}
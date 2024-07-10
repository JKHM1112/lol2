import { connectDB } from "@/util/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  if (request.method === 'POST') {
    const db = (await connectDB).db('dream');
    const { nickname, email, password } = await request.json();

    const existingUserByNickname = await db.collection('user_cred').findOne({ nickname });
    const existingUserByEmail = await db.collection('user_cred').findOne({ email });

    if (existingUserByNickname || existingUserByEmail) {
      return NextResponse.json({ message: '닉네임 또는 이메일이 이미 사용 중입니다.' }, { status: 409 });
    }

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      await db.collection('user_cred').insertOne({ nickname, email, password: hash });
    }

    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
}

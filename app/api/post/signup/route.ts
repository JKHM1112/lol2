import { connectDB } from "@/util/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const db = (await connectDB).db('dream');
  const { nickname, email, password, gender, address, birthday } = await request.json();

  // 닉네임과 이메일 중복 체크
  const existingUserByNickname = await db.collection('user_cred').findOne({ nickname });
  const existingUserByEmail = await db.collection('user_cred').findOne({ email });

  if (existingUserByNickname) {
    return NextResponse.json({ message: '닉네임이 이미 사용 중입니다.' }, { status: 409 });
  }

  if (existingUserByEmail) {
    return NextResponse.json({ message: '이메일이 이미 사용 중입니다.' }, { status: 409 });
  }

  // 비밀번호 해싱 후 저장
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    await db.collection('user_cred').insertOne({
      nickname,
      email,
      password: hash,
      gender,
      address,
      birthday, // 생년월일 저장
      signupDate: new Date().toISOString(), // 가입 날짜
    });
  }

  // 회원가입 성공 시 리다이렉트
  return NextResponse.redirect(new URL('/', request.nextUrl.origin));
}

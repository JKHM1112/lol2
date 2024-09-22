import { connectDB } from "@/util/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  const db = (await connectDB).db('dream');
  const { _id, currentPassword, newPassword } = await request.json();

  const user = await db.collection('user_cred').findOne({ _id: new ObjectId(_id) });

  if (!user) {
    return NextResponse.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 });
  }

  // 현재 비밀번호 확인
  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ message: '현재 비밀번호가 일치하지 않습니다.' }, { status: 401 });
  }

  // 새 비밀번호 해싱 후 저장
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.collection('user_cred').updateOne(
    { _id: new ObjectId(_id) },
    { $set: { password: hashedPassword } }
  );

  return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
}

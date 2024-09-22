import { connectDB } from "@/util/database";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  const db = (await connectDB).db('dream');
  const { _id, name, address, birthday, gender } = await request.json();

  const updates = { name, address, birthday, gender };

  // 사용자 정보 업데이트 (비밀번호 없이)
  await db.collection('user_cred').updateOne(
    { _id: new ObjectId(_id) },
    { $set: updates }
  );

  return NextResponse.json({ message: '프로필이 성공적으로 업데이트되었습니다.' });
}

import { connectDB } from "@/util/database";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    // 폼에서 전송된 데이터 수신
    const formData = await request.formData();
    const url = formData.get('url') as string;
    const urlDate = formData.get('urlDate') as string;
    const title = formData.get('title') as string;

    if (!url || !urlDate || !title) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    }

    const db = (await connectDB).db('dream');

    // riotPatchNotes 컬렉션에 데이터 추가
    await db.collection('riotPatchNotes').insertOne({
        url,
        date: urlDate,
        title,
    });

    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
}

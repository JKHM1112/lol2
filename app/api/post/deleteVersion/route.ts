import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/util/database";

export async function POST(request: NextRequest) {

    const data = await request.json();
    try {
        const db = (await connectDB).db('dream');
        const versusCollection = db.collection('versusData');

        // 모든 문서에서 해당 패치 버전 삭제
        await versusCollection.updateMany(
            {},
            { $unset: { [data.version]: "" } }
        );

        return NextResponse.json({ message: '매치 데이터가 성공적으로 저장되었습니다.' }, { status: 200 });
    } catch (error) {
        console.error(`Error fetching or saving match data . Error:`, error);
        return NextResponse.json({ error: '매치 데이터를 가져오거나 저장하는 데 실패했습니다.' }, { status: 500 });
    }
}

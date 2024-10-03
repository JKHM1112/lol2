import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { connectDB } from "@/util/database";
import { z } from "zod";
import { getAccount, getSummonerData, getLeagueData } from "@/app/riotApi";

const schema = z.object({
    email: z.string(),
    nickname: z.string(),
    tag: z.string(),
});

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { email, nickname, tag } = schema.parse(await request.json());
        const db = (await connectDB).db('dream');

        const account = await getAccount(nickname, tag);
        const puuid = account.puuid;

        const existingEntry = await db.collection('saveGameNickname').findOne({ nickname, tag });

        if (existingEntry) {
            return NextResponse.json({ error: "이미 등록되어 있습니다." }, { status: 409 });
        }
        const summonerData = await getSummonerData(puuid)
        const summonerDataId = summonerData.id;
        const summonerLeaueDataResult = await getLeagueData(summonerDataId);
        let tier = null;
        if (summonerLeaueDataResult && summonerLeaueDataResult.length > 0) {
            const soloQueueData = summonerLeaueDataResult.find((data: any) => data.queueType === "RANKED_SOLO_5x5");
            if (soloQueueData) {
                tier = soloQueueData.tier;
            }
        }

        await db.collection('saveGameNickname').insertOne({
            email,
            nickname,
            tag,
            puuid,
            tier
        });

        return NextResponse.json({ message: "성공적으로 등록되었습니다." }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

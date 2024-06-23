//my-app/app/api/post/newListWrite/route.ts

import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextRequest } from "next/server";

const schema = zfd.formData({
    puuid: zfd.text(z.string().optional()),
    tier: zfd.text(z.string().optional()),
    line: zfd.text(z.string().optional()),
    chams: zfd.text(z.string().optional()),
    runes: zfd.text(z.string().optional()),
    summoners: zfd.text(z.string().optional()),
    items: zfd.text(z.string().optional()),
    timeLineLevel1: zfd.text(z.string().optional()),
    timeLineLevel2: zfd.text(z.string().optional()),
    gameExtracted1: zfd.text(z.string().optional()),
    gameExtracted2: zfd.text(z.string().optional()),
    timeLineKda1: zfd.text(z.string().optional()),
    timeLineKda2: zfd.text(z.string().optional()),
    timeLineObject1: zfd.text(z.string().optional()),
    timeLineObject2: zfd.text(z.string().optional()),
    turretPlatesTaken: zfd.text(z.string().optional()),
    visionScore: zfd.text(z.string().optional()),
    skillOrder: zfd.text(z.string().optional()),
    before6: zfd.numeric(z.number().min(1).max(5).optional()),
    after6: zfd.numeric(z.number().min(1).max(5).optional()),
    half: zfd.numeric(z.number().min(1).max(5).optional()),
    lineResult: zfd.text(z.string().optional()),
    gameResult: zfd.text(z.string().optional()),
    review: zfd.text(z.string().optional()),
    date: zfd.text(z.string().optional()),
});

export async function POST(request: NextRequest) {
    let session = await getServerSession(authOptions)
    if (!session) {
        return Response.redirect(new URL('/register', request.nextUrl.origin))
    }
    const formData = await request.formData()
    const parsedData = schema.parse(formData);
    const chamsArray = JSON.parse(parsedData.chams || '[]');
    const runesArray = JSON.parse(parsedData.runes || '[]');
    const summonersArray = JSON.parse(parsedData.summoners || '[]');
    const itemsArray = JSON.parse(parsedData.items || '[]');
    const timeLineLevel1Array = JSON.parse(parsedData.timeLineLevel1 || '[]');
    const timeLineLevel2Array = JSON.parse(parsedData.timeLineLevel2 || '[]');
    const gameExtracted1Array = JSON.parse(parsedData.gameExtracted1 || '[]');
    const gameExtracted2Array = JSON.parse(parsedData.gameExtracted2 || '[]');
    const timeLineKda1Array = JSON.parse(parsedData.timeLineKda1 || '[]');
    const timeLineKda2Array = JSON.parse(parsedData.timeLineKda2 || '[]');
    const timeLineObject1Array = JSON.parse(parsedData.timeLineObject1 || '[]');
    const timeLineObject2Array = JSON.parse(parsedData.timeLineObject2 || '[]');
    const turretPlatesTakenArray = JSON.parse(parsedData.turretPlatesTaken || '[]');
    const visionScoreArray = JSON.parse(parsedData.visionScore || '[]');
    const skillOrderArray = JSON.parse(parsedData.skillOrder || '[]');

    const data = {
        ...parsedData,
        chams: chamsArray,
        runes: runesArray,
        summoners: summonersArray,
        items: itemsArray,
        timeLineLevel1: timeLineLevel1Array,
        timeLineLevel2: timeLineLevel2Array,
        gameExtracted1: gameExtracted1Array,
        gameExtracted2: gameExtracted2Array,
        timeLineKda1: timeLineKda1Array,
        timeLineKda2: timeLineKda2Array,
        timeLineObject1: timeLineObject1Array,
        timeLineObject2: timeLineObject2Array,
        turretPlatesTaken: turretPlatesTakenArray,
        visionScore: visionScoreArray,
        skillOrder: skillOrderArray,
        email: session?.user?.email,
    };
    
    const db = (await connectDB).db('dream')
    await db.collection('dataEnteredDirectly').insertOne(data)

    return Response.redirect(new URL('/lists', request.nextUrl.origin))
}
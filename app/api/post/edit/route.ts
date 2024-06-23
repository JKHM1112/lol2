//my-app/app/api/post/edit/route.ts

import { connectDB } from "@/util/database"
import { NextRequest } from "next/server"
import { zfd } from "zod-form-data"
import { z } from "zod"
import { _id } from "@next-auth/mongodb-adapter"
import { ObjectId } from "mongodb"
const schema_id = zfd.formData({
    _id: zfd.text(),
})

const schema = zfd.formData({
    line: zfd.text(z.string().optional()),
    chams: zfd.text(z.string().optional()), // 챔피언 배열을 JSON 문자열로 받음
    before6: zfd.numeric(z.number().min(1).max(5).optional()),
    after6: zfd.numeric(z.number().min(1).max(5).optional()),
    side1: zfd.numeric(z.number().min(1).max(5).optional()),
    teamFight1: zfd.numeric(z.number().min(1).max(5).optional()),
    runes: zfd.text(z.string().optional()), // 룬 배열을 JSON 문자열로 받음
    summoners: zfd.text(z.string().optional()), // 스펠 배열을 JSON 문자열로 받음
    items: zfd.text(z.string().optional()), // 아이템 배열을 JSON 문자열로 받음
    lineResult: zfd.text(z.string().optional()),
    gameResult: zfd.text(z.string().optional()),
    review: zfd.text(z.string().optional()),
    date: zfd.text(z.string().optional()),
});

export async function POST(request: NextRequest) {
    const formData = await request.formData()

    const parsedData = schema.parse(formData);
    const chamsArray = JSON.parse(parsedData.chams || '[]');
    const runesArray = JSON.parse(parsedData.runes || '[]');
    const summonersArray = JSON.parse(parsedData.summoners || '[]');
    const itemsArray = JSON.parse(parsedData.items || '[]');

    const change = { ...parsedData, chams: chamsArray, runes: runesArray, summoners: summonersArray, items: itemsArray };
    const change_id = schema_id.parse(formData);
    const db = (await connectDB).db('dream');

    let update = await db.collection('dataEnteredDirectly').updateOne(
        { _id: new ObjectId(change_id._id) },
        { $set: change }
    )

    return Response.redirect(new URL('/lists', request.nextUrl.origin))
}
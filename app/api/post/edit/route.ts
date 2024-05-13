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
    cham1: zfd.text(z.string().optional()),
    cham2: zfd.text(z.string().optional()),
    cham3: zfd.text(z.string().optional()),
    cham4: zfd.text(z.string().optional()),
    before6: zfd.numeric(z.number().min(1).max(5).optional()),
    after6: zfd.numeric(z.number().min(1).max(5).optional()),
    half: zfd.numeric(z.number().min(1).max(5).optional()),
    lineResult: zfd.text(z.string().optional()),
    gameResult: zfd.text(z.string().optional()),
    review: zfd.text(z.string().optional()),
    spell1: zfd.numeric(z.number().optional()),
    spell2: zfd.numeric(z.number().optional()),
    spell3: zfd.numeric(z.number().optional()),
    spell4: zfd.numeric(z.number().optional()),
    firstItem: zfd.text(z.string().optional()),
    shoesItem: zfd.text(z.string().optional()),
    legendaryItem0: zfd.numeric(z.number().optional()),
    legendaryItem1: zfd.numeric(z.number().optional()),
    legendaryItem2: zfd.numeric(z.number().optional()),
    legendaryItem3: zfd.numeric(z.number().optional()),
    legendaryItem4: zfd.numeric(z.number().optional()),
    legendaryItem5: zfd.numeric(z.number().optional()),
    legendaryItem6: zfd.numeric(z.number().optional()),
    rune1: zfd.numeric(z.number().optional()),
    rune2: zfd.numeric(z.number().optional()),
    rune3: zfd.numeric(z.number().optional()),
    rune4: zfd.numeric(z.number().optional()),
    rune5: zfd.numeric(z.number().optional()),
    rune6: zfd.numeric(z.number().optional()),
    rune7: zfd.numeric(z.number().optional()),
    rune8: zfd.numeric(z.number().optional()),
    rune9: zfd.numeric(z.number().optional()),
    rune10: zfd.numeric(z.number().optional()),
    rune11: zfd.numeric(z.number().optional()),
    rune12: zfd.numeric(z.number().optional()),
    date: zfd.text(z.string().optional()),
})

export async function POST(request: NextRequest) {
    const formdata = await request.formData()
    let change = {
        ...schema.parse(formdata)
    }
    let change_id = {
        ...schema_id.parse(formdata)
    }
    const db = (await connectDB).db('dream')

    let update = await db.collection('data').updateOne(
        { _id: new ObjectId(change_id._id) },
        { $set: change }
    )

    return Response.redirect(new URL('/lists', request.nextUrl.origin))
}
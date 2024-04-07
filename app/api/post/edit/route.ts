import { connectDB } from "@/util/database"
import { NextRequest, NextResponse } from "next/server"
import { zfd } from "zod-form-data"
import { z } from "zod"
import { _id } from "@next-auth/mongodb-adapter"
import { ObjectId } from "mongodb"
const schema_id = zfd.formData({
    _id: zfd.text(),
})

const schema = zfd.formData({
    line: zfd.text(),
    before6: zfd.numeric(z.number().min(1).max(5)),
    after6: zfd.numeric(z.number().min(1).max(5)),
    half: zfd.numeric(z.number().min(1).max(5)),
    cham1: zfd.text(),
    cham2: zfd.text(),
    cham3: zfd.text(z.string().optional()),
    cham4: zfd.text(z.string().optional()),
    rune1: zfd.text(),
    rune2: zfd.text(),
    spell1: zfd.text(),
    spell2: zfd.text(),
    spell3: zfd.text(),
    spell4: zfd.text(),
    firstItem: zfd.text(),
    legendaryItem1: zfd.text(z.string().optional()),
    legendaryItem2: zfd.text(z.string().optional()),
    legendaryItem3: zfd.text(z.string().optional()),
    legendaryItem4: zfd.text(z.string().optional()),
    legendaryItem5: zfd.text(z.string().optional()),
    legendaryItem6: zfd.text(z.string().optional()),
    shoesItem: zfd.text(),
    lineResult: zfd.text(),
    gameResult: zfd.text(),
    review: zfd.text(z.string().optional()),
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
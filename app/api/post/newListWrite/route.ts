import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";

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
    date: zfd.text(),
    review: zfd.text(z.string().optional()),
    // age: zfd.numeric(z.number().min(25).max(50)),
    // likesPizza: zfd.checkbox(),
});
export async function POST(request: NextRequest) {
    const formData = await request.formData()
    // console.log(formData)
    let session = await getServerSession(authOptions)
    const data = { ...schema.parse(formData), author: session?.user?.name, email: session?.user?.email }
    console.log(request.url)
    const db = (await connectDB).db('dream')
    await db.collection('data').insertOne(data)
    return Response.redirect(new URL('/lists', request.nextUrl.origin))
}
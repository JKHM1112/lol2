//my-app/app/api/post/newListWrite/route.ts

import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextRequest } from "next/server";

const schema = zfd.formData({
    line: zfd.text(z.string().optional()),
    chams: zfd.text(z.string().optional()),
    before6: zfd.numeric(z.number().min(1).max(5).optional()),
    after6: zfd.numeric(z.number().min(1).max(5).optional()),
    half: zfd.numeric(z.number().min(1).max(5).optional()),
    runes: zfd.text(z.string().optional()),
    spells: zfd.text(z.string().optional()),
    items: zfd.text(z.string().optional()),
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
    const spellsArray = JSON.parse(parsedData.spells || '[]');
    const itemsArray = JSON.parse(parsedData.items || '[]');

    const data = { ...parsedData, chams: chamsArray, runes: runesArray, spells: spellsArray, items: itemsArray, email: session?.user?.email, };
    const db = (await connectDB).db('dream')
    await db.collection('dataEnteredDirectly').insertOne(data)

    return Response.redirect(new URL('/lists', request.nextUrl.origin))
}
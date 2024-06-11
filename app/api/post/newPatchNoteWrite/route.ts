import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    title: z.string(),
    date: z.string(),
    generalChanges: z.array(
        z.object({
            key: z.string(),
            value: z.string()
        })
    ),
    championChanges: z.array(
        z.object({
            key: z.string(),
            value: z.string()
        })
    ),
    itemChanges: z.array(
        z.object({
            key: z.string(),
            value: z.string()
        })
    )
});

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.redirect(new URL('/register', request.nextUrl.origin));
    }

    try {
        const body = await request.json();
        const parsedData = schema.safeParse(body);

        if (!parsedData.success) {
            console.error('Validation error:', parsedData.error.errors);
            return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
        }

        const { title, date, generalChanges, championChanges, itemChanges } = parsedData.data;

        const db = (await connectDB).db('dream');
        await db.collection('patchNotes').insertOne({ title, date, generalChanges, championChanges, itemChanges });

        return NextResponse.redirect(new URL('/lists', request.nextUrl.origin));
    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

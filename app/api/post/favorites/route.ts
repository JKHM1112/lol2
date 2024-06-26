import { connectDB } from "@/util/database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = (await connectDB).db('dream');
    const { favorite } = await request.json();
    if (session.user) {
        await db.collection('user_cred').updateOne(
            { email: session.user.email },
            { $addToSet: { favorites: favorite } }
        );

        return NextResponse.json({ success: true });
    }
}

export async function DELETE(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = (await connectDB).db('dream');
    const { favorite } = await request.json();
    if (session.user) {
        await db.collection('user_cred').updateOne(
            { email: session.user.email },
            { $pull: { favorites: favorite } }
        );
    }
    return NextResponse.json({ success: true });
}

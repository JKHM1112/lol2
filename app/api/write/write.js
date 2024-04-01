import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function Write({isLoggedIn}) {
    const db = (await connectDB).db('dream')
    let result = await db.collection('user_cred').find().toArray()
}
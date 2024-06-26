//전적검색 버튼
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SearchBar from "./components/searchBar";

interface Session {
    user: {
        email: string;
    }
}
interface user_cred_DB {
    favorites: string[]
    email: string
}

export default async function Games() {
    const db = (await connectDB).db('dream')
    let result = await db.collection('user_cred').find().sort({ _id: -1 }).toArray()
    let session: Session | null = await getServerSession(authOptions)
    let email: string | null | undefined = ''
    let searchFavorites
    if (session) {
        email = session.user.email
        searchFavorites = result.find((favorite: user_cred_DB) => favorite.email === email).favorites
    }
    return (
        <div >
            <SearchBar searchFavorites={searchFavorites} />
        </div>
    )
}
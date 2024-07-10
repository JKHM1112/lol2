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
    recently: string[]
    email: string
}

export default async function Games() {
    const db = (await connectDB).db('dream');
    let result = await db.collection('user_cred').find().sort({ _id: -1 }).toArray();

    let email: string | null | undefined = '';
    let searchFavorites: string[] = [];
    let searchRecently: string[] = [];

    let session: Session | null = await getServerSession(authOptions);
    if (session) {
        email = session.user.email;
        const userCred = result.find((user: user_cred_DB) => user.email === email);
        if (userCred) {
            searchFavorites = userCred.favorites;
            searchRecently = userCred.recently;
        }
    }

    return (
        <div>
            <SearchBar searchFavorites={searchFavorites} searchRecently={searchRecently} email={email}/>
        </div>
    );
}
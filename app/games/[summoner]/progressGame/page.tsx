import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

import Image from "next/image";
import { champion } from "@/app/data/champion";
import { runesReforged } from "@/app/data/runesReforged";
import Link from "next/link";
import ProgressRuneBox from "../../components/progressRuneBox";
import SummonerTitleBar from "../../components/summonerTitleBar";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getSummonerData } from "@/app/riotApi";
import { Button } from "@/components/ui/button";
const api_key = process.env.RIOT_API_KEY as string

async function getAccountData(summonerName: string, nextTag: string) {
    try {
        const res = await fetch(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${nextTag}`, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                "Accept-Language": "ko-KR,ko;q=0.9",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": api_key
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error ${res.status}: ${errorData.status.message}`);
        }

        return await res.json();
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
}

async function getProgressGame(puuid: string) {
    try {
        const res = await fetch(`https://kr.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                "Accept-Language": "ko-KR,ko;q=0.9",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": api_key
            }
        })
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.status.message)
        }
        return res.json()
    } catch (error) {
        console.error("api에러", error)
        return null
    }
}
async function getSummonerInformation(summonerId: string) {
    const res = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }
    })
    return res.json()
}
interface UserSession {
    user: {
        name: string;
        email: string;
    };
}

export default async function ProgressGame({ params }: { params: { summoner: string } }) {
    const db = (await connectDB).db("dream");
    let session: UserSession | null = await getServerSession(authOptions);
    let result;
    let favorites: string[] = [];
    if (session?.user) {
        result = await db.collection("user_cred").findOne({ email: session.user.email });
        if (result && result.favorites) {
            favorites = result.favorites;
        }
    }

    const championData = champion
    const fullsummonerName = params.summoner;
    const [summonerName, tag] = fullsummonerName.split('-');
    const nextTag = tag || 'KR1';
    const decodedSummonerName = decodeURIComponent(summonerName)
    const decodedSummonerTag = decodeURIComponent(nextTag)
    const summonernameTag = decodedSummonerName + '#' + decodedSummonerTag;
    const accountData = await getAccountData(summonerName, nextTag);
    const puuid = accountData.puuid;
    const progressGame = await getProgressGame(puuid);
    const summonerData = await getSummonerData(puuid);

    if (!accountData) {
        return <div>소환사 정보를 찾을 수 없습니다.</div>;

    }

    if (!progressGame) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <div className="flex justify-center items-center py-2">
                    <div className="w-[800px] flex items-center p-4 border rounded-lg bg-white shadow-md">
                        <div className="relative w-1/5 flex flex-col items-center">
                            <Image
                                className="rounded-md"
                                alt="profileIconId"
                                src={`/profileicon/${summonerData.profileIconId}.png`}
                                width={80}
                                height={80}
                            />
                            <div className="absolute bottom-0 transform translate-y-1/2 bg-black text-white px-2 py-1 rounded-md text-sm">
                                {summonerData.summonerLevel}
                            </div>
                        </div>
                        <div className="w-4/5 flex flex-col pl-6">
                            <SummonerTitleBar
                                gameNameTagLine={summonernameTag}
                                favorites={favorites}
                                email={session?.user.email}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center py-2">
                    <div className="w-[800px] flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white shadow-lg">

                        <Link href={"/games/" + decodedSummonerName + "-" + decodedSummonerTag}>
                            <Button className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
                                종합
                            </Button>
                        </Link>

                        <Link href={"/games/" + decodedSummonerName + "-" + decodedSummonerTag + "/progressGame"}>
                            <Button className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out">
                                인게임
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center items-center py-2">
                    <div className="w-[800px] flex items-center justify-center p-4 border rounded-lg bg-white shadow-md">
                        <div className="text-center font-bold">
                            <p>현재 게임중이 아닙니다.</p>
                            <p>Game just started? Refresh when the Loading Screen appears.</p>
                        </div>
                    </div>

                </div>
            </div>
        );

    }

    const participants = progressGame.participants
    const blueTeam = participants.slice(0, 5);
    const redTeam = participants.slice(5, 10);
    const arraysummonerId = participants.map((participant: any) => participant.summonerId)
    const summonerId = arraysummonerId[0]

    const array: any = []
    const getChampionImg = (championNumber: number) => {
        const championCode = championNumber.toString();
        return array.concat(...Object.values(championData.data)).find((cham: any) => cham.key === championCode)?.id || null;
    };
    const getChampionImg2 = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/champion/${championCode}.png`} width={35} height={35} />

    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={35} height={35} />

    const runeGroups = runesReforged.map((runeGroup: any) => runeGroup.slots)
    const runeGroups2 = runesReforged.map((runeGroup: any) => runeGroup.slots).flat().map((slot: any) => slot.runes)
    const getRuneImg = (runeCode: number, line: number) => {
        const rune = array.concat(...runeGroups.map((runeType: any) => runeType[line].runes)).find((rune: any) => rune.id == runeCode)
        return rune?.icon || '0.png';
    }
    const getRuneImg2 = (runCode: number) => {
        return array.concat(...runeGroups2.map((runeType: any) => runeType)).find((rune: any) => rune.id == runCode).icon
    }
    const getRuneImg4 = (RuneCode: string) => <Image className='rounded-md' alt={'rune1'} src={`/` + RuneCode} width={35} height={35} />
    const getRuneImg3 = (runeCode: number) => {
        return array.concat(...runesReforged.map((runeType: any) => runeType)).find((rune: any) => rune.id == runeCode).icon
    }


    return (
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className="flex items-center gap-4">
                {"소환사 닉네임: " + summonernameTag}
                <Link href={`/games/${params.summoner}/progressGame`}>진행중인 게임 확인</Link>
                <Link href={`/games/${params.summoner}/rankGame`}>랭크 정보 확인하기</Link>
                <Link href={`/games/${params.summoner}/aramGame`}>칼바람 정보 확인하기</Link>
            </div>
            <Table>
                <TableCaption>{summonernameTag} 의 진행중인 게임입니다.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-sky-200">
                        <TableHead>블루팀</TableHead>
                        <TableHead>riotId</TableHead>
                        <TableHead>티어</TableHead>
                        <TableHead>랭크 승률</TableHead>
                        <TableHead>룬</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blueTeam.map((data: any, i: number) => (
                        <TableRow key={data.teamId} className="bg-sky-100">
                            <TableCell className="flex text-center">
                                <div>{getChampionImg2(getChampionImg(data.championId))}</div>
                                <div>{getSpellImg(data.spell1Id)}</div>
                                <div>{getSpellImg(data.spell2Id)}</div>
                                <div>{getRuneImg4(getRuneImg(data.perks.perkIds[0], 0))}</div>
                                <div>{getRuneImg4(getRuneImg3(data.perks.perkSubStyle))}</div>
                            </TableCell>
                            <TableCell>{data.riotId}</TableCell>
                            <TableCell>티어</TableCell>
                            <TableCell>승률</TableCell>
                            <TableCell><ProgressRuneBox i={i} teamDatas={blueTeam} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableHeader>
                    <TableRow className="bg-rose-200">
                        <TableHead>레드팀</TableHead>
                        <TableHead>riotId</TableHead>
                        <TableHead>티어</TableHead>
                        <TableHead>랭크 승률</TableHead>
                        <TableHead>룬</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {redTeam.map((data: any, i: number) => (
                        <TableRow key={data.teamId} className="bg-rose-100">
                            <TableCell className="flex text-center">
                                <div>{getChampionImg2(getChampionImg(data.championId))}</div>
                                <div>{getSpellImg(data.spell1Id)}</div>
                                <div>{getSpellImg(data.spell2Id)}</div>
                                <div>{getRuneImg4(getRuneImg(data.perks.perkIds[0], 0))}</div>
                                <div>{getRuneImg4(getRuneImg3(data.perks.perkSubStyle))}</div>
                            </TableCell>
                            <TableCell>{data.riotId}</TableCell>
                            <TableCell>티어</TableCell>
                            <TableCell>승률</TableCell>
                            <TableCell><ProgressRuneBox i={i} teamDatas={redTeam} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

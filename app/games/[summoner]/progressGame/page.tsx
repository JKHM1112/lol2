import Games from "@/app/games/page";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

import Image from "next/image";
import { champions } from "@/app/data/champions";
import { runesReforged } from "@/app/data/runesReforged";
import Link from "next/link";
import ReloadButton from "../components/reloadButton";
import ProgressRuneBox from "./components/progressRuneBox";

export default async function ProgressGame({ params }: { params: { summoner: string } }) {
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

    const fullsummonerName = params.summoner;
    const [summonerName, tag] = fullsummonerName.split('-');
    const nextTag = tag || 'KR1';
    const decodedSummonerName = decodeURIComponent(summonerName)
    const decodedSummonerTag = decodeURIComponent(nextTag)
    const summonernameTag = decodedSummonerName + '#' + decodedSummonerTag;

    const accountData = await getAccountData(summonerName, nextTag);

    if (!accountData) {
        return <div>소환사 정보를 찾을 수 없습니다.</div>;

    }

    const puuid = accountData.puuid;
    const progressGame = await getProgressGame(puuid);
    if (!progressGame) {
        return <div>
            <Games />
            <div className="flex items-center gap-4">
                {"소환사 닉네임: " + summonernameTag}
                <Link href={`/games/${params.summoner}/progressGame`}>진행중인 게임 확인</Link>
                <Link href={`/games/${params.summoner}/rankGame`}>랭크 정보 확인하기</Link>
                <Link href={`/games/${params.summoner}/aramGame`}>칼바람 정보 확인하기</Link>
            </div>
            <div>
                소환사가 게임중이 아닙니다.
            </div>
        </div>
    }

    const participants = progressGame.participants
    const blueTeam = participants.slice(0, 5);
    const redTeam = participants.slice(5, 10);
    const arraysummonerId = participants.map((participant: any) => participant.summonerId)
    const summonerId = arraysummonerId[0]

    const array: any = []
    const getChampionImg = (championNumber: number) => {
        const championCode = championNumber.toString();
        return array.concat(...Object.values(champions.data)).find((cham: any) => cham.key === championCode)?.id || null;
    };
    const getChampionImg2 = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/championE/${championCode}.png`} width={35} height={35} />

    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={35} height={35} />

    const runeGroups = runesReforged.map((runeGroup: any) => runeGroup.slots)
    const runeGroups2 = runesReforged.map((runeGroup: any) => runeGroup.slots).flat().map((slot: any) => slot.runes)
    const getRuneImg = (runeCode: number, line: number) => {
        const rune= array.concat(...runeGroups.map((runeType: any) => runeType[line].runes)).find((rune: any) => rune.id == runeCode)
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
            <Games />
            <div className="flex items-center gap-4">
                {"소환사 닉네임: " + summonernameTag}
                <Link href={`/games/${params.summoner}/progressGame`}>진행중인 게임 확인</Link>
                <Link href={`/games/${params.summoner}/rankGame`}>랭크 정보 확인하기</Link>
                <Link href={`/games/${params.summoner}/aramGame`}>칼바람 정보 확인하기</Link>
                <ReloadButton />
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

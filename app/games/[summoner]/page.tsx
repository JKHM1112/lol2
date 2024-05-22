import Link from "next/link";
import Games from "../page";

export default async function GameSelect({ params }: { params: { summoner: string } }) {
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
            return null; // Return null on error
        }
    }

    const fullsummonerName = params.summoner;
    const [summonerName, tag] = fullsummonerName.split('-');
    const nextTag = tag || 'KR1';
    const decodedSummonerName = decodeURIComponent(summonerName);
    const decodedSummonerTag = decodeURIComponent(nextTag);
    const summonernameTag = `${decodedSummonerName}#${decodedSummonerTag}`;

    const accountData = await getAccountData(summonerName, nextTag);

    if (!accountData) {
        return (
            <div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Games />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className="flex items-center gap-4">
                    {"소환사 닉네임: " + summonernameTag}
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    소환사 정보를 찾을 수 없습니다.
                </div>
            </div>

        )
    }

    return (
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Games />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className="flex items-center gap-4">
                {"소환사 닉네임: " + summonernameTag}
                <Link href={`/games/${params.summoner}/progressGame`}>진행중인 게임 확인</Link>
                <Link href={`/games/${params.summoner}/rankGame`}>랭크 정보 확인하기</Link>
                <Link href={`/games/${params.summoner}/aramGame`}>칼바람 정보 확인하기</Link>
            </div>
        </div>
    );
}

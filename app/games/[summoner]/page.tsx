import Link from "next/link";
import Games from "../page";

export default async function GameSelect({ params }: { params: { summoner: string } }) {
    const fullsummonerName = params.summoner;
    const [summonerName, tag] = fullsummonerName.split('-');
    const nextTag = tag || 'KR1';
    const decodedSummonerName = decodeURIComponent(summonerName)
    const decodedSummonerTag = decodeURIComponent(nextTag)
    const summonernameTag = decodedSummonerName + '#' + decodedSummonerTag;

    
    return (
        <div>
            <Games />
            <div className="flex items-center gap-4">
                {"소환사 닉네임: " + summonernameTag}
                <Link href={`/games/${params.summoner}/progressGame`}>진행중인 게임 확인</Link>
                <Link href={`/games/${params.summoner}/rankGame`}>랭크 정보 확인하기</Link>
                <Link href={`/games/${params.summoner}/aramGame`}>칼바람 정보 확인하기</Link>
            </div>
            
        </div>
    )
}
import Games from "../../page"

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
        throw error;  // Re-throw the error to be handled by the caller
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

export default async function ProgressGame({ params }: { params: { summoner: string } }) {
    const fullsummonerName = params.summoner;
    const [summonerName, tag] = fullsummonerName.split('-');
    const nextTag = tag || 'KR1';
    const accountData = await getAccountData(summonerName, nextTag);

    if (!accountData) {
        return <div>소환사 정보를 찾을 수 없습니다.</div>;
    }

    const puuid = accountData.puuid;
    const progressGame = await getProgressGame(puuid);

    if (!progressGame) {
        return <div>
            <Games />
            현재 사용자는 게임중이 아닙니다.
        </div>;
    }
    console.log(progressGame)
    // 이하의 로직은 progressGame이 유효한 데이터를 가지고 있는 경우에 대한 처리
    let puuidGame, championIdGame, riotIdGame, spell1IdGame, spell2IdGame;

    if (progressGame.mapId && progressGame.mapId !== 0) {
        puuidGame = progressGame.participants.map((participant: any) => participant.puuid);
        championIdGame = progressGame.participants.map((participant: any) => participant.championId);
        riotIdGame = progressGame.participants.map((participant: any) => participant.riotId);
        spell1IdGame = progressGame.participants.map((participant: any) => participant.spell1Id);
        spell2IdGame = progressGame.participants.map((participant: any) => participant.spell2Id);
    }

    return (
        <div>
            <Games />
            {puuidGame}
            {championIdGame}
            {riotIdGame}
            {spell1IdGame}
            {spell2IdGame}
        </div>
    )
}

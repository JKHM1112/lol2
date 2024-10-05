'use client'

import { useState } from "react";

interface GameData {
    win: [number, number];
    levels: [number, number, number, number, number];   //선2~6렙
    soloKills: [number, number];    //솔로킬
    jungleMinionsKilled: [number, number];  //정글미니언
    minionsKilled: [number, number];    //라인미니언
    xp: [number, number];   //경험치
    totalGold: [number, number];    //골드
    kda: [number, number];  //kda
    killParticipation: [number, number];    //킬관여율
    teamDamagePercentage: [number, number]; //가한피해량 비율
    damageTakenOnTeamPercentage: [number, number];  //받은피해량 비율
    turretPlatesTaken: [number, number];    //포골
    damageDealtToBuildings: [number, number];   //포탑피해량
    damagePerMinute: [number, number];  //분당피해량
    visionScore: [number, number];  //시야점수
}

export default function SelectedChampions({ versusCollection }: { versusCollection: any }) {
    const [version, setVersion] = useState("19");
    const [championA, setChampionA] = useState("");
    const [championB, setChampionB] = useState("");
    const [line, setLine] = useState("");
    const [gameData, setGameData] = useState<GameData | null>(null); // gameData를 상태로 관리

    const function1 = () => {
        const data = versusCollection.find(
            (item: any) => item.championName === championA
        )?.[version]?.[line]?.[championB];

        setGameData(data); // 찾은 데이터를 상태로 설정
    };

    return (
        <div>
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="버전"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="챔피언 A 이름"
                    value={championA}
                    onChange={(e) => setChampionA(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="챔피언 B 이름"
                    value={championB}
                    onChange={(e) => setChampionB(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="라인"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                    className="border p-2"
                />
            </div>
            <button
                className="bg-blue-500 p-2 rounded"
                onClick={function1} // 함수 참조 전달
            >
                Compare
            </button>
            {gameData && (
                <div className="mt-4">
                    <p>KDA A: {gameData.kda[0]}</p>
                    <p>KDA B: {gameData.kda[1]}</p>
                    <p>{gameData.kda[1]}</p>
                </div>
            )}
        </div>
    );
}

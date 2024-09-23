'use client'
import { useState } from "react";

interface infoType {
    info: any;
}

interface SummonerStats {
    name: string;
    tag: string;
    games: number;
    wins: number;
    losses: number;
    winRate: string;
}

export default function PlayedTogether({ resultData, decodedGameName, decodedTagLine }: any) {
    const rankResultInfo = resultData.map((data: infoType) => data.info);

    const [isShowingOurTeam, setIsShowingOurTeam] = useState(true); // 팀 전환 버튼 상태

    const ourTeam: SummonerStats[] = [];
    const enemyTeam: SummonerStats[] = [];

    // 각 게임 데이터를 반복하며 데이터 처리
    rankResultInfo.forEach((game: any) => {
        const participants = game.participants;

        // 유저가 첫 팀(0~4)에 있는지 확인
        let isUserInFirstTeam = false;

        for (let i = 0; i < 5; i++) {
            if (participants[i].riotIdGameName === decodedGameName && participants[i].riotIdTagline === decodedTagLine) {
                isUserInFirstTeam = true;
                break;
            }
        }

        // 각 참가자를 우리팀/상대팀에 추가
        for (let i = 0; i < 10; i++) {
            const participant = participants[i];
            const isFirstTeam = i < 5;
            const isWin = participant.win;
            const riotIdGameName = participant.riotIdGameName;
            const riotIdTagline = participant.riotIdTagline;

            const findSummoner = (teamArray: SummonerStats[], name: string, tag: string) =>
                teamArray.find((summoner) => summoner.name === name && summoner.tag === tag);

            const updateSummonerStats = (teamArray: SummonerStats[], name: string, tag: string, isWin: boolean) => {
                const summoner = findSummoner(teamArray, name, tag);
                if (summoner) {
                    summoner.games += 1;
                    if (isWin) summoner.wins += 1;
                    else summoner.losses += 1;
                    summoner.winRate = Math.round((summoner.wins / summoner.games) * 100).toString(); // 승률 계산
                } else {
                    teamArray.push({
                        name,
                        tag,
                        games: 1,
                        wins: isWin ? 1 : 0,
                        losses: isWin ? 0 : 1,
                        winRate: Math.round(isWin ? 100 : 0).toString(), // 첫 게임에 따른 승률
                    });
                }
            };

            if (isUserInFirstTeam) {
                if (isFirstTeam) {
                    // 우리팀
                    updateSummonerStats(ourTeam, riotIdGameName, riotIdTagline, isWin);
                } else {
                    // 상대팀
                    updateSummonerStats(enemyTeam, riotIdGameName, riotIdTagline, isWin);
                }
            } else {
                if (isFirstTeam) {
                    // 상대팀
                    updateSummonerStats(enemyTeam, riotIdGameName, riotIdTagline, isWin);
                } else {
                    // 우리팀
                    updateSummonerStats(ourTeam, riotIdGameName, riotIdTagline, isWin);
                }
            }
        }
    });

    // 기본 정렬: 게임 수 -> 승률 (내림차순)
    const sortSummoners = (team: SummonerStats[]) => {
        return team.sort((a, b) => {
            if (b.games !== a.games) {
                return b.games - a.games; // 게임 수 기준 정렬
            } else {
                return parseFloat(b.winRate) - parseFloat(a.winRate); // 승률 기준 정렬
            }
        });
    };

    // 정렬된 결과
    const sortedOurTeam = sortSummoners([...ourTeam]);
    const sortedEnemyTeam = sortSummoners([...enemyTeam]);

    return (
        <div className="w-[300px] bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg text-center font-semibold mb-4">함께 플레이한 소환사들</h2>
            <div className="flex justify-around  mb-2">
                <button className={`px-4 py-2 rounded ${isShowingOurTeam ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} onClick={() => setIsShowingOurTeam(true)} >
                    우리 팀
                </button>
                <button className={`px-4 py-2 rounded ${!isShowingOurTeam ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} onClick={() => setIsShowingOurTeam(false)} >
                    상대 팀
                </button>
            </div>

            <div className="border-b border-t pb-2">
                {/* 테이블 헤더 */}
                <div className="flex justify-between font-semibold">
                    <span className="w-1/2">소환사 정보</span>
                    <span className="w-1/6 text-center">게임수</span>
                    <span className="w-1/6 text-center">승패</span>
                    <span className="w-1/6 text-center">승률</span>
                </div>
            </div>

            {/* 팀 정보 표시 */}
            {isShowingOurTeam
                ? sortedOurTeam.slice(1, 9).map((summoner, index) => (
                    <div key={index} className="flex border-b justify-between py-2">
                        <span className="w-1/2 truncate">{summoner.name}</span> {/* 태그는 보이지 않지만 저장 */}
                        <span className="w-1/6 text-center">{summoner.games}</span> {/* 게임수 */}
                        <span className="w-1/6 text-center">{summoner.wins}-{summoner.losses}</span> {/* 승패 */}
                        <span className="w-1/6 text-center">{Math.round(parseFloat(summoner.winRate))}%</span> {/* 소수점 없는 승률 */}
                    </div>
                ))
                : sortedEnemyTeam.slice(0, 8).map((summoner, index) => (
                    <div key={index} className="flex border-b justify-between py-2">
                        <span className="w-1/2 truncate">{summoner.name}</span> {/* 태그는 보이지 않지만 저장 */}
                        <span className="w-1/6 text-center">{summoner.games}</span> {/* 게임수 */}
                        <span className="w-1/6 text-center">{summoner.wins}-{summoner.losses}</span> {/* 승패 */}
                        <span className="w-1/6 text-center">{Math.round(parseFloat(summoner.winRate))}%</span> {/* 소수점 없는 승률 */}
                    </div>
                ))}
        </div>
    );
}

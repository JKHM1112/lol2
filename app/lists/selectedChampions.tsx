'use client';

import { useEffect, useState } from "react";
import { champion } from "@/app/data/champion";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Image from "next/image";

// 챔피언 데이터와 관련된 인터페이스 정의
interface GameData {
    levels: [number, number, number, number, number];
    jungleMinionsKilled: [number, number];
    minionsKilled: [number, number];
    totalGold: [number, number];
    win: [number, number];
    xp: [number, number];
    damagePerMinute: [number, number];
    teamDamagePercentage: [number, number];
    damageTakenOnTeamPercentage: [number, number];
    turretPlatesTaken: [number, number];
    damageDealtToBuildings: [number, number];
    killParticipation: [number, number];
    soloKills: [number, number];
    kda: [number, number];
    visionScore: [number, number];
}

const lineDetails = [
    { value: 'top', label: '탑' },
    { value: 'jungle', label: '정글' },
    { value: 'middle', label: '미드' },
    { value: 'bottom', label: '원딜' },
    { value: 'utility', label: '서폿' },
];

const versionDetails = [
    { version: '19' },
    { version: '18' },
    { version: '17' },

];

const statsList = [
    { key: 'cs12', label: '12분 CS' },
    { key: 'totalGold12', label: '12분 골드' },
    { key: 'xp12', label: '12분 경험치' },
    { key: 'damagePerMinute', label: '분당 피해량' },
    { key: 'teamDamagePercentage', label: '가한 피해 비율' },
    { key: 'damageTakenOnTeamPercentage', label: '받은 피해 비율' },
    { key: 'turretPlatesTaken', label: '포골' },
    { key: 'damageDealtToBuildings', label: '포탑 가한 피해' },
    { key: 'killParticipation', label: '킬 관여율' },
    { key: 'soloKills', label: '솔로킬' },
    { key: 'kda', label: 'kda' },
    { key: 'visionScore', label: '시야 점수' }
] as const;

export default function SelectedChampions({ versusCollection, myChampSearch, enemyChampSearch }: any) {


    const [gameData, setGameData] = useState<GameData | null>(null);
    const [firstChampion, setFirstChampion] = useState<any>(null);
    const [secondChampion, setSecondChampion] = useState<any>(null);
    const [line, setLine] = useState('');
    const [version, setVersion] = useState("19");

    const getChampionDetail = (searchTerm: string, type: 'name' | 'id') => {
        return Object.values(champion.data)
            .filter((champ) => (type === 'name' ? champ.name === searchTerm : champ.id === searchTerm))
            .map((champ) => ({
                englishName: champ.id,
                koreanName: champ.name,
                imageUrl: champ.image.full
            }))[0]; // 첫 번째 일치하는 챔피언 정보 반환
    };

    // 통합된 데이터 조회 및 처리 함수 (승률, 판수, 상대 챔피언 전적)
    const calculateChampionStats = (chams: any, versusCollection: any, version: string, line: string) => {
        if (!chams) return { totalWins: 0, totalGames: 0, relativeRecord: [] };

        const championData = versusCollection.find((item: any) => item.championName === chams.englishName);
        if (!championData) return { totalWins: 0, totalGames: 0, relativeRecord: [] };

        let totalWins = 0;
        let totalGames = 0;
        let relativeRecord: any[] = [];

        for (const lineKey in championData[version]) {
            for (const opponent in championData[version][lineKey]) {
                const gameData = championData[version][lineKey][opponent];
                if (gameData) {
                    const games = gameData.win[0] + gameData.win[1];
                    const winRate = games > 0 ? Math.round((gameData.win[0] / games) * 10000) / 100 : 0;

                    totalWins += gameData.win[0];
                    totalGames += games;

                    if (lineKey === line) {
                        const opponentData = champion.data[opponent as keyof typeof champion.data];
                        relativeRecord.push({
                            koreanName: opponentData?.name || opponent,
                            englishName: opponent,
                            winRate: winRate,
                            totalGames: games
                        });
                    }
                }
            }
        }

        return {
            totalWins,
            totalGames,
            relativeRecord: relativeRecord.filter(record => record.totalGames >= 20).sort((a, b) => b.winRate - a.winRate),
        };
    };

    const statisticalComparison = (cham1: any, cham2: any, versusCollection: any, version: string, line: string) => {
        if (cham1 && cham2 && line) {
            const championData = versusCollection.find((item: any) => item.championName === cham1.englishName);
            if (!championData || !championData[version] || !championData[version][line] || !championData[version][line][cham2.englishName]) {
                return null;
            }
            const opponentData = championData[version][line][cham2.englishName];
            const gameCount = opponentData.win[0] + opponentData.win[1];


            return {
                gameCount: gameCount,
                levels: [opponentData.levels[0], opponentData.levels[1], opponentData.levels[2], opponentData.levels[3], opponentData.levels[4],
                gameCount - opponentData.levels[0], gameCount - opponentData.levels[1], gameCount - opponentData.levels[2], gameCount - opponentData.levels[3], gameCount - opponentData.levels[4]],
                cs12: [Math.round((opponentData.jungleMinionsKilled[0] + opponentData.minionsKilled[0]) / gameCount), Math.round((opponentData.jungleMinionsKilled[1] + opponentData.minionsKilled[1]) / gameCount)],
                totalGold12: [Math.round(opponentData.totalGold[0] / gameCount), Math.round(opponentData.totalGold[1] / gameCount)],
                xp12: [Math.round(opponentData.xp[0] / gameCount), Math.round(opponentData.xp[1] / gameCount)],
                damagePerMinute: [Math.round(opponentData.damagePerMinute[0] / gameCount), Math.round(opponentData.damagePerMinute[1] / gameCount)],
                teamDamagePercentage: [Math.round(opponentData.teamDamagePercentage[0] / gameCount * 100) / 100, Math.round(opponentData.teamDamagePercentage[1] / gameCount * 100) / 100],
                damageTakenOnTeamPercentage: [Math.round(opponentData.damageTakenOnTeamPercentage[0] / gameCount * 100) / 100, Math.round(opponentData.damageTakenOnTeamPercentage[1] / gameCount * 100) / 100],
                turretPlatesTaken: [Math.round(opponentData.turretPlatesTaken[0] / gameCount), Math.round(opponentData.turretPlatesTaken[1] / gameCount)],
                damageDealtToBuildings: [Math.round(opponentData.damageDealtToBuildings[0] / gameCount), Math.round(opponentData.damageDealtToBuildings[1] / gameCount)],
                killParticipation: [Math.round(opponentData.killParticipation[0] / gameCount), Math.round(opponentData.killParticipation[1] / gameCount)],
                soloKills: [Math.round(opponentData.soloKills[0] / gameCount * 100) / 100, Math.round(opponentData.soloKills[1] / gameCount * 100) / 100],
                kda: [Math.round(opponentData.kda[0] / gameCount * 100) / 100, Math.round(opponentData.kda[1] / gameCount * 100) / 100],
                visionScore: [Math.round(opponentData.visionScore[0] / gameCount), Math.round(opponentData.visionScore[1] / gameCount)],
            }
        }
        return null
    }

    useEffect(() => {
        if (myChampSearch) {
            const myChampionDetailsByName = getChampionDetail(myChampSearch, 'name');
            setFirstChampion(myChampionDetailsByName); // 첫 번째 챔피언 상태 업데이트
        }

        if (enemyChampSearch) {
            const enemyChampionDetailsById = getChampionDetail(enemyChampSearch, 'id');
            setSecondChampion(enemyChampionDetailsById); // 두 번째 챔피언 상태 업데이트
        }
    }, [myChampSearch, enemyChampSearch]);
    useEffect(() => {
        if (firstChampion && secondChampion && line && version) {
            const data = versusCollection.find(
                (item: any) => item.championName === firstChampion.englishName
            )?.[version]?.[line]?.[secondChampion.englishName];
            setGameData(data);
        }
    }, [firstChampion, secondChampion, line, version, versusCollection]);
    //챔피언에 따라 상대방의 승률 이름 등 정보가 있다.
    const firstChampionStats = calculateChampionStats(firstChampion, versusCollection, version, line);
    const secondChampionStats = calculateChampionStats(secondChampion, versusCollection, version, line);
    const statistical = statisticalComparison(firstChampion, secondChampion, versusCollection, version, line);

    return (
        <div className="min-w-[600px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">

            {/*둘째줄*/}
            <div className="flex flex-row justify-center gap-4 mt-4">
                {lineDetails.map((lineOption) => (
                    <Button key={lineOption.value} onClick={() => setLine(lineOption.value)}
                        className={`${line === lineOption.value ? 'bg-gray-300 hover:bg-secondary/90 text-black' : 'bg-white text-black hover:bg-secondary/90'} transition-all`}>
                        {lineOption.label}
                    </Button>
                ))}
                <Select onValueChange={(value) => setVersion(value)} defaultValue="19">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="버전 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        {versionDetails.map((tier) => (
                            <SelectItem key={tier.version} value={tier.version}>
                                14.{tier.version}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/*셋째줄*/}
            <div className="flex flex-row justify-center gap-8 mt-4">
                {firstChampion ? (
                    <div className="flex flex-row items-center gap-2">
                        {firstChampionStats && (
                            <div>
                                <div className={Math.round((firstChampionStats.totalWins / firstChampionStats.totalGames) * 10000) / 100 >= 50 ? 'text-blue-500' : 'text-red-500'}>전체 승률: {Math.round((firstChampionStats.totalWins / firstChampionStats.totalGames) * 10000) / 100}%</div>
                                <div className="">전체 판수: {firstChampionStats.totalGames}</div>
                            </div>
                        )}
                        <div>
                            <div className="text-center">{firstChampion.koreanName}</div>
                            <Image className="rounded-full" alt={firstChampion.koreanName} src={'/champion/' + firstChampion.imageUrl} height={80} width={80} />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row items-center gap-2">
                        <div>
                            <div className="">전체 승률: -</div>
                            <div className="">전체 판수: -</div>
                        </div>
                        <div>
                            <div className="text-center">내 챔피언</div>
                            <Image className="bg-gray-300 rounded-full" alt="none" src={'/0.png'} height={80} width={80} />
                        </div>
                    </div>)}

                {firstChampion && secondChampion && gameData ? (
                    <div className="flex flex-col justify-center">
                        <div className={Math.round(gameData.win[0] / (gameData.win[0] + gameData.win[1]) * 10000) / 100 >= 50 ? 'text-blue-500' : 'text-red-500'}>상대 승률: {Math.round(gameData.win[0] / (gameData.win[0] + gameData.win[1]) * 10000) / 100}%</div>
                        <div className="">표본수: {gameData.win[0] + gameData.win[1]}</div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center">
                        <div className="">상대 승률: -</div>
                        <div className="">표본수: -</div>
                    </div>
                )}

                {secondChampion ? (
                    <div className="flex flex-row items-center gap-2">
                        <div>
                            <div className="text-center">{secondChampion.koreanName}</div>
                            <Image className="rounded-full" alt={secondChampion.koreanName} src={'/champion/' + secondChampion.imageUrl} height={80} width={80} />
                        </div>
                        {secondChampionStats && (
                            <div>
                                <div className={Math.round((secondChampionStats.totalWins / secondChampionStats.totalGames) * 10000) / 100 >= 50 ? 'text-blue-500' : 'text-red-500'}>전체 승률: {Math.round((secondChampionStats.totalWins / secondChampionStats.totalGames) * 10000) / 100}%</div>
                                <div className="">전체 판수: {secondChampionStats.totalGames}</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-row items-center gap-2">
                        <div>
                            <div className="text-center">내 챔피언</div>
                            <Image className="bg-gray-300 rounded-full" alt="none" src={'/0.png'} height={100} width={100} />
                        </div>
                        <div>
                            <div className="">전체 승률: -</div>
                            <div className="">전체 판수: -</div>
                        </div>
                    </div>)}
            </div>


            {/*넷째줄*/}
            <div className="flex flex-row gap-4 mt-4">
                <div className="flex flex-col border-2 rounded-md bg-gray-200 w-1/4 max-h-[550px] overflow-y-auto ml-2">
                    {secondChampionStats.relativeRecord.reverse().map((record, index) => (
                        <div key="index" className="flex flex-row p-1 gap-1">
                            <Image className="rounded-full" alt={record.englishName} src={`/champion/${record.englishName}.png`} height={40} width={40}
                                onClick={() => setFirstChampion({
                                    koreanName: record.koreanName,
                                    englishName: record.englishName,
                                    imageUrl: `${record.englishName}.png`
                                })}
                            />
                            <div className="flex flex-col">
                                <div className={(100 - record.winRate) >= 50 ? 'text-blue-500 text-sm' : 'text-red-500 text-sm'}>승률: {Math.round((100 - record.winRate) * 100) / 100}%</div>
                                <div className="text-sm">판수: {record.totalGames}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col border-2 rounded-md bg-gray-200 w-2/4 ">
                    {statistical && (
                        <div>
                            {statistical.levels.slice(0, 5).map((level, index) => (
                                <div className="flex text-center mt-2" key={index}>
                                    <div className="w-1/3 flex flex-row justify-center gap-4 ml-2">
                                        {/* 내 챔피언 승률 */}
                                        <div className="w-1/2 text-sm">
                                            {Math.round(level / statistical.gameCount * 100)}%
                                        </div>
                                        <div className="w-1/2">
                                            {/* 내 챔피언 - 상대 챔피언 차이 계산 및 색상 변경 */}
                                            <div
                                                className={
                                                    (Math.round(statistical.levels[index] / statistical.gameCount * 100) -
                                                        Math.round(statistical.levels[index + 5] / statistical.gameCount * 100)) > 0
                                                        ? 'bg-blue-200 rounded-md text-blue-500 text-sm'
                                                        : 'bg-red-200 rounded-md text-red-500 text-sm'
                                                }
                                            >
                                                {Math.round(Math.round(statistical.levels[index] / statistical.gameCount * 100) -
                                                    Math.round(statistical.levels[index + 5] / statistical.gameCount * 100))}%
                                            </div>
                                        </div>
                                    </div>

                                    {/* 텍스트 */}
                                    <div className="w-1/3 text-sm">선{index + 2}렙</div>

                                    {/* 상대 챔피언 - 내 챔피언 차이 계산 및 색상 변경 */}
                                    <div className="w-1/3 flex flex-row justify-center gap-4 mr-2">
                                        <div className="w-1/2">
                                            <div
                                                className={
                                                    (Math.round(statistical.levels[index + 5] / statistical.gameCount * 100) -
                                                        Math.round(statistical.levels[index] / statistical.gameCount * 100)) > 0
                                                        ? 'bg-blue-200 rounded-md text-blue-500 text-sm'
                                                        : 'bg-red-200 rounded-md text-red-500 text-sm'
                                                }
                                            >
                                                {Math.round(Math.round(statistical.levels[index + 5] / statistical.gameCount * 100) -
                                                    Math.round(statistical.levels[index] / statistical.gameCount * 100))}%
                                            </div>
                                        </div>
                                        {/* 상대 챔피언 승률 */}
                                        <div className="w-1/2 text-sm">
                                            {Math.round(statistical.levels[index + 5] / statistical.gameCount * 100)}%
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {statsList.map((stat, index) => (
                                <div className="flex text-center mt-2" key={index}>
                                    <div className="w-1/3 flex flex-row justify-center gap-4 ml-2">
                                        <div className="w-1/2 text-sm">
                                            {statistical[stat.key][0]}
                                        </div>
                                        <div className="w-1/2">
                                            {/* 내 챔피언 - 상대 챔피언 차이 계산 및 색상 변경 */}
                                            <div
                                                className={
                                                    (Math.round(statistical[stat.key][0] / statistical.gameCount * 100) -
                                                        Math.round(statistical[stat.key][1] / statistical.gameCount * 100)) > 0
                                                        ? 'bg-blue-200 rounded-md text-blue-500 text-sm'
                                                        : 'bg-red-200 rounded-md text-red-500 text-sm'
                                                }
                                            >
                                                {stat.key == "teamDamagePercentage" || stat.key == "damageTakenOnTeamPercentage" ?
                                                    (Math.round((statistical[stat.key][0] - statistical[stat.key][1]) * 100) / 100) :
                                                    (Math.round(statistical[stat.key][0] - statistical[stat.key][1]))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/3 text-sm">
                                        {stat.label}
                                    </div>
                                    <div className="w-1/3 flex flex-row gap-4 mr-2">
                                        <div className="w-1/2">
                                            <div
                                                className={
                                                    (Math.round(statistical[stat.key][1] / statistical.gameCount * 100) -
                                                        Math.round(statistical[stat.key][0] / statistical.gameCount * 100)) > 0
                                                        ? 'bg-blue-200 rounded-md text-blue-500 text-sm'
                                                        : 'bg-red-200 rounded-md text-red-500 text-sm'
                                                }
                                            >
                                                {stat.key == "teamDamagePercentage" || stat.key == "damageTakenOnTeamPercentage" ?
                                                    (Math.round((statistical[stat.key][1] - statistical[stat.key][0]) * 100) / 100) :
                                                    (Math.round(statistical[stat.key][1] - statistical[stat.key][0]))
                                                }
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-sm">
                                            {statistical[stat.key][1]}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col border-2 rounded-md bg-gray-200 w-1/4 max-h-[550px] overflow-y-auto mr-2">
                    {firstChampionStats.relativeRecord.map((record, index) => (
                        <div key="index" className="flex flex-row p-1 gap-1">
                            <Image className="rounded-full" alt={record.englishName} src={`/champion/${record.englishName}.png`} height={40} width={40}
                                onClick={() => setSecondChampion({
                                    koreanName: record.koreanName,
                                    englishName: record.englishName,
                                    imageUrl: `${record.englishName}.png`
                                })}
                            />
                            <div className="flex flex-col">
                                <div className={(100 - record.winRate) >= 50 ? 'text-blue-500 text-sm' : 'text-red-500 text-sm'}>승률: {record.winRate}%</div>
                                <div className="text-sm">판수: {record.totalGames}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
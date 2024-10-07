'use client';

import { useEffect, useState } from "react";
import { champion } from "@/app/data/champion";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { relative } from "path";

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

// 챔피언 데이터 설정
const championDetails = Object.values(champion.data).map((champ) => ({
    englishName: champ.id,
    koreanName: champ.name,
    imageUrl: champ.image.full
}));

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
    { version: '16' },
    { version: '15' },
];



export default function SelectedChampions({ versusCollection }: { versusCollection: any }) {
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [firstChampion, setFirstChampion] = useState<any>(null);
    const [secondChampion, setSecondChampion] = useState<any>(null);
    const [line, setLine] = useState('');
    const [version, setVersion] = useState("19");
    const [isFirstChampionOpen, setIsFirstChampionOpen] = useState(false);
    const [isSecondChampionOpen, setIsSecondChampionOpen] = useState(false);

    const handleReset = () => {
        setFirstChampion(null);
        setSecondChampion(null);
        setLine('ALL');
    };

    const handleSwapChampions = () => {
        setFirstChampion(secondChampion);
        setSecondChampion(firstChampion);
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
            relativeRecord: relativeRecord.filter(record => record.totalGames >= 10).sort((a, b) => b.winRate - a.winRate),
        };
    };


    useEffect(() => {
        if (firstChampion && secondChampion && line && version) {
            const data = versusCollection.find(
                (item: any) => item.championName === firstChampion.englishName
            )?.[version]?.[line]?.[secondChampion.englishName];
            setGameData(data);
        }
    }, [firstChampion, secondChampion, line, version]);
    //챔피언에 따라 상대방의 승률 이름 등 정보가 있다.
    const firstChampionStats = calculateChampionStats(firstChampion, versusCollection, version, line);
    const secondChampionStats = calculateChampionStats(secondChampion, versusCollection, version, line);



    return (
        <div className="flex justify-center min-w-[1200px] ">
            <div className="min-w-[1000px] min-h-[600px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">
                <div className="flex items-center gap-2">
                    <Button className="" onClick={handleReset} variant="outline" size="sm">리셋</Button>
                    <Popover open={isFirstChampionOpen} onOpenChange={setIsFirstChampionOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {firstChampion ? firstChampion.koreanName : '내 챔피언 선택'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="챔피언 선택..." />
                                <CommandList>
                                    <CommandEmpty>챔피언을 찾을 수 없습니다.</CommandEmpty>
                                    <CommandGroup>
                                        {championDetails.map((champ) => (
                                            <CommandItem key={champ.koreanName} value={champ.koreanName} onSelect={() => {
                                                setFirstChampion(champ);
                                                setIsFirstChampionOpen(false);
                                            }}>
                                                <span className="mr-2">{champ.koreanName}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleSwapChampions} variant="outline" size="sm">변경하기</Button>
                    <Popover open={isSecondChampionOpen} onOpenChange={setIsSecondChampionOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {secondChampion ? secondChampion.koreanName : '상대 챔피언 선택'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="챔피언 선택..." />
                                <CommandList>
                                    <CommandEmpty>챔피언을 찾을 수 없습니다.</CommandEmpty>
                                    <CommandGroup>
                                        {championDetails.map((champ) => (
                                            <CommandItem key={champ.koreanName} value={champ.koreanName} onSelect={() => {
                                                setSecondChampion(champ);
                                                setIsSecondChampionOpen(false);
                                            }}>
                                                <span className="mr-2">{champ.koreanName}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Line and Version Selector */}
                <div className="flex flex-row gap-2">
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

                {/* Display Champion Stats */}
                <div className="flex flex-row gap-2">
                    {firstChampion && (
                        <div className="flex flex-col items-center">
                            {firstChampionStats && (
                                <>
                                    <div className="text-sm">전체 승률: {Math.round((firstChampionStats.totalWins / firstChampionStats.totalGames) * 10000) / 100}%</div>
                                    <div className="text-sm">전체 판수: {firstChampionStats.totalGames}</div>
                                </>
                            )}
                            <div className="text-lg font-bold">{firstChampion.koreanName}</div>
                            <Image className="rounded-full" alt={firstChampion.koreanName} src={'/champion/' + firstChampion.imageUrl} height={100} width={100} />
                        </div>
                    )}
                    {gameData && (
                        <div className="flex flex-col items-center">
                            <div className="text-sm">상대 승률: {Math.round(gameData.win[0] / (gameData.win[0] + gameData.win[1]) * 10000) / 100}%</div>
                            <div className="text-sm">표본수: {gameData.win[0] + gameData.win[1]}</div>
                        </div>
                    )}

                    {secondChampion && (
                        <div className="flex flex-col items-center">
                            {secondChampionStats && (
                                <>
                                    <div className="text-sm">전체 승률: {Math.round((secondChampionStats.totalWins / secondChampionStats.totalGames) * 10000) / 100}%</div>
                                    <div className="text-sm">전체 판수: {secondChampionStats.totalGames}</div>
                                </>
                            )}
                            <div className="text-lg font-bold">{secondChampion.koreanName}</div>
                            <Image className="rounded-full" alt={secondChampion.koreanName} src={'/champion/' + secondChampion.imageUrl} height={100} width={100} />
                        </div>
                    )}
                </div>

                {/* 상대 전적 출력 */}
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col border-2 rounded-md bg-gray-200 w-1/5 overflow-y-auto">
                        {secondChampionStats.relativeRecord.map((record, index) => (
                            <div className="flex flex-row">
                                <Image className="rounded-full" alt={record.englishName} src={`/champion/${record.englishName}.png`} height={50} width={50}
                                    onClick={() => setFirstChampion({
                                        koreanName: record.koreanName,
                                        englishName: record.englishName,
                                        imageUrl: `${record.englishName}.png`
                                    })}
                                />
                                <div className="text-sm mt-2">판수: {record.totalGames}</div>
                                <div className="text-sm mt-2">승률: {record.winRate}%</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col border-2 rounded-md bg-gray-200 w-3/5 ">

                    </div>
                    <div className="flex flex-col border-2 rounded-md bg-gray-200 w-1/5 overflow-y-auto">
                        {firstChampionStats.relativeRecord.map((record, index) => (
                            <div className="flex flex-row">
                                <Image className="rounded-full" alt={record.englishName} src={`/champion/${record.englishName}.png`} height={50} width={50}
                                    onClick={() => setSecondChampion({
                                        koreanName: record.koreanName,
                                        englishName: record.englishName,
                                        imageUrl: `${record.englishName}.png`
                                    })}
                                />
                                <div className="text-sm mt-2">판수: {record.totalGames}</div>
                                <div className="text-sm mt-2">승률: {record.winRate}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
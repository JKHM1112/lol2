'use client';

import { useEffect, useState } from "react";
import { champion } from "@/app/data/champion";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Image from "next/image";

interface GameData {
    win: [number, number];
    levels: [number, number, number, number, number];
    soloKills: [number, number];
    jungleMinionsKilled: [number, number];
    minionsKilled: [number, number];
    xp: [number, number];
    totalGold: [number, number];
    kda: [number, number];
    killParticipation: [number, number];
    teamDamagePercentage: [number, number];
    damageTakenOnTeamPercentage: [number, number];
    turretPlatesTaken: [number, number];
    damageDealtToBuildings: [number, number];
    damagePerMinute: [number, number];
    visionScore: [number, number];
}

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
    const [firstChampion, setFirstChampion] = useState<{ koreanName: string; englishName: string; imageUrl: string; } | null>(null);
    const [secondChampion, setSecondChampion] = useState<{ koreanName: string; englishName: string; imageUrl: string; } | null>(null);
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

    const function1 = () => {
        if (firstChampion && secondChampion) {
            const data = versusCollection.find(
                (item: any) => item.championName === firstChampion.englishName
            )?.[version]?.[line]?.[secondChampion.englishName];

            setGameData(data);
        }
    };

    useEffect(() => {
        if (firstChampion && secondChampion && line && version) {
            function1();
        }
    }, [firstChampion, secondChampion, line, version]);
    console.log(gameData)
    return (
        <div className="flex justify-center min-w-[1200px] ">
            <div className="min-w-[1000px] min-h-[600px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">
                <div className="flex items-center space-x-4">
                    <Button onClick={handleReset} variant="outline" size="sm">리셋</Button>
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
                <div className="flex flex-row">
                    <Select onValueChange={(value) => setLine(value)} defaultValue="">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="라인 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            {lineDetails.map((line) => (
                                <SelectItem key={line.value} value={line.value}>
                                    {line.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setVersion(value)} defaultValue="19">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="버전 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            {versionDetails.map((tier) => (
                                <SelectItem key={tier.version} value={tier.version}>
                                    {tier.version}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-row">
                    {firstChampion && (
                        <div className="flex flex-col items-center">
                            <div className="text-lg font-bold">{firstChampion.koreanName}</div>
                            <Image className="rounded-full" alt={firstChampion.koreanName} src={'/champion/' + firstChampion.imageUrl} height={100} width={100} />
                        </div>
                    )}
                    {gameData && (
                        <div className="flex flex-col items-center">
                            <div className="text-lg font-bold">상대 승률</div>
                            <div className="text-sm">승률: {Math.round(gameData.win[0] / (gameData.win[0] + gameData.win[1]) * 100)}%</div>
                            <div className="text-sm">표본수: {gameData.win[0] + gameData.win[1]}</div>
                        </div>
                    )}
                    {secondChampion && (
                        <div className="flex flex-col items-center">
                            <div className="text-lg font-bold">{secondChampion.koreanName}</div>
                            <Image className="rounded-full" alt={secondChampion.koreanName} src={'/champion/' + secondChampion.imageUrl} height={100} width={100} />
                        </div>
                    )}
                </div>
            </div >
        </div>
    );
}

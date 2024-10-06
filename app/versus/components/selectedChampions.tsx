'use client';

import { useState } from "react";
import { champion } from "@/app/data/champion";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import AnalyzeTable from "./analyzeTable";
import Image from "next/image";

export interface LevelUpEvent {
    level: number;
    timestamp: number;
}

export interface FrameData {
    jungleMinionsKilled: number;
    minionsKilled: number;
    totalGold: number;
    xp: number;
}

export interface Challenge {
    damagePerMinute: number;
    damageTakenOnTeamPercentage: number;
    kda: number;
    killParticipation: number;
    legendaryItemUsed: number[];
    soloKills: number;
    teamDamagePercentage: number;
    turretPlatesTaken: number;
}

export interface Participant {
    assists: number;
    challenges: Challenge;
    champExperience: number;
    champLevel: number;
    championName: string;
    damageDealtToBuildings: number;
    deaths: number;
    goldEarned: number;
    individualPosition: string;
    items: number[];
    kills: number;
    magicDamageDealtToChampions: number;
    magicDamageTaken: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    participantId: number;
    riotIdGameName: string;
    riotIdTagline: string;
    summoner1Id: number;
    summoner2Id: number;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    totalMinionsKilled: number;
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    visionScore: number;
    win: boolean;
    levelUpEvents: LevelUpEvent[];
    frameData: FrameData[];
}

export interface MatchData {
    info: {
        gameDuration: number;
        gameEndTimestamp: number;
        gameStartTimestamp: number;
        gameVersion: string;
        participants: Participant[];
    };
    tier: string;
}


interface Props {
    topMatches: string;
    jungleMatches: string;
    middleMatches: string;
    bottomMatches: string;
    utilityMatches: string;
}

const championInfo = champion;

const championsList = Object.values(championInfo.data).map((champ) => ({
    englishName: champ.id,
    koreanName: champ.name,
    imageUrl: '/champion/' + champ.image.full
}));

const roles = [
    { value: 'ALL', label: '전체' },
    { value: 'TOP', label: '탑' },
    { value: 'JUNGLE', label: '정글' },
    { value: 'MIDDLE', label: '미드' },
    { value: 'BOTTOM', label: '원딜' },
    { value: 'UTILITY', label: '서폿' },
]

const tierGroups = [
    { value: 'ALL', label: '전체' },
    { value: 'PART1', label: '아브실골' },
    { value: 'PART2', label: '플에다' },
    { value: 'PART3', label: '마그마챌' }
];

const tierMap: { [key: string]: string[] } = {
    PART1: ['IRON', 'BRONZE', 'SILVER', 'GOLD'],
    PART2: ['PLATINUM', 'EMERALD', 'DIAMOND'],
    PART3: ['MASTER', 'GRANDMASTER', 'CHALLENGER']
};

const calculateWinRate = (matches: MatchData[], championName: string) => {
    const totalMatches = matches.length;
    const wins = matches.reduce((acc, match) => {
        const participant = match.info.participants.find(p => p.championName === championName);
        return acc + (participant && participant.win ? 1 : 0);
    }, 0);
    return totalMatches > 0 ? (wins / totalMatches) * 100 : 0;
};

export default function ChampionSelector({ topMatches, jungleMatches, middleMatches, bottomMatches, utilityMatches }: Props) {
    const [firstChampion, setFirstChampion] = useState<{ koreanName: string; englishName: string; imageUrl: string; } | null>(null);//첫번째챔피언
    const [secondChampion, setSecondChampion] = useState<{ koreanName: string; englishName: string; imageUrl: string; } | null>(null);//두번째챔피언
    const [selectedRole, setSelectedRole] = useState('ALL');//선택한라인
    const [selectedTierGroup, setSelectedTierGroup] = useState('ALL');//선택한티어
    const [isFirstChampionOpen, setIsFirstChampionOpen] = useState(false);
    const [isSecondChampionOpen, setIsSecondChampionOpen] = useState(false);

    const matches: { [key: string]: MatchData[] } = {
        TOP: JSON.parse(topMatches),
        JUNGLE: JSON.parse(jungleMatches),
        MIDDLE: JSON.parse(middleMatches),
        BOTTOM: JSON.parse(bottomMatches),
        UTILITY: JSON.parse(utilityMatches)
    };

    const handleReset = () => {
        setFirstChampion(null);
        setSecondChampion(null);
        setSelectedRole('ALL');
        setSelectedTierGroup('ALL');
    };

    const handleSwapChampions = () => {
        setFirstChampion(secondChampion);
        setSecondChampion(firstChampion);
    };

    const filterMatchesByChampion = (champion: string, role: string, tierGroup: string): MatchData[] => {
        let result: MatchData[] = [];
        Object.entries(matches).forEach(([roleKey, matchArray]) => {
            if (role === 'ALL' || role === roleKey) {
                matchArray.forEach(match => {
                    if ((tierGroup === 'ALL' || tierMap[tierGroup].includes(match.tier)) &&
                        match.info.participants.some(participant => participant.championName === champion)) {
                        result.push(match);
                    }
                });
            }
        });
        return result;
    };

    const filterMatchesByTwoChampions = (champion1: string, champion2: string, role: string, tierGroup: string): MatchData[] => {
        let result: MatchData[] = [];
        Object.entries(matches).forEach(([roleKey, matchArray]) => {
            if (role === 'ALL' || role === roleKey) {
                matchArray.forEach(match => {
                    const hasChampion1 = match.info.participants.some(participant => participant.championName === champion1);
                    const hasChampion2 = match.info.participants.some(participant => participant.championName === champion2);
                    if ((tierGroup === 'ALL' || tierMap[tierGroup].includes(match.tier)) && hasChampion1 && hasChampion2) {
                        result.push(match);
                    }
                });
            }
        });
        return result;
    };

    const firstChampionMatches = firstChampion ? filterMatchesByChampion(firstChampion.englishName, selectedRole, selectedTierGroup) : [];
    const secondChampionMatches = secondChampion ? filterMatchesByChampion(secondChampion.englishName, selectedRole, selectedTierGroup) : [];
    const bothChampionsMatches = (firstChampion && secondChampion) ? filterMatchesByTwoChampions(firstChampion.englishName, secondChampion.englishName, selectedRole, selectedTierGroup) : [];

    const firstChampionWinRate = firstChampion ? calculateWinRate(firstChampionMatches, firstChampion.englishName) : 0;
    const secondChampionWinRate = secondChampion ? calculateWinRate(secondChampionMatches, secondChampion.englishName) : 0;
    const bothChampionsWinRate = (firstChampion && secondChampion) ? calculateWinRate(bothChampionsMatches, firstChampion.englishName) : 0;

    return (
        <div className="flex flex-col items-center space-y-4">
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
                                    {championsList.map((champ) => (
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
                                    {championsList.map((champ) => (
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
            <div className="mt-4 flex items-center space-x-4">
                <Select onValueChange={(value) => setSelectedRole(value)} defaultValue="ALL">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="라인 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                                {role.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setSelectedTierGroup(value)} defaultValue="ALL">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="티어 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        {tierGroups.map((tier) => (
                            <SelectItem key={tier.value} value={tier.value}>
                                {tier.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mt-4 flex items-center space-x-8">
                {firstChampion && (
                    <div className="flex flex-col items-center">
                        <div className="text-lg font-bold">{firstChampion.koreanName}</div>
                        <Image alt={firstChampion.koreanName} src={firstChampion.imageUrl} height={100} width={100} className="rounded-full" />
                        <div className="text-sm">승률: {firstChampionWinRate.toFixed(2)}%</div>
                        <div className="text-sm">표본수: {firstChampionMatches.length}</div>
                    </div>
                )}
                {bothChampionsMatches.length > 0 && (
                    <div className="flex flex-col items-center">
                        <div className="text-lg font-bold">상대 승률</div>
                        <div className="text-sm">승률: {bothChampionsWinRate.toFixed(2)}%</div>
                        <div className="text-sm">표본수: {bothChampionsMatches.length}</div>
                    </div>
                )}
                {secondChampion && (
                    <div className="flex flex-col items-center">
                        <div className="text-lg font-bold">{secondChampion.koreanName}</div>
                        <Image alt={secondChampion.koreanName} src={secondChampion.imageUrl} height={100} width={100} className="rounded-full" />
                        <div className="text-sm">승률: {secondChampionWinRate.toFixed(2)}%</div>
                        <div className="text-sm">표본수: {secondChampionMatches.length}</div>
                    </div>
                )}
            </div>
            <div>
                {/* {bothChampionsMatches && firstChampion && secondChampion && (
                    <AnalyzeTable
                        bothChampionsMatches={bothChampionsMatches}
                        firstChampion={firstChampion?.englishName}
                        secondChampion={secondChampion?.englishName}
                    />
                )} */}
            </div>
        </div>
    );
}

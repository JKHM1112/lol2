'use client'
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import DataTransfer from "./dataTransfer"
import Image from "next/image"
import * as React from "react"
import { runesReforged } from "@/app/data/runesReforged"
import { cn } from "@/lib/utils"
import TotalResult from "./totalResult"
import TeamAnalysis from "./teamAnalysis"
import PersonalAnalysis from "./personalAnalysis"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, Label, LineChart, Line, XAxis, YAxis } from 'recharts';
interface Participant {
    puuid: string;
    participants: Object;
    win: string;
    deaths: number;
    assists: number;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    individualPosition: string;
    championName: string;
}

interface infoType {
    info: any
}


export default function RecentlyResult({ searchedpuuid, recentlyMatchData, recentlyMatchTimeline, tier }: any) {
    
    let winLoses: any[] = []

    function calculateOverallStats(rankResults: infoType[], puuid: string) {
        let wins = 0;
        let losses = 0;
        let totalKills = 0;
        let totalDeaths = 0;
        let totalAssists = 0;
        let count = 0;
        rankResults.forEach(result => {
            const participant = result.info.participants.find((p: any) => p.puuid === searchedpuuid);
            if (participant) {
                if (participant.win) {
                    wins++;
                    winLoses.push({ winOrLose: 'win' });
                }
                else {
                    losses++;
                    winLoses.push({ winOrLose: 'lose' });
                }

                totalKills += participant.kills;
                totalDeaths += participant.deaths;
                totalAssists += participant.assists;
            }
        });
        winLoses.reverse();

        winLoses = winLoses.map(entry => {
            if (entry.winOrLose === 'win') {
                count++;
            } else {
                count--;
            }
            return { ...entry, count: count }
        })

        const kda = totalDeaths === 0 ? (totalKills + totalAssists) : ((totalKills + totalAssists) / totalDeaths).toFixed(2);
        const avgKills = (totalKills / rankResults.length).toFixed(1);
        const avgDeaths = (totalDeaths / rankResults.length).toFixed(1);
        const avgAssists = (totalAssists / rankResults.length).toFixed(1);
        return {
            wins,
            losses,
            winRate: ((wins / rankResults.length) * 100).toFixed(1),
            kda,
            avgKills,
            avgDeaths,
            avgAssists
        };
    }

    function calculateChampionStats(rankResults: infoType[], puuid: string) {
        const championStats: any = {};

        rankResults.forEach(result => {
            const participant = result.info.participants.find((p: any) => p.puuid === puuid);
            if (participant) {
                const { championName, win, kills, deaths, assists } = participant;
                if (!championStats[championName]) {
                    championStats[championName] = { wins: 0, losses: 0, totalKills: 0, totalDeaths: 0, totalAssists: 0, games: 0 };
                }
                championStats[championName].games++;
                if (win) championStats[championName].wins++;
                else championStats[championName].losses++;
                championStats[championName].totalKills += kills;
                championStats[championName].totalDeaths += deaths;
                championStats[championName].totalAssists += assists;
            }
        });

        const sortedChampions = Object.entries(championStats)
            .sort(([, a]: any, [, b]: any) => b.games - a.games)
            .slice(0, 4);

        return sortedChampions.map(([champion, stats]: any) => ({
            champion,
            winRate: ((stats.wins / stats.games) * 100).toFixed(1),
            kda: stats.totalDeaths === 0 ? (stats.totalKills + stats.totalAssists) : ((stats.totalKills + stats.totalAssists) / stats.totalDeaths).toFixed(2),
            ...stats
        }));
    }

    const [activeTab, setActiveTab] = React.useState("TotalResult");
    const [renderCharts, setRenderCharts] = React.useState(false);

    React.useEffect(() => {
        setRenderCharts(true);
    }, []);
    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/itemN/${itemCode}.png`} width={30} height={30} />
    const getChampionImg1 = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/championE/${championCode}.png`} width={40} height={40} />
    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={20} height={20} />
    const allRunes = runesReforged.flatMap((runeGroup: any) => runeGroup.slots.flatMap((slot: any) => slot.runes));

    const findRuneIcon = (runeCode: number) => {
        const rune = allRunes.find((rune: any) => rune.id === runeCode);
        return rune?.icon || '0.png';
    };

    const getRuneImgMark = (runeCode: number) => {
        const rune = runesReforged.find((rune: any) => rune.id === runeCode);
        return rune?.icon || '0.png';
    };

    const createRuneImage1 = (runeCode: string) => (
        <Image className='rounded-md' alt='rune' src={`/${runeCode}`} width={20} height={20} />
    );

    const gameDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return minutes + '분 ' + seconds + '초'
    }

    const positionMapping: { [key: string]: string } = {
        "JUNGLE": "정글",
        "TOP": "탑",
        "BOTTOM": "원딜",
        "MIDDLE": "미드",
        "UTILITY": "서폿"
    };
    const translatePosition = (position: string | undefined) => {
        return position ? positionMapping[position] || position : "";
    }

    const timeSinceGameEnd = (gameEndTime: number): string => {
        const now: Date = new Date();
        const gameEndDate: Date = new Date(gameEndTime);
        const diffInMilliseconds: number = now.getTime() - gameEndDate.getTime();
        const diffInHours: number = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const diffInDays: number = Math.floor(diffInHours / 24);

        if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        } else {
            return `${diffInDays}일 전`;
        }
    }

    const getGrade = (kills: number, deaths: number, assists: number) => {
        return deaths === 0 ? "Perfect" : ((kills + assists) / deaths).toFixed(2);
    }

    const rankResultInfo = recentlyMatchData.map((data: infoType) => data.info);

    const getEventsByParticipantId = (timeline: any, participantId: any) => {
        let allEvents: any = [];
        for (const frame of timeline.info.frames) {
            const events = frame.events || [];
            allEvents = allEvents.concat(events.filter((event: any) => event.participantId === participantId));
        }
        return allEvents;
    }

    const overallStats = calculateOverallStats(recentlyMatchData, searchedpuuid);
    const championStats = calculateChampionStats(recentlyMatchData, searchedpuuid);
    const winLoseData = [
        { name: 'Wins', value: overallStats.wins, fill: '#8884d8' },
        { name: 'Losses', value: overallStats.losses, fill: '#ff7300' }
    ];
    return (
        <div>
            <div className="p-4 bg-orange-300 text-white rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="text-center justify-between items-center">
                        <p className={parseFloat(overallStats.winRate) >= 50 ? "text-blue-500" : "text-red-500"}>승률: {overallStats.winRate}%</p>
                        <p> 승리: {overallStats.wins} 패배: {overallStats.losses}</p>
                    </div>
                    <div className="text-center justify-between items-center">
                        <p>평균 KDA: {overallStats.kda}</p>
                        <p>평균 킬: {overallStats.avgKills}</p>
                        <p>평균 데스: {overallStats.avgDeaths}</p>
                        <p>평균 어시스트: {overallStats.avgAssists}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        {renderCharts && (
                            <>
                                <PieChart width={90} height={90} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                    <Pie data={winLoseData} cx={45} cy={45} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value">
                                        {winLoseData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                        <Label className="p-1" value={overallStats.winRate} position="center" fill="#e74c3c" style={{ fontSize: '18px' }} />
                                    </Pie>
                                </PieChart>
                                <LineChart width={300} height={100} data={winLoses} margin={{ top: 30, right: 0, bottom: 0, left: 0 }}>
                                    <Line type="basis" dataKey="count" stroke="#8884d8" dot={false} />
                                    <YAxis domain={[(dataMin: number) => Math.min(dataMin), (dataMax: number) => Math.max(dataMax)]} />
                                    <XAxis tick={false} axisLine={false}>
                                        <Label value="승패 그래프" position="insideBottom" />
                                    </XAxis>
                                </LineChart>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-4 flex justify-around justify-between items-center">
                    {championStats.map((champ, index) => (
                        <div key={index} className="text-center">
                            <Image className='rounded-md' alt='champion' src={`/championE/${champ.champion}.png`} width={40} height={40} />
                            <p className={parseFloat(champ.winRate) >= 50 ? "text-blue-500" : "text-red-500"}>승률: {champ.winRate}%</p>
                            <p>KDA: {champ.kda}</p>
                            <p>승리: {champ.wins} 패배: {champ.losses}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Accordion type="single" collapsible>
                {rankResultInfo.map((data: any, i: number) => {
                    const participant = data.participants;
                    const blueTeam = participant.slice(0, 5);
                    const redTeam = participant.slice(5, 10);
                    const isBlueTeamWin = blueTeam.some((p: Participant) => p.win);
                    const winTeam = isBlueTeamWin ? blueTeam : redTeam;
                    const loseTeam = isBlueTeamWin ? redTeam : blueTeam;
                    const maxDamageDealt = Math.max(...participant.map((p: Participant) => p.totalDamageDealtToChampions));
                    const maxDamageTaken = Math.max(...participant.map((p: Participant) => p.totalDamageTaken));

                    const rankResultTimeline = recentlyMatchTimeline[i];
                    if (!rankResultTimeline || !rankResultTimeline.info) {
                        return null;
                    }
                    const characterNumber = rankResultTimeline.info.participants.find((p: any) => p.puuid === searchedpuuid)?.participantId;

                    //rankResultTimeline모든 정보가 들어있는 타임라인1
                    const participantsTimeLine1 = getEventsByParticipantId(rankResultTimeline, characterNumber);// 검색된 소환사의 게임 타임라인2

                    return (
                        <AccordionItem style={{ width: '800px', margin: '0 auto' }} className="" key={'item' + i} value={'item' + i}>
                            <AccordionTrigger className={cn("", data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.win ? 'bg-sky-200' : 'bg-rose-200')}>
                                <Table>
                                    <TableBody>
                                        <TableRow className="flex p-2">
                                            <TableCell className="items-center">
                                                <div>
                                                    {(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.win ? "승리" : "패배")}
                                                </div>
                                                <div>
                                                    {translatePosition(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.individualPosition)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="items-center">
                                                <div>
                                                    {gameDuration(data.gameDuration)}
                                                </div>
                                                <div>
                                                    {timeSinceGameEnd(data.gameEndTimestamp)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getChampionImg1(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.championName)}
                                            </TableCell>
                                            <TableCell className="items-center gap-1">
                                                <div className="flex items-center gap-1">
                                                    {getSpellImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.summoner1Id)}
                                                    {createRuneImage1(findRuneIcon(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk))}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {getSpellImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.summoner2Id)}
                                                    {createRuneImage1(getRuneImgMark(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.perks.styles.find((style: any) => style.description === "subStyle")?.style))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="items-center gap-1">
                                                <div className="flex items-center gap-1">
                                                    <div className="items-center">
                                                        {data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.kills}/
                                                        {data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.deaths}/
                                                        {data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.assists}
                                                    </div>
                                                    <div className="items-center">
                                                        평점:
                                                        {getGrade((data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.kills),
                                                            (data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.deaths),
                                                            (data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.assists))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item0)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item1)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item2)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item3)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item4)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item5)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item6)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="flex items-center gap-1">
                                                <DataTransfer participant={rankResultInfo} i={i} puuid={searchedpuuid} tier={tier} rankResultTimeline={rankResultTimeline} characterNumber={characterNumber} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </AccordionTrigger>
                            <Accordion type="single" collapsible>
                                <AccordionContent className="bg-green-100">
                                    <Button className="" onClick={() => setActiveTab("TotalResult")}>TotalResult</Button>
                                    <Button className="" onClick={() => setActiveTab("TeamAnalysis")}>TeamAnalysis</Button>
                                    <Button className="" onClick={() => setActiveTab("personalAnalysis")}>personalAnalysis</Button>
                                    {activeTab === "TotalResult" && (
                                        <TotalResult winTeam={winTeam} loseTeam={loseTeam} maxDamageDealt={maxDamageDealt} maxDamageTaken={maxDamageTaken} allRunes={allRunes} runesReforged={runesReforged} />
                                    )}
                                    {activeTab === "TeamAnalysis" && (
                                        <TeamAnalysis winTeam={winTeam} loseTeam={loseTeam} />
                                    )}{activeTab === "personalAnalysis" && (
                                        <PersonalAnalysis participantsTimeLine1={participantsTimeLine1} championName={data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.championName} />
                                    )}
                                </AccordionContent>
                            </Accordion>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div >
    )
}
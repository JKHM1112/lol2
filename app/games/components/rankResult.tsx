'use client'
import * as React from "react"
import { PieChart, Pie, Cell, Label, ResponsiveContainer, BarChart, Bar, XAxis, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { runesReforged } from "@/app/data/runesReforged"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import TotalResult from "@/app/games/components/totalResult";
import TeamAnalysis from "@/app/games/components/teamAnalysis";
import PersonalAnalysis from "@/app/games/components/personalAnalysis";
import DataTransfer from "@/app/games/components/dataTransfer";
import Link from "next/link";

interface infoType {
    info: any
}

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


interface PlayerData {
    name: string;
    kills?: number;
    totalDamageDealtToChampions?: number;
    totalDamageTaken?: number;
    goldEarned?: number;
    cs?: number;
    damageDealtToBuildings?: number;
}

export default function RankResult({ searchedpuuid, rankResults, rankResultTimelines, queue, tier }: any) {
    let winLoses = []
    let initialPositionStats = [
        { name: 'TOP', win: 0, lose: 0 },
        { name: 'JUNGLE', win: 0, lose: 0 },
        { name: 'MIDDLE', win: 0, lose: 0 },
        { name: 'BOTTOM', win: 0, lose: 0 },
        { name: 'UTILITY', win: 0, lose: 0 },
    ];
    const rankResultInfo = rankResults.map((data: infoType) => data.info);


    // 포지션별 승리 또는 패배 기록 함수
    const updatePositionStats = (positionName: string, isWin: boolean) => {
        const position = initialPositionStats.find((pos: any) => pos.name === positionName);
        if (position) {
            isWin ? position.win++ : position.lose++;
        }
    };

    const calculateOverallStats = (rankResults: infoType[], puuid: string) => {
        let wins = 0, losses = 0, totalKills = 0, totalDeaths = 0, totalAssists = 0, count = 0;

        rankResults.forEach(result => {
            const participant = result.info.participants.find((p: any) => p.puuid === puuid);

            if (participant) {
                const { individualPosition, win, kills, deaths, assists } = participant;

                win ? wins++ : losses++;
                winLoses.push({ winOrLose: win ? 'win' : 'lose' });

                totalKills += kills;
                totalDeaths += deaths;
                totalAssists += assists;

                updatePositionStats(individualPosition, win);
            }
        });

        const winRate = ((wins / rankResults.length) * 100).toFixed(1);
        const kda = totalDeaths === 0 ? (totalKills + totalAssists) : ((totalKills + totalAssists) / totalDeaths).toFixed(2);
        const avgKills = (totalKills / rankResults.length).toFixed(1);
        const avgDeaths = (totalDeaths / rankResults.length).toFixed(1);
        const avgAssists = (totalAssists / rankResults.length).toFixed(1);

        return { wins, losses, winRate, kda, avgKills, avgDeaths, avgAssists };
    };

    const calculateChampionStats = (rankResults: infoType[], puuid: string) => {
        const championStats: any = {};

        rankResults.forEach(result => {
            const participant = result.info.participants.find((p: any) => p.puuid === puuid);

            if (participant) {
                const { championName, win, kills, deaths, assists } = participant;
                if (!championStats[championName]) {
                    championStats[championName] = { wins: 0, losses: 0, totalKills: 0, totalDeaths: 0, totalAssists: 0, games: 0 };
                }
                championStats[championName].games++;
                win ? championStats[championName].wins++ : championStats[championName].losses++;
                championStats[championName].totalKills += kills;
                championStats[championName].totalDeaths += deaths;
                championStats[championName].totalAssists += assists;
            }
        });

        return Object.entries(championStats)
            .sort(([, a]: any, [, b]: any) => b.games - a.games)
            .slice(0, 3)
            .map(([champion, stats]: any) => ({
                champion,
                winRate: ((stats.wins / stats.games) * 100).toFixed(1),
                kda: stats.totalDeaths === 0 ? (stats.totalKills + stats.totalAssists) : ((stats.totalKills + stats.totalAssists) / stats.totalDeaths).toFixed(2),
                ...stats
            }));
    };

    const overallStats = calculateOverallStats(rankResults, searchedpuuid);
    const championStats = calculateChampionStats(rankResults, searchedpuuid);
    const winLoseData = [
        { name: 'Wins', value: overallStats.wins, fill: '#0000FF' },
        { name: 'Losses', value: overallStats.losses, fill: '#FF0040' }
    ];

    const [activeTab, setActiveTab] = React.useState("TotalResult");



    const allRunes = runesReforged.flatMap((runeGroup: any) => runeGroup.slots.flatMap((slot: any) => slot.runes));

    //아이템 번호를 가지고 이미지로 바꿔준다.
    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/item/${itemCode}.png`} width={30} height={30} />
    //챔피언 영문으로 이미지로 바꿔준다.
    const getChampionImg1 = (championCode: string, widthN: number, heightN: number) => <Image className='m-1 rounded-md' alt={'champion1'} src={`/champion/${championCode}.png`} width={widthN} height={heightN} />
    //spell 영문으로 이미지로 바꿔준다.
    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={24} height={24} />

    //rune icon 번호를 영문으로 변환후 이미지로 바꿔준다.
    const findRuneIcon = (runeCode: number) => { const rune = allRunes.find((rune: any) => rune.id === runeCode); return <Image className='rounded-md' alt='rune' src={`/${rune?.icon}`} width={24} height={24} /> || '0.png'; };

    //rune 테마 번호를 영문으로 변환후 이미지로 바꿔준다.
    const getRuneImgMark = (runeCode: number) => { const rune = runesReforged.find((rune: any) => rune.id === runeCode); return <Image className='rounded-md' alt='rune' src={`/${rune?.icon}`} width={24} height={24} /> || '0.png'; };

    //게임 진행 시간 계산
    const gameDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return minutes + '분 ' + seconds + '초'
    }

    //몇일 전 게임인지 계산
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

    //kda계산
    const getGrade = (kda: { kills: number, deaths: number, assists: number }) => {
        return kda.deaths === 0 ? "Perfect" : ((kda.kills + kda.assists) / kda.deaths).toFixed(2);
    }

    const getEventsByParticipantId = (timeline: any, participantId: any) => {
        let allEvents: any = [];
        for (const frame of timeline.info.frames) {
            const events = frame.events || [];
            allEvents = allEvents.concat(events.filter((event: any) => event.participantId === participantId));
        }
        return allEvents;
    }

    return (
        <div className="">
            <div className="flex">
                {/*20게임 전적 통합*/}
                <div className="w-[280px] h-[115px] bg-white rounded-lg shadow-md m-1">
                    <div className="flex justify-around">
                        <PieChart width={90} height={95} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <Pie data={winLoseData} cx={45} cy={45} innerRadius={25} fill="#0000FF" paddingAngle={5} dataKey="value">
                                {winLoseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                                <Label className="p-1" value={overallStats.winRate} position="center" fill="#FF0040" style={{ fontSize: '18px' }} />
                            </Pie>
                        </PieChart>
                        <div className="place-content-center">
                            <p className="text-[14px] font-bold">{overallStats.wins + overallStats.losses}게임</p>
                            <p className="text-[12px]">  {overallStats.wins}승 {overallStats.losses}패</p>
                        </div>
                        <div className="place-content-center">
                            <p className="text-[12px]">{overallStats.kda} KDA</p>
                            <p className="text-[12px]">{overallStats.avgKills} / {overallStats.avgDeaths} / {overallStats.avgAssists}</p>
                        </div>
                    </div>
                </div>
                {/*최근 많이 플레이한 챔피언*/}
                <div className="w-[160px] h-[115px] bg-white rounded-lg shadow-md m-2">
                    <p className=" ml-2 text-[11px]">최근 많이 플레이한 챔피언</p>
                    {championStats.map((champ, index) => (
                        <div key={index} className="flex ml-2">
                            <div>
                                <Image className="rounded-md mt-1 mr-2" alt='champion' src={`/champion/${champ.champion}.png`} width={25} height={25} />
                            </div>
                            <div>
                                <div className="flex">
                                    <p className="text-[10px] pr-1">{champ.wins}승{champ.losses}패 </p>
                                    <p className={parseFloat(champ.winRate) >= 50 ? "text-blue-500 text-[10px]" : "text-red-500 text-[10px]"}> 승률: {champ.winRate}%</p>
                                </div>
                                <p className="text-[10px]">KDA: {champ.kda}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/*포지션 분포도*/}
                <div className="w-[200px] h-[115px] bg-white rounded-lg shadow-md m-2">
                    <p className=" ml-2 text-[11px]">포지션 분포도</p>
                    <ResponsiveContainer width="100%" height="70%">
                        <BarChart width={200} height={70} data={initialPositionStats} margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
                            <Bar dataKey="win" fill="#0000FF" />
                            <Bar dataKey="lose" fill="#FF0040" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between w-[185px]">
                        {['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'].map((position, index) => (
                            <Image key={index} className="ml-4" alt={position} src={`/line/${position}.png`} width={15} height={15} />
                        ))}
                    </div>
                </div>
            </div>

            {/*하단에 20개 게임 전적 검색 */}
            <Accordion className="w-[670px]" type="single" collapsible>
                {rankResultInfo.map((data: any, i: number) => {
                    const participant = data.participants;
                    const blueTeam = participant.slice(0, 5);
                    const redTeam = participant.slice(5, 10);
                    const isBlueTeamWin = blueTeam.some((p: Participant) => p.win);
                    const winTeam = isBlueTeamWin ? blueTeam : redTeam;
                    const loseTeam = isBlueTeamWin ? redTeam : blueTeam;
                    const maxDamageDealt = Math.max(...participant.map((p: Participant) => p.totalDamageDealtToChampions));
                    const maxDamageTaken = Math.max(...participant.map((p: Participant) => p.totalDamageTaken));
                    const rankResultTimeline = rankResultTimelines[i];
                    if (!rankResultTimeline || !rankResultTimeline.info) {
                        return null;
                    }
                    const characterParticipantId = rankResultTimeline.info.participants.find((p: any) => p.puuid === searchedpuuid)?.participantId;

                    //내 챔피언 이름
                    const championName = data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.championName
                    //randarChart 계산1
                    const allPlayers: any = [...winTeam, ...loseTeam].map(player => ({
                        name: player.championName,
                        kills: player.kills,
                        totalDamageDealtToChampions: player.totalDamageDealtToChampions,
                        totalDamageTaken: player.totalDamageTaken,
                        goldEarned: player.goldEarned,
                        totalMinionsKilled: player.totalMinionsKilled + player.neutralMinionsKilled,
                        damageDealtToBuildings: player.damageDealtToBuildings,
                        img: `/champion/${player.championName}.png`
                    }));
                    //randarChart 계산2
                    const rankMetric = (array: PlayerData[], key: keyof PlayerData) => {
                        array.sort((a, b) => ((b[key] as number) || 0) - ((a[key] as number) || 0)).reverse();
                        return array.findIndex(player => player.name === championName) + 1;
                    };
                    //randarChart 계산3
                    const rankings = [
                        { name: '킬', rank: rankMetric(allPlayers, 'kills'), fullMark: 10, },
                        { name: '받은피해량', rank: rankMetric(allPlayers, 'totalDamageDealtToChampions'), fullMark: 10, },
                        { name: '골드', rank: rankMetric(allPlayers, 'totalDamageTaken'), fullMark: 10, },
                        { name: '포탑에가한피해량', rank: rankMetric(allPlayers, 'goldEarned'), fullMark: 10, },
                        { name: '미니언', rank: rankMetric(allPlayers, 'cs'), fullMark: 10, },
                        { name: '가한피해량', rank: rankMetric(allPlayers, 'damageDealtToBuildings'), fullMark: 10, },
                    ];

                    // 검색된 소환사의 게임 타임라인
                    const participantsTimeLine = getEventsByParticipantId(rankResultTimeline, characterParticipantId);

                    return (
                        <AccordionItem className="w-[670px] ml-1" key={'item' + i} value={'item' + i}>
                            <AccordionTrigger className={cn("rounded-md h-[110px]", data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.win ? 'bg-blue-100 border-l-4 border-blue-400 pl-1' : 'bg-red-100 border-l-4 border-red-400 pl-1')}>
                                <div className="w-full caption-bottom text-sm">
                                    <div className="flex">
                                        <div>
                                            <div className={cn("", data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.win ? 'text-[12px] text-blue-500' : 'text-[12px] text-red-500')}>
                                                {queue == 420 ? '솔로랭크' : '자유랭크'}
                                            </div>
                                            <div className="text-[10px] ">
                                                {timeSinceGameEnd(data.gameEndTimestamp)}
                                            </div>
                                            <div className={cn("", data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.win ? 'text-[12px] text-blue-500' : 'text-[12px] text-red-500')}>
                                                {(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.win ? "승리" : "패배")}
                                            </div>
                                            <div className="text-[10px]">
                                                {gameDuration(data.gameDuration)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                {getChampionImg1(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.championName, 50, 50)}
                                                <div className="flex m-1">
                                                    <div className="items-center gap-1">
                                                        {getSpellImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.summoner1Id)}
                                                        {getSpellImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.summoner2Id)}
                                                    </div>
                                                    <div className="items-center gap-1">
                                                        {findRuneIcon(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk)}
                                                        {getRuneImgMark(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.perks.styles.find((style: any) => style.description === "subStyle")?.style)}
                                                    </div>
                                                </div>
                                                <div className="items-center m-2">
                                                    <div className="flex ">
                                                        {data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.kills}/
                                                        {data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.deaths}/
                                                        {data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.assists}
                                                    </div>
                                                    <div className="flex no-underline">
                                                        {getGrade((data.participants.find((p: Participant) => p.puuid === searchedpuuid)))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item0)}
                                                {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item1)}
                                                {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item2)}
                                                {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item3)}
                                                {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item4)}
                                                {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item5)}
                                                {getItemImg(data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.item6)}
                                            </div>
                                        </div>

                                        {/*내 게임 평가*/}
                                        <div className="pl-2 pr-2">
                                            <ResponsiveContainer width={140} height={100}>
                                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={rankings} margin={{ top: 0, right: 30, bottom: 0, left: 30 }}>
                                                    <PolarGrid />
                                                    <PolarAngleAxis dataKey="name" fontSize={8} />
                                                    <Radar name="Performance" dataKey="rank" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>


                                        {/*챔피언 5vs5 */}
                                        <div className="pr-4">
                                            <div className="flex">
                                                <div>
                                                    {blueTeam.slice(0, 5).map((player: any, index: number) => (
                                                        <div key={index} className="flex items-center">
                                                            <div>{getChampionImg1(player.championName, 12, 12)}</div>
                                                            <Link className="w-[48px] text-[12px] truncate overflow-hidden text-left " href={`/games/${player.riotIdGameName}-${player.riotIdTagline}`}>
                                                                {player.riotIdGameName}
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div>
                                                    {redTeam.slice(0, 5).map((player: any, index: number) => (
                                                        <div key={index} className="flex items-center">
                                                            <div>{getChampionImg1(player.championName, 12, 12)}</div>
                                                            <Link className="w-[48px] text-[12px] truncate overflow-hidden text-left" href={`/games/${player.riotIdGameName}-${player.riotIdTagline}`}>
                                                                {player.riotIdGameName}
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-center space-y-2">
                                            <DataTransfer participant={rankResultInfo} i={i} puuid={searchedpuuid} tier={tier} rankResultTimeline={rankResultTimeline} characterParticipantId={characterParticipantId} participantsTimeLine={participantsTimeLine} />
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>

                            {/*안에 내용 보여줄것*/}
                            <Accordion type="single" collapsible>
                                <AccordionContent className="bg-gray-100 pb-1">
                                    <div className="mt-1 mb-1 ">
                                        <Button className="mr-4 bg-white text-black border-2 hover:bg-gray-200" onClick={() => setActiveTab("TotalResult")}>종합 결과</Button>
                                        <Button className="mr-4 bg-white text-black border-2 hover:bg-gray-200" onClick={() => setActiveTab("TeamAnalysis")}>팀 분석</Button>
                                        <Button className="mr-4 bg-white text-black border-2 hover:bg-gray-200" onClick={() => setActiveTab("personalAnalysis")}>개인 분석</Button>
                                    </div>
                                    {activeTab === "TotalResult" && (
                                        <TotalResult winTeam={winTeam} loseTeam={loseTeam} maxDamageDealt={maxDamageDealt} maxDamageTaken={maxDamageTaken} allRunes={allRunes} runesReforged={runesReforged} />
                                    )}
                                    {activeTab === "TeamAnalysis" && (
                                        <TeamAnalysis allPlayers={allPlayers} gameResult={data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.win ? 'win' : 'lose'} />
                                    )}{activeTab === "personalAnalysis" && (
                                        <PersonalAnalysis participantsTimeLine={participantsTimeLine} championName={championName} runesReforged={runesReforged} />
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

'use client'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import DataTransfer from "./dataTransfer"
import Image from "next/image"
import * as React from "react"
import { runesReforged } from "@/app/data/runesReforged"
import { cn } from "@/lib/utils"
import TotalResult from "./totalResult" // import the new component
import TeamAnalysis from "./teamAnalysis" // import the new component
import { Button } from "@/components/ui/button"

interface Participant {
    puuid: string;
    participants: Object;
    win: string;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
}

interface infoType {
    info: Object
}

export default function RankResult({ rankResult, puuid }: any) {
    const [activeTab, setActiveTab] = React.useState("TotalResult");

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

    const rankResultInfo = rankResult.map((data: infoType) => data.info)
    return (
        <div>
            <Accordion type="single" collapsible >
                {rankResultInfo.map((data: any, i: number) => {
                    const participant = data.participants
                    const blueTeam = participant.slice(0, 5);
                    const redTeam = participant.slice(5, 10);
                    const isBlueTeamWin = blueTeam.some((p: Participant) => p.win);
                    const winTeam = isBlueTeamWin ? blueTeam : redTeam;
                    const loseTeam = isBlueTeamWin ? redTeam : blueTeam;
                    const maxDamageDealt = Math.max(...participant.map((p: Participant) => p.totalDamageDealtToChampions));
                    const maxDamageTaken = Math.max(...participant.map((p: Participant) => p.totalDamageTaken));
                    return (
                        <AccordionItem style={{ width: '800px', margin: '0 auto' }} className="" key={'item' + i} value={'item' + i} >
                            <AccordionTrigger className={cn("", data.participants.find((p: Participant) => p.puuid === puuid)?.win ? 'bg-sky-200' : 'bg-rose-200')}>
                                <Table>
                                    <TableBody >
                                        <TableRow className="flex p-2" >
                                            <TableCell className="items-center">
                                                <div>
                                                    {(data.participants.find((p: Participant) => p.puuid === puuid)?.win ? "승리" : "패배")}
                                                </div>
                                                <div>
                                                    {translatePosition(data.participants.find((p: Participant) => p.puuid === puuid)?.individualPosition)}
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
                                                {getChampionImg1(data.participants.find((p: Participant) => p.puuid === puuid)?.championName)}
                                            </TableCell>
                                            <TableCell className="items-center gap-1">
                                                <div className="flex items-center gap-1">
                                                    {getSpellImg(data.participants.find((p: Participant) => p.puuid === puuid)?.summoner1Id)}
                                                    {createRuneImage1(findRuneIcon(data.participants.find((p: Participant) => p.puuid === puuid)?.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk))}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {getSpellImg(data.participants.find((p: Participant) => p.puuid === puuid)?.summoner2Id)}
                                                    {createRuneImage1(getRuneImgMark(data.participants.find((p: Participant) => p.puuid === puuid)?.perks.styles.find((style: any) => style.description === "subStyle")?.style))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="items-center gap-1">
                                                <div className="flex items-center gap-1">
                                                    <div className="items-center">
                                                        {data.participants.find((p: Participant) => p.puuid === puuid)?.kills}/
                                                        {data.participants.find((p: Participant) => p.puuid === puuid)?.deaths}/
                                                        {data.participants.find((p: Participant) => p.puuid === puuid)?.assists}
                                                    </div>
                                                    <div className="items-center">
                                                        평점:
                                                        {getGrade((data.participants.find((p: Participant) => p.puuid === puuid)?.kills),
                                                            (data.participants.find((p: Participant) => p.puuid === puuid)?.deaths),
                                                            (data.participants.find((p: Participant) => p.puuid === puuid)?.assists))
                                                        } : 1
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === puuid)?.item0)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === puuid)?.item1)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === puuid)?.item2)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === puuid)?.item3)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === puuid)?.item4)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === puuid)?.item5)}
                                                    {getItemImg(data.participants.find((p: Participant) => p.puuid === puuid)?.item6)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="flex items-center gap-1">
                                                <DataTransfer participant={rankResultInfo} i={i} puuid={puuid} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </AccordionTrigger>
                            <Accordion type="single" collapsible >
                                <AccordionContent className="bg-green-100">
                                    <Button className="" onClick={() => setActiveTab("TotalResult")}>TotalResult</Button>
                                    <Button className="" onClick={() => setActiveTab("TeamAnalysis")}>TeamAnalysis</Button>
                                    {activeTab === "TotalResult" && (
                                        <TotalResult winTeam={winTeam} loseTeam={loseTeam} maxDamageDealt={maxDamageDealt} maxDamageTaken={maxDamageTaken} allRunes={allRunes} runesReforged={runesReforged} />
                                    )}
                                    {activeTab === "TeamAnalysis" && (
                                        <TeamAnalysis winTeam={winTeam} loseTeam={loseTeam} />
                                    )}
                                </AccordionContent>
                            </Accordion>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}

'use client'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import Image from "next/image"
import * as React from "react"
import { runesReforged } from "@/app/data/runesReforged"
import { Button } from "@/components/ui/button"
import TotalResult from "./totalResult"
import TeamAnalysis from "./teamAnalysis"

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

export default function AramResult({ aramResults, searchedpuuid }: any) {
    const [activeTab, setActiveTab] = React.useState("TotalResult");
    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/itemN/${itemCode}.png`} width={30} height={30} />
    const getChampionImg1 = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/championE/${championCode}.png`} width={40} height={40} />
    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={20} height={20} />

    const allRunes = runesReforged.flatMap((runeGroup: any) => runeGroup.slots.flatMap((slot: any) => slot.runes));
    //runesReforgedOld의 모든 룬을 하나의 배열로 만듦

    const findRuneIcon = (runeCode: number) => {
        const rune = allRunes.find((rune: any) => rune.id === runeCode);
        return rune?.icon || '0.png';
    };//특정 룬 코드에 해당하는 룬의 아이콘을 반환하는 함수

    const getRuneImgMark = (runeCode: number) => {
        const rune = runesReforged.find((rune: any) => rune.id === runeCode);
        return rune?.icon || '0.png';
    };//마크 코드에 해당하는 룬의 아이콘으로 반환하는 함수
    const createRuneImage1 = (runeCode: string) => (
        <Image className='rounded-md' alt='rune' src={`/${runeCode}`} width={20} height={20} />
    );//주어진 아이콘 경로를 사용하여 <Image> 컴포넌트를 반환하는 함수

    const gameDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return minutes + '분 ' + seconds + '초'
    }//duration 분/초로 변환

    const positionMapping: { [key: string]: string } = {
        "Invalid": "칼바락 나락"
    };
    const translatePosition = (position: string | undefined) => {
        return position ? positionMapping[position] || position : "";
    }//position영문을 한글명으로 변환시킨다.

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

    const aramResultInfo = aramResults.map((data: infoType) => data.info)
    return (
        <div>
            <Accordion type="single" collapsible >
                {aramResultInfo.map((data: any, i: number) => {
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
                            <AccordionTrigger className={data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.win ? 'bg-sky-200' : 'bg-rose-200'}>
                                <Table>
                                    <TableBody>
                                        <TableRow className="flex" >
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
                                                            (data.participants.find((p: Participant) => p.puuid === searchedpuuid)?.assists))
                                                        } : 1
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

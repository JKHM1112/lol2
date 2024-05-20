'use client'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { runesReforgedOld } from "@/app/data/runesReforgedOld"
import Image from "next/image"
import * as React from "react"
import { Progress } from "@/components/ui/progress"

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

export default function AramResult({ aramResult, puuid }: any) {

    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/itemN/${itemCode}.png`} width={35} height={35} />
    const getChampionImg1 = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/championE/${championCode}.png`} width={50} height={50} />
    const getChampionImg2 = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/championE/${championCode}.png`} width={50} height={50} />
    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={25} height={25} />

    const array: any = []
    const allRunes = runesReforgedOld.flatMap((runeGroup: any) => runeGroup.slots.flatMap((slot: any) => slot.runes));
    //runesReforgedOld의 모든 룬을 하나의 배열로 만듦

    const findRuneIcon = (runeCode: number) => {
        const rune = allRunes.find((rune: any) => rune.id === runeCode);
        return rune ? rune.icon : null;
    };//특정 룬 코드에 해당하는 룬의 아이콘을 반환하는 함수

    const getRuneImgMark = (runCode: number) => {
        return array.concat(runesReforgedOld.map((rune: any) => rune)).find((rune: any) => rune.id == runCode).icon
    };//마크 코드에 해당하는 룬의 아이콘으로 반환하는 함수

    const createRuneImage1 = (runeCode: string) => (
        <Image className='rounded-md' alt='rune' src={`/${runeCode}`} width={25} height={25} />
    );//주어진 아이콘 경로를 사용하여 <Image> 컴포넌트를 반환하는 함수
    const createRuneImage2 = (runeCode: string) => (
        <Image className='rounded-md' alt='rune' src={`/${runeCode}`} width={25} height={25} />
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

    const aramResultInfo = aramResult.map((data: infoType) => data.info)
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
                        <AccordionItem key={'item' + i} value={'item' + i} >
                            <AccordionTrigger className={data.participants.find((p: Participant) => p.puuid === puuid)?.win ? 'bg-sky-200' : 'bg-rose-200'}>
                                <Table>
                                    <TableBody>
                                        <TableRow className="flex" >
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
                                                기타정보
                                            </TableCell>
                                            <TableCell className="flex items-center gap-1">
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-sky-200">
                                            <TableHead>승리(블루팀)</TableHead>
                                            <TableHead>K/D/A</TableHead>
                                            <TableHead>피해량</TableHead>
                                            <TableHead>아이템</TableHead>
                                            <TableHead>기타등등</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {winTeam.map((data: any, i: number) => (
                                            <TableRow key={data.puuid} className="bg-sky-100">
                                                <TableCell className="flex text-center gap-1">
                                                    <div className="flex items-center gap-1">
                                                        {getChampionImg1(data.championName)}
                                                    </div>
                                                    <div className=" items-center gap-1">
                                                        {getSpellImg(data.summoner1Id)}
                                                        {getSpellImg(data.summoner2Id)}
                                                    </div>
                                                    <div className=" items-center gap-1">
                                                        {createRuneImage1(findRuneIcon(data.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk))}
                                                        {createRuneImage1(getRuneImgMark(data.perks.styles.find((style: any) => style.description === "subStyle")?.style))}
                                                    </div>
                                                    <div>
                                                        {data.riotIdGameName}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className=" items-center gap-1">
                                                        {(data.kills)}/{(data.deaths)}/{(data.assists)}
                                                    </div>
                                                    <div className=" items-center gap-1">
                                                        {getGrade((data.kills), (data.deaths), (data.assists))} : 1
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div>
                                                            {data.totalDamageDealtToChampions}
                                                        </div>
                                                        <div>
                                                            <Progress indicatorColor="bg-red-500" className="w-full" value={(data.totalDamageDealtToChampions / maxDamageDealt * 100)} max={maxDamageDealt} />
                                                        </div>
                                                        <div>
                                                            {data.totalDamageTaken}
                                                        </div>
                                                        <Progress indicatorColor="bg-blue-500" className="w-full" value={(data.totalDamageTaken / maxDamageTaken * 100)} max={maxDamageTaken} />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        {getItemImg(data.item0)}
                                                        {getItemImg(data.item1)}
                                                        {getItemImg(data.item2)}
                                                        {getItemImg(data.item3)}
                                                        {getItemImg(data.item4)}
                                                        {getItemImg(data.item5)}
                                                        {getItemImg(data.item6)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow className="bg-rose-200">
                                            <TableHead>패배(레드팀)</TableHead>
                                            <TableHead>K/D/A</TableHead>
                                            <TableHead>피해량</TableHead>
                                            <TableHead>아이템</TableHead>
                                            <TableHead>기타등등</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loseTeam.map((data: any, i: number) => (
                                            <TableRow key={data.puuid} className="bg-rose-100">
                                                <TableCell className="flex text-center gap-1">
                                                    <div className="flex items-center gap-1">
                                                        {getChampionImg1(data.championName)}
                                                    </div>
                                                    <div className=" items-center gap-1">
                                                        {getSpellImg(data.summoner1Id)}
                                                        {getSpellImg(data.summoner2Id)}
                                                    </div>
                                                    <div className=" items-center gap-1">
                                                        {createRuneImage1(findRuneIcon(data.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk))}
                                                        {createRuneImage1(getRuneImgMark(data.perks.styles.find((style: any) => style.description === "subStyle")?.style))}
                                                    </div>
                                                    <div>
                                                        {data.riotIdGameName}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className=" items-center gap-1">
                                                        {(data.kills)}/{(data.deaths)}/{(data.assists)}
                                                    </div>
                                                    <div className=" items-center gap-1">
                                                        {getGrade((data.kills), (data.deaths), (data.assists))} : 1
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div>
                                                            {data.totalDamageDealtToChampions}
                                                        </div>
                                                        <div>
                                                            <Progress indicatorColor="bg-red-500" className="w-full" value={(data.totalDamageDealtToChampions / maxDamageDealt * 100)} max={maxDamageDealt} />
                                                        </div>
                                                        <div>
                                                            {data.totalDamageTaken}
                                                        </div>
                                                        <Progress indicatorColor="bg-blue-500" className="w-full" value={(data.totalDamageTaken / maxDamageTaken * 100)} max={maxDamageTaken} />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        {getItemImg(data.item0)}
                                                        {getItemImg(data.item1)}
                                                        {getItemImg(data.item2)}
                                                        {getItemImg(data.item3)}
                                                        {getItemImg(data.item4)}
                                                        {getItemImg(data.item5)}
                                                        {getItemImg(data.item6)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    룬 버튼
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}

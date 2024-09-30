import React from 'react';
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import RuneBox from "@/app/games/components/runeBox";
import Image from "next/image";
import { Accordion, AccordionContent } from '@/components/ui/accordion';
import Link from 'next/link';



export default function TotalResult({ winTeam, loseTeam, maxDamageDealt, maxDamageTaken, allRunes, runesReforged }: any) {
    console.log(loseTeam)
    //아이템 번호를 가지고 이미지로 바꿔준다.
    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/item/${itemCode}.png` || `/0.png`} width={30} height={30} />
    //챔피언 영문으로 이미지로 바꿔준다.
    const getChampionImg1 = (championCode: string) => <Image className='m-1 rounded-md' alt={'champion1'} src={`/champion/${championCode}.png` || `/0.png`} width={50} height={50} />
    //spell 영문으로 이미지로 바꿔준다.
    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png` || `/0.png`} width={24} height={24} />

    //rune icon 번호를 영문으로 변환후 이미지로 바꿔준다.
    const findRuneIcon = (runeCode: number, allRunes: any) => {
        const rune = allRunes.find((rune: any) => rune.id === runeCode);
        const iconSrc = rune ? `/${rune.icon}` : '/0.png'; // 룬을 찾지 못하면 기본 이미지로 설정
        return <Image className='rounded-md' alt='rune' src={iconSrc} width={24} height={24} />
    }
    
    //rune 테마 번호를 영문으로 변환후 이미지로 바꿔준다.
    const getRuneImgMark = (runeCode: number, runesReforged: any) => {
        const rune = runesReforged.find((rune: any) => rune.id === runeCode);
        return <Image className='rounded-md' alt='rune' src={`/${rune.icon}`} width={20} height={20} /> || '0.png';
    };

    //kda 계산
    const getGrade = (kills: number, deaths: number, assists: number) => {
        return deaths === 0 ? "Perfect" : ((kills + assists) / deaths).toFixed(2);
    };

    return (
        <Accordion type="single" collapsible >
            <AccordionContent>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-sky-200 hover:bg-sky-200 text-[12px]">
                            <TableHead>승리팀</TableHead>
                            <TableHead>K/D/A</TableHead>
                            <TableHead>가한 피해량</TableHead>
                            <TableHead>받은 피해량</TableHead>
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
                                    <div className=" items-center pt-1">
                                        {getSpellImg(data.summoner1Id)}
                                        {getSpellImg(data.summoner2Id)}
                                    </div>
                                    <div className=" items-center pt-2">
                                        {(findRuneIcon(data.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk, allRunes))}
                                        {(getRuneImgMark(data.perks.styles.find((style: any) => style.description === "subStyle")?.style, runesReforged))}
                                    </div>
                                    <div className='w-[72px] text-[12px] truncate overflow-hidden text-left pt-4'>
                                        <Link href={`/games/${data.riotIdGameName}-${data.riotIdTagline}`}>{data.riotIdGameName}</Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className=" items-center ">
                                        {(data.kills)}/{(data.deaths)}/{(data.assists)}
                                    </div>
                                    <div className=" items-center ">
                                        {getGrade((data.kills), (data.deaths), (data.assists))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div>
                                        {data.totalDamageDealtToChampions}
                                    </div>
                                    <div>
                                        <Progress indicatorColor="bg-rose-500" className="h-1 w-15" value={(data.totalDamageDealtToChampions / maxDamageDealt * 100)} max={maxDamageDealt} />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div>
                                        {data.totalDamageTaken}
                                    </div>
                                    <div>
                                        <Progress indicatorColor="bg-sky-500" className="h-1 w-15" value={(data.totalDamageTaken / maxDamageTaken * 100)} max={maxDamageTaken} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
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
                                    <RuneBox gameData={winTeam} i={i} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableHeader>
                        <TableRow className="bg-rose-200 hover:bg-rose-200 text-[12px]">
                            <TableHead>패배팀</TableHead>
                            <TableHead>K/D/A</TableHead>
                            <TableHead>가한 피해량</TableHead>
                            <TableHead>받은 피해량</TableHead>
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
                                    <div className=" items-center pt-1">
                                        {getSpellImg(data.summoner1Id)}
                                        {getSpellImg(data.summoner2Id)}
                                    </div>
                                    <div className=" items-center pt-2">
                                        {(findRuneIcon(data.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk, allRunes))}
                                        {(getRuneImgMark(data.perks.styles.find((style: any) => style.description === "subStyle")?.style, runesReforged))}
                                    </div>
                                    <div className='w-[72px] text-[12px] truncate overflow-hidden text-left pt-4'>
                                        <Link href={`/games/${data.riotIdGameName}-${data.riotIdTagline}`}>{data.riotIdGameName}</Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className=" items-center ">
                                        {(data.kills)}/{(data.deaths)}/{(data.assists)}
                                    </div>
                                    <div className=" items-center ">
                                        {getGrade((data.kills), (data.deaths), (data.assists))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div>
                                        {data.totalDamageDealtToChampions}
                                    </div>
                                    <div>
                                        <Progress indicatorColor="bg-rose-500" className="h-1 w-15" value={(data.totalDamageDealtToChampions / maxDamageDealt * 100)} max={maxDamageDealt} />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div>
                                        {data.totalDamageTaken}
                                    </div>
                                    <div>
                                        <Progress indicatorColor="bg-sky-500" className="h-1 w-15" value={(data.totalDamageTaken / maxDamageTaken * 100)} max={maxDamageTaken} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
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
                                    <RuneBox gameData={loseTeam} i={i} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AccordionContent>
        </Accordion>
    );
};
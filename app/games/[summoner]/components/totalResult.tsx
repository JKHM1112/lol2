import React from 'react';
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import RuneBox from "./runeBox";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import Link from 'next/link';

const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/itemN/${itemCode}.png`} width={25} height={25} />
const getChampionImg1 = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/champion/${championCode}.png`} width={35} height={35} />
const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={20} height={20} />

const createRuneImage1 = (runeCode: string) => (
    <Image className='rounded-md' alt='rune' src={`/${runeCode}`} width={20} height={20} />
);

const createRuneImage2 = (runeCode: string) => (
    <Image className='rounded-md' alt='rune' src={`/${runeCode}`} width={20} height={20} />
);

const findRuneIcon = (runeCode: number, allRunes: any) => {
    const rune = allRunes.find((rune: any) => rune.id === runeCode);
    return rune?.icon || '0.png';
};

const getRuneImgMark = (runeCode: number, runesReforged: any) => {
    const rune = runesReforged.find((rune: any) => rune.id === runeCode);
    return rune?.icon || '0.png';
};

interface TotalResultProps {
    winTeam: any[];
    loseTeam: any[];
    maxDamageDealt: number;
    maxDamageTaken: number;
    allRunes: any[];
    runesReforged: any[];
}
const getGrade = (kills: number, deaths: number, assists: number) => {
    return deaths === 0 ? "Perfect" : ((kills + assists) / deaths).toFixed(2);
};

export default function TotalResult({ winTeam, loseTeam, maxDamageDealt, maxDamageTaken, allRunes, runesReforged }: TotalResultProps) {
    return (
        <Accordion type="single" collapsible >
            <AccordionContent>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-sky-200">
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
                                    <div className=" items-center gap-1">
                                        {getSpellImg(data.summoner1Id)}
                                        {getSpellImg(data.summoner2Id)}
                                    </div>
                                    <div className=" items-center gap-1">
                                        {createRuneImage1(findRuneIcon(data.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk, allRunes))}
                                        {createRuneImage1(getRuneImgMark(data.perks.styles.find((style: any) => style.description === "subStyle")?.style, runesReforged))}
                                    </div>
                                    <div>
                                        <Link href={`/games/${data.riotIdGameName}-${data.riotIdTagline}`}>{data.riotIdGameName}</Link>
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
                                    <RuneBox gameData={winTeam} i={i} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableHeader>
                        <TableRow className="bg-rose-200">
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
                                    <div className=" items-center gap-1">
                                        {getSpellImg(data.summoner1Id)}
                                        {getSpellImg(data.summoner2Id)}
                                    </div>
                                    <div className=" items-center gap-1">
                                        {createRuneImage1(findRuneIcon(data.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk, allRunes))}
                                        {createRuneImage1(getRuneImgMark(data.perks.styles.find((style: any) => style.description === "subStyle")?.style, runesReforged))}
                                    </div>
                                    <div>
                                        <Link href={`/games/${data.riotIdGameName}-${data.riotIdTagline}`}>{data.riotIdGameName}</Link>
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
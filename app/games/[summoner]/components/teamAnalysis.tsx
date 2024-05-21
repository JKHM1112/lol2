import React from 'react';
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import RuneBox from "./runeBox";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';

const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/itemN/${itemCode}.png`} width={30} height={30} />
const getChampionImg1 = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/championE/${championCode}.png`} width={40} height={40} />
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

export default function TeamAnalysis({ winTeam, loseTeam, maxDamageDealt, maxDamageTaken, allRunes, runesReforged }: TotalResultProps) {
    return (
        <Accordion type="single" collapsible>
                <AccordionContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-200">
                                <TableHead className='text-sky-500 text-right'>승리팀</TableHead>
                                <TableHead className='text-rose-500 text-left'>패배팀</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="bg-sky-100 p-2">승리팀 데이터1</div>
                                        <div className="bg-sky-100 p-2">승리팀 데이터2</div>
                                        <div className="bg-sky-100 p-2">승리팀 데이터3</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="bg-rose-100 p-2">패배팀 데이터1</div>
                                        <div className="bg-rose-100 p-2">패배팀 데이터2</div>
                                        <div className="bg-rose-100 p-2">패배팀 데이터3</div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </AccordionContent>
        </Accordion>
    );
}
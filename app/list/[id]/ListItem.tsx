'use client';

import useUserStore from '@/app/hooks/useUserStore';
import { runesReforgedOld } from '@/app/data/runesReforgedOld';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { champion } from '@/app/data/champion';

interface ListsItemProps {
    result: Array<{
        _id: string; line: string;
        chams: string[]; // 챔피언 배열
        before6: number; after6: number; side1: number; teamFight1: number
        lineResult: string; gameResult: string;
        runes: number[]; // 룬 배열
        summoners: number[]; // 스펠 배열
        items: number[]; // 아이템 배열
        review: string; date: string; author: string; email: string;
    }>;
    email: string;
}

const ITEMS_PER_PAGE = 10;
const lineTypes = ['탑', '정글', '미드', '바텀', '서폿'];

export default function ListItem({ result, email }: ListsItemProps) {
    const router = useRouter();
    const { setLines, setChampions, setLineResults, setGameResults, setBefore, setAfter, setSide, setTeamFight, setReview,
        setSummoners, setRunes, setItems } = useUserStore();
    const [checkedLines, setCheckedLines] = useState<string[]>([]);
    const [champFilter, setChampFilter] = useState(''); // 내 챔피언
    const [opponentFilter, setOpponentFilter] = useState(''); // 상대 챔피언
    const [currentPage, setCurrentPage] = useState(1);

    const champions = champion

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setCheckedLines(currentLines =>
            checked
                ? [...currentLines, value]
                : currentLines.filter(line => line !== value)
        );
    };

    const swapFilters = () => {
        setChampFilter(opponentFilter);
        setOpponentFilter(champFilter);
    };

    const filteredResults = result.filter(item => {
        const matchesCheckedLines = checkedLines.length === 0 || checkedLines.includes(item.line);
        const matchesChamp = champFilter === '' || Object.values(champions.data).find(cham => cham.id === item.chams[0] && cham.name.includes(champFilter));
        const matchesOpponent = opponentFilter === '' || Object.values(champions.data).find(cham => cham.id === item.chams[1] && cham.name.includes(opponentFilter));

        return matchesCheckedLines && matchesChamp && matchesOpponent;
    });

    const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const paginatedResult = filteredResults.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getChampionImg = (championCode: string) => <Image className='rounded-md' alt={'champion'} src={`/champion/${championCode}.png`} width={35} height={35} />;
    const getSummonerImg = (spellCode: number) => <Image className='rounded-md' alt={'spell'} src={`/spellN/${spellCode}.png`} width={35} height={35} />;
    const array: any = [];
    const runeGroups = runesReforgedOld.map((runeGroup: any) => runeGroup.slots);
    const getRuneImg = (runeCode: number, line: number) => {
        if (runeCode === 0) {
            return `0.png`;
        }
        return array.concat(...runeGroups.map((runeType: any) => runeType[line].runes)).find((rune: any) => rune.id === runeCode).icon;
    };
    const getRuneImg4 = (runeCode: string) => <Image className='rounded-md' alt={'rune'} src={`/` + runeCode} width={35} height={35} />;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <div className="flex items-center gap-1 mb-4">
                    {lineTypes.map(line => (
                        <label className="flex items-center gap-1" key={line}>
                            <input type="checkbox" value={line} onChange={handleCheckboxChange} checked={checkedLines.includes(line)} className="mr-2" />
                            {line}
                        </label>
                    ))}
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <input type="text" placeholder="내 챔피언" value={champFilter} onChange={(e) => setChampFilter(e.target.value)} className="p-1 border border-sky-300 rounded" />
                    <input type="text" placeholder="상대 챔피언" value={opponentFilter} onChange={(e) => setOpponentFilter(e.target.value)} className="p-1 border border-sky-300 rounded" />
                    <button onClick={swapFilters} className="p-1 bg-sky-200 rounded">⇄</button>
                </div>
            </div>
            <table className="w-full border-collapse border border-sky-300">
                <thead>
                    <tr className="bg-sky-200">
                        <th className="border border-sky-300 p-1">라인</th>
                        <th className="border border-sky-300 p-1">챔피언</th>
                        <th className="border border-sky-300 p-1">챔피언</th>
                        <th className="border border-sky-300 p-1">6전</th>
                        <th className="border border-sky-300 p-1">6후</th>
                        <th className="border border-sky-300 p-1">사이드</th>
                        <th className="border border-sky-300 p-1">한타</th>
                        <th className="border border-sky-300 p-1">룬</th>
                        <th className="border border-sky-300 p-1">룬</th>
                        <th className="border border-sky-300 p-1">스펠1</th>
                        <th className="border border-sky-300 p-1">스펠2</th>
                        <th className="border border-sky-300 p-1">스펠1</th>
                        <th className="border border-sky-300 p-1">스펠2</th>
                        <th className="border border-sky-300 p-1">라인결과</th>
                        <th className="border border-sky-300 p-1">게임결과</th>
                        <th className="border border-sky-300 p-1">상세보기</th>
                        <th className="border border-sky-300 p-1">수정</th>
                        <th className="border border-sky-300 p-1">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedResult.map((data, i) => (
                        <tr key={i} className="hover:bg-sky-100">
                            <td className="border border-sky-300 p-1 text-center">{data.line}</td>
                            <td className="border border-sky-300 p-1 text-center">{getChampionImg(data.chams[0])}</td>
                            <td className="border border-sky-300 p-1 text-center">{getChampionImg(data.chams[1])}</td>
                            <td className="border border-sky-300 p-1 text-center">{data.before6}</td>
                            <td className="border border-sky-300 p-1 text-center">{data.after6}</td>
                            <td className="border border-sky-300 p-1 text-center">{data.side1}</td>
                            <td className="border border-sky-300 p-1 text-center">{data.teamFight1}</td>
                            <td className="border border-sky-300 p-1 text-center">{getRuneImg4(getRuneImg(data.runes[0], 0))}</td>
                            <td className="border border-sky-300 p-1 text-center">{getRuneImg4(getRuneImg(data.runes[9], 0))}</td>
                            <td className="border border-sky-300 p-1 text-center">{getSummonerImg(data.summoners[0])}</td>
                            <td className="border border-sky-300 p-1 text-center">{getSummonerImg(data.summoners[1])}</td>
                            <td className="border border-sky-300 p-1 text-center">{getSummonerImg(data.summoners[2])}</td>
                            <td className="border border-sky-300 p-1 text-center">{getSummonerImg(data.summoners[3])}</td>
                            <td className="border border-sky-300 p-1 text-center">{data.lineResult}</td>
                            <td className="border border-sky-300 p-1 text-center">{data.gameResult}</td>
                            <td className="border border-sky-300 p-1 text-center">
                                <Link href={'/detail/' + data._id} className="text-blue-500 hover:underline">상세보기</Link>
                            </td>
                            {data.email === email && (
                                <td className="border border-sky-300 p-1 text-center">
                                    <Button onClick={() => {
                                        setLines(data.line);
                                        data.chams.forEach((cham, index) => setChampions(index, cham));
                                        setLineResults(data.lineResult);
                                        setGameResults(data.gameResult);
                                        setBefore(data.before6);
                                        setAfter(data.after6);
                                        setSide(data.side1);
                                        setTeamFight(data.teamFight1);
                                        setReview(data.review);
                                        data.summoners.forEach((summoner, index) => setSummoners(index, summoner));
                                        data.runes.forEach((rune, index) => setRunes(index, rune));
                                        data.items.forEach((item, index) => setItems(index, item));
                                        router.push('/edit/' + data._id);
                                    }} className="text-blue-500 hover:underline">수정</Button>
                                </td>
                            )}
                            {data.email === email && (
                                <td className="border border-sky-300 p-1 text-center">
                                    <button onClick={async () => {
                                        await fetch('/api/post/delete', {
                                            method: 'POST', body: JSON.stringify({ _id: data._id, email: data.email })
                                        });
                                        window.location.reload()
                                    }} className="text-red-500 hover:underline">삭제</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                        </PaginationItem>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink isActive={currentPage === page} onClick={() => handlePageChange(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
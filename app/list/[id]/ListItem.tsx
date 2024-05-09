//app/list/[id]/ListLitem.tsx
'use client';
import React, { useState } from 'react';
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { runesReforged } from '@/app/data/runesReforged';
import Image from 'next/image';

interface ListsItemProps {
    result: Array<{
        line: string; cham1: string; cham2: string; chma3: string; cham4: string;
        before6: number; after6: number; half: number; lineResult: string; gameResult: string; review: string;
        spell1: number; spell2: number; spell3: number; spell4: number;
        firstItem: number; shoesItem: number; legendaryItem0: number; legendaryItem1: number; legendaryItem2: number;
        legendaryItem3: number; legendaryItem4: number; legendaryItem5: number; legendaryItem6: number;
        rune1: number; rune2: number; rune3: number; rune4: number; rune5: number; rune6: number;
        rune7: number; rune8: number; rune9: number; rune10: number; rune11: number; rune12: number;
        _id: string; date: string; author: string; email: string;
    }>;
    email: string;
}
const ITEMS_PER_PAGE = 20;
const lineTypes = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];
export default function ListsItem({ result, email }: ListsItemProps) {
    const [checkedLines, setCheckedLines] = useState<string[]>([]);
    const [champFilter, setChampFilter] = useState('');
    const [opponentFilter, setOpponentFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
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
        const matchesChamp = champFilter === '' || item.cham1.toLowerCase().includes(champFilter.toLowerCase());
        const matchesOpponent = opponentFilter === '' || item.cham2.toLowerCase().includes(opponentFilter.toLowerCase());
        return matchesCheckedLines && (matchesChamp && matchesOpponent);
    });

    const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const paginatedResult = filteredResults.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getChampionImg = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/championE/${championCode}.png`} width={35} height={35} />
    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={35} height={35} />
    const array: any = []
    const runeGroups = runesReforged.map((runeGroup: any) => runeGroup.slots)
    const getRuneImg = (runeCode: number, line: number) => {
        if (runeCode == 0) {
            return `perk-images/0.png`
        }
        return array.concat(...runeGroups.map((runeType: any) => runeType[line].runes)).find((rune: any) => rune.id == runeCode).icon
    }
    const getRuneImg4 = (RuneCode: string) => <Image className='rounded-md' alt={'rune1'} src={`/` + RuneCode} width={35} height={35} />
    return (
        <div>
            <div>
                <div className="flex items-center gap-1">
                    {lineTypes.map(line => (
                        <label className="items-center gap-1" key={line}>
                            <input type="checkbox" value={line} onChange={handleCheckboxChange} checked={checkedLines.includes(line)} />{line}
                        </label>
                    ))}
                </div>
                <div className="flex items-center gap-1">
                    <label className="items-center gap-1">
                        <input type="text" placeholder="내 챔피언" value={champFilter} onChange={(e) => setChampFilter(e.target.value)} />
                    </label>
                    <label className="items-center gap-1">
                        <input type="text" placeholder="상대 챔피언" value={opponentFilter} onChange={(e) => setOpponentFilter(e.target.value)} />
                    </label>
                    <button onClick={swapFilters} className="swap-button">⇄</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>라인</th>
                        <th>챔피언</th>
                        <th>챔피언</th>
                        <th>6전</th>
                        <th>6후</th>
                        <th>후반</th>
                        <th>룬</th>
                        <th>룬</th>
                        <th>스펠1</th>
                        <th>스펠2</th>
                        <th>스펠1</th>
                        <th>스펠2</th>
                        <th>라인결과</th>
                        <th>게임결과</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResults.map((data, i) => (
                        data.email === email && (
                            <tr key={i}>
                                <td>{data.line}</td>
                                <td>{getChampionImg(data.cham1)}</td>
                                <td>{getChampionImg(data.cham2)}</td>
                                <td>{data.before6}</td>
                                <td>{data.after6}</td>
                                <td>{data.half}</td>
                                <td>{getRuneImg4(getRuneImg(data.rune1, 0))}</td>
                                <td>{getRuneImg4(getRuneImg(data.rune7, 0))}</td>
                                <td>{getSpellImg(data.spell1)}</td>
                                <td>{getSpellImg(data.spell2)}</td>
                                <td>{getSpellImg(data.spell3)}</td>
                                <td>{getSpellImg(data.spell4)}</td>
                                <td>{data.lineResult}</td>
                                <td>{data.gameResult}</td>
                                <td>{data.author}</td>
                                <td><Link href={'/detail/' + data._id} className="list-detail-li">상세보기</Link></td>
                                {data.email === email && (
                                    <td>
                                        <Link href={'/edit/' + data._id} className="list-detail-li">수정</Link>
                                        <button onClick={async () => {
                                            await fetch('/api/post/delete', {
                                                method: 'POST', body: JSON.stringify({ author: data.author, _id: data._id, email: data.email })
                                            })
                                        }}>삭제</button>
                                    </td>
                                )}
                            </tr>
                        )
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
        </div >
    );
}

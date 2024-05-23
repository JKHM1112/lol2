//app/lists/ListLitem.tsx
'use client';
import useUserStore from '@/app/hooks/useUserStore';
import { runesReforgedOld } from '@/app/data/runesReforgedOld';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getChampions } from '@/components/champions';

interface ListItemProps {
    result: Array<{
        _id: string; line: string;
        cham1: string; cham2: string; cham3: string; cham4: string;
        before6: number; after6: number; half: number;
        lineResult: string; gameResult: string;
        rune1: number; rune2: number; rune3: number; rune4: number;
        rune5: number; rune6: number; rune7: number; rune8: number;
        rune9: number; rune10: number; rune11: number; rune12: number;
        spell1: number; spell2: number; spell3: number; spell4: number;
        legendaryItem0: number; legendaryItem1: number; legendaryItem2: number; legendaryItem3: number;
        legendaryItem4: number; legendaryItem5: number; legendaryItem6: number;
        shoesItem: string; firstItem: string;
        review: string; date: string; author: string; email: string;
    }>;
}

const ITEMS_PER_PAGE = 20;
const lineTypes = ['탑', '정글', '미드', '원딜', '서폿'];
export default function ListItem({ result }: ListItemProps) {
    const router = useRouter()
    const { setLines, setChampions, setLineResults, setGameResults, setBefore, setAfter, setHalf, setReview,
        setSpells, setRunes, setItems } = useUserStore()
    const [checkedLines, setCheckedLines] = useState<string[]>([]);
    const [champFilter, setChampFilter] = useState('');
    const [opponentFilter, setOpponentFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const champions = getChampions();
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
        const matchesChamp = champFilter === '' || champions.some(champ => champ.nameE === item.cham1 && champ.nameK.includes(champFilter));
        const matchesOpponent = opponentFilter === '' || champions.some(champ => champ.nameE === item.cham2 && champ.nameK.includes(opponentFilter));
        return matchesCheckedLines && matchesChamp && matchesOpponent;
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
    const runeGroups = runesReforgedOld.map((runeGroup: any) => runeGroup.slots)
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
                    {paginatedResult.map((data, i) => (
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
                            <td>
                                <Button onClick={() => {
                                    setLines(data.line)
                                    setChampions(0, data.cham1)
                                    setChampions(1, data.cham2)
                                    setChampions(2, data.cham3)
                                    setChampions(3, data.cham4)
                                    setLineResults(data.lineResult)
                                    setGameResults(data.gameResult)
                                    setBefore(data.before6)
                                    setAfter(data.after6)
                                    setHalf(data.half)
                                    setReview(data.review)
                                    setSpells(0, data.spell1)
                                    setSpells(1, data.spell2)
                                    setSpells(2, data.spell3)
                                    setSpells(3, data.spell4)
                                    setRunes(0, data.rune1)
                                    setRunes(1, data.rune2)
                                    setRunes(2, data.rune3)
                                    setRunes(3, data.rune4)
                                    setRunes(4, data.rune5)
                                    setRunes(5, data.rune6)
                                    setRunes(6, data.rune7)
                                    setRunes(7, data.rune8)
                                    setRunes(8, data.rune9)
                                    setRunes(9, data.rune10)
                                    setRunes(10, data.rune11)
                                    setRunes(11, data.rune12)
                                    setItems(0, data.legendaryItem0)
                                    setItems(1, data.legendaryItem1)
                                    setItems(2, data.legendaryItem2)
                                    setItems(3, data.legendaryItem3)
                                    setItems(4, data.legendaryItem4)
                                    setItems(5, data.legendaryItem5)
                                    setItems(6, data.legendaryItem6)
                                    router.push('/edit/' + data._id)
                                }} className="list-detail-li">수정</Button>
                                <button onClick={async () => {
                                    await fetch('/api/post/delete', {
                                        method: 'POST', body: JSON.stringify({ author: data.author, _id: data._id, email: data.email })
                                    })
                                }}>삭제</button>
                            </td>
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

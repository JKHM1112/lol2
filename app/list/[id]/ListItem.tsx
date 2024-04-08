//app/list/[id]/ListLitem.tsx
'use client';
import React, { useState } from 'react';
import Link from "next/link";

interface ListsItemProps {
    result: Array<{
        line: string; cham1: string; cham2: string; before6: string;
        after6: string; half: string; rune1: string; rune2: string;
        spell1: string; spell2: string; spell3: string; spell4: string;
        lineResult: string; gameResult: string; name: string; _id: string;
        author: string; email: string;
    }>;
    email: string;
}

const lineTypes = ['탑', '정글', '미드', '원딜', '서폿'];
export default function ListsItem({ result, email }: ListsItemProps) {
    const [checkedLines, setCheckedLines] = useState<string[]>([]);
    const [champFilter, setChampFilter] = useState('');
    const [opponentFilter, setOpponentFilter] = useState('');
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

    return (
        <div>
            <div className="checkbox-container">
                {lineTypes.map(line => (
                    <label className="checkbox-label" key={line}>
                        {line}<input type="checkbox" value={line} onChange={handleCheckboxChange} checked={checkedLines.includes(line)} />
                    </label>
                ))}

                <label className="checkbox-label">
                    <input type="text" placeholder="내 챔피언" value={champFilter} onChange={(e) => setChampFilter(e.target.value)} />
                </label>
                <label className="checkbox-label">
                    <input type="text" placeholder="상대 챔피언" value={opponentFilter} onChange={(e) => setOpponentFilter(e.target.value)} />
                </label>
                <button onClick={swapFilters} className="swap-button">⇄</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className="char3">라인</th>
                        <th className="char1">챔피언</th>
                        <th className="char2">챔피언</th>
                        <th className="char3">6전</th>
                        <th className="char3">6후</th>
                        <th className="char3">후반</th>
                        <th className="char1">룬</th>
                        <th className="char2">룬</th>
                        <th className="char1">스펠1</th>
                        <th className="char1">스펠2</th>
                        <th className="char2">스펠1</th>
                        <th className="char2">스펠2</th>
                        <th className="char3">라인결과</th>
                        <th className="char3">게임결과</th>
                        <th className="char3">작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResults.map((item, index) => (
                        item.email === email && (
                            <tr key={index}>
                                <td>{item.line}</td>
                                <td>{item.cham1}</td>
                                <td>{item.cham2}</td>
                                <td>{item.before6}</td>
                                <td>{item.after6}</td>
                                <td>{item.half}</td>
                                <td>{item.rune1}</td>
                                <td>{item.rune2}</td>
                                <td>{item.spell1}</td>
                                <td>{item.spell2}</td>
                                <td>{item.spell3}</td>
                                <td>{item.spell4}</td>
                                <td>{item.lineResult}</td>
                                <td>{item.gameResult}</td>
                                <td>{item.author}</td>
                                <td>
                                    <Link href={'/detail/' + item._id} className="list-detail-li">상세보기</Link>
                                </td>
                                <td>
                                    <Link href={'/edit/' + item._id} className="list-detail-li">수정</Link>

                                    <button onClick={async () => {
                                        await fetch('/api/post/delete', {
                                            method: 'POST', body: JSON.stringify({ author: item.author, _id: item._id, email: item.email })
                                        })
                                    }}>삭제</button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
}

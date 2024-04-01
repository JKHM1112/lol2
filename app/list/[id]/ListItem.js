//app/list/[id]/ListItem.js 에 따른 개인의 list page
'use client'
import React, { useState } from 'react';
import Link from "next/link"

const lineTypes = ['탑', '정글', '미드', '원딜', '서폿'];

export default function ListsItem({ result, email }) {

    const [checkedLines, setCheckedLines] = useState([]);
    const [champFilter, setChampFilter] = useState('');
    const [opponentFilter, setOpponentFilter] = useState('');

    const handleCheckboxChange = (event) => {
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
                    <input type="text" placeholder="상대 챔피언" value={opponentFilter} onChange={(e) => setOpponentFilter(e.target.value)} /></label>
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
                        <th className="char3">작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResults.map((a, i) => (
                        a.author === email ? (
                            <tr key={i}>
                                <td>{a.line}</td>
                                <td>{a.cham1}</td>
                                <td>{a.cham2}</td>
                                <td>{a.before6}</td>
                                <td>{a.after6}</td>
                                <td>{a.half}</td>
                                <td>{a.rune1}</td>
                                <td>{a.rune2}</td>
                                <td>{a.spell1}</td>
                                <td>{a.spell11}</td>
                                <td>{a.spell2}</td>
                                <td>{a.spell22}</td>
                                <td>{a.name}</td>
                                <td>
                                    <Link href={`/detail/` + a._id} className="list-detail-li">상세보기</Link>
                                </td>
                                <td>
                                    <Link href={`/edit/` + a._id} className="list-detail-li">수정</Link>
                                </td>
                                <td>
                                    <span onClick={(e) => {
                                        fetch('/api/post/delete', { method: 'DELETE', body: a._id })
                                            //클릭 이벤트가 발생하면 fetch함수가 발동해  /delete로 DELETE요청을 보내고 
                                            .then((r) => r.json())
                                            .then(() => {
                                                e.target.parentElement.style.opacity = 0;
                                                setTimeout(() => {
                                                    e.target.parentElement.style.display = 'none'
                                                }, 1000)
                                            })
                                    }}>삭제</span>
                                </td>
                            </tr>
                        ) : null
                    ))}
                </tbody>

            </table>
        </div>
    )
}
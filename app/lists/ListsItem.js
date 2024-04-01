'use client';
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const lineTypes = ['탑', '정글', '미드', '원딜', '서폿'];
export default function ListsItem({ result, email }) {
    const router = useRouter()
    const [checkedLines, setCheckedLines] = useState([]);
    //a는 현재 값을 담고 있는 변수 b는 업데이트하는함수 c는 초기 값 전달
    const [champFilter, setChampFilter] = useState('');
    //champFilter에 '' 를 전달
    const [opponentFilter, setOpponentFilter] = useState('');
    //opponentFilter에 ''를 전달
    const handleCheckboxChange = (event) => {
        //checkbox가 onChange될때 호출된다. event객체
        const { value, checked } = event.target;
        //event.target에 value와 checked 두 속성을 추출해 상수로 만든다.
        //value는 체크박스의 상대 value 속성 값 체크박스의 데이터 값
        //checked는 체크박스의 Boolean값으로 true false가 반환된다.
        setCheckedLines(currentLines =>
            //checkedLines의 값을 업데이트 하는 함수이다.
            checked
            //checked가 true면 체크되어있으면 currentLines에 새로운 value를 추가한다.
            //checked가 false면 체크안되어있으면 checkedLines에 value를 제거한다. 라인의 값에서 제외
                ? [...currentLines, value]
                : currentLines.filter(line => line !== value)
        );
    };
    //한줄 정의: 체크박스에 체크하면 checkedLines에 value가 배열에 추가되어 상태가 업데이트된다.

    const swapFilters = () => {
        setChampFilter(opponentFilter);
        setOpponentFilter(champFilter);
    };
    //swapFilters를 onClick하면 opponentFilter과 champFilter이 swap한다.

    const filteredResults = result.filter(item => {
        //fiter메소드는 result 배열의 각 항목을 필터링 해서 조건에 맞는 항목만을 새 배열로 생성하는 함수이다.
        const matchesCheckedLines = checkedLines.length === 0 || checkedLines.includes(item.line);
        //checkedLines의 빈 배열이거나, checkedLines 안에 우리가 입력한 데이터의.line이 포함되어 있는 값이 저장된다.
        // 내가 체크를 아무것도 안하거나 탑을 체크했을때 내 데이터 안에 탑이 적혀있는 값을 반환한다고 생각하면 될거 같다.
        const matchesChamp = champFilter === '' || item.cham1.toLowerCase().includes(champFilter.toLowerCase());
        //champFilter안이 비어있거나 데이터안에 챔 이름을 소문자로 변경한게 champFilter을 소문자로 변경한것이 포함되어 있으면 matchesChamp에 저장된다.
        //아래는 위에 코드와 같다.
        const matchesOpponent = opponentFilter === '' || item.cham2.toLowerCase().includes(opponentFilter.toLowerCase());
        
        return matchesCheckedLines && (matchesChamp && matchesOpponent);
        //matchesCheckedLines와 matchesChamp 와 matchesOpponent의 값을 return한다.
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
                        <th className="char3">승/패</th>
                        <th className="char3">작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResults.map((item, index) => (
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
                            <td>{item.spell11}</td>
                            <td>{item.spell2}</td>
                            <td>{item.spell22}</td>
                            <td>{item.winorlose}</td>
                            <td>{item.name}</td>
                            <td>
                                <Link href={'/detail/' + item._id} className="list-detail-li">상세보기</Link>
                            </td>
                            {item.author === email && (
                                <td>
                                    <Link href={'/edit/' + item._id} className="list-detail-li">수정</Link>
                                    <span onClick={(e) => {
                                        fetch('/api/post/delete', { method: 'DELETE', body: item._id })
                                        .then((r) => r.json())
                                        .then(() => {
                                            e.target.parentElement.style.opacity = 0;
                                            setTimeout(() => {
                                                e.target.parentElement.style.display = 'none';
                                            }, 1000);
                                        });
                                        router.refresh()
                                    }}>삭제</span>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

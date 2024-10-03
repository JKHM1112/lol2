'use client';
import React, { useState } from "react";
import useUserStore from "../hooks/useUserStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ShowChart from "./showChart";
import { Button } from "@/components/ui/button";

interface ListsCardsProps {
    dataEnteredDirectly: Array<{
        _id: string;
        line: string;
        chams: string[]; // 챔피언 배열
        before6: number;
        after6: number;
        side1: number;
        teamFight1: number;
        lineResult: string;
        gameResult: string;
        runes: number[]; // 룬 배열
        summoners: number[]; // 스펠 배열
        items: number[]; // 아이템 배열
        review: string;
        date: string;
        author: string;
        email: string;
        tier: string;
    }>;
    email: string;
    riotPatchNotes: Array<{
        date: string;
        title: string;
    }>
}

const ITEMS_PER_PAGE = 5; // 한 페이지에 보여줄 항목 수

export default function ListsCards({ dataEnteredDirectly, email, riotPatchNotes }: ListsCardsProps) {
    const router = useRouter();
    const { setLines, setChampions, setLineResults, setGameResults, setBefore, setAfter, setSide, setTeamFight, setReview, setSummoners, setRunes, setItems } = useUserStore();

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [myChampSearch, setMyChampSearch] = useState(''); // 내 챔피언 검색 상태
    const [enemyChampSearch, setEnemyChampSearch] = useState(''); // 상대 챔피언 검색 상태
    const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({}); //뒤집힘 상태
    const [chartData, setChartData] = useState<any[]>([]); // 차트 데이터를 저장할 상태 추가
    const [searchPerformed, setSearchPerformed] = useState(false); // 검색이 수행되었는지 여부를 저장하는 상태
    const [myEnemy, setMyEnemy] = useState('');
    // 페이지에 따라 보여줄 데이터 슬라이스
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const getLatestPatchTitle = (creationData: string) => {
        const current = new Date(creationData);
        const closestPatch = riotPatchNotes.filter(patch => new Date(patch.date) <= current)  // 현재 날짜보다 이전 또는 같은 패치만
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 가장 가까운 날짜부터 내림차순 정렬
        return closestPatch.length > 0 ? closestPatch[0].title : "패치 없음";
    }

    const filteredMyChampResults = dataEnteredDirectly.filter(item => {
        const myChampMatch = myChampSearch === '' || (item.chams[4] && item.chams[4].includes(myChampSearch));
        return myChampMatch;
    });

    const filteredEnemyChampResults = dataEnteredDirectly.filter(item => {
        const enemyChampMatch = enemyChampSearch === '' || (item.chams[5] && item.chams[5].includes(enemyChampSearch));
        return enemyChampMatch;
    });

    const handleSearch = (type: "my" | "enemy") => {
        setSearchPerformed(true); // 검색이 수행되었음을 표시
        if (type === "my") {
            setMyEnemy(type)
            setCurrentPage(1);
            setChartData(filteredMyChampResults);
        } else if (type === "enemy") {
            setMyEnemy(type)
            setCurrentPage(1);
            setChartData(filteredEnemyChampResults);
        }
    };

    const handleReset = () => {
        setMyChampSearch('');
        setEnemyChampSearch('');
        setSearchPerformed(false);
        setCurrentPage(1);
        setChartData([]); // 기본 데이터를 다시 검색
    };

    // 초기에는 dataEnteredDirectly를 사용하고, 검색 후에는 chartData를 사용
    const currentData = searchPerformed ? chartData : dataEnteredDirectly;

    const paginatedResult = currentData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE); // 총 페이지 수

    // 페이지네이션 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // 챔피언 영문으로 이미지로 바꿔준다.
    const getChampionImg = (championCode: string, widthN: number, heightN: number) => (
        <Image className='rounded-md' alt={'champion1'} src={`/championLoading/${championCode}_0.jpg`} width={widthN} height={heightN} />
    );

    const handleFlipCard = (id: string) => {
        setFlipped(prevState => ({
            ...prevState,
            [id]: !prevState[id] // 현재 카드의 상태 반전
        }));
    };

    return (
        <div className="flex justify-center min-w-[1200px] ">
            <div className="min-w-[1000px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">
                {/* 내 챔피언 검색 */}
                <div className="flex flex-row">
                    <div className="flex flex-row justify-center m-4">
                        <input className="p-1 border rounded" type="text" size={10} placeholder="내 챔피언 검색" value={myChampSearch} onChange={(e) => setMyChampSearch(e.target.value)} />
                        <Button className="px-4 bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleSearch("my")}></Button>
                    </div>

                    {/* 상대 챔피언 검색 */}
                    <div className="flex flex-row justify-center m-4">
                        <input className="p-1 border rounded" type="text" size={10} placeholder="상대 챔피언 검색" value={enemyChampSearch} onChange={(e) => setEnemyChampSearch(e.target.value)} />
                        <Button className="px-4 bg-red-500 text-white hover:bg-red-600" onClick={() => handleSearch("enemy")}></Button>
                    </div>

                    {/* 리셋 버튼 */}
                    <div className="flex flex-row justify-center  m-4">
                        <Button className="px-2 bg-gray-500 text-white hover:bg-gray-600" onClick={handleReset}>리셋</Button>
                    </div>
                </div>

                <div className="flex flex-row">
                    <div className="w-1/4 mt-2">
                        {paginatedResult.map((data, index) => (
                            <div key={data._id} className="rounded-md p-2 mx-2 bg-white">
                                {flipped[data._id] ? (
                                    <div className="flex flex-col p-2 rounded-lg bg-gray-100">
                                        <div className="w-[160px] truncate overflow-hidden text-gray-700 font-semibold">작성자: {data.email}</div>
                                        <div className="text-gray-500">패치버전: {getLatestPatchTitle(data.date)}</div>
                                        <div className="text-gray-500">티어: {(data.tier == null ? "UNRANK" : data.tier)}</div>
                                        <div className="text-gray-500">리뷰: {data.review}</div>
                                        <div className="flex flex-row justify-center gap-8">
                                            <button type="button" className="text-blue-600 hover:text-blue-800 mt-2" onClick={() => handleFlipCard(data._id)}>자세히</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`flex flex-col ${data.gameResult === "승리" ? "bg-blue-100" : "bg-red-100"} p-2 rounded-lg`}>
                                        <div className="flex flex-row mx-2 justify-center">
                                            <div className="flex items-center gap-8">
                                                {getChampionImg(data.chams[0], 60, 60)}
                                                {getChampionImg(data.chams[1], 60, 60)}
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-center gap-8">
                                            <button type="button" className="text-blue-600 hover:text-blue-800 mt-2" onClick={() => handleFlipCard(data._id)}>자세히</button>
                                            {email === data.email && (
                                                <div className="flex space-x-1 mt-4">
                                                    <button className="px-2 py-1 bg-green-300 text-white rounded-lg hover:bg-green-100"
                                                        onClick={() => {
                                                            setLines(data.line);
                                                            data.chams.forEach((cham: any, index: number) => setChampions(index, cham));
                                                            setLineResults(data.lineResult);
                                                            setGameResults(data.gameResult);
                                                            setBefore(data.before6);
                                                            setAfter(data.after6);
                                                            setSide(data.side1);
                                                            setTeamFight(data.teamFight1);
                                                            setReview(data.review);
                                                            data.summoners.forEach((summoner: any, index: number) => setSummoners(index, summoner));
                                                            data.runes.forEach((rune: any, index: number) => setRunes(index, rune));
                                                            data.items.forEach((item: any, index: number) => setItems(index, item));
                                                            router.push('/edit/' + data._id);
                                                        }} >수정</button>
                                                    <button className="px-2 py-1 bg-red-300 text-white rounded-lg hover:bg-red-100"
                                                        onClick={async () => {
                                                            await fetch('/api/post/delete', {
                                                                method: 'POST',
                                                                body: JSON.stringify({ _id: data._id, email: data.email })
                                                            });
                                                            window.location.reload();
                                                        }} >삭제</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="gap-4 mt-2 w-3/4">
                        <div className="rounded-md p-4 mx-2 bg-white">
                            <ShowChart chartData={chartData} myEnemy={myEnemy} />
                        </div>
                    </div>
                </div>
                {/* 페이지네이션 */}
                <div className="flex mt-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => handlePageChange(page)} className={`mx-1 px-3 py-1 border rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`} >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

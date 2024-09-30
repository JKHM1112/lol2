'use client';
import { useState } from "react";
import useUserStore from "../hooks/useUserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ListsCardsProps {
    result: Array<{
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
    }>;
    email: string;
}

const ITEMS_PER_PAGE = 10; // 한 페이지에 보여줄 항목 수
const lineOptions = ['탑', '정글', '미드', '바텀', '서폿']; // 라인 선택 옵션

export default function ListsCards({ result, email }: ListsCardsProps) {
    const router = useRouter();
    const { setLines, setChampions, setLineResults, setGameResults,
        setBefore, setAfter, setSide, setTeamFight, setReview,
        setSummoners, setRunes, setItems } = useUserStore();

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [selectedLines, setSelectedLines] = useState<string[]>([]); // 선택된 라인 상태
    const [myChampSearch, setMyChampSearch] = useState(''); // 내 챔피언 검색 상태
    const [enemyChampSearch, setEnemyChampSearch] = useState(''); // 상대 챔피언 검색 상태

    // 페이지에 따라 보여줄 데이터 슬라이스
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    // 라인 버튼 클릭 핸들러 (선택된 라인을 토글)
    const handleLineToggle = (line: string) => {
        setSelectedLines((prevSelectedLines) => {
            if (prevSelectedLines.includes(line)) {
                return prevSelectedLines.filter((selectedLine) => selectedLine !== line);
            } else {
                return [...prevSelectedLines, line];
            }
        });
    };

    // 검색된 결과 필터링 (내 챔피언: cham[4], 상대 챔피언: cham[5]를 한글로 필터링)
    const filteredResult = result.filter(item => {
        const lineMatch = selectedLines.length === 0 || selectedLines.includes(item.line);
        const myChampMatch = myChampSearch === '' || (item.chams[4] && item.chams[4].includes(myChampSearch));
        const enemyChampMatch = enemyChampSearch === '' || (item.chams[5] && item.chams[5].includes(enemyChampSearch));
        return lineMatch && myChampMatch && enemyChampMatch;
    });

    const paginatedResult = filteredResult.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredResult.length / ITEMS_PER_PAGE); // 총 페이지 수

    // 페이지네이션 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // 챔피언 영문으로 이미지로 바꿔준다.
    const getChampionImg1 = (championCode: string, widthN: number, heightN: number) => (
        <Image className='rounded-md' alt={'champion1'} src={`/championLoading/${championCode}_0.jpg`} width={widthN} height={heightN} />
    );

    return (
        <div className="flex justify-center min-w-[1200px]">
            <div className="min-w-[1000px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">
                <div className="flex justify-center gap-2">
                    <input className="p-1 border rounded" type="text" size={14} placeholder="내 챔피언 검색" value={myChampSearch} onChange={(e) => setMyChampSearch(e.target.value)} />
                    <input className="p-1 border rounded" type="text" size={14} placeholder="상대 챔피언 검색" value={enemyChampSearch} onChange={(e) => setEnemyChampSearch(e.target.value)} />
                </div>
                <div className="flex justify-center gap-2 mt-2">
                    {lineOptions.map((line) => (
                        <button key={line} onClick={() => handleLineToggle(line)} className={`px-4 py-2 border rounded-lg ${selectedLines.includes(line) ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}>
                            {line}
                        </button>
                    ))}
                </div>



                <div className="grid grid-cols-2 gap-4 mt-2">
                    {paginatedResult.map((data, index) => (
                        <div key={data._id} className="border rounded-lg shadow-lg p-4 mx-4 bg-white">
                            <div className={`flex flex-row mx-4 items-center ${data.gameResult === "승리" ? "bg-blue-100" : "bg-red-100"} p-4 rounded-lg`}>
                                <div className="flex items-center space-x-2">
                                    {getChampionImg1(data.chams[0], 80, 80)}
                                    {getChampionImg1(data.chams[1], 80, 80)}
                                </div>
                                <div className="flex flex-col items-start ml-4">
                                    <div className="text-gray-700 font-semibold">{data.email}</div>
                                    <div className="text-gray-500">{data.date}</div>
                                    <Link href={'/detail/' + data._id} className="text-blue-600 hover:text-blue-800 mt-2">상세보기</Link>
                                    {email === data.email && (
                                        <div className="flex space-x-2 mt-4">
                                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                                onClick={() => {
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
                                                }} >수정</button>
                                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
                        </div>
                    ))}
                </div>
                
                {/* 페이지네이션 */}
                <div className="flex justify-center mt-2">
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

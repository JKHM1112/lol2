'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SelectedChampions from "./selectedChampions";
import Paginations from "./pagination";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { champion } from "@/app/data/champion";

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
    versusCollection: any
}

const excludedItems = [
    0, 1001, 3006, 3009, 3020, 3047, 3111, 3117, 3158, 1054, 1055, 1056,
    1082, 1083, 1101, 1102, 1103, 1105, 1106, 1107, 3865
];
const championDetails = Object.values(champion.data).map((champ) => ({
    englishName: champ.id,
    koreanName: champ.name,
    imageUrl: champ.image.full
}));



export default function ListsCards({ dataEnteredDirectly, email, riotPatchNotes, versusCollection }: ListsCardsProps) {

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [myChampSearch, setMyChampSearch] = useState<any>(''); // 내 챔피언 검색 상태
    const [enemyChampSearch, setEnemyChampSearch] = useState<any>(''); // 상대 챔피언 검색 상태
    const [chartData, setChartData] = useState<any[]>([]); // 내가 검색한 챔피언 결과값
    const [searchPerformed, setSearchPerformed] = useState(false); // 검색이 수행되었는지 여부를 저장하는 상태
    const [newData, setNewData] = useState<any[]>([]);  //그룹화한 데이터를 담음
    const [sortType, setSortType] = useState<'difficulty' | 'winrate' | 'count'>('difficulty');
    const [selectedChampion, setSelectedChampion] = useState<string | null>(null); // 선택된 챔피언
    const [isFirstChampionOpen, setIsFirstChampionOpen] = useState(false);
    const [isSecondChampionOpen, setIsSecondChampionOpen] = useState(false);
    const [abc, setabc] = useState(false);
    const maxVisiblePages = 5; // 한 페이지에 보여줄 항목 수
    const startIndex = (currentPage - 1) * maxVisiblePages;

    //champion 영문을 이미지로 바꿔준다.
    const getChampionImg = (championCode: string, widthN: number, heightN: number) => (
        <Image className='rounded-md' alt={'champion1'} src={`/champion/${championCode}.png`} width={widthN} height={heightN} />
    );
    //spell 숫자로 이미지로 바꿔준다.
    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={40} height={40} />
    //아이템 번호를 가지고 이미지로 바꿔준다.
    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/item/${itemCode}.png`} width={40} height={40} />

    const handleReset = () => {
        setMyChampSearch('');
        setEnemyChampSearch('');
        setSearchPerformed(false);
        setCurrentPage(1);
        setChartData([]); // 기본 데이터를 다시 검색
    };

    const function1 = (cham1: any, cham2: any) => {
        const filteredResults = dataEnteredDirectly.filter((item: any) => {
            if (cham1 && !cham2) {
                // cham1만 존재할 경우
                return item.chams[4] && item.chams[4] === cham1.koreanName;
            }
            if (!cham1 && cham2) {
                // cham2만 존재할 경우
                return item.chams[5] && item.chams[5] === cham2.koreanName;
            }
            if (cham1 && cham2) {
                // cham1과 cham2 둘 다 존재할 경우
                return item.chams[4] && item.chams[4] === cham1.koreanName && item.chams[5] && item.chams[5] === cham2.koreanName;
            }
        });
        setSearchPerformed(true);
        setChartData(filteredResults)
    };

    // 초기에는 dataEnteredDirectly를 사용하고, 검색 후에는 chartData를 사용
    const currentData = searchPerformed ? chartData : dataEnteredDirectly;

    const paginatedResult = currentData.slice(startIndex, startIndex + maxVisiblePages);
    const totalPages = Math.ceil(currentData.length / maxVisiblePages); // 총 페이지 수

    // 페이지네이션 핸들러
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const renderPageNumbers = () => {
        const pageButtons = [];
        const maxButtonsToShow = 5; // 최대 표시할 페이지 버튼 수

        if (totalPages <= maxButtonsToShow) {
            // 총 페이지 수가 최대 표시할 버튼 수보다 적으면 모두 표시
            for (let i = 1; i <= totalPages; i++) {
                pageButtons.push(
                    <button key={i} onClick={() => handlePageChange(i)} className={`text-base  px-1 py-1 border rounded-lg  ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`} >
                        {i}
                    </button>
                );
            }
        } else {
            // 처음 몇 개의 페이지
            pageButtons.push(
                <button key={1} onClick={() => handlePageChange(1)} className={`text-base  px-1 py-1 border rounded-lg ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`} >
                    1
                </button>
            );

            if (currentPage > 3) {
                pageButtons.push(<span key="start-ellipsis" className="text-base  px-1 py-1">...</span>);
            }

            // 중간 페이지
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                pageButtons.push(
                    <button key={i} onClick={() => handlePageChange(i)} className={`text-base  px-1 py-1 border rounded-lg ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`} >
                        {i}
                    </button>
                );
            }

            if (currentPage < totalPages - 2) {
                pageButtons.push(<span key="end-ellipsis" className="text-base  px-1 py-1">...</span>);
            }

            // 마지막 페이지
            pageButtons.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)} className={`text-base  px-1 py-1 border rounded-lg ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`} >
                    {totalPages}
                </button>
            );
        }

        return pageButtons;
    };

    // chartData를 chams[1]으로 그룹화하여 newData에 저장하는 함수
    const groupByChampion = (data: any[]) => {
        const groupedData: { [key: string]: any[] } = {};

        data.forEach(item => {
            const champName = item.chams[1]; // chams[1]에서 챔피언 이름 추출
            if (!groupedData[champName]) {
                groupedData[champName] = [];
            }
            groupedData[champName].push(item);
        });

        // 객체를 배열 형식으로 변환
        const groupedArray = Object.keys(groupedData).map(champName => ({
            name: champName, // 챔피언 이름
            data: groupedData[champName], // 챔피언 관련 데이터 배열
        }));

        return groupedArray;
    };


    // 전체 난이도 합 계산 함수 (before6, after6, side1, teamFight1의 합의 평균)
    const calculateOverallDifficulty = (field: string) => {
        const total = chartData.reduce((sum, item) => sum + (item[field] || 0), 0);
        return total / chartData.length;
    };

    const renderDifficultyChart = (selectedData: any[]) => {
        const fields = ['before6', 'after6', 'side1', 'teamFight1'];
        const labels = ['6전', '6후', '사이드', '한타']; // 좌측에 표시할 라벨들

        return (
            <div className="flex flex-col ">
                <div className='flex flex-row'>
                    <h3 className='w-1/3 text-center font-semibold'>평균 난이도</h3>
                    <h3 className='w-1/3 text-center font-semibold'>{enemyChampSearch.koreanName} 난이도</h3>
                    <h3 className='w-1/3 text-center font-semibold'>레벨업</h3>
                </div>
                <hr className="my-2 border-t border-gray-300" />
                <div className='flex flex-row gap-2'>
                    <div className='w-2/3'>
                        {fields.map((field, index) => {
                            const selectedChampionValue = calculateChampionDifficulty(selectedData, field);
                            const overallValue = calculateOverallDifficulty(field);
                            return (
                                <div key={field} className="flex items-center">
                                    {/* 라벨 */}
                                    <div className="w-[50px] text-right mr-2">{labels[index]}:</div>
                                    {/* 선택한 챔피언 난이도 (파란색) */}

                                    {/* 전체 난이도 (빨간색) */}
                                    {[...Array(10)].map((_, i) => (
                                        <div key={i} className={`w-[20px] h-[20px] border ${i < overallValue ? 'bg-blue-500' : ''}`}></div>
                                    ))}
                                    {[...Array(10)].map((_, i) => (
                                        <div key={i} className={`w-[20px] h-[20px] border ${i < selectedChampionValue ? 'bg-red-500' : ''}`}></div>
                                    ))}

                                </div>

                            );
                        })}
                    </div>
                    <div className="w-1/3 ">
                        {selectedChampion && (
                            <div className="flex justify-center">
                                {renderLevelUpComparison(
                                    newData.find(champ => champ.name === selectedChampion)?.data || [],
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };
    // 선택된 챔피언의 난이도 평균 계산 함수
    const calculateChampionDifficulty = (champData: any[], field: string) => {
        const total = champData.reduce((sum, item) => sum + (item[field] || 0), 0);
        return total / champData.length;
    };

    //선렙 비교
    const renderLevelUpComparison = (selectedData: any[]) => {
        const labels = ['2렙', '3렙', '4렙', '5렙', '6렙'];

        return (
            <div className="space-y-2">
                {labels.map((label, index) => {
                    const myLevelTime = selectedData.flatMap(item => item.timeLineLevel1[index].timestamp)
                    const enemyLevelTime = selectedData.flatMap(item => item.timeLineLevel2[index].timestamp)
                    let sum = 0
                    let count = 0
                    myLevelTime.forEach((time, idx) => {
                        if (time < enemyLevelTime[idx]) {
                            sum++;  // myLevelTime이 더 작을 때 sum 증가
                            count++;
                        } else {
                            count++;  // 그렇지 않을 때 count 증가
                        }
                    });
                    return (
                        <div key={label} className="flex items-center">
                            <div className={`w-[50px] h-[20px] rounded-md text-center ${myLevelTime < enemyLevelTime ? 'bg-blue-400' : ''}`}>
                                {myLevelTime ? sum / count * 100 : ''}%
                            </div>
                            <div className="w-[50px] text-center">{label}</div>
                            <div className={`w-[50px] h-[20px] rounded-md text-center ${enemyLevelTime < myLevelTime ? 'bg-red-400' : ''}`}>
                                {enemyLevelTime ? (count - sum) / count * 100 : ''}%
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // 빈도수도 반환하는 getMostFrequentWithCount 함수
    const getMostFrequentWithCount = (arr: number[], topN: number) => {
        const frequencyMap = arr.reduce((acc: { [key: number]: number }, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

        // 빈도를 기준으로 정렬하여 상위 topN 항목을 반환
        return Object.entries(frequencyMap)
            .sort(([, a], [, b]) => b - a)
            .slice(0, topN)
            .map(([itemId, count]) => ({ itemId: Number(itemId), count }));
    };

    // 선택된 챔피언의 스펠 선호도 
    const renderSpellPreference = (selectedData: any[]) => {
        const allSpells = selectedData.flatMap(item => item.summoners.slice(0, 2)); // 각 게임의 스펠 목록
        const totalGames = selectedData.length; // 전체 게임 수
        const topSpells = getMostFrequentWithCount(allSpells, 2); // 상위 2개의 스펠과 등장 횟수

        return topSpells.map(({ itemId, count }, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
                {getSpellImg(itemId)} {/* 스펠 이미지 */}
                <div className="text-sm text-gray-600 mt-2">
                    {count}/{totalGames} ({((count / totalGames) * 100)}%)
                </div> {/* 선호도 비율 표시 */}
            </div>
        ));
    };

    // 선택된 챔피언의 초반 아이템 선호도 (초반 2분 내 구매한 아이템)
    const renderEarlyItemPreference = (selectedData: any[]) => {
        const earlyItems = selectedData.flatMap(item => item.items.slice(0, 7).filter((itemId: number) => isEarlyItem(itemId))); // 초반 아이템
        const totalGames = selectedData.length; // 전체 게임 수
        const topEarlyItems = getMostFrequentWithCount(earlyItems, 1); // 상위 1개의 초반 아이템

        return topEarlyItems.map(({ itemId, count }, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
                {getItemImg(itemId)} {/* 아이템 이미지 */}
                <div className="text-sm text-gray-600 mt-2">
                    {count}/{totalGames} ({((count / totalGames) * 100)}%)
                </div> {/* 선호도 비율 표시 */}
            </div>
        ));
    };

    // 선택된 챔피언의 완성형 아이템 선호도
    const renderCompleteItemPreference = (selectedData: any[]) => {
        const allItems = selectedData.flatMap(item => item.items.slice(0, 6)).filter(itemId => !excludedItems.includes(itemId)); // 완성형 아이템
        const totalGames = selectedData.length; // 전체 게임 수
        const topItems = getMostFrequentWithCount(allItems, 3); // 상위 3개의 완성형 아이템

        return topItems.map(({ itemId, count }, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
                {getItemImg(itemId)} {/* 아이템 이미지 */}
                <div className="text-sm text-gray-600 mt-2">
                    {count}/{totalGames} ({((count / totalGames) * 100)}%)
                </div> {/* 선호도 비율 표시 */}
            </div>
        ));
    };


    //선택된 신발
    const renderBootsPreference = (selectedData: any[]) => {
        const boots = selectedData.flatMap(item => item.items.filter((itemId: number) => isBootItem(itemId))); // 신발 아이템
        const totalGames = selectedData.length; // 전체 게임 수
        const topBoots = getMostFrequentWithCount(boots, 1); // 상위 1개의 신발

        return topBoots.map(({ itemId, count }, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
                {getItemImg(itemId)} {/* 신발 이미지 */}
                <div className="text-sm text-gray-600 mt-2">
                    {count}/{totalGames} ({((count / totalGames) * 100)}%)
                </div> {/* 선호도 비율 표시 */}
            </div>
        ));
    };


    // 초반아이템 여부를 확인하는 함수 (아이템 ID에 따라 초반아이템을 확인)
    const isEarlyItem = (itemId: number) => {
        const earlyIds = [1054, 1055, 1056, 1082, 1083, 1101, 1102, 1103, 1105, 1106, 1107, 3865]; // 초반아이템의 ID 목록
        return earlyIds.includes(itemId);
    };

    // 신발 여부를 확인하는 함수 (아이템 ID에 따라 신발을 확인)
    const isBootItem = (itemId: number) => {
        const bootsIds = [1001, 3006, 3009, 3020, 3047, 3111, 3117, 3158]; // 신발 아이템의 ID 목록
        return bootsIds.includes(itemId);
    };

    // 승률 계산 함수
    const calculateWinRate = (champData: any[]) => {
        const wins = champData.filter(item => item.gameResult === '승리').length;
        return (wins / champData.length) * 100;
    };

    // 판수 계산 함수
    const calculateCount = (champData: any[]) => {
        return champData.length;
    };

    // 정렬 함수
    const sortByType = (data: any[], type: 'difficulty' | 'winrate' | 'count') => {
        switch (type) {
            case 'difficulty':
                return data.sort((a, b) => calculateChampionDifficulty(a.data, 'before6') - calculateChampionDifficulty(b.data, 'before6'));
            case 'winrate':
                return data.sort((a, b) => calculateWinRate(b.data) - calculateWinRate(a.data));
            case 'count':
                return data.sort((a, b) => calculateCount(b.data) - calculateCount(a.data));
            default:
                return data;
        }
    };

    const sortedData = sortByType(newData, sortType);


    const function2 = (name: string) => {
        setSelectedChampion(name)
        const championDetails = Object.values(champion.data).map((champ: any) => ({
            englishName: champ.id,
            koreanName: champ.name,
            imageUrl: champ.image.full
        }));
        const selectedChampionDetail = championDetails.find((champ) => champ.englishName === name);
        if (selectedChampionDetail) {
            // 일치하는 챔피언 정보를 setEnemyChampSearch에 전달
            setEnemyChampSearch(selectedChampionDetail);
        }
    }
    useEffect(() => {
        const groupedResult = groupByChampion(chartData);
        setNewData(groupedResult); // newData에 저장
    }, [chartData]);


    return (
        <div className="flex justify-center min-w-[1200px] ">
            <div className="min-w-[1000px] bg-gray-100 rounded-lg shadow-md mt-4 p-4">
                {/* 내 챔피언 검색 */}
                <div className="flex flex-row gap-4">
                    <Popover open={isFirstChampionOpen} onOpenChange={setIsFirstChampionOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[120px]">
                                {myChampSearch ? myChampSearch.koreanName : '내 챔피언 선택'}
                            </Button>
                        </PopoverTrigger>
                            <PopoverContent className="h-[200px]" align="start">
                                <Command>
                                    <CommandInput placeholder="챔피언 선택..." />
                                    <CommandList>
                                        <CommandEmpty>챔피언을 찾을 수 없습니다.</CommandEmpty>
                                        <CommandGroup>
                                            {championDetails.map((champ) => (
                                                <CommandItem key={champ.koreanName} value={champ.koreanName} onSelect={() => {
                                                    setMyChampSearch(champ);
                                                    setIsFirstChampionOpen(false);
                                                }}>
                                                    <span className="">{champ.koreanName}</span>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                    </Popover>
                    <Popover open={isSecondChampionOpen} onOpenChange={setIsSecondChampionOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[120px]">
                                {enemyChampSearch ? enemyChampSearch.koreanName : '상대 챔피언 선택'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="h-[200px]" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="챔피언 선택..." />
                                <CommandList>
                                    <CommandEmpty>챔피언을 찾을 수 없습니다.</CommandEmpty>
                                    <CommandGroup>
                                        {championDetails.map((champ) => (
                                            <CommandItem key={champ.koreanName} value={champ.koreanName} onSelect={() => {
                                                setEnemyChampSearch(champ);
                                                setIsSecondChampionOpen(false);
                                            }}>
                                                <span className="">{champ.koreanName}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Button className="px-4 bg-gray-300 text-white hover:bg-gray-400" onClick={() => function1(myChampSearch, enemyChampSearch)}>찾기</Button>

                    <Button className="px-2 bg-gray-300 text-white hover:bg-gray-400" onClick={handleReset}>리셋</Button>
                </div>

                <div className="flex flex-row">
                    <div className="w-1/4 mt-2">
                        <Paginations paginatedResult={paginatedResult} email={email} riotPatchNotes={riotPatchNotes} />
                        {/* 페이지네이션 */}
                        <div className="flex mt-2 justify-center">
                            {/* 이전 버튼 */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`text-base px-1 py-1 border rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}
                            >
                                전
                            </button>

                            {/* 페이지 번호 */}
                            {renderPageNumbers()}

                            {/* 다음 버튼 */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`text-base  px-1 py-1 border rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}
                            >
                                후
                            </button>
                        </div>
                    </div>
                    <div className="gap-4 mt-2 w-3/4">
                        <div className="rounded-md p-4 mx-2 bg-white">
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-4 mb-4 ">
                                    <button className="px-4 py-2 bg-blue-300 text-white rounded-md" onClick={() => setSortType('difficulty')}>
                                        난이도
                                    </button>
                                    <button className="px-4 py-2 bg-blue-300 text-white rounded-md" onClick={() => setSortType('winrate')}>
                                        승률
                                    </button>
                                    <button className="px-4 py-2 bg-blue-300 text-white rounded-md" onClick={() => setSortType('count')}>
                                        판수
                                    </button>
                                    <Popover open={abc} onOpenChange={setabc}>
                                        <PopoverTrigger asChild>
                                            <button className="px-4 py-2 bg-blue-300 text-white rounded-md">
                                                세부사항
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[600px]  !important" side="right" align="start">
                                            <Command>
                                                <CommandList className="min-h-[500px] !important">
                                                    <SelectedChampions versusCollection={versusCollection} myChampSearch={myChampSearch} enemyChampSearch={enemyChampSearch} />
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="relative w-[500px] p-2 border-2 overflow-x-auto">
                                    <div className="inline-flex space-x-4">
                                        {sortedData.map((championGroup, index) => (
                                            <div key={index} className="w-[50px] h-[50px] bg-gray-200 flex items-center justify-center cursor-pointer" onClick={() => function2(championGroup.name)}>
                                                {getChampionImg(championGroup.name, 50, 50)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* 난이도 표 (선택된 챔피언을 기준으로 표시) */}
                            {selectedChampion && (
                                <div className="mt-4">
                                    {renderDifficultyChart(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                                </div>
                            )}
                            {selectedChampion && (
                                <div className="mt-2">
                                    <div className='flex flex-row gap-4'>
                                        <div>
                                            {/* 스펠 선호도 */}
                                            <div className="mt-4">
                                                <h3 className="text-center font-semibold">스펠</h3>
                                                <hr className="my-2 border-t border-gray-300" />
                                                <div className="flex flex-row justify-center space-x-4">
                                                    {renderSpellPreference(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                                                </div>
                                            </div>
                                            {/* 완성형 아이템 선호도 */}
                                            <div className="mt-4">
                                                <h3 className="text-center font-semibold">완성형 아이템</h3>
                                                <hr className="my-2 border-t border-gray-300" />
                                                <div className="flex flex-row justify-center space-x-4">
                                                    {renderCompleteItemPreference(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {/* 초반 아이템 선호도 */}
                                            <div className="mt-4">
                                                <h3 className="text-center font-semibold">시작 아이템</h3>
                                                <hr className="my-2 border-t border-gray-300" />
                                                <div className="flex flex-row justify-center space-x-4">
                                                    {renderEarlyItemPreference(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                                                </div>
                                            </div>
                                            {/* 신발 선호도 */}
                                            <div className="mt-4">
                                                <h3 className="text-center font-semibold">신발</h3>
                                                <hr className="my-2 border-t border-gray-300" />
                                                <div className="flex flex-row justify-center space-x-4">
                                                    {renderBootsPreference(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
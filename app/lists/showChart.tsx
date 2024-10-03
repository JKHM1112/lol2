import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { runesReforged } from '../data/runesReforged';
import { runesStatus } from '../data/runesStatus';

const excludedItems = [
    0, 1001, 3006, 3009, 3020, 3047, 3111, 3117, 3158, 1054, 1055, 1056,
    1082, 1083, 1101, 1102, 1103, 1105, 1106, 1107, 3865
];

export default function ShowChart({ chartData, myEnemy }: { chartData: any[], myEnemy: string }) {
    console.log(chartData)
    const [newData, setNewData] = useState<any[]>([]);
    const [sortType, setSortType] = useState<'difficulty' | 'winrate' | 'count'>('difficulty');
    const [selectedChampion, setSelectedChampion] = useState<string | null>(null); // 선택된 챔피언

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

    // 선택된 챔피언의 난이도 평균 계산 함수
    const calculateChampionDifficulty = (champData: any[], field: string) => {
        const total = champData.reduce((sum, item) => sum + (item[field] || 0), 0);
        return total / champData.length;
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

    useEffect(() => {
        const groupedResult = groupByChampion(chartData);
        setNewData(groupedResult); // newData에 저장
    }, [chartData]);

    const sortedData = sortByType(newData, sortType);

    // 챔피언 이미지 가져오기
    const getChampionImg = (champion: string, widthN: number, heightN: number) => (
        <Image className="rounded-md" alt={champion} src={`/champion/${champion}.png`} width={widthN} height={heightN} />
    );
    //spell 숫자로 이미지로 바꿔준다.
    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={40} height={40} />
    //아이템 번호를 가지고 이미지로 바꿔준다.
    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/item/${itemCode}.png`} width={40} height={40} />


    // 선택한 챔피언의 난이도를 시각화하는 함수
    const renderDifficultyChart = (selectedData: any[]) => {
        const fields = ['before6', 'after6', 'side1', 'teamFight1'];
        const labels = ['6전', '6후', '사이드', '한타']; // 좌측에 표시할 라벨들

        return (
            <div className="flex flex-col ">
                <div className='flex flex-row'>
                    <h3 className='w-1/3 text-center'>평균</h3>
                    <h3 className='w-1/3 text-center'>{selectedChampion}</h3>
                    <h3 className='w-1/3 text-center'>레벨업 비교 (2~6레벨)</h3>
                </div>
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
                                    newData.find(champ => champ.name === selectedChampion)?.data || []
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // **스펠, 아이템 선호도 계산 함수**
    const getMostFrequent = (arr: number[], topN: number) => {
        const frequencyMap = arr.reduce((acc: { [key: number]: number }, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

        // 빈도를 기준으로 정렬하여 상위 topN 항목을 반환
        return Object.entries(frequencyMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN)
            .map(entry => Number(entry[0]));
    };

    // 선택된 챔피언의 스펠 선호도
    const renderSpellPreference = (selectedData: any[]) => {
        const allSpells = selectedData.flatMap(item => item.summoners.slice(0, 2)); // 각 게임의 스펠 목록
        const topSpells = getMostFrequent(allSpells, 2); // 상위 2개의 스펠
        return topSpells.map((spellId, index) => (
            <div key={index} className="flex items-center justify-center">
                {getSpellImg(spellId)} {/* 스펠 아이디로 이미지를 출력할 수 있음 */}
            </div>
        ));
    };

    // 선택된 챔피언의 초반 아이템 선호도 (초반 2분 내 구매한 아이템)
    const renderEarlyItemPreference = (selectedData: any[]) => {
        const earlyItems = selectedData.flatMap(item => item.items.slice(0, 7).filter((itemId: number) => isEarlyItem(itemId))); // 2분 내에 구매한 아이템 (첫 2개)
        const topEarlyItems = getMostFrequent(earlyItems, 1);
        return topEarlyItems.map((itemId, index) => (
            <div key={index} className="flex items-center justify-center">
                {getItemImg(itemId)}
            </div>
        ));
    };

    // 선택된 챔피언의 완성형 아이템 선호도
    const renderCompleteItemPreference = (selectedData: any[]) => {
        const allItems = selectedData.flatMap(item => item.items.slice(0, 6)).filter(itemId => !excludedItems.includes(itemId));// 각 게임의 모든 아이템 목록
        const topItems = getMostFrequent(allItems, 3); // 상위 3개의 아이템
        return topItems.map((itemId, index) => (
            <div key={index} className="flex items-center justify-center">
                {getItemImg(itemId)}
            </div>
        ));
    };

    //선택된 신발
    const renderBootsPreference = (selectedData: any[]) => {
        const boots = selectedData.flatMap(item => item.items.filter((itemId: number) => isBootItem(itemId))); // 신발만 필터링
        const topBoots = getMostFrequent(boots, 1); // 상위 1개의 신발
        return topBoots.map((itemId, index) => (
            <div key={index} className="flex items-center justify-center">
                {getItemImg(itemId)}
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

    const renderLevelUpComparison = (selectedData: any[], opponentData: any[]) => {
        const labels = ['2렙', '3렙', '4렙', '5렙', '6렙'];

        return (
            <div className="space-y-2">
                {labels.map((label, index) => {
                    const myLevelTime = selectedData.flatMap(item => item.timeLineLevel1[index].timestamp)
                    const enemyLevelTime = selectedData.flatMap(item => item.timeLineLevel2[index].timestamp)

                    return (
                        <div key={label} className="flex items-center">
                            <div className={`w-[50px] h-[20px] ${myLevelTime < enemyLevelTime ? 'bg-blue-500' : ''}`}>
                                {myLevelTime ? '나' : ''}
                            </div>
                            <div className="w-[50px] text-center">{label}</div>
                            <div className={`w-[50px] h-[20px] ${enemyLevelTime < myLevelTime ? 'bg-red-500' : ''}`}>
                                {enemyLevelTime ? '상대' : ''}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };
    if (!chartData || chartData.length === 0) {
        // chartData가 없거나 빈 배열일 경우에는 아무것도 렌더링하지 않음
        return null;
    }

    return (
        <div className="flex flex-col">
            {/* 정렬 기준 선택 버튼 */}
            <div className="flex flex-row gap-4 mb-4 ">
                <button className="px-4 py-2 bg-blue-400 text-white rounded-md" onClick={() => setSortType('difficulty')}>
                    난이도
                </button>
                <button className="px-4 py-2 bg-blue-400 text-white rounded-md" onClick={() => setSortType('winrate')}>
                    승률
                </button>
                <button className="px-4 py-2 bg-blue-400 text-white rounded-md" onClick={() => setSortType('count')}>
                    판수
                </button>
            </div>

            {/* 챔피언 이미지 슬라이더 */}
            <div className="relative w-[500px] p-2 border-2 overflow-x-auto">
                <div className="inline-flex space-x-4">
                    {sortedData.map((championGroup, index) => (
                        <div key={index} className="w-[50px] h-[50px] bg-gray-200 flex items-center justify-center cursor-pointer" onClick={() => setSelectedChampion(championGroup.name)}>
                            {getChampionImg(championGroup.name, 50, 50)}
                        </div>
                    ))}
                </div>
            </div>

            {/* 난이도 표 (선택된 챔피언을 기준으로 표시) */}
            {selectedChampion && (
                <div className="mt-4">
                    {renderDifficultyChart(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                </div>
            )}

            {selectedChampion && (
                <div className="mt-4">
                    <div className='flex flex-row gap-4'>
                        {/* 스펠 선호도 */}
                        <div className="mt-4">
                            <h3>스펠</h3>
                            <div className="flex flex-row space-x-4">
                                {renderSpellPreference(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                            </div>
                        </div>

                        {/* 초반 아이템 선호도 */}
                        <div className="mt-4">
                            <h3>시작 아이템</h3>
                            <div className="flex flex-row space-x-4">
                                {renderEarlyItemPreference(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                            </div>
                        </div>

                        {/* 신발 선호도 */}
                        <div className="mt-4">
                            <h3>신발</h3>
                            <div className="flex flex-row space-x-4">
                                {renderBootsPreference(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                            </div>
                        </div>

                        {/* 완성형 아이템 선호도 */}
                        <div className="mt-4">
                            <h3>완성형 아이템</h3>
                            <div className="flex flex-row space-x-4">
                                {renderCompleteItemPreference(newData.find(champ => champ.name === selectedChampion)?.data || [])}
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
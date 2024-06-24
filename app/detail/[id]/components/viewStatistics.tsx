'use client'

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Label } from 'recharts';

// 인터페이스 정의
interface JungleMobCount {
    HORDE: number;
    RIFTHERALD: number;
    BARON_NASHOR: number;
    DRAGON: number;
}

interface VisionScores {
    myVisionScore: number;
    averageVisionScore: string;
    opponentVisionScore: number;
}

interface TurretPlates {
    myTurretPlatesTaken: number;
    averageTurretPlatesTaken: string;
    opponentTurretPlatesTaken: number;
}

interface JungleMobsComparison {
    myJungleMobsCount: JungleMobCount;
    averageSimilarJungleMobsCount: JungleMobCount;
}

interface LevelUpComparison {
    level2: { yes: number; no: number };
    level3: { yes: number; no: number };
    level6: { yes: number; no: number };
}

interface DetailProps {
    filteredChamps: any[];
    mydetail: any;
}

export default function ViewStatistics({ filteredChamps, mydetail }: DetailProps) {
    const [selectedChart, setSelectedChart] = useState<string>('visionScore');

    // 데이터 비교 함수들
    function compareVisionScores(mydetail: any, filteredChamps: any[]): VisionScores {
        const myVisionScore = mydetail.visionScore[0];
        const opponentVisionScore = mydetail.visionScore[1];
        const averageVisionScore = (filteredChamps.reduce((acc, champ) => acc + champ.visionScore[0], 0) / filteredChamps.length).toFixed(1);
        return {
            myVisionScore,
            opponentVisionScore,
            averageVisionScore
        };
    }

    function compareTurretPlatesTaken(mydetail: any, filteredChamps: any[]): TurretPlates {
        const myTurretPlatesTaken = mydetail.turretPlatesTaken[0];
        const opponentTurretPlatesTaken = mydetail.turretPlatesTaken[1];
        const averageTurretPlatesTaken = (filteredChamps.reduce((acc, champ) => acc + champ.turretPlatesTaken[0], 0) / filteredChamps.length).toFixed(1);
        return {
            myTurretPlatesTaken,
            opponentTurretPlatesTaken,
            averageTurretPlatesTaken
        };
    }

    function countJungleMobs(jungleMobs: string[]): JungleMobCount {
        const counts: JungleMobCount = { HORDE: 0, RIFTHERALD: 0, BARON_NASHOR: 0, DRAGON: 0 };
        jungleMobs.forEach(monster => {
            if (counts.hasOwnProperty(monster)) {
                counts[monster as keyof JungleMobCount]++;
            }
        });
        return counts;
    }

    function compareJungleMobs(mydetail: any, filteredChamps: any[]): JungleMobsComparison {
        const myJungleMobs = mydetail.timeLineObject1.map((obj: any) => obj.monsterType);
        const similarJungleMobs = filteredChamps.flatMap(champ => champ.timeLineObject1.map((obj: any) => obj.monsterType));

        const myJungleMobsCount = countJungleMobs(myJungleMobs);
        const similarJungleMobsCount = countJungleMobs(similarJungleMobs);
        const averageSimilarJungleMobsCount: JungleMobCount = {
            HORDE: Number((similarJungleMobsCount.HORDE / filteredChamps.length).toFixed(1)),
            RIFTHERALD: Number((similarJungleMobsCount.RIFTHERALD / filteredChamps.length).toFixed(1)),
            BARON_NASHOR: Number((similarJungleMobsCount.BARON_NASHOR / filteredChamps.length).toFixed(1)),
            DRAGON: Number((similarJungleMobsCount.DRAGON / filteredChamps.length).toFixed(1))
        };

        return {
            myJungleMobsCount,
            averageSimilarJungleMobsCount
        };
    }

    function compareLevelUpSpeed(mydetail: any, filteredChamps: any[]): LevelUpComparison {
        const myLevelTimes = mydetail.timeLineLevel1.map((level: any) => level.timestamp);
        const level2Results = filteredChamps.map(champ => myLevelTimes[0] < champ.timeLineLevel2[0].timestamp);
        const level3Results = filteredChamps.map(champ => myLevelTimes[1] < champ.timeLineLevel2[1].timestamp);
        const level6Results = filteredChamps.map(champ => myLevelTimes[4] < champ.timeLineLevel2[4].timestamp);

        const comparison: LevelUpComparison = {
            level2: {
                yes: level2Results.filter(result => result).length,
                no: level2Results.filter(result => !result).length
            },
            level3: {
                yes: level3Results.filter(result => result).length,
                no: level3Results.filter(result => !result).length
            },
            level6: {
                yes: level6Results.filter(result => result).length,
                no: level6Results.filter(result => !result).length
            }
        };

        return comparison;
    }

    const visionScores = compareVisionScores(mydetail, filteredChamps);
    const turretPlates = compareTurretPlatesTaken(mydetail, filteredChamps);
    const jungleMobs = compareJungleMobs(mydetail, filteredChamps);
    const levelUpComparison = compareLevelUpSpeed(mydetail, filteredChamps);

    // 차트 데이터 준비
    const jungleMobsData = [
        { name: '유충', myCount: jungleMobs.myJungleMobsCount.HORDE, avgCount: jungleMobs.averageSimilarJungleMobsCount.HORDE },
        { name: '전령', myCount: jungleMobs.myJungleMobsCount.RIFTHERALD, avgCount: jungleMobs.averageSimilarJungleMobsCount.RIFTHERALD },
        { name: '바론', myCount: jungleMobs.myJungleMobsCount.BARON_NASHOR, avgCount: jungleMobs.averageSimilarJungleMobsCount.BARON_NASHOR },
        { name: '용', myCount: jungleMobs.myJungleMobsCount.DRAGON, avgCount: jungleMobs.averageSimilarJungleMobsCount.DRAGON }
    ];

    const visionScoreData = [
        { name: '내 시야 점수', value: visionScores.myVisionScore },
        { name: '상대 시야 점수', value: visionScores.opponentVisionScore },
        { name: '내 평균 시야 점수', value: parseFloat(visionScores.averageVisionScore) }
    ];

    const turretPlatesData = [
        { name: '내 포탑골드', value: turretPlates.myTurretPlatesTaken },
        { name: '상대 포탑골드', value: turretPlates.opponentTurretPlatesTaken },
        { name: '내 평균 포탑 골드', value: parseFloat(turretPlates.averageTurretPlatesTaken) }
    ];

    // 기타 계산 함수들
    const calculateAverageValues = (values: number[]) => {
        const total = values.reduce((acc, value) => acc + value, 0);
        return (total / values.length).toFixed(2);
    };

    const getGameResultCounts = (items: any[]) => {
        const resultCounts = {
            win: 0,
            lose: 0,
        };

        items.forEach(item => {
            if (item.gameResult === '승리') resultCounts.win++;
            else if (item.gameResult === '패배') resultCounts.lose++;
        });

        return resultCounts;
    };

    const getLineResultCounts = (items: any[]) => {
        const resultCounts = {
            win: 0,
            Lose: 0,
            even: 0,
        };

        items.forEach(item => {
            if (item.lineResult === '승리') resultCounts.win++;
            else if (item.lineResult === '패배') resultCounts.Lose++;
            else if (item.lineResult === '반반') resultCounts.even++;
        });

        return resultCounts;
    };

    const filterByLine = (items: any[], lines: string[]) => {
        if (lines.length === 0) return items;
        return items.filter(item => lines.includes(item.line));
    };

    const [checkedLines, setCheckedLines] = useState<string[]>([]);
    const filteredItems = filterByLine(filteredChamps, checkedLines);
    const averageBefore6 = calculateAverageValues(filteredItems.map(item => item.before6));
    const averageAfter6 = calculateAverageValues(filteredItems.map(item => item.after6));
    const averageSide = calculateAverageValues(filteredItems.map(item => item.side1));
    const averageTeamFight = calculateAverageValues(filteredItems.map(item => item.teamFight1));
    const gameResultCounts = getGameResultCounts(filteredItems);
    const lineResultCounts = getLineResultCounts(filteredItems);

    const barChartData = [
        { name: '평균', Before6: parseFloat(averageBefore6), After6: parseFloat(averageAfter6), Side1: parseFloat(averageSide), TeamFight1: parseFloat(averageTeamFight) },
        { name: mydetail.chams[1], Before6: mydetail.before6, After6: mydetail.after6, Side1: mydetail.side1, TeamFight1: mydetail.teamFight1 }
    ];

    const pieChartData1 = [
        { name: '승리', value: lineResultCounts.win },
        { name: '반반', value: lineResultCounts.even },
        { name: '패배', value: lineResultCounts.Lose },
    ];

    const pieChartData2 = [
        { name: '승리', value: gameResultCounts.win },
        { name: '패배', value: gameResultCounts.lose },
    ];

    const COLORS1 = ['#0088FE', '#FFBB28', '#FF0000'];
    const COLORS2 = ['#0088FE', '#FF0000'];

    return (
        <div>
            <div className="flex justify-center mb-4">
                <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelectedChart('visionScore')}>
                    시야 점수
                </button>
                <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelectedChart('turretPlates')}>
                    포탑 골드
                </button>
                <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelectedChart('jungleMobs')}>
                    오브젝트
                </button>
                <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelectedChart('levelUpSpeed')}>
                    선 렙
                </button>
            </div>
            <div className="w-[450px] h-[400px] mb-4 border border-gray-300 rounded-md p-2">
                {selectedChart === 'visionScore' && (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={visionScoreData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedChart === 'turretPlates' && (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={turretPlatesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedChart === 'jungleMobs' && (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={jungleMobsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="myCount" fill="#8884d8" />
                            <Bar dataKey="avgCount" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedChart === 'levelUpSpeed' && (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                            { name: '선 2렙', 선: levelUpComparison.level2.yes, 후: levelUpComparison.level2.no },
                            { name: '선 3렙', 선: levelUpComparison.level3.yes, 후: levelUpComparison.level3.no },
                            { name: '선 6렙', 선: levelUpComparison.level6.yes, 후: levelUpComparison.level6.no }
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="선" fill="#8884d8" />
                            <Bar dataKey="후" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
            <div className="flex w-[450px] h-[150px] mb-4 border border-gray-300 rounded-md p-2">
                <div className="w-[200px] h-[120px] border rounded-md">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={200} height={100} data={barChartData} layout="vertical" margin={{ top: 10, right: 10, left: 5, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 20]} ticks={[0, 20]} tickFormatter={(tick) => {
                                if (tick === 0) return '쉬움';
                                if (tick === 20) return '어려움';
                                return tick;
                            }}
                                tickLine={false} />
                            <YAxis type="category" dataKey="name" tickLine={false} />
                            <Tooltip
                                wrapperStyle={{ fontSize: '10px', padding: '5px' }}
                                contentStyle={{ fontSize: '10px', padding: '5px' }}
                                itemStyle={{ fontSize: '10px' }}
                                labelStyle={{ fontSize: '10px' }}
                            />
                            <Bar dataKey="Before6" name="6전" stackId="a" fill="#8884d8" barSize={20} />
                            <Bar dataKey="After6" name="6후" stackId="a" fill="#82ca9d" barSize={20} />
                            <Bar dataKey="Side1" name="사이드" stackId="a" fill="#ffc658" barSize={20} />
                            <Bar dataKey="TeamFight1" name="한타" stackId="a" fill="#d88884" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-[120px] h-[120px] border rounded-md">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={80} height={80}>
                            <Pie data={pieChartData1} cx={55} cy={50} startAngle={180} endAngle={0} innerRadius={30} outerRadius={50} fill="#8884d8" paddingAngle={5} dataKey="value">
                                {pieChartData1.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                                ))}
                                <Label className="p-1" value={'라인전'} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                            </Pie>
                            <Pie data={pieChartData2} cx={55} cy={60} startAngle={180} endAngle={360} innerRadius={30} outerRadius={50} fill="#8884d8" paddingAngle={5} dataKey="value">
                                {pieChartData2.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                                ))}
                                <Label className="p-1" value={'게임결과'} position="centerTop" fill="#3498db" style={{ fontSize: '12px' }} />
                            </Pie>
                            <Tooltip
                                wrapperStyle={{ fontSize: '10px', padding: '5px' }}
                                contentStyle={{ fontSize: '10px', padding: '5px' }}
                                itemStyle={{ fontSize: '10px' }}
                                labelStyle={{ fontSize: '10px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

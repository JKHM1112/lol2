'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState, PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';
interface timeLineInterface {
    killerId: number;
    victimId: number;
    assistingParticipantIds: number[];
}

const getChampionImg = (championCode: string) => (
    <Image className='rounded-md' alt={'champion1'} src={`/champion/${championCode}.png`} width={40} height={40} />
)

const selectedKDA = (participantId: number, timeLineKda: timeLineInterface[]): string => {
    let kill = 0;
    let death = 0;
    let assist = 0;
    timeLineKda.forEach((kda) => {
        if (kda.killerId === participantId) kill++;
        if (kda.victimId === participantId) death++;
        if (Array.isArray(kda.assistingParticipantIds) && kda.assistingParticipantIds.includes(participantId)) assist++;
    });
    return `${kill}/${death}/${assist}`;
};

const calculateAverageKDA = (items: any[], participantId: number) => {
    let totalKill = 0;
    let totalDeath = 0;
    let totalAssist = 0;
    let count = 0;

    items.forEach(item => {
        item.timeLineKda1.forEach((kda: timeLineInterface) => {
            if (kda.killerId === participantId) totalKill++;
            if (kda.victimId === participantId) totalDeath++;
            if (Array.isArray(kda.assistingParticipantIds) && kda.assistingParticipantIds.includes(participantId)) totalAssist++;
        });
        count++;
    });

    const avgKill = (totalKill / count);
    const avgDeath = (totalDeath / count);
    const avgAssist = (totalAssist / count);

    return `${avgKill.toFixed(0)}/${avgDeath.toFixed(0)}/${avgAssist.toFixed(0)}`;
};

const groupByLineAndChampion = (items: any[]) => {
    const grouped: { [key: string]: any[] } = {};

    items.forEach(item => {
        const key = `${item.line}-${item.chams[1]}`;
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(item);
    });

    return grouped;
};

const filterByLine = (items: any[], lines: string[]) => {
    if (lines.length === 0) return items;
    return items.filter(item => lines.includes(item.line));
};

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

export default function ViewSimilarDetail({ filteredChamps, mydetail }: { filteredChamps: any, mydetail: any }) {
    const [gameMode, setGameMode] = useState("TotalGame");
    const [checkedLines, setCheckedLines] = useState<string[]>([]);

    const lineTypes = ['탑', '정글', '미드', '바텀', '서폿'];

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setCheckedLines(currentLines =>
            checked
                ? [...currentLines, value]
                : currentLines.filter(line => line !== value)
        );
    }
    const filteredItems = filterByLine(filteredChamps, checkedLines);
    const averageBefore6 = calculateAverageValues(filteredItems.map(item => item.before6));
    const averageHalf = calculateAverageValues(filteredItems.map(item => item.half));
    const averageAfter6 = calculateAverageValues(filteredItems.map(item => item.after6));
    const gameResultCounts = getGameResultCounts(filteredItems);
    const lineResultCounts = getLineResultCounts(filteredItems);

    const barChartData = [
        { name: '평균', Before6: parseFloat(averageBefore6), After6: parseFloat(averageAfter6), Half: parseFloat(averageHalf) },
        { name: mydetail.chams[1], Before6: mydetail.before6, After6: mydetail.after6, Half: mydetail.half }
    ]
    const pieChartData1 = [
        { name: '승리', value: lineResultCounts.win },
        { name: '반반', value: lineResultCounts.even },
        { name: '패배', value: lineResultCounts.Lose },

    ]
    const pieChartData2 = [
        { name: '승리', value: gameResultCounts.win },
        { name: '패배', value: gameResultCounts.lose },
    ]
    const COLORS1 = ['#0088FE', '#FFBB28', '#FF0000'];
    const COLORS2 = ['#0088FE', '#FF0000'];
    return (
        <div>
            <div className="w-[450px] h-[300px] mb-4 border border-gray-300 rounded-md p-2">
                <div>
                    <Button onClick={() => setGameMode("TotalGame")}>전체게임</Button>
                    <Button onClick={() => setGameMode("ChampionGame")}>챔피언별</Button>
                </div>
                <div className="flex items-center gap-1 mb-4">
                    {lineTypes.map(line => (
                        <label className="flex items-center gap-1" key={line}>
                            <input type="checkbox" value={line} onChange={handleCheckboxChange} checked={checkedLines.includes(line)} className="mr-2" />
                            {line}
                        </label>
                    ))}
                </div>
                <div className=" overflow-x-auto">
                    <div className="flex">
                        {gameMode === "TotalGame" && (
                            filterByLine(filteredChamps, checkedLines).map((item: any, index: number) => {
                                const participantId = item.timeLineLevel1[0].participantId;
                                return (
                                    <div key={index} className="mb-4 border border-gray-300 rounded-md p-2 w-[200px]">
                                        <Link href={`/detail/${item._id}`}>{getChampionImg(item.chams[1])}</Link>
                                        <div>{item.line}</div>
                                        <div>{item.gameResult}</div>
                                        <div>{selectedKDA(participantId, item.timeLineKda1)}</div>
                                    </div>
                                );
                            })
                        )}
                        {gameMode === "ChampionGame" && (
                            Object.entries(groupByLineAndChampion(filterByLine(filteredChamps, checkedLines))).map(([key, items]: [string, any[]]) => {
                                const participantId = items[0].timeLineLevel1[0].participantId;
                                const count = items.length;
                                return (
                                    <div key={key} className="mb-4 border border-gray-300 rounded-md p-2 w-[200px]">
                                        <div>{getChampionImg(items[0].chams[1])}</div>
                                        <div>{items[0].line}</div>
                                        <div>{calculateAverageKDA(items, participantId)}</div>
                                        <div>경기수: {count}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <div className="w-[450px] h-[330px] mb-4 border border-gray-300 rounded-md p-2 overflow-y-auto">
                <div>
                    {filterByLine(filteredChamps, checkedLines).map((item: any, index: number) => {
                        return (
                            <div key={index} className="mb-4 border border-gray-300 rounded-md p-2">
                                <div>
                                    <div>{getChampionImg(item.chams[1])}</div>
                                    <div>한줄평: {item.review}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex w-[450px] h-[150px] mb-4 border border-gray-300 rounded-md p-2">
                <div className="w-[200px] h-[120px] border rounded-md">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={200} height={100} data={barChartData} layout="vertical" margin={{ top: 10, right: 10, left: 5, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 15]} ticks={[0, 15]} tickFormatter={(tick) => {
                                if (tick === 0) return '쉬움';
                                if (tick === 15) return '어려움';
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
                            <Bar dataKey="Half" name="후반" stackId="a" fill="#ffc658" barSize={20} />
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
                            <Tooltip wrapperStyle={{ fontSize: '10px', padding: '5px' }}
                                contentStyle={{ fontSize: '10px', padding: '5px' }}
                                itemStyle={{ fontSize: '10px' }}
                                labelStyle={{ fontSize: '10px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div >
    );
}

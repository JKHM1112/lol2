import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import Image from "next/image";
import { Accordion, AccordionContent } from '@/components/ui/accordion';
import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Label } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

interface TotalResultProps {
    winTeam: any[];
    loseTeam: any[];
}
export default function TeamAnalysis({ winTeam, loseTeam }: TotalResultProps) {
    const killsWin = [...winTeam.map(player => ({ name: player.championName, kills: player.kills, img: `/championE/${player.championName}.png` }))];
    const killsLose = [...loseTeam.map(player => ({ name: player.championName, kills: player.kills, img: `/championE/${player.championName}.png` }))];
    const damageDealtToChampionsWin = [...winTeam.map(player => ({ name: player.championName, damageDealtToChampions: player.totalDamageDealtToChampions, img: `/championE/${player.championName}.png` }))];
    const damageDealtToChampionsLose = [...loseTeam.map(player => ({ name: player.championName, damageDealtToChampions: player.totalDamageDealtToChampions, img: `/championE/${player.championName}.png` }))];
    const damageTakenWin = [...winTeam.map(player => ({ name: player.championName, damageTaken: player.totalDamageTaken, img: `/championE/${player.championName}.png` }))];
    const damageTakenLose = [...loseTeam.map(player => ({ name: player.championName, damageTaken: player.totalDamageTaken, img: `/championE/${player.championName}.png` }))];
    const goldEarnedWin = [...winTeam.map(player => ({ name: player.championName, goldEarned: player.goldEarned, img: `/championE/${player.championName}.png` }))];
    const goldEarnedLose = [...loseTeam.map(player => ({ name: player.championName, goldEarned: player.goldEarned, img: `/championE/${player.championName}.png` }))];
    const csWin = [...winTeam.map(player => ({ name: player.championName, cs: player.totalMinionsKilled + player.neutralMinionsKilled, img: `/championE/${player.championName}.png` }))];
    const csLose = [...loseTeam.map(player => ({ name: player.championName, cs: player.totalMinionsKilled + player.neutralMinionsKilled, img: `/championE/${player.championName}.png` }))];
    const damageDealtToBuildingsWin = [...winTeam.map(player => ({ name: player.championName, damageDealtToBuildings: player.damageDealtToBuildings, img: `/championE/${player.championName}.png` }))];
    const damageDealtToBuildingsLose = [...loseTeam.map(player => ({ name: player.championName, damageDealtToBuildings: player.damageDealtToBuildings, img: `/championE/${player.championName}.png` }))];

    const totalKillsWin = killsWin.reduce((sum, player) => sum + player.kills, 0);
    const totalKillsLose = killsLose.reduce((sum, player) => sum + player.kills, 0);

    const killSum = [
        { name: 'Win', value: totalKillsWin },
        { name: 'Lose', value: totalKillsLose }
    ];
    const totalDamageDealtToChampionsWin = damageDealtToChampionsWin.reduce((sum, player) => sum + player.damageDealtToChampions, 0);
    const totalDamageDealtToChampionsLose = damageDealtToChampionsLose.reduce((sum, player) => sum + player.damageDealtToChampions, 0);

    const damageDealtToChampionsSum = [
        { name: 'Win', value: totalDamageDealtToChampionsWin },
        { name: 'Lose', value: totalDamageDealtToChampionsLose }
    ];
    const totalDamageTakenWin = damageTakenWin.reduce((sum, player) => sum + player.damageTaken, 0);
    const totalDamageTakenLose = damageTakenLose.reduce((sum, player) => sum + player.damageTaken, 0);

    const damageTakenSum = [
        { name: 'Win', value: totalDamageTakenWin },
        { name: 'Lose', value: totalDamageTakenLose }
    ];

    const totalGoldEarnedWin = goldEarnedWin.reduce((sum, player) => sum + player.goldEarned, 0);
    const totalGoldEarnedLose = goldEarnedLose.reduce((sum, player) => sum + player.goldEarned, 0);

    const goldEarnedSum = [
        { name: 'Win', value: totalGoldEarnedWin },
        { name: 'Lose', value: totalGoldEarnedLose }
    ];

    const totalCsWin = csWin.reduce((sum, player) => sum + player.cs, 0);
    const totalCsLose = csLose.reduce((sum, player) => sum + player.cs, 0);

    const csSum = [
        { name: 'Win', value: totalCsWin },
        { name: 'Lose', value: totalCsLose }
    ];

    const totalDamageDealtToBuildingsWin = damageDealtToBuildingsWin.reduce((sum, player) => sum + player.damageDealtToBuildings, 0);
    const totalDamageDealtToBuildingsLose = damageDealtToBuildingsLose.reduce((sum, player) => sum + player.damageDealtToBuildings, 0);

    const damageDealtToBuildingsSum = [
        { name: 'Win', value: totalDamageDealtToBuildingsWin },
        { name: 'Lose', value: totalDamageDealtToBuildingsLose }
    ];
    interface renderType {
        x: any;
        y: any;
        payload: any;
    }
    const renderCustomAxisTick = ({ x, y, payload }: renderType) => {
        return (
            <foreignObject x={x - 15} y={y + 3} width={20} height={20}>
                <div >
                    <Image src={payload.value} alt={payload.value} width={20} height={20} />
                </div>
            </foreignObject>
        );
    };
    const COLORS = ['#0088FE', '#FF8042'];

    return (
        <Accordion type="single" collapsible>
            <AccordionContent>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            <TableHead className='text-sky-500 text-right'>승리팀</TableHead>
                            <TableHead className='text-rose-500 text-left'>패배팀</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="p-1">
                                <div className="bg-sky-100 text-center  p-1">챔피언 처치</div>
                                <div className="flex justify-between">
                                    <div className="bg-sky-100 p-1 w-1/3">
                                        <ResponsiveContainer width={120} height={165} >
                                            <ComposedChart layout="vertical" data={killsWin} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="kills" barSize={20} fill="#3498db">
                                                    <LabelList dataKey="kills" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="">
                                        <PieChart width={90} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                            <Pie data={killSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {killSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalKillsWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalKillsLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="bg-rose-100 p-1 w-1/3">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={killsLose} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="kills" barSize={20} fill="#e74c3c">
                                                    <LabelList dataKey="kills" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-sky-100 text-center  p-1 ">챔피언에게 가한 피해량</div>
                                <div className="flex justify-between">
                                    <div className="bg-rose-100 p-1 w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={damageDealtToChampionsWin} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageDealtToChampions" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="damageDealtToChampions" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="">
                                        <PieChart width={90} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                            <Pie data={damageDealtToChampionsSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {damageDealtToChampionsSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalKillsWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalKillsLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="bg-rose-100 p-1 w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={damageDealtToChampionsLose} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageDealtToChampions" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="damageDealtToChampions" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-sky-100 text-center  p-1 ">받은 피해량</div>
                                <div className="flex justify-between">
                                    <div className="bg-rose-100 p-1 w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={damageTakenWin} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageTaken" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="damageTaken" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="">
                                        <PieChart width={90} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                            <Pie data={damageTakenSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {damageTakenSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalDamageTakenWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalDamageTakenLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="bg-rose-100 p-1 w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={damageTakenLose} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageTaken" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="damageTaken" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="p-1">
                                <div className="bg-sky-100 text-center  p-1">골드 획득량</div>
                                <div className="flex justify-between">
                                    <div className="bg-rose-100 x w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={goldEarnedWin} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="goldEarned" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="goldEarned" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="">
                                        <PieChart width={90} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                            <Pie data={goldEarnedSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {goldEarnedSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalGoldEarnedWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalGoldEarnedLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="bg-rose-100 p-1 w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={goldEarnedLose} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="goldEarned" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="goldEarned" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-sky-100 text-center  p-1 ">CS</div>
                                <div className="flex justify-between">
                                    <div className="bg-rose-100 p-1 w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={csWin} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="cs" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="cs" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="">
                                        <PieChart width={90} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                            <Pie data={csSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {csSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalCsWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalCsLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="bg-rose-100 p-1 w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={csLose} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="cs" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="cs" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-sky-100 text-center  p-1 ">포탑 피해량</div>
                                <div className="flex justify-between">
                                    <div className="bg-rose-100 p-1 w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={damageDealtToBuildingsWin} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageDealtToBuildings" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="damageDealtToBuildings" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="">
                                        <PieChart width={90} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                            <Pie data={damageDealtToBuildingsSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {damageDealtToBuildingsSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalDamageDealtToBuildingsWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalDamageDealtToBuildingsLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="bg-rose-100 p-1 w-1/2">
                                        <ResponsiveContainer width={120} height={165}>
                                            <ComposedChart layout="vertical" data={damageDealtToBuildingsLose} margin={{ top: 10, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageDealtToBuildings" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="damageDealtToBuildings" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </AccordionContent>
        </Accordion >
    );
}

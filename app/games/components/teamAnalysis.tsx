import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import Image from "next/image";
import { Accordion, AccordionContent } from '@/components/ui/accordion';
import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Label } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { cn } from "@/lib/utils";


export default function TeamAnalysis({ allPlayers, gameResult }: any) {

    const getTotalSum = (array: any, key: any) => {
        return array.reduce((sum: any, player: any) => sum + (player[key] ?? 0), 0);
    };
    const totalKillsWin = getTotalSum(allPlayers.slice(0, 5), 'kills');
    const totalKillsLose = getTotalSum(allPlayers.slice(5, 10), 'kills');
    const killSum = [
        { name: 'Win', value: totalKillsWin },
        { name: 'Lose', value: totalKillsLose }
    ];
    const totalDamageDealtToChampionsWin = getTotalSum(allPlayers.slice(0, 5), 'totalDamageDealtToChampions');
    const totalDamageDealtToChampionsLose = getTotalSum(allPlayers.slice(5, 10), 'totalDamageDealtToChampions');

    const damageDealtToChampionsSum = [
        { name: 'Win', value: totalDamageDealtToChampionsWin },
        { name: 'Lose', value: totalDamageDealtToChampionsLose }
    ];

    const totalDamageTakenWin = getTotalSum(allPlayers.slice(0, 5), 'totalDamageTaken');
    const totalDamageTakenLose = getTotalSum(allPlayers.slice(5, 10), 'totalDamageTaken');

    const damageTakenSum = [
        { name: 'Win', value: totalDamageTakenWin },
        { name: 'Lose', value: totalDamageTakenLose }
    ];

    const totalGoldEarnedWin = getTotalSum(allPlayers.slice(0, 5), 'goldEarned');
    const totalGoldEarnedLose = getTotalSum(allPlayers.slice(5, 10), 'goldEarned');

    const goldEarnedSum = [
        { name: 'Win', value: totalGoldEarnedWin },
        { name: 'Lose', value: totalGoldEarnedLose }
    ];

    const totalCsWin = getTotalSum(allPlayers.slice(0, 5), 'totalMinionsKilled');
    const totalCsLose = getTotalSum(allPlayers.slice(5, 10), 'totalMinionsKilled');

    const csSum = [
        { name: 'Win', value: totalCsWin },
        { name: 'Lose', value: totalCsLose }
    ];

    const totalDamageDealtToBuildingsWin = getTotalSum(allPlayers.slice(0, 5), 'damageDealtToBuildings');
    const totalDamageDealtToBuildingsLose = getTotalSum(allPlayers.slice(5, 10), 'damageDealtToBuildings');

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
                        <TableRow className="bg-gray-200 hover:bg-gray-200">
                            <TableHead className='text-sky-500 bg-blue-200 text-right'>승리팀</TableHead>
                            <TableHead className='text-rose-500 bg-red-200 text-left'>패배팀</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="p-1">
                                <div className={cn("text-center p-1", gameResult == 'win' ? 'bg-sky-200' : 'bg-rose-200')}>챔피언 처치</div>
                                <div className="flex justify-between">
                                    <div className="w-1/3 bg-gradient-to-r from-sky-200 to-sky-100">
                                        <ResponsiveContainer width={105} height={165} >
                                            <ComposedChart layout="vertical" data={allPlayers.slice(0, 5)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="kills" barSize={20} fill="#3498db">
                                                    <LabelList dataKey="kills" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-sky-100 to-rose-100">
                                        <PieChart width={100} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                                            <Pie data={killSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {killSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalKillsWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalKillsLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-rose-100 to-rose-200">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(5, 10)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="kills" barSize={20} fill="#e74c3c">
                                                    <LabelList dataKey="kills" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className={cn("text-center p-1", gameResult == 'win' ? 'bg-sky-200' : 'bg-rose-200')}>가한 피해량</div>
                                <div className="flex justify-between">
                                    <div className="w-1/3 bg-gradient-to-r from-sky-200 to-sky-100">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(0, 5)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="totalDamageDealtToChampions" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="totalDamageDealtToChampions" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-sky-100 to-rose-100">
                                        <PieChart width={100} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                                            <Pie data={damageDealtToChampionsSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {damageDealtToChampionsSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalDamageDealtToChampionsWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalDamageDealtToChampionsLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-rose-100 to-rose-200">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(5, 10)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="totalDamageDealtToChampions" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="totalDamageDealtToChampions" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className={cn("text-center p-1", gameResult == 'win' ? 'bg-sky-200' : 'bg-rose-200')}>받은 피해량</div>
                                <div className="flex justify-between">
                                    <div className="w-1/3 bg-gradient-to-r from-sky-200 to-sky-100">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(0, 5)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="totalDamageTaken" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="totalDamageTaken" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-sky-100 to-rose-100">
                                        <PieChart width={100} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                                            <Pie data={damageTakenSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {damageTakenSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalDamageTakenWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalDamageTakenLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-rose-100 to-rose-200">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(5, 10)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="totalDamageTaken" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="totalDamageTaken" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="p-1">
                                <div className={cn("text-center p-1", gameResult == 'win' ? 'bg-sky-200' : 'bg-rose-200')}>골드 획득량</div>
                                <div className="flex justify-between">
                                    <div className="w-1/3 bg-gradient-to-r from-sky-200 to-sky-100">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(0, 5)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="goldEarned" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="goldEarned" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-sky-100 to-rose-100">
                                        <PieChart width={100} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                                            <Pie data={goldEarnedSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {goldEarnedSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalGoldEarnedWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalGoldEarnedLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-rose-100 to-rose-200">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(5, 10)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="goldEarned" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="goldEarned" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className={cn("text-center p-1", gameResult == 'win' ? 'bg-sky-200' : 'bg-rose-200')}>CS</div>
                                <div className="flex justify-between">
                                    <div className="w-1/3 bg-gradient-to-r from-sky-200 to-sky-100">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(0, 5)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="totalMinionsKilled" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="totalMinionsKilled" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-sky-100 to-rose-100">
                                        <PieChart width={100} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                                            <Pie data={csSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {csSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalCsWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalCsLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-rose-100 to-rose-200">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(5, 10)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="totalMinionsKilled" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="totalMinionsKilled" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className={cn("text-center p-1", gameResult == 'win' ? 'bg-sky-200' : 'bg-rose-200')}>포탑 피해량</div>
                                <div className="flex justify-between">
                                    <div className="w-1/3 bg-gradient-to-r from-sky-200 to-sky-100">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(0, 5)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageDealtToBuildings" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="damageDealtToBuildings" position="insideLeft" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-sky-100 to-rose-100">
                                        <PieChart width={100} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                                            <Pie data={damageDealtToBuildingsSum} cx={45} cy={100} innerRadius={25} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                                {damageDealtToBuildingsSum.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                <Label className="p-1" value={totalDamageDealtToBuildingsWin} position="centerBottom" fill="#3498db" style={{ fontSize: '12px' }} />
                                                <Label className="p-1" value={totalDamageDealtToBuildingsLose} position="centerTop" fill="#e74c3c" style={{ fontSize: '12px' }} />
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="w-1/3 bg-gradient-to-r from-rose-100 to-rose-200">
                                        <ResponsiveContainer width={105} height={165}>
                                            <ComposedChart layout="vertical" data={allPlayers.slice(5, 10)} margin={{ top: 20, right: -20, bottom: 0, left: -20 }}>
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

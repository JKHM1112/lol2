import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import Image from "next/image";
import { Accordion, AccordionContent } from '@/components/ui/accordion';
import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';

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

    interface renderType {
        x: any;
        y: any;
        payload: any;
    }
    const renderCustomAxisTick = ({ x, y, payload }: renderType) => {
        return (
            <foreignObject x={x - 30} y={y} width={25} height={25}>
                <div >
                    <Image src={payload.value} alt={payload.value} width={25} height={25} />
                </div>
            </foreignObject>
        );
    };


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
                            <TableCell className="p-4">
                                <div className="bg-sky-100 text-center mb-4 p-2">챔피언 처치</div>
                                <div className="flex justify-between">
                                    <div className="bg-rose-100 p-2 w-1/2">
                                        <ResponsiveContainer width={190} height={190}>
                                            <ComposedChart layout="vertical" data={killsWin} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="kills" barSize={20} fill="#3498db">
                                                    <LabelList dataKey="kills" position="center" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="bg-rose-100 p-2 w-1/2">
                                        <ResponsiveContainer width={190} height={190}>
                                            <ComposedChart layout="vertical" data={killsLose} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />

                                                <Bar dataKey="kills" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="kills" position="center" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-sky-100 text-center mb-4 p-2 mt-4">챔피언에게 가한 피해량</div>
                                <div className="flex justify-between">
                                    <div className="bg-sky-100 p-2 w-1/2">
                                        <ResponsiveContainer width={190} height={190}>
                                            <ComposedChart layout="vertical" data={damageDealtToChampionsWin} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageDealtToChampions" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="damageDealtToChampions" position="center" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="bg-rose-100 p-2 w-1/2">
                                        <ResponsiveContainer width={190} height={190}>
                                            <ComposedChart layout="vertical" data={damageDealtToChampionsLose} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageDealtToChampions" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="damageDealtToChampions" position="center" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-sky-100 text-center mb-4 p-2 mt-4">받은 피해량</div>
                                <div className="flex justify-between">
                                    <div className="bg-sky-100 p-2 w-1/2">
                                        <ResponsiveContainer width={190} height={190}>
                                            <ComposedChart layout="vertical" data={damageTakenWin} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageTaken" barSize={20} fill="#3498db" >
                                                    <LabelList dataKey="damageTaken" position="center" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="bg-rose-100 p-2 w-1/2">
                                        <ResponsiveContainer width={190} height={190}>
                                            <ComposedChart layout="vertical" data={damageTakenLose} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                <Bar dataKey="damageTaken" barSize={20} fill="#e74c3c" >
                                                    <LabelList dataKey="damageTaken" position="center" fill="#000000" />
                                                </Bar>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div className="bg-sky-100 text-center mb-4 p-2 mt-4">골드 획득량</div>
                                    <div className="flex justify-between">
                                        <div className="bg-sky-100 p-2 w-1/2">
                                            <ResponsiveContainer width={190} height={190}>
                                                <ComposedChart layout="vertical" data={goldEarnedWin} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                    <Bar dataKey="goldEarned" barSize={20} fill="#3498db" >
                                                        <LabelList dataKey="goldEarned" position="center" fill="#000000" />
                                                    </Bar>
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="bg-rose-100 p-2 w-1/2">
                                            <ResponsiveContainer width={190} height={190}>
                                                <ComposedChart layout="vertical" data={goldEarnedLose} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                    <Bar dataKey="goldEarned" barSize={20} fill="#e74c3c" >
                                                        <LabelList dataKey="goldEarned" position="center" fill="#000000" />
                                                    </Bar>
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="bg-sky-100 text-center mb-4 p-2 mt-4">CS</div>
                                    <div className="flex justify-between">
                                        <div className="bg-sky-100 p-2 w-1/2">
                                            <ResponsiveContainer width={190} height={190}>
                                                <ComposedChart layout="vertical" data={csWin} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                    <Bar dataKey="cs" barSize={20} fill="#3498db" >
                                                        <LabelList dataKey="cs" position="center" fill="#000000" />
                                                    </Bar>
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="bg-rose-100 p-2 w-1/2">
                                            <ResponsiveContainer width={190} height={190}>
                                                <ComposedChart layout="vertical" data={csLose} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                    <Bar dataKey="cs" barSize={20} fill="#e74c3c" >
                                                        <LabelList dataKey="cs" position="center" fill="#000000" />
                                                    </Bar>
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="bg-sky-100 text-center mb-4 p-2 mt-4">포탑 피해량</div>
                                    <div className="flex justify-between">
                                        <div className="bg-sky-100 p-2 w-1/2">
                                            <ResponsiveContainer width={190} height={190}>
                                                <ComposedChart layout="vertical" data={damageDealtToBuildingsWin} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                    <Bar dataKey="damageDealtToBuildings" barSize={20} fill="#3498db" >
                                                        <LabelList dataKey="damageDealtToBuildings" position="center" fill="#000000" />
                                                    </Bar>
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="bg-rose-100 p-2 w-1/2">
                                            <ResponsiveContainer width={190} height={190}>
                                                <ComposedChart layout="vertical" data={damageDealtToBuildingsLose} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="img" type="category" scale="band" tick={renderCustomAxisTick} />
                                                    <Bar dataKey="damageDealtToBuildings" barSize={20} fill="#e74c3c" >
                                                        <LabelList dataKey="damageDealtToBuildings" position="center" fill="#000000" />
                                                    </Bar>
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </div>
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

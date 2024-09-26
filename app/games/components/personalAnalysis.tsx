'use client';
import { championFull } from "@/app/data/championFull";
import Image from "next/image";
import React from "react";

export default function PersonalAnalysis({ allPlayers, puuid, rankResultTimeline }: any) {

    const getSkillImage = (skillSlot: number) => {
        const champion = Object.values(championFull.data).find((cham: any) => cham.id === selectedData.championName || cham.key === selectedData.championName);
        if (!champion) {
            return '';
        }
        const spell = champion.spells[skillSlot];
        if (!spell) {
            return '';
        }
        return spell.image.full;
    };

    const temporaryData = allPlayers.find((data: any) => data.puuid === puuid);

    const blueTeam = allPlayers.slice(0, 5);
    const redTeam = allPlayers.slice(5, 10);

    const [selectedData, setSelectedData] = React.useState(temporaryData);
    console.log(selectedData)
    const handlePlayerSelect = (player: any) => {
        setSelectedData(player);
    };

    // 아이템 번호를 가지고 이미지로 바꿔준다.
    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/item/${itemCode}.png`} width={30} height={30} />

    // 챔피언 영문으로 이미지로 바꿔주는 함수
    const getChampionImg = (championCode: string, widthN: number, heightN: number) => <Image className='m-1 rounded-md' alt={'champion1'} src={`/champion/${championCode}.png`} width={widthN} height={heightN} />

    //챔피언 영문킬을 이미지로 바꿔주는함수
    const getSkillImg = (skillCode: string) => <Image className='rounded-md' alt={'spell'} src={`/spell/${skillCode}`} width={30} height={30} />

    // 특정 플레이어의 아이템 구매 이벤트 필터링 함수
    const filterItemPurchases = (participantId: number, timeline: any) => {
        const itemEvents = [];
        for (const frame of timeline.info.frames) {
            const events = frame.events.filter(
                (event: any) => event.type === 'ITEM_PURCHASED' && event.participantId === participantId
            );
            itemEvents.push(...events);
        }
        return itemEvents;
    };

    // 아이템을 시간 기준으로 그룹화하는 함수
    const groupItemsByTime = (events: any[]) => {
        const groupedItems: any = {};
        events.forEach((event: any) => {
            const timeInMinutes = Math.floor(event.timestamp / 60000); // 분 단위로 계산
            if (!groupedItems[timeInMinutes]) {
                groupedItems[timeInMinutes] = [];
            }
            groupedItems[timeInMinutes].push(event);
        });
        return groupedItems;
    };

    // 특정 플레이어의 스킬 레벨업 이벤트 필터링 함수
    const filterSkillLevelUp = (participantId: number, timeline: any) => {
        const skillEvents: number[] = [];
        for (const frame of timeline.info.frames) {
            const events = frame.events.filter(
                (event: any) => event.type === 'SKILL_LEVEL_UP' && event.participantId === participantId
            );
            skillEvents.push(...events.map((event: any) => event.skillSlot));
        }
        return skillEvents;
    };
    const buildSkillSlotArray = (skillLevels: number[]) => {
        const table: any[] = Array.from({ length: 4 }, () => Array(18).fill(null)); // 4행 18열

        let colIndex = 0;
        skillLevels.forEach((slot, index) => {
            // 스킬 슬롯 값에 따라 해당 행에 값을 채움 (1 = Q, 2 = W, 3 = E, 4 = R)
            if (slot >= 1 && slot <= 4) {
                table[slot - 1][colIndex] = index + 1; // 1-based index
                colIndex++;
            }
        });

        return table;
    };
    const getRowStyle = (rowIndex: number) => {
        switch (rowIndex) {
            case 0:
                return 'bg-red-300'; // Q 행의 스타일
            case 1:
                return 'bg-green-300'; // W 행의 스타일
            case 2:
                return 'bg-blue-300'; // E 행의 스타일
            case 3:
                return 'bg-yellow-300'; // R 행의 스타일
            default:
                return '';
        }
    };
    const renderSkillTable = (skillLevels: number[]) => {
        const table = buildSkillSlotArray(skillLevels);

        return (
            <table className="justify-items-end w-2/3 table-fixed bg-gray-100 rounded-md ml-4">
                <tbody>
                    {table.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* Q, W, E, R 각각 첫 번째 열에 표시 */}
                            <td className=" text-center font-bold">
                                {rowIndex === 0 ? 'Q' : rowIndex === 1 ? 'W' : rowIndex === 2 ? 'E' : 'R'}
                            </td>
                            {row.map((col: number, colIndex: number) => (
                                <td key={colIndex} className={`text-center text-white  ${getRowStyle(rowIndex)}`}>
                                    {col ? col : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    return (
        <div className="p-2 items-center">
            <div className="flex justify-between mb-4">
                {/* 좌측(블루팀) 플레이어 버튼 */}
                <div className="flex">
                    <div className="flex bg-blue-200 items-center rounded-md border-gray-200 border-2">
                        <h3 className="font-bold pr-2">승리팀</h3>
                        {blueTeam.map((player: any, index: number) => (
                            <button key={index} className="" onClick={() => handlePlayerSelect(player)} >
                                {getChampionImg(player.championName, 25, 25)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 우측(레드팀) 플레이어 버튼 */}
                <div className="flex">
                    <div className="flex bg-red-200 items-center rounded-md border-gray-200 border-2">
                        {redTeam.map((player: any, index: number) => (
                            <button key={index} className="" onClick={() => handlePlayerSelect(player)} >
                                {getChampionImg(player.championName, 25, 25)}
                            </button>
                        ))}
                        <h3 className="font-bold pl-2">패배팀</h3>
                    </div>
                </div>
            </div>

            {selectedData && (
                <div>

                    <div className="bg-white items-center rounded-t-lg border-gray-200 border-2">
                        <h3 className="font-bold p-2">아이템 빌드</h3>
                    </div>

                    <div className="flex flex-wrap bg-white p-2 border-gray-200 border-2">
                        {/* 선택된 플레이어의 아이템 구매 이벤트 그룹화 */}
                        {Object.entries(groupItemsByTime(filterItemPurchases(selectedData.participantId, rankResultTimeline)))
                            .map(([time, events]: any[], index: number) => (
                                <div key={index} className="flex items-center mb-2">
                                    <div>
                                        <div className="flex">
                                            {events.map((event: any, idx: number) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                    {getItemImg(event.itemId)}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-center">{time}분</p>
                                    </div>
                                    {/* 시간 구분 화살표 추가 */}
                                    {index < Object.keys(groupItemsByTime(filterItemPurchases(selectedData.participantId, rankResultTimeline))).length - 1 && (
                                        <span className="mx-2">➔</span>
                                    )}
                                </div>
                            ))}
                    </div>

                    <div className="bg-white items-center rounded-t-lg border-gray-200 border-2">
                        <h3 className="font-bold p-2">스킬 빌드</h3>
                    </div>

                    <div className="flex flex-wrap bg-white p-2 border-gray-200 border-2">
                        <div className="flex items-center">
                            {getSkillImg(getSkillImage(0))}
                            <span className="mx-2">➔</span>
                            {getSkillImg(getSkillImage(1))}
                            <span className="mx-2">➔</span>
                            {getSkillImg(getSkillImage(2))}
                        </div>
                        {/* 선택된 플레이어의 스킬 업그레이드 이벤트 */}
                        {renderSkillTable(filterSkillLevelUp(selectedData.participantId, rankResultTimeline))}
                    </div>

                </div>
            )}

        </div>
    );
}

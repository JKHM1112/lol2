'use client'
import useUserStore from "@/app/hooks/useUserStore";
import { runesReforged } from "@/app/data/runesReforged";
import React from "react";
import Image from "next/image";
import { runesStatus } from "@/app/data/runesStatus";

export default function RuneSelect({ dataActiveTab }: any) {
    const { runes, setRunes } = useUserStore();

    function findParentNameById(runesReforged: any, targetId: number) {
        for (let rune of runesReforged) {
            for (let slot of rune.slots) {
                for (let runeItem of slot.runes) {
                    if (runeItem.id === targetId) {
                        return rune.id;
                    }
                }
            }
        }
        return null;
    }

    function findSlotsById(runesReforged: any, targetId: number, slicenumber: number) {
        for (let rune of runesReforged) {
            if (rune.id === targetId) {
                return rune.slots.slice(slicenumber);
            }
        }
        return null;
    }

    function handleSetRunes(slotIndex: number, runeId: number) {
        if (dataActiveTab === "MyData") {
            setRunes(slotIndex, runeId);
        } else if (dataActiveTab === "YourData") {
            setRunes(slotIndex + 9, runeId);
        }
    }

    function isRuneSelectedForSlot(slotIndex: number, runeId: number) {
        if (dataActiveTab === "MyData") {
            return runes[slotIndex] === runeId;
        } else if (dataActiveTab === "YourData") {
            return runes[slotIndex + 9] === runeId;
        }
    }

    function handleSetSubRunes(index: number, runeId: number) {
        const randomIndex = Math.random() < 0.5 ? 4 : 5; // Randomly choose between 4 and 5
        if (dataActiveTab === "MyData") {
            setRunes(randomIndex, runeId);
        } else if (dataActiveTab === "YourData") {
            setRunes(randomIndex + 9, runeId);
        }
    }

    function isRuneSelectedSubForSlot(runeId: number) {
        if (dataActiveTab === "MyData") {
            return runes[4] === runeId || runes[5] === runeId;
        } else if (dataActiveTab === "YourData") {
            return runes[13] === runeId || runes[14] === runeId;
        }
    }

    const [mainId1, setMainId1] = React.useState(findParentNameById(runesReforged, runes[0]) || 0);
    const [subId1, setSubId1] = React.useState(findParentNameById(runesReforged, runes[4]) || 0);
    const [mainId2, setMainId2] = React.useState(findParentNameById(runesReforged, runes[9]) || 0);
    const [subId2, setSubId2] = React.useState(findParentNameById(runesReforged, runes[13]) || 0);

    const mainSlots1 = findSlotsById(runesReforged, mainId1, 0) || [];
    const subSlots1 = findSlotsById(runesReforged, subId1, 1) || [];
    const mainSlots2 = findSlotsById(runesReforged, mainId2, 0) || [];
    const subSlots2 = findSlotsById(runesReforged, subId2, 1) || [];

    return (
        <div className="flex flex-row  p-4 rounded-lg ">
            {/* Main Rune Selection */}
            <div className="flex flex-col w-1/2 p-2">
                {dataActiveTab === "MyData" &&
                    <div className="flex justify-between space-x-4 mb-4 bg-white rounded-lg p-2 ">
                        <button onClick={() => setMainId1(8000)} style={{ opacity: mainId1 === 8000 ? 1 : 0.3 }}>
                            <Image alt={'0'} src="/perk-images/Styles/7201_Precision.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setMainId1(8100)} style={{ opacity: mainId1 === 8100 ? 1 : 0.3 }}>
                            <Image alt={'1'} src="/perk-images/Styles/7200_Domination.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setMainId1(8200)} style={{ opacity: mainId1 === 8200 ? 1 : 0.3 }}>
                            <Image alt={'2'} src="/perk-images/Styles/7202_Sorcery.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setMainId1(8400)} style={{ opacity: mainId1 === 8400 ? 1 : 0.3 }}>
                            <Image alt={'3'} src="/perk-images/Styles/7204_Resolve.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setMainId1(8300)} style={{ opacity: mainId1 === 8300 ? 1 : 0.3 }}>
                            <Image alt={'4'} src="/perk-images/Styles/7203_Whimsy.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                    </div >
                }
                {dataActiveTab === "YourData" &&
                    <div className="flex justify-between space-x-4 mb-4 bg-white rounded-lg p-2 ">
                        <button onClick={() => setMainId2(8000)} style={{ opacity: mainId2 === 8000 ? 1 : 0.3 }}>
                            <Image alt={'0'} src="/perk-images/Styles/7201_Precision.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setMainId2(8100)} style={{ opacity: mainId2 === 8100 ? 1 : 0.3 }}>
                            <Image alt={'1'} src="/perk-images/Styles/7200_Domination.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setMainId2(8200)} style={{ opacity: mainId2 === 8200 ? 1 : 0.3 }}>
                            <Image alt={'2'} src="/perk-images/Styles/7202_Sorcery.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setMainId2(8400)} style={{ opacity: mainId2 === 8400 ? 1 : 0.3 }}>
                            <Image alt={'3'} src="/perk-images/Styles/7204_Resolve.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setMainId2(8300)} style={{ opacity: mainId2 === 8300 ? 1 : 0.3 }}>
                            <Image alt={'4'} src="/perk-images/Styles/7203_Whimsy.png" width={40} height={40} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                    </div >
                }
                {dataActiveTab === "MyData" &&
                    <div className="rounded-lg border-2 border-gray-200 p-4 bg-white ">
                        {mainSlots1.map((slot: any, i: number) => (
                            <div className="flex justify-between my-6" key={i}>
                                {slot.runes.map((rune: any, j: number) => (
                                    <button
                                        key={j}
                                        onClick={() => handleSetRunes(i, rune.id)}
                                        className={`w-10 h-10 ${isRuneSelectedForSlot(i, rune.id) ? 'opacity-100' : 'opacity-15'} transition-opacity duration-300`}
                                    >
                                        <Image alt={rune.key} src={`/${rune.icon}`} width={40} height={40} />
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                }
                {dataActiveTab === "YourData" &&
                    <div className="rounded-lg border-2 border-gray-200 p-4 bg-white ">
                        {mainSlots2.map((slot: any, i: number) => (
                            <div className="flex justify-between my-6" key={i}>
                                {slot.runes.map((rune: any, j: number) => (
                                    <button
                                        key={j}
                                        onClick={() => handleSetRunes(i, rune.id)}
                                        className={`w-10 h-10 ${isRuneSelectedForSlot(i, rune.id) ? 'opacity-100' : 'opacity-15'} transition-opacity duration-300`}
                                    >
                                        <Image alt={rune.key} src={`/${rune.icon}`} width={40} height={40} />
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                }
            </div >

            {/* Sub Rune Selection */}
            <div className="flex flex-col w-1/2 p-2" >
                {dataActiveTab === "MyData" &&
                    <div className="flex justify-between space-x-4 mb-4 bg-white rounded-lg p-2 ">
                        <button onClick={() => setSubId1(8000)} style={{ opacity: subId1 === 8000 ? 1 : 0.3 }} >
                            <Image alt={'0'} src="/perk-images/Styles/7201_Precision.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setSubId1(8100)} style={{ opacity: subId1 === 8100 ? 1 : 0.3 }} >
                            <Image alt={'1'} src="/perk-images/Styles/7200_Domination.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setSubId1(8200)} style={{ opacity: subId1 === 8200 ? 1 : 0.3 }} >
                            <Image alt={'2'} src="/perk-images/Styles/7202_Sorcery.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setSubId1(8400)} style={{ opacity: subId1 === 8400 ? 1 : 0.3 }} >
                            <Image alt={'3'} src="/perk-images/Styles/7204_Resolve.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setSubId1(8300)} style={{ opacity: subId1 === 8300 ? 1 : 0.3 }} >
                            <Image alt={'4'} src="/perk-images/Styles/7203_Whimsy.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                    </div>
                }
                {dataActiveTab === "YourData" &&
                    <div className="flex justify-between space-x-4 mb-4 bg-white rounded-lg p-2 ">
                        <button onClick={() => setSubId2(8000)} style={{ opacity: subId2 === 8000 ? 1 : 0.3 }} >
                            <Image alt={'0'} src="/perk-images/Styles/7201_Precision.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setSubId2(8100)} style={{ opacity: subId2 === 8100 ? 1 : 0.3 }} >
                            <Image alt={'1'} src="/perk-images/Styles/7200_Domination.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setSubId2(8200)} style={{ opacity: subId2 === 8200 ? 1 : 0.3 }} >
                            <Image alt={'2'} src="/perk-images/Styles/7202_Sorcery.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setSubId2(8400)} style={{ opacity: subId2 === 8400 ? 1 : 0.3 }} >
                            <Image alt={'3'} src="/perk-images/Styles/7204_Resolve.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                        <button onClick={() => setSubId2(8300)} style={{ opacity: subId2 === 8300 ? 1 : 0.3 }} >
                            <Image alt={'4'} src="/perk-images/Styles/7203_Whimsy.png" width={35} height={35} className="hover:scale-105 transition-transform duration-150" />
                        </button>
                    </div>
                }
                {dataActiveTab === "MyData" &&
                    <div className="rounded-lg border-2 border-gray-200 p-4 bg-white ">
                        {subSlots1.map((slot: any, i: number) => (
                            <div className="flex justify-between mb-2" key={i}>
                                {slot.runes.map((rune: any, j: number) => (
                                    <button
                                        key={j}
                                        onClick={() => handleSetSubRunes(j, rune.id)}
                                        className={`w-10 h-10 ${isRuneSelectedSubForSlot(rune.id) ? 'opacity-100' : 'opacity-15'} transition-opacity duration-300`}
                                    >
                                        <Image alt={rune.key} src={`/${rune.icon}`} width={35} height={35} />
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                }
                {dataActiveTab === "YourData" &&
                    <div className="rounded-lg border-2 border-gray-200 p-4 bg-white ">
                        {subSlots2.map((slot: any, i: number) => (
                            <div className="flex justify-between mb-2" key={i}>
                                {slot.runes.map((rune: any, j: number) => (
                                    <button
                                        key={j}
                                        onClick={() => handleSetSubRunes(j, rune.id)}
                                        className={`w-10 h-10 ${isRuneSelectedSubForSlot(rune.id) ? 'opacity-100' : 'opacity-15'} transition-opacity duration-300`}
                                    >
                                        <Image alt={rune.key} src={`/${rune.icon}`} width={35} height={35} />
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                }
                {/* Status Rune Selection */}
                <div className="flex flex-col w-full mt-2 bg-white rounded-lg border-2 border-gray-200 ">
                    {runesStatus.map((statusGroup: any, groupIndex: number) => (
                        <div className="flex justify-between ml-4 mr-4 mb-2" key={groupIndex}>
                            {statusGroup.runes.map((rune: any, runeIndex: number) => (
                                <button key={runeIndex} onClick={() => handleSetRunes(6 + groupIndex, rune.id)} className={`w-8 h-8 ${isRuneSelectedForSlot(6 + groupIndex, rune.id) ? 'opacity-100' : 'opacity-30'} transition-opacity duration-300`} >
                                    <Image alt={rune.id.toString()} src={rune.icon} width={40} height={40} />
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
}

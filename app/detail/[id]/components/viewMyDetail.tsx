'use client'

import Image from "next/image";
import RuneBox from "./runeBox";
import SkillBox from "./skillBox";

interface Mydetail {
    mydetail: {
        puuid: string;
        tier: string;
        line: string;
        chams: string[];
        runes: number[];
        summoners: number[];
        items: number[];
        timeLineLevel1: any[];
        timeLineLevel2: any[];
        gameExtracted1: any[];
        gameExtracted2: any[];
        timeLineKda1: any[];
        timeLineKda2: any[];
        timeLineObject1: any[];
        timeLineObject2: any[];
        turretPlatesTaken: number[];
        visionScore: number[];
        skillOrder: string[];
        review: string;
        date: string;
        email: string;
        after6: number;
        before6: number;
        gameResult: string;
        half: number;
        lineResult: string;
    }
    nameTagLine: string
}

const getItemImg = (itemCode: number) => (
    <Image className='rounded-md' alt={'item'} src={`/item/${itemCode}.png`} width={35} height={35} />
)
const getChampionImg = (championCode: string) => (
    <Image className='rounded-md' alt={'champion'} src={`/champion/${championCode}.png`} width={40} height={40} />
)
const getSpellImg = (SpellCode: number) => (
    <Image className='rounded-md' alt={'spell'} src={`/spellN/${SpellCode}.png`} width={25} height={25} />
)
export default function ViewMyDetail({ mydetail, nameTagLine }: Mydetail) {
    const gameDuration = mydetail.gameExtracted1.length - 1;
    const items1 = mydetail.items.slice(0, 7);
    const items2 = mydetail.items.slice(7, 15);
    const runes1 = mydetail.runes.slice(0, 9);
    const runes2 = mydetail.runes.slice(8, 18);

    return (
        <div className="p-2">
            <div className="p-2">
                <button onClick={() => window.history.back()}>뒤로가기</button>
            </div>
            <div>
                <div className="p-2">
                    <div className="flex p-2 items-center">
                        {nameTagLine}
                        {mydetail.line}
                        약{gameDuration}분
                    </div>
                    <div className="flex p-2 items-center">
                        {getChampionImg(mydetail.chams[0])}
                        {getSpellImg(mydetail.summoners[0])}
                        {getSpellImg(mydetail.summoners[1])}
                    </div>
                    <div>
                        <ul className="flex">
                            {items1.map((item, index) => (
                                <li key={index}>{getItemImg(item)}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <RuneBox runes={runes1} />
                    </div>
                    <div className="flex p-2 items-center">
                        {getChampionImg(mydetail.chams[1])}
                        {getSpellImg(mydetail.summoners[2])}
                        {getSpellImg(mydetail.summoners[3])}
                    </div>
                    <div>
                        <ul className="flex">
                            {items2.map((item, index) => (
                                <li key={index}>{getItemImg(item)}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <RuneBox runes={runes2} />
                    </div>
                    <div className="mt-4">
                        <SkillBox skillOrder={mydetail.skillOrder} chams={mydetail.chams} />
                    </div>
                </div>
            </div>
        </div>
    );
}
import Image from "next/image";
import { championFull } from "@/app/data/championFull";
import React from "react";

type SkillCounts = {
    [key: string]: number;
    Q: number;
    W: number;
    E: number;
};

export default function PersonalAnalysis({ rankResultTimeline, puuid, championName }: any) {
    const characterNumber = rankResultTimeline.info.participants.find((p: any) => p.puuid === puuid)?.participantId;

    function getEventsByParticipantId(timeline: any, participantId: any) {
        let allEvents: any = [];
        for (const frame of timeline.info.frames) {
            const events = frame.events || [];
            allEvents = allEvents.concat(events.filter((event: any) => event.participantId === participantId));
        }
        return allEvents;
    }

    const participantsTimeLine = getEventsByParticipantId(rankResultTimeline, characterNumber);// 검색된 소환사의 게임 타임라인
    const characterNumber2 = characterNumber > 5 ? characterNumber - 5 : characterNumber + 5;
    const participantsTimeLine2 = getEventsByParticipantId(rankResultTimeline, characterNumber2);// 검색된 소환사의 게임 상대방 타임라인
    const participantTimeLines = [participantsTimeLine, participantsTimeLine2];

    const getSkillImage = (skillSlot: number) => {
        const champion = Object.values(championFull.data).find((cham: any) => cham.id === championName || cham.key === championName);
        if (!champion) {
            return '';
        }
        const spell = champion.spells[skillSlot];
        if (!spell) {
            return '';
        }
        return spell.image.full;
    };

    const skillQIMG = getSkillImage(0);
    const skillWIMG = getSkillImage(1);
    const skillEIMG = getSkillImage(2);
    const skillRIMG = getSkillImage(3);

    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item'} src={`/itemN/${itemCode}.png`} width={30} height={30} />
    const getSkillImg1 = (skillCode: string) => <Image className='rounded-md' alt={'spell'} src={`/spell/${skillCode}`} width={25} height={25} />
    const getSkillImg2 = (skillCode: string) => <Image className='rounded-md' alt={'spell'} src={`/${skillCode}.png`} width={30} height={30} />

    const itemEvents = participantsTimeLine.filter((event: any) => event.type === 'ITEM_PURCHASED').map((event: any) => ({ itemId: event.itemId, timestamp: event.timestamp }));
    const skillEvents = participantsTimeLine.filter((event: any) => event.type === 'SKILL_LEVEL_UP').map((event: any) => ({ skillSlot: event.skillSlot, timestamp: event.timestamp }));

    const itemOrderId = itemEvents.map((event: any) => ({ itemId: event.itemId }))
    const skillOrder = skillEvents.map((event: any) => {
        switch (event.skillSlot) {
            case 1: return 'Q';
            case 2: return 'W';
            case 3: return 'E';
            case 4: return 'R';
            default: return '';
        }
    }).filter((skill: string) => skill !== '');

    const skillCounts: SkillCounts = { Q: 0, W: 0, E: 0 };
    const skillReachedFive: SkillCounts = { Q: -1, W: -1, E: -1 };

    skillOrder.forEach((skill: string, index: number) => {
        if (skill === 'Q' || skill === 'W' || skill === 'E') {
            skillCounts[skill]++;
            if (skillCounts[skill] === 5 && skillReachedFive[skill] === -1) {
                skillReachedFive[skill] = index;
            }
        }
    });

    const sortedSkills = ['Q', 'W', 'E'].sort((a, b) => {
        if (skillCounts[a] !== skillCounts[b]) {
            return skillCounts[b] - skillCounts[a];
        } else {
            return skillReachedFive[a] - skillReachedFive[b];
        }
    });

    return (
        <div className="flex flex-col items-center w-[700px] min-h-[400px] max-h-[600px] p-4 box-border border-2 m-0">
            <div className="flex flex-col h-1/2 w-full border-b-2">
                <div className="flex border-b-2 p-2 h-[40px]">
                    <div>아이템 빌드</div>
                </div>
                <div className="flex flex-wrap p-2 min-h-[150px] max-h-[250px]">
                    {itemOrderId.map((item: any, index: number) => (
                        <span key={index} className="w-[50px] h-[50px]">
                            {getItemImg(item.itemId)}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex flex-col h-1/2 w-full border-b-2">
                <div className="flex border-b-2 p-2 h-[40px]">
                    <div>스킬 빌드</div>
                </div>
                <div className=" flex-wrap p-2 h-[150px]">
                    <div className="flex p-2">
                        {getSkillImg1(sortedSkills[0] === 'Q' ? skillQIMG : sortedSkills[0] === 'W' ? skillWIMG : skillEIMG)}
                        {sortedSkills[0]}
                        <Image className='rounded-md' alt={'item'} src={'/greater.png'} width={30} height={30}></Image>
                        {getSkillImg1(sortedSkills[1] === 'Q' ? skillQIMG : sortedSkills[1] === 'W' ? skillWIMG : skillEIMG)}
                        {sortedSkills[1]}
                        <Image className='rounded-md' alt={'item'} src={'/greater.png'} width={30} height={30}></Image>
                        {getSkillImg1(sortedSkills[2] === 'Q' ? skillQIMG : sortedSkills[2] === 'W' ? skillWIMG : skillEIMG)}
                        {sortedSkills[2]}
                    </div>
                    <div className="flex p-2 h-[150px]">
                        {skillOrder.map((skill: string, index: number) => (
                            <span key={index} className="w-[35px] h-[35px] ">
                                {getSkillImg2(skill === 'Q' ? 'Q' : skill === 'W' ? 'W' : skill === 'E' ? 'E' : 'R')}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import Image from "next/image";
type SkillCounts = {
    [key: string]: number;
    Q: number;
    W: number;
    E: number;
};
export default function PersonalAnalysis({ rankResultTimeline, puuid, championName }: any) {
    const characterNumber = rankResultTimeline.info.participants.find((p: any) => p.puuid === puuid)?.participantId
    function getEventsByParticipantId2(timeline: any, participantId: any) {
        let allEvents: any = [];
        for (const frame of timeline.info.frames) {
            const events = frame.events || [];
            allEvents = allEvents.concat(events.filter((event: any) => event.participantId === participantId));
        }
        return allEvents;
    }
    const particiapntsTimeline = getEventsByParticipantId2(rankResultTimeline, characterNumber);
    const skillQIMG = `${championName}Q`;
    const skillWIMG = `${championName}W`;
    const skillEIMG = `${championName}E`;
    const skillRIMG = `${championName}R`;
    const skillQIMG2 = `Q`;
    const skillWIMG2 = `W`;
    const skillEIMG2 = `E`;
    const skillRIMG2 = `R`;

    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item'} src={`/itemN/${itemCode}.png`} width={30} height={30} />
    const getSkillImg1 = (skillCode: string) => <Image className='rounded-md' alt={'spell'} src={`/spellE/${skillCode}.png`} width={25} height={25} />
    const getSkillImg2 = (skillCode: string) => <Image className='rounded-md' alt={'spell'} src={`/${skillCode}.png`} width={30} height={30} />
    const itemEvents = particiapntsTimeline.filter((event: any) => event.type === 'ITEM_PURCHASED')
        .map((event: any) => ({ itemId: event.itemId, timestamp: event.timestamp }));
    const skillEvents = particiapntsTimeline.filter((event: any) => event.type === 'SKILL_LEVEL_UP')
        .map((event: any) => ({ skillSlot: event.skillSlot, timestamp: event.timestamp }));
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
    console.log(itemOrderId)
    const skillCounts: SkillCounts = {
        Q: 0,
        W: 0,
        E: 0
    };

    const skillReachedFive: SkillCounts = {
        Q: -1,
        W: -1,
        E: -1
    };

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
        <div className="flex flex-col items-center w-[700px] h-[400px] p-4 box-border border-2 m-0">
            {/* 첫 번째 큰 박스 */}
            <div className="flex flex-col h-1/2 w-full border-b-2">
                <div className="flex border-b-2 p-2 h-[40px]">
                    <div>아이템 빌드</div>
                </div>
                <div className="flex flex-wrap p-2 h-[150px]">
                    {itemOrderId.map((item: any, index: number) => (
                        <span key={index} className="w-[50px] h-[50px]">
                            {getItemImg(item.itemId)}
                        </span>
                    ))}
                </div>
            </div>
            {/* 두 번째 큰 박스 */}
            <div className="flex flex-col h-1/2 w-full border-b-2">
                <div className="flex border-b-2 p-2 h-[40px]">
                    <div>스킬 빌드</div>
                </div>
                <div className="flex flex-wrap p-2 h-[150px]">
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
                                {getSkillImg2(skill === 'Q' ? skillQIMG2 : skill === 'W' ? skillWIMG2 : skill === 'E' ? skillEIMG2 : skillRIMG2)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
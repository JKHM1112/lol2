'use client'

import useUserStore from "@/app/hooks/useUserStore";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

interface GameDataProps {
    participant: any[]
    i: number
    puuid: string
    tier: string
    rankResultTimeline: any
    characterNumber: number
}

export default function DataTransfer({ participant, i, puuid, tier, rankResultTimeline, characterNumber }: GameDataProps) {

    const { setLines, setParticipants, setSelectedGame, setItems, setPuuid, setSpells, setRunes, setChampions, setTier,
        setTimeLine1Filtered, setTimeLine2Filtered, setGameTimeline1Extracted, setGameTimeline2Extracted } = useUserStore()
    const router = useRouter();
    const participant1 = participant[i].participants.find((participant: any) => participant.puuid === puuid);
    const participant1Line = participant1.individualPosition;
    const participant1ParticipantId = participant1.participantId;
    const participant2 = participant[i].participants.find((p: any) => p.individualPosition === participant1Line && p.puuid !== puuid);
    let individualPosition = participant1Line;
    if (individualPosition === 'UTILITY') {
        individualPosition = 'BOTTOM';
    } else if (individualPosition === 'BOTTOM') {
        individualPosition = 'UTILITY';
    } else {
        individualPosition = '';
    }


    const getEventsByParticipantId = (timeline: any, participantId: any) => {
        let allEvents: any = [];
        for (const frame of timeline.info.frames) {
            const events = frame.events || [];
            allEvents = allEvents.concat(events.filter((event: any) => event.participantId === participantId));
        }
        return allEvents;
    }

    const getParticipantFramesByParticipantId = (timeline: any, participantId: any) => {
        let allParticipantFrames: any = [];
        for (const frame of timeline.info.frames) {
            const participantFrames = frame.participantFrames;
            if (participantFrames[participantId]) {
                allParticipantFrames.push(participantFrames[participantId]);
            }
        }
        return allParticipantFrames;
    }

    let characterNumber2 = 0;
    if (characterNumber > 5) {
        characterNumber2 = characterNumber - 5;
    } else {
        characterNumber2 = characterNumber + 5;
    }

    const participantsTimeLine1 = getEventsByParticipantId(rankResultTimeline, characterNumber);// 검색된 소환사의 게임 타임라인2
    const participantsTimeLine2 = getEventsByParticipantId(rankResultTimeline, characterNumber2);// 검색된 소환사의 게임 상대방 타임라인2
    const participantsGameTimeline1 = getParticipantFramesByParticipantId(rankResultTimeline, characterNumber);//0분 부터 해서 1분 단위로 기록3
    const participantsGameTimeline2 = getParticipantFramesByParticipantId(rankResultTimeline, characterNumber2);//0분 부터 해서 1분 단위로 기록3

    const filterAndExtractEvents = (events: any[], type: string) => {
        return events
            .filter(event => event.type === type).map(event => ({
                type: event.type,
                participantId: event.participantId,
                level: event.level,
                timestamp: event.timestamp,
            }));
    }

    const extractGameTimelines = (timelines: any[]) => {
        return timelines.map(timeline => ({
            championStats: {
                health: timeline.championStats.health,
                healthMax: timeline.championStats.healthMax,
                power: timeline.championStats.power,
                powerMax: timeline.championStats.powerMax
            },
            damageStats: {
                magicDamageDoneToChampions: timeline.damageStats.magicDamageDoneToChampions,
                physicalDamageDoneToChampions: timeline.damageStats.physicalDamageDoneToChampions,
                trueDamageDoneToChampions: timeline.damageStats.trueDamageDoneToChampions,
                totalDamageDoneToChampions: timeline.damageStats.totalDamageDoneToChampions,
                magicDamageTaken: timeline.damageStats.magicDamageTaken,
                physicalDamageTaken: timeline.damageStats.physicalDamageTaken,
                trueDamageTaken: timeline.damageStats.trueDamageTaken,
                totalDamageTaken: timeline.damageStats.totalDamageTaken,
            },
            participantId: timeline.participantId,
            level: timeline.level,
            currentGold: timeline.currentGold,
            xp: timeline.xp,
            jungleMinionsKilled: timeline.jungleMinionsKilled,
            minionsKilled: timeline.minionsKilled,
        }));
    }

    const participantsTimeLine1Filtered = filterAndExtractEvents(participantsTimeLine1, "LEVEL_UP");
    const participantsTimeLine2Filtered = filterAndExtractEvents(participantsTimeLine2, "LEVEL_UP");
    const participantsGameTimeline1Extracted = extractGameTimelines(participantsGameTimeline1);
    const participantsGameTimeline2Extracted = extractGameTimelines(participantsGameTimeline2);
    console.log('participantsTimeLine1')
    console.log(participantsTimeLine1)
    console.log('participantsGameTimeline1')
    console.log(participantsGameTimeline1)
    const defaultParticipant = { championName: '' };
    let participant3 = defaultParticipant
    let participant4 = defaultParticipant
    if (individualPosition === 'BOTTOM') {
        participant3 = participant[i].participants.find((participant: any) => participant.individualPosition === individualPosition && participant.participantId === participant1ParticipantId - 1) || defaultParticipant;
        participant4 = participant[i].participants.find((participant: any) => participant.individualPosition === individualPosition && participant.participantId !== participant1ParticipantId + 1) || defaultParticipant;
    } else if (individualPosition === 'UTILITY') {
        participant3 = participant[i].participants.find((participant: any) => participant.individualPosition === individualPosition && participant.participantId === participant1ParticipantId + 1) || defaultParticipant;
        participant4 = participant[i].participants.find((participant: any) => participant.individualPosition === individualPosition && participant.participantId !== participant1ParticipantId - 1) || defaultParticipant;
    }

    const champion1 = participant1.championName;
    const champion2 = participant2.championName;
    const champion3 = participant3.championName;
    const champion4 = participant4.championName;
    const spell1 = participant1.summoner1Id;
    const spell2 = participant1.summoner2Id;
    const spell3 = participant2.summoner1Id;
    const spell4 = participant2.summoner2Id;

    const item0 = participant1.item0;
    const item1 = participant1.item1;
    const item2 = participant1.item2;
    const item3 = participant1.item3;
    const item4 = participant1.item4;
    const item5 = participant1.item5;
    const item6 = participant1.item6;

    const rune1 = participant1.perks.styles[0].selections[0].perk;
    const rune2 = participant1.perks.styles[0].selections[1].perk;
    const rune3 = participant1.perks.styles[0].selections[2].perk;
    const rune4 = participant1.perks.styles[0].selections[3].perk;
    const rune5 = participant1.perks.styles[1].selections[0].perk;
    const rune6 = participant1.perks.styles[1].selections[1].perk;
    const rune7 = participant2.perks.styles[0].selections[0].perk;
    const rune8 = participant2.perks.styles[0].selections[1].perk;
    const rune9 = participant2.perks.styles[0].selections[2].perk;
    const rune10 = participant2.perks.styles[0].selections[3].perk;
    const rune11 = participant2.perks.styles[1].selections[0].perk;
    const rune12 = participant2.perks.styles[1].selections[1].perk;
    const handleGameData = () => {
        setParticipants(participant);
        setChampions(0, champion1);
        setChampions(1, champion2);
        setChampions(2, champion3);
        setChampions(3, champion4);
        setLines(participant1Line);
        setSelectedGame(i);
        setPuuid(puuid);
        setItems(0, item0);
        setItems(1, item1);
        setItems(2, item2);
        setItems(3, item3);
        setItems(4, item4);
        setItems(5, item5);
        setItems(6, item6);
        setSpells(0, spell1);
        setSpells(1, spell2);
        setSpells(2, spell3);
        setSpells(3, spell4);
        setRunes(0, rune1);
        setRunes(1, rune2);
        setRunes(2, rune3);
        setRunes(3, rune4);
        setRunes(4, rune5);
        setRunes(5, rune6);
        setRunes(6, rune7);
        setRunes(7, rune8);
        setRunes(8, rune9);
        setRunes(9, rune10);
        setRunes(10, rune11);
        setRunes(11, rune12);
        setTier(tier);
        setTimeLine1Filtered(participantsTimeLine1Filtered)
        setTimeLine2Filtered(participantsTimeLine2Filtered)
        setGameTimeline1Extracted(participantsGameTimeline1Extracted)
        setGameTimeline2Extracted(participantsGameTimeline2Extracted)
        router.push('/write');
    }

    return (
        <div>
            <Button key={i} onClick={handleGameData}>데이터 전송</Button>
        </div>
    )
}

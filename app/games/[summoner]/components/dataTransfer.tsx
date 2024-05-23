'use client'

import useUserStore from "@/app/hooks/useUserStore";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

interface GameDataProps {
    participant: any[]
    i: number
    puuid: string
}

export default function DataTransfer({ participant, i, puuid }: GameDataProps) {
    const { setLines, setParticipants, setSelectedGame, setItems, setPuuid, setSpells, setRunes, setChampions, } = useUserStore()
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
        router.push('/write');
    }

    return (
        <div>
            <Button onClick={handleGameData}>데이터 전송</Button>
        </div>
    )
}

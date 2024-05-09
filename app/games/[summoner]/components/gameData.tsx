//games/gameData.tsx
'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import useUserStore from "../../../hooks/useUserStore";

interface GameDataProps {
    participants: any[]
    i: number
    puuid: string
}
export default function GameData({ participants, i, puuid }: GameDataProps) {
    const { setParticipants, setSelectedGame, setItems, setPuuid, setSpells, setRunes } = useUserStore()
    const router = useRouter();

    const participant1 = participants[i].find((participant: any) => participant.puuid === puuid)
    const participant1Line = participant1.individualPosition
    const participant2 = participants[i].find((p: any) => p.individualPosition === participant1Line && p.puuid !== puuid)

    const spell1 = (participants[i].find((p: any) => p.puuid === puuid)?.summoner1Id)
    const spell2 = (participants[i].find((p: any) => p.puuid === puuid)?.summoner2Id)
    const spell3 = participant2.summoner1Id
    const spell4 = participant2.summoner2Id

    const item0 = (participants[i].find((p: any) => p.puuid === puuid)?.item0)
    const item1 = (participants[i].find((p: any) => p.puuid === puuid)?.item1)
    const item2 = (participants[i].find((p: any) => p.puuid === puuid)?.item2)
    const item3 = (participants[i].find((p: any) => p.puuid === puuid)?.item3)
    const item4 = (participants[i].find((p: any) => p.puuid === puuid)?.item4)
    const item5 = (participants[i].find((p: any) => p.puuid === puuid)?.item5)
    const item6 = (participants[i].find((p: any) => p.puuid === puuid)?.item6)

    const rune1 = (participants[i].find((p: any) => p.puuid === puuid).perks.styles[0].selections[0].perk)
    const rune2 = (participants[i].find((p: any) => p.puuid === puuid).perks.styles[0].selections[1].perk)
    const rune3 = (participants[i].find((p: any) => p.puuid === puuid).perks.styles[0].selections[2].perk)
    const rune4 = (participants[i].find((p: any) => p.puuid === puuid).perks.styles[0].selections[3].perk)
    const rune5 = (participants[i].find((p: any) => p.puuid === puuid).perks.styles[1].selections[0].perk)
    const rune6 = (participants[i].find((p: any) => p.puuid === puuid).perks.styles[1].selections[1].perk)
    const rune7 = (participant2.perks.styles[0].selections[0].perk)
    const rune8 = (participant2.perks.styles[0].selections[1].perk)
    const rune9 = (participant2.perks.styles[0].selections[2].perk)
    const rune10 = (participant2.perks.styles[0].selections[3].perk)
    const rune11 = (participant2.perks.styles[1].selections[0].perk)
    const rune12 = (participant2.perks.styles[1].selections[1].perk)

    const handleGameData = () => {
        setParticipants(participants)
        setSelectedGame(i)
        setPuuid(puuid)
        setItems(0, item0)
        setItems(1, item1)
        setItems(2, item2)
        setItems(3, item3)
        setItems(4, item4)
        setItems(5, item5)
        setItems(6, item6)
        setSpells(0, spell1)
        setSpells(1, spell2)
        setSpells(2, spell3)
        setSpells(3, spell4)
        setRunes(0, rune1)
        setRunes(1, rune2)
        setRunes(2, rune3)
        setRunes(3, rune4)
        setRunes(4, rune5)
        setRunes(5, rune6)
        setRunes(6, rune7)
        setRunes(7, rune8)
        setRunes(8, rune9)
        setRunes(9, rune10)
        setRunes(10, rune11)
        setRunes(11, rune12)
        router.push('/write')
    }
    return (
        <div>
            <Button onClick={handleGameData}>데이터 전송</Button>
        </div>
    )
}
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import useUserStore from "../../hooks/useUserStore";
import TopChampion from "./line/topChampion";
import JungleChampion from "./line/jungleChampion";
import MiddleChampion from "./line/middleChampion";
import { initialParticipant } from "./participants";
import BottomChampion from "./line/bottomChampion";
import UtilityChampion from "./line/utilityChampion";


export default function LineChampions() {


    const { participants, selectedGame, puuid } = useUserStore();

    const participant1 = participants[selectedGame].find((participant: any) => participant.puuid === puuid) || initialParticipant
    const participant1Line = participant1.individualPosition

    const [selectedLine, setSelectedLine] = useState(participant1Line)

    const handleLineChange = (value: string) => {
        setSelectedLine(value)
    }

    return (
        <div>
            <div className="flex items-center gap-4">
                <Label className="char3">라인*</Label>
                <Select name="line" value={selectedLine} onValueChange={(value) => handleLineChange(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="라인을 고르세요"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="TOP">탑</SelectItem>
                        <SelectItem value="JUNGLE">정글</SelectItem>
                        <SelectItem value="MIDDLE">미드</SelectItem>
                        <SelectItem value="BOTTOM">원딜</SelectItem>
                        <SelectItem value="UTILITY">서폿</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {
                selectedLine == "TOP" ? (
                    <TopChampion />
                ) : null
            }
            {
                selectedLine == "JUNGLE" ? (
                    <JungleChampion />
                ) : null
            }
            {
                selectedLine == "MIDDLE" ? (
                    <MiddleChampion />
                ) : null
            }
            {
                selectedLine == "BOTTOM" ? (
                    <BottomChampion />
                ) : null
            }{
                selectedLine == "UTILITY" ? (
                    <UtilityChampion />
                ) : null
            }
        </div>
    )
}
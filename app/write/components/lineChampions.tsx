import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useUserStore from "../../hooks/useUserStore";
import TopChampion from "./line/topChampion";
import JungleChampion from "./line/jungleChampion";
import MiddleChampion from "./line/middleChampion";
import BottomChampion from "./line/bottomChampion";
import UtilityChampion from "./line/utilityChampion";
import { initialParticipant } from "./participants";


export default function LineChampions() {

    const { lines, participants, selectedGame, puuid } = useUserStore();
    const participant1 = participants[selectedGame].participants.find((participant: any) => participant.puuid === puuid) || initialParticipant;

    let lineK = ''
    if (lines === 'TOP') {
        lineK = '탑';
    } else if (lines === 'JUNGLE') {
        lineK = '정글';
    } else if (lines === 'MIDDLE') {
        lineK = '미드';
    }
    else if (lines === 'BOTTOM') {
        lineK = '원딜';
    }
    else if (lines === 'UTILITY') {
        lineK = '서폿';
    }
    const participant1Line = lines || lineK || participant1.individualPosition
    const [selectedLine, setSelectedLine] = useState(participant1Line)
    const handleLineChange = (value: string) => {
        setSelectedLine(value)
    }

    return (
        <div>
            <div className="flex items-center gap-4">
                <Label className="char3">라인</Label>
                <Select name="line" value={selectedLine} onValueChange={(value) => handleLineChange(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="라인을 고르세요"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="탑">탑</SelectItem>
                        <SelectItem value="정글">정글</SelectItem>
                        <SelectItem value="미드">미드</SelectItem>
                        <SelectItem value="원딜">원딜/서폿</SelectItem>
                        <SelectItem value="서폿">서폿/원딜</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {
                selectedLine == "탑" ? (
                    <TopChampion />
                ) : null
            }
            {
                selectedLine == "정글" ? (
                    <JungleChampion />
                ) : null
            }
            {
                selectedLine == "미드" ? (
                    <MiddleChampion />
                ) : null
            }
            {
                selectedLine == "원딜" ? (
                    <BottomChampion />
                ) : null
            }{
                selectedLine == "서폿" ? (
                    <UtilityChampion />
                ) : null
            }
        </div>
    )
}
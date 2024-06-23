import useUserStore from "@/app/hooks/useUserStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";


export default function Difficulty() {
    const { before, after, side, teamFight } = useUserStore();

    const [before6, setBefore6] = useState(before || 3)
    const [after6, setAfter6] = useState(after || 3)
    const [side1, setSide] = useState(side || 3)
    const [teamFight1, setTeamFight] = useState(teamFight || 3)

    const handleBefore6Change = (event: number[]) => {
        setBefore6(event[0])
    }
    const handleAfter6Change = (event: number[]) => {
        setAfter6(event[0])
    }
    const handleSideChange = (event: number[]) => {
        setSide(event[0])
    }
    const handleTeamfightChange = (event: number[]) => {
        setTeamFight(event[0])
    }
    return (
        <div>
            <div className="flex gap-2 pt-4">
                <Label className="char3">6렙 전 (쉬움)1-5(어려움)
                    <Input value={before6} name="before6" readOnly />
                    <Slider onValueChange={handleBefore6Change} value={[before6]} max={5} min={1} step={1} />
                </Label>
                <Label className="char3">6렙 후 (쉬움)1-5(어려움)
                    <Input value={after6} name="after6" readOnly />
                    <Slider onValueChange={handleAfter6Change} value={[after6]} max={5} min={1} step={1} />
                </Label>
            </div>
            <div className="flex gap-2  pt-4">
                <Label className="char3">사이드(쉬움)1-5(어려움)
                    <Input value={side1} name="side1" readOnly />
                    <Slider onValueChange={handleSideChange} value={[side1]} max={5} min={1} step={1} />
                </Label>
                <Label className="char3">한타 (쉬움)1-5(어려움)
                    <Input value={teamFight1} name="teamFight1" readOnly />
                    <Slider onValueChange={handleTeamfightChange} value={[teamFight1]} max={5} min={1} step={1} />
                </Label>
            </div>
        </div>
    )
}
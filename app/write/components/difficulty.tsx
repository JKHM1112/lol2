import useUserStore from "@/app/hooks/useUserStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

export default function Difficulty() {
    const { before, after, side, teamFight, setBefore, setAfter, setSide, setTeamFight } = useUserStore();

    const [before6, setBefore6] = useState(before || 0);
    const [after6, setAfter6] = useState(after || 0);
    const [side1, setSidea] = useState(side || 0);
    const [teamFight1, setTeamFighta] = useState(teamFight || 0);

    useEffect(() => {
        setBefore(before6);
    }, [before6, setBefore]);

    useEffect(() => {
        setAfter(after6);
    }, [after6, setAfter]);

    useEffect(() => {
        setSide(side1);
    }, [side1, setSide]);

    useEffect(() => {
        setTeamFight(teamFight1);
    }, [teamFight1, setTeamFight]);

    const handleBefore6Change = (event: number[]) => {
        setBefore6(event[0]);
    };
    const handleAfter6Change = (event: number[]) => {
        setAfter6(event[0]);
    };
    const handleSideChange = (event: number[]) => {
        setSidea(event[0]);
    };
    const handleTeamfightChange = (event: number[]) => {
        setTeamFighta(event[0]);
    };

    return (
        <div className="p-1">
            <div>
                <Label className="mb-2 text-gray-700 font-semibold pl-4">
                    6렙 전 난이도 (1-10)
                </Label>
                <div className="flex items-center space-x-2 pr-4 pl-4">
                    <Input value={before6} name="before6" readOnly className="w-12 text-center" />
                    <Slider onValueChange={handleBefore6Change} value={[before6]} max={10} min={1} step={1} className="w-full" />
                </div>
            </div>
            <div>
                <Label className="mb-2 text-gray-700 font-semibold pl-4">
                    6렙 후 난이도 (1-10)
                </Label>
                <div className="flex items-center space-x-2 pr-4 pl-4">
                    <Input value={after6} name="after6" readOnly className="w-12 text-center" />
                    <Slider onValueChange={handleAfter6Change} value={[after6]} max={10} min={1} step={1} className="w-full" />
                </div>
            </div>
            <div>
                <Label className="mb-2 text-gray-700 font-semibold pl-4 ">
                    사이드 난이도 (1-10)
                </Label>
                <div className="flex items-center space-x-2 pr-4 pl-4">
                    <Input value={side1} name="side1" readOnly className="w-12 text-center" />
                    <Slider onValueChange={handleSideChange} value={[side1]} max={10} min={1} step={1} className="w-full" />
                </div>
            </div>
            <div>
                <Label className="mb-2 text-gray-700 font-semibold pl-4">
                    한타 난이도 (1-10)
                </Label>
                <div className="flex items-center space-x-2 pr-4 pl-4">
                    <Input value={teamFight1} name="teamFight1" readOnly className="w-12 text-center" />
                    <Slider onValueChange={handleTeamfightChange} value={[teamFight1]} max={10} min={1} step={1} className="w-full" />
                </div>
            </div>
        </div>
    );
}

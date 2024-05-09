import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function Difficulty() {
    const [before6, setBefore6] = useState(3)
    const [after6, setAfter6] = useState(3)
    const [half, setHalf] = useState(3)

    const handleBefore6Change = (event: number[]) => {
        setBefore6(event[0])
    }
    const handleAfter6Change = (event: number[]) => {
        setAfter6(event[0])
    }
    const handleHalfChange = (event: number[]) => {
        setHalf(event[0])
    }

    return (
        <div>
            <Label className="char3">1~6 (쉬움)1-5(어려움)
                <Input value={before6} name="before6" readOnly />
                <Slider onValueChange={handleBefore6Change} value={[before6]} max={5} min={1} step={1} />
            </Label>
            <Label className="char3">6~11 (쉬움)1-5(어려움)
                <Input value={after6} name="after6" readOnly />
                <Slider onValueChange={handleAfter6Change} value={[after6]} max={5} min={1} step={1} />
            </Label>
            <Label className="char3">사이드 및 한타 (쉬움)1-5(어려움)
                <Input value={half} name="half" readOnly />
                <Slider onValueChange={handleHalfChange} value={[half]} max={5} min={1} step={1} />
            </Label>
        </div>
    )
}
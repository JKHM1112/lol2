import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";

export default function Lines() {
    const [lineResult, setLineResult] = useState('')
    const [gameResult, setGameResult] = useState('')
    return (
        <div >
            <RadioGroup value={lineResult} onValueChange={(value) => setLineResult(value)} className="flex items-center">
                라인전:
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="win" id="line-win" />
                    <Label htmlFor="win">승리</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lose" id="line-lose" />
                    <Label htmlFor="lose">패배</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="half" id="line-half" />
                    <Label htmlFor="half">반반</Label>
                </div>
            </RadioGroup>

            <RadioGroup value={gameResult} onValueChange={(value) => setGameResult(value)} className="flex items-center">
                결과:
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="win" id="game-win" />
                    <Label htmlFor="win">승리</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lose" id="game-lose" />
                    <Label htmlFor="lose">패배</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="half" id="game-half" />
                    <Label htmlFor="half">반반</Label>
                </div>
            </RadioGroup>

            <Label className="char3">한줄평<Input name="review" placeholder="한줄평"></Input></Label>

            <input style={{ display: 'none' }} name="lineResult" defaultValue={lineResult} />
            <input style={{ display: 'none' }} name="gameResult" defaultValue={gameResult} />
        </div>
    )
}
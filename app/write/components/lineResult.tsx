import useUserStore from "@/app/hooks/useUserStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function Lines() {
    const { lineResults, gameResults, review, setReview } = useUserStore();
    const [lineResult, setLineResult] = useState(lineResults || '승리');
    const [gameResult, setGameResult] = useState(gameResults || '승리');

    return (
        <div>
            <RadioGroup value={lineResult} name="lineResult" onValueChange={setLineResult} className="flex items-center">
                라인전:
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="승리" id="line-win" />
                    <Label htmlFor="line-win">승리</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="패배" id="line-lose" />
                    <Label htmlFor="line-lose">패배</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="반반" id="line-half" />
                    <Label htmlFor="line-half">반반</Label>
                </div>
            </RadioGroup>

            <RadioGroup value={gameResult} name="gameResult" onValueChange={setGameResult} className="flex items-center">
                결과:
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="승리" id="game-win" />
                    <Label htmlFor="game-win">승리</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="패배" id="game-lose" />
                    <Label htmlFor="game-lose">패배</Label>
                </div>
            </RadioGroup>

            <Label className="flex items-center">
                <div>
                    <Input name="review" value={review} onChange={e => setReview(e.target.value)} placeholder="한줄평" />
                </div>
            </Label>
        </div >
    );
}

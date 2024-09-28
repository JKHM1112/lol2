import useUserStore from "@/app/hooks/useUserStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";

export default function Lines() {
    const { lineResults, gameResults, review, setLineResults, setGameResults, setReview } = useUserStore();
    const [lineResult, setLineResult] = useState(lineResults || '');
    const [gameResult, setGameResult] = useState(gameResults || '');
    const [reviewText, setReviewText] = useState(review || '');

    useEffect(() => {
        setLineResults(lineResult);
    }, [lineResult, setLineResults]);

    useEffect(() => {
        setGameResults(gameResult);
    }, [gameResult, setGameResults]);

    useEffect(() => {
        setReview(reviewText);
    }, [reviewText, setReview]);

    return (
        <div className="p-1">
            <div>
                <Label className="text-gray-700 font-semibold mb-2 pl-4">라인전</Label>
                <RadioGroup value={lineResult} name="lineResult" onValueChange={setLineResult} className="flex flex-row">
                    <div className="flex items-center space-x-4  pl-4">
                        <RadioGroupItem value="승리" id="line-win" />
                        <Label htmlFor="line-win" className="text-gray-600">승리</Label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <RadioGroupItem value="패배" id="line-lose" />
                        <Label htmlFor="line-lose" className="text-gray-600">패배</Label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <RadioGroupItem value="반반" id="line-half" />
                        <Label htmlFor="line-half" className="text-gray-600">반반</Label>
                    </div>
                </RadioGroup>
            </div>

            <div>
                <Label className="text-gray-700 font-semibold mb-2 pl-4">게임 결과</Label>
                <RadioGroup value={gameResult} name="gameResult" onValueChange={setGameResult} className="flex flex-row">
                    <div className="flex items-center space-x-4  pl-4">
                        <RadioGroupItem value="승리" id="game-win" />
                        <Label htmlFor="game-win" className="text-gray-600">승리</Label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <RadioGroupItem value="패배" id="game-lose" />
                        <Label htmlFor="game-lose" className="text-gray-600">패배</Label>
                    </div>
                </RadioGroup>
            </div>

            <div>
                <Label className="text-gray-700 font-semibold mb-2 pl-4">한줄평</Label>
                <div className="px-4">
                    <Input name="review" value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="한줄평" className="w-full" />
                </div>
            </div>

            {/* Hidden input for form submission */}
            <input style={{ display: 'none' }} name="lineResults" value={lineResult} readOnly />
            <input style={{ display: 'none' }} name="gameResults" value={gameResult} readOnly />
            <input style={{ display: 'none' }} name="review" value={reviewText} readOnly />
        </div>
    );
}

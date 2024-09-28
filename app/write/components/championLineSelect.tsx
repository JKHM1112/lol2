import { champion } from "@/app/data/champion";
import useUserStore from "@/app/hooks/useUserStore";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import React, { useEffect } from "react";

export default function ChampionLineSelect({ dataActiveTab }: any) {
    const { champions, setChampions, lines, setLines } = useUserStore();

    const championData = champion;

    // 영문 -> 한글 라인명 변환 함수
    const convertLineToKorean = (line: string) => {
        switch (line) {
            case 'TOP': return '탑';
            case 'JUNGLE': return '정글';
            case 'MIDDLE': return '미드';
            case 'BOTTOM': return '바텀';
            case 'UTILITY': return '서폿';
            default: return line;
        }
    };

    useEffect(() => {
        if (lines) {
            setLines(convertLineToKorean(lines));
        }
    }, [lines, setLines]);

    // 챔피언 데이터를 배열로 변환
    const championsList = Object.values(championData.data).map((champion) => ({
        nameE: champion.id,
        nameK: champion.name,
        img: '/Champion/' + champion.image.full
    }));

    // 영문명을 한글명으로 변환
    const nameChangeEK = (nameE: string) => {
        const champion = championsList.find(champ => champ.nameE === nameE);
        return champion ? champion.nameK : nameE;
    };

    // 챔피언 선택 시 처리
    const handleChampionSelect = (index: number, championName: string) => {
        setChampions(index, championName);
    };

    const firstIndex = dataActiveTab === "MyData" ? 0 : 1;
    const secondIndex = dataActiveTab === "MyData" ? 2 : 3;

    const [lineActiveTab, setLineActiveTab] = React.useState(lines || "미드");

    return (
        <div className="flex flex-row justify-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="text-black mr-4 bg-sky-300 hover:bg-sky-200">
                        {champions[firstIndex] ? (
                            <div className="flex flex-row">
                                <Image className="rounded-md" alt={champions[firstIndex]} src={`/champion/${champions[firstIndex]}.png`} height={25} width={25} />
                                {nameChangeEK(champions[firstIndex])}
                            </div>
                        ) : (
                            <>챔1 선택</>
                        )}
                    </Button>
                </PopoverTrigger>

                {/* Popover Content: 5열 그리드로 챔피언 나열 */}
                <PopoverContent className="w-[400px] h-[320px] overflow-y-auto">
                    <div className="grid grid-cols-5 gap-2 p-4">
                        {championsList.map((champ, index) => (
                            <button key={index} onClick={() => handleChampionSelect(firstIndex, champ.nameE)} className="hover:scale-105 transition-transform" >
                                <Image alt={champ.nameE} src={champ.img} width={50} height={50} className="rounded-md" />
                                <div className="text-center text-xs mt-1">{champ.nameE}</div>
                            </button>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/** 이 popover는 line이 bottom이거나 utility일 때 보인다. */}
            {(lines === "바텀" || lines === "서폿") && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="text-black mr-4 bg-sky-300 hover:bg-sky-200">
                            {champions[secondIndex] ? (
                                <>
                                    <Image className="rounded-md" alt={champions[secondIndex]} src={`/champion/${champions[secondIndex]}.png`} height={25} width={25} />
                                    {nameChangeEK(champions[secondIndex])}
                                </>
                            ) : (
                                <>챔2 선택</>
                            )}
                        </Button>
                    </PopoverTrigger>

                    {/* Popover Content: 5열 그리드로 챔피언 나열 */}
                    <PopoverContent className="w-[400px] h-[320px] overflow-y-auto">
                        <div className="grid grid-cols-5 gap-2 p-4">
                            {championsList.map((champ, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleChampionSelect(secondIndex, champ.nameE)} className="hover:scale-105 transition-transform" >
                                    <Image alt={champ.nameE} src={champ.img} width={50} height={50} className="rounded-md" />
                                    <div className="text-center text-xs mt-1">{champ.nameE}</div>
                                </button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}

            {/* 라인을 선택한다. */}
            <div className="flex flex-row gap-2">
                <button
                    className={`border-2 px-4 py-1 rounded-md transition-all duration-300 ease-in-out ${lineActiveTab === "TOP"
                        ? "bg-sky-500 text-white border-sky-500 scale-110"
                        : "bg-sky-300 text-white hover:bg-sky-200 scale-90"}`}
                    onClick={() => { setLineActiveTab("탑"); setLines('탑'); }} >
                    탑
                </button>
                <button
                    className={`border-2 px-4 py-1 rounded-md transition-all duration-300 ease-in-out ${lineActiveTab === "JUNGLE"
                        ? "bg-sky-500 text-white border-sky-500 scale-110"
                        : "bg-sky-300 text-white hover:bg-sky-200 scale-90"}`}
                    onClick={() => { setLineActiveTab("정글"); setLines('정글'); }} >
                    정글
                </button>
                <button
                    className={`border-2 px-4 py-1 rounded-md transition-all duration-300 ease-in-out ${lineActiveTab === "MIDDLE"
                        ? "bg-sky-500 text-white border-sky-500 scale-110"
                        : "bg-sky-300 text-white hover:bg-sky-200 scale-90"}`}
                    onClick={() => { setLineActiveTab("미드"); setLines('미드'); }} >
                    미드
                </button>
                <button
                    className={`border-2 px-4 py-1 rounded-md transition-all duration-300 ease-in-out ${lineActiveTab === "BOTTOM"
                        ? "bg-sky-500 text-white border-sky-500 scale-110"
                        : "bg-sky-300 text-white hover:bg-sky-200 scale-90"}`} onClick={() => { setLineActiveTab("바텀"); setLines('바텀'); }} >
                    원딜
                </button>
                <button
                    className={`border-2 px-4 py-1 rounded-md transition-all duration-300 ease-in-out ${lineActiveTab === "UTILITY"
                        ? "bg-sky-500 text-white border-sky-500 scale-110"
                        : "bg-sky-300 text-white hover:bg-sky-200 scale-90"}`}
                    onClick={() => { setLineActiveTab("서폿"); setLines('서폿'); }}>
                    서폿
                </button>
            </div>

        </div >
    );
}

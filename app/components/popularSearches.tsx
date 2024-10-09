'use client'
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PopularSearches({ versusCollection }: any) {
    const [currentPage, setCurrentPage] = useState(0); // 현재 보여줄 챔피언 인덱스
    const [selectedChampion, setSelectedChampion] = useState<string>(''); // 선택된 챔피언 이름
    const maxVisiblePages = 5; // 한 페이지에 보여줄 항목 수

    // 각 챔피언의 matchId 길이를 합산하는 함수
    const calculateMatchCount = (championData: any) => {
        const versionData = championData['19']; // 19 버전만 가져옴
        let totalMatches = 0;

        // 라인별로 순회하면서 matchId의 길이를 합산
        for (const role in versionData) {
            const roleData = versionData[role]; // top, middle 등
            for (const enemyChampion in roleData) {
                const matches = roleData[enemyChampion].matchId.length;
                totalMatches += matches;
            }
        }
        return totalMatches;
    };

    // 모든 챔피언의 matchId 길이를 계산하여 새로운 배열로 생성
    const championMatches = versusCollection.map((champion: any) => ({
        championName: champion.championName,
        count: calculateMatchCount(champion)
    }));

    // count가 높은 순으로 정렬 후 상위 10개만 추출
    const top10Champions = championMatches
        .sort((a: any, b: any) => b.count - a.count) // count 기준으로 내림차순 정렬
        .slice(0, 10); // 상위 10개만 추출

    // 일정 시간마다 값 변경
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentPage((prev) => (prev + 1) % top10Champions.length); // 인덱스를 순환하면서 증가시킴
        }, 3000); // 3초마다 변경

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌을 정리
    }, [top10Champions]);

    return (
        <div className="pt-2">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={(currentPage + 1) + ". " + top10Champions[currentPage]?.championName} /> {/* 현재 챔피언 표시 */}
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup >
                        {top10Champions.map((champion: any, index: number) => (
                            <SelectItem className="w-[175px] pl-2" key={champion.championName} value={champion.championName}>
                                {index + 1}.  {champion.championName} ({champion.count})
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

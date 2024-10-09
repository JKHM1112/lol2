'use client'


import Image from "next/image";
import { useState } from "react";
import useUserStore from "../hooks/useUserStore";
import { useRouter } from "next/navigation";

export default function Paginations({ paginatedResult, riotPatchNotes, email }: any) {
    const router = useRouter();
    const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({}); //뒤집힘 상태
    const { setLines, setChampions, setLineResults, setGameResults, setBefore, setAfter, setSide, setTeamFight, setReview, setSummoners, setRunes, setItems } = useUserStore();
    const getLatestPatchTitle = (creationData: string) => {
        const current = new Date(creationData);
        const closestPatch = riotPatchNotes.filter((patch: any) => new Date(patch.date) <= current)  // 현재 날짜보다 이전 또는 같은 패치만
            .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 가장 가까운 날짜부터 내림차순 정렬
        return closestPatch.length > 0 ? closestPatch[0].title : "패치 없음";
    }
    // 챔피언 영문으로 이미지로 바꿔준fhandlePageChange 다.
    const getChampionLoadingImg = (championCode: string, widthN: number, heightN: number) => (
        <Image className='rounded-md' alt={'champion1'} src={`/championLoading/${championCode}_0.jpg`} width={widthN} height={heightN} />
    );
    const handleFlipCard = (id: string) => {
        setFlipped(prevState => ({
            ...prevState,
            [id]: !prevState[id] // 현재 카드의 상태 반전
        }));
    };
    return (
        <div>
            <div>
                {paginatedResult.map((data: any, index: number) => (
                    <div key={data._id} className="rounded-md p-2 mx-2 bg-white">
                        {flipped[data._id] ? (
                            <div className="flex flex-col p-2 rounded-lg bg-gray-100">
                                <div className="w-[160px] truncate overflow-hidden text-gray-700 font-semibold">작성자: {data.email}</div>
                                <div className="text-gray-500">패치버전: {getLatestPatchTitle(data.date)}</div>
                                <div className="text-gray-500">티어: {(data.tier == null ? "UNRANK" : data.tier)}</div>
                                <div className="text-gray-500">{data.review}</div>
                                <div className="flex flex-row justify-center gap-8">
                                    <button type="button" className="text-blue-600 hover:text-blue-800 mt-2" onClick={() => handleFlipCard(data._id)}>자세히</button>
                                </div>
                            </div>
                        ) : (
                            <div className={`flex flex-col ${data.gameResult === "승리" ? "bg-blue-100" : "bg-red-100"} p-2 rounded-lg`}>
                                <div className="flex flex-row mx-2 justify-center">
                                    <div className="flex items-center gap-8">
                                        {getChampionLoadingImg(data.chams[0], 50, 50)}
                                        {getChampionLoadingImg(data.chams[1], 50, 50)}
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center gap-8">
                                    <button type="button" className="text-blue-600 hover:text-blue-800 mt-2" onClick={() => handleFlipCard(data._id)}>자세히</button>
                                    {email === data.email && (
                                        <div className="flex space-x-1 mt-4">
                                            <button className="px-2 py-1 bg-green-300 text-white rounded-lg hover:bg-green-100"
                                                onClick={() => {
                                                    setLines(data.line);
                                                    data.chams.forEach((cham: any, index: number) => setChampions(index, cham));
                                                    setLineResults(data.lineResult);
                                                    setGameResults(data.gameResult);
                                                    setBefore(data.before6);
                                                    setAfter(data.after6);
                                                    setSide(data.side1);
                                                    setTeamFight(data.teamFight1);
                                                    setReview(data.review);
                                                    data.summoners.forEach((summoner: any, index: number) => setSummoners(index, summoner));
                                                    data.runes.forEach((rune: any, index: number) => setRunes(index, rune));
                                                    data.items.forEach((item: any, index: number) => setItems(index, item));
                                                    router.push('/edit/' + data._id);
                                                }} >수정</button>
                                            <button className="px-2 py-1 bg-red-300 text-white rounded-lg hover:bg-red-100"
                                                onClick={async () => {
                                                    await fetch('/api/post/delete', {
                                                        method: 'POST',
                                                        body: JSON.stringify({ _id: data._id, email: data.email })
                                                    });
                                                    window.location.reload();
                                                }} >삭제</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
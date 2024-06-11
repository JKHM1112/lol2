'use client'
import { useState } from "react";

interface Change {
    key: string;
    value: string;
}

export default function New() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [generalChanges, setGeneralChanges] = useState<Change[]>([{ key: "", value: "" }]);
    const [championChanges, setChampionChanges] = useState<Change[]>([{ key: "", value: "" }]);
    const [itemChanges, setItemChanges] = useState<Change[]>([{ key: "", value: "" }]);

    const handleAddGeneralChange = () => {
        setGeneralChanges([...generalChanges, { key: "", value: "" }]);
    };

    const handleRemoveGeneralChange = (index: number) => {
        const newGeneralChanges = [...generalChanges];
        newGeneralChanges.splice(index, 1);
        setGeneralChanges(newGeneralChanges);
    };

    const handleGeneralChangeDetail = (index: number, field: keyof Change, value: string) => {
        const newGeneralChanges = [...generalChanges];
        newGeneralChanges[index][field] = value;
        setGeneralChanges(newGeneralChanges);
    };

    const handleAddChampionChange = () => {
        setChampionChanges([...championChanges, { key: "", value: "" }]);
    };

    const handleRemoveChampionChange = (index: number) => {
        const newChampionChanges = [...championChanges];
        newChampionChanges.splice(index, 1);
        setChampionChanges(newChampionChanges);
    };

    const handleChampionChangeDetail = (index: number, field: keyof Change, value: string) => {
        const newChampionChanges = [...championChanges];
        newChampionChanges[index][field] = value;
        setChampionChanges(newChampionChanges);
    };

    const handleAddItemChange = () => {
        setItemChanges([...itemChanges, { key: "", value: "" }]);
    };

    const handleRemoveItemChange = (index: number) => {
        const newItemChanges = [...itemChanges];
        newItemChanges.splice(index, 1);
        setItemChanges(newItemChanges);
    };

    const handleItemChangeDetail = (index: number, field: keyof Change, value: string) => {
        const newItemChanges = [...itemChanges];
        newItemChanges[index][field] = value;
        setItemChanges(newItemChanges);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const newPatchNote = {
            title,
            date,
            generalChanges,
            championChanges,
            itemChanges,
        };

        const response = await fetch('/api/post/newPatchNoteWrite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPatchNote)
        });

        if (response.ok) {
            alert('패치노트가 성공적으로 추가되었습니다.');
        } else {
            const errorData = await response.json();
            console.error('패치노트 추가에 실패했습니다:', errorData);
            alert('패치노트 추가에 실패했습니다.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">새 패치노트 작성</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="shadow-md rounded-md p-4 border mb-4">
                    <div className="mb-4">
                        <label className="block font-bold mb-2">날짜</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="shadow border rounded w-full py-2 px-3" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">패치 버전</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow border rounded w-full py-2 px-3" />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">일반 변경사항</h2>
                        {generalChanges.map((change, index) => (
                            <div key={index} className="mb-2">
                                <label className="block font-bold mb-2">변경위치</label>
                                <input type="text" value={change.key} onChange={(e) => handleGeneralChangeDetail(index, "key", e.target.value)} className="shadow border rounded w-full py-2 px-3" />
                                <label className="block font-bold mb-2">변경사항</label>
                                <input type="text" value={change.value} onChange={(e) => handleGeneralChangeDetail(index, "value", e.target.value)} className="shadow border rounded w-full py-2 px-3"
                                />
                                <button type="button" onClick={() => handleRemoveGeneralChange(index)} className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2" >
                                    -
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddGeneralChange} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2" >
                            +
                        </button>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">챔피언 변경사항</h2>
                        {championChanges.map((change, index) => (
                            <div key={index} className="mb-2">
                                <label className="block font-bold mb-2">변경위치</label>
                                <input type="text" value={change.key} onChange={(e) => handleChampionChangeDetail(index, "key", e.target.value)} className="shadow border rounded w-full py-2 px-3" />
                                <label className="block font-bold mb-2">변경사항</label>
                                <input type="text" value={change.value} onChange={(e) => handleChampionChangeDetail(index, "value", e.target.value)} className="shadow border rounded w-full py-2 px-3" />
                                <button type="button" onClick={() => handleRemoveChampionChange(index)} className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2" >
                                    -
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddChampionChange} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2" >
                            +
                        </button>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">아이템 변경사항</h2>
                        {itemChanges.map((change, index) => (
                            <div key={index} className="mb-2">
                                <label className="block font-bold mb-2">변경위치</label>
                                <input type="text" value={change.key} onChange={(e) => handleItemChangeDetail(index, "key", e.target.value)} className="shadow border rounded w-full py-2 px-3" />
                                <label className="block font-bold mb-2">변경사항</label>
                                <input type="text" value={change.value} onChange={(e) => handleItemChangeDetail(index, "value", e.target.value)} className="shadow border rounded w-full py-2 px-3" />
                                <button type="button" onClick={() => handleRemoveItemChange(index)} className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2">
                                    -
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddItemChange} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2">
                            +
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        작성하기
                    </button>
                </div>
            </form>
        </div>
    );
}

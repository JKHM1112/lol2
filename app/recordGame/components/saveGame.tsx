'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SaveGame({ session }: { session: any }) {
    const [nicknameTag, setNicknameTag] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    // 새로고침 함수
    const refreshPage = () => {
        window.location.reload();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const nicknameTag = formData.get('nicknameTag') as string;
        const email = formData.get('email') as string;

        let nickname = nicknameTag;
        let tag = "KR1";

        if (nicknameTag.includes("#")) {
            [nickname, tag] = nicknameTag.split("#");
        }

        tag = tag.toUpperCase() === "KR1" ? "KR1" : tag;

        try {

            const response = await fetch('/api/post/saveGameHistory', {
                method: 'POST',
                body: JSON.stringify({ nickname, tag, email }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.status === 409) {
                setError(data.error);
                setSuccess(null);
            } else if (response.ok) {
                setSuccess(data.message);
                setError(null);
                setNicknameTag(''); // 제출 후 입력란 비우기
            } else {
                setError("등록에 실패했습니다.");
                setSuccess(null);
            }
        } catch (error) {
            setError("예상치 못한 오류 발생.");
            setSuccess(null);
        }
    };

    return (
        <div className="mt-10 p-6 border border-gray-200 rounded-md shadow-md">
            <h4 className="text-2xl font-bold mb-4">Riot 닉네임과 태그 등록</h4>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit}>
                <input name="nicknameTag" type="text" onChange={(e) => setNicknameTag(e.target.value)} placeholder="Riot 닉네임 및 태그" required className="p-2 border border-gray-300 rounded" />
                <input type="hidden" name="email" defaultValue={session.user.email} />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">등록</button>
            </form>
            <Button className="mt-2 w-28 bg-sky-500 text-white hover:bg-sky-600 rounded-full shadow-md px-4 py-2 transition-all duration-200 ease-in-out" onClick={refreshPage}>
                새로고침
            </Button>
        </div>
    )
}

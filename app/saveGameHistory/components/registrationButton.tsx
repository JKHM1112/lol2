'use client'
import { useState } from "react";

export interface NicknameTag {
    _id: string;
    email: string;
    nickname: string;
    puuid: string;
    tag: string;
    tier: string;

}
interface UserSession {
    user: {
        name: string;
        email: string;
    }
}
interface Props {
    saveNickname: NicknameTag[];
    session: UserSession
}

export default function RegistrationButton({ saveNickname, session }: Props) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [currentNickname, setCurrentNickname] = useState<string | null>(null);

    const handleRegistration = async () => {
        setLoading(true);
        setMessage(null);

        for (const nickname of saveNickname) {
            setCurrentNickname(nickname.nickname);

            try {
                const response = await fetch('/api/post/fetchRecentMatches', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ puuid: nickname.puuid, queue: 420, start: 0, games: 10, tier: nickname.tier }), // queue, start, games는 필요에 따라 조정하세요.
                });

                const data = await response.json();
                if (!response.ok) {
                    setMessage(data.error || 'Failed to save match data');
                    break; // 오류가 발생하면 중지
                }
            } catch (error) {
                setMessage('An unexpected error occurred');
                break; // 오류가 발생하면 중지
            }

            await new Promise(resolve => setTimeout(resolve, 10000)); // 6초 대기
        }

        setCurrentNickname(null);
        setLoading(false);
        if (!message) {
            setMessage('진행 완료');
        }
    };

    return (
        <div>
            {session.user.email === 'admin' ? (
                <button
                    onClick={handleRegistration}
                    className="p-2 bg-blue-500 text-white rounded"
                    disabled={loading}
                >
                    {loading ? '진행중...' : '진행 완료'}
                </button>
            ) : null}
            {currentNickname && <p className="mt-4">{currentNickname} ---- 진행중</p>}
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
    
}

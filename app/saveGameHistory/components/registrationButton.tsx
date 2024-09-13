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
    session: UserSession;
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
                    body: JSON.stringify({ puuid: nickname.puuid, queue: 420, start: 0, games: 10, tier: nickname.tier }), // Adjust as necessary
                });

                const data = await response.json();
                if (!response.ok) {
                    setMessage(data.error || 'Failed to save match data');
                    break; // Stop on error
                }
            } catch (error) {
                setMessage('An unexpected error occurred');
                break; // Stop on error
            }

            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
        }

        setCurrentNickname(null);
        setLoading(false);
        if (!message) {
            setMessage('Registration completed');
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
                    {loading ? 'Processing...' : 'Start Registration'}
                </button>
            ) : null}
            {currentNickname && <p className="mt-4">{currentNickname} ---- Processing</p>}
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}

'use client';

import React from "react";

interface SummonerTitleBarProps {
    gameNameTagLine: string;
    favorites: string[] | undefined;
    email?: string;
}

export default function SummonerTitleBar({ gameNameTagLine, favorites, email }: SummonerTitleBarProps) {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("닉네임이 복사되었습니다: " + text);
    };

    const [isFavorite, setIsFavorite] = React.useState(false);

    const isLoggedIn = Boolean(email);

    React.useEffect(() => {
        if (isLoggedIn) {
            if (favorites && favorites.includes(gameNameTagLine.replace("#", "-"))) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        } else {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            if (storedFavorites.includes(gameNameTagLine.replace("#", "-"))) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        }
    }, [favorites, gameNameTagLine, isLoggedIn]);

    const toggleFavorite = async () => {
        const newStatus = !isFavorite;
        setIsFavorite(newStatus);

        const formattedForStorage = gameNameTagLine.replace("#", "-");

        if (isLoggedIn) {
            const method = newStatus ? "POST" : "DELETE";
            await fetch("/api/post/favorites", {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ favorite: formattedForStorage }),
            });
        } else {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            let updatedFavorites;
            if (newStatus) {
                updatedFavorites = [...storedFavorites, formattedForStorage];
            } else {
                updatedFavorites = storedFavorites.filter((fav: string) => fav !== formattedForStorage);
            }
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
    };

    // 새로고침 함수
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center">
                {/* 소환사명과 클립보드 복사 버튼 */}
                <div className="cursor-pointer p-4 text-[20px] font-bold hover:text-blue-500 transition-colors duration-200 ease-in-out" onClick={() => copyToClipboard(gameNameTagLine)} >
                    {gameNameTagLine}
                </div>
                {/* 즐겨찾기 버튼 */}
                <button className={`ml-2 text-[18px] border-2 px-3 py-1 transition-transform duration-300 ease-in-out ${isFavorite ? 'border-yellow-400 text-yellow-500' : 'border-gray-300 text-gray-500 hover:scale-105 hover:border-sky-400' }`} onClick={toggleFavorite}>
                    {isFavorite ? '⭐' : '☆'}
                </button>
            </div>
            {/* 전적 갱신 버튼 */}
            <button className="ml-2 bg-sky-500 text-white rounded-full h-[40px] w-[120px] hover:bg-sky-600 transition-all duration-200 ease-in-out" onClick={refreshPage}>
                전적 갱신
            </button>
        </div>
    );
}

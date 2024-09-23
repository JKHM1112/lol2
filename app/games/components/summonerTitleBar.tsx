'use client';

import { Button } from "@/components/ui/button";
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

    const formattedGameNameTagLine = gameNameTagLine.replace("-", "#");
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

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
                {/* 소환사명과 클립보드 복사 버튼 */}
                <div className="cursor-pointer text-xl font-bold text-gray-700 hover:text-blue-500 transition-colors duration-200 ease-in-out" onClick={() => copyToClipboard(gameNameTagLine)} >
                    {gameNameTagLine}
                </div>
                {/* 즐겨찾기 버튼 */}
                <button onClick={toggleFavorite} className={`ml-2 text-lg border-2 rounded-md px-3 py-1 transition-transform duration-300 ease-in-out ${isFavorite ? 'border-yellow-400 text-yellow-500' : 'border-gray-300 text-gray-500 hover:scale-105 hover:border-sky-400' }`} >
                    {isFavorite ? '⭐' : '☆'}
                </button>
            </div>
            {/* 전적 갱신 버튼 */}
            <Button className="mt-2 w-28 bg-sky-500 text-white hover:bg-sky-600 rounded-full shadow-md px-4 py-2 transition-all duration-200 ease-in-out">
                전적 갱신
            </Button>
        </div>

    );
}

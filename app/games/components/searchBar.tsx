'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface searchInterface {
    searchFavorites: string[] | undefined;
    searchRecently: string[] | undefined;
    email: string;
}

export default function SearchBar({ searchFavorites, searchRecently, email }: searchInterface) {
    const [summonerName, setSummonerName] = React.useState(''); // 소환사 이름 저장
    const [recentSearches, setRecentSearches] = React.useState<string[]>([]); // 최근 검색어 목록 저장
    const [favorites, setFavorites] = React.useState<string[]>([]); // 즐겨찾기 목록 저장
    const [showDropdown, setShowDropdown] = React.useState(false); // 드롭다운 보여줄지 결정
    const [selectedOption, setSelectedOption] = React.useState('recent'); // 선택한 옵션
    const router = useRouter();
    const dropdownRef = React.useRef<HTMLDivElement>(null); // 드롭다운 참조

    // 로그인 상태 확인
    const isLoggedIn = Boolean(email != '');

    // 초기화 시 localStorage에서 최근 검색어 및 즐겨찾기 목록 불러오기
    React.useEffect(() => {
        if (isLoggedIn) {
            setRecentSearches(searchRecently || []);
            setFavorites(searchFavorites || []);
        } else {
            const storedSearches = localStorage.getItem('recentSearches');
            const storedFavorites = localStorage.getItem('favorites');
            if (storedSearches) {
                setRecentSearches(JSON.parse(storedSearches));
            }
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        }
    }, []);

    // 검색창 외부 클릭 시 드롭다운을 닫는 로직
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLoggedIn,searchFavorites,searchRecently]);

    const handleSearch = async (name: string) => {
        const formattedName = name.replace('#', '-');
        if (!recentSearches.includes(formattedName)) {
            const newSearches = [formattedName, ...recentSearches.slice(0, 19)]; // 20개만 저장
            setRecentSearches(newSearches);
            if (!isLoggedIn) {
                localStorage.setItem('recentSearches', JSON.stringify(newSearches));
            } else {
                await fetch('/api/post/recently', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ recent: formattedName }),
                });
            }
        }
        router.push('/games/' + formattedName);
        setShowDropdown(false); // 검색 후 드롭다운 닫기
    };

    const handleDeleteSearch = async (name: string) => {
        const updatedSearches = recentSearches.filter(search => search !== name);
        setRecentSearches(updatedSearches);
        if (!isLoggedIn) {
            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        } else {
            await fetch('/api/post/recently', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recent: name }),
            });
        }
    };

    const handleDeleteFavorite = async (name: string) => {
        const updatedFavorites = favorites.filter(favorite => favorite !== name);
        setFavorites(updatedFavorites);
        if (!isLoggedIn) {
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            await fetch('/api/post/favorites', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favorite: name }),
            });
        }
    };

    const addFavorite = async (name: string) => {
        const newFavorites = [...favorites, name];
        setFavorites(newFavorites);
        if (!isLoggedIn) {
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } else {
            await fetch('/api/post/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favorite: name }),
            });
        }
    };

    const toggleFavorite = (name: string) => {
        if (favorites.includes(name)) {
            handleDeleteFavorite(name);
        } else {
            addFavorite(name);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-2 p-2">
            <div className="relative w-96" ref={dropdownRef}>
                {/* 검색창 */}
                <div className="flex rounded-full border-2 border-gray-300 shadow-md">
                    <Input
                        className="w-full rounded-l-full px-4 py-2 focus:outline-none focus:ring-0"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.includes('#')) {
                                setSummonerName(value.replace('#', '-'));
                            } else {
                                setSummonerName(value + "-KR1");
                            }
                        }}
                        placeholder="플레이어 이름 + #KR1"
                        onFocus={() => setShowDropdown(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(summonerName);
                            }
                        }}
                    ></Input>
                    <Button onClick={() => handleSearch(summonerName)} className="rounded-r-full bg-blue-500 text-white px-4 py-2">
                        검색
                    </Button>
                </div>

                {/* 드롭다운 */}
                {showDropdown && (
                    <div className="absolute z-10 bg-white border-2 border-gray-300 rounded-b-lg shadow-lg w-full mt-1">
                        <div className="flex justify-between">
                            <button
                                className={`w-1/2 px-4 py-2 ${selectedOption === 'recent' ? '' : 'bg-gray-200'}`}
                                onClick={() => setSelectedOption('recent')}
                            >
                                최근 검색
                            </button>
                            <button
                                className={`w-1/2 px-4 py-2 ${selectedOption === 'favorites' ? '' : 'bg-gray-200'}`}
                                onClick={() => setSelectedOption('favorites')}
                            >
                                즐겨찾기
                            </button>
                        </div>

                        {/* 검색 결과 리스트 */}
                        <div className="py-2">
                            {selectedOption === 'recent' && recentSearches.length > 0 && (
                                recentSearches.map((search, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-200 cursor-pointer">
                                        <div onClick={() => handleSearch(search)}>
                                            {search.replace('-', '#')}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button type="button" onClick={() => toggleFavorite(search)}>
                                                {favorites.includes(search) ? '⭐' : '☆'}
                                            </button>
                                            <button className="text-red-500" onClick={() => handleDeleteSearch(search)}>x</button>
                                        </div>
                                    </div>
                                ))
                            )}

                            {selectedOption === 'favorites' && favorites.length > 0 && (
                                favorites.map((favorite, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-200 cursor-pointer">
                                        <div onClick={() => handleSearch(favorite)}>
                                            {favorite.replace('-', '#')}
                                        </div>
                                        <button className="text-red-500" onClick={() => handleDeleteFavorite(favorite)}>x</button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

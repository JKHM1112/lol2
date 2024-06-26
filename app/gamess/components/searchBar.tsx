'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface searchInterface {
    searchFavorites: string[] | undefined;
}

export default function SearchBar({ searchFavorites }: searchInterface) {
    const [summonerName, setSummonerName] = React.useState(''); // 소환사 이름 저장
    const [recentSearches, setRecentSearches] = React.useState<string[]>([]); // 최근 검색어 목록 저장
    const [favorites, setFavorites] = React.useState<string[]>(searchFavorites || []); // 즐겨찾기 목록 저장
    const [showDropdown, setShowDropdown] = React.useState(false); // 드롭다운 보여줄지 결정
    const [selectedOption, setSelectedOption] = React.useState('recent'); // 선택한 옵션
    const router = useRouter();

    React.useEffect(() => {
        const storedSearches = localStorage.getItem('recentSearches');
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    }, []);

    const handleSearch = (name: string) => {
        const formattedName = name.replace('#', '-');
        if (!recentSearches.includes(formattedName)) {
            const newSearches = [formattedName, ...recentSearches.slice(0, 19)]; // 20개만 저장
            setRecentSearches(newSearches);
            localStorage.setItem('recentSearches', JSON.stringify(newSearches));
        }
        router.push('/gamess/' + formattedName);
        setShowDropdown(false); // 검색 후 드롭다운 닫기
    };

    const handleDeleteSearch = (name: string) => {
        const updatedSearches = recentSearches.filter(search => search !== name);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const handleDeleteFavorite = async (name: string) => {
        const updatedFavorites = favorites.filter(favorite => favorite !== name);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        await fetch('/api/post/favorites', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ favorite: name }),
        });
    };

    const addFavorite = async (name: string) => {
        const newFavorites = [...favorites, name];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));

        await fetch('/api/post/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ favorite: name }),
        });
    };

    const toggleFavorite = (name: string) => {
        if (favorites.includes(name)) {
            handleDeleteFavorite(name);
        } else {
            addFavorite(name);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center gap-2 p-4'>
            <div className='relative w-72'>
                <div className='flex'>
                    <Input
                        className='w-full'
                        onChange={(e) => setSummonerName(e.target.value.replace('#', '-'))}
                        placeholder="플레이어 이름 + #KR1"
                        onFocus={() => setShowDropdown(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(summonerName);
                            }
                        }}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    />
                    <Button onClick={() => handleSearch(summonerName)}>검색</Button>
                </div>
                {showDropdown && (
                    <div className='absolute bg-white border border-gray-300 rounded-b-lg shadow-md w-full max-h-40 overflow-y-scroll' onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                        <div className='flex justify-between'>
                            <button
                                className={`w-1/2 px-4 py-2 ${selectedOption === 'recent' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                onClick={() => setSelectedOption('recent')}
                            >
                                최근 검색
                            </button>
                            <button
                                className={`w-1/2 px-4 py-2 ${selectedOption === 'favorites' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                onClick={() => setSelectedOption('favorites')}
                            >
                                즐겨찾기
                            </button>
                        </div>
                        <div className="overflow-y-scroll max-h-40">
                            {selectedOption === 'recent' && (
                                <div>
                                    {recentSearches.map((search, index) => (
                                        <div key={index} className='flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200'>
                                            <div onClick={() => handleSearch(search)}>
                                                {search.replace('-', '#')}
                                            </div>
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleFavorite(search)}
                                                    className='ml-2'
                                                >
                                                    {favorites.includes(search) ? '⭐' : '☆'}
                                                </button>
                                                <button onClick={() => handleDeleteSearch(search)} className='text-red-500 ml-2'>
                                                    x
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {selectedOption === 'favorites' && (
                                <div>
                                    {favorites.map((favorite, index) => (
                                        <div key={index} className='flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200'>
                                            <div onClick={() => handleSearch(favorite)}>
                                                {favorite.replace('-', '#')}
                                            </div>
                                            <button onClick={() => handleDeleteFavorite(favorite)} className='text-red-500 ml-2'>
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

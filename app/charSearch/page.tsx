'use client'
import { useState } from "react";
import { useRouter } from "next/router";

export default function CharSearch() {
    const [characters, setCharacters] = useState(Array(10).fill(""));
    const router = useRouter();

    const handleInputChange = (index: any, value: any) => {
        const newCharacters = [...characters];
        newCharacters[index] = value;
        setCharacters(newCharacters);
    };

    const handleSubmit = () => {
        // 캐릭터 정보들을 쿼리스트링에 담아 전송
        router.push({
            pathname: '/character-info',
            query: { characters: JSON.stringify(characters) },
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                {[...Array(5)].map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`캐릭터 ${index + 1}`}
                        value={characters[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                {[...Array(5)].map((_, index) => (
                    <input
                        key={index + 5}
                        type="text"
                        placeholder={`캐릭터 ${index + 6}`}
                        value={characters[index + 5]}
                        onChange={(e) => handleInputChange(index + 5, e.target.value)}
                    />
                ))}
            </div>
            <button onClick={handleSubmit} style={{ marginLeft: '20px' }}>
                검색
            </button>
        </div>
    );
}

// components/selectButton.tsx
'use client'
import React, { useState } from 'react';
import SearchResults from "./searchResults";
import RankResult from "./rankResult";
import AramResult from "./aramResult";
export default function SelectButton({ searchResults, rankResult, aramResult, puuid }: any) {
    const [activeTable, setActiveTable] = useState('all');

    return (
        <div>
            <div className="flex gap-4 mt-4">
                <button onClick={() => setActiveTable('all')}>모든 게임 보기</button>
                <button onClick={() => setActiveTable('ranked')}>랭크 게임 보기</button>
                <button onClick={() => setActiveTable('aram')}>칼바람 게임 보기</button>
            </div>
            <div>
                {activeTable === 'all' && <SearchResults searchResults={searchResults} puuid={puuid} />}
                {activeTable === 'ranked' && <RankResult rankResult={rankResult} puuid={puuid} />}
                {activeTable === 'aram' && <AramResult aramResult={aramResult} puuid={puuid} />}
            </div>
        </div>
    );
}
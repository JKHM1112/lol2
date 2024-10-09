'use client';

import { useState } from 'react';

export default function VersionDelete({ versusCollection }: any) {
    const [selectedVersion, setSelectedVersion] = useState<number | null>(null);

    // 패치 버전 삭제 함수
    const deleteVersion = async (version: number) => {
        try {
            const response = await fetch('/api/post/deleteVersion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ version }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete version');
            }

            alert(`패치 버전 ${version}이 성공적으로 삭제되었습니다.`);
        } catch (error) {
            console.error('Error deleting version:', error);
            alert('버전을 삭제하는 데 실패했습니다.');
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold">패치 버전 삭제</h2>
            <div className="flex space-x-4">
                {Array.from({ length: 11 }, (_, index) => index + 10).map((version) => (
                    <button
                        key={version}
                        onClick={() => {
                            setSelectedVersion(version);
                            deleteVersion(version);  // 해당 버전을 삭제
                        }}
                        className={`p-2 ${selectedVersion === version ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} rounded`}
                    >
                        {version}
                    </button>
                ))}
            </div>
        </div>
    );
}

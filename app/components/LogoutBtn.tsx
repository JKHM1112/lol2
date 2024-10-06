'use client';
import { signOut } from 'next-auth/react';

export default function LogoutBtn() {
    return (
        <div className="text-base font-normal">
            <button onClick={() => signOut()} className="px-2 py-1 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300" >
                로그아웃
            </button>
        </div>
    );
}

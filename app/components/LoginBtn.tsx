//LoginBtn.tsx
'use client'
import { signIn } from 'next-auth/react'

export default function LoginBtn() {
    return (
        <div className="text-base font-normal">
            <button onClick={() => { signIn() }} className="px-2 py-1 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300" >
                로그인
            </button>
        </div>
    )
}
'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Games() {
    const [summonerName, setSummonerName] = React.useState('')
    const router = useRouter()
    return (
        <div className='flex justify-center items-center gap-2 p-4'>
            <Input
                className='w-72'
                onChange={(e) => setSummonerName(e.target.value.replace('#', '-'))}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        router.push('/gamess/' + summonerName)
                    }
                }}
                placeholder="플레이어 이름 + #KR1"
            />
            <Link href={'/gamess/' + summonerName}>
                <Button>검색</Button>
            </Link>
        </div>
    )
}
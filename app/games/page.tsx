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
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className='flex items-center gap-2 p-4'>
            <h4>닉네임을 검색하십시오.</h4>
            <Input
                className='w-72'
                onChange={(e) => setSummonerName(e.target.value.replace('#', '-'))}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        router.push('/games/' + summonerName)
                    }
                }}
            />
            <Link href={'/games/' + summonerName}>
                <Button>검색</Button>
            </Link>
        </div>
    )
}
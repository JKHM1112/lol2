'use client'
import * as React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Games() {
    const [summonerName, setSummonerName] = React.useState('')

    return (
        <div className='flex items-center gap-2 p-4'>
            <h4>닉네임을 검색하십시오.</h4>
            <Input className='w-72' onChange={(e) => setSummonerName(e.target.value.replace('#', '-'))} />
            <Link href={'/games/' + summonerName}>
                <Button>검색</Button>
            </Link>
        </div>
    )
}
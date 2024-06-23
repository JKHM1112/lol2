'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { champion } from "../data/champion"

const champions: any = champion

interface CharCarouselProps {
    recentData: {
        chams: string[]
        date: string
    }[]
    data2: any
    data3: any
}

export default function CharCarousel({ recentData, data2, data3 }: CharCarouselProps) {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false}))
    let allNames = recentData.map((item) => item.chams[0])
    let nameCounts: { [key: string]: number } = {}
    allNames.forEach((name: string) => {
        if (nameCounts[name]) {
            nameCounts[name] += 1
        } else {
            nameCounts[name] = 1
        }
    })
    let topNames = Object.entries(nameCounts).sort((a, b) => b[1] - a[1]).slice(0, 5)

    const getChampionImg = (championCode: string) => (
        <Image className='rounded-md' alt={championCode} src={`/championLoading/${championCode}_0.jpg`} width={120} height={200} />
    )

    function getKoreanName(nameE: string) {
        return champions.data[nameE]?.name || nameE;
    }

    const getChampionChange1 = (koreanName: string) => {
        const change = data2.championChanges.find((change: any) => change.key === koreanName);
        return change ? change.value : '';
    }

    const getChampionChange2 = (koreanName: string) => {
        const change = data3.championChanges.find((change: any) => change.key === koreanName);
        return change ? change.value : '';
    }

    return (
        <div className="w-full flex justify-center">
            <Carousel plugins={[plugin.current]} className="w-[400px] h-[300px]" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
                <CarouselContent>
                    {topNames.map(([name, count], index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex items-center p-6 w-full h-full" style={{ maxWidth: '400px', height: '300px' }}>
                                        <div className="w-1/2 flex justify-center">
                                            <div className="w-[150px] h-[200px]">
                                                {getChampionImg(name)}
                                            </div>
                                        </div>
                                        <div className="w-1/2 flex flex-col items-start">
                                            <div className="mb-2 text-lg font-semibold">
                                                {name}
                                            </div>
                                            <div className="mb-2 text-sm">
                                                게임 수: {count}
                                            </div>
                                            <div className="mb-1 text-sm">
                                                {data2.title}
                                                <br />
                                                {getChampionChange1(getKoreanName(name)) || '없음'}
                                            </div>
                                            <div className="mb-1 text-sm">
                                                {data3.title}
                                                <br />
                                                {getChampionChange2(getKoreanName(name)) || '없음'}
                                            </div>
                                            <div className="mt-2">
                                                <Link href={'/characterInformation/' + name}>
                                                    <Button className="bg-sky-400">챔피언 상세보기</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
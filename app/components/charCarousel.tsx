'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

interface CharCarouselProps {
    recentData: {
        chams: string[]
        date: string
    }[]
    data2: any
    data3: any
}

export default function CharCarousel({ recentData, data2, data3 }: CharCarouselProps) {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
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
        <Image className='rounded-md' alt={'champion1'} src={`/championLoading/${championCode}_0.jpg`} width={250} height={180} />
    )
    return (
        <div>
            <div className="w-full flex justify-center">
                <h1>현재 패치노트: {data2.title}</h1>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-[800px] h-[400px]"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {topNames.map(([name, count], index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <div className="">
                                                {getChampionImg(name)}
                                            </div>
                                            <div className="">
                                                {name}
                                            </div>
                                            <div className="">
                                                {count}
                                            </div>
                                            <div>
                                                {/* <Link href={'/characterInformation/' + name}>
                                                    <Button>챔피언 상세보기</Button>
                                                </Link> */}
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
        </div>
    )
}
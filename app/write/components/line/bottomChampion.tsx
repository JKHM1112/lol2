import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import Image from "next/image";
import { useState } from "react";
import useUserStore from "@/app/hooks/useUserStore";
import { champion } from "@/app/data/champion";

export default function BottomChampion() {

    const championData = champion

    const championsList = Object.values(championData.data).map((champion) => ({
        nameE: champion.id,
        nameK: champion.name,
        img: '/Champion/' + champion.image.full
    }));
    
    const { champions, setChampions } = useUserStore();
    const [championOpen1, setChampionOpen1] = useState(false)
    const [championOpen2, setChampionOpen2] = useState(false)
    const [championOpen3, setChampionOpen3] = useState(false)
    const [championOpen4, setChampionOpen4] = useState(false)

    const nameChangeEK = (nameE: string) => {
        const champion = championsList.find(champ => champ.nameE === nameE);
        return champion ? champion.nameK : nameE;
    };

    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-4">
                    <Popover open={championOpen1} onOpenChange={setChampionOpen1}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {champions[0] ? (
                                    <>
                                        <Image alt={champions[0]} src={'/champion/' + champions[0] + '.png'} height={20} width={20}></Image>
                                        {nameChangeEK(champions[0])}
                                    </>
                                ) : (
                                    <>내 바텀 선택</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change champion..." />
                                <CommandList>
                                    <CommandEmpty>No champions found.</CommandEmpty>
                                    <CommandGroup>
                                        {championsList.map((champion) => (
                                            <CommandItem key={champion.nameK} value={champion.nameK} onSelect={() => {
                                                setChampions(0, champion.nameE);
                                                setChampionOpen1(false);
                                            }}
                                            >
                                                <Image alt={champion.nameE} src={champion.img} height={20} width={20}></Image>
                                                <span className="mr-2">{champion.nameK}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center space-x-4">
                    <Popover open={championOpen2} onOpenChange={setChampionOpen2}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {champions[1] ? (
                                    <>
                                        <Image alt={champions[1]} src={'/champion/' + champions[1] + '.png'} height={20} width={20}></Image>
                                        {nameChangeEK(champions[1])}
                                    </>
                                ) : (
                                    <>상대 바텀 선택</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change champion..." />
                                <CommandList>
                                    <CommandEmpty>No champions found.</CommandEmpty>
                                    <CommandGroup>
                                        {championsList.map((champion) => (
                                            <CommandItem key={champion.nameK} value={champion.nameK} onSelect={() => {
                                                setChampions(1, champion.nameE);
                                                setChampionOpen2(false);
                                            }}
                                            >
                                                <Image alt={champion.nameE} src={champion.img} height={20} width={20}></Image>
                                                <span className="mr-2">{champion.nameK}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-4">
                    <Popover open={championOpen3} onOpenChange={setChampionOpen3}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {champions[2] ? (
                                    <>
                                        <Image alt={champions[2]} src={'/champion/' + champions[2] + '.png'} height={20} width={20}></Image>
                                        {nameChangeEK(champions[2])}
                                    </>
                                ) : (
                                    <>내 서폿 선택</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change champion..." />
                                <CommandList>
                                    <CommandEmpty>No champions found.</CommandEmpty>
                                    <CommandGroup>
                                        {championsList.map((champion) => (
                                            <CommandItem key={champion.nameK} value={champion.nameK} onSelect={() => {
                                                setChampions(2, champion.nameE);
                                                setChampionOpen3(false);
                                            }}
                                            >
                                                <Image alt={champion.nameE} src={champion.img} height={20} width={20}></Image>
                                                <span className="mr-2">{champion.nameK}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <Popover open={championOpen4} onOpenChange={setChampionOpen4}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {champions[3] ? (
                                    <>
                                        <Image alt={champions[3]} src={'/champion/' + champions[3] + '.png'} height={20} width={20}></Image>
                                        {nameChangeEK(champions[3])}
                                    </>
                                ) : (
                                    <>상대 서폿 선택</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change champion..." />
                                <CommandList>
                                    <CommandEmpty>No champions found.</CommandEmpty>
                                    <CommandGroup>
                                        {championsList.map((champion) => (
                                            <CommandItem key={champion.nameK} value={champion.nameK} onSelect={() => {
                                                setChampions(3, champion.nameE);
                                                setChampionOpen4(false);
                                            }}
                                            >
                                                <Image alt={champion.nameE} src={champion.img} height={20} width={20}></Image>
                                                <span className="mr-2">{champion.nameK}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <input style={{ display: 'none' }} name="chams" value={JSON.stringify(champions)} readOnly />
        </div>
    )
}
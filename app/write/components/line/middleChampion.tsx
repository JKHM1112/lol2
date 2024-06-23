import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import Image from "next/image";
import { useState } from "react";
import useUserStore from "@/app/hooks/useUserStore";
import { champion } from "@/app/data/champion";

export default function MiddleChampion() {
    const championData = champion

    const championsList = Object.values(championData.data).map((champion) => ({
        nameE: champion.id,
        nameK: champion.name,
        img: '/Champion/' + champion.image.full
    }));
    const { champions, setChampions } = useUserStore();


    const [championOpen1, setChampionOpen1] = useState(false)
    const [championOpen2, setChampionOpen2] = useState(false)

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
                                    <>내 챔피언 선택</>
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
                                    <>상대 챔피언 선택</>
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
            <input style={{ display: 'none' }} name="chams" value={JSON.stringify(champions)} readOnly />
        </div>
    )
}
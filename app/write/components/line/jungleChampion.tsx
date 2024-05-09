import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import Image from "next/image";
import { useState } from "react";
import useUserStore from "@/app/hooks/useUserStore";
import { getChampions } from "@/components/champions";


export default function JungleChampion() {

    const championData = getChampions();

    const champion = championData.map((champion) => ({
        nameE: champion.nameE,
        nameK: champion.nameK,
        img: '/ChampionE/' + champion.nameE + '.png'
    }));
    const { participants, selectedGame, puuid } = useUserStore();

    const participant1 = participants[selectedGame].find((participant: any) => participant.puuid === puuid)
    const participant1Line = participant1.individualPosition
    const participant1Champion = participant1.championName
    const participant2 = participants[selectedGame].find((participant: any) => participant.individualPosition === participant1Line && participant.puuid !== puuid)
    const participant2Champion = participant2.championName

    const [championOpen1, setChampionOpen1] = useState(false)
    const [championOpen2, setChampionOpen2] = useState(false)
    const [selectedChampion1, setSelectedChampion1] = useState(participant1Champion)
    const [selectedChampion2, setSelectedChampion2] = useState(participant2Champion)

    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">내정글챔피언*</p>
                    <Popover open={championOpen1} onOpenChange={setChampionOpen1}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedChampion1 ? (
                                    <>
                                        <Image alt={selectedChampion1} src={'/championE/' + selectedChampion1 + '.png'} height={20} width={20}></Image>
                                        {champion.find((champion) => champion.nameE === selectedChampion1)?.nameK}
                                    </>
                                ) : (
                                    <>+ Set Champion</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change champion..." />
                                <CommandList>
                                    <CommandEmpty>No champions found.</CommandEmpty>
                                    <CommandGroup>
                                        {champion.map((champion) => (
                                            <CommandItem key={champion.nameK} value={champion.nameK} onSelect={() => {
                                                setSelectedChampion1(champion.nameE);
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
                    <p className="text-sm text-muted-foreground">상대정글챔피언*</p>
                    <Popover open={championOpen2} onOpenChange={setChampionOpen2}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedChampion2 ? (
                                    <>
                                        <Image alt={selectedChampion2} src={'/championE/' + selectedChampion2 + '.png'} height={20} width={20}></Image>
                                        {champion.find((champion) => champion.nameE === selectedChampion2)?.nameK}
                                    </>
                                ) : (
                                    <>+ Set Champion</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change champion..." />
                                <CommandList>
                                    <CommandEmpty>No champions found.</CommandEmpty>
                                    <CommandGroup>
                                        {champion.map((champion) => (
                                            <CommandItem key={champion.nameK} value={champion.nameK} onSelect={() => {
                                                setSelectedChampion2(champion.nameE);
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
            <input style={{ display: 'none' }} name="cham1" defaultValue={participant1.championName} />
            <input style={{ display: 'none' }} name="cham2" defaultValue={participant2.championName} />
        </div>
    )
}
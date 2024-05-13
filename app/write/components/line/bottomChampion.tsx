import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import Image from "next/image";
import { useState } from "react";
import useUserStore from "@/app/hooks/useUserStore";
import { getChampions } from "@/components/champions";

export default function BottomChampion() {

    const championData = getChampions();

    const champion = championData.map((champion) => ({
        nameE: champion.nameE,
        nameK: champion.nameK,
        img: '/ChampionE/' + champion.nameE + '.png'
    }));
    const { participants, selectedGame, puuid, champions, setChampions } = useUserStore();
    const defaultParticipant = { championName: '' };

    const participant1 = participants[selectedGame].find((participant: any) => participant.puuid === puuid)
    const participant1Line = participant1.individualPosition
    const participant1ParticipantId = participant1.participantId
    const participant2 = participants[selectedGame].find((participant: any) => participant.individualPosition === participant1Line && participant.puuid !== puuid)
    const participant3 = participants[selectedGame].find((participant: any) => participant.individualPosition === 'UTILITY' && participant.participantId === participant1ParticipantId + 1) || defaultParticipant;
    const participant4 = participants[selectedGame].find((participant: any) => participant.individualPosition === 'UTILITY' && participant.participantId !== participant1ParticipantId + 1) || defaultParticipant;

    const [championOpen1, setChampionOpen1] = useState(false)
    const [championOpen2, setChampionOpen2] = useState(false)
    const [championOpen3, setChampionOpen3] = useState(false)
    const [championOpen4, setChampionOpen4] = useState(false)

    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">내원딜챔피언*</p>
                    <Popover open={championOpen1} onOpenChange={setChampionOpen1}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {champions[0] ? (
                                    <>
                                        <Image alt={champions[0]} src={'/championE/' + champions[0] + '.png'} height={20} width={20}></Image>
                                        {champion.find((champion) => champion.nameE === champions[0])?.nameK}
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
                    <p className="text-sm text-muted-foreground">상대원딜챔피언*</p>
                    <Popover open={championOpen2} onOpenChange={setChampionOpen2}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {champions[1] ? (
                                    <>
                                        <Image alt={champions[1]} src={'/championE/' + champions[1] + '.png'} height={20} width={20}></Image>
                                        {champion.find((champion) => champion.nameE === champions[1])?.nameK}
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
                    <p className="text-sm text-muted-foreground">내서폿챔피언*</p>
                    <Popover open={championOpen3} onOpenChange={setChampionOpen3}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {champions[2] ? (
                                    <>
                                        <Image alt={champions[2]} src={'/championE/' + champions[2] + '.png'} height={20} width={20}></Image>
                                        {champion.find((champion) => champion.nameE === champions[2])?.nameK}
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
                    <p className="text-sm text-muted-foreground">상대서폿챔피언*</p>
                    <Popover open={championOpen4} onOpenChange={setChampionOpen4}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {champions[3] ? (
                                    <>
                                        <Image alt={champions[3]} src={'/championE/' + champions[3] + '.png'} height={20} width={20}></Image>
                                        {champion.find((champion) => champion.nameE === champions[3])?.nameK}
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
            <input style={{ display: 'none' }} name="cham1" defaultValue={champions[0]} readOnly />
            <input style={{ display: 'none' }} name="cham2" defaultValue={champions[1]} readOnly />
            <input style={{ display: 'none' }} name="cham3" defaultValue={champions[2]} readOnly />
            <input style={{ display: 'none' }} name="cham4" defaultValue={champions[3]} readOnly />
        </div>
    )
}
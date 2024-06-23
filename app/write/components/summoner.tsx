import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";
import { summoner } from "@/app/data/summoner";

export default function Summoners() {
    const summonerData = summoner;
    const [summonerOpen, setSummonerOpen] = useState(Array(4).fill(false));
    const { summoners, setSummoners } = useUserStore();

    const handleSpellOpen = (index: any, isOpen: any) => {
        const updatedSpellOpen = [...summonerOpen];
        updatedSpellOpen[index] = isOpen;
        setSummonerOpen(updatedSpellOpen);
    };

    const findSummonerNameK = (key: any) => {
        const summoner = Object.values(summonerData.data).find(summoner => summoner.key == key);
        return summoner ? summoner.name : '';
    };

    const selectedSpells = ['내 스펠D', '내 스펠F', '상대 스펠D', '상대 스펠F'];

    return (
        <div>
            {summoners.map((selectedSummoner, i) => (
                <div className="flex items-center space-x-4" key={i}>
                    <Popover open={summonerOpen[i]} onOpenChange={(value) => handleSpellOpen(i, value)}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {summoners[i] && findSummonerNameK(summoners[i]) ? (
                                    <>
                                        <Image alt={findSummonerNameK(summoners[i])} src={'/spellN/' + summoners[i] + '.png'} height={20} width={20} />
                                        {findSummonerNameK(summoners[i])}
                                    </>
                                ) : (
                                    selectedSpells[i]
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change spell..." />
                                <CommandList>
                                    <CommandEmpty>No spells found.</CommandEmpty>
                                    <CommandGroup>
                                        {Object.values(summonerData.data).map((summoner: any, j) => (
                                            <CommandItem key={j} value={summoner.name} onSelect={() => {
                                                setSummoners(i, summoner.key);
                                                handleSpellOpen(i, false);
                                            }}>
                                                <Image alt={summoner.name} src={'/spellN/' + summoner.key + '.png'} height={20} width={20} />
                                                <span className="mr-2">{summoner.name}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            ))}

            <input style={{ display: 'none' }} name="summoners" value={JSON.stringify(summoners)} readOnly />
        </div>
    );
}

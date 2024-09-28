import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";
import { summoner } from "@/app/data/summoner";

export default function Summoners({ dataActiveTab }: any) {
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

    const selectedSpells = ['내 스펠D', '내 스펠F', '네 스펠D', '네 스펠F'];

    const renderSummoners = (startIndex: number, endIndex: number) => {
        return summoners.slice(startIndex, endIndex).map((selectedSummoner, i) => (
            <div className="grid grid-cols-1 gap-2 m-2" key={i + startIndex}>
                <Popover open={summonerOpen[i + startIndex]} onOpenChange={(value) => handleSpellOpen(i + startIndex, value)}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                            {summoners[i + startIndex] && findSummonerNameK(summoners[i + startIndex]) ? (
                                <>
                                    <Image alt={findSummonerNameK(summoners[i + startIndex])} src={'/spellN/' + summoners[i + startIndex] + '.png'} height={25} width={25} className="rounded" />
                                    <span className="ml-2">{findSummonerNameK(summoners[i + startIndex])}</span>
                                </>
                            ) : (
                                selectedSpells[i + startIndex]
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[180px]" side="right" align="start">
                        <Command>
                            <CommandInput placeholder="스펠 검색..." />
                            <CommandList>
                                <CommandEmpty>스펠을 찾을 수 없습니다.</CommandEmpty>
                                <CommandGroup>
                                    {Object.values(summonerData.data).map((summoner: any, j) => (
                                        <CommandItem key={j} value={summoner.name} onSelect={() => {
                                            setSummoners(i + startIndex, summoner.key);
                                            handleSpellOpen(i + startIndex, false);
                                        }}>
                                            <Image alt={summoner.name} src={'/spellN/' + summoner.key + '.png'} height={20} width={20} className="rounded" />
                                            <span className="ml-2">{summoner.name}</span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        ));
    };

    return (
        <div className="flex">
            <div>
                {dataActiveTab == "MyData" && renderSummoners(0, 2)}
            </div>
            <div>
                {dataActiveTab == "YourData" && renderSummoners(2, 4)}
            </div>
        </div>
    );
}

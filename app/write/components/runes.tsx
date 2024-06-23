import { getRunes } from "@/components/runes";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";

export default function Runes() {
    const runeData = getRunes();
    const { runes, setRunes } = useUserStore();
    const [runeOpen, setRuneOpen] = useState(Array(18).fill(false));

    const handleRuneOpen = (index: number, isOpen: boolean) => {
        const updatedRuneOpen = [...runeOpen];
        updatedRuneOpen[index] = isOpen;
        setRuneOpen(updatedRuneOpen);
    };

    const findRuneNameK = (nameN: number): string => {
        const rune = runeData.find(rune => rune.nameN === nameN);
        return rune ? rune.nameK : '';
    };

    const findRuneNameImg = (nameN: number): string => {
        const rune = runeData.find(rune => rune.nameN === nameN);
        return rune ? rune.nameImg : '';
    };

    const renderRunes = (startIndex: number, endIndex: number) => {
        return (
            <div>
                {runes.slice(startIndex, endIndex).map((selectedRune, i) => (
                    <div className="flex items-center space-x-4" key={i + startIndex}>
                        <Popover open={runeOpen[i + startIndex]} onOpenChange={(value) => handleRuneOpen(i + startIndex, value)}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="w-[135px] justify-start">
                                    {runes[i + startIndex] && findRuneNameK(runes[i + startIndex]) ? (
                                        <>
                                            <Image alt={findRuneNameK(runes[i + startIndex])} src={'/' + findRuneNameImg(runes[i + startIndex])} height={20} width={20}></Image>
                                            {findRuneNameK(runes[i + startIndex])}
                                        </>
                                    ) : (
                                        <>+ Set Rune</>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" side="right" align="start">
                                <Command>
                                    <CommandInput placeholder="Change rune..." />
                                    <CommandList>
                                        <CommandEmpty>No runes found.</CommandEmpty>
                                        <CommandGroup>
                                            {runeData.map((rune, j) => (
                                                <CommandItem key={j} value={rune.nameK} onSelect={() => {
                                                    setRunes(i + startIndex, rune.nameN);
                                                    handleRuneOpen(i + startIndex, false);
                                                }}>
                                                    <Image alt={rune.nameK} src={'/' + rune.nameImg} height={20} width={20}></Image>
                                                    <span className="mr-2">{rune.nameK}</span>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex">
            <div>
                <h2>Runes Set 1</h2>
                {renderRunes(0, 9)}
            </div>
            <div>
                <h2>Runes Set 2</h2>
                {renderRunes(9, 18)}
            </div>
            <input style={{ display: 'none' }} name="runes" value={JSON.stringify(runes)} readOnly />
        </div>
    );
}

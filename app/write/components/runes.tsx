import { getRunes } from "@/components/runes";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";

export default function Runes() {
    const runeData = getRunes();
    const { runes, setRunes } = useUserStore();
    const [runeOpen, setRuneOpen] = useState(Array(12).fill(false))

    const handleRuneOpen = (index: number, isOpen: boolean) => {
        const updatedRuneOpen = [...runeOpen]
        updatedRuneOpen[index] = isOpen
        setRuneOpen(updatedRuneOpen)
    }
    const findRuneNameK = (nameN: number): string => {
        const rune = runeData.find(rune => rune.nameN === nameN);
        return rune ? rune.nameK : '';
    }
    const findRuneNameImg = (nameN: number): string => {
        const rune = runeData.find(rune => rune.nameN === nameN);
        return rune ? rune.nameImg : '';
    }

    return (

        <div>
            {runes.map((selectedRune, i) => (
                <div className="flex items-center space-x-4" key={i}>
                    <p className="text-sm text-muted-foreground">룬{i + 1}</p>
                    <Popover open={runeOpen[i]} onOpenChange={(value) => handleRuneOpen(i, value)}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {runes[i] && findRuneNameK(runes[i]) ? (
                                    <>
                                        <Image alt={findRuneNameK(runes[i])} src={'/' + findRuneNameImg(runes[i])} height={20} width={20}></Image>
                                        {findRuneNameK(runes[i])}
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
                                                setRunes(i, rune.nameN);
                                                handleRuneOpen(i, false)
                                            }}
                                            >
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
            
            <input style={{ display: 'none' }} name="rune1" defaultValue={runes[0]} />
            <input style={{ display: 'none' }} name="rune2" defaultValue={runes[1]} />
            <input style={{ display: 'none' }} name="rune3" defaultValue={runes[2]} />
            <input style={{ display: 'none' }} name="rune4" defaultValue={runes[3]} />
            <input style={{ display: 'none' }} name="rune5" defaultValue={runes[4]} />
            <input style={{ display: 'none' }} name="rune6" defaultValue={runes[5]} />
            <input style={{ display: 'none' }} name="rune7" defaultValue={runes[6]} />
            <input style={{ display: 'none' }} name="rune8" defaultValue={runes[7]} />
            <input style={{ display: 'none' }} name="rune9" defaultValue={runes[8]} />
            <input style={{ display: 'none' }} name="rune10" defaultValue={runes[9]} />
            <input style={{ display: 'none' }} name="rune11" defaultValue={runes[10]} />
            <input style={{ display: 'none' }} name="rune12" defaultValue={runes[11]} />
        </div>
    )
}
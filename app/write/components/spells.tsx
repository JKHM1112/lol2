import { Button } from "@/components/ui/button";
import { getSpells } from "@/components/spells";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useEffect, useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";

export default function Spells() {

    const spellData = getSpells();
    const [spellOpen, setSpellOpen] = useState(Array(4).fill(false))
    const { spells, setSpells } = useUserStore();

    const handleSpellOpen = (index: number, isOpen: boolean) => {
        const updatedSpellOpen = [...spellOpen]
        updatedSpellOpen[index] = isOpen
        setSpellOpen(updatedSpellOpen)
    }

    const findSpellNameK = (nameN: number): string => {
        const spell = spellData.find(spell => spell.nameN === nameN);
        return spell ? spell.nameK : '';
    }

    return (
        <div>
            {spells.map((selectedSpell, i) => (
                <div className="flex items-center space-x-4" key={i}>
                    <p className="text-sm text-muted-foreground">스펠{i + 1}</p>
                    <Popover open={spellOpen[i]} onOpenChange={(value) => handleSpellOpen(i, value)}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {spells[i] && findSpellNameK(spells[i]) ? (
                                    <>
                                        <Image alt={findSpellNameK(spells[i])} src={'/spellN/' + spells[i] + '.png'} height={20} width={20}></Image>
                                        {findSpellNameK(spells[i])}
                                    </>
                                ) : (
                                    <>+ Set Spell</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change spell..." />
                                <CommandList>
                                    <CommandEmpty>No spells found.</CommandEmpty>
                                    <CommandGroup>
                                        {spellData.map((spell, j) => (
                                            <CommandItem key={j} value={spell.nameK} onSelect={() => {
                                                setSpells(i, spell.nameN);
                                                handleSpellOpen(i, false)
                                            }}
                                            >
                                                <Image alt={spell.nameK} src={'/spellN/' + spell.nameN + '.png'} height={20} width={20}></Image>
                                                <span className="mr-2">{spell.nameK}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            ))}

            <input style={{ display: 'none' }} name="spell1" value={spells[0]} />
            <input style={{ display: 'none' }} name="spell2" value={spells[1]} />
            <input style={{ display: 'none' }} name="spell3" value={spells[2]} />
            <input style={{ display: 'none' }} name="spell4" value={spells[3]} />
        </div>
    )
}
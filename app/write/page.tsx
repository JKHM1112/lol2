'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import Image from "next/image";
import * as React from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getRunes } from "./runes";
import { getSpells } from "./spells";
import { getChampions } from "./champions";
import { getFirstItems } from "./firstItems";
import { getLegendaryItems } from "./legendaryItems";
import { getShoesItems } from "./shoesItems";
export default function Write() {

    const runes = getRunes();
    const spells = getSpells();
    const champions = getChampions();
    const firstItems = getFirstItems();
    const legendaryItems = getLegendaryItems();
    const shoesItems = getShoesItems();

    const rune: VLIStatus[] = runes.map((rune) => ({ value: rune.value, label: rune.label, img: '/runeE/' + rune.value + '/' + rune.value + '.png' }));
    const spell: VLIStatus[] = spells.map((spell) => ({ value: spell.value, label: spell.label, img: '/spellE/' + spell.value + '.png' }));
    const champion: VLIStatus[] = champions.map((champion) => ({ value: champion.value, label: champion.label, img: '/ChampionE/' + champion.value + '.png' }));
    const firstItem: LIStatus[] = firstItems.map((firstItem) => ({ label: firstItem.label, img: '/FirstItemK/' + firstItem.label + '.png' }));
    const legendaryItem: LIStatus[] = legendaryItems.map((legendaryItem) => ({ label: legendaryItem.label, img: '/LegendaryItemK/' + legendaryItem.label + '.png' }));
    const shoesItem: LIStatus[] = shoesItems.map((shoesItem) => ({ label: shoesItem.label, img: '/ShoesItemK/' + shoesItem.label + '.png' }));

    type VLIStatus = {
        value: string;
        label: string;
        img: string;
    };
    type LIStatus = {
        label: string;
        img: string;
    };
    type Result = '승리' | '패배' | '반반' | '';

    const currentDate = new Date().toISOString().split('T')[0]
    const [selectedLine, setSelectedLine] = useState('')
    const [before6, setBefore6] = useState(3)
    const [after6, setAfter6] = useState(3)
    const [half, setHalf] = useState(3)

    const [championOpen1, setChampionOpen1] = useState(false);
    const [championOpen2, setChampionOpen2] = useState(false);
    const [championOpen3, setChampionOpen3] = useState(false);
    const [championOpen4, setChampionOpen4] = useState(false);
    const [runeOpen1, setRuneOpen1] = useState(false);
    const [runeOpen2, setRuneOpen2] = useState(false);
    const [spellOpen1, setSpellOpen1] = useState(false);
    const [spellOpen2, setSpellOpen2] = useState(false);
    const [spellOpen3, setSpellOpen3] = useState(false);
    const [spellOpen4, setSpellOpen4] = useState(false);
    const [firstItemOpen, setFirstItemOpen] = useState(false);
    const [legendaryItemOpen1, setLegendaryItemOpen1] = useState(false);
    const [legendaryItemOpen2, setLegendaryItemOpen2] = useState(false);
    const [legendaryItemOpen3, setLegendaryItemOpen3] = useState(false);
    const [legendaryItemOpen4, setLegendaryItemOpen4] = useState(false);
    const [legendaryItemOpen5, setLegendaryItemOpen5] = useState(false);
    const [legendaryItemOpen6, setLegendaryItemOpen6] = useState(false);
    const [shoesItemOpen4, setShoesItemOpen] = useState(false);
    const [lineResult, setLineResult] = React.useState('compact')
    const [gameResult, setGameResult] = React.useState('compact')
    const [selectedChampion1, setSelectedChampion1] = useState('');
    const [selectedChampion2, setSelectedChampion2] = useState('');
    const [selectedChampion3, setSelectedChampion3] = useState('');
    const [selectedChampion4, setSelectedChampion4] = useState('');
    const [selectedRune1, setSelectedRune1] = useState('');
    const [selectedRune2, setSelectedRune2] = useState('');
    const [selectedSpell1, setSelectedSpell1] = useState('');
    const [selectedSpell2, setSelectedSpell2] = useState('');
    const [selectedSpell3, setSelectedSpell3] = useState('');
    const [selectedSpell4, setSelectedSpell4] = useState('');
    const [selectedFirstItem, setSelectedFirstItem] = useState('');
    const [selectedLegendaryItem1, setSelectedLegendaryItem1] = useState('');
    const [selectedLegendaryItem2, setSelectedLegendaryItem2] = useState('');
    const [selectedLegendaryItem3, setSelectedLegendaryItem3] = useState('');
    const [selectedLegendaryItem4, setSelectedLegendaryItem4] = useState('');
    const [selectedLegendaryItem5, setSelectedLegendaryItem5] = useState('');
    const [selectedLegendaryItem6, setSelectedLegendaryItem6] = useState('');
    const [SelectedShoesItem, setSelectedShoesItem] = useState('');


    const handleLineChange = (value: string) => {
        setSelectedLine(value)
    }
    const handleBefore6Change = (event: number[]) => {
        setBefore6(event[0])
    }
    const handleAfter6Change = (event: number[]) => {
        setAfter6(event[0])
    }
    const handleHalfChange = (event: number[]) => {
        setHalf(event[0])
    }
    const handleLineResult = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLineResult(e.target.value as Result);
    };

    const handleGameRsult = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGameResult(e.target.value as Result);
    };

    return (
        <div className="flex items-center gap-4">
            <form action="/api/post/newListWrite" method="POST">
                <div className="flex items-center gap-4">
                    <Label className="char3">라인</Label>
                    <Select name="line" value={selectedLine} onValueChange={(value) => handleLineChange(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="라인을 고르세요"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="탑">탑</SelectItem>
                            <SelectItem value="정글">정글</SelectItem>
                            <SelectItem value="미드">미드</SelectItem>
                            <SelectItem value="원딜">원딜</SelectItem>
                            <SelectItem value="서폿">서폿</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {selectedLine == "탑" ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-muted-foreground">내탑챔피언</p>
                            <Popover open={championOpen1} onOpenChange={setChampionOpen1}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                        {selectedChampion1 ? (
                                            <>
                                                <Image alt={selectedChampion1} src={'/championE/' + selectedChampion1 + '.png'} height={20} width={20}></Image>
                                                {champion.find((champion) => champion.value === selectedChampion1)?.label}
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
                                                    <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                        setSelectedChampion1(champion.value);
                                                        setChampionOpen1(false);
                                                    }}
                                                    >
                                                        <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                        <span className="mr-2">{champion.label}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-muted-foreground">상대탑챔피언</p>
                            <Popover open={championOpen2} onOpenChange={setChampionOpen2}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                        {selectedChampion2 ? (
                                            <>
                                                <Image alt={selectedChampion2} src={'/championE/' + selectedChampion2 + '.png'} height={20} width={20}></Image>
                                                {champion.find((champion) => champion.value === selectedChampion2)?.label}
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
                                                    <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                        setSelectedChampion2(champion.value);
                                                        setChampionOpen2(false);
                                                    }}
                                                    >
                                                        <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                        <span className="mr-2">{champion.label}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                ) : null
                }
                {selectedLine == "정글" ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-muted-foreground">내정글챔피언</p>
                            <Popover open={championOpen1} onOpenChange={setChampionOpen1}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                        {selectedChampion1 ? (
                                            <>
                                                <Image alt={selectedChampion1} src={'/championE/' + selectedChampion1 + '.png'} height={20} width={20}></Image>
                                                {champion.find((champion) => champion.value === selectedChampion1)?.label}
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
                                                    <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                        setSelectedChampion1(champion.value);
                                                        setChampionOpen1(false);
                                                    }}
                                                    >
                                                        <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                        <span className="mr-2">{champion.label}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-muted-foreground">상대정글챔피언</p>
                            <Popover open={championOpen2} onOpenChange={setChampionOpen2}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                        {selectedChampion2 ? (
                                            <>
                                                <Image alt={selectedChampion2} src={'/championE/' + selectedChampion2 + '.png'} height={20} width={20}></Image>
                                                {champion.find((champion) => champion.value === selectedChampion2)?.label}
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
                                                    <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                        setSelectedChampion2(champion.value);
                                                        setChampionOpen2(false);
                                                    }}
                                                    >
                                                        <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                        <span className="mr-2">{champion.label}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                ) : null
                }
                {selectedLine == "미드" ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-muted-foreground">내미드챔피언</p>
                            <Popover open={championOpen1} onOpenChange={setChampionOpen1}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                        {selectedChampion1 ? (
                                            <>
                                                <Image alt={selectedChampion1} src={'/championE/' + selectedChampion1 + '.png'} height={20} width={20}></Image>
                                                {champion.find((champion) => champion.value === selectedChampion1)?.label}
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
                                                    <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                        setSelectedChampion1(champion.value);
                                                        setChampionOpen1(false);
                                                    }}
                                                    >
                                                        <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                        <span className="mr-2">{champion.label}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-muted-foreground">상대미드챔피언</p>
                            <Popover open={championOpen2} onOpenChange={setChampionOpen2}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                        {selectedChampion2 ? (
                                            <>
                                                <Image alt={selectedChampion2} src={'/championE/' + selectedChampion2 + '.png'} height={20} width={20}></Image>
                                                {champion.find((champion) => champion.value === selectedChampion2)?.label}
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
                                                    <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                        setSelectedChampion2(champion.value);
                                                        setChampionOpen2(false);
                                                    }}
                                                    >
                                                        <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                        <span className="mr-2">{champion.label}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                ) : null
                }
                {selectedLine == "원딜" ? (
                    <div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-muted-foreground">내원딜챔피언</p>
                                <Popover open={championOpen1} onOpenChange={setChampionOpen1}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                            {selectedChampion1 ? (
                                                <>
                                                    <Image alt={selectedChampion1} src={'/championE/' + selectedChampion1 + '.png'} height={20} width={20}></Image>
                                                    {champion.find((champion) => champion.value === selectedChampion1)?.label}
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
                                                        <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                            setSelectedChampion1(champion.value);
                                                            setChampionOpen1(false);
                                                        }}
                                                        >
                                                            <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                            <span className="mr-2">{champion.label}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-muted-foreground">상대원딜챔피언</p>
                                <Popover open={championOpen2} onOpenChange={setChampionOpen2}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                            {selectedChampion2 ? (
                                                <>
                                                    <Image alt={selectedChampion2} src={'/championE/' + selectedChampion2 + '.png'} height={20} width={20}></Image>
                                                    {champion.find((champion) => champion.value === selectedChampion2)?.label}
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
                                                        <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                            setSelectedChampion2(champion.value);
                                                            setChampionOpen2(false);
                                                        }}
                                                        >
                                                            <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                            <span className="mr-2">{champion.label}</span>
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
                                <p className="text-sm text-muted-foreground">내서폿챔피언</p>
                                <Popover open={championOpen3} onOpenChange={setChampionOpen3}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                            {selectedChampion3 ? (
                                                <>
                                                    <Image alt={selectedChampion3} src={'/championE/' + selectedChampion3 + '.png'} height={20} width={20}></Image>
                                                    {champion.find((champion) => champion.value === selectedChampion3)?.label}
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
                                                        <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                            setSelectedChampion3(champion.value);
                                                            setChampionOpen3(false);
                                                        }}
                                                        >
                                                            <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                            <span className="mr-2">{champion.label}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-muted-foreground">상대서폿챔피언</p>
                                <Popover open={championOpen4} onOpenChange={setChampionOpen4}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                            {selectedChampion4 ? (
                                                <>
                                                    <Image alt={selectedChampion4} src={'/championE/' + selectedChampion4 + '.png'} height={20} width={20}></Image>
                                                    {champion.find((champion) => champion.value === selectedChampion4)?.label}
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
                                                        <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                            setSelectedChampion4(champion.value);
                                                            setChampionOpen4(false);
                                                        }}
                                                        >
                                                            <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                            <span className="mr-2">{champion.label}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>

                ) : null
                }

                {selectedLine == "서폿" ? (
                    <div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-muted-foreground">내서폿챔피언</p>
                                <Popover open={championOpen1} onOpenChange={setChampionOpen1}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                            {selectedChampion1 ? (
                                                <>
                                                    <Image alt={selectedChampion1} src={'/championE/' + selectedChampion1 + '.png'} height={20} width={20}></Image>
                                                    {champion.find((champion) => champion.value === selectedChampion1)?.label}
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
                                                        <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                            setSelectedChampion1(champion.value);
                                                            setChampionOpen1(false);
                                                        }}
                                                        >
                                                            <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                            <span className="mr-2">{champion.label}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-muted-foreground">상대서폿챔피언</p>
                                <Popover open={championOpen2} onOpenChange={setChampionOpen2}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                            {selectedChampion2 ? (
                                                <>
                                                    <Image alt={selectedChampion2} src={'/championE/' + selectedChampion2 + '.png'} height={20} width={20}></Image>
                                                    {champion.find((champion) => champion.value === selectedChampion2)?.label}
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
                                                        <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                            setSelectedChampion2(champion.value);
                                                            setChampionOpen2(false);
                                                        }}
                                                        >
                                                            <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                            <span className="mr-2">{champion.label}</span>
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
                                <p className="text-sm text-muted-foreground">내원딜챔피언</p>
                                <Popover open={championOpen3} onOpenChange={setChampionOpen3}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                            {selectedChampion3 ? (
                                                <>
                                                    <Image alt={selectedChampion3} src={'/championE/' + selectedChampion3 + '.png'} height={20} width={20}></Image>
                                                    {champion.find((champion) => champion.value === selectedChampion3)?.label}
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
                                                        <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                            setSelectedChampion3(champion.value);
                                                            setChampionOpen3(false);
                                                        }}
                                                        >
                                                            <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                            <span className="mr-2">{champion.label}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-muted-foreground">상대원딜챔피언</p>
                                <Popover open={championOpen4} onOpenChange={setChampionOpen4}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                            {selectedChampion4 ? (
                                                <>
                                                    <Image alt={selectedChampion4} src={'/championE/' + selectedChampion4 + '.png'} height={20} width={20}></Image>
                                                    {champion.find((champion) => champion.value === selectedChampion4)?.label}
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
                                                        <CommandItem key={champion.label} value={champion.label} onSelect={() => {
                                                            setSelectedChampion4(champion.value);
                                                            setChampionOpen4(false);
                                                        }}
                                                        >
                                                            <Image alt={champion.value} src={champion.img} height={20} width={20}></Image>
                                                            <span className="mr-2">{champion.label}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>

                ) : null
                }

                <Label className="char3">6전 (쉬움)1-5(어려움)
                    <Input value={before6} name="before6" readOnly /> {/* disabled 대신 readOnly 사용 */}
                    <Slider onValueChange={handleBefore6Change} value={[before6]} max={5} min={1} step={1} />
                </Label>
                <Label className="char3">6후 (쉬움)1-5(어려움)
                    <Input value={after6} name="after6" readOnly /> {/* disabled 대신 readOnly 사용 */}
                    <Slider onValueChange={handleAfter6Change} value={[after6]} max={5} min={1} step={1} />
                </Label>
                <Label className="char3">후반 (쉬움)1-5(어려움)
                    <Input value={half} name="half" readOnly /> {/* disabled 대신 readOnly 사용 */}
                    <Slider onValueChange={handleHalfChange} value={[half]} max={5} min={1} step={1} />
                </Label>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">내Rune</p>
                    <Popover open={runeOpen1} onOpenChange={setRuneOpen1}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedRune1 ? (
                                    <>
                                        <Image alt={selectedRune1} src={'/runeE/' + selectedRune1 + '/' + selectedRune1 + '.png'} height={20} width={20}></Image>
                                        {rune.find((rune) => rune.value === selectedRune1)?.label}
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
                                        {rune.map((rune) => (
                                            <CommandItem key={rune.label} value={rune.label} onSelect={() => {
                                                setSelectedRune1(rune.value);
                                                setRuneOpen1(false);
                                            }}
                                            >
                                                <Image alt={rune.value} src={rune.img} height={20} width={20}></Image>
                                                <span className="mr-2">{rune.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">상대Rune</p>
                    <Popover open={runeOpen2} onOpenChange={setRuneOpen2}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedRune2 ? (
                                    <>
                                        <Image alt={selectedRune2} src={'/runeE/' + selectedRune2 + '/' + selectedRune2 + '.png'} height={20} width={20}></Image>
                                        {rune.find((rune) => rune.value === selectedRune2)?.label}
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
                                        {rune.map((rune) => (
                                            <CommandItem key={rune.label} value={rune.label} onSelect={() => {
                                                setSelectedRune2(rune.value);
                                                setRuneOpen2(false);
                                            }}
                                            >
                                                <Image alt={rune.value} src={rune.img} height={20} width={20}></Image>
                                                <span className="mr-2">{rune.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">내Spell-1</p>
                    <Popover open={spellOpen1} onOpenChange={setSpellOpen1}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedSpell1 ? (
                                    <>
                                        <Image alt={selectedSpell1} src={'/spellE/' + selectedSpell1 + '.png'} height={20} width={20}></Image>
                                        {spell.find((spell) => spell.value === selectedSpell1)?.label}
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
                                        {spell.map((spell) => (
                                            <CommandItem key={spell.label} value={spell.label} onSelect={() => {
                                                setSelectedSpell1(spell.value);
                                                setSpellOpen1(false);
                                            }}
                                            >
                                                <Image alt={spell.value} src={spell.img} height={20} width={20}></Image>
                                                <span className="mr-2">{spell.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">내Spell-2</p>
                    <Popover open={spellOpen2} onOpenChange={setSpellOpen2}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedSpell2 ? (
                                    <>
                                        <Image alt={selectedSpell2} src={'/spellE/' + selectedSpell2 + '.png'} height={20} width={20}></Image>
                                        {spell.find((spell) => spell.value === selectedSpell2)?.label}
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
                                        {spell.map((spell) => (
                                            <CommandItem
                                                key={spell.label}
                                                value={spell.label}
                                                onSelect={() => {
                                                    setSelectedSpell2(spell.value);
                                                    setSpellOpen2(false);
                                                }}
                                            >
                                                <Image alt={spell.value} src={spell.img} height={20} width={20}></Image>
                                                <span className="mr-2">{spell.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">상대Spell-1</p>
                    <Popover open={spellOpen3} onOpenChange={setSpellOpen3}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedSpell3 ? (
                                    <>
                                        <Image alt={selectedSpell3} src={'/spellE/' + selectedSpell3 + '.png'} height={20} width={20}></Image>
                                        {spell.find((spell) => spell.value === selectedSpell3)?.label}
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
                                        {spell.map((spell) => (
                                            <CommandItem key={spell.label} value={spell.label} onSelect={() => {
                                                setSelectedSpell3(spell.value);
                                                setSpellOpen3(false);
                                            }}
                                            >
                                                <Image alt={spell.value} src={spell.img} height={20} width={20}></Image>
                                                <span className="mr-2">{spell.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">상대Spell-2</p>
                    <Popover open={spellOpen4} onOpenChange={setSpellOpen4}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedSpell4 ? (
                                    <>
                                        <Image alt={selectedSpell4} src={'/spellE/' + selectedSpell4 + '.png'} height={20} width={20}></Image>
                                        {spell.find((spell) => spell.value === selectedSpell4)?.label}
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
                                        {spell.map((spell) => (
                                            <CommandItem key={spell.label} value={spell.label} onSelect={() => {
                                                setSelectedSpell4(spell.value);
                                                setSpellOpen4(false);
                                            }}
                                            >
                                                <Image alt={spell.value} src={spell.img} height={20} width={20}></Image>
                                                <span className="mr-2">{spell.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                {selectedLine == "정글" ? (
                    <div className="flex items-center gap-4">
                        <Label className="char3">오브젝트<Input name="objectJ" placeholder="오브젝트"></Input></Label>
                    </div>
                ) : null
                }

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">첫템</p>
                    <Popover open={firstItemOpen} onOpenChange={setFirstItemOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedFirstItem ? (
                                    <>
                                        <Image alt={selectedFirstItem} src={'/firstItemK/' + selectedFirstItem + '.png'} height={20} width={20}></Image>
                                        {firstItem.find((firstItem) => firstItem.label === selectedFirstItem)?.label}
                                    </>
                                ) : (
                                    <>+ Set firstItem</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change firstItem..." />
                                <CommandList>
                                    <CommandEmpty>No firstItem found.</CommandEmpty>
                                    <CommandGroup>
                                        {firstItem.map((firstItem) => (
                                            <CommandItem key={firstItem.label} value={firstItem.label} onSelect={() => {
                                                setSelectedFirstItem(firstItem.label);
                                                setFirstItemOpen(false);
                                            }}
                                            >
                                                <Image alt={firstItem.label} src={firstItem.img} height={20} width={20}></Image>
                                                <span className="mr-2">{firstItem.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">전설템1</p>
                    <Popover open={legendaryItemOpen1} onOpenChange={setLegendaryItemOpen1}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedLegendaryItem1 ? (
                                    <>
                                        <Image alt={selectedLegendaryItem1} src={'/legendaryItemK/' + selectedLegendaryItem1 + '.png'} height={20} width={20}></Image>
                                        {legendaryItem.find((legendaryItem) => legendaryItem.label === selectedLegendaryItem1)?.label}
                                    </>
                                ) : (
                                    <>+ Set legendaryItem</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change legendaryItem..." />
                                <CommandList>
                                    <CommandEmpty>No legendaryItem found.</CommandEmpty>
                                    <CommandGroup>
                                        {legendaryItem.map((legendaryItem) => (
                                            <CommandItem key={legendaryItem.label} value={legendaryItem.label} onSelect={() => {
                                                setSelectedLegendaryItem1(legendaryItem.label);
                                                setLegendaryItemOpen1(false);
                                            }}
                                            >
                                                <Image alt={legendaryItem.label} src={legendaryItem.img} height={20} width={20}></Image>
                                                <span className="mr-2">{legendaryItem.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">전설템2</p>
                    <Popover open={legendaryItemOpen2} onOpenChange={setLegendaryItemOpen2}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedLegendaryItem2 ? (
                                    <>
                                        <Image alt={selectedLegendaryItem2} src={'/legendaryItemK/' + selectedLegendaryItem2 + '.png'} height={20} width={20}></Image>
                                        {legendaryItem.find((legendaryItem) => legendaryItem.label === selectedLegendaryItem2)?.label}
                                    </>
                                ) : (
                                    <>+ Set legendaryItem</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change legendaryItem..." />
                                <CommandList>
                                    <CommandEmpty>No legendaryItem found.</CommandEmpty>
                                    <CommandGroup>
                                        {legendaryItem.map((legendaryItem) => (
                                            <CommandItem key={legendaryItem.label} value={legendaryItem.label} onSelect={() => {
                                                setSelectedLegendaryItem2(legendaryItem.label);
                                                setLegendaryItemOpen2(false);
                                            }}
                                            >
                                                <Image alt={legendaryItem.label} src={legendaryItem.img} height={20} width={20}></Image>
                                                <span className="mr-2">{legendaryItem.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">전설템3</p>
                    <Popover open={legendaryItemOpen3} onOpenChange={setLegendaryItemOpen3}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedLegendaryItem3 ? (
                                    <>
                                        <Image alt={selectedLegendaryItem3} src={'/legendaryItemK/' + selectedLegendaryItem3 + '.png'} height={20} width={20}></Image>
                                        {legendaryItem.find((legendaryItem) => legendaryItem.label === selectedLegendaryItem3)?.label}
                                    </>
                                ) : (
                                    <>+ Set legendaryItem</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change legendaryItem..." />
                                <CommandList>
                                    <CommandEmpty>No legendaryItem found.</CommandEmpty>
                                    <CommandGroup>
                                        {legendaryItem.map((legendaryItem) => (
                                            <CommandItem key={legendaryItem.label} value={legendaryItem.label} onSelect={() => {
                                                setSelectedLegendaryItem3(legendaryItem.label);
                                                setLegendaryItemOpen3(false);
                                            }}
                                            >
                                                <Image alt={legendaryItem.label} src={legendaryItem.img} height={20} width={20}></Image>
                                                <span className="mr-2">{legendaryItem.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">전설템4</p>
                    <Popover open={legendaryItemOpen4} onOpenChange={setLegendaryItemOpen4}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedLegendaryItem4 ? (
                                    <>
                                        <Image alt={selectedLegendaryItem4} src={'/legendaryItemK/' + selectedLegendaryItem4 + '.png'} height={20} width={20}></Image>
                                        {legendaryItem.find((legendaryItem) => legendaryItem.label === selectedLegendaryItem4)?.label}
                                    </>
                                ) : (
                                    <>+ Set legendaryItem</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change legendaryItem..." />
                                <CommandList>
                                    <CommandEmpty>No legendaryItem found.</CommandEmpty>
                                    <CommandGroup>
                                        {legendaryItem.map((legendaryItem) => (
                                            <CommandItem key={legendaryItem.label} value={legendaryItem.label} onSelect={() => {
                                                setSelectedLegendaryItem4(legendaryItem.label);
                                                setLegendaryItemOpen4(false);
                                            }}
                                            >
                                                <Image alt={legendaryItem.label} src={legendaryItem.img} height={20} width={20}></Image>
                                                <span className="mr-2">{legendaryItem.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">전설템5</p>
                    <Popover open={legendaryItemOpen5} onOpenChange={setLegendaryItemOpen5}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedLegendaryItem5 ? (
                                    <>
                                        <Image alt={selectedLegendaryItem5} src={'/legendaryItemK/' + selectedLegendaryItem5 + '.png'} height={20} width={20}></Image>
                                        {legendaryItem.find((legendaryItem) => legendaryItem.label === selectedLegendaryItem5)?.label}
                                    </>
                                ) : (
                                    <>+ Set legendaryItem</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change legendaryItem..." />
                                <CommandList>
                                    <CommandEmpty>No legendaryItem found.</CommandEmpty>
                                    <CommandGroup>
                                        {legendaryItem.map((legendaryItem) => (
                                            <CommandItem key={legendaryItem.label} value={legendaryItem.label} onSelect={() => {
                                                setSelectedLegendaryItem5(legendaryItem.label);
                                                setLegendaryItemOpen5(false);
                                            }}
                                            >
                                                <Image alt={legendaryItem.label} src={legendaryItem.img} height={20} width={20}></Image>
                                                <span className="mr-2">{legendaryItem.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">전설템6</p>
                    <Popover open={legendaryItemOpen6} onOpenChange={setLegendaryItemOpen6}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {selectedLegendaryItem6 ? (
                                    <>
                                        <Image alt={selectedLegendaryItem6} src={'/legendaryItemK/' + selectedLegendaryItem6 + '.png'} height={20} width={20}></Image>
                                        {legendaryItem.find((legendaryItem) => legendaryItem.label === selectedLegendaryItem6)?.label}
                                    </>
                                ) : (
                                    <>+ Set legendaryItem</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change legendaryItem..." />
                                <CommandList>
                                    <CommandEmpty>No legendaryItem found.</CommandEmpty>
                                    <CommandGroup>
                                        {legendaryItem.map((legendaryItem) => (
                                            <CommandItem key={legendaryItem.label} value={legendaryItem.label} onSelect={() => {
                                                setSelectedLegendaryItem6(legendaryItem.label);
                                                setLegendaryItemOpen6(false);
                                            }}
                                            >
                                                <Image alt={legendaryItem.label} src={legendaryItem.img} height={20} width={20}></Image>
                                                <span className="mr-2">{legendaryItem.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm text-muted-foreground">신발템6</p>
                    <Popover open={shoesItemOpen4} onOpenChange={setShoesItemOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {SelectedShoesItem ? (
                                    <>
                                        <Image alt={SelectedShoesItem} src={'/ShoesItemK/' + SelectedShoesItem + '.png'} height={20} width={20}></Image>
                                        {shoesItem.find((shoesItem) => shoesItem.label === SelectedShoesItem)?.label}
                                    </>
                                ) : (
                                    <>+ Set shoesItem</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change shoesItem..." />
                                <CommandList>
                                    <CommandEmpty>No shoesItem found.</CommandEmpty>
                                    <CommandGroup>
                                        {shoesItem.map((shoesItem) => (
                                            <CommandItem key={shoesItem.label} value={shoesItem.label} onSelect={() => {
                                                setSelectedShoesItem(shoesItem.label);
                                                setShoesItemOpen(false);
                                            }}
                                            >
                                                <Image alt={shoesItem.label} src={shoesItem.img} height={20} width={20}></Image>
                                                <span className="mr-2">{shoesItem.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <RadioGroup value={lineResult} onValueChange={(value) => setLineResult(value)} className="flex items-center">
                    라인전:
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="win" id="win" />
                        <Label htmlFor="win">승리</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lose" id="lose" />
                        <Label htmlFor="lose">패배</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="half" id="half" />
                        <Label htmlFor="half">반반</Label>
                    </div>
                </RadioGroup>
                <RadioGroup value={gameResult} onValueChange={(value) => setGameResult(value)} className="flex items-center">
                    결과:   
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="win" id="win" />
                        <Label htmlFor="win">승리</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lose" id="lose" />
                        <Label htmlFor="lose">패배</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="half" id="half" />
                        <Label htmlFor="half">반반</Label>
                    </div>
                </RadioGroup>

                <Label className="char3">한줄평<Input name="review" placeholder="한줄평"></Input></Label>
                <Label className="char3"><Input style={{ display: 'none' }} name="date" defaultValue={currentDate}></Input></Label>
                <Button type="submit">전송하기</Button>
            </form>
        </div >
    )
}
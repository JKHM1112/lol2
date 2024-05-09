import { Button } from "@/components/ui/button";
import { getFirstItems } from "@/components/firstItems";
import { getItems } from "@/components/Items";
import { getShoesItems } from "@/components/shoesItems";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";

export default function Items() {

    const firstItems = getFirstItems();
    const shoesItems = getShoesItems();
    const itemData = getItems();
    
    const firstItem = firstItems.map((firstItems) => ({
        label: firstItems.label,
        img: '/FirstItemK/' + firstItems.label + '.png'
    }));
    const shoesItem = shoesItems.map((shoesItem) => ({
        label: shoesItem.label,
        img: '/ShoesItemK/' + shoesItem.label + '.png'
    }));

    const [firstItemOpen, setFirstItemOpen] = useState(false);
    const [shoesItemOpen, setShoesItemOpen] = useState(false);
    const [itemOpen, setItemOpen] = useState(Array(7).fill(false));

    const handleItemOpen = (index: number, isOpen: boolean) => {
        const updatedItemOpen = [...itemOpen]
        updatedItemOpen[index] = isOpen
        setItemOpen(updatedItemOpen)
    }

    const [selectedFirstItem, setSelectedFirstItem] = useState('');
    const [SelectedShoesItem, setSelectedShoesItem] = useState('');

    const { items, setItems } = useUserStore();
    const findItemNameK = (nameN: number): string => {
        const item = itemData.find(item => item.nameN === nameN);
        return item ? item.nameK : '';
    }
    
    return (
        <div>
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
                <p className="text-sm text-muted-foreground">신발템</p>
                <Popover open={shoesItemOpen} onOpenChange={setShoesItemOpen}>
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

            {items.map((selectedItem, i) => (
                <div className="flex items-center space-x-4" key={i}>
                    <p className="text-sm text-muted-foreground">템{i + 1}</p>
                    <Popover open={itemOpen[i]} onOpenChange={(value) => handleItemOpen(i, value)}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[150px] justify-start">
                                {items[i] && findItemNameK(items[i]) ? (
                                    <>
                                        <Image alt={findItemNameK(items[i])} src={'/itemN/' + items[i] + '.png'} height={20} width={20}></Image>
                                        {findItemNameK(items[i])}
                                    </>
                                ) : (
                                    <>+ Set item</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Change item..." />
                                <CommandList>
                                    <CommandEmpty>No item found.</CommandEmpty>
                                    <CommandGroup>
                                        {itemData.map((item, j) => (
                                            <CommandItem key={j} value={item.nameK} onSelect={() => {
                                                setItems(i, item.nameN);
                                                handleItemOpen(i, false);
                                            }}
                                            >
                                                <Image alt={item.nameK} src={'/itemN/' + item.nameN + '.png'} height={20} width={20}></Image>
                                                <span className="mr-2">{item.nameK}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            ))
            }


            <input style={{ display: 'none' }} name="firstItem" defaultValue={selectedFirstItem} />
            <input style={{ display: 'none' }} name="shoesItem" defaultValue={SelectedShoesItem} />
            <input style={{ display: 'none' }} name="legendaryItem0" defaultValue={items[0]} />
            <input style={{ display: 'none' }} name="legendaryItem1" defaultValue={items[1]} />
            <input style={{ display: 'none' }} name="legendaryItem2" defaultValue={items[2]} />
            <input style={{ display: 'none' }} name="legendaryItem3" defaultValue={items[3]} />
            <input style={{ display: 'none' }} name="legendaryItem4" defaultValue={items[4]} />
            <input style={{ display: 'none' }} name="legendaryItem5" defaultValue={items[5]} />
            <input style={{ display: 'none' }} name="legendaryItem6" defaultValue={items[6]} />
        </div>
    )
}
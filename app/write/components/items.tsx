import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";
import { item } from "@/app/data/item";

export default function Items() {

    const itemData = item
    const itemsList = Object.entries(itemData.data).map(([id, item]) => ({
        id,
        nameK: item.name,
        img: '/item/' + item.image.full
    }));

    const { items, setItems } = useUserStore();
    const [itemOpen, setItemOpen] = useState(Array(7).fill(false));

    const handleItemOpen = (index: number, isOpen: boolean) => {
        const updatedItemOpen = [...itemOpen]
        updatedItemOpen[index] = isOpen
        setItemOpen(updatedItemOpen)
    }

    const findItemNameNK = (id: number) => {
        const item = itemsList.find((item: any) => item.id === id.toString());
        return item ? item.nameK : '';
    }
    const findItemImage = (id: number) => {
        const item = itemsList.find(item => item.id === id.toString());
        return item ? item.img : '';
    };
    return (
        <div>
            {items.map((selectedItem, i) => (
                <div className="flex items-center space-x-4" key={i}>
                    <Popover open={itemOpen[i]} onOpenChange={(value) => handleItemOpen(i, value)}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[140px] justify-start">
                                {items[i] && findItemNameNK(items[i]) ? (
                                    <>
                                        <Image alt={findItemNameNK(items[i])} src={findItemImage(items[i])} height={20} width={20}></Image>
                                        {findItemNameNK(items[i])}
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
                                        {itemsList.map((item: any, j: number) => (
                                            <CommandItem key={j} value={item.nameK} onSelect={() => {
                                                setItems(i, item.id);
                                                handleItemOpen(i, false);
                                            }}
                                            >
                                                <Image alt={item.nameK} src={item.img} height={20} width={20}></Image>
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

            <input style={{ display: 'none' }} name="items" value={JSON.stringify(items)} readOnly />

        </div>
    )
}
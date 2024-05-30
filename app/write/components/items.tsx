import { Button } from "@/components/ui/button";
import { getItems } from "@/components/Items";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";

export default function Items() {
    const { items, setItems } = useUserStore();

    const itemData = getItems();

    const [itemOpen, setItemOpen] = useState(Array(7).fill(false));

    const handleItemOpen = (index: number, isOpen: boolean) => {
        const updatedItemOpen = [...itemOpen]
        updatedItemOpen[index] = isOpen
        setItemOpen(updatedItemOpen)
    }

    const findItemNameK = (nameN: number): string => {
        const item = itemData.find(item => item.nameN === nameN);
        return item ? item.nameK : '';
    }

    return (
        <div>
            {items.map((selectedItem, i) => (
                <div className="flex items-center space-x-4" key={i}>
                    <Popover open={itemOpen[i]} onOpenChange={(value) => handleItemOpen(i, value)}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[140px] justify-start">
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

            <input style={{ display: 'none' }} name="items" value={JSON.stringify(items)} readOnly />

        </div>
    )
}
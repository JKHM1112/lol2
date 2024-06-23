import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";
import { item } from "@/app/data/item";

export default function Items() {

    const itemData = item;
    const itemsList = Object.entries(itemData.data).map(([id, item]) => ({
        id,
        nameK: item.name,
        img: '/item/' + item.image.full
    }));

    const { items, setItems } = useUserStore();
    const [itemOpen, setItemOpen] = useState(Array(14).fill(false));

    const handleItemOpen = (index: number, isOpen: boolean) => {
        const updatedItemOpen = [...itemOpen];
        updatedItemOpen[index] = isOpen;
        setItemOpen(updatedItemOpen);
    };

    const findItemNameNK = (id: number) => {
        const item = itemsList.find((item: any) => item.id === id.toString());
        return item ? item.nameK : '';
    };

    const findItemImage = (id: number) => {
        const item = itemsList.find(item => item.id === id.toString());
        return item ? item.img : '';
    };

    const renderItems = (startIndex: number, endIndex: number) => {
        return (
            <div>
                {items.slice(startIndex, endIndex).map((selectedItem, i) => (
                    <div className="flex items-center space-x-4" key={i + startIndex}>
                        <Popover open={itemOpen[i + startIndex]} onOpenChange={(value) => handleItemOpen(i + startIndex, value)}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="w-[140px] justify-start">
                                    {items[i + startIndex] && findItemNameNK(items[i + startIndex]) ? (
                                        <>
                                            <Image alt={findItemNameNK(items[i + startIndex])} src={findItemImage(items[i + startIndex])} height={20} width={20}></Image>
                                            {findItemNameNK(items[i + startIndex])}
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
                                                    setItems(i + startIndex, item.id);
                                                    handleItemOpen(i + startIndex, false);
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
                ))}
            </div>
        );
    };

    return (
        <div className="flex">
            <div>
                <h2>Items Set 1</h2>
                {renderItems(0, 7)}
            </div>
            <div>
                <h2>Items Set 2</h2>
                {renderItems(7, 14)}
            </div>
            <input style={{ display: 'none' }} name="items" value={JSON.stringify(items)} readOnly />
        </div>
    );
}

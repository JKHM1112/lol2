import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/hooks/useUserStore";
import { item } from "@/app/data/item";

export default function Items({ dataActiveTab }: any) {
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
            <div className="grid grid-cols-1 gap-2 m-2">
                {items.slice(startIndex, endIndex).map((selectedItem, i) => (
                    <div className="flex items-center space-x-4" key={i + startIndex}>
                        <Popover open={itemOpen[i + startIndex]} onOpenChange={(value) => handleItemOpen(i + startIndex, value)}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                    {items[i + startIndex] && findItemNameNK(items[i + startIndex]) ? (
                                        <>
                                            <Image alt={findItemNameNK(items[i + startIndex])} src={findItemImage(items[i + startIndex])} height={25} width={25} className="rounded" />
                                            <span className="ml-2">{findItemNameNK(items[i + startIndex])}</span>
                                        </>
                                    ) : (
                                        <>아이템 선택</>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" side="right" align="start">
                                <Command>
                                    <CommandInput placeholder="아이템 검색..." />
                                    <CommandList>
                                        <CommandEmpty>아이템을 찾을 수 없습니다.</CommandEmpty>
                                        <CommandGroup>
                                            {itemsList.map((item: any, j: number) => (
                                                <CommandItem key={j} value={item.nameK} onSelect={() => {
                                                    setItems(i + startIndex, item.id);
                                                    handleItemOpen(i + startIndex, false);
                                                }}>
                                                    <Image alt={item.nameK} src={item.img} height={20} width={20} className="rounded" />
                                                    <span className="ml-2">{item.nameK}</span>
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
                {dataActiveTab == "MyData" && renderItems(0, 7)}
            </div>
            <div>
                {dataActiveTab == "YourData" && renderItems(7, 14)}
            </div>
        </div>
    );
}

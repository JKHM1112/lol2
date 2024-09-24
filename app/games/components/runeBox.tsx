import { runesReforged } from "@/app/data/runesReforged"
import { runesStatus } from "@/app/data/runesStatus"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"

export default function RuneBox({ gameData, i }: any) {

    const teamData = gameData[i]
    const perkStyle = teamData.perks.styles.find((style: any) => style.description === "primaryStyle")?.style
    const perkSubStyle = teamData.perks.styles.find((style: any) => style.description === "subStyle")?.style

    const extractPerks = (perks: any) => {
        const stylesPerks = perks.styles.flatMap((style: any) => style.selections.map((selection: any) => selection.perk));
        const statPerks = Object.values(perks.statPerks);
        return [...stylesPerks, ...statPerks];
    };
    const perkIds = extractPerks(teamData.perks)
    
    const perkStyle1 = runesReforged.find(perkStyles => perkStyles.id === perkStyle)?.slots[0].runes
    const perkStyle2 = runesReforged.find(perkStyles => perkStyles.id === perkStyle)?.slots[1].runes
    const perkStyle3 = runesReforged.find(perkStyles => perkStyles.id === perkStyle)?.slots[2].runes
    const perkStyle4 = runesReforged.find(perkStyles => perkStyles.id === perkStyle)?.slots[3].runes

    const perkSubStyle2 = runesReforged.find(perkSubStyles => perkSubStyles.id === perkSubStyle)?.slots[1].runes
    const perkSubStyle3 = runesReforged.find(perkSubStyles => perkSubStyles.id === perkSubStyle)?.slots[2].runes
    const perkSubStyle4 = runesReforged.find(perkSubStyles => perkSubStyles.id === perkSubStyle)?.slots[3].runes

    const perkStatus1 = runesStatus[0].runes
    const perkStatus2 = runesStatus[1].runes
    const perkStatus3 = runesStatus[2].runes

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">세부 룬</Button>
                </PopoverTrigger>
                <PopoverContent className="flex justify-between">
                    <div>
                        <div className="flex justify-center h-6">
                            <Image src={'/' + runesReforged.find(perkStyles => perkStyles.id === perkStyle)?.icon || ''} alt="mainrune" height={30} width={30}></Image>
                        </div>
                        <div className="flex justify-between h-6">
                            {perkStyle1?.map(rune => (
                                <Image key={rune.id} className={perkIds.includes(rune.id) ? '' : 'grayscale brightness-1'} src={'/' + rune.icon} alt="1" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-between h-6">
                            {perkStyle2?.map(rune => (
                                <Image key={rune.id} className={perkIds.includes(rune.id) ? '' : 'grayscale brightness-1'} src={'/' + rune.icon} alt="1" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-between h-6">
                            {perkStyle3?.map(rune => (
                                <Image key={rune.id} className={perkIds.includes(rune.id) ? '' : 'grayscale brightness-1'} src={'/' + rune.icon} alt="1" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-between h-6">
                            {perkStyle4?.map(rune => (
                                <Image key={rune.id} className={perkIds.includes(rune.id) ? '' : 'grayscale brightness-1'} src={'/' + rune.icon} alt="1" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-center h-6">
                            <div>메인</div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center h-6"></div>
                        <div className="flex justify-center h-6">
                            <Image src={'/' + runesReforged.find(perkSubStyles => perkSubStyles.id === perkSubStyle)?.icon || ''} alt="mainrune" height={30} width={30}></Image>
                        </div>
                        <div className="flex justify-between h-6">
                            {perkSubStyle2?.map(rune => (
                                <Image key={rune.id} className={perkIds.includes(rune.id) ? '' : 'grayscale brightness-1'} src={'/' + rune.icon} alt="1" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-between h-6">
                            {perkSubStyle3?.map(rune => (
                                <Image key={rune.id} className={perkIds.includes(rune.id) ? '' : 'grayscale brightness-1'} src={'/' + rune.icon} alt="1" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-between h-6">
                            {perkSubStyle4?.map(rune => (
                                <Image key={rune.id} className={perkIds.includes(rune.id) ? '' : 'grayscale brightness-1'} src={'/' + rune.icon} alt="1" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-center h-6">
                            <div>서브</div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center h-6"></div>
                        <div className="flex justify-center h-6"></div>
                        <div className="flex justify-between h-6">
                            {perkStatus1.map(rune => (
                                <Image key={rune.id} className={perkIds[8] === rune.id ? '' : 'grayscale brightness-1'} src={rune.icon} alt="mainrune" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-between h-6">
                            {perkStatus2.map(rune => (
                                <Image key={rune.id} className={perkIds[7] === rune.id ? '' : 'grayscale brightness-1'} src={rune.icon} alt="mainrune" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-between h-6">
                            {perkStatus3.map(rune => (
                                <Image key={rune.id} className={perkIds[6] === rune.id ? '' : 'grayscale brightness-1'} src={rune.icon} alt="mainrune" height={30} width={30}></Image>
                            ))}
                        </div>
                        <div className="flex justify-center h-6">
                            <div>파편</div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

import { runesReforged } from "@/app/data/runesReforged";
import { runesStatus } from "@/app/data/runesStatus";
import Image from "next/image";

export default function RuneBox({ runes }: any) {
    const mainRunes = runes.slice(0, 4);
    const subRunes = runes.slice(4, 6);
    const shardRunes = runes.slice(6, 9);

    const primaryStyle = runesReforged.find(style => style.slots.some(slot => slot.runes.some(rune => mainRunes.includes(rune.id))));
    const secondaryStyle = runesReforged.find(style => style.slots.some(slot => slot.runes.some(rune => subRunes.includes(rune.id))));

    const renderRunes = (runes: any[], selectedRunes: number[]) => (
        runes.map(rune => (
            <Image key={rune.id} className={selectedRunes.includes(rune.id) ? '' : 'grayscale'} src={'/' + rune.icon} alt="rune" height={30} width={30} />
        ))
    );

    return (
        <div className="flex justify-between">
            <div>
                <div className="flex justify-center h-6">
                    <Image src={'/' + (primaryStyle?.icon || '')} alt="mainrune" height={30} width={30} />
                </div>
                {primaryStyle?.slots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex justify-between h-6">
                        {renderRunes(slot.runes, mainRunes)}
                    </div>
                ))}
                <div className="flex justify-center h-6">
                    <div>메인</div>
                </div>
            </div>
            <div>
                <div className="flex justify-center h-6"></div>
                <div className="flex justify-center h-6">
                    <Image src={'/' + (secondaryStyle?.icon || '')} alt="subrune" height={30} width={30} />
                </div>
                {secondaryStyle?.slots.slice(1).map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex justify-between h-6">
                        {renderRunes(slot.runes, subRunes)}
                    </div>
                ))}
                <div className="flex justify-center h-6">
                    <div>서브</div>
                </div>
            </div>
            <div>
                <div className="flex justify-center h-6"></div>
                <div className="flex justify-center h-6"></div>
                <div className="flex justify-between h-6">
                    {runesStatus[0].runes.map(rune => (
                        <Image key={rune.id} className={shardRunes[0] === rune.id ? '' : 'grayscale brightness-0.1'} src={rune.icon} alt="shardrune" height={30} width={30} />
                    ))}
                </div>
                <div className="flex justify-between h-6">
                    {runesStatus[1].runes.map(rune => (
                        <Image key={rune.id} className={shardRunes[1] === rune.id ? '' : 'grayscale brightness-0.1'} src={rune.icon} alt="shardrune" height={30} width={30} />
                    ))}
                </div>
                <div className="flex justify-between h-6">
                    {runesStatus[2].runes.map(rune => (
                        <Image key={rune.id} className={shardRunes[2] === rune.id ? '' : 'grayscale brightness-0.1'} src={rune.icon} alt="shardrune" height={30} width={30} />
                    ))}
                </div>
                <div className="flex justify-center h-6">
                    <div>파편</div>
                </div>
            </div>
        </div>
    );
}

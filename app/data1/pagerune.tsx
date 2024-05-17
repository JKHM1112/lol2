import { runesReforgedOld } from "../data/runesReforgedOld";

const itemNumber = runesReforgedOld.flatMap(rune => rune.slots.flatMap(slot => slot.runes.map(rune => rune.id)))
const itemEName = runesReforgedOld.flatMap(rune => rune.slots.flatMap(slot => slot.runes.map(rune => rune.name)))
const itemKName = runesReforgedOld.flatMap(rune => rune.slots.flatMap(slot => slot.runes.map(rune => rune.key)))
const itemImg = runesReforgedOld.flatMap(rune => rune.slots.flatMap(slot => slot.runes.map(rune => rune.icon)))

const runes = itemNumber.map((number1, index) => ({
    nameN: number1,
    nameE: itemEName[index],
    nameK: itemKName[index],
    nameImg: itemImg[index]
}));

export default function data1() {
    return (
        <div>

        </div>
    )
}
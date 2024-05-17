import { items } from "../data/item";

const itemNumber = Object.keys(items.data)

const itemKName= Object.values(items.data).map(nameK=>nameK.name)

const runes = itemNumber.map((number, index) => ({
    nameN: number,
    nameK: itemKName[index],
}));

export default function data1() {
    return (
        <div>

        </div>
    )
}
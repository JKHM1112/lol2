import { create } from "zustand";
import { initialParticipant } from "../write/components/participants";

interface UserStoreState {
    participants: any[]
    setParticipants: (participants: any[]) => void
    selectedGame: number
    setSelectedGame: (index: number) => void
    spells: number[]
    setSpells: (index: number, spellCode: number) => void
    items: number[]
    setItems: (index: number, itemCode: number) => void
    runes: number[]
    setRunes: (index: number, runeCode: number) => void
    puuid: string
    setPuuid: (puuid: string) => void
}
const useUserStore = create<UserStoreState>((set, get) => ({
    participants: [initialParticipant],
    setParticipants: (participants) => {
        set({ participants })
    },
    selectedGame: 0,
    setSelectedGame: (index) => {
        set({ selectedGame: index })
    },
    spells: Array(4).fill(0),
    setSpells: (index, spellCode) => {
        const updatedSpells = [...get().spells]
        updatedSpells[index] = spellCode
        set({ spells: updatedSpells })
    },
    items: Array(7).fill(0),
    setItems: (index, itemCode) => {
        const updatedItems = [...get().items]
        updatedItems[index] = itemCode
        set({ items: updatedItems })
    },
    runes: Array(12).fill(0),
    setRunes: (index, runeCode) => {
        const updatedRunes = [...get().runes]
        updatedRunes[index] = runeCode
        set({ runes: updatedRunes })
    },
    puuid: "",
    setPuuid: (puuid) => {
        set({ puuid })
    }
}))

export default useUserStore
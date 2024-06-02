import { create } from "zustand";
import { initialParticipant } from "../write/components/participants";

interface UserStoreState {
    participants: any[]
    setParticipants: (participants: any[]) => void
    champions: string[]
    setChampions: (index: number, champion: string) => void
    lines: string
    setLines: (line: string) => void
    lineResults: string
    setLineResults: (lineResults: string) => void
    gameResults: string
    setGameResults: (gameResults: string) => void
    before: number
    setBefore: (index: number) => void
    after: number
    setAfter: (index: number) => void
    half: number
    setHalf: (index: number) => void
    review: string
    setReview: (review: string) => void
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
    tier: string
    setTier: (tier: string) => void
}
const useUserStore = create<UserStoreState>((set, get) => ({
    participants: [initialParticipant],
    setParticipants: (participants) => {
        set({ participants })
    },
    champions: Array(4).fill(''),
    setChampions: (index, champion) => {
        const updatedChampions = [...get().champions]
        updatedChampions[index] = champion
        set({ champions: updatedChampions })
    },
    lines: "",
    setLines: (lines) => {
        set({ lines })
    },
    lineResults: "",
    setLineResults: (index) => {
        set({ lineResults: index })
    },
    gameResults: "",
    setGameResults: (index) => {
        set({ gameResults: index })
    },
    before: 0,
    setBefore: (index) => {
        set({ before: index })
    },
    after: 0,
    setAfter: (index) => {
        set({ after: index })
    },
    half: 0,
    setHalf: (index) => {
        set({ half: index })
    },
    review: "",
    setReview: (index) => {
        set({ review: index })
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
    },
    tier: "",
    setTier: (tier) => {
        set({ tier })
    },
}))

export default useUserStore
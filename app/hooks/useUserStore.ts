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
    summoners: number[]
    setSummoners: (index: number, summonerCode: number) => void
    items: number[]
    setItems: (index: number, itemCode: number) => void
    runes: number[]
    setRunes: (index: number, runeCode: number) => void
    puuid: string
    setPuuid: (puuid: string) => void
    tier: string
    setTier: (tier: string) => void
    timeLineLevelUp1: any[]
    setTimeLineLevelUp1: (timeLineLevelUp1: any[]) => void
    timeLineLevelUp2: any[]
    setTimeLineLevelUp2: (timeLineLevelUp2: any[]) => void
    timeLineObject1: any[]
    setTimeLineObject1: (timeLineObject1: any[]) => void
    timeLineObject2: any[]
    setTimeLineObject2: (timeLineObject2: any[]) => void
    gameExtracted1: any[]
    setGameExtracted1: (gameExtracted1: any[]) => void
    gameExtracted2: any[]
    setGameExtracted2: (gameExtracted1: any[]) => void
    timeLineKda1: any[]
    setTimeLineKda1: (timeLineKda1: any[]) => void
    timeLineKda2: any[]
    setTimeLineKda2: (timeLineKda2: any[]) => void
    turretPlatesTaken: number[]
    setTurretPlatesTaken: (index: number, turret: number) => void
    visionScore: number[]
    setVisionScore: (index: number, vision: number) => void
    skillOrder: string[]
    setSkillOrder: (skillOrder: string[]) => void
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
    summoners: Array(4).fill(0),
    setSummoners: (index, summonerCode) => {
        const updatedSpells = [...get().summoners]
        updatedSpells[index] = summonerCode
        set({ summoners: updatedSpells })
    },
    items: Array(14).fill(0),
    setItems: (index, itemCode) => {
        const updatedItems = [...get().items]
        updatedItems[index] = itemCode
        set({ items: updatedItems })
    },
    runes: Array(18).fill(0),
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
    timeLineLevelUp1: [],
    setTimeLineLevelUp1: (timeLineLevelUp1) => {
        set({ timeLineLevelUp1 });
    },
    timeLineLevelUp2: [],
    setTimeLineLevelUp2: (timeLineLevelUp2) => {
        set({ timeLineLevelUp2 });
    },
    timeLineObject1: [],
    setTimeLineObject1: (timeLineObject1) => {
        set({ timeLineObject1 });
    },
    timeLineObject2: [],
    setTimeLineObject2: (timeLineObject2) => {
        set({ timeLineObject2 });
    },
    gameExtracted1: [],
    setGameExtracted1: (gameExtracted1) => {
        set({ gameExtracted1 });
    },
    gameExtracted2: [],
    setGameExtracted2: (gameExtracted2) => {
        set({ gameExtracted2 });
    },
    timeLineKda1: [],
    setTimeLineKda1: (timeLineKda1) => {
        set({ timeLineKda1 });
    },
    timeLineKda2: [],
    setTimeLineKda2: (timeLineKda2) => {
        set({ timeLineKda2 });
    },
    turretPlatesTaken: Array(2).fill(0),
    setTurretPlatesTaken: (index, turret) => {
        const updatedturretPlatesTaken = [...get().turretPlatesTaken]
        updatedturretPlatesTaken[index] = turret
        set({ turretPlatesTaken: updatedturretPlatesTaken })
    },
    visionScore: Array(2).fill(0),
    setVisionScore: (index, vision) => {
        const updatedturretPlatesTaken = [...get().visionScore]
        updatedturretPlatesTaken[index] = vision
        set({ visionScore: updatedturretPlatesTaken })
    },
    skillOrder: [],
    setSkillOrder: (skillOrder) => {
        set({ skillOrder });
    },

}))
export default useUserStore
import { runesReforged } from "@/app/data/runesReforged"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import Image from "next/image"
import GameData from "./gameData"
import * as React from "react"

interface Participant {
    puuid: string; lane?: string; championName: string; summonerName: string;
    kills: string; deaths: string; assists: string;
    summoner1Id: number; summoner2Id: number; perks: any;
    item0: number; item1: number; item2: number; item3: number; item4: number; item5: number;
    riotIdTagline: string; totalDamageDealtToChampions: number; totalDamageTaken: number;
}

export default function SearchResults({ participants, puuid }: any) {

    const getItemImg = (itemCode: number) => <Image className='rounded-md' alt={'item1'} src={`/itemN/${itemCode}.png`} width={35} height={35} />
    const getChampionImg = (championCode: string) => <Image className='rounded-md' alt={'champion1'} src={`/championE/${championCode}.png`} width={35} height={35} />
    const getSpellImg = (SpellCode: number) => <Image className='rounded-md' alt={'spell1'} src={`/spellN/${SpellCode}.png`} width={35} height={35} />
    const runeGroups = runesReforged.map((runeGroup: any) => runeGroup.slots)
    const runeGroups2 = runesReforged.map((runeGroup: any) => runeGroup.slots).flat().map((slot: any) => slot.runes)
    const array: any = []

    const getRuneImg = (runeCode: number, line: number) => {
        return array.concat(...runeGroups.map((runeType: any) => runeType[line].runes)).find((rune: any) => rune.id == runeCode).icon
    }
    const getRuneImg2 = (runCode: number) => {
        return array.concat(...runeGroups2.map((runeType: any) => runeType)).find((rune: any) => rune.id == runCode).icon
    }
    const getRuneImg4 = (RuneCode: string) => <Image className='rounded-md' alt={'rune1'} src={`/` + RuneCode} width={35} height={35} />
    // const getRuneImg3 = (runeCode: number) => {
    //     return array.concat(...runesReforged.map((runeType: any) => runeType)).find((rune: any) => rune.id == runeCode).icon
    // }

    return (
        <div>
            <Accordion type="single" collapsible>
                {participants.map((data: any, i: number) => (
                    <AccordionItem value={'item' + i}>
                        <AccordionTrigger>
                            <Table>
                                <TableBody>
                                    <TableRow className="flex items-center gap-1" >
                                        <TableCell>
                                            <div>
                                                {i + 1}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                {data.find((p: Participant) => p.puuid === puuid)?.individualPosition}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                {getChampionImg(data.find((p: Participant) => p.puuid === puuid)?.championName)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {getSpellImg(data.find((p: Participant) => p.puuid === puuid)?.summoner1Id)}
                                                {getSpellImg(data.find((p: Participant) => p.puuid === puuid)?.summoner2Id)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {getRuneImg4(getRuneImg(data.find((p: Participant) => p.puuid === puuid)?.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk, 0))}
                                                {getRuneImg4(getRuneImg(data.find((p: Participant) => p.puuid === puuid)?.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[1].perk, 1))}
                                                {getRuneImg4(getRuneImg(data.find((p: Participant) => p.puuid === puuid)?.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[2].perk, 2))}
                                                {getRuneImg4(getRuneImg(data.find((p: Participant) => p.puuid === puuid)?.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[3].perk, 3))}
                                                {getRuneImg4(getRuneImg2(data.find((p: Participant) => p.puuid === puuid)?.perks.styles.find((style: any) => style.description === "subStyle")?.selections[0].perk))}
                                                {getRuneImg4(getRuneImg2(data.find((p: Participant) => p.puuid === puuid)?.perks.styles.find((style: any) => style.description === "subStyle")?.selections[1].perk))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item0)}
                                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item1)}
                                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item2)}
                                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item3)}
                                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item4)}
                                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item5)}
                                                {getItemImg(data.find((p: Participant) => p.puuid === puuid)?.item6)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                {data.find((p: Participant) => p.puuid === puuid)?.win ? 'win' : 'lose'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <GameData participants={participants} i={i} puuid={puuid} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </AccordionTrigger>
                        <AccordionContent>
                            {participants[i].map((participant: Participant) => (
                                <Table>
                                    <TableBody>
                                        <TableRow className="flex items-center gap-1" >
                                            <TableCell>
                                                <div>
                                                    {getChampionImg(participant.championName)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    {participant.summonerName}{'#'}{participant.riotIdTagline}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    {participant.kills}/
                                                    {participant.deaths}/
                                                    {participant.assists}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="items-center gap-1">
                                                    {participant.totalDamageDealtToChampions}
                                                    {' / '}
                                                    {participant.totalDamageTaken}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {getSpellImg(participant.summoner1Id)}
                                                    {getSpellImg(participant.summoner2Id)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {getRuneImg4(getRuneImg(participant.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[0].perk, 0))}
                                                    {getRuneImg4(getRuneImg(participant.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[1].perk, 1))}
                                                    {getRuneImg4(getRuneImg(participant.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[2].perk, 2))}
                                                    {getRuneImg4(getRuneImg(participant.perks.styles.find((style: any) => style.description === "primaryStyle")?.selections[3].perk, 3))}
                                                    {getRuneImg4(getRuneImg2(participant.perks.styles.find((style: any) => style.description === "subStyle")?.selections[0].perk))}
                                                    {getRuneImg4(getRuneImg2(participant.perks.styles.find((style: any) => style.description === "subStyle")?.selections[1].perk))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {getItemImg(participant.item0)}
                                                    {getItemImg(participant.item1)}
                                                    {getItemImg(participant.item2)}
                                                    {getItemImg(participant.item3)}
                                                    {getItemImg(participant.item4)}
                                                    {getItemImg(participant.item5)}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
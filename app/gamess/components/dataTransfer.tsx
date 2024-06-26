// 'use client'

// import useUserStore from "@/app/hooks/useUserStore";
// import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation";

// interface DataTransferProps {
//     participant: any[]
//     i: number
//     puuid: string
//     tier: string
//     rankResultTimeline: any
//     characterNumber: number
//     skillOrder: []
// }

// export default function DataTransfer({ participant, i, puuid, tier, rankResultTimeline, characterNumber, skillOrder }: DataTransferProps) {
//     const { setLines, setParticipants, setSelectedGame, setItems, setPuuid, setSummoners, setRunes, setChampions, setTier,
//         setTimeLineLevelUp1, setTimeLineLevelUp2, setTimeLineObject1, setTimeLineObject2, setGameExtracted1, setGameExtracted2, setTimeLineKda1, setTimeLineKda2,
//         setTurretPlatesTaken, setVisionScore, setSkillOrder } = useUserStore()
//     const router = useRouter();
//     const participant1 = participant[i].participants.find((participant: any) => participant.puuid === puuid);
//     const participant1Line = participant1.individualPosition;
//     const participant1ParticipantId = participant1.participantId;
//     const participant2 = participant[i].participants.find((p: any) => p.individualPosition === participant1Line && p.puuid !== puuid);
//     let individualPosition = participant1Line;
//     if (individualPosition === 'UTILITY') {
//         individualPosition = 'BOTTOM';
//     } else if (individualPosition === 'BOTTOM') {
//         individualPosition = 'UTILITY';
//     } else {
//         individualPosition = '';
//     }


//     const getEventsByParticipantId = (timeline: any, participantId: any) => {
//         let allEvents: any = [];
//         for (const frame of timeline.info.frames) {
//             const events = frame.events || [];
//             allEvents = allEvents.concat(events.filter((event: any) => event.participantId === participantId || event.killerId === participantId || event.victimId === participantId || (event.assistingParticipantIds && event.assistingParticipantIds.includes(participantId))));
//         }
//         return allEvents;
//     }

//     const getParticipantFramesByParticipantId = (timeline: any, participantId: any) => {
//         let allParticipantFrames: any = [];
//         for (const frame of timeline.info.frames) {
//             const participantFrames = frame.participantFrames;
//             if (participantFrames[participantId]) {
//                 allParticipantFrames.push(participantFrames[participantId]);
//             }
//         }
//         return allParticipantFrames;
//     }

//     let characterNumber2 = 0;
//     if (characterNumber > 5) {
//         characterNumber2 = characterNumber - 5;
//     } else {
//         characterNumber2 = characterNumber + 5;
//     }

//     const participantsTimeLine1 = getEventsByParticipantId(rankResultTimeline, characterNumber);// 검색된 소환사의 게임 타임라인2
//     const participantsTimeLine2 = getEventsByParticipantId(rankResultTimeline, characterNumber2);// 검색된 소환사의 게임 상대방 타임라인2
//     const gameTimeline1 = getParticipantFramesByParticipantId(rankResultTimeline, characterNumber);//0분 부터 해서 1분 단위로 기록3
//     const gameTimeline2 = getParticipantFramesByParticipantId(rankResultTimeline, characterNumber2);//0분 부터 해서 1분 단위로 기록3

//     const filterAndExtractLevelUp = (events: any[], type: string) => {
//         return events.filter(event => event.type === type).map(event => ({
//             participantId: event.participantId,
//             level: event.level,
//             timestamp: event.timestamp,
//         }));
//     }
//     const filterAndExtractKilled = (events: any[], type: string) => {
//         return events.filter(event => event.type === type).map(event => ({
//             killerId: event.killerId,
//             victimId: event.victimId,
//             assistingParticipantIds: event.assistingParticipantIds,
//             timestamp: event.timestamp,
//         }));
//     }
//     const filterAndObjectKilled = (events: any[], type: string) => {
//         return events.filter(event => event.type === type).map(event => ({
//             killerId: event.killerId,
//             assistingParticipantIds: event.assistingParticipantIds,
//             monsterType: event.monsterType,
//             timestamp: event.timestamp,
//         }));
//     }
//     const extractGameTimelines = (timelines: any[]) => {
//         return timelines.map(timeline => ({
//             championStats: {
//                 health: timeline.championStats.health,
//                 healthMax: timeline.championStats.healthMax,
//                 power: timeline.championStats.power,
//                 powerMax: timeline.championStats.powerMax
//             },
//             damageStats: {
//                 magicDamageDoneToChampions: timeline.damageStats.magicDamageDoneToChampions,
//                 physicalDamageDoneToChampions: timeline.damageStats.physicalDamageDoneToChampions,
//                 trueDamageDoneToChampions: timeline.damageStats.trueDamageDoneToChampions,
//                 totalDamageDoneToChampions: timeline.damageStats.totalDamageDoneToChampions,
//                 magicDamageTaken: timeline.damageStats.magicDamageTaken,
//                 physicalDamageTaken: timeline.damageStats.physicalDamageTaken,
//                 trueDamageTaken: timeline.damageStats.trueDamageTaken,
//                 totalDamageTaken: timeline.damageStats.totalDamageTaken,
//             },
//             participantId: timeline.participantId,
//             level: timeline.level,
//             currentGold: timeline.currentGold,
//             xp: timeline.xp,
//             jungleMinionsKilled: timeline.jungleMinionsKilled,
//             minionsKilled: timeline.minionsKilled,
//         }));
//     }
//     const timeLineLevelUp1 = filterAndExtractLevelUp(participantsTimeLine1, "LEVEL_UP");
//     const timeLineLevelUp2 = filterAndExtractLevelUp(participantsTimeLine2, "LEVEL_UP");
//     const timeLineKda1 = filterAndExtractKilled(participantsTimeLine1, "CHAMPION_KILL");
//     const timeLineKda2 = filterAndExtractKilled(participantsTimeLine2, "CHAMPION_KILL");
//     const timeLineObject1 = filterAndObjectKilled(participantsTimeLine1, "ELITE_MONSTER_KILL");
//     const timeLineObject2 = filterAndObjectKilled(participantsTimeLine2, "ELITE_MONSTER_KILL");
//     const gameExtracted1 = extractGameTimelines(gameTimeline1);
//     const gameExtracted2 = extractGameTimelines(gameTimeline2);
//     const defaultParticipant = { championName: '' };
//     let participant3 = defaultParticipant
//     let participant4 = defaultParticipant
//     if (individualPosition === 'BOTTOM') {
//         participant3 = participant[i].participants.find((participant: any) => participant.individualPosition === individualPosition && participant.participantId === participant1ParticipantId - 1) || defaultParticipant;
//         participant4 = participant[i].participants.find((participant: any) => participant.individualPosition === individualPosition && participant.participantId !== participant1ParticipantId + 1) || defaultParticipant;
//     } else if (individualPosition === 'UTILITY') {
//         participant3 = participant[i].participants.find((participant: any) => participant.individualPosition === individualPosition && participant.participantId === participant1ParticipantId + 1) || defaultParticipant;
//         participant4 = participant[i].participants.find((participant: any) => participant.individualPosition === individualPosition && participant.participantId !== participant1ParticipantId - 1) || defaultParticipant;
//     }

//     const champion1 = participant1.championName;
//     const champion2 = participant2.championName;
//     const champion3 = participant3.championName;
//     const champion4 = participant4.championName;
//     const spell1 = participant1.summoner1Id;
//     const spell2 = participant1.summoner2Id;
//     const spell3 = participant2.summoner1Id;
//     const spell4 = participant2.summoner2Id;

//     const item0 = participant1.item0;
//     const item1 = participant1.item1;
//     const item2 = participant1.item2;
//     const item3 = participant1.item3;
//     const item4 = participant1.item4;
//     const item5 = participant1.item5;
//     const item6 = participant1.item6;
//     const item7 = participant2.item0
//     const item8 = participant2.item1
//     const item9 = participant2.item2
//     const item10 = participant2.item3
//     const item11 = participant2.item4
//     const item12 = participant2.item5
//     const item13 = participant2.item6
//     const turretPlatesTaken1 = participant1.challenges.turretTakedowns;
//     const visionScore1 = participant1.visionScore;
//     const turretPlatesTaken2 = participant2.challenges.turretTakedowns;
//     const visionScore2 = participant2.visionScore;
//     const rune1 = participant1.perks.styles[0].selections[0].perk;
//     const rune2 = participant1.perks.styles[0].selections[1].perk;
//     const rune3 = participant1.perks.styles[0].selections[2].perk;
//     const rune4 = participant1.perks.styles[0].selections[3].perk;
//     const rune5 = participant1.perks.styles[1].selections[0].perk;
//     const rune6 = participant1.perks.styles[1].selections[1].perk;
//     const rune7 = participant1.perks.statPerks.offense
//     const rune8 = participant1.perks.statPerks.flex
//     const rune9 = participant1.perks.statPerks.defense
//     const rune10 = participant2.perks.styles[0].selections[0].perk;
//     const rune11 = participant2.perks.styles[0].selections[1].perk;
//     const rune12 = participant2.perks.styles[0].selections[2].perk;
//     const rune13 = participant2.perks.styles[0].selections[3].perk;
//     const rune14 = participant2.perks.styles[1].selections[0].perk;
//     const rune15 = participant2.perks.styles[1].selections[1].perk;
//     const rune16 = participant2.perks.statPerks.offense
//     const rune17 = participant2.perks.statPerks.flex
//     const rune18 = participant2.perks.statPerks.defense
//     const handleGameData = () => {
//         setParticipants(participant);//참가자의 모든 게임 정보
//         setChampions(0, champion1);//챔1
//         setChampions(1, champion2);//챔2
//         setChampions(2, champion3);//챔3
//         setChampions(3, champion4);//챔4
//         setLines(participant1Line);//내 라인
//         setSelectedGame(i);//내 게임 번호
//         setPuuid(puuid);//puuid
//         setItems(0, item0);//item번호
//         setItems(1, item1);//item번호
//         setItems(2, item2);//item번호
//         setItems(3, item3);//item번호
//         setItems(4, item4);//item번호
//         setItems(5, item5);//item번호
//         setItems(6, item6);//item번호
//         setItems(7, item7);//item번호
//         setItems(8, item8);//item번호
//         setItems(9, item9);//item번호
//         setItems(10, item10);//item번호
//         setItems(11, item11);//item번호
//         setItems(12, item12);//item번호
//         setItems(13, item13);//item번호
//         setSummoners(0, spell1);//spell번호
//         setSummoners(1, spell2);//spell번호
//         setSummoners(2, spell3);//spell번호
//         setSummoners(3, spell4);//spell번호
//         setRunes(0, rune1);//rune번호
//         setRunes(1, rune2);//rune번호
//         setRunes(2, rune3);//rune번호
//         setRunes(3, rune4);//rune번호
//         setRunes(4, rune5);//rune번호
//         setRunes(5, rune6);//rune번호
//         setRunes(6, rune7);//rune번호
//         setRunes(7, rune8);//rune번호
//         setRunes(8, rune9);//rune번호
//         setRunes(9, rune10);//rune번호
//         setRunes(10, rune11);//rune번호
//         setRunes(11, rune12);//rune번호
//         setRunes(12, rune13);//rune번호
//         setRunes(13, rune14);//rune번호
//         setRunes(14, rune15);//rune번호
//         setRunes(15, rune16);//rune번호
//         setRunes(16, rune17);//rune번호
//         setRunes(17, rune18);//rune번호
//         setTier(tier);//내 티어
//         setTimeLineLevelUp1(timeLineLevelUp1)//내 레벨업 타임라인
//         setTimeLineLevelUp2(timeLineLevelUp2)//상대 레벨업 타임라인
//         setTimeLineKda1(timeLineKda1)//내 킬 타임라인
//         setTimeLineKda2(timeLineKda2)//상대 킬 타임라인
//         setTimeLineObject1(timeLineObject1)//내 오브젝트
//         setTimeLineObject2(timeLineObject2)//상대 오브젝트
//         setGameExtracted1(gameExtracted1)//내 game데이터정보
//         setGameExtracted2(gameExtracted2)//상대 game데이터 정보
//         setTurretPlatesTaken(0, turretPlatesTaken1)//내 포골
//         setTurretPlatesTaken(1, turretPlatesTaken2)//상대 포골
//         setVisionScore(0, visionScore1)//내 시야점수
//         setVisionScore(1, visionScore2)//상대 시야점수
//         setSkillOrder(skillOrder)
//         router.push('/write');
//     }

//     return (
//         <div>
//             <Button key={i} onClick={handleGameData}>데이터 전송</Button>
//         </div>
//     )
// }

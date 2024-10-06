import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/util/database";
import { getMatchData, getMatchDataTimeline, getRecentMatchIds } from '@/app/riotApi';

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { puuid, queue, start, games } = data;

    try {
        const matchIds = await getRecentMatchIds(puuid, queue, start, games);
        const db = (await connectDB).db('dream');

        const levelUpEventsByParticipant: { [key: string]: any[] } = {};

        for (const matchId of matchIds) {
            try {
                const versusCollection = db.collection('versusData');
                const matchData = await getMatchData(matchId);
                const matchTimeLine = await getMatchDataTimeline(matchId);

                const gameVersion = matchData.info.gameVersion.split('.')[1]; // '19'만 추출
                const participants = matchData.info.participants;

                matchTimeLine.info.frames.forEach((frame: any) => {
                    frame.events.forEach((event: any) => {
                        if (event.type === 'LEVEL_UP') {
                            const participantId = event.participantId;
                            if (!levelUpEventsByParticipant[participantId]) {
                                levelUpEventsByParticipant[participantId] = [];
                            }
                            levelUpEventsByParticipant[participantId].push({
                                level: event.level,
                                timestamp: event.timestamp
                            });
                        }
                    });
                });

                for (let i = 0; i < 5; i++) {
                    console.log(i + "번쨰 : " + participants[i].summonerName)
                    console.log(`${i + 5}` + "번쨰 : " + participants[i + 5].summonerName)
                    const participantA = participants[i];
                    const participantB = participants[i + 5];

                    const eventsA = levelUpEventsByParticipant[participantA.participantId];
                    const eventsB = levelUpEventsByParticipant[participantB.participantId];

                    // 선 2렙 ~ 6렙의 레벨 추적
                    const firstToLevel: { level2: number; level3: number; level4: number; level5: number; level6: number } = {
                        level2: 0,
                        level3: 0,
                        level4: 0,
                        level5: 0,
                        level6: 0,
                    };
                    // 선 2렙 ~ 6렙 추적
                    [2, 3, 4, 5, 6].forEach((level) => {
                        const eventA = eventsA?.find((e: any) => e.level === level);
                        const eventB = eventsB?.find((e: any) => e.level === level);

                        if (eventA && eventB) {
                            if (eventA.timestamp <= eventB.timestamp) {
                                firstToLevel[`level${level}` as keyof typeof firstToLevel] += 1;
                            } else if (eventA.timestamp <= eventB.timestamp) {
                                firstToLevel[`level${level}` as keyof typeof firstToLevel] += 0;
                            }
                        }
                    });

                    const champA = participantA.championName || '';
                    const champB = participantB.championName || '';
                    const lineA = participantA.individualPosition.toLowerCase() || '';
                    const lineB = participantB.individualPosition.toLowerCase() || '';
                    const damagePerMinuteA = Math.floor(participantA.challenges.damagePerMinute) || 0;
                    const damagePerMinuteB = Math.floor(participantB.challenges.damagePerMinute) || 0;
                    const teamDamagePercentageA = Math.floor(participantA.challenges.teamDamagePercentage * 100) || 0;
                    const teamDamagePercentageB = Math.floor(participantB.challenges.teamDamagePercentage * 100) || 0;
                    const damageTakenOnTeamPercentageA = Math.floor(participantA.challenges.damageTakenOnTeamPercentage * 100) || 0;
                    const damageTakenOnTeamPercentageB = Math.floor(participantB.challenges.damageTakenOnTeamPercentage * 100) || 0;
                    const kdaA = Math.floor(participantA.challenges.kda * 100) / 100 || 0;
                    const kdaB = Math.floor(participantB.challenges.kda * 100) / 100 || 0;
                    const killParticipationA = Math.floor(participantA.challenges.killParticipation * 100) || 0;
                    const killParticipationB = Math.floor(participantB.challenges.killParticipation * 100) || 0;
                    const soloKillsA = participantA.challenges.soloKills || 0;
                    const soloKillsB = participantB.challenges.soloKills || 0;
                    const turretPlatesTakenA = participantA.challenges.turretPlatesTaken || 0;
                    const turretPlatesTakenB = participantB.challenges.turretPlatesTaken || 0;
                    const damageDealtToBuildingsA = participantA.damageDealtToBuildings || 0;
                    const damageDealtToBuildingsB = participantB.damageDealtToBuildings || 0;
                    const visionScoreA = participantA.visionScore || 0;
                    const visionScoreB = participantB.visionScore || 0;
                    const winA = participantA.win == true ? 1 : 0;
                    const winB = participantB.win == true ? 1 : 0;

                    const frameA = matchTimeLine.info.frames[12]?.participantFrames?.[i + 1];
                    const frameB = matchTimeLine.info.frames[12]?.participantFrames?.[i + 6];

                    if (!frameA || !frameB) {
                        console.error(`participantFrames data is missing for matchId: ${matchId}`);
                        continue; // participantFrames 정보가 없으면 해당 매치를 건너뜀
                    }

                    const jungleMinionsKilledA = frameA.jungleMinionsKilled || 0;
                    const jungleMinionsKilledB = frameB.jungleMinionsKilled || 0;
                    const minionsKilledA = frameA.minionsKilled || 0;
                    const minionsKilledB = frameB.minionsKilled || 0;
                    const totalGoldA = frameA.totalGold || 0;
                    const totalGoldB = frameB.totalGold || 0;
                    const xpA = frameA.xp || 0;
                    const xpB = frameB.xp || 0;

                    const existingA = await versusCollection.findOne({
                        championName: champA,
                        [`${gameVersion}.${lineA}.${champB}.matchId`]: matchId,
                    });
                    const existingB = await versusCollection.findOne({
                        championName: champB,
                        [`${gameVersion}.${lineB}.${champA}.matchId`]: matchId,
                    });
                    
                    // 첫 번째 방향: A vs B
                    if (!existingA) {
                        const existingDataA = await versusCollection.findOne({ championName: champA });
                        // 기존 배열 값이 있으면 가져오고, 없으면 빈 배열로 초기화
                        const currentLevelsA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.levels[0] || 0
                        const currentLevelsB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.levels[1] || 0
                        const currentLevelsC = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.levels[2] || 0
                        const currentLevelsD = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.levels[3] || 0
                        const currentLevelsE = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.levels[4] || 0
                        const currentDamagePerMinuteA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.damagePerMinute[0] || 0;
                        const currentDamagePerMinuteB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.damagePerMinute[1] || 0;
                        const currentTeamDamagePercentageA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.teamDamagePercentage[0] || 0
                        const currentTeamDamagePercentageB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.teamDamagePercentage[1] || 0
                        const currentDamageTakenOnTeamPercentageA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.damageTakenOnTeamPercentage[0] || 0
                        const currentDamageTakenOnTeamPercentageB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.damageTakenOnTeamPercentage[1] || 0
                        const currentKdaA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.kda[0] || 0
                        const currentKdaB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.kda[1] || 0
                        const currentKillParticipationA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.killParticipation[0] || 0
                        const currentKillParticipationB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.killParticipation[1] || 0
                        const currentSoloKillsA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.soloKills[0] || 0
                        const currentSoloKillsB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.soloKills[1] || 0
                        const currentTurretPlatesTakenA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.turretPlatesTaken[0] || 0
                        const currentTurretPlatesTakenB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.turretPlatesTaken[1] || 0
                        const currentDamageDealtToBuildingsA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.damageDealtToBuildings[0] || 0
                        const currentDamageDealtToBuildingsB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.damageDealtToBuildings[1] || 0
                        const currentVisionScoreA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.visionScore[0] || 0
                        const currentVisionScoreB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.visionScore[1] || 0
                        const currentWinA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.win[0] || 0
                        const currentWinB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.win[1] || 0
                        const currentJungleMinionsKilledA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.jungleMinionsKilled[0] || 0
                        const currentJungleMinionsKilledB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.jungleMinionsKilled[1] || 0
                        const currentMinionsKilledA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.minionsKilled[0] || 0
                        const currentMinionsKilledB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.minionsKilled[1] || 0
                        const currentTotalGoldA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.totalGold[0] || 0
                        const currentTotalGoldB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.totalGold[1] || 0
                        const currentXpA = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.xp[0] || 0
                        const currentXpB = existingDataA?.[gameVersion]?.[lineA]?.[champB]?.xp[1] || 0

                        await versusCollection.updateOne(
                            { championName: champA },
                            {
                                $set: {
                                    [`${gameVersion}.${lineA}.${champB}.levels`]: [
                                        currentLevelsA + (firstToLevel.level2 > 0 ? 1 : 0),
                                        currentLevelsB + (firstToLevel.level3 > 0 ? 1 : 0),
                                        currentLevelsC + (firstToLevel.level4 > 0 ? 1 : 0),
                                        currentLevelsD + (firstToLevel.level5 > 0 ? 1 : 0),
                                        currentLevelsE + (firstToLevel.level6 > 0 ? 1 : 0)
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.damagePerMinute`]: [
                                        currentDamagePerMinuteA + damagePerMinuteA,
                                        currentDamagePerMinuteB + damagePerMinuteB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.teamDamagePercentage`]: [
                                        currentTeamDamagePercentageA + teamDamagePercentageA,
                                        currentTeamDamagePercentageB + teamDamagePercentageB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.damageTakenOnTeamPercentage`]: [
                                        currentDamageTakenOnTeamPercentageA + damageTakenOnTeamPercentageA,
                                        currentDamageTakenOnTeamPercentageB + damageTakenOnTeamPercentageB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.kda`]: [
                                        currentKdaA + kdaA,
                                        currentKdaB + kdaB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.killParticipation`]: [
                                        currentKillParticipationA + killParticipationA,
                                        currentKillParticipationB + killParticipationB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.soloKills`]: [
                                        currentSoloKillsA + soloKillsA,
                                        currentSoloKillsB + soloKillsB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.turretPlatesTaken`]: [
                                        currentTurretPlatesTakenA + turretPlatesTakenA,
                                        currentTurretPlatesTakenB + turretPlatesTakenB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.damageDealtToBuildings`]: [
                                        currentDamageDealtToBuildingsA + damageDealtToBuildingsA,
                                        currentDamageDealtToBuildingsB + damageDealtToBuildingsB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.visionScore`]: [
                                        currentVisionScoreA + visionScoreA,
                                        currentVisionScoreB + visionScoreB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.win`]: [
                                        currentWinA + winA,
                                        currentWinB + winB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.jungleMinionsKilled`]: [
                                        currentJungleMinionsKilledA + jungleMinionsKilledA,
                                        currentJungleMinionsKilledB + jungleMinionsKilledB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.minionsKilled`]: [
                                        currentMinionsKilledA + minionsKilledA,
                                        currentMinionsKilledB + minionsKilledB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.totalGold`]: [
                                        currentTotalGoldA + totalGoldA,
                                        currentTotalGoldB + totalGoldB
                                    ],
                                    [`${gameVersion}.${lineA}.${champB}.xp`]: [
                                        currentXpA + xpA,
                                        currentXpB + xpB
                                    ],
                                },
                                $addToSet: { [`${gameVersion}.${lineA}.${champB}.matchId`]: matchId },
                            },
                            { upsert: true }
                        );
                    }
                    if (!existingB) {
                        const existingDataB = await versusCollection.findOne({ championName: champB });
                        // 기존 배열 값이 있으면 가져오고, 없으면 빈 배열로 초기화
                        const currentLevelsA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.levels[0] || 0
                        const currentLevelsB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.levels[1] || 0
                        const currentLevelsC = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.levels[2] || 0
                        const currentLevelsD = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.levels[3] || 0
                        const currentLevelsE = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.levels[4] || 0
                        const currentDamagePerMinuteA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.damagePerMinute[0] || 0;
                        const currentDamagePerMinuteB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.damagePerMinute[1] || 0;
                        const currentTeamDamagePercentageA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.teamDamagePercentage[0] || 0
                        const currentTeamDamagePercentageB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.teamDamagePercentage[1] || 0
                        const currentDamageTakenOnTeamPercentageA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.damageTakenOnTeamPercentage[0] || 0
                        const currentDamageTakenOnTeamPercentageB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.damageTakenOnTeamPercentage[1] || 0
                        const currentKdaA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.kda[0] || 0
                        const currentKdaB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.kda[1] || 0
                        const currentKillParticipationA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.killParticipation[0] || 0
                        const currentKillParticipationB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.killParticipation[1] || 0
                        const currentSoloKillsA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.soloKills[0] || 0
                        const currentSoloKillsB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.soloKills[1] || 0
                        const currentTurretPlatesTakenA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.turretPlatesTaken[0] || 0
                        const currentTurretPlatesTakenB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.turretPlatesTaken[1] || 0
                        const currentDamageDealtToBuildingsA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.damageDealtToBuildings[0] || 0
                        const currentDamageDealtToBuildingsB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.damageDealtToBuildings[1] || 0
                        const currentVisionScoreA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.visionScore[0] || 0
                        const currentVisionScoreB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.visionScore[1] || 0
                        const currentWinA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.win[0] || 0
                        const currentWinB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.win[1] || 0
                        const currentJungleMinionsKilledA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.jungleMinionsKilled[0] || 0
                        const currentJungleMinionsKilledB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.jungleMinionsKilled[1] || 0
                        const currentMinionsKilledA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.minionsKilled[0] || 0
                        const currentMinionsKilledB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.minionsKilled[1] || 0
                        const currentTotalGoldA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.totalGold[0] || 0
                        const currentTotalGoldB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.totalGold[1] || 0
                        const currentXpA = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.xp[0] || 0
                        const currentXpB = existingDataB?.[gameVersion]?.[lineB]?.[champA]?.xp[1] || 0

                        await versusCollection.updateOne(
                            { championName: champB },
                            {
                                $set: {
                                    [`${gameVersion}.${lineB}.${champA}.levels`]: [
                                        currentLevelsA + (firstToLevel.level2 > 0 ? 1 : 0),
                                        currentLevelsB + (firstToLevel.level3 > 0 ? 1 : 0),
                                        currentLevelsC + (firstToLevel.level4 > 0 ? 1 : 0),
                                        currentLevelsD + (firstToLevel.level5 > 0 ? 1 : 0),
                                        currentLevelsE + (firstToLevel.level6 > 0 ? 1 : 0)
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.damagePerMinute`]: [
                                        currentDamagePerMinuteA + damagePerMinuteA,
                                        currentDamagePerMinuteB + damagePerMinuteB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.teamDamagePercentage`]: [
                                        currentTeamDamagePercentageA + teamDamagePercentageA,
                                        currentTeamDamagePercentageB + teamDamagePercentageB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.damageTakenOnTeamPercentage`]: [
                                        currentDamageTakenOnTeamPercentageA + damageTakenOnTeamPercentageA,
                                        currentDamageTakenOnTeamPercentageB + damageTakenOnTeamPercentageB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.kda`]: [
                                        currentKdaA + kdaA,
                                        currentKdaB + kdaB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.killParticipation`]: [
                                        currentKillParticipationA + killParticipationA,
                                        currentKillParticipationB + killParticipationB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.soloKills`]: [
                                        currentSoloKillsA + soloKillsA,
                                        currentSoloKillsB + soloKillsB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.turretPlatesTaken`]: [
                                        currentTurretPlatesTakenA + turretPlatesTakenA,
                                        currentTurretPlatesTakenB + turretPlatesTakenB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.damageDealtToBuildings`]: [
                                        currentDamageDealtToBuildingsA + damageDealtToBuildingsA,
                                        currentDamageDealtToBuildingsB + damageDealtToBuildingsB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.visionScore`]: [
                                        currentVisionScoreA + visionScoreA,
                                        currentVisionScoreB + visionScoreB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.win`]: [
                                        currentWinA + winA,
                                        currentWinB + winB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.jungleMinionsKilled`]: [
                                        currentJungleMinionsKilledA + jungleMinionsKilledA,
                                        currentJungleMinionsKilledB + jungleMinionsKilledB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.minionsKilled`]: [
                                        currentMinionsKilledA + minionsKilledA,
                                        currentMinionsKilledB + minionsKilledB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.totalGold`]: [
                                        currentTotalGoldA + totalGoldA,
                                        currentTotalGoldB + totalGoldB
                                    ],
                                    [`${gameVersion}.${lineB}.${champA}.xp`]: [
                                        currentXpA + xpA,
                                        currentXpB + xpB
                                    ],
                                },
                                $addToSet: { [`${gameVersion}.${lineB}.${champA}.matchId`]: matchId },
                            },
                            { upsert: true }
                        );
                    }
                }
            } catch (matchError) {
                console.error(`Error processing matchId`, matchError);
                // 에러가 발생한 매치에 대해 건너뛰고 다음 매치로 진행
                continue;
            }
        }

        return NextResponse.json({ message: '매치 데이터가 성공적으로 저장되었습니다.' }, { status: 200 });
    } catch (error) {
        console.error(`Error fetching or saving match data . Error:`, error);
        return NextResponse.json({ error: '매치 데이터를 가져오거나 저장하는 데 실패했습니다.' }, { status: 500 });
    }
}

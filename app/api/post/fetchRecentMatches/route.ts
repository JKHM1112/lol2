import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/util/database";

const api_key = process.env.RIOT_API_KEY as string;

async function getRecentMatchIds(puuid: string, queue: number, start: number, games: number) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${queue}&start=${start}&count=${games}`;
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache, no-store, must-revalidate"
        }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to fetch match IDs');
    }
    return await response.json();
}

async function getMatchData(matchId: string) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache, no-store, must-revalidate"
        }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('match data 에러');
    }
    return await response.json();
}

async function getMatchTimeLine(matchId: string) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`;
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept-Language": "ko-KR,ko;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key,
            "Cache-Control": "no-cache, no-store, must-revalidate"
        }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('match timeline 에러');
    }
    return await response.json();
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { puuid, queue, start, games, tier } = data;

    try {
        const matchIds = await getRecentMatchIds(puuid, queue, start, games);
        const db = (await connectDB).db('dream');

        for (const matchId of matchIds) {
            const matchData = await getMatchData(matchId);
            const matchTimeLine = await getMatchTimeLine(matchId);

            const participantsByPosition: { [key: string]: any[] } = {
                TOP: [],
                JUNGLE: [],
                MIDDLE: [],
                BOTTOM: [],
                UTILITY: []
            };

            const levelUpEventsByParticipant: { [key: string]: any[] } = {};
            const frameDataEventsByParticipant: { [key: string]: any[] } = {};

            matchTimeLine.info.frames.forEach((frame: any) => {
                frame.events.forEach((event: any) => {
                    if (event.type === 'LEVEL_UP') {
                        const participantId = event.participantId;
                        if (!levelUpEventsByParticipant[participantId]) {
                            levelUpEventsByParticipant[participantId] = [];
                        }
                        levelUpEventsByParticipant[participantId].push(event);
                    }
                });

                for (const [participantId, frameData] of Object.entries(frame.participantFrames as { [key: string]: any })) {
                    if (!frameDataEventsByParticipant[participantId]) {
                        frameDataEventsByParticipant[participantId] = [];
                    }
                    frameDataEventsByParticipant[participantId].push({
                        jungleMinionsKilled: frameData.jungleMinionsKilled,
                        minionsKilled: frameData.minionsKilled,
                        totalGold: frameData.totalGold,
                        xp: frameData.xp
                    });
                }
            });

            matchData.info.participants.forEach((participant: any) => {
                const position = participant.individualPosition;
                if (participantsByPosition[position]) {
                    participantsByPosition[position].push({
                        assists: participant.assists,
                        challenges: {
                            damagePerMinute: participant.challenges.damagePerMinute,
                            damageTakenOnTeamPercentage: participant.challenges.damageTakenOnTeamPercentage,
                            gameLength: participant.challenges.gameLength,
                            killParticipation: participant.challenges.killParticipation,
                            laneMinionsFirst10Minutes: participant.challenges.laneMinionsFirst10Minutes,
                            legendaryItemUsed: participant.challenges.legendaryItemUsed,
                            soloKills: participant.challenges.soloKills,
                            teamDamagePercentage: participant.challenges.teamDamagePercentage,
                            turretPlatesTaken: participant.challenges.turretPlatesTaken,
                            visionScoreAdvantageLaneOpponent: participant.challenges.visionScoreAdvantageLaneOpponent,
                            visionScorePerMinute: participant.challenges.visionScorePerMinute
                        },
                        champExperience: participant.champExperience,
                        champLevel: participant.champLevel,
                        championId: participant.championId,
                        championName: participant.championName,
                        damageDealtToBuildings: participant.damageDealtToBuildings,
                        deaths: participant.deaths,
                        goldEarned: participant.goldEarned,
                        individualPosition: participant.individualPosition,
                        items: [
                            participant.item0,
                            participant.item1,
                            participant.item2,
                            participant.item3,
                            participant.item4,
                            participant.item5,
                            participant.item6
                        ],
                        kills: participant.kills,
                        lane: participant.lane,
                        magicDamageDealtToChampions: participant.magicDamageDealtToChampions,
                        magicDamageTaken: participant.magicDamageTaken,
                        physicalDamageDealtToChampions: participant.physicalDamageDealtToChampions,
                        physicalDamageTaken: participant.physicalDamageTaken,
                        participantId: participant.participantId,
                        puuid: participant.puuid,
                        riotIdGameName: participant.riotIdGameName,
                        riotIdTagline: participant.riotIdTagline,
                        summoner1Id: participant.summoner1Id,
                        summoner2Id: participant.summoner2Id,
                        summonerId: participant.summonerId,
                        teamId: participant.teamId,
                        teamPosition: participant.teamPosition,
                        totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
                        totalDamageTaken: participant.totalDamageTaken,
                        totalMinionsKilled: participant.totalMinionsKilled,
                        trueDamageDealtToChampions: participant.trueDamageDealtToChampions,
                        trueDamageTaken: participant.trueDamageTaken,
                        visionScore: participant.visionScore,
                        win: participant.win,
                        levelUpEvents: levelUpEventsByParticipant[participant.participantId] || [],
                        frameData: frameDataEventsByParticipant[participant.participantId] || []
                    });
                }
            });

            for (const [position, participants] of Object.entries(participantsByPosition)) {
                if (participants.length > 0) {
                    const collectionName = `matchData${position}`;
                    const existingMatch = await db.collection(collectionName).findOne({ 'metadata.matchId': matchId });
                    if (!existingMatch) {
                        const gameData = {
                            metadata: {
                                matchId: matchData.metadata.matchId
                            },
                            info: {
                                gameDuration: matchData.info.gameDuration,
                                gameEndTimestamp: matchData.info.gameEndTimestamp,
                                gameStartTimestamp: matchData.info.gameStartTimestamp,
                                gameVersion: matchData.info.gameVersion,
                                participants
                            },
                            tier: tier
                        };
                        const result = await db.collection(collectionName).insertOne(gameData);
                        console.log(` match data에 ${collectionName}와 ID: ${result.insertedId} 삽입성공`);
                    }
                }
            }
        }

        return NextResponse.json({ message: '매치 데이터가 성공적으로 저장되었습니다.' }, { status: 200 });
    } catch (error) {
        console.error('Error fetching or saving match data:', error);
        return NextResponse.json({ error: '매치 데이터를 가져오거나 저장하는 데 실패했습니다.' }, { status: 500 });
    }
}

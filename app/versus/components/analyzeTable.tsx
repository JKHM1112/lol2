'use client';

import { useState, useEffect } from "react";
import { MatchData, Participant } from "./selectedChampions";

interface AnalyzeTableProps {
    bothChampionsMatches: MatchData[];
    firstChampion: string;
    secondChampion: string;
}

export default function AnalyzeTable({ bothChampionsMatches, firstChampion, secondChampion }: AnalyzeTableProps) {
    const [firstChampionArray, setFirstChampionArray] = useState<Participant[]>([]);
    const [secondChampionArray, setSecondChampionArray] = useState<Participant[]>([]);
    const [firstChampion2, setFirstChampion2] = useState(0);
    const [secondChampion2, setSecondChampion2] = useState(0);
    const [firstChampion3, setFirstChampion3] = useState(0);
    const [secondChampion3, setSecondChampion3] = useState(0);
    const [firstChampion6, setFirstChampion6] = useState(0);
    const [secondChampion6, setSecondChampion6] = useState(0);
    const [firstChampionCs, setFirstChampionCs] = useState(0);
    const [secondChampionCs, setSecondChampionCs] = useState(0);
    const [firstChampionExp, setFirstChampionExp] = useState(0);
    const [secondChampionExp, setSecondChampionExp] = useState(0);
    const [firstChampionGold, setFirstChampionGold] = useState(0);
    const [secondChampionGold, setSecondChampionGold] = useState(0);
    const [firstChampionSoloKills, setFirstChampionSoloKills] = useState(0);
    const [secondChampionSoloKills, setSecondChampionSoloKills] = useState(0);
    const [firstChampionDamagePerMinute, setFirstChampionDamagePerMinute] = useState(0);
    const [secondChampionDamagePerMinute, setSecondChampionDamagePerMinute] = useState(0);
    const [firstChampionKda, setFirstChampionkda] = useState(0);
    const [secondChampionKda, setSecondChampionkda] = useState(0);
    const [firstChampionTurretPlatesTaken, setFirstChampionTurretPlatesTaken] = useState(0);
    const [secondChampionTurretPlatesTaken, setSecondChampionTurretPlatesTaken] = useState(0);
    const [firstChampionKillParticipation, setFirstChampionKillParticipation] = useState(0);
    const [secondChampionKillParticipation, setSecondChampionKillParticipation] = useState(0);
    const [firstChampionTeamDamagePercentage, setFirstChampionTeamDamagePercentage] = useState(0);
    const [secondChampionTeamDamagePercentage, setSecondChampionTeamDamagePercentage] = useState(0);
    const [firstChampionDamageTakenOnTeamPercentage, setFirstChampionDamageTakenOnTeamPercentage] = useState(0);
    const [secondChampionDamageTakenOnTeamPercentage, setSecondChampionDamageTakenOnTeamPercentage] = useState(0);
    const [firstChampionDamageDealtToBuildings, setFirstChampionDamageDealtToBuildings] = useState(0);
    const [secondChampionDamageDealtToBuildings, setSecondChampionDamageDealtToBuildings] = useState(0);
    const [firstChampionVisionScore, setFirstChampionVisionScore] = useState(0);
    const [secondChampionVisionScore, setSecondChampionVisionScore] = useState(0);

    console.log(firstChampionArray)
    useEffect(() => {
        const firstArray: Participant[] = [];
        const secondArray: Participant[] = [];

        bothChampionsMatches.forEach(match => {
            match.info.participants.forEach(participant => {
                if (participant.championName === firstChampion) {
                    firstArray.push(participant);
                }
                if (participant.championName === secondChampion) {
                    secondArray.push(participant);
                }
            });
        });

        setFirstChampionArray(firstArray);
        setSecondChampionArray(secondArray);
    }, [bothChampionsMatches, firstChampion, secondChampion]);

    useEffect(() => {
        let firstChampion2Count = 0;
        let secondChampion2Count = 0;
        let firstChampion3Count = 0;
        let secondChampion3Count = 0;
        let firstChampion6Count = 0;
        let secondChampion6Count = 0;
        let firstChampionCsCount = 0;
        let secondChampionCsCount = 0;
        let firstChampionExpCount = 0;
        let secondChampionExpCount = 0;
        let firstChampionGoldCount = 0;
        let secondChampionGoldCount = 0;
        let firstChampionSoloKills = 0;
        let secondChampionSoloKills = 0;
        let firstChampioDamagePerMinute = 0;
        let secondChampionDamagePerMinute = 0;
        let firstChampionKda = 0;
        let secondChampionKda = 0;
        let firstChampionTurretPlatesTaken = 0;
        let secondChampionTurretPlatesTaken = 0;
        let firstChampionKillParticipation = 0;
        let secondChampionKillParticipation = 0;
        let firstChampionTeamDamagePercentage = 0;
        let secondChampionTeamDamagePercentage = 0;
        let firstChampionDamageTakenOnTeamPercentage = 0;
        let secondChampionDamageTakenOnTeamPercentage = 0;
        let firstChampionDamageDealtToBuildings = 0;
        let secondChampionDamageDealtToBuildings = 0;
        let firstChampionVisionScore = 0;
        let secondChampionVisionScore = 0;

        for (let i = 0; i < firstChampionArray.length && i < secondChampionArray.length; i++) {
            if (firstChampionArray[i].levelUpEvents[0]?.timestamp <= secondChampionArray[i].levelUpEvents[0]?.timestamp) {
                firstChampion2Count++;
            } else {
                secondChampion2Count++;
            }
            if (firstChampionArray[i].levelUpEvents[1]?.timestamp <= secondChampionArray[i].levelUpEvents[1]?.timestamp) {
                firstChampion3Count++;
            } else {
                secondChampion3Count++;
            }
            if (firstChampionArray[i].levelUpEvents[4]?.timestamp <= secondChampionArray[i].levelUpEvents[4]?.timestamp) {
                firstChampion6Count++;
            } else {
                secondChampion6Count++;
            }
            firstChampionCsCount += firstChampionArray[i].frameData[14]?.jungleMinionsKilled + firstChampionArray[i].frameData[14]?.minionsKilled || 0;
            secondChampionCsCount += secondChampionArray[i].frameData[14]?.jungleMinionsKilled + secondChampionArray[i].frameData[14]?.minionsKilled || 0;
            firstChampionExpCount += firstChampionArray[i].frameData[14]?.xp || 0;
            secondChampionExpCount += secondChampionArray[i].frameData[14]?.xp || 0;
            firstChampionGoldCount += firstChampionArray[i].frameData[14]?.totalGold || 0;
            secondChampionGoldCount += secondChampionArray[i].frameData[14]?.totalGold || 0;
            firstChampionSoloKills += firstChampionArray[i].challenges.soloKills
            secondChampionSoloKills += secondChampionArray[i].challenges.soloKills
            firstChampioDamagePerMinute += firstChampionArray[i].challenges.damagePerMinute
            secondChampionDamagePerMinute += secondChampionArray[i].challenges.damagePerMinute
            firstChampionKda += firstChampionArray[i].challenges.kda
            secondChampionKda += secondChampionArray[i].challenges.kda
            firstChampionTurretPlatesTaken += firstChampionArray[i].challenges.turretPlatesTaken
            secondChampionTurretPlatesTaken += secondChampionArray[i].challenges.turretPlatesTaken
            firstChampionKillParticipation += firstChampionArray[i].challenges.killParticipation
            secondChampionKillParticipation += secondChampionArray[i].challenges.killParticipation
            firstChampionTeamDamagePercentage += firstChampionArray[i].challenges.teamDamagePercentage
            secondChampionTeamDamagePercentage += secondChampionArray[i].challenges.teamDamagePercentage
            firstChampionDamageTakenOnTeamPercentage += firstChampionArray[i].challenges.damageTakenOnTeamPercentage
            secondChampionDamageTakenOnTeamPercentage += secondChampionArray[i].challenges.damageTakenOnTeamPercentage
            firstChampionDamageDealtToBuildings += firstChampionArray[i].damageDealtToBuildings
            secondChampionDamageDealtToBuildings += secondChampionArray[i].damageDealtToBuildings
            firstChampionVisionScore += firstChampionArray[i].visionScore
            secondChampionVisionScore += secondChampionArray[i].visionScore
        }

        setFirstChampion2(firstChampion2Count);
        setSecondChampion2(secondChampion2Count);
        setFirstChampion3(firstChampion3Count);
        setSecondChampion3(secondChampion3Count);
        setFirstChampion6(firstChampion6Count);
        setSecondChampion6(secondChampion6Count);
        setFirstChampionCs(firstChampionCsCount);
        setSecondChampionCs(secondChampionCsCount);
        setFirstChampionExp(firstChampionExpCount);
        setSecondChampionExp(secondChampionExpCount);
        setFirstChampionGold(firstChampionGoldCount);
        setSecondChampionGold(secondChampionGoldCount);
        setFirstChampionSoloKills(firstChampionSoloKills);
        setSecondChampionSoloKills(secondChampionSoloKills);
        setFirstChampionDamagePerMinute(firstChampioDamagePerMinute);
        setSecondChampionDamagePerMinute(secondChampionDamagePerMinute);
        setFirstChampionkda(firstChampionKda);
        setSecondChampionkda(secondChampionKda);
        setFirstChampionTurretPlatesTaken(firstChampionTurretPlatesTaken);
        setSecondChampionTurretPlatesTaken(secondChampionTurretPlatesTaken);
        setFirstChampionKillParticipation(firstChampionKillParticipation);
        setSecondChampionKillParticipation(secondChampionKillParticipation);
        setFirstChampionTeamDamagePercentage(firstChampionTeamDamagePercentage);
        setSecondChampionTeamDamagePercentage(secondChampionTeamDamagePercentage);
        setFirstChampionDamageTakenOnTeamPercentage(firstChampionDamageTakenOnTeamPercentage);
        setSecondChampionDamageTakenOnTeamPercentage(secondChampionDamageTakenOnTeamPercentage);
        setFirstChampionDamageDealtToBuildings(firstChampionDamageDealtToBuildings);
        setSecondChampionDamageDealtToBuildings(secondChampionDamageDealtToBuildings);
        setFirstChampionVisionScore(firstChampionVisionScore);
        setSecondChampionVisionScore(secondChampionVisionScore);
    }, [firstChampionArray, secondChampionArray]);

    return (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
            <div className=" justify-between items-center mb-4">
                <div className="text-xl">{(100 * firstChampion2 / (firstChampion2 + secondChampion2)).toFixed(0)}% 선2렙 {(100 * secondChampion2 / (firstChampion2 + secondChampion2)).toFixed(0)}%</div>
                <div className="text-xl">{(100 * firstChampion3 / (firstChampion3 + secondChampion3)).toFixed(0)}% 선3렙 {(100 * secondChampion3 / (firstChampion3 + secondChampion3)).toFixed(0)}%</div>
                <div className="text-xl">{(100 * firstChampion6 / (firstChampion6 + secondChampion6)).toFixed(0)}% 선6렙 {(100 * secondChampion6 / (firstChampion6 + secondChampion6)).toFixed(0)}%</div>
            </div>
            <hr className="my-4 border-gray-600" />
            <div className=" justify-between items-center mb-4">
                <div className="text-xl">{(firstChampionCs / firstChampionArray.length).toFixed(0)}개 14분CS {(secondChampionCs / secondChampionArray.length).toFixed(0)}개</div>
                <div className="text-xl">{(firstChampionExp / firstChampionArray.length).toFixed(0)} 14분경험치 {(secondChampionExp / secondChampionArray.length).toFixed(0)}</div>
                <div className="text-xl">{(firstChampionGold / firstChampionArray.length).toFixed(0)} 14분골드 {(secondChampionGold / secondChampionArray.length).toFixed(0)}</div>
            </div>
            <hr className="my-4 border-gray-600" />
            <div className=" justify-between items-center mb-4">
                <div className="text-xl">{(firstChampionDamagePerMinute / firstChampionArray.length).toFixed(0)} 분당 가한 피해 {(secondChampionDamagePerMinute / secondChampionArray.length).toFixed(0)}</div>
                <div className="text-xl">{(100 * firstChampionTeamDamagePercentage / firstChampionArray.length).toFixed(2)}% 팀데미지 비율 {(100 * secondChampionTeamDamagePercentage / secondChampionArray.length).toFixed(2)}%</div>
                <div className="text-xl">{(100 * firstChampionDamageTakenOnTeamPercentage / firstChampionArray.length).toFixed(2)}% 팀받은피해량 비율 {(100 * secondChampionDamageTakenOnTeamPercentage / secondChampionArray.length).toFixed(2)}%</div>
            </div>
            <hr className="my-4 border-gray-600" />
            <div className=" justify-between items-center mb-4">
                <div className="text-xl">{(firstChampionTurretPlatesTaken / firstChampionArray.length).toFixed(1)}개 포탑방패 {(secondChampionTurretPlatesTaken / secondChampionArray.length).toFixed(1)}개</div>
                <div className="text-xl">{(firstChampionDamageDealtToBuildings / firstChampionArray.length).toFixed(0)} 포탑에 가한 피해 {(secondChampionDamageDealtToBuildings / secondChampionArray.length).toFixed(0)}</div>
            </div>
            <hr className="my-4 border-gray-600" />
            <div className=" justify-between items-center mb-4">
                <div className="text-xl">{(100 * firstChampionKillParticipation / firstChampionArray.length).toFixed(1)}% 킬관여 {(100 * secondChampionKillParticipation / secondChampionArray.length).toFixed(1)}%</div>
                <div className="text-xl">{(firstChampionKda / firstChampionArray.length).toFixed(2)} kda {(secondChampionKda / secondChampionArray.length).toFixed(2)}</div>
                <div className="text-xl">{(firstChampionSoloKills / firstChampionArray.length).toFixed(1)} 솔로킬 {(secondChampionSoloKills / secondChampionArray.length).toFixed(1)}</div>
                <div className="text-xl">{(firstChampionVisionScore / firstChampionArray.length).toFixed(0)} 시야점수 {(secondChampionVisionScore / secondChampionArray.length).toFixed(0)}</div>
            </div>
        </div>
    );
}

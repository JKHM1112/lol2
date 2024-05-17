export const getRunes = () => {
    const runes: { nameN: number, nameE: string, nameK: string, nameImg: string }[] = [
        {
            "nameN": 8112,
            "nameE": "Electrocute",
            "nameK": "감전",
            "nameImg": "perk-images/Styles/Domination/Electrocute/Electrocute.png"
        },
        {
            "nameN": 8128,
            "nameE": "DarkHarvest",
            "nameK": "어둠의 수확",
            "nameImg": "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png"
        },
        {
            "nameN": 9923,
            "nameE": "HailOfBlades",
            "nameK": "칼날비",
            "nameImg": "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png"
        },
        {
            "nameN": 8126,
            "nameE": "CheapShot",
            "nameK": "비열한 한 방",
            "nameImg": "perk-images/Styles/Domination/CheapShot/CheapShot.png"
        },
        {
            "nameN": 8139,
            "nameE": "TasteOfBlood",
            "nameK": "피의 맛",
            "nameImg": "perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png"
        },
        {
            "nameN": 8143,
            "nameE": "SuddenImpact",
            "nameK": "돌발 일격",
            "nameImg": "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png"
        },
        {
            "nameN": 8136,
            "nameE": "ZombieWard",
            "nameK": "좀비 와드",
            "nameImg": "perk-images/Styles/Domination/ZombieWard/ZombieWard.png"
        },
        {
            "nameN": 8120,
            "nameE": "GhostPoro",
            "nameK": "유령 포로",
            "nameImg": "perk-images/Styles/Domination/GhostPoro/GhostPoro.png"
        },
        {
            "nameN": 8138,
            "nameE": "EyeballCollection",
            "nameK": "사냥의 증표",
            "nameImg": "perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png"
        },
        {
            "nameN": 8135,
            "nameE": "TreasureHunter",
            "nameK": "보물 사냥꾼",
            "nameImg": "perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png"
        },
        {
            "nameN": 8105,
            "nameE": "RelentlessHunter",
            "nameK": "끈질긴 사냥꾼",
            "nameImg": "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png"
        },
        {
            "nameN": 8106,
            "nameE": "UltimateHunter",
            "nameK": "궁극의 사냥꾼",
            "nameImg": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png"
        },
        {
            "nameN": 8351,
            "nameE": "GlacialAugment",
            "nameK": "빙결 강화",
            "nameImg": "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png"
        },
        {
            "nameN": 8360,
            "nameE": "UnsealedSpellbook",
            "nameK": "봉인 풀린 주문서",
            "nameImg": "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png"
        },
        {
            "nameN": 8369,
            "nameE": "FirstStrike",
            "nameK": "선제공격",
            "nameImg": "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png"
        },
        {
            "nameN": 8306,
            "nameE": "HextechFlashtraption",
            "nameK": "마법공학 점멸기",
            "nameImg": "perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png"
        },
        {
            "nameN": 8304,
            "nameE": "MagicalFootwear",
            "nameK": "마법의 신발",
            "nameImg": "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png"
        },
        {
            "nameN": 8321,
            "nameE": "CashBack",
            "nameK": "환급",
            "nameImg": "perk-images/Styles/Inspiration/CashBack/CashBack2.png"
        },
        {
            "nameN": 8313,
            "nameE": "PerfectTiming",
            "nameK": "삼중 물약",
            "nameImg": "perk-images/Styles/Inspiration/PerfectTiming/AlchemistCabinet.png"
        },
        {
            "nameN": 8352,
            "nameE": "TimeWarpTonic",
            "nameK": "시간 왜곡 물약",
            "nameImg": "perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png"
        },
        {
            "nameN": 8345,
            "nameE": "BiscuitDelivery",
            "nameK": "비스킷 배달",
            "nameImg": "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png"
        },
        {
            "nameN": 8347,
            "nameE": "CosmicInsight",
            "nameK": "우주적 통찰력",
            "nameImg": "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png"
        },
        {
            "nameN": 8410,
            "nameE": "ApproachVelocity",
            "nameK": "쾌속 접근",
            "nameImg": "perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png"
        },
        {
            "nameN": 8316,
            "nameE": "JackOfAllTrades",
            "nameK": "다재다능",
            "nameImg": "perk-images/Styles/Inspiration/JackOfAllTrades/JackofAllTrades2.png"
        },
        {
            "nameN": 8005,
            "nameE": "PressTheAttack",
            "nameK": "집중 공격",
            "nameImg": "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png"
        },
        {
            "nameN": 8021,
            "nameE": "FleetFootwork",
            "nameK": "기민한 발놀림",
            "nameImg": "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png"
        },
        {
            "nameN": 8010,
            "nameE": "Conqueror",
            "nameK": "정복자",
            "nameImg": "perk-images/Styles/Precision/Conqueror/Conqueror.png"
        },
        {
            "nameN": 9101,
            "nameE": "AbsorbLife",
            "nameK": "생명 흡수",
            "nameImg": "perk-images/Styles/Precision/AbsorbLife/AbsorbLife.png"
        },
        {
            "nameN": 9111,
            "nameE": "Triumph",
            "nameK": "승전보",
            "nameImg": "perk-images/Styles/Precision/Triumph.png"
        },
        {
            "nameN": 8009,
            "nameE": "PresenceOfMind",
            "nameK": "침착",
            "nameImg": "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png"
        },
        {
            "nameN": 9104,
            "nameE": "LegendAlacrity",
            "nameK": "전설: 민첩함",
            "nameImg": "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png"
        },
        {
            "nameN": 9105,
            "nameE": "LegendHaste",
            "nameK": "전설: 가속",
            "nameImg": "perk-images/Styles/Precision/LegendHaste/LegendHaste.png"
        },
        {
            "nameN": 9103,
            "nameE": "LegendBloodline",
            "nameK": "전설: 핏빛 길",
            "nameImg": "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png"
        },
        {
            "nameN": 8014,
            "nameE": "CoupDeGrace",
            "nameK": "최후의 일격",
            "nameImg": "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png"
        },
        {
            "nameN": 8017,
            "nameE": "CutDown",
            "nameK": "체력차 극복",
            "nameImg": "perk-images/Styles/Precision/CutDown/CutDown.png"
        },
        {
            "nameN": 8299,
            "nameE": "LastStand",
            "nameK": "최후의 저항",
            "nameImg": "perk-images/Styles/Sorcery/LastStand/LastStand.png"
        },
        {
            "nameN": 8437,
            "nameE": "GraspOfTheUndying",
            "nameK": "착취의 손아귀",
            "nameImg": "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png"
        },
        {
            "nameN": 8439,
            "nameE": "Aftershock",
            "nameK": "여진",
            "nameImg": "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png"
        },
        {
            "nameN": 8465,
            "nameE": "Guardian",
            "nameK": "수호자",
            "nameImg": "perk-images/Styles/Resolve/Guardian/Guardian.png"
        },
        {
            "nameN": 8446,
            "nameE": "Demolish",
            "nameK": "철거",
            "nameImg": "perk-images/Styles/Resolve/Demolish/Demolish.png"
        },
        {
            "nameN": 8463,
            "nameE": "FontOfLife",
            "nameK": "생명의 샘",
            "nameImg": "perk-images/Styles/Resolve/FontOfLife/FontOfLife.png"
        },
        {
            "nameN": 8401,
            "nameE": "ShieldBash",
            "nameK": "보호막 강타",
            "nameImg": "perk-images/Styles/Resolve/MirrorShell/MirrorShell.png"
        },
        {
            "nameN": 8429,
            "nameE": "Conditioning",
            "nameK": "사전 준비",
            "nameImg": "perk-images/Styles/Resolve/Conditioning/Conditioning.png"
        },
        {
            "nameN": 8444,
            "nameE": "SecondWind",
            "nameK": "재생의 바람",
            "nameImg": "perk-images/Styles/Resolve/SecondWind/SecondWind.png"
        },
        {
            "nameN": 8473,
            "nameE": "BonePlating",
            "nameK": "뼈 방패",
            "nameImg": "perk-images/Styles/Resolve/BonePlating/BonePlating.png"
        },
        {
            "nameN": 8451,
            "nameE": "Overgrowth",
            "nameK": "과잉성장",
            "nameImg": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png"
        },
        {
            "nameN": 8453,
            "nameE": "Revitalize",
            "nameK": "소생",
            "nameImg": "perk-images/Styles/Resolve/Revitalize/Revitalize.png"
        },
        {
            "nameN": 8242,
            "nameE": "Unflinching",
            "nameK": "불굴의 의지",
            "nameImg": "perk-images/Styles/Sorcery/Unflinching/Unflinching.png"
        },
        {
            "nameN": 8214,
            "nameE": "SummonAery",
            "nameK": "콩콩이 소환",
            "nameImg": "perk-images/Styles/Sorcery/SummonAery/SummonAery.png"
        },
        {
            "nameN": 8229,
            "nameE": "ArcaneComet",
            "nameK": "신비로운 유성",
            "nameImg": "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png"
        },
        {
            "nameN": 8230,
            "nameE": "PhaseRush",
            "nameK": "난입",
            "nameImg": "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png"
        },
        {
            "nameN": 8224,
            "nameE": "NullifyingOrb",
            "nameK": "무효화 구체",
            "nameImg": "perk-images/Styles/Sorcery/NullifyingOrb/Pokeshield.png"
        },
        {
            "nameN": 8226,
            "nameE": "ManaflowBand",
            "nameK": "마나순환 팔찌",
            "nameImg": "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png"
        },
        {
            "nameN": 8275,
            "nameE": "NimbusCloak",
            "nameK": "빛의 망토",
            "nameImg": "perk-images/Styles/Sorcery/NimbusCloak/6361.png"
        },
        {
            "nameN": 8210,
            "nameE": "Transcendence",
            "nameK": "깨달음",
            "nameImg": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png"
        },
        {
            "nameN": 8234,
            "nameE": "Celerity",
            "nameK": "기민함",
            "nameImg": "perk-images/Styles/Sorcery/Celerity/CelerityTemp.png"
        },
        {
            "nameN": 8233,
            "nameE": "AbsoluteFocus",
            "nameK": "절대 집중",
            "nameImg": "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png"
        },
        {
            "nameN": 8237,
            "nameE": "Scorch",
            "nameK": "주문 작열",
            "nameImg": "perk-images/Styles/Sorcery/Scorch/Scorch.png"
        },
        {
            "nameN": 8232,
            "nameE": "Waterwalking",
            "nameK": "물 위를 걷는 자",
            "nameImg": "perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png"
        },
        {
            "nameN": 8236,
            "nameE": "GatheringStorm",
            "nameK": "폭풍의 결집",
            "nameImg": "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png"
        }
    ]
    return runes
}

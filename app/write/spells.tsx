export const getSpells = () => {
    const spells: { value: string, label: string }[] = [
        { value: 'SummonerSmite', label: '강타' },
        { value: 'SummonerBarrier', label: '배리어' },
        { value: 'SummonerTeleport', label: '순간이동' },
        { value: 'SummonerHaste', label: '유체화' },
        { value: 'SummonerFlash', label: '점멸' },
        { value: 'SummonerDot', label: '점화' },
        { value: 'SummonerBoost', label: '정화' },
        { value: 'SummonerExhaust', label: '탈진' },
        { value: 'SummonerHeal', label: '회복' }
    ]
    return spells
}
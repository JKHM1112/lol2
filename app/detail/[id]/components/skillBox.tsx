import { championFull } from "@/app/data/championFull";
import Image from "next/image";

type SkillCounts = {
    [key: string]: number;
    Q: number;
    W: number;
    E: number;
};

export default function SkillBox({ skillOrder, chams }: any) {
    const getSkillImage = (skillSlot: number) => {
        const champion = Object.values(championFull.data).find((cham: any) => cham.id === chams[0] || cham.key === chams[0]);
        if (!champion) return '';
        const spell = champion.spells[skillSlot];
        return spell ? spell.image.full : '';
    };

    const skillQIMG = getSkillImage(0);
    const skillWIMG = getSkillImage(1);
    const skillEIMG = getSkillImage(2);
    const skillRIMG = getSkillImage(3);

    const getSkillImg = (skillCode: string) => (
        <Image className='rounded-md' alt={'spell'} src={`/spell/${skillCode}`} width={25} height={25} />
    );
    const getSkillImg2 = (skillCode: string) => (
        <Image className='rounded-md' alt={'spell'} src={`/${skillCode}.png`} width={25} height={25} />
    );

    const skillCounts: SkillCounts = { Q: 0, W: 0, E: 0 };
    const skillReachedFive: SkillCounts = { Q: -1, W: -1, E: -1 };

    skillOrder.forEach((skill: string, index: number) => {
        if (skill === 'Q' || skill === 'W' || skill === 'E') {
            skillCounts[skill]++;
            if (skillCounts[skill] === 5 && skillReachedFive[skill] === -1) {
                skillReachedFive[skill] = index;
            }
        }
    });

    const sortedSkills = ['Q', 'W', 'E'].sort((a, b) => {
        if (skillCounts[a] !== skillCounts[b]) {
            return skillCounts[b] - skillCounts[a];
        } else {
            return skillReachedFive[a] - skillReachedFive[b];
        }
    });

    return (
        <div>
            <div className="flex-wrap p-1">
                <div className="flex p-1 items-center space-x-2">
                    {getSkillImg(sortedSkills[0] === 'Q' ? skillQIMG : sortedSkills[0] === 'W' ? skillWIMG : skillEIMG)}
                    {sortedSkills[0]}
                    <Image className='rounded-md' alt={'item'} src={'/greater.png'} width={30} height={30}></Image>
                    {getSkillImg(sortedSkills[1] === 'Q' ? skillQIMG : sortedSkills[1] === 'W' ? skillWIMG : skillEIMG)}
                    {sortedSkills[1]}
                    <Image className='rounded-md' alt={'item'} src={'/greater.png'} width={30} height={30}></Image>
                    {getSkillImg(sortedSkills[2] === 'Q' ? skillQIMG : sortedSkills[2] === 'W' ? skillWIMG : skillEIMG)}
                    {sortedSkills[2]}
                </div>
                <div className="flex p-1 flex-wrap items-center space-x-2">
                    {skillOrder.map((skill: string, index: number) => (
                        <span key={index} className="">
                            {getSkillImg2(skill)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

}

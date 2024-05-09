// const ids = runes.flatMap(runeGroup =>
//     runeGroup.runes.map(rune => rune.name)
// );


const nameN = ["266", "103", "84", "166", "12", "32", "34", "1", "523", "22", "136", "268", "432", "200", "53", "63", "201", "233", "51", "164", "69", "31", "42", "122", "131", "119", "36", "245", "60", "28", "81", "9", "114", "105", "3", "41", "86", "150", "79", "104", "887", "120", "74", "910", "420", "39", "427", "40", "59", "24", "126", "202", "222", "145", "429", "43", "30", "38", "55", "10", "141", "85", "121", "203", "240", "96", "897", "7", "64", "89", "876", "127", "236", "117", "99", "54", "90", "57", "11", "902", "21", "62", "82", "25", "950", "267", "75", "111", "518", "76", "895", "56", "20", "2", "61", "516", "80", "78", "555", "246", "133", "497", "33", "421", "526", "888", "58", "107", "92", "68", "13", "360", "113", "235", "147", "875", "35", "98", "102", "27", "14", "15", "72", "901", "37", "16", "50", "517", "134", "223", "163", "91", "44", "17", "412", "18", "48", "23", "4", "29", "77", "6", "110", "67", "45", "161", "711", "254", "234", "112", "8", "106", "19", "498", "101", "5", "157", "777", "83", "350", "154", "238", "221", "115", "26", "142", "143"]
const nameE = ["Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "AurelionSol", "Azir", "Bard", "Belveth", "Blitzcrank", "Brand", "Braum", "Briar", "Caitlyn", "Camille", "Cassiopeia", "Chogath", "Corki", "Darius", "Diana", "Draven", "DrMundo", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Hwei", "Illaoi", "Irelia", "Ivern", "Janna", "JarvanIV", "Jax", "Jayce", "Jhin", "Jinx", "Kaisa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Khazix", "Kindred", "Kled", "KogMaw", "KSante", "Leblanc", "LeeSin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "MasterYi", "Milio", "MissFortune", "MonkeyKing", "Mordekaiser", "Morgana", "Naafiri", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "RekSai", "Rell", "Renata", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Smolder", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "TahmKench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "TwistedFate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Velkoz", "Vex", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Xayah", "Xerath", "XinZhao", "Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"]
const nameK = ["아트록스", "아리", "아칼리", "아크샨", "알리스타", "아무무", "애니비아", "애니", "아펠리오스", "애쉬", "아우렐리온 솔", "아지르", "바드", "벨베스", "블리츠크랭크", "브랜드", "브라움", "브라이어", "케이틀린", "카밀", "카시오페아", "초가스", "코르키", "다리우스", "다이 애나", "드레이븐", "문도 박사", "에코", "엘리스", "이블린", "이즈리얼", "피들스틱", "피오라", "피즈", "갈리오", "갱플랭크", "가렌", "나 르", "그라가스", "그레이브즈", "그웬", "헤카림", "하이머딩거", "흐웨이", "일라오이", "이렐리아", "아이번", "잔나", "자르반 4세", "잭스", "제이스", "진", "징크스", "카이사", "칼리스타", "카르마", "카서스", "카사딘", "카타리나", "케일", "케인", "케넨", "카직스", "킨드레드", "클레드", "코그모", "크산테", "르블랑", "리 신", "레오나", "릴리아", "리산드라", "루시안", "룰루", "럭스", "말파이트", "말자하", "마오카이", "마스터 이", "밀리오", "미스 포츈", "오공", "모데카이저", "모르가나", "나피리", "나미", "나서스", "노틸러스", "니코", "니달리", "닐라", "녹턴", "누누와 윌럼프", "올라프", "오리아나", "오른", "판테온", "뽀삐", "파이크", "키아나", "퀸", "라칸", "람머스", "렉사이", "렐", "레나타 글라스크", "레넥톤", "렝가", "리븐", "럼블", "라이즈", "사미라", "세주아니", "세나", "세라핀", "세트", "샤코", "쉔", "쉬바나", " 신지드", "사이온", "시비르", "스카너", "스몰더", "소나", "소라카", "스웨인", "사일러스", "신드라", "탐 켄치", "탈리야", "탈론", "타릭", "티모", "쓰레쉬", "트리스타나", "트런들", "트린다미어", "트위스티드 페이트", "트위치", "우디르", "우르곳", "바루스", "베인", "베이가", "벨코즈", "벡스", "바이", "비에고", "빅토르", "블라디미르", "볼리베어", "워윅", "자야", "제라스", "신 짜오", "야스오", "요네", "요릭", "유미", "자크", "제드", "제리", "직스", "질리언", "조이", "자이라"]


const runes = nameN.map((id, index) => ({
    nameN: nameN[index],
    nameE: nameE[index],
    nameK: nameK[index],
}));
// console.log(JSON.stringify(runes))
export default function data1() {
    return (
        <div>

        </div>
    )
}
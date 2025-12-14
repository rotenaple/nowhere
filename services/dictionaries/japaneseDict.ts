export interface JaComponent {
  kanji: string;
  kana: string;
  romaji: string;
  type: 'prefix' | 'direction' | 'nature' | 'civic' | 'number' | 'modifier' | 'root' | 'suffix';
  def: string; // New field for definition
  onReading?: string; // For Sino-Japanese compounds
  kunReading?: string; // For Native compounds
  rendaku?: { kana: string, romaji: string }; // The voiced version of this component
}

// ==========================================
// PREFIXES
// ==========================================
export const JA_PREFIXES: JaComponent[] = [
  // Size/Quantity
  { kanji: '大', kana: 'オオ', romaji: 'oo', type: 'prefix', def: 'large, great' },
  { kanji: '小', kana: 'コ', romaji: 'ko', type: 'prefix', def: 'small' },

  // Age/Newness
  { kanji: '新', kana: 'シン', romaji: 'shin', type: 'prefix', def: 'new' },
  { kanji: '古', kana: 'フル', romaji: 'furu', type: 'prefix', def: 'old' },

  // Position/Relative Location
  { kanji: '高', kana: 'タカ', romaji: 'taka', type: 'prefix', def: 'high, tall' },
  { kanji: '上', kana: 'カミ', romaji: 'kami', type: 'prefix', def: 'upper, ascended' },
  { kanji: '下', kana: 'シモ', romaji: 'shimo', type: 'prefix', def: 'lower, descended' },
  { kanji: '中', kana: 'ナカ', romaji: 'naka', type: 'prefix', def: 'middle, inside' },
  { kanji: '奥', kana: 'オク', romaji: 'oku', type: 'prefix', def: 'inner, deep, back' },
  { kanji: '口', kana: 'クチ', romaji: 'kuchi', type: 'prefix', def: 'mouth, opening, entrance' },

  // Status/Origin
  { kanji: '本', kana: 'ホン', romaji: 'hon', type: 'prefix', def: 'main, true' },
  { kanji: '元', kana: 'モト', romaji: 'moto', type: 'prefix', def: 'origin, former' },
];

// ==========================================
// DIRECTIONS
// ==========================================
export const JA_DIRECTIONS: JaComponent[] = [
  // Cardinal Directions
  { kanji: '北', kana: 'キタ', romaji: 'kita', type: 'direction', def: 'north' },
  { kanji: '南', kana: 'ミナミ', romaji: 'minami', type: 'direction', def: 'south' },
  { kanji: '東', kana: 'ヒガシ', romaji: 'higashi', type: 'direction', def: 'east' },
  { kanji: '西', kana: 'ニシ', romaji: 'nishi', type: 'direction', def: 'west' },

  // Relative Directions/Positions
  { kanji: '中', kana: 'ナカ', romaji: 'naka', type: 'direction', def: 'center, middle' },
  { kanji: '右', kana: 'ミギ', romaji: 'migi', type: 'direction', def: 'right' },
  { kanji: '左', kana: 'ヒダリ', romaji: 'hidari', type: 'direction', def: 'left' },
];

// ==========================================
// NUMBERS
// ==========================================
export const JA_NUMBERS: JaComponent[] = [
  { kanji: '一', kana: 'イチ', romaji: 'ichi', type: 'number', def: 'one' },
  { kanji: '二', kana: 'ニ', romaji: 'ni', type: 'number', def: 'two' },
  { kanji: '三', kana: 'サン', romaji: 'san', type: 'number', def: 'three' },
  { kanji: '四', kana: 'シ', romaji: 'shi', type: 'number', def: 'four' },
  { kanji: '五', kana: 'ゴ', romaji: 'go', type: 'number', def: 'five' },
  { kanji: '六', kana: 'ロク', romaji: 'roku', type: 'number', def: 'six' },
  { kanji: '七', kana: 'シチ', romaji: 'shichi', type: 'number', def: 'seven' },
  { kanji: '八', kana: 'ハチ', romaji: 'hachi', type: 'number', def: 'eight' },
  { kanji: '九', kana: 'キュウ', romaji: 'kyuu', type: 'number', def: 'nine' },
  { kanji: '十', kana: 'ジュウ', romaji: 'juu', type: 'number', def: 'ten' },
  { kanji: '百', kana: 'ヒャク', romaji: 'hyaku', type: 'number', def: 'hundred' },
  { kanji: '千', kana: 'セン', romaji: 'sen', type: 'number', def: 'thousand' },
  { kanji: '万', kana: 'マン', romaji: 'man', type: 'number', def: 'ten thousand' },
];

// ==========================================
// NATURE / ROOTS (Kun & On Mixed Pool - Wago Focused)
// ==========================================
export const JA_ROOTS: JaComponent[] = [
  // Topography - Mountains, Hills, Peaks
  { kanji: '山', kana: 'ヤマ', romaji: 'yama', type: 'nature', def: 'mountain' },
  { kanji: '岳', kana: 'タケ', romaji: 'take', type: 'nature', rendaku: { kana: 'ダケ', romaji: 'dake' }, def: 'peak, mountain' },
  { kanji: '峰', kana: 'ミネ', romaji: 'mine', type: 'nature', def: 'peak, summit' },
  { kanji: '岡', kana: 'オカ', romaji: 'oka', type: 'nature', def: 'hill' },
  { kanji: '坂', kana: 'サカ', romaji: 'saka', type: 'nature', rendaku: { kana: 'ザカ', romaji: 'zaka' }, def: 'slope, hill' },
  { kanji: '塚', kana: 'ツカ', romaji: 'tsuka', type: 'nature', rendaku: { kana: 'ヅカ', romaji: 'zuka' }, def: 'mound, hillock' },

  // Topography - Waterways, Bodies of Water, Coasts
  { kanji: '川', kana: 'カワ', romaji: 'kawa', type: 'nature', rendaku: { kana: 'ガワ', romaji: 'gawa' }, def: 'river' },
  { kanji: '谷', kana: 'タニ', romaji: 'tani', type: 'nature', rendaku: { kana: 'ダニ', romaji: 'dani' }, def: 'valley' },
  { kanji: '瀬', kana: 'セ', romaji: 'se', type: 'nature', rendaku: { kana: 'ゼ', romaji: 'ze' }, def: 'rapids, shallows' },
  { kanji: '滝', kana: 'タキ', romaji: 'taki', type: 'nature', rendaku: { kana: 'ダキ', romaji: 'daki' }, def: 'waterfall' },
  { kanji: '淵', kana: 'フチ', romaji: 'fuchi', type: 'nature', rendaku: { kana: 'ブチ', romaji: 'buchi' }, def: 'deep pool, abyss' },
  { kanji: '池', kana: 'イケ', romaji: 'ike', type: 'nature', def: 'pond' },
  { kanji: '沼', kana: 'ヌマ', romaji: 'numa', type: 'nature', def: 'swamp, marsh' },
  { kanji: '沢', kana: 'サワ', romaji: 'sawa', type: 'nature', rendaku: { kana: 'ザワ', romaji: 'zawa' }, def: 'swamp, marsh, clear stream' },
  { kanji: '泉', kana: 'イズミ', romaji: 'izumi', type: 'nature', def: 'spring, fountain' },
  { kanji: '湯', kana: 'ユ', romaji: 'yu', type: 'nature', def: 'hot water, hot spring' },
  { kanji: '井', kana: 'イ', romaji: 'i', type: 'nature', def: 'well' },
  { kanji: '島', kana: 'シマ', romaji: 'shima', type: 'nature', rendaku: { kana: 'ジマ', romaji: 'jima' }, def: 'island' },
  { kanji: '岬', kana: 'ミサキ', romaji: 'misaki', type: 'nature', def: 'cape' },
  { kanji: '浦', kana: 'ウラ', romaji: 'ura', type: 'nature', def: 'bay, cove' },
  { kanji: '江', kana: 'エ', romaji: 'e', type: 'nature', def: 'inlet, bay, river' },
  { kanji: '津', kana: 'ツ', romaji: 'tsu', type: 'nature', def: 'harbor, port' },
  { kanji: '港', kana: 'ミナト', romaji: 'minato', type: 'civic', def: 'harbor, port' },
  { kanji: '浜', kana: 'ハマ', romaji: 'hama', type: 'nature', def: 'beach, seacoast' },
  { kanji: '岸', kana: 'キシ', romaji: 'kishi', type: 'nature', rendaku: { kana: 'ギシ', romaji: 'gishi' }, def: 'bank, shore' },
  { kanji: '磯', kana: 'イソ', romaji: 'iso', type: 'nature', def: 'seashore, rocky beach' },
  { kanji: '潟', kana: 'カタ', romaji: 'kata', type: 'nature', rendaku: { kana: 'ガタ', romaji: 'gata' }, def: 'lagoon' },
  { kanji: '曽根', kana: 'ソネ', romaji: 'sone', type: 'nature', rendaku: { kana: 'ゾネ', romaji: 'zone' }, def: 'shoal, sandbar' },

  // Topography - Fields, Plains, Land Features
  { kanji: '田', kana: 'タ', romaji: 'ta', type: 'nature', rendaku: { kana: 'ダ', romaji: 'da' }, def: 'rice paddy' },
  { kanji: '野', kana: 'ノ', romaji: 'no', type: 'nature', def: 'field' },
  { kanji: '原', kana: 'ハラ', romaji: 'hara', type: 'nature', rendaku: { kana: 'バラ', romaji: 'bara' }, def: 'plain, field' },
  { kanji: '平', kana: 'タイラ', romaji: 'taira', type: 'nature', rendaku: { kana: 'ダイラ', romaji: 'daira' }, def: 'flat, level' },
  { kanji: '土', kana: 'ツチ', romaji: 'tsuchi', type: 'nature', def: 'earth, soil' },
  { kanji: '石', kana: 'イシ', romaji: 'ishi', type: 'nature', def: 'stone' },
  { kanji: '岩', kana: 'イワ', romaji: 'iwa', type: 'nature', def: 'rock' },
  { kanji: '砂', kana: 'スナ', romaji: 'suna', type: 'nature', rendaku: { kana: 'ズナ', romaji: 'zuna' }, def: 'sand' },
  { kanji: '根', kana: 'ネ', romaji: 'ne', type: 'nature', def: 'root, base' },
  { kanji: '尻', kana: 'シリ', romaji: 'shiri', type: 'nature', rendaku: { kana: 'ジリ', romaji: 'jiri' }, def: 'end, rear' },
  { kanji: '俣', kana: 'マタ', romaji: 'mata', type: 'nature', def: 'crotch, fork' },
  { kanji: '口', kana: 'クチ', romaji: 'kuchi', type: 'nature', rendaku: { kana: 'グチ', romaji: 'guchi' }, def: 'mouth, opening, entrance' },
  { kanji: '芝', kana: 'シバ', romaji: 'shiba', type: 'nature', def: 'lawn, turf' },
  { kanji: '霧', kana: 'キリ', romaji: 'kiri', type: 'nature', def: 'fog, mist' },

  // Trees / Flora
  { kanji: '森', kana: 'モリ', romaji: 'mori', type: 'nature', def: 'forest, woods' },
  { kanji: '林', kana: 'ハヤシ', romaji: 'hayashi', type: 'nature', rendaku: { kana: 'バヤシ', romaji: 'bayashi' }, def: 'woods, grove' },
  { kanji: '松', kana: 'マツ', romaji: 'matsu', type: 'nature', def: 'pine tree' },
  { kanji: '杉', kana: 'スギ', romaji: 'sugi', type: 'nature', def: 'cedar tree' },
  { kanji: '竹', kana: 'タケ', romaji: 'take', type: 'nature', rendaku: { kana: 'ダケ', romaji: 'dake' }, def: 'bamboo' },
  { kanji: '柏', kana: 'カシ', romaji: 'kashi', type: 'nature', rendaku: { kana: 'ガシ', romaji: 'gashi' }, def: 'oak tree' },
  { kanji: '楢', kana: 'ナラ', romaji: 'nara', type: 'nature', def: 'oak' },
  { kanji: '柳', kana: 'ヤナギ', romaji: 'yanagi', type: 'nature', def: 'willow tree' },
  { kanji: '梅', kana: 'ウメ', romaji: 'ume', type: 'nature', def: 'plum tree' },
  { kanji: '桜', kana: 'サクラ', romaji: 'sakura', type: 'nature', rendaku: { kana: 'ザクラ', romaji: 'zakura' }, def: 'cherry blossom' },
  { kanji: '椿', kana: 'ツバキ', romaji: 'tsubaki', type: 'nature', def: 'camellia' },
  { kanji: '藤', kana: 'フジ', romaji: 'fuji', type: 'nature', def: 'wisteria' },
  { kanji: '花', kana: 'ハナ', romaji: 'hana', type: 'nature', rendaku: { kana: 'バナ', romaji: 'bana' }, def: 'flower' },
  { kanji: '菊', kana: 'キク', romaji: 'kiku', type: 'nature', def: 'chrysanthemum' },
  { kanji: '蓮', kana: 'ハス', romaji: 'hasu', type: 'nature', def: 'lotus' },
  { kanji: '草', kana: 'クサ', romaji: 'kusa', type: 'nature', rendaku: { kana: 'グサ', romaji: 'gusa' }, def: 'grass' },
  { kanji: '葉', kana: 'ハ', romaji: 'ha', type: 'nature', rendaku: { kana: 'バ', romaji: 'ba' }, def: 'leaf' },
  { kanji: '稲', kana: 'イネ', romaji: 'ine', type: 'nature', def: 'rice plant' },
  { kanji: '穂', kana: 'ホ', romaji: 'ho', type: 'nature', rendaku: { kana: 'ボ', romaji: 'bo' }, def: 'ear (of grain)' },
  { kanji: '栗', kana: 'クリ', romaji: 'kuri', type: 'nature', rendaku: { kana: 'グリ', romaji: 'guri' }, def: 'chestnut tree' },
  { kanji: '柿', kana: 'カキ', romaji: 'kaki', type: 'nature', def: 'persimmon tree' },
  { kanji: '梨', kana: 'ナシ', romaji: 'nashi', type: 'nature', def: 'pear tree' },
  { kanji: '桃', kana: 'モモ', romaji: 'momo', type: 'nature', def: 'peach tree' },

  // Fauna
  { kanji: '熊', kana: 'クマ', romaji: 'kuma', type: 'nature', rendaku: { kana: 'グマ', romaji: 'guma' }, def: 'bear' },
  { kanji: '鹿', kana: 'シカ', romaji: 'shika', type: 'nature', def: 'deer' },
  { kanji: '猿', kana: 'サル', romaji: 'saru', type: 'nature', rendaku: { kana: 'ザル', romaji: 'zaru' }, def: 'monkey' },
  { kanji: '馬', kana: 'ウマ', romaji: 'uma', type: 'nature', def: 'horse' },
  { kanji: '牛', kana: 'ウシ', romaji: 'ushi', type: 'nature', def: 'cow, bull' },
  { kanji: '鳥', kana: 'トリ', romaji: 'tori', type: 'nature', rendaku: { kana: 'ドリ', romaji: 'dori' }, def: 'bird' },
  { kanji: '鶴', kana: 'ツル', romaji: 'tsuru', type: 'nature', rendaku: { kana: 'ヅル', romaji: 'zuru' }, def: 'crane' },
  { kanji: '鷹', kana: 'タカ', romaji: 'taka', type: 'nature', rendaku: { kana: 'ダカ', romaji: 'daka' }, def: 'hawk, falcon' },
  { kanji: '鷲', kana: 'ワシ', romaji: 'washi', type: 'nature', def: 'eagle' },
  { kanji: '羽', kana: 'ハネ', romaji: 'hane', type: 'nature', rendaku: { kana: 'バネ', romaji: 'bane' }, def: 'feather, wing' },
  { kanji: '亀', kana: 'カメ', romaji: 'kame', type: 'nature', rendaku: { kana: 'ガメ', romaji: 'game' }, def: 'turtle' },
  { kanji: '貝', kana: 'カイ', romaji: 'kai', type: 'nature', rendaku: { kana: 'ガイ', romaji: 'gai' }, def: 'shellfish' },
  { kanji: '竜', kana: 'タツ', romaji: 'tatsu', type: 'nature', def: 'dragon' },

  // Elements / Celestial
  { kanji: '日', kana: 'ヒ', romaji: 'hi', type: 'nature', rendaku: { kana: 'ビ', romaji: 'bi' }, def: 'sun, day' },
  { kanji: '月', kana: 'ツキ', romaji: 'tsuki', type: 'nature', rendaku: { kana: 'ヅキ', romaji: 'zuki' }, def: 'moon, month' },
  { kanji: '星', kana: 'ホシ', romaji: 'hoshi', type: 'nature', rendaku: { kana: 'ボシ', romaji: 'boshi' }, def: 'star' },
  { kanji: '空', kana: 'ソラ', romaji: 'sora', type: 'nature', rendaku: { kana: 'ゾラ', romaji: 'zora' }, def: 'sky' },
  { kanji: '雲', kana: 'クモ', romaji: 'kumo', type: 'nature', rendaku: { kana: 'グモ', romaji: 'gumo' }, def: 'cloud' },
  { kanji: '風', kana: 'カゼ', romaji: 'kaze', type: 'nature', def: 'wind' },
  { kanji: '雨', kana: 'アメ', romaji: 'ame', type: 'nature', def: 'rain' },
  { kanji: '雪', kana: 'ユキ', romaji: 'yuki', type: 'nature', def: 'snow' },
  { kanji: '光', kana: 'ヒカリ', romaji: 'hikari', type: 'nature', def: 'light' },
  { kanji: '影', kana: 'カゲ', romaji: 'kage', type: 'nature', def: 'shadow' },

  // Civic / Man-made Structures & Concepts
  { kanji: '宮', kana: 'ミヤ', romaji: 'miya', type: 'civic', def: 'shrine, palace' },
  { kanji: '寺', kana: 'テラ', romaji: 'tera', type: 'civic', rendaku: { kana: 'デラ', romaji: 'dera' }, def: 'temple' },
  { kanji: '橋', kana: 'ハシ', romaji: 'hashi', type: 'civic', rendaku: { kana: 'バシ', romaji: 'bashi' }, def: 'bridge' },
  { kanji: '館', kana: 'タテ', romaji: 'tate', type: 'civic', rendaku: { kana: 'ダテ', romaji: 'date' }, def: 'mansion, palace' },
  { kanji: '戸', kana: 'ト', romaji: 'to', type: 'civic', rendaku: { kana: 'ド', romaji: 'do' }, def: 'door, family' },
  { kanji: '倉', kana: 'クラ', romaji: 'kura', type: 'civic', rendaku: { kana: 'グラ', romaji: 'gura' }, def: 'warehouse, storehouse' },
  { kanji: '垣', kana: 'カキ', romaji: 'kaki', type: 'civic', rendaku: { kana: 'ガキ', romaji: 'gaki' }, def: 'fence' },
  { kanji: '堀', kana: 'ホリ', romaji: 'hori', type: 'civic', rendaku: { kana: 'ボリ', romaji: 'bori' }, def: 'moat, canal' },
  { kanji: '関', kana: 'セキ', romaji: 'seki', type: 'civic', rendaku: { kana: 'ゼキ', romaji: 'zeki' }, def: 'barrier, gate' },
  { kanji: '道', kana: 'ミチ', romaji: 'michi', type: 'civic', def: 'road, way' },
  { kanji: '町', kana: 'マチ', romaji: 'machi', type: 'civic', def: 'town, street' },
  { kanji: '村', kana: 'ムラ', romaji: 'mura', type: 'civic', def: 'village' },
  { kanji: '里', kana: 'サト', romaji: 'sato', type: 'civic', rendaku: { kana: 'ザト', romaji: 'zato' }, def: 'hometown, village' },
  { kanji: '都', kana: 'ミヤコ', romaji: 'miyako', type: 'civic', def: 'capital, metropolis' },
  { kanji: '社', kana: 'ヤシロ', romaji: 'yashiro', type: 'civic', def: 'shintō shrine' },
  { kanji: '庄', kana: 'ショウ', romaji: 'shou', type: 'civic', def: 'manor, estate' },
  { kanji: '部', kana: 'ベ', romaji: 'be', type: 'civic', def: 'section, part' },
  { kanji: '隅', kana: 'スミ', romaji: 'sumi', type: 'civic', rendaku: { kana: 'ズミ', romaji: 'zumi' }, def: 'corner' },
  { kanji: '越', kana: 'コシ', romaji: 'koshi', type: 'civic', rendaku: { kana: 'ゴシ', romaji: 'goshi' }, def: 'crossing, beyond' },
  { kanji: '縄', kana: 'ナワ', romaji: 'nawa', type: 'civic', def: 'rope, cord' },
  { kanji: '船', kana: 'フネ', romaji: 'fune', type: 'civic', rendaku: { kana: 'ブネ', romaji: 'bune' }, def: 'ship, boat' },
  { kanji: '板', kana: 'イタ', romaji: 'ita', type: 'civic', def: 'board, plank' },
  { kanji: '鎌', kana: 'カマ', romaji: 'kama', type: 'civic', rendaku: { kana: 'ガマ', romaji: 'gama' }, def: 'sickle' },
  { kanji: '鍛冶', kana: 'カジ', romaji: 'kaji', type: 'civic', rendaku: { kana: 'ガジ', romaji: 'gaji' }, def: 'blacksmith' },
  { kanji: '紙', kana: 'カミ', romaji: 'kami', type: 'civic', rendaku: { kana: 'ガミ', romaji: 'gami' }, def: 'paper' },
  { kanji: '金', kana: 'カネ', romaji: 'kane', type: 'civic', rendaku: { kana: 'ガネ', romaji: 'gane' }, def: 'gold, money' },
  { kanji: '久保', kana: 'クボ', romaji: 'kubo', type: 'civic', rendaku: { kana: 'グボ', romaji: 'gubo' }, def: 'long preservation' },
];

// ==========================================
// MODIFIERS (Colors, Adjectives)
// ==========================================
export const JA_MODIFIERS: JaComponent[] = [
  // Colors
  { kanji: '赤', kana: 'アカ', romaji: 'aka', type: 'modifier', def: 'red' },
  { kanji: '青', kana: 'アオ', romaji: 'ao', type: 'modifier', def: 'blue, green' },
  { kanji: '白', kana: 'シロ', romaji: 'shiro', type: 'modifier', def: 'white' },
  { kanji: '黒', kana: 'クロ', romaji: 'kuro', type: 'modifier', def: 'black' },
  { kanji: '黄', kana: 'キ', romaji: 'ki', type: 'modifier', def: 'yellow' },
  { kanji: '緑', kana: 'ミドリ', romaji: 'midori', type: 'modifier', def: 'green' },
  { kanji: '水', kana: 'ミズ', romaji: 'mizu', type: 'modifier', def: 'water' }, // Can be a color (light blue)

  // Size / Dimension
  { kanji: '長', kana: 'ナガ', romaji: 'naga', type: 'modifier', def: 'long' },
  { kanji: '広', kana: 'ヒロ', romaji: 'hiro', type: 'modifier', def: 'wide, broad' },
  { kanji: '細', kana: 'ホソ', romaji: 'hoso', type: 'modifier', def: 'thin, narrow' },
  { kanji: '大', kana: 'オオ', romaji: 'oo', type: 'modifier', def: 'large, great' },
  { kanji: '小', kana: 'コ', romaji: 'ko', type: 'modifier', def: 'small' },
  { kanji: '高', kana: 'タカ', romaji: 'taka', type: 'modifier', def: 'high, tall' },
  { kanji: '浅', kana: 'アサ', romaji: 'asa', type: 'modifier', def: 'shallow' },
  { kanji: '深', kana: 'フカ', romaji: 'fuka', type: 'modifier', def: 'deep' },
  { kanji: '平', kana: 'ヒラ', romaji: 'hira', type: 'modifier', def: 'flat, level' },
  { kanji: '丸', kana: 'マル', romaji: 'maru', type: 'modifier', def: 'round' },
  { kanji: '横', kana: 'ヨコ', romaji: 'yoko', type: 'modifier', def: 'side, horizontal' },

  // Position / Orientation
  { kanji: '内', kana: 'ウチ', romaji: 'uchi', type: 'modifier', def: 'inside, inner' },
  { kanji: '外', kana: 'ソト', romaji: 'soto', type: 'modifier', def: 'outside, outer' },
  { kanji: '前', kana: 'マエ', romaji: 'mae', type: 'modifier', def: 'front, before' },
  { kanji: '奥', kana: 'オク', romaji: 'oku', type: 'modifier', def: 'inner, deep, back' },
  { kanji: '上', kana: 'カミ', romaji: 'kami', type: 'modifier', def: 'upper, ascended' },
  { kanji: '下', kana: 'シモ', romaji: 'shimo', type: 'modifier', def: 'lower, descended' },

  // Qualities / States
  { kanji: '新', kana: 'シン', romaji: 'shin', type: 'modifier', def: 'new' },
  { kanji: '古', kana: 'フル', romaji: 'furu', type: 'modifier', def: 'old' },
  { kanji: '元', kana: 'モト', romaji: 'moto', type: 'modifier', def: 'origin, former' },
  { kanji: '荒', kana: 'アラ', romaji: 'ara', type: 'modifier', def: 'wild, rough' },
  { kanji: '若', kana: 'ワカ', romaji: 'waka', type: 'modifier', def: 'young' },
  { kanji: '早', kana: 'ハヤ', romaji: 'haya', type: 'modifier', def: 'early, fast' },
  { kanji: '常', kana: 'ツネ', romaji: 'tsune', type: 'modifier', def: 'ordinary, constant' },
  { kanji: '清', kana: 'キヨ', romaji: 'kiyo', type: 'modifier', def: 'pure, clear' },
  { kanji: '美', kana: 'ミ', romaji: 'mi', type: 'modifier', def: 'beautiful' },
  { kanji: '岩', kana: 'イワ', romaji: 'iwa', type: 'modifier', def: 'rock' },
  { kanji: '篠', kana: 'シノ', romaji: 'shino', type: 'modifier', def: 'dwarf bamboo' },

  // Auspicious / Favorable
  { kanji: '豊', kana: 'トヨ', romaji: 'toyo', type: 'modifier', def: 'abundant, rich' },
  { kanji: '福', kana: 'フク', romaji: 'fuku', type: 'modifier', def: 'good fortune, blessing' },
  { kanji: '吉', kana: 'ヨシ', romaji: 'yoshi', type: 'modifier', def: 'good luck, auspicious' },
  { kanji: '安', kana: 'ヤス', romaji: 'yasu', type: 'modifier', def: 'peace, cheap' },
  { kanji: '勝', kana: 'カツ', romaji: 'katsu', type: 'modifier', def: 'victory, superior' },
  { kanji: '玉', kana: 'タマ', romaji: 'tama', type: 'modifier', def: 'jewel, ball' },
  { kanji: '駒', kana: 'コマ', romaji: 'koma', type: 'modifier', def: 'pony, chess piece' },
  { kanji: '守', kana: 'モリ', romaji: 'mori', type: 'modifier', def: 'guard, protect' },
  { kanji: '住', kana: 'スミ', romaji: 'sumi', type: 'modifier', def: 'dwell, live' },
];

// ==========================================
// ON-YOMI COMPONENTS (Sino-Japanese)
// ==========================================
export const JA_ON_COMPONENTS: JaComponent[] = [
  // Geographic / Nature (On-yomi)
  { kanji: '北', kana: 'ホク', romaji: 'hoku', type: 'root', def: 'north' },
  { kanji: '南', kana: 'ナン', romaji: 'nan', type: 'root', def: 'south' },
  { kanji: '東', kana: 'トウ', romaji: 'tou', type: 'root', def: 'east' },
  { kanji: '西', kana: 'サイ', romaji: 'sai', type: 'root', def: 'west' },
  { kanji: '山', kana: 'サン', romaji: 'san', type: 'nature', def: 'mountain' },
  { kanji: '川', kana: 'セン', romaji: 'sen', type: 'nature', def: 'river' },
  { kanji: '谷', kana: 'コク', romaji: 'koku', type: 'nature', def: 'valley' },
  { kanji: '原', kana: 'ゲン', romaji: 'gen', type: 'nature', def: 'plain, field' },
  { kanji: '野', kana: 'ヤ', romaji: 'ya', type: 'nature', def: 'field' },
  { kanji: '島', kana: 'トウ', romaji: 'tou', type: 'nature', def: 'island' },
  { kanji: '海', kana: 'カイ', romaji: 'kai', type: 'nature', def: 'sea, ocean' },
  { kanji: '湾', kana: 'ワン', romaji: 'wan', type: 'nature', def: 'bay, gulf' },
  { kanji: '湖', kana: 'コ', romaji: 'ko', type: 'nature', def: 'lake' },
  { kanji: '沼', kana: 'ショウ', romaji: 'shou', type: 'nature', def: 'swamp, marsh' },
  { kanji: '石', kana: 'セキ', romaji: 'seki', type: 'nature', def: 'stone' },
  { kanji: '岩', kana: 'ガン', romaji: 'gan', type: 'nature', def: 'rock' },
  { kanji: '土', kana: 'ド', romaji: 'do', type: 'nature', def: 'earth, soil' },
  { kanji: '林', kana: 'リン', romaji: 'rin', type: 'nature', def: 'woods, grove' },
  { kanji: '森', kana: 'シン', romaji: 'shin', type: 'nature', def: 'forest, woods' },

  // Elements / Celestial (On-yomi)
  { kanji: '天', kana: 'テン', romaji: 'ten', type: 'nature', def: 'heaven, sky' },
  { kanji: '地', kana: 'チ', romaji: 'chi', type: 'nature', def: 'earth, ground' },
  { kanji: '空', kana: 'クウ', romaji: 'kuu', type: 'nature', def: 'sky, empty' },
  { kanji: '風', kana: 'フウ', romaji: 'fuu', type: 'nature', def: 'wind' },
  { kanji: '雲', kana: 'ウン', romaji: 'un', type: 'nature', def: 'cloud' },
  { kanji: '雨', kana: 'ウ', romaji: 'u', type: 'nature', def: 'rain' },
  { kanji: '雪', kana: 'セツ', romaji: 'setsu', type: 'nature', def: 'snow' },
  { kanji: '光', kana: 'コウ', romaji: 'kou', type: 'nature', def: 'light' },
  { kanji: '影', kana: 'エイ', romaji: 'ei', type: 'nature', def: 'shadow' },
  { kanji: '水', kana: 'スイ', romaji: 'sui', type: 'nature', def: 'water' },
  { kanji: '火', kana: 'カ', romaji: 'ka', type: 'nature', def: 'fire' },
  { kanji: '木', kana: 'モク', romaji: 'moku', type: 'nature', def: 'tree, wood' },
  { kanji: '金', kana: 'キン', romaji: 'kin', type: 'nature', def: 'gold, metal' },

  // Flora / Fauna (On-yomi)
  { kanji: '花', kana: 'カ', romaji: 'ka', type: 'nature', def: 'flower' },
  { kanji: '草', kana: 'ソウ', romaji: 'sou', type: 'nature', def: 'grass' },
  { kanji: '葉', kana: 'ヨウ', romaji: 'you', type: 'nature', def: 'leaf' },
  { kanji: '根', kana: 'コン', romaji: 'kon', type: 'nature', def: 'root' },
  { kanji: '桜', kana: 'オウ', romaji: 'ou', type: 'nature', def: 'cherry blossom' },
  { kanji: '松', kana: 'ショウ', romaji: 'shou', type: 'nature', def: 'pine tree' },
  { kanji: '竹', kana: 'チク', romaji: 'chiku', type: 'nature', def: 'bamboo' },
  { kanji: '梅', kana: 'バイ', romaji: 'bai', type: 'nature', def: 'plum tree' },
  { kanji: '竜', kana: 'リュウ', romaji: 'ryuu', type: 'nature', def: 'dragon' },
  { kanji: '虎', kana: 'コ', romaji: 'ko', type: 'nature', def: 'tiger' },
  { kanji: '鳳', kana: 'ホウ', romaji: 'hou', type: 'nature', def: 'phoenix' },

  // Modifier / Adjective (On-yomi)
  { kanji: '新', kana: 'シン', romaji: 'shin', type: 'modifier', def: 'new' },
  { kanji: '古', kana: 'コ', romaji: 'ko', type: 'modifier', def: 'old' },
  { kanji: '大', kana: 'ダイ', romaji: 'dai', type: 'modifier', def: 'large, great' },
  { kanji: '小', kana: 'ショウ', romaji: 'shou', type: 'modifier', def: 'small' },
  { kanji: '高', kana: 'コウ', romaji: 'kou', type: 'modifier', def: 'high, tall' },
  { kanji: '低', kana: 'テイ', romaji: 'tei', type: 'modifier', def: 'low' },
  { kanji: '長', kana: 'チョウ', romaji: 'chou', type: 'modifier', def: 'long' },
  { kanji: '短', kana: 'タン', romaji: 'tan', type: 'modifier', def: 'short' },
  { kanji: '広', kana: 'コウ', romaji: 'kou', type: 'modifier', def: 'wide, broad' },
  { kanji: '遠', kana: 'エン', romaji: 'en', type: 'modifier', def: 'far' },
  { kanji: '近', kana: 'キン', romaji: 'kin', type: 'modifier', def: 'near' },
  { kanji: '今', kana: 'コン', romaji: 'kon', type: 'modifier', def: 'now, present' },
  { kanji: '明', kana: 'メイ', romaji: 'mei', type: 'modifier', def: 'bright, clear' },
  { kanji: '暗', kana: 'アン', romaji: 'an', type: 'modifier', def: 'dark' },
  { kanji: '真', kana: 'シン', romaji: 'shin', type: 'modifier', def: 'true, real' },
  { kanji: '全', kana: 'ゼン', romaji: 'zen', type: 'modifier', def: 'all, whole' },
  { kanji: '平', kana: 'ヘイ', romaji: 'hei', type: 'modifier', def: 'flat, peace' },
  { kanji: '安', kana: 'アン', romaji: 'an', type: 'modifier', def: 'peace, cheap' },
  { kanji: '正', kana: 'セイ', romaji: 'sei', type: 'modifier', def: 'correct, justice' },
  { kanji: '優', kana: 'ユウ', romaji: 'yuu', type: 'modifier', def: 'gentle, superior' },
  { kanji: '良', kana: 'リョウ', romaji: 'ryou', type: 'modifier', def: 'good, pleasing' },
  { kanji: '嘉', kana: 'カ', romaji: 'ka', type: 'modifier', def: 'excellent, auspicious' },
  { kanji: '陽', kana: 'ヨウ', romaji: 'you', type: 'modifier', def: 'sunshine, positive' },
  { kanji: '陰', kana: 'イン', romaji: 'in', type: 'modifier', def: 'shade, negative' },
  { kanji: '勝', kana: 'ショウ', romaji: 'shou', type: 'modifier', def: 'victory' },
  { kanji: '福', kana: 'フク', romaji: 'fuku', type: 'modifier', def: 'good fortune, blessing' },
  { kanji: '徳', kana: 'トク', romaji: 'toku', type: 'modifier', def: 'virtue' },
  { kanji: '寿', kana: 'ジュ', romaji: 'ju', type: 'modifier', def: 'longevity, congratulations' },
  { kanji: '吉', kana: 'キチ', romaji: 'kichi', type: 'modifier', def: 'good luck, auspicious' },
  { kanji: '豊', kana: 'ホウ', romaji: 'hou', type: 'modifier', def: 'abundant, rich' },
  { kanji: '栄', kana: 'エイ', romaji: 'ei', type: 'modifier', def: 'prosperity, glory' },
  { kanji: '華', kana: 'カ', romaji: 'ka', type: 'modifier', def: 'splendor, flower' },
  { kanji: '喜', kana: 'キ', romaji: 'ki', type: 'modifier', def: 'rejoice, pleasure' },
  { kanji: '幸', kana: 'コウ', romaji: 'kou', type: 'modifier', def: 'happiness, fortune' },
  { kanji: '清', kana: 'セイ', romaji: 'sei', type: 'modifier', def: 'pure, clear' },
  { kanji: '純', kana: 'ジュン', romaji: 'jun', type: 'modifier', def: 'pure, innocent' },
  { kanji: '誠', kana: 'セイ', romaji: 'sei', type: 'modifier', def: 'sincerity, truth' },
  { kanji: '紅', kana: 'コウ', romaji: 'kou', type: 'modifier', def: 'crimson, red' },
  { kanji: '白', kana: 'ハク', romaji: 'haku', type: 'root', def: 'white' },
  { kanji: '黒', kana: 'コク', romaji: 'koku', type: 'root', def: 'black' },
  { kanji: '赤', kana: 'セキ', romaji: 'seki', type: 'root', def: 'red' },
  { kanji: '青', kana: 'セイ', romaji: 'sei', type: 'root', def: 'blue, green' },
  { kanji: '黄', kana: 'オウ', romaji: 'ou', type: 'root', def: 'yellow' },
  { kanji: '緑', kana: 'リョク', romaji: 'ryoku', type: 'root', def: 'green' },
  { kanji: '紫', kana: 'シ', romaji: 'shi', type: 'root', def: 'purple' },
  { kanji: '玉', kana: 'ギョク', romaji: 'gyoku', type: 'nature', def: 'jewel, gem' },
  { kanji: '宝', kana: 'ホウ', romaji: 'hou', type: 'root', def: 'treasure' },

  // Civic / Man-made Locations (On-yomi suffix type usage)
  { kanji: '都', kana: 'ト', romaji: 'to', type: 'civic', def: 'metropolis, capital' },
  { kanji: '京', kana: 'キョウ', romaji: 'kyou', type: 'civic', def: 'capital' },
  { kanji: '市', kana: 'シ', romaji: 'shi', type: 'civic', def: 'city' },
  { kanji: '町', kana: 'チョウ', romaji: 'chou', type: 'civic', def: 'town, street' },
  { kanji: '村', kana: 'ソン', romaji: 'son', type: 'civic', def: 'village' },
  { kanji: '港', kana: 'コウ', romaji: 'kou', type: 'civic', def: 'harbor, port' },
  { kanji: '城', kana: 'ジョウ', romaji: 'jou', type: 'civic', def: 'castle' },
  { kanji: '宮', kana: 'グウ', romaji: 'guu', type: 'civic', def: 'shrine, palace' },
  { kanji: '神', kana: 'ジン', romaji: 'jin', type: 'civic', def: 'god, spirit' },
  { kanji: '寺', kana: 'ジ', romaji: 'ji', type: 'civic', def: 'temple' },
  { kanji: '院', kana: 'イン', romaji: 'in', type: 'civic', def: 'institution, temple' },
  { kanji: '館', kana: 'カン', romaji: 'kan', type: 'civic', def: 'mansion, hall' },
  { kanji: '堂', kana: 'ドウ', romaji: 'dou', type: 'civic', def: 'hall, temple' },
  { kanji: '社', kana: 'シャ', romaji: 'sha', type: 'civic', def: 'company, shrine' },
  { kanji: '家', kana: 'カ', romaji: 'ka', type: 'civic', def: 'house, family' },
  { kanji: '所', kana: 'ショ', romaji: 'sho', type: 'civic', def: 'place, extent' },
  { kanji: '場', kana: 'ジョウ', romaji: 'jou', type: 'civic', def: 'place, location' },
  { kanji: '店', kana: 'テン', romaji: 'ten', type: 'civic', def: 'shop, store' },
  { kanji: '屋', kana: 'ヤ', romaji: 'ya', type: 'civic', def: 'shop, roof' },
  { kanji: '駅', kana: 'エキ', romaji: 'eki', type: 'civic', def: 'station' },
  { kanji: '道', kana: 'ドウ', romaji: 'dou', type: 'civic', def: 'road, way' },
  { kanji: '路', kana: 'ロ', romaji: 'ro', type: 'civic', def: 'road, path' },
  { kanji: '線', kana: 'セン', romaji: 'sen', type: 'civic', def: 'line' },
  { kanji: '門', kana: 'モン', romaji: 'mon', type: 'civic', def: 'gate' },
  { kanji: '橋', kana: 'キョウ', romaji: 'kyou', type: 'civic', def: 'bridge' },
  { kanji: '園', kana: 'エン', romaji: 'en', type: 'civic', def: 'garden, park' },
  { kanji: '校', kana: 'コウ', romaji: 'kou', type: 'civic', def: 'school' },
  { kanji: '学', kana: 'ガク', romaji: 'gaku', type: 'civic', def: 'study, learning' },
  { kanji: '区', kana: 'ク', romaji: 'ku', type: 'civic', def: 'ward, district' },
  { kanji: '郡', kana: 'グン', romaji: 'gun', type: 'civic', def: 'district, county' },
  { kanji: '県', kana: 'ケン', romaji: 'ken', type: 'civic', def: 'prefecture' },
  { kanji: '府', kana: 'フ', romaji: 'fu', type: 'civic', def: 'administrative district' },
  { kanji: '州', kana: 'シュウ', romaji: 'shuu', type: 'civic', def: 'state, province' },
  { kanji: '国', kana: 'コク', romaji: 'koku', type: 'civic', def: 'country' },

  // Numbers (On-yomi)
  { kanji: '一', kana: 'イチ', romaji: 'ichi', type: 'number', def: 'one' },
  { kanji: '二', kana: 'ニ', romaji: 'ni', type: 'number', def: 'two' },
  { kanji: '三', kana: 'サン', romaji: 'san', type: 'number', def: 'three' },
  { kanji: '四', kana: 'シ', romaji: 'shi', type: 'number', def: 'four' },
  { kanji: '五', kana: 'ゴ', romaji: 'go', type: 'number', def: 'five' },
  { kanji: '六', kana: 'ロク', romaji: 'roku', type: 'number', def: 'six' },
  { kanji: '七', kana: 'シチ', romaji: 'shichi', type: 'number', def: 'seven' },
  { kanji: '八', kana: 'ハチ', romaji: 'hachi', type: 'number', def: 'eight' },
  { kanji: '九', kana: 'キュウ', romaji: 'kyuu', type: 'number', def: 'nine' },
  { kanji: '十', kana: 'ジュウ', romaji: 'juu', type: 'number', def: 'ten' },
  { kanji: '百', kana: 'ヒャク', romaji: 'hyaku', type: 'number', def: 'hundred' },
  { kanji: '千', kana: 'セン', romaji: 'sen', type: 'number', def: 'thousand' },
  { kanji: '万', kana: 'マン', romaji: 'man', type: 'number', def: 'ten thousand' },
];

export const JA_GA_SUFFIXES: JaComponent[] = [
  // Geographic Features (Land)
  { kanji: '原', kana: 'ハラ', romaji: 'hara', type: 'suffix', def: 'plain, field' },
  { kanji: '丘', kana: 'オカ', romaji: 'oka', type: 'suffix', def: 'hill' },
  { kanji: '岳', kana: 'タケ', romaji: 'take', type: 'suffix', def: 'peak, mountain' },
  { kanji: '峰', kana: 'ミネ', romaji: 'mine', type: 'suffix', def: 'peak, summit' },
  { kanji: '根', kana: 'ネ', romaji: 'ne', type: 'suffix', def: 'root, base' },
  { kanji: '台', kana: 'ダイ', romaji: 'dai', type: 'suffix', def: 'platform, stand' },

  // Geographic Features (Water/Coast)
  { kanji: '崎', kana: 'サキ', romaji: 'saki', type: 'suffix', def: 'cape, peninsula' },
  { kanji: '谷', kana: 'ヤ', romaji: 'ya', type: 'suffix', def: 'valley' },
  { kanji: '浦', kana: 'ウラ', romaji: 'ura', type: 'suffix', def: 'bay, cove' },
  { kanji: '浜', kana: 'ハマ', romaji: 'hama', type: 'suffix', def: 'beach, seacoast' },
  { kanji: '沢', kana: 'サワ', romaji: 'sawa', type: 'suffix', def: 'swamp, marsh, clear stream' },
  { kanji: '島', kana: 'シマ', romaji: 'shima', type: 'suffix', def: 'island' },
  { kanji: '淵', kana: 'フチ', romaji: 'fuchi', type: 'suffix', def: 'deep pool, abyss' },

  // Civic Structures
  { kanji: '関', kana: 'セキ', romaji: 'seki', type: 'suffix', def: 'barrier, gate' },
];

export const JA_NO_SUFFIXES: JaComponent[] = [
  // Geographic Features (Land)
  { kanji: '島', kana: 'シマ', romaji: 'shima', type: 'suffix', def: 'island' },
  { kanji: '原', kana: 'ハラ', romaji: 'hara', type: 'suffix', def: 'plain, field' },
  { kanji: '森', kana: 'モリ', romaji: 'mori', type: 'suffix', def: 'forest, woods' },
  { kanji: '里', kana: 'サト', romaji: 'sato', type: 'suffix', def: 'hometown, village' },

  // Geographic Features (Water/Coast)
  { kanji: '瀬', kana: 'セ', romaji: 'se', type: 'suffix', def: 'rapids, shallows' },
  { kanji: '浦', kana: 'ウラ', romaji: 'ura', type: 'suffix', def: 'bay, cove' },

  // Positional/Relative
  { kanji: '上', kana: 'カミ', romaji: 'kami', type: 'suffix', def: 'upper, ascended' },
  { kanji: '下', kana: 'シモ', romaji: 'shimo', type: 'suffix', def: 'lower, descended' },
  { kanji: '口', kana: 'クチ', romaji: 'kuchi', type: 'suffix', def: 'mouth, opening, entrance' },
  { kanji: '間', kana: 'マ', romaji: 'ma', type: 'suffix', def: 'space, interval' },

  // Civic Features
  { kanji: '宮', kana: 'ミヤ', romaji: 'miya', type: 'suffix', def: 'shrine, palace' },
  { kanji: '木', kana: 'キ', romaji: 'ki', type: 'suffix', def: 'tree, wood' },
  { kanji: '関', kana: 'セキ', romaji: 'seki', type: 'suffix', def: 'barrier, gate' },
  { kanji: '庄', kana: 'ショウ', romaji: 'shou', type: 'suffix', def: 'manor, estate' },
  { kanji: '州', kana: 'シュウ', romaji: 'shuu', type: 'suffix', def: 'state, province' },
];
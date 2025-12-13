export type RegionCode = 'cn' | 'hk' | 'tw';

// Added 'civic_major' and 'civic_built'
export type ComponentType = 'direction' | 'nature' | 'civic' | 'civic_major' | 'civic_built' | 'adjective' | 'number' | 'noun' | 'suffix' | 'prefix';

export interface EastAsianComponent {
  han: string;
  hans?: string;
  pinyin: string;
  wadegiles: string;
  cantonese: string;
  type: ComponentType;
  def: string;
  english?: string; 
  excludeRegions?: RegionCode[];
  onlyRegions?: RegionCode[];
}

export const EA_COMPONENTS: EastAsianComponent[] = [
  // ==========================================
  // ADJECTIVE
  // ==========================================
  // --- Colors ---
  { han: '白', pinyin: 'bai', wadegiles: 'pai', cantonese: 'pak', type: 'adjective', def: 'white' },
  { han: '黑', pinyin: 'hei', wadegiles: 'hei', cantonese: 'hak', type: 'adjective', def: 'black' },
  { han: '赤', pinyin: 'chi', wadegiles: 'chih', cantonese: 'chek', type: 'adjective', def: 'crimson/bare' },
  { han: '紅', hans: '红', pinyin: 'hong', wadegiles: 'hung', cantonese: 'hung', type: 'adjective', def: 'red' },
  { han: '黃', hans: '黄', pinyin: 'huang', wadegiles: 'huang', cantonese: 'wong', type: 'adjective', def: 'yellow (imperial/earth)' },
  { han: '藍', hans: '蓝', pinyin: 'lan', wadegiles: 'lan', cantonese: 'lam', type: 'adjective', def: 'blue' },
  { han: '碧', pinyin: 'bi', wadegiles: 'pi', cantonese: 'pik', type: 'adjective', def: 'jade green/azure' },
  { han: '青', pinyin: 'qing', wadegiles: 'ching', cantonese: 'tsing', type: 'adjective', def: 'verdant/teal' },
  { han: '翠', pinyin: 'cui', wadegiles: 'tsui', cantonese: 'chui', type: 'adjective', def: 'emerald green' },
  { han: '紫', pinyin: 'zi', wadegiles: 'tzu', cantonese: 'tsz', type: 'adjective', def: 'purple' },
  { han: '金', pinyin: 'jin', wadegiles: 'chin', cantonese: 'kam', type: 'adjective', def: 'golden' },
  
  // --- Aesthetics / Qualities ---
  { han: '美', pinyin: 'mei', wadegiles: 'mei', cantonese: 'mei', type: 'adjective', def: 'beautiful' },
  { han: '秀', pinyin: 'xiu', wadegiles: 'hsiu', cantonese: 'sau', type: 'adjective', def: 'elegant/scenic' },
  { han: '華', hans: '华', pinyin: 'hua', wadegiles: 'hua', cantonese: 'wah', type: 'adjective', def: 'magnificent/flowery' },
  { han: '錦', hans: '锦', pinyin: 'jin', wadegiles: 'chin', cantonese: 'kam', type: 'adjective', def: 'splendid/ornate' },
  { han: '嘉', pinyin: 'jia', wadegiles: 'chia', cantonese: 'ka', type: 'adjective', def: 'excellent/praiseworthy' },
  { han: '香', pinyin: 'xiang', wadegiles: 'hsiang', cantonese: 'heung', type: 'adjective', def: 'fragrant/incense' },
  { han: '清', pinyin: 'qing', wadegiles: 'ching', cantonese: 'tsing', type: 'adjective', def: 'clear/pure' },

  // --- Virtues / Ethics ---
  { han: '仁', pinyin: 'ren', wadegiles: 'jen', cantonese: 'yan', type: 'adjective', def: 'benevolence' },
  { han: '義', hans: '义', pinyin: 'yi', wadegiles: 'i', cantonese: 'yee', type: 'adjective', def: 'righteousness' },
  { han: '禮', hans: '礼', pinyin: 'li', wadegiles: 'li', cantonese: 'lai', type: 'adjective', def: 'propriety/ritual' },
  { han: '智', pinyin: 'zhi', wadegiles: 'chih', cantonese: 'chi', type: 'adjective', def: 'wisdom' },
  { han: '信', pinyin: 'xin', wadegiles: 'hsin', cantonese: 'shun', type: 'adjective', def: 'trust/integrity' },
  { han: '忠', pinyin: 'zhong', wadegiles: 'chung', cantonese: 'chung', type: 'adjective', def: 'loyalty' },
  { han: '孝', pinyin: 'xiao', wadegiles: 'hsiao', cantonese: 'hau', type: 'adjective', def: 'filial piety' },
  { han: '德', pinyin: 'de', wadegiles: 'te', cantonese: 'tak', type: 'adjective', def: 'virtue/morality' },
  { han: '聖', hans: '圣', pinyin: 'sheng', wadegiles: 'sheng', cantonese: 'sing', type: 'adjective', def: 'holy/sage' },
  { han: '正', pinyin: 'zheng', wadegiles: 'cheng', cantonese: 'ching', type: 'adjective', def: 'upright/orthodox' },
  { han: '愛', hans: '爱', pinyin: 'ai', wadegiles: 'ai', cantonese: 'oi', type: 'adjective', def: 'love/affection' },

  // --- Fortune / Prosperity ---
  { han: '福', pinyin: 'fu', wadegiles: 'fu', cantonese: 'fook', type: 'adjective', def: 'blessing/fortune' },
  { han: '富', pinyin: 'fu', wadegiles: 'fu', cantonese: 'fu', type: 'adjective', def: 'wealth/abundance' },
  { han: '貴', hans: '贵', pinyin: 'gui', wadegiles: 'kui', cantonese: 'kwai', type: 'adjective', def: 'noble/precious' },
  { han: '榮', hans: '荣', pinyin: 'rong', wadegiles: 'jung', cantonese: 'wing', type: 'adjective', def: 'glory/honor' },
  { han: '昌', pinyin: 'chang', wadegiles: 'chang', cantonese: 'cheong', type: 'adjective', def: 'prosperous/flourishing' },
  { han: '興', hans: '兴', pinyin: 'xing', wadegiles: 'hsing', cantonese: 'hing', type: 'adjective', def: 'thriving/rising' },
  { han: '豐', hans: '丰', pinyin: 'feng', wadegiles: 'feng', cantonese: 'fung', type: 'adjective', def: 'bountiful/abundant' },
  { han: '祥', pinyin: 'xiang', wadegiles: 'hsiang', cantonese: 'cheung', type: 'adjective', def: 'auspicious' },
  { han: '瑞', pinyin: 'rui', wadegiles: 'jui', cantonese: 'sui', type: 'adjective', def: 'propitious/lucky' },
  { han: '顯', hans: '显', pinyin: 'xian', wadegiles: 'hsien', cantonese: 'hin', type: 'adjective', def: 'distinguished/prominent' },
  { han: '達', hans: '达', pinyin: 'da', wadegiles: 'ta', cantonese: 'tat', type: 'adjective', def: 'eminent/accessible' },
  { han: '宏', pinyin: 'hong', wadegiles: 'hung', cantonese: 'wang', type: 'adjective', def: 'grand/vast' },

  // --- State / Condition ---
  { han: '安', pinyin: 'an', wadegiles: 'an', cantonese: 'on', type: 'adjective', def: 'peace/safety' },
  { han: '寧', hans: '宁', pinyin: 'ning', wadegiles: 'ning', cantonese: 'ning', type: 'adjective', def: 'tranquility' },
  { han: '平', pinyin: 'ping', wadegiles: 'ping', cantonese: 'ping', type: 'adjective', def: 'peace/level' },
  { han: '和', pinyin: 'he', wadegiles: 'ho', cantonese: 'wo', type: 'adjective', def: 'harmony' },
  { han: '泰', pinyin: 'tai', wadegiles: 'tai', cantonese: 'tai', type: 'adjective', def: 'exalted/peaceful' },
  { han: '順', hans: '顺', pinyin: 'shun', wadegiles: 'shun', cantonese: 'shun', type: 'adjective', def: 'smooth/favorable' },
  { han: '樂', hans: '乐', pinyin: 'le', wadegiles: 'le', cantonese: 'lok', type: 'adjective', def: 'joy/happiness' },
  { han: '康', pinyin: 'kang', wadegiles: 'kang', cantonese: 'hong', type: 'adjective', def: 'health/well-being' },
  { han: '滿', hans: '满', pinyin: 'man', wadegiles: 'man', cantonese: 'mun', type: 'adjective', def: 'full/satisfying' },
  { han: '永', pinyin: 'yong', wadegiles: 'yung', cantonese: 'wing', type: 'adjective', def: 'perpetual/eternal' },
  { han: '遠', hans: '远', pinyin: 'yuan', wadegiles: 'yuan', cantonese: 'yuen', type: 'adjective', def: 'remote/distant' },

  // --- Compounds ---
  { han: '太平', pinyin: 'taiping', wadegiles: 'tai-ping', cantonese: 'tai ping', type: 'adjective', def: 'great peace' },
  { han: '永安', pinyin: 'yongan', wadegiles: 'yung-an', cantonese: 'wing on', type: 'adjective', def: 'eternal peace' },
  { han: '長安', hans: '长安', pinyin: 'changan', wadegiles: 'chang-an', cantonese: 'cheung an', type: 'adjective', def: 'long peace' },
  { han: '富貴', hans: '富贵', pinyin: 'fugui', wadegiles: 'fu-kui', cantonese: 'fuk kwai', type: 'adjective', def: 'riches and honour' },
  { han: '吉祥', pinyin: 'jixiang', wadegiles: 'chih-siang', cantonese: 'kat cheung', type: 'adjective', def: 'lucky/auspicious' },
  { han: '光明', pinyin: 'guangming', wadegiles: 'kuang-ming', cantonese: 'kwong ming', type: 'adjective', def: 'bright/radiant' },
  { han: '和平', pinyin: 'heping', wadegiles: 'ho-ping', cantonese: 'wo ping', type: 'adjective', excludeRegions: ['hk'], def: 'peace' },
  { han: '勝利', hans: '胜利', pinyin: 'shengli', wadegiles: 'sheng-li', cantonese: 'shing lei', type: 'adjective', excludeRegions: ['hk'], def: 'victory' },
  { han: '如意', pinyin: 'ruyi', wadegiles: 'ju-i', cantonese: 'yu yi', type: 'adjective', def: 'as one wishes' },
  { han: '逍遙', hans: '逍遥', pinyin: 'xiaoyao', wadegiles: 'hsiao-yao', cantonese: 'siu yiu', type: 'adjective', def: 'carefree/leisurely' },
  { han: '錦繡', hans: '锦绣', pinyin: 'jinxiu', wadegiles: 'chin-hsiu', cantonese: 'kam sau', type: 'adjective', def: 'beautiful/splendid' },

  // ==========================================
  // CIVIC
  // ==========================================
  // --- Administrative Hierarchy ---
  { han: '京', pinyin: 'jing', wadegiles: 'ching', cantonese: 'king', type: 'civic', excludeRegions: ['hk'], def: 'capital city' },
  { han: '都', pinyin: 'du', wadegiles: 'tu', cantonese: 'to', type: 'civic', excludeRegions: ['hk'], def: 'metropolis/capital' },
  
  { han: '省', pinyin: 'sheng', wadegiles: 'sheng', cantonese: 'shang', type: 'civic_major', excludeRegions: ['hk', 'tw'], def: 'province' },
  { han: '州', pinyin: 'zhou', wadegiles: 'chou', cantonese: 'chau', type: 'civic_major', excludeRegions: ['hk'], def: 'prefecture/region' },
  
  { han: '市', pinyin: 'shi', wadegiles: 'shih', cantonese: 'si', type: 'civic', excludeRegions: ['hk'], def: 'municipality/city' },
  { han: '城', pinyin: 'cheng', wadegiles: 'cheng', cantonese: 'shing', type: 'civic', def: 'walled city' },
  { han: '鎮', hans: '镇', pinyin: 'zhen', wadegiles: 'chen', cantonese: 'chun', type: 'civic', excludeRegions: ['hk'], def: 'market town' },
  { han: '鄉', hans: '乡', pinyin: 'xiang', wadegiles: 'hsiang', cantonese: 'heung', type: 'civic', excludeRegions: ['hk'], def: 'township/countryside' },
  { han: '村', pinyin: 'cun', wadegiles: 'tsun', cantonese: 'tsuen', type: 'civic', def: 'village' },
  { han: '莊', hans: '庄', pinyin: 'zhuang', wadegiles: 'chuang', cantonese: 'chong', type: 'civic', def: 'manor/hamlet' },
  { han: '屯', pinyin: 'tun', wadegiles: 'tun', cantonese: 'tuen', type: 'civic', excludeRegions: ['hk'], def: 'garrison/settlement' },

  // --- Structures & Infrastructure ---
  { han: '門', hans: '门', pinyin: 'men', wadegiles: 'men', cantonese: 'mun', type: 'civic_built', def: 'gateway' },
  { han: '關', hans: '关', pinyin: 'guan', wadegiles: 'kuan', cantonese: 'kwan', type: 'civic_built', def: 'frontier pass' },
  { han: '寨', pinyin: 'zhai', wadegiles: 'chai', cantonese: 'chai', type: 'civic_built', def: 'fortified village' },
  { han: '埗', pinyin: 'bu', wadegiles: 'pu', cantonese: 'po', type: 'civic_built', onlyRegions: ['hk'], def: 'pier/ferry crossing' },
  { han: '橋', hans: '桥', pinyin: 'qiao', wadegiles: 'chiao', cantonese: 'kiu', type: 'civic_built', def: 'bridge' },
  { han: '港', pinyin: 'gang', wadegiles: 'kang', cantonese: 'kong', type: 'civic_built', english: 'Port', def: 'harbor/port' },

  // ==========================================
  // DIRECTION
  // ==========================================
  { han: '東', hans: '东', pinyin: 'dong', wadegiles: 'tung', cantonese: 'tung', type: 'direction', def: 'east' },
  { han: '南', pinyin: 'nan', wadegiles: 'nan', cantonese: 'nam', type: 'direction', def: 'south' },
  { han: '西', pinyin: 'xi', wadegiles: 'hsi', cantonese: 'sai', type: 'direction', def: 'west' },
  { han: '北', pinyin: 'bei', wadegiles: 'pei', cantonese: 'pak', type: 'direction', def: 'north' },
  { han: '中', pinyin: 'zhong', wadegiles: 'chung', cantonese: 'chung', type: 'direction', def: 'central/middle' },

  // ==========================================
  // NATURE
  // ==========================================
  // --- Water Bodies (Running) ---
  { han: '江', pinyin: 'jiang', wadegiles: 'chiang', cantonese: 'kong', type: 'nature', english: 'River', def: 'large river' },
  { han: '河', pinyin: 'he', wadegiles: 'ho', cantonese: 'ho', type: 'nature', english: 'River', def: 'river' },
  { han: '川', pinyin: 'chuan', wadegiles: 'chuan', cantonese: 'tsuen', type: 'nature', english: 'River', def: 'river/plain' },
  { han: '溪', pinyin: 'xi', wadegiles: 'chi', cantonese: 'kai', type: 'nature', def: 'mountain stream' },
  { han: '涌', pinyin: 'chong', wadegiles: 'chung', cantonese: 'chung', type: 'nature', onlyRegions: ['hk', 'cn'], def: 'creek/channel' },
  { han: '泉', pinyin: 'quan', wadegiles: 'chuan', cantonese: 'chuen', type: 'nature', def: 'spring/fountain' },
  { han: '圳', pinyin: 'zhen', wadegiles: 'chen', cantonese: 'chun', type: 'nature', onlyRegions: ['cn', 'tw', 'hk'], def: 'irrigation canal' },

  // --- Water Bodies (Still/Marine) ---
  { han: '海', pinyin: 'hai', wadegiles: 'hai', cantonese: 'hoi', type: 'nature', english: 'Sea', def: 'sea' },
  { han: '洋', pinyin: 'yang', wadegiles: 'yang', cantonese: 'yeung', type: 'nature', english: 'Ocean', def: 'ocean' },
  { han: '灣', hans: '湾', pinyin: 'wan', wadegiles: 'wan', cantonese: 'wan', type: 'nature', english: 'Bay', def: 'bay/cove' },
  { han: '澳', pinyin: 'ao', wadegiles: 'ao', cantonese: 'o', type: 'nature', english: 'Bay', onlyRegions: ['hk', 'cn', 'tw'], def: 'inlet/bay' },
  { han: '湖', pinyin: 'hu', wadegiles: 'hu', cantonese: 'wu', type: 'nature', english: 'Lake', def: 'lake' },
  { han: '池', pinyin: 'chi', wadegiles: 'chih', cantonese: 'chi', type: 'nature', def: 'pond/reservoir' },
  { han: '塘', pinyin: 'tang', wadegiles: 'tang', cantonese: 'tong', type: 'nature', onlyRegions: ['hk', 'cn'], def: 'fish pond/embankment' },
  { han: '潭', pinyin: 'tan', wadegiles: 'tan', cantonese: 'tam', type: 'nature', onlyRegions: ['tw', 'cn'], def: 'deep pool' },
  { han: '井', pinyin: 'jing', wadegiles: 'ching', cantonese: 'tseng', type: 'nature', onlyRegions: ['hk', 'tw'], def: 'water well' },

  // --- Landforms (High/Hard) ---
  { han: '山', pinyin: 'shan', wadegiles: 'shan', cantonese: 'shan', type: 'nature', english: 'Mountain', def: 'mountain/hill' },
  { han: '峰', pinyin: 'feng', wadegiles: 'feng', cantonese: 'fung', type: 'nature', english: 'Peak', def: 'peak/summit' },
  { han: '嶺', hans: '岭', pinyin: 'ling', wadegiles: 'ling', cantonese: 'leng', type: 'nature', def: 'mountain range/ridge' },
  { han: '岩', pinyin: 'yan', wadegiles: 'yen', cantonese: 'ngam', type: 'nature', english: 'Rock', def: 'cliff/crag' },
  { han: '石', pinyin: 'shi', wadegiles: 'shih', cantonese: 'shek', type: 'nature', def: 'rock/stone' },

  // --- Landforms (Islands/Coast) ---
  { han: '島', hans: '岛', pinyin: 'dao', wadegiles: 'tao', cantonese: 'to', type: 'nature', english: 'Island', def: 'island' },
  { han: '洲', pinyin: 'zhou', wadegiles: 'chou', cantonese: 'chau', type: 'nature', def: 'river islet/delta' },
  { han: '角', pinyin: 'jiao', wadegiles: 'chiao', cantonese: 'kok', type: 'nature', english: 'Point', def: 'headland/cape' },
  { han: '嘴', pinyin: 'zui', wadegiles: 'tsui', cantonese: 'tsui', type: 'nature', onlyRegions: ['cn'], def: 'promontory' },
  { han: '咀', pinyin: 'zui', wadegiles: 'tsui', cantonese: 'tsui', type: 'nature', onlyRegions: ['hk'], def: 'headland' },  
  { han: '墘', pinyin: 'qian', wadegiles: 'chien', cantonese: 'kin', type: 'nature', onlyRegions: ['tw'], def: 'river bank' },

  // --- Landforms (Flat/Depression) ---
  { han: '原', pinyin: 'yuan', wadegiles: 'yuen', cantonese: 'yuen', type: 'nature', def: 'plain/plateau' },
  { han: '田', pinyin: 'tian', wadegiles: 'tien', cantonese: 'tin', type: 'nature', def: 'paddy field' },
  { han: '谷', pinyin: 'gu', wadegiles: 'ku', cantonese: 'kuk', type: 'nature', english: 'Valley', def: 'valley/gorge' },
  { han: '坑', pinyin: 'keng', wadegiles: 'keng', cantonese: 'hang', type: 'nature', onlyRegions: ['tw', 'hk', 'cn'], def: 'gully/pit' },
  { han: '坪', pinyin: 'ping', wadegiles: 'ping', cantonese: 'ping', type: 'nature', onlyRegions: ['tw', 'hk'], def: 'level ground/terrace' },
  { han: '埔', pinyin: 'bu', wadegiles: 'pu', cantonese: 'po', type: 'nature', onlyRegions: ['hk', 'cn', 'tw'], def: 'flatland' },
  { han: '塱', pinyin: 'lang', wadegiles: 'lang', cantonese: 'long', type: 'nature', onlyRegions: ['hk'], def: 'low-lying wetland' },
  { han: '朗', pinyin: 'lang', wadegiles: 'lang', cantonese: 'long', type: 'nature', onlyRegions: ['hk'], def: 'bright land/wetland' },
  { han: '林', pinyin: 'lin', wadegiles: 'lin', cantonese: 'lam', type: 'nature', def: 'forest/woods' },
  { han: '沙', pinyin: 'sha', wadegiles: 'sha', cantonese: 'sha', type: 'nature', def: 'sands/beach' },
  { han: '地', pinyin: 'di', wadegiles: 'ti', cantonese: 'tei', type: 'nature', onlyRegions: ['hk'], def: 'ground/earth' },

  // --- Compounds ---
  { han: '白雲', hans: '白云', pinyin: 'baiyun', wadegiles: 'pai-yun', cantonese: 'pak wan', type: 'nature', def: 'white cloud' },

  // ==========================================
  // NOUN
  // ==========================================
  // --- Five Elements ---
  { han: '金', pinyin: 'jin', wadegiles: 'chin', cantonese: 'kam', type: 'noun', def: 'gold/metal' },
  { han: '木', pinyin: 'mu', wadegiles: 'mu', cantonese: 'muk', type: 'noun', def: 'wood' },
  { han: '水', pinyin: 'shui', wadegiles: 'shui', cantonese: 'shui', type: 'noun', def: 'water' },
  { han: '火', pinyin: 'huo', wadegiles: 'huo', cantonese: 'fo', type: 'noun', def: 'fire' },
  { han: '土', pinyin: 'tu', wadegiles: 'tu', cantonese: 'to', type: 'noun', def: 'earth' },

  // --- Celestial & Time ---
  { han: '天', pinyin: 'tian', wadegiles: 'tien', cantonese: 'tin', type: 'noun', def: 'heaven/sky' },
  { han: '日', pinyin: 'ri', wadegiles: 'jih', cantonese: 'yat', type: 'noun', def: 'sun' },
  { han: '月', pinyin: 'yue', wadegiles: 'yueh', cantonese: 'yuet', type: 'noun', def: 'moon' },
  { han: '星', pinyin: 'xing', wadegiles: 'hsing', cantonese: 'sing', type: 'noun', def: 'star' },
  { han: '雲', hans: '云', pinyin: 'yun', wadegiles: 'yun', cantonese: 'wan', type: 'noun', def: 'cloud' },
  { han: '光', pinyin: 'guang', wadegiles: 'kuang', cantonese: 'kwong', type: 'noun', def: 'light/lustre' },
  { han: '陽', hans: '阳', pinyin: 'yang', wadegiles: 'yang', cantonese: 'yeung', type: 'noun', def: 'sunny side (south of mtn/north of river)' },
  { han: '春', pinyin: 'chun', wadegiles: 'chun', cantonese: 'chun', type: 'noun', def: 'spring season' },
  { han: '夏', pinyin: 'xia', wadegiles: 'hsia', cantonese: 'ha', type: 'noun', def: 'summer' },
  { han: '秋', pinyin: 'qiu', wadegiles: 'chiu', cantonese: 'chau', type: 'noun', def: 'autumn' },
  { han: '冬', pinyin: 'dong', wadegiles: 'tung', cantonese: 'tung', type: 'noun', def: 'winter' },

  // --- Animals ---
  { han: '龍', hans: '龙', pinyin: 'long', wadegiles: 'lung', cantonese: 'lung', type: 'noun', def: 'dragon' },
  { han: '鳳', hans: '凤', pinyin: 'feng', wadegiles: 'feng', cantonese: 'fung', type: 'noun', def: 'phoenix' },
  { han: '麟', pinyin: 'lin', wadegiles: 'lin', cantonese: 'lun', type: 'noun', def: 'kylin/unicorn' },
  { han: '虎', pinyin: 'hu', wadegiles: 'hu', cantonese: 'fu', type: 'noun', def: 'tiger' },
  { han: '獅', hans: '狮', pinyin: 'shi', wadegiles: 'shih', cantonese: 'sze', type: 'noun', def: 'lion' },
  { han: '象', pinyin: 'xiang', wadegiles: 'hsiang', cantonese: 'jeung', type: 'noun', def: 'elephant' },
  { han: '馬', hans: '马', pinyin: 'ma', wadegiles: 'ma', cantonese: 'ma', type: 'noun', def: 'horse' },
  { han: '牛', pinyin: 'niu', wadegiles: 'niu', cantonese: 'ngau', type: 'noun', def: 'ox/cow' },
  { han: '鹿', pinyin: 'lu', wadegiles: 'lu', cantonese: 'luk', type: 'noun', def: 'deer' },
  { han: '魚', hans: '鱼', pinyin: 'yu', wadegiles: 'yu', cantonese: 'yue', type: 'noun', def: 'fish' },
  { han: '鯉', hans: '鲤', pinyin: 'li', wadegiles: 'li', cantonese: 'lei', type: 'noun', def: 'carp' },
  { han: '鶴', hans: '鹤', pinyin: 'he', wadegiles: 'ho', cantonese: 'hok', type: 'noun', def: 'crane' },
  { han: '鷹', hans: '鹰', pinyin: 'ying', wadegiles: 'ying', cantonese: 'ying', type: 'noun', def: 'eagle/hawk' },
  { han: '燕', pinyin: 'yan', wadegiles: 'yen', cantonese: 'yin', type: 'noun', def: 'swallow' },

  // --- Plants ---
  { han: '花', pinyin: 'hua', wadegiles: 'hua', cantonese: 'fa', type: 'noun', def: 'flower' },
  { han: '果', pinyin: 'guo', wadegiles: 'kuo', cantonese: 'gwo', type: 'noun', def: 'fruit' },
  { han: '松', pinyin: 'song', wadegiles: 'sung', cantonese: 'chung', type: 'noun', def: 'pine' },
  { han: '柏', pinyin: 'bai', wadegiles: 'pai', cantonese: 'pak', type: 'noun', def: 'cypress' },
  { han: '柳', pinyin: 'liu', wadegiles: 'liu', cantonese: 'lau', type: 'noun', def: 'willow' },
  { han: '竹', pinyin: 'zhu', wadegiles: 'chu', cantonese: 'chuk', type: 'noun', def: 'bamboo' },
  { han: '桃', pinyin: 'tao', wadegiles: 'tao', cantonese: 'to', type: 'noun', def: 'peach' },
  { han: '梅', pinyin: 'mei', wadegiles: 'mei', cantonese: 'mui', type: 'noun', def: 'plum blossom' },
  { han: '蘭', hans: '兰', pinyin: 'lan', wadegiles: 'lan', cantonese: 'lan', type: 'noun', def: 'orchid' },
  { han: '蓮', hans: '莲', pinyin: 'lian', wadegiles: 'lien', cantonese: 'lin', type: 'noun', def: 'lotus' },
  { han: '葵', pinyin: 'kui', wadegiles: 'kui', cantonese: 'kwai', type: 'noun', onlyRegions: ['hk'], def: 'sunflower' },
  { han: '茶', pinyin: 'cha', wadegiles: 'cha', cantonese: 'cha', type: 'noun', def: 'tea' },

  // --- Materials & Objects ---
  { han: '玉', pinyin: 'yu', wadegiles: 'yu', cantonese: 'yuk', type: 'noun', def: 'jade' },
  { han: '寶', hans: '宝', pinyin: 'bao', wadegiles: 'pao', cantonese: 'po', type: 'noun', def: 'treasure' },
  { han: '珠', pinyin: 'zhu', wadegiles: 'chu', cantonese: 'chu', type: 'noun', def: 'pearl' },
  { han: '銀', hans: '银', pinyin: 'yin', wadegiles: 'yin', cantonese: 'ngan', type: 'noun', def: 'silver' },
  { han: '鐵', hans: '铁', pinyin: 'tie', wadegiles: 'tieh', cantonese: 'tit', type: 'noun', def: 'iron' },
  { han: '銅', hans: '铜', pinyin: 'tong', wadegiles: 'tung', cantonese: 'tung', type: 'noun', def: 'copper/bronze' },
  { han: '鹽', hans: '盐', pinyin: 'yan', wadegiles: 'yen', cantonese: 'yim', type: 'noun', def: 'salt' },
  { han: '油', pinyin: 'you', wadegiles: 'yu', cantonese: 'yau', type: 'noun', onlyRegions: ['hk'], def: 'oil' },

  // --- Compounds ---
  { han: '鳳凰', hans: '凤凰', pinyin: 'fenghuang', wadegiles: 'feng-huang', cantonese: 'fung wong', type: 'noun', def: 'phoenix' },
  { han: '麒麟', pinyin: 'qilin', wadegiles: 'chi-lin', cantonese: 'kei lun', type: 'noun', def: 'kylin/unicorn' },
  { han: '蝴蝶', pinyin: 'hudie', wadegiles: 'hu-tieh', cantonese: 'wu dip', type: 'noun', def: 'butterfly' },
  { han: '翡翠', pinyin: 'feicui', wadegiles: 'fei-tsui', cantonese: 'fei tsui', type: 'noun', def: 'jadeite' },
  
  // ==========================================
  // NUMBER
  // ==========================================
  { han: '一', pinyin: 'yi', wadegiles: 'i', cantonese: 'yat', type: 'number', def: 'one' },
  { han: '二', pinyin: 'er', wadegiles: 'erh', cantonese: 'yi', type: 'number', def: 'two' },
  { han: '三', pinyin: 'san', wadegiles: 'san', cantonese: 'sam', type: 'number', def: 'three' },
  { han: '四', pinyin: 'si', wadegiles: 'szu', cantonese: 'sze', type: 'number', def: 'four' },
  { han: '五', pinyin: 'wu', wadegiles: 'wu', cantonese: 'ng', type: 'number', def: 'five' },
  { han: '六', pinyin: 'liu', wadegiles: 'liu', cantonese: 'luk', type: 'number', def: 'six' },
  { han: '七', pinyin: 'qi', wadegiles: 'chi', cantonese: 'tsat', type: 'number', def: 'seven' },
  { han: '八', pinyin: 'ba', wadegiles: 'pa', cantonese: 'bat', type: 'number', def: 'eight' },
  { han: '九', pinyin: 'jiu', wadegiles: 'chiu', cantonese: 'kau', type: 'number', def: 'nine' },
  { han: '十', pinyin: 'shi', wadegiles: 'shih', cantonese: 'sap', type: 'number', def: 'ten' },

  // ==========================================
  // PREFIX
  // ==========================================
  // --- Size/Dimension ---
  { han: '大', pinyin: 'da', wadegiles: 'ta', cantonese: 'tai', type: 'prefix', def: 'big' },
  { han: '小', pinyin: 'xiao', wadegiles: 'hsiao', cantonese: 'siu', type: 'prefix', def: 'small' },
  { han: '高', pinyin: 'gao', wadegiles: 'kao', cantonese: 'ko', type: 'prefix', def: 'high' },
  { han: '長', hans: '长', pinyin: 'chang', wadegiles: 'chang', cantonese: 'cheung', type: 'prefix', def: 'long' },
  { han: '廣', hans: '广', pinyin: 'guang', wadegiles: 'kuang', cantonese: 'kwong', type: 'prefix', def: 'broad' },
  
  // --- Time/Age ---
  { han: '新', pinyin: 'xin', wadegiles: 'hsin', cantonese: 'san', type: 'prefix', def: 'new' },
  { han: '老', pinyin: 'lao', wadegiles: 'lao', cantonese: 'lo', type: 'prefix', excludeRegions: ['hk'], def: 'old' },
  { han: '舊', hans: '旧', pinyin: 'jiu', wadegiles: 'chiu', cantonese: 'kau', type: 'prefix', onlyRegions: ['hk'], def: 'old' },
  
  // --- Position ---
  { han: '上', pinyin: 'shang', wadegiles: 'shang', cantonese: 'sheung', type: 'prefix', def: 'upper' },
  { han: '下', pinyin: 'xia', wadegiles: 'hsia', cantonese: 'ha', type: 'prefix', def: 'lower' },
  
  // --- Quality/State ---
  { han: '平', pinyin: 'ping', wadegiles: 'ping', cantonese: 'ping', type: 'prefix', def: 'flat' },
  { han: '安', pinyin: 'an', wadegiles: 'an', cantonese: 'on', type: 'prefix', def: 'peace' },

  // ==========================================
  // SUFFIX
  // ==========================================
  { han: '里', pinyin: 'li', wadegiles: 'li', cantonese: 'lei', type: 'suffix', onlyRegions: ['tw'], def: 'neighborhood' },
  { han: '圍', hans: '围', pinyin: 'wei', wadegiles: 'wei', cantonese: 'wai', type: 'suffix', onlyRegions: ['hk', 'cn'], def: 'walled village' },
  { han: '寮', pinyin: 'liao', wadegiles: 'liao', cantonese: 'liu', type: 'suffix', onlyRegions: ['tw'], def: 'hut' },
  { han: '厝', pinyin: 'cuo', wadegiles: 'tso', cantonese: 'cho', type: 'suffix', onlyRegions: ['tw'], def: 'house' },
];
export type RegionCode = 'cn' | 'hk' | 'tw';

export type ComponentType = 'direction' | 'nature' | 'civic' | 'civic_major' | 'civic_built' | 'adjective' | 'number' | 'noun' | 'suffix' | 'prefix';

export interface ChineseComponent {
  han: string;
  hans?: string;
  cn?: string; // Romanization in Pinyin
  tw?: string; // Romanization in Wade-Giles
  hk?: string; // Romanization in HK Government System
  type: ComponentType;
  def: string;
  english?: string;
}

export const ZH_COMPONENTS: ChineseComponent[] = [
  // ==========================================
  // ADJECTIVE
  // ==========================================
  // --- Colors ---
  { han: '白', cn: 'bai', tw: 'pai', hk: 'pak', type: 'adjective', def: 'white' },
  { han: '黑', cn: 'hei', tw: 'hei', hk: 'hak', type: 'adjective', def: 'black' },
  { han: '赤', cn: 'chi', tw: 'chih', hk: 'chek', type: 'adjective', def: 'crimson/bare' },
  { han: '紅', hans: '红', cn: 'hong', tw: 'hung', hk: 'hung', type: 'adjective', def: 'red' },
  { han: '黃', hans: '黄', cn: 'huang', tw: 'huang', hk: 'wong', type: 'adjective', def: 'yellow (imperial/earth)' },
  { han: '藍', hans: '蓝', cn: 'lan', tw: 'lan', hk: 'lam', type: 'adjective', def: 'blue' },
  { han: '碧', cn: 'bi', tw: 'pi', hk: 'pik', type: 'adjective', def: 'jade green/azure' },
  { han: '青', cn: 'qing', tw: 'ching', hk: 'tsing', type: 'adjective', def: 'verdant/teal' },
  { han: '翠', cn: 'cui', tw: 'tsui', hk: 'chui', type: 'adjective', def: 'emerald green' },
  { han: '紫', cn: 'zi', tw: 'tzu', hk: 'tsz', type: 'adjective', def: 'purple' },
  { han: '金', cn: 'jin', tw: 'chin', hk: 'kam', type: 'adjective', def: 'golden' },
  
  // --- Aesthetics / Qualities ---
  { han: '美', cn: 'mei', tw: 'mei', hk: 'mei', type: 'adjective', def: 'beautiful' },
  { han: '秀', cn: 'xiu', tw: 'hsiu', hk: 'sau', type: 'adjective', def: 'elegant/scenic' },
  { han: '華', hans: '华', cn: 'hua', tw: 'hua', hk: 'wah', type: 'adjective', def: 'magnificent/flowery' },
  { han: '錦', hans: '锦', cn: 'jin', tw: 'chin', hk: 'kam', type: 'adjective', def: 'splendid/ornate' },
  { han: '嘉', cn: 'jia', tw: 'chia', hk: 'ka', type: 'adjective', def: 'excellent/praiseworthy' },
  { han: '香', cn: 'xiang', tw: 'hsiang', hk: 'heung', type: 'adjective', def: 'fragrant/incense' },
  { han: '清', cn: 'qing', tw: 'ching', hk: 'tsing', type: 'adjective', def: 'clear/pure' },

  // --- Virtues / Ethics ---
  { han: '仁', cn: 'ren', tw: 'jen', hk: 'yan', type: 'adjective', def: 'benevolence' },
  { han: '義', hans: '义', cn: 'yi', tw: 'i', hk: 'yee', type: 'adjective', def: 'righteousness' },
  { han: '禮', hans: '礼', cn: 'li', tw: 'li', hk: 'lai', type: 'adjective', def: 'propriety/ritual' },
  { han: '智', cn: 'zhi', tw: 'chih', hk: 'chi', type: 'adjective', def: 'wisdom' },
  { han: '信', cn: 'xin', tw: 'hsin', hk: 'shun', type: 'adjective', def: 'trust/integrity' },
  { han: '忠', cn: 'zhong', tw: 'chung', hk: 'chung', type: 'adjective', def: 'loyalty' },
  { han: '孝', cn: 'xiao', tw: 'hsiao', hk: 'hau', type: 'adjective', def: 'filial piety' },
  { han: '德', cn: 'de', tw: 'te', hk: 'tak', type: 'adjective', def: 'virtue/morality' },
  { han: '聖', hans: '圣', cn: 'sheng', tw: 'sheng', hk: 'sing', type: 'adjective', def: 'holy/sage' },
  { han: '正', cn: 'zheng', tw: 'cheng', hk: 'ching', type: 'adjective', def: 'upright/orthodox' },
  { han: '愛', hans: '爱', cn: 'ai', tw: 'ai', hk: 'oi', type: 'adjective', def: 'love/affection' },

  // --- Fortune / Prosperity ---
  { han: '福', cn: 'fu', tw: 'fu', hk: 'fook', type: 'adjective', def: 'blessing/fortune' },
  { han: '富', cn: 'fu', tw: 'fu', hk: 'fu', type: 'adjective', def: 'wealth/abundance' },
  { han: '貴', hans: '贵', cn: 'gui', tw: 'kui', hk: 'kwai', type: 'adjective', def: 'noble/precious' },
  { han: '榮', hans: '荣', cn: 'rong', tw: 'jung', hk: 'wing', type: 'adjective', def: 'glory/honor' },
  { han: '昌', cn: 'chang', tw: 'chang', hk: 'cheong', type: 'adjective', def: 'prosperous/flourishing' },
  { han: '興', hans: '兴', cn: 'xing', tw: 'hsing', hk: 'hing', type: 'adjective', def: 'thriving/rising' },
  { han: '豐', hans: '丰', cn: 'feng', tw: 'feng', hk: 'fung', type: 'adjective', def: 'bountiful/abundant' },
  { han: '祥', cn: 'xiang', tw: 'hsiang', hk: 'cheung', type: 'adjective', def: 'auspicious' },
  { han: '瑞', cn: 'rui', tw: 'jui', hk: 'sui', type: 'adjective', def: 'propitious/lucky' },
  { han: '顯', hans: '显', cn: 'xian', tw: 'hsien', hk: 'hin', type: 'adjective', def: 'distinguished/prominent' },
  { han: '達', hans: '达', cn: 'da', tw: 'ta', hk: 'tat', type: 'adjective', def: 'eminent/accessible' },
  { han: '宏', cn: 'hong', tw: 'hung', hk: 'wang', type: 'adjective', def: 'grand/vast' },

  // --- State / Condition ---
  { han: '安', cn: 'an', tw: 'an', hk: 'on', type: 'adjective', def: 'peace/safety' },
  { han: '寧', hans: '宁', cn: 'ning', tw: 'ning', hk: 'ning', type: 'adjective', def: 'tranquility' },
  { han: '平', cn: 'ping', tw: 'ping', hk: 'ping', type: 'adjective', def: 'peace/level' },
  { han: '和', cn: 'he', tw: 'ho', hk: 'wo', type: 'adjective', def: 'harmony' },
  { han: '泰', cn: 'tai', tw: 'tai', hk: 'tai', type: 'adjective', def: 'exalted/peaceful' },
  { han: '順', hans: '顺', cn: 'shun', tw: 'shun', hk: 'shun', type: 'adjective', def: 'smooth/favorable' },
  { han: '樂', hans: '乐', cn: 'le', tw: 'le', hk: 'lok', type: 'adjective', def: 'joy/happiness' },
  { han: '康', cn: 'kang', tw: 'kang', hk: 'hong', type: 'adjective', def: 'health/well-being' },
  { han: '滿', hans: '满', cn: 'man', tw: 'man', hk: 'mun', type: 'adjective', def: 'full/satisfying' },
  { han: '永', cn: 'yong', tw: 'yung', hk: 'wing', type: 'adjective', def: 'perpetual/eternal' },
  { han: '遠', hans: '远', cn: 'yuan', tw: 'yuan', hk: 'yuen', type: 'adjective', def: 'remote/distant' },

  // --- Compounds ---
  { han: '太平', cn: 'taiping', tw: 'tai-ping', hk: 'tai ping', type: 'adjective', def: 'great peace' },
  { han: '永安', cn: 'yongan', tw: 'yung-an', hk: 'wing on', type: 'adjective', def: 'eternal peace' },
  { han: '長安', hans: '长安', cn: 'changan', tw: 'chang-an', hk: 'cheung an', type: 'adjective', def: 'long peace' },
  { han: '富貴', hans: '富贵', cn: 'fugui', tw: 'fu-kui', hk: 'fuk kwai', type: 'adjective', def: 'riches and honour' },
  { han: '吉祥', cn: 'jixiang', tw: 'chih-siang', hk: 'kat cheung', type: 'adjective', def: 'lucky/auspicious' },
  { han: '光明', cn: 'guangming', tw: 'kuang-ming', hk: 'kwong ming', type: 'adjective', def: 'bright/radiant' },
  { han: '和平', cn: 'heping', tw: 'ho-ping', type: 'adjective', def: 'peace' }, 
  { han: '勝利', hans: '胜利', cn: 'shengli', tw: 'sheng-li', type: 'adjective', def: 'victory' }, 
  { han: '如意', cn: 'ruyi', tw: 'ju-i', hk: 'yu yi', type: 'adjective', def: 'as one wishes' },
  { han: '逍遙', hans: '逍遥', cn: 'xiaoyao', tw: 'hsiao-yao', hk: 'siu yiu', type: 'adjective', def: 'carefree/leisurely' },
  { han: '錦繡', hans: '锦绣', cn: 'jinxiu', tw: 'chin-hsiu', hk: 'kam sau', type: 'adjective', def: 'beautiful/splendid' },

  // ==========================================
  // CIVIC
  // ==========================================
  // --- Administrative Hierarchy ---
  { han: '京', cn: 'jing', tw: 'ching', type: 'civic', def: 'capital city' }, 
  { han: '都', cn: 'du', tw: 'tu', type: 'civic', def: 'metropolis/capital' },  
  
  { han: '省', cn: 'sheng', type: 'civic_major', def: 'province' },  
  { han: '州', cn: 'zhou', tw: 'chou', type: 'civic_major', def: 'prefecture/region' }, 
  
  { han: '市', cn: 'shi', tw: 'shih', type: 'civic', def: 'municipality/city' }, 
  { han: '城', cn: 'cheng', tw: 'cheng', type: 'civic', def: 'walled city' }, 
  { han: '鎮', hans: '镇', cn: 'zhen', tw: 'chen', type: 'civic', def: 'market town' }, 
  { han: '鄉', hans: '乡', cn: 'xiang', tw: 'hsiang', type: 'civic', def: 'township/countryside' }, 
  { han: '村', cn: 'cun', tw: 'tsun', hk: 'tsuen', type: 'civic', def: 'village' },
  { han: '莊', hans: '庄', cn: 'zhuang', tw: 'chuang', hk: 'chong', type: 'civic', def: 'manor/hamlet' },
  { han: '屯', cn: 'tun', tw: 'tun', type: 'civic', def: 'garrison/settlement' }, 

  // --- Structures & Infrastructure ---
  { han: '門', hans: '门', cn: 'men', tw: 'men', hk: 'mun', type: 'civic_built', def: 'gateway' },
  { han: '關', hans: '关', cn: 'guan', tw: 'kuan', hk: 'kwan', type: 'civic_built', def: 'frontier pass' },
  { han: '寨', cn: 'zhai', tw: 'chai', hk: 'chai', type: 'civic_built', def: 'fortified village' },
  { han: '埗', hk: 'po', type: 'civic_built', def: 'pier/ferry crossing' }, 
  { han: '橋', hans: '桥', cn: 'qiao', tw: 'chiao', hk: 'kiu', type: 'civic_built', def: 'bridge' },
  { han: '港', cn: 'gang', tw: 'kang', hk: 'kong', type: 'civic_built', english: 'Port', def: 'harbor/port' },

  // ==========================================
  // DIRECTION
  // ==========================================
  { han: '東', hans: '东', cn: 'dong', tw: 'tung', hk: 'tung', type: 'direction', def: 'east' },
  { han: '南', cn: 'nan', tw: 'nan', hk: 'nam', type: 'direction', def: 'south' },
  { han: '西', cn: 'xi', tw: 'hsi', hk: 'sai', type: 'direction', def: 'west' },
  { han: '北', cn: 'bei', tw: 'pei', hk: 'pak', type: 'direction', def: 'north' },
  { han: '中', cn: 'zhong', tw: 'chung', hk: 'chung', type: 'direction', def: 'central/middle' },

  // ==========================================
  // NATURE
  // ==========================================
  // --- Water Bodies (Running) ---
  { han: '江', cn: 'jiang', tw: 'chiang', hk: 'kong', type: 'nature', english: 'River', def: 'large river' },
  { han: '河', cn: 'he', tw: 'ho', hk: 'ho', type: 'nature', def: 'river' },
  { han: '川', cn: 'chuan', tw: 'chuan', hk: 'tsuen', type: 'nature', def: 'river/plain' },
  { han: '溪', cn: 'xi', tw: 'chi', hk: 'kai', type: 'nature', def: 'mountain stream' },
  { han: '涌', cn: 'chong', hk: 'chung', type: 'nature', def: 'creek/channel' }, 
  { han: '泉', cn: 'quan', tw: 'chuan', hk: 'chuen', type: 'nature', def: 'spring/fountain' },

  // --- Water Bodies (Still/Marine) ---
  { han: '海', cn: 'hai', tw: 'hai', hk: 'hoi', type: 'nature', def: 'sea' },
  { han: '洋', cn: 'yang', tw: 'yang', hk: 'yeung', type: 'nature', def: 'ocean' },
  { han: '灣', hans: '湾', cn: 'wan', tw: 'wan', hk: 'wan', type: 'nature', english: 'Bay', def: 'bay/cove' },
  { han: '澳', cn: 'ao', tw: 'ao', hk: 'o', type: 'nature', def: 'inlet/bay' },
  { han: '湖', cn: 'hu', tw: 'hu', hk: 'wu', type: 'nature', def: 'lake' },
  { han: '池', cn: 'chi', tw: 'chih', hk: 'chi', type: 'nature', def: 'pond/reservoir' },
  { han: '塘', cn: 'tang', tw: 'tang', hk: 'tong', type: 'nature', def: 'fish pond/embankment' },
  { han: '潭', cn: 'tan', tw: 'tan', hk: 'tam', type: 'nature', def: 'deep pool' },
  { han: '井', cn: 'jing', tw: 'ching', hk: 'tseng', type: 'nature', def: 'water well' },

  // --- Landforms (High/Hard) ---
  { han: '山', cn: 'shan', tw: 'shan', hk: 'shan', type: 'nature', english: 'Mountain', def: 'mountain/hill' },
  { han: '峰', cn: 'feng', tw: 'feng', hk: 'fung', type: 'nature', english: 'Peak', def: 'peak/summit' },
  { han: '嶺', hans: '岭', cn: 'ling', tw: 'ling', hk: 'leng', type: 'nature', def: 'mountain range/ridge' },
  { han: '岩', cn: 'yan', tw: 'yen', hk: 'ngam', type: 'nature', english: 'Rock', def: 'cliff/crag' },
  { han: '石', cn: 'shi', tw: 'shih', hk: 'shek', type: 'nature', def: 'rock/stone' },

  // --- Landforms (Islands/Coast) ---
  { han: '島', hans: '岛', cn: 'dao', tw: 'tao', hk: 'to', type: 'nature', english: 'Island', def: 'island' },
  { han: '洲', cn: 'zhou', tw: 'chou', hk: 'chau', type: 'nature', def: 'river islet/delta' },
  { han: '角', cn: 'jiao', tw: 'chiao', hk: 'kok', type: 'nature', english: 'Point', def: 'headland/cape' },
  { han: '嘴', cn: 'zui', type: 'nature', def: 'promontory' },
  { han: '咀', hk: 'tsui', type: 'nature', def: 'headland' },
  { han: '鼻', tw: 'pi', type: 'nature', def: 'cape' },
  { han: '墘', tw: 'chien', type: 'nature', def: 'river bank' },

  // --- Landforms (Flat/Depression) ---
  { han: '原', cn: 'yuan', tw: 'yuen', hk: 'yuen', type: 'nature', def: 'plain/plateau' },
  { han: '田', cn: 'tian', tw: 'tien', hk: 'tin', type: 'nature', def: 'paddy field' },
  { han: '谷', cn: 'gu', tw: 'ku', hk: 'kuk', type: 'nature', def: 'valley/gorge' },
  { han: '坑', cn: 'keng', tw: 'keng', hk: 'hang', type: 'nature', def: 'gully/pit' },
  { han: '坪', tw: 'ping', hk: 'ping', type: 'nature', def: 'level ground/terrace' },
  { han: '埔', cn: 'bu', tw: 'pu', hk: 'po', type: 'nature', def: 'flatland' },
  { han: '塱', hk: 'long', type: 'nature', def: 'low-lying wetland' },
  { han: '朗', cn: 'lang', hk: 'long', type: 'nature', def: 'bright land/wetland' },
  { han: '林', cn: 'lin', tw: 'lin', hk: 'lam', type: 'nature', def: 'forest/woods' },
  { han: '沙', cn: 'sha', tw: 'sha', hk: 'sha', type: 'nature', def: 'sands/beach' },
  { han: '地', cn: 'di', tw: 'ti', hk: 'tei', type: 'nature', def: 'ground/earth' },

  // --- Compounds ---
  { han: '白雲', hans: '白云', cn: 'baiyun', tw: 'pai-yun', hk: 'pak wan', type: 'nature', def: 'white cloud' },

  // ==========================================
  // NOUN
  // ==========================================
  // --- Five Elements ---
  { han: '金', cn: 'jin', tw: 'chin', hk: 'kam', type: 'noun', def: 'gold/metal' },
  { han: '木', cn: 'mu', tw: 'mu', hk: 'muk', type: 'noun', def: 'wood' },
  { han: '水', cn: 'shui', tw: 'shui', hk: 'shui', type: 'noun', def: 'water' },
  { han: '火', cn: 'huo', tw: 'huo', hk: 'fo', type: 'noun', def: 'fire' },
  { han: '土', cn: 'tu', tw: 'tu', hk: 'to', type: 'noun', def: 'earth' },

  // --- Celestial & Time ---
  { han: '天', cn: 'tian', tw: 'tien', hk: 'tin', type: 'noun', def: 'heaven/sky' },
  { han: '日', cn: 'ri', tw: 'jih', hk: 'yat', type: 'noun', def: 'sun' },
  { han: '月', cn: 'yue', tw: 'yueh', hk: 'yuet', type: 'noun', def: 'moon' },
  { han: '星', cn: 'xing', tw: 'hsing', hk: 'sing', type: 'noun', def: 'star' },
  { han: '雲', hans: '云', cn: 'yun', tw: 'yun', hk: 'wan', type: 'noun', def: 'cloud' },
  { han: '光', cn: 'guang', tw: 'kuang', hk: 'kwong', type: 'noun', def: 'light/lustre' },
  { han: '陽', hans: '阳', cn: 'yang', tw: 'yang', hk: 'yeung', type: 'noun', def: 'sunny side (south of mtn/north of river)' },
  { han: '春', cn: 'chun', tw: 'chun', hk: 'chun', type: 'noun', def: 'spring season' },
  { han: '夏', cn: 'xia', tw: 'hsia', hk: 'ha', type: 'noun', def: 'summer' },
  { han: '秋', cn: 'qiu', tw: 'chiu', hk: 'chau', type: 'noun', def: 'autumn' },
  { han: '冬', cn: 'dong', tw: 'tung', hk: 'tung', type: 'noun', def: 'winter' },

  // --- Animals ---
  { han: '龍', hans: '龙', cn: 'long', tw: 'lung', hk: 'lung', type: 'noun', def: 'dragon' },
  { han: '鳳', hans: '凤', cn: 'feng', tw: 'feng', hk: 'fung', type: 'noun', def: 'phoenix' },
  { han: '麟', cn: 'lin', tw: 'lin', hk: 'lun', type: 'noun', def: 'kylin/unicorn' },
  { han: '虎', cn: 'hu', tw: 'hu', hk: 'fu', type: 'noun', def: 'tiger' },
  { han: '獅', hans: '狮', cn: 'shi', tw: 'shih', hk: 'sze', type: 'noun', def: 'lion' },
  { han: '象', cn: 'xiang', tw: 'hsiang', hk: 'jeung', type: 'noun', def: 'elephant' },
  { han: '馬', hans: '马', cn: 'ma', tw: 'ma', hk: 'ma', type: 'noun', def: 'horse' },
  { han: '牛', cn: 'niu', tw: 'niu', hk: 'ngau', type: 'noun', def: 'ox/cow' },
  { han: '鹿', cn: 'lu', tw: 'lu', hk: 'luk', type: 'noun', def: 'deer' },
  { han: '魚', hans: '鱼', cn: 'yu', tw: 'yu', hk: 'yue', type: 'noun', def: 'fish' },
  { han: '鯉', hans: '鲤', cn: 'li', tw: 'li', hk: 'lei', type: 'noun', def: 'carp' },
  { han: '鶴', hans: '鹤', cn: 'he', tw: 'ho', hk: 'hok', type: 'noun', def: 'crane' },
  { han: '鷹', hans: '鹰', cn: 'ying', tw: 'ying', hk: 'ying', type: 'noun', def: 'eagle/hawk' },
  { han: '燕', cn: 'yan', tw: 'yen', hk: 'yin', type: 'noun', def: 'swallow' },

  // --- Plants ---
  { han: '花', cn: 'hua', tw: 'hua', hk: 'fa', type: 'noun', def: 'flower' },
  { han: '果', cn: 'guo', tw: 'kuo', hk: 'gwo', type: 'noun', def: 'fruit' },
  { han: '松', cn: 'song', tw: 'sung', hk: 'chung', type: 'noun', def: 'pine' },
  { han: '柏', cn: 'bai', tw: 'pai', hk: 'pak', type: 'noun', def: 'cypress' },
  { han: '柳', cn: 'liu', tw: 'liu', hk: 'lau', type: 'noun', def: 'willow' },
  { han: '竹', cn: 'zhu', tw: 'chu', hk: 'chuk', type: 'noun', def: 'bamboo' },
  { han: '桃', cn: 'tao', tw: 'tao', hk: 'to', type: 'noun', def: 'peach' },
  { han: '梅', cn: 'mei', tw: 'mei', hk: 'mui', type: 'noun', def: 'plum blossom' },
  { han: '蘭', hans: '兰', cn: 'lan', tw: 'lan', hk: 'lan', type: 'noun', def: 'orchid' },
  { han: '蓮', hans: '莲', cn: 'lian', tw: 'lien', hk: 'lin', type: 'noun', def: 'lotus' },
  { han: '葵', cn: 'kui', tw: 'kui', hk: 'kwai', type: 'noun', def: 'sunflower' },
  { han: '茶', cn: 'cha', tw: 'cha', hk: 'cha', type: 'noun', def: 'tea' },

  // --- Materials & Objects ---
  { han: '玉', cn: 'yu', tw: 'yu', hk: 'yuk', type: 'noun', def: 'jade' },
  { han: '寶', hans: '宝', cn: 'bao', tw: 'pao', hk: 'po', type: 'noun', def: 'treasure' },
  { han: '珠', cn: 'zhu', tw: 'chu', hk: 'chu', type: 'noun', def: 'pearl' },
  { han: '銀', hans: '银', cn: 'yin', tw: 'yin', hk: 'ngan', type: 'noun', def: 'silver' },
  { han: '鐵', hans: '铁', cn: 'tie', tw: 'tieh', hk: 'tit', type: 'noun', def: 'iron' },
  { han: '銅', hans: '铜', cn: 'tong', tw: 'tung', hk: 'tung', type: 'noun', def: 'copper/bronze' },
  { han: '鹽', hans: '盐', cn: 'yan', tw: 'yen', hk: 'yim', type: 'noun', def: 'salt' },
  { han: '油', cn: 'you', tw: 'yu', hk: 'yau', type: 'noun', def: 'oil' },

  // --- Compounds ---
  { han: '鳳凰', hans: '凤凰', cn: 'fenghuang', tw: 'feng-huang', hk: 'fung wong', type: 'noun', def: 'phoenix' },
  { han: '麒麟', cn: 'qilin', tw: 'chi-lin', hk: 'kei lun', type: 'noun', def: 'kylin/unicorn' },
  { han: '蝴蝶', cn: 'hudie', tw: 'hu-tieh', hk: 'wu dip', type: 'noun', def: 'butterfly' },
  { han: '翡翠', cn: 'feicui', tw: 'fei-tsui', hk: 'fei tsui', type: 'noun', def: 'jadeite' },

  // ==========================================
  // NUMBER
  // ==========================================
  { han: '一', cn: 'yi', tw: 'i', hk: 'yat', type: 'number', def: 'one' },
  { han: '二', cn: 'er', tw: 'erh', hk: 'yi', type: 'number', def: 'two' },
  { han: '三', cn: 'san', tw: 'san', hk: 'sam', type: 'number', def: 'three' },
  { han: '四', cn: 'si', tw: 'szu', hk: 'sze', type: 'number', def: 'four' },
  { han: '五', cn: 'wu', tw: 'wu', hk: 'ng', type: 'number', def: 'five' },
  { han: '六', cn: 'liu', tw: 'liu', hk: 'luk', type: 'number', def: 'six' },
  { han: '七', cn: 'qi', tw: 'chi', hk: 'tsat', type: 'number', def: 'seven' },
  { han: '八', cn: 'ba', tw: 'pa', hk: 'bat', type: 'number', def: 'eight' },
  { han: '九', cn: 'jiu', tw: 'chiu', hk: 'kau', type: 'number', def: 'nine' },
  { han: '十', cn: 'shi', tw: 'shih', hk: 'sap', type: 'number', def: 'ten' },

  // ==========================================
  // PREFIX
  // ==========================================
  // --- Size/Dimension ---
  { han: '大', cn: 'da', tw: 'ta', hk: 'tai', type: 'prefix', def: 'big' },
  { han: '小', cn: 'xiao', tw: 'hsiao', hk: 'siu', type: 'prefix', def: 'small' },
  { han: '高', cn: 'gao', tw: 'kao', hk: 'ko', type: 'prefix', def: 'high' },
  { han: '長', hans: '长', cn: 'chang', tw: 'chang', hk: 'cheung', type: 'prefix', def: 'long' },
  { han: '廣', hans: '广', cn: 'guang', tw: 'kuang', hk: 'kwong', type: 'prefix', def: 'broad' },
  
  // --- Time/Age ---
  { han: '新', cn: 'xin', tw: 'hsin', hk: 'san', type: 'prefix', def: 'new' },
  { han: '老', cn: 'lao', tw: 'lao', type: 'prefix', def: 'old' },
  { han: '舊', hans: '旧', hk: 'kau', type: 'prefix', def: 'old' },
  
  // --- Position ---
  { han: '上', cn: 'shang', tw: 'shang', hk: 'sheung', type: 'prefix', def: 'upper' },
  { han: '下', cn: 'xia', tw: 'hsia', hk: 'ha', type: 'prefix', def: 'lower' },
  
  // --- Quality/State ---
  { han: '平', cn: 'ping', tw: 'ping', hk: 'ping', type: 'prefix', def: 'flat' },
  { han: '安', cn: 'an', tw: 'an', hk: 'on', type: 'prefix', def: 'peace' },

  // ==========================================
  // SUFFIX
  // ==========================================
  { han: '里', tw: 'li', type: 'suffix', def: 'neighborhood' },
  { han: '圍', hans: '围', cn: 'wei', hk: 'wai', type: 'suffix', def: 'walled village' },
  { han: '寮', tw: 'liao', type: 'suffix', def: 'hut' },
  { han: '厝', tw: 'tso', type: 'suffix', def: 'house' },
];
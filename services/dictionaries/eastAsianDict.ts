
export type RegionCode = 'cn' | 'hk' | 'tw';

export type ComponentType = 'direction' | 'nature' | 'civic' | 'adjective' | 'number' | 'noun' | 'suffix' | 'prefix';

export interface EastAsianComponent {
  hanzi: string; // Simplified (Mainland) or Shared
  hanziTraditional?: string; // Traditional (HK/Taiwan) - if undefined, use hanzi
  pinyin: string;    // Mainland (Beijing)
  wadegiles: string; // Taiwan/Historical (Pei-ching)
  cantonese: string; // HK Govt (Sheung Wan)
  type: ComponentType;
  excludeRegions?: RegionCode[];
  onlyRegions?: RegionCode[];
}

export const EA_COMPONENTS: EastAsianComponent[] = [
  // ==========================================
  // PREFIXES & MODIFIERS (Generic)
  // ==========================================
  { hanzi: '老', pinyin: 'lao', wadegiles: 'lao', cantonese: 'lo', type: 'prefix', excludeRegions: ['hk'] }, 
  { hanzi: '旧', hanziTraditional: '舊', pinyin: 'jiu', wadegiles: 'chiu', cantonese: 'kau', type: 'prefix', onlyRegions: ['hk'] },
  { hanzi: '新', pinyin: 'xin', wadegiles: 'hsin', cantonese: 'san', type: 'prefix' },
  { hanzi: '大', pinyin: 'da', wadegiles: 'ta', cantonese: 'tai', type: 'prefix' },
  { hanzi: '小', pinyin: 'xiao', wadegiles: 'hsiao', cantonese: 'siu', type: 'prefix' },
  { hanzi: '上', pinyin: 'shang', wadegiles: 'shang', cantonese: 'sheung', type: 'prefix' },
  { hanzi: '下', pinyin: 'xia', wadegiles: 'hsia', cantonese: 'ha', type: 'prefix' },
  { hanzi: '高', pinyin: 'gao', wadegiles: 'kao', cantonese: 'ko', type: 'prefix' },
  { hanzi: '长', hanziTraditional: '長', pinyin: 'chang', wadegiles: 'chang', cantonese: 'cheung', type: 'prefix' },
  { hanzi: '广', hanziTraditional: '廣', pinyin: 'guang', wadegiles: 'kuang', cantonese: 'kwong', type: 'prefix' },
  { hanzi: '平', pinyin: 'ping', wadegiles: 'ping', cantonese: 'ping', type: 'prefix' },
  { hanzi: '安', pinyin: 'an', wadegiles: 'an', cantonese: 'on', type: 'prefix' },
  
  // ==========================================
  // DIRECTIONS
  // ==========================================
  { hanzi: '北', pinyin: 'bei', wadegiles: 'pei', cantonese: 'pak', type: 'direction' },
  { hanzi: '南', pinyin: 'nan', wadegiles: 'nan', cantonese: 'nam', type: 'direction' },
  { hanzi: '东', hanziTraditional: '東', pinyin: 'dong', wadegiles: 'tung', cantonese: 'tung', type: 'direction' },
  { hanzi: '西', pinyin: 'xi', wadegiles: 'hsi', cantonese: 'sai', type: 'direction' },
  { hanzi: '中', pinyin: 'zhong', wadegiles: 'chung', cantonese: 'chung', type: 'direction' },
  
  // ==========================================
  // NUMBERS (Common in Placenames)
  // ==========================================
  { hanzi: '一', pinyin: 'yi', wadegiles: 'i', cantonese: 'yat', type: 'number' },
  { hanzi: '二', pinyin: 'er', wadegiles: 'erh', cantonese: 'yi', type: 'number' },
  { hanzi: '三', pinyin: 'san', wadegiles: 'san', cantonese: 'sam', type: 'number' },
  { hanzi: '四', pinyin: 'si', wadegiles: 'szu', cantonese: 'sze', type: 'number' },
  { hanzi: '五', pinyin: 'wu', wadegiles: 'wu', cantonese: 'ng', type: 'number' },
  { hanzi: '六', pinyin: 'liu', wadegiles: 'liu', cantonese: 'luk', type: 'number' },
  { hanzi: '七', pinyin: 'qi', wadegiles: 'chi', cantonese: 'tsat', type: 'number' },
  { hanzi: '八', pinyin: 'ba', wadegiles: 'pa', cantonese: 'bat', type: 'number' },
  { hanzi: '九', pinyin: 'jiu', wadegiles: 'chiu', cantonese: 'kau', type: 'number' },
  { hanzi: '十', pinyin: 'shi', wadegiles: 'shih', cantonese: 'sap', type: 'number' },
  
  // ==========================================
  // FIVE ELEMENTS
  // ==========================================
  { hanzi: '金', pinyin: 'jin', wadegiles: 'chin', cantonese: 'kam', type: 'noun' }, // Metal/Gold
  { hanzi: '木', pinyin: 'mu', wadegiles: 'mu', cantonese: 'muk', type: 'noun' }, // Wood
  { hanzi: '水', pinyin: 'shui', wadegiles: 'shui', cantonese: 'shui', type: 'noun' }, // Water
  { hanzi: '火', pinyin: 'huo', wadegiles: 'huo', cantonese: 'fo', type: 'noun' }, // Fire
  { hanzi: '土', pinyin: 'tu', wadegiles: 'tu', cantonese: 'to', type: 'noun' }, // Earth
  
  // ==========================================
  // ICONIC ANIMALS (Restricted list)
  // ==========================================
  { hanzi: '龙', hanziTraditional: '龍', pinyin: 'long', wadegiles: 'lung', cantonese: 'lung', type: 'noun' }, 
  { hanzi: '凤', hanziTraditional: '鳳', pinyin: 'feng', wadegiles: 'feng', cantonese: 'fung', type: 'noun' }, 
  { hanzi: '虎', pinyin: 'hu', wadegiles: 'hu', cantonese: 'fu', type: 'noun' }, 
  { hanzi: '鹤', hanziTraditional: '鶴', pinyin: 'he', wadegiles: 'ho', cantonese: 'hok', type: 'noun' }, 
  { hanzi: '麟', pinyin: 'lin', wadegiles: 'lin', cantonese: 'lun', type: 'noun' }, 
  { hanzi: '马', hanziTraditional: '馬', pinyin: 'ma', wadegiles: 'ma', cantonese: 'ma', type: 'noun' }, 
  { hanzi: '鹿', pinyin: 'lu', wadegiles: 'lu', cantonese: 'luk', type: 'noun' }, 
  { hanzi: '牛', pinyin: 'niu', wadegiles: 'niu', cantonese: 'ngau', type: 'noun' }, 
  { hanzi: '鲤', hanziTraditional: '鯉', pinyin: 'li', wadegiles: 'li', cantonese: 'lei', type: 'noun' }, 
  { hanzi: '鱼', hanziTraditional: '魚', pinyin: 'yu', wadegiles: 'yu', cantonese: 'yue', type: 'noun' }, 

  // ==========================================
  // GEOGRAPHY & NATURE
  // ==========================================
  { hanzi: '江', pinyin: 'jiang', wadegiles: 'chiang', cantonese: 'kong', type: 'nature' }, // Major River
  { hanzi: '河', pinyin: 'he', wadegiles: 'ho', cantonese: 'ho', type: 'nature' }, // River
  { hanzi: '湖', pinyin: 'hu', wadegiles: 'hu', cantonese: 'wu', type: 'nature' }, // Lake
  { hanzi: '海', pinyin: 'hai', wadegiles: 'hai', cantonese: 'hoi', type: 'nature' }, // Sea
  { hanzi: '洋', pinyin: 'yang', wadegiles: 'yang', cantonese: 'yeung', type: 'nature' }, // Ocean
  { hanzi: '湾', hanziTraditional: '灣', pinyin: 'wan', wadegiles: 'wan', cantonese: 'wan', type: 'nature' }, // Bay
  { hanzi: '泉', pinyin: 'quan', wadegiles: 'chuan', cantonese: 'chuen', type: 'nature' }, // Spring
  { hanzi: '溪', pinyin: 'xi', wadegiles: 'chi', cantonese: 'kai', type: 'nature' }, // Stream/Creek
  { hanzi: '池', pinyin: 'chi', wadegiles: 'chih', cantonese: 'chi', type: 'nature' }, // Pond
  { hanzi: '山', pinyin: 'shan', wadegiles: 'shan', cantonese: 'shan', type: 'nature' }, // Mountain
  { hanzi: '岭', hanziTraditional: '嶺', pinyin: 'ling', wadegiles: 'ling', cantonese: 'leng', type: 'nature' }, // Ridge
  { hanzi: '峰', pinyin: 'feng', wadegiles: 'feng', cantonese: 'fung', type: 'nature' }, // Peak
  { hanzi: '石', pinyin: 'shi', wadegiles: 'shih', cantonese: 'shek', type: 'nature' }, // Stone
  { hanzi: '岩', pinyin: 'yan', wadegiles: 'yen', cantonese: 'ngam', type: 'nature' }, // Rock/Cliff
  { hanzi: '岛', hanziTraditional: '島', pinyin: 'dao', wadegiles: 'tao', cantonese: 'to', type: 'nature' }, // Island
  { hanzi: '林', pinyin: 'lin', wadegiles: 'lin', cantonese: 'lam', type: 'nature' }, // Forest
  { hanzi: '原', pinyin: 'yuan', wadegiles: 'yuen', cantonese: 'yuen', type: 'nature' }, // Plain/Field
  { hanzi: '田', pinyin: 'tian', wadegiles: 'tien', cantonese: 'tin', type: 'nature' }, // Rice Field
  { hanzi: '谷', pinyin: 'gu', wadegiles: 'ku', cantonese: 'kuk', type: 'nature' }, // Valley
  { hanzi: '川', pinyin: 'chuan', wadegiles: 'chuan', cantonese: 'tsuen', type: 'nature' }, // River/Plain
  { hanzi: '沙', pinyin: 'sha', wadegiles: 'sha', cantonese: 'sha', type: 'nature' }, // Sand
  { hanzi: '角', pinyin: 'jiao', wadegiles: 'chiao', cantonese: 'kok', type: 'nature' }, // Corner/Cape
  { hanzi: '洲', pinyin: 'zhou', wadegiles: 'chou', cantonese: 'chau', type: 'nature' }, // Islet/Continent
  { hanzi: '云', hanziTraditional: '雲', pinyin: 'yun', wadegiles: 'yun', cantonese: 'wan', type: 'noun' }, // Cloud
  { hanzi: '松', pinyin: 'song', wadegiles: 'sung', cantonese: 'chung', type: 'noun' }, // Pine
  { hanzi: '梅', pinyin: 'mei', wadegiles: 'mei', cantonese: 'mui', type: 'noun' }, // Plum
  { hanzi: '柳', pinyin: 'liu', wadegiles: 'liu', cantonese: 'lau', type: 'noun' }, // Willow
  { hanzi: '柏', pinyin: 'bai', wadegiles: 'pai', cantonese: 'pak', type: 'noun' }, // Cypress
  { hanzi: '桃', pinyin: 'tao', wadegiles: 'tao', cantonese: 'to', type: 'noun' }, // Peach
  { hanzi: '兰', hanziTraditional: '蘭', pinyin: 'lan', wadegiles: 'lan', cantonese: 'lan', type: 'noun' }, // Orchid
  { hanzi: '莲', hanziTraditional: '蓮', pinyin: 'lian', wadegiles: 'lien', cantonese: 'lin', type: 'noun' }, // Lotus
  { hanzi: '竹', pinyin: 'zhu', wadegiles: 'chu', cantonese: 'chuk', type: 'noun' }, // Bamboo
  
  // ==========================================
  // HK SPECIFIC TOPONYMS (Authentic)
  // ==========================================
  { hanzi: '涌', pinyin: 'chong', wadegiles: 'chung', cantonese: 'chung', type: 'nature', onlyRegions: ['hk', 'cn'] }, // Stream
  { hanzi: '澳', pinyin: 'ao', wadegiles: 'ao', cantonese: 'o', type: 'nature', onlyRegions: ['hk', 'cn', 'tw'] }, // Inlet/Bay
  { hanzi: '嘴', pinyin: 'zui', wadegiles: 'tsui', cantonese: 'tsui', type: 'nature', onlyRegions: ['hk', 'cn'] }, // Cape
  { hanzi: '塘', pinyin: 'tang', wadegiles: 'tang', cantonese: 'tong', type: 'nature', onlyRegions: ['hk', 'cn'] }, // Pond
  { hanzi: '埔', pinyin: 'bu', wadegiles: 'pu', cantonese: 'po', type: 'nature', onlyRegions: ['hk', 'cn', 'tw'] }, // Plain/Port
  { hanzi: '埗', pinyin: 'bu', wadegiles: 'pu', cantonese: 'po', type: 'nature', onlyRegions: ['hk'] }, // Pier
  { hanzi: '朗', pinyin: 'lang', wadegiles: 'lang', cantonese: 'long', type: 'nature', onlyRegions: ['hk'] }, // Alt 塱
  { hanzi: '塱', pinyin: 'lang', wadegiles: 'lang', cantonese: 'long', type: 'nature', onlyRegions: ['hk'] }, // Low-lying land adjacent to river/lake
  { hanzi: '葵', pinyin: 'kui', wadegiles: 'kui', cantonese: 'kwai', type: 'noun', onlyRegions: ['hk'] }, // Sunflower
  { hanzi: '青', pinyin: 'qing', wadegiles: 'ching', cantonese: 'tsing', type: 'adjective' }, // Green
  { hanzi: '衣', pinyin: 'yi', wadegiles: 'i', cantonese: 'yi', type: 'noun', onlyRegions: ['hk'] }, // Clothes
  { hanzi: '井', pinyin: 'jing', wadegiles: 'ching', cantonese: 'tseng', type: 'nature', onlyRegions: ['hk', 'tw'] }, // Well
  { hanzi: '油', pinyin: 'you', wadegiles: 'yu', cantonese: 'yau', type: 'noun', onlyRegions: ['hk'] }, // Oil
  { hanzi: '麻', pinyin: 'ma', wadegiles: 'ma', cantonese: 'ma', type: 'noun', onlyRegions: ['hk'] }, // Hemp
  { hanzi: '地', pinyin: 'di', wadegiles: 'ti', cantonese: 'tei', type: 'nature', onlyRegions: ['hk'] }, // Ground
  { hanzi: '粉', pinyin: 'fen', wadegiles: 'fen', cantonese: 'fan', type: 'noun', onlyRegions: ['hk'] }, // Powder
  { hanzi: '鑽', pinyin: 'zuan', wadegiles: 'tsuan', cantonese: 'chuen', type: 'adjective', onlyRegions: ['hk'] }, // Diamond

  // ==========================================
  // TAIWAN/HOKKIEN SPECIFIC
  // ==========================================
  { hanzi: '坑', pinyin: 'keng', wadegiles: 'keng', cantonese: 'hang', type: 'nature', onlyRegions: ['tw', 'hk', 'cn'] }, // Pit/Valley
  { hanzi: '潭', pinyin: 'tan', wadegiles: 'tan', cantonese: 'tam', type: 'nature', onlyRegions: ['tw', 'cn'] }, // Pool/Deep pond
  { hanzi: '坪', pinyin: 'ping', wadegiles: 'ping', cantonese: 'ping', type: 'nature', onlyRegions: ['tw', 'hk'] }, // Flat land
  { hanzi: '墘', pinyin: 'qian', wadegiles: 'chien', cantonese: 'kin', type: 'nature', onlyRegions: ['tw'] }, // Edge/Bank

  // ==========================================
  // CIVIC / SETTLEMENTS (No Roads/Estates)
  // ==========================================
  { hanzi: '京', pinyin: 'jing', wadegiles: 'ching', cantonese: 'king', type: 'civic', excludeRegions: ['hk'] }, // Capital
  { hanzi: '都', pinyin: 'du', wadegiles: 'tu', cantonese: 'to', type: 'civic', excludeRegions: ['hk'] }, // Metropolis
  { hanzi: '城', pinyin: 'cheng', wadegiles: 'cheng', cantonese: 'shing', type: 'civic' }, // City/Wall
  { hanzi: '镇', hanziTraditional: '鎮', pinyin: 'zhen', wadegiles: 'chen', cantonese: 'chun', type: 'civic', excludeRegions: ['hk'] }, // Town
  { hanzi: '乡', hanziTraditional: '鄉', pinyin: 'xiang', wadegiles: 'hsiang', cantonese: 'heung', type: 'civic', excludeRegions: ['hk'] }, // Township
  { hanzi: '村', pinyin: 'cun', wadegiles: 'tsun', cantonese: 'tsuen', type: 'civic' }, // Village
  { hanzi: '庄', hanziTraditional: '莊', pinyin: 'zhuang', wadegiles: 'chuang', cantonese: 'chong', type: 'civic' }, // Manor/Village
  { hanzi: '门', hanziTraditional: '門', pinyin: 'men', wadegiles: 'men', cantonese: 'mun', type: 'civic' }, // Gate
  { hanzi: '关', hanziTraditional: '關', pinyin: 'guan', wadegiles: 'kuan', cantonese: 'kwan', type: 'civic' }, // Pass
  { hanzi: '港', pinyin: 'gang', wadegiles: 'kang', cantonese: 'kong', type: 'civic' }, // Port
  { hanzi: '州', pinyin: 'zhou', wadegiles: 'chou', cantonese: 'chau', type: 'civic', excludeRegions: ['hk'] }, // Prefecture
  { hanzi: '国', hanziTraditional: '國', pinyin: 'guo', wadegiles: 'kuo', cantonese: 'kwok', type: 'civic', excludeRegions: ['hk']}, // Country
  { hanzi: '市', pinyin: 'shi', wadegiles: 'shih', cantonese: 'si', type: 'civic', excludeRegions: ['hk'] }, // City
  { hanzi: '省', pinyin: 'sheng', wadegiles: 'sheng', cantonese: 'shang', type: 'civic', excludeRegions: ['hk', 'tw'] }, // Province
  { hanzi: '屯', pinyin: 'tun', wadegiles: 'tun', cantonese: 'tuen', type: 'civic', excludeRegions: ['hk'] }, // Settlement
  { hanzi: '寨', pinyin: 'zhai', wadegiles: 'chai', cantonese: 'chai', type: 'civic' }, // Stockade
  { hanzi: '桥', hanziTraditional: '橋', pinyin: 'qiao', wadegiles: 'chiao', cantonese: 'kiu', type: 'civic' }, // Bridge
  
  // Taiwan Specific Suffixes
  { hanzi: '里', pinyin: 'li', wadegiles: 'li', cantonese: 'lei', type: 'suffix', onlyRegions: ['tw'] }, // Neighborhood
  { hanzi: '寮', pinyin: 'liao', wadegiles: 'liao', cantonese: 'liu', type: 'suffix', onlyRegions: ['tw'] }, // Hut
  { hanzi: '厝', pinyin: 'cuo', wadegiles: 'tso', cantonese: 'cho', type: 'suffix', onlyRegions: ['tw'] }, // House
  
  // HK/Traditional Suffixes
  { hanzi: '围', hanziTraditional: '圍', pinyin: 'wei', wadegiles: 'wei', cantonese: 'wai', type: 'suffix', onlyRegions: ['hk', 'cn'] }, // Walled Village

  // ==========================================
  // ADJECTIVES & ABSTRACT CONCEPTS (Auspicious)
  // ==========================================
  { hanzi: '安', pinyin: 'an', wadegiles: 'an', cantonese: 'on', type: 'adjective' }, 
  { hanzi: '平', pinyin: 'ping', wadegiles: 'ping', cantonese: 'ping', type: 'adjective' }, 
  { hanzi: '福', pinyin: 'fu', wadegiles: 'fu', cantonese: 'fook', type: 'adjective' }, 
  { hanzi: '金', pinyin: 'jin', wadegiles: 'chin', cantonese: 'kam', type: 'adjective' }, 
  { hanzi: '青', pinyin: 'qing', wadegiles: 'tsing', cantonese: 'tsing', type: 'adjective' }, 
  { hanzi: '白', pinyin: 'bai', wadegiles: 'pai', cantonese: 'pak', type: 'adjective' }, 
  { hanzi: '红', hanziTraditional: '紅', pinyin: 'hong', wadegiles: 'hung', cantonese: 'hung', type: 'adjective' }, 
  { hanzi: '黄', hanziTraditional: '黃', pinyin: 'huang', wadegiles: 'huang', cantonese: 'wong', type: 'adjective' }, 
  { hanzi: '阳', hanziTraditional: '陽', pinyin: 'yang', wadegiles: 'yang', cantonese: 'yeung', type: 'noun' }, 
  { hanzi: '香', pinyin: 'xiang', wadegiles: 'hsiang', cantonese: 'heung', type: 'adjective' }, 
  { hanzi: '宁', hanziTraditional: '寧', pinyin: 'ning', wadegiles: 'ning', cantonese: 'ning', type: 'adjective' }, 
  { hanzi: '德', pinyin: 'de', wadegiles: 'te', cantonese: 'tak', type: 'adjective' }, 
  { hanzi: '秀', pinyin: 'xiu', wadegiles: 'hsiu', cantonese: 'sau', type: 'adjective' }, 
  { hanzi: '华', hanziTraditional: '華', pinyin: 'hua', wadegiles: 'hua', cantonese: 'wah', type: 'adjective' }, 
  { hanzi: '圣', hanziTraditional: '聖', pinyin: 'sheng', wadegiles: 'sheng', cantonese: 'sing', type: 'adjective' }, 
  { hanzi: '昌', pinyin: 'chang', wadegiles: 'chang', cantonese: 'cheong', type: 'adjective' }, 
  { hanzi: '祥', pinyin: 'xiang', wadegiles: 'hsiang', cantonese: 'cheung', type: 'adjective' }, 
  { hanzi: '宏', pinyin: 'hong', wadegiles: 'hung', cantonese: 'wang', type: 'adjective' }, 
  { hanzi: '瑞', pinyin: 'rui', wadegiles: 'jui', cantonese: 'sui', type: 'adjective' }, 
  { hanzi: '乐', hanziTraditional: '樂', pinyin: 'le', wadegiles: 'le', cantonese: 'lok', type: 'adjective' }, 
  { hanzi: '顺', hanziTraditional: '順', pinyin: 'shun', wadegiles: 'shun', cantonese: 'shun', type: 'adjective' }, 
  { hanzi: '泰', pinyin: 'tai', wadegiles: 'tai', cantonese: 'tai', type: 'adjective' }, 
  { hanzi: '荣', hanziTraditional: '榮', pinyin: 'rong', wadegiles: 'jung', cantonese: 'wing', type: 'adjective' }, 
  { hanzi: '翠', pinyin: 'cui', wadegiles: 'tsui', cantonese: 'chui', type: 'adjective' }, 
  { hanzi: '清', pinyin: 'qing', wadegiles: 'ching', cantonese: 'tsing', type: 'adjective' }, 
  { hanzi: '玉', pinyin: 'yu', wadegiles: 'yu', cantonese: 'yuk', type: 'noun' }, 
  { hanzi: '宝', hanziTraditional: '寶', pinyin: 'bao', wadegiles: 'pao', cantonese: 'po', type: 'noun' }, 
  { hanzi: '光', pinyin: 'guang', wadegiles: 'kuang', cantonese: 'kwong', type: 'noun' }, 
  { hanzi: '丰', hanziTraditional: '豐', pinyin: 'feng', wadegiles: 'feng', cantonese: 'fung', type: 'adjective' }, 
  { hanzi: '嘉', pinyin: 'jia', wadegiles: 'chia', cantonese: 'ka', type: 'adjective' }, 
  { hanzi: '兴', hanziTraditional: '興', pinyin: 'xing', wadegiles: 'hsing', cantonese: 'hing', type: 'adjective' }, 
];

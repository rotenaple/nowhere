export type RegionCode = 'cn' | 'hk' | 'tw';

export type ComponentType = 
  | 'direction' 
  | 'number' 
  | 'color'          
  | 'adj_elegant'    
  | 'adj_physical'   
  | 'noun_concrete'  
  | 'nature_head'    
  | 'civic_suffix'   
  | 'civic_built';   

export type SemanticCategory = 
  | 'general' | 'animal' | 'plant' | 'mineral' | 'celestial' 
  | 'water' | 'land' | 'admin' | 'infra' | 'season';

export interface ChineseComponent {
  han: string;       
  hans?: string;     
  cn?: string;       
  tw?: string;       
  hk?: string;       
  type: ComponentType;
  category?: SemanticCategory;
  def: string;       
  english?: string;  
}

// ==========================================
// DICTIONARY (EXACT MATCH)
// ==========================================

export const ZH_COMPONENTS: ChineseComponent[] = [
  // --- COLORS ---
  { han: '白', cn: 'bai', tw: 'pai', hk: 'pak', type: 'color', def: 'white' },
  { han: '黑', cn: 'hei', tw: 'hei', hk: 'hak', type: 'color', def: 'black' },
  { han: '赤', cn: 'chi', tw: 'chih', hk: 'chek', type: 'color', def: 'crimson' },
  { han: '紅', hans: '红', cn: 'hong', tw: 'hung', hk: 'hung', type: 'color', def: 'red' },
  { han: '黃', hans: '黄', cn: 'huang', tw: 'huang', hk: 'wong', type: 'color', def: 'yellow' },
  { han: '藍', hans: '蓝', cn: 'lan', tw: 'lan', hk: 'lam', type: 'color', def: 'blue' },
  { han: '碧', cn: 'bi', tw: 'pi', hk: 'pik', type: 'color', def: 'jade green' },
  { han: '青', cn: 'qing', tw: 'ching', hk: 'tsing', type: 'color', def: 'verdant/teal' },
  { han: '翠', cn: 'cui', tw: 'tsui', hk: 'chui', type: 'color', def: 'emerald' },
  { han: '紫', cn: 'zi', tw: 'tzu', hk: 'tsz', type: 'color', def: 'purple' },
  { han: '金', cn: 'jin', tw: 'chin', hk: 'kam', type: 'color', category: 'mineral', def: 'golden' },

  // --- ADJECTIVE - ELEGANT (Virtue/Fortune) ---
  { han: '美', cn: 'mei', tw: 'mei', hk: 'mei', type: 'adj_elegant', def: 'beautiful' },
  { han: '秀', cn: 'xiu', tw: 'hsiu', hk: 'sau', type: 'adj_elegant', def: 'elegant' },
  { han: '華', hans: '华', cn: 'hua', tw: 'hua', hk: 'wah', type: 'adj_elegant', def: 'magnificent' },
  { han: '錦', hans: '锦', cn: 'jin', tw: 'chin', hk: 'kam', type: 'adj_elegant', def: 'splendid' },
  { han: '嘉', cn: 'jia', tw: 'chia', hk: 'ka', type: 'adj_elegant', def: 'excellent' },
  { han: '香', cn: 'xiang', tw: 'hsiang', hk: 'heung', type: 'adj_elegant', def: 'fragrant' },
  { han: '清', cn: 'qing', tw: 'ching', hk: 'tsing', type: 'adj_elegant', def: 'pure' },
  { han: '仁', cn: 'ren', tw: 'jen', hk: 'yan', type: 'adj_elegant', def: 'benevolence' },
  { han: '義', hans: '义', cn: 'yi', tw: 'i', hk: 'yee', type: 'adj_elegant', def: 'righteousness' },
  { han: '信', cn: 'xin', tw: 'hsin', hk: 'shun', type: 'adj_elegant', def: 'trust' },
  { han: '德', cn: 'de', tw: 'te', hk: 'tak', type: 'adj_elegant', def: 'virtue' },
  { han: '福', cn: 'fu', tw: 'fu', hk: 'fook', type: 'adj_elegant', def: 'blessing' },
  { han: '富', cn: 'fu', tw: 'fu', hk: 'fu', type: 'adj_elegant', def: 'wealth' },
  { han: '貴', hans: '贵', cn: 'gui', tw: 'kui', hk: 'kwai', type: 'adj_elegant', def: 'noble' },
  { han: '榮', hans: '荣', cn: 'rong', tw: 'jung', hk: 'wing', type: 'adj_elegant', def: 'glory' },
  { han: '昌', cn: 'chang', tw: 'chang', hk: 'cheong', type: 'adj_elegant', def: 'prosperous' },
  { han: '興', hans: '兴', cn: 'xing', tw: 'hsing', hk: 'hing', type: 'adj_elegant', def: 'thriving' },
  { han: '豐', hans: '丰', cn: 'feng', tw: 'feng', hk: 'fung', type: 'adj_elegant', def: 'bountiful' },
  { han: '祥', cn: 'xiang', tw: 'hsiang', hk: 'cheung', type: 'adj_elegant', def: 'auspicious' },
  { han: '瑞', cn: 'rui', tw: 'jui', hk: 'sui', type: 'adj_elegant', def: 'propitious' },
  { han: '安', cn: 'an', tw: 'an', hk: 'on', type: 'adj_elegant', def: 'peace' },
  { han: '寧', hans: '宁', cn: 'ning', tw: 'ning', hk: 'ning', type: 'adj_elegant', def: 'tranquility' },
  { han: '平', cn: 'ping', tw: 'ping', hk: 'ping', type: 'adj_elegant', def: 'peace/level' },
  { han: '和', cn: 'he', tw: 'ho', hk: 'wo', type: 'adj_elegant', def: 'harmony' },
  { han: '泰', cn: 'tai', tw: 'tai', hk: 'tai', type: 'adj_elegant', def: 'exalted' },
  { han: '順', hans: '顺', cn: 'shun', tw: 'shun', hk: 'shun', type: 'adj_elegant', def: 'smooth' },
  { han: '樂', hans: '乐', cn: 'le', tw: 'le', hk: 'lok', type: 'adj_elegant', def: 'joy' },
  { han: '康', cn: 'kang', tw: 'kang', hk: 'hong', type: 'adj_elegant', def: 'health' },
  { han: '永', cn: 'yong', tw: 'yung', hk: 'wing', type: 'adj_elegant', def: 'perpetual' },
  { han: '禮', hans: '礼', cn: 'li', tw: 'li', hk: 'lai', type: 'adj_elegant', def: 'propriety' },
  { han: '智', cn: 'zhi', tw: 'chih', hk: 'chi', type: 'adj_elegant', def: 'wisdom' },
  { han: '忠', cn: 'zhong', tw: 'chung', hk: 'chung', type: 'adj_elegant', def: 'loyalty' },
  { han: '聖', hans: '圣', cn: 'sheng', tw: 'sheng', hk: 'sing', type: 'adj_elegant', def: 'holy/sage' },
  { han: '正', cn: 'zheng', tw: 'cheng', hk: 'ching', type: 'adj_elegant', def: 'upright' },
  { han: '達', hans: '达', cn: 'da', tw: 'ta', hk: 'tat', type: 'adj_elegant', def: 'eminent' },
  { han: '宏', cn: 'hong', tw: 'hung', hk: 'wang', type: 'adj_elegant', def: 'grand' },

  // --- ADJECTIVE - PHYSICAL ---
  { han: '大', cn: 'da', tw: 'ta', hk: 'tai', type: 'adj_physical', def: 'big' },
  { han: '小', cn: 'xiao', tw: 'hsiao', hk: 'siu', type: 'adj_physical', def: 'small' },
  { han: '高', cn: 'gao', tw: 'kao', hk: 'ko', type: 'adj_physical', def: 'high' },
  { han: '長', hans: '长', cn: 'chang', tw: 'chang', hk: 'cheung', type: 'adj_physical', def: 'long' },
  { han: '廣', hans: '广', cn: 'guang', tw: 'kuang', hk: 'kwong', type: 'adj_physical', def: 'broad' },
  { han: '新', cn: 'xin', tw: 'hsin', hk: 'san', type: 'adj_physical', def: 'new' },
  { han: '老', cn: 'lao', tw: 'lao', type: 'adj_physical', def: 'old' },
  { han: '舊', hk: 'gau', type: 'adj_physical', def: 'old' },
  { han: '上', cn: 'shang', tw: 'shang', hk: 'sheung', type: 'adj_physical', def: 'upper' },
  { han: '下', cn: 'xia', tw: 'hsia', hk: 'ha', type: 'adj_physical', def: 'lower' },
  { han: '陽', hans: '阳', cn: 'yang', tw: 'yang', hk: 'yeung', type: 'adj_physical', def: 'sunny side, south of mtn/north of river' },
  { han: '陰', hans: '阴', cn: 'yin', tw: 'yin', hk: 'yam', type: 'adj_physical', def: 'shady side, north of mtn/south of river' },
  
  // --- NOUN CONCRETE (Modifiers) ---
  // Animals
  { han: '龍', hans: '龙', cn: 'long', tw: 'lung', hk: 'lung', type: 'noun_concrete', category: 'animal', def: 'dragon' },
  { han: '鳳', hans: '凤', cn: 'feng', tw: 'feng', hk: 'fung', type: 'noun_concrete', category: 'animal', def: 'phoenix' },
  { han: '麟', cn: 'lin', tw: 'lin', hk: 'lun', type: 'noun_concrete', category: 'animal', def: 'kylin' },
  { han: '虎', cn: 'hu', tw: 'hu', hk: 'fu', type: 'noun_concrete', category: 'animal', def: 'tiger' },
  { han: '獅', hans: '狮', cn: 'shi', tw: 'shih', hk: 'sze', type: 'noun_concrete', category: 'animal', def: 'lion' },
  { han: '象', cn: 'xiang', tw: 'hsiang', hk: 'jeung', type: 'noun_concrete', category: 'animal', def: 'elephant' },
  { han: '馬', hans: '马', cn: 'ma', tw: 'ma', hk: 'ma', type: 'noun_concrete', category: 'animal', def: 'horse' },
  { han: '牛', cn: 'niu', tw: 'niu', hk: 'ngau', type: 'noun_concrete', category: 'animal', def: 'ox' },
  { han: '鹿', cn: 'lu', tw: 'lu', hk: 'luk', type: 'noun_concrete', category: 'animal', def: 'deer' },
  { han: '魚', hans: '鱼', cn: 'yu', tw: 'yu', hk: 'yue', type: 'noun_concrete', category: 'animal', def: 'fish' },
  { han: '鯉', hans: '鲤', cn: 'li', tw: 'li', hk: 'lei', type: 'noun_concrete', category: 'animal', def: 'carp' },
  { han: '鶴', hans: '鹤', cn: 'he', tw: 'ho', hk: 'hok', type: 'noun_concrete', category: 'animal', def: 'crane' },
  { han: '鷹', hans: '鹰', cn: 'ying', tw: 'ying', hk: 'ying', type: 'noun_concrete', category: 'animal', def: 'eagle' },
  { han: '燕', cn: 'yan', tw: 'yen', hk: 'yin', type: 'noun_concrete', category: 'animal', def: 'swallow' },
  { han: '蝴蝶', cn: 'hudie', tw: 'hu-tieh', hk: 'wu dip', type: 'noun_concrete', category: 'animal', def: 'butterfly' },

  // Plants
  { han: '花', cn: 'hua', tw: 'hua', hk: 'fa', type: 'noun_concrete', category: 'plant', def: 'flower' },
  { han: '松', cn: 'song', tw: 'sung', hk: 'chung', type: 'noun_concrete', category: 'plant', def: 'pine' },
  { han: '柏', cn: 'bai', tw: 'pai', hk: 'pak', type: 'noun_concrete', category: 'plant', def: 'cypress' },
  { han: '柳', cn: 'liu', tw: 'liu', hk: 'lau', type: 'noun_concrete', category: 'plant', def: 'willow' },
  { han: '竹', cn: 'zhu', tw: 'chu', hk: 'chuk', type: 'noun_concrete', category: 'plant', def: 'bamboo' },
  { han: '桃', cn: 'tao', tw: 'tao', hk: 'to', type: 'noun_concrete', category: 'plant', def: 'peach' },
  { han: '梅', cn: 'mei', tw: 'mei', hk: 'mui', type: 'noun_concrete', category: 'plant', def: 'plum' },
  { han: '蘭', hans: '兰', cn: 'lan', tw: 'lan', hk: 'lan', type: 'noun_concrete', category: 'plant', def: 'orchid' },
  { han: '蓮', hans: '莲', cn: 'lian', tw: 'lien', hk: 'lin', type: 'noun_concrete', category: 'plant', def: 'lotus' },
  { han: '茶', cn: 'cha', tw: 'cha', hk: 'cha', type: 'noun_concrete', category: 'plant', def: 'tea' },
  { han: '荷', cn: 'he', tw: 'ho', hk: 'ho', type: 'noun_concrete', category: 'plant', def: 'lotus leaf' },

  // Minerals/Elements
  { han: '金', cn: 'jin', tw: 'chin', hk: 'kam', type: 'noun_concrete', category: 'mineral', def: 'gold' },
  { han: '玉', cn: 'yu', tw: 'yu', hk: 'yuk', type: 'noun_concrete', category: 'mineral', def: 'jade' },
  { han: '寶', hans: '宝', cn: 'bao', tw: 'pao', hk: 'po', type: 'noun_concrete', category: 'mineral', def: 'treasure' },
  { han: '珠', cn: 'zhu', tw: 'chu', hk: 'chu', type: 'noun_concrete', category: 'mineral', def: 'pearl' },
  { han: '銀', hans: '银', cn: 'yin', tw: 'yin', hk: 'ngan', type: 'noun_concrete', category: 'mineral', def: 'silver' },
  { han: '鐵', hans: '铁', cn: 'tie', tw: 'tieh', hk: 'tit', type: 'noun_concrete', category: 'mineral', def: 'iron' },
  { han: '銅', hans: '铜', cn: 'tong', tw: 'tung', hk: 'tung', type: 'noun_concrete', category: 'mineral', def: 'copper' },
  { han: '鹽', hans: '盐', cn: 'yan', tw: 'yen', hk: 'yim', type: 'noun_concrete', category: 'mineral', def: 'salt' },
  
  // Celestial/Weather
  { han: '天', cn: 'tian', tw: 'tien', hk: 'tin', type: 'noun_concrete', category: 'celestial', def: 'heaven' },
  { han: '日', cn: 'ri', tw: 'jih', hk: 'yat', type: 'noun_concrete', category: 'celestial', def: 'sun' },
  { han: '月', cn: 'yue', tw: 'yueh', hk: 'yuet', type: 'noun_concrete', category: 'celestial', def: 'moon' },
  { han: '星', cn: 'xing', tw: 'hsing', hk: 'sing', type: 'noun_concrete', category: 'celestial', def: 'star' },
  { han: '雲', hans: '云', cn: 'yun', tw: 'yun', hk: 'wan', type: 'noun_concrete', category: 'celestial', def: 'cloud' },
  { han: '光', cn: 'guang', tw: 'kuang', hk: 'kwong', type: 'noun_concrete', category: 'celestial', def: 'light' },
  { han: '風', cn: 'feng', tw: 'feng', hk: 'fung', type: 'noun_concrete', category: 'celestial', def: 'wind' },
  // Seasons
  { han: '春', cn: 'chun', tw: 'chun', hk: 'chun', type: 'noun_concrete', category: 'season', def: 'spring' },
  { han: '夏', cn: 'xia', tw: 'hsia', hk: 'ha', type: 'noun_concrete', category: 'season', def: 'summer' },
  { han: '秋', cn: 'qiu', tw: 'chiu', hk: 'chau', type: 'noun_concrete', category: 'season', def: 'autumn' },
  { han: '冬', cn: 'dong', tw: 'tung', hk: 'tung', type: 'noun_concrete', category: 'season', def: 'winter' },

  // --- NATURE HEAD (Main Feature) ---
  // Water
  { han: '江', cn: 'jiang', tw: 'chiang', hk: 'kong', type: 'nature_head', category: 'water', english: 'River', def: 'large river' },
  { han: '河', cn: 'he', tw: 'ho', hk: 'ho', type: 'nature_head', category: 'water', english: 'River', def: 'river' },
  { han: '川', cn: 'chuan', tw: 'chuan', hk: 'tsuen', type: 'nature_head', category: 'water', def: 'river' },
  { han: '溪', cn: 'xi', tw: 'chi', hk: 'kai', type: 'nature_head', category: 'water', english: 'Creek', def: 'stream' },
  { han: '涌', cn: 'chong', hk: 'chung', type: 'nature_head', category: 'water', def: 'creek' }, 
  { han: '泉', cn: 'quan', tw: 'chuan', hk: 'chuen', type: 'nature_head', category: 'water', english: 'Spring', def: 'spring' },
  { han: '海', cn: 'hai', tw: 'hai', hk: 'hoi', type: 'nature_head', category: 'water', english: 'Sea', def: 'sea' },
  { han: '洋', cn: 'yang', tw: 'yang', hk: 'yeung', type: 'nature_head', category: 'water', def: 'ocean' },
  { han: '灣', hans: '湾', cn: 'wan', tw: 'wan', hk: 'wan', type: 'nature_head', category: 'water', english: 'Bay', def: 'bay' },
  { han: '澳', cn: 'ao', tw: 'ao', hk: 'o', type: 'nature_head', category: 'water', def: 'inlet' },
  { han: '湖', cn: 'hu', tw: 'hu', hk: 'wu', type: 'nature_head', category: 'water', english: 'Lake', def: 'lake' },
  { han: '池', cn: 'chi', tw: 'chih', hk: 'chi', type: 'nature_head', category: 'water', def: 'pond' },
  { han: '塘', cn: 'tang', tw: 'tang', hk: 'tong', type: 'nature_head', category: 'water', def: 'pond' },
  { han: '潭', cn: 'tan', tw: 'tan', hk: 'tam', type: 'nature_head', category: 'water', def: 'pool' },
  { han: '井', cn: 'jing', tw: 'ching', hk: 'tseng', type: 'nature_head', category: 'water', english: 'Well', def: 'well' },
  
  // Land
  { han: '山', cn: 'shan', tw: 'shan', hk: 'shan', type: 'nature_head', category: 'land', english: 'Mountain', def: 'mountain' },
  { han: '峰', cn: 'feng', tw: 'feng', hk: 'fung', type: 'nature_head', category: 'land', english: 'Peak', def: 'peak' },
  { han: '嶺', hans: '岭', cn: 'ling', tw: 'ling', hk: 'leng', type: 'nature_head', category: 'land', english: 'Ridge', def: 'ridge' },
  { han: '岩', cn: 'yan', tw: 'yen', hk: 'ngam', type: 'nature_head', category: 'land', english: 'Rock', def: 'cliff' },
  { han: '島', hans: '岛', cn: 'dao', tw: 'tao', hk: 'to', type: 'nature_head', category: 'land', english: 'Island', def: 'island' },
  { han: '洲', cn: 'zhou', tw: 'chou', hk: 'chau', type: 'nature_head', category: 'land', def: 'islet' },
  { han: '角', cn: 'jiao', tw: 'chiao', hk: 'kok', type: 'nature_head', category: 'land', english: 'Point', def: 'cape' },
  { han: '嘴', cn: 'zui', type: 'nature_head', category: 'land', def: 'promontory' },
  { han: '咀', hk: 'tsui', type: 'nature_head', category: 'land', def: 'headland' },
  { han: '鼻', tw: 'pi', type: 'nature_head', category: 'land', def: 'cape' },
  { han: '墘', tw: 'chien', type: 'nature_head', category: 'land', def: 'river bank' },
  { han: '原', cn: 'yuan', tw: 'yuen', hk: 'yuen', type: 'nature_head', category: 'land', def: 'plain' },
  { han: '田', cn: 'tian', tw: 'tien', hk: 'tin', type: 'nature_head', category: 'land', def: 'field' },
  { han: '谷', cn: 'gu', tw: 'ku', hk: 'kuk', type: 'nature_head', category: 'land', english: 'Valley', def: 'valley' },
  { han: '坑', cn: 'keng', tw: 'keng', hk: 'hang', type: 'nature_head', category: 'land', def: 'gully' },
  { han: '坪', tw: 'ping', hk: 'ping', type: 'nature_head', category: 'land', def: 'terrace' },
  { han: '埔', cn: 'bu', tw: 'pu', hk: 'po', type: 'nature_head', category: 'land', def: 'flatland' },
  { han: '塱', hk: 'long', type: 'nature_head', category: 'land', def: 'low-lying wetland' },
  { han: '朗', cn: 'lang', hk: 'long', type: 'nature_head', category: 'land', def: 'bright land/wetland' },
  { han: '林', cn: 'lin', tw: 'lin', hk: 'lam', type: 'nature_head', category: 'land', english: 'Forest', def: 'forest' },
  { han: '沙', cn: 'sha', tw: 'sha', hk: 'sha', type: 'nature_head', category: 'land', def: 'sand/beach' },

  // --- CIVIC SUFFIX (Admin) ---
  { han: '州', cn: 'zhou', tw: 'chou', type: 'civic_suffix', category: 'admin', def: 'prefecture' }, 
  { han: '市', cn: 'shi', tw: 'shih', type: 'civic_suffix', category: 'admin', def: 'city' }, 
  { han: '城', cn: 'cheng', tw: 'cheng', type: 'civic_suffix', category: 'admin', def: 'walled city' }, 
  { han: '鎮', hans: '镇', cn: 'zhen', tw: 'chen', type: 'civic_suffix', category: 'admin', def: 'town' }, 
  { han: '鄉', hans: '乡', cn: 'xiang', tw: 'hsiang', type: 'civic_suffix', category: 'admin', def: 'township' }, 
  { han: '村', cn: 'cun', tw: 'tsun', hk: 'tsuen', type: 'civic_suffix', category: 'admin', def: 'village' },
  { han: '莊', hans: '庄', cn: 'zhuang', tw: 'chuang', hk: 'chong', type: 'civic_suffix', category: 'admin', def: 'manor' },
  { han: '屯', cn: 'tun', tw: 'tun', type: 'civic_suffix', category: 'admin', def: 'garrison' }, 
  { han: '里', tw: 'li', type: 'civic_suffix', category: 'admin', def: 'neighborhood' },
  { han: '圍', hans: '围', cn: 'wei', hk: 'wai', type: 'civic_suffix', category: 'admin', def: 'walled village' },
  { han: '寮', tw: 'liao', type: 'civic_suffix', category: 'admin', def: 'hut' },
  { han: '厝', tw: 'tso', type: 'civic_suffix', category: 'admin', def: 'house' },

  // --- CIVIC BUILT (Infrastructure) ---
  { han: '門', hans: '门', cn: 'men', tw: 'men', hk: 'mun', type: 'civic_built', category: 'infra', english: 'Gate', def: 'gateway' },
  { han: '關', hans: '关', cn: 'guan', tw: 'kuan', hk: 'kwan', type: 'civic_built', category: 'infra', english: 'Pass', def: 'frontier pass' },
  { han: '寨', cn: 'zhai', tw: 'chai', hk: 'chai', type: 'civic_built', category: 'infra', def: 'fort' },
  { han: '埗', hk: 'po', type: 'civic_built', category: 'infra', def: 'pier' }, 
  { han: '橋', hans: '桥', cn: 'qiao', tw: 'chiao', hk: 'kiu', type: 'civic_built', category: 'infra', english: 'Bridge', def: 'bridge' },
  { han: '港', cn: 'gang', tw: 'kang', hk: 'kong', type: 'civic_built', category: 'infra', english: 'Port', def: 'harbor' },

  // --- DIRECTION ---
  { han: '東', hans: '东', cn: 'dong', tw: 'tung', hk: 'tung', type: 'direction', def: 'east' },
  { han: '南', cn: 'nan', tw: 'nan', hk: 'nam', type: 'direction', def: 'south' },
  { han: '西', cn: 'xi', tw: 'hsi', hk: 'sai', type: 'direction', def: 'west' },
  { han: '北', cn: 'bei', tw: 'pei', hk: 'pak', type: 'direction', def: 'north' },
  { han: '中', cn: 'zhong', tw: 'chung', hk: 'chung', type: 'direction', def: 'central' },

  // --- NUMBERS (Selected) ---
  //{ han: '一', cn: 'yi', tw: 'i', hk: 'yat', type: 'number', def: 'one' },
  //{ han: '二', cn: 'er', tw: 'erh', hk: 'yi', type: 'number', def: 'two' },
  { han: '雙', hans: '双', cn: 'shuang', tw: 'shuang', hk: 'sheung', type: 'number', def: 'two' },
  { han: '三', cn: 'san', tw: 'san', hk: 'sam', type: 'number', def: 'three' },
  { han: '四', cn: 'si', tw: 'szu', hk: 'sze', type: 'number', def: 'four' },
  { han: '五', cn: 'wu', tw: 'wu', hk: 'ng', type: 'number', def: 'five' },
  { han: '六', cn: 'liu', tw: 'liu', hk: 'luk', type: 'number', def: 'six' },
  { han: '七', cn: 'qi', tw: 'chi', hk: 'tsat', type: 'number', def: 'seven' },
  { han: '八', cn: 'ba', tw: 'pa', hk: 'bat', type: 'number', def: 'eight' },
  { han: '九', cn: 'jiu', tw: 'chiu', hk: 'kau', type: 'number', def: 'nine' },
  { han: '十', cn: 'shi', tw: 'shih', hk: 'sap', type: 'number', def: 'ten' },
  { han: '百', cn: 'bai', tw: 'pai', hk: 'pak', type: 'number', def: 'hundred' },
  { han: '千', cn: 'qian', tw: 'chien', hk: 'chin', type: 'number', def: 'thousand' },
  { han: '萬', hans: '万', cn: 'wan', tw: 'wan', hk: 'man', type: 'number', def: 'ten thousand' },
];
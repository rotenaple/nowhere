export interface KoreanComponent {
  rom: string; // Revised Romanization string
  hangul: string;
  // Types used for semantic logic in generation
  type: 
    | 'direction'   // East, West...
    | 'number'      // One, Two...
    | 'color'       // Blue, White...
    | 'quality'     // New, Old, Big, Small, High...
    | 'geo'         // Mountain, River, Lake...
    | 'settlement'  // Town, Fort, Port, Market...
    | 'nature'      // Flower, Pine, Bamboo...
    | 'abstract'    // Peace, Luck, Spirit...
    | 'suffix'      // Administrative suffixes (city, county)
    | 'native_geo'  // Native words for geography
    | 'native_desc';// Native descriptors
  
  def: string;
}

// ==========================================
// 1. PREFIXES & ADJECTIVES (Sino-Korean)
// ==========================================
export const KO_ADJECTIVES: KoreanComponent[] = [
  // Directions
  { rom: 'Buk', hangul: '북', type: 'direction', def: 'North' },
  { rom: 'Nam', hangul: '남', type: 'direction', def: 'South' },
  { rom: 'Dong', hangul: '동', type: 'direction', def: 'East' },
  { rom: 'Seo', hangul: '서', type: 'direction', def: 'West' },
  { rom: 'Jung', hangul: '중', type: 'direction', def: 'Middle' },
  { rom: 'Sang', hangul: '상', type: 'direction', def: 'Upper' },
  { rom: 'Ha', hangul: '하', type: 'direction', def: 'Lower' },
  { rom: 'Nae', hangul: '내', type: 'direction', def: 'Inner' },
  { rom: 'Oe', hangul: '외', type: 'direction', def: 'Outer' },
  
  // Quality / Size
  { rom: 'Sin', hangul: '신', type: 'quality', def: 'New' },
  { rom: 'Gu', hangul: '구', type: 'quality', def: 'Old' },
  { rom: 'Dae', hangul: '대', type: 'quality', def: 'Big' },
  { rom: 'So', hangul: '소', type: 'quality', def: 'Small' },
  { rom: 'Go', hangul: '고', type: 'quality', def: 'High' },
  { rom: 'Jeo', hangul: '저', type: 'quality', def: 'Low' },
  { rom: 'Jang', hangul: '장', type: 'quality', def: 'Long' },
  { rom: 'Myeong', hangul: '명', type: 'quality', def: 'Bright' },
  { rom: 'Seong', hangul: '성', type: 'quality', def: 'Holy/Saint' },
  { rom: 'Jin', hangul: '진', type: 'quality', def: 'True/Precious' },
  { rom: 'Tae', hangul: '태', type: 'quality', def: 'Great/Big' },
  
  // Colors
  { rom: 'Cheong', hangul: '청', type: 'color', def: 'Blue/Clear' },
  { rom: 'Baek', hangul: '백', type: 'color', def: 'White' },
  { rom: 'Hwang', hangul: '황', type: 'color', def: 'Yellow' },
  { rom: 'Heuk', hangul: '흑', type: 'color', def: 'Black' },
  { rom: 'Hong', hangul: '홍', type: 'color', def: 'Red' },
  { rom: 'Nok', hangul: '녹', type: 'color', def: 'Green' },
  { rom: 'Geum', hangul: '금', type: 'color', def: 'Gold' },
  { rom: 'Eun', hangul: '은', type: 'color', def: 'Silver' },
  { rom: 'Ja', hangul: '자', type: 'color', def: 'Purple' },
];

// ==========================================
// 2. NOUN ROOTS (Sino-Korean)
// ==========================================
export const KO_NOUNS_SINO: KoreanComponent[] = [
  // Geographic Features
  { rom: 'San', hangul: '산', type: 'geo', def: 'Mountain' },
  { rom: 'Gang', hangul: '강', type: 'geo', def: 'River' },
  { rom: 'Cheon', hangul: '천', type: 'geo', def: 'Stream' },
  { rom: 'Hae', hangul: '해', type: 'geo', def: 'Sea' },
  { rom: 'Do', hangul: '도', type: 'geo', def: 'Island' },
  { rom: 'Gok', hangul: '곡', type: 'geo', def: 'Valley' },
  { rom: 'Won', hangul: '원', type: 'geo', def: 'Spring/Source' },
  { rom: 'Ho', hangul: '호', type: 'geo', def: 'Lake' },
  { rom: 'Man', hangul: '만', type: 'geo', def: 'Bay' },
  { rom: 'Gap', hangul: '갑', type: 'geo', def: 'Cape' },
  { rom: 'Bong', hangul: '봉', type: 'geo', def: 'Peak' },
  { rom: 'Reung', hangul: '릉', type: 'geo', def: 'Ridge/Tomb' },
  { rom: 'Tan', hangul: '탄', type: 'geo', def: 'Shoal/Rapids' },
  { rom: 'Ya', hangul: '야', type: 'geo', def: 'Field/Wild' },
  { rom: 'Jeon', hangul: '전', type: 'geo', def: 'Field' },
  { rom: 'Dae', hangul: '대', type: 'geo', def: 'Plateau/Terrace' },
  
  // Settlements / Structures
  { rom: 'Seong', hangul: '성', type: 'settlement', def: 'Castle/Fort' },
  { rom: 'Jin', hangul: '진', type: 'settlement', def: 'Garrison/Ferry' },
  { rom: 'Po', hangul: '포', type: 'settlement', def: 'Port' },
  { rom: 'Chon', hangul: '촌', type: 'settlement', def: 'Village' },
  { rom: 'Ju', hangul: '주', type: 'settlement', def: 'Region/State' },
  { rom: 'Gyeong', hangul: '경', type: 'settlement', def: 'Capital/View' },
  { rom: 'Sa', hangul: '사', type: 'settlement', def: 'Temple' },
  { rom: 'Gung', hangul: '궁', type: 'settlement', def: 'Palace' },
  { rom: 'Mun', hangul: '문', type: 'settlement', def: 'Gate' },
  { rom: 'Ro', hangul: '로', type: 'settlement', def: 'Road' },
  { rom: 'Gyo', hangul: '교', type: 'settlement', def: 'Bridge' },
  { rom: 'Won', hangul: '원', type: 'settlement', def: 'Center/Park' },
  { rom: 'Hang', hangul: '항', type: 'settlement', def: 'Harbor' },
  { rom: 'Gwan', hangul: '관', type: 'settlement', def: 'Hall/Pavilion' },
  { rom: 'Ru', hangul: '루', type: 'settlement', def: 'Tower' },
  { rom: 'Dang', hangul: '당', type: 'settlement', def: 'Hall' },
    { rom: 'Chon', hangul: '촌', type: 'settlement', def: 'Village' },
  { rom: 'Tap', hangul: '탑', type: 'settlement', def: 'Pagoda' },
  { rom: 'Jeong', hangul: '정', type: 'settlement', def: 'Pavilion/Well' },
  

  // Nature Objects
  { rom: 'Rim', hangul: '림', type: 'nature', def: 'Forest' },
  { rom: 'Hwa', hangul: '화', type: 'nature', def: 'Flower' },
  { rom: 'Mok', hangul: '목', type: 'nature', def: 'Tree' },
  { rom: 'Seok', hangul: '석', type: 'nature', def: 'Stone' },
  { rom: 'Am', hangul: '암', type: 'nature', def: 'Rock' },
  { rom: 'Yeon', hangul: '연', type: 'nature', def: 'Lotus' },
  { rom: 'Song', hangul: '송', type: 'nature', def: 'Pine' },
  { rom: 'Juk', hangul: '죽', type: 'nature', def: 'Bamboo' },
  { rom: 'Lan', hangul: '란', type: 'nature', def: 'Orchid' },
  { rom: 'Guk', hangul: '국', type: 'nature', def: 'Chrysanthemum' },
  { rom: 'Mae', hangul: '매', type: 'nature', def: 'Plum' },
  { rom: 'Un', hangul: '운', type: 'nature', def: 'Cloud' },
  { rom: 'Ryong', hangul: '룡', type: 'nature', def: 'Dragon' },
  { rom: 'Ho', hangul: '호', type: 'nature', def: 'Tiger' },
  { rom: 'Gu', hangul: '구', type: 'nature', def: 'Turtle' },
  { rom: 'Hak', hangul: '학', type: 'nature', def: 'Crane' },
  { rom: 'E', hangul: '어', type: 'nature', def: 'Fish' },
  { rom: 'Ma', hangul: '마', type: 'nature', def: 'Horse' },
  { rom: 'Cheol', hangul: '철', type: 'nature', def: 'Iron' },
  { rom: 'Dong', hangul: '동', type: 'nature', def: 'Copper' },
  { rom: 'Ok', hangul: '옥', type: 'nature', def: 'Jade/Gem' },
  { rom: 'Ju', hangul: '주', type: 'nature', def: 'Jewel/Pearl' },
  { rom: 'To', hangul: '토', type: 'nature', def: 'Earth/Soil' },
  
  // Abstract / Concepts
  { rom: 'Pyeong', hangul: '평', type: 'abstract', def: 'Peace/Flat' },
  { rom: 'An', hangul: '안', type: 'abstract', def: 'Comfort/Peace' },
  { rom: 'Chang', hangul: '창', type: 'abstract', def: 'Prosperous' },
  { rom: 'Yang', hangul: '양', type: 'abstract', def: 'Sun/Yang' },
  { rom: 'Eum', hangul: '음', type: 'abstract', def: 'Shade/Yin' },
  { rom: 'Su', hangul: '수', type: 'abstract', def: 'Water/Longevity' },
  { rom: 'Deok', hangul: '덕', type: 'abstract', def: 'Virtue' },
  { rom: 'Bok', hangul: '복', type: 'abstract', def: 'Luck' },
  { rom: 'Il', hangul: '일', type: 'abstract', def: 'Sun/Day' },
  { rom: 'Wol', hangul: '월', type: 'abstract', def: 'Moon' },
  { rom: 'Yeong', hangul: '영', type: 'abstract', def: 'Eternal/Glory' },
  { rom: 'Sang', hangul: '상', type: 'abstract', def: 'Auspicous' },
  { rom: 'Yeong', hangul: '영', type: 'abstract', def: 'Eternal' },
  { rom: 'Gwang', hangul: '광', type: 'abstract', def: 'Light' },
  { rom: 'Il', hangul: '일', type: 'abstract', def: 'One/Sun' },
];

// ==========================================
// 3. NATIVE KOREAN (Pure Korean)
// ==========================================
export const KO_NATIVE: KoreanComponent[] = [
  // Descriptors
  { rom: 'Han', hangul: '한', type: 'native_desc', def: 'Big/Great' },
  { rom: 'Saet', hangul: '샛', type: 'native_desc', def: 'New/Morning' },
  { rom: 'Dol', hangul: '돌', type: 'native_desc', def: 'Stone' },
  { rom: 'Sol', hangul: '솔', type: 'native_desc', def: 'Pine' },
  { rom: 'Bul', hangul: '불', type: 'native_desc', def: 'Fire' },
  { rom: 'Mul', hangul: '물', type: 'native_desc', def: 'Water' },
  { rom: 'Keun', hangul: '큰', type: 'native_desc', def: 'Big' },
  { rom: 'Jageun', hangul: '작은', type: 'native_desc', def: 'Small' },
  { rom: 'Dwit', hangul: '뒷', type: 'native_desc', def: 'Back/Behind' },
  { rom: 'Ap', hangul: '앞', type: 'native_desc', def: 'Front' },
  { rom: 'Saem', hangul: '샘', type: 'native_desc', def: 'Spring' },
  
  // Geographics
  { rom: 'Gol', hangul: '골', type: 'native_geo', def: 'Valley' },
  { rom: 'Moe', hangul: '뫼', type: 'native_geo', def: 'Mountain' },
  { rom: 'Nae', hangul: '내', type: 'native_geo', def: 'Stream' },
  { rom: 'Gae', hangul: '개', type: 'native_geo', def: 'Inlet' },
  { rom: 'Bat', hangul: '밭', type: 'native_geo', def: 'Field' },
  { rom: 'Maru', hangul: '마루', type: 'native_geo', def: 'Summit/Ridge' },
  { rom: 'Deul', hangul: '들', type: 'native_geo', def: 'Plains' },
  { rom: 'U', hangul: '우', type: 'native_geo', def: 'Well' },
  { rom: 'Ul', hangul: '울', type: 'native_geo', def: 'Fence' },
  { rom: 'Teo', hangul: '터', type: 'native_geo', def: 'Site/Lot' },
  { rom: 'Bawi', hangul: '바위', type: 'native_geo', def: 'Rock' },
  { rom: 'Gogae', hangul: '고개', type: 'native_geo', def: 'Hill Pass' },
];

// ==========================================
// 4. SUFFIXES (Administrative & Common Endings)
// ==========================================
export const KO_SUFFIXES: KoreanComponent[] = [
  // Administrative - Typically hyphenated in Romanization (e.g. Gangnam-gu)
  { rom: 'si', hangul: '시', type: 'suffix', def: 'City' },
  { rom: 'gun', hangul: '군', type: 'suffix', def: 'County' },
  { rom: 'gu', hangul: '구', type: 'suffix', def: 'District' },
  { rom: 'dong', hangul: '동', type: 'suffix', def: 'Neighborhood' },
  { rom: 'eup', hangul: '읍', type: 'suffix', def: 'Town' },
  { rom: 'ri', hangul: '리', type: 'suffix', def: 'Village' },
  { rom: 'do', hangul: '도', type: 'suffix', def: 'Province/Island' },
  { rom: 'ga', hangul: '가', type: 'suffix', def: 'Street Block' },
  
  // Geographic Endings - Typically fused (e.g. Bukhansan)
  { rom: 'san', hangul: '산', type: 'geo', def: 'Mountain' },
  { rom: 'gang', hangul: '강', type: 'geo', def: 'River' },
  { rom: 'cheon', hangul: '천', type: 'geo', def: 'Stream' },
  { rom: 'bong', hangul: '봉', type: 'geo', def: 'Peak' },
  { rom: 'got', hangul: '곶', type: 'geo', def: 'Cape' },
  { rom: 'Dae', hangul: '대', type: 'geo', def: 'Platform/Terrace' },
  { rom: 'Gok', hangul: '곡', type: 'geo', def: 'Valley' },
  { rom: 'Tan', hangul: '탄', type: 'geo', def: 'Shoal/Beach' },
];

// ==========================================
// 5. NUMBERS (Sino-Korean)
// ==========================================
export const KO_NUMBERS: KoreanComponent[] = [
  { rom: 'Il', hangul: '일', type: 'number', def: '1' },
  { rom: 'I', hangul: '이', type: 'number', def: '2' },
  { rom: 'Sam', hangul: '삼', type: 'number', def: '3' },
  { rom: 'Sa', hangul: '사', type: 'number', def: '4' },
  { rom: 'O', hangul: '오', type: 'number', def: '5' },
  { rom: 'Yuk', hangul: '육', type: 'number', def: '6' },
  { rom: 'Chil', hangul: '칠', type: 'number', def: '7' },
  { rom: 'Pal', hangul: '팔', type: 'number', def: '8' },
  { rom: 'Gu', hangul: '구', type: 'number', def: '9' },
  { rom: 'Sip', hangul: '십', type: 'number', def: '10' },
];
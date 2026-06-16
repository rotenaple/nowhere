import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { ZH_COMPONENTS, ChineseComponent, RegionCode, ComponentType, SemanticCategory } from "../dictionaries/chineseDict";

const filterComponents = (pool: ChineseComponent[], region: RegionCode) => {
  return pool.filter(c => {
    switch (region) {
      case 'cn': return !!c.cn;
      case 'tw': return !!c.tw;
      case 'hk': return !!c.hk;
      default: return false;
    }
  });
};

const getChar = (component: ChineseComponent, mode: 'cn' | 'tw' | 'hk'): string => {
  if (mode === 'cn' && component.hans) {
    return component.hans;
  }
  return component.han;
}

export const getChineseCapacity = (romanization: 'cn' | 'tw' | 'hk') => {
  let region: RegionCode = romanization === 'hk' ? 'hk' : romanization === 'tw' ? 'tw' : 'cn';
  const pool = filterComponents(ZH_COMPONENTS, region);
  return Math.pow(pool.length, 2);
}

const getStructure = (region: RegionCode): ChineseComponent[] => {
  const pool = filterComponents(ZH_COMPONENTS, region);

  const getComp = (
    types: ComponentType[], 
    categories: SemanticCategory[] | null = null, 
    exclude: ChineseComponent[] = [],
    specificChars: string[] | null = null 
  ): ChineseComponent => {
    
    let candidates = pool.filter(c => types.includes(c.type) && !exclude.includes(c));

    // Exclude Yin/Yang from generic adjective pulls unless requested
    if (specificChars) {
      candidates = candidates.filter(c => specificChars.includes(c.han));
    } else {
      if (types.includes('adj_physical')) {
        candidates = candidates.filter(c => c.han !== '陽' && c.han !== '陰');
      }
    }

    if (categories) {
      const catCandidates = candidates.filter(c => c.category && categories.includes(c.category));
      if (catCandidates.length > 0) candidates = catCandidates;
    }

    if (candidates.length === 0) return getRandomElement(pool);
    return getRandomElement(candidates);
  };

  const roll = Math.random();
  let parts: ChineseComponent[] = [];

  // === 1. The Geo-Directional/Relative (2 chars) ===
  // 15% Chance
  // Pattern: [River/Mtn] + [East/West/South/North/Yang/Yin] 
  if (roll < 0.15) {
    const head = getComp(['nature_head'], ['land', 'water']);
    
    if (Math.random() < 0.5) {
      const dir = getComp(['direction'], null, [head]);
      parts = [head, dir];
    } else {
      const yinYang = getComp(['adj_physical'], null, [], ['陽', '陰']);
      parts = [head, yinYang];
    }
  }

  // === 2. Descriptive (2 chars) ===
  // 15% Chance
  // Pattern: [Color/Adj/Number] + [Head]
  else if (roll < 0.30) {
    const subRoll = Math.random();
    let mod: ChineseComponent;
    let head: ChineseComponent;

    if (subRoll < 0.3) {
      mod = getComp(['color']);
      head = getComp(['nature_head', 'civic_built', 'civic_suffix']);
    } else if (subRoll < 0.6) {
      mod = getComp(['number']);
      head = getComp(['nature_head'], ['land', 'water']);
    } else {
      mod = getComp(['adj_physical']); 
      head = getComp(['nature_head', 'civic_built', 'civic_suffix']);
    }
    parts = [mod, head];
  }

  // === 3. Semantic / Complex (3 chars) ===
  // 60% Chance (Heavily weighted for 3 chars)
  else if (roll < 0.90) {
    const subRoll = Math.random();

    // A. Complex Semantic: [Prefix] + [Noun] + [Head]
    if (subRoll < 0.6) {
        const noun = getComp(['noun_concrete']);
        let headCategories: SemanticCategory[] = ['land', 'water']; 

        if (noun.category === 'animal') headCategories = ['land', 'water', 'infra']; 
        else if (noun.category === 'plant') headCategories = ['land', 'water']; 
        else if (noun.category === 'mineral') headCategories = ['land', 'infra'];
        else if (noun.category === 'celestial') headCategories = ['land', 'infra', 'water'];

        const head = getComp(['nature_head', 'civic_built', 'civic_suffix'], headCategories);
        
        // High probability (80%) to add a prefix modifier to create a 3-char name
        // e.g. "Red Dragon Hill" instead of "Dragon Hill"
        if (noun.han.length === 1 && Math.random() < 0.80) {
            const prefix = getComp(['color', 'direction', 'adj_physical'], null, [noun, head]);
            parts = [prefix, noun, head];
        } else {
            parts = [noun, head];
        }
    } 
    // B. Complex Descriptive: [Mod] + [Nature] + [Suffix]
    // e.g. White Mountain Village
    else {
        const mod = getComp(['color', 'adj_physical', 'number', 'direction']);
        const nature = getComp(['nature_head'], ['land', 'water']);
        const suffix = getComp(['civic_suffix', 'civic_built']);
        parts = [mod, nature, suffix];
    }
  }

  // === 4. Elegant Civic (2 chars) ===
  // 10% Chance
  else {
    const elegant = getComp(['adj_elegant']);
    const suffix = getComp(['civic_suffix', 'civic_built', 'nature_head']);
    parts = [elegant, suffix];
  }

  // --- VALIDATION ---
  // Prevent duplicate chars
  const fullString = parts.map(p => p.han).join('');
  const uniqueChars = new Set(fullString.split(''));
  if (uniqueChars.size !== fullString.length) return getStructure(region);

  // Prevent adjacent Directions
  if (parts.length > 1 && parts[0].type === 'direction' && parts[1].type === 'direction') {
    return getStructure(region);
  }

  return parts;
};

const formatChineseName = (parts: ChineseComponent[], mode: 'cn' | 'tw' | 'hk'): GeneratedResult => {
  const hanzi = parts.map(p => getChar(p, mode)).join('');
  
  // Smart Anglification
  const lastPart = parts[parts.length - 1];
  const allowedEnglishSuffixes = ['Bay', 'Port', 'Island', 'River', 'Lake', 'Mountain', 'Peak', 'Gate', 'Bridge', 'Harbor'];
  
  const useEnglishSuffix = 
    lastPart.english && 
    allowedEnglishSuffixes.includes(lastPart.english) && 
    parts.length >= 2 &&
    Math.random() < 0.35; 

  const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  const nameParts = useEnglishSuffix ? parts.slice(0, -1) : parts;

  let ascii = '';

  if (mode === 'cn') {
    // Pinyin: No spaces
    ascii = capitalize(nameParts.map(p => p.cn).join(''));
  } 
  else if (mode === 'tw') {
    // Wade-Giles: Hyphenated
    ascii = nameParts.map(p => capitalize(p.tw || '')).join('-');
  } 
  else {
    // HK: Spaced
    ascii = nameParts.map(p => capitalize(p.hk || '')).join(' ');
  }

  if (useEnglishSuffix && lastPart.english) {
    ascii += ` ${lastPart.english}`;
  }

  return { word: hanzi, ascii: ascii };
};

export const generateChinesePlace = (mode: 'cn' | 'tw' | 'hk'): GeneratedResult => {
  let region: RegionCode = 'cn';
  if (mode === 'hk') region = 'hk';
  if (mode === 'tw') region = 'tw';

  const parts = getStructure(region);
  return formatChineseName(parts, mode);
};
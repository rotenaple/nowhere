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

  const getChar = (component: ChineseComponent): string => {
    if (region === 'cn' && component.hans) return component.hans;
    return component.han;
  };

  const getCompPool = (types: ComponentType[], categories: SemanticCategory[] | null = null, specificChars: string[] | null = null) => {
    let candidates = pool.filter(c => types.includes(c.type));
    if (specificChars) {
      candidates = candidates.filter(c => specificChars.includes(c.han));
    } else {
      if (types.includes('adj_physical')) {
        candidates = candidates.filter(c => c.han !== '陽' && c.han !== '陰');
      }
    }
    if (categories) {
      candidates = candidates.filter(c => c.category && categories.includes(c.category));
    }
    return candidates;
  };

  const set = new Set<string>();

  // Pattern 1: Relative/Directional
  const heads1 = getCompPool(['nature_head'], ['land', 'water']);
  for (const head of heads1) {
    // Branch 1: dir
    const dirPool = getCompPool(['direction']).filter(c => c.han !== head.han);
    for (const dir of dirPool) {
      const s = getChar(head) + getChar(dir);
      if (new Set(s).size === s.length) set.add(s);
    }
    // Branch 2: yinYang
    const yyPool = getCompPool(['adj_physical'], null, ['陽', '陰']);
    for (const yy of yyPool) {
      const s = getChar(head) + getChar(yy);
      if (new Set(s).size === s.length) set.add(s);
    }
  }

  // Pattern 2: Descriptive
  const modsCol = getCompPool(['color']);
  const headsCol = getCompPool(['nature_head', 'civic_built', 'civic_suffix']);
  for (const mod of modsCol) {
    for (const head of headsCol) {
      const s = getChar(mod) + getChar(head);
      if (new Set(s).size === s.length) set.add(s);
    }
  }

  const modsNum = getCompPool(['number']);
  const headsNum = getCompPool(['nature_head'], ['land', 'water']);
  for (const mod of modsNum) {
    for (const head of headsNum) {
      const s = getChar(mod) + getChar(head);
      if (new Set(s).size === s.length) set.add(s);
    }
  }

  const modsPhys = getCompPool(['adj_physical']);
  const headsPhys = getCompPool(['nature_head', 'civic_built', 'civic_suffix']);
  for (const mod of modsPhys) {
    for (const head of headsPhys) {
      const s = getChar(mod) + getChar(head);
      if (new Set(s).size === s.length) set.add(s);
    }
  }

  // Pattern 3a: Complex Semantic
  const nouns = getCompPool(['noun_concrete']);
  for (const noun of nouns) {
    let headCategories: SemanticCategory[] = ['land', 'water'];
    if (noun.category === 'animal') headCategories = ['land', 'water', 'infra'];
    else if (noun.category === 'plant') headCategories = ['land', 'water'];
    else if (noun.category === 'mineral') headCategories = ['land', 'infra'];
    else if (noun.category === 'celestial') headCategories = ['land', 'infra', 'water'];

    const heads = getCompPool(['nature_head', 'civic_built', 'civic_suffix'], headCategories);
    for (const head of heads) {
      // 3-char sub-branch: noun.han.length === 1
      if (noun.han.length === 1) {
        const prefixes = getCompPool(['color', 'direction', 'adj_physical']).filter(c => c.han !== noun.han && c.han !== head.han);
        for (const pre of prefixes) {
          const s = getChar(pre) + getChar(noun) + getChar(head);
          if (new Set(s).size === s.length) set.add(s);
        }
      }
      // 2-char sub-branch
      const s = getChar(noun) + getChar(head);
      if (new Set(s).size === s.length) set.add(s);
    }
  }

  // Pattern 3b: Complex Descriptive
  const mods3b = getCompPool(['color', 'adj_physical', 'number', 'direction']);
  const nature3b = getCompPool(['nature_head'], ['land', 'water']);
  const suffix3b = getCompPool(['civic_suffix', 'civic_built']);
  for (const mod of mods3b) {
    for (const nat of nature3b) {
      for (const suf of suffix3b) {
        const s = getChar(mod) + getChar(nat) + getChar(suf);
        if (new Set(s).size === s.length) set.add(s);
      }
    }
  }

  // Pattern 4: Elegant Civic
  const elegants = getCompPool(['adj_elegant']);
  const suffixes4 = getCompPool(['civic_suffix', 'civic_built', 'nature_head']);
  for (const el of elegants) {
    for (const suf of suffixes4) {
      const s = getChar(el) + getChar(suf);
      if (new Set(s).size === s.length) set.add(s);
    }
  }

  return set.size;
}

const getStructure = (region: RegionCode): { parts: ChineseComponent[], rule: string } => {
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
  let rule = "";

  // === 1. The Geo-Directional/Relative (2 chars) ===
  // 15% Chance
  // Pattern: [River/Mtn] + [East/West/South/North/Yang/Yin] 
  if (roll < 0.15) {
    rule = "Relative/Directional";
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
    rule = "Descriptive";
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
        rule = "Complex Semantic";
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
        rule = "Complex Descriptive";
        const mod = getComp(['color', 'adj_physical', 'number', 'direction']);
        const nature = getComp(['nature_head'], ['land', 'water']);
        const suffix = getComp(['civic_suffix', 'civic_built']);
        parts = [mod, nature, suffix];
    }
  }

  // === 4. Elegant Civic (2 chars) ===
  // 10% Chance
  else {
    rule = "Elegant Civic";
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

  return { parts, rule };
};

const getComponentRomanization = (c: ChineseComponent, mode: 'cn' | 'tw' | 'hk'): string => {
  const raw = c[mode] || '';
  if (raw.includes(',')) {
    const choices = raw.split(',').map(choice => choice.trim()).filter(Boolean);
    if (choices.length > 0) {
      return getRandomElement(choices);
    }
  }
  return raw;
};

const formatChineseName = (parts: ChineseComponent[], mode: 'cn' | 'tw' | 'hk'): GeneratedResult => {
  const hanzi = parts.map(p => getChar(p, mode)).join('');
  
  const useEnglishSuffix = false; 

  const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  const nameParts = useEnglishSuffix ? parts.slice(0, -1) : parts;
  const lastPart = parts[parts.length - 1];

  let ascii = '';

  if (mode === 'cn') {
    // Pinyin: No spaces
    ascii = capitalize(nameParts.map(p => getComponentRomanization(p, 'cn')).join(''));
  } 
  else if (mode === 'tw') {
    // Wade-Giles: Hyphenated
    ascii = nameParts.map(p => capitalize(getComponentRomanization(p, 'tw'))).join('-');
  } 
  else {
    // HK: Spaced
    ascii = nameParts.map(p => capitalize(getComponentRomanization(p, 'hk'))).join(' ');
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

  const { parts, rule } = getStructure(region);
  const formatted = formatChineseName(parts, mode);
  const components = parts.map(p => JSON.stringify(p));
  return { ...formatted, generationRules: [rule], dictionaryComponents: components };
};
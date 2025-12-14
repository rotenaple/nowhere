import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { ZH_COMPONENTS, ChineseComponent, RegionCode } from "../dictionaries/chineseDict";

const filterComponents = (pool: ChineseComponent[], region: RegionCode) => {
  return pool.filter(c => {
    // In the new format, if the romanization property (cn, tw, hk)
    // is undefined or an empty string, it implies exclusion.
    switch (region) {
      case 'cn':
        return !!c.cn; // Returns true if c.cn exists and is not empty
      case 'tw':
        return !!c.tw;
      case 'hk':
        return !!c.hk;
      default:
        // Handle unexpected regions or return false
        return false;
    }
  });
};

const getEastAsianCapacity = (region: RegionCode) => {
  const pool = filterComponents(ZH_COMPONENTS, region);
  const len = pool.length;
  return Math.pow(len, 2) + Math.pow(len, 3);
};

export const getChineseCapacity = (romanization: 'cn' | 'tw' | 'hk') => {
  let region: RegionCode = 'cn';
  if (romanization === 'hk') region = 'hk';
  if (romanization === 'tw') region = 'tw';
  return getEastAsianCapacity(region);
}

const getChar = (component: ChineseComponent, mode: 'cn' | 'tw' | 'hk'): string => {
  if ((mode === 'cn') && component.hans) {
    return component.hans;
  }
  return component.han;
}

const formatChineseName = (parts: ChineseComponent[], mode: 'cn' | 'tw' | 'hk'): GeneratedResult => {
  const hanzi = parts.map(p => getChar(p, mode)).join('');
  
  // Decide whether to anglicize the suffix
  const lastPart = parts[parts.length - 1];
  const useEnglishSuffix = !!lastPart.english && Math.random() < 0.35; 

  let ascii = '';

  // Helper to capitalize first letter
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (mode === 'cn') {
    const nameParts = useEnglishSuffix ? parts.slice(0, -1) : parts;
    const prefix = nameParts.map(p => p.cn).join('');
    
    ascii = capitalize(prefix);
    if (useEnglishSuffix && lastPart.english) {
      ascii += ` ${lastPart.english}`;
    }

  } else if (mode === 'tw') {
    const nameParts = useEnglishSuffix ? parts.slice(0, -1) : parts;
    const prefix = nameParts.map(p => p.tw).join('-');
    
    ascii = prefix.split('-').map(capitalize).join('-');
    if (useEnglishSuffix && lastPart.english) {
      ascii += ` ${lastPart.english}`;
    }

  } else {
    const nameParts = useEnglishSuffix ? parts.slice(0, -1) : parts;
    const prefix = nameParts.map(p => p.hk).join(' ');
    
    ascii = prefix.split(' ').map(capitalize).join(' ');
    if (useEnglishSuffix && lastPart.english) {
      ascii += ` ${lastPart.english}`;
    }
  }

  return { word: hanzi, ascii: ascii };
};

const getStructure = (region: RegionCode): ChineseComponent[] => {
  const pool = filterComponents(ZH_COMPONENTS, region);

  const getComp = (types: string[], exclude?: ChineseComponent, singleOnly: boolean = false) => {
    let candidates = pool.filter(c => types.includes(c.type) && c !== exclude);
    if (singleOnly) {
       candidates = candidates.filter(c => c.han.length === 1);
    }
    return getRandomElement(candidates);
  };

  const parts: ChineseComponent[] = [];

  // === PLACE MODE ===
  const usePrefix = Math.random() < 0.3;

  if (usePrefix) {
    parts.push(getComp(['prefix', 'direction']));
  }

  // If prefix is used, force core to be simple (1 element) to avoid over-length names.
  const isCoreComposite = !usePrefix && Math.random() < 0.4;

  if (isCoreComposite) {
    const coreA = getComp(['adjective', 'number', 'direction', 'nature'], undefined, true);
    // civic_built (like Bridge/Pass) behaves like a noun here, so we allow it in Core B
    const coreB = getComp(['noun', 'nature', 'civic_built'], coreA, true);
    parts.push(coreA, coreB);
  } else {
    parts.push(getComp(['noun', 'nature', 'adjective', 'civic_built']));
  }

  const lastPart = parts[parts.length - 1];

  let allowedSuffixTypes: string[] = ['civic', 'suffix', 'nature'];
  let useSuffix = Math.random() < 0.9; 

  if (lastPart.type === 'civic_major') {
    useSuffix = false;
  }
  else if (lastPart.type === 'civic_built') {
    allowedSuffixTypes = ['civic']; 
  }
  else if (lastPart.type === 'civic' || lastPart.type === 'suffix') {
    useSuffix = false;
  }

  if (useSuffix) {
    let candidate = getComp(allowedSuffixTypes, lastPart);
    let attempts = 0;
    while (attempts < 5) {
        const isBadCombo = 
           (lastPart.type === 'noun' && candidate.cn === 'guo') || 
           (lastPart.type === 'nature' && candidate.type === 'nature'); 

        if (!isBadCombo) break;
        candidate = getComp(allowedSuffixTypes, lastPart);
        attempts++;
    }
    if (candidate && candidate !== lastPart) {
         parts.push(candidate);
    }
  }

  const totalLength = parts.reduce((sum, p) => sum + p.han.length, 0);
  if (totalLength < 2) return getStructure(region);

  // === VALIDATION ===
  
  // 1. Check for duplicate adjacent Directions (e.g., North South)
  for (let i = 0; i < parts.length - 1; i++) {
    if (parts[i].type === 'direction' && parts[i+1].type === 'direction') return getStructure(region);
  }

  // 2. Check for ANY character reduplication across the whole name
  // Example: Reject "Baiyun" (White Cloud) + "Bai" (White) -> "Baiyunbai"
  const fullString = parts.map(p => p.han).join('');
  const uniqueChars = new Set(fullString.split(''));
  
  if (uniqueChars.size !== fullString.length) {
    return getStructure(region);
  }

  return parts;
}

export const generateChinesePlace = (mode: 'cn' | 'tw' | 'hk'): GeneratedResult => {
  let region: RegionCode = 'cn';
  if (mode === 'hk') region = 'hk';
  if (mode === 'tw') region = 'tw';

  const parts = getStructure(region);
  return formatChineseName(parts, mode);
};
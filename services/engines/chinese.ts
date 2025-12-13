
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { EA_COMPONENTS, EastAsianComponent, RegionCode } from "../dictionaries/eastAsianDict";

const filterComponents = (pool: EastAsianComponent[], region: RegionCode) => {
  return pool.filter(c => {
    // Check exclusions
    if (c.excludeRegions?.includes(region)) return false;
    // Check explicit inclusions
    if (c.onlyRegions && !c.onlyRegions.includes(region)) return false;
    return true;
  });
};

const getEastAsianCapacity = (region: RegionCode) => {
  const pool = filterComponents(EA_COMPONENTS, region);
  const len = pool.length;
  return Math.pow(len, 2) + Math.pow(len, 3);
};

export const getChineseCapacity = (romanization: 'pinyin' | 'wadegiles' | 'cantonese') => {
  let region: RegionCode = 'cn';
  if (romanization === 'cantonese') region = 'hk';
  if (romanization === 'wadegiles') region = 'tw';
  return getEastAsianCapacity(region);
}

const getChar = (component: EastAsianComponent, mode: 'pinyin' | 'wadegiles' | 'cantonese'): string => {
  if ((mode === 'cantonese' || mode === 'wadegiles') && component.hanziTraditional) {
    return component.hanziTraditional;
  }
  return component.hanzi;
}

const formatChineseName = (parts: EastAsianComponent[], mode: 'pinyin' | 'wadegiles' | 'cantonese'): GeneratedResult => {
  const hanzi = parts.map(p => getChar(p, mode)).join('');
  
  if (mode === 'pinyin') {
    const romanized = parts.map(p => p.pinyin).join('');
    const capitalized = romanized.charAt(0).toUpperCase() + romanized.slice(1);
    return { word: hanzi, ascii: capitalized };
  } else if (mode === 'wadegiles') {
    const romanized = parts.map(p => p.wadegiles).join('-');
    const capitalized = romanized.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('-');
    return { word: hanzi, ascii: capitalized };
  } else {
    const romanized = parts.map(p => p.cantonese).join(' ');
    const capitalized = romanized.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    return { word: hanzi, ascii: capitalized };
  }
};

const getStructure = (region: RegionCode): EastAsianComponent[] => {
  const pool = filterComponents(EA_COMPONENTS, region);

  const getComp = (types: string[], exclude?: EastAsianComponent, singleOnly: boolean = false) => {
    let candidates = pool.filter(c => types.includes(c.type) && c !== exclude);
    if (singleOnly) {
       candidates = candidates.filter(c => c.hanzi.length === 1);
    }
    return getRandomElement(candidates);
  };

  const parts: EastAsianComponent[] = [];

  // === PLACE MODE ===
  const usePrefix = Math.random() < 0.3;
  const isCoreComposite = Math.random() < 0.4;

  if (usePrefix) {
    parts.push(getComp(['prefix', 'direction']));
  }

  if (isCoreComposite) {
    const coreA = getComp(['adjective', 'number', 'direction', 'nature'], undefined, true);
    const coreB = getComp(['noun', 'nature'], coreA, true);
    parts.push(coreA, coreB);
  } else {
    parts.push(getComp(['noun', 'nature', 'adjective']));
  }

  const lastPart = parts[parts.length - 1];
  const isLastPartCivic = lastPart.type === 'civic' || lastPart.type === 'suffix';
  const isLastPartBigCivic = ['guo', 'sheng', 'zhou'].includes(lastPart.pinyin);

  let allowedSuffixTypes: string[] = ['civic', 'suffix', 'nature'];
  let useSuffix = Math.random() < 0.9; 

  if (isLastPartCivic || isLastPartBigCivic) {
    useSuffix = false; 
  }

  if (['qiao', 'pu', 'tou', 'matou', 'zhan'].includes(lastPart.pinyin)) {
     allowedSuffixTypes = ['civic']; 
  }

  if (useSuffix) {
    let candidate = getComp(allowedSuffixTypes, lastPart);
    let attempts = 0;
    while (attempts < 5) {
        const isBadCombo = 
           (lastPart.type === 'noun' && candidate.pinyin === 'guo') || 
           (lastPart.type === 'nature' && candidate.type === 'nature'); 

        if (!isBadCombo) break;
        candidate = getComp(allowedSuffixTypes, lastPart);
        attempts++;
    }
    if (candidate && candidate !== lastPart) {
         parts.push(candidate);
    }
  }

  const totalLength = parts.reduce((sum, p) => sum + p.hanzi.length, 0);
  if (totalLength < 2) return getStructure(region);

  for (let i = 0; i < parts.length - 1; i++) {
    if (parts[i].hanzi === parts[i+1].hanzi) return getStructure(region);
  }
  for (let i = 0; i < parts.length - 1; i++) {
    if (parts[i].type === 'direction' && parts[i+1].type === 'direction') return getStructure(region);
  }

  return parts;
}

export const generateChinesePlace = (mode: 'pinyin' | 'wadegiles' | 'cantonese'): GeneratedResult => {
  let region: RegionCode = 'cn';
  if (mode === 'cantonese') region = 'hk';
  if (mode === 'wadegiles') region = 'tw';

  const parts = getStructure(region);
  return formatChineseName(parts, mode);
};

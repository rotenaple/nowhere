import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { 
  KO_ADJECTIVES, KO_NOUNS_SINO, KO_NATIVE, KO_SUFFIXES, KO_NUMBERS, KoreanComponent 
} from "../dictionaries/koreanDict";

export const getKoreanCapacity = () => {
  const set = new Set<string>();
  const getPool = (arr: any[], types: string[]) => arr.filter(x => types.includes(x.type));

  // Recipe 1: Descriptive Compound
  const p1Pool = getPool(KO_ADJECTIVES, ['direction', 'color', 'quality']).concat(getPool(KO_NOUNS_SINO, ['nature', 'abstract']));
  const p2Pool = getPool(KO_NOUNS_SINO, ['geo', 'settlement']);
  for (const p1 of p1Pool) {
    for (const p2 of p2Pool) {
      // 2-syllable
      set.add(p1.hangul + p2.hangul);
      // 3-syllable
      const midPool = getPool(KO_ADJECTIVES, ['quality', 'color']);
      for (const mid of midPool) {
        set.add(p1.hangul + mid.hangul + p2.hangul);
      }
    }
  }

  // Recipe 2: Administrative Suffix
  const suffixes = getPool(KO_SUFFIXES, ['suffix']);
  // Sub-branch A: [Nature/Abstract/Geo] + [Geo/Settlement]
  const r1PoolA = getPool(KO_NOUNS_SINO, ['nature', 'abstract', 'geo']);
  const r2PoolA = getPool(KO_NOUNS_SINO, ['geo', 'settlement']);
  for (const r1 of r1PoolA) {
    for (const r2 of r2PoolA) {
      for (const suffix of suffixes) {
        set.add(r1.hangul + r2.hangul + suffix.hangul);
      }
    }
  }
  // Sub-branch B: [Adj] + [Noun]
  const r1PoolB = getPool(KO_ADJECTIVES, ['direction', 'quality', 'color']);
  const r2PoolB = getPool(KO_NOUNS_SINO, ['geo', 'settlement']);
  for (const r1 of r1PoolB) {
    for (const r2 of r2PoolB) {
      for (const suffix of suffixes) {
        set.add(r1.hangul + r2.hangul + suffix.hangul);
      }
    }
  }

  // Recipe 3: Native Korean Name
  const nativePool = getPool(KO_NATIVE, ['native_desc', 'native_geo']);
  const nativeGeoPool = getPool(KO_NATIVE, ['native_geo']);
  for (const p1 of nativePool) {
    for (const p2 of nativeGeoPool) {
      if (p1.rom === p2.rom) continue;
      set.add(p1.hangul + p2.hangul);
    }
  }

  // Recipe 4: Numeric Compound
  const numPool = KO_NUMBERS;
  const rootPool = getPool(KO_NOUNS_SINO, ['settlement', 'nature', 'geo']);
  for (const num of numPool) {
    for (const root of rootPool) {
      set.add(num.hangul + root.hangul);
    }
  }

  return set.size;
}

export const generateKoreanPlace = (): GeneratedResult => {
  let word = "";
  let ascii = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();

  const getPool = (arr: KoreanComponent[], types: string[]) => 
    arr.filter(x => types.includes(x.type));

  // --- RECIPE 1: Descriptive Compound (e.g. Nam-san, Song-do, Ryong-san) ---
  if (roll < 0.40) {
    rule = "Descriptive Compound";
    // EXPANSION: Allow Nature (Pine, Dragon) and Abstract (Peace) as heads
    const p1 = getRandomElement(
        getPool(KO_ADJECTIVES, ['direction', 'color', 'quality'])
        .concat(getPool(KO_NOUNS_SINO, ['nature', 'abstract']))
    );
    
    const p2 = getRandomElement(getPool(KO_NOUNS_SINO, ['geo', 'settlement']));
    
    // 3-Syllable Logic (e.g. Seo-dae-mun)
    if (Math.random() < 0.2) {
       const mid = getRandomElement(getPool(KO_ADJECTIVES, ['quality', 'color'])); 
       word = p1.hangul + mid.hangul + p2.hangul;
       ascii = p1.rom + mid.rom.toLowerCase() + p2.rom.toLowerCase();
       components.push(JSON.stringify(p1), JSON.stringify(mid), JSON.stringify(p2));
    } else {
       word = p1.hangul + p2.hangul;
       ascii = p1.rom + p2.rom.toLowerCase();
       components.push(JSON.stringify(p1), JSON.stringify(p2));
    }
  }

  // --- RECIPE 2: Administrative Suffix (e.g. Gangnam-gu) ---
  else if (roll < 0.70) {
    rule = "Administrative Suffix";
    let baseHangul = "";
    let baseRom = "";
    let r1: KoreanComponent;
    let r2: KoreanComponent;
    
    if (Math.random() < 0.4) {
        // 2-Syllable Base: [Nature/Abstract] + [Geo/Settlement]
        r1 = getRandomElement(getPool(KO_NOUNS_SINO, ['nature', 'abstract', 'geo']));
        r2 = getRandomElement(getPool(KO_NOUNS_SINO, ['geo', 'settlement']));
        baseHangul = r1.hangul + r2.hangul;
        baseRom = r1.rom + r2.rom.toLowerCase();
    } else {
        // 2-Syllable Base: [Adj] + [Noun]
        r1 = getRandomElement(getPool(KO_ADJECTIVES, ['direction', 'quality', 'color']));
        r2 = getRandomElement(getPool(KO_NOUNS_SINO, ['geo', 'settlement']));
        baseHangul = r1.hangul + r2.hangul;
        baseRom = r1.rom + r2.rom.toLowerCase();
    }

    const suffix = getRandomElement(getPool(KO_SUFFIXES, ['suffix']));
    word = baseHangul + suffix.hangul;
    ascii = baseRom + '-' + suffix.rom;
    components.push(JSON.stringify(r1), JSON.stringify(r2), JSON.stringify(suffix));
  }

  // --- RECIPE 3: Native Korean Names ---
  else if (roll < 0.90) {
    rule = "Native Korean Name";
    const p1 = getRandomElement(getPool(KO_NATIVE, ['native_desc', 'native_geo']));
    const p2 = getRandomElement(getPool(KO_NATIVE, ['native_geo']));
    
    if (p1.rom === p2.rom) return generateKoreanPlace(); 

    word = p1.hangul + p2.hangul;
    ascii = p1.rom + p2.rom.toLowerCase();
    components.push(JSON.stringify(p1), JSON.stringify(p2));
  }

  // --- RECIPE 4: Numeric ---
  else {
    rule = "Numeric Compound";
    const num = getRandomElement(KO_NUMBERS);
    // EXPANSION: Numbers can apply to Settlements too (e.g. "Three Bridges")
    const root = getRandomElement(getPool(KO_NOUNS_SINO, ['settlement', 'nature', 'geo']));
    
    word = num.hangul + root.hangul;
    ascii = num.rom + root.rom.toLowerCase();
    components.push(JSON.stringify(num), JSON.stringify(root));
  }

  ascii = ascii.charAt(0).toUpperCase() + ascii.slice(1);
  return { word, ascii, generationRules: [rule], dictionaryComponents: components };
};
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { 
  KO_ADJECTIVES, KO_NOUNS_SINO, KO_NATIVE, KO_SUFFIXES, KO_NUMBERS, KoreanComponent 
} from "../dictionaries/koreanDict";

export const getKoreanCapacity = () => {
  // 1. Adj/Nature/Abstract + Noun
  const heads = KO_ADJECTIVES.length + KO_NOUNS_SINO.filter(x => ['nature', 'abstract'].includes(x.type)).length;
  const tails = KO_NOUNS_SINO.filter(x => ['geo', 'settlement'].includes(x.type)).length;
  const c1 = heads * tails;
  
  // 2. Base + Suffix
  const c2 = (c1) * KO_SUFFIXES.length;
  
  // 3. Native
  const nDesc = KO_NATIVE.filter(x => ['native_desc', 'native_geo'].includes(x.type)).length;
  const nGeo = KO_NATIVE.filter(x => x.type === 'native_geo').length;
  const c3 = nDesc * nGeo;
  
  return c1 + c2 + c3;
}

export const generateKoreanPlace = (): GeneratedResult => {
  let word = "";
  let ascii = "";
  const roll = Math.random();

  const getPool = (arr: KoreanComponent[], types: string[]) => 
    arr.filter(x => types.includes(x.type));

  // --- RECIPE 1: Descriptive Compound (e.g. Nam-san, Song-do, Ryong-san) ---
  if (roll < 0.40) {
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
    } else {
       word = p1.hangul + p2.hangul;
       ascii = p1.rom + p2.rom.toLowerCase();
    }
  }

  // --- RECIPE 2: Administrative Suffix (e.g. Gangnam-gu) ---
  else if (roll < 0.70) {
    let baseHangul = "";
    let baseRom = "";
    
    if (Math.random() < 0.4) {
        // 2-Syllable Base: [Nature/Abstract] + [Geo/Settlement]
        const r1 = getRandomElement(getPool(KO_NOUNS_SINO, ['nature', 'abstract', 'geo']));
        const r2 = getRandomElement(getPool(KO_NOUNS_SINO, ['geo', 'settlement']));
        baseHangul = r1.hangul + r2.hangul;
        baseRom = r1.rom + r2.rom.toLowerCase();
    } else {
        // 2-Syllable Base: [Adj] + [Noun]
        const r1 = getRandomElement(getPool(KO_ADJECTIVES, ['direction', 'quality', 'color']));
        const r2 = getRandomElement(getPool(KO_NOUNS_SINO, ['geo', 'settlement']));
        baseHangul = r1.hangul + r2.hangul;
        baseRom = r1.rom + r2.rom.toLowerCase();
    }

    const suffix = getRandomElement(getPool(KO_SUFFIXES, ['suffix']));
    word = baseHangul + suffix.hangul;
    ascii = baseRom + '-' + suffix.rom;
  }

  // --- RECIPE 3: Native Korean Names ---
  else if (roll < 0.90) {
    const p1 = getRandomElement(getPool(KO_NATIVE, ['native_desc', 'native_geo']));
    const p2 = getRandomElement(getPool(KO_NATIVE, ['native_geo']));
    
    if (p1.rom === p2.rom) return generateKoreanPlace(); 

    word = p1.hangul + p2.hangul;
    ascii = p1.rom + p2.rom.toLowerCase();
  }

  // --- RECIPE 4: Numeric ---
  else {
    const num = getRandomElement(KO_NUMBERS);
    // EXPANSION: Numbers can apply to Settlements too (e.g. "Three Bridges")
    const root = getRandomElement(getPool(KO_NOUNS_SINO, ['settlement', 'nature', 'geo']));
    
    word = num.hangul + root.hangul;
    ascii = num.rom + root.rom.toLowerCase();
  }

  ascii = ascii.charAt(0).toUpperCase() + ascii.slice(1);
  return { word, ascii };
};
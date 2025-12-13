
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { 
  KO_PREFIXES, KO_ROOTS_SINO, KO_ROOTS_NATIVE, KO_SUFFIXES, KO_NUMBERS 
} from "../dictionaries/koreanDict";

export const getKoreanCapacity = () => {
  const roots = [...KO_ROOTS_SINO, ...KO_ROOTS_NATIVE];
  
  // 1. Prefix + Root (2 syllables)
  const c1 = KO_PREFIXES.length * roots.length;
  // 2. Root + Root (2 syllables)
  const c2 = KO_ROOTS_SINO.length * KO_ROOTS_SINO.length;
  // 3. Root + Suffix (2 syllables)
  const c3 = roots.length * KO_SUFFIXES.length;
  // 4. Native Compounds (2 syllables)
  const c4 = KO_ROOTS_NATIVE.length * KO_ROOTS_NATIVE.length;
  // 5. Root + Root + Root (3 syllables) - BIG MULTIPLIER
  const c5 = Math.pow(KO_ROOTS_SINO.length, 3);

  return c1 + c2 + c3 + c4 + c5;
}

export const generateKoreanPlace = (): GeneratedResult => {
  const type = Math.random();

  // Pattern 1: Sino-Korean 2-syllable (e.g. Bu-san, Dae-gu)
  if (type < 0.25) {
    const p1 = getRandomElement([...KO_PREFIXES, ...KO_ROOTS_SINO]);
    const p2 = getRandomElement(KO_ROOTS_SINO);
    
    // Avoid duplicates
    if (p1.rom === p2.rom) return generateKoreanPlace();

    const name = p1.hangul + p2.hangul;
    const ascii = p1.rom + p2.rom.toLowerCase();
    
    return { word: name, ascii };
  }

  // Pattern 2: Sino-Korean 3-syllable Compound (e.g. Yeong-deung-po, Dong-dae-mun, Seo-dae-mun)
  // This drastically increases variety.
  else if (type < 0.55) {
    const r1 = getRandomElement([...KO_PREFIXES, ...KO_ROOTS_SINO]);
    const r2 = getRandomElement(KO_ROOTS_SINO);
    const r3 = getRandomElement(KO_ROOTS_SINO);

    if (r2.rom === r3.rom) return generateKoreanPlace();

    const name = r1.hangul + r2.hangul + r3.hangul;
    // Usually 3-syllable places are written as OneTwoThree or One-two-three
    const ascii = r1.rom + r2.rom.toLowerCase() + r3.rom.toLowerCase();
    
    return { word: name, ascii };
  }

  // Pattern 3: Root + Administrative Suffix (e.g. Gangnam-gu, Yeouido)
  else if (type < 0.75) {
    const suf = getRandomElement(KO_SUFFIXES);
    
    // Choose between 1-root base (Do-dong) or 2-root base (Gangnam-gu)
    if (Math.random() < 0.3) {
       // 1 char root + suffix
       const r1 = getRandomElement([...KO_PREFIXES, ...KO_ROOTS_SINO]);
       const name = r1.hangul + suf.hangul;
       const ascii = r1.rom + '-' + suf.rom; 
       return { word: name, ascii };
    } else {
       // 2 char root + suffix
       const r1 = getRandomElement([...KO_PREFIXES, ...KO_ROOTS_SINO]);
       const r2 = getRandomElement(KO_ROOTS_SINO);
       const name = r1.hangul + r2.hangul + suf.hangul;
       const ascii = r1.rom + r2.rom.toLowerCase() + '-' + suf.rom;
       return { word: name, ascii };
    }
  }

  // Pattern 4: Native Korean / Hybrid (e.g. Saem-gol)
  else if (type < 0.90) {
    const native = getRandomElement(KO_ROOTS_NATIVE);
    
    // Native compound (Root + Native Suffix)
    if (Math.random() < 0.5) {
       const nativeSuffixes = KO_SUFFIXES.filter(s => ['ma-eul', 'bat', 'gol', 'nae'].includes(s.rom));
       const suffix = getRandomElement(nativeSuffixes);
       
       const name = native.hangul + suffix.hangul;
       const ascii = native.rom + '-' + suffix.rom;
       return { word: name, ascii };
    } 
    // Native + Native
    else {
       const n2 = getRandomElement(KO_ROOTS_NATIVE);
       const name = native.hangul + n2.hangul;
       const ascii = native.rom + n2.rom.toLowerCase();
       return { word: name, ascii };
    }
  }
  
  // Pattern 5: Number + Root (e.g. Sam-cheok, O-ryuk-do)
  else {
    const num = getRandomElement(KO_NUMBERS);
    const root = getRandomElement(KO_ROOTS_SINO);
    const name = num.hangul + root.hangul;
    const ascii = num.rom + root.rom.toLowerCase();
    return { word: name, ascii };
  }
};

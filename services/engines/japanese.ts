
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { 
  JA_MODIFIERS, JA_ROOTS, JA_GA_SUFFIXES, JA_NO_SUFFIXES, JA_ON_COMPONENTS, JA_PREFIXES, JA_DIRECTIONS, JA_NUMBERS
} from "../dictionaries/japaneseDict";

export const getJapaneseCapacity = () => {
  // Estimate logic capacity
  const c1 = JA_MODIFIERS.length * JA_ROOTS.length; // Mod + Root
  const c2 = JA_ROOTS.length * JA_ROOTS.length; // Root + Root
  const c3 = JA_ROOTS.length * JA_GA_SUFFIXES.length; // Ga-compounds
  const c4 = JA_ON_COMPONENTS.length * JA_ON_COMPONENTS.length; // On-compounds
  const c5 = JA_PREFIXES.length * JA_ROOTS.length; // New/Old + Root
  const c6 = JA_DIRECTIONS.length * JA_ROOTS.length; // Direction + Root
  const c7 = (JA_ROOTS.length + JA_NUMBERS.length) * JA_NO_SUFFIXES.length; // No-compounds
  
  // New: Prefix + On + On (3-part compound)
  const c8 = JA_PREFIXES.length * JA_ON_COMPONENTS.length * JA_ON_COMPONENTS.length;

  return c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;
}

export const generateJapanesePlace = (): GeneratedResult => {
  
  const type = Math.random();

  // Pattern 1: [Direction/Prefix] + [Root] (e.g., Kita-Kyushu, Shin-Yokohama, Higashi-Murayama)
  if (type < 0.20) {
      const prefixPool = Math.random() < 0.6 ? JA_DIRECTIONS : JA_PREFIXES;
      const pre = getRandomElement(prefixPool);
      const root = getRandomElement(JA_ROOTS);
      
      const word = pre.kanji + root.kanji;
      // Often hyphenated in romanization if it's a major prefix
      const ascii = pre.romaji + root.romaji; 
      
      return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
  }

  // Pattern 2: [Modifier] + [Root] (e.g. Oomori, Akasaka) - KUN READINGS (Wago)
  else if (type < 0.45) {
    const mod = getRandomElement(JA_MODIFIERS);
    const root = getRandomElement(JA_ROOTS);

    let finalRomaji = root.romaji;
    
    // RENDAKU Logic
    if (root.rendaku && Math.random() < 0.7) {
        finalRomaji = root.rendaku.romaji;
    }

    const word = mod.kanji + root.kanji;
    const ascii = mod.romaji + finalRomaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
  }
  
  // Pattern 3: [Root] + [Root] (Compound) - KUN READINGS (Wago)
  else if (type < 0.70) {
    const root1 = getRandomElement(JA_ROOTS);
    const root2 = getRandomElement(JA_ROOTS);

    if (root1.romaji === root2.romaji) return generateJapanesePlace();

    let finalRomaji2 = root2.romaji;
    
    // Rendaku chance is high in compounds
    if (root2.rendaku && Math.random() < 0.6) {
        finalRomaji2 = root2.rendaku.romaji;
    }

    const word = root1.kanji + root2.kanji;
    const ascii = root1.romaji + finalRomaji2;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
  } 

  // Pattern 4: "Ga" Construction (e.g. Jiyugaoka, Sekigahara)
  else if (type < 0.78) {
    const first = getRandomElement([...JA_MODIFIERS, ...JA_ROOTS]);
    const second = getRandomElement(JA_GA_SUFFIXES);
    
    const word = first.kanji + 'ヶ' + second.kanji;
    const ascii = first.romaji + 'ga' + second.romaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
  }

  // Pattern 5: "No" Construction (e.g. Ichinomiya, Nakanoshima)
  else if (type < 0.86) {
    const firstPool = Math.random() < 0.4 ? JA_NUMBERS : [...JA_DIRECTIONS, ...JA_ROOTS];
    const first = getRandomElement(firstPool);
    const second = getRandomElement(JA_NO_SUFFIXES);

    const word = first.kanji + '之' + second.kanji;
    const ascii = first.romaji + 'no' + second.romaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
  }
  
  // Pattern 6: On-yomi Compound (e.g. Tokyo, Kyoto, Sapporo-style phonetic)
  else {
    const pre = getRandomElement(JA_ON_COMPONENTS);
    const suf = getRandomElement(JA_ON_COMPONENTS);
    
    // Check for redundancy
    if (pre.kanji === suf.kanji) return generateJapanesePlace();

    // Occasional 3-part On-yomi compound (e.g. Shin-O-saka)
    if (Math.random() < 0.2) {
       const prefix = getRandomElement(JA_PREFIXES);
       // Use On-reading if available for prefix, else skip
       // Actually most JA_PREFIXES are defined with On/Kun mix in romaji field relative to usage.
       // Let's stick to simple Pre+On+On
       const word = prefix.kanji + pre.kanji + suf.kanji;
       const ascii = prefix.romaji + pre.romaji + suf.romaji;
       return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
    }

    const word = pre.kanji + suf.kanji;
    const ascii = pre.romaji + suf.romaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
  }
};
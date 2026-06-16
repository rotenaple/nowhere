
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { JaComponent } from "../dictionaries/japaneseDict";
import {
  JA_MODIFIERS, JA_ROOTS, JA_GA_SUFFIXES, JA_NO_SUFFIXES, JA_ON_COMPONENTS, JA_PREFIXES, JA_DIRECTIONS, JA_NUMBERS
} from "../dictionaries/japaneseDict";

// Sokuon (促音) consonant assimilation:
// When a component ending in ク/ツ/チ/キ precedes a voiceless-initial component,
// the final mora geminates: hoku + kai → hokkai, ichi + chou → itchou
const SOKUON_ENDS = ['ク', 'ツ', 'チ', 'キ'];

const applySokuon = (a: JaComponent, b: JaComponent): { firstRomaji: string, secondRomaji: string } | null => {
  const ending = a.kana.slice(-1);
  if (!ending || !SOKUON_ENDS.includes(ending)) return null;

  const r = b.romaji;

  let trimLen: number;
  if (ending === 'ク') trimLen = 2;      // ku
  else if (ending === 'キ') trimLen = 2;  // ki
  else trimLen = 3;                       // tsu, chi

  const firstRomaji = a.romaji.slice(0, -trimLen);

  let secondRomaji: string;
  if (r.startsWith('ch')) secondRomaji = 't' + r;
  else if (r.startsWith('sh')) secondRomaji = 's' + r;
  else if (r.startsWith('ts')) secondRomaji = 't' + r;
  else if (r.startsWith('k')) secondRomaji = 'k' + r;
  else if (r.startsWith('s')) secondRomaji = 's' + r;
  else if (r.startsWith('t')) secondRomaji = 't' + r;
  else if (r.startsWith('p')) secondRomaji = 'p' + r;
  else if (r.startsWith('h')) secondRomaji = 'p' + r.slice(1);
  else if (r.startsWith('f')) secondRomaji = 'p' + r.slice(1);
  else return null;

  return { firstRomaji, secondRomaji };
};

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
  if (type < 0.15) {
    const prefixPool = Math.random() < 0.6 ? JA_DIRECTIONS : JA_PREFIXES;
    const pre = getRandomElement(prefixPool);
    const root = getRandomElement(JA_ROOTS);

    const word = pre.kanji + root.kanji;
    // Often hyphenated in romanization if it's a major prefix
    const ascii = pre.romaji + root.romaji;

    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
  }

  // Pattern 2: [Modifier] + [Root] (e.g. Oomori, Akasaka) - KUN READINGS (Wago)
  else if (type < 0.35) {
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
  else if (type < 0.55) {
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
  else if (type < 0.62) {
    const first = getRandomElement([...JA_MODIFIERS, ...JA_ROOTS]);
    const second = getRandomElement(JA_GA_SUFFIXES);

    const word = first.kanji + 'ヶ' + second.kanji;
    const ascii = first.romaji + 'ga' + second.romaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
  }

  // Pattern 5: "No" Construction (e.g. Ichinomiya, Nakanoshima)
  else if (type < 0.70) {
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

    // 3-Part Settlement Compound (e.g. Shin-O-saka, Kita-Sen-ju)
    // Constraint: Last part MUST be a settlement type or valid nature feature for a town (not admin)
    if (Math.random() < 0.35) {
      const prefix = getRandomElement([...JA_PREFIXES, ...JA_DIRECTIONS, ...JA_MODIFIERS]);
      const core = getRandomElement([...JA_ON_COMPONENTS, ...JA_ROOTS]);

      // Filter suffixes for SETTLEMENT PLAUSIBILITY
      // Reject: shi, ku, ken, to, fu, gun (Administrative)
      // Accept: kou (port), tsu (port), jou (castle), ki (fort/castle), yama (mountain), shima (island), 
      //         saki (cape), hara (field), gawa (river), ta (field), hashi (bridge), machi/chou (town - borderline admin but often part of name like Otemachi)
      const validSuffixes = [...JA_ON_COMPONENTS, ...JA_ROOTS].filter(c => {
        // Reject Explicit Admin suffixes
        if (['市', '区', '県', '都', '府', '郡'].includes(c.kanji)) return false;

        // Allow specific settlement indicators
        if (['港', '津', '城', '館', '町', '村', '宿', '駅'].includes(c.kanji)) return true;

        // Allow nature features that often host settlements
        if (['山', '島', '崎', '原', '野', '川', '浦', '浜', '江', '泉', '田', '橋'].includes(c.kanji)) return true;

        return false;
      });

      const suffix = getRandomElement(validSuffixes);

      // Avoid duplicates
      if (prefix.kanji === core.kanji || core.kanji === suffix.kanji || prefix.kanji === suffix.kanji) {
        return generateJapanesePlace();
      }

      let pRom = prefix.romaji;
      let cRom = core.romaji;
      let sRom = suffix.romaji;

      const word = prefix.kanji + core.kanji + suffix.kanji;
      const ascii = pRom + cRom + sRom;

      return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
    }

    // Sokuon between the two on-components
    const sokuon = applySokuon(pre, suf);
    const firstRomaji = sokuon ? sokuon.firstRomaji : pre.romaji;
    const secondRomaji = sokuon ? sokuon.secondRomaji : suf.romaji;

    const word = pre.kanji + suf.kanji;
    const ascii = firstRomaji + secondRomaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1) };
  }
};
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { AR_HEADS, AR_ROOTS, AR_ADJECTIVES, AR_SUFFIXES, ArabicComponent } from "../dictionaries/arabicDict";

/**
 * Helper to filter heads based on the selected region style.
 * Logic: 
 * - If style is 'standard', return everything.
 * - If style is specific (e.g., 'egyptian'), return:
 *    1. Heads with NO tags (Generic)
 *    2. Heads WITH the 'egyptian' tag
 *    3. EXCLUDE heads that have tags but NOT 'egyptian' (e.g., exclude 'maghreb' specific terms)
 */
const getHeadsForStyle = (style: string): ArabicComponent[] => {
  if (style === 'standard') return AR_HEADS;

  return AR_HEADS.filter(h => {
    // Include generic heads (no specific region tags)
    if (!h.tags || h.tags.length === 0) return true;
    
    // Include heads that match the requested style
    // (e.g. 'Kafr' has ['egypt', 'levant'], so it works for both)
    if (h.tags.includes(style)) return true;

    // Exclude everything else (e.g., 'Oued' [maghreb] should not appear in 'gulf')
    return false;
  });
};

export const getArabicCapacity = (style: 'standard' | 'egyptian' | 'levantine' | 'gulf' | 'maghrebi' = 'standard') => {
  const validHeads = getHeadsForStyle(style);

  const getDefiniteArticle = (word: any, s: string) => {
    let rom = 'Al-';
    if (s === 'egyptian') rom = 'El-';
    if (word.sun) {
      const firstCharRom = word.rom.charAt(0).toLowerCase();
      let assimilation = firstCharRom;
      if (word.rom.toLowerCase().startsWith('sh')) assimilation = 'sh';
      else if (word.rom.toLowerCase().startsWith('th')) assimilation = 'th';
      else if (word.rom.toLowerCase().startsWith('dh')) assimilation = 'dh';
      if (s !== 'egyptian') {
        rom = `A${assimilation}-`;
      }
    }
    return { ar: 'ال', rom };
  };

  const inflectAdjective = (adj: any, nounGender: 'm' | 'f') => {
    if (nounGender === 'm') return { ar: adj.ar, rom: adj.rom };
    let ar = adj.ar + 'ة';
    let rom = adj.rom;
    if (rom.endsWith('i')) rom += 'yya';
    else rom += 'a';
    return { ar, rom };
  };

  const set = new Set<string>();

  // Pattern 1: [Head] [Root]
  for (const head of validHeads) {
    for (const root of AR_ROOTS) {
      const article = getDefiniteArticle(root, style);
      set.add((head.rom + " " + article.rom + root.rom).trim().toLowerCase());
    }
  }

  // Pattern 2: Al-[Root]
  for (const root of AR_ROOTS) {
    const article = getDefiniteArticle(root, style);
    set.add((article.rom + root.rom).trim().toLowerCase());
  }

  // Pattern 3: [Head] [Adjective]
  for (const head of validHeads) {
    for (const adj of AR_ADJECTIVES) {
      const inf = inflectAdjective(adj, head.gender || 'm');
      // Indefinite
      set.add((head.rom + " " + inf.rom).trim().toLowerCase());
      // Definite
      const headFirstChar = head.rom.charAt(0).toLowerCase();
      const headSun = ['t','th','d','dh','r','z','s','sh','n'].includes(headFirstChar);
      let artHeadStr = 'Al-';
      if (style === 'egyptian') artHeadStr = 'El-';
      if (headSun && style !== 'egyptian') {
        artHeadStr = `A${headFirstChar}-`;
      }
      const artAdj = getDefiniteArticle({ ...adj, ...inf }, style);
      set.add((artHeadStr + head.rom + " " + artAdj.rom + inf.rom).trim().toLowerCase());
    }
  }

  // Pattern 4: [Root] [Adjective]
  for (const root of AR_ROOTS) {
    for (const adj of AR_ADJECTIVES) {
      const inf = inflectAdjective(adj, root.gender || 'm');
      const artRoot = getDefiniteArticle(root, style);
      const artAdj = getDefiniteArticle({ ...adj, ...inf }, style);
      set.add((artRoot.rom + root.rom + " " + artAdj.rom + inf.rom).trim().toLowerCase());
    }
  }

  // Pattern 5: [Root] + Suffix
  for (const root of AR_ROOTS) {
    for (const suffix of AR_SUFFIXES) {
      let base = root.rom.toLowerCase();
      const sVal = suffix.rom.toLowerCase();
      if (base.endsWith('a') || base.endsWith('h')) {
        base = base.slice(0, -1);
      }
      set.add((base + sVal).trim().toLowerCase());
    }
  }

  return set.size;
}

const getDefiniteArticle = (word: ArabicComponent, style: string): { ar: string, rom: string } => {
  let rom = 'Al-';
  
  // Egyptian bias towards 'El-'
  if (style === 'egyptian') {
      rom = 'El-';
  }

  if (word.sun) {
    const firstCharRom = word.rom.charAt(0).toLowerCase();
    // Special handling for sh, th, dh
    let assimilation = firstCharRom;
    if (word.rom.toLowerCase().startsWith('sh')) assimilation = 'sh';
    else if (word.rom.toLowerCase().startsWith('th')) assimilation = 'th';
    else if (word.rom.toLowerCase().startsWith('dh')) assimilation = 'dh';
    
    // Egyptians often don't write assimilation in romanization (e.g. El Raml instead of Ar Raml)
    if (style !== 'egyptian') {
       rom = `A${assimilation}-`;
    }
  }
  
  return { ar: 'ال', rom }; 
}

const inflectAdjective = (adj: ArabicComponent, nounGender: 'm' | 'f'): { ar: string, rom: string } => {
  if (nounGender === 'm') {
    return { ar: adj.ar, rom: adj.rom };
  }
  // Feminine: usually add Ta Marbuta (a / ah / at)
  let ar = adj.ar + 'ة';
  let rom = adj.rom;
  
  if (rom.endsWith('i')) rom += 'yya';
  else rom += 'a';
  
  return { ar, rom };
}

export const generateArabicPlace = (style: 'standard' | 'egyptian' | 'levantine' | 'gulf' | 'maghrebi' = 'standard'): GeneratedResult => {
  let wordAr = "";
  let wordRom = "";
  let components: string[] = [];

  // Get the filtered pool based on the requested style
  const heads = getHeadsForStyle(style);

  // === PLACE MODE ===
  const type = Math.random();
  let rule = "";

  // Pattern 1: [Head] [Root] (Idafa Construction - Genitive)
  // e.g. Sharm El-Sheikh, Kafr El-Sheikh, Deir Al-Balah
  if (type < 0.35) {
    rule = "[Head] [Root] (Idafa)";
    const head = getRandomElement(heads);
    const root = getRandomElement(AR_ROOTS);
    components.push(JSON.stringify(head), JSON.stringify(root));
    const article = getDefiniteArticle(root, style); 
    
    wordAr = `${head.ar} ${article.ar}${root.ar}`;
    wordRom = `${head.rom} ${article.rom}${root.rom}`;
  }
  
  // Pattern 2: Al-[Root] (Definite Noun)
  // e.g. Al-Riyadh, Al-Manamah, Al-Fayyum
  else if (type < 0.55) {
    rule = "Al-[Root] (Definite Noun)";
    const root = getRandomElement(AR_ROOTS);
    components.push(JSON.stringify(root));
    const article = getDefiniteArticle(root, style);
    wordAr = article.ar + root.ar;
    wordRom = article.rom + root.rom;
  }
  
  // Pattern 3: [Head] [Adjective] (Noun-Adjective)
  // e.g. Bahr Ahmar (Red Sea), Al-Madina Al-Munawwarah
  else if (type < 0.75) {
    rule = "[Head] [Adjective]";
    const head = getRandomElement(heads);
    const adj = getRandomElement(AR_ADJECTIVES);
    components.push(JSON.stringify(head), JSON.stringify(adj));
    
    // Agreement
    const inflectedAdj = inflectAdjective(adj, head.gender || 'm');
    
    if (Math.random() < 0.5) {
       // Indefinite
       wordAr = `${head.ar} ${inflectedAdj.ar}`;
       wordRom = `${head.rom} ${inflectedAdj.rom}`;
    } else {
       // Definite
       const headFirstChar = head.rom.charAt(0).toLowerCase();
       const headSun = ['t','th','d','dh','r','z','s','sh','n'].includes(headFirstChar);
       
       let artHeadStr = 'Al-';
       if (style === 'egyptian') artHeadStr = 'El-';
       
       if (headSun && style !== 'egyptian') {
           artHeadStr = `A${headFirstChar}-`;
       }
       
       const artHeadAr = 'ال';

       // Adj Article
       const artAdj = getDefiniteArticle({ ...adj, ...inflectedAdj }, style); 
       
       wordAr = `${artHeadAr}${head.ar} ${artAdj.ar}${inflectedAdj.ar}`;
       wordRom = `${artHeadStr}${head.rom} ${artAdj.rom}${inflectedAdj.rom}`;
    }
  }
  
  // Pattern 4: [Root] + [Adjective] 
  // e.g. Riyadh Al-Khabra
  else if (type < 0.90) {
    rule = "[Root] [Adjective]";
    const root = getRandomElement(AR_ROOTS);
    const adj = getRandomElement(AR_ADJECTIVES);
    components.push(JSON.stringify(root), JSON.stringify(adj));
    const inflectedAdj = inflectAdjective(adj, root.gender || 'm');
    
    const artRoot = getDefiniteArticle(root, style);
    const artAdj = getDefiniteArticle({ ...adj, ...inflectedAdj }, style);
    
    wordAr = `${artRoot.ar}${root.ar} ${artAdj.ar}${inflectedAdj.ar}`;
    wordRom = `${artRoot.rom}${root.rom} ${artAdj.rom}${inflectedAdj.rom}`;
  }
  
  // Pattern 5: [Root] + Suffix
  // e.g. Zahriyya, Sabkhiyya
  else {
    rule = "[Root] + Suffix";
    const root = getRandomElement(AR_ROOTS);
    const suffix = getRandomElement(AR_SUFFIXES);
    components.push(JSON.stringify(root), JSON.stringify(suffix));
    
    let baseAr = root.ar;
    let baseRom = root.rom.toLowerCase();
    
    if (baseRom.endsWith('a') || baseRom.endsWith('h')) {
      baseAr = baseAr.slice(0, -1);
      baseRom = baseRom.slice(0, -1);
    }
    
    wordAr = baseAr + suffix.ar;
    wordRom = baseRom + suffix.rom;
  }

  return { word: wordAr, ascii: wordRom, generationRules: [rule], dictionaryComponents: components };
};
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { AR_HEADS, AR_ROOTS, AR_ADJECTIVES, ArabicComponent } from "../dictionaries/arabicDict";

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

  // 1. Al-[Root] (Does not depend on heads)
  const c1 = AR_ROOTS.length;
  // 2. [Head] [Root] (Idafa)
  const c2 = validHeads.length * AR_ROOTS.length;
  // 3. [Head] [Adjective]
  const c3 = validHeads.length * AR_ADJECTIVES.length;
  // 4. [Root] [Adjective] (Does not depend on heads)
  const c4 = AR_ROOTS.length * AR_ADJECTIVES.length;
  
  return c1 + c2 + c3 + c4;
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

  // Get the filtered pool based on the requested style
  const heads = getHeadsForStyle(style);

  // === PLACE MODE ===
  const type = Math.random();

  // Pattern 1: [Head] [Root] (Idafa Construction - Genitive)
  // e.g. Sharm El-Sheikh, Kafr El-Sheikh, Deir Al-Balah
  if (type < 0.40) {
    const head = getRandomElement(heads);
    const root = getRandomElement(AR_ROOTS);
    const article = getDefiniteArticle(root, style); 
    
    wordAr = `${head.ar} ${article.ar}${root.ar}`;
    wordRom = `${head.rom} ${article.rom}${root.rom}`;
  }
  
  // Pattern 2: Al-[Root] (Definite Noun)
  // e.g. Al-Riyadh, Al-Manamah, Al-Fayyum
  else if (type < 0.60) {
    const root = getRandomElement(AR_ROOTS);
    const article = getDefiniteArticle(root, style);
    wordAr = article.ar + root.ar;
    wordRom = article.rom + root.rom;
  }
  
  // Pattern 3: [Head] [Adjective] (Noun-Adjective)
  // e.g. Bahr Ahmar (Red Sea), Al-Madina Al-Munawwarah
  else if (type < 0.80) {
    const head = getRandomElement(heads);
    const adj = getRandomElement(AR_ADJECTIVES);
    
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
  else {
    const root = getRandomElement(AR_ROOTS);
    const adj = getRandomElement(AR_ADJECTIVES);
    const inflectedAdj = inflectAdjective(adj, root.gender || 'm');
    
    const artRoot = getDefiniteArticle(root, style);
    const artAdj = getDefiniteArticle({ ...adj, ...inflectedAdj }, style);
    
    wordAr = `${artRoot.ar}${root.ar} ${artAdj.ar}${inflectedAdj.ar}`;
    wordRom = `${artRoot.rom}${root.rom} ${artAdj.rom}${inflectedAdj.rom}`;
  }

  return { word: wordAr, ascii: wordRom };
};
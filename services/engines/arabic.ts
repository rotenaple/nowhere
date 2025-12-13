
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { AR_HEADS, AR_ROOTS, AR_ADJECTIVES, ArabicComponent } from "../dictionaries/arabicDict";

export const getArabicCapacity = () => {
  // 1. Al-[Root]
  const c1 = AR_ROOTS.length;
  // 2. [Head] [Root] (Idafa)
  const c2 = AR_HEADS.length * AR_ROOTS.length;
  // 3. [Head] [Adjective]
  const c3 = AR_HEADS.length * AR_ADJECTIVES.length;
  // 4. [Root] [Adjective]
  const c4 = AR_ROOTS.length * AR_ADJECTIVES.length;
  
  return c1 + c2 + c3 + c4;
}

// Maps Roman characters to Arabic script for Sun Letter detection logic mostly
// But we have the 'sun' property in the dictionary now.
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
  // Logic: if ends in long vowel like 'i', becomes 'iyya' or 'iya'
  let ar = adj.ar + 'ة';
  let rom = adj.rom;
  
  if (rom.endsWith('i')) rom += 'yya';
  else rom += 'a';
  
  return { ar, rom };
}

export const generateArabicPlace = (style: 'standard' | 'egyptian' | 'levantine' | 'gulf' | 'maghrebi' = 'standard'): GeneratedResult => {
  let wordAr = "";
  let wordRom = "";

  // Weighted selection for heads based on style
  // If specific style, boost specific heads, but fall back to generic if pool too small
  let heads = AR_HEADS;
  if (style === 'egyptian') {
      const specialized = AR_HEADS.filter(h => h.tags?.includes('egypt'));
      if (Math.random() < 0.6) heads = specialized;
  } else if (style === 'levantine') {
      const specialized = AR_HEADS.filter(h => h.tags?.includes('levant'));
      if (Math.random() < 0.6) heads = specialized;
  } else if (style === 'gulf') {
      const specialized = AR_HEADS.filter(h => h.tags?.includes('gulf'));
      if (Math.random() < 0.6) heads = specialized;
  } else if (style === 'maghrebi') {
      const specialized = AR_HEADS.filter(h => h.tags?.includes('maghreb'));
      if (Math.random() < 0.6) heads = specialized;
  }

  // === PLACE MODE ===
  const type = Math.random();

  // Pattern 1: [Head] [Root] (Idafa Construction - Genitive)
  // e.g. Sharm El-Sheikh, Kafr El-Sheikh, Deir Al-Balah
  if (type < 0.40) {
    const head = getRandomElement(heads.length > 0 ? heads : AR_HEADS);
    const root = getRandomElement(AR_ROOTS);
    const article = getDefiniteArticle(root, style); // The second part of Idafa is usually definite
    
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
    const head = getRandomElement(heads.length > 0 ? heads : AR_HEADS);
    const adj = getRandomElement(AR_ADJECTIVES);
    
    // Agreement
    const inflectedAdj = inflectAdjective(adj, head.gender || 'm');
    
    // Indefinite (No Al-) or Definite (Both Al-)
    
    if (Math.random() < 0.5) {
       // Indefinite
       wordAr = `${head.ar} ${inflectedAdj.ar}`;
       wordRom = `${head.rom} ${inflectedAdj.rom}`;
    } else {
       // Definite
       // Check head sun letter manually for romanization prefix construction
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
  
  // Pattern 4: [Root] + [Adjective] (e.g. Petra... no. e.g. Riyadh Al-Khabra)
  else {
    const root = getRandomElement(AR_ROOTS);
    const adj = getRandomElement(AR_ADJECTIVES);
    const inflectedAdj = inflectAdjective(adj, root.gender || 'm');
    
    // Usually definite for major places: Al-Jouf Al-Gharbi
    const artRoot = getDefiniteArticle(root, style);
    const artAdj = getDefiniteArticle({ ...adj, ...inflectedAdj }, style);
    
    wordAr = `${artRoot.ar}${root.ar} ${artAdj.ar}${inflectedAdj.ar}`;
    wordRom = `${artRoot.rom}${root.rom} ${artAdj.rom}${inflectedAdj.rom}`;
  }

  return { word: wordAr, ascii: wordRom };
};
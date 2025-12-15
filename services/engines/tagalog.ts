import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { TL_ROOTS, TL_PREFIXES, TL_SUFFIXES, TL_ADJECTIVES } from "../dictionaries/tagalogDict";
import { ROMANCE_DATA, getRomData, RomanceComponent } from "../dictionaries/romanceDict";

// Specific Philippine historical figures or local names
const PH_HEROES = [
  'Rizal', 'Bonifacio', 'Magsaysay', 'Quezon', 'Mabini',
  'Del Pilar', 'Aguinaldo', 'Luna', 'Recto', 'Burgos',
  'Lapu-Lapu', 'Silang', 'Jacinto', 'Aquino', 'Osmeña'
];

/**
 * Helper to strip Spanish accents for the ASCII output.
 */
const normalizeSpanish = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Helper to filter Romance dictionary by granular types
// This matches the logic used in spanish.ts
const getRomancePool = (types: string[]): RomanceComponent[] => {
    return ROMANCE_DATA.filter(c => c.es && types.includes(c.type));
};

export const getTagalogCapacity = () => {
  // Native capacities
  const c1 = TL_PREFIXES.length * TL_ROOTS.length;
  const c2 = TL_ROOTS.length * TL_SUFFIXES.length;
  const c3 = TL_ADJECTIVES.length * TL_ROOTS.length;

  // Spanish Colonial capacities (Using specific pools)
  const esHeads = getRomancePool(['prefix', 'settlement', 'geo_major']).length;
  // Tail can be almost anything now (Universal Tail logic from Spanish generator)
  const esTails = getRomancePool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract', 'adj_quality', 'adj_color']).length + PH_HEROES.length;

  const c4 = esHeads * esTails;
  const c5 = TL_ROOTS.length * TL_ROOTS.length; 
  return c1 + c2 + c3 + c4 + c5;
}

export const generateTagalogPlace = (): GeneratedResult => {
  let word = "";
  const type = Math.random();

  // ==========================================
  // Pattern 1: Native Prefix (e.g., Malabon, Calamba)
  // ==========================================
  if (type < 0.20) {
    const pre = getRandomElement(TL_PREFIXES);
    
    // Filter roots to prevent native prefixes attaching to Spanish proper names
    let rootCandidates = TL_ROOTS;
    if (!pre.es && pre.val !== 'May') { 
        rootCandidates = TL_ROOTS.filter(r => !r.es); 
    }

    const root = getRandomElement(rootCandidates);
    let p = pre.val;
    let r = root.val;

    // Colonial spelling shift: Ka -> Ca
    if (p === 'Ka' && Math.random() < 0.6) p = 'Ca';
    
    if (p === 'May') {
       // "Maynila" (Fused) vs "May Bunga" (Separate)
       if (Math.random() < 0.5) word = `${p} ${r}`; 
       else word = `${p}${r.toLowerCase()}`; 
    } else {
       word = p + r.toLowerCase();
    }
  } 
  
  // ==========================================
  // Pattern 2: Native Locative Suffix (e.g., Batangas, Bulacan)
  // ==========================================
  else if (type < 0.40) {
    const rootCandidates = TL_ROOTS.filter(r => !r.es);
    const root = getRandomElement(rootCandidates);
    const suf = getRandomElement(TL_SUFFIXES);
    let r = root.val;
    let s = suf.val;
    
    // Morphophonemics (Sound changes)
    if (['a','e','i','u'].includes(r.slice(-1))) {
        if (!s.startsWith('h') && !s.startsWith('n') && !s.startsWith('g')) s = 'h' + s;
        if (r.endsWith('o')) r = r.slice(0, -1) + 'u'; // Bato -> Batuhan
    } 
    else if (r.endsWith('d') && s.startsWith('a')) {
        r = r.slice(0, -1) + 'r'; // Bukid -> Bukiran
    }

    word = r + s;
  }
  
  // ==========================================
  // Pattern 3: Spanish Colonial (Specific Types)
  // e.g., San Pedro, Villa Real, Puerto Princesa
  // ==========================================
  else if (type < 0.60) {
    // 3a. Saints (San/Santa + Name/Abstract/Bio)
    if (Math.random() < 0.3) {
        let saintTail = "";
        let targetGender = 'm';

        // 50% chance for PH Hero, 50% for Romance dictionary words
        if (Math.random() < 0.5) {
            saintTail = getRandomElement(PH_HEROES);
            // Default masculine for heroes unless we have a list, typically "San" works best.
        } else {
            // Pick concepts (Peace, Cross) or Nature (Rose, Lily) or Names
            // Note: 'abstract', 'bio_flora' work best for saints.
            const obj = getRandomElement(getRomancePool(['abstract', 'bio_flora', 'bio_fauna'])); 
            const data = getRomData(obj.es);
            saintTail = data.val;
            targetGender = data.gender || 'm';
        }

        let prefix = (targetGender === 'f') ? 'Santa' : 'San';
        // "Santo" logic for masculine words starting with Do/To/Ni (Santo Domingo)
        if (prefix === 'San' && (saintTail.startsWith('Do') || saintTail.startsWith('To') || saintTail.startsWith('Ni'))) {
            prefix = 'Santo';
        }
        word = `${prefix} ${saintTail}`;
    }
    
    // 3b. Civic/Geo + Adjective/Noun (Villa Nueva, Puerto Galera)
    else {
        // Head: Settlement (Villa, Ciudad) or Major Geo (Monte, Isla)
        const headObj = getRandomElement(getRomancePool(['settlement', 'geo_major', 'geo_minor']));
        const headData = getRomData(headObj.es);
        const headVal = headData.val;
        const headGender = headData.gender || 'm';

        // Tail: Universal Adjective OR Universal Noun
        // This mimics the "Universal" logic in spanish.ts
        if (Math.random() < 0.4) {
            // CASE 1: Noun + Adjective (Villa Nueva)
            const adjObj = getRandomElement(getRomancePool(['adj_quality', 'adj_color', 'adj_geo']));
            let adj = getRomData(adjObj.es).val;

            // Gender Agreement (Adjective matches Head)
            if (headGender === 'f') {
                if (adj.endsWith('o')) adj = adj.slice(0, -1) + 'a';
                if (adj === 'Santo') adj = 'Santa';
                if (adj === 'Buen') adj = 'Buena';
            }
            
            // Position: Pre-nominal (Nuevo) vs Post-nominal
            if (adjObj.tags?.includes('pre')) {
                if (adj === 'Grande') adj = 'Gran';
                if (adj === 'Santo') adj = 'San';
                word = `${adj} ${headVal}`;
            } else {
                word = `${headVal} ${adj}`;
            }
        } else {
            // CASE 2: Noun + de + Noun (Puerto de la Cruz, Valle Verde -> Valle del Rio)
            // Tail can be anything (Bio, Geo, Abstract)
            const tailObj = getRandomElement(getRomancePool(['bio_flora', 'bio_fauna', 'abstract', 'geo_major', 'settlement']));
            const tailData = getRomData(tailObj.es);
            
            let connector = 'de';
            // Tagalog-Spanish often keeps articles for "High" spanish names, 
            // but drops them for "Pidgin" names. Let's keep it proper for "Colonial" feel.
            if (tailData.gender === 'f') connector = 'de la';
            else connector = 'del'; // Contracted

            word = `${headVal} ${connector} ${tailData.val}`;
        }
    }
  }
  
  // ==========================================
  // Pattern 4: Descriptive Native (Adj + Noun)
  // e.g., Bagong Silang, Luntian Bukid
  // ==========================================
  else if (type < 0.80) {
    const adj = getRandomElement(TL_ADJECTIVES);
    // Strict Native Root filter
    const root = getRandomElement(TL_ROOTS.filter(r => !r.es));
    
    let a = adj.val;
    let linker = " na ";
    
    // Tagalog linker grammar: 
    // Vowel -> -ng (Bago -> Bagong)
    // N -> -g (Asin -> Asing)
    // Consonant -> na (Puti -> Puti na)
    if (['a','e','i','o','u'].includes(a.slice(-1))) {
        linker = "ng "; 
    } else if (a.slice(-1) === 'n') {
        linker = "g "; 
    }
    
    word = `${a}${linker}${root.val}`;
  }

  // ==========================================
  // Pattern 5: Native Compounds
  // e.g., Balintawak, Tagaytay (Reduplication)
  // ==========================================
  else {
    const r1 = getRandomElement(TL_ROOTS.filter(r => !r.es));
    const r2 = getRandomElement(TL_ROOTS.filter(r => !r.es));

    if (r1.val === r2.val) {
        // Reduplication (Tawi-Tawi, Iloilo - though Iloilo is Hiligaynon, structure is Pan-Philippine)
        if (Math.random() < 0.25) word = `${r1.val}-${r1.val.toLowerCase()}`;
        else return generateTagalogPlace(); // Retry if duplicate selected by accident
    } else {
        // Fused or Hyphenated
        let part1 = r1.val;
        let part2 = r2.val.toLowerCase();
        
        // Linker fusion logic for compounds (rare but happens: Olongapo)
        if (Math.random() < 0.3 && ['a','e','i','o','u'].includes(part1.slice(-1))) {
            part1 += 'ng';
        }
        word = part1 + part2;
    }
  }

  word = word.trim();
  word = word.charAt(0).toUpperCase() + word.slice(1);
  const ascii = normalizeSpanish(word);
  
  return { word: word, ascii: ascii };
}
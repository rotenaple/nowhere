// tagalogGenerator.ts

import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
// Import TagalogComponent for type checking in filters
import { TL_ROOTS, TL_PREFIXES, TL_SUFFIXES, TL_ADJECTIVES, TagalogComponent } from "../dictionaries/tagalogDict";
import { ROMANCE_DATA, getRomData, RomanceComponent } from "../dictionaries/romanceDict";

// Specific Philippine historical figures or local names that won't appear in a generic Romance dictionary
const PH_HEROES = [
  'Rizal', 'Bonifacio', 'Magsaysay', 'Quezon', 'Mabini',
  'Del Pilar', 'Aguinaldo', 'Luna', 'Recto', 'Burgos',
  'Lapu-Lapu', 'Silang', 'Jacinto', 'Aquino', 'Osmeña'
];

/**
 * Helper to strip Spanish accents for the ASCII output.
 * e.g., "San José" -> "San Jose", "Montaña" -> "Montana"
 */
const normalizeSpanish = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Helper function to get a filtered pool from ROMANCE_DATA
const getRomancePool = (types: string[]): RomanceComponent[] => {
    return ROMANCE_DATA.filter(c => c.es && types.includes(c.type));
};

export const getTagalogCapacity = () => {
  const c1 = TL_PREFIXES.length * TL_ROOTS.length;
  const c2 = TL_ROOTS.length * TL_SUFFIXES.length;
  const c3 = TL_ADJECTIVES.length * TL_ROOTS.length;

  // Approximation for Spanish combinations
  const esHeads = ROMANCE_DATA.filter(i => {
    const data = getRomData(i.es);
    return data.val && (i.type === 'prefix' || i.type === 'civic');
  }).length;

  const esTails = ROMANCE_DATA.filter(i => {
    const data = getRomData(i.es);
    return data.val && (i.type === 'root' || i.type === 'adjective');
  }).length + PH_HEROES.length;

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
    
    let rootCandidates = TL_ROOTS;
    // Filter roots candidates to prevent native prefixes attaching to Spanish-derived place names too freely
    if (!pre.es && pre.val !== 'May') { // If it's a native prefix AND not 'May' (which often takes names)
        rootCandidates = TL_ROOTS.filter(r => !r.es); // Only allow native roots
    } else if (pre.val === 'Cala') { // 'Cala-' is Spanish spelling of 'Ka-' but it's meant for native roots
        rootCandidates = TL_ROOTS.filter(r => !r.es);
    }
    // If pre.es (e.g., Cala) or pre.val === 'May', it has more leniency/specific rules already, so no extra filter needed.

    const root = getRandomElement(rootCandidates);
    let p = pre.val;
    let r = root.val;

    // Colonial spelling shift: Ka -> Ca
    if (p === 'Ka' && Math.random() < 0.6) p = 'Ca';
    
    // 'May' typically remains separate and capitalized: "Maynila" vs "May Bunga"
    if (p === 'May') {
       if (Math.random() < 0.5) word = `${p} ${r}`; // May Bunga
       else word = `${p}${r.toLowerCase()}`; // Maynila
    } else {
       word = p + r.toLowerCase();
    }
  } 
  
  // ==========================================
  // Pattern 2: Native Locative Suffix (e.g., Batangas, Bulacan)
  // ==========================================
  else if (type < 0.40) {
    // Roots candidates for suffixation should primarily be native
    const rootCandidates = TL_ROOTS.filter(r => !r.es);
    const root = getRandomElement(rootCandidates);
    const suf = getRandomElement(TL_SUFFIXES);
    let r = root.val;
    let s = suf.val;
    
    // Tagalog Morphophonemics
    if (['a','e','i','u'].includes(r.slice(-1))) {
        // If ending in vowel, add 'h' unless suffix starts with 'n'/'g'
        if (!s.startsWith('h') && !s.startsWith('n') && !s.startsWith('g')) s = 'h' + s;
        // O -> U shift (Bato -> Batuhan)
        if (r.endsWith('o')) r = r.slice(0, -1) + 'u';
    } 
    // D -> R shift (Bukid -> Bukiran)
    else if (r.endsWith('d') && s.startsWith('a')) {
        r = r.slice(0, -1) + 'r';
    }

    word = r + s;
  }
  
  // ==========================================
  // Pattern 3: Spanish Colonial (Using Romance Dict)
  // e.g., San Pedro, Villa Real, La Nueva
  // ==========================================
  else if (type < 0.60) {
    // Heads can be prefixes or civic terms that act as prefixes (e.g., Puerto, Villa)
    const headObj = getRandomElement(getRomancePool(['prefix', 'civic', 'river']));
    let tailObj: RomanceComponent | null = null;
    let phHeroTail: string | null = null; // For PH Heroes, which don't have RomanceEntry structure

    // Determine raw head value and its initial gender suggestion
    let headRaw = getRomData(headObj.es).val;
    let headGenderSuggestion = getRomData(headObj.es).gender;

    // STEP 1: Choose the Tail component
    // Special handling for Saint-like heads
    if (headRaw === 'San' || headRaw === 'Santa' || headRaw === 'Santo') {
        if (Math.random() < 0.3) {
            phHeroTail = getRandomElement(PH_HEROES); // PH Hero as tail
        } else {
            // Concepts: roots or specific abstract nouns suitable for saints (Cruz, Paz, Jose, Rose)
            tailObj = getRandomElement(ROMANCE_DATA.filter(i =>
                i.es && (i.type === 'root' || i.def === 'Cross' || i.def === 'Peace' || i.def === 'Rose' || i.def === 'Child')
            ));
        }
    } else {
        // For other heads (Puerto, Los, Villa, etc.), pick a generic root or adjective
        tailObj = getRandomElement(getRomancePool(['root', 'adjective']));
    }

    // STEP 2: Determine the Target Gender for agreement
    let targetGender: 'm' | 'f' = 'm'; // Default to masculine

    if (phHeroTail) {
        // If it's a PH Hero, enforce feminine if head is "Santa"
        if (headRaw === 'Santa') targetGender = 'f';
        // Otherwise, default masculine for heroes (no specific gender info in PH_HEROES list)
    } else if (tailObj) {
        const tailData = getRomData(tailObj.es);
        if (tailObj.type === 'root') { // If Tail is a Noun (root), its gender dictates
            targetGender = (tailData.gender === 'f') ? 'f' : 'm';
        } else { // If Tail is an Adjective, the Head's gender dictates
            if (headGenderSuggestion === 'f' || headRaw.endsWith('a') || (headObj.tags && headObj.tags.includes('fem_head'))) {
                targetGender = 'f';
            }
            // Else, it remains 'm'
        }
    }

    // STEP 3: Apply Gender Agreement to Head (Prefix)
    let head = headRaw; // Start with the raw value
    if (['El', 'La', 'Los', 'Las'].includes(headRaw)) { // Handle Articles
        head = (targetGender === 'f') ? 'La' : 'El'; // Simplified to singular for now
    }
    else if (['San', 'Santo', 'Santa'].includes(headRaw)) { // Handle Saints
        if (targetGender === 'f') {
            head = 'Santa';
        } else if (phHeroTail) {
            if (phHeroTail.startsWith('Do') || phHeroTail.startsWith('To') || phHeroTail.startsWith('Ni')) {
                head = 'Santo'; // Santo Tomas, Santo Domingo, Santo Niño
            } else {
                head = 'San';
            }
        }
        else if (tailObj) {
            const tailData = getRomData(tailObj.es);
            if (tailData.val.startsWith('Do') || tailData.val.startsWith('To') || tailData.val.startsWith('Ni')) {
                head = 'Santo';
            } else {
                head = 'San';
            }
        } else {
            head = 'San';
        }
    }

    // STEP 4: Apply Gender Agreement to Tail (Noun or Adjective)
    let tail: string; // Will store the final tail string
    if (phHeroTail) {
        tail = phHeroTail;
    } else if (tailObj) {
        const tailData = getRomData(tailObj.es);
        if (tailObj.type === 'adjective') {
            if (targetGender === 'f') {
                if (Array.isArray(tailObj.es) && typeof tailObj.es[0] === 'string' && typeof tailObj.es[1] === 'string') {
                    tail = tailObj.es[1];
                }
                else if (tailData.val.endsWith('o') && !(tailObj.tags && tailObj.tags.includes('invariant'))) {
                    tail = tailData.val.slice(0, -1) + 'a';
                }
                else if (tailData.val === 'Buen') tail = 'Buena';
                else if (tailData.val === 'Mal') tail = 'Mala';
                else tail = tailData.val;
            } else { // Target is masculine
                if (Array.isArray(tailObj.es) && typeof tailObj.es[0] === 'string' && typeof tailObj.es[1] === 'string') {
                    tail = tailObj.es[0];
                }
                else if (tailData.val.endsWith('a') && !(tailObj.tags && tailObj.tags.includes('invariant')) && !tailData.val.endsWith('ia')) {
                    tail = tailData.val.slice(0, -1) + 'o';
                }
                else if (tailData.val === 'Buena') tail = 'Buen';
                else if (tailData.val === 'Mala') tail = 'Mal';
                else tail = tailData.val;
            }
        } else { // Tail is a Root (Noun), or other type. Assume no gender change to the word itself.
            tail = tailData.val;
        }
    } else {
      tail = "";
    }

    // STEP 5: Construct the final word with "de" or "del"
    let generatedWord = `${head} ${tail}`; // Use a temporary variable for assembly

    // Occasional "de" or "del"
    const isHeadAlreadyArticle = ['El', 'La'].includes(head); // Check the *result* after gender agreement
    
    if (Math.random() < 0.25
        && !(['San', 'Santo', 'Santa'].includes(headRaw) || (headObj.tags && headObj.tags.includes('name')))
        && !isHeadAlreadyArticle // Suppress 'de' construction if head is already a definite article
       ) {
        let connector = 'de';
        // decide "de la" or "del" for nouns
        if (tailObj?.type === 'root' && !(tailObj.tags && tailObj.tags.includes('invariant_article'))) {
            if (targetGender === 'm') {
                connector = 'del';
            } else if (targetGender === 'f') {
                connector = 'de la';
            }
        }
        generatedWord = `${head} ${connector} ${tail}`;
    }
    word = generatedWord; // Assign to the main 'word' variable
  }
  
  // ==========================================
  // Pattern 4: Descriptive Native (Adj + Noun)
  // ==========================================
  else if (type < 0.80) {
    const adj = getRandomElement(TL_ADJECTIVES);
    
    // Filter roots to avoid native adjectives describing Spanish-derived roots that are proper names
    const rootCandidates = TL_ROOTS.filter(r => !r.es); // Only allow native roots
    const root = getRandomElement(rootCandidates);
    
    let a = adj.val;
    let linker = " na ";
    
    if (['a','e','i','o','u'].includes(a.slice(-1))) {
        linker = "ng "; // Bago -> Bagong
    } else if (a.slice(-1) === 'n') {
        linker = "g "; // Asin -> Asing
    }
    
    word = `${a}${linker}${root.val}`;
  }

  // ==========================================
  // Pattern 5: Native Compounds
  // ==========================================
  else {
    // Filter roots to ensure both parts of the compound are native Tagalog
    const r1Candidates = TL_ROOTS.filter(r => !r.es);
    const r1 = getRandomElement(r1Candidates);

    const r2Candidates = TL_ROOTS.filter(r => !r.es);
    const r2 = getRandomElement(r2Candidates);

    // To prevent infinite loops if TL_ROOTS is very small after filtering
    if (!r1 || !r2) {
       // Fallback or restart if filter makes pools too small
       return generateTagalogPlace();
    }

    if (r1.val === r2.val) {
        // Reduplication explicitly allowed for native roots
        if (Math.random() < 0.15) {
             word = `${r1.val}-${r1.val.toLowerCase()}`;
        } else {
             // If same and no reduplication, generate again
             return generateTagalogPlace();
        }
    } else {
        // Fused or Hyphenated native compound
        let part1 = r1.val;
        let part2 = r2.val.toLowerCase();
        
        if (Math.random() < 0.5) {
            // Fused (Olongapo)
            if (['a','e','i','o','u'].includes(part1.slice(-1)) && Math.random() < 0.5) {
                part1 += 'ng';
            }
            word = part1 + part2;
        } else {
            // Hyphenated for native compounds
            word = part1 + part2;
        }
    }
  }

  // Final Formatting
  word = word.trim();
  word = word.charAt(0).toUpperCase() + word.slice(1);
  
  // Create ASCII version by removing Spanish accents (ñ -> n, á -> a)
  const ascii = normalizeSpanish(word);
  
  return { word: word, ascii: ascii };
}
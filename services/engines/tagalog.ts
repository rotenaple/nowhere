import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { TL_ROOTS, TL_PREFIXES, TL_SUFFIXES, TL_ADJECTIVES } from "../dictionaries/tagalogDict";
import { ROMANCE_DATA } from "../dictionaries/romanceDict";

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

export const getTagalogCapacity = () => {
  const c1 = TL_PREFIXES.length * TL_ROOTS.length;
  const c2 = TL_ROOTS.length * TL_SUFFIXES.length;
  const c3 = TL_ADJECTIVES.length * TL_ROOTS.length;
  // Approximation for Spanish combinations
  const esHeads = ROMANCE_DATA.filter(i => i.es && (i.type === 'prefix' || i.type === 'civic')).length;
  const esTails = ROMANCE_DATA.filter(i => i.es && (i.type === 'root' || i.type === 'adjective')).length + PH_HEROES.length;
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
    const root = getRandomElement(TL_ROOTS);
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
    const root = getRandomElement(TL_ROOTS);
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
  // e.g., San José, Puerto Princesa
  // ==========================================
  else if (type < 0.60) {
    const validHeads = ROMANCE_DATA.filter(i => 
        i.es && (
            i.type === 'prefix' || 
            i.type === 'civic' || 
            ['Mount', 'River', 'Port', 'Island', 'Beach', 'Saint'].includes(i.id)
        )
    );
    
    const headObj = getRandomElement(validHeads);
    let head = headObj.es!;

    let tail = "";
    
    // Sub-case: Saints
    if (head === 'San' || head === 'Santa' || head === 'Santo') {
        if (Math.random() < 0.3) {
             tail = getRandomElement(PH_HEROES);
        } else {
             // Use Romance concepts (Cruz, Paz, Jose)
             const concepts = ROMANCE_DATA.filter(i => 
                i.es && (i.type === 'root' || i.id === 'Cross' || i.id === 'Peace' || i.id === 'Rose')
             );
             tail = getRandomElement(concepts).es!;
        }
    } 
    // Sub-case: Topographic/Civic
    else {
        const tailObj = getRandomElement(ROMANCE_DATA.filter(i => i.es && (i.type === 'adjective' || i.type === 'root')));
        tail = tailObj.es!;

        // Gender Agreement
        const isHeadFem = head.endsWith('a') || headObj.gender === 'f';
        
        if (tailObj.type === 'adjective') {
            if (isHeadFem && tail.endsWith('o')) {
                tail = tail.slice(0, -1) + 'a';
            } else if (!isHeadFem && tail.endsWith('a')) {
                tail = tail.slice(0, -1) + 'o';
            }
        }
    }

    word = `${head} ${tail}`;

    // Occasional "de" or "del"
    if (Math.random() < 0.2 && !word.startsWith('San') && !word.startsWith('Santo')) {
        const particle = (tail === 'Oro' || tail === 'Sur' || tail === 'Norte') ? 'de' : 'del'; 
        word = `${head} ${particle} ${tail}`;
    }
  }
  
  // ==========================================
  // Pattern 4: Descriptive Native (Adj + Noun)
  // ==========================================
  else if (type < 0.80) {
    const adj = getRandomElement(TL_ADJECTIVES);
    const root = getRandomElement(TL_ROOTS);
    
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
    const r1 = getRandomElement(TL_ROOTS);
    const r2 = getRandomElement(TL_ROOTS);
    if (r1.val === r2.val) return generateTagalogPlace();

    let part1 = r1.val;
    let part2 = r2.val.toLowerCase();
    
    if (Math.random() < 0.5) {
        // Fused (Olongapo)
        if (['a','e','i','o','u'].includes(part1.slice(-1)) && Math.random() < 0.5) {
            part1 += 'ng';
        }
        word = part1 + part2;
    } else {
        // Reduplication (Tawi-Tawi) or Hyphenated
        if (Math.random() < 0.15) {
             word = `${r1.val}-${r1.val.toLowerCase()}`;
        } else {
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
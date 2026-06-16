import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { TL_ROOTS, TL_PREFIXES, TL_SUFFIXES, TL_ADJECTIVES, TagalogComponent } from "../dictionaries/tagalogDict";
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
const getRomancePool = (types: string[]): RomanceComponent[] => {
    return ROMANCE_DATA.filter(c => c.es && types.includes(c.type));
};

// Helper to filter Tagalog dictionary
const getTagalogPool = (types: string[]): TagalogComponent[] => {
    return TL_ROOTS.filter(r => types.includes(r.type) && !r.es);
};

export const getTagalogCapacity = () => {
  // Native capacities
  const c1 = TL_PREFIXES.length * TL_ROOTS.length;
  const c2 = TL_ROOTS.length * TL_SUFFIXES.length;
  const c3 = TL_ADJECTIVES.length * TL_ROOTS.length;

  // Spanish Colonial capacities
  const esHeads = getRomancePool(['prefix', 'settlement', 'geo_major']).length;
  const esTails = getRomancePool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract', 'adj_quality', 'adj_color']).length + PH_HEROES.length;

  const c4 = esHeads * esTails;
  const c5 = TL_ROOTS.length * TL_ROOTS.length; 
  return c1 + c2 + c3 + c4 + c5;
}

export const generateTagalogPlace = (): GeneratedResult => {
  let word = "";
  const type = Math.random();

  // ==========================================
  // Pattern 1: Native Prefix (Ma-, May-, Ka-)
  // e.g., Mabato (Stony), Maynila (Has Indigo), Kabite (Hook-place)
  // ==========================================
  if (type < 0.20) {
    const pre = getRandomElement(TL_PREFIXES);
    
    // Logic: Prefixes usually attach to Nature, Geo, or Objects. 
    // "Ma-" (Abundant) + "Gubat" (Forest) = Magubat.
    // They rarely attach to Settlements ("Ma-City" is weird).
    const validRootTypes = ['geo', 'nature', 'object', 'abstract'];
    const rootCandidates = getTagalogPool(validRootTypes);

    const root = getRandomElement(rootCandidates);
    let p = pre.val;
    let r = root.val;

    // Colonial spelling shift: Ka -> Ca (e.g. Cavite, Calamba)
    if (p === 'Ka' && Math.random() < 0.6) p = 'Ca';
    
    // 'May' typically remains separate unless fused historically
    if (p === 'May') {
       if (Math.random() < 0.6) word = `${p} ${r}`; // May Bunga
       else word = `${p}${r.toLowerCase()}`; // Maynila
    } else {
       word = p + r.toLowerCase();
    }
  } 
  
  // ==========================================
  // Pattern 2: Native Locative Suffix (-an, -in)
  // e.g., Batangas (Batang + as), Bulacan (Bulak + an)
  // ==========================================
  else if (type < 0.40) {
    // Suffixes work best on Nature (Bamboo-place), Objects (Salt-bed), or Geo.
    const root = getRandomElement(getTagalogPool(['nature', 'object', 'geo']));
    const suf = getRandomElement(TL_SUFFIXES);
    
    let r = root.val;
    let s = suf.val;
    
    // Tagalog Morphophonemics
    const lastChar = r.slice(-1).toLowerCase();
    
    // Vowel Ending -> -han / -hin
    if (['a','e','i','o','u'].includes(lastChar)) {
        if (!s.startsWith('h')) s = 'h' + s; // Bato -> Batuhan
        if (lastChar === 'o') r = r.slice(0, -1) + 'u'; // Bato -> Batuhan
    } 
    // Consonant 'd' -> 'r' (Bukid -> Bukiran)
    else if (lastChar === 'd') {
        r = r.slice(0, -1) + 'r';
        if (s.startsWith('h')) s = s.substring(1); 
    }
    // General Consonant -> -an / -in
    else {
        if (s.startsWith('h')) s = s.substring(1);
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

        if (Math.random() < 0.5) {
            saintTail = getRandomElement(PH_HEROES); // San Rizal (Fictionalized)
        } else {
            // Pick concepts (Peace, Cross) or Nature (Rose, Lily)
            const obj = getRandomElement(getRomancePool(['abstract', 'bio_flora', 'bio_fauna'])); 
            const data = getRomData(obj.es);
            saintTail = data.val;
            targetGender = data.gender || 'm';
        }

        let prefix = (targetGender === 'f') ? 'Santa' : 'San';
        // "Santo" logic for masculine words starting with Do/To/Ni
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

        if (Math.random() < 0.4) {
            // Noun + Adjective (Villa Nueva)
            const adjObj = getRandomElement(getRomancePool(['adj_quality', 'adj_color', 'adj_geo']));
            let adj = getRomData(adjObj.es).val;

            // Gender Agreement
            if (headGender === 'f') {
                if (adj.endsWith('o')) adj = adj.slice(0, -1) + 'a';
                if (adj === 'Santo') adj = 'Santa';
                if (adj === 'Buen') adj = 'Buena';
            }
            
            if (adjObj.tags?.includes('pre')) {
                if (adj === 'Grande') adj = 'Gran';
                if (adj === 'Santo') adj = 'San';
                word = `${adj} ${headVal}`;
            } else {
                word = `${headVal} ${adj}`;
            }
        } else {
            // Noun + de + Noun (Puerto de la Cruz, Valle del Rio)
            // Logic: Settlement of [Saint/Hero/Nature]
            const tailObj = getRandomElement(getRomancePool(['bio_flora', 'bio_fauna', 'abstract', 'geo_major', 'settlement']));
            const tailData = getRomData(tailObj.es);
            
            let connector = 'de';
            if (tailData.gender === 'f') connector = 'de la';
            else connector = 'del'; 

            word = `${headVal} ${connector} ${tailData.val}`;
        }
    }
  }
  
  // ==========================================
  // Pattern 4: Descriptive Native (Adj + Noun)
  // e.g., Bagong Silang, Luntian Bukid
  // ==========================================
  else if (type < 0.80) {
    // Logic: Match adjectives to appropriate roots.
    const root = getRandomElement(TL_ROOTS.filter(r => !r.es));
    
    // In a future update, we could filter TL_ADJECTIVES based on root.type here.
    // For now, we select a random adjective as most fit broadly (e.g. New/Old/Big/Red).
    const adj = getRandomElement(TL_ADJECTIVES);
    
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
    // Compound logic: Usually [Nature]+[Geo] or [Geo]+[Nature]
    // e.g. Batong Malake (Big Stone), Tubig Asin (Salt Water)
    
    const r1 = getRandomElement(getTagalogPool(['nature', 'geo', 'object']));
    const r2 = getRandomElement(getTagalogPool(['geo', 'nature']));

    if (r1.val === r2.val) {
        // Reduplication (Tawi-Tawi) - Valid for almost any short root
        if (Math.random() < 0.25 && r1.val.length <= 6) {
            word = `${r1.val}-${r1.val.toLowerCase()}`;
        }
        else return generateTagalogPlace(); 
    } else {
        let part1 = r1.val;
        let part2 = r2.val.toLowerCase();
        
        // Fused compounds should be short.
        const canFuse = part1.length <= 5 && part2.length <= 6 && Math.random() < 0.5;

        if (canFuse) {
            // Apply linker if fusing: Batangas (Batang + as)
            if (['a','e','i','o','u'].includes(part1.slice(-1))) {
                part1 += 'ng';
            } else if (part1.endsWith('n')) {
                part1 += 'g';
            }
            word = part1 + part2;
        } else {
            // Separate words: "Tubig Asin"
            word = `${part1} ${r2.val}`; // Keep Case for second word if separate
        }
    }
  }

  word = word.trim();
  word = word.charAt(0).toUpperCase() + word.slice(1);
  const ascii = normalizeSpanish(word);
  
  return { word: word, ascii: ascii };
}
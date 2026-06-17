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
  const set = new Set<string>();
  
  const getTagalogPool = (types: string[]): TagalogComponent[] => {
    return TL_ROOTS.filter(r => types.includes(r.type) && !r.es);
  };

  // Pattern 1: Native Prefix
  const rootCandidates1 = getTagalogPool(['geo', 'nature', 'object', 'abstract']);
  for (const pre of TL_PREFIXES) {
    for (const root of rootCandidates1) {
      let p = pre.val;
      let r = root.val;
      const prefixes = [p];
      if (p === 'Ka') prefixes.push('Ca');
      
      for (const pref of prefixes) {
        if (pref === 'May') {
          set.add((pref + " " + r).trim().toLowerCase());
          set.add((pref + r.toLowerCase()).trim().toLowerCase());
        } else {
          set.add((pref + r.toLowerCase()).trim().toLowerCase());
        }
      }
    }
  }

  // Pattern 2: Native Locative Suffix
  const rootCandidates2 = getTagalogPool(['nature', 'object', 'geo']);
  for (const root of rootCandidates2) {
    for (const suf of TL_SUFFIXES) {
      let r = root.val;
      let s = suf.val;
      const lastChar = r.slice(-1).toLowerCase();
      if (['a','e','i','o','u'].includes(lastChar)) {
        if (!s.startsWith('h')) s = 'h' + s;
        if (lastChar === 'o') r = r.slice(0, -1) + 'u';
      } else if (lastChar === 'd') {
        r = r.slice(0, -1) + 'r';
        if (s.startsWith('h')) s = s.substring(1);
      } else {
        if (s.startsWith('h')) s = s.substring(1);
      }
      set.add((r + s).trim().toLowerCase());
    }
  }

  // Pattern 3a: Saints
  const HEROES = [
    'Rizal', 'Bonifacio', 'Magsaysay', 'Quezon', 'Mabini',
    'Del Pilar', 'Aguinaldo', 'Luna', 'Recto', 'Burgos',
    'Lapu-Lapu', 'Silang', 'Jacinto', 'Aquino', 'Osmeña'
  ];
  for (const hero of HEROES) {
    let prefixes = ['San'];
    if (hero.startsWith('Do') || hero.startsWith('To') || hero.startsWith('Ni')) {
      prefixes.push('Santo');
    }
    for (const pref of prefixes) {
      set.add((pref + " " + hero).trim().toLowerCase());
    }
  }

  const saintPool = ROMANCE_DATA.filter(c => c.es && c.tags?.includes('saint_ok'));
  for (const target of saintPool) {
    const tData = getRomData(target.es);
    let prefixes = ['San'];
    if (tData.gender === 'f') {
      prefixes = ['Santa'];
    } else if (tData.val.startsWith('Do') || tData.val.startsWith('To') || tData.val.startsWith('Ni')) {
      prefixes.push('Santo');
    }
    for (const pref of prefixes) {
      set.add((pref + " " + tData.val).trim().toLowerCase());
    }
  }

  // Pattern 3b: Civic/Geo + Adjective/Noun
  const headPool3b = getRomancePool(['settlement', 'geo_major', 'geo_minor']);
  // Noun + Adjective
  const adjPool3b = getRomancePool(['adj_quality', 'adj_color', 'adj_geo']);
  for (const headObj of headPool3b) {
    const headData = getRomData(headObj.es);
    const headGender = headData.gender || 'm';
    for (const adjObj of adjPool3b) {
      let adj = getRomData(adjObj.es).val;
      if (headGender === 'f') {
        if (adj.endsWith('o')) adj = adj.slice(0, -1) + 'a';
        if (adj === 'Santo') adj = 'Santa';
        if (adj === 'Buen') adj = 'Buena';
      }
      
      if (adjObj.tags?.includes('pre')) {
        let preAdj = adj;
        if (preAdj === 'Grande') preAdj = 'Gran';
        if (preAdj === 'Santo') preAdj = 'San';
        set.add((preAdj + " " + headData.val).trim().toLowerCase());
      } else {
        set.add((headData.val + " " + adj).trim().toLowerCase());
      }
    }
  }
  // Noun + de + Noun
  const tailPool3b = getRomancePool(['bio_flora', 'bio_fauna', 'abstract', 'geo_major', 'settlement']);
  for (const headObj of headPool3b) {
    const headData = getRomData(headObj.es);
    for (const tailObj of tailPool3b) {
      const tailData = getRomData(tailObj.es);
      const useArticle = !tailObj.tags?.includes('no_saint');
      const connectors = ['de'];
      if (useArticle) {
        if (tailData.gender === 'f') connectors.push('de la');
        else connectors.push('del');
      }
      for (const conn of connectors) {
        set.add((headData.val + " " + conn + " " + tailData.val).trim().toLowerCase());
      }
    }
  }

  // Pattern 4: Descriptive Native
  const rootPool4 = TL_ROOTS.filter(r => !r.es);
  for (const root of rootPool4) {
    for (const adj of TL_ADJECTIVES) {
      let a = adj.val;
      let linker = " na ";
      if (['a','e','i','o','u'].includes(a.slice(-1))) {
        linker = "ng ";
      } else if (a.slice(-1) === 'n') {
        linker = "g ";
      }
      set.add((a + linker + root.val).trim().toLowerCase());
    }
  }

  // Pattern 5: Native Compounds
  const r1Pool5 = getTagalogPool(['nature', 'geo', 'object']);
  const r2Pool5 = getTagalogPool(['geo', 'nature']);
  for (const r1 of r1Pool5) {
    for (const r2 of r2Pool5) {
      if (r1.val === r2.val) {
        if (r1.val.length <= 6) {
          set.add((r1.val + "-" + r1.val.toLowerCase()).trim().toLowerCase());
        }
      } else {
        let part1 = r1.val;
        let part2 = r2.val.toLowerCase();
        
        // Option A: Fused
        if (part1.length <= 5 && part2.length <= 6) {
          let p1 = part1;
          if (['a','e','i','o','u'].includes(p1.slice(-1))) {
            p1 += 'ng';
          } else if (p1.endsWith('n')) {
            p1 += 'g';
          }
          set.add((p1 + part2).trim().toLowerCase());
        }
        // Option B: Separate
        set.add((part1 + " " + r2.val).trim().toLowerCase());
      }
    }
  }

  return set.size;
}

export const generateTagalogPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const type = Math.random();

  // ==========================================
  // Pattern 1: Native Prefix (Ma-, May-, Ka-)
  // e.g., Mabato (Stony), Maynila (Has Indigo), Kabite (Hook-place)
  // ==========================================
  if (type < 0.20) {
    rule = "Native Prefix";
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
    components.push(JSON.stringify(pre), JSON.stringify(root));
  } 
  
  // ==========================================
  // Pattern 2: Native Locative Suffix (-an, -in)
  // e.g., Batangas (Batang + as), Bulacan (Bulak + an)
  // ==========================================
  else if (type < 0.40) {
    rule = "Native Locative Suffix";
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
    components.push(JSON.stringify(root), JSON.stringify(suf));
  }
  
  // ==========================================
  // Pattern 3: Spanish Colonial (Specific Types)
  // e.g., San Pedro, Villa Real, Puerto Princesa
  // ==========================================
  else if (type < 0.60) {
    rule = "Spanish Colonial";
    // 3a. Saints (San/Santa + Name/Abstract/Bio)
    if (Math.random() < 0.3) {
        let saintTail = "";
        let targetGender = 'm';
        let tailObj: any;

        if (Math.random() < 0.5) {
            saintTail = getRandomElement(PH_HEROES); // San Rizal (Fictionalized)
            tailObj = saintTail;
        } else {
            // Pick concepts (Peace, Cross) or Nature (Rose, Lily)
            const saintPool = ROMANCE_DATA.filter(c => c.es && c.tags?.includes('saint_ok'));
            const obj = getRandomElement(saintPool); 
            const data = getRomData(obj.es);
            saintTail = data.val;
            targetGender = data.gender || 'm';
            tailObj = obj;
        }

        let prefix = (targetGender === 'f') ? 'Santa' : 'San';
        // "Santo" logic for masculine words starting with Do/To/Ni
        if (prefix === 'San' && (saintTail.startsWith('Do') || saintTail.startsWith('To') || saintTail.startsWith('Ni'))) {
            prefix = 'Santo';
        }
        word = `${prefix} ${saintTail}`;
        components.push(JSON.stringify(prefix), JSON.stringify(tailObj));
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
            components.push(JSON.stringify(headObj), JSON.stringify(adjObj));
        } else {
            // Noun + de + Noun (Puerto de la Cruz, Valle del Rio)
            // Logic: Settlement of [Saint/Hero/Nature]
            const tailObj = getRandomElement(getRomancePool(['bio_flora', 'bio_fauna', 'abstract', 'geo_major', 'settlement']));
            const tailData = getRomData(tailObj.es);
            
            let connector = 'de';
            const useArticle = !tailObj.tags?.includes('no_saint');
            if (useArticle) {
                if (tailData.gender === 'f') connector = 'de la';
                else connector = 'del'; 
            }

            word = `${headVal} ${connector} ${tailData.val}`;
            components.push(JSON.stringify(headObj), JSON.stringify(tailObj));
        }
    }
  }
  
  // ==========================================
  // Pattern 4: Descriptive Native (Adj + Noun)
  // e.g., Bagong Silang, Luntian Bukid
  // ==========================================
  else if (type < 0.80) {
    rule = "Descriptive Native";
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
    components.push(JSON.stringify(adj), JSON.stringify(root));
  }

  // ==========================================
  // Pattern 5: Native Compounds
  // e.g., Balintawak, Tagaytay (Reduplication)
  // ==========================================
  else {
    rule = "Native Compound";
    // Compound logic: Usually [Nature]+[Geo] or [Geo]+[Nature]
    // e.g. Batong Malake (Big Stone), Tubig Asin (Salt Water)
    
    const r1 = getRandomElement(getTagalogPool(['nature', 'geo', 'object']));
    const r2 = getRandomElement(getTagalogPool(['geo', 'nature']));

    if (r1.val === r2.val) {
        // Reduplication (Tawi-Tawi) - Valid for almost any short root
        if (Math.random() < 0.25 && r1.val.length <= 6) {
            word = `${r1.val}-${r1.val.toLowerCase()}`;
            components.push(JSON.stringify(r1), JSON.stringify(r1));
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
        components.push(JSON.stringify(r1), JSON.stringify(r2));
    }
  }

  word = word.trim();
  word = word.charAt(0).toUpperCase() + word.slice(1);
  const ascii = normalizeSpanish(word);
  
  return { word: word, ascii: ascii, generationRules: [rule], dictionaryComponents: components };
}
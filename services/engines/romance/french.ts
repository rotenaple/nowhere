import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateFrenchToAscii } from "../../utils";
import { ROMANCE_DATA, getRomData, RomanceEntry } from "../../dictionaries/romanceDict";

export const getFrenchCapacity = () => {
  const roots = ROMANCE_DATA.filter(c => c.fr && c.type === 'root');
  const suffixes = ROMANCE_DATA.filter(c => c.fr && c.type === 'suffix');
  const prefixes = ROMANCE_DATA.filter(c => c.fr && c.type === 'prefix');
  const adjectives = ROMANCE_DATA.filter(c => c.fr && c.type === 'adjective');

  const c1 = prefixes.length * roots.length;
  const c2 = roots.length * suffixes.length;
  const c3 = roots.length * adjectives.length;
  const c4 = roots.length * roots.length;
  
  return c1 + c2 + c3 + c4;
}

// Helper to extract French Adjective data specifically
// Returns { m: string, f: string }
export const getFrAdj = (entry: RomanceEntry | undefined): { m: string, f: string } => {
  if (!entry) return { m: '', f: '' };
  
  // 1. Handle Tuple [Masc, Fem] (Explicit Override)
  if (Array.isArray(entry) && entry.length === 2) {
      const second = entry[1];
      // If it looks like a gender tag, this is a Noun used as Adj. Fallback to 'e' rule on base.
      if (second === 'm' || second === 'f' || second === 'n') {
          const val = entry[0];
          return { m: val, f: val.endsWith('e') ? val : val + 'e' };
      }
      // Otherwise it's [Masc, Fem]
      return { m: entry[0], f: second };
  }
  
  // 2. Handle String (Smart Defaults)
  const val = typeof entry === 'string' ? entry : entry[0];
  let f = "";

  // Standard French Ending Rules
  if (val.endsWith('e')) {
      f = val; 
  } else if (val.endsWith('x')) {
      f = val.slice(0, -1) + 'se'; 
  } else if (val.endsWith('f')) {
      f = val.slice(0, -1) + 've'; 
  } else if (val.endsWith('er')) {
      f = val.slice(0, -2) + 'ère'; 
  } else {
      f = val + 'e'; 
  }

  return { m: val, f };
};

export const generateFrenchPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => ROMANCE_DATA.filter(c => c.fr && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // 1. Prefix + Hyphen + Root
  // e.g. Saint-Malo, La Rochelle, Les-Cochons
  if (type < 0.25) {
    const prefixObj = getRandomElement(getPool('prefix'));
    const rootObj = getRandomElement(roots);
    
    const rData = getRomData(rootObj.fr);
    let rootVal = rData.val;
    const gender = rData.gender || 'm';
    
    let p = "";

    // Resolve Prefix Gender
    const prefixEntry = prefixObj.fr;
    // Data-driven check for explicit gendered forms in tuple
    if (Array.isArray(prefixEntry) && prefixEntry.length === 2 && prefixEntry[1].length > 1) {
        p = (gender === 'f') ? prefixEntry[1] : prefixEntry[0];
    } 
    // Fallback for simple strings
    else {
        p = getRomData(prefixEntry).val;
        // Basic gender swaps if tuple missing (Optional fallback logic)
        if (gender === 'f') {
            if (p === 'Le') p = 'La';
            if (p === 'Saint') p = 'Sainte';
            if (p === 'Beau') p = 'Belle';
            if (p === 'Vieux') p = 'Vieille';
            if (p === 'Nouveau') p = 'Nouvelle';
        } else {
            if (p === 'La') p = 'Le';
            if (p === 'Sainte') p = 'Saint';
            if (p === 'Belle') p = 'Beau';
            if (p === 'Vieille') p = 'Vieux';
            if (p === 'Nouvelle') p = 'Nouveau';
        }
    }

    // FIX: Pluralize Root based on TAG, not string "Les"
    if (prefixObj.tags?.includes('plural')) {
        if (rootVal.endsWith('eau') || rootVal.endsWith('eu')) rootVal += 'x';
        else if (!['s', 'x', 'z'].includes(rootVal.slice(-1))) rootVal += 's';
    }
    
    // Elision Logic
    const firstChar = rootVal.charAt(0).toUpperCase();
    // Only elide singular articles (Le/La), never plural (Les -> Les-Arbres)
    if (['A','E','I','O','U','Y','É','È'].includes(firstChar) && ['Le', 'La'].includes(p)) {
         p = "L'";
         word = `${p}${rootVal}`;
    } 
    else {
         word = `${p}-${rootVal}`;
    }
  }
  
  // 2. Root + Suffix
  else if (type < 0.50) {
    const rootObj = getRandomElement(roots);
    const suffixObj = getRandomElement(getPool('suffix'));
    
    let base = getRomData(rootObj.fr).val.toLowerCase();
    const sVal = getRomData(suffixObj.fr).val;
    
    if (base.length > 4 && Math.random() < 0.5) base = base.slice(0, 4);

    if (['a','e','i','o','u','y'].includes(base.slice(-1)) && ['a','e','i','o','u','y'].includes(sVal.charAt(0))) {
        base = base.slice(0, -1);
    }
    
    word = base + sVal;
    word = word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  // 3. Root + Adjective
  else if (type < 0.75) {
      const rootObj = getRandomElement(roots);
      const adjObj = getRandomElement(getPool('adjective'));
      
      const rData = getRomData(rootObj.fr);
      let r = rData.val;
      const gender = rData.gender || 'm';
      
      // Data-Driven Adjective Agreement via Tuple or Smart Default
      const aData = getFrAdj(adjObj.fr);
      let a = (gender === 'f') ? aData.f : aData.m;
      
      // Position: Pre-nominal (BAGS) or Post-nominal
      if (adjObj.tags?.includes('pre')) {
          word = `${a}-${r}`;
      } else {
          word = `${r}-${a}`;
      }
  }
  
  // 4. Root + de + Root
  else {
    const headObj = getRandomElement(roots);
    const tailObj = getRandomElement(roots);
    
    let h = getRomData(headObj.fr).val;
    let t = getRomData(tailObj.fr).val;
    
    let link = "-de-";
    if (['A','E','I','O','U','Y','É','È'].includes(t.charAt(0).toUpperCase())) {
        link = "-d'";
    }
    
    word = h + link + t;
  }

  return { word: word, ascii: transliterateFrenchToAscii(word) };
};
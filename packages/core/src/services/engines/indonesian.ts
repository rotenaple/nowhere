
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { AUSTRONESIAN_DATA } from "../dictionaries/austronesianDict";

export const getIndonesianCapacity = (variant: 'id' | 'ms' | 'jv') => {
  // Filter pool based on variant to get accurate counts
  const getPool = (t: string) => AUSTRONESIAN_DATA.filter(c => {
    if (c.type !== t) return false;
    if (variant === 'jv') {
        return c.lang === 'jv' || c.lang === 'id' || c.lang === undefined;
    }
    // For MS/ID, exclude items specifically marked for the other
    // e.g. if variant is 'ms', exclude 'id' and 'jv'.
    if (variant === 'ms' && (c.lang === 'id' || c.lang === 'jv')) return false;
    if (variant === 'id' && (c.lang === 'ms' || c.lang === 'jv')) return false;
    
    return true;
  });

  const prefixes = getPool('prefix');
  const roots = getPool('root');
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  
  // Standard ID/MS patterns
  const c1 = prefixes.length * roots.length;
  const c2 = prefixes.length * roots.length * adjectives.length;
  const c3 = roots.length * suffixes.length;
  
  // Javanese compounding (Root + Root) increases capacity significantly
  const c4 = variant === 'jv' ? roots.length * roots.length : 0;

  return c1 + c2 + c3 + c4;
}

// Helper: In Javanese toponyms, 'a' often becomes 'o' (e.g. Sura -> Suro, Karta -> Kerto)
const javanize = (str: string): string => {
  if (str.endsWith('a')) return str.slice(0, -1) + 'o';
  return str;
}

export const generateIndonesianPlace = (variant: 'id' | 'ms' | 'jv'): GeneratedResult => {
  let word = "";

  // Helper to filter by language preference
  const getPool = (t: string) => AUSTRONESIAN_DATA.filter(c => {
    if (c.type !== t) return false;
    if (variant === 'jv') {
        // Javanese can use 'jv', 'id', or shared.
        return c.lang === 'jv' || c.lang === 'id' || c.lang === undefined;
    }
    // Strict filtering for id/ms
    if (variant === 'ms' && (c.lang === 'id' || c.lang === 'jv')) return false;
    if (variant === 'id' && (c.lang === 'ms' || c.lang === 'jv')) return false;
    
    return true;
  });

  const roots = getPool('root');
  const prefixes = getPool('prefix');
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');

  // === PLACE MODE: JAVANESE VARIANT ===
  if (variant === 'jv') {
      const type = Math.random();
      
      // Pattern JV-1: [Sanskrit/Jav Root] + [Sanskrit/Jav Root] (Compound)
      if (type < 0.5) {
          const jvRoots = AUSTRONESIAN_DATA.filter(c => c.lang === 'jv' && (c.type === 'root' || c.type === 'suffix'));
          
          const r1 = getRandomElement(jvRoots.length > 0 ? jvRoots : roots);
          const r2 = getRandomElement(jvRoots.length > 0 ? jvRoots : roots);
          
          if (r1.val === r2.val) return generateIndonesianPlace(variant);
          
          // Apply javanize to ensure correct vowel harmony (e.g. Sura -> Suro)
          word = javanize(r1.val) + javanize(r2.val.toLowerCase());
          
      } 
      // Pattern JV-2: [Geographic Prefix] + [Root/Adj]
      else if (type < 0.8) {
          const pre = getRandomElement(prefixes).val; 
          const tail = getRandomElement([...roots, ...adjectives]);
          let tailStr = tail.val;
          
          // Apply javanize to tail if it's generic
          if (tail.lang !== 'jv') {
             tailStr = javanize(tailStr);
          }
          
          if (['Karang', 'Wono', 'Kuto', 'Suko'].includes(pre)) {
              word = pre + tailStr.toLowerCase();
          } else {
              word = `${pre} ${tailStr}`;
          }
      }
      // Pattern JV-3: Root + Suffix
      else {
          const r = getRandomElement(roots).val;
          const s = getRandomElement(suffixes).val;
          let stem = javanize(r);
          word = stem + s;
      }
      
      word = word.charAt(0).toUpperCase() + word.slice(1);
      return { word, ascii: word };
  }

  // === PLACE MODE: STANDARD ID/MS ===
  const type = Math.random();

  // Pattern 1: Geographic Prefix + Root
  if (type < 0.40) {
    const pre = getRandomElement(prefixes).val;
    const root = getRandomElement(roots).val;
    word = `${pre} ${root}`;
  }
  // Pattern 2: Geographic Prefix + Root + Adjective
  else if (type < 0.65) {
    const pre = getRandomElement(prefixes).val;
    const root = getRandomElement(roots).val;
    const adj = getRandomElement(adjectives).val;
    word = `${pre} ${root} ${adj}`;
  }
  // Pattern 3: Compound / Suffix
  else if (type < 0.85) {
    const validSuffixes = variant === 'ms' 
        ? suffixes.filter(s => ['jaya', 'pura', 'perdana', 'utamay'].includes(s.val) || Math.random() < 0.1)
        : suffixes;
    
    if (validSuffixes.length > 0) {
        const suf = getRandomElement(validSuffixes).val;
        const sanskritRoots = ['Suka', 'Jaya', 'Maha', 'Tri', 'Panca', 'Adi', 'Wana', 'Giri', 'Tirta', 'Batu', 'Kali'];
        let stem = Math.random() < 0.5 ? getRandomElement(sanskritRoots) : getRandomElement(roots).val;
        
        // Javanization for Indonesian compounds (Sanskrit influence)
        // e.g. Wana -> Wono, Suka -> Suko, Jaya -> Joyo
        if (variant === 'id') {
            if (stem === 'Wana') stem = 'Wono';
            else if (stem === 'Suka') stem = 'Suko';
            else if (stem === 'Jaya') stem = 'Joyo';
            else if (Math.random() < 0.3) stem = javanize(stem); // Occasional shift for flavor
        }
        
        word = stem + suf;
    } else {
        const pre = getRandomElement(prefixes).val;
        const root = getRandomElement(roots).val;
        word = `${pre} ${root}`;
    }
  }
  // Pattern 4: Root + Adjective
  else {
    const root = getRandomElement(roots).val;
    const adj = getRandomElement(adjectives).val;
    word = `${root} ${adj}`;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: word };
};
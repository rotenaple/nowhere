import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateDanishToAscii } from "../../utils";
import { GERMANIC_DATA } from "../../dictionaries/germanicDict";

const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");

export const getDanishCapacity = () => {
  const roots = GERMANIC_DATA.filter(c => c.da && c.type === 'root');
  const suffixes = GERMANIC_DATA.filter(c => c.da && c.type === 'suffix');
  const prefixes = GERMANIC_DATA.filter(c => c.da && (c.type === 'adjective' || c.type === 'noun_prefix'));

  const c1 = prefixes.length * roots.length;
  const c2 = roots.length * suffixes.length;
  const c3 = roots.length * roots.length;
  return c1 + c2 + c3;
}

export const generateDanishPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.da && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // 1. Prefix + Root
  if (type < 0.35) {
    // FIX: Combine both new types into one pool
    const prePool = [...getPool('adjective'), ...getPool('noun_prefix')];
    const pre = getRandomElement(prePool);
    const root = getRandomElement(roots);
    
    let p = getVal(pre.da);
    let r = getVal(root.da);
    
    // Adjective Inflection Logic
    if (pre.type === 'adjective') {
        // Stor -> Store, Lil -> Lille usually for definite forms
        if (p === 'Stor') p = 'Store';
        if (p === 'Lille') p = 'Lille'; 
        if (p === 'Ny') p = 'Ny'; 
        if (p === 'Gammel') p = 'Gammel'; 

        // Often compound, sometimes separate
        if (['Store', 'Lille', 'Gammel'].includes(p) && Math.random() < 0.5) {
            word = `${p} ${r}`; // Store Heddinge
        } else {
            word = p + r.toLowerCase(); // Nyborg
        }
    } else {
        // Noun Prefixes (Saint, King) usually compound directly
        word = p + r.toLowerCase();
    }
  }
  // 2. Root + Suffix
  else if (type < 0.75) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    let r = getVal(root.da);
    let s = getVal(suf.da);
    
    if (r.toLowerCase() === s.toLowerCase()) return generateDanishPlace();
    if (s.includes(r.toLowerCase())) return generateDanishPlace();

    let glue = "";
    if (['rup', 'drup', 'strup', 'bøl', 'lev', 'sted'].includes(s)) {
        if (!['s','r','l','n'].includes(r.slice(-1)) && Math.random() < 0.3) glue = "s";
    }
    if (['e','å','ø'].includes(r.slice(-1)) && ['e','ø','å'].includes(s.charAt(0))) {
        r = r.slice(0, -1);
    }

    word = r + glue + s;
  }
  // 3. Root + Root
  else {
    const r1 = getRandomElement(roots);
    const r2 = getRandomElement(roots);
    
    const v1 = getVal(r1.da);
    const v2 = getVal(r2.da);

    if (v1 === v2) return generateDanishPlace();
    
    let glue = "";
    if (Math.random() < 0.3 && !v1.endsWith('s')) glue = "s";
    if (Math.random() < 0.1) glue = "e";

    word = v1 + glue + v2.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateDanishToAscii(word) };
}
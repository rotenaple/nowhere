
import { GeneratedResult } from "../../types";
import { getRandomElement, transliterateDanishToAscii } from "../utils";
import { GERMANIC_DATA } from "../dictionaries/germanicDict";

export const getDanishCapacity = () => {
  const roots = GERMANIC_DATA.filter(c => c.da && c.type === 'root');
  const suffixes = GERMANIC_DATA.filter(c => c.da && c.type === 'suffix');
  const prefixes = GERMANIC_DATA.filter(c => c.da && c.type === 'prefix');

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

  // 1. Prefix + Root (e.g. Nørrebro, Store Heddinge style)
  if (type < 0.35) {
    const pre = getRandomElement(getPool('prefix'));
    const root = getRandomElement(roots);
    
    let p = pre.da!;
    let r = root.da!;
    
    // Inflect prefix? Nørre, Sønder, Vester, Øster are standard.
    // Stor -> Store, Lil -> Lille usually.
    if (p === 'Stor') p = 'Store';
    if (p === 'Lille') p = 'Lille'; // already lille
    if (p === 'Ny') p = 'Ny'; // Nyborg
    if (p === 'Gammel') p = 'Gammel'; // Gammel Strand

    // Often compound, sometimes separate
    if (['Store', 'Lille', 'Gammel'].includes(p) && Math.random() < 0.5) {
        word = `${p} ${r}`; // Store Heddinge
    } else {
        word = p + r.toLowerCase(); // Nyborg
    }
  }
  // 2. Root + Suffix (e.g. Silkeborg, Hillerød)
  else if (type < 0.75) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    let r = root.da!;
    let s = suf.da!;
    
    // dedup
    if (r.toLowerCase() === s.toLowerCase()) return generateDanishPlace();
    // don't append -borg to Borg
    if (s.includes(r.toLowerCase())) return generateDanishPlace();

    // Connector?
    // Often 's' or 'e' or nothing.
    let glue = "";
    if (['rup', 'drup', 'strup', 'bøl', 'lev', 'sted'].includes(s)) {
        // usually attaches directly or with s
        if (!['s','r','l','n'].includes(r.slice(-1)) && Math.random() < 0.3) glue = "s";
    }
    // Vowel collision
    if (['e','å','ø'].includes(r.slice(-1)) && ['e','ø','å'].includes(s.charAt(0))) {
        r = r.slice(0, -1);
    }

    word = r + glue + s;
  }
  // 3. Root + Root (Compound) e.g. København (Merchant's Harbor -> Kjøbmandehavn -> København)
  else {
    const r1 = getRandomElement(roots);
    const r2 = getRandomElement(roots);
    
    if (r1.da === r2.da) return generateDanishPlace();
    
    let glue = "";
    if (Math.random() < 0.3 && !r1.da!.endsWith('s')) glue = "s";
    // sometimes 'e'
    if (Math.random() < 0.1) glue = "e";

    word = r1.da + glue + r2.da!.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateDanishToAscii(word) };
}

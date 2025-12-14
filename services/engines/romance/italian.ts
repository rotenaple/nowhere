
import { GeneratedResult } from "../../../types";
import { getRandomElement } from "../../utils";
import { ROMANCE_DATA } from "../../dictionaries/romanceDict";

export const getItalianCapacity = () => {
  const roots = ROMANCE_DATA.filter(c => c.it && c.type === 'root');
  const suffixes = ROMANCE_DATA.filter(c => c.it && c.type === 'suffix');
  const prefixes = ROMANCE_DATA.filter(c => c.it && c.type === 'prefix');

  // 1. Prefix + Root
  const c1 = prefixes.length * roots.length;
  // 2. Root + Suffix
  const c2 = roots.length * suffixes.length;
  // 3. Di Construction
  const c3 = roots.length * roots.length;
  return c1 + c2 + c3;
}

export const generateItalianPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => ROMANCE_DATA.filter(c => c.it && c.type === t);
  const roots = getPool('root');

  const type = Math.random();
  // 1. Prefix + Root (e.g. Monte Carlo, San Marino)
  if (type < 0.40) {
    const prefix = getRandomElement(getPool('prefix'));
    const root = getRandomElement([...roots, ...getPool('adjective')]);
    
    let p = prefix.it!;
    let r = root.it!;
    
    // Gender/Number agreement simplification
    if (['Villa', 'Rocca', 'Isola', 'Corte', 'Santa'].includes(p)) {
        if (r.endsWith('o')) r = r.slice(0, -1) + 'a';
        else if (r === 'Santo') r = 'Santa';
        else if (r === 'Nuovo') r = 'Nuova';
        else if (r === 'Vecchio') r = 'Vecchia';
    }
    
    if (p.length <= 3 || Math.random() < 0.3) {
        word = `${p} ${r}`; // San Remo
    } else {
        word = p + r.toLowerCase(); // Villafranca
    }
  }
  // 2. Root + Suffix (e.g. Milano, Firenze - simulated via suffixes)
  else if (type < 0.75) {
    let root = getRandomElement(roots);
    const suffix = getRandomElement(getPool('suffix'));
    
    let base = root.it!;
    if (['a','e','i','o'].includes(base.slice(-1))) {
      base = base.slice(0, -1);
    }
    word = base + suffix.it;
  }
  // 3. "Di" Construction (e.g. Ponte di Legno)
  else {
    const head = getRandomElement(roots);
    const tail = getRandomElement(roots);
    let h = head.it!;
    let t = tail.it!;
    
    word = `${h} di ${t}`;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  const ascii = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/'/g, "");
  return { word, ascii };
};

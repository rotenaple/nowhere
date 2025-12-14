import { GeneratedResult } from "../../types";
import { getRandomElement, transliterateSwedishToAscii } from "../utils";
import { GERMANIC_DATA } from "../dictionaries/germanicDict";

export const getSwedishCapacity = () => {
  const roots = GERMANIC_DATA.filter(c => c.sv && c.type === 'root');
  const suffixes = GERMANIC_DATA.filter(c => c.sv && c.type === 'suffix');
  const prefixes = GERMANIC_DATA.filter(c => c.sv && c.type === 'prefix');

  // 1. Prefix + Suffix
  const c1 = prefixes.length * suffixes.length;
  // 2. Root + Suffix
  const c2 = roots.length * suffixes.length;
  // 3. Root + Root
  const c3 = roots.length * roots.length;
  return c1 + c2 + c3;
}

export const generateSwedishPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.sv && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // Pattern 1: Prefix + Suffix (e.g., Storvik)
  if (type < 0.30) {
    const pre = getRandomElement(getPool('prefix'));
    const suf = getRandomElement(getPool('suffix'));
    
    if (pre.sv!.toLowerCase() === suf.sv!.toLowerCase()) return generateSwedishPlace();
    
    let p = pre.sv!;
    
    word = p + suf.sv!.toLowerCase();
  }
  
  // Pattern 2: Root + Suffix (e.g., Stockholm, Jönköping)
  else if (type < 0.70) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    let r = root.sv!;
    let s = suf.sv!;
    
    if (r.toLowerCase() === s.toLowerCase()) return generateSwedishPlace();
    
    let connector = "";
    // Genitive 's': Skogsby (Forest Village) -> Skog + s + by.
    if (['by', 'torp', 'holm', 'berg'].includes(s.toLowerCase()) && !r.endsWith('s')) {
       if (Math.random() < 0.3) connector = 's'; 
    }
    
    word = r + connector + s.toLowerCase();
  }
  
  // Pattern 3: Adjective + Root (e.g. Stora Höga vs Nybro)
  else if (type < 0.85) {
      const pre = getRandomElement(getPool('prefix'));
      const root = getRandomElement(roots);
      
      let p = pre.sv!;
      
      // Inflect for definite article (Separate words = Both Capitalized)
      if (['Stor', 'Lill', 'Ny', 'Gammal', 'Hög', 'Låg', 'Röd', 'Svart', 'Vit'].includes(p)) {
          if (p === 'Lill') p = 'Lilla';
          else if (p === 'Gammal') p = 'Gamla';
          else p += 'a';
          
          // "Stora Höga" -> Keep root Capitalized because it's a separate word
          word = `${p} ${root.sv}`;
      } else {
          // "Nybro" -> Fused word, so lowercase the root
          word = p + root.sv!.toLowerCase();
      }
  }
  
  // Pattern 4: Root + Root (Compound)
  else {
    const root1 = getRandomElement(roots);
    const root2 = getRandomElement(roots);
    if (root1 === root2) return generateSwedishPlace();
    
    let connector = "";
    if (Math.random() < 0.25 && !['s', 'x'].includes(root1.sv!.slice(-1))) connector = "s";
    
    word = root1.sv + connector + root2.sv!.toLowerCase();
  }

  // Ensure first letter is Cap (just in case)
  word = word.charAt(0).toUpperCase() + word.slice(1);
  
  return { word: word, ascii: transliterateSwedishToAscii(word) };
};
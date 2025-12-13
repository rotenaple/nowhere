
import { GeneratedResult } from "../../types";
import { getRandomElement, transliterateFrenchToAscii } from "../utils";
import { ROMANCE_DATA } from "../dictionaries/romanceDict";

export const getFrenchCapacity = () => {
  const roots = ROMANCE_DATA.filter(c => c.fr && c.type === 'root');
  const suffixes = ROMANCE_DATA.filter(c => c.fr && c.type === 'suffix');
  const prefixes = ROMANCE_DATA.filter(c => c.fr && c.type === 'prefix');
  const adjectives = ROMANCE_DATA.filter(c => c.fr && c.type === 'adjective');

  // 1. Prefix + Root
  const c1 = prefixes.length * roots.length;
  // 2. Root + Suffix
  const c2 = roots.length * suffixes.length;
  // 3. Root + Adjective (e.g. Châteauneuf, Grand-Fougeray)
  const c3 = roots.length * adjectives.length;
  // 4. Root + de + Root (e.g. Pont-de-Vaux)
  const c4 = roots.length * roots.length;
  
  return c1 + c2 + c3 + c4;
}

export const generateFrenchPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => ROMANCE_DATA.filter(c => c.fr && c.type === t);
  const roots = getPool('root');

  const type = Math.random();
  // 1. Prefix + Hyphen + Root (e.g. Saint-Malo, Le Havre)
  if (type < 0.25) {
    const prefix = getRandomElement(getPool('prefix'));
    const root = getRandomElement(roots);
    
    let p = prefix.fr!;
    let r = root.fr!;
    
    // Gender check for Saint/Sainte, Le/La
    if (root.gender === 'f') {
        if (p === 'Saint') p = 'Sainte';
        if (p === 'Le') p = 'La';
        if (p === 'Beau') p = 'Belle';
        if (p === 'Vieux') p = 'Vieille';
        if (p === 'Nouveau') p = 'Nouvelle';
    }
    
    // Elision
    if (['A','E','I','O','U','Y','É','È'].includes(r.charAt(0).toUpperCase()) && (p === 'Le' || p === 'La' || p === 'Sainte')) {
        if (p === 'Sainte') {
           // Sainte does not elide as commonly as Le/La in modern spelling but keeps hyphen e.g. Sainte-Adresse
        } else {
           p = "L'";
           word = `${p}${r}`;
        }
    } 
    
    if (!word) {
       word = `${p}-${r}`;
    }
  }
  // 2. Root + Suffix (e.g. Montpellier, Bordeaux - simulated)
  else if (type < 0.50) {
    const root = getRandomElement(roots);
    const suffix = getRandomElement(getPool('suffix'));
    
    let base = root.fr!.toLowerCase();
    // Truncate logic
    if (base.length > 4 && Math.random() < 0.5) base = base.slice(0, 4);
    
    if (['a','e','i','o','u','y'].includes(base.slice(-1)) && ['a','e','i','o','u','y'].includes(suffix.fr!.charAt(0))) {
        base = base.slice(0, -1);
    }
    
    word = base + suffix.fr;
    word = word.charAt(0).toUpperCase() + word.slice(1);
  }
  // 3. Root + Adjective (e.g. Châteauneuf, Maison-Rouge)
  else if (type < 0.75) {
      const root = getRandomElement(roots);
      const adj = getRandomElement(getPool('adjective'));
      
      let r = root.fr!;
      let a = adj.fr!;
      
      let gender = root.gender || 'm';
      
      // Adjective agreement
      if (gender === 'f') {
          if (a.endsWith('f')) a = a.slice(0, -1) + 've';
          else if (a.endsWith('x')) a = a.slice(0, -1) + 'se';
          else if (!a.endsWith('e')) a += 'e';
          
          if (a.startsWith('Beau')) a = 'Belle';
          if (a.startsWith('Vieux')) a = 'Vieille';
          if (a.startsWith('Nouveau')) a = 'Nouvelle';
      }
      
      // Post-nominal adjective is standard in French place names often with hyphen
      word = `${r}-${a}`;
  }
  // 4. Root + de + Root (e.g. Pont-de-Vaux, Fort-de-France)
  else {
    const head = getRandomElement(roots);
    const tail = getRandomElement(roots);
    
    let h = head.fr!;
    let t = tail.fr!;
    
    let link = "-de-";
    // Elision
    if (['A','E','I','O','U','Y','É','È'].includes(t.charAt(0).toUpperCase())) {
        link = "-d'";
    }
    
    word = h + link + t;
  }

  return { word: word, ascii: transliterateFrenchToAscii(word) };
};

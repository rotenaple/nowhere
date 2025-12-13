
import { GeneratedResult } from "../../types";
import { getRandomElement, transliterateDutchToAscii } from "../utils";
import { GERMANIC_DATA } from "../dictionaries/germanicDict";

export const getDutchCapacity = () => {
  const roots = GERMANIC_DATA.filter(c => c.nl && c.type === 'root');
  const suffixes = GERMANIC_DATA.filter(c => c.nl && c.type === 'suffix');
  const prefixes = GERMANIC_DATA.filter(c => c.nl && c.type === 'prefix');

  // 1. Prefix + Suffix
  const c1 = prefixes.length * suffixes.length;
  // 2. Root + Suffix
  const c2 = roots.length * suffixes.length;
  // 3. Root + Root
  const c3 = roots.length * roots.length;
  return c1 + c2 + c3;
}

export const generateDutchPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.nl && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // 1. Prefix + Root/Suffix (e.g. Nieuwegein, Oude Pekela, Groot-Ammers)
  if (type < 0.35) {
    const pre = getRandomElement(getPool('prefix'));
    const root = getRandomElement(roots);
    
    let p = pre.nl!;
    let r = root.nl!;
    
    // Adjective inflection
    if (['Nieuw', 'Oud', 'Groot', 'Klein', 'Hoog', 'Laag'].includes(p)) {
        // e.g. Nieuw-Vennep vs Nieuwe Pekela
        if (Math.random() < 0.5) {
            // Inflected separate
            let inflected = p + 'e'; // Nieuwe
            word = `${inflected} ${r}`;
        } else {
            // Compound or Hyphenated
            if (p.length > 4) word = `${p}-${r}`;
            else word = p + r.toLowerCase();
        }
    } else {
        word = p + r.toLowerCase();
    }
  }
  // 2. Root + Suffix (e.g. Amsterdam, Rotterdam, Eindhoven, Apeldoorn (doorn=thorn/tree))
  else if (type < 0.70) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    let r = root.nl!;
    let s = suf.nl!;
    
    if (r.toLowerCase().includes(s.toLowerCase())) return generateDutchPlace();
    
    let connector = "";
    // 's-Gravenhage style genitive? Rare.
    // Standard connector 's' or 'en'
    if (['veen', 'berg', 'dam', 'dijk', 'woud'].includes(s)) {
        if (!['s', 'n'].includes(r.slice(-1)) && Math.random() < 0.2) connector = "s";
    }
    // Vowel collision
    if (['a','e','o','u'].includes(r.slice(-1)) && ['a','e','o','u'].includes(s.charAt(0))) {
        // usually merge or drop
    }

    word = r + connector + s;
  }
  // 3. 's- [Genitive Root] (e.g. 's-Hertogenbosch)
  // Replaced random noun generation with valid genitive stems to prevent illegal morphology like 's-Brugenvoort
  else if (type < 0.75) {
      const genitives = ['Heeren', 'Graven', 'Hertogen', 'Papen', 'Vrouwen', 'Princen', 'Konings', 'Monniken'];
      const root = getRandomElement(genitives);
      const suf = getRandomElement(getPool('suffix'));
      word = `'s-${root}${suf.nl}`;
  }
  // 4. Root + Root (Compound)
  else {
    const root1 = getRandomElement(roots);
    const root2 = getRandomElement(roots);
    if (root1.nl === root2.nl) return generateDutchPlace();
    
    let glue = "";
    if (Math.random() < 0.3 && !root1.nl!.endsWith('s')) glue = "s";
    
    word = root1.nl + glue + root2.nl!.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateDutchToAscii(word) };
}

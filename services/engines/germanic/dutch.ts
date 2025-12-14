import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateDutchToAscii } from "../../utils";
import { GERMANIC_DATA } from "../../dictionaries/germanicDict";

const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");
const getData = (entry: any) => {
  if (!entry) return { val: "", gender: undefined };
  return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
};

export const getDutchCapacity = () => {
  const roots = GERMANIC_DATA.filter(c => c.nl && c.type === 'root');
  const suffixes = GERMANIC_DATA.filter(c => c.nl && c.type === 'suffix');
  const prefixes = GERMANIC_DATA.filter(c => c.nl && (c.type === 'adjective' || c.type === 'noun_prefix'));

  const c1 = prefixes.length * suffixes.length;
  const c2 = roots.length * suffixes.length;
  const c3 = roots.length * roots.length;
  return c1 + c2 + c3;
}

export const generateDutchPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.nl && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // 1. Prefix + Root/Suffix
  if (type < 0.35) {
    // FIX: Combine pools
    const prePool = [...getPool('adjective'), ...getPool('noun_prefix')];
    const pre = getRandomElement(prePool);
    const root = getRandomElement(roots);
    
    let p = getVal(pre.nl);
    let rData = getData(root.nl);
    let r = rData.val;
    
    // Adjective inflection logic
    if (pre.type === 'adjective' && ['Nieuw', 'Oud', 'Groot', 'Klein', 'Hoog', 'Laag'].includes(pre.def)) {
        // If Neuter, 50% chance to keep it uninflected (Groot-Ammers)
        if (rData.gender === 'n' && Math.random() < 0.5) {
             word = `${p}-${r}`; 
        } else {
             // Otherwise inflect with -e (Grote, Nieuwe)
             // Handle spelling rules
             if (p.endsWith('oot')) p = p.replace('oot', 'ote');
             else if (p.endsWith('ood')) p = p.replace('ood', 'ode'); 
             else p += 'e';
             
             word = `${p} ${r}`; 
        }
    } else {
        word = p + r.toLowerCase();
    }
  }
  // 2. Root + Suffix
  else if (type < 0.70) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    let r = getVal(root.nl);
    let s = getVal(suf.nl);
    
    if (r.toLowerCase().includes(s.toLowerCase())) return generateDutchPlace();
    
    let connector = "";
    if (['veen', 'berg', 'dam', 'dijk', 'woud'].includes(s)) {
        if (!['s', 'n'].includes(r.slice(-1)) && Math.random() < 0.2) connector = "s";
    }

    word = r + connector + s;
  }
  // 3. 's- [Genitive Root]
  else if (type < 0.75) {
      const genitives = ['Heeren', 'Graven', 'Hertogen', 'Papen', 'Vrouwen', 'Princen', 'Konings', 'Monniken'];
      const root = getRandomElement(genitives);
      const suf = getRandomElement(getPool('suffix'));
      word = `'s-${root}${getVal(suf.nl)}`;
  }
  // 4. Root + Root
  else {
    const root1 = getRandomElement(roots);
    const root2 = getRandomElement(roots);
    
    const v1 = getVal(root1.nl);
    const v2 = getVal(root2.nl);

    if (v1 === v2) return generateDutchPlace();
    
    let glue = "";
    if (Math.random() < 0.3 && !v1.endsWith('s')) glue = "s";
    
    word = v1 + glue + v2.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateDutchToAscii(word) };
}
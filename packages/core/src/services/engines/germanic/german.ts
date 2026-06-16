import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateGermanToAscii } from "../../utils";
import { GERMANIC_DATA } from "../../dictionaries/germanicDict";

const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");

export const getGermanCapacity = () => {
  const roots = GERMANIC_DATA.filter(c => c.de && c.type === 'root');
  const suffixes = GERMANIC_DATA.filter(c => c.de && c.type === 'suffix');
  const connectors = GERMANIC_DATA.filter(c => c.de && c.type === 'connector');
  
  // Combine adjectives and noun_prefixes
  const prefixes = GERMANIC_DATA.filter(c => c.de && (c.type === 'adjective' || c.type === 'noun_prefix'));

  // 1. Prefix/Adj + Suffix/Root
  const c1 = prefixes.length * (suffixes.length + roots.length);
  // 2. Root + Suffix
  const c2 = roots.length * suffixes.length * (connectors.length + 1);
  // 3. Root + Root
  const c3 = roots.length * roots.length;
  return c1 + c2 + c3;
}

const getData = (entry: any) => {
  if (!entry) return { val: "", gender: undefined };
  return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
};

export const generateGermanPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.de && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // Pattern 1: Adjective/Prefix + Root/Suffix
  if (type < 0.35) {
    // Merge pools: 'adjective' and 'noun_prefix'
    const prePool = [...getPool('adjective'), ...getPool('noun_prefix')];
    const pre = getRandomElement(prePool);
    
    // Decide attachment: Root (Neuburg) or Suffix (Neuhausen)
    const attachToRoot = Math.random() < 0.6;
    const secondPart = attachToRoot ? getRandomElement(roots) : getRandomElement(getPool('suffix'));
    
    const rData = getData(secondPart.de);
    let adj = getVal(pre.de);
    let noun = rData.val;

    // LOGIC: Only inflect if type is explicitly 'adjective'
    if (pre.type === 'adjective') {
        
        // 1. Handle Irregularities via Tags
        if (pre.tags?.includes('irreg_h') && adj === 'Hoch') {
            adj = 'Hohen';
        }
        
        // 2. Handle Weak Inflection via Tags or Standard Rules
        // (Use tags for words that commonly fossilize as -en like 'Alt', 'Neu')
        else if (pre.tags?.includes('weak_en') && Math.random() < 0.5) {
             if (adj.endsWith('ß')) adj = adj + 'en'; // Groß -> Großen
             else adj += 'en'; 
        }
    }

    // Capitalize noun if it was a generic root, lowercase if it was a pure suffix or inside compound
    if (attachToRoot) {
        word = adj + noun.toLowerCase(); 
    } else {
        word = adj + noun;
    }
  }
  
  // Pattern 2: Compound Noun + Connector + Suffix
  else if (type < 0.75) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    const rData = getData(root.de);
    const rVal = rData.val;
    const sVal = getVal(suf.de);

    if (rVal.toLowerCase() === sVal.toLowerCase()) return generateGermanPlace();
    
    let connector = "";
    
    // Check if suffix forbids connectors (e.g. -ing)
    if (!suf.tags?.includes('no_conn')) {
        // Gender Logic
        if (rData.gender === 'f') {
            if (rVal.endsWith('e')) connector = 'n';
            else if (rVal.endsWith('ung') || rVal.endsWith('heit')) connector = 's';
        }
        else {
            if (!['s', 'z', 'x', 'ß'].includes(rVal.slice(-1))) {
                if (Math.random() < 0.6) connector = 's';
            }
        }
    }
    
    // Prevent double-s visual glitch
    if (connector === 's' && sVal.toLowerCase().startsWith('s')) {
        connector = "";
    }

    word = rVal + connector + sVal;
  }
  
  // Pattern 3: Root + Root
  else {
    const root1 = getRandomElement(roots);
    const root2 = getRandomElement(roots);
    const d1 = getData(root1.de);
    const d2 = getData(root2.de);

    if (d1.val === d2.val) return generateGermanPlace();

    let glue = "";
    
    // Only glue if second root doesn't forbid it (rare, but good practice)
    if (!root2.tags?.includes('no_conn')) {
        if (d1.gender === 'f') {
             if (d1.val.endsWith('e')) glue = 'n';
        } else {
             if (!['s', 'z', 'x', 'ß'].includes(d1.val.slice(-1)) && Math.random() < 0.4) glue = "s";
        }
    }
    
    if (glue === 's' && d2.val.toLowerCase().startsWith('s')) glue = "";

    word = d1.val + glue + d2.val.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateGermanToAscii(word) };
};
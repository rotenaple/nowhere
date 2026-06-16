import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateSwedishToAscii } from "../../utils";
import { GERMANIC_DATA } from "../../dictionaries/germanicDict";

const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");

export const getSwedishCapacity = () => {
  const roots = GERMANIC_DATA.filter(c => c.sv && c.type === 'root');
  const suffixes = GERMANIC_DATA.filter(c => c.sv && c.type === 'suffix');
  
  // Combine adjectives and noun_prefixes
  const prefixes = GERMANIC_DATA.filter(c => c.sv && (c.type === 'adjective' || c.type === 'noun_prefix'));

  // 1. Prefix + Suffix
  const c1 = prefixes.length * suffixes.length;
  // 2. Root + Suffix
  const c2 = roots.length * suffixes.length;
  // 3. Root + Root
  const c3 = roots.length * roots.length;
  return c1 + c2 + c3;
}

const getData = (entry: any) => {
  if (!entry) return { val: "", gender: undefined };
  return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
};

export const generateSwedishPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.sv && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // Pattern 1: Prefix/Adjective + Suffix (e.g., Storvik)
  if (type < 0.30) {
    const prePool = [...getPool('adjective'), ...getPool('noun_prefix')];
    const pre = getRandomElement(prePool);
    const suf = getRandomElement(getPool('suffix'));
    
    // Adjectives usually fuse with suffixes without 't' inflection
    word = getVal(pre.sv) + getVal(suf.sv).toLowerCase();
  }
  
  // Pattern 2: Root + Suffix
  else if (type < 0.70) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    const rData = getData(root.sv);
    const sVal = getVal(suf.sv);

    let connector = "";
    
    // Logic: Genitive 's' unless suffix forbids it or root ends in s
    if (!suf.tags?.includes('no_conn') && !rData.val.endsWith('s')) {
       // Heuristic: Common place suffixes take 's' often
       if (Math.random() < 0.3) connector = 's'; 
    }
    
    word = rData.val + connector + sVal.toLowerCase();
  }
  
  // Pattern 3: Adjective + Root 
  else if (type < 0.85) {
      const pre = getRandomElement([...getPool('adjective'), ...getPool('noun_prefix')]);
      const root = getRandomElement(roots);
      
      const rData = getData(root.sv); 
      let p = getVal(pre.sv);
      
      // LOGIC: Neuter inflection only applies if it is truly an Adjective
      if (pre.type === 'adjective') {
          
          // Rule: Neuter nouns (n) take 't'
          if (rData.gender === 'n') {
              if (['y', 'å'].includes(p.slice(-1))) {
                 if (p.endsWith('å')) p += 'tt'; 
                 else p += 't';
              } 
              else if (!p.endsWith('t')) {
                 p += 't'; 
              }
          }
    
          // Definite Form Logic (Separate words)
          // Only do this for Adjectives, never Noun Prefixes (Kungs)
          if (Math.random() < 0.3) {
               // Reset 't' logic, apply 'a' ending
               let defP = getVal(pre.sv); 
               
               // Irregular 'Lill' -> 'Lilla' or 'Gammal' -> 'Gamla' could be tags, 
               // but simple 'a' suffix works for 90%
               if (defP.endsWith('al')) defP = defP.slice(0, -2) + 'la'; // Gammal -> Gamla
               else if (!defP.endsWith('a')) defP += 'a';
               
               word = `${defP} ${rData.val}`;
          } else {
              word = p + rData.val.toLowerCase();
          }
      } 
      // Noun Prefixes (Kungs-, Sankt-)
      else {
          word = p + rData.val.toLowerCase();
      }
  }
  
  // Pattern 4: Root + Root
  else {
    const root1 = getRandomElement(roots);
    const root2 = getRandomElement(roots);
    const v1 = getVal(root1.sv);
    const v2 = getVal(root2.sv);

    let connector = "";
    if (Math.random() < 0.25 && !['s', 'x'].includes(v1.slice(-1))) connector = "s";
    
    word = v1 + connector + v2.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateSwedishToAscii(word) };
};
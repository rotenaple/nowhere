import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateGermanToAscii } from "../../utils";
import { GERMANIC_DATA } from "../../dictionaries/germanicDict";

const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");

export const getGermanCapacity = () => {
  const set = new Set<string>();
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.de && c.type === t);
  const roots = getPool('root');
  const suffixes = getPool('suffix');
  const prefixes = [...getPool('adjective'), ...getPool('noun_prefix')];

  const getData = (entry: any) => {
    if (!entry) return { val: "", gender: undefined };
    return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
  };
  const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");

  // Pattern 1: Adjective/Prefix + Root/Suffix
  for (const pre of prefixes) {
    for (const attachToRoot of [true, false]) {
      const secondPartPool = attachToRoot ? roots : suffixes;
      for (const secondPart of secondPartPool) {
        const rData = getData(secondPart.de);
        let adj = getVal(pre.de);
        let noun = rData.val;
        
        const possibleAdjs = [adj];
        if (pre.type === 'adjective') {
          if (pre.tags?.includes('irreg_h') && adj === 'Hoch') {
            possibleAdjs.push('Hohen');
          } else if (pre.tags?.includes('weak_en')) {
            const inflected = adj.endsWith('ß') ? adj + 'en' : adj + 'en';
            possibleAdjs.push(inflected);
          }
        }

        for (const a of possibleAdjs) {
          const w = attachToRoot ? (a + noun.toLowerCase()) : (a + noun);
          set.add(w.trim().toLowerCase());
        }
      }
    }
  }

  // Pattern 2: Compound Noun + Suffix
  for (const root of roots) {
    for (const suf of suffixes) {
      const rData = getData(root.de);
      const rVal = rData.val;
      const sVal = getVal(suf.de);
      if (rVal.toLowerCase() === sVal.toLowerCase()) continue;

      const connectors = [""];
      if (!suf.tags?.includes('no_conn')) {
        if (rData.gender === 'f') {
          if (rVal.endsWith('e')) connectors.push('n');
          else if (rVal.endsWith('ung') || rVal.endsWith('heit')) connectors.push('s');
        } else {
          if (!['s', 'z', 'x', 'ß'].includes(rVal.slice(-1))) {
            connectors.push('s');
          }
        }
      }

      for (let conn of connectors) {
        if (conn === 's' && sVal.toLowerCase().startsWith('s')) {
          conn = "";
        }
        set.add((rVal + conn + sVal).trim().toLowerCase());
      }
    }
  }

  // Pattern 3: Root + Root
  for (const root1 of roots) {
    for (const root2 of roots) {
      const d1 = getData(root1.de);
      const d2 = getData(root2.de);
      if (d1.val === d2.val) continue;

      const glues = [""];
      if (!root2.tags?.includes('no_conn')) {
        if (d1.gender === 'f') {
          if (d1.val.endsWith('e')) glues.push('n');
        } else {
          if (!['s', 'z', 'x', 'ß'].includes(d1.val.slice(-1))) {
            glues.push('s');
          }
        }
      }

      for (let glue of glues) {
        if (glue === 's' && d2.val.toLowerCase().startsWith('s')) {
          glue = "";
        }
        set.add((d1.val + glue + d2.val.toLowerCase()).trim().toLowerCase());
      }
    }
  }

  return set.size;
}

const getData = (entry: any) => {
  if (!entry) return { val: "", gender: undefined };
  return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
};

export const generateGermanPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.de && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // Pattern 1: Adjective/Prefix + Root/Suffix
  if (type < 0.35) {
    rule = "Adjective/Prefix + Root/Suffix";
    // Merge pools: 'adjective' and 'noun_prefix'
    const prePool = [...getPool('adjective'), ...getPool('noun_prefix')];
    const pre = getRandomElement(prePool);
    
    // Decide attachment: Root (Neuburg) or Suffix (Neuhausen)
    const attachToRoot = Math.random() < 0.6;
    const secondPart = attachToRoot ? getRandomElement(roots) : getRandomElement(getPool('suffix'));
    
    const rData = getData(secondPart.de);
    let adj = getVal(pre.de);
    let noun = rData.val;

    components.push(JSON.stringify(pre), JSON.stringify(secondPart));

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
    rule = "Compound Noun + Suffix";
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

    components.push(JSON.stringify(root));
    if (connector) components.push(`[connector: "${connector}"]`);
    components.push(JSON.stringify(suf));

    word = rVal + connector + sVal;
  }
  
  // Pattern 3: Root + Root
  else {
    rule = "Root + Root";
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

    components.push(JSON.stringify(root1));
    if (glue) components.push(`[connector: "${glue}"]`);
    components.push(JSON.stringify(root2));

    word = d1.val + glue + d2.val.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateGermanToAscii(word), generationRules: [rule], dictionaryComponents: components };
};
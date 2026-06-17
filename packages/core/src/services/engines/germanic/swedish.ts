import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateSwedishToAscii } from "../../utils";
import { GERMANIC_DATA } from "../../dictionaries/germanicDict";

const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");

export const getSwedishCapacity = () => {
  const set = new Set<string>();
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.sv && c.type === t);
  const roots = getPool('root');
  const suffixes = getPool('suffix');
  const prefixes = GERMANIC_DATA.filter(c => c.sv && (c.type === 'adjective' || c.type === 'noun_prefix'));
  const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");
  const getData = (entry: any) => {
    if (!entry) return { val: "", gender: undefined };
    return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
  };

  // Pattern 1: Prefix/Adjective + Suffix
  for (const pre of prefixes) {
    for (const suf of suffixes) {
      set.add((getVal(pre.sv) + getVal(suf.sv).toLowerCase()).trim().toLowerCase());
    }
  }

  // Pattern 2: Root + Suffix
  for (const root of roots) {
    for (const suf of suffixes) {
      const rData = getData(root.sv);
      const sVal = getVal(suf.sv);

      const connectors = [""];
      if (!suf.tags?.includes('no_conn') && !rData.val.endsWith('s')) {
        connectors.push("s");
      }

      for (const connector of connectors) {
        set.add((rData.val + connector + sVal.toLowerCase()).trim().toLowerCase());
      }
    }
  }

  // Pattern 3: Adjective + Root
  for (const pre of prefixes) {
    for (const root of roots) {
      const rData = getData(root.sv);
      let p = getVal(pre.sv);

      if (pre.type === 'adjective') {
        // Compound Form
        let inflectedP = p;
        if (rData.gender === 'n') {
          if (['y', 'å'].includes(p.slice(-1))) {
            if (p.endsWith('å')) inflectedP += 'tt';
            else inflectedP += 't';
          } else if (!p.endsWith('t')) {
            inflectedP += 't';
          }
        }
        set.add((inflectedP + rData.val.toLowerCase()).trim().toLowerCase());

        // Definite Form (Separate)
        let defP = p;
        if (defP.endsWith('al')) {
          defP = defP.slice(0, -2) + 'la';
        } else if (!defP.endsWith('a')) {
          defP += 'a';
        }
        set.add(`${defP} ${rData.val}`.trim().toLowerCase());
      } else {
        // Noun Prefixes
        set.add((p + rData.val.toLowerCase()).trim().toLowerCase());
      }
    }
  }

  // Pattern 4: Root + Root
  for (const root1 of roots) {
    for (const root2 of roots) {
      const v1 = getVal(root1.sv);
      const v2 = getVal(root2.sv);

      const connectors = [""];
      if (!['s', 'x'].includes(v1.slice(-1))) {
        connectors.push("s");
      }

      for (const connector of connectors) {
        set.add((v1 + connector + v2.toLowerCase()).trim().toLowerCase());
      }
    }
  }

  return set.size;
}

const getData = (entry: any) => {
  if (!entry) return { val: "", gender: undefined };
  return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
};

export const generateSwedishPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.sv && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // Pattern 1: Prefix/Adjective + Suffix (e.g., Storvik)
  if (type < 0.30) {
    rule = "Prefix/Adjective + Suffix";
    const prePool = [...getPool('adjective'), ...getPool('noun_prefix')];
    const pre = getRandomElement(prePool);
    const suf = getRandomElement(getPool('suffix'));
    
    components.push(JSON.stringify(pre), JSON.stringify(suf));

    // Adjectives usually fuse with suffixes without 't' inflection
    word = getVal(pre.sv) + getVal(suf.sv).toLowerCase();
  }
  
  // Pattern 2: Root + Suffix
  else if (type < 0.70) {
    rule = "Root + Suffix";
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
    
    components.push(JSON.stringify(root));
    if (connector) components.push(`[connector: "${connector}"]`);
    components.push(JSON.stringify(suf));

    word = rData.val + connector + sVal.toLowerCase();
  }
  
  // Pattern 3: Adjective + Root 
  else if (type < 0.85) {
      rule = "Adjective + Root";
      const pre = getRandomElement([...getPool('adjective'), ...getPool('noun_prefix')]);
      const root = getRandomElement(roots);
      
      const rData = getData(root.sv); 
      let p = getVal(pre.sv);

      components.push(JSON.stringify(pre), JSON.stringify(root));
      
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
    rule = "Root + Root";
    const root1 = getRandomElement(roots);
    const root2 = getRandomElement(roots);
    const v1 = getVal(root1.sv);
    const v2 = getVal(root2.sv);

    let connector = "";
    if (Math.random() < 0.25 && !['s', 'x'].includes(v1.slice(-1))) connector = "s";
    
    components.push(JSON.stringify(root1));
    if (connector) components.push(`[connector: "${connector}"]`);
    components.push(JSON.stringify(root2));

    word = v1 + connector + v2.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateSwedishToAscii(word), generationRules: [rule], dictionaryComponents: components };
};
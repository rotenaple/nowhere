import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateDutchToAscii } from "../../utils";
import { GERMANIC_DATA } from "../../dictionaries/germanicDict";

const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");
const getData = (entry: any) => {
  if (!entry) return { val: "", gender: undefined };
  return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
};

export const getDutchCapacity = () => {
  const set = new Set<string>();
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.nl && c.type === t);
  const roots = getPool('root');
  const suffixes = getPool('suffix');
  const prefixes = GERMANIC_DATA.filter(c => c.nl && (c.type === 'adjective' || c.type === 'noun_prefix'));
  const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");
  const getData = (entry: any) => {
    if (!entry) return { val: "", gender: undefined };
    return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
  };

  // 1. Prefix + Root
  for (const pre of prefixes) {
    for (const root of roots) {
      let p = getVal(pre.nl);
      const rData = getData(root.nl);
      const r = rData.val;

      if (pre.type === 'adjective' && ['Nieuw', 'Oud', 'Groot', 'Klein', 'Hoog', 'Laag'].includes(pre.def)) {
        if (rData.gender === 'n') {
          // Uninflected option
          set.add(`${p}-${r}`.trim().toLowerCase());
        }
        // Inflected option
        let inflectedP = p;
        if (p.endsWith('oot')) inflectedP = p.replace('oot', 'ote');
        else if (p.endsWith('ood')) inflectedP = p.replace('ood', 'ode');
        else inflectedP += 'e';

        set.add(`${inflectedP} ${r}`.trim().toLowerCase());
      } else {
        set.add((p + r.toLowerCase()).trim().toLowerCase());
      }
    }
  }

  // 2. Root + Suffix
  for (const root of roots) {
    for (const suf of suffixes) {
      let r = getVal(root.nl);
      let s = getVal(suf.nl);

      if (r.toLowerCase().includes(s.toLowerCase())) continue;

      const connectors = [""];
      if (['veen', 'berg', 'dam', 'dijk', 'woud'].includes(s)) {
        if (!['s', 'n'].includes(r.slice(-1))) {
          connectors.push("s");
        }
      }

      for (const connector of connectors) {
        set.add((r + connector + s).trim().toLowerCase());
      }
    }
  }

  // 3. 's- [Genitive Root]
  const genitives = ['Heeren', 'Graven', 'Hertogen', 'Papen', 'Vrouwen', 'Princen', 'Konings', 'Monniken'];
  for (const root of genitives) {
    for (const suf of suffixes) {
      set.add((`'s-${root}` + getVal(suf.nl)).trim().toLowerCase());
    }
  }

  // 4. Root + Root
  for (const root1 of roots) {
    for (const root2 of roots) {
      const v1 = getVal(root1.nl);
      const v2 = getVal(root2.nl);

      if (v1 === v2) continue;

      const glues = [""];
      if (!v1.endsWith('s')) {
        glues.push("s");
      }

      for (const glue of glues) {
        set.add((v1 + glue + v2.toLowerCase()).trim().toLowerCase());
      }
    }
  }

  return set.size;
}

export const generateDutchPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.nl && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // 1. Prefix + Root/Suffix
  if (type < 0.35) {
    rule = "Prefix + Root/Suffix";
    // FIX: Combine pools
    const prePool = [...getPool('adjective'), ...getPool('noun_prefix')];
    const pre = getRandomElement(prePool);
    const root = getRandomElement(roots);
    
    let p = getVal(pre.nl);
    let rData = getData(root.nl);
    let r = rData.val;
    
    components.push(JSON.stringify(pre), JSON.stringify(root));
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
    rule = "Root + Suffix";
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    let r = getVal(root.nl);
    let s = getVal(suf.nl);
    
    if (r.toLowerCase().includes(s.toLowerCase())) return generateDutchPlace();
    
    let connector = "";
    if (['veen', 'berg', 'dam', 'dijk', 'woud'].includes(s)) {
        if (!['s', 'n'].includes(r.slice(-1)) && Math.random() < 0.2) connector = "s";
    }

    components.push(JSON.stringify(root));
    if (connector) components.push(`[connector: "${connector}"]`);
    components.push(JSON.stringify(suf));
    word = r + connector + s;
  }
  // 3. 's- [Genitive Root]
  else if (type < 0.75) {
      rule = "'s- [Genitive Root]";
      const genitives = ['Heeren', 'Graven', 'Hertogen', 'Papen', 'Vrouwen', 'Princen', 'Konings', 'Monniken'];
      const root = getRandomElement(genitives);
      const suf = getRandomElement(getPool('suffix'));
      components.push(JSON.stringify({ val: root, type: 'genitive_root' }), JSON.stringify(suf));
      word = `'s-${root}${getVal(suf.nl)}`;
  }
  // 4. Root + Root
  else {
    rule = "Root + Root";
    const root1 = getRandomElement(roots);
    const root2 = getRandomElement(roots);
    
    const v1 = getVal(root1.nl);
    const v2 = getVal(root2.nl);

    if (v1 === v2) return generateDutchPlace();
    
    let glue = "";
    if (Math.random() < 0.3 && !v1.endsWith('s')) glue = "s";
    
    components.push(JSON.stringify(root1));
    if (glue) components.push(`[connector: "${glue}"]`);
    components.push(JSON.stringify(root2));
    word = v1 + glue + v2.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateDutchToAscii(word), generationRules: [rule], dictionaryComponents: components };
}
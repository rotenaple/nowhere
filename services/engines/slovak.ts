
import { GeneratedResult } from "../../types";
import { getRandomElement, transliterateSlovakToAscii } from "../utils";
import { SLAVIC_DATA } from "../dictionaries/slavicDict";

export const getSlovakCapacity = () => {
  const roots = SLAVIC_DATA.filter(c => c.sk && (c.type === 'root' || c.type === 'stem'));
  const suffixes = SLAVIC_DATA.filter(c => c.sk && c.type === 'suffix');
  const prefixes = SLAVIC_DATA.filter(c => c.sk && c.type === 'adjective');
  const rivers = SLAVIC_DATA.filter(c => c.sk && c.type === 'river');

  const c1 = prefixes.length * roots.length;
  const c2 = roots.length * suffixes.length;
  const c3 = prefixes.length * roots.length * suffixes.length;
  const c4 = (c1 + c2 + c3) * rivers.length;
  
  return c1 + c2 + c3 + c4;
}

export const generateSlovakPlace = (): GeneratedResult => {
  let word = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => c.sk && c.type === t);
  const roots = [...getPool('root'), ...getPool('stem')];

  const type = Math.random();
  
  // Helper to inflect adjectives (simplified)
  const getAdjective = (baseAdj: string, noun: string): string => {
      let stem = baseAdj;
      let isSoft = false;
      if (baseAdj.endsWith('í')) { isSoft = true; stem = baseAdj.slice(0, -1); } 
      else if (baseAdj.endsWith('ý')) { stem = baseAdj.slice(0, -1); }

      if (isSoft) return baseAdj;

      // Guess noun gender from ending
      if (noun.endsWith('a') || noun.endsWith('ice')) {
          return stem + 'á'; 
      } else if (noun.endsWith('o') || noun.endsWith('ie')) {
          return stem + 'é'; 
      } 
      return stem + 'ý'; 
  }

  // 1. Adjective + Noun (e.g. Nové Mesto)
  if (type < 0.35) {
    const adj = getRandomElement(getPool('adjective'));
    const root = getRandomElement(getPool('root')); 
    const validNoun = root.tags?.includes('civic') || root.tags?.includes('nature') ? root.sk! : getRandomElement(getPool('root')).sk!;
    const inflectedAdj = getAdjective(adj.sk!, validNoun);
    word = `${inflectedAdj} ${validNoun}`;
  }
  // 2. Root + Suffix 
  else if (type < 0.65) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    let base = root.sk!;
    if (['a','e','i','o','u','y','á','é','í','ý'].includes(base.slice(-1))) {
        base = base.slice(0, -1);
    }
    word = base + suf.sk;
  }
  // 3. Adjective + Root+Suffix
  else if (type < 0.85) {
    const adj = getRandomElement(getPool('adjective'));
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    let base = root.sk!;
    if (['a','e','i','o','u','y','á','é','í','ý'].includes(base.slice(-1))) {
        base = base.slice(0, -1);
    }
    const derivedNoun = base + suf.sk;
    const inflectedAdj = getAdjective(adj.sk!, derivedNoun);
    word = `${inflectedAdj} ${derivedNoun}`;
  }
  // 4. [Base] nad [River]
  else {
    const root = getRandomElement(roots);
    let base = root.sk!;
    if (Math.random() < 0.6) {
        const suf = getRandomElement(getPool('suffix'));
         if (['a','e','i','o','u','y'].includes(base.slice(-1))) base = base.slice(0, -1);
        base += suf.sk;
    }
    const river = getRandomElement(getPool('river'));
    word = `${base} nad ${river.sk}`;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateSlovakToAscii(word) };
};


import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateCzechToAscii } from "../../utils";
import { SLAVIC_DATA } from "../../dictionaries/slavicDict";

export const getCzechCapacity = () => {
  const roots = SLAVIC_DATA.filter(c => c.cs && (c.type === 'root' || c.type === 'stem'));
  const suffixes = SLAVIC_DATA.filter(c => c.cs && c.type === 'suffix');
  const adjectives = SLAVIC_DATA.filter(c => c.cs && c.type === 'adjective');
  const rivers = SLAVIC_DATA.filter(c => c.cs && c.type === 'river');

  // Path 1 (Adjective + Root)
  const path1_adj_root = adjectives.length * roots.length;

  // Path 2 (Root + Suffix)
  const path2_rootsuf = roots.length * suffixes.length;

  // Path 3 (Adjective + Root + Suffix)
  const path3_adj_rootsuf = adjectives.length * roots.length * suffixes.length;

  // Path 4 ((Root + optional Suffix) + "nad" + River)
  // This path can generate Root + nad + River OR Root + Suffix + nad + River
  const path4_root_river = roots.length * rivers.length;
  const path4_rootsuf_river = roots.length * suffixes.length * rivers.length;
  
  // Summing the distinct possibilities from each generation path.
  // This corrects the previous over-inflated calculation.
  return path1_adj_root + path2_rootsuf + path3_adj_rootsuf + path4_root_river + path4_rootsuf_river;
}


export const generateCzechPlace = (): GeneratedResult => {
  let word = "";

  // Get filtered pools
  const getPool = (t: string) => SLAVIC_DATA.filter(c => c.cs && c.type === t);
  const roots = [...getPool('root'), ...getPool('stem')];

  // === PLACE MODE ===
  const type = Math.random();
  
  // Helper to inflect adjectives
  const getAdjective = (baseAdj: string, noun: string): string => {
      let stem = baseAdj;
      let isSoft = false;
      if (baseAdj.endsWith('í')) { isSoft = true; stem = baseAdj.slice(0, -1); } 
      else if (baseAdj.endsWith('ý')) { stem = baseAdj.slice(0, -1); }
      else if (baseAdj.endsWith('é')) { stem = baseAdj.slice(0, -1); }
      else if (baseAdj.endsWith('á')) { stem = baseAdj.slice(0, -1); }

      if (isSoft) return baseAdj;

      // Guess noun gender from ending
      if (noun.endsWith('a') || noun.endsWith('ice') || noun.endsWith('eň') || noun.endsWith('eves')) {
          return stem + 'á'; // Nová Lhota
      } else if (noun.endsWith('o') || noun.endsWith('í') || noun.endsWith('e')) {
          return stem + 'é'; // Nové Město
      } else if (noun.endsWith('y') || noun.endsWith('i') || noun.endsWith('é')) {
          return stem + 'é'; // Often Plural Neuter or Masc
      }
      return stem + 'ý'; // Default Masc Sg
  }

  // 1. Adjective + Noun (e.g. Nové Mesto)
  if (type < 0.35) {
    const adj = getRandomElement(getPool('adjective'));
    const root = getRandomElement(getPool('root')); // Prefer explicit nouns
    // Only use 'root' type for stand-alone nouns, stems are for affixing
    const validNoun = root.tags?.includes('civic') || root.tags?.includes('nature') ? root.cs! : getRandomElement(getPool('root')).cs!;
    
    const inflectedAdj = getAdjective(adj.cs!, validNoun);
    word = `${inflectedAdj} ${validNoun}`;
  }
  // 2. Root + Suffix (e.g. Benešov, Lipová)
  else if (type < 0.65) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    let base = root.cs!;
    
    if (['a','e','i','o','u','y','á','é','í','ý','ů'].includes(base.slice(-1))) {
        base = base.slice(0, -1);
    }
    
    word = base + suf.cs;
  }
  // 3. Adjective + Root+Suffix (e.g. Starý Bohumín)
  else if (type < 0.85) {
    const adj = getRandomElement(getPool('adjective'));
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    let base = root.cs!;
    if (['a','e','i','o','u','y','á','é','í','ý','ů'].includes(base.slice(-1))) {
        base = base.slice(0, -1);
    }
    const derivedNoun = base + suf.cs;
    const inflectedAdj = getAdjective(adj.cs!, derivedNoun);
    word = `${inflectedAdj} ${derivedNoun}`;
  }
  // 4. [Base] nad [River]
  else {
    const root = getRandomElement(roots);
    let base = root.cs!;
    // Optionally add suffix
    if (Math.random() < 0.6) {
        const suf = getRandomElement(getPool('suffix'));
         if (['a','e','i','o','u','y'].includes(base.slice(-1))) base = base.slice(0, -1);
        base += suf.cs;
    }
    
    const river = getRandomElement(getPool('river'));
    word = `${base} nad ${river.cs}`;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateCzechToAscii(word) };
};

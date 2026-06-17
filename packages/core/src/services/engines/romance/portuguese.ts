import { GeneratedResult } from "../../../types";
import { getRandomElement, transliteratePortugueseToAscii } from "../../utils";
import { ROMANCE_DATA, getRomData } from "../../dictionaries/romanceDict";

const getPool = (types: string[]) => 
  ROMANCE_DATA.filter(c => c.pt && types.includes(c.type));

export const getPortugueseCapacity = () => {
  const set = new Set<string>();

  const getPtAdj = (entry: any, gender: string) => {
    const val = getRomData(entry).val;
    if (gender === 'f') {
      if (val.endsWith('o')) return val.slice(0, -1) + 'a';
      if (val === 'Bom') return 'Boa';
    }
    return val;
  };

  // 1. Prefix + Noun (San Patterns)
  const prefixes = getPool(['prefix']);
  const targetPool = getPool(['abstract', 'bio_fauna', 'bio_flora']);
  for (const prefixObj of prefixes) {
    for (const rootObj of targetPool) {
      const rData = getRomData(rootObj.pt);
      const gender = rData.gender || 'm';
      let p = getRomData(prefixObj.pt).val;
      if (gender === 'f') {
        if (p === 'Santo') p = 'Santa';
        if (p === 'São') p = 'Santa';
      } else {
        if (p === 'Santo') {
          const startsWithVowel = ['A','E','I','O','U'].includes(rData.val.charAt(0).toUpperCase());
          p = startsWithVowel ? 'Santo' : 'São';
        }
      }
      set.add((p + " " + rData.val).trim().toLowerCase());
    }
  }

  // 2. Noun + Adjective
  const nouns = getPool(['geo_major', 'geo_minor', 'settlement']);
  const adjectives = getPool(['adj_geo', 'adj_color', 'adj_quality']);
  for (const nounObj of nouns) {
    for (const adjObj of adjectives) {
      const nData = getRomData(nounObj.pt);
      const gender = nData.gender || 'm';
      const adj = getPtAdj(adjObj.pt, gender);
      set.add((nData.val + " " + adj).trim().toLowerCase());
    }
  }

  // 3. Composite (de)
  const heads = getPool(['geo_major', 'settlement']);
  const tails = getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']);
  for (const headObj of heads) {
    for (const tailObj of tails) {
      const h = getRomData(headObj.pt).val;
      const tData = getRomData(tailObj.pt);
      const tGender = tData.gender || 'm';
      const useArticle = !tailObj.tags?.includes('no_saint');
      let connector = 'de';
      if (useArticle) {
        connector = (tGender === 'f') ? 'da' : 'do';
      }
      set.add((h + " " + connector + " " + tData.val).trim().toLowerCase());
    }
  }

  // 4. Root + Suffix
  const suffixRoots = getPool(['settlement', 'geo_major', 'geo_minor', 'bio_flora']);
  const suffixes = getPool(['suffix']);
  for (const rootObj of suffixRoots) {
    for (const suffixObj of suffixes) {
      let base = getRomData(rootObj.pt).val.toLowerCase();
      const sVal = getRomData(suffixObj.pt).val;
      if (['a','e','i','o','u','á','à','â','ã','é','ê','í','ó','ô','õ','ú'].includes(base.slice(-1)) && ['a','e','i','o','u','á','à','â','ã','é','ê','í','ó','ô','õ','ú'].includes(sVal.charAt(0))) {
        base = base.slice(0, -1);
      }
      set.add((base + sVal).trim().toLowerCase());
    }
  }

  return set.size;
}

export const generatePortuguesePlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();
  
  // 1. Saint / Prefix Pattern
  if (roll < 0.25) {
      rule = "Saint / Prefix Pattern";
      const useSaint = Math.random() < 0.5;
      
      if (useSaint) {
        const saintPool = ROMANCE_DATA.filter(c => c.pt && c.tags?.includes('saint_ok'));
        const saintTarget = getRandomElement(saintPool);
        const tData = getRomData(saintTarget.pt);
        const prefix = (tData.gender === 'f') ? 'Santa' : 'São';
        components.push(JSON.stringify({ val: prefix, type: 'prefix' }), JSON.stringify(saintTarget));
        word = `${prefix} ${tData.val}`;
      } else {
        const prefixObj = getRandomElement(getPool(['prefix']).filter(p => p.def !== 'San' && p.def !== 'Santa' && p.def !== 'Santo'));
        const commonPrefixRoots = getPool(['settlement', 'geo_major']).filter(r => r.tags?.includes('common_prefix'));
        
        let p = getRomData(prefixObj.pt).val;
        if (Math.random() < 0.6 && commonPrefixRoots.length > 0) {
             const rootAsPrefix = getRandomElement(commonPrefixRoots);
             p = getRomData(rootAsPrefix.pt).val;
         }
        
        // Combine with a noun or an adjective
        const tailObj = getRandomElement(getPool(['adj_quality', 'adj_color', 'bio_flora', 'settlement']));
        components.push(JSON.stringify(prefixObj), JSON.stringify(tailObj));
        const tData = getRomData(tailObj.pt);
        let t = tData.val;

        if (tailObj.type.startsWith('adj')) {
            const pGender = (p.endsWith('a') || p === 'Santa') ? 'f' : 'm';
            if (pGender === 'f') {
                 if (t.endsWith('o')) t = t.slice(0, -1) + 'a';
                 if (t === 'Novo') t = 'Nova';
            }
        }
        word = `${p} ${t}`;
      }
  }
  
  // 2. Root + Adjective
  else if (roll < 0.50) {
      rule = "Root + Adjective";
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      let adjTypes = ['adj_quality', 'adj_color'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
      const adjObj = getRandomElement(getPool(adjTypes));
      components.push(JSON.stringify(rootObj), JSON.stringify(adjObj));
      
      const rData = getRomData(rootObj.pt);
      let r = rData.val;
      let a = getRomData(adjObj.pt).val;
      const gender = rData.gender || 'm';
      
      if (gender === 'f') {
          if (a.endsWith('o')) a = a.slice(0, -1) + 'a';
          if (a === 'Bom') a = 'Boa';
          if (a === 'Mau') a = 'Má';
          if (a === 'Novo') a = 'Nova';
          if (a === 'Belo') a = 'Bela';
          if (a === 'Santo') a = 'Santa';
      }
      
      word = `${r} ${a}`;
  }
  
  // 3. Composite (De)
  else if (roll < 0.75) {
      rule = "Composite (De)";
      const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
      const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
      components.push(JSON.stringify(headObj), JSON.stringify(tailObj));
      
      const hData = getRomData(headObj.pt);
      const tData = getRomData(tailObj.pt);
      
      let connector = 'de';
      const useArticle = !tailObj.tags?.includes('no_saint');
      
      if (useArticle) {
          if (tData.gender === 'f') connector = 'da';
          else connector = 'do';
      }

      word = `${hData.val} ${connector} ${tData.val}`;
  }
  
  // 4. Root + Suffix
  else {
      rule = "Root + Suffix";
      const rootObj = getRandomElement(getPool(['settlement', 'geo_major', 'geo_minor', 'bio_flora']));
      const suffixObj = getRandomElement(getPool(['suffix']));
      components.push(JSON.stringify(rootObj), JSON.stringify(suffixObj));
      
      let base = getRomData(rootObj.pt).val.toLowerCase();
      const sVal = getRomData(suffixObj.pt).val;
      
      if (['a','e','i','o','u','á','à','â','ã','é','ê','í','ó','ô','õ','ú'].includes(base.slice(-1)) && ['a','e','i','o','u','á','à','â','ã','é','ê','í','ó','ô','õ','ú'].includes(sVal.charAt(0))) {
          base = base.slice(0, -1);
      }
      word = base + sVal;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliteratePortugueseToAscii(word), generationRules: [rule], dictionaryComponents: components };
};
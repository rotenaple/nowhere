import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateRomanianToAscii } from "../../utils";
import { ROMANCE_DATA, getRomData, RomanceEntry } from "../../dictionaries/romanceDict";

const getPool = (types: string[]) => 
  ROMANCE_DATA.filter(c => c.ro && types.includes(c.type));

// Helper to extract Romanian Adjective data specifically
export const getRoAdj = (entry: RomanceEntry | undefined): { m: string, f: string } => {
  if (!entry) return { m: '', f: '' };
  
  if (Array.isArray(entry) && entry.length === 2) {
      const second = entry[1];
      if (second === 'm' || second === 'f' || second === 'n') {
          const val = entry[0];
          return { m: val, f: (val.endsWith('e') || val.endsWith('ă')) ? val : val + 'ă' };
      }
      return { m: entry[0], f: second };
  }
  
  const val = typeof entry === 'string' ? entry : entry[0];
  let f = "";

  if (val.endsWith('e') || val.endsWith('ă')) {
      f = val;
  } else if (val.endsWith('u') && !val.endsWith('iu')) {
      f = val.slice(0, -1) + 'ă';
  } else if (val.endsWith('iu')) {
      f = val.slice(0, -2) + 'ie';
  } else {
      f = val + 'ă';
  }

  return { m: val, f };
};

export const getRomanianCapacity = () => {
  const set = new Set<string>();

  const getRoAdj = (entry: any, gender: string) => {
    const val = getRomData(entry).val;
    if (gender === 'm') return val;
    let f = "";
    if (val.endsWith('u') && !val.endsWith('au')) {
        f = val.slice(0, -1) + 'ă';
    } else if (val.endsWith('or')) {
        f = val + 'e';
    } else {
        f = val + 'ă';
    }
    return f;
  };

  const nouns = getPool(['geo_major', 'geo_minor', 'settlement']);

  // 1. Root + Adjective
  const adjectives = getPool(['adj_geo', 'adj_color', 'adj_quality']);
  for (const nounObj of nouns) {
    for (const adjObj of adjectives) {
      const nData = getRomData(nounObj.ro);
      const gender = nData.gender || 'm';
      const adj = getRoAdj(adjObj.ro, gender);
      set.add((nData.val + " " + adj).trim().toLowerCase());
    }
  }

  // 2. Root + Suffix
  const suffixes = getPool(['suffix']);
  for (const rootObj of nouns) {
    for (const suffixObj of suffixes) {
      let base = getRomData(rootObj.ro).val;
      const sVal = getRomData(suffixObj.ro).val;
      if (['a','e','i','o','u','ă','â','î'].includes(base.slice(-1).toLowerCase()) && ['a','e','i','o','u','ă','â','î'].includes(sVal.charAt(0).toLowerCase())) {
        base = base.slice(0, -1);
      }
      set.add((base + sVal).trim().toLowerCase());
    }
  }

  // 3. Root + de + Tail
  const tails = getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']);
  for (const headObj of nouns) {
    for (const tailObj of tails) {
      const h = getRomData(headObj.ro).val;
      const t = getRomData(tailObj.ro).val;
      set.add((h + " de " + t).trim().toLowerCase());
    }
  }

  // 4. Saint prefix + Root
  const saintPool = ROMANCE_DATA.filter(c => c.ro && c.tags?.includes('saint_ok'));
  for (const target of saintPool) {
    const tData = getRomData(target.ro);
    if (tData.gender === 'f') {
      set.add(("Sfânta " + tData.val).trim().toLowerCase());
    } else {
      set.add(("Sân" + tData.val).trim().toLowerCase());
    }
  }

  return set.size;
}

export const generateRomanianPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();
  
  // 1. Root + Adjective
  if (roll < 0.35) {
      rule = "Root + Adjective";
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      let adjTypes = ['adj_color', 'adj_quality'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) {
          adjTypes.push('adj_geo');
      }
      const adjObj = getRandomElement(getPool(adjTypes));
      components.push(JSON.stringify(rootObj), JSON.stringify(adjObj));
      
      const rData = getRomData(rootObj.ro);
      let r = rData.val;
      const gender = rData.gender || 'n';
      
      const aData = getRoAdj(adjObj.ro);
      let a = (gender === 'f') ? aData.f : aData.m;
      
      word = `${r} ${a}`;
  }
  
  // 2. Root + Suffix
  else if (roll < 0.60) {
      rule = "Root + Suffix";
      const rootObj = getRandomElement(getPool(['settlement', 'geo_minor', 'bio_flora', 'geo_major']));
      const suffixObj = getRandomElement(getPool(['suffix']));
      components.push(JSON.stringify(rootObj), JSON.stringify(suffixObj));
      
      let base = getRomData(rootObj.ro).val;
      const sVal = getRomData(suffixObj.ro).val;
      
      if (['a','ă','â','e','i','î','o','u'].includes(base.slice(-1))) {
          base = base.slice(0, -1);
      }
      
      word = base + sVal;
  }
  
  // 3. Saint prefix
  else if (roll < 0.80) {
      rule = "Saint prefix";
      const saintPool = ROMANCE_DATA.filter(c => c.ro && c.tags?.includes('saint_ok'));
      const target = getRandomElement(saintPool);
      components.push(JSON.stringify(target));
      
      const tData = getRomData(target.ro);
      if (tData.gender === 'f') {
          word = "Sfânta " + tData.val;
      } else {
          word = "Sân" + tData.val.charAt(0).toLowerCase() + tData.val.slice(1);
      }
  }
  
  // 4. Composite (The X of Y)
  else {
      rule = "Composite (de)";
      const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
      const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
      components.push(JSON.stringify(headObj), JSON.stringify(tailObj));
      
      const hData = getRomData(headObj.ro);
      let head = hData.val;
      let tail = getRomData(tailObj.ro).val;
      
      // Definite Article Logic
      if (hData.gender === 'f') {
          if (head.endsWith('ă')) head = head.slice(0, -1) + 'a';
          else if (head.endsWith('ie')) head = head.slice(0, -1) + 'ia';
          else if (head.endsWith('e')) head += 'a'; 
          else if (!head.endsWith('a')) head += 'a';
      } else {
          if (head.endsWith('u') && !head.endsWith('iu')) head += 'l'; 
          else if (['e','i'].includes(head.slice(-1))) head += 'le'; 
          else head += 'ul'; 
      }
      
      if (Math.random() < 0.6) {
          word = `${head} de ${tail}`;
      } else {
          word = `${head} ${tail}`;
      }
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateRomanianToAscii(word), generationRules: [rule], dictionaryComponents: components };
};
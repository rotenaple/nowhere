import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateFrenchToAscii } from "../../utils";
import { ROMANCE_DATA, getRomData, RomanceEntry } from "../../dictionaries/romanceDict";

const getPool = (types: string[]) => 
  ROMANCE_DATA.filter(c => c.fr && types.includes(c.type));

export const getFrenchCapacity = () => {
  const prefixes = getPool(['prefix']);
  const nouns = getPool(['geo_major', 'geo_minor', 'settlement']);
  const allAdjs = getPool(['adj_geo', 'adj_color', 'adj_quality']);
  const allTails = getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']);
  const suffixes = getPool(['suffix']);

  const c1 = prefixes.length * nouns.length;
  const c2 = nouns.length * suffixes.length;
  const c3 = nouns.length * allAdjs.length;
  const c4 = nouns.length * allTails.length;
  
  return c1 + c2 + c3 + c4;
}

// Helper to extract French Adjective data specifically
export const getFrAdj = (entry: RomanceEntry | undefined): { m: string, f: string } => {
  if (!entry) return { m: '', f: '' };
  
  if (Array.isArray(entry) && entry.length === 2) {
      const second = entry[1];
      if (second === 'm' || second === 'f' || second === 'n') {
          const val = entry[0];
          return { m: val, f: val.endsWith('e') ? val : val + 'e' };
      }
      return { m: entry[0], f: second };
  }
  
  const val = typeof entry === 'string' ? entry : entry[0];
  let f = "";

  if (val.endsWith('e')) f = val; 
  else if (val.endsWith('x')) f = val.slice(0, -1) + 'se'; 
  else if (val.endsWith('f')) f = val.slice(0, -1) + 've'; 
  else if (val.endsWith('er')) f = val.slice(0, -2) + 'ère'; 
  else f = val + 'e'; 

  return { m: val, f };
};

export const generateFrenchPlace = (): GeneratedResult => {
  let word = "";
  const roll = Math.random();

  // 1. Saint-X / Prefix-X
  if (roll < 0.20) {
    const prefixObj = getRandomElement(getPool(['prefix']));
    const rootObj = getRandomElement(getPool(['settlement', 'geo_major', 'bio_flora']));
    
    const rData = getRomData(rootObj.fr);
    let rootVal = rData.val;
    const gender = rData.gender || 'm';
    
    let p = "";

    const prefixEntry = prefixObj.fr;
    if (Array.isArray(prefixEntry) && prefixEntry.length === 2 && prefixEntry[1].length > 1) {
        p = (gender === 'f') ? prefixEntry[1] : prefixEntry[0];
    } else {
        p = getRomData(prefixEntry).val;
        if (gender === 'f') {
            if (p === 'Le') p = 'La';
            if (p === 'Saint') p = 'Sainte';
            if (p === 'Beau') p = 'Belle';
            if (p === 'Vieux') p = 'Vieille';
        } else {
            if (p === 'La') p = 'Le';
            if (p === 'Sainte') p = 'Saint';
        }
    }

    // FIX: Pluralize Root based on TAG
    if (prefixObj.tags?.includes('plural')) {
        if (rootVal.endsWith('eau') || rootVal.endsWith('eu')) rootVal += 'x';
        else if (!['s', 'x', 'z'].includes(rootVal.slice(-1))) rootVal += 's';
    }

    const firstChar = rootVal.charAt(0).toUpperCase();
    if (['A','E','I','O','U','Y','É','È'].includes(firstChar) && (p === 'Le' || p === 'La')) {
         p = "L'";
         word = `${p}${rootVal}`;
    } 
    else {
         word = `${p}-${rootVal}`;
    }
  }
  
  // 2. Root + Adjective
  else if (roll < 0.60) {
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      // EXPANSION: Universal Adjectives
      let adjTypes = ['adj_quality', 'adj_color'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
      const adjObj = getRandomElement(getPool(adjTypes));
      
      const rData = getRomData(rootObj.fr);
      let r = rData.val;
      const gender = rData.gender || 'm';
      
      const aData = getFrAdj(adjObj.fr);
      let a = (gender === 'f') ? aData.f : aData.m;
      
      if (adjObj.tags?.includes('pre')) {
          word = `${a}-${r}`;
      } else {
          word = `${r}-${a}`;
      }
  }
  
  // 3. Composite (de)
  else if (roll < 0.85) {
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Universal Tails
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
    
    let h = getRomData(headObj.fr).val;
    let t = getRomData(tailObj.fr).val;
    
    let link = "-de-";
    
    if (['A','E','I','O','U','Y','É','È'].includes(t.charAt(0).toUpperCase())) {
        link = "-d'";
    } 
    
    word = h + link + t;
  }
  
  // 4. Root + Suffix
  else {
    // EXPANSION: Allow Geo Major suffixing
    const rootObj = getRandomElement(getPool(['settlement', 'bio_flora', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));
    
    let base = getRomData(rootObj.fr).val.toLowerCase();
    const sVal = getRomData(suffixObj.fr).val;
    
    if (['a','e','i','o','u','y'].includes(base.slice(-1)) && ['a','e','i','o','u','y'].includes(sVal.charAt(0))) {
        base = base.slice(0, -1);
    }
    word = base + sVal;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateFrenchToAscii(word) };
};
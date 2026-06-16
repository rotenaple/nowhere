import { GeneratedResult } from "../../../types";
import { getRandomElement, transliteratePortugueseToAscii } from "../../utils";
import { ROMANCE_DATA, getRomData } from "../../dictionaries/romanceDict";

const getPool = (types: string[]) => 
  ROMANCE_DATA.filter(c => c.pt && types.includes(c.type));

export const getPortugueseCapacity = () => {
  const recipe1 = getPool(['prefix']).length * getPool(['abstract', 'bio_fauna', 'bio_flora']).length; 
  
  const nouns = getPool(['geo_major', 'geo_minor', 'settlement']);
  const allAdjs = getPool(['adj_geo', 'adj_color', 'adj_quality']);
  const recipe2 = nouns.length * allAdjs.length;
  
  const allTails = getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']);
  const recipe3 = nouns.length * allTails.length;
  
  return recipe1 + recipe2 + recipe3;
}

export const generatePortuguesePlace = (): GeneratedResult => {
  let word = "";
  const roll = Math.random();
  
  // 1. Saint / Prefix Pattern
  if (roll < 0.25) {
      const useSaint = Math.random() < 0.5;
      
      if (useSaint) {
        const saintTarget = getRandomElement(getPool(['bio_fauna', 'bio_flora', 'abstract']));
        const tData = getRomData(saintTarget.pt);
        const prefix = (tData.gender === 'f') ? 'Santa' : 'São';
        word = `${prefix} ${tData.val}`;
      } else {
        const prefixObj = getRandomElement(getPool(['prefix']));
        const commonPrefixRoots = getPool(['settlement', 'geo_major']).filter(r => r.tags?.includes('common_prefix'));
        
        let p = getRomData(prefixObj.pt).val;
        if (Math.random() < 0.6 && commonPrefixRoots.length > 0) {
             const rootAsPrefix = getRandomElement(commonPrefixRoots);
             p = getRomData(rootAsPrefix.pt).val;
        }
        
        // Combine with a noun or an adjective
        const tailObj = getRandomElement(getPool(['adj_quality', 'adj_color', 'bio_flora', 'settlement']));
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
  else if (roll < 0.60) {
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      // EXPANSION: Universal Adjectives
      let adjTypes = ['adj_quality', 'adj_color'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
      const adjObj = getRandomElement(getPool(adjTypes));
      
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
  else {
      const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
      // EXPANSION: Universal Tails
      const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
      
      const hData = getRomData(headObj.pt);
      const tData = getRomData(tailObj.pt);
      
      let connector = 'de';
      const useArticle = ['bio_fauna', 'geo_minor', 'geo_major', 'settlement'].includes(tailObj.type) || Math.random() < 0.7;
      
      if (useArticle) {
          if (tData.gender === 'f') connector = 'da';
          else connector = 'do';
      }

      word = `${hData.val} ${connector} ${tData.val}`;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliteratePortugueseToAscii(word) };
};
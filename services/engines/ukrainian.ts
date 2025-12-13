
import { GeneratedResult } from "../../types";
import { getRandomElement, transliterateUkrainianToAscii } from "../utils";
import { SLAVIC_DATA } from "../dictionaries/slavicDict";

export const getUkrainianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => c.uk && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => c.uk && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => c.uk && c.type === 'adjective');
   
   const c1 = roots.length * suffixes.length;
   const c2 = adjectives.length * roots.length;
   const c3 = adjectives.length * roots.length * suffixes.length;
   
   return c1 + c2 + c3;
}

export const generateUkrainianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => c.uk && c.type === t);
  const roots = [...getPool('root'), ...getPool('stem')];

  const type = Math.random();
  
  // 1. Adjective + Noun (e.g. Velykyi Bereznyi) or Adj + Derived
  if (type < 0.5) {
      const adj = getRandomElement(getPool('adjective'));
      
      let root = getRandomElement(getPool('root'));
      let isDerived = false;
      let suffix = null;

      if (Math.random() < 0.5) {
         const compatibleRoots = [...getPool('root'), ...getPool('stem')];
         root = getRandomElement(compatibleRoots);
         suffix = getRandomElement(getPool('suffix'));
         isDerived = true;
      }
      
      let gender = root.gender || 'm';
      if (isDerived && suffix) {
          if (suffix.uk!.endsWith('ka') || suffix.uk!.endsWith('na')) gender = 'f';
          else if (suffix.uk!.endsWith('ne')) gender = 'n';
          else gender = 'm';
      }

      let adjBase = adj.uk!;
      let cAdjBase = adj.uk_cyr!;
      
      let inflected = adjBase;
      let cInflected = cAdjBase;
      
      // Basic inflection rules
      if (gender === 'f') {
         if (adjBase.endsWith('yy')) { inflected = adjBase.replace('yy', 'a'); }
         else if (adjBase.endsWith('iy')) { inflected = adjBase.replace('iy', 'a'); }
         cInflected = cInflected.replace(/(ий|iй)$/,'а');
      } else if (gender === 'n') {
         if (adjBase.endsWith('yy')) { inflected = adjBase.replace('yy', 'e'); }
         else if (adjBase.endsWith('iy')) { inflected = adjBase.replace('iy', 'e'); }
         cInflected = cInflected.replace(/(ий|iй)$/,'е');
      }

      let nounAscii = root.uk!;
      let nounCyr = root.uk_cyr!;
      
      if (isDerived && suffix) {
          nounAscii += suffix.uk!;
          nounCyr += suffix.uk_cyr!;
      }

      wordAscii = `${inflected} ${nounAscii}`;
      wordCyrillic = `${cInflected} ${nounCyr}`;
  }
  // 2. Root + Suffix (e.g. Kharkiv, Chernihiv)
  else {
      const root = getRandomElement(roots);
      const suf = getRandomElement(getPool('suffix'));
      wordAscii = root.uk! + suf.uk!;
      wordCyrillic = root.uk_cyr! + suf.uk_cyr!;
  }

  if (!wordCyrillic || wordCyrillic.includes('undefined')) wordCyrillic = wordAscii;

  wordAscii = wordAscii.charAt(0).toUpperCase() + wordAscii.slice(1);
  wordCyrillic = wordCyrillic.charAt(0).toUpperCase() + wordCyrillic.slice(1);

  return { word: wordCyrillic, ascii: transliterateUkrainianToAscii(wordAscii) };
};
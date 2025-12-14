
import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateRussianToAscii } from "../../utils";
import { SLAVIC_DATA } from "../../dictionaries/slavicDict";

export const getRussianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => c.ru && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => c.ru && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => c.ru && c.type === 'adjective');
   
   // Capacity logic
   // 1. Root + Suffix (e.g. Saratov)
   const c1 = roots.length * suffixes.length;
   // 2. Adj + Root (e.g. Nizhniy Novgorod)
   const c2 = adjectives.length * roots.length;
   // 3. Adj + (Root + Suffix) (e.g. Novaya Ivanovka) - This is the big multiplier
   const c3 = adjectives.length * roots.length * suffixes.length;

   return c1 + c2 + c3;
}

export const generateRussianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => c.ru && c.type === t);
  const roots = [...getPool('root'), ...getPool('stem')];

  const type = Math.random();
  
  // 1. Adjective + Noun (e.g. Nizhniy Novgorod) or Adjective + DerivedNoun (Novaya Alekseyevka)
  if (type < 0.5) {
      const adj = getRandomElement(getPool('adjective'));
      
      let root = getRandomElement(getPool('root'));
      let isDerived = false;
      let suffix = null;

      // 50% Chance to add suffix to root (making it a derived name like Ivanovka)
      if (Math.random() < 0.5) {
         // Only use roots that are stems or suitable nouns
         const compatibleRoots = [...getPool('root'), ...getPool('stem')];
         root = getRandomElement(compatibleRoots);
         suffix = getRandomElement(getPool('suffix'));
         isDerived = true;
      }

      // Determine gender of the noun phrase
      let gender = root.gender || 'm';
      
      // If derived with suffix, gender depends on suffix
      if (isDerived && suffix) {
          if (suffix.ru!.endsWith('a') || suffix.ru!.endsWith('ka')) gender = 'f';
          else if (suffix.ru!.endsWith('o') || suffix.ru!.endsWith('no')) gender = 'n';
          else gender = 'm';
      }

      let adjBase = adj.ru!;
      let cAdjBase = adj.ru_cyr!;
      
      // Inflect adjective
      // Dict form is Masc (-iy)
      let inflected = adjBase;
      let cInflected = cAdjBase;

      if (gender === 'f') {
          if (adjBase.endsWith('iy')) {
             inflected = adjBase.replace('iy', 'aya');
             cInflected = cInflected.replace(/(ий|ый)$/, 'ая');
          }
      } else if (gender === 'n') {
          if (adjBase.endsWith('iy')) {
             inflected = adjBase.replace('iy', 'oye');
             cInflected = cInflected.replace(/(ий|ый)$/, 'ое');
          }
      }

      let nounAscii = root.ru!;
      let nounCyr = root.ru_cyr!;
      
      if (isDerived && suffix) {
          nounAscii += suffix.ru!;
          nounCyr += suffix.ru_cyr!;
      }

      wordAscii = `${inflected} ${nounAscii}`;
      wordCyrillic = `${cInflected} ${nounCyr}`;
  }
  // 2. Root + Suffix (e.g. Moskov, Saratov)
  else if (type < 0.85) {
      const root = getRandomElement(roots);
      const suf = getRandomElement(getPool('suffix'));
      wordAscii = root.ru! + suf.ru!;
      wordCyrillic = root.ru_cyr! + suf.ru_cyr!;
  }
  // 3. City on River (e.g. Rostov-na-Donu)
  else {
       const root = getRandomElement(roots);
       const river = getRandomElement(getPool('river'));
       wordAscii = `${root.ru!}-na-${river.ru!}`;
       wordCyrillic = `${root.ru_cyr!}-на-${river.ru_cyr!}`;
  }
  
  // Fallback if Cyrillic missing
  if (!wordCyrillic || wordCyrillic.includes('undefined')) {
      wordCyrillic = wordAscii; 
  }

  // Capitalize
  wordAscii = wordAscii.charAt(0).toUpperCase() + wordAscii.slice(1);
  wordCyrillic = wordCyrillic.charAt(0).toUpperCase() + wordCyrillic.slice(1);

  return { word: wordCyrillic, ascii: transliterateRussianToAscii(wordAscii) };
};
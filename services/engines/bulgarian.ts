
import { GeneratedResult } from "../../types";
import { getRandomElement, transliterateBulgarianToAscii } from "../utils";
import { SLAVIC_DATA } from "../dictionaries/slavicDict";

export const getBulgarianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => c.bg && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => c.bg && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => c.bg && c.type === 'adjective');
   
   // 1. Root + Suffix (e.g. Gabrovo)
   const c1 = roots.length * suffixes.length;
   // 2. Adjective + Root (e.g. Stara Zagora, Veliko Tarnovo)
   const c2 = adjectives.length * roots.length;
   // 3. Adjective + (Root + Suffix) (e.g. Dolna Mitropolija)
   const c3 = adjectives.length * roots.length * suffixes.length;

   return c1 + c2 + c3;
}

export const generateBulgarianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => c.bg && c.type === t);
  const roots = [...getPool('root'), ...getPool('stem')];

  const type = Math.random();
  
  // 1. Adjective + Noun (e.g. Veliko Tarnovo, Stara Zagora) or Adj + Derived
  if (type < 0.60) {
      const adj = getRandomElement(getPool('adjective'));
      
      let root = getRandomElement(getPool('root'));
      let isDerived = false;
      let suffix = null;

      // Optional: Add suffix to root to make it a derived place (e.g. Dolna Banya)
      if (Math.random() < 0.4) {
         const compatibleRoots = [...getPool('root'), ...getPool('stem')];
         root = getRandomElement(compatibleRoots);
         suffix = getRandomElement(getPool('suffix'));
         isDerived = true;
      }
      
      let gender = root.gender || 'm'; 
      
      // If derived, suffix determines gender
      if (isDerived && suffix) {
          if (suffix.bg!.endsWith('a') || suffix.bg!.endsWith('iya')) gender = 'f';
          else if (suffix.bg!.endsWith('o') || suffix.bg!.endsWith('e')) gender = 'n';
          else gender = 'm';
      }

      let adjBase = adj.bg!;
      let cAdjBase = adj.bg_cyr!;
      
      let inflected = adjBase;
      let cInflected = cAdjBase;

      // Inflect Adjective
      if (gender === 'f') {
         // bg dict adj usually masc (Nov, Star, Golyam) -> Nova, Stara, Golyama
         inflected += 'a';
         cInflected += 'а';
         
         // Fleeting vowel check (simple heuristic)
         if (inflected.includes('ak')) inflected = inflected.replace('aka', 'ka'); // Malak -> Malka
         if (cInflected.includes('ък')) cInflected = cInflected.replace('ъка', 'ка');
      } else if (gender === 'n') {
         inflected += 'o';
         cInflected += 'о';
         
         if (inflected.includes('ako')) inflected = inflected.replace('ako', 'ko'); // Malko
         if (cInflected.includes('ъко')) cInflected = cInflected.replace('ъко', 'ко');
      }

      let nounAscii = root.bg!;
      let nounCyr = root.bg_cyr!;
      
      if (isDerived && suffix) {
          // Truncate vowel endings for suffix attachment if needed
          if (['a','e','o'].includes(nounAscii.slice(-1))) nounAscii = nounAscii.slice(0, -1);
          if (/[аео]$/.test(nounCyr)) nounCyr = nounCyr.slice(0, -1);

          nounAscii += suffix.bg;
          nounCyr += suffix.bg_cyr;
      }

      wordAscii = `${inflected} ${nounAscii}`;
      wordCyrillic = `${cInflected} ${nounCyr}`;
  }
  // 2. Root + Suffix (e.g. Plovdiv, Gabrovo, Pernik)
  else {
      const root = getRandomElement(roots);
      const suf = getRandomElement(getPool('suffix'));
      let base = root.bg!;
      let cBase = root.bg_cyr!;
      
      // Truncate vowel endings for suffix
      if (['a','e','o'].includes(base.slice(-1))) base = base.slice(0, -1);
      if (/[аео]$/.test(cBase)) cBase = cBase.slice(0, -1);

      wordAscii = base + suf.bg;
      wordCyrillic = cBase + suf.bg_cyr;
  }

  if (!wordCyrillic || wordCyrillic.includes('undefined')) wordCyrillic = wordAscii;

  wordAscii = wordAscii.charAt(0).toUpperCase() + wordAscii.slice(1);
  wordCyrillic = wordCyrillic.charAt(0).toUpperCase() + wordCyrillic.slice(1);

  return { word: wordCyrillic, ascii: transliterateBulgarianToAscii(wordAscii) };
};

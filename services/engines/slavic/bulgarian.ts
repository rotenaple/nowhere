import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateBulgarianToAscii } from "../../utils";
import { SLAVIC_DATA } from "../../dictionaries/slavicDict";

export const getBulgarianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => c.bg && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => c.bg && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => c.bg && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => c.bg && c.type === 'river');

   // Path 1 (Adj + (Root + optional Suffix))
   // This path can generate Adj + Root OR Adj + Root + Suffix
   const path1_adj_root = adjectives.length * roots.length;
   const path1_adj_rootsuf = adjectives.length * roots.length * suffixes.length;

   // Path 2 (Root + Suffix)
   const path2_rootsuf = roots.length * suffixes.length;

   // Path 3 ((Root + optional Suffix) + "na" + River)
   // This path can generate Root + na + River OR Root + Suffix + na + River
   const path3_root_river = roots.length * rivers.length;
   const path3_rootsuf_river = roots.length * suffixes.length * rivers.length;

   return path1_adj_root + path1_adj_rootsuf + path2_rootsuf + path3_root_river + path3_rootsuf_river;
}

export const generateBulgarianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => c.bg && c.type === t);
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rootsAndStems = [...getPool('root'), ...getPool('stem')];
  const rivers = getPool('river'); // Added rivers pool

  const typeRoll = Math.random();
  
  // Helper to inflect adjective (more robust for Bulgarian)
  const inflectBulgarianAdjective = (adjBase: string, cAdjBase: string, gender: string): [string, string] => {
      let inflected = adjBase;
      let cInflected = cAdjBase;

      // Handle common '-en' adjectives (Cheren -> Cherna, Cherno)
      if (adjBase.endsWith('en')) {
          if (gender === 'f') {
              inflected = adjBase.slice(0, -2) + 'na'; // e.g., Cheren -> Cherna
              cInflected = cAdjBase.slice(0, -2) + 'на'; // e.g., Черен -> Черна
          } else if (gender === 'n') {
              inflected = adjBase.slice(0, -2) + 'no'; // e.g., Cherno
              cInflected = cAdjBase.slice(0, -2) + 'но'; // e.g., Черно
          }
      } else {
        // Fallback or other adjective patterns
        if (gender === 'f') {
           inflected += 'a';
           cInflected += 'а';
           // Fleeting vowel check (simple heuristic for 'ak' -> 'ka' or 'ok' -> 'ka' types)
           if (adjBase.endsWith('ak')) { // Malak -> Malka
               inflected = adjBase.slice(0, -2) + 'ka';
               cInflected = cAdjBase.slice(0, -2) + 'ка';
           } else if (adjBase.endsWith('ok')) { // Visok -> Visoka
               inflected = adjBase.slice(0, -2) + 'ka';
               cInflected = cAdjBase.slice(0, -2) + 'ка';
           }
        } else if (gender === 'n') {
           inflected += 'o';
           cInflected += 'о';
           if (adjBase.endsWith('ak')) { // Malak -> Malko
               inflected = adjBase.slice(0, -2) + 'ko';
               cInflected = cAdjBase.slice(0, -2) + 'ко';
           } else if (adjBase.endsWith('ok')) { // Visok -> Visoko
               inflected = adjBase.slice(0, -2) + 'ko';
               cInflected = cAdjBase.slice(0, -2) + 'ко';
           }
        }
      }
      return [inflected, cInflected];
  }

  // 1. Adjective + Noun (e.g. Stara Zagora) or Adj + Derived Noun (e.g. Dolna Banya)
  if (typeRoll < 0.45) { // Increased probability
      const adj = getRandomElement(adjectives);
      
      let root = getRandomElement(rootsAndStems);
      let isDerived = false;
      let suffix = null;

      // Optional: Add suffix to root to make it a derived place (e.g. Dolna Mitropolija)
      if (Math.random() < 0.5) { // 50% chance to be derived
         root = getRandomElement(rootsAndStems); // Pick another root/stem for the base
         suffix = getRandomElement(suffixes);
         isDerived = true;
      }
      
      let baseNounAscii = root.bg!;
      let baseNounCyr = root.bg_cyr!;

      // Determine gender of the final noun entity
      let effectiveGender = root.gender;
      if (isDerived && suffix) {
          // Simple gender guess based on common suffix endings
          if (suffix.bg!.endsWith('a') || suffix.bg!.endsWith('itsa') || suffix.bg!.endsWith('ina')) effectiveGender = 'f';
          else if (suffix.bg!.endsWith('o') || suffix.bg!.endsWith('ovo') || suffix.bg!.endsWith('ishte')) effectiveGender = 'n';
          else if (suffix.bg!.endsWith('ets') || suffix.bg!.endsWith('nik')) effectiveGender = 'm';
          // If suffix doesn't strongly indicate, try base noun
          if (!effectiveGender) effectiveGender = root.gender;
      }
      // If still no gender set, default to masculine
      if (!effectiveGender) effectiveGender = 'm';
      
      const [inflectedAdj, cInflectedAdj] = inflectBulgarianAdjective(adj.bg!, adj.bg_cyr!, effectiveGender);

      // Construct the noun part (root + optional suffix)
      let finalNounAscii = baseNounAscii;
      let finalNounCyr = baseNounCyr;
      
      if (isDerived && suffix) {
          // Truncate vowel endings from root if necessary before suffix attachment
          if (['a','e','o'].includes(finalNounAscii.slice(-1)) && !suffix.bg!.startsWith('v') && !suffix.bg!.startsWith('s')) { // Avoid truncating before 'ov/ev'
              finalNounAscii = finalNounAscii.slice(0, -1);
          }
          if (/[аео]$/.test(finalNounCyr) && !suffix.bg_cyr!.startsWith('в') && !suffix.bg_cyr!.startsWith('с')) {
              finalNounCyr = finalNounCyr.slice(0, -1);
          }

          finalNounAscii += suffix.bg;
          finalNounCyr += suffix.bg_cyr;
      }

      wordAscii = `${inflectedAdj} ${finalNounAscii}`;
      wordCyrillic = `${cInflectedAdj} ${finalNounCyr}`;
  }
  // 2. Root + Suffix (e.g. Gabrovo, Pernik)
  else if (typeRoll < 0.75) { // Increased probability
      const root = getRandomElement(rootsAndStems);
      const suf = getRandomElement(suffixes);
      let base = root.bg!;
      let cBase = root.bg_cyr!;
      
      // Truncate vowel endings from root before suffix attachment
      if (['a','e','o'].includes(base.slice(-1)) && !suf.bg!.startsWith('v') && !suf.bg!.startsWith('s')) {
          base = base.slice(0, -1);
      }
      if (/[аео]$/.test(cBase) && !suf.bg_cyr!.startsWith('в') && !suf.bg_cyr!.startsWith('с')) {
          cBase = cBase.slice(0, -1);
      }

      wordAscii = base + suf.bg;
      wordCyrillic = cBase + suf.bg_cyr;
  }
  // 3. Base + na + River (e.g., Kozloduy na Dunav, Krichim na Vicha) - New pattern
  else {
      const baseRoot = getRandomElement(rootsAndStems);
      const river = getRandomElement(rivers);

      let basePartAscii = baseRoot.bg!;
      let basePartCyr = baseRoot.bg_cyr!;

      // 50% chance to add a suffix to the base for river construction
      if (Math.random() < 0.5) {
          const suffix = getRandomElement(suffixes);
          // Simplified vowel truncation for this case
          if (['a','e','o'].includes(basePartAscii.slice(-1))) basePartAscii = basePartAscii.slice(0, -1);
          if (/[аео]$/.test(basePartCyr)) basePartCyr = basePartCyr.slice(0, -1);
          basePartAscii += suffix.bg;
          basePartCyr += suffix.bg_cyr;
      }
      
      wordAscii = `${basePartAscii} na ${river.bg!}`;
      wordCyrillic = `${basePartCyr} на ${river.bg_cyr!}`;
  }

  if (!wordCyrillic || wordCyrillic.includes('undefined')) wordCyrillic = wordAscii;

  // Capitalize first letter of each word
  wordAscii = wordAscii.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  wordCyrillic = wordCyrillic.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');


  return { word: wordCyrillic, ascii: transliterateBulgarianToAscii(wordAscii) };
};
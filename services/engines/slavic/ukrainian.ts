import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateUkrainianToAscii } from "../../utils";
import { SLAVIC_DATA } from "../../dictionaries/slavicDict";

export const getUkrainianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => c.uk && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => c.uk && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => c.uk && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => c.uk && c.type === 'river');

   // Path 1 (Adj + (Root + optional Suffix))
   // This path can generate Adj + Root OR Adj + Root + Suffix
   const path1_adj_root = adjectives.length * roots.length;
   const path1_adj_rootsuf = adjectives.length * roots.length * suffixes.length;

   // Path 2 (Root + Suffix)
   const path2_rootsuf = roots.length * suffixes.length;

   // Path 3 ((Root + optional Suffix) + "nad/po" + River)
   // This path can generate Root + nad/po + River OR Root + Suffix + nad/po + River
   const path3_root_river = roots.length * rivers.length;
   const path3_rootsuf_river = roots.length * suffixes.length * rivers.length;
   
   return path1_adj_root + path1_adj_rootsuf + path2_rootsuf + path3_root_river + path3_rootsuf_river;
}

export const generateUkrainianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => c.uk && c.type === t);
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rootsAndStems = [...getPool('root'), ...getPool('stem')];
  const rivers = getPool('river'); // Added rivers pool

  const typeRoll = Math.random();
  
  // Helper to inflect Ukrainian adjective (more detailed)
  const inflectUkrainianAdjective = (adjBase: string, cAdjBase: string, gender: string): [string, string] => {
      let inflected = adjBase;
      let cInflected = cAdjBase;

      // Adjectives ending in -yy (masc) -> -a (fem), -e (neut)
      // Adjectives ending in -iy (masc) -> -ya (fem), -ye (neut) - less common but exists
      // Some nuances: 'chy' often inflects with '-a', '-e' without 'y'
      if (adjBase.endsWith('yy')) {
         if (gender === 'f') { inflected = adjBase.slice(0, -2) + 'a'; cInflected = cInflected.slice(0, -2) + 'а'; }
         else if (gender === 'n') { inflected = adjBase.slice(0, -2) + 'e'; cInflected = cInflected.slice(0, -2) + 'е'; }
      } else if (adjBase.endsWith('iy')) {
         if (gender === 'f') { inflected = adjBase.slice(0, -2) + 'ya'; cInflected = cInflected.slice(0, -2) + 'я'; }
         else if (gender === 'n') { inflected = adjBase.slice(0, -2) + 'ye'; cInflected = cInflected.slice(0, -2) + 'є'; }
      } else if (cInflected.endsWith('ий')) { // Catch any remaining -ий and inflect
         if (gender === 'f') { cInflected = cInflected.slice(0, -2) + 'а'; inflected = inflected.slice(0, -2) + 'a'; }
         else if (gender === 'n') { cInflected = cInflected.slice(0, -2) + 'е'; inflected = inflected.slice(0, -2) + 'e'; }
      }
      return [inflected, cInflected];
  }

  // 1. Adjective + Noun (e.g. Nova Kakhovka) or Adj + Derived Noun (e.g. Velyki Luchky)
  if (typeRoll < 0.45) { // Increased probability for more variations
      const adj = getRandomElement(adjectives);
      
      let root = getRandomElement(rootsAndStems);
      let isDerived = false;
      let suffix = null;

      if (Math.random() < 0.5) { // 50% chance to be derived
         root = getRandomElement(rootsAndStems); // Pick another root/stem
         suffix = getRandomElement(suffixes);
         isDerived = true;
      }
      
      let baseNounAscii = root.uk!;
      let baseNounCyr = root.uk_cyr!;

      // Determine gender of the final noun entity
      let effectiveGender = root.gender;
      if (isDerived && suffix) {
          // Simple gender guess based on common suffix endings
          if (suffix.uk!.endsWith('a') || suffix.uk!.endsWith('ka') || suffix.uk!.endsWith('tsia')) effectiveGender = 'f';
          else if (suffix.uk!.endsWith('o') || suffix.uk!.endsWith('ovo') || suffix.uk!.endsWith('ishche')) effectiveGender = 'n';
          else if (suffix.uk!.endsWith('ets') || suffix.uk!.endsWith('nyk')) effectiveGender = 'm';
          // If suffix doesn't strongly indicate, try base noun
          if (!effectiveGender) effectiveGender = root.gender;
      }
      // If still no gender set, default to masculine
      if (!effectiveGender) effectiveGender = 'm';
      
      const [inflectedAdj, cInflectedAdj] = inflectUkrainianAdjective(adj.uk!, adj.uk_cyr!, effectiveGender);

      let finalNounAscii = baseNounAscii;
      let finalNounCyr = baseNounCyr;
      
      if (isDerived && suffix) {
          // Truncate vowel endings from root if necessary before suffix attachment
          if (['a','e','o'].includes(finalNounAscii.slice(-1)) && !suffix.uk!.startsWith('v') && !suffix.uk!.startsWith('s')) {
              finalNounAscii = finalNounAscii.slice(0, -1);
          }
          if (/[аео]$/.test(finalNounCyr) && !suffix.uk_cyr!.startsWith('в') && !suffix.uk_cyr!.startsWith('с')) {
              finalNounCyr = finalNounCyr.slice(0, -1);
          }
          finalNounAscii += suffix.uk;
          finalNounCyr += suffix.uk_cyr;
      }

      wordAscii = `${inflectedAdj} ${finalNounAscii}`;
      wordCyrillic = `${cInflectedAdj} ${finalNounCyr}`;
  }
  // 2. Root + Suffix (e.g. Kharkiv, Lutsk)
  else if (typeRoll < 0.75) { // Increased probability
      const root = getRandomElement(rootsAndStems);
      const suf = getRandomElement(suffixes);
      let base = root.uk!;
      let cBase = root.uk_cyr!;
      
      // Truncate vowel endings from root before suffix attachment
      if (['a','e','o'].includes(base.slice(-1)) && !suf.uk!.startsWith('v') && !suf.uk!.startsWith('s')) {
          base = base.slice(0, -1);
      }
      if (/[аео]$/.test(cBase) && !suf.uk_cyr!.startsWith('в') && !suf.uk_cyr!.startsWith('с')) {
          cBase = cBase.slice(0, -1);
      }

      wordAscii = base + suf.uk;
      wordCyrillic = cBase + suf.uk_cyr;
  }
  // 3. Base + nad/po + River (e.g., Ternopil na Sereti, Kyyiv nad Dniprom) - New pattern
  else {
      const baseRoot = getRandomElement(rootsAndStems);
      const river = getRandomElement(rivers);
      
      let preposition = 'nad'; // "над"
      let cPreposition = 'над';

      // Example: 'Ternopil na Sereti' (on the Seret, often 'nad' transliterates to 'na' for consistency)
      // Sometimes 'po' for along the river, but 'nad' is very common for "on/above"
      if (river.uk! === 'Dniprom') { // Specific river uses specific preposition
        preposition = 'nad'; // Дніпром -> над Дніпром (locative case)
        cPreposition = 'над';
      }
      // Note: This needs the river to be in the instrumental/locative case,
      // which 'Dniprom' already is. Most of your current river entries are already in an oblique case.

      let basePartAscii = baseRoot.uk!;
      let basePartCyr = baseRoot.uk_cyr!;

      // 50% chance to add a suffix to the base for river construction
      if (Math.random() < 0.5) {
          const suffix = getRandomElement(suffixes);
          // Simplified vowel truncation
          if (['a','e','o'].includes(basePartAscii.slice(-1))) basePartAscii = basePartAscii.slice(0, -1);
          if (/[аео]$/.test(basePartCyr)) basePartCyr = basePartCyr.slice(0, -1);
          basePartAscii += suffix.uk;
          basePartCyr += suffix.uk_cyr;
      }
      
      wordAscii = `${basePartAscii} ${preposition} ${river.uk!}`;
      wordCyrillic = `${basePartCyr} ${cPreposition} ${river.uk_cyr!}`;
  }

  if (!wordCyrillic || wordCyrillic.includes('undefined')) wordCyrillic = wordAscii;

  // Capitalize first letter of each word
  wordAscii = wordAscii.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  wordCyrillic = wordCyrillic.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return { word: wordCyrillic, ascii: transliterateUkrainianToAscii(wordAscii) };
};
import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateBulgarianToAscii, getSlavicData, inflectSlavicAdjective, hasLanguageEntry } from "../../utils"; // Assuming utils has getRandomElement
import { SLAVIC_DATA, SlavicComponent} from "../../dictionaries/slavicDict"; // Using the new dict

export const getBulgarianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === 'river');


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

  // Get filtered pools using the new structure
  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === t);
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rootsAndStems = [...getPool('root'), ...getPool('stem')];
  const rivers = getPool('river');

  const typeRoll = Math.random();
  
  // Helper to determine the effective gender of a noun phrase
  const getEffectiveGender = (
      baseComponent: SlavicComponent,
      isDerived: boolean,
      suffixComponent: SlavicComponent | null
  ): 'm' | 'f' | 'n' => {
      const baseInfo = getSlavicData(baseComponent.bg);
      let effectiveGender: 'm' | 'f' | 'n' | undefined = baseInfo.gender;

      if (isDerived && suffixComponent) {
          const suffixInfo = getSlavicData(suffixComponent.bg);
          // Suffix gender is generally stronger IF defined.
          if (suffixInfo.gender) {
              effectiveGender = suffixInfo.gender;
          }
          // If suffix doesn't explicitly define gender, assume it retains base noun's gender for simplicity
          // or rely on previous heuristic if suffix's gender isn't in dict (e.g. 'a', 'o', 'ets')
          else if (suffixInfo.src) { // Fallback to heuristic if suffix doesn't have explicit gender
            if (suffixInfo.src.endsWith('а') || suffixInfo.src.endsWith('ица') || suffixInfo.src.endsWith('ина')) effectiveGender = 'f';
            else if (suffixInfo.src.endsWith('о') || suffixInfo.src.endsWith('ово') || suffixInfo.src.endsWith('ище')) effectiveGender = 'n';
            else if (suffixInfo.src.endsWith('ец') || suffixInfo.src.endsWith('ник')) effectiveGender = 'm';
          }
      }
      return effectiveGender || 'm'; // Default to masculine if no gender info
  };


  // 1. Adjective + Noun (or Derived Noun)
  if (typeRoll < 0.45) {
      const selectedAdj = getRandomElement(adjectives);
      let selectedRoot = getRandomElement(rootsAndStems);
      let isDerived = false;
      let selectedSuffix: SlavicComponent | null = null;

      if (Math.random() < 0.5) {
         selectedRoot = getRandomElement(rootsAndStems);
         selectedSuffix = getRandomElement(suffixes);
         isDerived = true;
      }
      
      const effectiveGender = getEffectiveGender(selectedRoot, isDerived, selectedSuffix);
      const { src: inflectedAdjSrc, rom: inflectedAdjRom } = inflectSlavicAdjective(selectedAdj.bg!, effectiveGender, 'bg');

      // Construct the noun part (root + optional suffix)
      const rootInfo = getSlavicData(selectedRoot.bg);
      let finalNounSrc = rootInfo.src;
      let finalNounRom = rootInfo.rom || transliterateBulgarianToAscii(rootInfo.src); // Ensure rom is there

      if (isDerived && selectedSuffix) {
          const suffixInfo = getSlavicData(selectedSuffix.bg!);
          // Truncate vowel endings from root if necessary before suffix attachment
          if (['а','е','о'].includes(finalNounSrc.slice(-1)) && !['ов','ев','ск'].some(s => suffixInfo.src.startsWith(s))) {
              finalNounSrc = finalNounSrc.slice(0, -1);
          }
          if (['a','e','o'].includes(finalNounRom.slice(-1)) && !['ov','ev','sk'].some(s => suffixInfo.rom!.startsWith(s))) {
              finalNounRom = finalNounRom.slice(0, -1);
          }

          finalNounSrc += suffixInfo.src;
          finalNounRom += suffixInfo.rom;
      }

      wordCyrillic = `${inflectedAdjSrc} ${finalNounSrc}`;
      wordAscii = `${inflectedAdjRom} ${finalNounRom}`;
  }
  // 2. Root + Suffix
  else if (typeRoll < 0.75) {
      const selectedRoot = getRandomElement(rootsAndStems);
      const selectedSuffix = getRandomElement(suffixes);
      
      const rootInfo = getSlavicData(selectedRoot.bg);
      const suffixInfo = getSlavicData(selectedSuffix.bg!);

      let baseSrc = rootInfo.src;
      let baseRom = rootInfo.rom || transliterateBulgarianToAscii(rootInfo.src);
      
      // Truncate vowel endings from root before suffix attachment
       if (['а','е','о'].includes(baseSrc.slice(-1)) && !['ов','ев','ск'].some(s => suffixInfo.src.startsWith(s))) {
            baseSrc = baseSrc.slice(0, -1);
        }
        if (['a','e','o'].includes(baseRom.slice(-1)) && !['ov','ev','sk'].some(s => suffixInfo.rom!.startsWith(s))) {
            baseRom = baseRom.slice(0, -1);
        }

      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;
  }
  // 3. Base + "na" + River
  else {
      const baseRootComponent = getRandomElement(rootsAndStems);
      const selectedRiver = getRandomElement(rivers);

      const baseRootInfo = getSlavicData(baseRootComponent.bg);
      let basePartSrc = baseRootInfo.src;
      let basePartRom = baseRootInfo.rom || transliterateBulgarianToAscii(baseRootInfo.src);

      // 50% chance to add a suffix to the base for river construction
      if (Math.random() < 0.5) {
          const selectedSuffix = getRandomElement(suffixes);
          const suffixInfo = getSlavicData(selectedSuffix.bg!);
          
          if (['а','е','о'].includes(basePartSrc.slice(-1)) && !['ов','ев','ск'].some(s => suffixInfo.src.startsWith(s))) {
              basePartSrc = basePartSrc.slice(0, -1);
          }
          if (['a','e','o'].includes(basePartRom.slice(-1)) && !['ov','ev','sk'].some(s => suffixInfo.rom!.startsWith(s))) {
              basePartRom = basePartRom.slice(0, -1);
          }
          basePartSrc += suffixInfo.src;
          basePartRom += suffixInfo.rom;
      }
      
      const riverInfo = getSlavicData(selectedRiver.bg!);
      wordCyrillic = `${basePartSrc} на ${riverInfo.src}`;
      wordAscii = `${basePartRom} na ${riverInfo.rom}`; // Assuming 'na' is universal
  }

  // Ensure rom is always present for final output, using transliteration if absent
  if (!wordAscii || wordAscii.includes('undefined')) wordAscii = transliterateBulgarianToAscii(wordCyrillic);

  wordCyrillic = wordCyrillic.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  wordAscii = wordAscii.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return { word: wordCyrillic, ascii: wordAscii };
};
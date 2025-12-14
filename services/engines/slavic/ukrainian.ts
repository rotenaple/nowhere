import { GeneratedResult } from "../../../types";
import { getRandomElement, getSlavicData, inflectSlavicAdjective, hasLanguageEntry } from "../../utils"; // Assuming utils has getRandomElement
import { SLAVIC_DATA, SlavicComponent} from "../../dictionaries/slavicDict"; // Using the new dict

export const getUkrainianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === 'river');
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

export const generateUkrainianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === t);
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
      const baseInfo = getSlavicData(baseComponent.uk);
      let effectiveGender: 'm' | 'f' | 'n' | undefined = baseInfo.gender;

      if (isDerived && suffixComponent) {
          const suffixInfo = getSlavicData(suffixComponent.uk);
          if (suffixInfo.gender) {
              effectiveGender = suffixInfo.gender;
          }
          // Ukrainian specific heuristic fallback for suffixes if not explicit gender
          else if (suffixInfo.src) {
              if (suffixInfo.src.endsWith('а') || suffixInfo.src.endsWith('ка') || suffixInfo.src.endsWith('ця')) effectiveGender = 'f';
              else if (suffixInfo.src.endsWith('о') || suffixInfo.src.endsWith('ово') || suffixInfo.src.endsWith('ще')) effectiveGender = 'n';
              else if (suffixInfo.src.endsWith('ець') || suffixInfo.src.endsWith('ник')) effectiveGender = 'm';
              else effectiveGender = 'm'; // Default for other endings
          }
      }
      return effectiveGender || 'm';
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
      const { src: inflectedAdjSrc, rom: inflectedAdjRom } = inflectSlavicAdjective(selectedAdj.uk!, effectiveGender, 'uk');

      // Construct the noun part (root + optional suffix)
      const rootInfo = getSlavicData(selectedRoot.uk);
      let finalNounSrc = rootInfo.src;
      let finalNounRom = rootInfo.rom!;

      if (isDerived && selectedSuffix) {
          const suffixInfo = getSlavicData(selectedSuffix.uk!);
          // Truncate vowel endings from root if necessary before suffix attachment
          if (['а','е','о'].includes(finalNounSrc.slice(-1)) && !['ів','ев','ськ'].some(s => suffixInfo.src.startsWith(s))) {
              finalNounSrc = finalNounSrc.slice(0, -1);
          }
          if (['a','e','o'].includes(finalNounRom.slice(-1)) && !['iv','ev','sk'].some(s => suffixInfo.rom!.startsWith(s))) {
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
      
      const rootInfo = getSlavicData(selectedRoot.uk);
      const suffixInfo = getSlavicData(selectedSuffix.uk!);

      let baseSrc = rootInfo.src;
      let baseRom = rootInfo.rom!;
      
      if (['а','е','о'].includes(baseSrc.slice(-1)) && !['ів','ев','ськ'].some(s => suffixInfo.src.startsWith(s))) {
            baseSrc = baseSrc.slice(0, -1);
        }
        if (['a','e','o'].includes(baseRom.slice(-1)) && !['iv','ev','sk'].some(s => suffixInfo.rom!.startsWith(s))) {
            baseRom = baseRom.slice(0, -1);
        }
      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;
  }
  // 3. Base + "nad/po" + River
  else {
      const baseRootComponent = getRandomElement(rootsAndStems);
      const selectedRiver = getRandomElement(rivers);
      
      const baseRootInfo = getSlavicData(baseRootComponent.uk);
      let basePartSrc = baseRootInfo.src;
      let basePartRom = baseRootInfo.rom!;

      if (Math.random() < 0.5) {
          const selectedSuffix = getRandomElement(suffixes);
          const suffixInfo = getSlavicData(selectedSuffix.uk!);

          if (['а','е','о'].includes(basePartSrc.slice(-1)) && !['ів','ев','ськ'].some(s => suffixInfo.src.startsWith(s))) {
            basePartSrc = basePartSrc.slice(0, -1);
          }
          if (['a','e','o'].includes(basePartRom.slice(-1)) && !['iv','ev','sk'].some(s => suffixInfo.rom!.startsWith(s))) {
            basePartRom = basePartRom.slice(0, -1);
          }
          basePartSrc += suffixInfo.src;
          basePartRom += suffixInfo.rom;
      }
      
      const riverInfo = getSlavicData(selectedRiver.uk!);
      let prepositionSrc = 'над'; // Default
      let prepositionRom = 'nad'; // Default
      
      // If river is Dnipro, specific preposition for historical reasons (like in original)
      if (riverInfo.src === 'Дніпро' && riverInfo.rom === 'Dnipro') {
          prepositionSrc = 'на'; // On the Dnipro (на Дніпрі, but here it's more like "X on river Y")
          prepositionRom = 'na';
      }

      wordCyrillic = `${basePartSrc} ${prepositionSrc} ${riverInfo.src}`;
      wordAscii = `${basePartRom} ${prepositionRom} ${riverInfo.rom}`;
  }

  // Final capitalization and ASCII generation
  wordCyrillic = wordCyrillic.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  wordAscii = wordAscii.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return { word: wordCyrillic, ascii: wordAscii };
};
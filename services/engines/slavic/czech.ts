import { GeneratedResult } from "../../../types";
import { getRandomElement, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, transliterateCzechToAscii } from "../../utils";
import { SLAVIC_DATA, SlavicComponent} from "../../dictionaries/slavicDict"; 


export const getCzechCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && c.type === 'river');

   const path1_adj_root = adjectives.length * roots.length;
   const path1_adj_rootsuf = adjectives.length * roots.length * suffixes.length;

   const path2_rootsuf = roots.length * suffixes.length;

   const path3_root_river = roots.length * rivers.length;
   const path3_rootsuf_river = roots.length * suffixes.length * rivers.length;

   return path1_adj_root + path1_adj_rootsuf + path2_rootsuf + path3_root_river + path3_rootsuf_river;
}


export const generateCzechPlace = (): GeneratedResult => {
  let wordSrc = ""; 
  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const riversLoc = getPool('river_loc');

  const typeRoll = Math.random();
  
  const getEffectiveGender = (
      baseComponent: SlavicComponent,
      isDerived: boolean,
      suffixComponent: SlavicComponent | null
  ): 'm' | 'f' | 'n' => {
      const baseInfo = getSlavicData(baseComponent.cs);
      let effectiveGender: 'm' | 'f' | 'n' | undefined = baseInfo.gender;

      if (isDerived && suffixComponent) {
          const suffixInfo = getSlavicData(suffixComponent.cs);
          if (suffixInfo.gender) {
              effectiveGender = suffixInfo.gender;
          }
          else if (suffixInfo.src) {
              if (suffixInfo.src.endsWith('a') || suffixInfo.src.endsWith('ice')) effectiveGender = 'f';
              else if (suffixInfo.src.endsWith('o') || suffixInfo.src.endsWith('tí') || suffixInfo.src.endsWith('e')) effectiveGender = 'n';
              else effectiveGender = 'm'; // Default for other endings
          }
      }
      return effectiveGender || 'm';
  };

  // 1. Adjective + Noun (or Derived Noun)
  if (typeRoll < 0.35) {
    const selectedAdj = getRandomElement(adjectives);
    const selectedRootComponent = getRandomElement(rootsAndStems);

    let isDerived = false;
    let selectedSuffix: SlavicComponent | null = null;
    if (Math.random() < 0.5) { // 50% chance to derive the noun further
        selectedSuffix = getRandomElement(suffixes);
        isDerived = true;
    }

    const effectiveGender = getEffectiveGender(selectedRootComponent, isDerived, selectedSuffix);
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.cs!, effectiveGender, 'cs');
    
    // Construct the noun part (root + optional suffix)
    const rootInfo = getSlavicData(selectedRootComponent.cs);
    let finalNounSrc = rootInfo.src;

    if (isDerived && selectedSuffix) {
        const suffixInfo = getSlavicData(selectedSuffix.cs!);
        
        // Aggressive Vowel Truncation
        // If Root ends in vowel AND Suffix starts with vowel
        const rootEndsInVowel = ['a','e','i','o','u','y','á','é','í','ý','ů'].includes(finalNounSrc.slice(-1));
        const suffixStartsVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(suffixInfo.src.charAt(0));

        if (rootEndsInVowel && suffixStartsVowel) {
            finalNounSrc = finalNounSrc.slice(0, -1);
        }

        finalNounSrc += suffixInfo.src;
    }

    wordSrc = `${inflectedAdjSrc} ${finalNounSrc}`;
  }
  // 2. Root + Suffix
  else if (typeRoll < 0.65) {
    const selectedRoot = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const rootInfo = getSlavicData(selectedRoot.cs);
    const suffixInfo = getSlavicData(selectedSuffix.cs!);

    let baseSrc = rootInfo.src;

    if (['a','e','i','o','u','y','á','é','í','ý','ů'].includes(baseSrc.slice(-1)) && !['ov','ín'].some(s => suffixInfo.src.startsWith(s)) ) {
        baseSrc = baseSrc.slice(0, -1);
    }
    
    wordSrc = baseSrc + suffixInfo.src;
  }
  // 3. Adjective + (Root + Suffix)
  else if (typeRoll < 0.85) {
    const selectedAdj = getRandomElement(adjectives);
    const selectedRootComponent = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const effectiveGender = getEffectiveGender(selectedRootComponent, true, selectedSuffix);
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.cs!, effectiveGender, 'cs');

    const rootInfo = getSlavicData(selectedRootComponent.cs);
    const suffixInfo = getSlavicData(selectedSuffix.cs!);

    let derivedNounSrc = rootInfo.src;
    
    if (['a','e','i','o','u','y','á','é','í','ý','ů'].includes(derivedNounSrc.slice(-1)) && !['ov','ín'].some(s => suffixInfo.src.startsWith(s)) ) {
        derivedNounSrc = derivedNounSrc.slice(0, -1);
    }

    derivedNounSrc += suffixInfo.src;

    wordSrc = `${inflectedAdjSrc} ${derivedNounSrc}`;
  }
  // 4. [Base] nad [River]
  else {
    const baseRootComponent = getRandomElement(rootsAndStems);
    const selectedRiver = getRandomElement(riversLoc);
    
    const baseRootInfo = getSlavicData(baseRootComponent.cs);
    const riverInfo = getSlavicData(selectedRiver.cs!);
    
    let baseSrc = baseRootInfo.src;

    if (Math.random() < 0.6) { // Optionally add suffix
        const selectedSuffix = getRandomElement(suffixes);
        const suffixInfo = getSlavicData(selectedSuffix.cs!);

        if (['a','e','i','o','u','y','á','é','í','ý','ů'].includes(baseSrc.slice(-1)) && !['ov','ín'].some(s => suffixInfo.src.startsWith(s)) ) {
            baseSrc = baseSrc.slice(0, -1);
        }

        baseSrc += suffixInfo.src;
    }
    
    wordSrc = `${baseSrc} nad ${riverInfo.src}`;
  }

  // Final capitalization
  wordSrc = wordSrc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const wordAscii = transliterateCzechToAscii(wordSrc);

  return { word: wordSrc, ascii: wordAscii };
};
import { GeneratedResult } from "../../../types";
import { getRandomElement, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, transliterateCzechToAscii, getCompositeAttributes } from "../../utils";
import { SLAVIC_DATA, SlavicComponent} from "../../dictionaries/slavicDict"; 
import { capitalizeSlavicName } from "../../utils";

export const getCzechCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && c.type === 'river');

   return (adjectives.length * roots.length * suffixes.length) + (roots.length * suffixes.length) + (roots.length * rivers.length);
}

export const generateCzechPlace = (): GeneratedResult => {
  let wordSrc = ""; 
  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.cs) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const riversLoc = getPool('river_loc');

  const typeRoll = Math.random();
  
  // 1. Adjective + Noun (or Derived Noun)
  if (typeRoll < 0.35) {
    const selectedAdj = getRandomElement(adjectives);
    const selectedRootComponent = getRandomElement(rootsAndStems);

    let isDerived = false;
    let selectedSuffix: SlavicComponent | null = null;
    if (Math.random() < 0.5) { 
        selectedSuffix = getRandomElement(suffixes);
        isDerived = true;
    }

    // UPDATED: Get attributes including number
    const { gender, number } = getCompositeAttributes(selectedRootComponent.cs, isDerived ? selectedSuffix?.cs : undefined);
    
    // UPDATED: Pass number
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.cs!, gender, 'cs', number);
    
    const rootInfo = getSlavicData(selectedRootComponent.cs);
    let finalNounSrc = rootInfo.src;

    if (isDerived && selectedSuffix) {
        const suffixInfo = getSlavicData(selectedSuffix.cs!);
        
        // Aggressive Vowel Truncation
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

    const suffixStartsVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(suffixInfo.src.charAt(0));
    const isOvIn = ['ov', 'ín', 'in'].some(s => suffixInfo.src.startsWith(s));

    if (['a','e','i','o','u','y','á','é','í','ý','ů'].includes(baseSrc.slice(-1)) && (suffixStartsVowel || isOvIn)) {
        baseSrc = baseSrc.slice(0, -1);
    }
    
    wordSrc = baseSrc + suffixInfo.src;
  }
  // 3. Adjective + (Root + Suffix) - Explicit Path
  else if (typeRoll < 0.85) {
    const selectedAdj = getRandomElement(adjectives);
    const selectedRootComponent = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const { gender, number } = getCompositeAttributes(selectedRootComponent.cs, selectedSuffix.cs);
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.cs!, gender, 'cs', number);

    const rootInfo = getSlavicData(selectedRootComponent.cs);
    const suffixInfo = getSlavicData(selectedSuffix.cs!);

    let derivedNounSrc = rootInfo.src;
    
    const suffixStartsVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(suffixInfo.src.charAt(0));
    const isOvIn = ['ov', 'ín', 'in'].some(s => suffixInfo.src.startsWith(s));

    if (['a','e','i','o','u','y','á','é','í','ý','ů'].includes(derivedNounSrc.slice(-1)) && (suffixStartsVowel || isOvIn)) {
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

        const suffixStartsVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(suffixInfo.src.charAt(0));
        const isOvIn = ['ov', 'ín', 'in'].some(s => suffixInfo.src.startsWith(s));

        if (['a','e','i','o','u','y','á','é','í','ý','ů'].includes(baseSrc.slice(-1)) && (suffixStartsVowel || isOvIn)) {
            baseSrc = baseSrc.slice(0, -1);
        }

        baseSrc += suffixInfo.src;
    }
    
    wordSrc = `${baseSrc} nad ${riverInfo.src}`;
  }

  wordSrc = wordSrc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const wordAscii = transliterateCzechToAscii(wordSrc);

  return { word: capitalizeSlavicName(wordSrc, 'cs'), ascii: capitalizeSlavicName(wordAscii, 'cs') };
};
import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateSlovakToAscii, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, getCompositeGender } from "../../utils"; 
import { SLAVIC_DATA, SlavicComponent } from "../../dictionaries/slavicDict"; 

export const getSlovakCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === 'river');
   
   const path1 = adjectives.length * roots.length * suffixes.length;
   const path2 = roots.length * suffixes.length;
   const path3 = roots.length * rivers.length;

   return path1 + path2 + path3;
}

export const generateSlovakPlace = (): GeneratedResult => {
  let wordSrc = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === t);
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

    const effectiveGender = getCompositeGender(selectedRootComponent.sk, selectedSuffix?.sk, 'sk');
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.sk!, effectiveGender, 'sk');

    const rootInfo = getSlavicData(selectedRootComponent.sk);
    let finalNounSrc = rootInfo.src;

    if (isDerived && selectedSuffix) {
        const suffixInfo = getSlavicData(selectedSuffix.sk!);
        // Aggressive Vowel Truncation
        const rootEndsInVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(finalNounSrc.slice(-1));
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
    
    const rootInfo = getSlavicData(selectedRoot.sk);
    const suffixInfo = getSlavicData(selectedSuffix.sk!);

    let baseSrc = rootInfo.src;
    const rootEndsInVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(baseSrc.slice(-1));
    const suffixStartsVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(suffixInfo.src.charAt(0));

    if (rootEndsInVowel && suffixStartsVowel) {
        baseSrc = baseSrc.slice(0, -1);
    }
    wordSrc = baseSrc + suffixInfo.src;
  }
  // 3. Adjective + (Root + Suffix) - Explicit Path
  else if (typeRoll < 0.85) {
    const selectedAdj = getRandomElement(adjectives);
    const selectedRootComponent = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const effectiveGender = getCompositeGender(selectedRootComponent.sk, selectedSuffix.sk, 'sk');
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.sk!, effectiveGender, 'sk');

    const rootInfo = getSlavicData(selectedRootComponent.sk);
    const suffixInfo = getSlavicData(selectedSuffix.sk!);

    let derivedNounSrc = rootInfo.src;
    const rootEndsInVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(derivedNounSrc.slice(-1));
    const suffixStartsVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(suffixInfo.src.charAt(0));

    if (rootEndsInVowel && suffixStartsVowel) {
        derivedNounSrc = derivedNounSrc.slice(0, -1);
    }
    derivedNounSrc += suffixInfo.src;

    wordSrc = `${inflectedAdjSrc} ${derivedNounSrc}`;
  }
  // 4. [Base] nad [River]
  else {
    const baseRootComponent = getRandomElement(rootsAndStems);
    const selectedRiver = getRandomElement(riversLoc);
    
    const baseRootInfo = getSlavicData(baseRootComponent.sk);
    let baseSrc = baseRootInfo.src;

    if (Math.random() < 0.6) { // Optionally add suffix
        const selectedSuffix = getRandomElement(suffixes);
        const suffixInfo = getSlavicData(selectedSuffix.sk!);
        const rootEndsInVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(baseSrc.slice(-1));
        const suffixStartsVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(suffixInfo.src.charAt(0));

        if (rootEndsInVowel && suffixStartsVowel) {
            baseSrc = baseSrc.slice(0, -1);
        }
        baseSrc += suffixInfo.src;
    }
    
    const riverInfo = getSlavicData(selectedRiver.sk!);
    wordSrc = `${baseSrc} nad ${riverInfo.src}`;
  }

  const capitalize = (s: string) => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const wordAscii = transliterateSlovakToAscii(wordSrc);

  return { word: wordSrc, ascii: wordAscii };
};
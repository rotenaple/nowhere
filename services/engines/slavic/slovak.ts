import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateSlovakToAscii, getSlavicData, inflectSlavicAdjective, hasLanguageEntry } from "../../utils"; // Assuming utils has getRandomElement
import { SLAVIC_DATA, SlavicComponent} from "../../dictionaries/slavicDict"; // Using the new dict

export const getSlovakCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === 'river');
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

export const generateSlovakPlace = (): GeneratedResult => {
  let wordSrc = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rivers = getPool('river');

  const typeRoll = Math.random();
  
  // Helper to determine the effective gender of a noun phrase
  const getEffectiveGender = (
      baseComponent: SlavicComponent,
      isDerived: boolean,
      suffixComponent: SlavicComponent | null
  ): 'm' | 'f' | 'n' => {
      const baseInfo = getSlavicData(baseComponent.sk);
      let effectiveGender: 'm' | 'f' | 'n' | undefined = baseInfo.gender;

      if (isDerived && suffixComponent) {
          const suffixInfo = getSlavicData(suffixComponent.sk);
          if (suffixInfo.gender) {
              effectiveGender = suffixInfo.gender;
          }
          // Slovak specific heuristic fallback for suffixes if not explicit gender
          else if (suffixInfo.src) {
              if (suffixInfo.src.endsWith('a') || suffixInfo.src.endsWith('ica')) effectiveGender = 'f';
              else if (suffixInfo.src.endsWith('o') || suffixInfo.src.endsWith('ie')) effectiveGender = 'n';
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
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.sk!, effectiveGender, 'sk');

    // Construct the noun part (root + optional suffix)
    const rootInfo = getSlavicData(selectedRootComponent.sk);
    let finalNounSrc = rootInfo.src;

    if (isDerived && selectedSuffix) {
        const suffixInfo = getSlavicData(selectedSuffix.sk!);
        // Truncate logic
        if (['a','e','i','o','u','y','á','é','í','ý'].includes(finalNounSrc.slice(-1)) && !['ov','ín'].some(s => suffixInfo.src.startsWith(s)) ) {
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
    if (['a','e','i','o','u','y','á','é','í','ý'].includes(baseSrc.slice(-1)) && !['ov','ín'].some(s => suffixInfo.src.startsWith(s)) ) {
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
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.sk!, effectiveGender, 'sk');

    const rootInfo = getSlavicData(selectedRootComponent.sk);
    const suffixInfo = getSlavicData(selectedSuffix.sk!);

    let derivedNounSrc = rootInfo.src;
    if (['a','e','i','o','u','y','á','é','í','ý'].includes(derivedNounSrc.slice(-1)) && !['ov','ín'].some(s => suffixInfo.src.startsWith(s)) ) {
        derivedNounSrc = derivedNounSrc.slice(0, -1);
    }
    derivedNounSrc += suffixInfo.src;

    wordSrc = `${inflectedAdjSrc} ${derivedNounSrc}`;
  }
  // 4. [Base] nad [River]
  else {
    const baseRootComponent = getRandomElement(rootsAndStems);
    const selectedRiver = getRandomElement(rivers);
    
    const baseRootInfo = getSlavicData(baseRootComponent.sk);
    let baseSrc = baseRootInfo.src;

    if (Math.random() < 0.6) { // Optionally add suffix
        const selectedSuffix = getRandomElement(suffixes);
        const suffixInfo = getSlavicData(selectedSuffix.sk!);
        if (['a','e','i','o','u','y','á','é','í','ý'].includes(baseSrc.slice(-1)) && !['ov','ín'].some(s => suffixInfo.src.startsWith(s)) ) {
            baseSrc = baseSrc.slice(0, -1);
        }
        baseSrc += suffixInfo.src;
    }
    
    const riverInfo = getSlavicData(selectedRiver.sk!);
    wordSrc = `${baseSrc} nad ${riverInfo.src}`;
  }

  // Final capitalization and ASCII generation
  wordSrc = wordSrc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const wordAscii = transliterateSlovakToAscii(wordSrc);

  return { word: wordSrc, ascii: wordAscii };
};
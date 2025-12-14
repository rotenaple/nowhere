import { GeneratedResult } from "../../../types";
import { getRandomElement, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, transliteratePolishToAscii } from "../../utils"; // Assuming utils has getRandomElement
import { SLAVIC_DATA, SlavicComponent} from "../../dictionaries/slavicDict"; // Using the new dict

export const getPolishCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && c.type === 'river');
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

export const generatePolishPlace = (): GeneratedResult => {
  let wordSrc = ""; // Polish is Latin script, so 'word' becomes 'wordSrc'

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  
  // Helper to determine the effective gender of a noun phrase
  const getEffectiveGender = (
      baseComponent: SlavicComponent,
      isDerived: boolean,
      suffixComponent: SlavicComponent | null
  ): 'm' | 'f' | 'n' => {
      const baseInfo = getSlavicData(baseComponent.pl);
      let effectiveGender: 'm' | 'f' | 'n' | undefined = baseInfo.gender;

      if (isDerived && suffixComponent) {
          const suffixInfo = getSlavicData(suffixComponent.pl);
          if (suffixInfo.gender) {
              effectiveGender = suffixInfo.gender;
          }
          // Polish specific heuristic fallback for suffixes if not explicit gender
          else if (suffixInfo.src) {
            if (suffixInfo.src.endsWith('a') || suffixInfo.src.endsWith('ica') || suffixInfo.src === 'wieś') effectiveGender = 'f';
            else if (suffixInfo.src.endsWith('o') || suffixInfo.src.endsWith('isko')) effectiveGender = 'n';
            else effectiveGender = 'm'; // Default for other endings
          }
      }
      return effectiveGender || 'm';
  };

  // 1. Adjective + (Root + Suffix) - can be compound or separate
  if (Math.random() < 0.45) {
    const selectedAdj = getRandomElement(adjectives);
    const selectedRootComponent = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const effectiveGender = getEffectiveGender(selectedRootComponent, true, selectedSuffix);
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.pl!, effectiveGender, 'pl');
    
    const rootInfo = getSlavicData(selectedRootComponent.pl);
    const suffixInfo = getSlavicData(selectedSuffix.pl!);

    let derivedNounSrc = rootInfo.src;
    
    // Truncate root vowel if suffix starts with vowel
    if (['a','e','o'].includes(derivedNounSrc.slice(-1)) && ['a','e','i','o','u'].includes(suffixInfo.src.charAt(0))) {
        derivedNounSrc = derivedNounSrc.slice(0, -1);
    }
    
    // Compounding logic
    if (Math.random() < 0.6) { // Separate: [Adj] [Derived Noun]
        derivedNounSrc += suffixInfo.src;
        wordSrc = `${inflectedAdjSrc} ${derivedNounSrc}`;
    } else { // Compound: often drop the adjective ending -> Białystok
        let adjStem = getSlavicData(selectedAdj.pl).src.slice(0, -1); // Now-, Star-, Biał-
        let connector = 'o'; // Default connector 'o'
        if (adjStem.endsWith('iał') || adjStem.endsWith('yst')) connector = 'y'; // e.g. Białystok
        
        let lowerRootSrc = rootInfo.src.toLowerCase();
        
        // Truncate root vowel for suffix attachment in compound
        if (['a','e','o'].includes(lowerRootSrc.slice(-1)) && ['a','e','i','o','u'].includes(suffixInfo.src.charAt(0))) {
            lowerRootSrc = lowerRootSrc.slice(0, -1);
        }
        wordSrc = `${adjStem}${connector}${lowerRootSrc}${suffixInfo.src}`;
    }
  }
  // 2. Root + Suffix
  else {
    const selectedRoot = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const rootInfo = getSlavicData(selectedRoot.pl);
    const suffixInfo = getSlavicData(selectedSuffix.pl!);
    
    let baseSrc = rootInfo.src;
    if (['a','e','o'].includes(baseSrc.slice(-1)) && ['a','e','i','o','u'].includes(suffixInfo.src.charAt(0))) {
        baseSrc = baseSrc.slice(0, -1);
    }
    wordSrc = baseSrc + suffixInfo.src;
  }

  wordSrc = wordSrc.replace(/(.)\1+/g, '$1'); // De-dupe chars like 'oo'
  wordSrc = wordSrc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const wordAscii = transliteratePolishToAscii(wordSrc);

  
  return { word: wordSrc, ascii: wordAscii };
};
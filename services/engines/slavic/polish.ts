import { GeneratedResult } from "../../../types";
import { getRandomElement, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, transliteratePolishToAscii, getCompositeGender } from "../../utils";
import { SLAVIC_DATA, SlavicComponent } from "../../dictionaries/slavicDict";

export const getPolishCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && c.type === 'river');
   
   const path1 = adjectives.length * roots.length * suffixes.length; // Adj + Derived
   const path2 = roots.length * suffixes.length; // Root + Suf
   const path3 = roots.length * rivers.length; // Root + River

   return path1 + path2 + path3;
}

export const generatePolishPlace = (): GeneratedResult => {
  let wordSrc = ""; 

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const riversLoc = getPool('river_loc');
  
  const typeRoll = Math.random();

  // 1. Adjective + (Root + Suffix)
  if (typeRoll < 0.45) {
    const selectedAdj = getRandomElement(adjectives);
    const selectedRootComponent = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    // Determine gender of the Noun part
    const effectiveGender = getCompositeGender(selectedRootComponent.pl, selectedSuffix.pl, 'pl');
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.pl!, effectiveGender, 'pl');
    
    const rootInfo = getSlavicData(selectedRootComponent.pl);
    const suffixInfo = getSlavicData(selectedSuffix.pl!);

    let derivedNounSrc = rootInfo.src;
    
    if (suffixInfo.src.startsWith('sk') && ['a','e','i','o','u','y'].includes(derivedNounSrc.slice(-1))) {
        derivedNounSrc = derivedNounSrc.slice(0, -1);
    }

    // Vowel truncation
    const rootEndsInVowel = ['a','e','i','o','u','y'].includes(derivedNounSrc.slice(-1));
    const suffixStartsVowel = ['a','e','i','o','u','y'].includes(suffixInfo.src.charAt(0));
    
    if (rootEndsInVowel && suffixStartsVowel) {
        derivedNounSrc = derivedNounSrc.slice(0, -1);
    }
    
    // Separate: [Adj] [Derived Noun]
    if (Math.random() < 0.6) { 
        derivedNounSrc += suffixInfo.src;
        wordSrc = `${inflectedAdjSrc} ${derivedNounSrc}`;
    } 
    // Compound: (Białystok style)
    else { 
        let adjStem = getSlavicData(selectedAdj.pl).src.slice(0, -1); // Now-, Star-
        let connector = 'o'; 
        // Heuristic: stems ending in hard consonants + 'iał' usually take 'y'
        if (adjStem.endsWith('iał') || adjStem.endsWith('yst')) connector = 'y'; 
        
        let lowerRootSrc = rootInfo.src.toLowerCase();
        
        // Truncate root vowel for suffix attachment in compound
        const compoundRootEndsVowel = ['a','e','o'].includes(lowerRootSrc.slice(-1));
        if (compoundRootEndsVowel && suffixStartsVowel) {
            lowerRootSrc = lowerRootSrc.slice(0, -1);
        }
        wordSrc = `${adjStem}${connector}${lowerRootSrc}${suffixInfo.src}`;
    }
  }
  // 2. Root + Suffix
  else if (typeRoll < 0.8) {
    const selectedRoot = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const rootInfo = getSlavicData(selectedRoot.pl);
    const suffixInfo = getSlavicData(selectedSuffix.pl!);
    
    let baseSrc = rootInfo.src;
    const rootEndsInVowel = ['a','e','i','o','u','y'].includes(baseSrc.slice(-1));
    const suffixStartsVowel = ['a','e','i','o','u','y'].includes(suffixInfo.src.charAt(0));

    if (rootEndsInVowel && suffixStartsVowel) {
        baseSrc = baseSrc.slice(0, -1);
    }
    wordSrc = baseSrc + suffixInfo.src;
  }
  // 3. Base + nad + River (Instrumental)
  else {
    const baseRootComponent = getRandomElement(rootsAndStems);
    const selectedRiver = getRandomElement(riversLoc);
    
    const rootInfo = getSlavicData(baseRootComponent.pl);
    const riverInfo = getSlavicData(selectedRiver.pl!);
    
    wordSrc = `${rootInfo.src} nad ${riverInfo.src}`;
  }

  wordSrc = wordSrc.replace(/(.)\1+/g, '$1'); // De-dupe
  const capitalize = (s: string) => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const wordAscii = transliteratePolishToAscii(wordSrc);
  
  return { word: capitalize(wordSrc), ascii: capitalize(wordAscii) };
};
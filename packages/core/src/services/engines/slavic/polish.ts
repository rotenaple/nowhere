import { GeneratedResult } from "../../../types";
import { getRandomElement, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, transliteratePolishToAscii, getCompositeAttributes } from "../../utils";
import { SLAVIC_DATA } from "../../dictionaries/slavicDict";
import { capitalizeSlavicName } from "../../utils";

export const getPolishCapacity = () => {
  const set = new Set<string>();
  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.pl) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rivers = getPool('river');

  // Recipe 1: Adjective + Noun
  for (const adjObj of adjectives) {
    for (const rootObj of rootsAndStems) {
      for (const suffixObj of suffixes) {
        const rData = getSlavicData(rootObj.pl);
        const sData = getSlavicData(suffixObj.pl);
        
        let gender: 'm' | 'f' | 'n' = 'm';
        if (suffixObj.tags?.includes('gender_f')) gender = 'f';
        else if (suffixObj.tags?.includes('gender_n')) gender = 'n';
        else if (rootObj.tags?.includes('gender_f')) gender = 'f';

        const isPlural = suffixObj.tags?.includes('plural') || false;
        const adjInflected = inflectSlavicAdjective(adjObj.pl!, gender, 'pl', isPlural ? 'pl' : 'sg');
        
        let combinedBase = rData.src;
        if (['a','o','e','i','y'].includes(combinedBase.slice(-1)) && ['a','o','e','i','y','ě'].includes(sData.src.charAt(0))) {
          combinedBase = combinedBase.slice(0, -1);
        }
        set.add((adjInflected.src + " " + combinedBase + sData.src).trim().toLowerCase());
      }
    }
  }

  // Recipe 2: Suffixed Root
  for (const rootObj of rootsAndStems) {
    for (const suffixObj of suffixes) {
      const rData = getSlavicData(rootObj.pl);
      const sData = getSlavicData(suffixObj.pl);
      let combinedBase = rData.src;
      if (['a','o','e','i','y'].includes(combinedBase.slice(-1)) && ['a','o','e','i','y','ě'].includes(sData.src.charAt(0))) {
        combinedBase = combinedBase.slice(0, -1);
      }
      set.add((combinedBase + sData.src).trim().toLowerCase());
    }
  }

  // Recipe 3: River Locative
  for (const rootObj of rootsAndStems) {
    for (const riverObj of rivers) {
      const rData = getSlavicData(rootObj.pl);
      const rivData = getSlavicData(riverObj.pl);
      const connectors = [' na ', ' nad ', ' pod ', ' u '];
      for (const conn of connectors) {
        set.add((rData.src + conn + rivData.src).trim().toLowerCase());
      }
    }
  }

  return set.size;
}

export const generatePolishPlace = (): GeneratedResult => {
  let wordSrc = ""; 
  let rule = "";
  let components: string[] = [];

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
    
    // UPDATED: Get attributes
    const { gender, number } = getCompositeAttributes(selectedRootComponent.pl, selectedSuffix.pl);
    
    // UPDATED: Pass number
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.pl!, gender, 'pl', number);
    
    const rootInfo = getSlavicData(selectedRootComponent.pl);
    const suffixInfo = getSlavicData(selectedSuffix.pl!);

    let derivedNounSrc = rootInfo.src;
    
    if (suffixInfo.src.startsWith('sk') && ['a','e','i','o','u','y'].includes(derivedNounSrc.slice(-1))) {
        derivedNounSrc = derivedNounSrc.slice(0, -1);
    }

    const rootEndsInVowel = ['a','e','i','o','u','y'].includes(derivedNounSrc.slice(-1));
    if (rootEndsInVowel) {
        derivedNounSrc = derivedNounSrc.slice(0, -1);
    }
    
    components.push(JSON.stringify(selectedAdj), JSON.stringify(selectedRootComponent), JSON.stringify(selectedSuffix));
    // Separate: [Adj] [Derived Noun]
    if (Math.random() < 0.6) { 
        rule = "Adjective + Noun";
        derivedNounSrc += suffixInfo.src;
        wordSrc = `${inflectedAdjSrc} ${derivedNounSrc}`;
    } 
    // Compound: (Białystok style)
    else { 
        rule = "Compound Noun";
        let adjStem = getSlavicData(selectedAdj.pl).src.slice(0, -1); // Now-, Star-
        let connector = 'o'; 
        if (adjStem.endsWith('iał') || adjStem.endsWith('yst')) connector = 'y'; 
        
        let lowerRootSrc = rootInfo.src.toLowerCase();
        
        const compoundRootEndsVowel = ['a','e','o'].includes(lowerRootSrc.slice(-1));
        if (compoundRootEndsVowel) {
            lowerRootSrc = lowerRootSrc.slice(0, -1);
        }
        wordSrc = `${adjStem}${connector}${lowerRootSrc}${suffixInfo.src}`;
    }
  }
  // 2. Root + Suffix
  else if (typeRoll < 0.8) {
    rule = "Root + Suffix";
    const selectedRoot = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const rootInfo = getSlavicData(selectedRoot.pl);
    const suffixInfo = getSlavicData(selectedSuffix.pl!);
    
    let baseSrc = rootInfo.src;
    const rootEndsInVowel = ['a','e','i','o','u','y'].includes(baseSrc.slice(-1));

    if (rootEndsInVowel) {
        baseSrc = baseSrc.slice(0, -1);
    }
    wordSrc = baseSrc + suffixInfo.src;
    components.push(JSON.stringify(selectedRoot), JSON.stringify(selectedSuffix));
  }
  // 3. Base + nad + River (Instrumental)
  else {
    rule = "Base + River Locative";
    const baseRootComponent = getRandomElement(rootsAndStems);
    const selectedRiver = getRandomElement(riversLoc);
    
    const rootInfo = getSlavicData(baseRootComponent.pl);
    const riverInfo = getSlavicData(selectedRiver.pl!);
    
    wordSrc = `${rootInfo.src} nad ${riverInfo.src}`;
    components.push(JSON.stringify(baseRootComponent), JSON.stringify(selectedRiver));
  }

  wordSrc = wordSrc.replace(/(.)\1+/g, '$1'); // De-dupe
  const wordAscii = transliteratePolishToAscii(wordSrc);
  
  return { 
    word: capitalizeSlavicName(wordSrc, 'pl'), 
    ascii: capitalizeSlavicName(wordAscii, 'pl'),
    generationRules: [rule],
    dictionaryComponents: components
  };
};
import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateSlovakToAscii, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, getCompositeAttributes } from "../../utils"; 
import { SLAVIC_DATA, SlavicComponent } from "../../dictionaries/slavicDict"; 
import { capitalizeSlavicName } from "../../utils";

export const getSlovakCapacity = () => {
  const set = new Set<string>();
  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rivers = getPool('river');

  // Recipe 1: Adjective + Noun
  for (const adjObj of adjectives) {
    for (const rootObj of rootsAndStems) {
      for (const suffixObj of suffixes) {
        const rData = getSlavicData(rootObj.sk);
        const sData = getSlavicData(suffixObj.sk);
        
        let gender: 'm' | 'f' | 'n' = 'm';
        if (suffixObj.tags?.includes('gender_f')) gender = 'f';
        else if (suffixObj.tags?.includes('gender_n')) gender = 'n';
        else if (rootObj.tags?.includes('gender_f')) gender = 'f';

        const isPlural = suffixObj.tags?.includes('plural') || false;
        const adjInflected = inflectSlavicAdjective(adjObj.sk!, gender, 'sk', isPlural ? 'pl' : 'sg');
        
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
      const rData = getSlavicData(rootObj.sk);
      const sData = getSlavicData(suffixObj.sk);
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
      const rData = getSlavicData(rootObj.sk);
      const rivData = getSlavicData(riverObj.sk);
      const connectors = [' na ', ' nad ', ' pod ', ' u '];
      for (const conn of connectors) {
        set.add((rData.src + conn + rivData.src).trim().toLowerCase());
      }
    }
  }

  return set.size;
}

export const generateSlovakPlace = (): GeneratedResult => {
  let wordSrc = "";
  let rule = "";
  let components: string[] = [];

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.sk) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const riversLoc = getPool('river_loc');

  const typeRoll = Math.random();
  
  // 1. Adjective + Noun (or Derived Noun)
  if (typeRoll < 0.35) {
    rule = "Adjective + Noun";
    const selectedAdj = getRandomElement(adjectives);
    const selectedRootComponent = getRandomElement(rootsAndStems);
    
    let isDerived = false;
    let selectedSuffix: SlavicComponent | null = null;
    if (Math.random() < 0.5) { 
        selectedSuffix = getRandomElement(suffixes);
        isDerived = true;
    }

    let shiftedSuffixSk = isDerived ? selectedSuffix?.sk : undefined;
    let suffixSrc = "";
    if (isDerived && selectedSuffix) {
        const suffixInfo = getSlavicData(selectedSuffix.sk!);
        suffixSrc = suffixInfo.src;
        if (suffixSrc === 'ov' && Math.random() < 0.08) {
            suffixSrc = 'ovo';
            shiftedSuffixSk = [['ovo'], 'n'];
        }
    }

    // UPDATED
    const { gender, number } = getCompositeAttributes(selectedRootComponent.sk, shiftedSuffixSk);
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.sk!, gender, 'sk', number);

    const rootInfo = getSlavicData(selectedRootComponent.sk);
    let finalNounSrc = rootInfo.src;

    if (isDerived && selectedSuffix) {
        const rootEndsInVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(finalNounSrc.slice(-1));
        const suffixStartsVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(suffixSrc.charAt(0));

        if (rootEndsInVowel) {
            finalNounSrc = finalNounSrc.slice(0, -1);
        }
        finalNounSrc += suffixSrc;
    }

    wordSrc = `${inflectedAdjSrc} ${finalNounSrc}`;
    components.push(JSON.stringify(selectedAdj), JSON.stringify(selectedRootComponent));
    if (selectedSuffix) components.push(JSON.stringify(selectedSuffix));
  }
  // 2. Root + Suffix 
  else if (typeRoll < 0.65) {
    rule = "Root + Suffix";
    const selectedRoot = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const rootInfo = getSlavicData(selectedRoot.sk);
    const suffixInfo = getSlavicData(selectedSuffix.sk!);

    let baseSrc = rootInfo.src;
    let suffixSrc = suffixInfo.src;

    if (suffixSrc === 'ov' && Math.random() < 0.08) {
        suffixSrc = 'ovo';
    }

    const rootEndsInVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(baseSrc.slice(-1));

    if (rootEndsInVowel) {
        baseSrc = baseSrc.slice(0, -1);
    }
    wordSrc = baseSrc + suffixSrc;
    components.push(JSON.stringify(selectedRoot), JSON.stringify(selectedSuffix));
  }
  // 3. Adjective + (Root + Suffix) - Explicit Path
  else if (typeRoll < 0.85) {
    rule = "Adjective + (Root + Suffix)";
    const selectedAdj = getRandomElement(adjectives);
    const selectedRootComponent = getRandomElement(rootsAndStems);
    const selectedSuffix = getRandomElement(suffixes);
    
    const suffixInfo = getSlavicData(selectedSuffix.sk!);
    let suffixSrc = suffixInfo.src;
    let shiftedSuffixSk = selectedSuffix.sk;

    if (suffixSrc === 'ov' && Math.random() < 0.08) {
        suffixSrc = 'ovo';
        shiftedSuffixSk = [['ovo'], 'n'];
    }

    // UPDATED
    const { gender, number } = getCompositeAttributes(selectedRootComponent.sk, shiftedSuffixSk);
    const { src: inflectedAdjSrc } = inflectSlavicAdjective(selectedAdj.sk!, gender, 'sk', number);

    const rootInfo = getSlavicData(selectedRootComponent.sk);

    let derivedNounSrc = rootInfo.src;
    const rootEndsInVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(derivedNounSrc.slice(-1));
    const suffixStartsVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(suffixSrc.charAt(0));

    if (rootEndsInVowel) {
        derivedNounSrc = derivedNounSrc.slice(0, -1);
    }
    derivedNounSrc += suffixSrc;

    wordSrc = `${inflectedAdjSrc} ${derivedNounSrc}`;
    components.push(JSON.stringify(selectedAdj), JSON.stringify(selectedRootComponent), JSON.stringify(selectedSuffix));
  }
  // 4. [Base] nad [River]
  else {
    rule = "[Base] nad [River]";
    const baseRootComponent = getRandomElement(rootsAndStems);
    const selectedRiver = getRandomElement(riversLoc);
    
    const baseRootInfo = getSlavicData(baseRootComponent.sk);
    let baseSrc = baseRootInfo.src;

    let selectedSuffix: any = null;
    if (Math.random() < 0.6) { // Optionally add suffix
        selectedSuffix = getRandomElement(suffixes);
        const suffixInfo = getSlavicData(selectedSuffix.sk!);
        let suffixSrc = suffixInfo.src;

        if (suffixSrc === 'ov' && Math.random() < 0.08) {
            suffixSrc = 'ovo';
        }

        const rootEndsInVowel = ['a','e','i','o','u','y','á','é','í','ý'].includes(baseSrc.slice(-1));

        if (rootEndsInVowel) {
            baseSrc = baseSrc.slice(0, -1);
        }
        baseSrc += suffixSrc;
    }
    
    const riverInfo = getSlavicData(selectedRiver.sk!);
    wordSrc = `${baseSrc} nad ${riverInfo.src}`;
    components.push(JSON.stringify(baseRootComponent), JSON.stringify(selectedRiver));
    if (selectedSuffix) components.push(JSON.stringify(selectedSuffix));
  }

  const wordAscii = transliterateSlovakToAscii(wordSrc);

  return { word: capitalizeSlavicName(wordSrc, 'sk'), ascii: capitalizeSlavicName(wordAscii, 'sk'), generationRules: [rule], dictionaryComponents: components };
};
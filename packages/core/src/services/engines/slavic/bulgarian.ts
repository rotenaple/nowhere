import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateBulgarianToAscii, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, getCompositeAttributes } from "../../utils";
import { SLAVIC_DATA, SlavicComponent } from "../../dictionaries/slavicDict";
import { capitalizeSlavicName } from "../../utils";

export const getBulgarianCapacity = () => {
  const set = new Set<string>();
  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rivers = getPool('river');

  // Recipe 1: Adjective + Noun
  for (const adjObj of adjectives) {
    for (const rootObj of rootsAndStems) {
      for (const suffixObj of suffixes) {
        const rData = getSlavicData(rootObj.bg);
        const sData = getSlavicData(suffixObj.bg);
        
        let gender: 'm' | 'f' | 'n' = 'm';
        if (suffixObj.tags?.includes('gender_f')) gender = 'f';
        else if (suffixObj.tags?.includes('gender_n')) gender = 'n';
        else if (rootObj.tags?.includes('gender_f')) gender = 'f';

        const isPlural = suffixObj.tags?.includes('plural') || false;
        const adjInflected = inflectSlavicAdjective(adjObj.bg!, gender, 'bg', isPlural ? 'pl' : 'sg');
        
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
      const rData = getSlavicData(rootObj.bg);
      const sData = getSlavicData(suffixObj.bg);
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
      const rData = getSlavicData(rootObj.bg);
      const rivData = getSlavicData(riverObj.bg);
      const connectors = [' na ', ' nad ', ' pod ', ' u '];
      for (const conn of connectors) {
        set.add((rData.src + conn + rivData.src).trim().toLowerCase());
      }
    }
  }

  return set.size;
}

export const generateBulgarianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";
  let rule = "";
  let components: string[] = [];

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === t);
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const riversLoc = getPool('river_loc'); 

  const typeRoll = Math.random();
  
  // 1. Adjective + Noun (or Derived Noun)
  if (typeRoll < 0.45) {
      rule = "Adjective + Noun";
      const selectedAdj = getRandomElement(adjectives);
      const selectedRootComponent = getRandomElement(rootsAndStems);
      let isDerived = false;
      let selectedSuffix: SlavicComponent | null = null;

      if (Math.random() < 0.5) {
         selectedSuffix = getRandomElement(suffixes);
         isDerived = true;
      }
      
      let shiftedSuffixBg = isDerived ? selectedSuffix?.bg : undefined;
      let suffixSrc = "";
      let suffixRom = "";
      if (isDerived && selectedSuffix) {
          const suffixInfo = getSlavicData(selectedSuffix.bg!);
          suffixSrc = suffixInfo.src;
          suffixRom = suffixInfo.rom || "";
          if (suffixSrc === 'ец' && Math.random() < 0.06) {
              suffixSrc = 'ица';
              suffixRom = 'itsa';
              shiftedSuffixBg = [['ица', 'itsa'], 'f'];
          }
      }

      // UPDATED: Get Gender AND Number
      const { gender, number } = getCompositeAttributes(selectedRootComponent.bg, shiftedSuffixBg);
      
      // UPDATED: Pass number to inflector
      const { src: inflectedAdjSrc, rom: inflectedAdjRom } = inflectSlavicAdjective(selectedAdj.bg!, gender, 'bg', number);

      const rootInfo = getSlavicData(selectedRootComponent.bg);
      let finalNounSrc = rootInfo.src;
      let finalNounRom = rootInfo.rom || transliterateBulgarianToAscii(rootInfo.src);

      if (isDerived && selectedSuffix) {
          // Vowel Truncation
          const rootEndsInVowel = ['а','е','о','я','и'].includes(finalNounSrc.slice(-1));
          const suffixStartsVowel = ['а','е','о','я','и'].includes(suffixSrc.charAt(0));

          if (rootEndsInVowel) {
              finalNounSrc = finalNounSrc.slice(0, -1);
              finalNounRom = finalNounRom.slice(0, -1);
          }

          finalNounSrc += suffixSrc;
          finalNounRom += suffixRom;
      }

      wordCyrillic = `${inflectedAdjSrc} ${finalNounSrc}`;
      wordAscii = `${inflectedAdjRom} ${finalNounRom}`;
      components.push(JSON.stringify(selectedAdj), JSON.stringify(selectedRootComponent));
      if (selectedSuffix) components.push(JSON.stringify(selectedSuffix));
  }
  // 2. Root + Suffix
  else if (typeRoll < 0.75) {
      rule = "Root + Suffix";
      const selectedRoot = getRandomElement(rootsAndStems);
      const selectedSuffix = getRandomElement(suffixes);
      
      const rootInfo = getSlavicData(selectedRoot.bg);
      const suffixInfo = getSlavicData(selectedSuffix.bg!);

      let baseSrc = rootInfo.src;
      let baseRom = rootInfo.rom || transliterateBulgarianToAscii(rootInfo.src);
      let suffixSrc = suffixInfo.src;
      let suffixRom = suffixInfo.rom || "";

      if (suffixSrc === 'ец' && Math.random() < 0.06) {
          suffixSrc = 'ица';
          suffixRom = 'itsa';
      }
      
      const rootEndsInVowel = ['а','е','о','я','и'].includes(baseSrc.slice(-1));
      if (rootEndsInVowel) {
            baseSrc = baseSrc.slice(0, -1);
            baseRom = baseRom.slice(0, -1);
      }

      wordCyrillic = baseSrc + suffixSrc;
      wordAscii = baseRom + suffixRom;
      components.push(JSON.stringify(selectedRoot), JSON.stringify(selectedSuffix));
  }
  // 3. Base + "na" + River
  else {
      rule = "Base + River Locative";
      const baseRootComponent = getRandomElement(rootsAndStems);
      const selectedRiver = getRandomElement(riversLoc);

      const baseRootInfo = getSlavicData(baseRootComponent.bg);
      let basePartSrc = baseRootInfo.src;
      let basePartRom = baseRootInfo.rom || transliterateBulgarianToAscii(baseRootInfo.src);

      let selectedSuffix: any = null;
      if (Math.random() < 0.5) {
          selectedSuffix = getRandomElement(suffixes);
          const suffixInfo = getSlavicData(selectedSuffix.bg!);
          let suffixSrc = suffixInfo.src;
          let suffixRom = suffixInfo.rom || "";

          if (suffixSrc === 'ец' && Math.random() < 0.06) {
              suffixSrc = 'ица';
              suffixRom = 'itsa';
          }
          
          const rootEndsInVowel = ['а','е','о','я','и'].includes(basePartSrc.slice(-1));

          if (rootEndsInVowel) {
              basePartSrc = basePartSrc.slice(0, -1);
              basePartRom = basePartRom.slice(0, -1);
          }
          basePartSrc += suffixSrc;
          basePartRom += suffixRom;
      }
      
      const riverInfo = getSlavicData(selectedRiver.bg!);
      wordCyrillic = `${basePartSrc} на ${riverInfo.src}`;
      wordAscii = `${basePartRom} na ${riverInfo.rom || transliterateBulgarianToAscii(riverInfo.src)}`; 
      components.push(JSON.stringify(baseRootComponent), JSON.stringify(selectedRiver));
      if (selectedSuffix) components.push(JSON.stringify(selectedSuffix));
  }

  if (!wordAscii || wordAscii.includes('undefined')) wordAscii = transliterateBulgarianToAscii(wordCyrillic);

  return { word: capitalizeSlavicName(wordCyrillic, 'bg'), ascii: capitalizeSlavicName(wordAscii, 'bg'), generationRules: [rule], dictionaryComponents: components };
};
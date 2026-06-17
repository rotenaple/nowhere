import { GeneratedResult } from "../../../types";
import { getRandomElement, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, getCompositeAttributes, transliterateUkrainianToAscii } from "../../utils"; 
import { SLAVIC_DATA, SlavicComponent } from "../../dictionaries/slavicDict"; 
import { capitalizeSlavicName } from "../../utils";

export const getUkrainianCapacity = () => {
  const set = new Set<string>();
  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === t);
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rivers = getPool('river');

  // Recipe 1: Adjective + Noun
  for (const adjObj of adjectives) {
    for (const rootObj of rootsAndStems) {
      for (const suffixObj of suffixes) {
        const rData = getSlavicData(rootObj.uk);
        const sData = getSlavicData(suffixObj.uk);
        
        let gender: 'm' | 'f' | 'n' = 'm';
        if (suffixObj.tags?.includes('gender_f')) gender = 'f';
        else if (suffixObj.tags?.includes('gender_n')) gender = 'n';
        else if (rootObj.tags?.includes('gender_f')) gender = 'f';

        const isPlural = suffixObj.tags?.includes('plural') || false;
        const adjInflected = inflectSlavicAdjective(adjObj.uk!, gender, 'uk', isPlural ? 'pl' : 'sg');
        
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
      const rData = getSlavicData(rootObj.uk);
      const sData = getSlavicData(suffixObj.uk);
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
      const rData = getSlavicData(rootObj.uk);
      const rivData = getSlavicData(riverObj.uk);
      const connectors = [' na ', ' nad ', ' pod ', ' u '];
      for (const conn of connectors) {
        set.add((rData.src + conn + rivData.src).trim().toLowerCase());
      }
    }
  }

  return set.size;
}

export const generateUkrainianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";
  let rule = "";
  let components: string[] = [];

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === t);
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
      
      // UPDATED
      const { gender, number } = getCompositeAttributes(selectedRootComponent.uk, selectedSuffix?.uk);
      const { src: inflectedAdjSrc, rom: inflectedAdjRom } = inflectSlavicAdjective(selectedAdj.uk!, gender, 'uk', number);

      const rootInfo = getSlavicData(selectedRootComponent.uk);
      let finalNounSrc = rootInfo.src;
      let finalNounRom = rootInfo.rom!;

      if (isDerived && selectedSuffix) {
          const suffixInfo = getSlavicData(selectedSuffix.uk!);
          const rootEndsInVowel = ['а','е','є','и','і','ї','о','у','ю','я'].includes(finalNounSrc.slice(-1));
          const rootEndsInSoft = ['ь','Ь'].includes(finalNounSrc.slice(-1));

          if (rootEndsInVowel) {
              finalNounSrc = finalNounSrc.slice(0, -1);
              finalNounRom = finalNounRom.slice(0, -1);
          } else if (rootEndsInSoft) {
              finalNounSrc = finalNounSrc.slice(0, -1);
          }

          finalNounSrc += suffixInfo.src;
          finalNounRom += suffixInfo.rom;
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
      
      const rootInfo = getSlavicData(selectedRoot.uk);
      const suffixInfo = getSlavicData(selectedSuffix.uk!);

      let baseSrc = rootInfo.src;
      let baseRom = rootInfo.rom!;
      
      const rootEndsInVowel = ['а','е','є','и','і','ї','о','у','ю','я'].includes(baseSrc.slice(-1));
      const rootEndsInSoft = ['ь','Ь'].includes(baseSrc.slice(-1));

      if (rootEndsInVowel) {
            baseSrc = baseSrc.slice(0, -1);
            baseRom = baseRom.slice(0, -1);
      } else if (rootEndsInSoft) {
            baseSrc = baseSrc.slice(0, -1);
      }

      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;
      components.push(JSON.stringify(selectedRoot), JSON.stringify(selectedSuffix));
  }
  // 3. Base + "nad/po" + River
  else {
      rule = "Base + River Locative";
      const baseRootComponent = getRandomElement(rootsAndStems);
      const selectedRiver = getRandomElement(riversLoc);
      
      const baseRootInfo = getSlavicData(baseRootComponent.uk);
      let basePartSrc = baseRootInfo.src;
      let basePartRom = baseRootInfo.rom!;

      let selectedSuffix: any = null;
      if (Math.random() < 0.5) {
          selectedSuffix = getRandomElement(suffixes);
          const suffixInfo = getSlavicData(selectedSuffix.uk!);

          const rootEndsInVowel = ['а','е','є','и','і','ї','о','у','ю','я'].includes(basePartSrc.slice(-1));
          const rootEndsInSoft = ['ь','Ь'].includes(basePartSrc.slice(-1));

          if (rootEndsInVowel) {
              basePartSrc = basePartSrc.slice(0, -1);
              basePartRom = basePartRom.slice(0, -1);
          } else if (rootEndsInSoft) {
              basePartSrc = basePartSrc.slice(0, -1);
          }
          basePartSrc += suffixInfo.src;
          basePartRom += suffixInfo.rom;
      }
      
      const riverInfo = getSlavicData(selectedRiver.uk!);
      // Ukrainian standard is "na [Locative]"
      wordCyrillic = `${basePartSrc} на ${riverInfo.src}`;
      
      const riverRom = riverInfo.rom || transliterateUkrainianToAscii(riverInfo.src);
      wordAscii = `${basePartRom} na ${riverRom}`;
      components.push(JSON.stringify(baseRootComponent), JSON.stringify(selectedRiver));
      if (selectedSuffix) components.push(JSON.stringify(selectedSuffix));
  }

  return { 
    word: capitalizeSlavicName(wordCyrillic, 'uk'), 
    ascii: capitalizeSlavicName(wordAscii, 'uk'),
    generationRules: [rule],
    dictionaryComponents: components
  };
};
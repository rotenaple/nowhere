import { GeneratedResult } from "../../../types";
import { getRandomElement, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, transliterateRussianToAscii, getCompositeAttributes } from "../../utils";
import { SLAVIC_DATA, SlavicComponent } from "../../dictionaries/slavicDict";
import { capitalizeSlavicName } from "../../utils";

export const getRussianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.ru) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.ru) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.ru) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.ru) && c.type === 'river');

   return (adjectives.length * roots.length * suffixes.length) + (roots.length * suffixes.length) + (roots.length * rivers.length);
}

export const generateRussianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.ru) && c.type === t);
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const riversLoc = getPool('river_loc');

  const typeRoll = Math.random();

  // 1. Adjective + Noun (or Derived Noun)
  if (typeRoll < 0.5) {
      const selectedAdj = getRandomElement(adjectives);
      const selectedRootComponent = getRandomElement(rootsAndStems);
      let isDerived = false;
      let selectedSuffix: SlavicComponent | null = null;

      if (Math.random() < 0.5) {
         selectedSuffix = getRandomElement(suffixes);
         isDerived = true;
      }
      
      // UPDATED: Get attributes
      const { gender, number } = getCompositeAttributes(selectedRootComponent.ru, selectedSuffix?.ru);
      
      // UPDATED: Pass number
      const { src: inflectedAdjSrc, rom: inflectedAdjRom } = inflectSlavicAdjective(selectedAdj.ru!, gender, 'ru', number);

      const rootInfo = getSlavicData(selectedRootComponent.ru);
      let finalNounSrc = rootInfo.src;
      let finalNounRom = rootInfo.rom!;

      if (isDerived && selectedSuffix) {
          const suffixInfo = getSlavicData(selectedSuffix.ru!);
          // Vowel Truncation
          const rootEndsInVowel = ['а','о','е','ы','и','я','ё','э','ю','у'].includes(finalNounSrc.slice(-1));
          const suffixStartsVowel = ['а','о','е','ы','и','я','ё','э','ю','у'].includes(suffixInfo.src.charAt(0));

          if (rootEndsInVowel && suffixStartsVowel) {
            finalNounSrc = finalNounSrc.slice(0, -1);
            finalNounRom = finalNounRom.slice(0, -1);
          }

          finalNounSrc += suffixInfo.src;
          finalNounRom += suffixInfo.rom;
      }

      wordCyrillic = `${inflectedAdjSrc} ${finalNounSrc}`;
      wordAscii = `${inflectedAdjRom} ${finalNounRom}`;
  }
  // 2. Root + Suffix
  else if (typeRoll < 0.85) {
      const selectedRoot = getRandomElement(rootsAndStems);
      const selectedSuffix = getRandomElement(suffixes);
      
      const rootInfo = getSlavicData(selectedRoot.ru);
      const suffixInfo = getSlavicData(selectedSuffix.ru!);

      let baseSrc = rootInfo.src;
      let baseRom = rootInfo.rom!;
      
      const rootEndsInVowel = ['а','о','е','ы','и','я','ё','э','ю','у'].includes(baseSrc.slice(-1));
      const suffixStartsVowel = ['а','о','е','ы','и','я','ё','э','ю','у'].includes(suffixInfo.src.charAt(0));

      if (rootEndsInVowel && suffixStartsVowel) {
          baseSrc = baseSrc.slice(0, -1);
          baseRom = baseRom.slice(0, -1);
      }
      
      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;
  }
  // 3. Base + "na" + River (Hyphenated)
  else {
      const baseRootComponent = getRandomElement(rootsAndStems);
      const selectedRiver = getRandomElement(riversLoc);
      
      const baseRootInfo = getSlavicData(baseRootComponent.ru);
      const riverInfo = getSlavicData(selectedRiver.ru!);

      let baseSrc = baseRootInfo.src;
      let baseRom = baseRootInfo.rom!;

      // Optional suffix on base before attaching river
      if (Math.random() < 0.3) {
          const suffixComp = getRandomElement(suffixes);
          const suffixInfo = getSlavicData(suffixComp.ru!);
           const rootEndsInVowel = ['а','о','е','ы','и','я','ё','э','ю','у'].includes(baseSrc.slice(-1));
          const suffixStartsVowel = ['а','о','е','ы','и','я','ё','э','ю','у'].includes(suffixInfo.src.charAt(0));
           if (rootEndsInVowel && suffixStartsVowel) {
              baseSrc = baseSrc.slice(0, -1);
              baseRom = baseRom.slice(0, -1);
           }
           baseSrc += suffixInfo.src;
           baseRom += suffixInfo.rom;
      }
      
      wordCyrillic = `${baseSrc}-на-${riverInfo.src}`; 
      const riverRom = riverInfo.rom || transliterateRussianToAscii(riverInfo.src);
      wordAscii = `${baseRom}-na-${riverRom}`;
  }

  return { word: capitalizeSlavicName(wordCyrillic, 'ru'), ascii: capitalizeSlavicName(wordAscii, 'ru') };
};
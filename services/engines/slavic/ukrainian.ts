import { GeneratedResult } from "../../../types";
import { getRandomElement, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, getCompositeGender, transliterateUkrainianToAscii } from "../../utils"; 
import { SLAVIC_DATA, SlavicComponent } from "../../dictionaries/slavicDict"; 

export const getUkrainianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === 'river');

   const path1 = adjectives.length * roots.length * suffixes.length;
   const path2 = roots.length * suffixes.length;
   const path3 = roots.length * rivers.length;

   return path1 + path2 + path3;
}

export const generateUkrainianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.uk) && c.type === t);
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  const riversLoc = getPool('river_loc');

  const typeRoll = Math.random();

  // 1. Adjective + Noun (or Derived Noun)
  if (typeRoll < 0.45) {
      const selectedAdj = getRandomElement(adjectives);
      const selectedRootComponent = getRandomElement(rootsAndStems);
      let isDerived = false;
      let selectedSuffix: SlavicComponent | null = null;

      if (Math.random() < 0.5) {
         selectedSuffix = getRandomElement(suffixes);
         isDerived = true;
      }
      
      const effectiveGender = getCompositeGender(selectedRootComponent.uk, selectedSuffix?.uk, 'uk');
      const { src: inflectedAdjSrc, rom: inflectedAdjRom } = inflectSlavicAdjective(selectedAdj.uk!, effectiveGender, 'uk');

      const rootInfo = getSlavicData(selectedRootComponent.uk);
      let finalNounSrc = rootInfo.src;
      let finalNounRom = rootInfo.rom!;

      if (isDerived && selectedSuffix) {
          const suffixInfo = getSlavicData(selectedSuffix.uk!);
          // Vowel Truncation
          const rootEndsInVowel = ['а','е','є','и','і','ї','о','у','ю','я'].includes(finalNounSrc.slice(-1));
          const suffixStartsVowel = ['а','е','є','и','і','ї','о','у','ю','я'].includes(suffixInfo.src.charAt(0));

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
  else if (typeRoll < 0.75) { 
      const selectedRoot = getRandomElement(rootsAndStems);
      const selectedSuffix = getRandomElement(suffixes);
      
      const rootInfo = getSlavicData(selectedRoot.uk);
      const suffixInfo = getSlavicData(selectedSuffix.uk!);

      let baseSrc = rootInfo.src;
      let baseRom = rootInfo.rom!;
      
      const rootEndsInVowel = ['а','е','є','и','і','ї','о','у','ю','я'].includes(baseSrc.slice(-1));
      const suffixStartsVowel = ['а','е','є','и','і','ї','о','у','ю','я'].includes(suffixInfo.src.charAt(0));

      if (rootEndsInVowel && suffixStartsVowel) {
            baseSrc = baseSrc.slice(0, -1);
            baseRom = baseRom.slice(0, -1);
      }

      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;
  }
  // 3. Base + "nad/po" + River
  else {
      const baseRootComponent = getRandomElement(rootsAndStems);
      const selectedRiver = getRandomElement(riversLoc);
      
      const baseRootInfo = getSlavicData(baseRootComponent.uk);
      let basePartSrc = baseRootInfo.src;
      let basePartRom = baseRootInfo.rom!;

      if (Math.random() < 0.5) {
          const selectedSuffix = getRandomElement(suffixes);
          const suffixInfo = getSlavicData(selectedSuffix.uk!);

          const rootEndsInVowel = ['а','е','є','и','і','ї','о','у','ю','я'].includes(basePartSrc.slice(-1));
          const suffixStartsVowel = ['а','е','є','и','і','ї','о','у','ю','я'].includes(suffixInfo.src.charAt(0));

          if (rootEndsInVowel && suffixStartsVowel) {
              basePartSrc = basePartSrc.slice(0, -1);
              basePartRom = basePartRom.slice(0, -1);
          }
          basePartSrc += suffixInfo.src;
          basePartRom += suffixInfo.rom;
      }
      
      const riverInfo = getSlavicData(selectedRiver.uk!);
      // Ukrainian standard is "na [Locative]"
      wordCyrillic = `${basePartSrc} на ${riverInfo.src}`;
      
      const riverRom = riverInfo.rom || transliterateUkrainianToAscii(riverInfo.src);
      wordAscii = `${basePartRom} na ${riverRom}`;
  }

  const capitalize = (s: string) => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return { word: capitalize(wordCyrillic), ascii: capitalize(wordAscii) };
};
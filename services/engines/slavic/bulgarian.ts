import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateBulgarianToAscii, getSlavicData, inflectSlavicAdjective, hasLanguageEntry, getCompositeGender } from "../../utils";
import { SLAVIC_DATA, SlavicComponent } from "../../dictionaries/slavicDict";

export const getBulgarianCapacity = () => {
   const roots = SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && (c.type === 'root' || c.type === 'stem'));
   const suffixes = SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === 'suffix');
   const adjectives = SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === 'adjective');
   const rivers = SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === 'river');

   const path1_adj_root = adjectives.length * roots.length;
   const path1_adj_rootsuf = adjectives.length * roots.length * suffixes.length;
   const path2_rootsuf = roots.length * suffixes.length;
   const path3_root_river = roots.length * rivers.length;
   const path3_rootsuf_river = roots.length * suffixes.length * rivers.length;

   return path1_adj_root + path1_adj_rootsuf + path2_rootsuf + path3_root_river + path3_rootsuf_river;
}

export const generateBulgarianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";

  const getPool = (t: string) => SLAVIC_DATA.filter(c => hasLanguageEntry(c.bg) && c.type === t);
  const adjectives = getPool('adjective');
  const suffixes = getPool('suffix');
  const rootsAndStems = [...getPool('root'), ...getPool('stem'), ...getPool('river')];
  // Although BG is analytic, using river_loc maintains consistency with other engines
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
      
      const effectiveGender = getCompositeGender(selectedRootComponent.bg, selectedSuffix?.bg, 'bg');
      const { src: inflectedAdjSrc, rom: inflectedAdjRom } = inflectSlavicAdjective(selectedAdj.bg!, effectiveGender, 'bg');

      const rootInfo = getSlavicData(selectedRootComponent.bg);
      let finalNounSrc = rootInfo.src;
      let finalNounRom = rootInfo.rom || transliterateBulgarianToAscii(rootInfo.src);

      if (isDerived && selectedSuffix) {
          const suffixInfo = getSlavicData(selectedSuffix.bg!);
          
          // Vowel Truncation
          const rootEndsInVowel = ['а','е','о','я','и'].includes(finalNounSrc.slice(-1));
          const suffixStartsVowel = ['а','е','о','я','и'].includes(suffixInfo.src.charAt(0));

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
      
      const rootInfo = getSlavicData(selectedRoot.bg);
      const suffixInfo = getSlavicData(selectedSuffix.bg!);

      let baseSrc = rootInfo.src;
      let baseRom = rootInfo.rom || transliterateBulgarianToAscii(rootInfo.src);
      
      const rootEndsInVowel = ['а','е','о','я','и'].includes(baseSrc.slice(-1));
      const suffixStartsVowel = ['а','е','о','я','и'].includes(suffixInfo.src.charAt(0));

      if (rootEndsInVowel && suffixStartsVowel) {
            baseSrc = baseSrc.slice(0, -1);
            baseRom = baseRom.slice(0, -1);
      }

      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;
  }
  // 3. Base + "na" + River
  else {
      const baseRootComponent = getRandomElement(rootsAndStems);
      const selectedRiver = getRandomElement(riversLoc);

      const baseRootInfo = getSlavicData(baseRootComponent.bg);
      let basePartSrc = baseRootInfo.src;
      let basePartRom = baseRootInfo.rom || transliterateBulgarianToAscii(baseRootInfo.src);

      if (Math.random() < 0.5) {
          const selectedSuffix = getRandomElement(suffixes);
          const suffixInfo = getSlavicData(selectedSuffix.bg!);
          
          const rootEndsInVowel = ['а','е','о','я','и'].includes(basePartSrc.slice(-1));
          const suffixStartsVowel = ['а','е','о','я','и'].includes(suffixInfo.src.charAt(0));

          if (rootEndsInVowel && suffixStartsVowel) {
              basePartSrc = basePartSrc.slice(0, -1);
              basePartRom = basePartRom.slice(0, -1);
          }
          basePartSrc += suffixInfo.src;
          basePartRom += suffixInfo.rom;
      }
      
      const riverInfo = getSlavicData(selectedRiver.bg!);
      wordCyrillic = `${basePartSrc} на ${riverInfo.src}`;
      // Assuming 'na' is universal
      wordAscii = `${basePartRom} na ${riverInfo.rom || transliterateBulgarianToAscii(riverInfo.src)}`; 
  }

  if (!wordAscii || wordAscii.includes('undefined')) wordAscii = transliterateBulgarianToAscii(wordCyrillic);

  const capitalize = (s: string) => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return { word: capitalize(wordCyrillic), ascii: capitalize(wordAscii) };
};
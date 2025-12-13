
import { GeneratedResult } from "../../types";
import { getRandomElement, getTargetSyllableCount, weightedRandom } from "../utils";
import { 
  EN_SUFFIXES_PHONETIC, EN_ROOTS_ANGLO, EN_SUFFIXES_ANGLO, 
  EN_ONSETS_NEUTRAL, EN_ONSETS_HARD, EN_ONSETS_K, 
  EN_NUC_BACK, EN_NUC_FRONT, EN_CODAS_HEAVY, EN_CODAS_LIGHT
} from "../dictionaries/englishDict";

export const getEnglishCapacity = (style: 'modern' | 'old' | 'mixed') => {
  // 8 prefixes + 1 no-prefix = 9 permutations per root-suffix pair
  const oldCapacity = EN_ROOTS_ANGLO.length * EN_SUFFIXES_ANGLO.length * 9; 
  
  if (style === 'old') return oldCapacity;
  if (style === 'mixed') return "Infinite";
  
  // Phonetic Mode is effectively infinite
  return "Infinite";
}

const generateEnglishRoot = (isTerminal: boolean): string => {
  const rand = Math.random();
  let onset = "";
  let vowel = "";

  if (rand < 0.6) {
    onset = weightedRandom(EN_ONSETS_NEUTRAL);
    vowel = weightedRandom([...EN_NUC_BACK, ...EN_NUC_FRONT]);
  } else if (rand < 0.85) {
    onset = weightedRandom(EN_ONSETS_HARD);
    vowel = weightedRandom(EN_NUC_BACK);
  } else {
    onset = weightedRandom(EN_ONSETS_K);
    vowel = weightedRandom(EN_NUC_FRONT);
  }

  let root = onset + vowel;
  const codas = isTerminal ? EN_CODAS_HEAVY : EN_CODAS_LIGHT;
  if (isTerminal || Math.random() > 0.5) root += weightedRandom(codas);
  return root;
}

const generateStrictAngloPlace = (): string => {
  const root = getRandomElement(EN_ROOTS_ANGLO);
  const suffix = getRandomElement(EN_SUFFIXES_ANGLO);
  
  if (root.toLowerCase().endsWith(suffix.toLowerCase())) return root;
  
  let connector = "";
  if (Math.random() < 0.1 && !root.endsWith('s')) connector = "s";

  if (Math.random() < 0.15) {
    const prefix = getRandomElement(['North', 'South', 'East', 'West', 'Great', 'Little', 'New', 'Old']);
    return `${prefix} ${root}${connector}${suffix}`;
  }

  return root + connector + suffix;
}

export const generateEnglishPlace = (style: 'modern' | 'old' | 'mixed' = 'modern'): GeneratedResult => {
  // Place Mode Logic
  if (style === 'old') {
    const name = generateStrictAngloPlace();
    return { word: name, ascii: name };
  }

  const sylCount = getTargetSyllableCount();
  const hasSuffix = Math.random() < 0.7; 
  
  if (!hasSuffix) {
    let root = generateEnglishRoot(true);
    if (sylCount > 1) {
       root += generateEnglishRoot(true).toLowerCase();
    }
    const name = root.charAt(0).toUpperCase() + root.slice(1);
    return { word: name, ascii: name };
  }

  let root = generateEnglishRoot(false); 
  if (sylCount > 2) {
      root += generateEnglishRoot(false).toLowerCase();
  }
  
  const suffix = getRandomElement(EN_SUFFIXES_PHONETIC);
  let name = root + suffix;
  name = name.replace(/(.)\1{2,}/g, '$1$1'); 

  name = name.charAt(0).toUpperCase() + name.slice(1);
  return { word: name, ascii: name };
};

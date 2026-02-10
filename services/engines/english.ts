
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

  // Retry loop for Phonotactic Quality Control
  for (let i = 0; i < 10; i++) {
    let candidate = "";

    if (!hasSuffix) {
      let root = generateEnglishRoot(true);
      if (sylCount > 1) {
        root += generateEnglishRoot(true).toLowerCase();
      }
      candidate = root.charAt(0).toUpperCase() + root.slice(1);
    } else {
      let root = generateEnglishRoot(false);
      if (sylCount > 2) {
        root += generateEnglishRoot(false).toLowerCase();
      }

      const suffix = getRandomElement(EN_SUFFIXES_PHONETIC);
      candidate = root + suffix;
      candidate = candidate.replace(/(.)\1{2,}/g, '$1$1');
      candidate = candidate.charAt(0).toUpperCase() + candidate.slice(1);
    }

    // PHONOTACTIC FILTER
    // Reject impossible clusters (e.g. 'cp', 'mt' in specific positions, though we check broad bad pairs here)
    // We check case-insensitive for the middle of word clusters
    const check = candidate.toLowerCase();

    // Bad Clusters (Impossible English Onsets or Coda transitions that look wrong)
    // e.g. 'bq', 'cj', 'fp', 'gx', 'jq', 'mx', 'pv', 'tq', 'vb', 'zf'
    // Also repeating 'aa', 'ii', 'uu' unless specific cases
    const BAD_CLUSTERS = /(bq|cj|fp|gx|jq|mx|pv|tq|vb|zf|qk|yy|j|q$|v$|u$)/;

    if (BAD_CLUSTERS.test(check)) continue;

    return { word: candidate, ascii: candidate };
  }

  // Fallback if retries fail
  return { word: "Westford", ascii: "Westford" };
};

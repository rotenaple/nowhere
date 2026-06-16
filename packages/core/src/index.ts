export { Language } from './types';
export type { PlaceName, GeneratedResult, GenerationParams } from './types';

export {
  DEFAULT_MIX_SETTINGS,
  DEFAULT_CHINESE_MIX,
  DEFAULT_ARABIC_MIX,
  DEFAULT_ENGLISH_MIX,
  LANGUAGE_GROUPS,
} from './constants';

export { generateNonceWords, debugGenerateNonceWords, getCapacity } from './services/generator';
export type { DebugGenerateResult } from './services/generator';

export {
  applyCorruption,
  debugCorruption,
  CORRUPTION_RULES,
} from './services/corruption';
export type { CorruptionRule, TraceEntry, CorruptionDebugResult } from './services/corruption';

export {
  getRandomElement,
  weightedRandom,
  getTargetSyllableCount,
  getSlavicData,
  hasLanguageEntry,
  getCompositeAttributes,
  getCompositeGender,
  inflectSlavicAdjective,
  capitalizeSlavicName,
  transliterateGermanToAscii,
  transliterateDanishToAscii,
  transliterateSwedishToAscii,
  transliterateDutchToAscii,
  transliterateFrenchToAscii,
  transliteratePolishToAscii,
  transliterateIrishToAscii,
  transliterateCzechToAscii,
  transliterateSlovakToAscii,
  transliterateRussianToAscii,
  transliterateUkrainianToAscii,
  transliterateBulgarianToAscii,
  transliteratePortugueseToAscii,
  transliterateRomanianToAscii,
} from './services/utils';

export type { ScriptedValue, SlavicEntry } from './services/utils';
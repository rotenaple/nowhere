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
  applyOrthographicVariation,
  debugOrthographicVariation,
  ORTHOGRAPHIC_VARIATION_RULES,
} from './services/orthographicVariation';
export type { VariationRule, TraceEntry, VariationDebugResult } from './services/orthographicVariation';

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

import { Language } from './types';

// Initial defaults: English > European > Others
export const DEFAULT_MIX_SETTINGS: Record<string, number> = {
  // Dominant
  [Language.English]: 40,
  
  // Major European
  [Language.French]: 12,
  [Language.Spanish]: 12,
  [Language.German]: 12,
  [Language.Italian]: 10,
  [Language.Portuguese]: 8,
  [Language.Russian]: 8,
  
  // Other European
  [Language.Dutch]: 6,
  [Language.Swedish]: 5,
  [Language.Irish]: 5,
  [Language.Polish]: 4,
  [Language.Danish]: 4,
  [Language.Czech]: 4,
  [Language.Ukrainian]: 3,
  [Language.Romanian]: 3,
  [Language.Bulgarian]: 3,
  [Language.Slovak]: 3,

  // Non-European (Lower bias)
  [Language.Japanese]: 2,
  [Language.Chinese]: 2,
  [Language.Arabic]: 2,
  [Language.Korean]: 1,
  [Language.Vietnamese]: 1,
  [Language.Indonesian]: 1,
  [Language.Malay]: 1,
  [Language.Tagalog]: 1,
};

export const DEFAULT_CHINESE_MIX: Record<string, number> = {
  'cn': 60,
  'tw': 15,
  'hk': 25
};

export const DEFAULT_ARABIC_MIX: Record<string, number> = {
  'standard': 10,
  'egyptian': 30,
  'maghrebi': 25,
  'levantine': 20,
  'gulf': 15
};

export const DEFAULT_ENGLISH_MIX: Record<string, number> = {
  'modern': 50,
  'old': 50
};

export const LANGUAGE_GROUPS: Record<string, string[]> = {
  "Germanic": [Language.English, Language.German, Language.Dutch, Language.Swedish, Language.Danish],
  "Romance": [Language.Spanish, Language.French, Language.Italian, Language.Portuguese, Language.Romanian],
  "Slavic": [Language.Russian, Language.Polish, Language.Ukrainian, Language.Czech, Language.Slovak, Language.Bulgarian],
  "East Asian": [Language.Chinese, Language.Japanese, Language.Korean, Language.Vietnamese],
  "Austronesian": [Language.Indonesian, Language.Malay, Language.Tagalog],
  "Semitic": [Language.Arabic],
  "Celtic": [Language.Irish]
};

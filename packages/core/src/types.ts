
export enum Language {
  All = 'Mixed',
  English = 'English',
  German = 'German',
  French = 'French',
  Spanish = 'Spanish',
  Italian = 'Italian',
  Portuguese = 'Portuguese',
  Romanian = 'Romanian',
  Dutch = 'Dutch',
  Japanese = 'Japanese',
  Chinese = 'Chinese',
  Korean = 'Korean',
  Vietnamese = 'Vietnamese',
  Indonesian = 'Indonesian',
  Malay = 'Malay',
  Tagalog = 'Tagalog',
  Swedish = 'Swedish',
  Danish = 'Danish',
  Polish = 'Polish',
  Russian = 'Russian',
  Ukrainian = 'Ukrainian',
  Irish = 'Irish',
  Czech = 'Czech',
  Slovak = 'Slovak',
  Bulgarian = 'Bulgarian',
  Arabic = 'Arabic'
}

export interface PlaceName {
  word: string;        // Native script (e.g., "München", "東京")
  ascii: string;       // ASCII transliteration (e.g., "Muenchen", "Tokyo")
  language: string;    // The specific language of this word (string to allow variants like "Cantonese")
  ipa?: string;
}

export interface GeneratedResult {
  word: string;
  ascii: string;
}

export type GenerationParams = {
  language: Language;
  count: number;
  minLength: number;
  maxLength: number;
  romanizationStyle: 'cn' | 'tw' | 'hk' | 'mixed';
  arabicStyle: 'standard' | 'egyptian' | 'levantine' | 'gulf' | 'maghrebi' | 'mixed';
  englishStyle: 'modern' | 'old' | 'mixed';
  mixSettings: Record<string, number>;
  chineseMixSettings: Record<string, number>;
  arabicMixSettings: Record<string, number>;
  englishMixSettings: Record<string, number>;
  corruption: number; // 0-1, probability multiplier for historical sound-change rules
};

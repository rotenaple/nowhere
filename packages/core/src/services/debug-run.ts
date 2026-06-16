import { debugCorruption, TraceEntry } from './corruption';
import { debugGenerateNonceWords, DebugGenerateResult } from './generator';
import { Language, GenerationParams } from '../types';
import {
  DEFAULT_MIX_SETTINGS, DEFAULT_CHINESE_MIX,
  DEFAULT_ARABIC_MIX, DEFAULT_ENGLISH_MIX,
} from '../constants';

const SEP = '-'.repeat(72);

// ── Test 1: debugCorruption direct ──
console.log(SEP);
console.log('TEST 1: debugCorruption direct on hardcoded inputs');
console.log(SEP);

const testCases: { word: string; ascii: string; lang: string; label: string }[] = [
  { word: 'Manchester', ascii: 'Manchester', lang: 'en', label: 'English -chester' },
  { word: 'München', ascii: 'Muenchen', lang: 'de', label: 'German umlaut city' },
  { word: 'Stockholm', ascii: 'Stockholm', lang: 'sv', label: 'Swedish -holm' },
  { word: 'København', ascii: 'Kobenhavn', lang: 'da', label: 'Danish København' },
  { word: 'Amsterdam', ascii: 'Amsterdam', lang: 'nl', label: 'Dutch city' },
  { word: 'Paris', ascii: 'Paris', lang: 'fr', label: 'French city' },
  { word: 'Barcelona', ascii: 'Barcelona', lang: 'es', label: 'Spanish city' },
  { word: 'Firenze', ascii: 'Firenze', lang: 'it', label: 'Italian city' },
  { word: 'Lisboa', ascii: 'Lisboa', lang: 'pt', label: 'Portuguese city' },
  { word: 'București', ascii: 'Bucuresti', lang: 'ro', label: 'Romanian city' },
  { word: 'Москва', ascii: 'Moskva', lang: 'ru', label: 'Russian Moscow' },
  { word: 'Київ', ascii: 'Kyyiv', lang: 'uk', label: 'Ukrainian Kyiv' },
  { word: 'Warszawa', ascii: 'Warszawa', lang: 'pl', label: 'Polish Warsaw' },
  { word: 'Praha', ascii: 'Praha', lang: 'cs', label: 'Czech Prague' },
  { word: 'Bratislava', ascii: 'Bratislava', lang: 'sk', label: 'Slovak city' },
  { word: 'София', ascii: 'Sofiya', lang: 'bg', label: 'Bulgarian Sofia' },
  { word: 'Baile Atha Cliath', ascii: 'Baile Atha Cliath', lang: 'ga', label: 'Irish Dublin' },
  { word: 'Jakarta', ascii: 'Jakarta', lang: 'id', label: 'Indonesian Jakarta' },
  { word: 'Maynila', ascii: 'Maynila', lang: 'tl', label: 'Tagalog Manila' },
  { word: 'Al-Qahira', ascii: 'Al-Qahira', lang: 'ar-EG', label: 'Egyptian Arabic Cairo' },
  { word: 'Bayrut', ascii: 'Bayrut', lang: 'ar-LB', label: 'Lebanese Arabic Beirut' },
  { word: 'Dubai', ascii: 'Dubai', lang: 'ar-AE', label: 'Gulf Arabic Dubai' },
  { word: 'Al-Jazair', ascii: 'Al-Jazair', lang: 'ar-MA', label: 'Maghrebi Arabic Algiers' },

  // Corruption bait: names specifically designed to match rule patterns
  { word: 'Manchester', ascii: 'Manchester', lang: 'en', label: 'EN -chester bait' },
  { word: 'Canterbury', ascii: 'Canterbury', lang: 'en', label: 'EN -bury bait' },
  { word: 'Berwick', ascii: 'Berwick', lang: 'en', label: 'EN -wick bait' },
  { word: 'Shipton', ascii: 'Shipton', lang: 'en', label: 'EN sh- bait' },
  { word: 'Kirkby', ascii: 'Kirkby', lang: 'en', label: 'EN k- bait' },
  { word: 'Middleton', ascii: 'Middleton', lang: 'en', label: 'EN geminate bait' },
  { word: 'Freiburg', ascii: 'Freiburg', lang: 'de', label: 'DE -burg bait' },
  { word: 'Düsseldorf', ascii: 'Düsseldorf', lang: 'de', label: 'DE -dorf bait' },
  { word: 'Badenheim', ascii: 'Badenheim', lang: 'de', label: 'DE -heim bait' },
  { word: 'Feldstein', ascii: 'Feldstein', lang: 'de', label: 'DE -stein bait' },
  { word: 'München', ascii: 'Muenchen', lang: 'de', label: 'DE umlaut bait' },
  { word: 'Amsterdam', ascii: 'Amsterdam', lang: 'nl', label: 'NL dam bait' },
  { word: 'Rotterdam', ascii: 'Rotterdam', lang: 'nl', label: 'NL -dam bait' },
  { word: 'Groningen', ascii: 'Groningen', lang: 'nl', label: 'NL -ingen bait' },
  { word: 'Stockholm', ascii: 'Stockholm', lang: 'sv', label: 'SV -holm bait' },
  { word: 'København', ascii: 'Kobenhavn', lang: 'da', label: 'DK -havn bait' },
  { word: 'Cherbourg', ascii: 'Cherbourg', lang: 'fr', label: 'FR -bourg bait' },
  { word: 'Barcelone', ascii: 'Barcelone', lang: 'fr', label: 'FR -one bait' },
  { word: 'Barcelona', ascii: 'Barcelona', lang: 'es', label: 'ES -ona bait' },
  { word: 'Castellón', ascii: 'Castellon', lang: 'es', label: 'ES -ón bait' },
  { word: 'Firenze', ascii: 'Firenze', lang: 'it', label: 'IT -enze bait' },
  { word: 'Lisboa', ascii: 'Lisboa', lang: 'pt', label: 'PT -oa bait' },
  { word: 'București', ascii: 'Bucuresti', lang: 'ro', label: 'RO -ești bait' },
  { word: 'Constanța', ascii: 'Constanta', lang: 'ro', label: 'RO -ța bait' },
  { word: 'Волгоград', ascii: 'Volgograd', lang: 'ru', label: 'RU -grad bait' },
  { word: 'Новгород', ascii: 'Novgorod', lang: 'ru', label: 'RU -город bait' },
  { word: 'Краков', ascii: 'Krakov', lang: 'ru', label: 'RU -ов bait' },
  { word: 'Białystok', ascii: 'Bialystok', lang: 'pl', label: 'PL -tok bait' },
  { word: 'České Budějovice', ascii: 'Ceske Budejovice', lang: 'cs', label: 'CS -ovice bait' },
  { word: 'Baile Átha Cliath', ascii: 'Baile Atha Cliath', lang: 'ga', label: 'GA fada bait' },
  { word: 'Kuching', ascii: 'Kuching', lang: 'id', label: 'ID -ing bait' },
  { word: 'Caloocan', ascii: 'Caloocan', lang: 'tl', label: 'TL c- bait' },
];

for (const tc of testCases) {
  console.log(`\n--- ${tc.label} (${tc.lang}) ---`);
  console.log(`  Input:  word="${tc.word}", ascii="${tc.ascii}"`);

  for (const level of [0.5, 1.0]) {
    const result = debugCorruption(tc.word, tc.ascii, tc.lang, level, 7);
    const changed = result.word !== tc.word || result.ascii !== tc.ascii;
    const symbol = changed ? '✓' : '·';
    console.log(`  [corr=${level.toFixed(1)}] ${symbol} word="${result.word}", ascii="${result.ascii}"  (${result.rulesActive} eligible, ${result.trace.length} fires)`);

    if (result.trace.length > 0) {
      for (const t of result.trace) {
        console.log(`         → "${t.ruleDesc}": "${t.before}" → "${t.after}"`);
      }
    }
  }
}

// ── Test 2: debugGenerateNonceWords ──
console.log(`\n${SEP}`);
console.log('TEST 2: debugGenerateNonceWords — full pipeline');
console.log(SEP);

const langTests: { lang: Language; label: string }[] = [
  { lang: Language.English, label: 'English' },
  { lang: Language.German, label: 'German' },
  { lang: Language.French, label: 'French' },
  { lang: Language.Japanese, label: 'Japanese' },
  { lang: Language.Russian, label: 'Russian' },
  { lang: Language.Arabic, label: 'Arabic (standard)' },
  { lang: Language.Indonesian, label: 'Indonesian' },
];

for (const lt of langTests) {
  console.log(`\n--- ${lt.label} generation (count=3, corruption=0.5) ---`);
  const params: GenerationParams = {
    language: lt.lang,
    count: 3,
    minLength: 3,
    maxLength: 50,
    romanizationStyle: 'mixed',
    arabicStyle: 'standard',
    englishStyle: 'modern',
    mixSettings: { ...DEFAULT_MIX_SETTINGS },
    chineseMixSettings: { ...DEFAULT_CHINESE_MIX },
    arabicMixSettings: { ...DEFAULT_ARABIC_MIX },
    englishMixSettings: { ...DEFAULT_ENGLISH_MIX },
    corruption: 0.5,
  };

  const results = await debugGenerateNonceWords(params, 7);

  for (const r of results) {
    const corrupted = r.word !== r.rawWord || r.ascii !== r.rawAscii;
    const symbol = corrupted ? '✓' : '·';
    console.log(`  ${symbol} raw=(${r.rawWord}/${r.rawAscii}) → final=(${r.word}/${r.ascii}) lang=${r.langCode} (${r.rulesActive} eligible, ${r.corruptionTrace.length} fires)`);
    if (r.corruptionTrace.length > 0) {
      for (const t of r.corruptionTrace.slice(0, 3)) {
        console.log(`       → "${t.ruleDesc}": "${t.before}" → "${t.after}"`);
      }
      if (r.corruptionTrace.length > 3) {
        console.log(`       → ... (${r.corruptionTrace.length - 3} more)`);
      }
    }
  }
}

console.log(`\n${SEP}`);
console.log('All debug tests completed.');
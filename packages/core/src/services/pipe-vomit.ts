/**
 * Full pipeline debug: engine → raw name → corruption → final output.
 * Tries seeds 0-49 to find cases where rules actually fire.
 * Run: npx tsx packages/core/src/services/pipe-vomit.ts
 */
import { debugCorruption } from './corruption';
import { generateEnglishPlace } from './engines/english';
import { generateGermanPlace } from './engines/germanic/german';
import { generateFrenchPlace } from './engines/romance/french';
import { generateSpanishPlace } from './engines/romance/spanish';
import { generateItalianPlace } from './engines/romance/italian';
import { generatePortuguesePlace } from './engines/romance/portuguese';
import { generateRomanianPlace } from './engines/romance/romanian';
import { generateDutchPlace } from './engines/germanic/dutch';
import { generateSwedishPlace } from './engines/germanic/swedish';
import { generateDanishPlace } from './engines/germanic/danish';
import { generateIrishPlace } from './engines/irish';
import { generateJapanesePlace } from './engines/japanese';
import { generateChinesePlace } from './engines/chinese';
import { generateKoreanPlace } from './engines/korean';
import { generateVietnamesePlace } from './engines/vietnamese';
import { generateIndonesianPlace } from './engines/indonesian';
import { generateTagalogPlace } from './engines/tagalog';
import { generatePolishPlace } from './engines/slavic/polish';
import { generateRussianPlace } from './engines/slavic/russian';
import { generateUkrainianPlace } from './engines/slavic/ukrainian';
import { generateCzechPlace } from './engines/slavic/czech';
import { generateSlovakPlace } from './engines/slavic/slovak';
import { generateBulgarianPlace } from './engines/slavic/bulgarian';
import { generateArabicPlace } from './engines/arabic';

const SEP = '-'.repeat(64);

type EngineSpec = {
  name: string;
  gen: () => { word: string; ascii: string };
  langCodes: string[];
  note?: string;
};

const ENGINES: EngineSpec[] = [
  { name: 'English (modern)', gen: () => generateEnglishPlace('modern'), langCodes: ['en-phon', 'en', 'en-ang'] },
  { name: 'English (old)',    gen: () => generateEnglishPlace('old'),    langCodes: ['en-ang', 'en', 'en-phon'] },
  { name: 'German',           gen: generateGermanPlace,     langCodes: ['de'] },
  { name: 'French',           gen: generateFrenchPlace,     langCodes: ['fr'] },
  { name: 'Spanish',          gen: generateSpanishPlace,    langCodes: ['es'] },
  { name: 'Italian',          gen: generateItalianPlace,    langCodes: ['it'] },
  { name: 'Portuguese',       gen: generatePortuguesePlace, langCodes: ['pt'] },
  { name: 'Romanian',         gen: generateRomanianPlace,   langCodes: ['ro'] },
  { name: 'Dutch',            gen: generateDutchPlace,      langCodes: ['nl'] },
  { name: 'Swedish',          gen: generateSwedishPlace,    langCodes: ['sv'] },
  { name: 'Danish',           gen: generateDanishPlace,     langCodes: ['da'] },
  { name: 'Irish',            gen: generateIrishPlace,      langCodes: ['ga'] },
  { name: 'Japanese',         gen: generateJapanesePlace,   langCodes: ['ja'] },
  { name: 'Chinese (CN)',     gen: () => generateChinesePlace('cn'), langCodes: ['zh-CN'] },
  { name: 'Chinese (TW)',     gen: () => generateChinesePlace('tw'), langCodes: ['zh-TW'] },
  { name: 'Chinese (HK)',     gen: () => generateChinesePlace('hk'), langCodes: ['zh-HK'] },
  { name: 'Korean',           gen: generateKoreanPlace,     langCodes: ['ko'] },
  { name: 'Vietnamese',       gen: generateVietnamesePlace, langCodes: ['vi'] },
  { name: 'Indonesian',       gen: () => generateIndonesianPlace('id'), langCodes: ['id', 'ms'] },
  { name: 'Malay',            gen: () => generateIndonesianPlace('ms'), langCodes: ['ms', 'id'] },
  { name: 'Tagalog',          gen: generateTagalogPlace,    langCodes: ['tl'] },
  { name: 'Polish',           gen: generatePolishPlace,     langCodes: ['pl'] },
  { name: 'Russian',          gen: generateRussianPlace,    langCodes: ['ru'] },
  { name: 'Ukrainian',        gen: generateUkrainianPlace,  langCodes: ['uk'] },
  { name: 'Czech',            gen: generateCzechPlace,      langCodes: ['cs'] },
  { name: 'Slovak',           gen: generateSlovakPlace,     langCodes: ['sk'] },
  { name: 'Bulgarian',        gen: generateBulgarianPlace,  langCodes: ['bg'] },
  { name: 'Arabic (Egyptian)',   gen: () => generateArabicPlace('egyptian'),  langCodes: ['ar-EG'] },
  { name: 'Arabic (Levantine)',  gen: () => generateArabicPlace('levantine'), langCodes: ['ar-LB'] },
  { name: 'Arabic (Gulf)',       gen: () => generateArabicPlace('gulf'),      langCodes: ['ar-AE'] },
  { name: 'Arabic (Maghrebi)',   gen: () => generateArabicPlace('maghrebi'),  langCodes: ['ar-MA'] },
  { name: 'Arabic (standard)',   gen: () => generateArabicPlace('standard'),  langCodes: ['ar-SA'] },
];

console.log('=== FULL PIPELINE (3 samples per engine, seeds 0-49, corr=1.0) ===\n');
console.log('For each sample shows: raw name, then corruption output + trace for first 3 seeds where rules fire.\n');

let totalSamples = 0;
let totalNamesWithCorruption = 0;

for (const eng of ENGINES) {
  console.log(SEP);
  console.log(`\n=== ${eng.name}${eng.note ? ' (' + eng.note + ')' : ''} ===\n`);

  for (let sample = 0; sample < 3; sample++) {
    const raw = eng.gen();
    totalSamples++;

    console.log(`  Sample ${sample + 1}:  "${raw.word}"  ascii="${raw.ascii}"`);

    for (const langCode of eng.langCodes) {
      let found = 0;
      for (let seed = 0; seed < 50 && found < 3; seed++) {
        const cr = debugCorruption(raw.word, raw.ascii, langCode, 1.0, seed);
        if (cr.trace.length === 0) continue;

        // Skip if rules canceled out (no visible change)
        if (cr.word === raw.word && cr.ascii === raw.ascii) continue;

        found++;
        totalNamesWithCorruption++;

        console.log(`    seed=${seed} [${langCode}]: "${cr.word}"  ascii="${cr.ascii}"`);
        for (const t of cr.trace) {
          console.log(`      "${t.before}" → "${t.after}"  ← ${t.ruleDesc}`);
        }
      }
    }
    console.log();
  }
}

console.log(SEP);
console.log(`\n${totalSamples} raw names generated, ${totalNamesWithCorruption} corruption traces shown.`);

import { generateNonceWords } from './services/generator';
import { Language, GenerationParams } from './types';
import { DEFAULT_MIX_SETTINGS, DEFAULT_CHINESE_MIX, DEFAULT_ARABIC_MIX, DEFAULT_ENGLISH_MIX } from './constants';

// For browser/vite environments, process might not be typed globally
declare const process: any;

const HELP_TEXT = `
Nowhere CLI Generator

Usage:
  ts-node cli.ts [options]

Options:
  --lang, -l      Language (default: Mixed)
                  [English, German, French, Japanese, Chinese, etc...]
  --count, -c     Number of words to generate (default: 10)
  --min           Minimum length (default: 5)
  --max           Maximum length (default: 40)
  --raw           Output only the generated words (no header/footer)
  --ascii         Output ASCII transliteration only
  --help, -h      Show this help message

Examples:
  ts-node cli.ts --lang=Japanese --count=5
  ts-node cli.ts -l English --count 20 --raw
`;

const args = (process as any).argv.slice(2);

const getArgValue = (key: string, shortKey?: string): string | undefined => {
  const index = args.findIndex((a: string) => a.startsWith(`--${key}`) || (shortKey && a.startsWith(`-${shortKey}`)));
  if (index === -1) return undefined;
  
  const arg = args[index];
  if (arg.includes('=')) return arg.split('=')[1];
  
  // If next arg exists and doesn't start with -, return it
  if (args[index + 1] && !args[index + 1].startsWith('-')) {
    return args[index + 1];
  }
  return 'true'; // Flag present
};

const main = async () => {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(HELP_TEXT);
    return;
  }

  const langArg = getArgValue('lang', 'l') || 'Mixed';
  const countArg = getArgValue('count', 'c') || '10';
  const minArg = getArgValue('min') || '5';
  const maxArg = getArgValue('max') || '40';
  const rawMode = args.includes('--raw');
  const asciiMode = args.includes('--ascii');

  // Map Lang
  let selectedLang = Language.All;
  const normalizedLangArg = langArg.toLowerCase();
  
  const foundLang = Object.values(Language).find(l => l.toLowerCase() === normalizedLangArg);
  if (foundLang) {
    selectedLang = foundLang;
  } else if (normalizedLangArg !== 'mixed' && normalizedLangArg !== 'all') {
    if (!rawMode) console.warn(`Language '${langArg}' not found. Defaulting to Mixed.`);
  }

  const params: GenerationParams = {
    language: selectedLang,
    count: parseInt(countArg),
    minLength: parseInt(minArg),
    maxLength: parseInt(maxArg),
    romanizationStyle: 'mixed', // Default
    arabicStyle: 'mixed', // Default
    englishStyle: 'mixed', // Default
    mixSettings: { ...DEFAULT_MIX_SETTINGS },
    chineseMixSettings: { ...DEFAULT_CHINESE_MIX },
    arabicMixSettings: { ...DEFAULT_ARABIC_MIX },
    englishMixSettings: { ...DEFAULT_ENGLISH_MIX }
  };

  if (!rawMode) {
    console.log(`Generating ${params.count} ${params.language} placenames...`);
    console.log('----------------------------------------');
  }

  try {
    const results = await generateNonceWords(params);
    
    if (rawMode) {
      results.forEach(r => console.log(asciiMode ? r.ascii : r.word));
    } else {
      results.forEach((r, i) => {
        const padding = (i + 1).toString().padStart(3, ' ');
        if (asciiMode) {
           console.log(`${padding}. ${r.ascii}`);
        } else {
           const extra = r.word !== r.ascii ? ` (${r.ascii})` : '';
           console.log(`${padding}. ${r.word}${extra}`);
        }
      });
      console.log('----------------------------------------');
      console.log('Done.');
    }
  } catch (e) {
    console.error('Error generating words:', e);
  }
};

main();
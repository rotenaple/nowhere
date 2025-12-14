
// ==========================================
// UTILITIES & DISTRIBUTION
// ==========================================

export const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const weightedRandom = (items: { val: string; weight: number }[]): string => {
  const total = items.reduce((acc, i) => acc + i.weight, 0);
  let random = Math.random() * total;
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) return item.val;
  }
  return items[0].val;
};

// Natural distribution: 2-3 syllables are most common
export const getTargetSyllableCount = (biasLonger: boolean = false): number => {
  const r = Math.random();
  if (biasLonger) {
    if (r < 0.05) return 1;
    if (r < 0.35) return 2;
    if (r < 0.85) return 3;
    return 4;
  }
  if (r < 0.10) return 1; 
  if (r < 0.50) return 2; 
  if (r < 0.90) return 3; 
  return 4;               
};

// ==========================================
// ASCII / ROMANIZATION HELPERS
// ==========================================

export const transliterateGermanToAscii = (word: string): string => {
  return word
    .replace(/ä/g, 'ae').replace(/Ä/g, 'Ae')
    .replace(/ö/g, 'oe').replace(/Ö/g, 'Oe')
    .replace(/ü/g, 'ue').replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss');
};

export const transliterateDanishToAscii = (word: string): string => {
  return word
    .replace(/æ/g, 'ae').replace(/Æ/g, 'Ae')
    .replace(/ø/g, 'oe').replace(/Ø/g, 'Oe')
    .replace(/å/g, 'aa').replace(/Å/g, 'Aa');
};

export const transliterateSwedishToAscii = (word: string): string => {
  return word
    .replace(/å/g, 'a').replace(/Å/g, 'A')
    .replace(/ä/g, 'ae').replace(/Ä/g, 'Ae')
    .replace(/ö/g, 'oe').replace(/Ö/g, 'Oe');
};

export const transliterateDutchToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ë/g, 'e').replace(/ï/g, 'i')
    .replace(/'/g, ""); // Strip apostrophes for 's- constructions
};

export const transliterateFrenchToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
    .replace(/œ/g, "oe").replace(/Œ/g, "Oe")
    .replace(/æ/g, "ae").replace(/Æ/g, "Ae")
    .replace(/'/g, ""); // Strip apostrophes for l' constructions
};

export const transliteratePolishToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, 'l').replace(/Ł/g, 'L');
};

export const transliterateIrishToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, ""); // Strip apostrophes
};

export const transliterateCzechToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const transliterateSlovakToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const transliterateRussianToAscii = (word: string): string => {
  const map: Record<string, string> = {
    'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ё':'yo', 'ж':'zh',
    'з':'z', 'и':'i', 'й':'y', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o',
    'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f', 'х':'kh', 'ц':'ts',
    'ч':'ch', 'ш':'sh', 'щ':'shch', 'ъ':'', 'ы':'y', 'ь':'', 'э':'e', 'ю':'yu',
    'я':'ya',
    'А':'A', 'Б':'B', 'В':'V', 'Г':'G', 'Д':'D', 'Е':'E', 'Ё':'Yo', 'Ж':'Zh',
    'З':'Z', 'И':'I', 'Й':'Y', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O',
    'П':'P', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'Ф':'F', 'Х':'Kh', 'Ц':'Ts',
    'Ч':'Ch', 'Ш':'Sh', 'Щ':'Shch', 'Ъ':'', 'Ы':'Y', 'Ь':'', 'Э':'E', 'Ю':'Yu',
    'Я':'Ya'
  };
  return word.split('').map(c => map[c] || c).join('');
};

export const transliterateUkrainianToAscii = (word: string): string => {
  const map: Record<string, string> = {
    'а':'a', 'б':'b', 'в':'v', 'г':'h', 'ґ':'g', 'д':'d', 'е':'e', 'є':'ye',
    'ж':'zh', 'з':'z', 'и':'y', 'і':'i', 'ї':'yi', 'й':'y', 'к':'k', 'л':'l',
    'м':'m', 'н':'n', 'о':'o', 'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u',
    'ф':'f', 'х':'kh', 'ц':'ts', 'ч':'ch', 'ш':'sh', 'щ':'shch', 'ь':'', 'ю':'yu',
    'я':'ya',
    'А':'A', 'Б':'B', 'В':'V', 'Г':'H', 'Ґ':'G', 'Д':'D', 'Е':'E', 'Є':'Ye',
    'Ж':'Zh', 'З':'Z', 'И':'Y', 'І':'I', 'Ї':'Yi', 'Й':'Y', 'К':'K', 'Л':'L',
    'М':'M', 'Н':'N', 'О':'O', 'П':'P', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U',
    'Ф':'F', 'Х':'Kh', 'Ц':'Ts', 'Ч':'Ch', 'Ш':'Sh', 'Щ':'Shch', 'Ь':'', 'Ю':'Yu',
    'Я':'Ya'
  };
  return word.split('').map(c => map[c] || c).join('');
};

export const transliterateBulgarianToAscii = (word: string): string => {
  const map: Record<string, string> = {
    'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ж':'zh',
    'з':'z', 'и':'i', 'й':'y', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o',
    'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f', 'х':'h', 'ц':'ts',
    'ч':'ch', 'ш':'sh', 'щ':'sht', 'ъ':'a', 'ь':'y', 'ю':'yu', 'я':'ya',
    'А':'A', 'Б':'B', 'В':'V', 'Г':'G', 'Д':'D', 'Е':'E', 'Ж':'Zh',
    'З':'Z', 'И':'I', 'Й':'Y', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O',
    'П':'P', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'Ф':'F', 'Х':'H', 'Ц':'Ts',
    'Ч':'Ch', 'Ш':'Sh', 'Щ':'Sht', 'Ъ':'A', 'Ь':'Y', 'Ю':'Yu', 'Я':'Ya'
  };
  return word.split('').map(c => map[c] || c).join('');
};

export const transliteratePortugueseToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, ""); // Strip apostrophes
};

export const transliterateRomanianToAscii = (word: string): string => {
  const map: Record<string, string> = {
    'ă':'a', 'â':'a', 'î':'i', 'ș':'s', 'ț':'t',
    'Ă':'A', 'Â':'A', 'Î':'I', 'Ș':'S', 'Ț':'T'
  };
  return word.split('').map(c => map[c] || c).join('');
};

export type ScriptedValue = readonly [string] | readonly [string, string];
export type SlavicEntry = ScriptedValue | readonly [ScriptedValue, 'm' | 'f' | 'n'];

export const getSlavicData = (entry: SlavicEntry | undefined): { src: string, rom?: string, gender?: 'm' | 'f' | 'n' } => {
  if (!entry) return { src: '' };

  let scriptVal: ScriptedValue;
  let genderValue: 'm' | 'f' | 'n' | undefined;

  if (Array.isArray(entry) && (entry.length === 2 && (entry[1] === 'm' || entry[1] === 'f' || entry[1] === 'n'))) {
    genderValue = entry[1];
    scriptVal = entry[0] as ScriptedValue;
  } else {
    scriptVal = entry as ScriptedValue;
  }

  const srcValue = scriptVal[0];
  const romValue = scriptVal.length > 1 ? scriptVal[1] : undefined;

  return { src: srcValue, rom: romValue, gender: genderValue };
};

// Common Adjective Inflection Helper (Example for a generic East/South Slavic pattern, can be adapted/branched)
// This is a draft and might need per-language tweaks for edge cases.
export const inflectSlavicAdjective = (
    adjEntry: SlavicEntry, // The adjective entry from SLAVIC_DATA
    targetGender: 'm' | 'f' | 'n',
    lang: 'bg' | 'ru' | 'uk' | 'cs' | 'pl' | 'sk' // The target language
): { src: string, rom?: string } => {

    const adjInfo = getSlavicData(adjEntry);
    let inflectedSrc = adjInfo.src;
    let inflectedRom = adjInfo.rom;

    // Default masculine nominative endings to look for and their inflected forms
    let mascEndingSrc: string | RegExp;
    let mascEndingRom: string | RegExp;
    let femEndingSrc: string;
    let femEndingRom: string;
    let neutEndingSrc: string;
    let neutEndingRom: string;
    let pluralEndingSrc: string; // If you later expand to plural inflection
    let pluralEndingRom: string;

    switch (lang) {
        case 'bg': // Bulgarian adjectives usually end in -en/-ak/-ok (masc)
            mascEndingSrc = /ен|ък|ок$/; mascEndingRom = /en|ak|ok$/;
            femEndingSrc = 'на'; femEndingRom = 'na';
            neutEndingSrc = 'но'; neutEndingRom = 'no';
            break;
        case 'ru': // Russian adjectives typically end in -ый/-ий (masc)
            mascEndingSrc = /(ый|ий)$/; mascEndingRom = /(iy|yy)$/; // iy and yy for transliteration consistency
            femEndingSrc = 'ая'; femEndingRom = 'aya';
            neutEndingSrc = 'ое'; neutEndingRom = 'oye';
            break;
        case 'uk': // Ukrainian adjectives typically end in -ий (masc)
            mascEndingSrc = /ий$/; mascEndingRom = /yy|iy$/;
            femEndingSrc = 'а'; femEndingRom = 'a'; // Can also be 'я' / 'ya' for soft stems
            neutEndingSrc = 'е'; neutEndingRom = 'e'; // Can also be 'є' / 'ye' for soft stems
            break;
        case 'cs': // Czech adjectives usually end in -ý/-í (masc)
            mascEndingSrc = /(ý|í)$/; mascEndingRom = /(y|i)$/;
            femEndingSrc = 'á'; femEndingRom = 'a'; // Use 'á' for hard stems, 'í' for soft (invariant)
            neutEndingSrc = 'é'; neutEndingRom = 'e';
            break;
        case 'sk': // Slovak adjectives typically end in -ý/-ý (masc)
            mascEndingSrc = /(ý|y)$/; mascEndingRom = /(y|y)$/; // Slovak also uses proper y/ý
            femEndingSrc = 'á'; femEndingRom = 'a';
            neutEndingSrc = 'é'; neutEndingRom = 'e';
            break;
        case 'pl': // Polish adjectives typically end in -y/-i (masc)
            mascEndingSrc = /(y|i)$/; mascEndingRom = /(y|i)$/;
            femEndingSrc = 'a'; femEndingRom = 'a';
            neutEndingSrc = 'e'; neutEndingRom = 'e';
            break;
        default:
            // Fallback for unexpected language
            return { src: inflectedSrc, rom: inflectedRom };
    }

    if (targetGender === 'f') {
        if (inflectedSrc.match(mascEndingSrc)) {
            inflectedSrc = inflectedSrc.replace(mascEndingSrc, femEndingSrc);
        } else if (lang === 'cs' && adjInfo.src.endsWith('í')) { // Czech soft adj are invariant in fem/neut nom
             // Do nothing, but ensure 'rom' is correct
        } else if (lang === 'bg' && (adjInfo.src.endsWith('ък') || adjInfo.src.endsWith('ок'))) { // Fleeting vowel for BG
            inflectedSrc = adjInfo.src.slice(0, -2) + 'ка'; // remove 'ък' or 'ок', add 'ка'
            inflectedRom = adjInfo.rom!.slice(0, -2) + 'ka'; // remove 'ak' or 'ok', add 'ka'
        } else if (lang === 'uk' && adjInfo.src.endsWith('ий')) { // Ukrainian soft adj
            // Check for soft stems, often ending in consonant before 'ий'
            // For now, simple replace, might be 'я' for some soft stems
             inflectedSrc = adjInfo.src.replace('ий', 'а');
             inflectedRom = adjInfo.rom!.replace(mascEndingRom, femEndingRom); // Use common mascEndingRom
        }
    } else if (targetGender === 'n') {
        if (inflectedSrc.match(mascEndingSrc)) {
            inflectedSrc = inflectedSrc.replace(mascEndingSrc, neutEndingSrc);
        } else if (lang === 'cs' && adjInfo.src.endsWith('í')) { // Czech soft adj are invariant in fem/neut nom
             // Do nothing
        } else if (lang === 'bg' && (adjInfo.src.endsWith('ък') || adjInfo.src.endsWith('ок'))) { // Fleeting vowel for BG
            inflectedSrc = adjInfo.src.slice(0, -2) + 'ко'; // remove 'ък' or 'ок', add 'ко'
            inflectedRom = adjInfo.rom!.slice(0, -2) + 'ko'; // remove 'ak' or 'ok', add 'ko'
        } else if (lang === 'uk' && adjInfo.src.endsWith('ий')) {
             inflectedSrc = adjInfo.src.replace('ий', 'е');
             inflectedRom = adjInfo.rom!.replace(mascEndingRom, neutEndingRom);
        }
    }
    // No change for 'm', as base form is assumed masculine nominative singular.

    return { src: inflectedSrc, rom: inflectedRom };
};

export const hasLanguageEntry = (entry: SlavicEntry | undefined): boolean => {
  return entry !== undefined;
};
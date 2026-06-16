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
    .replace(/'/g, ""); 
};

export const transliterateFrenchToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
    .replace(/œ/g, "oe").replace(/Œ/g, "Oe")
    .replace(/æ/g, "ae").replace(/Æ/g, "Ae")
    .replace(/'/g, ""); 
};

export const transliteratePolishToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, 'l').replace(/Ł/g, 'L');
};

export const transliterateIrishToAscii = (word: string): string => {
  return word
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, ""); 
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
    .replace(/'/g, "");
};

export const transliterateRomanianToAscii = (word: string): string => {
  const map: Record<string, string> = {
    'ă':'a', 'â':'a', 'î':'i', 'ș':'s', 'ț':'t',
    'Ă':'A', 'Â':'A', 'Î':'I', 'Ș':'S', 'Ț':'T'
  };
  return word.split('').map(c => map[c] || c).join('');
};

// ==========================================
// TYPES & DATA EXTRACTION
// ==========================================

export type ScriptedValue = readonly [string] | readonly [string, string];

// Extended type to support Gender AND Number (Singular/Plural)
// Format: [Value] OR [Value, Gender] OR [Value, Gender, Number]
export type SlavicEntry = 
  | ScriptedValue 
  | readonly [ScriptedValue, 'm' | 'f' | 'n']
  | readonly [ScriptedValue, 'm' | 'f' | 'n', 'sg' | 'pl'];

export const getSlavicData = (entry: SlavicEntry | undefined): { 
  src: string, 
  rom?: string, 
  gender?: 'm' | 'f' | 'n', 
  number: 'sg' | 'pl' 
} => {
  if (!entry) return { src: '', number: 'sg' }; // Default to singular

  // DIFFERENTIATE TYPES:
  // If entry[0] is an Array, we have the Complex Tuple: [ScriptedValue, Gender, ?Number]
  // If entry[0] is a String, we have the Simple Tuple: [String] or [String, String]
  
  if (Array.isArray(entry[0])) {
    // Cast to the complex types
    const complexEntry = entry as readonly [ScriptedValue, 'm' | 'f' | 'n'] | readonly [ScriptedValue, 'm' | 'f' | 'n', 'sg' | 'pl'];
    
    const scriptVal = complexEntry[0];
    const genderValue = complexEntry[1];
    
    // Check if 3rd element exists
    const numberValue = complexEntry.length === 3 ? complexEntry[2] : 'sg';

    const srcValue = scriptVal[0];
    const romValue = scriptVal.length > 1 ? scriptVal[1] : undefined;

    return { src: srcValue, rom: romValue, gender: genderValue, number: numberValue };
  } 
  
  // Simple Case
  const scriptVal = entry as ScriptedValue;
  const srcValue = scriptVal[0];
  const romValue = scriptVal.length > 1 ? scriptVal[1] : undefined;

  return { src: srcValue, rom: romValue, gender: undefined, number: 'sg' };
};

export const hasLanguageEntry = (entry: SlavicEntry | undefined): boolean => {
  return entry !== undefined;
};

/** 
 * Determines composite attributes (Gender & Number). 
 * Suffix attributes take precedence. If no suffix, use root.
 */
export const getCompositeAttributes = (
  rootEntry: SlavicEntry | undefined, 
  suffixEntry: SlavicEntry | undefined, ): { gender: 'm' | 'f' | 'n', number: 'sg' | 'pl' } => {
  const rootData = getSlavicData(rootEntry);
  
  if (suffixEntry) {
    const sufData = getSlavicData(suffixEntry);
    // Suffix determines gender and number if present
    if (sufData.gender) {
        return { gender: sufData.gender, number: sufData.number };
    }
  }
  
  return { gender: rootData.gender || 'm', number: rootData.number };
};

// Deprecated wrapper for backward compatibility if needed, though engines use getCompositeAttributes now
export const getCompositeGender = (
    rootEntry: SlavicEntry | undefined, 
    suffixEntry: SlavicEntry | undefined, 
  ): 'm' | 'f' | 'n' => {
    return getCompositeAttributes(rootEntry, suffixEntry).gender;
};

// ==========================================
// INFLECTION LOGIC
// ==========================================

export const inflectSlavicAdjective = (
    adjEntry: SlavicEntry, 
    targetGender: 'm' | 'f' | 'n',
    lang: 'bg' | 'ru' | 'uk' | 'cs' | 'pl' | 'sk',
    targetNumber: 'sg' | 'pl' = 'sg'
): { src: string, rom?: string } => {

    const adjInfo = getSlavicData(adjEntry);
    let inflectedSrc = adjInfo.src;
    let inflectedRom = adjInfo.rom;

    // --- PLURAL HANDLING ---
    if (targetNumber === 'pl') {
        switch (lang) {
            case 'bg': 
                // Remove -en/-ak/-ok ending if present, add -i
                if (inflectedSrc.endsWith('ен') || inflectedSrc.endsWith('ък') || inflectedSrc.endsWith('ок')) {
                    inflectedSrc = inflectedSrc.slice(0, -2);
                    if (inflectedRom) inflectedRom = inflectedRom.slice(0, -2); // Approx
                }
                // If it ends in consonant, add -i
                inflectedSrc += 'и';
                if (inflectedRom) inflectedRom += 'i';
                return { src: inflectedSrc, rom: inflectedRom };

            case 'ru': 
                // -iy/-yy -> -ye/-iye
                inflectedSrc = inflectedSrc.replace(/(ый|ий)$/, 'ые');
                if (inflectedRom) inflectedRom = inflectedRom.replace(/(iy|yy)$/, 'ye');
                return { src: inflectedSrc, rom: inflectedRom };

            case 'uk':
                // -iy -> -i
                inflectedSrc = inflectedSrc.replace(/ий$/, 'і');
                if (inflectedRom) inflectedRom = inflectedRom.replace(/(yy|iy)$/, 'i');
                return { src: inflectedSrc, rom: inflectedRom };

            case 'cs':
                // Soft (í) stays í. Hard (ý) changes.
                // Places (inanimate): M/F -> -é, N -> -á.
                if (inflectedSrc.endsWith('í')) return { src: inflectedSrc, rom: inflectedRom };
                
                if (targetGender === 'n') {
                    inflectedSrc = inflectedSrc.replace(/ý$/, 'á');
                    if (inflectedRom) inflectedRom = inflectedRom.replace(/y$/, 'a');
                } else {
                    inflectedSrc = inflectedSrc.replace(/ý$/, 'é');
                    if (inflectedRom) inflectedRom = inflectedRom.replace(/y$/, 'e');
                }
                return { src: inflectedSrc, rom: inflectedRom };

            case 'sk':
                // Hard: ý -> é
                inflectedSrc = inflectedSrc.replace(/ý$/, 'é'); 
                if (inflectedRom) inflectedRom = inflectedRom.replace(/y$/, 'e');
                return { src: inflectedSrc, rom: inflectedRom };

            case 'pl':
                // Nom Plural Non-Virile: -e
                inflectedSrc = inflectedSrc.replace(/(y|i)$/, 'e');
                if (inflectedRom) inflectedRom = inflectedRom.replace(/(y|i)$/, 'e');
                return { src: inflectedSrc, rom: inflectedRom };
        }
    }

    // --- SINGULAR HANDLING ---
    
    let mascEndingSrc: string | RegExp;
    let mascEndingRom: string | RegExp;
    let femEndingSrc: string;
    let femEndingRom: string;
    let neutEndingSrc: string;
    let neutEndingRom: string;

    switch (lang) {
        case 'bg': 
            mascEndingSrc = /ен|ък|ок|ър$/; 
            mascEndingRom = /en|ak|ok|ar$/;
            femEndingSrc = 'на'; femEndingRom = 'na';
            neutEndingSrc = 'но'; neutEndingRom = 'no';
            break;
        case 'ru': 
            mascEndingSrc = /(ый|ий)$/; mascEndingRom = /(iy|yy)$/; 
            femEndingSrc = 'ая'; femEndingRom = 'aya';
            neutEndingSrc = 'ое'; neutEndingRom = 'oye';
            break;
        case 'uk': 
            mascEndingSrc = /ий$/; mascEndingRom = /yy|iy$/;
            femEndingSrc = 'а'; femEndingRom = 'a'; 
            neutEndingSrc = 'е'; neutEndingRom = 'e'; 
            break;
        case 'cs':
            if (adjInfo.src.endsWith('í')) {
                mascEndingSrc = 'í'; mascEndingRom = 'i';
                femEndingSrc = 'í'; femEndingRom = 'i';
                neutEndingSrc = 'í'; neutEndingRom = 'i';
            } else {
                mascEndingSrc = /(ý|í)$/; mascEndingRom = /(y|i)$/;
                femEndingSrc = 'á'; femEndingRom = 'a';
                neutEndingSrc = 'é'; neutEndingRom = 'e';
            }
            break;
        case 'sk': 
            mascEndingSrc = /(ý|y)$/; mascEndingRom = /(y|y)$/; 
            femEndingSrc = 'á'; femEndingRom = 'a';
            neutEndingSrc = 'é'; neutEndingRom = 'e';
            break;
        case 'pl': 
            mascEndingSrc = /(y|i)$/; mascEndingRom = /(y|i)$/;
            femEndingSrc = 'a'; femEndingRom = 'a';
            neutEndingSrc = 'e'; neutEndingRom = 'e';
            break;
        default:
            return { src: inflectedSrc, rom: inflectedRom };
    }

    if (targetGender === 'f') {
        if (inflectedSrc.match(mascEndingSrc)) {
            inflectedSrc = inflectedSrc.replace(mascEndingSrc, femEndingSrc);
            if (inflectedRom && mascEndingRom) {
                inflectedRom = inflectedRom.replace(mascEndingRom, femEndingRom);
            }
        } 
        // Special Case: Bulgarian fleeting vowels
        else if (lang === 'bg') {
            if (adjInfo.src.endsWith('ък') || adjInfo.src.endsWith('ок')) { 
                inflectedSrc = adjInfo.src.slice(0, -2) + 'ка';
                inflectedRom = adjInfo.rom!.slice(0, -2) + 'ka';
            }
            else if (adjInfo.src.endsWith('ър')) {
                inflectedSrc = adjInfo.src.slice(0, -2) + 'ра';
                inflectedRom = adjInfo.rom!.slice(0, -2) + 'ra';
            }
            else {
                inflectedSrc += 'а';
                if (inflectedRom) inflectedRom += 'a';
            }
        } 
        else if (lang === 'uk' && adjInfo.src.endsWith('ий')) { 
             inflectedSrc = adjInfo.src.replace('ий', 'а');
             if (inflectedRom && mascEndingRom) inflectedRom = inflectedRom.replace(mascEndingRom, femEndingRom);
        }

    } else if (targetGender === 'n') {
        if (inflectedSrc.match(mascEndingSrc)) {
            inflectedSrc = inflectedSrc.replace(mascEndingSrc, neutEndingSrc);
            if (inflectedRom && mascEndingRom) {
                inflectedRom = inflectedRom.replace(mascEndingRom, neutEndingRom);
            }
        } 
        else if (lang === 'bg') {
            if (adjInfo.src.endsWith('ък') || adjInfo.src.endsWith('ок')) { 
                inflectedSrc = adjInfo.src.slice(0, -2) + 'ко'; 
                inflectedRom = adjInfo.rom!.slice(0, -2) + 'ko'; 
            }
             else if (adjInfo.src.endsWith('ър')) {
                inflectedSrc = adjInfo.src.slice(0, -2) + 'ро';
                inflectedRom = adjInfo.rom!.slice(0, -2) + 'ro';
            }
        } 
        else if (lang === 'uk' && adjInfo.src.endsWith('ий')) {
             inflectedSrc = adjInfo.src.replace('ий', 'е');
             if (inflectedRom && mascEndingRom) inflectedRom = inflectedRom.replace(mascEndingRom, neutEndingRom);
        }
    }

    return { src: inflectedSrc, rom: inflectedRom };
};

import { LOWERCASE_PARTICLES } from "./dictionaries/slavicDict";

/**
 * Capitalizes a Slavic place name according to specific language rules.
 * Ensures prepositions (na, nad, pod) remain lowercase in the middle of the name.
 * Handles both Space and Hyphen separators.
 */
export const capitalizeSlavicName = (
    text: string, 
    lang: 'bg' | 'cs' | 'pl' | 'ru' | 'sk' | 'uk'
): string => {
    // Get the blocklist for this language, default to empty
    const particles = LOWERCASE_PARTICLES[lang] || [];

    // Split by space OR hyphen, but capture the separator using parentheses
    // "Rostov-na-Donu" -> ["Rostov", "-", "na", "-", "Donu"]
    // "Ústí nad Labem" -> ["Ústí", " ", "nad", " ", "Labem"]
    const parts = text.split(/([ -])/);

    return parts.map((part, index) => {
        // If it's a separator, return as is
        if (part === ' ' || part === '-') return part;
        if (part === '') return part;

        // Is it the very first word? (Index 0)
        // Always capitalize the first word.
        if (index === 0) {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        }

        // Check if this part is a particle (case-insensitive check)
        if (particles.includes(part.toLowerCase())) {
            return part.toLowerCase();
        }

        // Otherwise, Title Case
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).join('');
};
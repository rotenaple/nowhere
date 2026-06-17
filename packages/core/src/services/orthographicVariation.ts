import {
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
} from './utils';

const TRANSLITERATORS: Record<string, (word: string) => string> = {
  'de': transliterateGermanToAscii,
  'da': transliterateDanishToAscii,
  'sv': transliterateSwedishToAscii,
  'nl': transliterateDutchToAscii,
  'fr': transliterateFrenchToAscii,
  'es': (w) => w.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
  'it': (w) => w.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/'/g, " ").replace(/\s+/g, " ").trim(),
  'pt': transliteratePortugueseToAscii,
  'ro': transliterateRomanianToAscii,
  'pl': transliteratePolishToAscii,
  'ga': transliterateIrishToAscii,
  'cs': transliterateCzechToAscii,
  'sk': transliterateSlovakToAscii,
  'ru': transliterateRussianToAscii,
  'uk': transliterateUkrainianToAscii,
  'bg': transliterateBulgarianToAscii,
};

export type VariationRule = {
  find: RegExp;
  replace: string;
  weight: number;
  desc: string;
};

export type TraceEntry = {
  token: string;
  ruleDesc: string;
  pattern: string;
  replacement: string;
  before: string;
  after: string;
};

export type VariationDebugResult = {
  word: string;
  ascii: string;
  trace: TraceEntry[];
  seed: number;
  lang: string;
  corruption: number;
  rulesConsidered: number;
  rulesActive: number;
};

type RandFn = () => number;

function mulberry32(seed: number): RandFn {
  let s = seed | 0;
  return () => {
    s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, s | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/*
 * English orthographic variation rules.
 *
 * These model BOTH directions of real spelling variation in English placenames:
 *
 * FORWARD: A change that happened in standard English but not universally
 *   e.g., -cester → -chester (palatalization of /k/→/tʃ/ before front vowel)
 *
 * REVERSE / ARCHAIC SURVIVAL: An archaic form that persisted in some regions
 *   e.g., sh- → sk- (Norse areas preserved /sk/ where standard English palatalized to /ʃ/)
 *
 * In many cases these are not strictly chronological — they are REGIONAL OUTCOMES
 * of the same Latin/OE root that diverged in different areas (Danelaw vs Saxon south).
 *
 * Sources of typologically real variation:
 *  - Southern (Saxon) palatalization: /k/ → /tʃ/, /sk/ → /ʃ/, /ɡ/ → /dʒ/
 *  - Northern (Norse-influenced) preservation: /k/, /sk/, /ɡ/ retained
 *  - Latin castra → -caster (north, /k/ preserved) / -chester (south, /tʃ/) / -cester (southwest, /s/)
 *  - OE nom.sg. burh → -borough / -burgh vs dat.sg. byrig → -bury
 *  - ON bȳ ("farmstead") → -by (north/east) — distinct from OE -bury
 *  - OE wīc → -wick (farm, Norse area) vs -wich (trading post, south/east)
 *  - OE geminate consonants simplified in some areas, retained in others
 */
const ENGLISH_RULES: VariationRule[] = [

  // ============================================================
  // 1. NORDIC/SAXON CONSONANT SPLIT
  // ============================================================
  // OE palatalized /sk/ → /ʃ/ (sh) in standard English
  // Norse-influenced areas preserved /sk/ (sk-)
  // REAL: Shipton/Skipton, Shipston/Skipsea, Shaw/Skough
  { find: /^sh(?=[aeiou])/gi, replace: 'sk', weight: 0.08, desc: 'sh- → sk- (Norse /sk/ preserved)' },

  // Reverse: sk- → sh- (standard English palatalization)
  // REAL: Skipton → Shipton (Shipton-under-Wychwood exists)
  { find: /^sk(?=[aeiou])/gi, replace: 'sh', weight: 0.08, desc: 'sk- → sh- (palatalization)' },

  // OE/Norse /k/ → /tʃ/ (ch) before front vowels in standard English
  // Norse areas preserved /k/ (k-) before front vowels
  // REAL: Kirkby/Churchtown, Kirkham/Churcham, Kirkwall
  // Apply to "ch" from original /k/ contexts (before e,i,y — not French ch like "chase")
  { find: /^ch(?=[eiy])/gi, replace: 'k', weight: 0.07, desc: 'ch- → k- (Norse /k/ preserved)' },

  // Reverse: k- before front vowels → ch- (standard English palatalization)
  // REAL: Kirkby → hypothetical Churchby, but Churchtown is the real equivalent
  { find: /^k(?=[eiy])/gi, replace: 'ch', weight: 0.07, desc: 'k- → ch- (palatalization)' },

  // ============================================================
  // 2. LATIN CASTRA OUTCOMES (regional)
  // ============================================================
  // All three are real placename suffixes from Latin castra ("fort, camp")
  // -chester (south, palatalized /tʃ/)
  // -caster (north, /k/ preserved)
  // -cester (southwest, /s/ intermediate — often pronounced locally as /stə/)
  // REAL: Manchester/Lancaster/Leicester, Dorchester/Doncaster/Cirencester

  { find: /chester$/gi, replace: 'caster', weight: 0.10, desc: '-chester → -caster (northern)' },
  { find: /chester$/gi, replace: 'cester', weight: 0.06, desc: '-chester → -cester (southwestern)' },
  { find: /caster$/gi, replace: 'chester', weight: 0.08, desc: '-caster → -chester (southern)' },
  { find: /cester$/gi, replace: 'caster', weight: 0.08, desc: '-cester → -caster (northern)' },
  { find: /cester$/gi, replace: 'chester', weight: 0.08, desc: '-cester → -chester (southern)' },

  // ============================================================
  // 3. BURH/BYRIG/BOROUGH/BURY/BERRY (case + reduction)
  // ============================================================
  // OE nom.sg. burh → ME -borough / Scottish -burgh
  // OE dat.sg. byrig → -bury (weakened form, most common)
  // Further reduction → -berry (rare, e.g. Newberry)
  // REAL: Peterborough/Canterbury/Newbury/Newberry
  //       Middlesbrough/Glastonbury/Aldeburgh

  { find: /bury$/gi, replace: 'berry', weight: 0.12, desc: '-bury → -berry (reduced)' },
  { find: /bury$/gi, replace: 'borough', weight: 0.08, desc: '-bury → -borough (nominative restored)' },
  { find: /borough$/gi, replace: 'bury', weight: 0.08, desc: '-borough → -bury (dative weakened)' },
  { find: /borough$/gi, replace: 'boro', weight: 0.20, desc: '-borough → -boro (abbreviated)' },
  { find: /borough$/gi, replace: 'burgh', weight: 0.06, desc: '-borough → -burgh (Scottish)' },
  { find: /burgh$/gi, replace: 'borough', weight: 0.08, desc: '-burgh → -borough' },
  { find: /berry$/gi, replace: 'bury', weight: 0.08, desc: '-berry → -bury (archaic restored)' },

  // ============================================================
  // 4. WIC/WICK (farmstead vs trading post)
  // ============================================================
  // OE wīc "dwelling, village" → -wick (Norse areas, farm)
  // Latin loan in OE wīc "trading post" → -wich (south/east)
  // REAL: Berwick/Ipswich, Keswick/Greenwich, Warwick/Norwich
  // Pronunciation varies: Berwick /ˈbɛrɪk/, Ipswich /ˈɪpswɪtʃ/,
  //                      Warwick /ˈwɒrɪk/, Norwich /ˈnɒrɪdʒ/

  { find: /wick$/gi, replace: 'wich', weight: 0.10, desc: '-wick → -wich (trading post)' },
  { find: /wich$/gi, replace: 'wick', weight: 0.10, desc: '-wich → -wick (farmstead)' },

  // ============================================================
  // 5. FORD/FORTH
  // ============================================================
  // OE ford → most placenames keep -ford
  // Occasional -forth variant (by analogy with "forth" = forward)
  // REAL: Stanford/Stanforth, Milford/Milforth (rare)
  { find: /ford$/gi, replace: 'forth', weight: 0.06, desc: '-ford → -forth' },

  // ============================================================
  // 6. TON/TOWN
  // ============================================================
  // OE tūn "enclosure, village" → -ton (most common)
  // -town is a later spelling variant
  // REAL: Brighton (from Brighthelmstone), Kingstown (Ireland), Acton/Actown (rare)
  { find: /ton$/gi, replace: 'town', weight: 0.06, desc: '-ton → -town' },
  { find: /town$/gi, replace: 'ton', weight: 0.06, desc: '-town → -ton' },

  // ============================================================
  // 7. HAM (always preserved in spelling, but occasional archaic variants)
  // ============================================================
  // OE hām "homestead" → -ham. Pronunciation reduced to /əm/ in all cases,
  // but spelling is universally conservative. Very low weight.
  { find: /ham$/gi, replace: 'am', weight: 0.03, desc: '-ham → -am (dialectal spelling)' },

  // ============================================================
  // 8. GEMINATE SIMPLIFICATION
  // ============================================================
  // Some placenames dropped geminates, others preserved them
  // REAL: Middleton (geminate retained) vs Midleton (simplified, Ireland)
  //       Billingham → Bilingham (rare)
  { find: /(b|c|d|f|g|k|l|m|n|p|r|s|t|v|w|z)\1/gi, replace: '$1', weight: 0.15, desc: 'geminate simplification' },

  // Reverse: single consonant → geminate after short vowel
  // Less common but attested (e.g., Bletchley from Bletch- + lēah)
  { find: /(?<=[aeiou])(b|d|g|k|l|m|n|p|r|s|t)(?=[aeiou])/gi, replace: '$1$1', weight: 0.04, desc: 'gemination (archaic doubling)' },

  // ============================================================
  // 9. FINAL -E (Early Modern English spelling convention)
  // ============================================================
  // 16th-17th c convention: added silent -e to mark vowel length
  // Some placenames fossilized the -e form (Brooke, Towne)
  // REAL: Brook/Brooke, Town/Towne, Hill/Hille
  { find: /(brook|town|hill|field|wood|pool|well)$/gi, replace: '$1e', weight: 0.08, desc: 'add final -e (archaic spelling)' },

  // ============================================================
  // 10. Y/EY/IE INTERCHANGE
  // ============================================================
  // ON bý "farmstead" → -by (Northern/eastern England)
  // Sometimes spelled -bie in Scotland (e.g., Burnbie)
  // REAL: Whitby/Whitbie (historical spelling)
  { find: /by$/gi, replace: 'bie', weight: 0.05, desc: '-by → -bie (Scandinavian)' },

  // Final -y → -ey (spelling variation, but skip words ending in -bury which has its own rule)
  { find: /(?<!bur)(?<![aeiou])y$/gi, replace: 'ey', weight: 0.08, desc: 'final -y → -ey' },

  // ============================================================
  // 11. C/K INTERCHANGE
  // ============================================================
  // -ck → -k at word end (historical simplification)
  // REAL: Beck/Bek, Wick/Wik (rare)
  { find: /ck$/gi, replace: 'k', weight: 0.06, desc: '-ck → -k' },
];

/*
 * German orthographic variation rules.
 *
 * These model real spelling variation in German placenames:
 * - Suffix alternations (-burg/-berg, -dorf/-trop, -heim/-ham)
 * - Umlaut insertion/removal (a→ä, o→ö, u→ü before i/j in next syllable)
 * - Orthographic reforms (ss→ß, th→t, c→k, ph→f)
 * - Dialectal variants (-stein/-steyn, -bach/-bich, -au/-aue)
 */
const GERMAN_RULES: VariationRule[] = [
  // Suffix alternations
  { find: /burg$/gi, replace: 'berg', weight: 0.08, desc: '-burg → -berg (historical variant)' },
  { find: /berg$/gi, replace: 'burg', weight: 0.06, desc: '-berg → -burg (reverse)' },
  { find: /dorf$/gi, replace: 'trop', weight: 0.06, desc: '-dorf → -trop (archaic -trup/-troph)' },
  { find: /heim$/gi, replace: 'ham', weight: 0.10, desc: '-heim → -ham (regional variant)' },
  { find: /stein$/gi, replace: 'steyn', weight: 0.06, desc: '-stein → -steyn (archaic spelling)' },
  { find: /bach$/gi, replace: 'bich', weight: 0.05, desc: '-bach → -bich (dialect)' },
  { find: /au$/gi, replace: 'aue', weight: 0.08, desc: '-au → -aue (variant)' },

  // Umlaut insertion: a→ä, o→ö, u→ü when i/j follows in later syllable
  { find: /a(?=[^.\s]*[ij])/gi, replace: 'ä', weight: 0.05, desc: 'a → ä before i/j (umlaut)' },
  { find: /o(?=[^.\s]*[ij])/gi, replace: 'ö', weight: 0.05, desc: 'o → ö before i/j (umlaut)' },
  { find: /u(?=[^.\s]*[ij])/gi, replace: 'ü', weight: 0.05, desc: 'u → ü before i/j (umlaut)' },

  // Umlaut removal (archaic/Swiss)
  { find: /ä/gi, replace: 'a', weight: 0.08, desc: 'ä → a (archaic/Swiss umlaut removal)' },
  { find: /ö/gi, replace: 'o', weight: 0.08, desc: 'ö → o (archaic/Swiss umlaut removal)' },
  { find: /ü/gi, replace: 'u', weight: 0.08, desc: 'ü → u (archaic/Swiss umlaut removal)' },

  // Orthographic reforms
  { find: /ss/gi, replace: 'ß', weight: 0.12, desc: 'ss → ß (standard German)' },
  { find: /ß/gi, replace: 'ss', weight: 0.10, desc: 'ß → ss (post-reform/archaic)' },
  { find: /^th(?=[aeiou])/gi, replace: 't', weight: 0.15, desc: 'th- → t- (1901 reform)' },
  { find: /^t(?=[aeiou])/gi, replace: 'th', weight: 0.06, desc: 't- → th- (archaic preserved)' },
  { find: /^c(?=[aeiou])/gi, replace: 'k', weight: 0.10, desc: 'c → k word-initially (standardization)' },
  { find: /ph/gi, replace: 'f', weight: 0.08, desc: 'ph → f (standardization)' },
];

/*
 * Dutch orthographic variation rules.
 *
 * These model real spelling variation in Dutch placenames:
 * - Suffix alternations (-dijk/-dyk, -burg/-borg, -lo/-loo)
 * - ij/ei interchange (dialectal)
 * - Archaic/dialectal variants (-dorp/-durp, sch- → s-)
 * - Orthographic standardization (c → k)
 * - Syncope (final -e loss)
 */
const DUTCH_RULES: VariationRule[] = [
  { find: /dijk$/gi, replace: 'dyk', weight: 0.10, desc: '-dijk → -dyk (archaic spelling)' },
  { find: /ij/gi, replace: 'ei', weight: 0.12, desc: 'ij → ei (dialect)' },
  { find: /ei/gi, replace: 'ij', weight: 0.08, desc: 'ei → ij (reverse dialect)' },
  { find: /burg$/gi, replace: 'borg', weight: 0.10, desc: '-burg → -borg (regional variant)' },
  { find: /dorp$/gi, replace: 'durp', weight: 0.06, desc: '-dorp → -durp (dialect)' },
  { find: /lo$/gi, replace: 'loo', weight: 0.08, desc: '-lo → -loo (variant)' },
  { find: /^sch/gi, replace: 's', weight: 0.06, desc: 'sch- → s- (reduced dialect)' },
  { find: /^c(?=[aeiou])/gi, replace: 'k', weight: 0.10, desc: 'c → k (indigenization)' },
  { find: /e$/gi, replace: '', weight: 0.08, desc: 'final -e loss (syncope)' },
];

/*
 * Swedish orthographic variation rules.
 *
 * These model real spelling variation in Swedish placenames:
 * - Suffix reductions (-köping/-köp, -holm/-holme, -stad/-stä)
 * - Older spelling forms (-ö/-öe, -ås/-åsen)
 * - Consonant cluster variation (ck/kk, tj/kj)
 * - Suffix variants (-viken/-vika)
 */
const SWEDISH_RULES: VariationRule[] = [
  { find: /köping$/gi, replace: 'köp', weight: 0.08, desc: '-köping → -köp (archaic)' },
  { find: /holm$/gi, replace: 'holme', weight: 0.06, desc: '-holm → -holme (older form)' },
  { find: /stad$/gi, replace: 'stä', weight: 0.06, desc: '-stad → -stä (reduced)' },
  { find: /ö$/gi, replace: 'öe', weight: 0.06, desc: '-ö → -öe (older spelling)' },
  { find: /ås$/gi, replace: 'åsen', weight: 0.06, desc: '-ås → -åsen (full form)' },
  { find: /ck/gi, replace: 'kk', weight: 0.08, desc: 'ck → kk (variant spelling)' },
  { find: /kk/gi, replace: 'ck', weight: 0.06, desc: 'kk → ck (variant spelling)' },
  { find: /viken$/gi, replace: 'vika', weight: 0.06, desc: '-viken → -vika (suffix variant)' },
  { find: /^tj/gi, replace: 'kj', weight: 0.06, desc: 'tj- → kj- (dialect)' },
];

/*
 * Danish orthographic variation rules.
 *
 * These model real spelling variation in Danish placenames:
 * - 1948 orthographic reform (-gaard→-gård, -aa→-å)
 * - Archaic preserved forms (reverse of 1948 reform)
 * - Older spelling variants (-ø→-øe, -lund→-lunne, -lev→-løv)
 */
const DANISH_RULES: VariationRule[] = [
  { find: /gaard$/gi, replace: 'gård', weight: 0.20, desc: '-gaard → -gård (1948 reform)' },
  { find: /gård$/gi, replace: 'gaard', weight: 0.12, desc: '-gård → -gaard (archaic preserved)' },
  { find: /aa/gi, replace: 'å', weight: 0.20, desc: '-aa → -å (1948 reform)' },
  { find: /å/gi, replace: 'aa', weight: 0.10, desc: '-å → -aa (archaic preserved)' },
  { find: /ø$/gi, replace: 'øe', weight: 0.06, desc: '-ø → -øe (older spelling)' },
  { find: /lund$/gi, replace: 'lunne', weight: 0.06, desc: '-lund → -lunne (variant)' },
  { find: /lev$/gi, replace: 'løv', weight: 0.06, desc: '-lev → -løv (variant)' },
];

/*
 * French orthographic variation rules.
 *
 * These model real spelling variation in French placenames:
 * - Suffix alternations (-ville/-villa, -court/-cour, -ac/-at)
 * - Older/archaic spellings (oi→ai, -y→-aye, -y→-ies)
 * - Norman survivals (-eau→-el)
 * - Pluralization (-le→-les)
 */
const FRENCH_RULES: VariationRule[] = [
  { find: /ville$/gi, replace: 'villa', weight: 0.10, desc: '-ville → -villa (variant)' },
  { find: /court$/gi, replace: 'cour', weight: 0.08, desc: '-court → -cour (reduced)' },
  { find: /ac$/gi, replace: 'at', weight: 0.06, desc: '-ac → -at (Occitan survival)' },
  { find: /y$/gi, replace: 'ies', weight: 0.06, desc: '-y → -ies (plural)' },
  { find: /y$/gi, replace: 'aye', weight: 0.06, desc: '-y → -aye (older spelling)' },
  { find: /le$/gi, replace: 'les', weight: 0.06, desc: '-le → -les (plural)' },
  { find: /oi/gi, replace: 'ai', weight: 0.08, desc: 'oi → ai (older spelling)' },
  { find: /qu/gi, replace: 'q', weight: 0.04, desc: 'qu → q (abbreviation)' },
  { find: /eau$/gi, replace: 'el', weight: 0.06, desc: '-eau → -el (Norman survival)' },
];

/*
 * Spanish orthographic variation rules.
 *
 * These model real spelling variation in Spanish placenames:
 * - Suffix variation (-ez→-es, -illo→-illa, -ón→-on, -ción→-ccion)
 * - Dialectal sound changes (b↔v, c→z, ll→y)
 * - Accent omission/arbitrary addition
 */
const SPANISH_RULES: VariationRule[] = [
  // Suffixes
  { find: /ez$/gi, replace: 'es', weight: 0.10, desc: '-ez → -es (simplified)' },
  { find: /ón$/gi, replace: 'on', weight: 0.10, desc: '-ón → -on (accent loss)' },
  { find: /ción$/gi, replace: 'ccion', weight: 0.08, desc: '-ción → -ccion (older spelling)' },

  // Dialectal phonology
  { find: /b/gi, replace: 'v', weight: 0.06, desc: 'b → v (dialect)' },
  { find: /v/gi, replace: 'b', weight: 0.06, desc: 'v → b (dialect)' },
  { find: /c(?=[ei])/gi, replace: 'z', weight: 0.06, desc: 'c → z before e,i (seseo orthography)' },
  { find: /ll/gi, replace: 'y', weight: 0.10, desc: 'll → y (yeísmo)' },

  // Accent loss
  { find: /á/gi, replace: 'a', weight: 0.06, desc: 'á → a (accent loss)' },
  { find: /é/gi, replace: 'e', weight: 0.06, desc: 'é → e (accent loss)' },
  { find: /í/gi, replace: 'i', weight: 0.06, desc: 'í → i (accent loss)' },
  { find: /ó/gi, replace: 'o', weight: 0.06, desc: 'ó → o (accent loss)' },
  { find: /ú/gi, replace: 'u', weight: 0.06, desc: 'ú → u (accent loss)' },
];

/*
 * Italian orthographic variation rules.
 *
 * These model real spelling variation in Italian placenames:
 * - Gender shifts (-ano→-ana, -ino→-ina, -ello→-ella)
 * - Orthographic conventions (g→gh, c→ch before i)
 * - Suffix simplifications (-ggio→-gio, -zio→-ggio)
 * - Dialectal plural (-a→-e)
 */
const ITALIAN_RULES: VariationRule[] = [
  { find: /g(?=i)/gi, replace: 'gh', weight: 0.08, desc: 'g → gh before i (orthographic)' },
  { find: /c(?=i)/gi, replace: 'ch', weight: 0.08, desc: 'c → ch before i (orthographic)' },
  { find: /ggio$/gi, replace: 'gio', weight: 0.06, desc: '-ggio → -gio (simplified)' },
  { find: /zio$/gi, replace: 'ggio', weight: 0.06, desc: '-zio → -ggio (archaic variation)' },
  { find: /a$/gi, replace: 'e', weight: 0.06, desc: '-a → -e (dialect plural)' },
];

/*
 * Portuguese orthographic variation rules.
 *
 * These model real spelling variation in Portuguese placenames:
 * - Older/archaic forms (-ão→-am, -ões→-õis)
 * - Reduced forms (-inha→-ina, -eiro→-ero)
 * - Orthographic reforms (ss→ç, ph→f, y→i)
 * - Accent addition/removal
 */
const PORTUGUESE_RULES: VariationRule[] = [
  // Shared Romance
  { find: /ville$/gi, replace: 'villa', weight: 0.10, desc: '-ville → -villa (variant)' },
  { find: /opolis$/gi, replace: 'opole', weight: 0.10, desc: '-opolis → -opole (variant)' },
  { find: /lândia$/gi, replace: 'landa', weight: 0.08, desc: '-lândia → -landa (reduced)' },

  // Portuguese-specific
  { find: /ão$/gi, replace: 'am', weight: 0.10, desc: '-ão → -am (older spelling)' },
  { find: /ões$/gi, replace: 'õis', weight: 0.06, desc: '-ões → -õis (archaic)' },
  { find: /inha$/gi, replace: 'ina', weight: 0.08, desc: '-inha → -ina (reduced)' },
  { find: /eiro$/gi, replace: 'ero', weight: 0.08, desc: '-eiro → -ero (reduced)' },
  { find: /ss/gi, replace: 'ç', weight: 0.08, desc: 'ss → ç (orthographic)' },
  { find: /ph/gi, replace: 'f', weight: 0.12, desc: 'ph → f (orthographic reform)' },
  { find: /y/gi, replace: 'i', weight: 0.10, desc: 'y → i (reform)' },
  { find: /á/gi, replace: 'a', weight: 0.05, desc: 'á → a (accent loss)' },
  { find: /â/gi, replace: 'a', weight: 0.05, desc: 'â → a (accent loss)' },
  { find: /ã/gi, replace: 'a', weight: 0.05, desc: 'ã → a (accent loss)' },
  { find: /é/gi, replace: 'e', weight: 0.05, desc: 'é → e (accent loss)' },
  { find: /ê/gi, replace: 'e', weight: 0.05, desc: 'ê → e (accent loss)' },
  { find: /ó/gi, replace: 'o', weight: 0.05, desc: 'ó → o (accent loss)' },
  { find: /ô/gi, replace: 'o', weight: 0.05, desc: 'ô → o (accent loss)' },
];

/*
 * Romanian orthographic variation rules.
 *
 * These model real spelling variation in Romanian placenames:
 * - Pre-reform vs post-reform spellings (-ești→-esci, â↔î)
 * - Definite article variation (-ul→-u)
 * - Reduced forms (-ea→-e)
 * - Diacritic addition (s→ș, t→ț)
 */
const ROMANIAN_RULES: VariationRule[] = [
  // Shared Romance
  { find: /ești$/gi, replace: 'esci', weight: 0.15, desc: '-ești → -esci (pre-reform Latin alphabet)' },

  // Romanian-specific
  { find: /â/gi, replace: 'î', weight: 0.20, desc: 'â → î (reform)' },
  { find: /î/gi, replace: 'â', weight: 0.20, desc: 'î → â (post-1993 reform)' },
  { find: /ul$/gi, replace: 'u', weight: 0.10, desc: '-ul → -u (definite article loss)' },
  { find: /ea$/gi, replace: 'e', weight: 0.08, desc: '-ea → -e (reduced)' },
  { find: /s/gi, replace: 'ș', weight: 0.10, desc: 's → ș (diacritic addition)' },
  { find: /t/gi, replace: 'ț', weight: 0.08, desc: 't → ț (diacritic addition)' },
];

/*
 * Shared Slavic orthographic variation rules.
 *
 * These model real spelling variation common across Slavic placenames.
 * Rules operate on native Cyrillic script for ru/uk/bg, Latin diacritic script for pl/cs/sk.
 *
 * Shared rules:
 * - Compound form variation (-град→-город, -поль→-поле)
 * - Germanic loan variation (-бург→-берг)
 * - Adjectival suffix alternation (-ск→-ский)
 * - Soft/hard suffix variation (-ов→-ев)
 * - Palatalization (к→ч before front vowels)
 */
const SLAVIC_RULES: VariationRule[] = [
  { find: /град$/gi, replace: 'город', weight: 0.10, desc: '-град → -город (full vs clipped form)' },
  { find: /поль$/gi, replace: 'поле', weight: 0.08, desc: '-поль → -поле (full form)' },
  { find: /бург$/gi, replace: 'берг', weight: 0.06, desc: '-бург → -берг (Germanic loan variation)' },
  { find: /ск$/gi, replace: 'ский', weight: 0.06, desc: '-ск → -ский (adjectival form)' },
  { find: /ов$/gi, replace: 'ев', weight: 0.08, desc: '-ов → -ев (suffix variation)' },
  { find: /к(?=[еи])/gi, replace: 'ч', weight: 0.10, desc: 'к → ч before е, и (palatalization)' },
];

/*
 * Russian-specific variation rules.
 *
 * These model real spelling variation in Russian placenames:
 * - Archaic forms (-аго→-ого, -ый→-ой)
 * - Optional diacritics (е↔ё)
 * - Archaic consonant rules (и→ы after ц)
 * - Infinitive clipping (-ться→-тся)
 */
const RUSSIAN_RULES: VariationRule[] = [
  ...SLAVIC_RULES,
  { find: /аго$/gi, replace: 'ого', weight: 0.06, desc: '-аго → -ого (archaic)' },
  { find: /ый$/gi, replace: 'ой', weight: 0.08, desc: '-ый → -ой (variant)' },
  { find: /е/gi, replace: 'ё', weight: 0.15, desc: 'е → ё (with dots)' },
  { find: /ё/gi, replace: 'е', weight: 0.20, desc: 'ё → е (dots omitted)' },
  { find: /ци/gi, replace: 'цы', weight: 0.08, desc: 'и → ы after ц (archaic)' },
  { find: /ться$/gi, replace: 'тся', weight: 0.06, desc: '-ться → -тся (infinitive clipped)' },
];

/*
 * Ukrainian-specific variation rules.
 *
 * These model real spelling variation in Ukrainian placenames:
 * - Orthography shifts (-ий→-ій)
 * - Rare letter substitution (ґ→г)
 * - Palatalization (-ськ→-зьк)
 */
const UKRAINIAN_RULES: VariationRule[] = [
  ...SLAVIC_RULES,
  { find: /ий$/gi, replace: 'ій', weight: 0.10, desc: '-ий → -ій (orthography shift)' },
  { find: /ґ/gi, replace: 'г', weight: 0.08, desc: 'ґ → г (rare substitution)' },
  { find: /ськ/gi, replace: 'зьк', weight: 0.06, desc: '-ськ → -зьк (palatalization)' },
];

/*
 * Polish-specific variation rules.
 *
 * These model real spelling variation in Polish placenames:
 * - Diacritic loss (-ów→-ow) and dialectal variants (-ów→-ovo)
 * * Consonant merger (rz→ż, ch→h)
 * - Nasal vowel older forms (ą→om, ę→em)
 * - Orthographic change (-ła→-la)
 */
const POLISH_RULES: VariationRule[] = [
  { find: /ów$/gi, replace: 'ow', weight: 0.15, desc: '-ów → -ow (older spelling)' },
  { find: /ów$/gi, replace: 'ovo', weight: 0.06, desc: '-ów → -ovo (dialect)' },
  { find: /rz/gi, replace: 'ż', weight: 0.06, desc: 'rz → ż (merger in speech)' },
  { find: /ch/gi, replace: 'h', weight: 0.08, desc: 'ch → h (dialect)' },
  { find: /ą/gi, replace: 'om', weight: 0.06, desc: 'ą → om (older spelling)' },
  { find: /ę/gi, replace: 'em', weight: 0.06, desc: 'ę → em (older spelling)' },
  { find: /ła$/gi, replace: 'la', weight: 0.06, desc: '-ła → -la (orthographic change)' },
];

/*
 * Czech-specific variation rules.
 *
 * These model real spelling variation in Czech placenames:
 * - Possessive form shift (-ov→-ův)
 * - German-influenced spelling (-ice→-itz)
 * - Older spelling (ů→uo)
 * - Feminine form (-ov→-ová)
 * - Germanized spelling in Silesia (ř→rz)
 */
const CZECH_RULES: VariationRule[] = [
  { find: /ov$/gi, replace: 'ův', weight: 0.08, desc: '-ov → -ův (possessive form shift)' },
  { find: /ice$/gi, replace: 'itz', weight: 0.10, desc: '-ice → -itz (German-influenced)' },
  { find: /ů/gi, replace: 'uo', weight: 0.08, desc: 'ů → uo (older Hus reform spelling)' },
  { find: /ř/gi, replace: 'rz', weight: 0.06, desc: 'ř → rz (Germanized in Silesia)' },
];

/*
 * Slovak-specific variation rules.
 *
 * These model real spelling variation in Slovak placenames:
 * - Neuter endings (-ov→-ovo)
 * - Standardization (ä→e)
 * - Older spelling (ô→uo)
 */
const SLOVAK_RULES: VariationRule[] = [
  { find: /ä/gi, replace: 'e', weight: 0.10, desc: 'ä → e (standard)' },
  { find: /ô/gi, replace: 'uo', weight: 0.08, desc: 'ô → uo (older spelling)' },
];

/*
 * Bulgarian-specific variation rules.
 *
 * These model real spelling variation in Bulgarian placenames:
 * - Dialectal vowel shift (ъ→а)
 * * Gender agreement shift (-ски→-ска)
 * - Soft ending variation (-ов→-ев)
 * - Diminutive suffix shift (-ец→-ица)
 * - Yat variation (-ия→-ий, яд→ед)
 */
const BULGARIAN_RULES: VariationRule[] = [
  ...SLAVIC_RULES,
  { find: /ъ/gi, replace: 'а', weight: 0.10, desc: 'ъ → а (Western dialect)' },
  { find: /ия$/gi, replace: 'ий', weight: 0.06, desc: '-ия → -ий (final yat variation)' },
  { find: /яд/gi, replace: 'ед', weight: 0.08, desc: 'яд → ед (yat border variation)' },
];

/*
 * Irish orthographic variation rules.
 *
 * These model real spelling variation in Irish placenames:
 * - Lenition-based consonant shifts (bh→v, mh→v)
 * - Older/archaic spellings (-ach→-agh, -aidh→-aí)
 * - Reduced forms (-mh→-v, -adh→-ú)
 * - Síneadh fada (accent) addition/removal
 * - Spelling simplification (ae→e)
 */
const IRISH_RULES: VariationRule[] = [
  { find: /bh/gi, replace: 'v', weight: 0.10, desc: 'bh → v (older Latin-influenced)' },
  { find: /mh/gi, replace: 'v', weight: 0.10, desc: 'mh → v (older Latin-influenced)' },
  { find: /ach$/gi, replace: 'agh', weight: 0.12, desc: '-ach → -agh (older spelling)' },
  { find: /aidh$/gi, replace: 'aí', weight: 0.08, desc: '-aidh → -aí (modern simplified)' },
  { find: /mh$/gi, replace: 'v', weight: 0.08, desc: '-mh → -v (reduced)' },
  { find: /adh$/gi, replace: 'ú', weight: 0.08, desc: '-adh → -ú (modern reduction)' },
  { find: /ae/gi, replace: 'e', weight: 0.06, desc: 'ae → e (spelling simplification)' },

  // Síneadh fada addition/removal
  { find: /a/gi, replace: 'á', weight: 0.05, desc: 'a → á (fada addition)' },
  { find: /e/gi, replace: 'é', weight: 0.05, desc: 'e → é (fada addition)' },
  { find: /i/gi, replace: 'í', weight: 0.05, desc: 'i → í (fada addition)' },
  { find: /o/gi, replace: 'ó', weight: 0.05, desc: 'o → ó (fada addition)' },
  { find: /u/gi, replace: 'ú', weight: 0.05, desc: 'u → ú (fada addition)' },
  { find: /á/gi, replace: 'a', weight: 0.05, desc: 'á → a (fada removal)' },
  { find: /é/gi, replace: 'e', weight: 0.05, desc: 'é → e (fada removal)' },
  { find: /í/gi, replace: 'i', weight: 0.05, desc: 'í → i (fada removal)' },
  { find: /ó/gi, replace: 'o', weight: 0.05, desc: 'ó → o (fada removal)' },
  { find: /ú/gi, replace: 'u', weight: 0.05, desc: 'ú → u (fada removal)' },
];

/*
 * Indonesian/Malay orthographic variation rules.
 *
 * These model real spelling variation in Indonesian/Malay placenames:
 * - 1972 spelling reform (dj→j, oe→u, tj→c, nj→ny, sj→sy)
 * - Archaic preserved forms (reverse of 1972 reform)
 * - Dutch-influenced spelling (j→y)
 * - Phonological variation (a→e, e→a, h-deletion, final -k loss)
 * - Arabic-influenced (-i→-in)
 * - Dialect variants (s→h, nasal assimilation p→m)
 *
 * Same orthography for word and ascii, so all rules affect both.
 */
const INDONESIAN_RULES: VariationRule[] = [
  // 1972 spelling reform (forward)
  { find: /dj/gi, replace: 'j', weight: 0.20, desc: 'dj → j (1972 reform, Indonesian)' },
  { find: /oe/gi, replace: 'u', weight: 0.20, desc: 'oe → u (1972 reform)' },
  { find: /tj/gi, replace: 'c', weight: 0.20, desc: 'tj → c (1972 reform)' },
  { find: /nj/gi, replace: 'ny', weight: 0.15, desc: 'nj → ny (1972 reform)' },
  { find: /sj/gi, replace: 'sy', weight: 0.10, desc: 'sj → sy (1972 reform)' },

  // Archaic reverse forms
  { find: /j/gi, replace: 'dj', weight: 0.10, desc: 'j → dj (archaic preserved, Malay)' },
  { find: /c/gi, replace: 'tj', weight: 0.08, desc: 'c → tj (archaic)' },
  { find: /u/gi, replace: 'oe', weight: 0.10, desc: 'u → oe (archaic)' },

  // Dutch-influenced
  { find: /j/gi, replace: 'y', weight: 0.08, desc: 'j → y (Dutch-influenced)' },

  // Phonological variation
  { find: /h(?<=[aeiou])h/gi, replace: '', weight: 0.08, desc: 'h deletion between identical vowels' },
  { find: /k$/gi, replace: '', weight: 0.08, desc: 'final -k loss' },
  { find: /i$/gi, replace: 'in', weight: 0.06, desc: '-i → -in (Arabic influence)' },
  { find: /(?<=[aeiou])s(?=[aeiou])/gi, replace: 'h', weight: 0.06, desc: 's → h between vowels (Jakarta dialect)' },
  { find: /p/gi, replace: 'm', weight: 0.10, desc: 'p → m (nasal assimilation before suffix)' },
];

/*
 * Tagalog orthographic variation rules.
 *
 * These model real spelling variation in Tagalog placenames:
 * - Indigenization (c→k, qu→k, x→ks)
 * - Filipinization (ñ→ny, ñ→n)
 * - Older Spanish-influenced (-aw→-au, -ay→-ai)
 * - Dialectal (s→h, r→d word-initially, d→r between vowels)
 * - Phonological (l→r before d/t, -ng→-n final, -oan→-wan)
 *
 * Same orthography for word and ascii.
 */
const TAGALOG_RULES: VariationRule[] = [
  { find: /c/gi, replace: 'k', weight: 0.15, desc: 'c → k (indigenization)' },
  { find: /qu/gi, replace: 'k', weight: 0.12, desc: 'qu → k (indigenization)' },
  { find: /x/gi, replace: 'ks', weight: 0.08, desc: 'x → ks (Latinization)' },
  { find: /ng$/gi, replace: 'n', weight: 0.06, desc: '-ng → -n (final reduction)' },
  { find: /ñ/gi, replace: 'ny', weight: 0.12, desc: 'ñ → ny (Filipinized)' },
  { find: /ñ/gi, replace: 'n', weight: 0.08, desc: 'ñ → n (simplified)' },
  { find: /aw$/gi, replace: 'au', weight: 0.06, desc: '-aw → -au (older Spanish-influenced)' },
  { find: /ay$/gi, replace: 'ai', weight: 0.06, desc: '-ay → -ai (older Spanish-influenced)' },
  { find: /^r/gi, replace: 'd', weight: 0.08, desc: 'r → d at word start' },
  { find: /(?<=[aeiou])d(?=[aeiou])/gi, replace: 'r', weight: 0.08, desc: 'd → r between vowels' },
  { find: /(?<=[aeiou])s(?=[aeiou])/gi, replace: 'h', weight: 0.08, desc: 's → h between vowels (dialect)' },
  { find: /oan$/gi, replace: 'wan', weight: 0.06, desc: '-oan → -wan (rebracketing)' },
  { find: /l(?=[dt])/gi, replace: 'r', weight: 0.06, desc: 'l → r before d/t' },
];

/*
 * Arabic romanization variation rules.
 *
 * These model real dialectal variation in romanized Arabic placenames.
 * Rules operate on the romanized (ASCII) form only.
 *
 * Dialect-specific rules are in separate arrays per dialect code.
 * Common rules (short vowel deletion) apply to all dialects.
 */
const ARABIC_COMMON_RULES: VariationRule[] = [
  { find: /(?<=.)[aiu](?=.)/gi, replace: '', weight: 0.10, desc: 'short vowel deletion (casual)' },
];

const ARABIC_EG_RULES: VariationRule[] = [
  ...ARABIC_COMMON_RULES,
  { find: /q/gi, replace: "'", weight: 0.10, desc: 'q → hamza (Egyptian)' },
  { find: /j/gi, replace: 'g', weight: 0.12, desc: 'j → g (Egyptian)' },
  { find: /th/gi, replace: 't', weight: 0.15, desc: 'th → t (Egyptian)' },
  { find: /dh/gi, replace: 'd', weight: 0.15, desc: 'dh → d (Egyptian)' },
  { find: /dh/gi, replace: 'ḍ', weight: 0.10, desc: 'dh → ḍ (Egyptian)' },
  { find: /ʿ/gi, replace: "'", weight: 0.08, desc: 'ʿ → hamza (Egyptian)' },
  { find: /a(?=t?$)/gi, replace: 'e', weight: 0.12, desc: 'final -a(t) → -e (Egyptian)' },
  { find: /ā/gi, replace: 'ē', weight: 0.10, desc: 'ā → ē (imāla, Egyptian)' },
  { find: /in$/gi, replace: 'en', weight: 0.10, desc: '-in → -en (casual, Egyptian)' },
  { find: /un$/gi, replace: 'en', weight: 0.08, desc: '-un → -en (casual, Egyptian)' },
];

const ARABIC_LB_RULES: VariationRule[] = [
  ...ARABIC_COMMON_RULES,
  { find: /q/gi, replace: 'g', weight: 0.15, desc: 'q → g (Levantine)' },
  { find: /q/gi, replace: "'", weight: 0.10, desc: 'q → hamza (Levantine)' },
  { find: /j/gi, replace: 'z', weight: 0.10, desc: 'j → z (Levantine)' },
  { find: /th/gi, replace: 's', weight: 0.08, desc: 'th → s (Levantine)' },
  { find: /dh/gi, replace: 'd', weight: 0.15, desc: 'dh → d (Levantine)' },
  { find: /a(?=t?$)/gi, replace: 'e', weight: 0.12, desc: 'final -a(t) → -e (Levantine)' },
  { find: /ā/gi, replace: 'ē', weight: 0.10, desc: 'ā → ē (imāla, Levantine)' },
  { find: /in$/gi, replace: 'en', weight: 0.10, desc: '-in → -en (casual, Levantine)' },
  { find: /un$/gi, replace: 'en', weight: 0.08, desc: '-un → -en (casual, Levantine)' },
];

const ARABIC_AE_RULES: VariationRule[] = [
  ...ARABIC_COMMON_RULES,
  { find: /q/gi, replace: 'g', weight: 0.15, desc: 'q → g (Gulf)' },
  { find: /k/gi, replace: 'ch', weight: 0.08, desc: 'k → ch (Gulf)' },
  { find: /th/gi, replace: 't', weight: 0.15, desc: 'th → t (Gulf)' },
  { find: /dh/gi, replace: 'd', weight: 0.15, desc: 'dh → d (Gulf)' },
  { find: /ā/gi, replace: 'ō', weight: 0.10, desc: 'ā → ō (Gulf)' },
];

const ARABIC_MA_RULES: VariationRule[] = [
  ...ARABIC_COMMON_RULES,
  { find: /q/gi, replace: 'g', weight: 0.15, desc: 'q → g (Maghrebi)' },
  { find: /ʿ/gi, replace: "'", weight: 0.08, desc: 'ʿ → hamza (Maghrebi)' },
];

export const ORTHOGRAPHIC_VARIATION_RULES: Record<string, VariationRule[]> = {
  'en-phon': ENGLISH_RULES,
  'en-ang': ENGLISH_RULES,
  'en': ENGLISH_RULES,
  'de': GERMAN_RULES,
  'nl': DUTCH_RULES,
  'sv': SWEDISH_RULES,
  'da': DANISH_RULES,
  'fr': FRENCH_RULES,
  'es': SPANISH_RULES,
  'it': ITALIAN_RULES,
  'pt': PORTUGUESE_RULES,
  'ro': ROMANIAN_RULES,
  'ru': RUSSIAN_RULES,
  'uk': UKRAINIAN_RULES,
  'pl': POLISH_RULES,
  'cs': CZECH_RULES,
  'sk': SLOVAK_RULES,
  'bg': BULGARIAN_RULES,
  'ga': IRISH_RULES,
  'id': INDONESIAN_RULES,
  'ms': INDONESIAN_RULES,
  'tl': TAGALOG_RULES,
  'ar-EG': ARABIC_EG_RULES,
  'ar-LB': ARABIC_LB_RULES,
  'ar-AE': ARABIC_AE_RULES,
  'ar-MA': ARABIC_MA_RULES,
};

function selectActiveRules(
  rules: VariationRule[],
  variation: number,
  rand: RandFn
): VariationRule[] {
  return rules.filter(r => rand() < variation * r.weight);
}

function applyRulesWithTrace(
  token: string,
  rules: VariationRule[],
  lang: string
): { result: string; trace: TraceEntry[] } {
  const trace: TraceEntry[] = [];
  let result = token.toLowerCase();

  for (const rule of rules) {
    const before = result;
    result = result.replace(rule.find, rule.replace);
    if (result !== before) {
      trace.push({
        token,
        ruleDesc: rule.desc,
        pattern: rule.find.source,
        replacement: rule.replace,
        before,
        after: result,
      });
    }
  }

  if (trace.length === 0) {
    return { result: token, trace: [] };
  }
  result = result.charAt(0).toUpperCase() + result.slice(1).replace(/-([a-z])/g, (_, c) => '-' + c.toUpperCase());
  return { result, trace };
}

function applyRulesNoTrace(
  token: string,
  rules: VariationRule[]
): string {
  let result = token.toLowerCase();
  let changed = false;
  for (const rule of rules) {
    const before = result;
    result = result.replace(rule.find, rule.replace);
    if (result !== before) changed = true;
  }
  if (!changed) return token;
  return result.charAt(0).toUpperCase() + result.slice(1).replace(/-([a-z])/g, (_, c) => '-' + c.toUpperCase());
}

function _applyOrthographicVariation(
  word: string,
  ascii: string,
  lang: string,
  corruption: number,
  rand: RandFn,
  debug: boolean
): { word: string; ascii: string; trace: TraceEntry[] } {
  const rules = ORTHOGRAPHIC_VARIATION_RULES[lang];
  if (!rules || corruption <= 0) return { word, ascii, trace: [] };

  const activeRules = selectActiveRules(rules, corruption, rand);
  if (activeRules.length === 0) return { word, ascii, trace: [] };

  const asciiSafe = (r: VariationRule) => [...r.replace].every(c => c.charCodeAt(0) <= 127);

  const applyTo = (text: string, trace: TraceEntry[], rules: VariationRule[]): string => {
    const tokens = text.split(/(\s+)/);
    return tokens.map(t => {
      if (/^\s+$/.test(t)) return t;
      if (debug) {
        const { result, trace: tTrace } = applyRulesWithTrace(t, rules, lang);
        trace.push(...tTrace);
        return result;
      }
      return applyRulesNoTrace(t, rules);
    }).join('');
  };

  const trace: TraceEntry[] = [];
  const wordResult = applyTo(word, trace, activeRules);

  const transliterator = TRANSLITERATORS[lang];
  if (transliterator) {
    return {
      word: wordResult,
      ascii: transliterator(wordResult),
      trace,
    };
  }

  if (word === ascii) {
    return {
      word: wordResult,
      ascii: wordResult,
      trace,
    };
  }

  return {
    word: wordResult,
    ascii: applyTo(ascii, trace, activeRules.filter(asciiSafe)),
    trace,
  };
}

export const applyOrthographicVariation = (
  word: string,
  ascii: string,
  lang: string,
  variation: number
): { word: string; ascii: string } => {
  const result = _applyOrthographicVariation(word, ascii, lang, variation, Math.random, false);
  return { word: result.word, ascii: result.ascii };
};

export const debugOrthographicVariation = (
  word: string,
  ascii: string,
  lang: string,
  variation: number,
  seed?: number
): VariationDebugResult => {
  const actualSeed = seed ?? Date.now();
  const rand = mulberry32(actualSeed);
  const rules = ORTHOGRAPHIC_VARIATION_RULES[lang] ?? [];
  const result = _applyOrthographicVariation(word, ascii, lang, variation, rand, true);

  return {
    word: result.word,
    ascii: result.ascii,
    trace: result.trace,
    seed: actualSeed,
    lang,
    corruption: variation,
    rulesConsidered: rules.length,
    rulesActive: rules.filter(r => variation * r.weight > 0).length,
  };
};
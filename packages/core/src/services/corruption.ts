export type CorruptionRule = {
  find: RegExp;
  replace: string;
  weight: number;
  desc: string;
};

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
const ENGLISH_RULES: CorruptionRule[] = [

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

export const CORRUPTION_RULES: Record<string, CorruptionRule[]> = {
  'en-phon': ENGLISH_RULES,
  'en-ang': ENGLISH_RULES,
  'en': ENGLISH_RULES,
};

export const applyCorruption = (
  word: string,
  ascii: string,
  lang: string,
  corruption: number
): { word: string; ascii: string } => {
  const rules = CORRUPTION_RULES[lang];
  if (!rules || corruption <= 0) return { word, ascii };

  // Precompute which rules fire ONCE — same decisions for both fields
  const activeRules = rules.filter(r => Math.random() < corruption * r.weight);
  if (activeRules.length === 0) return { word, ascii };

  const processToken = (token: string): string => {
    let result = token.toLowerCase();
    for (const rule of activeRules) {
      result = result.replace(rule.find, rule.replace);
    }
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const applyTo = (text: string): string => {
    // Split on spaces, keeping separators, so each word is processed independently.
    // This fixes two problems:
    //   1. Inner-word capitalization (each token gets title-cased)
    //   2. $ anchors now match per-token, not just end of string
    const tokens = text.split(/(\s+)/);
    return tokens.map(t => /^\s+$/.test(t) ? t : processToken(t)).join('');
  };

  const wordResult = applyTo(word);
  return {
    word: wordResult,
    ascii: word === ascii ? wordResult : applyTo(ascii),
  };
};
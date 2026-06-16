import { debugCorruption } from './corruption';

interface BaitCase {
  word: string;
  ascii: string;
  lang: string;
  label: string;
}

const baitCases: BaitCase[] = [
  { word: 'Manchester', ascii: 'Manchester', lang: 'en', label: 'EN -chester' },
  { word: 'Canterbury', ascii: 'Canterbury', lang: 'en', label: 'EN -bury' },
  { word: 'Berwick', ascii: 'Berwick', lang: 'en', label: 'EN -wick' },
  { word: 'Shipton', ascii: 'Shipton', lang: 'en', label: 'EN sh-' },
  { word: 'Kirkby', ascii: 'Kirkby', lang: 'en', label: 'EN k-' },
  { word: 'Middleton', ascii: 'Middleton', lang: 'en', label: 'EN geminate' },
  { word: 'Freiburg', ascii: 'Freiburg', lang: 'de', label: 'DE -burg' },
  { word: 'Düsseldorf', ascii: 'Düsseldorf', lang: 'de', label: 'DE -dorf' },
  { word: 'Badenheim', ascii: 'Badenheim', lang: 'de', label: 'DE -heim' },
  { word: 'Feldstein', ascii: 'Feldstein', lang: 'de', label: 'DE -stein' },
  { word: 'München', ascii: 'Muenchen', lang: 'de', label: 'DE umlaut' },
  { word: 'Stockholm', ascii: 'Stockholm', lang: 'sv', label: 'SV -holm' },
  { word: 'Barcelona', ascii: 'Barcelona', lang: 'es', label: 'ES -ona' },
  { word: 'Castellón', ascii: 'Castellon', lang: 'es', label: 'ES -ón' },
  { word: 'București', ascii: 'Bucuresti', lang: 'ro', label: 'RO -ești' },
  { word: 'Constanța', ascii: 'Constanta', lang: 'ro', label: 'RO -ța' },
  { word: 'Волгоград', ascii: 'Volgograd', lang: 'ru', label: 'RU -град' },
  { word: 'Краков', ascii: 'Krakov', lang: 'ru', label: 'RU -ов' },
  { word: 'České Budějovice', ascii: 'Ceske Budejovice', lang: 'cs', label: 'CS -ovice' },
  { word: 'Baile Átha Cliath', ascii: 'Baile Atha Cliath', lang: 'ga', label: 'GA fada' },
  { word: 'Kuching', ascii: 'Kuching', lang: 'id', label: 'ID -ing' },
  { word: 'Caloocan', ascii: 'Caloocan', lang: 'tl', label: 'TL c-' },
  { word: 'Al-Qahira', ascii: 'Al-Qahira', lang: 'ar-EG', label: 'ar-EG Cairo' },
  { word: 'Bayrut', ascii: 'Bayrut', lang: 'ar-LB', label: 'ar-LB Beirut' },
  { word: 'Dubai', ascii: 'Dubai', lang: 'ar-AE', label: 'ar-AE Dubai' },
  { word: 'Al-Jazair', ascii: 'Al-Jazair', lang: 'ar-MA', label: 'ar-MA Algiers' },
  // Multi-token tests
  { word: 'Saint-Jean-de-Luz', ascii: 'Saint-Jean-de-Luz', lang: 'fr', label: 'FR hyphenated multi' },
  { word: 'Mont-Saint-Michel', ascii: 'Mont-Saint-Michel', lang: 'fr', label: 'FR hyphenated Mont' },
  { word: 'Newcastle-under-Lyme', ascii: 'Newcastle-under-Lyme', lang: 'en', label: 'EN multi-hyphen' },
  { word: 'Băile Herculane', ascii: 'Baile Herculane', lang: 'ro', label: 'RO multi-word' },
  { word: 'Veliko Tarnovo', ascii: 'Veliko Tarnovo', lang: 'bg', label: 'BG multi-word' },
  { word: 'San Sebastián', ascii: 'San Sebastian', lang: 'es', label: 'ES accent multi' },
  // Short edge cases
  { word: 'Ål', ascii: 'Aal', lang: 'da', label: 'DA very short' },
  { word: 'E', ascii: 'E', lang: 'en', label: 'EN single letter' },
];

const MIN_SEED = 0;
const MAX_SEED = 99;
const CORRUPTION = 1.0;

interface QualityIssue {
  seed: number;
  field: 'word' | 'ascii';
  value: string;
  issue: string;
}

interface CaseQuality {
  label: string;
  lang: string;
  input: string;
  totalFires: number;
  uniqueOutputs: Map<string, { fires: number; seeds: number[] }>;
  issues: QualityIssue[];
  multiToken: boolean;
  hasHyphen: boolean;
  hasCyrillic: boolean;
}

// Helper: detect if a name has multiple space-separated tokens
function isMultiToken(w: string): boolean {
  return w.includes(' ');
}

// Helper: detect hyphens
function hasHyphen(w: string): boolean {
  return w.includes('-');
}

// Helper: detect Cyrillic
function hasCyrillic(w: string): boolean {
  return /[\u0400-\u04FF]/.test(w);
}

const results: CaseQuality[] = [];

for (const bc of baitCases) {
  const uniqueOutputs = new Map<string, { fires: number; seeds: number[] }>();
  const issues: QualityIssue[] = [];

  for (let seed = MIN_SEED; seed <= MAX_SEED; seed++) {
    const result = debugCorruption(bc.word, bc.ascii, bc.lang, CORRUPTION, seed);
    if (result.trace.length === 0) continue;

    const key = `${result.word}|${result.ascii}`;
    if (!uniqueOutputs.has(key)) {
      uniqueOutputs.set(key, { fires: 0, seeds: [] });
    }
    const entry = uniqueOutputs.get(key)!;
    entry.fires++;
    entry.seeds.push(seed);

    // Quality checks
    // 1. Check for empty result
    if (result.word.length === 0) {
      issues.push({ seed, field: 'word', value: result.word, issue: 'EMPTY WORD' });
    }
    if (result.ascii.length === 0) {
      issues.push({ seed, field: 'ascii', value: result.ascii, issue: 'EMPTY ASCII' });
    }

    // 2. Check that word length isn't wildly different from input (more than 2x)
    if (result.word.length > bc.word.length * 2 + 3 && bc.word.length > 0) {
      issues.push({ seed, field: 'word', value: result.word, issue: `WORD TOO LONG (${result.word.length} vs ${bc.word.length})` });
    }
    if (result.ascii.length > bc.ascii.length * 2 + 3 && bc.ascii.length > 0) {
      issues.push({ seed, field: 'ascii', value: result.ascii, issue: `ASCII TOO LONG (${result.ascii.length} vs ${bc.ascii.length})` });
    }

    // 3. Check for double spaces (multi-word names)
    if (result.word.includes('  ')) {
      issues.push({ seed, field: 'word', value: result.word, issue: 'DOUBLE SPACE' });
    }
    if (result.ascii.includes('  ')) {
      issues.push({ seed, field: 'ascii', value: result.ascii, issue: 'DOUBLE SPACE ASCII' });
    }

    // 4. Check token count change for multi-word names
    const inputTokens = bc.word.split(/[\s-]+/).length;
    const outputTokens = result.word.split(/[\s-]+/).length;
    if (inputTokens !== outputTokens) {
      issues.push({ seed, field: 'word', value: result.word, issue: `TOKEN COUNT CHANGED ${inputTokens}→${outputTokens}` });
    }

    // 5. Check hyphen placement for hyphenated inputs
    if (bc.word.includes('-') && result.word.includes('-')) {
      const inputHyphens = bc.word.match(/-/g)?.length ?? 0;
      const outputHyphens = result.word.match(/-/g)?.length ?? 0;
      if (inputHyphens !== outputHyphens) {
        issues.push({ seed, field: 'word', value: result.word, issue: `HYPHEN COUNT CHANGED ${inputHyphens}→${outputHyphens}` });
      }
    }

    // 6. Check that ascii preserves the same non-alpha structure (spaces, hyphens)
    const asciiNonAlpha = result.ascii.replace(/[a-zA-Z]/g, '');
    const inputAsciiNonAlpha = bc.ascii.replace(/[a-zA-Z]/g, '');
    // Only flag if non-alpha chars changed in structure (not just count)
    if (asciiNonAlpha.length !== inputAsciiNonAlpha.length) {
      // This can be OK (e.g. diacritics produce multi-char ascii), but flag if spaces/hyphens disappear
      const asciiSpaces = (result.ascii.match(/[\s-]/g) || []).length;
      const inputSpaces = (bc.ascii.match(/[\s-]/g) || []).length;
      if (asciiSpaces !== inputSpaces) {
        issues.push({ seed, field: 'ascii', value: result.ascii, issue: `ASCII SPACE/HYPHEN STRUCTURE CHANGED` });
      }
    }

    // 7. Check for leading/trailing whitespace
    if (result.word !== result.word.trim()) {
      issues.push({ seed, field: 'word', value: result.word, issue: 'LEADING/TRAILING WHITESPACE' });
    }
  }

  if (uniqueOutputs.size > 0 || issues.length > 0) {
    results.push({
      label: bc.label,
      lang: bc.lang,
      input: bc.word,
      totalFires: Array.from(uniqueOutputs.values()).reduce((s, v) => s + v.fires, 0),
      uniqueOutputs,
      issues,
      multiToken: isMultiToken(bc.word),
      hasHyphen: hasHyphen(bc.word),
      hasCyrillic: hasCyrillic(bc.word),
    });
  }
}

// ── REPORT ──
console.log('='.repeat(72));
console.log('QUALITY EVALUATION REPORT');
console.log(`Seeds ${MIN_SEED}-${MAX_SEED}, corruption=${CORRUPTION}`);
console.log('='.repeat(72));

let totalIssues = 0;
let totalOutputs = 0;

for (const r of results) {
  const tags: string[] = [];
  if (r.multiToken) tags.push('multi');
  if (r.hasHyphen) tags.push('hyphen');
  if (r.hasCyrillic) tags.push('cyrillic');

  console.log(`\n── ${r.label} (${r.lang}) ── "${r.input}" ${tags.length ? `[${tags.join(', ')}]` : ''}`);
  console.log(`   Total fires: ${r.totalFires} across ${r.uniqueOutputs.size} unique outputs`);

  // Show all unique outputs
  let idx = 0;
  for (const [key, info] of r.uniqueOutputs.entries()) {
    const [word, ascii] = key.split('|');
    const tag = idx === 0 ? '✓' : '·';
    console.log(`   ${tag} "${word}" / "${ascii}" (${info.fires}x, seeds ${info.seeds.slice(0, 5).join(',')}${info.seeds.length > 5 ? '...' : ''})`);
    idx++;
  }

  // Highlight issues
  if (r.issues.length > 0) {
    console.log(`   ⚠ ISSUES (${r.issues.length}):`);
    for (const iss of r.issues) {
      console.log(`     seed=${iss.seed} [${iss.field}] "${iss.value}" — ${iss.issue}`);
      totalIssues++;
    }
  }
  totalOutputs += Array.from(r.uniqueOutputs.values()).reduce((s, v) => s + v.fires, 0);
}

// Overall quality summary
console.log(`\n${'='.repeat(72)}`);
console.log('QUALITY SUMMARY');
console.log('='.repeat(72));
console.log(`Cases evaluated: ${results.length}`);
console.log(`Total firings checked: ${totalOutputs}`);
console.log(`Total quality issues found: ${totalIssues}`);

if (totalIssues > 0) {
  console.log(`\nISSUE BREAKDOWN:`);
  const byIssue = new Map<string, number>();
  for (const r of results) {
    for (const iss of r.issues) {
      byIssue.set(iss.issue, (byIssue.get(iss.issue) || 0) + 1);
    }
  }
  for (const [issue, count] of byIssue) {
    console.log(`  ${issue}: ${count}`);
  }
} else {
  console.log('\n✓ No quality issues detected across all tests.');
}

// Additional observations
console.log(`\n${'='.repeat(72)}`);
console.log('ADDITIONAL OBSERVATIONS');
console.log('='.repeat(72));

// Best multi-variant cases (most diverse outputs)
const sorted = [...results].sort((a, b) => b.uniqueOutputs.size - a.uniqueOutputs.size);
console.log('\nTop 5 most diverse outputs:');
for (const r of sorted.slice(0, 5)) {
  console.log(`  ${r.label} (${r.lang}) — ${r.uniqueOutputs.size} unique variants`);
  for (const [key] of r.uniqueOutputs) {
    const [word] = key.split('|');
    console.log(`    → "${word}"`);
  }
}

// Check for reversible rule pairs (e.g. a→b then b→a in same run)
console.log('\nReversible rule interactions (both directions firing on same token):');
for (const r of results) {
  for (const [key, info] of r.uniqueOutputs.entries()) {
    if (info.fires >= 20) continue; // skip high-frequency cases, focus on interesting ones
    const [word] = key.split('|');
    if (word === r.input) {
      console.log(`  ${r.label}: "${r.input}" → "${word}" (no net change) — seeds: ${info.seeds.slice(0, 3).join(',')}`);
    }
  }
}

console.log(`\n${'='.repeat(72)}`);
console.log('DONE');
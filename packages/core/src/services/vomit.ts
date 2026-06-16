import { applyCorruption, debugCorruption } from './corruption';

const SEP = '-'.repeat(60);

// ── 1. Debug corruption per language ──
const testNames: { name: string; lang: string }[] = [
  // English
  { name: 'Saint-Jean-de-Luz', lang: 'en' },
  { name: 'Berwick-under-Wick', lang: 'en' },
  { name: 'Middle-Town', lang: 'en' },
  { name: 'Shipton-Under-Hill', lang: 'en' },
  { name: 'Broadway', lang: 'en' },
  { name: 'Newcastle', lang: 'en' },
  // Romanian
  { name: 'București', lang: 'ro' },
  { name: 'Constanța', lang: 'ro' },
  { name: 'Târgu Mureș', lang: 'ro' },
  // Arabic (use dialect codes: ar-EG Egyptian, ar-LB Levantine, ar-AE Gulf, ar-MA Maghrebi)
  { name: 'Al-Qahira', lang: 'ar-EG' },  // Cairo → Egyptian
  { name: 'Dubai', lang: 'ar-AE' },      // Dubai → Gulf
  { name: 'Bayrut', lang: 'ar-LB' },     // Beirut → Levantine
  { name: 'Al-Jazair', lang: 'ar-MA' },  // Algeria → Maghrebi
  { name: 'Al-Quds', lang: 'ar-LB' },    // Jerusalem → Levantine
  // Irish
  { name: 'Baile Atha Cliath', lang: 'ga' },
  { name: 'An Cabhan', lang: 'ga' },
  // French
  { name: 'Mont-Saint-Michel', lang: 'fr' },
  { name: 'Saint-Jean', lang: 'fr' },
  // Russian / cyrillic
  { name: 'Krakov', lang: 'ru' },
  { name: 'Moskva', lang: 'ru' },
];

console.log('\n=== CORRUPTION QUALITY (corr=1.0, seeds 0-9) ===\n');

for (const { name, lang } of testNames) {
  console.log(`--- ${name} (${lang}) ---`);
  for (let s = 0; s < 10; s++) {
    const r = debugCorruption(name, name, lang, 1.0, s);
    const trace = r.trace.map(t => `${t.ruleDesc}["${t.before}"→"${t.after}"]`).join('; ');
    console.log(`  seed=${s}: "${r.word}"${trace ? '  ← ' + trace : ''}`);
  }
  console.log();
}

// ── 2. ascii vs primary field comparison (spot-check) ──
console.log(SEP);
console.log('\n=== ASCII vs PRIMARY FIELD (corr=1.0, seed=42) ===\n');

for (const { name, lang } of testNames) {
  const r1 = applyCorruption(name, name, lang, 1.0, 42);
  const r2 = applyCorruption(name, name, lang, 1.0, 43);
  console.log(`  ${name} (${lang})`);
  console.log(`    seed=42:  "${r1.word}"  ascii="${r1.ascii}"`);
  console.log(`    seed=43:  "${r2.word}"  ascii="${r2.ascii}"`);
}

// ── 3. Worst-case Arabic vowel deletion ──
console.log(SEP);
console.log('\n=== ARABIC VOWEL DELETION (seeds 0-199, corr=1.0) ===\n');

const arabic = ['Al-Qahira', 'Dubai', 'Bayrut', 'Al-Jazair', 'Al-Quds'];
for (const name of arabic) {
  const outputs = new Set<string>();
  for (let s = 0; s < 200; s++) {
    const r = applyCorruption(name, name, 'ar', 1.0, s);
    outputs.add(r.word);
  }
  console.log(`  ${name}: ${outputs.size} unique outputs`);
  const sorted = [...outputs].sort((a, b) => a.length - b.length);
  console.log(`    5 shortest: ${sorted.slice(0, 5).join(', ')}`);
  console.log(`    5 longest:  ${sorted.slice(-5).join(', ')}`);
}
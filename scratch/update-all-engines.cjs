const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/roten/Documents/GitHub/nowhere/packages/core/src/services/engines';

const updateFile = (relativePath, replacements) => {
  const absolutePath = path.join(baseDir, relativePath);
  let content = fs.readFileSync(absolutePath, 'utf8').replace(/\r\n/g, '\n');
  
  // Skip if already updated
  if (content.includes('dictionaryComponents:')) {
    console.log(`Skipping ${relativePath} (already updated)`);
    return;
  }
  
  for (const [findText, replaceText] of replacements) {
    const normalizedFind = findText.replace(/\r\n/g, '\n');
    const normalizedReplace = replaceText.replace(/\r\n/g, '\n');
    if (!content.includes(normalizedFind)) {
      console.error(`ERROR: Target text not found in ${relativePath}:\n-----\n${findText}\n-----`);
      process.exit(1);
    }
    content = content.replace(normalizedFind, normalizedReplace);
  }
  fs.writeFileSync(absolutePath, content, 'utf8');
  console.log(`Successfully updated ${relativePath}`);
};

// ==========================================
// 1. DANISH
// ==========================================
updateFile('germanic/danish.ts', [
  [
    `export const generateDanishPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.da && c.type === t);
  const roots = getPool('root');

  const type = Math.random();`,
    `export const generateDanishPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.da && c.type === t);
  const roots = getPool('root');

  const type = Math.random();`
  ],
  [
    `    // Adjective Inflection Logic
    if (pre.type === 'adjective') {`,
    `    components.push(\`[\${pre.type}: "\${pre.def}"]\`, \`[root: "\${root.def}"]\`);
    // Adjective Inflection Logic
    if (pre.type === 'adjective') {`
  ],
  [
    `    word = r + glue + s;`,
    `    components.push(\`[root: "\${root.def}"]\`);
    if (glue) components.push(\`[connector: "\${glue}"]\`);
    components.push(\`[suffix: "\${suf.def}"]\`);
    word = r + glue + s;`
  ],
  [
    `    word = v1 + glue + v2.toLowerCase();`,
    `    components.push(\`[root: "\${r1.def}"]\`);
    if (glue) components.push(\`[connector: "\${glue}"]\`);
    components.push(\`[root: "\${r2.def}"]\`);
    word = v1 + glue + v2.toLowerCase();`
  ],
  [
    `  return { word: word, ascii: transliterateDanishToAscii(word), generationRules: [rule] };`,
    `  return { word: word, ascii: transliterateDanishToAscii(word), generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 2. DUTCH
// ==========================================
updateFile('germanic/dutch.ts', [
  [
    `export const generateDutchPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.nl && c.type === t);
  const roots = getPool('root');

  const type = Math.random();`,
    `export const generateDutchPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.nl && c.type === t);
  const roots = getPool('root');

  const type = Math.random();`
  ],
  [
    `    // Adjective inflection logic
    if (pre.type === 'adjective' && ['Nieuw', 'Oud', 'Groot', 'Klein', 'Hoog', 'Laag'].includes(pre.def)) {`,
    `    components.push(\`[\${pre.type}: "\${pre.def}"]\`, \`[root: "\${root.def}"]\`);
    // Adjective inflection logic
    if (pre.type === 'adjective' && ['Nieuw', 'Oud', 'Groot', 'Klein', 'Hoog', 'Laag'].includes(pre.def)) {`
  ],
  [
    `    word = r + connector + s;`,
    `    components.push(\`[root: "\${root.def}"]\`);
    if (connector) components.push(\`[connector: "\${connector}"]\`);
    components.push(\`[suffix: "\${suf.def}"]\`);
    word = r + connector + s;`
  ],
  [
    `      const root = getRandomElement(genitives);
      const suf = getRandomElement(getPool('suffix'));
      word = \`'s-\dots\`.replace(/\\dots/g, '\\\${root}\\\${getVal(suf.nl)}');`,
    `      const root = getRandomElement(genitives);
      const suf = getRandomElement(getPool('suffix'));
      components.push(\`[prefix: "'s-"]\`, \`[root: "\${root}"]\`, \`[suffix: "\${suf.def}"]\`);
      word = \`'s-\${root}\${getVal(suf.nl)}\`;`
  ],
  [
    `    word = v1 + glue + v2.toLowerCase();`,
    `    components.push(\`[root: "\${root1.def}"]\`);
    if (glue) components.push(\`[connector: "\${glue}"]\`);
    components.push(\`[root: "\${root2.def}"]\`);
    word = v1 + glue + v2.toLowerCase();`
  ],
  [
    `  return { word: word, ascii: transliterateDutchToAscii(word), generationRules: [rule] };`,
    `  return { word: word, ascii: transliterateDutchToAscii(word), generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 3. FRENCH
// ==========================================
updateFile('romance/french.ts', [
  [
    `export const generateFrenchPlace = (): GeneratedResult => {
  let word = "";
  const roll = Math.random();`,
    `export const generateFrenchPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();`
  ],
  [
    `  // 1. Saint-X / Prefix-X
  if (roll < 0.20) {
    const prefixObj = getRandomElement(getPool(['prefix']));
    const rootObj = getRandomElement(getPool(['settlement', 'geo_major', 'bio_flora']));`,
    `  // 1. Saint-X / Prefix-X
  if (roll < 0.20) {
    rule = "Saint-X / Prefix-X";
    const prefixObj = getRandomElement(getPool(['prefix']));
    const rootObj = getRandomElement(getPool(['settlement', 'geo_major', 'bio_flora']));
    components.push(\`[\${prefixObj.type}: "\${prefixObj.def}"]\`, \`[\${rootObj.type}: "\${rootObj.def}"]\`);`
  ],
  [
    `  // 2. Root + Adjective
  else if (roll < 0.60) {
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      // EXPANSION: Universal Adjectives
      let adjTypes = ['adj_quality', 'adj_color'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
      const adjObj = getRandomElement(getPool(adjTypes));`,
    `  // 2. Root + Adjective
  else if (roll < 0.60) {
      rule = "Root + Adjective";
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      // EXPANSION: Universal Adjectives
      let adjTypes = ['adj_quality', 'adj_color'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
      const adjObj = getRandomElement(getPool(adjTypes));
      components.push(\`[\${rootObj.type}: "\${rootObj.def}"]\`, \`[\${adjObj.type}: "\${adjObj.def}"]\`);`
  ],
  [
    `  // 3. Composite (de)
  else if (roll < 0.85) {
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Universal Tails
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));`,
    `  // 3. Composite (de)
  else if (roll < 0.85) {
    rule = "Composite (de)";
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Universal Tails
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
    components.push(\`[\${headObj.type}: "\${headObj.def}"]\`, \`[\${tailObj.type}: "\${tailObj.def}"]\`);`
  ],
  [
    `  // 4. Root + Suffix
  else {
    // EXPANSION: Allow Geo Major suffixing
    const rootObj = getRandomElement(getPool(['settlement', 'bio_flora', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));`,
    `  // 4. Root + Suffix
  else {
    rule = "Root + Suffix";
    // EXPANSION: Allow Geo Major suffixing
    const rootObj = getRandomElement(getPool(['settlement', 'bio_flora', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));
    components.push(\`[\${rootObj.type}: "\${rootObj.def}"]\`, \`[\${suffixObj.type}: "\${suffixObj.def}"]\`);`
  ],
  [
    `  return { word: word, ascii: transliterateFrenchToAscii(word) };`,
    `  return { word: word, ascii: transliterateFrenchToAscii(word), generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 4. ITALIAN
// ==========================================
updateFile('romance/italian.ts', [
  [
    `export const generateItalianPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  const roll = Math.random();`,
    `export const generateItalianPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();`
  ],
  [
    `  // 1. San / Castel / Prefix Pattern
  if (roll < 0.25) {
      rule = "San / Castel / Prefix Pattern";
      if (Math.random() < 0.5) {
          // Saint
          const target = getRandomElement(getPool(['bio_fauna', 'abstract', 'bio_flora']));`,
    `  // 1. San / Castel / Prefix Pattern
  if (roll < 0.25) {
      rule = "San / Castel / Prefix Pattern";
      if (Math.random() < 0.5) {
          // Saint
          const target = getRandomElement(getPool(['bio_fauna', 'abstract', 'bio_flora']));
          components.push(\`[prefix: "San"]\`, \`[root: "\${target.def}"]\`);`
  ],
  [
    `      } else {
          // Common prefixes
          const prefixObj = getRandomElement(getPool(['prefix']));
          const rootObj = getRandomElement(getPool(['settlement', 'geo_major']));`,
    `      } else {
          // Common prefixes
          const prefixObj = getRandomElement(getPool(['prefix']));
          const rootObj = getRandomElement(getPool(['settlement', 'geo_major']));
          components.push(\`[\${prefixObj.type}: "\${prefixObj.def}"]\`, \`[\${rootObj.type}: "\${rootObj.def}"]\`);`
  ],
  [
    `  // 2. Root + Adjective
  else if (roll < 0.55) {
    rule = "Root + Adjective";
    const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
    
    // EXPANSION: Universal Adjectives
    let adjTypes = ['adj_quality', 'adj_color'];
    if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
    const adjObj = getRandomElement(getPool(adjTypes));`,
    `  // 2. Root + Adjective
  else if (roll < 0.55) {
    rule = "Root + Adjective";
    const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
    
    // EXPANSION: Universal Adjectives
    let adjTypes = ['adj_quality', 'adj_color'];
    if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
    const adjObj = getRandomElement(getPool(adjTypes));
    components.push(\`[\${rootObj.type}: "\${rootObj.def}"]\`, \`[\${adjObj.type}: "\${adjObj.def}"]\`);`
  ],
  [
    `  // 3. Root + Suffix
  else if (roll < 0.75) {
    rule = "Root + Suffix";
    // EXPANSION: Allow suffixing Geo Major
    const rootObj = getRandomElement(getPool(['geo_minor', 'settlement', 'bio_flora', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));`,
    `  // 3. Root + Suffix
  else if (roll < 0.75) {
    rule = "Root + Suffix";
    // EXPANSION: Allow suffixing Geo Major
    const rootObj = getRandomElement(getPool(['geo_minor', 'settlement', 'bio_flora', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));
    components.push(\`[\${rootObj.type}: "\${rootObj.def}"]\`, \`[\${suffixObj.type}: "\${suffixObj.def}"]\`);`
  ],
  [
    `  // 4. "Di" Construction
  else {
    rule = "Di Construction";
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Universal Tails
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));`,
    `  // 4. "Di" Construction
  else {
    rule = "Di Construction";
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Universal Tails
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
    components.push(\`[\${headObj.type}: "\${headObj.def}"]\`, \`[\${tailObj.type}: "\${tailObj.def}"]\`);`
  ],
  [
    `  return { word, ascii, generationRules: [rule] };`,
    `  return { word, ascii, generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 5. PORTUGUESE
// ==========================================
updateFile('romance/portuguese.ts', [
  [
    `export const generatePortuguesePlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  const roll = Math.random();`,
    `export const generatePortuguesePlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();`
  ],
  [
    `      if (useSaint) {
        const saintTarget = getRandomElement(getPool(['bio_fauna', 'bio_flora', 'abstract']));`,
    `      if (useSaint) {
        const saintTarget = getRandomElement(getPool(['bio_fauna', 'bio_flora', 'abstract']));
        components.push(\`[prefix: "Saint"]\`, \`[\${saintTarget.type}: "\${saintTarget.def}"]\`);`
  ],
  [
    `        // Combine with a noun or an adjective
        const tailObj = getRandomElement(getPool(['adj_quality', 'adj_color', 'bio_flora', 'settlement']));`,
    `        // Combine with a noun or an adjective
        const tailObj = getRandomElement(getPool(['adj_quality', 'adj_color', 'bio_flora', 'settlement']));
        components.push(\`[\${prefixObj.type}: "\${prefixObj.def}"]\`, \`[\${tailObj.type}: "\${tailObj.def}"]\`);`
  ],
  [
    `  // 2. Root + Adjective
  else if (roll < 0.60) {
      rule = "Root + Adjective";
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      // EXPANSION: Universal Adjectives
      let adjTypes = ['adj_quality', 'adj_color'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
      const adjObj = getRandomElement(getPool(adjTypes));`,
    `  // 2. Root + Adjective
  else if (roll < 0.60) {
      rule = "Root + Adjective";
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      // EXPANSION: Universal Adjectives
      let adjTypes = ['adj_quality', 'adj_color'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
      const adjObj = getRandomElement(getPool(adjTypes));
      components.push(\`[\${rootObj.type}: "\${rootObj.def}"]\`, \`[\${adjObj.type}: "\${adjObj.def}"]\`);`
  ],
  [
    `  // 3. Composite (De)
  else {
      rule = "Composite (De)";
      const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
      // EXPANSION: Universal Tails
      const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));`,
    `  // 3. Composite (De)
  else {
      rule = "Composite (De)";
      const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
      // EXPANSION: Universal Tails
      const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
      components.push(\`[\${headObj.type}: "\${headObj.def}"]\`, \`[\${tailObj.type}: "\${tailObj.def}"]\`);`
  ],
  [
    `  return { word: word, ascii: transliteratePortugueseToAscii(word), generationRules: [rule] };`,
    `  return { word: word, ascii: transliteratePortugueseToAscii(word), generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 6. ROMANIAN
// ==========================================
updateFile('romance/romanian.ts', [
  [
    `export const generateRomanianPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  const roll = Math.random();`,
    `export const generateRomanianPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();`
  ],
  [
    `  // 1. Root + Adjective
  if (roll < 0.40) {
      rule = "Root + Adjective";
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      // EXPANSION: Allow Color/Quality on Settlements too
      let adjTypes = ['adj_color', 'adj_quality'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) {
          adjTypes.push('adj_geo');
      }
      const adjObj = getRandomElement(getPool(adjTypes));`,
    `  // 1. Root + Adjective
  if (roll < 0.40) {
      rule = "Root + Adjective";
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      // EXPANSION: Allow Color/Quality on Settlements too
      let adjTypes = ['adj_color', 'adj_quality'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) {
          adjTypes.push('adj_geo');
      }
      const adjObj = getRandomElement(getPool(adjTypes));
      components.push(\`[\${rootObj.type}: "\${rootObj.def}"]\`, \`[\${adjObj.type}: "\${adjObj.def}"]\`);`
  ],
  [
    `  // 2. Root + Suffix
  else if (roll < 0.70) {
      rule = "Root + Suffix";
      // EXPANSION: Allow suffixing Geo Major
      const rootObj = getRandomElement(getPool(['settlement', 'geo_minor', 'bio_flora', 'geo_major']));
      const suffixObj = getRandomElement(getPool(['suffix']));`,
    `  // 2. Root + Suffix
  else if (roll < 0.70) {
      rule = "Root + Suffix";
      // EXPANSION: Allow suffixing Geo Major
      const rootObj = getRandomElement(getPool(['settlement', 'geo_minor', 'bio_flora', 'geo_major']));
      const suffixObj = getRandomElement(getPool(['suffix']));
      components.push(\`[\${rootObj.type}: "\${rootObj.def}"]\`, \`[\${suffixObj.type}: "\${suffixObj.def}"]\`);`
  ],
  [
    `  // 3. Composite (The X of Y)
  else {
      rule = "Composite (de)";
      const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
      // EXPANSION: Universal Tails
      const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));`,
    `  // 3. Composite (The X of Y)
  else {
      rule = "Composite (de)";
      const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
      // EXPANSION: Universal Tails
      const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
      components.push(\`[\${headObj.type}: "\${headObj.def}"]\`, \`[\${tailObj.type}: "\${tailObj.def}"]\`);`
  ],
  [
    `  return { word: word, ascii: transliterateRomanianToAscii(word), generationRules: [rule] };`,
    `  return { word: word, ascii: transliterateRomanianToAscii(word), generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 7. SPANISH
// ==========================================
updateFile('romance/spanish.ts', [
  [
    `export const generateSpanishPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  const roll = Math.random();`,
    `export const generateSpanishPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();`
  ],
  [
    `  // --- RECIPE 1: The "San" Pattern ---
  if (roll < 0.15) {
    rule = 'The "San" Pattern';
    const target = getRandomElement(getPool(['bio_fauna', 'bio_flora', 'abstract'])); `,
    `  // --- RECIPE 1: The "San" Pattern ---
  if (roll < 0.15) {
    rule = 'The "San" Pattern';
    const target = getRandomElement(getPool(['bio_fauna', 'bio_flora', 'abstract'])); 
    components.push(\`[prefix: "San"]\`, \`[\${target.type}: "\${target.def}"]\`);`
  ],
  [
    `    const adjObj = getRandomElement(getPool(adjTypes));
    let adj = formatAdjective(nGender, adjObj);`,
    `    const adjObj = getRandomElement(getPool(adjTypes));
    let adj = formatAdjective(nGender, adjObj);
    components.push(\`[\${nounObj.type}: "\${nounObj.def}"]\`, \`[\${adjObj.type}: "\${adjObj.def}"]\`);`
  ],
  [
    `  // --- RECIPE 3: The "De" Construction (Universal Tail) ---
  else if (roll < 0.85) {
    rule = 'The "De" Construction';
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Tail can be almost anything now (City of the Mountain, Bridge of the King)
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));`,
    `  // --- RECIPE 3: The "De" Construction (Universal Tail) ---
  else if (roll < 0.85) {
    rule = 'The "De" Construction';
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Tail can be almost anything now (City of the Mountain, Bridge of the King)
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
    components.push(\`[\${headObj.type}: "\${headObj.def}"]\`, \`[\${tailObj.type}: "\${tailObj.def}"]\`);`
  ],
  [
    `  // --- RECIPE 4: Suffix Modification ---
  else {
    rule = 'Suffix Modification';
    // EXPANSION: Allow suffixing Geo Majors (Montana -> Montanilla)
    const rootObj = getRandomElement(getPool(['bio_flora', 'geo_minor', 'settlement', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));`,
    `  // --- RECIPE 4: Suffix Modification ---
  else {
    rule = 'Suffix Modification';
    // EXPANSION: Allow suffixing Geo Majors (Montana -> Montanilla)
    const rootObj = getRandomElement(getPool(['bio_flora', 'geo_minor', 'settlement', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));
    components.push(\`[\${rootObj.type}: "\${rootObj.def}"]\`, \`[\${suffixObj.type}: "\${suffixObj.def}"]\`);`
  ],
  [
    `  return { word, ascii, generationRules: [rule] };`,
    `  return { word, ascii, generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 8. POLISH
// ==========================================
updateFile('slavic/polish.ts', [
  [
    `export const generatePolishPlace = (): GeneratedResult => {
  let wordSrc = ""; 
  let rule = "";`,
    `export const generatePolishPlace = (): GeneratedResult => {
  let wordSrc = ""; 
  let rule = "";
  let components: string[] = [];`
  ],
  [
    `    // Separate: [Adj] [Derived Noun]
    if (Math.random() < 0.6) { `,
    `    components.push(\`[adjective: "\${selectedAdj.def}"]\`, \`[root: "\${selectedRootComponent.def}"]\`, \`[suffix: "\${selectedSuffix.def}"]\`);
    // Separate: [Adj] [Derived Noun]
    if (Math.random() < 0.6) { `
  ],
  [
    `    wordSrc = baseSrc + suffixInfo.src;
  }`,
    `    wordSrc = baseSrc + suffixInfo.src;
    components.push(\`[root: "\${selectedRoot.def}"]\`, \`[suffix: "\${selectedSuffix.def}"]\`);
  }`
  ],
  [
    `    wordSrc = \`\${rootInfo.src} nad \${riverInfo.src}\`;
  }`,
    `    wordSrc = \`\${rootInfo.src} nad \${riverInfo.src}\`;
    components.push(\`[root: "\${baseRootComponent.def}"]\`, \`[river: "\${selectedRiver.def}"]\`);
  }`
  ],
  [
    `  return { 
    word: capitalizeSlavicName(wordSrc, 'pl'), 
    ascii: capitalizeSlavicName(wordAscii, 'pl'),
    generationRules: [rule]
  };`,
    `  return { 
    word: capitalizeSlavicName(wordSrc, 'pl'), 
    ascii: capitalizeSlavicName(wordAscii, 'pl'),
    generationRules: [rule],
    dictionaryComponents: components
  };`
  ]
]);

// ==========================================
// 9. RUSSIAN
// ==========================================
updateFile('slavic/russian.ts', [
  [
    `export const generateRussianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";
  let rule = "";`,
    `export const generateRussianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";
  let rule = "";
  let components: string[] = [];`
  ],
  [
    `      wordCyrillic = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
      wordAscii = \`\${inflectedAdjRom} \${finalNounRom}\`;`,
    `      wordCyrillic = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
      wordAscii = \`\${inflectedAdjRom} \${finalNounRom}\`;
      components.push(\`[adjective: "\${selectedAdj.def}"]\`, \`[root: "\${selectedRootComponent.def}"]\`);
      if (selectedSuffix) components.push(\`[suffix: "\${selectedSuffix.def}"]\`);`
  ],
  [
    `      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;`,
    `      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;
      components.push(\`[root: "\${selectedRoot.def}"]\`, \`[suffix: "\${selectedSuffix.def}"]\`);`
  ],
  [
    `      wordCyrillic = \`\${baseSrc}-на-\${riverInfo.src}\`; 
      const riverRom = riverInfo.rom || transliterateRussianToAscii(riverInfo.src);
      wordAscii = \`\${baseRom}-na-\${riverRom}\`;`,
    `      wordCyrillic = \`\${baseSrc}-на-\${riverInfo.src}\`; 
      const riverRom = riverInfo.rom || transliterateRussianToAscii(riverInfo.src);
      wordAscii = \`\${baseRom}-na-\${riverRom}\`;
      components.push(\`[root: "\${baseRootComponent.def}"]\`, \`[river: "\${selectedRiver.def}"]\`);`
  ],
  [
    `  return { 
    word: capitalizeSlavicName(wordCyrillic, 'ru'), 
    ascii: capitalizeSlavicName(wordAscii, 'ru'),
    generationRules: [rule]
  };`,
    `  return { 
    word: capitalizeSlavicName(wordCyrillic, 'ru'), 
    ascii: capitalizeSlavicName(wordAscii, 'ru'),
    generationRules: [rule],
    dictionaryComponents: components
  };`
  ]
]);

// ==========================================
// 10. UKRAINIAN
// ==========================================
updateFile('slavic/ukrainian.ts', [
  [
    `export const generateUkrainianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";
  let rule = "";`,
    `export const generateUkrainianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";
  let rule = "";
  let components: string[] = [];`
  ],
  [
    `      wordCyrillic = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
      wordAscii = \`\${inflectedAdjRom} \${finalNounRom}\`;`,
    `      wordCyrillic = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
      wordAscii = \`\${inflectedAdjRom} \${finalNounRom}\`;
      components.push(\`[adjective: "\${selectedAdj.def}"]\`, \`[root: "\${selectedRootComponent.def}"]\`);
      if (selectedSuffix) components.push(\`[suffix: "\${selectedSuffix.def}"]\`);`
  ],
  [
    `      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;`,
    `      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;
      components.push(\`[root: "\${selectedRoot.def}"]\`, \`[suffix: "\${selectedSuffix.def}"]\`);`
  ],
  [
    `      wordCyrillic = \`\${basePartSrc} на \${riverInfo.src}\`;
      
      const riverRom = riverInfo.rom || transliterateUkrainianToAscii(riverInfo.src);
      wordAscii = \`\${basePartRom} na \${riverRom}\`;`,
    `      wordCyrillic = \`\${basePartSrc} на \${riverInfo.src}\`;
      
      const riverRom = riverInfo.rom || transliterateUkrainianToAscii(riverInfo.src);
      wordAscii = \`\${basePartRom} na \${riverRom}\`;
      components.push(\`[root: "\${baseRootComponent.def}"]\`, \`[river: "\${selectedRiver.def}"]\`);`
  ],
  [
    `  return { 
    word: capitalizeSlavicName(wordCyrillic, 'uk'), 
    ascii: capitalizeSlavicName(wordAscii, 'uk'),
    generationRules: [rule]
  };`,
    `  return { 
    word: capitalizeSlavicName(wordCyrillic, 'uk'), 
    ascii: capitalizeSlavicName(wordAscii, 'uk'),
    generationRules: [rule],
    dictionaryComponents: components
  };`
  ]
]);

// ==========================================
// 11. SLOVAK
// ==========================================
updateFile('slavic/slovak.ts', [
  [
    `export const generateSlovakPlace = (): GeneratedResult => {
  let wordSrc = "";
  let rule = "";`,
    `export const generateSlovakPlace = (): GeneratedResult => {
  let wordSrc = "";
  let rule = "";
  let components: string[] = [];`
  ],
  [
    `    wordSrc = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
  }`,
    `    wordSrc = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
    components.push(\`[adjective: "\${selectedAdj.def}"]\`, \`[root: "\${selectedRootComponent.def}"]\`);
    if (selectedSuffix) components.push(\`[suffix: "\${selectedSuffix.def}"]\`);
  }`
  ],
  [
    `    wordSrc = baseSrc + suffixInfo.src;
  }`,
    `    wordSrc = baseSrc + suffixInfo.src;
    components.push(\`[root: "\${selectedRoot.def}"]\`, \`[suffix: "\${selectedSuffix.def}"]\`);
  }`
  ],
  [
    `    wordSrc = \`\${inflectedAdjSrc} \${derivedNounSrc}\`;
  }`,
    `    wordSrc = \`\${inflectedAdjSrc} \${derivedNounSrc}\`;
    components.push(\`[adjective: "\${selectedAdj.def}"]\`, \`[root: "\${selectedRootComponent.def}"]\`, \`[suffix: "\${selectedSuffix.def}"]\`);
  }`
  ],
  [
    `    wordSrc = \`\${baseSrc} nad \${riverInfo.src}\`;
  }`,
    `    wordSrc = \`\${baseSrc} nad \${riverInfo.src}\`;
    components.push(\`[root: "\${baseRootComponent.def}"]\`, \`[river: "\${selectedRiver.def}"]\`);
  }`
  ],
  [
    `  return { word: capitalizeSlavicName(wordSrc, 'sk'), ascii: capitalizeSlavicName(wordAscii, 'sk'), generationRules: [rule] };`,
    `  return { word: capitalizeSlavicName(wordSrc, 'sk'), ascii: capitalizeSlavicName(wordAscii, 'sk'), generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 12. CZECH
// ==========================================
updateFile('slavic/czech.ts', [
  [
    `export const generateCzechPlace = (): GeneratedResult => {
  let wordSrc = ""; 
  let rule = "";`,
    `export const generateCzechPlace = (): GeneratedResult => {
  let wordSrc = ""; 
  let rule = "";
  let components: string[] = [];`
  ],
  [
    `    wordSrc = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
  }`,
    `    wordSrc = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
    components.push(\`[adjective: "\${selectedAdj.def}"]\`, \`[root: "\${selectedRootComponent.def}"]\`);
    if (selectedSuffix) components.push(\`[suffix: "\${selectedSuffix.def}"]\`);
  }`
  ],
  [
    `    wordSrc = baseSrc + suffixInfo.src;
  }`,
    `    wordSrc = baseSrc + suffixInfo.src;
    components.push(\`[root: "\${selectedRoot.def}"]\`, \`[suffix: "\${selectedSuffix.def}"]\`);
  }`
  ],
  [
    `    wordSrc = \`\${inflectedAdjSrc} \${derivedNounSrc}\`;
  }`,
    `    wordSrc = \`\${inflectedAdjSrc} \${derivedNounSrc}\`;
    components.push(\`[adjective: "\${selectedAdj.def}"]\`, \`[root: "\${selectedRootComponent.def}"]\`, \`[suffix: "\${selectedSuffix.def}"]\`);
  }`
  ],
  [
    `    wordSrc = \`\${baseSrc} nad \${riverInfo.src}\`;
  }`,
    `    wordSrc = \`\${baseSrc} nad \${riverInfo.src}\`;
    components.push(\`[root: "\${baseRootComponent.def}"]\`, \`[river: "\${selectedRiver.def}"]\`);
  }`
  ],
  [
    `  return { word: capitalizeSlavicName(wordSrc, 'cs'), ascii: capitalizeSlavicName(wordAscii, 'cs'), generationRules: [rule] };`,
    `  return { word: capitalizeSlavicName(wordSrc, 'cs'), ascii: capitalizeSlavicName(wordAscii, 'cs'), generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 13. BULGARIAN
// ==========================================
updateFile('slavic/bulgarian.ts', [
  [
    `export const generateBulgarianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";
  let rule = "";`,
    `export const generateBulgarianPlace = (): GeneratedResult => {
  let wordAscii = "";
  let wordCyrillic = "";
  let rule = "";
  let components: string[] = [];`
  ],
  [
    `      wordCyrillic = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
      wordAscii = \`\${inflectedAdjRom} \${finalNounRom}\`;`,
    `      wordCyrillic = \`\${inflectedAdjSrc} \${finalNounSrc}\`;
      wordAscii = \`\${inflectedAdjRom} \${finalNounRom}\`;
      components.push(\`[adjective: "\${selectedAdj.def}"]\`, \`[root: "\${selectedRootComponent.def}"]\`);
      if (selectedSuffix) components.push(\`[suffix: "\${selectedSuffix.def}"]\`);`
  ],
  [
    `      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;`,
    `      wordCyrillic = baseSrc + suffixInfo.src;
      wordAscii = baseRom + suffixInfo.rom;
      components.push(\`[root: "\${selectedRoot.def}"]\`, \`[suffix: "\${selectedSuffix.def}"]\`);`
  ],
  [
    `      wordCyrillic = \`\${basePartSrc} на \${riverInfo.src}\`;
      wordAscii = \`\${basePartRom} na \${riverInfo.rom || transliterateBulgarianToAscii(riverInfo.src)}\`; `,
    `      wordCyrillic = \`\${basePartSrc} на \${riverInfo.src}\`;
      wordAscii = \`\${basePartRom} na \${riverInfo.rom || transliterateBulgarianToAscii(riverInfo.src)}\`; 
      components.push(\`[root: "\${baseRootComponent.def}"]\`, \`[river: "\${selectedRiver.def}"]\`);`
  ],
  [
    `  return { word: capitalizeSlavicName(wordCyrillic, 'bg'), ascii: capitalizeSlavicName(wordAscii, 'bg'), generationRules: [rule] };`,
    `  return { word: capitalizeSlavicName(wordCyrillic, 'bg'), ascii: capitalizeSlavicName(wordAscii, 'bg'), generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 14. IRISH
// ==========================================
updateFile('irish.ts', [
  [
    `export const generateIrishPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";`,
    `export const generateIrishPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];`
  ],
  [
    `    word = \`\${pre} \${root}\`;
  }`,
    `    word = \`\${pre} \${root}\`;
    components.push(\`[prefix: "\${pre}"]\`, \`[root: "\${root}"]\`);
  }`
  ],
  [
    `        if (Math.random() < 0.4) {
             word = \`\${pre} \${adj}\`; // Baile Mór
        } else {
             // Prefix + Root + Adj
             word = \`\${pre} \${root} \${adj}\`;
        }`,
    `        if (Math.random() < 0.4) {
             word = \`\${pre} \${adj}\`; // Baile Mór
             components.push(\`[prefix: "\${pre}"]\`, \`[adjective: "\${adj}"]\`);
        } else {
             // Prefix + Root + Adj
             word = \`\${pre} \${root} \${adj}\`;
             components.push(\`[prefix: "\${pre}"]\`, \`[root: "\${root}"]\`, \`[adjective: "\${adj}"]\`);
        }`
  ],
  [
    `    } else {
         word = \`\${pre} \${root}\`;
    }`,
    `    } else {
         word = \`\${pre} \${root}\`;
         components.push(\`[prefix: "\${pre}"]\`, \`[root: "\${root}"]\`);
    }`
  ],
  [
    `  return { word: word, ascii: transliterateIrishToAscii(word), generationRules: [rule] };`,
    `  return { word: word, ascii: transliterateIrishToAscii(word), generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 15. ARABIC
// ==========================================
updateFile('arabic.ts', [
  [
    `export const generateArabicPlace = (style: 'standard' | 'egyptian' | 'levantine' | 'gulf' | 'maghrebi' = 'standard'): GeneratedResult => {
  let wordAr = "";
  let wordRom = "";`,
    `export const generateArabicPlace = (style: 'standard' | 'egyptian' | 'levantine' | 'gulf' | 'maghrebi' = 'standard'): GeneratedResult => {
  let wordAr = "";
  let wordRom = "";
  let components: string[] = [];`
  ],
  [
    `  if (type < 0.40) {
    rule = "[Head] [Root] (Idafa)";
    const head = getRandomElement(heads);
    const root = getRandomElement(AR_ROOTS);`,
    `  if (type < 0.40) {
    rule = "[Head] [Root] (Idafa)";
    const head = getRandomElement(heads);
    const root = getRandomElement(AR_ROOTS);
    components.push(\`[head: "\${head.def}"]\`, \`[root: "\${root.def}"]\`);`
  ],
  [
    `  else if (type < 0.60) {
    rule = "Al-[Root] (Definite Noun)";
    const root = getRandomElement(AR_ROOTS);`,
    `  else if (type < 0.60) {
    rule = "Al-[Root] (Definite Noun)";
    const root = getRandomElement(AR_ROOTS);
    components.push(\`[root: "\${root.def}"]\`);`
  ],
  [
    `  else if (type < 0.80) {
    rule = "[Head] [Adjective]";
    const head = getRandomElement(heads);
    const adj = getRandomElement(AR_ADJECTIVES);`,
    `  else if (type < 0.80) {
    rule = "[Head] [Adjective]";
    const head = getRandomElement(heads);
    const adj = getRandomElement(AR_ADJECTIVES);
    components.push(\`[head: "\${head.def}"]\`, \`[adjective: "\${adj.def}"]\`);`
  ],
  [
    `  else {
    rule = "[Root] [Adjective]";
    const root = getRandomElement(AR_ROOTS);
    const adj = getRandomElement(AR_ADJECTIVES);`,
    `  else {
    rule = "[Root] [Adjective]";
    const root = getRandomElement(AR_ROOTS);
    const adj = getRandomElement(AR_ADJECTIVES);
    components.push(\`[root: "\${root.def}"]\`, \`[adjective: "\${adj.def}"]\`);`
  ],
  [
    `  return { word: wordAr, ascii: wordRom, generationRules: [rule] };`,
    `  return { word: wordAr, ascii: wordRom, generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 16. CHINESE
// ==========================================
updateFile('chinese.ts', [
  [
    `export const generateChinesePlace = (mode: 'cn' | 'tw' | 'hk'): GeneratedResult => {
  let region: RegionCode = 'cn';
  if (mode === 'hk') region = 'hk';
  if (mode === 'tw') region = 'tw';

  const { parts, rule } = getStructure(region);
  const formatted = formatChineseName(parts, mode);
  return { ...formatted, generationRules: [rule] };
};`,
    `export const generateChinesePlace = (mode: 'cn' | 'tw' | 'hk'): GeneratedResult => {
  let region: RegionCode = 'cn';
  if (mode === 'hk') region = 'hk';
  if (mode === 'tw') region = 'tw';

  const { parts, rule } = getStructure(region);
  const formatted = formatChineseName(parts, mode);
  const components = parts.map(p => \`[component: "\${p.def}"]\`);
  return { ...formatted, generationRules: [rule], dictionaryComponents: components };
};`
  ]
]);

// ==========================================
// 17. KOREAN
// ==========================================
updateFile('korean.ts', [
  [
    `export const generateKoreanPlace = (): GeneratedResult => {
  let word = "";
  let ascii = "";
  let rule = "";
  const roll = Math.random();`,
    `export const generateKoreanPlace = (): GeneratedResult => {
  let word = "";
  let ascii = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();`
  ],
  [
    `    // 3-Syllable Logic (e.g. Seo-dae-mun)
    if (Math.random() < 0.2) {
       const mid = getRandomElement(getPool(KO_ADJECTIVES, ['quality', 'color'])); 
       word = p1.hangul + mid.hangul + p2.hangul;
       ascii = p1.rom + mid.rom.toLowerCase() + p2.rom.toLowerCase();
    } else {
       word = p1.hangul + p2.hangul;
       ascii = p1.rom + p2.rom.toLowerCase();
    }`,
    `    // 3-Syllable Logic (e.g. Seo-dae-mun)
    if (Math.random() < 0.2) {
       const mid = getRandomElement(getPool(KO_ADJECTIVES, ['quality', 'color'])); 
       word = p1.hangul + mid.hangul + p2.hangul;
       ascii = p1.rom + mid.rom.toLowerCase() + p2.rom.toLowerCase();
       components.push(\`[component: "\${p1.def}"]\`, \`[component: "\${mid.def}"]\`, \`[component: "\${p2.def}"]\`);
    } else {
       word = p1.hangul + p2.hangul;
       ascii = p1.rom + p2.rom.toLowerCase();
       components.push(\`[component: "\${p1.def}"]\`, \`[component: "\${p2.def}"]\`);
    }`
  ],
  [
    `    const suffix = getRandomElement(getPool(KO_SUFFIXES, ['suffix']));
    word = baseHangul + suffix.hangul;
    ascii = baseRom + '-' + suffix.rom;`,
    `    const suffix = getRandomElement(getPool(KO_SUFFIXES, ['suffix']));
    word = baseHangul + suffix.hangul;
    ascii = baseRom + '-' + suffix.rom;
    components.push(\`[component: "\${r1.def}"]\`, \`[component: "\${r2.def}"]\`, \`[suffix: "\${suffix.def}"]\`);`
  ],
  [
    `    word = p1.hangul + p2.hangul;
    ascii = p1.rom + p2.rom.toLowerCase();
  }`,
    `    word = p1.hangul + p2.hangul;
    ascii = p1.rom + p2.rom.toLowerCase();
    components.push(\`[component: "\${p1.def}"]\`, \`[component: "\${p2.def}"]\`);
  }`
  ],
  [
    `    word = num.hangul + root.hangul;
    ascii = num.rom + root.rom.toLowerCase();
  }`,
    `    word = num.hangul + root.hangul;
    ascii = num.rom + root.rom.toLowerCase();
    components.push(\`[component: "\${num.def}"]\`, \`[component: "\${root.def}"]\`);
  }`
  ],
  [
    `  return { word, ascii, generationRules: [rule] };`,
    `  return { word, ascii, generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 18. JAPANESE
// ==========================================
updateFile('japanese.ts', [
  [
    `export const generateJapanesePlace = (): GeneratedResult => {

  const type = Math.random();`,
    `export const generateJapanesePlace = (): GeneratedResult => {

  const type = Math.random();
  let components: string[] = [];`
  ],
  [
    `    const word = pre.kanji + root.kanji;
    // Often hyphenated in romanization if it's a major prefix
    const ascii = pre.romaji + root.romaji;

    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["Direction/Prefix + Root"] };`,
    `    const word = pre.kanji + root.kanji;
    // Often hyphenated in romanization if it's a major prefix
    const ascii = pre.romaji + root.romaji;
    components.push(\`[\${pre.type}: "\${pre.def}"]\`, \`[\${root.type}: "\${root.def}"]\`);

    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["Direction/Prefix + Root"], dictionaryComponents: components };`
  ],
  [
    `    const word = mod.kanji + root.kanji;
    const ascii = mod.romaji + finalRomaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["Modifier + Root"] };`,
    `    const word = mod.kanji + root.kanji;
    const ascii = mod.romaji + finalRomaji;
    components.push(\`[\${mod.type}: "\${mod.def}"]\`, \`[\${root.type}: "\${root.def}"]\`);
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["Modifier + Root"], dictionaryComponents: components };`
  ],
  [
    `    const word = root1.kanji + root2.kanji;
    const ascii = root1.romaji + finalRomaji2;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["Root + Root (Compound)"] };`,
    `    const word = root1.kanji + root2.kanji;
    const ascii = root1.romaji + finalRomaji2;
    components.push(\`[\${root1.type}: "\${root1.def}"]\`, \`[\${root2.type}: "\${root2.def}"]\`);
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["Root + Root (Compound)"], dictionaryComponents: components };`
  ],
  [
    `    const word = first.kanji + 'ヶ' + second.kanji;
    const ascii = first.romaji + 'ga' + second.romaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["Ga Construction"] };`,
    `    const word = first.kanji + 'ヶ' + second.kanji;
    const ascii = first.romaji + 'ga' + second.romaji;
    components.push(\`[\${first.type}: "\${first.def}"]\`, \`[\${second.type}: "\${second.def}"]\`);
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["Ga Construction"], dictionaryComponents: components };`
  ],
  [
    `    const word = first.kanji + '之' + second.kanji;
    const ascii = first.romaji + 'no' + second.romaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["No Construction"] };`,
    `    const word = first.kanji + '之' + second.kanji;
    const ascii = first.romaji + 'no' + second.romaji;
    components.push(\`[\${first.type}: "\${first.def}"]\`, \`[\${second.type}: "\${second.def}"]\`);
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["No Construction"], dictionaryComponents: components };`
  ],
  [
    `      const word = prefix.kanji + core.kanji + suffix.kanji;
      const ascii = pRom + cRom + sRom;

      return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["3-Part Settlement Compound"] };`,
    `      const word = prefix.kanji + core.kanji + suffix.kanji;
      const ascii = pRom + cRom + sRom;
      components.push(\`[\${prefix.type}: "\${prefix.def}"]\`, \`[\${core.type}: "\${core.def}"]\`, \`[\${suffix.type}: "\${suffix.def}"]\`);

      return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["3-Part Settlement Compound"], dictionaryComponents: components };`
  ],
  [
    `    const word = pre.kanji + suf.kanji;
    const ascii = firstRomaji + secondRomaji;
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["On-yomi Compound"] };`,
    `    const word = pre.kanji + suf.kanji;
    const ascii = firstRomaji + secondRomaji;
    components.push(\`[\${pre.type}: "\${pre.def}"]\`, \`[\${suf.type}: "\${suf.def}"]\`);
    return { word, ascii: ascii.charAt(0).toUpperCase() + ascii.slice(1), generationRules: ["On-yomi Compound"], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 19. VIETNAMESE
// ==========================================
updateFile('vietnamese.ts', [
  [
    `export const generateVietnamesePlace = (): GeneratedResult => {
  let word = "";
  let ascii = "";
  let rule = "";
  const roll = Math.random();`,
    `export const generateVietnamesePlace = (): GeneratedResult => {
  let word = "";
  let ascii = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();`
  ],
  [
    `    word = \`\${r1.word} \${r2.word}\`;
    ascii = \`\${r1.ascii} \${r2.ascii}\`;`,
    `    word = \`\${r1.word} \${r2.word}\`;
    ascii = \`\${r1.ascii} \${r2.ascii}\`;
    components.push(\`[component: "\${r1.def}"]\`, \`[component: "\${r2.def}"]\`);`
  ],
  [
    `  // --- RECIPE 2: Geographic Head + Descriptive Tail ---
  // e.g. Sông Hương (River Scent), Núi Bà Đen, Mũi Né
  else if (roll < 0.70) {
    rule = "Geographic Head + Descriptive Tail";
    const head = getRandomElement(VN_HEADS.filter(x => x.type === 'geo_head'));
    
    // Tail can be: Nature (Trees/Animals), Colors, Qualities (Big/Small)
    const tailPool = [
        ...getPool(VN_ROOTS_NATIVE, ['nature']),
        ...getPool(VN_ADJECTIVES, ['color', 'quality']),
        ...getPool(VN_ROOTS_SINO, ['nature', 'abstract']) // e.g. Sông Tiên (Fairy River)
    ];
    const tail = getRandomElement(tailPool);
    
    word = \`\${head.word} \${tail.word}\`;
    ascii = \`\${head.ascii} \${tail.ascii}\`;`,
    `  // --- RECIPE 2: Geographic Head + Descriptive Tail ---
  // e.g. Sông Hương (River Scent), Núi Bà Đen, Mũi Né
  else if (roll < 0.70) {
    rule = "Geographic Head + Descriptive Tail";
    const head = getRandomElement(VN_HEADS.filter(x => x.type === 'geo_head'));
    
    // Tail can be: Nature (Trees/Animals), Colors, Qualities (Big/Small)
    const tailPool = [
        ...getPool(VN_ROOTS_NATIVE, ['nature']),
        ...getPool(VN_ADJECTIVES, ['color', 'quality']),
        ...getPool(VN_ROOTS_SINO, ['nature', 'abstract']) // e.g. Sông Tiên (Fairy River)
    ];
    const tail = getRandomElement(tailPool);
    
    word = \`\${head.word} \${tail.word}\`;
    ascii = \`\${head.ascii} \${tail.ascii}\`;
    components.push(\`[\${head.type}: "\${head.def}"]\`, \`[\${tail.type}: "\${tail.def}"]\`);`
  ],
  [
    `  // --- RECIPE 3: Settlement + Specific Tail ---
  // e.g. Chợ Mới (New Market), Bến Tre (Bamboo Wharf)
  else if (roll < 0.90) {
    rule = "Settlement + Specific Tail";
    const head = getRandomElement(VN_HEADS.filter(x => x.type === 'settlement'));
    
    // Settlements match well with: Directions, Qualities (New/Old), Numbers, Nature (Products)
    const tailPool = [
        ...VN_DIRECTIONS,
        ...VN_NUMBERS,
        ...getPool(VN_ADJECTIVES, ['quality']),
        ...getPool(VN_ROOTS_NATIVE, ['nature']) // e.g. Market + Fish
    ];
    const tail = getRandomElement(tailPool);
    
    word = \`\${head.word} \dots \${tail.word}\`.replace(/\\dots/g, '\\\${tail.word}');
    ascii = \`\${head.ascii} \dots \${tail.ascii}\`.replace(/\\dots/g, '\\\${tail.ascii}');`,
    `  // --- RECIPE 3: Settlement + Specific Tail ---
  // e.g. Chợ Mới (New Market), Bến Tre (Bamboo Wharf)
  else if (roll < 0.90) {
    rule = "Settlement + Specific Tail";
    const head = getRandomElement(VN_HEADS.filter(x => x.type === 'settlement'));
    
    // Settlements match well with: Directions, Qualities (New/Old), Numbers, Nature (Products)
    const tailPool = [
        ...VN_DIRECTIONS,
        ...VN_NUMBERS,
        ...getPool(VN_ADJECTIVES, ['quality']),
        ...getPool(VN_ROOTS_NATIVE, ['nature']) // e.g. Market + Fish
    ];
    const tail = getRandomElement(tailPool);
    
    word = \`\${head.word} \${tail.word}\`;
    ascii = \`\${head.ascii} \${tail.ascii}\`;
    components.push(\`[\${head.type}: "\${head.def}"]\`, \`[\${tail.type}: "\${tail.def}"]\`);`
  ],
  [
    `    word = \`\${head.word} \${mid.word} \${tail.word}\`;
    ascii = \`\${head.ascii} \${mid.ascii} \${tail.ascii}\`;`,
    `    word = \`\${head.word} \${mid.word} \${tail.word}\`;
    ascii = \`\${head.ascii} \${mid.ascii} \${tail.ascii}\`;
    components.push(\`[\${head.type}: "\${head.def}"]\`, \`[\${mid.type}: "\${mid.def}"]\`, \`[\${tail.type}: "\${tail.def}"]\`);`
  ],
  [
    `  return { word, ascii, generationRules: [rule] };`,
    `  return { word, ascii, generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 20. INDONESIAN
// ==========================================
updateFile('indonesian.ts', [
  [
    `export const generateIndonesianPlace = (variant: 'id' | 'ms' | 'jv'): GeneratedResult => {
  let word = "";
  let rule = "";`,
    `export const generateIndonesianPlace = (variant: 'id' | 'ms' | 'jv'): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];`
  ],
  [
    `          const r1 = getRandomElement(jvRoots.length > 0 ? jvRoots : roots);
          const r2 = getRandomElement(jvRoots.length > 0 ? jvRoots : roots);
          
          if (r1.val === r2.val) return generateIndonesianPlace(variant);
          
          // Apply javanize to ensure correct vowel harmony (e.g. Sura -> Suro)
          word = javanize(r1.val) + javanize(r2.val.toLowerCase());`,
    `          const r1 = getRandomElement(jvRoots.length > 0 ? jvRoots : roots);
          const r2 = getRandomElement(jvRoots.length > 0 ? jvRoots : roots);
          
          if (r1.val === r2.val) return generateIndonesianPlace(variant);
          
          // Apply javanize to ensure correct vowel harmony (e.g. Sura -> Suro)
          word = javanize(r1.val) + javanize(r2.val.toLowerCase());
          components.push(\`[root: "\${r1.def}"]\`, \`[root: "\${r2.def}"]\`);`
  ],
  [
    `          const pre = getRandomElement(prefixes).val; 
          const tail = getRandomElement([...roots, ...adjectives]);`,
    `          const preObj = getRandomElement(prefixes);
          const pre = preObj.val; 
          const tail = getRandomElement([...roots, ...adjectives]);
          components.push(\`[prefix: "\${preObj.def}"]\`, \`[\${tail.type}: "\${tail.def}"]\`);`
  ],
  [
    `          const r = getRandomElement(roots).val;
          const s = getRandomElement(suffixes).val;`,
    `          const rObj = getRandomElement(roots);
          const r = rObj.val;
          const sObj = getRandomElement(suffixes);
          const s = sObj.val;
          components.push(\`[root: "\${rObj.def}"]\`, \`[suffix: "\${sObj.def}"]\`);`
  ],
  [
    `      word = word.charAt(0).toUpperCase() + word.slice(1);
      return { word, ascii: word, generationRules: [rule] };`,
    `      word = word.charAt(0).toUpperCase() + word.slice(1);
      return { word, ascii: word, generationRules: [rule], dictionaryComponents: components };`
  ],
  [
    `  // Pattern 1: Geographic Prefix + Root
  if (type < 0.40) {
    rule = "Geographic Prefix + Root";
    const pre = getRandomElement(prefixes).val;
    const root = getRandomElement(roots).val;
    word = \`\${pre} \${root}\`;
  }`,
    `  // Pattern 1: Geographic Prefix + Root
  if (type < 0.40) {
    rule = "Geographic Prefix + Root";
    const preObj = getRandomElement(prefixes);
    const pre = preObj.val;
    const rootObj = getRandomElement(roots);
    const root = rootObj.val;
    word = \`\${pre} \${root}\`;
    components.push(\`[prefix: "\${preObj.def}"]\`, \`[root: "\${rootObj.def}"]\`);`
  ],
  [
    `  // Pattern 2: Geographic Prefix + Root + Adjective
  else if (type < 0.65) {
    rule = "Geographic Prefix + Root + Adjective";
    const pre = getRandomElement(prefixes).val;
    const root = getRandomElement(roots).val;
    const adj = getRandomElement(adjectives).val;
    word = \`\${pre} \${root} \${adj}\`;`,
    `  // Pattern 2: Geographic Prefix + Root + Adjective
  else if (type < 0.65) {
    rule = "Geographic Prefix + Root + Adjective";
    const preObj = getRandomElement(prefixes);
    const pre = preObj.val;
    const rootObj = getRandomElement(roots);
    const root = rootObj.val;
    const adjObj = getRandomElement(adjectives);
    const adj = adjObj.val;
    word = \`\${pre} \${root} \${adj}\`;
    components.push(\`[prefix: "\${preObj.def}"]\`, \`[root: "\${rootObj.def}"]\`, \`[adjective: "\${adjObj.def}"]\`);`
  ],
  [
    `  // Pattern 3: Compound / Suffix
  else if (type < 0.85) {
    rule = "Compound / Suffix";
    const validSuffixes = variant === 'ms' 
        ? suffixes.filter(s => ['jaya', 'pura', 'perdana', 'utamay'].includes(s.val) || Math.random() < 0.1)
        : suffixes;
    
    if (validSuffixes.length > 0) {
        const suf = getRandomElement(validSuffixes).val;
        const sanskritRoots = ['Suka', 'Jaya', 'Maha', 'Tri', 'Panca', 'Adi', 'Wana', 'Giri', 'Tirta', 'Batu', 'Kali'];
        let stem = Math.random() < 0.5 ? getRandomElement(sanskritRoots) : getRandomElement(roots).val;`,
    `  // Pattern 3: Compound / Suffix
  else if (type < 0.85) {
    rule = "Compound / Suffix";
    const validSuffixes = variant === 'ms' 
        ? suffixes.filter(s => ['jaya', 'pura', 'perdana', 'utamay'].includes(s.val) || Math.random() < 0.1)
        : suffixes;
    
    if (validSuffixes.length > 0) {
        const sufObj = getRandomElement(validSuffixes);
        const suf = sufObj.val;
        const sanskritRoots = ['Suka', 'Jaya', 'Maha', 'Tri', 'Panca', 'Adi', 'Wana', 'Giri', 'Tirta', 'Batu', 'Kali'];
        const isSanskrit = Math.random() < 0.5;
        let stem = isSanskrit ? getRandomElement(sanskritRoots) : getRandomElement(roots).val;`
  ],
  [
    `        word = stem + suf;
    } else {
        const pre = getRandomElement(prefixes).val;
        const root = getRandomElement(roots).val;
        word = \`\${pre} \${root}\`;
    }
  }`,
    `        word = stem + suf;
        components.push(\`[root: "\${stem}"]\`, \`[suffix: "\${sufObj.def}"]\`);
    } else {
        const preObj = getRandomElement(prefixes);
        const pre = preObj.val;
        const rootObj = getRandomElement(roots);
        const root = rootObj.val;
        word = \`\${pre} \${root}\`;
        components.push(\`[prefix: "\${preObj.def}"]\`, \`[root: "\${rootObj.def}"]\`);
    }
  }`
  ],
  [
    `  // Pattern 4: Root + Adjective
  else {
    rule = "Root + Adjective";
    const root = getRandomElement(roots).val;
    const adj = getRandomElement(adjectives).val;
    word = \`\${root} \${adj}\`;`,
    `  // Pattern 4: Root + Adjective
  else {
    rule = "Root + Adjective";
    const rootObj = getRandomElement(roots);
    const root = rootObj.val;
    const adjObj = getRandomElement(adjectives);
    const adj = adjObj.val;
    word = \`\${root} \${adj}\`;
    components.push(\`[root: "\${rootObj.def}"]\`, \`[adjective: "\${adjObj.def}"]\`);`
  ],
  [
    `  return { word: word, ascii: word, generationRules: [rule] };`,
    `  return { word: word, ascii: word, generationRules: [rule], dictionaryComponents: components };`
  ]
]);

// ==========================================
// 21. TAGALOG
// ==========================================
updateFile('tagalog.ts', [
  [
    `export const generateTagalogPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  const type = Math.random();`,
    `export const generateTagalogPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const type = Math.random();`
  ],
  [
    `  if (type < 0.20) {
    rule = "Native Prefix";
    const pre = getRandomElement(TL_PREFIXES);
    
    // Logic: Prefixes usually attach to Nature, Geo, or Objects. 
    const rPool = getTagalogPool(['nature', 'geo', 'object']);
    const r = getRandomElement(rPool).val;`,
    `  if (type < 0.20) {
    rule = "Native Prefix";
    const pre = getRandomElement(TL_PREFIXES);
    
    // Logic: Prefixes usually attach to Nature, Geo, or Objects. 
    const rPool = getTagalogPool(['nature', 'geo', 'object']);
    const rObj = getRandomElement(rPool);
    const r = rObj.val;
    components.push(\`[prefix: "\${pre.def}"]\`, \`[root: "\${rObj.def}"]\`);`
  ],
  [
    `  else if (type < 0.40) {
    rule = "Native Locative Suffix";
    // Suffixes work best on Nature (Bamboo-place), Objects (Salt-bed), or Geo.
    const root = getRandomElement(getTagalogPool(['nature', 'object', 'geo']));
    const suf = getRandomElement(TL_SUFFIXES);`,
    `  else if (type < 0.40) {
    rule = "Native Locative Suffix";
    // Suffixes work best on Nature (Bamboo-place), Objects (Salt-bed), or Geo.
    const root = getRandomElement(getTagalogPool(['nature', 'object', 'geo']));
    const suf = getRandomElement(TL_SUFFIXES);
    components.push(\`[root: "\${root.def}"]\`, \`[suffix: "\${suf.def}"]\`);`
  ],
  [
    `  else if (type < 0.60) {
    rule = "Spanish Colonial";
    // 3a. Saints (San/Santa + Name/Abstract/Bio)
    if (Math.random() < 0.3) {
        let saintTail = "";
        let targetGender = 'm';`,
    `  else if (type < 0.60) {
    rule = "Spanish Colonial";
    // 3a. Saints (San/Santa + Name/Abstract/Bio)
    if (Math.random() < 0.3) {
        let saintTail = "";
        let targetGender = 'm';
        let tailDef = "";`
  ],
  [
    `        if (Math.random() < 0.5) {
            saintTail = getRandomElement(PH_HEROES); // San Rizal (Fictionalized)
        } else {
            // Pick concepts (Peace, Cross) or Nature (Rose, Lily)
            const obj = getRandomElement(getRomancePool(['abstract', 'bio_flora', 'bio_fauna'])); 
            const data = getRomData(obj.es);
            saintTail = data.val;
            targetGender = data.gender || 'm';
        }`,
    `        if (Math.random() < 0.5) {
            const hero = getRandomElement(PH_HEROES);
            saintTail = hero; // San Rizal (Fictionalized)
            tailDef = hero;
        } else {
            // Pick concepts (Peace, Cross) or Nature (Rose, Lily)
            const obj = getRandomElement(getRomancePool(['abstract', 'bio_flora', 'bio_fauna'])); 
            const data = getRomData(obj.es);
            saintTail = data.val;
            targetGender = data.gender || 'm';
            tailDef = obj.def;
        }`
  ],
  [
    `        word = \`\${prefix} \${saintTail}\`;
    }`,
    `        word = \`\${prefix} \${saintTail}\`;
        components.push(\`[prefix: "\${prefix}"]\`, \`[root: "\${tailDef}"]\`);
    }`
  ],
  [
    `            if (adjObj.tags?.includes('pre')) {
                if (adj === 'Grande') adj = 'Gran';
                if (adj === 'Santo') adj = 'San';
                word = \`\${adj} \${headVal}\`;
            } else {
                word = \`\${headVal} \${adj}\`;
            }`,
    `            if (adjObj.tags?.includes('pre')) {
                if (adj === 'Grande') adj = 'Gran';
                if (adj === 'Santo') adj = 'San';
                word = \`\${adj} \${headVal}\`;
            } else {
                word = \`\${headVal} \${adj}\`;
            }
            components.push(\`[head: "\${headObj.def}"]\`, \`[adjective: "\${adjObj.def}"]\`);`
  ],
  [
    `            word = \`\${headVal} \${connector} \${tailData.val}\`;
        }`,
    `            word = \`\${headVal} \${connector} \${tailData.val}\`;
            components.push(\`[head: "\${headObj.def}"]\`, \`[tail: "\${tailObj.def}"]\`);
        }`
  ],
  [
    `    word = \`\${a}\${linker}\${root.val}\`;
  }`,
    `    word = \`\${a}\${linker}\${root.val}\`;
    components.push(\`[adjective: "\${adj.def}"]\`, \`[root: "\${root.def}"]\`);
  }`
  ],
  [
    `        if (Math.random() < 0.25 && r1.val.length <= 6) {
            word = \`\${r1.val}-\${r1.val.toLowerCase()}\`;
        }
        else return generateTagalogPlace();`,
    `        if (Math.random() < 0.25 && r1.val.length <= 6) {
            word = \`\${r1.val}-\${r1.val.toLowerCase()}\`;
            components.push(\`[root: "\${r1.def}"]\`, \`[root: "\${r1.def}"]\`);
        }
        else return generateTagalogPlace();`
  ],
  [
    `            // Separate words: "Tubig Asin"
            word = \`\${part1} \${r2.val}\`; // Keep Case for second word if separate
        }
    }
  }`,
    `            // Separate words: "Tubig Asin"
            word = \`\${part1} \${r2.val}\`; // Keep Case for second word if separate
        }
        components.push(\`[root: "\${r1.def}"]\`, \`[root: "\${r2.def}"]\`);
    }
  }`
  ],
  [
    `  return { word: word, ascii: ascii, generationRules: [rule] };`,
    `  return { word: word, ascii: ascii, generationRules: [rule], dictionaryComponents: components };`
  ]
]);

console.log("All updates completed successfully!");

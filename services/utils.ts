
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

const getVal = (entry: string | readonly [string, any] | undefined): string => {
  if (!entry) return "";
  return typeof entry === 'string' ? entry : entry[0];
};

const getData = (entry: string | readonly [string, any] | undefined) => {
  if (!entry) return { val: "", gender: undefined };
  return typeof entry === 'string' 
    ? { val: entry, gender: undefined } 
    : { val: entry[0], gender: entry[1] };
};
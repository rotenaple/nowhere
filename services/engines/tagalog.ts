
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { TL_ROOTS, TL_PREFIXES, TL_SUFFIXES, TL_ADJECTIVES, TL_SPANISH_HEADS, TL_SPANISH_TAILS } from "../dictionaries/tagalogDict";

export const getTagalogCapacity = () => {
  // 1. Prefix + Root (e.g. Malabon)
  const c1 = TL_PREFIXES.length * TL_ROOTS.length;
  // 2. Root + Suffix (e.g. Batangas)
  const c2 = TL_ROOTS.length * TL_SUFFIXES.length;
  // 3. Adjective + Root (e.g. Bagong Silang)
  const c3 = TL_ADJECTIVES.length * TL_ROOTS.length;
  // 4. Spanish (e.g. San Juan)
  const c4 = TL_SPANISH_HEADS.length * TL_SPANISH_TAILS.length;
  // 5. Compound (Root + Root) - BIGGEST MULTIPLIER
  const c5 = TL_ROOTS.length * TL_ROOTS.length;
  
  return c1 + c2 + c3 + c4 + c5;
}

export const generateTagalogPlace = (): GeneratedResult => {
  let word = "";

  const type = Math.random();

  // Pattern 1: Ma- Prefix (Abundance) - e.g., Makati, Malabon, Mandaluyong, Maynila
  // This is the most "Classic Tagalog" sounding pattern
  if (type < 0.20) {
    const pre = getRandomElement(TL_PREFIXES.filter(p => ['Ma', 'May', 'Mag', 'Pag', 'Ka', 'Mala', 'Hina', 'Kina', 'Mapag', 'Maka', 'Pang', 'Sing'].includes(p.val)));
    const root = getRandomElement(TL_ROOTS);
    
    let p = pre.val;
    let r = root.val;
    
    // Tagalog spelling shift: Calamba, Caloocan (Ka -> Ca)
    if (p === 'Ka' && Math.random() < 0.5) p = 'Ca';
    
    // Prefix + Root (Combined)
    // LOWERCASE the root to avoid "MaBato"
    word = p + r.toLowerCase();
    
    // If prefix is 'May', usually separate space: May Nila -> Maynila (fused) or May Bunga
    // If 'May' is separate, Capitalize both.
    if (p === 'May' && Math.random() < 0.5) {
        word = `${p} ${r}`; // May Bunga (Capitalized Root)
    }
  } 
  
  // Pattern 2: Locative Suffix (-an/-han) - e.g., Bulacan, Batangas (Batangan), Biñan
  else if (type < 0.40) {
    const root = getRandomElement(TL_ROOTS);
    const suf = getRandomElement(TL_SUFFIXES);
    
    let r = root.val;
    let s = suf.val;
    
    // Morphological rules
    // Vowel ending -> add 'h' before 'an' usually (Bato -> Batuhan), or sometimes just 'an' with glottal stop.
    // O -> U shift (Bato -> Batuhan)
    if (r.endsWith('o')) {
        r = r.slice(0, -1) + 'u';
        if (!s.startsWith('h') && !s.startsWith('g')) s = 'h' + s;
    } else if (['a','e','i','u'].includes(r.slice(-1))) {
        // If ends in vowel, prefer -han or -hin unless it is -ng
        if (!s.startsWith('h') && !s.startsWith('g') && !s.startsWith('n')) s = 'h' + s;
    }
    
    // D -> R shift (Bukid -> Bukiran)
    if (r.endsWith('d') && s.startsWith('a')) {
        r = r.slice(0, -1) + 'r';
    }

    word = r + s;
  }
  
  // Pattern 3: Spanish Colonial (e.g., San Juan, Puerto Princesa, La Union)
  else if (type < 0.60) {
    const head = getRandomElement(TL_SPANISH_HEADS);
    const tail = getRandomElement(TL_SPANISH_TAILS);
    
    let h = head.val;
    let t = tail.val;
    
    // Gender agreement hints
    if (h === 'Santa') {
        if (t.endsWith('o')) t = t.slice(0, -1) + 'a';
    }
    
    word = `${h} ${t}`;
    
    // Sometimes "Del" / "De"
    if (Math.random() < 0.2) {
        word = `${h} del ${t}`;
    }
  }
  
  // Pattern 4: Descriptive Adjective + Noun (e.g. Bagong Silang, Pasong Tamo)
  else if (type < 0.80) {
    const adj = getRandomElement(TL_ADJECTIVES);
    const root = getRandomElement(TL_ROOTS);
    
    // Linker 'ng' or 'g'
    // If adj ends in vowel, add 'ng'. If 'n', add 'g'. Else ' na '.
    let a = adj.val;
    let linker = " na ";
    
    if (['a','e','i','o','u'].includes(a.slice(-1))) {
        linker = "ng ";
    } else if (a.slice(-1) === 'n') {
        linker = "g ";
    }
    
    // Often capitalized together as separate words
    word = `${a}${linker}${root.val}`;
  }

  // Pattern 5: Compound Nouns (Root + Root) - Fused or Linked
  // e.g. Tagaytay, Paranaque, Olongapo, Muntinlupa
  else {
    const r1 = getRandomElement(TL_ROOTS);
    const r2 = getRandomElement(TL_ROOTS);
    
    if (r1.val === r2.val) return generateTagalogPlace();

    // Fuse them (Simulating ancient compounds)
    // LOWERCASE second root always
    let part1 = r1.val;
    let part2 = r2.val.toLowerCase();
    
    // Simple linker logic for fusion?
    // If part1 ends in vowel and part2 starts with vowel, maybe merge?
    // Bato + Ulan -> Batoulan -> Batulan?
    // For now, simple concat
    
    if (Math.random() < 0.5) {
        // Fused: Olongapo (Ulo ng Apo)
        // If part1 ends in vowel, add 'ng' sometimes
        if (['a','e','i','o','u'].includes(part1.slice(-1)) && Math.random() < 0.5) {
            part1 += 'ng';
        }
        word = part1 + part2;
    } else {
        // Reduplication (partial or full)
        // e.g. Tawi-Tawi, Iloilo
        if (Math.random() < 0.1) {
            word = `${part1}-${part1.toLowerCase()}`;
        } else {
            // Distinct parts
            word = part1 + part2;
        }
    }
  }

  // Capitalize start
  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: word };
}

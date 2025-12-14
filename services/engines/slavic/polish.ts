
import { GeneratedResult } from "../../../types";
import { getRandomElement, transliteratePolishToAscii } from "../../utils";
import { SLAVIC_DATA } from "../../dictionaries/slavicDict";

export const getPolishCapacity = () => {
  const roots = SLAVIC_DATA.filter(c => c.pl && (c.type === 'root' || c.type === 'stem'));
  const suffixes = SLAVIC_DATA.filter(c => c.pl && c.type === 'suffix');
  const adjectives = SLAVIC_DATA.filter(c => c.pl && c.type === 'adjective');

  // Path 1 (Adjective + Root + Suffix)
  // The compounding logic introduces variants of how these three components combine,
  // but combinatorially, it's still N_A * N_R * N_S distinct sets of components that are generated.
  const path1_adj_rootsuf = adjectives.length * roots.length * suffixes.length;

  // Path 2 (Root + Suffix)
  const path2_rootsuf = roots.length * suffixes.length;
  
  // Polish generator does not currently have a river combination path.
  return path1_adj_rootsuf + path2_rootsuf;
}

export const generatePolishPlace = (): GeneratedResult => {
  let word = "";

  // Get filtered pools
  const getPool = (t: string) => SLAVIC_DATA.filter(c => c.pl && c.type === t);
  const roots = [...getPool('root'), ...getPool('stem')];

  const type = Math.random();
  const prefixes = getPool('adjective');
  const suffixes = getPool('suffix');
  
  // 1. Adjective + Root + Suffix (e.g. Nowy Targ, Białystok)
  if (type < 0.45) {
    const pre = getRandomElement(prefixes);
    const root = getRandomElement(roots);
    const suf = getRandomElement(suffixes);
    
    let p = pre.pl!;
    let r = root.pl!;
    let s = suf.pl!;
    
    let gender = 'm';
    if (s.endsWith('a') || s.endsWith('ice') || s.endsWith('wieś')) gender = 'f';
    else if (s.endsWith('o')) gender = 'n';

    // Inflect Adjective (Basic Nominative)
    let inflectedAdj = p;
    if (gender === 'f') {
        if (p.endsWith('y')) inflectedAdj = p.slice(0, -1) + 'a'; // Nowa
        else if (p.endsWith('i')) inflectedAdj = p + 'a'; 
    } else if (gender === 'n') {
        if (p.endsWith('y')) inflectedAdj = p.slice(0, -1) + 'e'; // Nowe
    }

    // Sometimes compound (Białystok), sometimes separate (Nowy Targ)
    if (Math.random() < 0.6) {
        // Separate: [Adj] [Derived Noun]
        // Truncate root vowel if suffix starts with vowel
        if (['a','e','o'].includes(r.slice(-1)) && ['a','e','i','o'].includes(s.charAt(0))) {
            r = r.slice(0, -1);
        }
        
        // Ensure space is explicitly added
        word = `${inflectedAdj} ${r}${s}`;
    } else {
        // Compound: often drop the adjective ending -> Białystok
        let stem = p.slice(0, -1); // Now-, Star-, Biał-
        // Connector 'o' or 'y'
        let connector = 'o';
        if (p.includes('Biał') || p.includes('Czyst')) connector = 'y';
        
        // IMPORTANT: Lowercase the root in a compound to prevent "BiałyStok"
        let lowerRoot = r.toLowerCase();
        
        // Truncate root vowel for suffix attachment in compound
        if (['a','e','o'].includes(lowerRoot.slice(-1)) && ['a','e','i','o'].includes(s.charAt(0))) {
            lowerRoot = lowerRoot.slice(0, -1);
        }

        word = `${stem}${connector}${lowerRoot}${s}`;
    }
  }
  // 2. Root + Suffix (e.g. Kraków, Szczecin)
  else {
    const root = getRandomElement(roots);
    const suf = getRandomElement(suffixes);
    let r = root.pl!;
    let s = suf.pl!;
    
    if (['a','e','o'].includes(r.slice(-1)) && ['a','e','i','o'].includes(s.charAt(0))) {
        r = r.slice(0, -1);
    }
    
    word = r + s;
  }

  // Final cleanup
  word = word.replace(/(.)\1+/g, '$1'); // De-dupe chars like 'oo'
  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliteratePolishToAscii(word) };
};

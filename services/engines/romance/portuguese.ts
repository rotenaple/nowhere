
import { GeneratedResult } from "../../types";
import { getRandomElement, transliteratePortugueseToAscii } from "../utils";
import { ROMANCE_DATA } from "../dictionaries/romanceDict";

export const getPortugueseCapacity = () => {
  const roots = ROMANCE_DATA.filter(c => c.pt && c.type === 'root');
  const adjectives = ROMANCE_DATA.filter(c => c.pt && c.type === 'adjective');
  const prefixes = ROMANCE_DATA.filter(c => c.pt && c.type === 'prefix');
  
  // 1. Prefix + Root
  const c1 = prefixes.length * roots.length;
  // 2. Root + Adjective
  const c2 = roots.length * adjectives.length;
  // 3. Root + de + Root
  const c3 = roots.length * roots.length;
  
  return c1 + c2 + c3;
}

export const generatePortuguesePlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => ROMANCE_DATA.filter(c => c.pt && c.type === t);
  const roots = getPool('root');

  const type = Math.random();
  
  // 1. Prefix + Root (e.g. São Paulo, Vila Real)
  if (type < 0.3) {
      const prefix = getRandomElement(getPool('prefix'));
      // Special logic: Vila/Porto/Cabo often act as prefixes
      const specialPrefixes = roots.filter(r => ['Vila', 'Porto', 'Cabo', 'Monte', 'Vale', 'Rio'].includes(r.pt!));
      
      let p = prefix.pt!;
      if (Math.random() < 0.6 && specialPrefixes.length > 0) {
          p = getRandomElement(specialPrefixes).pt!;
      }
      
      let r = getRandomElement(roots).pt!;
      word = `${p} ${r}`;
  }
  // 2. Root + Adjective (e.g. Castelo Branco, Rio Grande, Mata Atlântica)
  else if (type < 0.6) {
      const root = getRandomElement(roots);
      const adj = getRandomElement(getPool('adjective'));
      
      let r = root.pt!;
      let a = adj.pt!;
      
      let gender = root.gender || 'm';
      
      if (gender === 'f') {
          if (a.endsWith('o')) a = a.slice(0, -1) + 'a';
          if (a === 'Bom') a = 'Boa';
          if (a === 'Mau') a = 'Má';
          if (a === 'São') a = 'Santa';
          if (a === 'Novo') a = 'Nova';
          if (a === 'Belo') a = 'Bela';
      } else {
          // Masculine
          if (a.endsWith('a') && !['Azul', 'Verde', 'Grande', 'Forte'].includes(a)) {
             // Keep it if invariant, but usually revert to 'o' if dict form was 'a' (unlikely)
          }
      }
      
      word = `${r} ${a}`;
  }
  // 3. Root + de + Root (e.g. Vale do Lobo, Serra da Estrela)
  else {
      // Pick a "Head" noun (often nature)
      const heads = roots.filter(r => ['Vale', 'Serra', 'Monte', 'Campo', 'Ilha', 'Praia', 'Cabo'].includes(r.pt!) || Math.random() < 0.1);
      const r1 = getRandomElement(heads.length > 0 ? heads : roots);
      
      // Pick a "Tail" noun (often animal, tree, or civic)
      const tails = roots.filter(r => r.tags?.includes('animal') || r.tags?.includes('tree') || r.tags?.includes('civic') || Math.random() < 0.2);
      const r2 = getRandomElement(tails.length > 0 ? tails : roots);
      
      let connector = 'de';
      
      // Contraction logic
      // Assume r2 gender. 
      const gender2 = r2.gender || 'm';
      if (gender2 === 'm') connector = 'do';
      else if (gender2 === 'f') connector = 'da';
      
      // If proper noun-ish or specific types, sometimes just 'de'
      if (Math.random() < 0.2) connector = 'de';

      word = `${r1.pt} ${connector} ${r2.pt}`;
  }

  // Cleanup
  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliteratePortugueseToAscii(word) };
};

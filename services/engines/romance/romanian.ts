
import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateRomanianToAscii } from "../../utils";
import { ROMANCE_DATA } from "../../dictionaries/romanceDict";

export const getRomanianCapacity = () => {
  const roots = ROMANCE_DATA.filter(c => c.ro && c.type === 'root');
  const adjectives = ROMANCE_DATA.filter(c => c.ro && c.type === 'adjective');
  
  const c1 = roots.length * adjectives.length; 
  const c2 = roots.length * 5; 
  const c3 = roots.length * roots.length; 
  
  return c1 + c2 + c3;
}

export const generateRomanianPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => ROMANCE_DATA.filter(c => c.ro && c.type === t);
  const roots = getPool('root');

  const type = Math.random();
  
  // 1. Root + Adjective (e.g. Turnu Roșu, Baia Mare)
  if (type < 0.35) {
      const root = getRandomElement(roots);
      const adj = getRandomElement(getPool('adjective'));
      
      let r = root.ro!;
      let a = adj.ro!;
      
      let gender = root.gender || 'n'; 
      
      if (gender === 'f') {
          if (a.endsWith('u') && !['Roșu', 'Albastru'].includes(a)) {
              a = a.slice(0, -1) + 'ă'; 
          } else if (a === 'Frumos') a = 'Frumoasă';
          else if (a === 'Bun') a = 'Bună';
          else if (a === 'Vechi') a = 'Veche';
          else if (a === 'Roșu') a = 'Roșie';
      }
      
      word = `${r} ${a}`;
  }
  // 2. Root + Suffix (e.g. București, Pitești)
  else if (type < 0.65) {
      const root = getRandomElement(roots);
      const suffix = getRandomElement(ROMANCE_DATA.filter(c => c.type === 'suffix' && c.ro));
      
      let base = root.ro!;
      if (['a','ă','e','i','u'].includes(base.slice(-1))) base = base.slice(0, -1);
      
      word = base + suffix.ro;
  }
  // 3. Composite (e.g. Poiana Brașov style - Noun + Noun)
  else {
      // Head: Nature words mostly
      const heads = roots.filter(r => ['Valea', 'Poiana', 'Piatra', 'Muntele', 'Lacul', 'Izvorul'].includes(r.ro!) || r.tags?.includes('nature'));
      // Tail: Animals, Trees, Cities
      const tails = roots.filter(r => r.tags?.includes('animal') || r.tags?.includes('tree') || r.tags?.includes('civic'));
      
      const head = getRandomElement(heads.length > 0 ? heads : roots);
      const tail = getRandomElement(tails.length > 0 ? tails : roots);
      
      let r1 = head.ro!;
      let r2 = tail.ro!;
      
      // Articulate the head
      if (!['ul', 'le', 'a'].includes(r1.slice(-1)) && !r1.endsWith('ea')) {
          if (head.gender === 'f') {
              if (r1.endsWith('ă')) r1 = r1.slice(0, -1) + 'a';
              else if (!r1.endsWith('a')) r1 += 'a';
          } else {
              if (r1.endsWith('u')) r1 += 'l';
              else if (['e','i'].includes(r1.slice(-1))) r1 += 'le';
              else r1 += 'ul';
          }
      }
      
      // Genitive Tail? 
      // Simplified: Just placing them side by side often works for toponyms or using 'de' (e.g. Curtea de Argeș)
      if (Math.random() < 0.4) {
          word = `${r1} de ${r2}`;
      } else {
          // Attempt Genitive/Adjectival for tail if it's an animal/tree
          // Urs -> Ursului? Too complex.
          // Just juxtaposition: Piatra Neamț.
          word = `${r1} ${r2}`;
      }
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateRomanianToAscii(word) };
};

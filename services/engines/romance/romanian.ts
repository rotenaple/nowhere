import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateRomanianToAscii } from "../../utils";
import { ROMANCE_DATA, getRomData } from "../../dictionaries/romanceDict";

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
  
  // 1. Root + Adjective
  if (type < 0.35) {
      const root = getRandomElement(roots);
      const adj = getRandomElement(getPool('adjective'));
      
      const rData = getRomData(root.ro);
      let r = rData.val;
      let a = getRomData(adj.ro).val;
      
      let gender = rData.gender || 'n';
      
      // Gender Logic (Standard Morphology)
      if (gender === 'f') {
          // 1. Ends in -u -> -ă (e.g. Nou -> Nouă, Roșu -> Roșie handled by exception below)
          if (a.endsWith('u')) {
              // Special case: -iu -> -ie (Argintiu -> Argintie, Roșu -> Roșie is irregular but follows similar vowel shift)
              if (a.endsWith('iu')) a = a.slice(0, -2) + 'ie';
              // Special case: Roșu -> Roșie
              else if (a === 'Roșu') a = 'Roșie';
              // Standard: -u -> -ă
              else a = a.slice(0, -1) + 'ă'; 
          }
          // 2. Invariant (ends in e)
          else if (a.endsWith('e')) {
              // No change (Mare -> Mare)
          } 
          // 3. Default Consonant -> +ă (Bun -> Bună, Divin -> Divină)
          else {
              a += 'ă';
          }
      }
      
      word = `${r} ${a}`;
  }
  
  // 2. Root + Suffix
  else if (type < 0.65) {
      const root = getRandomElement(roots);
      const suffix = getRandomElement(ROMANCE_DATA.filter(c => c.type === 'suffix' && c.ro));
      
      let base = getRomData(root.ro).val;
      if (['a','ă','e','i','u'].includes(base.slice(-1))) base = base.slice(0, -1);
      
      word = base + getRomData(suffix.ro).val;
  }
  
  // 3. Composite
  else {
      // Logic relies on tags 'nature'/'civic' which are now present in Dict
      const heads = roots.filter(r => r.tags?.includes('nature') || r.tags?.includes('common_prefix'));
      const tails = roots.filter(r => r.tags?.includes('animal') || r.tags?.includes('tree') || r.tags?.includes('civic'));
      
      const head = getRandomElement(heads.length > 0 ? heads : roots);
      const tail = getRandomElement(tails.length > 0 ? tails : roots);
      
      const hData = getRomData(head.ro);
      let r1 = hData.val;
      let r2 = getRomData(tail.ro).val;
      
      // Articulation (Definite Article)
      if (!['ul', 'le', 'a'].includes(r1.slice(-1)) && !r1.endsWith('ea')) {
          if (hData.gender === 'f') {
              if (r1.endsWith('ă')) r1 = r1.slice(0, -1) + 'a';
              else if (r1.endsWith('e')) r1 += 'a'; 
              else if (!r1.endsWith('a')) r1 += 'a';
          } else {
              if (r1.endsWith('u')) r1 += 'l';
              else if (['e','i'].includes(r1.slice(-1))) r1 += 'le';
              else r1 += 'ul';
          }
      }
      
      if (Math.random() < 0.4) {
          word = `${r1} de ${r2}`;
      } else {
          word = `${r1} ${r2}`;
      }
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateRomanianToAscii(word) };
};
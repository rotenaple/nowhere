import { GeneratedResult } from "../../../types";
import { getRandomElement, transliteratePortugueseToAscii } from "../../utils";
import { ROMANCE_DATA, getRomData } from "../../dictionaries/romanceDict";

export const getPortugueseCapacity = () => {
  const roots = ROMANCE_DATA.filter(c => c.pt && c.type === 'root');
  const adjectives = ROMANCE_DATA.filter(c => c.pt && c.type === 'adjective');
  const prefixes = ROMANCE_DATA.filter(c => c.pt && c.type === 'prefix');
  
  const c1 = prefixes.length * roots.length;
  const c2 = roots.length * adjectives.length;
  const c3 = roots.length * roots.length;
  
  return c1 + c2 + c3;
}

export const generatePortuguesePlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => ROMANCE_DATA.filter(c => c.pt && c.type === t);
  const roots = getPool('root');

  const type = Math.random();
  
  // 1. Prefix + Root
  if (type < 0.3) {
      const prefixObj = getRandomElement(getPool('prefix'));
      
      // Use roots tagged as 'common_prefix' (Vila, Porto, Cabo) instead of hardcoded list
      const commonPrefixRoots = roots.filter(r => r.tags?.includes('common_prefix'));
      
      let p = getRomData(prefixObj.pt).val;
      if (Math.random() < 0.6 && commonPrefixRoots.length > 0) {
          const rootAsPrefix = getRandomElement(commonPrefixRoots);
          p = getRomData(rootAsPrefix.pt).val;
      }
      
      let r = getRomData(getRandomElement(roots).pt).val;
      word = `${p} ${r}`;
  }
  
  // 2. Root + Adjective
  else if (type < 0.6) {
      const rootObj = getRandomElement(roots);
      const adjObj = getRandomElement(getPool('adjective'));
      
      const rData = getRomData(rootObj.pt);
      let r = rData.val;
      let a = getRomData(adjObj.pt).val;
      
      let gender = rData.gender || 'm';
      
      if (gender === 'f') {
          if (a.endsWith('o')) a = a.slice(0, -1) + 'a';
          if (a === 'Bom') a = 'Boa';
          if (a === 'Mau') a = 'Má';
          if (a === 'São') a = 'Santa';
          if (a === 'Novo') a = 'Nova';
          if (a === 'Belo') a = 'Bela';
      }
      
      word = `${r} ${a}`;
  }
  
  // 3. Root + de + Root
  else {
      // Pick Head: Nature/Common Prefix
      const heads = roots.filter(r => r.tags?.includes('nature') || r.tags?.includes('common_prefix') || Math.random() < 0.1);
      const r1Obj = getRandomElement(heads.length > 0 ? heads : roots);
      
      // Pick Tail: Animal/Tree/Civic
      const tails = roots.filter(r => r.tags?.includes('animal') || r.tags?.includes('tree') || r.tags?.includes('civic'));
      const r2Obj = getRandomElement(tails.length > 0 ? tails : roots);
      
      const r1 = getRomData(r1Obj.pt).val;
      const r2Data = getRomData(r2Obj.pt);
      
      let connector = 'de';
      
      // Contraction Logic
      if (r2Data.gender === 'm') connector = 'do';
      else if (r2Data.gender === 'f') connector = 'da';
      
      if (Math.random() < 0.2) connector = 'de';

      word = `${r1} ${connector} ${r2Data.val}`;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliteratePortugueseToAscii(word) };
};
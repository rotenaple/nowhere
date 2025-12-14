import { GeneratedResult } from "../../../types";
import { getRandomElement } from "../../utils";
import { ROMANCE_DATA, getRomData } from "../../dictionaries/romanceDict";

export const getItalianCapacity = () => {
  const roots = ROMANCE_DATA.filter(c => c.it && c.type === 'root');
  const suffixes = ROMANCE_DATA.filter(c => c.it && c.type === 'suffix');
  const prefixes = ROMANCE_DATA.filter(c => c.it && c.type === 'prefix');

  const c1 = prefixes.length * roots.length;
  const c2 = roots.length * suffixes.length;
  const c3 = roots.length * roots.length;
  return c1 + c2 + c3;
}

export const generateItalianPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => ROMANCE_DATA.filter(c => c.it && c.type === t);
  const roots = getPool('root');

  const type = Math.random();

  // 1. Prefix + Root
  if (type < 0.40) {
    const prefixObj = getRandomElement(getPool('prefix'));
    const rootObj = getRandomElement([...roots, ...getPool('adjective')]);
    
    let p = getRomData(prefixObj.it).val;
    let rData = getRomData(rootObj.it);
    let r = rData.val;
    
    // Logic: Check tag 'fem_head' in dictionary for Villa, Isola, etc.
    if (prefixObj.tags?.includes('fem_head') || p.endsWith('a')) {
        if (r.endsWith('o')) r = r.slice(0, -1) + 'a';
        else if (r === 'Santo') r = 'Santa';
        else if (r === 'Nuovo') r = 'Nuova';
        else if (r === 'Vecchio') r = 'Vecchia';
        else if (r === 'San') r = 'Santa';
    }
    
    // Heuristic: Short prefixes have space, long ones fuse
    // Or use tag 'fuse'
    if (p.length <= 3 || Math.random() < 0.3) {
        word = `${p} ${r}`; 
    } else {
        word = p + r.toLowerCase(); 
    }
  }
  
  // 2. Root + Suffix
  else if (type < 0.75) {
    let rootObj = getRandomElement(roots);
    const suffixObj = getRandomElement(getPool('suffix'));
    
    let base = getRomData(rootObj.it).val;
    const sVal = getRomData(suffixObj.it).val;

    if (['a','e','i','o'].includes(base.slice(-1))) {
      base = base.slice(0, -1);
    }
    word = base + sVal;
  }
  
  // 3. "Di" Construction
  else {
    const headObj = getRandomElement(roots);
    const tailObj = getRandomElement(roots);
    let h = getRomData(headObj.it).val;
    let t = getRomData(tailObj.it).val;
    
    word = `${h} di ${t}`;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  const ascii = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/'/g, "");
  return { word, ascii };
};
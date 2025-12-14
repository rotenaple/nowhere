import { GeneratedResult } from "../../../types";
import { getRandomElement } from "../../utils";
import { ROMANCE_DATA, getRomData } from "../../dictionaries/romanceDict";

export const getSpanishCapacity = () => {
  const roots = ROMANCE_DATA.filter(c => c.es && c.type === 'root');
  const suffixes = ROMANCE_DATA.filter(c => c.es && c.type === 'suffix');
  const prefixes = ROMANCE_DATA.filter(c => c.es && c.type === 'prefix');
  
  const c1 = prefixes.length * roots.length;
  const c2 = roots.length * roots.length;
  const c3 = roots.length * suffixes.length;
  return c1 + c2 + c3;
}

export const generateSpanishPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => ROMANCE_DATA.filter(c => c.es && c.type === t);
  const roots = getPool('root');

  const type = Math.random();
  
  // 1. Head (Prefix) + Root/Adj
  // e.g. San Pedro, Villa Real, La Nueva
  if (type < 0.40) {
    const headObj = getRandomElement(getPool('prefix'));
    const rootObj = getRandomElement([...roots, ...getPool('adjective')]);
    
    let h = getRomData(headObj.es).val;
    const rData = getRomData(rootObj.es);
    let r = rData.val;

    // STEP 1: Determine Target Gender
    let targetGender = 'm'; // Default

    if (rootObj.type === 'root') {
        // If Root is a Noun, it dictates the gender (e.g. Mesa -> f)
        targetGender = rData.gender || 'm';
    } else {
        // If Root is an Adjective, the Prefix dictates the gender (e.g. Villa -> f)
        // Check tags or explicit feminine strings
        if (headObj.tags?.includes('fem_head') || h === 'La' || h.endsWith('a')) {
            targetGender = 'f';
        } else {
            targetGender = 'm';
        }
    }

    // STEP 2: Align Prefix to Target Gender
    // Handle Articles
    if (['El', 'La', 'Los', 'Las'].includes(h)) {
        h = (targetGender === 'f') ? 'La' : 'El';
    }
    // Handle Saints
    else if (['San', 'Santo', 'Santa'].includes(h)) {
        if (targetGender === 'f') {
            h = 'Santa';
        } else {
            // Masculine: Default to San, but use Santo for phonetic exceptions
            if (r.startsWith('Do') || r.startsWith('To')) h = 'Santo';
            else h = 'San';
        }
    }

    // STEP 3: Align Adjective (if applicable) to Target Gender
    if (rootObj.type === 'adjective') {
        if (targetGender === 'f') {
            // Feminize
            if (r.endsWith('o')) r = r.slice(0, -1) + 'a'; // Nuevo -> Nueva
            else if (r === 'Santo') r = 'Santa'; // Specific irregularities
            else if (r === 'Buen') r = 'Buena';
            else if (r === 'Mal') r = 'Mala';
            // Words ending in 'e' (Verde) or consonants (Real) usually stay invariant in Spanish 
            // unless they are specific nationality endings, which aren't in this dict.
        } else {
            // Masculinize (restore 'o' if it was somehow 'a', e.g., irregular dict entry)
            if (r.endsWith('a') && !rootObj.tags?.includes('invariant')) {
               r = r.slice(0, -1) + 'o';
            }
        }
    }
    
    word = `${h} ${r}`;
  }
  
  // 2. Root + Suffix
  // e.g. Almeria
  else if (type < 0.70) {
    const rootObj = getRandomElement(roots);
    const suffixObj = getRandomElement(getPool('suffix'));
    
    let base = getRomData(rootObj.es).val;
    const sVal = getRomData(suffixObj.es).val;
    
    // Vowel collision: Costa + al -> Costal
    if (['a','o','e'].includes(base.slice(-1)) && ['a','e','i','o'].includes(sVal.charAt(0))) {
        base = base.slice(0, -1);
    }
    word = base + sVal;
  }
  
  // 3. "De" Construction
  // e.g. Puerto de la Cruz
  else {
    const headObj = getRandomElement(roots);
    const tailObj = getRandomElement([...roots, ...getPool('adjective')]);
    
    let h = getRomData(headObj.es).val;
    const tData = getRomData(tailObj.es);
    let t = tData.val;
    
    let connector = 'de';
    
    // Contraction Logic: de + el = del
    // We only contract if we are sure the tail is masculine. 
    // Adjectives (no gender in Data) are risky, so we tend to assume 'de' or check ending.
    if (Math.random() < 0.3 && !['El','La','Los'].includes(t)) {
        let isTailFem = tData.gender === 'f' || t.endsWith('a');
        let isTailMasc = tData.gender === 'm' || t.endsWith('o');

        if (isTailFem) connector = 'de la';
        else if (isTailMasc) connector = 'del';
    }
    
    word = `${h} ${connector} ${t}`;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  const ascii = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return { word, ascii };
};
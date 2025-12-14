import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateGermanToAscii } from "../../utils";
import { GERMANIC_DATA } from "../../dictionaries/germanicDict";

// Helper to extract string value from Tuple or String
const getVal = (entry: any): string => typeof entry === 'string' ? entry : (entry ? entry[0] : "");
// Helper to extract gender data for German
const getData = (entry: any) => {
  if (!entry) return { val: "", gender: undefined };
  return typeof entry === 'string' ? { val: entry, gender: undefined } : { val: entry[0], gender: entry[1] };
};

export const getGermanCapacity = () => {
  const roots = GERMANIC_DATA.filter(c => c.de && c.type === 'root');
  const suffixes = GERMANIC_DATA.filter(c => c.de && c.type === 'suffix');
  const prefixes = GERMANIC_DATA.filter(c => c.de && c.type === 'prefix');
  const connectors = GERMANIC_DATA.filter(c => c.de && c.type === 'connector');

  // 1. Prefix+Suffix 
  const c1 = prefixes.length * suffixes.length;
  // 2. Root+Suffix
  const c2 = roots.length * suffixes.length * (connectors.length + 1);
  // 3. Root+Root
  const c3 = roots.length * roots.length;
  return c1 + c2 + c3;
}

export const generateGermanPlace = (): GeneratedResult => {
  let word = "";
  
  const getPool = (t: string) => GERMANIC_DATA.filter(c => c.de && c.type === t);
  const roots = getPool('root');

  const type = Math.random();
  // 1. Prefix + Suffix
  if (type < 0.35) {
    const pre = getRandomElement(getPool('prefix'));
    const suf = getRandomElement(getPool('suffix'));
    // Use helper because it might be a simple string or tuple
    word = getVal(pre.de) + getVal(suf.de);
  }
  // 2. Compound Noun + Connector + Suffix
  else if (type < 0.75) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    const rVal = getVal(root.de);
    const sVal = getVal(suf.de);

    if (rVal.toLowerCase() === sVal.toLowerCase()) return generateGermanPlace();
    if (sVal.includes(rVal.toLowerCase())) return generateGermanPlace();

    let connector = "";
    if (Math.random() < 0.6) {
        const conObj = getRandomElement(getPool('connector'));
        connector = getVal(conObj.de);
    }
    
    // Heuristic glue
    if (sVal === 'burg' || sVal === 'dorf' || sVal === 'heim') {
        if (!['s', 'n', 'r', 'l'].includes(rVal.slice(-1)) && Math.random() < 0.5) connector = 's';
    }
    if (rVal.endsWith('e')) connector = 'n';

    word = rVal + connector + sVal;
  }
  // 3. Root + Root
  else {
    const root1 = getRandomElement(roots);
    const root2 = getRandomElement(roots);
    
    const v1 = getVal(root1.de);
    const v2 = getVal(root2.de);

    if (v1 === v2) return generateGermanPlace();
    if (v2.length < 3) return generateGermanPlace();
    
    let glue = "";
    if (Math.random() < 0.3) glue = "s";
    
    word = v1 + glue + v2.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateGermanToAscii(word) };
};
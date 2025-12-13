
import { GeneratedResult } from "../../types";
import { getRandomElement, transliterateGermanToAscii } from "../utils";
import { GERMANIC_DATA } from "../dictionaries/germanicDict";

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
    // Use non-null assertion because we filtered by c.de
    word = pre.de! + suf.de!;
  }
  // 2. Compound Noun + Connector + Suffix
  else if (type < 0.75) {
    const root = getRandomElement(roots);
    const suf = getRandomElement(getPool('suffix'));
    
    if (root.de!.toLowerCase() === suf.de!.toLowerCase()) return generateGermanPlace();
    if (suf.de!.includes(root.de!.toLowerCase())) return generateGermanPlace();

    let connector = "";
    if (Math.random() < 0.6) {
        const conObj = getRandomElement(getPool('connector'));
        connector = conObj.de || "";
    }
    
    // Heuristic glue
    if (suf.de === 'burg' || suf.de === 'dorf' || suf.de === 'heim') {
        if (!['s', 'n', 'r', 'l'].includes(root.de!.slice(-1)) && Math.random() < 0.5) connector = 's';
    }
    if (root.de!.endsWith('e')) connector = 'n';

    word = root.de + connector + suf.de;
  }
  // 3. Root + Root
  else {
    const root1 = getRandomElement(roots);
    const root2 = getRandomElement(roots);
    if (root1.de === root2.de) return generateGermanPlace();
    if (root2.de!.length < 3) return generateGermanPlace();
    
    let glue = "";
    if (Math.random() < 0.3) glue = "s";
    
    word = root1.de + glue + root2.de!.toLowerCase();
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateGermanToAscii(word) };
};
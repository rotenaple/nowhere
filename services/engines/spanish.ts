
import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { ROMANCE_DATA } from "../dictionaries/romanceDict";

export const getSpanishCapacity = () => {
  const roots = ROMANCE_DATA.filter(c => c.es && c.type === 'root');
  const suffixes = ROMANCE_DATA.filter(c => c.es && c.type === 'suffix');
  const prefixes = ROMANCE_DATA.filter(c => c.es && c.type === 'prefix');
  
  // 1. Prefix + Root
  const c1 = prefixes.length * roots.length;
  // 2. Root + Root
  const c2 = roots.length * roots.length;
  // 3. Root + Suffix
  const c3 = roots.length * suffixes.length;
  return c1 + c2 + c3;
}

export const generateSpanishPlace = (): GeneratedResult => {
  let word = "";
  
  // Filter Spanish components
  const getPool = (t: string) => ROMANCE_DATA.filter(c => c.es && c.type === t);
  const roots = getPool('root');

  const type = Math.random();
  // 1. Head (Prefix) + Root/Adj (e.g. San Pedro, Villa Real)
  if (type < 0.40) {
    const head = getRandomElement(getPool('prefix'));
    const root = getRandomElement([...roots, ...getPool('adjective')]);
    
    let h = head.es!;
    let r = root.es!;
    
    // Gender agreement if second part is adjective
    if (root.type === 'adjective') {
        const feminineHeads = ['Santa', 'Villa', 'Playa', 'Costa', 'Isla', 'Laguna', 'Sierra'];
        if (feminineHeads.includes(h)) {
            if (r.endsWith('o')) r = r.slice(0, -1) + 'a';
            else if (r === 'Santo') r = 'Santa';
            else if (r === 'Nuevo') r = 'Nueva';
        } else {
            // Default Masculine
            if (r.endsWith('a') && !['Vista', 'Esperanza'].includes(r)) r = r.slice(0, -1) + 'o';
        }
    }
    
    if (h === 'Santo' && !r.startsWith('Do') && !r.startsWith('To')) h = 'San';
    
    word = `${h} ${r}`;
  }
  // 2. Root + Suffix (e.g. Almeria, Gonzalez - stylistic)
  else if (type < 0.70) {
    const root = getRandomElement(roots);
    const suffix = getRandomElement(getPool('suffix'));
    let base = root.es!;
    
    if (['a','o','e'].includes(base.slice(-1)) && ['a','e','i','o'].includes(suffix.es!.charAt(0))) {
        base = base.slice(0, -1);
    }
    word = base + suffix.es!;
  }
  // 3. "De" Construction (e.g. Puerto de la Cruz)
  else {
    const head = getRandomElement(roots);
    const tail = getRandomElement([...roots, ...getPool('adjective')]);
    
    let h = head.es!;
    let t = tail.es!;
    let connector = 'de';
    
    if (Math.random() < 0.3 && !['El','La','Los'].includes(t)) {
        if (t.endsWith('a') || tail.gender === 'f') connector = 'de la';
        else connector = 'del';
    }
    
    word = `${h} ${connector} ${t}`;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  const ascii = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return { word, ascii };
};

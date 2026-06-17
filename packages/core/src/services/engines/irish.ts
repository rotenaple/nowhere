
import { GeneratedResult } from "../../types";
import { getRandomElement, transliterateIrishToAscii } from "../utils";
import { 
  GA_PREFIXES, GA_ROOTS, GA_ADJECTIVES 
} from "../dictionaries/irishDict";

export const getIrishCapacity = () => {
  const set = new Set<string>();

  const lenite = (word: string): string => {
    const consonants = "bcdfgmpst";
    const first = word.charAt(0).toLowerCase();
    if (consonants.includes(first) && word.charAt(1) !== 'h') {
      return word.charAt(0) + 'h' + word.slice(1);
    }
    return word;
  };

  const femininePrefixes = ['Cill', 'Carraig', 'Inis', 'Coill', 'Maigh', 'Rinn'];

  // 1. Prefix + Root
  for (const pre of GA_PREFIXES) {
    for (const root of GA_ROOTS) {
      let r = root;
      if (femininePrefixes.includes(pre)) {
        r = lenite(r);
      }
      set.add(pre + " " + r);
    }
  }

  // 2. Prefix + Root + Adjective / Prefix + Adjective
  for (const pre of GA_PREFIXES) {
    for (const adj of GA_ADJECTIVES) {
      let a = adj;
      if (femininePrefixes.includes(pre)) {
        a = lenite(a);
      }
      // Branch A: Prefix + Adjective
      set.add(pre + " " + a);

      // Branch B: Prefix + Root + Adjective
      for (const root of GA_ROOTS) {
        set.add(pre + " " + root + " " + a);
      }
    }
  }

  return set.size;
}

// Basic lenition helper (séimhiú)
const lenite = (word: string): string => {
  const consonants = "bcdfgmpst";
  const first = word.charAt(0).toLowerCase();
  if (consonants.includes(first) && word.charAt(1) !== 'h') {
    return word.charAt(0) + 'h' + word.slice(1);
  }
  return word;
};

export const generateIrishPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];

  const type = Math.random();
  // 1. Prefix + Root (e.g. Baile Átha)
  if (type < 0.60) {
    rule = "Prefix + Root";
    const pre = getRandomElement(GA_PREFIXES);
    let root = getRandomElement(GA_ROOTS);
    
    // Feminine nouns often lenite the following genitive noun
    const femininePrefixes = ['Cill', 'Carraig', 'Inis', 'Coill', 'Maigh', 'Rinn'];
    if (femininePrefixes.includes(pre)) {
        root = lenite(root);
    }

    word = `${pre} ${root}`;
    components.push(`[prefix: "${pre}"]`, `[root: "${root}"]`);
  }
  // 2. Prefix + Root + Adjective (e.g. Baile Átha Cliath - well that's not adj, but e.g. Carraig Dubh)
  else {
    rule = "Prefix + Root + Adjective";
    const pre = getRandomElement(GA_PREFIXES);
    const root = getRandomElement(GA_ROOTS); // Usually noun
    let adj = getRandomElement(GA_ADJECTIVES);

    // Adjectives are lenited after feminine nouns
    const femininePrefixes = ['Cill', 'Carraig', 'Inis', 'Coill', 'Maigh', 'Rinn'];
    if (femininePrefixes.includes(pre)) {
        adj = lenite(adj);
    }

    if (Math.random() < 0.4) {
         word = `${pre} ${adj}`;
         components.push(`[prefix: "${pre}"]`, `[adjective: "${adj}"]`);
    } else {
         word = `${pre} ${root} ${adj}`;
         components.push(`[prefix: "${pre}"]`, `[root: "${root}"]`, `[adjective: "${adj}"]`);
    }
  }

  // Cleanup spaces
  word = word.trim();
  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateIrishToAscii(word), generationRules: [rule], dictionaryComponents: components };
};

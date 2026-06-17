import { GeneratedResult } from "../../../types";
import { getRandomElement } from "../../utils";
import { ROMANCE_DATA, getRomData, RomanceComponent } from "../../dictionaries/romanceDict";

// Helper to filter by multiple types
const getPool = (types: string[]) => 
  ROMANCE_DATA.filter(c => c.es && types.includes(c.type));

export const getSpanishCapacity = () => {
  const suffixes = getPool(['suffix']);
  
  // Recipe 1: San Patterns (Abstract/Bio)
  const recipe1 = getPool(['prefix']).length * getPool(['bio_fauna', 'bio_flora', 'abstract']).length; 
  
  // Recipe 2: Noun + Universal Adjective
  const nouns = getPool(['geo_major', 'geo_minor', 'settlement']);
  const allAdjs = getPool(['adj_geo', 'adj_color', 'adj_quality']);
  const recipe2 = nouns.length * allAdjs.length;
  
  // Recipe 3: Noun + de + Universal Tail
  const allTails = getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']);
  const recipe3 = nouns.length * allTails.length; 
  
  // Recipe 4: Root + Suffix
  const roots = getPool(['bio_flora', 'geo_minor', 'settlement', 'geo_major']);
  const recipe4 = roots.length * suffixes.length;

  return recipe1 + recipe2 + recipe3 + recipe4;
}

export const generateSpanishPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();

  // Helper for gender agreement
  const formatAdjective = (nounGender: string, adjObj: RomanceComponent) => {
    let adj = getRomData(adjObj.es).val;
    if (nounGender === 'f') {
      if (adj.endsWith('o')) return adj.slice(0, -1) + 'a';
      if (adj === 'Santo') return 'Santa'; 
      if (adj === 'Buen') return 'Buena';
      if (adj === 'Mal') return 'Mala';
    }
    if (nounGender === 'm' && adj === 'Santo') {
        return 'Santo'; 
    }
    return adj;
  };

  // --- RECIPE 1: The "San" Pattern ---
  if (roll < 0.15) {
    rule = 'The "San" Pattern';
    const saintPool = ROMANCE_DATA.filter(c => c.es && c.tags?.includes('saint_ok'));
    const target = getRandomElement(saintPool); 
    components.push(JSON.stringify(target));
    const tData = getRomData(target.es);
    
    let prefix = (tData.gender === 'f') ? 'Santa' : 'San';
    if (prefix === 'San' && (tData.val.startsWith('Do') || tData.val.startsWith('To'))) {
        prefix = 'Santo';
    }
    word = `${prefix} ${tData.val}`;
  }

  // --- RECIPE 2: Geo/Settlement + Universal Adjective ---
  else if (roll < 0.50) {
    rule = 'Geo/Settlement + Universal Adjective';
    const nounObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
    const nData = getRomData(nounObj.es);
    let nGender = nData.gender || 'm';
    let nounVal = nData.val;

    if (nounVal.endsWith('illo') && Math.random() < 0.08) {
        nounVal = nounVal.slice(0, -4) + 'illa';
        nGender = 'f';
    }

    // EXPANSION: Colors and Quality apply to EVERYTHING. Geo adjectives only to Geo nouns.
    let adjTypes = ['adj_color', 'adj_quality']; 
    if (['geo_major', 'geo_minor'].includes(nounObj.type)) {
        adjTypes.push('adj_geo');
    }
    
    const adjObj = getRandomElement(getPool(adjTypes));
    let adj = formatAdjective(nGender, adjObj);
    components.push(JSON.stringify(nounObj), JSON.stringify(adjObj));

    if (adjObj.tags?.includes('pre')) {
        if (adj === 'Grande' || adj === 'Grandes') adj = 'Gran'; 
        if (adj === 'Bueno') adj = 'Buen';
        if (adj === 'Malo') adj = 'Mal';
        if (adj === 'Santo') adj = 'San'; 
        word = `${adj} ${nounVal}`;
    } else {
        word = `${nounVal} ${adj}`;
    }
  }

  // --- RECIPE 3: The "De" Construction (Universal Tail) ---
  else if (roll < 0.85) {
    rule = 'The "De" Construction';
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Tail can be almost anything now (City of the Mountain, Bridge of the King)
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
    components.push(JSON.stringify(headObj), JSON.stringify(tailObj));
    
    const h = getRomData(headObj.es).val;
    const tData = getRomData(tailObj.es);
    let t = tData.val;
    let tGender = tData.gender || 'm';

    if (t.endsWith('illo') && Math.random() < 0.08) {
        t = t.slice(0, -4) + 'illa';
        tGender = 'f';
    }

    let connector = 'de';
    // Use article for all nouns/adjectives except those tagged with 'no_saint' (materials/weather)
    const useArticle = !tailObj.tags?.includes('no_saint');
    
    if (useArticle) {
        if (tGender === 'f') connector = 'de la';
        else connector = 'del';
    }

    word = `${h} ${connector} ${t}`;
  }

  // --- RECIPE 4: Suffix Modification ---
  else {
    rule = 'Suffix Modification';
    // EXPANSION: Allow suffixing Geo Majors (Montana -> Montanilla)
    const rootObj = getRandomElement(getPool(['bio_flora', 'geo_minor', 'settlement', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));
    components.push(JSON.stringify(rootObj), JSON.stringify(suffixObj));
    
    let base = getRomData(rootObj.es).val;
    let sVal = getRomData(suffixObj.es).val;

    if (sVal === 'illo' && Math.random() < 0.08) {
        sVal = 'illa';
    }

    const baseEndsVowel = ['a','e','i','o','u'].includes(base.slice(-1).toLowerCase());
    const suffStartsVowel = ['a','e','i','o','u'].includes(sVal.charAt(0).toLowerCase());

    if (baseEndsVowel && suffStartsVowel) {
        base = base.slice(0, -1);
    } 
    else if (sVal === 'ez' && baseEndsVowel) {
         base = base.slice(0, -1);
    }

    word = base + sVal;
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  const ascii = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return { word, ascii, generationRules: [rule], dictionaryComponents: components };
};
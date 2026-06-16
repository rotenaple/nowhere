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
    const target = getRandomElement(getPool(['bio_fauna', 'bio_flora', 'abstract'])); 
    const tData = getRomData(target.es);
    
    let prefix = (tData.gender === 'f') ? 'Santa' : 'San';
    if (prefix === 'San' && (tData.val.startsWith('Do') || tData.val.startsWith('To'))) {
        prefix = 'Santo';
    }
    word = `${prefix} ${tData.val}`;
  }

  // --- RECIPE 2: Geo/Settlement + Universal Adjective ---
  else if (roll < 0.50) {
    const nounObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
    const nData = getRomData(nounObj.es);
    const nGender = nData.gender || 'm';

    // EXPANSION: Colors and Quality apply to EVERYTHING. Geo adjectives only to Geo nouns.
    let adjTypes = ['adj_color', 'adj_quality']; 
    if (['geo_major', 'geo_minor'].includes(nounObj.type)) {
        adjTypes.push('adj_geo');
    }
    
    const adjObj = getRandomElement(getPool(adjTypes));
    let adj = formatAdjective(nGender, adjObj);

    if (adjObj.tags?.includes('pre')) {
        if (adj === 'Grande' || adj === 'Grandes') adj = 'Gran'; 
        if (adj === 'Bueno') adj = 'Buen';
        if (adj === 'Malo') adj = 'Mal';
        if (adj === 'Santo') adj = 'San'; 
        word = `${adj} ${nData.val}`;
    } else {
        word = `${nData.val} ${adj}`;
    }
  }

  // --- RECIPE 3: The "De" Construction (Universal Tail) ---
  else if (roll < 0.85) {
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Tail can be almost anything now (City of the Mountain, Bridge of the King)
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
    
    const h = getRomData(headObj.es).val;
    const tData = getRomData(tailObj.es);
    const t = tData.val;

    let connector = 'de';
    // Use article for concrete nouns, usually skip for abstract/proper-sounding ones
    const useArticle = ['bio_fauna', 'geo_minor', 'geo_major', 'settlement'].includes(tailObj.type) || Math.random() > 0.6;
    
    if (useArticle) {
        if (tData.gender === 'f') connector = 'de la';
        else connector = 'del';
    }

    word = `${h} ${connector} ${t}`;
  }

  // --- RECIPE 4: Suffix Modification ---
  else {
    // EXPANSION: Allow suffixing Geo Majors (Montana -> Montanilla)
    const rootObj = getRandomElement(getPool(['bio_flora', 'geo_minor', 'settlement', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));
    
    let base = getRomData(rootObj.es).val;
    const sVal = getRomData(suffixObj.es).val;

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
  return { word, ascii };
};
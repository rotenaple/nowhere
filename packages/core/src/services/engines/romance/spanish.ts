import { GeneratedResult } from "../../../types";
import { getRandomElement } from "../../utils";
import { ROMANCE_DATA, getRomData, RomanceComponent } from "../../dictionaries/romanceDict";

// Helper to filter by multiple types
const getPool = (types: string[]) => 
  ROMANCE_DATA.filter(c => c.es && types.includes(c.type));

export const getSpanishCapacity = () => {
  const set = new Set<string>();

  const formatAdjective = (nounGender: string, adjObj: RomanceComponent) => {
    let adj = getRomData(adjObj.es).val;
    if (nounGender === 'f') {
      if (adj.endsWith('o')) return adj.slice(0, -1) + 'a';
      if (adj === 'Santo') return 'Santa'; 
      if (adj === 'Buen') return 'Buena';
      if (adj === 'Mal') return 'Mala';
    }
    return adj;
  };

  // --- RECIPE 1: The "San" Pattern ---
  const saintPool = ROMANCE_DATA.filter(c => c.es && c.tags?.includes('saint_ok'));
  for (const target of saintPool) {
    const tData = getRomData(target.es);
    let prefixes = ['San'];
    if (tData.gender === 'f') {
      prefixes = ['Santa'];
    } else if (tData.val.startsWith('Do') || tData.val.startsWith('To')) {
      prefixes = ['Santo'];
    }
    for (const prefix of prefixes) {
      set.add((prefix + " " + tData.val).trim().toLowerCase());
    }
  }

  // --- RECIPE 2: Geo/Settlement + Universal Adjective ---
  const nouns = getPool(['geo_major', 'geo_minor', 'settlement']);
  for (const nounObj of nouns) {
    let adjTypes = ['adj_color', 'adj_quality']; 
    if (['geo_major', 'geo_minor'].includes(nounObj.type)) {
      adjTypes.push('adj_geo');
    }
    const adjPool = getPool(adjTypes);
    for (const adjObj of adjPool) {
      const nData = getRomData(nounObj.es);
      let nGenders = [nData.gender || 'm'];
      let nVals = [nData.val];

      if (nData.val.endsWith('illo')) {
        nVals.push(nData.val.slice(0, -4) + 'illa');
        nGenders.push('f');
      }

      for (let i = 0; i < nVals.length; i++) {
        const val = nVals[i];
        const gender = nGenders[i];
        let adj = formatAdjective(gender, adjObj);

        if (adjObj.tags?.includes('pre')) {
          const possibleAdjs = [adj];
          if (adj === 'Grande' || adj === 'Grandes') possibleAdjs.push('Gran'); 
          if (adj === 'Bueno') possibleAdjs.push('Buen');
          if (adj === 'Malo') possibleAdjs.push('Mal');
          if (adj === 'Santo') possibleAdjs.push('San'); 
          for (const a of possibleAdjs) {
            set.add((a + " " + val).trim().toLowerCase());
          }
        } else {
          set.add((val + " " + adj).trim().toLowerCase());
        }
      }
    }
  }

  // --- RECIPE 3: The "De" Construction (Universal Tail) ---
  const heads = getPool(['geo_major', 'settlement']);
  const tails = getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']);
  for (const headObj of heads) {
    for (const tailObj of tails) {
      const h = getRomData(headObj.es).val;
      const tData = getRomData(tailObj.es);
      let tVals = [tData.val];
      let tGenders = [tData.gender || 'm'];

      if (tData.val.endsWith('illo')) {
        tVals.push(tData.val.slice(0, -4) + 'illa');
        tGenders.push('f');
      }

      for (let i = 0; i < tVals.length; i++) {
        const t = tVals[i];
        const tGender = tGenders[i];
        const useArticle = !tailObj.tags?.includes('no_saint');
        const connectors = ['de'];
        if (useArticle) {
          if (tGender === 'f') connectors.push('de la');
          else connectors.push('del');
        }
        for (const connector of connectors) {
          set.add((h + " " + connector + " " + t).trim().toLowerCase());
        }
      }
    }
  }

  // --- RECIPE 4: Suffix Modification ---
  const roots = getPool(['bio_flora', 'geo_minor', 'settlement', 'geo_major']);
  const suffixes = getPool(['suffix']);
  for (const rootObj of roots) {
    for (const suffixObj of suffixes) {
      let base = getRomData(rootObj.es).val;
      let sVals = [getRomData(suffixObj.es).val];
      if (sVals[0] === 'illo') {
        sVals.push('illa');
      }

      for (const sVal of sVals) {
        let b = base;
        const baseEndsVowel = ['a','e','i','o','u'].includes(b.slice(-1).toLowerCase());
        const suffStartsVowel = ['a','e','i','o','u'].includes(sVal.charAt(0).toLowerCase());

        if (baseEndsVowel && suffStartsVowel) {
          b = b.slice(0, -1);
        } else if (sVal === 'ez' && baseEndsVowel) {
          b = b.slice(0, -1);
        }
        set.add((b + sVal).trim().toLowerCase());
      }
    }
  }

  return set.size;
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

    const baseEndsVowel = ['a','e','i','o','u','á','é','í','ó','ú','ü'].includes(base.slice(-1).toLowerCase());
    const suffStartsVowel = ['a','e','i','o','u','á','é','í','ó','ú','ü'].includes(sVal.charAt(0).toLowerCase());

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
import { GeneratedResult } from "../../../types";
import { getRandomElement } from "../../utils";
import { ROMANCE_DATA, getRomData } from "../../dictionaries/romanceDict";

const getPool = (types: string[]) => 
  ROMANCE_DATA.filter(c => c.it && types.includes(c.type));

export const getItalianCapacity = () => {
  const prefixes = getPool(['prefix']);
  const nouns = getPool(['geo_major', 'geo_minor', 'settlement']);
  const allAdjs = getPool(['adj_geo', 'adj_color', 'adj_quality']);
  const allTails = getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']);
  const suffixes = getPool(['suffix']);

  const c1 = prefixes.length * nouns.length;
  const c2 = nouns.length * allAdjs.length;
  const c3 = nouns.length * allTails.length;
  const c4 = nouns.length * suffixes.length;

  return c1 + c2 + c3 + c4;
}

export const generateItalianPlace = (): GeneratedResult => {
  let word = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();

  const formatAdj = (adj: string, gender: string) => {
      if (gender === 'f') {
          if (adj.endsWith('o')) return adj.slice(0, -1) + 'a';
          if (adj === 'Santo') return 'Santa';
          if (adj === 'Nuovo') return 'Nuova';
          if (adj === 'Vecchio') return 'Vecchia';
          if (adj === 'Bello') return 'Bella';
          if (adj === 'Buon') return 'Buona';
      }
      return adj;
  };

  // 1. San / Castel / Prefix Pattern
  if (roll < 0.25) {
      rule = "San / Castel / Prefix Pattern";
      if (Math.random() < 0.5) {
          // Saint
          const target = getRandomElement(getPool(['bio_fauna', 'abstract', 'bio_flora']));
          const tData = getRomData(target.it);
          
          let prefix = 'San';
          if (tData.gender === 'f') {
              prefix = 'Santa';
          } else {
              if (tData.val.startsWith('S') && !['a','e','i','o','u'].includes(tData.val.charAt(1))) prefix = 'Santo';
              else if (tData.val.startsWith('Z')) prefix = 'Santo';
              else prefix = 'San';
          }
          components.push(JSON.stringify({ val: prefix, type: 'prefix' }), JSON.stringify(target));
          word = `${prefix} ${tData.val}`;
      } else {
          // Common prefixes
          const prefixObj = getRandomElement(getPool(['prefix']));
          const rootObj = getRandomElement(getPool(['settlement', 'geo_major']));
          components.push(JSON.stringify(prefixObj), JSON.stringify(rootObj));
          
          let p = getRomData(prefixObj.it).val;
          let r = getRomData(rootObj.it).val;
          if (p === 'Ca\'' || p.length <= 3) word = `${p} ${r}`; 
          else word = `${p} ${r}`;
      }
  }
  
  // 2. Root + Adjective
  else if (roll < 0.55) {
    rule = "Root + Adjective";
    const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
    
    // EXPANSION: Universal Adjectives
    let adjTypes = ['adj_quality', 'adj_color'];
    if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
    const adjObj = getRandomElement(getPool(adjTypes));
    components.push(JSON.stringify(rootObj), JSON.stringify(adjObj));
    
    const rData = getRomData(rootObj.it);
    let r = rData.val;
    let gender = rData.gender || 'm';

    if (r.endsWith('ano') && Math.random() < 0.08) {
        r = r.slice(0, -3) + 'ana';
        gender = 'f';
    } else if (r.endsWith('ino') && Math.random() < 0.08) {
        r = r.slice(0, -3) + 'ina';
        gender = 'f';
    } else if (r.endsWith('ello') && Math.random() < 0.06) {
        r = r.slice(0, -4) + 'ella';
        gender = 'f';
    }
    
    let a = formatAdj(getRomData(adjObj.it).val, gender);
    
    if (adjObj.tags?.includes('pre')) {
        if (a === 'Bello') a = 'Bel';
        if (a === 'Grande') a = 'Gran';
        if (a === 'Santo') a = 'San';
        if (a === 'Buono') a = 'Buon';
        
        word = `${a} ${r}`;
    } else {
        word = `${r} ${a}`;
    }
  }
  
  // 3. Root + Suffix
  else if (roll < 0.75) {
    rule = "Root + Suffix";
    // EXPANSION: Allow suffixing Geo Major
    const rootObj = getRandomElement(getPool(['geo_minor', 'settlement', 'bio_flora', 'geo_major']));
    const suffixObj = getRandomElement(getPool(['suffix']));
    components.push(JSON.stringify(rootObj), JSON.stringify(suffixObj));
    
    let base = getRomData(rootObj.it).val;
    let sVal = getRomData(suffixObj.it).val;

    if (sVal === 'ano' && Math.random() < 0.08) {
        sVal = 'ana';
    } else if (sVal === 'ino' && Math.random() < 0.08) {
        sVal = 'ina';
    } else if (sVal === 'ello' && Math.random() < 0.06) {
        sVal = 'ella';
    }

    if (['a','e','i','o'].includes(base.slice(-1))) {
      base = base.slice(0, -1);
    }
    word = base + sVal;
  }
  
  // 4. "Di" Construction
  else {
    rule = "Di Construction";
    const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
    // EXPANSION: Universal Tails
    const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
    components.push(JSON.stringify(headObj), JSON.stringify(tailObj));
    
    let h = getRomData(headObj.it).val;
    const tData = getRomData(tailObj.it);
    let t = tData.val;
    let tGender = tData.gender || 'm';

    if (t.endsWith('ano') && Math.random() < 0.08) {
        t = t.slice(0, -3) + 'ana';
        tGender = 'f';
    } else if (t.endsWith('ino') && Math.random() < 0.08) {
        t = t.slice(0, -3) + 'ina';
        tGender = 'f';
    } else if (t.endsWith('ello') && Math.random() < 0.06) {
        t = t.slice(0, -4) + 'ella';
        tGender = 'f';
    }
    
    let connector = 'di';
    const useArticle = !['name'].includes(tailObj.type); 
    
    if (useArticle) {
        if (tGender === 'f') {
            connector = ['a','e','i','o','u'].includes(t.charAt(0).toLowerCase()) ? "dell'" : "della";
        } else {
            if (['z', 'gn', 'ps'].includes(t.slice(0,1).toLowerCase()) || (t.startsWith('s') && !['a','e','i','o','u'].includes(t.charAt(1)))) {
                connector = "dello";
            } else if (['a','e','i','o','u'].includes(t.charAt(0).toLowerCase())) {
                connector = "dell'";
            } else {
                connector = "del";
            }
        }
    }
    
    if (connector.endsWith("'")) {
        word = `${h} ${connector}${t}`;
    } else {
        word = `${h} ${connector} ${t}`;
    }
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  const ascii = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/'/g, "");
  return { word, ascii, generationRules: [rule], dictionaryComponents: components };
};
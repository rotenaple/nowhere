import { GeneratedResult } from "../../../types";
import { getRandomElement } from "../../utils";
import { ROMANCE_DATA, getRomData } from "../../dictionaries/romanceDict";

const getPool = (types: string[]) => 
  ROMANCE_DATA.filter(c => c.it && types.includes(c.type));

export const getItalianCapacity = () => {
  const set = new Set<string>();

  const getItAdj = (entry: any): { m: string, f: string } => {
    if (!entry) return { m: '', f: '' };
    const val = typeof entry === 'string' ? entry : entry[0];
    if (val.endsWith('o')) return { m: val, f: val.slice(0, -1) + 'a' };
    return { m: val, f: val };
  };

  // 1. Saint Prefix
  const prefixes = getPool(['prefix']);
  for (const prefixObj of prefixes) {
    const isSaintPrefix = ['San', 'Santa', 'Notre', 'Dame'].includes(prefixObj.def);
    const rootPool = isSaintPrefix 
      ? ROMANCE_DATA.filter(c => c.it && c.tags?.includes('saint_ok'))
      : getPool(['settlement', 'geo_major', 'bio_flora']);
    
    for (const rootObj of rootPool) {
      const rData = getRomData(rootObj.it);
      let rootVal = rData.val;
      const gender = rData.gender || 'm';

      let p = "";
      const prefixEntry = prefixObj.it;
      if (Array.isArray(prefixEntry) && prefixEntry.length === 2 && prefixEntry[1].length > 1) {
        p = (gender === 'f') ? prefixEntry[1] : prefixEntry[0];
      } else {
        p = getRomData(prefixEntry).val;
        if (gender === 'f') {
          if (p === 'Le') p = 'La';
          if (p === 'Saint') p = 'Santa';
          if (p === 'Beau') p = 'Bella';
          if (p === 'Vieux') p = 'Vecchia';
        } else {
          if (p === 'La') p = 'Il';
          if (p === 'Santa') p = 'San';
        }
      }

      const firstChar = rootVal.charAt(0).toUpperCase();
      let word = "";
      if (['A','E','I','O','U','Y'].includes(firstChar) && (p === 'Il' || p === 'La' || p === 'Santa')) {
        if (p === 'Santa' || p === 'La') p = "L'";
        else if (p === 'Il') p = "L'";
        word = `${p}${rootVal}`;
      } else {
        word = `${p} ${rootVal}`;
      }
      set.add(word.trim().toLowerCase());
    }
  }

  // 2. Root + Adjective
  const nouns = getPool(['geo_major', 'geo_minor', 'settlement']);
  for (const rootObj of nouns) {
    let adjTypes = ['adj_quality', 'adj_color'];
    if (['geo_major', 'geo_minor'].includes(rootObj.type)) adjTypes.push('adj_geo');
    const adjPool = getPool(adjTypes);
    for (const adjObj of adjPool) {
      const rData = getRomData(rootObj.it);
      const gender = rData.gender || 'm';
      const aData = getItAdj(adjObj.it);
      const a = (gender === 'f') ? aData.f : aData.m;
      
      let word = adjObj.tags?.includes('pre') ? `${a} ${rData.val}` : `${rData.val} ${a}`;
      set.add(word.trim().toLowerCase());
    }
  }

  // 3. Composite (di)
  const heads = getPool(['geo_major', 'settlement']);
  const tails = getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']);
  for (const headObj of heads) {
    for (const tailObj of tails) {
      const h = getRomData(headObj.it).val;
      const tData = getRomData(tailObj.it);
      const t = tData.val;
      const tGender = tData.gender || 'm';

      const useArticle = ['bio_fauna', 'bio_flora', 'geo_minor', 'geo_major', 'settlement'].includes(tailObj.type);
      let link = " di ";
      if (useArticle) {
        const startsWithVowel = ['A','E','I','O','U','Y'].includes(t.charAt(0).toUpperCase());
        if (startsWithVowel) {
          link = " dell'";
        } else if (tailObj.tags?.includes('plural')) {
          link = " dei ";
        } else if (tGender === 'f') {
          link = " della ";
        } else {
          link = " del ";
        }
      } else {
        const startsWithVowel = ['A','E','I','O','U','Y'].includes(t.charAt(0).toUpperCase());
        if (startsWithVowel) {
          link = " d'";
        }
      }
      set.add((h + link + t).trim().toLowerCase());
    }
  }

  // 4. Root + Suffix
  const roots = getPool(['settlement', 'bio_flora', 'geo_major']);
  const suffixes = getPool(['suffix']);
  for (const rootObj of roots) {
    for (const suffixObj of suffixes) {
      let base = getRomData(rootObj.it).val.toLowerCase();
      const sVal = getRomData(suffixObj.it).val;
      if (['a','e','i','o','u'].includes(base.slice(-1)) && ['a','e','i','o','u'].includes(sVal.charAt(0))) {
        base = base.slice(0, -1);
      }
      set.add((base + sVal).trim().toLowerCase());
    }
  }

  return set.size;
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
          const saintPool = ROMANCE_DATA.filter(c => c.it && c.tags?.includes('saint_ok'));
          const target = getRandomElement(saintPool);
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
import { GeneratedResult } from "../../../types";
import { getRandomElement, transliterateRomanianToAscii } from "../../utils";
import { ROMANCE_DATA, getRomData } from "../../dictionaries/romanceDict";

const getPool = (types: string[]) => 
  ROMANCE_DATA.filter(c => c.ro && types.includes(c.type));

export const getRomanianCapacity = () => {
  const nouns = getPool(['geo_major', 'geo_minor', 'settlement']);
  const allAdjs = getPool(['adj_geo', 'adj_color', 'adj_quality']);
  const allTails = getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']);
  const suffixes = getPool(['suffix']);

  const c1 = nouns.length * allAdjs.length; 
  const c2 = nouns.length * suffixes.length;
  const c3 = nouns.length * allTails.length; 
  
  return c1 + c2 + c3;
}

export const generateRomanianPlace = (): GeneratedResult => {
  let word = "";
  const roll = Math.random();
  
  // 1. Root + Adjective
  if (roll < 0.40) {
      const rootObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement']));
      
      // EXPANSION: Allow Color/Quality on Settlements too
      let adjTypes = ['adj_color', 'adj_quality'];
      if (['geo_major', 'geo_minor'].includes(rootObj.type)) {
          adjTypes.push('adj_geo');
      }
      const adjObj = getRandomElement(getPool(adjTypes));
      
      const rData = getRomData(rootObj.ro);
      let r = rData.val;
      let a = getRomData(adjObj.ro).val;
      
      const gender = rData.gender || 'n';

      if (gender === 'f') {
          if (a === 'Vechi') a = 'Veche'; // Fix for old
          else if (a.endsWith('u') && !a.endsWith('iu')) {
              if (a === 'Roșu') a = 'Roșie'; 
              else a = a.slice(0, -1) + 'ă'; 
          }
          else if (a.endsWith('iu')) {
              a = a.slice(0, -2) + 'ie';
          }
          else if (!a.endsWith('e') && !a.endsWith('ă')) {
              a += 'ă';
          }
      }
      
      word = `${r} ${a}`;
  }
  
  // 2. Root + Suffix
  else if (roll < 0.70) {
      // EXPANSION: Allow suffixing Geo Major
      const rootObj = getRandomElement(getPool(['settlement', 'geo_minor', 'bio_flora', 'geo_major']));
      const suffixObj = getRandomElement(getPool(['suffix']));
      
      let base = getRomData(rootObj.ro).val;
      const sVal = getRomData(suffixObj.ro).val;
      
      if (['a','ă','e','i','u'].includes(base.slice(-1))) {
          base = base.slice(0, -1);
      }
      
      word = base + sVal;
  }
  
  // 3. Composite (The X of Y)
  else {
      const headObj = getRandomElement(getPool(['geo_major', 'settlement']));
      // EXPANSION: Universal Tails
      const tailObj = getRandomElement(getPool(['geo_major', 'geo_minor', 'settlement', 'bio_fauna', 'bio_flora', 'abstract']));
      
      const hData = getRomData(headObj.ro);
      let head = hData.val;
      let tail = getRomData(tailObj.ro).val;
      
      // Definite Article Logic
      if (hData.gender === 'f') {
          if (head.endsWith('ă')) head = head.slice(0, -1) + 'a';
          else if (head.endsWith('ie')) head = head.slice(0, -1) + 'ia';
          else if (head.endsWith('e')) head += 'a'; 
          else if (!head.endsWith('a')) head += 'a';
      } else {
          if (head.endsWith('u') && !head.endsWith('iu')) head += 'l'; 
          else if (['e','i'].includes(head.slice(-1))) head += 'le'; 
          else head += 'ul'; 
      }
      
      if (Math.random() < 0.6) {
          word = `${head} de ${tail}`;
      } else {
          word = `${head} ${tail}`;
      }
  }

  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word: word, ascii: transliterateRomanianToAscii(word) };
};
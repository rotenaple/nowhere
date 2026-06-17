import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { 
  VN_HEADS, VN_ROOTS_SINO, VN_ROOTS_NATIVE, VN_ADJECTIVES, VN_NUMBERS, VN_DIRECTIONS, VnComponent 
} from "../dictionaries/vietnameseDict";

export const getVietnameseCapacity = () => {
  const heads = VN_HEADS.length;
  const tails = VN_ROOTS_NATIVE.length + VN_ROOTS_SINO.length + VN_ADJECTIVES.length;
  return heads * tails * 2; // Rough estimate including compounds
}

export const generateVietnamesePlace = (): GeneratedResult => {
  let word = "";
  let ascii = "";
  let rule = "";
  let components: string[] = [];
  const roll = Math.random();

  const getPool = (arr: VnComponent[], types: string[]) => 
    arr.filter(x => types.includes(x.type));

  // --- RECIPE 1: Sino-Vietnamese Compound (Provinces/Districts) ---
  // e.g. Bình Dương, Hải Phòng, Thanh Xuân
  if (roll < 0.40) {
    rule = "Sino-Vietnamese Compound";
    // R1: Abstract, Geo, Color
    const r1 = getRandomElement(getPool(VN_ROOTS_SINO, ['abstract', 'geo_head', 'color', 'quality']));
    // R2: Abstract, Nature, Geo
    const r2 = getRandomElement(getPool(VN_ROOTS_SINO, ['abstract', 'nature', 'geo_head']));
    
    if (r1.word === r2.word) return generateVietnamesePlace();

    word = `${r1.word} ${r2.word}`;
    ascii = `${r1.ascii} ${r2.ascii}`;
    components.push(JSON.stringify(r1), JSON.stringify(r2));
  }
  
  // --- RECIPE 2: Geographic Head + Descriptive Tail ---
  // e.g. Sông Hương (River Scent), Núi Bà Đen, Mũi Né
  else if (roll < 0.70) {
    rule = "Geographic Head + Descriptive Tail";
    const head = getRandomElement(VN_HEADS.filter(x => x.type === 'geo_head'));
    
    // Tail can be: Nature (Trees/Animals), Colors, Qualities (Big/Small)
    const tailPool = [
        ...getPool(VN_ROOTS_NATIVE, ['nature']),
        ...getPool(VN_ADJECTIVES, ['color', 'quality']),
        ...getPool(VN_ROOTS_SINO, ['nature', 'abstract']) // e.g. Sông Tiên (Fairy River)
    ];
    const tail = getRandomElement(tailPool);
    
    word = `${head.word} ${tail.word}`;
    ascii = `${head.ascii} ${tail.ascii}`;
    components.push(JSON.stringify(head), JSON.stringify(tail));
  }
  
  // --- RECIPE 3: Settlement + Specific Tail ---
  // e.g. Chợ Mới (New Market), Bến Tre (Bamboo Wharf)
  else if (roll < 0.90) {
    rule = "Settlement + Specific Tail";
    const head = getRandomElement(VN_HEADS.filter(x => x.type === 'settlement'));
    
    // Settlements match well with: Directions, Qualities (New/Old), Numbers, Nature (Products)
    const tailPool = [
        ...VN_DIRECTIONS,
        ...VN_NUMBERS,
        ...getPool(VN_ADJECTIVES, ['quality']),
        ...getPool(VN_ROOTS_NATIVE, ['nature']) // e.g. Market + Fish
    ];
    const tail = getRandomElement(tailPool);
    
    word = `${head.word} ${tail.word}`;
    ascii = `${head.ascii} ${tail.ascii}`;
    components.push(JSON.stringify(head), JSON.stringify(tail));
  }
  
  // --- RECIPE 4: 3-Word Descriptive (Rare) ---
  // e.g. Suối Tiên Xanh (Blue Fairy Stream)
  else {
    rule = "3-Word Descriptive";
    const head = getRandomElement(VN_HEADS.filter(x => x.type === 'geo_head'));
    const mid = getRandomElement(getPool(VN_ROOTS_NATIVE, ['nature']));
    const tail = getRandomElement(getPool(VN_ADJECTIVES, ['color', 'quality']));
    
    word = `${head.word} ${mid.word} ${tail.word}`;
    ascii = `${head.ascii} ${mid.ascii} ${tail.ascii}`;
    components.push(JSON.stringify(head), JSON.stringify(mid), JSON.stringify(tail));
  }

  return { word, ascii, generationRules: [rule], dictionaryComponents: components };
};
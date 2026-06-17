import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { 
  VN_HEADS, VN_ROOTS_SINO, VN_ROOTS_NATIVE, VN_ADJECTIVES, VN_NUMBERS, VN_DIRECTIONS, VnComponent 
} from "../dictionaries/vietnameseDict";

export const getVietnameseCapacity = () => {
  const set = new Set<string>();
  const getPool = (arr: any[], types: string[]) => arr.filter(x => types.includes(x.type));

  // Recipe 1: Sino-Vietnamese Compound
  const r1Pool = getPool(VN_ROOTS_SINO, ['abstract', 'geo_head', 'color', 'quality']);
  const r2Pool = getPool(VN_ROOTS_SINO, ['abstract', 'nature', 'geo_head']);
  for (const r1 of r1Pool) {
    for (const r2 of r2Pool) {
      if (r1.word === r2.word) continue;
      set.add(r1.word + " " + r2.word);
    }
  }

  // Recipe 2: Geographic Head + Descriptive Tail
  const heads2 = VN_HEADS.filter(x => x.type === 'geo_head');
  const tailPool2 = [
    ...getPool(VN_ROOTS_NATIVE, ['nature']),
    ...getPool(VN_ADJECTIVES, ['color', 'quality']),
    ...getPool(VN_ROOTS_SINO, ['nature', 'abstract'])
  ];
  for (const head of heads2) {
    for (const tail of tailPool2) {
      set.add(head.word + " " + tail.word);
    }
  }

  // Recipe 3: Settlement + Specific Tail
  const heads3 = VN_HEADS.filter(x => x.type === 'settlement');
  const tailPool3 = [
    ...VN_DIRECTIONS,
    ...VN_NUMBERS,
    ...getPool(VN_ADJECTIVES, ['quality']),
    ...getPool(VN_ROOTS_NATIVE, ['nature'])
  ];
  for (const head of heads3) {
    for (const tail of tailPool3) {
      set.add(head.word + " " + tail.word);
    }
  }

  // Recipe 4: 3-Word Descriptive
  const heads4 = VN_HEADS.filter(x => x.type === 'geo_head');
  const midPool4 = getPool(VN_ROOTS_NATIVE, ['nature']);
  const tailPool4 = getPool(VN_ADJECTIVES, ['color', 'quality']);
  for (const head of heads4) {
    for (const mid of midPool4) {
      for (const tail of tailPool4) {
        set.add(head.word + " " + mid.word + " " + tail.word);
      }
    }
  }

  return set.size;
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

import { GeneratedResult } from "../../types";
import { getRandomElement } from "../utils";
import { 
  VN_HEADS, VN_ROOTS_SINO, VN_ROOTS_NATIVE, VN_ADJECTIVES, VN_NUMBERS, VN_DIRECTIONS 
} from "../dictionaries/vietnameseDict";

export const getVietnameseCapacity = () => {
  // 1. Sino-Viet Compound (2 words)
  const c1 = VN_ROOTS_SINO.length * VN_ROOTS_SINO.length;
  // 2. Geographic Head + Native Root
  const c2 = VN_HEADS.length * VN_ROOTS_NATIVE.length;
  // 3. Native Root + Adjective
  const c3 = VN_ROOTS_NATIVE.length * VN_ADJECTIVES.length;
  // 4. Geographic Head + Sino Root
  const c4 = VN_HEADS.length * VN_ROOTS_SINO.length;
  
  return c1 + c2 + c3 + c4;
}

export const generateVietnamesePlace = (): GeneratedResult => {
  let word = "";
  let ascii = "";

  const type = Math.random();

  // Pattern 1: Sino-Vietnamese Compound (City/Province names)
  // e.g. Hà Nội, Hải Phòng, Thanh Hóa, Nghệ An, Đà Nẵng (Cham origin but looks Sino-ish in structure often)
  // Structure: [Sino Root] + [Sino Root]
  if (type < 0.40) {
    const r1 = getRandomElement(VN_ROOTS_SINO);
    const r2 = getRandomElement(VN_ROOTS_SINO);
    
    // Avoid repetition
    if (r1.word === r2.word) return generateVietnamesePlace();

    word = `${r1.word} ${r2.word}`;
    ascii = `${r1.ascii} ${r2.ascii}`;
  }
  
  // Pattern 2: Geographic Head + Proper Name (Sino or Native)
  // e.g. Sông Hồng, Núi Bà Đen, Mũi Né, Cù Lao Chàm
  else if (type < 0.70) {
    const head = getRandomElement(VN_HEADS);
    
    // 50% chance for Sino root, 50% for Native root/Adj
    const tailPool = Math.random() < 0.5 ? VN_ROOTS_SINO : [...VN_ROOTS_NATIVE, ...VN_ADJECTIVES];
    const tail = getRandomElement(tailPool);
    
    word = `${head.word} ${tail.word}`;
    ascii = `${head.ascii} ${tail.ascii}`;
  }
  
  // Pattern 3: Native Noun + Adjective/Direction/Number
  // e.g. Chợ Mới, Bến Tre, Gò Vấp (Vấp is tree), Làng Sen
  else if (type < 0.90) {
    const head = getRandomElement([...VN_HEADS, ...VN_ROOTS_NATIVE]);
    const modifier = getRandomElement([...VN_ADJECTIVES, ...VN_DIRECTIONS, ...VN_NUMBERS]);
    
    word = `${head.word} ${modifier.word}`;
    ascii = `${head.ascii} ${modifier.ascii}`;
  }
  
  // Pattern 4: 3-Word Compound (Rare but descriptive)
  // e.g. Bà Rịa, Phan Rang (Cham), or descriptive like "Suối Tiên Xanh"
  else {
    const head = getRandomElement(VN_HEADS);
    const mid = getRandomElement(VN_ROOTS_NATIVE);
    const tail = getRandomElement(VN_ADJECTIVES);
    
    word = `${head.word} ${mid.word} ${tail.word}`;
    ascii = `${head.ascii} ${mid.ascii} ${tail.ascii}`;
  }

  return { word, ascii };
};

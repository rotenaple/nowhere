
import { Language, PlaceName, GenerationParams, GeneratedResult } from "../types";
import { weightedRandom } from "./utils";
import { generateJapanesePlace, getJapaneseCapacity } from "./engines/japanese";
import { generateEnglishPlace, getEnglishCapacity } from "./engines/english";
import { generateGermanPlace, getGermanCapacity } from "./engines/german";
import { generateFrenchPlace, getFrenchCapacity } from "./engines/french";
import { generateSpanishPlace, getSpanishCapacity } from "./engines/spanish";
import { generateItalianPlace, getItalianCapacity } from "./engines/italian";
import { generateChinesePlace, getChineseCapacity } from "./engines/chinese";
import { generateKoreanPlace, getKoreanCapacity } from "./engines/korean";
import { generateSwedishPlace, getSwedishCapacity } from "./engines/swedish";
import { generateDanishPlace, getDanishCapacity } from "./engines/danish";
import { generateDutchPlace, getDutchCapacity } from "./engines/dutch";
import { generatePolishPlace, getPolishCapacity } from "./engines/polish";
import { generateIrishPlace, getIrishCapacity } from "./engines/irish";
import { generateCzechPlace, getCzechCapacity } from "./engines/czech";
import { generateRussianPlace, getRussianCapacity } from "./engines/russian";
import { generateUkrainianPlace, getUkrainianCapacity } from "./engines/ukrainian";
import { generateSlovakPlace, getSlovakCapacity } from "./engines/slovak";
import { generateBulgarianPlace, getBulgarianCapacity } from "./engines/bulgarian";
import { generatePortuguesePlace, getPortugueseCapacity } from "./engines/portuguese";
import { generateRomanianPlace, getRomanianCapacity } from "./engines/romanian";
import { generateIndonesianPlace, getIndonesianCapacity } from "./engines/indonesian";
import { generateTagalogPlace, getTagalogCapacity } from "./engines/tagalog";
import { generateArabicPlace, getArabicCapacity } from "./engines/arabic";
import { generateVietnamesePlace, getVietnameseCapacity } from "./engines/vietnamese";

export const getCapacity = (params: GenerationParams): string => {
  let val = 0;
  const lang = params.language;

  if (lang === Language.All) return "Infinite";
  
  if (lang === Language.English) {
      const cap = getEnglishCapacity(params.englishStyle);
      if (typeof cap === 'number') {
          return cap > 1000 ? (cap / 1000).toFixed(1) + "k" : cap.toString();
      }
      return cap.toString();
  }

  if (lang === Language.German) val = getGermanCapacity();
  else if (lang === Language.French) val = getFrenchCapacity();
  else if (lang === Language.Spanish) val = getSpanishCapacity();
  else if (lang === Language.Italian) val = getItalianCapacity();
  else if (lang === Language.Japanese) val = getJapaneseCapacity();
  else if (lang === Language.Chinese) {
      if (params.romanizationStyle === 'mixed') val = getChineseCapacity('cn') + getChineseCapacity('tw') + getChineseCapacity('hk');
      else val = getChineseCapacity(params.romanizationStyle);
  }
  else if (lang === Language.Korean) val = getKoreanCapacity();
  else if (lang === Language.Vietnamese) val = getVietnameseCapacity();
  else if (lang === Language.Swedish) val = getSwedishCapacity();
  else if (lang === Language.Danish) val = getDanishCapacity();
  else if (lang === Language.Dutch) val = getDutchCapacity();
  else if (lang === Language.Polish) val = getPolishCapacity();
  else if (lang === Language.Irish) val = getIrishCapacity();
  else if (lang === Language.Czech) val = getCzechCapacity();
  else if (lang === Language.Russian) val = getRussianCapacity();
  else if (lang === Language.Ukrainian) val = getUkrainianCapacity();
  else if (lang === Language.Slovak) val = getSlovakCapacity();
  else if (lang === Language.Bulgarian) val = getBulgarianCapacity();
  else if (lang === Language.Portuguese) val = getPortugueseCapacity();
  else if (lang === Language.Romanian) val = getRomanianCapacity();
  else if (lang === Language.Indonesian) val = getIndonesianCapacity('id');
  else if (lang === Language.Malay) val = getIndonesianCapacity('ms');
  else if (lang === Language.Tagalog) val = getTagalogCapacity();
  else if (lang === Language.Arabic) {
      if (params.arabicStyle === 'mixed') {
          // If mixed, we have access to the full 'standard' pool (which includes everything)
          val = getArabicCapacity('standard');
      } else {
          // Pass the specific style ('egyptian', 'gulf', etc.) to get filtered capacity
          val = getArabicCapacity(params.arabicStyle as any);
      }
  }  
  return val > 1000 ? (val / 1000).toFixed(1) + "k" : val.toString();
};

export const generateNonceWords = async (params: GenerationParams): Promise<PlaceName[]> => {
  await new Promise(resolve => setTimeout(resolve, 300)); 

  const results: PlaceName[] = [];
  const generatedKeys = new Set<string>();
  
  let attempts = 0;
  const maxAttempts = params.count * 20; 

  while (results.length < params.count && attempts < maxAttempts) {
    attempts++;
    let targetLang = params.language;
    let style = params.romanizationStyle;
    let arStyle = params.arabicStyle;
    let enStyle = params.englishStyle;
    
    // Handle Mixed/All selection using Dynamic Weights
    if (targetLang === Language.All) {
      const dynamicWeights = Object.entries(params.mixSettings).map(([lang, weight]) => ({
        val: lang,
        weight: weight
      }));
      targetLang = weightedRandom(dynamicWeights) as Language;
      
      // If language picked in mixed mode is Chinese/Arabic, enforce mixed sub-styles based on weights
      if (targetLang === Language.Chinese) {
        const mix = Object.entries(params.chineseMixSettings).map(([val, weight]) => ({val, weight}));
        style = weightedRandom(mix) as any;
      }
      if (targetLang === Language.Arabic) {
        const mix = Object.entries(params.arabicMixSettings).map(([val, weight]) => ({val, weight}));
        arStyle = weightedRandom(mix) as any;
      }
      if (targetLang === Language.English) {
        // For Global Mix, default English behavior is usually mixed (50/50) or pure random unless specified
        // Let's use the english mix settings too for consistency
        const mix = Object.entries(params.englishMixSettings).map(([val, weight]) => ({val, weight}));
        enStyle = weightedRandom(mix) as any;
      }
    } else {
        // Specific language selected, but style might be 'mixed'
        if (targetLang === Language.Chinese && style === 'mixed') {
            const mix = Object.entries(params.chineseMixSettings).map(([val, weight]) => ({val, weight}));
            style = weightedRandom(mix) as any;
        }
        if (targetLang === Language.Arabic && arStyle === 'mixed') {
            const mix = Object.entries(params.arabicMixSettings).map(([val, weight]) => ({val, weight}));
            arStyle = weightedRandom(mix) as any;
        }
        if (targetLang === Language.English && enStyle === 'mixed') {
            const mix = Object.entries(params.englishMixSettings).map(([val, weight]) => ({val, weight}));
            enStyle = weightedRandom(mix) as any;
        }
    }

    let generated: GeneratedResult;
    let displayLang = 'xx';

    switch (targetLang) {
      case Language.English: 
        if (enStyle === 'mixed') enStyle = 'modern'; // Fallback safely
        generated = generateEnglishPlace(enStyle); 
        displayLang = enStyle === 'old' ? 'en-ang' : 'en-phon';
        break;
      case Language.German: 
        generated = generateGermanPlace(); 
        displayLang = 'de';
        break;
      case Language.French: 
        generated = generateFrenchPlace(); 
        displayLang = 'fr';
        break;
      case Language.Spanish: 
        generated = generateSpanishPlace(); 
        displayLang = 'es';
        break;
      case Language.Italian: 
        generated = generateItalianPlace(); 
        displayLang = 'it';
        break;
      case Language.Japanese: 
        generated = generateJapanesePlace(); 
        displayLang = 'ja';
        break;
      case Language.Chinese: 
        // Ensure style is valid for generation function
        if (style === 'mixed') style = 'cn'; // Fallback safely if loop logic somehow failed
        generated = generateChinesePlace(style as 'cn' | 'tw' | 'hk');
        if (style === 'hk') displayLang = 'zh-HK';
        else if (style === 'tw') displayLang = 'zh-TW';
        else displayLang = 'zh-CN';
        break;
      case Language.Korean: 
        generated = generateKoreanPlace(); 
        displayLang = 'ko';
        break;
      case Language.Vietnamese:
        generated = generateVietnamesePlace();
        displayLang = 'vi';
        break;
      case Language.Swedish:
        generated = generateSwedishPlace();
        displayLang = 'sv';
        break;
      case Language.Danish:
        generated = generateDanishPlace();
        displayLang = 'da';
        break;
      case Language.Dutch:
        generated = generateDutchPlace();
        displayLang = 'nl';
        break;
      case Language.Polish:
        generated = generatePolishPlace();
        displayLang = 'pl';
        break;
      case Language.Irish:
        generated = generateIrishPlace();
        displayLang = 'ga';
        break;
      case Language.Czech:
        generated = generateCzechPlace();
        displayLang = 'cs';
        break;
      case Language.Russian:
        generated = generateRussianPlace();
        displayLang = 'ru';
        break;
      case Language.Ukrainian:
        generated = generateUkrainianPlace();
        displayLang = 'uk';
        break;
      case Language.Slovak:
        generated = generateSlovakPlace();
        displayLang = 'sk';
        break;
      case Language.Bulgarian:
        generated = generateBulgarianPlace();
        displayLang = 'bg';
        break;
      case Language.Portuguese:
        generated = generatePortuguesePlace();
        displayLang = 'pt';
        break;
      case Language.Romanian:
        generated = generateRomanianPlace();
        displayLang = 'ro';
        break;
      case Language.Indonesian:
        generated = generateIndonesianPlace('id');
        displayLang = 'id';
        break;
      case Language.Malay:
        generated = generateIndonesianPlace('ms');
        displayLang = 'ms';
        break;
      case Language.Tagalog:
        generated = generateTagalogPlace();
        displayLang = 'tl';
        break;
      case Language.Arabic:
        if (arStyle === 'mixed') arStyle = 'standard'; // Fallback safely
        generated = generateArabicPlace(arStyle as any);
        if (arStyle === 'egyptian') displayLang = 'ar-EG';
        else if (arStyle === 'levantine') displayLang = 'ar-LB';
        else if (arStyle === 'gulf') displayLang = 'ar-AE';
        else if (arStyle === 'maghrebi') displayLang = 'ar-MA';
        else displayLang = 'ar-SA';
        break;
      default: 
        generated = { word: "Error", ascii: "Error" };
        displayLang = 'err';
    }

    const len = generated.ascii.length;
    if (len < params.minLength || len > params.maxLength) {
      continue;
    }
    
    const key = generated.word + ":" + targetLang;
    if (generatedKeys.has(key)) {
      continue;
    }
    generatedKeys.add(key);

    results.push({
      ...generated,
      language: displayLang
    });
  }
  return results;
};
// ==========================================
// TYPES & DATA HELPERS
// ==========================================

export type ScriptedValue = readonly [string] | readonly [string, string];

// Extended type to support Gender AND Number (Singular/Plural)
// Format: [Value] OR [Value, Gender] OR [Value, Gender, Number]
export type SlavicEntry = 
  | ScriptedValue 
  | readonly [ScriptedValue, 'm' | 'f' | 'n']
  | readonly [ScriptedValue, 'm' | 'f' | 'n', 'sg' | 'pl'];

/**
 * Parses a dictionary entry to extract Source, Romanization, Gender, and Number.
 */
export const getSlavicData = (entry: SlavicEntry | undefined): { 
  src: string, 
  rom?: string, 
  gender?: 'm' | 'f' | 'n', 
  number: 'sg' | 'pl' 
} => {
  if (!entry) return { src: '', number: 'sg' };

  let scriptVal: ScriptedValue;
  let genderValue: 'm' | 'f' | 'n' | undefined;
  let numberValue: 'sg' | 'pl' = 'sg'; // Default to Singular

  // Check if it is a Tuple with Metadata (Gender/Number)
  // We check if the second element is a gender string 'm'|'f'|'n'
  if (Array.isArray(entry) && entry.length >= 2 && typeof entry[1] === 'string' && ['m','f','n'].includes(entry[1])) {
    scriptVal = entry[0] as ScriptedValue;
    genderValue = entry[1] as 'm' | 'f' | 'n';
    
    // Check for explicit Number (3rd element)
    if (entry.length === 3) {
      numberValue = entry[2] as 'sg' | 'pl';
    }
  } else {
    // It is just a ScriptedValue (e.g. ['Word'] or ['Word', 'Translit'])
    scriptVal = entry as ScriptedValue;
  }

  const srcValue = scriptVal[0];
  const romValue = scriptVal.length > 1 ? scriptVal[1] : undefined;

  return { src: srcValue, rom: romValue, gender: genderValue, number: numberValue };
};


// ==========================================
// DICTIONARY DATA
// ==========================================

export interface SlavicComponent {
  id: string;
  type: 'adjective' | 'root' | 'suffix' | 'river' | 'river_loc' | 'country_suffix' | 'stem';
  pl?: SlavicEntry;
  cs?: SlavicEntry;
  sk?: SlavicEntry;
  bg?: SlavicEntry;
  ru?: SlavicEntry;
  uk?: SlavicEntry;
  tags?: string[];
}

export const SLAVIC_DATA: SlavicComponent[] = [
  // ========================== ADJECTIVES ==========================
  // Adjectives are stored in their base Nominative Singular Masculine form.
  { id: 'New', type: 'adjective', pl: ['Nowy'], cs: ['Nový'], sk: ['Nový'], bg: ['Нов', 'Nov'], ru: ['Новый', 'Noviy'], uk: ['Новий', 'Novyy'] },
  { id: 'Old', type: 'adjective', pl: ['Stary'], cs: ['Starý'], sk: ['Starý'], bg: ['Стар', 'Star'], ru: ['Старый', 'Stariy'], uk: ['Старий', 'Staryy'] },
  { id: 'Great', type: 'adjective', pl: ['Wielki'], cs: ['Velký'], sk: ['Veľký'], bg: ['Голям', 'Golyam'], ru: ['Великий', 'Velikiy'], uk: ['Великий', 'Velykyy'] },
  { id: 'Small', type: 'adjective', pl: ['Mały'], cs: ['Malý'], sk: ['Malý'], bg: ['Малък', 'Malak'], ru: ['Малый', 'Maliy'], uk: ['Малий', 'Malyy'] },
  { id: 'High', type: 'adjective', pl: ['Wysoki'], cs: ['Vysoký'], sk: ['Vysoký'], bg: ['Висок', 'Visok'], ru: ['Высокий', 'Vysokiy'], uk: ['Високий', 'Vysokyy'] },
  { id: 'Low', type: 'adjective', pl: ['Niski'], cs: ['Nízký'], sk: ['Nízky'], bg: ['Нисък', 'Nizak'], ru: ['Низкий', 'Nizkiy'], uk: ['Низький', 'Nyzkyy'] },
  
  // Directions
  { id: 'North', type: 'adjective', pl: ['Północny'], cs: ['Severní'], sk: ['Severný'], bg: ['Северен', 'Severen'], ru: ['Северный', 'Severniy'], uk: ['Північний', 'Pivnichnyy'] },
  { id: 'South', type: 'adjective', pl: ['Południowy'], cs: ['Jižní'], sk: ['Južný'], bg: ['Южен', 'Yuzhen'], ru: ['Южный', 'Yuzhniy'], uk: ['Південний', 'Pivdennyy'] },
  { id: 'East', type: 'adjective', pl: ['Wschodni'], cs: ['Východní'], sk: ['Východný'], bg: ['Източ', 'Iztoch'], ru: ['Восточный', 'Vostochniy'], uk: ['Східний', 'Skhidnyy'] },
  { id: 'West', type: 'adjective', pl: ['Zachodni'], cs: ['Západní'], sk: ['Západný'], bg: ['Западен', 'Zapaden'], ru: ['Западный', 'Zapadniy'], uk: ['Західний', 'Zakhidnyy'] },

  // Colors
  { id: 'Black', type: 'adjective', pl: ['Czarny'], cs: ['Černý'], sk: ['Čierny'], bg: ['Черен', 'Cheren'], ru: ['Черный', 'Chorniy'], uk: ['Чорний', 'Chornyy'] },
  { id: 'White', type: 'adjective', pl: ['Biały'], cs: ['Bílý'], sk: ['Biely'], bg: ['Бял', 'Byal'], ru: ['Белый', 'Beliy'], uk: ['Білий', 'Bilyy'] },
  { id: 'Red', type: 'adjective', pl: ['Czerwony'], cs: ['Červený'], sk: ['Červený'], bg: ['Червен', 'Cherven'], ru: ['Красный', 'Krasniy'], uk: ['Червоний', 'Chervonyy'] },
  { id: 'Green', type: 'adjective', pl: ['Zielony'], cs: ['Zelený'], sk: ['Zelený'], bg: ['Зелен', 'Zelen'], ru: ['Зеленый', 'Zeleniy'], uk: ['Зелений', 'Zelenyy'] },
  { id: 'Blue', type: 'adjective', pl: ['Niebieski'], cs: ['Modrý'], sk: ['Modrý'], bg: ['Син', 'Sin'], ru: ['Синий', 'Siniy'], uk: ['Синій', 'Syniy'] },
  { id: 'Gold', type: 'adjective', pl: ['Złoty'], cs: ['Zlatý'], sk: ['Zlatý'], bg: ['Златен', 'Zlaten'], ru: ['Золотой', 'Zolotoy'], uk: ['Золотий', 'Zolotyy'] },
  { id: 'Silver', type: 'adjective', pl: ['Srebrny'], cs: ['Stříbrný'], sk: ['Strieborný'], bg: ['Сребърен', 'Srebaren'], ru: ['Серебряный', 'Serebryaniy'], uk: ['Срібний', 'Sribnyy'] },

  // Qualities
  { id: 'Beautiful', type: 'adjective', pl: ['Piękny'], cs: ['Krásný'], sk: ['Krásny'], bg: ['Красив', 'Krasiv'], ru: ['Красивый', 'Krasiviy'], uk: ['Красивий', 'Krasyvyy'] },
  { id: 'Holy', type: 'adjective', pl: ['Święty'], cs: ['Svatý'], sk: ['Svätý'], bg: ['Свети', 'Sveti'], ru: ['Святой', 'Svyatoy'], uk: ['Святий', 'Svyatyy'] },
  { id: 'Royal', type: 'adjective', pl: ['Królewski'], cs: ['Královský'], sk: ['Kráľovský'], bg: ['Царски', 'Tsarski'], ru: ['Царский', 'Tsarskiy'], uk: ['Королівський', 'Korolivskyy'] },
  { id: 'Lower', type: 'adjective', pl: ['Dolny'], cs: ['Dolní'], sk: ['Dolný'], bg: ['Долен', 'Dolen'], ru: ['Нижний', 'Nizhniy'], uk: ['Нижній', 'Nyzhniy'] },
  { id: 'Upper', type: 'adjective', pl: ['Górny'], cs: ['Horní'], sk: ['Horný'], bg: ['Горен', 'Goren'], ru: ['Верхний', 'Verkhniy'], uk: ['Верхній', 'Verkhniy'] },
  { id: 'Long', type: 'adjective', pl: ['Długi'], cs: ['Dlouhý'], sk: ['Dlhý'], bg: ['Дълг', 'Dalg'], ru: ['Долгий', 'Dolgiy'], uk: ['Довгий', 'Dovhyy'] },
  { id: 'Short', type: 'adjective', pl: ['Krótki'], cs: ['Krátký'], sk: ['Krátky'], bg: ['Кратък', 'Kratak'], ru: ['Короткий', 'Korotkiy'], uk: ['Короткий', 'Korotkyy'] },
  { id: 'Wet', type: 'adjective', pl: ['Mokry'], cs: ['Mokrý'], sk: ['Mokrý'], bg: ['Мокър', 'Mokar'], ru: ['Мокрый', 'Mokriy'], uk: ['Мокрий', 'Mokryy'] },
  { id: 'Dry', type: 'adjective', pl: ['Suchy'], cs: ['Suchý'], sk: ['Suchý'], bg: ['Сух', 'Suh'], ru: ['Сухой', 'Sukhoy'], uk: ['Сухий', 'Sukhyy'] },
  { id: 'StoneAdj', type: 'adjective', pl: ['Kamienny'], cs: ['Kamenný'], sk: ['Kamenný'], bg: ['Каменен', 'Kamenen'], ru: ['Каменный', 'Kamenniy'], uk: ['Кам\'яний', 'Kamyanyy'] },
  { id: 'Broad', type: 'adjective', pl: ['Szeroki'], cs: ['Široký'], sk: ['Široký'], bg: ['Широк', 'Shirok'], ru: ['Широкий', 'Shirokiy'], uk: ['Широкий', 'Shyrokyy'] },
  { id: 'Deep', type: 'adjective', pl: ['Głęboki'], cs: ['Hluboký'], sk: ['Hlboký'], bg: ['Дълбок', 'Dalbok'], ru: ['Глубокий', 'Glubokiy'], uk: ['Глибокий', 'Hlybokyy'] },
  { id: 'Cold', type: 'adjective', pl: ['Zimny'], cs: ['Studený'], sk: ['Studený'], bg: ['Студен', 'Studen'], ru: ['Холодный', 'Kholodniy'], uk: ['Холодний', 'Kholodnyy'] },
  { id: 'Warm', type: 'adjective', pl: ['Ciepły'], cs: ['Teplý'], sk: ['Teplý'], bg: ['Топъл', 'Topal'], ru: ['Теплый', 'Tepliy'], uk: ['Теплий', 'Teplyy'] },
  { id: 'Clear', type: 'adjective', pl: ['Jasny'], cs: ['Jasný'], sk: ['Jasný'], bg: ['Ясен', 'Yasen'], ru: ['Ясный', 'Yasniy'], uk: ['Ясний', 'Yasnyy'] },
  { id: 'Sunny', type: 'adjective', pl: ['Słoneczny'], cs: ['Slunečný'], sk: ['Slnečný'], bg: ['Слънчев', 'Slanchev'], ru: ['Солнечный', 'Solnechniy'], uk: ['Сонячний', 'Sonyachnyy'] },
  { id: 'Windy', type: 'adjective', pl: ['Wietrzny'], cs: ['Větrný'], sk: ['Veterný'], bg: ['Ветровит', 'Vetrovit'], ru: ['Ветреный', 'Vetreniy'], uk: ['Вітряний', 'Vitryanyy'] },
  { id: 'Quiet', type: 'adjective', pl: ['Cichy'], cs: ['Tichý'], sk: ['Tichý'], bg: ['Тих', 'Tih'], ru: ['Тихий', 'Tikhiy'], uk: ['Тихий', 'Tykhyy'] },
  { id: 'Loud', type: 'adjective', pl: ['Głośny'], cs: ['Hlasitý'], sk: ['Hlasný'], bg: ['Шумен', 'Shumen'], ru: ['Громкий', 'Gromkiy'], uk: ['Гучний', 'Huchnyy'] },
  { id: 'IronAdj', type: 'adjective', pl: ['Żelazny'], cs: ['Železný'], sk: ['Železný'], bg: ['Железен', 'Zhelezen'], ru: ['Железный', 'Zhelezniy'], uk: ['Залізний', 'Zhaliznyy'] },
  { id: 'Wild', type: 'adjective', pl: ['Dziki'], cs: ['Divoký'], sk: ['Divoký'], bg: ['Див', 'Div'], ru: ['Дикий', 'Dikiy'], uk: ['Дикий', 'Dykyy'] },
  { id: 'Dark', type: 'adjective', pl: ['Ciemny'], cs: ['Temný'], sk: ['Temný'], bg: ['Тъмен', 'Tamen'], ru: ['Темный', 'Temniy'], uk: ['Темний', 'Temnyy'] },
  { id: 'Sharp', type: 'adjective', pl: ['Ostry'], cs: ['Ostrý'], sk: ['Ostrý'], bg: ['Остър', 'Ostar'], ru: ['Острый', 'Ostriy'], uk: ['Гострий', 'Hostryy'] },
  { id: 'Round', type: 'adjective', pl: ['Okrągły'], cs: ['Kulatý'], sk: ['Okrúhly'], bg: ['Кръгъл', 'Kragal'], ru: ['Круглый', 'Krugliy'], uk: ['Круглий', 'Kruhlyy'] },
  { id: 'Flat', type: 'adjective', pl: ['Płaski'], cs: ['Plochý'], sk: ['Plochý'], bg: ['Плосък', 'Plosak'], ru: ['Плоский', 'Ploskiy'], uk: ['Плоский', 'Ploskyy'] },
  { id: 'Rich', type: 'adjective', pl: ['Bogaty'], cs: ['Bohatý'], sk: ['Bohatý'], bg: ['Богат', 'Bogat'], ru: ['Богатый', 'Bogatiy'], uk: ['Багатий', 'Bahatyy'] },
  { id: 'Poor', type: 'adjective', pl: ['Biedny'], cs: ['Chudý'], sk: ['Chudobný'], bg: ['Беден', 'Beden'], ru: ['Бедный', 'Bedniy'], uk: ['Бідний', 'Bidnyy'] },
  { id: 'Empty', type: 'adjective', pl: ['Pusty'], cs: ['Prázdný'], sk: ['Prázdny'], bg: ['Пуст', 'Pust'], ru: ['Пустой', 'Pustoy'], uk: ['Пустий', 'Pustyy'] },
  { id: 'Full', type: 'adjective', pl: ['Pełny'], cs: ['Plný'], sk: ['Plný'], bg: ['Пълен', 'Palen'], ru: ['Полный', 'Polniy'], uk: ['Повний', 'Povnyy'] },
  { id: 'Sweet', type: 'adjective', pl: ['Słodki'], cs: ['Sladký'], sk: ['Sladký'], bg: ['Сладък', 'Sladak'], ru: ['Сладкий', 'Sladkiy'], uk: ['Солодкий', 'Solodkyy'] },
  { id: 'Glorious', type: 'adjective', pl: ['Sławny'], cs: ['Slavný'], sk: ['Slávny'], bg: ['Славен', 'Slaven'], ru: ['Славный', 'Slavniy'], uk: ['Славний', 'Slavnyy'] },
  { id: 'GoodNice', type: 'adjective', pl: ['Dobry'], cs: ['Dobrý'], sk: ['Dobrý'], bg: ['Добър', 'Dobar'], ru: ['Добрый', 'Dobriy'], uk: ['Добрий', 'Dobriy'] },
  
  // ========================== ROOTS (Nouns/Stems) ==========================
  // Note: Default number is 'sg' unless specified otherwise.
  
  // Civic / Settlements
  { id: 'Town', type: 'root', tags: ['civic'], pl: [['Miasto'], 'n'], cs: [['Město'], 'n'], sk: [['Mesto'], 'n'], bg: [['Град', 'Grad'], 'm'], ru: [['Город', 'Gorod'], 'm'], uk: [['Місто', 'Misto'], 'n'] },
  { id: 'Castle', type: 'root', tags: ['civic'], pl: [['Gród'], 'm'], cs: [['Hrad'], 'm'], sk: [['Hrad'], 'm'], bg: [['Крепост', 'Krepost'], 'f'], ru: [['Град', 'Grad'], 'm'], uk: [['Город', 'Horod'], 'm'] },
  { id: 'Fort', type: 'root', tags: ['civic'], pl: [['Twierdza'], 'f'], cs: [['Tvrz'], 'f'], sk: [['Pevnosť'], 'f'], bg: [['Твърдина', 'Tvardina'], 'f'], ru: [['Крепость', 'Krepost'], 'f'], uk: [['Фортеця', 'Fortetsya'], 'f'] },
  { id: 'Market', type: 'root', tags: ['civic'], pl: [['Targ'], 'm'], cs: [['Trh'], 'm'], sk: [['Trh'], 'm'], bg: [['Пазар', 'Pazar'], 'm'], ru: [['Рынок', 'Rynok'], 'm'], uk: [['Ринок', 'Rynok'], 'm'] },
  { id: 'Village', type: 'root', tags: ['civic'], pl: [['Wieś'], 'f'], cs: [['Ves'], 'f'], sk: [['Ves'], 'f'], bg: [['Село', 'Selo'], 'n'], ru: [['Село', 'Selo'], 'n'], uk: [['Село', 'Selo'], 'n'] },
  { id: 'Court', type: 'root', tags: ['civic'], pl: [['Dwór'], 'm'], cs: [['Dvůr'], 'm'], sk: [['Dvor'], 'm'], bg: [['Двор', 'Dvor'], 'm'], ru: [['Двор', 'Dvor'], 'm'], uk: [['Двір', 'Dvir'], 'm'] },
  { id: 'Church', type: 'root', tags: ['civic'], pl: [['Kościół'], 'm'], cs: [['Kostel'], 'm'], sk: [['Kostol'], 'm'], bg: [['Църква', 'Tsarkva'], 'f'], ru: [['Церковь', 'Tserkov'], 'f'], uk: [['Церква', 'Tserkva'], 'f'] },
  { id: 'Bridge', type: 'root', tags: ['civic'], pl: [['Most'], 'm'], cs: [['Most'], 'm'], sk: [['Most'], 'm'], bg: [['Мост', 'Most'], 'm'], ru: [['Мост', 'Most'], 'm'], uk: [['Міст', 'Mist'], 'm'] },
  { id: 'Port', type: 'root', tags: ['civic'], pl: [['Port'], 'm'], cs: [['Přístav'], 'm'], sk: [['Prístav'], 'm'], bg: [['Пристанище', 'Pristanishte'], 'n'], ru: [['Порт', 'Port'], 'm'], uk: [['Порт', 'Port'], 'm'] },
  { id: 'Mine', type: 'root', tags: ['civic'], pl: [['Kopalnia'], 'f'], cs: [['Důl'], 'm'], sk: [['Baňa'], 'f'], bg: [['Мина', 'Mina'], 'f'], ru: [['Шахта', 'Shakhta'], 'f'], uk: [['Шахта', 'Shakhta'], 'f'] },
  { id: 'Mill', type: 'root', tags: ['civic'], pl: [['Młyn'], 'm'], cs: [['Mlýn'], 'm'], sk: [['Mlyn'], 'm'], bg: [['Воденица', 'Vodenitsa'], 'f'], ru: [['Мельница', 'Melnitsa'], 'f'], uk: [['Млин', 'Mlyn'], 'm'] },
  { id: 'House', type: 'root', tags: ['civic'], pl: [['Dom'], 'm'], cs: [['Dům'], 'm'], sk: [['Dom'], 'm'], bg: [['Дом', 'Dom'], 'm'], ru: [['Дом', 'Dom'], 'm'], uk: [['Дім', 'Dim'], 'm'] },
  { id: 'Tower', type: 'root', tags: ['civic'], pl: [['Wieża'], 'f'], cs: [['Věž'], 'f'], sk: [['Veža'], 'f'], bg: [['Кула', 'Kula'], 'f'], ru: [['Башня', 'Bashnya'], 'f'], uk: [['Вежа', 'Vezha'], 'f'] },
  { id: 'Gate', type: 'root', tags: ['civic'], pl: [['Brama'], 'f'], cs: [['Brána'], 'f'], sk: [['Brána'], 'f'], bg: [['Порта', 'Porta'], 'f'], ru: [['Ворота', 'Vorota'], 'n'], uk: [['Ворота', 'Vorota'], 'n'] },
  { id: 'Road', type: 'root', tags: ['civic'], pl: [['Droga'], 'f'], cs: [['Cesta'], 'f'], sk: [['Cesta'], 'f'], bg: [['Път', 'Pat'], 'm'], ru: [['Дорога', 'Doroga'], 'f'], uk: [['Дорога', 'Doroha'], 'f'] },
  { id: 'Way', type: 'root', tags: ['civic'], pl: [['Szlak'], 'm'], cs: [['Stezka'], 'f'], sk: [['Chodník'], 'm'], bg: [['Пътека', 'Pateka'], 'f'], ru: [['Путь', 'Put'], 'm'], uk: [['Шлях', 'Shlyakh'], 'm'] },
  { id: 'Wall', type: 'root', tags: ['civic'], pl: [['Mur'], 'm'], cs: [['Zeď'], 'f'], sk: [['Múr'], 'm'], bg: [['Стена', 'Stena'], 'f'], ru: [['Стена', 'Stena'], 'f'], uk: [['Стіна', 'Stina'], 'f'] },
  { id: 'Square', type: 'root', tags: ['civic'], pl: [['Plac'], 'm'], cs: [['Náměstí'], 'n'], sk: [['Námestie'], 'n'], bg: [['Площад', 'Ploshtad'], 'm'], ru: [['Площадь', 'Ploshchad'], 'f'], uk: [['Площа', 'Ploshcha'], 'f'] },
  { id: 'Garden', type: 'root', tags: ['civic'], pl: [['Ogród'], 'm'], cs: [['Zahrada'], 'f'], sk: [['Záhrada'], 'f'], bg: [['Градина', 'Gradina'], 'f'], ru: [['Сад', 'Sad'], 'm'], uk: [['Сад', 'Sad'], 'm'] },
  
  // Nature / Terrain
  { id: 'Mountain', type: 'root', tags: ['nature'], pl: [['Góra'], 'f'], cs: [['Hora'], 'f'], sk: [['Hora'], 'f'], bg: [['Планина', 'Planina'], 'f'], ru: [['Гора', 'Gora'], 'f'], uk: [['Гора', 'Hora'], 'f'] },
  { id: 'Hill', type: 'root', tags: ['nature'], pl: [['Wzgórze'], 'n'], cs: [['Chlum'], 'm'], sk: [['Kopec'], 'm'], bg: [['Хълм', 'Halm'], 'm'], ru: [['Холм', 'Kholm'], 'm'], uk: [['Пагорб', 'Pahorb'], 'm'] },
  { id: 'RiverNoun', type: 'root', tags: ['nature'], pl: [['Rzeka'], 'f'], cs: [['Řeka'], 'f'], sk: [['Rieka'], 'f'], bg: [['Река', 'Reka'], 'f'], ru: [['Река', 'Reka'], 'f'], uk: [['Ріка', 'Rika'], 'f'] },
  { id: 'Stream', type: 'root', tags: ['nature'], pl: [['Potok'], 'm'], cs: [['Potok'], 'm'], sk: [['Potok'], 'm'], bg: [['Поток', 'Potok'], 'm'], ru: [['Поток', 'Potok'], 'm'], uk: [['Потік', 'Potik'], 'm'] },
  { id: 'Forest', type: 'root', tags: ['nature'], pl: [['Las'], 'm'], cs: [['Les'], 'm'], sk: [['Les'], 'm'], bg: [['Гора', 'Gora'], 'f'], ru: [['Лес', 'Les'], 'm'], uk: [['Ліс', 'Lis'], 'm'] },
  { id: 'Field', type: 'root', tags: ['nature'], pl: [['Pole'], 'n'], cs: [['Pole'], 'n'], sk: [['Pole'], 'n'], bg: [['Поле', 'Pole'], 'n'], ru: [['Поле', 'Pole'], 'n'], uk: [['Поле', 'Pole'], 'n'] },
  { id: 'Meadow', type: 'root', tags: ['nature'], pl: [['Łąka'], 'f'], cs: [['Louka'], 'f'], sk: [['Lúka'], 'f'], bg: [['Ливада', 'Livada'], 'f'], ru: [['Луг', 'Lug'], 'm'], uk: [['Лука', 'Luka'], 'f'] },
  { id: 'Rock', type: 'root', tags: ['nature'], pl: [['Skała'], 'f'], cs: [['Skála'], 'f'], sk: [['Skala'], 'f'], bg: [['Скала', 'Skala'], 'f'], ru: [['Скала', 'Skala'], 'f'], uk: [['Скеля', 'Skelya'], 'f'] },
  { id: 'StoneRoot', type: 'root', tags: ['nature'], pl: [['Kamień'], 'm'], cs: [['Kámen'], 'm'], sk: [['Kameň'], 'm'], bg: [['Камък', 'Kamak'], 'm'], ru: [['Камень', 'Kamen'], 'm'], uk: [['Камінь', 'Kamin'], 'm'] },
  { id: 'Water', type: 'root', tags: ['nature'], pl: [['Woda'], 'f'], cs: [['Voda'], 'f'], sk: [['Voda'], 'f'], bg: [['Вода', 'Voda'], 'f'], ru: [['Вода', 'Voda'], 'f'], uk: [['Вода', 'Voda'], 'f'] },
  { id: 'Spring', type: 'root', tags: ['nature'], pl: [['Zdrój'], 'm'], cs: [['Studánka'], 'f'], sk: [['Prameň'], 'm'], bg: [['Извор', 'Izvor'], 'm'], ru: [['Ключ', 'Klyuch'], 'm'], uk: [['Джерело', 'Dzherelo'], 'n'] },
  { id: 'Valley', type: 'root', tags: ['nature'], pl: [['Dolina'], 'f'], cs: [['Údolí'], 'n'], sk: [['Dolina'], 'f'], bg: [['Долина', 'Dolina'], 'f'], ru: [['Долина', 'Dolina'], 'f'], uk: [['Долина', 'Dolyna'], 'f'] },
  { id: 'Lake', type: 'root', tags: ['nature'], pl: [['Jezioro'], 'n'], cs: [['Jezero'], 'n'], sk: [['Jazero'], 'n'], bg: [['Езеро', 'Ezero'], 'n'], ru: [['Озеро', 'Ozero'], 'n'], uk: [['Озеро', 'Ozero'], 'n'] },
  { id: 'Island', type: 'root', tags: ['nature'], pl: [['Wyspa'], 'f'], cs: [['Ostrov'], 'm'], sk: [['Ostrov'], 'm'], bg: [['Остров', 'Ostrov'], 'm'], ru: [['Остров', 'Ostrov'], 'm'], uk: [['Острів', 'Ostriv'], 'm'] },
  { id: 'Ford', type: 'root', tags: ['nature'], pl: [['Bród'], 'm'], cs: [['Brod'], 'm'], sk: [['Brod'], 'm'], bg: [['Брод', 'Brod'], 'm'], ru: [['Брод', 'Brod'], 'm'], uk: [['Брід', 'Brid'], 'm'] },
  { id: 'Bay', type: 'root', tags: ['nature'], pl: [['Zatoka'], 'f'], cs: [['Záliv'], 'm'], sk: [['Záliv'], 'm'], bg: [['Залив', 'Zaliv'], 'm'], ru: [['Залив', 'Zaliv'], 'm'], uk: [['Заток', 'Zatok'], 'm'] },
  { id: 'Cape', type: 'root', tags: ['nature'], pl: [['Przylądek'], 'm'], cs: [['Mys'], 'm'], sk: [['Mys'], 'm'], bg: [['Нос', 'Nos'], 'm'], ru: [['Мыс', 'Mys'], 'm'], uk: [['Мис', 'Mys'], 'm'] },
  { id: 'Grove', type: 'root', tags: ['nature'], pl: [['Gaj'], 'm'], cs: [['Háj'], 'm'], sk: [['Háj'], 'm'], bg: [['Роща', 'Roshta'], 'f'], ru: [['Роща', 'Roshcha'], 'f'], uk: [['Гай', 'Hay'], 'm'] },
  { id: 'Swamp', type: 'root', tags: ['nature'], pl: [['Błoto'], 'n'], cs: [['Blato'], 'n'], sk: [['Močiar'], 'm'], bg: [['Блато', 'Blato'], 'n'], ru: [['Болото', 'Boloto'], 'n'], uk: [['Болото', 'Boloto'], 'n'] },
  { id: 'Cliff', type: 'root', tags: ['nature'], pl: [['Urwisko'], 'n'], cs: [['Útes'], 'm'], sk: [['Útes'], 'm'], bg: [['Скала', 'Skala'], 'f'], ru: [['Утес', 'Utes'], 'm'], uk: [['Скеля', 'Skelya'], 'f'] },
  { id: 'Cave', type: 'root', tags: ['nature'], pl: [['Jaskinia'], 'f'], cs: [['Jeskyně'], 'f'], sk: [['Jaskyňa'], 'f'], bg: [['Пещера', 'Peshtera'], 'f'], ru: [['Пещера', 'Peshchera'], 'f'], uk: [['Печера', 'Pechera'], 'f'] },
  { id: 'Ravine', type: 'root', tags: ['nature'], pl: [['Wąwóz'], 'm'], cs: [['Rokle'], 'f'], sk: [['Roklina'], 'f'], bg: [['Дерес', 'Deres'], 'm'], ru: [['Овраг', 'Ovrag'], 'm'], uk: [['Яр', 'Yar'], 'm'] },
  { id: 'Sand', type: 'root', tags: ['nature'], pl: [['Piasek'], 'm'], cs: [['Písek'], 'm'], sk: [['Piesok'], 'm'], bg: [['Пясък', 'Pyasak'], 'm'], ru: [['Песок', 'Pesok'], 'm'], uk: [['Пісок', 'Pisok'], 'm'] },
  { id: 'Dust', type: 'root', tags: ['nature'], pl: [['Pył'], 'm'], cs: [['Prach'], 'm'], sk: [['Prach'], 'm'], bg: [['Прах', 'Prah'], 'm'], ru: [['Пыль', 'Pyl'], 'f'], uk: [['Пил', 'Pyl'], 'm'] },
  { id: 'Clay', type: 'root', tags: ['nature'], pl: [['Glina'], 'f'], cs: [['Hlína'], 'f'], sk: [['Hlina'], 'f'], bg: [['Глина', 'Glina'], 'f'], ru: [['Глина', 'Glina'], 'f'], uk: [['Глина', 'Hlyna'], 'f'] },
  { id: 'Mud', type: 'root', tags: ['nature'], pl: [['Błoto'], 'n'], cs: [['Bahno'], 'n'], sk: [['Bahno'], 'n'], bg: [['Кал', 'Kal'], 'm'], ru: [['Грязь', 'Gryaz'], 'f'], uk: [['Бруд', 'Bryud'], 'm'] },
  
  // Weather / Celestial
  { id: 'Sun', type: 'root', tags: ['nature'], pl: [['Słońce'], 'n'], cs: [['Slunce'], 'n'], sk: [['Slnko'], 'n'], bg: [['Слънце', 'Slantse'], 'n'], ru: [['Солнце', 'Solntse'], 'n'], uk: [['Сонце', 'Sontse'], 'n'] },
  { id: 'Moon', type: 'root', tags: ['nature'], pl: [['Księżyc'], 'm'], cs: [['Měsíc'], 'm'], sk: [['Mesiac'], 'm'], bg: [['Луна', 'Luna'], 'f'], ru: [['Луна', 'Luna'], 'f'], uk: [['Місяць', 'Misyats'], 'm'] },
  { id: 'Star', type: 'root', tags: ['nature'], pl: [['Gwiazda'], 'f'], cs: [['Hvězda'], 'f'], sk: [['Hviezda'], 'f'], bg: [['Звезда', 'Zvezda'], 'f'], ru: [['Звезда', 'Zvezda'], 'f'], uk: [['Зірка', 'Zirka'], 'f'] },
  { id: 'Wind', type: 'root', tags: ['nature'], pl: [['Wiatr'], 'm'], cs: [['Vítr'], 'm'], sk: [['Vietor'], 'm'], bg: [['Вятър', 'Vyatat'], 'm'], ru: [['Ветер', 'Veter'], 'm'], uk: [['Вітер', 'Viter'], 'm'] },
  { id: 'Snow', type: 'root', tags: ['nature'], pl: [['Śnieg'], 'm'], cs: [['Sníh'], 'm'], sk: [['Sneh'], 'm'], bg: [['Сняг', 'Snyag'], 'm'], ru: [['Снег', 'Sneg'], 'm'], uk: [['Сніг', 'Snih'], 'm'] },
  { id: 'Ice', type: 'root', tags: ['nature'], pl: [['Lód'], 'm'], cs: [['Led'], 'm'], sk: [['Ľad'], 'm'], bg: [['Лед', 'Led'], 'm'], ru: [['Лед', 'Led'], 'm'], uk: [['Лід', 'Lid'], 'm'] },
  { id: 'Fire', type: 'root', tags: ['nature'], pl: [['Ogień'], 'm'], cs: [['Oheň'], 'm'], sk: [['Oheň'], 'm'], bg: [['Огън', 'Ogan'], 'm'], ru: [['Огонь', 'Ogon'], 'm'], uk: [['Вогонь', 'Vohony'], 'm'] },
  { id: 'Ash', type: 'root', tags: ['nature'], pl: [['Popiół'], 'm'], cs: [['Popel'], 'm'], sk: [['Popol'], 'm'], bg: [['Пепел', 'Pepel'], 'm'], ru: [['Пепел', 'Pepel'], 'm'], uk: [['Попіл', 'Popil'], 'm'] },
  { id: 'Frost', type: 'root', tags: ['nature'], pl: [['Mróz'], 'm'], cs: [['Mráz'], 'm'], sk: [['Mráz'], 'm'], bg: [['Мраз', 'Mraz'], 'm'], ru: [['Мороз', 'Moroz'], 'm'], uk: [['Мороз', 'Moroz'], 'm'] },

  // Trees / Plants
  { id: 'Oak', type: 'root', tags: ['tree'], pl: [['Dąb'], 'm'], cs: [['Dub'], 'm'], sk: [['Dub'], 'm'], bg: [['Дъб', 'Dab'], 'm'], ru: [['Дуб', 'Dub'], 'm'], uk: [['Дуб', 'Dub'], 'm'] },
  { id: 'Lime', type: 'root', tags: ['tree'], pl: [['Lipa'], 'f'], cs: [['Lípa'], 'f'], sk: [['Lipa'], 'f'], bg: [['Липа', 'Lipa'], 'f'], ru: [['Липа', 'Lipa'], 'f'], uk: [['Липа', 'Lypa'], 'f'] },
  { id: 'Birch', type: 'root', tags: ['tree'], pl: [['Brzoza'], 'f'], cs: [['Bříza'], 'f'], sk: [['Breza'], 'f'], bg: [['Бреза', 'Breza'], 'f'], ru: [['Береза', 'Bereza'], 'f'], uk: [['Береза', 'Bereza'], 'f'] },
  { id: 'Pine', type: 'root', tags: ['tree'], pl: [['Sosna'], 'f'], cs: [['Borovice'], 'f'], sk: [['Borovica'], 'f'], bg: [['Бор', 'Bor'], 'm'], ru: [['Сосна', 'Sosna'], 'f'], uk: [['Сосна', 'Sosna'], 'f'] },
  { id: 'Spruce', type: 'root', tags: ['tree'], pl: [['Świerk'], 'm'], cs: [['Smrk'], 'm'], sk: [['Smrek'], 'm'], bg: [['Смърч', 'Smarch'], 'm'], ru: [['Ель', 'Yel'], 'f'], uk: [['Смерека', 'Smyreka'], 'f'] },
  { id: 'Willow', type: 'root', tags: ['tree'], pl: [['Wierzba'], 'f'], cs: [['Vrba'], 'f'], sk: [['Vŕba'], 'f'], bg: [['Върба', 'Varba'], 'f'], ru: [['Ива', 'Iva'], 'f'], uk: [['Верба', 'Verba'], 'f'] },
  { id: 'Poplar', type: 'root', tags: ['tree'], pl: [['Topola'], 'f'], cs: [['Topol'], 'm'], sk: [['Topoľ'], 'm'], bg: [['Топола', 'Topola'], 'f'], ru: [['Тополь', 'Topol'], 'm'], uk: [['Тополя', 'Topolya'], 'f'] },
  { id: 'Maple', type: 'root', tags: ['tree'], pl: [['Klon'], 'm'], cs: [['Javor'], 'm'], sk: [['Javor'], 'm'], bg: [['Явор', 'Yavor'], 'm'], ru: [['Клен', 'Klen'], 'm'], uk: [['Клен', 'Klen'], 'm'] },
  { id: 'Apple', type: 'root', tags: ['tree'], pl: [['Jabłoń'], 'f'], cs: [['Jabloň'], 'f'], sk: [['Jabloň'], 'f'], bg: [['Ябълка', 'Yabalka'], 'f'], ru: [['Яблоня', 'Yablonya'], 'f'], uk: [['Яблуня', 'Yablunya'], 'f'] },
  { id: 'Cherry', type: 'root', tags: ['tree'], pl: [['Wiśnia'], 'f'], cs: [['Višeň'], 'f'], sk: [['Višňa'], 'f'], bg: [['Вишна', 'Vishna'], 'f'], ru: [['Вишня', 'Vishnya'], 'f'], uk: [['Вишня', 'Vyshnya'], 'f'] },
  { id: 'Aspen', type: 'root', tags: ['tree'], pl: [['Osika'], 'f'], cs: [['Osika'], 'f'], sk: [['Osika'], 'f'], bg: [['Осика', 'Osika'], 'f'], ru: [['Осина', 'Osina'], 'f'], uk: [['Осина', 'Osyna'], 'f'] },
  { id: 'Alder', type: 'root', tags: ['tree'], pl: [['Olcha'], 'f'], cs: [['Olše'], 'f'], sk: [['Jelša'], 'f'], bg: [['Елха', 'Elha'], 'f'], ru: [['Ольха', 'Olha'], 'f'], uk: [['Вільха', 'Vilkha'], 'f'] },
  { id: 'Wheat', type: 'root', tags: ['tree'], pl: [['Pszenica'], 'f'], cs: [['Pšenice'], 'f'], sk: [['Pšenica'], 'f'], bg: [['Пшеница', 'Pshenitsa'], 'f'], ru: [['Пшеница', 'Pshenitsa'], 'f'], uk: [['Пшениця', 'Pshenystya'], 'f'] },

  // Animals
  { id: 'Wolf', type: 'root', tags: ['animal'], pl: [['Wilk'], 'm'], cs: [['Vlk'], 'm'], sk: [['Vlk'], 'm'], bg: [['Вълк', 'Valk'], 'm'], ru: [['Волк', 'Volk'], 'm'], uk: [['Вовк', 'Vovk'], 'm'] },
  { id: 'Bear', type: 'root', tags: ['animal'], pl: [['Niedźwiedź'], 'm'], cs: [['Medvěd'], 'm'], sk: [['Medveď'], 'm'], bg: [['Мечка', 'Mechka'], 'f'], ru: [['Медведь', 'Medved'], 'm'], uk: [['Ведмідь', 'Vedmid'], 'm'] },
  { id: 'Fox', type: 'root', tags: ['animal'], pl: [['Lis'], 'm'], cs: [['Liška'], 'f'], sk: [['Líška'], 'f'], bg: [['Лисица', 'Lisitsa'], 'f'], ru: [['Лиса', 'Lisa'], 'f'], uk: [['Лис', 'Lys'], 'm'] },
  { id: 'Eagle', type: 'root', tags: ['animal'], pl: [['Orzeł'], 'm'], cs: [['Orel'], 'm'], sk: [['Orol'], 'm'], bg: [['Орел', 'Orel'], 'm'], ru: [['Орел', 'Orel'], 'm'], uk: [['Орел', 'Orel'], 'm'] },
  { id: 'Falcon', type: 'root', tags: ['animal'], pl: [['Sokół'], 'm'], cs: [['Sokol'], 'm'], sk: [['Sokol'], 'm'], bg: [['Сокол', 'Sokol'], 'm'], ru: [['Сокол', 'Sokol'], 'm'], uk: [['Сокіл', 'Sokil'], 'm'] },
  { id: 'Beaver', type: 'root', tags: ['animal'], pl: [['Bóbr'], 'm'], cs: [['Bobr'], 'm'], sk: [['Bobor'], 'm'], bg: [['Бобър', 'Bobar'], 'm'], ru: [['Бобр', 'Bobr'], 'm'], uk: [['Бобер', 'Bober'], 'm'] },
  { id: 'Swan', type: 'root', tags: ['animal'], pl: [['Łabędź'], 'm'], cs: [['Labuť'], 'f'], sk: [['Labuť'], 'f'], bg: [['Лебед', 'Lebed'], 'm'], ru: [['Лебедь', 'Lebed'], 'f'], uk: [['Лебідь', 'Lebid'], 'f'] },
  { id: 'Horse', type: 'root', tags: ['animal'], pl: [['Koń'], 'm'], cs: [['Kůň'], 'm'], sk: [['Kôň'], 'm'], bg: [['Кон', 'Kon'], 'm'], ru: [['Конь', 'Kon'], 'm'], uk: [['Кінь', 'Kin'], 'm'] },
  { id: 'Bull', type: 'root', tags: ['animal'], pl: [['Byk'], 'm'], cs: [['Býk'], 'm'], sk: [['Býk'], 'm'], bg: [['Бик', 'Bik'], 'm'], ru: [['Бык', 'Byk'], 'm'], uk: [['Бик', 'Byk'], 'm'] },
  { id: 'Crow', type: 'root', tags: ['animal'], pl: [['Wrona'], 'f'], cs: [['Vrána'], 'f'], sk: [['Vrana'], 'f'], bg: [['Врана', 'Vrana'], 'f'], ru: [['Ворона', 'Vorona'], 'f'], uk: [['Ворона', 'Vorona'], 'f'] },
  { id: 'Hare', type: 'root', tags: ['animal'], pl: [['Zając'], 'm'], cs: [['Zajíc'], 'm'], sk: [['Zajac'], 'm'], bg: [['Заек', 'Zayek'], 'm'], ru: [['Заяц', 'Zayats'], 'm'], uk: [['Заєць', 'Zayets'], 'm'] },
  { id: 'Cat', type: 'root', tags: ['animal'], pl: [['Kot'], 'm'], cs: [['Kocour'], 'm'], sk: [['Kocúr'], 'm'], bg: [['Котка', 'Kotka'], 'f'], ru: [['Кот', 'Kot'], 'm'], uk: [['Кіт', 'Kit'], 'm'] },
  { id: 'Dog', type: 'root', tags: ['animal'], pl: [['Pies'], 'm'], cs: [['Pes'], 'm'], sk: [['Pes'], 'm'], bg: [['Куче', 'Kuche'], 'n'], ru: [['Пес', 'Pes'], 'm'], uk: [['Пес', 'Pes'], 'm'] },

  // Professions / People
  { id: 'Fisher', type: 'root', tags: ['civic'], pl: [['Rybak'], 'm'], cs: [['Rybář'], 'm'], sk: [['Rybár'], 'm'], bg: [['Рибар', 'Ribar'], 'm'], ru: [['Рыбак', 'Rybak'], 'm'], uk: [['Рибалка', 'Rybalka'], 'f'] },
  { id: 'Smith', type: 'root', tags: ['civic'], pl: [['Kowal'], 'm'], cs: [['Kovář'], 'm'], sk: [['Kováč'], 'm'], bg: [['Ковач', 'Kovach'], 'm'], ru: [['Кузнец', 'Kuznets'], 'm'], uk: [['Коваль', 'Koval'], 'm'] },
  { id: 'Miller', type: 'root', tags: ['civic'], pl: [['Młynarz'], 'm'], cs: [['Mlynář'], 'm'], sk: [['Mlynár'], 'm'], bg: [['Мелничар', 'Melnichar'], 'm'], ru: [['Мельник', 'Melnik'], 'm'], uk: [['Мірошник', 'Miroshnyk'], 'm'] },
  { id: 'Priest', type: 'root', tags: ['civic'], pl: [['Ksiądz'], 'm'], cs: [['Kněz'], 'm'], sk: [['Kňaz'], 'm'], bg: [['Поп', 'Pop'], 'm'], ru: [['Поп', 'Pop'], 'm'], uk: [['Піп', 'Pip'], 'm'] },
  { id: 'King', type: 'root', tags: ['civic'], pl: [['Król'], 'm'], cs: [['Král'], 'm'], sk: [['Kráľ'], 'm'], bg: [['Крал', 'Kral'], 'm'], ru: [['Король', 'Korol'], 'm'], uk: [['Король', 'Korol'], 'm'] },
  { id: 'Prince', type: 'root', tags: ['civic'], pl: [['Książę'], 'm'], cs: [['Kníže'], 'm'], sk: [['Knieža'], 'n'], bg: [['Княз', 'Knyaz'], 'm'], ru: [['Князь', 'Knyaz'], 'm'], uk: [['Князь', 'Knyaz'], 'm'] },

  // ========================== Specific Roots (some with Plurality) ==========================
  { id: 'Lhota', type: 'root', tags: ['civic'], cs: [['Lhota'], 'f'], sk: [['Lehota'], 'f'], pl: [['Ligota'], 'f'] },
  { id: 'Ujezd', type: 'root', tags: ['civic'], cs: [['Újezd'], 'm'] },
  { id: 'Tyn', type: 'root', tags: ['civic'], cs: [['Týn'], 'm'] },
  // Vary is plural (Karlovy Vary)
  { id: 'Vary', type: 'root', tags: ['nature'], cs: [['Vary'], 'f', 'pl'] }, 
  { id: 'Chlum', type: 'root', tags: ['nature'], cs: [['Chlum'], 'm'] },
  { id: 'Stran', type: 'root', tags: ['nature'], cs: [['Stráň'], 'f'], sk: [['Stráň'], 'f'] },

  // Abstract / Stems
  { id: 'Peace', type: 'stem', pl: [['Mir'], 'm'], cs: [['Mír'], 'm'], sk: [['Mier'], 'm'], bg: [['Мир', 'Mir'], 'm'], ru: [['Мир', 'Mir'], 'm'], uk: [['Мир', 'Myr'], 'm'] },
  { id: 'Glory', type: 'stem', pl: [['Sław'], 'f'], cs: [['Slav'], 'f'], sk: [['Slav'], 'f'], bg: [['Слав', 'Slav'], 'f'], ru: [['Слав', 'Slav'], 'f'], uk: [['Слав', 'Slav'], 'f'] },
  { id: 'God', type: 'stem', pl: [['Bog'], 'm'], cs: [['Boh'], 'm'], sk: [['Boh'], 'm'], bg: [['Бог', 'Bog'], 'm'], ru: [['Бог', 'Bog'], 'm'], uk: [['Бог', 'Boh'], 'm'] },
  { id: 'Dear', type: 'stem', pl: [['Mił'], 'm'], cs: [['Mil'], 'm'], sk: [['Mil'], 'm'], bg: [['Мил', 'Mil'], 'm'], ru: [['Мил', 'Mil'], 'm'], uk: [['Мил', 'Myl'], 'm'] },
  { id: 'Gift', type: 'stem', pl: [['Dar'], 'm'], cs: [['Dar'], 'm'], sk: [['Dar'], 'm'], bg: [['Дар', 'Dar'], 'm'], ru: [['Дар', 'Dar'], 'm'], uk: [['Дар', 'Dar'], 'm'] },
  { id: 'Lub', type: 'stem', pl: [['Lub'], 'm'], cs: [['Lub'], 'm'], sk: [['Ľub'], 'm'], bg: [['Люб', 'Lyub'], 'm'], ru: [['Люб', 'Lyub'], 'm'], uk: [['Люб', 'Lyub'], 'm'] }, 
  { id: 'Rad', type: 'stem', pl: [['Rad'], 'm'], cs: [['Rad'], 'm'], sk: [['Rad'], 'm'], bg: [['Рад', 'Rad'], 'm'], ru: [['Рад', 'Rad'], 'm'], uk: [['Рад', 'Rad'], 'm'] }, 
  { id: 'Jar', type: 'stem', pl: [['Jar'], 'm'], cs: [['Jar'], 'm'], sk: [['Jar'], 'm'], bg: [['Яр', 'Yar'], 'm'], ru: [['Яр', 'Yar'], 'm'], uk: [['Яр', 'Yar'], 'm'] }, 
  { id: 'Bor', type: 'stem', tags: ['tree'], pl: [['Bor'], 'm'], cs: [['Bor'], 'm'], sk: [['Bor'], 'm'], bg: [['Бор', 'Bor'], 'm'], ru: [['Бор', 'Bor'], 'm'], uk: [['Бор', 'Bor'], 'm'] },
  { id: 'Vlad', type: 'stem', pl: [['Wład'], 'm'], cs: [['Vlad'], 'm'], sk: [['Vlad'], 'm'], bg: [['Влад', 'Vlad'], 'm'], ru: [['Влад', 'Vlad'], 'm'], uk: [['Волод', 'Volod'], 'm'] },
  { id: 'Svet', type: 'stem', pl: [['Świat'], 'm'], cs: [['Světl'], 'm'], sk: [['Svet'], 'm'], bg: [['Свет', 'Svet'], 'm'], ru: [['Свет', 'Svet'], 'm'], uk: [['Світ', 'Svit'], 'm'] },
  { id: 'Dob', type: 'stem', pl: [['Dob'], 'm'], cs: [['Dob'], 'm'], sk: [['Dob'], 'm'], bg: [['Доб', 'Dob'], 'm'], ru: [['Доб', 'Dob'], 'm'], uk: [['Доб', 'Dob'], 'm'] },
  { id: 'Bel', type: 'stem', pl: [['Biał'], 'm'], cs: [['Běl'], 'm'], sk: [['Bel'], 'm'], bg: [['Бел', 'Bel'], 'm'], ru: [['Бел', 'Bel'], 'm'], uk: [['Біл', 'Bil'], 'm'] },
  
  // Specific Place Stems
  { id: 'Warsz', type: 'stem', pl: [['Warsz'], 'm'] }, { id: 'Krak', type: 'stem', pl: [['Krak'], 'm'] }, { id: 'Pozn', type: 'stem', pl: [['Pozn'], 'm'] }, { id: 'Wroc', type: 'stem', pl: [['Wroc'], 'm'] },
  { id: 'Szczec', type: 'stem', pl: [['Szczec'], 'm'] }, { id: 'Gdan', type: 'stem', pl: [['Gdań'], 'm'] }, { id: 'Brn', type: 'stem', cs: [['Brn'], 'n'], sk: [['Brn'], 'n'] }, { id: 'Ost', type: 'stem', cs: [['Ost'], 'm'] },
  { id: 'Plz', type: 'stem', cs: [['Plz'], 'f'] }, { id: 'Lib', type: 'stem', cs: [['Lib'], 'f'] },
  { id: 'Mosk', type: 'stem', bg: [['Моск', 'Mosk'], 'f'], ru: [['Моск', 'Mosk'], 'f'], uk: [['Моск', 'Mosk'], 'f'] },
  { id: 'Kyiv', type: 'stem', ru: [['Ки', 'Ki'], 'm'], uk: [['Ки', 'Ky'], 'm'] },
  { id: 'Khark', type: 'stem', ru: [['Харьк', 'Khark'], 'f'], uk: [['Харк', 'Khark'], 'f'] },
  { id: 'Vlad', type: 'stem', ru: [['Влад', 'Vlad'], 'm'], uk: [['Влад', 'Vlad'], 'm'], bg: [['Влад', 'Vlad'], 'm'] },
  { id: 'Sof', type: 'stem', bg: [['Соф', 'Sof'], 'f'] }, { id: 'Plov', type: 'stem', bg: [['Плов', 'Plov'], 'm'] }, { id: 'Varn', type: 'stem', bg: [['Варн', 'Varn'], 'f'] },

  // Missing Polish Stems
  { id: 'Byd', type: 'stem', tags: ['civic'], pl: [['Byd'], 'f'] }, { id: 'Kat', type: 'stem', tags: ['civic'], pl: [['Kat'], 'f'] },
  { id: 'Lub', type: 'stem', tags: ['civic'], pl: [['Lub'], 'm'] }, { id: 'Rzesz', type: 'stem', tags: ['civic'], pl: [['Rzesz'], 'm'] },
  { id: 'Gdyn', type: 'stem', tags: ['civic'], pl: [['Gdyn'], 'f'] }, { id: 'Czest', type: 'stem', tags: ['civic'], pl: [['Częst'], 'f'] },
  { id: 'Rad', type: 'stem', tags: ['civic'], pl: [['Rad'], 'm'] }, { id: 'Kiel', type: 'stem', tags: ['civic'], pl: [['Kiel'], 'f'] },
  { id: 'Tor', type: 'stem', tags: ['civic'], pl: [['Tor'], 'm'] }, { id: 'Olsz', type: 'stem', tags: ['civic'], pl: [['Olsz'], 'm'] },
  { id: 'Wola', type: 'root', tags: ['civic'], pl: [['Wola'], 'f'] },

  // Bulgarian Roots/Stems
  { id: 'StaraRoot', type: 'root', tags: ['civic', 'nature'], bg: [['Стара', 'Stara'], 'f'] }, { id: 'VelikoRoot', type: 'root', tags: ['civic'], bg: [['Велико', 'Veliko'], 'n'] },
  { id: 'GornoRoot', type: 'root', tags: ['civic', 'nature'], bg: [['Горно', 'Gorno'], 'n'] }, { id: 'DolnoRoot', type: 'root', tags: ['civic', 'nature'], bg: [['Долно', 'Dolno'], 'n'] },
  { id: 'Balkan', type: 'root', tags: ['nature'], bg: [['Балкан', 'Balkan'], 'm'] }, { id: 'Rila', type: 'root', tags: ['nature'], bg: [['Рила', 'Rila'], 'f'] },
  { id: 'Pirin', type: 'root', tags: ['nature'], bg: [['Пирин', 'Pirin'], 'm'] }, { id: 'Shipka', type: 'root', tags: ['nature'], bg: [['Шипка', 'Shipka'], 'f'] },

  // Slovak Roots/Stems
  { id: 'Bratislav', type: 'stem', tags: ['civic'], sk: [['Bratislav'], 'm'] }, { id: 'Kosic', type: 'stem', tags: ['civic'], sk: [['Košíc'], 'n'] }, 
  { id: 'Presov', type: 'stem', tags: ['civic'], sk: [['Prešov'], 'm'] }, { id: 'Liptov', type: 'stem', tags: ['civic', 'nature'], sk: [['Liptov'], 'm'] },
  { id: 'Zvolen', type: 'stem', tags: ['civic'], sk: [['Zvolen'], 'm'] }, { id: 'NitraCity', type: 'stem', tags: ['civic'], sk: [['Nitra'], 'f'] },
  // Tatry is plural
  { id: 'Tatry', type: 'root', tags: ['nature'], sk: [['Tatry'], 'f', 'pl'], pl: [['Tatry'], 'f', 'pl'] }, 

  // ========================== SUFFIXES ==========================
  // -ice / -itsi is the most common plural suffix in Slavic place names.
  // -ki / -ky is also frequently plural.
  { id: 'suf_ov', type: 'suffix', pl: ['ów'], cs: ['ov'], sk: ['ov'], bg: [['ов', 'ov'], 'm'], ru: [['ов', 'ov'], 'm'], uk: [['ів', 'iv'], 'm'] },
  { id: 'suf_in', type: 'suffix', pl: ['in'], cs: ['ín'], sk: ['ín'], bg: [['ин', 'in'], 'm'], ru: [['ин', 'in'], 'm'], uk: [['ин', 'yn'], 'm'] },
  // Plural Suffix: -ice
  { id: 'suf_ice', type: 'suffix', 
    pl: [['ice'], 'f', 'pl'], 
    cs: [['ice'], 'f', 'pl'], 
    sk: [['ice'], 'f', 'pl'], 
    bg: [['ици', 'itsi'], 'f', 'pl'], 
    ru: [['ицы', 'itsy'], 'f', 'pl'], 
    uk: [['иці', 'ytsi'], 'f', 'pl'] 
  },
  { id: 'suf_sk', type: 'suffix', pl: ['sk'], cs: ['sko'], sk: ['sko'], bg: [['ско', 'sko'], 'n'], ru: [['ск', 'sk'], 'm'], uk: [['ськ', 'sk'], 'm'] },
  { id: 'suf_no', type: 'suffix', pl: ['no'], cs: ['no'], sk: ['no'], bg: [['но', 'no'], 'n'], ru: [['но', 'no'], 'n'], uk: [['не', 'ne'], 'n'] },
  { id: 'suf_ec', type: 'suffix', pl: ['ec'], cs: ['ec'], sk: ['ec'], bg: [['ец', 'ets'], 'm'], ru: [['ец', 'ets'], 'm'], uk: [['ець', 'ets'], 'm'] },
  { id: 'suf_ka', type: 'suffix', pl: ['ka'], cs: ['ka'], sk: ['ka'], bg: [['ка', 'ka'], 'f'], ru: [['ка', 'ka'], 'f'], uk: [['ка', 'ka'], 'f'] },
  { id: 'suf_na', type: 'suffix', pl: ['na'], cs: ['ná'], sk: ['na'], bg: [['на', 'na'], 'f'], ru: [['ная', 'naya'], 'f'], uk: [['на', 'na'], 'f'] },
  { id: 'suf_ev', type: 'suffix', pl: ['ew'], cs: ['ev'], sk: ['ev'], bg: [['ев', 'ev'], 'm'], ru: [['ев', 'ev'], 'm'], uk: [['ів', 'iv'], 'm'] },
  { id: 'suf_vk', type: 'suffix', pl: [['ówka'], 'f'], cs: ['vka'], sk: ['vka'], bg: [['вка', 'vka'], 'f'], ru: [['вка', 'vka'], 'f'], uk: [['вка', 'vka'], 'f'] },
  { id: 'suf_grad', type: 'suffix', bg: [['град', 'grad'], 'm'], ru: [['град', 'grad'], 'm'] },
  { id: 'suf_vo', type: 'suffix', bg: [['во', 'vo'], 'n'], ru: [['во', 'vo'], 'n'] },
  { id: 'suf_ovo', type: 'suffix', pl: [['owo'], 'n'], cs: [['ovo'], 'n'], sk: [['ovo'], 'n'], bg: [['ово', 'ovo'], 'n'], ru: [['ово', 'ovo'], 'n'], uk: [['ово', 'ovo'], 'n'] },
  { id: 'suf_nik', type: 'suffix', pl: [['nik'], 'm'], cs: [['ník'], 'm'], sk: [['ník'], 'm'], bg: [['ник', 'nik'], 'm'], ru: [['ник', 'nik'], 'm'], uk: [['ник', 'nyk'], 'm'] },
  { id: 'suf_nica', type: 'suffix', pl: [['nica'], 'f'], cs: [['nice'], 'f'], sk: [['nica'], 'f'], bg: [['ница', 'nica'], 'f'], ru: [['ница', 'nitsa'], 'f'], uk: [['ниця', 'nytsia'], 'f'] },
  { id: 'suf_ishte', type: 'suffix', pl: [['iszcze'], 'n'], cs: [['iště'], 'n'], sk: [['ište'], 'n'], bg: [['ище', 'ishte'], 'n'], ru: [['ище', 'ishche'], 'n'], uk: [['ище', 'yshche'], 'n'] },
  { id: 'suf_ina', type: 'suffix', pl: [['ina'], 'f'], cs: [['ina'], 'f'], sk: [['ina'], 'f'], bg: [['ина', 'ina'], 'f'], ru: [['ина', 'ina'], 'f'], uk: [['ина', 'yna'], 'f'] },
  // Plural Suffix: -ki
  { id: 'suf_ki', type: 'suffix', 
    pl: [['ki'], 'f', 'pl'], 
    cs: [['ky'], 'f', 'pl'], 
    sk: [['ky'], 'f', 'pl'], 
    bg: [['ки', 'ki'], 'f', 'pl'], 
    ru: [['ки', 'ki'], 'f', 'pl'], 
    uk: [['ки', 'ky'], 'f', 'pl'] 
  },
  { id: 'suf_a_fem_nom', type: 'suffix', pl: [['a'], 'f'], cs: [['á'], 'f'], sk: [['a'], 'f'], bg: [['а', 'a'], 'f'], ru: [['а', 'a'], 'f'], uk: [['а', 'a'], 'f'] },
  { id: 'suf_ie', type: 'suffix', pl: [['ie'], 'n'], cs: [['í'], 'n'], sk: [['ie'], 'n'], bg: [['е', 'e'], 'n'], ru: [['ье', 'ye'], 'n'], uk: [['є', 'ie'], 'n'] },
  { id: 'suf_ysko', type: 'suffix', pl: [['ysko'], 'n'], cs: [['isko'], 'n'], sk: [['isko'], 'n'], bg: [['иско', 'isko'], 'n'], ru: [['ыско', 'ysko'], 'n'], uk: [['исько', 'ysko'], 'n'] },

  // ========================== RIVERS ==========================
  { id: 'Vltava', type: 'river', cs: [['Vltava'], 'f'] },
  { id: 'Elbe', type: 'river', cs: [['Labe'], 'f'] },
  { id: 'Morava', type: 'river', cs: [['Morava'], 'f'], sk: [['Morava'], 'f'] },
  { id: 'Odra', type: 'river', cs: [['Odra'], 'f'], pl: [['Odra'], 'f'] },
  { id: 'Vistula', type: 'river', pl: [['Wisła'], 'f'] },
  { id: 'Warta', type: 'river', pl: [['Warta'], 'f'] },
  { id: 'Volga', type: 'river', ru: [['Волга', 'Volga'], 'f'] },
  { id: 'Don', type: 'river', ru: [['Дон', 'Don'], 'm'] },
  { id: 'Dnipro', type: 'river', uk: [['Дніпро', 'Dnipro'], 'm'] },
  { id: 'Desna', type: 'river', uk: [['Десна', 'Desna'], 'f'] },
  { id: 'Danube', type: 'river', bg: [['Дунав', 'Dunav'], 'm'], sk: [['Dunaj'], 'm'] },
  { id: 'Maritsa', type: 'river', bg: [['Марица', 'Maritsa'], 'f'] },
  { id: 'Ohre', type: 'river', cs: [['Ohře'], 'f'] },
  { id: 'Sazava', type: 'river', cs: [['Sázava'], 'f'] },
  { id: 'Berounka', type: 'river', cs: [['Berounka'], 'f'] },
  { id: 'Svratka', type: 'river', cs: [['Svratka'], 'f'] },
  { id: 'Jizera', type: 'river', cs: [['Jizera'], 'f'] },
  { id: 'Bug', type: 'river', pl: [['Bug'], 'm'], uk: [['Буг', 'Buh'], 'm'] },
  { id: 'San', type: 'river', pl: [['San'], 'm'] },
  { id: 'Narew', type: 'river', pl: [['Narew'], 'f'] },
  { id: 'Pilica',type: 'river', pl: [['Pilica'], 'f'] },
  { id: 'Hron', type: 'river', sk: [['Hron'], 'm'] },
  { id: 'Vah', type: 'river', sk: [['Váh'], 'm'] },
  { id: 'NitraRiver', type: 'river', sk: [['Nitra'], 'f'] },
  { id: 'Hornad', type: 'river', sk: [['Hornád'], 'm'] },
  { id: 'Iskar', type: 'river', bg: [['Искър', 'Iskar'], 'm'] },
  { id: 'Struma', type: 'river', bg: [['Струма', 'Struma'], 'f'] },
  { id: 'Tundzha', type: 'river', bg: [['Тунджа', 'Tundzha'], 'f'] },

  // ========================== INFLECTED RIVERS (river_loc) ==========================
  { id: 'loc_Vltava', type: 'river_loc', cs: ['Vltavou'] },
  { id: 'loc_Elbe', type: 'river_loc', cs: ['Labem'] },
  { id: 'loc_Morava', type: 'river_loc', cs: ['Moravou'], sk: ['Moravou'] },
  { id: 'loc_Odra', type: 'river_loc', cs: ['Odrou'], pl: ['Odrą'] },
  { id: 'loc_Vistula', type: 'river_loc', pl: ['Wisłą'] },
  { id: 'loc_Warta', type: 'river_loc', pl: ['Wartą'] },
  { id: 'loc_Volga', type: 'river_loc', ru: ['Волге', 'Volge'] },
  { id: 'loc_Don', type: 'river_loc', ru: ['Дону', 'Donu'] },
  { id: 'loc_Dnipro', type: 'river_loc', uk: ['Дніпрі', 'Dnipri'] },
  { id: 'loc_Desna', type: 'river_loc', uk: ['Десні', 'Desni'] },
  { id: 'loc_Danube', type: 'river_loc', bg: ['Дунав', 'Dunav'], sk: ['Dunajom'] },
  { id: 'loc_Maritsa', type: 'river_loc', bg: ['Марица', 'Maritsa'] },
  { id: 'loc_Ohre', type: 'river_loc', cs: ['Ohří'] },
  { id: 'loc_Sazava', type: 'river_loc', cs: ['Sázavou'] },
  { id: 'loc_Berounka', type: 'river_loc', cs: ['Berounkou'] },
  { id: 'loc_Svratka', type: 'river_loc', cs: ['Svratkou'] },
  { id: 'loc_Jizera', type: 'river_loc', cs: ['Jizerou'] },
  { id: 'loc_Bug', type: 'river_loc', pl: ['Bugiem'], uk: ['Бузі', 'Buzi'] },
  { id: 'loc_San', type: 'river_loc', pl: ['Sanem'] },
  { id: 'loc_Narew', type: 'river_loc', pl: ['Narwią'] },
  { id: 'loc_Pilica', type: 'river_loc', pl: ['Pilicą'] },
  { id: 'loc_Hron', type: 'river_loc', sk: ['Hronom'] },
  { id: 'loc_Vah', type: 'river_loc', sk: ['Váhom'] },
  { id: 'loc_NitraRiver', type: 'river_loc', sk: ['Nitrou'] },
  { id: 'loc_Hornad', type: 'river_loc', sk: ['Hornádom'] },
  { id: 'loc_Iskar', type: 'river_loc', bg: ['Искър', 'Iskar'] },
  { id: 'loc_Struma', type: 'river_loc', bg: ['Струма', 'Struma'] },
  { id: 'loc_Tundzha', type: 'river_loc', bg: ['Тунджа', 'Tundzha'] },

  // ========================== COUNTRY SUFFIXES ==========================
  { id: 'landia', type: 'country_suffix', pl: [['landia'], 'f'], cs: [['land'], 'f'], sk: [['land'], 'f'], bg: [['ландия', 'landiya'], 'f'], ru: [['ландия', 'landiya'], 'f'], uk: [['ландія', 'landiya'], 'f'] },
  { id: 'sko', type: 'country_suffix', pl: [['ska'], 'n'], cs: [['sko'], 'n'], sk: [['sko'], 'n'], bg: [['ско', 'sko'], 'n'], ru: [['стан', 'stan'], 'm'], uk: [['стан', 'stan'], 'm'] },
  { id: 'ia', type: 'country_suffix', pl: [['ia'], 'f'], cs: [['ie'], 'f'], sk: [['ia'], 'f'], bg: [['ия', 'iya'], 'f'], ru: [['ия', 'iya'], 'f'], uk: [['ія', 'iya'], 'f'] },
  { id: 'stan', type: 'country_suffix', pl: [['stan'], 'm'], cs: [['stán'], 'm'], sk: [['stan'], 'm'], bg: [['стан', 'stan'], 'm'], ru: [['стан', 'stan'], 'm'], uk: [['стан', 'stan'], 'm'] },
  { id: 'raj', type: 'country_suffix', tags: ['civic'], pl: [['raj'], 'm'], cs: [['ráj'], 'm'], sk: [['raj'], 'm'] },
];

export const LOWERCASE_PARTICLES: Record<string, string[]> = {
  cs: ['nad', 'pod', 'u', 've', 'vo', 'při', 'za', 'mezi'],
  sk: ['nad', 'pod', 'u', 'vo', 'pri', 'za', 'medzi'],
  pl: ['nad', 'pod', 'u', 'we', 'przy', 'za', 'między', 'ku'],
  bg: ['на', 'na', 'над', 'nad', 'под', 'pod', 'при', 'pri'],
  ru: ['на', 'na', 'над', 'nad', 'под', 'pod', 'при', 'pri', 'у', 'u', 'за', 'za'],
  uk: ['на', 'na', 'над', 'nad', 'під', 'pid', 'при', 'pry', 'у', 'u', 'за', 'za']
};
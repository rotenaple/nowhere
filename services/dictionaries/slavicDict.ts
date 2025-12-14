
export interface SlavicComponent {
  id: string;
  type: 'adjective' | 'root' | 'suffix' | 'river' | 'country_suffix' | 'stem';
  pl?: string;
  cs?: string;
  sk?: string; // Slovak
  bg?: string; // Bulgarian (Latin/Transliterated)
  bg_cyr?: string; // Bulgarian (Native Cyrillic)
  ru?: string; // Latin/Transliterated
  ru_cyr?: string; // Native Cyrillic
  uk?: string; // Latin/Transliterated
  uk_cyr?: string; // Native Cyrillic
  gender?: 'm' | 'f' | 'n'; 
  tags?: string[]; // 'nature', 'civic', 'animal', 'tree'
}

export const SLAVIC_DATA: SlavicComponent[] = [
  // ==========================
  // ADJECTIVES
  // ==========================
  // Basic
  { id: 'New', type: 'adjective', pl: 'Nowy', cs: 'Nový', sk: 'Nový', bg: 'Nov', bg_cyr: 'Нов', ru: 'Noviy', ru_cyr: 'Новый', uk: 'Novyy', uk_cyr: 'Новий' },
  { id: 'Old', type: 'adjective', pl: 'Stary', cs: 'Starý', sk: 'Starý', bg: 'Star', bg_cyr: 'Стар', ru: 'Stariy', ru_cyr: 'Старый', uk: 'Staryy', uk_cyr: 'Старий' },
  { id: 'Great', type: 'adjective', pl: 'Wielki', cs: 'Velký', sk: 'Veľký', bg: 'Golyam', bg_cyr: 'Голям', ru: 'Velikiy', ru_cyr: 'Великий', uk: 'Velykyy', uk_cyr: 'Великий' },
  { id: 'Small', type: 'adjective', pl: 'Mały', cs: 'Malý', sk: 'Malý', bg: 'Malak', bg_cyr: 'Малък', ru: 'Maliy', ru_cyr: 'Малый', uk: 'Malyy', uk_cyr: 'Малий' },
  { id: 'High', type: 'adjective', pl: 'Wysoki', cs: 'Vysoký', sk: 'Vysoký', bg: 'Visok', bg_cyr: 'Висок', ru: 'Vysokiy', ru_cyr: 'Высокий', uk: 'Vysokyy', uk_cyr: 'Високий' },
  { id: 'Low', type: 'adjective', pl: 'Niski', cs: 'Nízký', sk: 'Nízky', bg: 'Nizak', bg_cyr: 'Нисък', ru: 'Nizkiy', ru_cyr: 'Низкий', uk: 'Nyzkyy', uk_cyr: 'Низький' },
  
  // Directions
  { id: 'North', type: 'adjective', pl: 'Północny', cs: 'Severní', sk: 'Severný', bg: 'Severen', bg_cyr: 'Северен', ru: 'Severniy', ru_cyr: 'Северный', uk: 'Pivnichnyy', uk_cyr: 'Північний' },
  { id: 'South', type: 'adjective', pl: 'Południowy', cs: 'Jižní', sk: 'Južný', bg: 'Yuzhen', bg_cyr: 'Южен', ru: 'Yuzhniy', ru_cyr: 'Южный', uk: 'Pivdennyy', uk_cyr: 'Південний' },
  { id: 'East', type: 'adjective', pl: 'Wschodni', cs: 'Východní', sk: 'Východný', bg: 'Iztoch', bg_cyr: 'Източ', ru: 'Vostochniy', ru_cyr: 'Восточный', uk: 'Skhidnyy', uk_cyr: 'Східний' },
  { id: 'West', type: 'adjective', pl: 'Zachodni', cs: 'Západní', sk: 'Západný', bg: 'Zapaden', bg_cyr: 'Западен', ru: 'Zapadniy', ru_cyr: 'Западный', uk: 'Zakhidnyy', uk_cyr: 'Західний' },

  // Colors
  { id: 'Black', type: 'adjective', pl: 'Czarny', cs: 'Černý', sk: 'Čierny', bg: 'Cheren', bg_cyr: 'Черен', ru: 'Chorniy', ru_cyr: 'Черный', uk: 'Chornyy', uk_cyr: 'Чорний' },
  { id: 'White', type: 'adjective', pl: 'Biały', cs: 'Bílý', sk: 'Biely', bg: 'Byal', bg_cyr: 'Бял', ru: 'Beliy', ru_cyr: 'Белый', uk: 'Bilyy', uk_cyr: 'Білий' },
  { id: 'Red', type: 'adjective', pl: 'Czerwony', cs: 'Červený', sk: 'Červený', bg: 'Cherven', bg_cyr: 'Червен', ru: 'Krasniy', ru_cyr: 'Красный', uk: 'Chervonyy', uk_cyr: 'Червоний' },
  { id: 'Green', type: 'adjective', pl: 'Zielony', cs: 'Zelený', sk: 'Zelený', bg: 'Zelen', bg_cyr: 'Зелен', ru: 'Zeleniy', ru_cyr: 'Зеленый', uk: 'Zelenyy', uk_cyr: 'Зелений' },
  { id: 'Blue', type: 'adjective', pl: 'Niebieski', cs: 'Modrý', sk: 'Modrý', bg: 'Sin', bg_cyr: 'Син', ru: 'Siniy', ru_cyr: 'Синий', uk: 'Syniy', uk_cyr: 'Синій' },
  { id: 'Gold', type: 'adjective', pl: 'Złoty', cs: 'Zlatý', sk: 'Zlatý', bg: 'Zlaten', bg_cyr: 'Златен', ru: 'Zolotoy', ru_cyr: 'Золотой', uk: 'Zolotyy', uk_cyr: 'Золотий' },
  { id: 'Silver', type: 'adjective', pl: 'Srebrny', cs: 'Stříbrný', sk: 'Strieborný', bg: 'Srebaren', bg_cyr: 'Сребърен', ru: 'Serebryaniy', ru_cyr: 'Серебряный', uk: 'Sribnyy', uk_cyr: 'Срібний' },

  // Qualities
  { id: 'Beautiful', type: 'adjective', pl: 'Piękny', cs: 'Krásný', sk: 'Krásny', bg: 'Krasiv', bg_cyr: 'Красив', ru: 'Krasiviy', ru_cyr: 'Красивый', uk: 'Krasyvyy', uk_cyr: 'Красивий' },
  { id: 'Holy', type: 'adjective', pl: 'Święty', cs: 'Svatý', sk: 'Svätý', bg: 'Sveti', bg_cyr: 'Свети', ru: 'Svyatoy', ru_cyr: 'Святой', uk: 'Svyatyy', uk_cyr: 'Святий' },
  { id: 'Royal', type: 'adjective', pl: 'Królewski', cs: 'Královský', sk: 'Kráľovský', bg: 'Tsarski', bg_cyr: 'Царски', ru: 'Tsarskiy', ru_cyr: 'Царский', uk: 'Korolivskyy', uk_cyr: 'Королівський' },
  { id: 'Lower', type: 'adjective', pl: 'Dolny', cs: 'Dolní', sk: 'Dolný', bg: 'Dolen', bg_cyr: 'Долен', ru: 'Nizhniy', ru_cyr: 'Нижний', uk: 'Nyzhniy', uk_cyr: 'Нижній' },
  { id: 'Upper', type: 'adjective', pl: 'Górny', cs: 'Horní', sk: 'Horný', bg: 'Goren', bg_cyr: 'Горен', ru: 'Verkhniy', ru_cyr: 'Верхний', uk: 'Verkhniy', uk_cyr: 'Верхній' },
  { id: 'Long', type: 'adjective', pl: 'Długi', cs: 'Dlouhý', sk: 'Dlhý', bg: 'Dalg', bg_cyr: 'Дълг', ru: 'Dolgiy', ru_cyr: 'Долгий', uk: 'Dovhyy', uk_cyr: 'Довгий' },
  { id: 'Short', type: 'adjective', pl: 'Krótki', cs: 'Krátký', sk: 'Krátky', bg: 'Kratak', bg_cyr: 'Кратък', ru: 'Korotkiy', ru_cyr: 'Короткий', uk: 'Korotkyy', uk_cyr: 'Короткий' },
  { id: 'Wet', type: 'adjective', pl: 'Mokry', cs: 'Mokrý', sk: 'Mokrý', bg: 'Mokar', bg_cyr: 'Мокър', ru: 'Mokriy', ru_cyr: 'Мокрый', uk: 'Mokryy', uk_cyr: 'Мокрий' },
  { id: 'Dry', type: 'adjective', pl: 'Suchy', cs: 'Suchý', sk: 'Suchý', bg: 'Suh', bg_cyr: 'Сух', ru: 'Sukhoy', ru_cyr: 'Сухой', uk: 'Sukhyy', uk_cyr: 'Сухий' },
  { id: 'StoneAdj', type: 'adjective', pl: 'Kamienny', cs: 'Kamenný', sk: 'Kamenný', bg: 'Kamenen', bg_cyr: 'Каменен', ru: 'Kamenniy', ru_cyr: 'Каменный', uk: 'Kamyanyy', uk_cyr: 'Кам\'яний' },
  { id: 'Broad', type: 'adjective', pl: 'Szeroki', cs: 'Široký', sk: 'Široký', bg: 'Shirok', bg_cyr: 'Широк', ru: 'Shirokiy', ru_cyr: 'Широкий', uk: 'Shyrokyy', uk_cyr: 'Широкий' },
  { id: 'Deep', type: 'adjective', pl: 'Głęboki', cs: 'Hluboký', sk: 'Hlboký', bg: 'Dalbok', bg_cyr: 'Дълбок', ru: 'Glubokiy', ru_cyr: 'Глубокий', uk: 'Hlybokyy', uk_cyr: 'Глибокий' },
  { id: 'Cold', type: 'adjective', pl: 'Zimny', cs: 'Studený', sk: 'Studený', bg: 'Studen', bg_cyr: 'Студен', ru: 'Kholodniy', ru_cyr: 'Холодный', uk: 'Kholodnyy', uk_cyr: 'Холодний' },
  { id: 'Warm', type: 'adjective', pl: 'Ciepły', cs: 'Teplý', sk: 'Teplý', bg: 'Topal', bg_cyr: 'Топъл', ru: 'Tepliy', ru_cyr: 'Теплый', uk: 'Teplyy', uk_cyr: 'Теплий' },
  { id: 'Clear', type: 'adjective', pl: 'Jasny', cs: 'Jasný', sk: 'Jasný', bg: 'Yasen', bg_cyr: 'Ясен', ru: 'Yasniy', ru_cyr: 'Ясный', uk: 'Yasnyy', uk_cyr: 'Ясний' },
  // Extended Adjectives for Capacity
  { id: 'Sunny', type: 'adjective', pl: 'Słoneczny', cs: 'Slunečný', sk: 'Slnečný', bg: 'Slanchev', bg_cyr: 'Слънчев', ru: 'Solnechniy', ru_cyr: 'Солнечный', uk: 'Sonyachnyy', uk_cyr: 'Сонячний' },
  { id: 'Windy', type: 'adjective', pl: 'Wietrzny', cs: 'Větrný', sk: 'Veterný', bg: 'Vetrovit', bg_cyr: 'Ветровит', ru: 'Vetreniy', ru_cyr: 'Ветреный', uk: 'Vitryanyy', uk_cyr: 'Вітряний' },
  { id: 'Quiet', type: 'adjective', pl: 'Cichy', cs: 'Tichý', sk: 'Tichý', bg: 'Tih', bg_cyr: 'Тих', ru: 'Tikhiy', ru_cyr: 'Тихий', uk: 'Tykhyy', uk_cyr: 'Тихий' },
  { id: 'Loud', type: 'adjective', pl: 'Głośny', cs: 'Hlasitý', sk: 'Hlasný', bg: 'Shumen', bg_cyr: 'Шумен', ru: 'Gromkiy', ru_cyr: 'Громкий', uk: 'Huchnyy', uk_cyr: 'Гучний' },
  { id: 'IronAdj', type: 'adjective', pl: 'Żelazny', cs: 'Železný', sk: 'Železný', bg: 'Zhelezen', bg_cyr: 'Железен', ru: 'Zhelezniy', ru_cyr: 'Железный', uk: 'Zhaliznyy', uk_cyr: 'Залізний' },
  { id: 'Wild', type: 'adjective', pl: 'Dziki', cs: 'Divoký', sk: 'Divoký', bg: 'Div', bg_cyr: 'Див', ru: 'Dikiy', ru_cyr: 'Дикий', uk: 'Dykyy', uk_cyr: 'Дикий' },
  { id: 'Dark', type: 'adjective', pl: 'Ciemny', cs: 'Temný', sk: 'Temný', bg: 'Tamen', bg_cyr: 'Тъмен', ru: 'Temniy', ru_cyr: 'Темный', uk: 'Temnyy', uk_cyr: 'Темний' },
  { id: 'Sharp', type: 'adjective', pl: 'Ostry', cs: 'Ostrý', sk: 'Ostrý', bg: 'Ostar', bg_cyr: 'Остър', ru: 'Ostriy', ru_cyr: 'Острый', uk: 'Hostryy', uk_cyr: 'Гострий' },
  { id: 'Round', type: 'adjective', pl: 'Okrągły', cs: 'Kulatý', sk: 'Okrúhly', bg: 'Kragal', bg_cyr: 'Кръгъл', ru: 'Krugliy', ru_cyr: 'Круглый', uk: 'Kruhlyy', uk_cyr: 'Круглий' },
  { id: 'Flat', type: 'adjective', pl: 'Płaski', cs: 'Plochý', sk: 'Plochý', bg: 'Plosak', bg_cyr: 'Плосък', ru: 'Ploskiy', ru_cyr: 'Плоский', uk: 'Ploskyy', uk_cyr: 'Плоский' },
  { id: 'Rich', type: 'adjective', pl: 'Bogaty', cs: 'Bohatý', sk: 'Bohatý', bg: 'Bogat', bg_cyr: 'Богат', ru: 'Bogatiy', ru_cyr: 'Богатый', uk: 'Bahatyy', uk_cyr: 'Багатий' },
  { id: 'Poor', type: 'adjective', pl: 'Biedny', cs: 'Chudý', sk: 'Chudobný', bg: 'Beden', bg_cyr: 'Беден', ru: 'Bedniy', ru_cyr: 'Бедный', uk: 'Bidnyy', uk_cyr: 'Бідний' },
  { id: 'Empty', type: 'adjective', pl: 'Pusty', cs: 'Prázdný', sk: 'Prázdny', bg: 'Pust', bg_cyr: 'Пуст', ru: 'Pustoy', ru_cyr: 'Пустой', uk: 'Pustyy', uk_cyr: 'Пустий' },
  { id: 'Full', type: 'adjective', pl: 'Pełny', cs: 'Plný', sk: 'Plný', bg: 'Palen', bg_cyr: 'Пълен', ru: 'Polniy', ru_cyr: 'Полный', uk: 'Povnyy', uk_cyr: 'Повний' },
  { id: 'Sweet', type: 'adjective', pl: 'Słodki', cs: 'Sladký', sk: 'Sladký', bg: 'Sladak', bg_cyr: 'Сладък', ru: 'Sladkiy', ru_cyr: 'Сладкий', uk: 'Solodkyy', uk_cyr: 'Солодкий' },
  { id: 'Glorious', type: 'adjective', pl: 'Sławny', cs: 'Slavný', sk: 'Slávny', bg: 'Slaven', bg_cyr: 'Славен', ru: 'Slavniy', ru_cyr: 'Славный', uk: 'Slavnyy', uk_cyr: 'Славний' },
  { id: 'GoodNice', type: 'adjective', pl: 'Dobry', cs: 'Dobrý', sk: 'Dobrý', bg: 'Dobar', bg_cyr: 'Добър', ru: 'Dobriy', ru_cyr: 'Добрый', uk: 'Dobryy', uk_cyr: 'Добрий' },
  
  // ==========================
  // ROOTS (Nouns/Stems)
  // ==========================
  // Civic / Settlements
  { id: 'Town', type: 'root', pl: 'Miasto', cs: 'Město', sk: 'Mesto', bg: 'Grad', bg_cyr: 'Град', ru: 'Gorod', ru_cyr: 'Город', uk: 'Misto', uk_cyr: 'Місто', gender: 'n', tags: ['civic'] },
  { id: 'Castle', type: 'root', pl: 'Gród', cs: 'Hrad', sk: 'Hrad', bg: 'Krepost', bg_cyr: 'Крепост', ru: 'Grad', ru_cyr: 'Град', uk: 'Horod', uk_cyr: 'Город', gender: 'm', tags: ['civic'] },
  { id: 'Fort', type: 'root', pl: 'Twierdza', cs: 'Tvrz', sk: 'Pevnosť', bg: 'Tvardina', bg_cyr: 'Твърдина', ru: 'Krepost', ru_cyr: 'Крепость', uk: 'Fortetsya', uk_cyr: 'Фортеця', gender: 'f', tags: ['civic'] },
  { id: 'Market', type: 'root', pl: 'Targ', cs: 'Trh', sk: 'Trh', bg: 'Pazar', bg_cyr: 'Пазар', ru: 'Rynok', ru_cyr: 'Рынок', uk: 'Rynok', uk_cyr: 'Ринок', gender: 'm', tags: ['civic'] },
  { id: 'Village', type: 'root', pl: 'Wieś', cs: 'Ves', sk: 'Ves', bg: 'Selo', bg_cyr: 'Село', ru: 'Selo', ru_cyr: 'Село', uk: 'Selo', uk_cyr: 'Село', gender: 'n', tags: ['civic'] },
  { id: 'Court', type: 'root', pl: 'Dwór', cs: 'Dvůr', sk: 'Dvor', bg: 'Dvor', bg_cyr: 'Двор', ru: 'Dvor', ru_cyr: 'Двор', uk: 'Dvir', uk_cyr: 'Двір', gender: 'm', tags: ['civic'] },
  { id: 'Church', type: 'root', pl: 'Kościół', cs: 'Kostel', sk: 'Kostol', bg: 'Tsarkva', bg_cyr: 'Църква', ru: 'Tserkov', ru_cyr: 'Церковь', uk: 'Tserkva', uk_cyr: 'Церква', gender: 'f', tags: ['civic'] },
  { id: 'Bridge', type: 'root', pl: 'Most', cs: 'Most', sk: 'Most', bg: 'Most', bg_cyr: 'Мост', ru: 'Most', ru_cyr: 'Мост', uk: 'Mist', uk_cyr: 'Міст', gender: 'm', tags: ['civic'] },
  { id: 'Port', type: 'root', pl: 'Port', cs: 'Přístav', sk: 'Prístav', bg: 'Pristanishte', bg_cyr: 'Пристанище', ru: 'Port', ru_cyr: 'Порт', uk: 'Port', uk_cyr: 'Порт', gender: 'm', tags: ['civic'] },
  { id: 'Mine', type: 'root', pl: 'Kopalnia', cs: 'Důl', sk: 'Baňa', bg: 'Mina', bg_cyr: 'Мина', ru: 'Shakhta', ru_cyr: 'Шахта', uk: 'Shakhta', uk_cyr: 'Шахта', gender: 'f', tags: ['civic'] },
  { id: 'Mill', type: 'root', pl: 'Młyn', cs: 'Mlýn', sk: 'Mlyn', bg: 'Vodenitsa', bg_cyr: 'Воденица', ru: 'Melnitsa', ru_cyr: 'Мельница', uk: 'Mlyn', uk_cyr: 'Млин', gender: 'f', tags: ['civic'] },
  { id: 'House', type: 'root', pl: 'Dom', cs: 'Dům', sk: 'Dom', bg: 'Dom', bg_cyr: 'Дом', ru: 'Dom', ru_cyr: 'Дом', uk: 'Dim', uk_cyr: 'Дім', gender: 'm', tags: ['civic'] },
  { id: 'Tower', type: 'root', pl: 'Wieża', cs: 'Věž', sk: 'Veža', bg: 'Kula', bg_cyr: 'Кула', ru: 'Bashnya', ru_cyr: 'Башня', uk: 'Vezha', uk_cyr: 'Вежа', gender: 'f', tags: ['civic'] },
  { id: 'Gate', type: 'root', pl: 'Brama', cs: 'Brána', sk: 'Brána', bg: 'Porta', bg_cyr: 'Порта', ru: 'Vorota', ru_cyr: 'Ворота', uk: 'Vorota', uk_cyr: 'Ворота', gender: 'n', tags: ['civic'] },
  { id: 'Road', type: 'root', pl: 'Droga', cs: 'Cesta', sk: 'Cesta', bg: 'Pat', bg_cyr: 'Път', ru: 'Doroga', ru_cyr: 'Дорога', uk: 'Doroha', uk_cyr: 'Дорога', gender: 'f', tags: ['civic'] },
  { id: 'Way', type: 'root', pl: 'Szlak', cs: 'Stezka', sk: 'Chodník', bg: 'Pateka', bg_cyr: 'Пътека', ru: 'Put', ru_cyr: 'Путь', uk: 'Shlyakh', uk_cyr: 'Шлях', gender: 'm', tags: ['civic'] },
  { id: 'Wall', type: 'root', pl: 'Mur', cs: 'Zeď', sk: 'Múr', bg: 'Stena', bg_cyr: 'Стена', ru: 'Stena', ru_cyr: 'Стена', uk: 'Stina', uk_cyr: 'Стіна', gender: 'f', tags: ['civic'] },
  { id: 'Square', type: 'root', pl: 'Plac', cs: 'Náměstí', sk: 'Námestie', bg: 'Ploshtad', bg_cyr: 'Площад', ru: 'Ploshchad', ru_cyr: 'Площадь', uk: 'Ploshcha', uk_cyr: 'Площа', gender: 'f', tags: ['civic'] },
  { id: 'Garden', type: 'root', pl: 'Ogród', cs: 'Zahrada', sk: 'Záhrada', bg: 'Gradina', bg_cyr: 'Градина', ru: 'Sad', ru_cyr: 'Сад', uk: 'Sad', uk_cyr: 'Сад', gender: 'm', tags: ['civic'] },
  
  // Nature / Terrain
  { id: 'Mountain', type: 'root', pl: 'Góra', cs: 'Hora', sk: 'Hora', bg: 'Planina', bg_cyr: 'Планина', ru: 'Gora', ru_cyr: 'Гора', uk: 'Hora', uk_cyr: 'Гора', gender: 'f', tags: ['nature'] },
  { id: 'Hill', type: 'root', pl: 'Wzgórze', cs: 'Chlum', sk: 'Kopec', bg: 'Halm', bg_cyr: 'Хълм', ru: 'Kholm', ru_cyr: 'Холм', uk: 'Pahorb', uk_cyr: 'Пагорб', gender: 'm', tags: ['nature'] },
  { id: 'River', type: 'root', pl: 'Rzeka', cs: 'Řeka', sk: 'Rieka', bg: 'Reka', bg_cyr: 'Река', ru: 'Reka', ru_cyr: 'Река', uk: 'Rika', uk_cyr: 'Ріка', gender: 'f', tags: ['nature'] },
  { id: 'Stream', type: 'root', pl: 'Potok', cs: 'Potok', sk: 'Potok', bg: 'Potok', bg_cyr: 'Поток', ru: 'Potok', ru_cyr: 'Поток', uk: 'Potik', uk_cyr: 'Потік', gender: 'm', tags: ['nature'] },
  { id: 'Forest', type: 'root', pl: 'Las', cs: 'Les', sk: 'Les', bg: 'Gora', bg_cyr: 'Гора', ru: 'Les', ru_cyr: 'Лес', uk: 'Lis', uk_cyr: 'Ліс', gender: 'm', tags: ['nature'] },
  { id: 'Field', type: 'root', pl: 'Pole', cs: 'Pole', sk: 'Pole', bg: 'Pole', bg_cyr: 'Поле', ru: 'Pole', ru_cyr: 'Поле', uk: 'Pole', uk_cyr: 'Поле', gender: 'n', tags: ['nature'] },
  { id: 'Meadow', type: 'root', pl: 'Łąka', cs: 'Louka', sk: 'Lúka', bg: 'Livada', bg_cyr: 'Ливада', ru: 'Lug', ru_cyr: 'Луг', uk: 'Luka', uk_cyr: 'Лука', gender: 'm', tags: ['nature'] },
  { id: 'Rock', type: 'root', pl: 'Skała', cs: 'Skála', sk: 'Skala', bg: 'Skala', bg_cyr: 'Скала', ru: 'Skala', ru_cyr: 'Скала', uk: 'Skelya', uk_cyr: 'Скеля', gender: 'f', tags: ['nature'] },
  { id: 'StoneRoot', type: 'root', pl: 'Kamień', cs: 'Kámen', sk: 'Kameň', bg: 'Kamak', bg_cyr: 'Камък', ru: 'Kamen', ru_cyr: 'Камень', uk: 'Kamin', uk_cyr: 'Камінь', gender: 'm', tags: ['nature'] },
  { id: 'Water', type: 'root', pl: 'Woda', cs: 'Voda', sk: 'Voda', bg: 'Voda', bg_cyr: 'Вода', ru: 'Voda', ru_cyr: 'Вода', uk: 'Voda', uk_cyr: 'Вода', gender: 'f', tags: ['nature'] },
  { id: 'Spring', type: 'root', pl: 'Zdrój', cs: 'Studánka', sk: 'Prameň', bg: 'Izvor', bg_cyr: 'Извор', ru: 'Klyuch', ru_cyr: 'Ключ', uk: 'Dzherelo', uk_cyr: 'Джерело', gender: 'm', tags: ['nature'] },
  { id: 'Valley', type: 'root', pl: 'Dolina', cs: 'Údolí', sk: 'Dolina', bg: 'Dolina', bg_cyr: 'Долина', ru: 'Dolina', ru_cyr: 'Долина', uk: 'Dolyna', uk_cyr: 'Долина', gender: 'f', tags: ['nature'] },
  { id: 'Lake', type: 'root', pl: 'Jezioro', cs: 'Jezero', sk: 'Jazero', bg: 'Ezero', bg_cyr: 'Езеро', ru: 'Ozero', ru_cyr: 'Озеро', uk: 'Ozero', uk_cyr: 'Озеро', gender: 'n', tags: ['nature'] },
  { id: 'Island', type: 'root', pl: 'Wyspa', cs: 'Ostrov', sk: 'Ostrov', bg: 'Ostrov', bg_cyr: 'Остров', ru: 'Ostrov', ru_cyr: 'Остров', uk: 'Ostriv', uk_cyr: 'Острів', gender: 'm', tags: ['nature'] },
  { id: 'Ford', type: 'root', pl: 'Bród', cs: 'Brod', sk: 'Brod', bg: 'Brod', bg_cyr: 'Брод', ru: 'Brod', ru_cyr: 'Брод', uk: 'Brid', uk_cyr: 'Брід', gender: 'm', tags: ['nature'] },
  { id: 'Bay', type: 'root', pl: 'Zatoka', cs: 'Záliv', sk: 'Záliv', bg: 'Zaliv', bg_cyr: 'Залив', ru: 'Zaliv', ru_cyr: 'Залив', uk: 'Zatok', uk_cyr: 'Заток', gender: 'm', tags: ['nature'] },
  { id: 'Cape', type: 'root', pl: 'Przylądek', cs: 'Mys', sk: 'Mys', bg: 'Nos', bg_cyr: 'Нос', ru: 'Mys', ru_cyr: 'Мыс', uk: 'Mys', uk_cyr: 'Мис', gender: 'm', tags: ['nature'] },
  { id: 'Grove', type: 'root', pl: 'Gaj', cs: 'Háj', sk: 'Háj', bg: 'Roshta', bg_cyr: 'Роща', ru: 'Roshcha', ru_cyr: 'Роща', uk: 'Hay', uk_cyr: 'Гай', gender: 'f', tags: ['nature'] },
  { id: 'Swamp', type: 'root', pl: 'Błoto', cs: 'Blato', sk: 'Močiar', bg: 'Blato', bg_cyr: 'Блато', ru: 'Boloto', ru_cyr: 'Болото', uk: 'Boloto', uk_cyr: 'Болото', gender: 'n', tags: ['nature'] },
  { id: 'Cliff', type: 'root', pl: 'Urwisko', cs: 'Útes', sk: 'Útes', bg: 'Skala', bg_cyr: 'Скала', ru: 'Utes', ru_cyr: 'Утес', uk: 'Skelya', uk_cyr: 'Скеля', gender: 'm', tags: ['nature'] },
  { id: 'Cave', type: 'root', pl: 'Jaskinia', cs: 'Jeskyně', sk: 'Jaskyňa', bg: 'Peshtera', bg_cyr: 'Пещера', ru: 'Peshchera', ru_cyr: 'Пещера', uk: 'Pechera', uk_cyr: 'Печера', gender: 'f', tags: ['nature'] },
  { id: 'Ravine', type: 'root', pl: 'Wąwóz', cs: 'Rokle', sk: 'Roklina', bg: 'Deres', bg_cyr: 'Дерес', ru: 'Ovrag', ru_cyr: 'Овраг', uk: 'Yar', uk_cyr: 'Яр', gender: 'm', tags: ['nature'] },
  { id: 'Sand', type: 'root', pl: 'Piasek', cs: 'Písek', sk: 'Piesok', bg: 'Pyasak', bg_cyr: 'Пясък', ru: 'Pesok', ru_cyr: 'Песок', uk: 'Pisok', uk_cyr: 'Пісок', gender: 'm', tags: ['nature'] },
  { id: 'Dust', type: 'root', pl: 'Pył', cs: 'Prach', sk: 'Prach', bg: 'Prah', bg_cyr: 'Прах', ru: 'Pyl', ru_cyr: 'Пыль', uk: 'Pyl', uk_cyr: 'Пил', gender: 'f', tags: ['nature'] },
  { id: 'Clay', type: 'root', pl: 'Glina', cs: 'Hlína', sk: 'Hlina', bg: 'Glina', bg_cyr: 'Глина', ru: 'Glina', ru_cyr: 'Глина', uk: 'Hlyna', uk_cyr: 'Глина', gender: 'f', tags: ['nature'] },
  { id: 'Mud', type: 'root', pl: 'Błoto', cs: 'Bahno', sk: 'Bahno', bg: 'Kal', bg_cyr: 'Кал', ru: 'Gryaz', ru_cyr: 'Грязь', uk: 'Bryud', uk_cyr: 'Бруд', gender: 'f', tags: ['nature'] },
  
  // Weather / Celestial
  { id: 'Sun', type: 'root', pl: 'Słońce', cs: 'Slunce', sk: 'Slnko', bg: 'Slantse', bg_cyr: 'Слънце', ru: 'Solntse', ru_cyr: 'Солнце', uk: 'Sontse', uk_cyr: 'Сонце', gender: 'n', tags: ['nature'] },
  { id: 'Moon', type: 'root', pl: 'Księżyc', cs: 'Měsíc', sk: 'Mesiac', bg: 'Luna', bg_cyr: 'Луна', ru: 'Luna', ru_cyr: 'Луна', uk: 'Misyats', uk_cyr: 'Місяць', gender: 'f', tags: ['nature'] },
  { id: 'Star', type: 'root', pl: 'Gwiazda', cs: 'Hvězda', sk: 'Hviezda', bg: 'Zvezda', bg_cyr: 'Звезда', ru: 'Zvezda', ru_cyr: 'Звезда', uk: 'Zirka', uk_cyr: 'Зірка', gender: 'f', tags: ['nature'] },
  { id: 'Wind', type: 'root', pl: 'Wiatr', cs: 'Vítr', sk: 'Vietor', bg: 'Vyatat', bg_cyr: 'Вятър', ru: 'Veter', ru_cyr: 'Ветер', uk: 'Viter', uk_cyr: 'Вітер', gender: 'm', tags: ['nature'] },
  { id: 'Snow', type: 'root', pl: 'Śnieg', cs: 'Sníh', sk: 'Sneh', bg: 'Snyag', bg_cyr: 'Сняг', ru: 'Sneg', ru_cyr: 'Снег', uk: 'Snih', uk_cyr: 'Сніг', gender: 'm', tags: ['nature'] },
  { id: 'Ice', type: 'root', pl: 'Lód', cs: 'Led', sk: 'Ľad', bg: 'Led', bg_cyr: 'Лед', ru: 'Led', ru_cyr: 'Лед', uk: 'Lid', uk_cyr: 'Лід', gender: 'm', tags: ['nature'] },
  { id: 'Fire', type: 'root', pl: 'Ogień', cs: 'Oheň', sk: 'Oheň', bg: 'Ogan', bg_cyr: 'Огън', ru: 'Ogon', ru_cyr: 'Огонь', uk: 'Vohony', uk_cyr: 'Вогонь', gender: 'm', tags: ['nature'] },
  { id: 'Ash', type: 'root', pl: 'Popiół', cs: 'Popel', sk: 'Popol', bg: 'Pepel', bg_cyr: 'Пепел', ru: 'Pepel', ru_cyr: 'Пепел', uk: 'Popil', uk_cyr: 'Попіл', gender: 'm', tags: ['nature'] },
  { id: 'Frost', type: 'root', pl: 'Mróz', cs: 'Mráz', sk: 'Mráz', bg: 'Mraz', bg_cyr: 'Мраз', ru: 'Moroz', ru_cyr: 'Мороз', uk: 'Moroz', uk_cyr: 'Мороз', gender: 'm', tags: ['nature'] },

  // Trees / Plants
  { id: 'Oak', type: 'root', pl: 'Dąb', cs: 'Dub', sk: 'Dub', bg: 'Dab', bg_cyr: 'Дъб', ru: 'Dub', ru_cyr: 'Дуб', uk: 'Dub', uk_cyr: 'Дуб', gender: 'm', tags: ['tree'] },
  { id: 'Lime', type: 'root', pl: 'Lipa', cs: 'Lípa', sk: 'Lipa', bg: 'Lipa', bg_cyr: 'Липа', ru: 'Lipa', ru_cyr: 'Липа', uk: 'Lypa', uk_cyr: 'Липа', gender: 'f', tags: ['tree'] },
  { id: 'Birch', type: 'root', pl: 'Brzoza', cs: 'Bříza', sk: 'Breza', bg: 'Breza', bg_cyr: 'Бреза', ru: 'Bereza', ru_cyr: 'Береза', uk: 'Bereza', uk_cyr: 'Береза', gender: 'f', tags: ['tree'] },
  { id: 'Pine', type: 'root', pl: 'Sosna', cs: 'Borovice', sk: 'Borovica', bg: 'Bor', bg_cyr: 'Бор', ru: 'Sosna', ru_cyr: 'Сосна', uk: 'Sosna', uk_cyr: 'Сосна', gender: 'f', tags: ['tree'] },
  { id: 'Spruce', type: 'root', pl: 'Świerk', cs: 'Smrk', sk: 'Smrek', bg: 'Smarch', bg_cyr: 'Смърч', ru: 'El', ru_cyr: 'Ель', uk: 'Smyreka', uk_cyr: 'Смерека', gender: 'f', tags: ['tree'] },
  { id: 'Willow', type: 'root', pl: 'Wierzba', cs: 'Vrba', sk: 'Vŕba', bg: 'Varba', bg_cyr: 'Върба', ru: 'Iva', ru_cyr: 'Ива', uk: 'Verba', uk_cyr: 'Верба', gender: 'f', tags: ['tree'] },
  { id: 'Poplar', type: 'root', pl: 'Topola', cs: 'Topol', sk: 'Topoľ', bg: 'Topola', bg_cyr: 'Топола', ru: 'Topol', ru_cyr: 'Тополь', uk: 'Topolya', uk_cyr: 'Тополя', gender: 'm', tags: ['tree'] },
  { id: 'Maple', type: 'root', pl: 'Klon', cs: 'Javor', sk: 'Javor', bg: 'Yavor', bg_cyr: 'Явор', ru: 'Klen', ru_cyr: 'Клен', uk: 'Klen', uk_cyr: 'Клен', gender: 'm', tags: ['tree'] },
  { id: 'Apple', type: 'root', pl: 'Jabłoń', cs: 'Jabloň', sk: 'Jabloň', bg: 'Yabalka', bg_cyr: 'Ябълка', ru: 'Yablonya', ru_cyr: 'Яблоня', uk: 'Yablunya', uk_cyr: 'Яблуня', gender: 'f', tags: ['tree'] },
  { id: 'Cherry', type: 'root', pl: 'Wiśnia', cs: 'Višeň', sk: 'Višňa', bg: 'Vishna', bg_cyr: 'Вишна', ru: 'Vishnya', ru_cyr: 'Вишня', uk: 'Vyshnya', uk_cyr: 'Вишня', gender: 'f', tags: ['tree'] },
  { id: 'Aspen', type: 'root', pl: 'Osika', cs: 'Osika', sk: 'Osika', bg: 'Osika', bg_cyr: 'Осика', ru: 'Osina', ru_cyr: 'Осина', uk: 'Osyna', uk_cyr: 'Осика', gender: 'f', tags: ['tree'] },
  { id: 'Alder', type: 'root', pl: 'Olcha', cs: 'Olše', sk: 'Jelša', bg: 'Elha', bg_cyr: 'Елха', ru: 'Olha', ru_cyr: 'Ольха', uk: 'Vilkha', uk_cyr: 'Вільха', gender: 'f', tags: ['tree'] },
  { id: 'Wheat', type: 'root', pl: 'Pszenica', cs: 'Pšenice', sk: 'Pšenica', bg: 'Pshenitsa', bg_cyr: 'Пшеница', ru: 'Pshenitsa', ru_cyr: 'Пшеница', uk: 'Pshenystya', uk_cyr: 'Пшениця', gender: 'f', tags: ['tree'] },

  // Animals
  { id: 'Wolf', type: 'root', pl: 'Wilk', cs: 'Vlk', sk: 'Vlk', bg: 'Valk', bg_cyr: 'Вълк', ru: 'Volk', ru_cyr: 'Волк', uk: 'Vovk', uk_cyr: 'Вовк', gender: 'm', tags: ['animal'] },
  { id: 'Bear', type: 'root', pl: 'Niedźwiedź', cs: 'Medvěd', sk: 'Medveď', bg: 'Mechka', bg_cyr: 'Мечка', ru: 'Medved', ru_cyr: 'Медведь', uk: 'Vedmid', uk_cyr: 'Ведмідь', gender: 'm', tags: ['animal'] },
  { id: 'Fox', type: 'root', pl: 'Lis', cs: 'Liška', sk: 'Líška', bg: 'Lisitsa', bg_cyr: 'Лисица', ru: 'Lisa', ru_cyr: 'Лиса', uk: 'Lys', uk_cyr: 'Лис', gender: 'f', tags: ['animal'] },
  { id: 'Eagle', type: 'root', pl: 'Orzeł', cs: 'Orel', sk: 'Orol', bg: 'Orel', bg_cyr: 'Орел', ru: 'Orel', ru_cyr: 'Орел', uk: 'Orel', uk_cyr: 'Орел', gender: 'm', tags: ['animal'] },
  { id: 'Falcon', type: 'root', pl: 'Sokół', cs: 'Sokol', sk: 'Sokol', bg: 'Sokol', bg_cyr: 'Сокол', ru: 'Sokol', ru_cyr: 'Сокол', uk: 'Sokil', uk_cyr: 'Сокіл', gender: 'm', tags: ['animal'] },
  { id: 'Beaver', type: 'root', pl: 'Bóbr', cs: 'Bobr', sk: 'Bobor', bg: 'Bobar', bg_cyr: 'Бобър', ru: 'Bobr', ru_cyr: 'Бобр', uk: 'Bober', uk_cyr: 'Бобер', gender: 'm', tags: ['animal'] },
  { id: 'Swan', type: 'root', pl: 'Łabędź', cs: 'Labuť', sk: 'Labuť', bg: 'Lebed', bg_cyr: 'Лебед', ru: 'Lebed', ru_cyr: 'Лебедь', uk: 'Lebid', uk_cyr: 'Лебідь', gender: 'm', tags: ['animal'] },
  { id: 'Horse', type: 'root', pl: 'Koń', cs: 'Kůň', sk: 'Kôň', bg: 'Kon', bg_cyr: 'Кон', ru: 'Kon', ru_cyr: 'Конь', uk: 'Kin', uk_cyr: 'Кінь', gender: 'm', tags: ['animal'] },
  { id: 'Bull', type: 'root', pl: 'Byk', cs: 'Býk', sk: 'Býk', bg: 'Bik', bg_cyr: 'Бик', ru: 'Byk', ru_cyr: 'Бык', uk: 'Byk', uk_cyr: 'Бик', gender: 'm', tags: ['animal'] },
  { id: 'Crow', type: 'root', pl: 'Wrona', cs: 'Vrána', sk: 'Vrana', bg: 'Vrana', bg_cyr: 'Врана', ru: 'Vorona', ru_cyr: 'Ворона', uk: 'Vorona', uk_cyr: 'Ворона', gender: 'f', tags: ['animal'] },
  { id: 'Hare', type: 'root', pl: 'Zając', cs: 'Zajíc', sk: 'Zajac', bg: 'Zayek', bg_cyr: 'Заек', ru: 'Zayats', ru_cyr: 'Заяц', uk: 'Zayets', uk_cyr: 'Заєць', gender: 'm', tags: ['animal'] },
  { id: 'Cat', type: 'root', pl: 'Kot', cs: 'Kocour', sk: 'Kocúr', bg: 'Kotka', bg_cyr: 'Котка', ru: 'Kot', ru_cyr: 'Кот', uk: 'Kit', uk_cyr: 'Кіт', gender: 'm', tags: ['animal'] },
  { id: 'Dog', type: 'root', pl: 'Pies', cs: 'Pes', sk: 'Pes', bg: 'Kuche', bg_cyr: 'Куче', ru: 'Pes', ru_cyr: 'Пес', uk: 'Pes', uk_cyr: 'Пес', gender: 'm', tags: ['animal'] },

  // Professions / People
  { id: 'Fisher', type: 'root', pl: 'Rybak', cs: 'Rybář', sk: 'Rybár', bg: 'Ribar', bg_cyr: 'Рибар', ru: 'Rybak', ru_cyr: 'Рыбак', uk: 'Rybalka', uk_cyr: 'Рибалка', gender: 'm', tags: ['civic'] },
  { id: 'Smith', type: 'root', pl: 'Kowal', cs: 'Kovář', sk: 'Kováč', bg: 'Kovach', bg_cyr: 'Ковач', ru: 'Kuznets', ru_cyr: 'Кузнец', uk: 'Koval', uk_cyr: 'Коваль', gender: 'm', tags: ['civic'] },
  { id: 'Miller', type: 'root', pl: 'Młynarz', cs: 'Mlynář', sk: 'Mlynár', bg: 'Melni', bg_cyr: 'Мелни', ru: 'Melnik', ru_cyr: 'Мельник', uk: 'Miroshnyk', uk_cyr: 'Мірошник', gender: 'm', tags: ['civic'] },
  { id: 'Priest', type: 'root', pl: 'Ksiądz', cs: 'Kněz', sk: 'Kňaz', bg: 'Pop', bg_cyr: 'Поп', ru: 'Pop', ru_cyr: 'Поп', uk: 'Pip', uk_cyr: 'Піп', gender: 'm', tags: ['civic'] },
  { id: 'King', type: 'root', pl: 'Król', cs: 'Král', sk: 'Kráľ', bg: 'Kral', bg_cyr: 'Крал', ru: 'Korol', ru_cyr: 'Король', uk: 'Korol', uk_cyr: 'Король', gender: 'm', tags: ['civic'] },
  { id: 'Prince', type: 'root', pl: 'Książę', cs: 'Kníže', sk: 'Knieža', bg: 'Knyaz', bg_cyr: 'Княз', ru: 'Knyaz', ru_cyr: 'Князь', uk: 'Knyaz', uk_cyr: 'Князь', gender: 'm', tags: ['civic'] },

  // ==========================
  // MISSING CZECH ROOTS
  // ==========================
  // "Lhota" is a very common Czech village name meaning "grace period" (tax exemption)
  { id: 'Lhota', type: 'root', cs: 'Lhota', sk: 'Lehota', pl: 'Ligota', tags: ['civic'] },
  // "Újezd" means "encirclement" (land ridden around on horseback)
  { id: 'Ujezd', type: 'root', cs: 'Újezd', tags: ['civic'] },
  // "Týn" is an archaic word for a fenced settlement (cognate with Town)
  { id: 'Tyn', type: 'root', cs: 'Týn', tags: ['civic'] },
  // "Brod" (Ford) is in the dict, but often appears as a suffix in Czech (Havlíčkův Brod)
  // "Vary" (Boiling/Springs) - essential for Karlovy Vary
  { id: 'Vary', type: 'root', cs: 'Vary', tags: ['nature'] },
  // "Chlum" (Wooded Hill)
  { id: 'Chlum', type: 'root', cs: 'Chlum', tags: ['nature'] },
  // "Stráň" (Slope/Hillside)
  { id: 'Stran', type: 'root', cs: 'Stráň', sk: 'Stráň', tags: ['nature'] },

  // Abstract / Stems (for affixing)
  { id: 'Peace', type: 'stem', pl: 'Mir', cs: 'Mír', sk: 'Mier', bg: 'Mir', bg_cyr: 'Мир', ru: 'Mir', ru_cyr: 'Мир', uk: 'Myr', uk_cyr: 'Мир' },
  { id: 'Glory', type: 'stem', pl: 'Sław', cs: 'Slav', sk: 'Slav', bg: 'Slav', bg_cyr: 'Слав', ru: 'Slav', ru_cyr: 'Слав', uk: 'Slav', uk_cyr: 'Слав' },
  { id: 'God', type: 'stem', pl: 'Bog', cs: 'Boh', sk: 'Boh', bg: 'Bog', bg_cyr: 'Бог', ru: 'Bog', ru_cyr: 'Бог', uk: 'Boh', uk_cyr: 'Бог' },
  { id: 'Dear', type: 'stem', pl: 'Mił', cs: 'Mil', sk: 'Mil', bg: 'Mil', bg_cyr: 'Мил', ru: 'Mil', ru_cyr: 'Мил', uk: 'Myl', uk_cyr: 'Мил' },
  { id: 'Gift', type: 'stem', pl: 'Dar', cs: 'Dar', sk: 'Dar', bg: 'Dar', bg_cyr: 'Дар', ru: 'Dar', ru_cyr: 'Дар', uk: 'Dar', uk_cyr: 'Дар' },
  { id: 'Lub', type: 'stem', pl: 'Lub', cs: 'Lub', sk: 'Ľub', bg: 'Lyub', bg_cyr: 'Люб', ru: 'Lyub', ru_cyr: 'Люб', uk: 'Lyub', uk_cyr: 'Люб' }, 
  { id: 'Rad', type: 'stem', pl: 'Rad', cs: 'Rad', sk: 'Rad', bg: 'Rad', bg_cyr: 'Рад', ru: 'Rad', ru_cyr: 'Рад', uk: 'Rad', uk_cyr: 'Рад' }, 
  { id: 'Jar', type: 'stem', pl: 'Jar', cs: 'Jar', sk: 'Jar', bg: 'Yar', bg_cyr: 'Яр', ru: 'Yar', ru_cyr: 'Яр', uk: 'Yar', uk_cyr: 'Яр' }, 
  { id: 'Bor', type: 'stem', pl: 'Bor', cs: 'Bor', sk: 'Bor', bg: 'Bor', bg_cyr: 'Бор', ru: 'Bor', ru_cyr: 'Бор', uk: 'Bor', uk_cyr: 'Бор' }, // Pine forest
  { id: 'Vlad', type: 'stem', pl: 'Wład', cs: 'Vlad', sk: 'Vlad', bg: 'Vlad', bg_cyr: 'Влад', ru: 'Vlad', ru_cyr: 'Влад', uk: 'Volod', uk_cyr: 'Волод' }, // Rule
  { id: 'Svet', type: 'stem', pl: 'Świat', cs: 'Světl', sk: 'Svet', bg: 'Svet', bg_cyr: 'Свет', ru: 'Svet', ru_cyr: 'Свет', uk: 'Svit', uk_cyr: 'Світ' }, // Light/World
  { id: 'Dob', type: 'stem', pl: 'Dob', cs: 'Dob', sk: 'Dob', bg: 'Dob', bg_cyr: 'Доб', ru: 'Dob', ru_cyr: 'Доб', uk: 'Dob', uk_cyr: 'Доб' }, // Good
  { id: 'Bel', type: 'stem', pl: 'Biał', cs: 'Běl', sk: 'Bel', bg: 'Bel', bg_cyr: 'Бел', ru: 'Bel', ru_cyr: 'Бел', uk: 'Bil', uk_cyr: 'Біл' }, // White stem
  
  // Specific Place Stems
  { id: 'Warsz', type: 'stem', pl: 'Warsz' },
  { id: 'Krak', type: 'stem', pl: 'Krak' },
  { id: 'Pozn', type: 'stem', pl: 'Pozn' },
  { id: 'Wroc', type: 'stem', pl: 'Wroc' },
  { id: 'Szczec', type: 'stem', pl: 'Szczec' },
  { id: 'Gdan', type: 'stem', pl: 'Gdań' },
  { id: 'Brn', type: 'stem', cs: 'Brn', sk: 'Brn' },
  { id: 'Ost', type: 'stem', cs: 'Ost', sk: 'Ost' },
  { id: 'Plz', type: 'stem', cs: 'Plz' },
  { id: 'Lib', type: 'stem', cs: 'Lib' },
  { id: 'Mosk', type: 'stem', ru: 'Mosk', ru_cyr: 'Моск', uk: 'Mosk', uk_cyr: 'Моск', bg: 'Mosk', bg_cyr: 'Моск' },
  { id: 'Kyiv', type: 'stem', ru: 'Ki', ru_cyr: 'Ки', uk: 'Ky', uk_cyr: 'Ки' },
  { id: 'Khark', type: 'stem', ru: 'Khark', ru_cyr: 'Харьк', uk: 'Khark', uk_cyr: 'Харк' },
  { id: 'Vlad', type: 'stem', ru: 'Vlad', ru_cyr: 'Влад', uk: 'Vlad', uk_cyr: 'Влад', bg: 'Vlad', bg_cyr: 'Влад' },
  { id: 'Sof', type: 'stem', bg: 'Sof', bg_cyr: 'Соф' },
  { id: 'Plov', type: 'stem', bg: 'Plov', bg_cyr: 'Плов' },
  { id: 'Varn', type: 'stem', bg: 'Varn', bg_cyr: 'Варн' },

  // ==========================
  // MISSING POLISH STEMS
  // ==========================
  { id: 'Byd', type: 'stem', pl: 'Byd', tags: ['civic'] }, // Bydgoszcz
  { id: 'Kat', type: 'stem', pl: 'Kat', tags: ['civic'] }, // Katowice
  { id: 'Lub', type: 'stem', pl: 'Lub', tags: ['civic'] }, // Lublin
  { id: 'Rzesz', type: 'stem', pl: 'Rzesz', tags: ['civic'] }, // Rzeszów
  { id: 'Gdyn', type: 'stem', pl: 'Gdyn', tags: ['civic'] }, // Gdynia
  { id: 'Czest', type: 'stem', pl: 'Częst', tags: ['civic'] }, // Częstochowa
  { id: 'Rad', type: 'stem', pl: 'Rad', tags: ['civic'] }, // Radom
  { id: 'Kiel', type: 'stem', pl: 'Kiel', tags: ['civic'] }, // Kielce
  { id: 'Tor', type: 'stem', pl: 'Tor', tags: ['civic'] }, // Toruń
  { id: 'Olsz', type: 'stem', pl: 'Olsz', tags: ['civic'] }, // Olsztyn
  // "Wola" is a very common Polish toponym (Will/Freedom/Settlement)
  { id: 'Wola', type: 'root', pl: 'Wola', tags: ['civic'] },

    // ==========================
  // ADDED BULGARIAN ROOTS/STEMS
  // ==========================
  { id: 'Stara', type: 'root', bg: 'Stara', bg_cyr: 'Стара', tags: ['civic', 'nature'] }, // Old (often in place names)
  { id: 'Veliko', type: 'root', bg: 'Veliko', bg_cyr: 'Велико', tags: ['civic'] }, // Great (often in place names)
  { id: 'Gorno', type: 'root', bg: 'Gorno', bg_cyr: 'Горно', tags: ['civic', 'nature'] }, // Upper
  { id: 'Dolno', type: 'root', bg: 'Dolno', bg_cyr: 'Долно', tags: ['civic', 'nature'] }, // Lower
  { id: 'Balkan', type: 'root', bg: 'Balkan', bg_cyr: 'Балкан', tags: ['nature'] }, // Balkan Mountains
  { id: 'Rila', type: 'root', bg: 'Rila', bg_cyr: 'Рила', tags: ['nature'] }, // Rila Mountains
  { id: 'Pirin', type: 'root', bg: 'Pirin', bg_cyr: 'Пирин', tags: ['nature'] }, // Pirin Mountains
  { id: 'Shipka', type: 'root', bg: 'Shipka', bg_cyr: 'Шипка', tags: ['nature'] }, // Shipka Pass/Mountain

  // ==========================
  // ADDED SLOVAK ROOTS/STEMS
  // ==========================
  { id: 'Bratislav', type: 'stem', sk: 'Bratislav', tags: ['civic'] }, // Bratislava
  { id: 'Kosic', type: 'stem', sk: 'Košíc', tags: ['civic'] }, // Košice
  { id: 'Presov', type: 'stem', sk: 'Prešov', tags: ['civic'] }, // Prešov
  { id: 'Liptov', type: 'stem', sk: 'Liptov', tags: ['civic', 'nature'] }, // Liptov region
  { id: 'Zvolen', type: 'stem', sk: 'Zvolen', tags: ['civic'] }, // Zvolen
  { id: 'NitraCity', type: 'stem', sk: 'Nitra', tags: ['civic'] }, // Nitra
  { id: 'Tatry', type: 'root', sk: 'Tatry', tags: ['nature'] }, // Tatra Mountains (plural, but used as a root)

  // ==========================
  // SUFFIXES
  // ==========================
  { id: 'suf_ov', type: 'suffix', pl: 'ów', cs: 'ov', sk: 'ov', bg: 'ov', bg_cyr: 'ов', ru: 'ov', ru_cyr: 'ов', uk: 'iv', uk_cyr: 'ів' },
  { id: 'suf_in', type: 'suffix', pl: 'in', cs: 'ín', sk: 'ín', bg: 'in', bg_cyr: 'ин', ru: 'in', ru_cyr: 'ин', uk: 'yn', uk_cyr: 'ин' },
  { id: 'suf_ice', type: 'suffix', pl: 'ice', cs: 'ice', sk: 'ice', bg: 'itsi', bg_cyr: 'ици', ru: 'itsy', ru_cyr: 'ицы', uk: 'ytsi', uk_cyr: 'иці' },
  { id: 'suf_sk', type: 'suffix', pl: 'sk', cs: 'sko', sk: 'sko', bg: 'sko', bg_cyr: 'ско', ru: 'sk', ru_cyr: 'ск', uk: 'sk', uk_cyr: 'ськ' },
  { id: 'suf_no', type: 'suffix', pl: 'no', cs: 'no', sk: 'no', bg: 'no', bg_cyr: 'но', ru: 'no', ru_cyr: 'но', uk: 'ne', uk_cyr: 'не' },
  { id: 'suf_ec', type: 'suffix', pl: 'ec', cs: 'ec', sk: 'ec', bg: 'ets', bg_cyr: 'ец', ru: 'ets', ru_cyr: 'ец', uk: 'ets', uk_cyr: 'ець' },
  { id: 'suf_ka', type: 'suffix', pl: 'ka', cs: 'ka', sk: 'ka', bg: 'ka', bg_cyr: 'ка', ru: 'ka', ru_cyr: 'ка', uk: 'ka', uk_cyr: 'ка' },
  { id: 'suf_na', type: 'suffix', pl: 'na', cs: 'ná', sk: 'na', bg: 'na', bg_cyr: 'на', ru: 'naya', ru_cyr: 'ная', uk: 'na', uk_cyr: 'на' },
  { id: 'suf_ev', type: 'suffix', pl: 'ew', cs: 'ev', sk: 'ev', bg: 'ev', bg_cyr: 'ев', ru: 'ev', ru_cyr: 'ев', uk: 'iv', uk_cyr: 'ів' },
  { id: 'suf_vk', type: 'suffix', pl: 'wka', cs: 'vka', sk: 'vka', bg: 'vka', bg_cyr: 'вка', ru: 'vka', ru_cyr: 'вка', uk: 'vka', uk_cyr: 'вка' },
  { id: 'suf_grad', type: 'suffix', bg: 'grad', bg_cyr: 'град', ru: 'grad', ru_cyr: 'град' },
  { id: 'suf_vo', type: 'suffix', bg: 'vo', bg_cyr: 'во', ru: 'vo', ru_cyr: 'во' },
  { id: 'suf_ovo', type: 'suffix', pl: 'owo', cs: 'ovo', sk: 'ovo', bg: 'ovo', bg_cyr: 'ово', ru: 'ovo', ru_cyr: 'ово', uk: 'ovo', uk_cyr: 'ово', gender: 'n' },
  { id: 'suf_nik', type: 'suffix', pl: 'nik', cs: 'ník', sk: 'ník', bg: 'nik', bg_cyr: 'ник', ru: 'nik', ru_cyr: 'ник', uk: 'nyk', uk_cyr: 'ник', gender: 'm' },
  { id: 'suf_nica', type: 'suffix', pl: 'nica', cs: 'nice', sk: 'nica', bg: 'nica', bg_cyr: 'ница', ru: 'nitsa', ru_cyr: 'ница', uk: 'nytsia', uk_cyr: 'ниця', gender: 'f' },
  { id: 'suf_ishte', type: 'suffix', pl: 'iszcze', cs: 'iště', sk: 'ište', bg: 'ishte', bg_cyr: 'ище', ru: 'ishche', ru_cyr: 'ище', uk: 'yshche', uk_cyr: 'ище', gender: 'n' },
  { id: 'suf_ina', type: 'suffix', pl: 'ina', cs: 'ina', sk: 'ina', bg: 'ina', bg_cyr: 'ина', ru: 'ina', ru_cyr: 'ина', uk: 'yna', uk_cyr: 'ина', gender: 'f' },
  { id: 'suf_ki', type: 'suffix', pl: 'ki', cs: 'ky', sk: 'ky', bg: 'ki', bg_cyr: 'ки', ru: 'ki', ru_cyr: 'ки', uk: 'ky', uk_cyr: 'ки', tags: ['plural_locative'] },
  { id: 'suf_a_fem_nom', type: 'suffix', pl: 'a', cs: 'á', sk: 'a', bg: 'a', bg_cyr: 'а', ru: 'a', ru_cyr: 'а', uk: 'a', uk_cyr: 'а', gender: 'f' },
  { id: 'suf_ie', type: 'suffix', pl: 'ie', cs: 'í', sk: 'ie', bg: 'e', bg_cyr: 'е', ru: 'ye', ru_cyr: 'ье', uk: 'ie', uk_cyr: 'є', gender: 'n' },
  { id: 'suf_ysko', type: 'suffix', pl: 'ysko', cs: 'isko', sk: 'isko', bg: 'isko', bg_cyr: 'иско', ru: 'ysko', ru_cyr: 'ыско', uk: 'ysko', uk_cyr: 'исько', gender: 'n' },

  // ==========================
  // RIVERS
  // ==========================
  { id: 'Vltava', type: 'river', cs: 'Vltavou' },
  { id: 'Elbe', type: 'river', cs: 'Labem' },
  { id: 'Morava', type: 'river', cs: 'Moravou', sk: 'Moravou' },
  { id: 'Odra', type: 'river', cs: 'Odrou', pl: 'Odrą' },
  { id: 'Vistula', type: 'river', pl: 'Wisłą' },
  { id: 'Warta', type: 'river', pl: 'Wartą' },
  { id: 'Volga', type: 'river', ru: 'Volgoy', ru_cyr: 'Волгой' },
  { id: 'Don', type: 'river', ru: 'Donom', ru_cyr: 'Доном' },
  { id: 'Dnipro', type: 'river', uk: 'Dniprom', uk_cyr: 'Дніпром' },
  { id: 'Desna', type: 'river', uk: 'Desnoyu', uk_cyr: 'Десною' },
  { id: 'Danube', type: 'river', bg: 'Dunav', bg_cyr: 'Дунав', sk: 'Dunajom' },
  { id: 'Maritsa', type: 'river', bg: 'Maritsa', bg_cyr: 'Марица' },

  // ==========================
  // MISSING LOCAL RIVERS
  // ==========================
  { id: 'Ohre', type: 'river', cs: 'Ohří' },
  { id: 'Sazava', type: 'river', cs: 'Sázavou' },
  { id: 'Berounka', type: 'river', cs: 'Berounkou' },
  { id: 'Svratka', type: 'river', cs: 'Svratkou' },
  { id: 'Jizera', type: 'river', cs: 'Jizerou' },
  { id: 'Bug', type: 'river', pl: 'Bugiem', uk: 'Buhom', uk_cyr: 'Бугом' },
  { id: 'San', type: 'river', pl: 'Sanem' },
  { id: 'Narew', type: 'river', pl: 'Narwią' },
  { id: 'Pilica', type: 'river', pl: 'Pilicą' },
  { id: 'Hron', type: 'river', sk: 'Hronom' },
  { id: 'Vah', type: 'river', sk: 'Váhom' },
  { id: 'NitraRiver', type: 'river', sk: 'Nitrou' },
  { id: 'Hornad', type: 'river', sk: 'Hornádom' },
  { id: 'Iskar', type: 'river', bg: 'Iskar', bg_cyr: 'Искър' },
  { id: 'Struma', type: 'river', bg: 'Struma', bg_cyr: 'Струма' },
  { id: 'Tundzha', type: 'river', bg: 'Tundzha', bg_cyr: 'Тунджа' },


  // ==========================
  // COUNTRY SUFFIXES
  // ==========================
  { id: 'landia', type: 'country_suffix', pl: 'landia', cs: 'land', sk: 'land', bg: 'landiya', bg_cyr: 'ландия', ru: 'landiya', ru_cyr: 'ландия', uk: 'landiya', uk_cyr: 'ландія' },
  { id: 'sko', type: 'country_suffix', pl: 'ska', cs: 'sko', sk: 'sko', bg: 'sko', bg_cyr: 'ско', ru: 'stan', ru_cyr: 'стан', uk: 'stan', uk_cyr: 'стан' },
  { id: 'ia', type: 'country_suffix', pl: 'ia', cs: 'ie', sk: 'ia', bg: 'iya', bg_cyr: 'ия', ru: 'iya', ru_cyr: 'ия', uk: 'iya', uk_cyr: 'ія' },
  { id: 'stan', type: 'country_suffix', pl: 'stan', cs: 'stán', sk: 'stan', bg: 'stan', bg_cyr: 'стан', ru: 'stan', ru_cyr: 'стан', uk: 'stan', uk_cyr: 'стан' },
  { id: 'raj', type: 'country_suffix', pl: 'raj', cs: 'ráj', sk: 'raj', tags: ['civic'] }, // e.g., Polskaraj? (Rare but in old dict)
];
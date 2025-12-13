
export interface ArabicComponent {
  id: string;
  ar: string;
  rom: string; // Standard Romanization
  type: 'head' | 'root' | 'adjective' | 'suffix' | 'country_suffix';
  gender?: 'm' | 'f'; // m = masculine, f = feminine
  sun?: boolean; // true if it starts with a sun letter
  tags?: string[]; // 'egypt', 'levant', 'gulf', 'maghreb', 'nature', 'civic'
}

export const AR_HEADS: ArabicComponent[] = [
  // Geographic / Settlement Heads
  { id: 'Jebel', ar: 'جبل', rom: 'Jebel', type: 'head', gender: 'm' }, // Mountain
  { id: 'Wadi', ar: 'وادي', rom: 'Wadi', type: 'head', gender: 'm' }, // Valley
  { id: 'Tel', ar: 'تل', rom: 'Tel', type: 'head', gender: 'm' }, // Hill
  { id: 'Ras', ar: 'رأس', rom: 'Ras', type: 'head', gender: 'm' }, // Head/Cape
  { id: 'Ain', ar: 'عين', rom: 'Ain', type: 'head', gender: 'f' }, // Spring/Eye
  { id: 'Bir', ar: 'بئر', rom: 'Bir', type: 'head', gender: 'f' }, // Well
  { id: 'Bahr', ar: 'بحر', rom: 'Bahr', type: 'head', gender: 'm' }, // Sea
  { id: 'Nahr', ar: 'نهر', rom: 'Nahr', type: 'head', gender: 'm' }, // River
  { id: 'Kafr', ar: 'كفر', rom: 'Kafr', type: 'head', gender: 'm', tags: ['egypt', 'levant'] }, // Village
  { id: 'Deir', ar: 'دير', rom: 'Deir', type: 'head', gender: 'm' }, // Monastery
  { id: 'Beit', ar: 'بيت', rom: 'Beit', type: 'head', gender: 'm' }, // House
  { id: 'Dar', ar: 'دار', rom: 'Dar', type: 'head', gender: 'f' }, // House/Abode
  { id: 'Qasr', ar: 'قصر', rom: 'Qasr', type: 'head', gender: 'm' }, // Palace/Castle
  { id: 'Burj', ar: 'برج', rom: 'Burj', type: 'head', gender: 'm' }, // Tower
  { id: 'Marsa', ar: 'مرسى', rom: 'Marsa', type: 'head', gender: 'm' }, // Marina/Port
  { id: 'Mina', ar: 'ميناء', rom: 'Mina', type: 'head', gender: 'm' }, // Port
  { id: 'Souq', ar: 'سوق', rom: 'Souq', type: 'head', gender: 'm' }, // Market
  { id: 'Hayy', ar: 'حي', rom: 'Hayy', type: 'head', gender: 'm' }, // Neighborhood
  { id: 'Khor', ar: 'خور', rom: 'Khor', type: 'head', gender: 'm', tags: ['gulf'] }, // Creek/Inlet
  { id: 'Jazirat', ar: 'جزيرة', rom: 'Jazirat', type: 'head', gender: 'f' }, // Island (Construct state)
  { id: 'Madinat', ar: 'مدينة', rom: 'Madinat', type: 'head', gender: 'f' }, // City (Construct state)
  { id: 'Qaryat', ar: 'قرية', rom: 'Qaryat', type: 'head', gender: 'f' }, // Village (Construct state)
  { id: 'Ezbet', ar: 'عزبة', rom: 'Ezbet', type: 'head', gender: 'f', tags: ['egypt'] }, // Hamlet/Estate
  { id: 'Nazlet', ar: 'نزلة', rom: 'Nazlet', type: 'head', gender: 'f', tags: ['egypt'] }, // Descent/Settlement
  { id: 'Khirbet', ar: 'خربة', rom: 'Khirbet', type: 'head', gender: 'f', tags: ['levant'] }, // Ruin
  { id: 'Oued', ar: 'وادي', rom: 'Oued', type: 'head', gender: 'm', tags: ['maghreb'] }, // River (Maghrebi)
  { id: 'Beni', ar: 'بني', rom: 'Beni', type: 'head', gender: 'm' }, // Sons of / Tribe
  { id: 'Umm', ar: 'أم', rom: 'Umm', type: 'head', gender: 'f' }, // Mother of
  { id: 'Abu', ar: 'أبو', rom: 'Abu', type: 'head', gender: 'm' }, // Father of
  { id: 'Bab', ar: 'باب', rom: 'Bab', type: 'head', gender: 'm' }, // Gate
  { id: 'Jisr', ar: 'جسر', rom: 'Jisr', type: 'head', gender: 'm' }, // Bridge
  { id: 'Shatt', ar: 'شط', rom: 'Shatt', type: 'head', gender: 'm', sun: true }, // Beach/Bank
  { id: 'Mashra', ar: 'مشرع', rom: 'Mashra', type: 'head', gender: 'm' }, // Watering place
  { id: 'Manzil', ar: 'منزل', rom: 'Manzil', type: 'head', gender: 'm' }, // House/Stop
  { id: 'Hisn', ar: 'حصن', rom: 'Hisn', type: 'head', gender: 'm' }, // Fort
  { id: 'Qala', ar: 'قلعة', rom: 'Qala', type: 'head', gender: 'f' }, // Citadel
  { id: 'Riba', ar: 'ربى', rom: 'Riba', type: 'head', gender: 'f' }, // Highlands
  { id: 'Hazm', ar: 'حزم', rom: 'Hazm', type: 'head', gender: 'm' }, // Rough ground
  { id: 'Dhahr', ar: 'ظهر', rom: 'Dhahr', type: 'head', gender: 'm' }, // Ridge/Back
  { id: 'Khashm', ar: 'خشم', rom: 'Khashm', type: 'head', gender: 'm' }, // Snout/Promontory
  { id: 'Anf', ar: 'أنف', rom: 'Anf', type: 'head', gender: 'm' }, // Nose/Headland
  { id: 'Lisan', ar: 'لسان', rom: 'Lisan', type: 'head', gender: 'm' }, // Tongue/Strip
  { id: 'Sadr', ar: 'صدر', rom: 'Sadr', type: 'head', gender: 'm', sun: true }, // Chest/Front
  { id: 'Qalb', ar: 'قلب', rom: 'Qalb', type: 'head', gender: 'm' }, // Heart/Center
  { id: 'Darb', ar: 'درب', rom: 'Darb', type: 'head', gender: 'm', sun: true }, // Path
  { id: 'Tariq', ar: 'طريق', rom: 'Tariq', type: 'head', gender: 'm', sun: true }, // Road
  { id: 'Sikka', ar: 'سكة', rom: 'Sikka', type: 'head', gender: 'f', sun: true }, // Way/Rail
  { id: 'Mahatta', ar: 'محطة', rom: 'Mahatta', type: 'head', gender: 'f' }, // Station
  { id: 'Midan', ar: 'ميدان', rom: 'Midan', type: 'head', gender: 'm' }, // Square
  { id: 'Sahat', ar: 'ساحة', rom: 'Sahat', type: 'head', gender: 'f', sun: true }, // Courtyard/Square
  { id: 'Hadiq', ar: 'حديقة', rom: 'Hadiq', type: 'head', gender: 'f' }, // Garden (Construct: Hadiqat)
];

export const AR_ROOTS: ArabicComponent[] = [
  // Nature / Topography
  { id: 'Shams', ar: 'شمس', rom: 'Shams', type: 'root', gender: 'f', sun: true }, // Sun
  { id: 'Qamar', ar: 'قمر', rom: 'Qamar', type: 'root', gender: 'm' }, // Moon
  { id: 'Najm', ar: 'نجم', rom: 'Najm', type: 'root', gender: 'm', sun: true }, // Star
  { id: 'Sama', ar: 'سماء', rom: 'Sama', type: 'root', gender: 'f', sun: true }, // Sky
  { id: 'Ard', ar: 'أرض', rom: 'Ard', type: 'root', gender: 'f' }, // Earth/Land
  { id: 'Rih', ar: 'ريح', rom: 'Rih', type: 'root', gender: 'f', sun: true }, // Wind
  { id: 'Matar', ar: 'مطر', rom: 'Matar', type: 'root', gender: 'm' }, // Rain
  { id: 'Raml', ar: 'رمل', rom: 'Raml', type: 'root', gender: 'm', sun: true }, // Sand
  { id: 'Sakhr', ar: 'صخر', rom: 'Sakhr', type: 'root', gender: 'm', sun: true }, // Rock
  { id: 'Hajar', ar: 'حجر', rom: 'Hajar', type: 'root', gender: 'm' }, // Stone
  { id: 'Ma', ar: 'ماء', rom: 'Ma', type: 'root', gender: 'm' }, // Water
  { id: 'Nur', ar: 'نور', rom: 'Nur', type: 'root', gender: 'm', sun: true }, // Light
  { id: 'Zahra', ar: 'زهرة', rom: 'Zahra', type: 'root', gender: 'f', sun: true }, // Flower
  { id: 'Ward', ar: 'ورد', rom: 'Ward', type: 'root', gender: 'm' }, // Roses
  { id: 'Bustan', ar: 'بستان', rom: 'Bustan', type: 'root', gender: 'm' }, // Garden/Orchard
  { id: 'Rawda', ar: 'روضة', rom: 'Rawda', type: 'root', gender: 'f', sun: true }, // Garden/Meadow
  { id: 'Waha', ar: 'واحة', rom: 'Waha', type: 'root', gender: 'f' }, // Oasis
  { id: 'Nakhl', ar: 'نخل', rom: 'Nakhl', type: 'root', gender: 'm', sun: true }, // Palm trees
  { id: 'Zaytun', ar: 'زيتون', rom: 'Zaytun', type: 'root', gender: 'm', sun: true }, // Olives
  { id: 'Rumman', ar: 'رمان', rom: 'Rumman', type: 'root', gender: 'm', sun: true }, // Pomegranates
  { id: 'Tin', ar: 'تين', rom: 'Tin', type: 'root', gender: 'm', sun: true }, // Figs
  { id: 'Arz', ar: 'أرز', rom: 'Arz', type: 'root', gender: 'm' }, // Cedars
  { id: 'Lawz', ar: 'لوز', rom: 'Lawz', type: 'root', gender: 'm', sun: true }, // Almonds
  { id: 'Layl', ar: 'ليل', rom: 'Layl', type: 'root', gender: 'm', sun: true }, // Night
  { id: 'Nahar', ar: 'نهار', rom: 'Nahar', type: 'root', gender: 'm', sun: true }, // Day
  { id: 'Subh', ar: 'صبح', rom: 'Subh', type: 'root', gender: 'm', sun: true }, // Morning
  { id: 'Masa', ar: 'مساء', rom: 'Masa', type: 'root', gender: 'm' }, // Evening
  { id: 'Rabi', ar: 'ربيع', rom: 'Rabi', type: 'root', gender: 'm', sun: true }, // Spring
  { id: 'Sayf', ar: 'صيف', rom: 'Sayf', type: 'root', gender: 'm', sun: true }, // Summer
  { id: 'Kharif', ar: 'خريف', rom: 'Kharif', type: 'root', gender: 'm' }, // Autumn
  { id: 'Shita', ar: 'شتاء', rom: 'Shita', type: 'root', gender: 'm', sun: true }, // Winter
  { id: 'Falak', ar: 'فلك', rom: 'Falak', type: 'root', gender: 'm' }, // Orbit/Astronomy
  { id: 'Ufq', ar: 'أفق', rom: 'Ufq', type: 'root', gender: 'm' }, // Horizon
  { id: 'Hilal', ar: 'هلال', rom: 'Hilal', type: 'root', gender: 'm' }, // Crescent
  { id: 'Badr', ar: 'بدر', rom: 'Badr', type: 'root', gender: 'm' }, // Full Moon
  { id: 'Kawakib', ar: 'كواكب', rom: 'Kawakib', type: 'root', gender: 'm' }, // Planets
  { id: 'Shihab', ar: 'شهاب', rom: 'Shihab', type: 'root', gender: 'm', sun: true }, // Meteor
  { id: 'Mawj', ar: 'موج', rom: 'Mawj', type: 'root', gender: 'm' }, // Wave
  { id: 'Sail', ar: 'سيل', rom: 'Sail', type: 'root', gender: 'm', sun: true }, // Torrent
  { id: 'Naba', ar: 'نبع', rom: 'Naba', type: 'root', gender: 'm', sun: true }, // Spring
  { id: 'Ghadir', ar: 'غدير', rom: 'Ghadir', type: 'root', gender: 'm' }, // Pool
  { id: 'Muhit', ar: 'محيط', rom: 'Muhit', type: 'root', gender: 'm' }, // Ocean
  { id: 'Khalij', ar: 'خليج', rom: 'Khalij', type: 'root', gender: 'm' }, // Gulf
  { id: 'Sahra', ar: 'صحراء', rom: 'Sahra', type: 'root', gender: 'f', sun: true }, // Desert
  { id: 'Turab', ar: 'تراب', rom: 'Turab', type: 'root', gender: 'm', sun: true }, // Dust
  { id: 'Tin', ar: 'طين', rom: 'Tin', type: 'root', gender: 'm', sun: true }, // Clay
  { id: 'Ghubar', ar: 'غبار', rom: 'Ghubar', type: 'root', gender: 'm' }, // Dust
  { id: 'Jabbal', ar: 'جبال', rom: 'Jabbal', type: 'root', gender: 'm', sun: true }, // Mountains
  { id: 'Safh', ar: 'سفح', rom: 'Safh', type: 'root', gender: 'm', sun: true }, // Slope
  { id: 'Qimma', ar: 'قمة', rom: 'Qimma', type: 'root', gender: 'f' }, // Peak
  { id: 'Hadaba', ar: 'هضبة', rom: 'Hadaba', type: 'root', gender: 'f' }, // Plateau
  { id: 'Sahl', ar: 'سهل', rom: 'Sahl', type: 'root', gender: 'm', sun: true }, // Plain
  { id: 'Wadi', ar: 'وادي', rom: 'Wadi', type: 'root', gender: 'm' }, // Valley
  { id: 'Ghusn', ar: 'غصن', rom: 'Ghusn', type: 'root', gender: 'm' }, // Branch
  { id: 'Thamar', ar: 'ثمر', rom: 'Thamar', type: 'root', gender: 'm', sun: true }, // Fruit
  { id: 'Tuffah', ar: 'تفاح', rom: 'Tuffah', type: 'root', gender: 'm', sun: true }, // Apple
  { id: 'Burtuqal', ar: 'برتقال', rom: 'Burtuqal', type: 'root', gender: 'm' }, // Orange
  { id: 'Limun', ar: 'ليمون', rom: 'Limun', type: 'root', gender: 'm', sun: true }, // Lemon
  { id: 'Mawz', ar: 'موز', rom: 'Mawz', type: 'root', gender: 'm' }, // Banana
  { id: 'Inab', ar: 'عنب', rom: 'Inab', type: 'root', gender: 'm' }, // Grape
  { id: 'Tamr', ar: 'تمر', rom: 'Tamr', type: 'root', gender: 'm', sun: true }, // Date
  { id: 'Habb', ar: 'حب', rom: 'Habb', type: 'root', gender: 'm' }, // Grain
  { id: 'Qamh', ar: 'قمح', rom: 'Qamh', type: 'root', gender: 'm' }, // Wheat
  { id: 'Shair', ar: 'شعير', rom: 'Shair', type: 'root', gender: 'm', sun: true }, // Barley
  { id: 'Ushb', ar: 'عشب', rom: 'Ushb', type: 'root', gender: 'm' }, // Grass
  { id: 'Yasmin', ar: 'ياسمين', rom: 'Yasmin', type: 'root', gender: 'm' }, // Jasmine
  { id: 'Rayhan', ar: 'ريحان', rom: 'Rayhan', type: 'root', gender: 'm', sun: true }, // Basil
  { id: 'Nana', ar: 'نعناع', rom: 'Nana', type: 'root', gender: 'm', sun: true }, // Mint
  { id: 'Zafaran', ar: 'زعفران', rom: 'Zafaran', type: 'root', gender: 'm', sun: true }, // Saffron
  
  // Animals
  { id: 'Asad', ar: 'أسد', rom: 'Asad', type: 'root', gender: 'm' }, // Lion
  { id: 'Nimr', ar: 'نمر', rom: 'Nimr', type: 'root', gender: 'm', sun: true }, // Tiger/Leopard
  { id: 'Saqr', ar: 'صقر', rom: 'Saqr', type: 'root', gender: 'm', sun: true }, // Falcon/Hawk
  { id: 'Nisr', ar: 'نسر', rom: 'Nasr', type: 'root', gender: 'm', sun: true }, // Eagle
  { id: 'Ghazal', ar: 'غزال', rom: 'Ghazal', type: 'root', gender: 'm' }, // Gazelle
  { id: 'Jamal', ar: 'جمل', rom: 'Jamal', type: 'root', gender: 'm' }, // Camel
  { id: 'Hisan', ar: 'حصان', rom: 'Hisan', type: 'root', gender: 'm' }, // Horse
  { id: 'Tayr', ar: 'طير', rom: 'Tayr', type: 'root', gender: 'm', sun: true }, // Bird
  { id: 'Samak', ar: 'سمك', rom: 'Samak', type: 'root', gender: 'm', sun: true }, // Fish
  { id: 'Dhib', ar: 'ذئب', rom: 'Dhib', type: 'root', gender: 'm', sun: true }, // Wolf
  { id: 'Naqa', ar: 'ناقة', rom: 'Naqa', type: 'root', gender: 'f', sun: true }, // She-camel
  { id: 'Faras', ar: 'فرس', rom: 'Faras', type: 'root', gender: 'f' }, // Mare
  { id: 'Mahr', ar: 'مهر', rom: 'Mahr', type: 'root', gender: 'm' }, // Foal
  { id: 'Baqara', ar: 'بقرة', rom: 'Baqara', type: 'root', gender: 'f' }, // Cow
  { id: 'Thawr', ar: 'ثور', rom: 'Thawr', type: 'root', gender: 'm', sun: true }, // Bull
  { id: 'Ghanam', ar: 'غنم', rom: 'Ghanam', type: 'root', gender: 'm' }, // Sheep
  { id: 'Kabsh', ar: 'كبش', rom: 'Kabsh', type: 'root', gender: 'm' }, // Ram
  { id: 'Maiz', ar: 'ماعز', rom: 'Maiz', type: 'root', gender: 'm' }, // Goat
  { id: 'Kalb', ar: 'كلب', rom: 'Kalb', type: 'root', gender: 'm' }, // Dog
  { id: 'Qitt', ar: 'قط', rom: 'Qitt', type: 'root', gender: 'm' }, // Cat
  { id: 'Arnab', ar: 'أرنب', rom: 'Arnab', type: 'root', gender: 'm' }, // Rabbit
  { id: 'Hudhud', ar: 'هدهد', rom: 'Hudhud', type: 'root', gender: 'm' }, // Hoopoe
  { id: 'Hamama', ar: 'حمامة', rom: 'Hamama', type: 'root', gender: 'f' }, // Pigeon
  { id: 'Ghurab', ar: 'غراب', rom: 'Ghurab', type: 'root', gender: 'm' }, // Crow
  { id: 'Buma', ar: 'بومة', rom: 'Buma', type: 'root', gender: 'f' }, // Owl
  { id: 'Thalab', ar: 'ثعلب', rom: 'Thalab', type: 'root', gender: 'm', sun: true }, // Fox
  { id: 'Fil', ar: 'فيل', rom: 'Fil', type: 'root', gender: 'm' }, // Elephant
  { id: 'Zarafa', ar: 'زرافة', rom: 'Zarafa', type: 'root', gender: 'f', sun: true }, // Giraffe
  { id: 'Qird', ar: 'قرد', rom: 'Qird', type: 'root', gender: 'm' }, // Monkey
  { id: 'Hoot', ar: 'حوت', rom: 'Hoot', type: 'root', gender: 'm' }, // Whale
  { id: 'Qirsh', ar: 'قرش', rom: 'Qirsh', type: 'root', gender: 'm' }, // Shark
  { id: 'Sulhafah', ar: 'سلحفاة', rom: 'Sulhafah', type: 'root', gender: 'f', sun: true }, // Turtle
  { id: 'Difa', ar: 'ضفدع', rom: 'Difa', type: 'root', gender: 'm', sun: true }, // Frog
  { id: 'Naml', ar: 'نمل', rom: 'Naml', type: 'root', gender: 'm', sun: true }, // Ant
  { id: 'Nahl', ar: 'نحل', rom: 'Nahl', type: 'root', gender: 'm', sun: true }, // Bee
  { id: 'Aqrab', ar: 'عقرب', rom: 'Aqrab', type: 'root', gender: 'm' }, // Scorpion
  { id: 'Thuban', ar: 'ثعبان', rom: 'Thuban', type: 'root', gender: 'm', sun: true }, // Snake
  
  // Minerals & Objects
  { id: 'Dhahab', ar: 'ذهب', rom: 'Dhahab', type: 'root', gender: 'm', sun: true }, // Gold
  { id: 'Fidda', ar: 'فضة', rom: 'Fidda', type: 'root', gender: 'f' }, // Silver
  { id: 'Nuhas', ar: 'نحاس', rom: 'Nuhas', type: 'root', gender: 'm', sun: true }, // Copper
  { id: 'Hadid', ar: 'حديد', rom: 'Hadid', type: 'root', gender: 'm' }, // Iron
  { id: 'Zibaq', ar: 'زئبق', rom: 'Zibaq', type: 'root', gender: 'm', sun: true }, // Mercury
  { id: 'Yaqut', ar: 'ياقوت', rom: 'Yaqut', type: 'root', gender: 'm' }, // Ruby
  { id: 'Zumurrud', ar: 'زمرد', rom: 'Zumurrud', type: 'root', gender: 'm', sun: true }, // Emerald
  { id: 'Mas', ar: 'ماس', rom: 'Mas', type: 'root', gender: 'm' }, // Diamond
  { id: 'Lulu', ar: 'لؤلؤ', rom: 'Lulu', type: 'root', gender: 'm', sun: true }, // Pearl
  { id: 'Marjan', ar: 'مرجان', rom: 'Marjan', type: 'root', gender: 'm' }, // Coral
  { id: 'Aqiq', ar: 'عقيق', rom: 'Aqiq', type: 'root', gender: 'm' }, // Agate
  { id: 'Fayruz', ar: 'فيروز', rom: 'Fayruz', type: 'root', gender: 'm' }, // Turquoise
  { id: 'Qalam', ar: 'قلم', rom: 'Qalam', type: 'root', gender: 'm' }, // Pen
  { id: 'Kitab', ar: 'كتاب', rom: 'Kitab', type: 'root', gender: 'm' }, // Book
  { id: 'Sayf', ar: 'سيف', rom: 'Sayf', type: 'root', gender: 'm', sun: true }, // Sword
  { id: 'Rumh', ar: 'رمح', rom: 'Rumh', type: 'root', gender: 'm', sun: true }, // Spear
  { id: 'Qaws', ar: 'قوس', rom: 'Qaws', type: 'root', gender: 'm' }, // Bow
  { id: 'Sahm', ar: 'سهم', rom: 'Sahm', type: 'root', gender: 'm', sun: true }, // Arrow
  { id: 'Taj', ar: 'تاج', rom: 'Taj', type: 'root', gender: 'm', sun: true }, // Crown
  { id: 'Kursi', ar: 'كرسي', rom: 'Kursi', type: 'root', gender: 'm' }, // Chair
  { id: 'Sarir', ar: 'سرير', rom: 'Sarir', type: 'root', gender: 'm', sun: true }, // Bed
  { id: 'Misbah', ar: 'مصباح', rom: 'Misbah', type: 'root', gender: 'm' }, // Lamp
  { id: 'Fanus', ar: 'فانوس', rom: 'Fanus', type: 'root', gender: 'm' }, // Lantern
  { id: 'Manara', ar: 'منارة', rom: 'Manara', type: 'root', gender: 'f' }, // Lighthouse
  { id: 'Safina', ar: 'سفينة', rom: 'Safina', type: 'root', gender: 'f', sun: true }, // Ship
  { id: 'Markab', ar: 'مركب', rom: 'Markab', type: 'root', gender: 'm' }, // Boat
  { id: 'Miftah', ar: 'مفتاح', rom: 'Miftah', type: 'root', gender: 'm' }, // Key
  { id: 'Khazana', ar: 'خزانة', rom: 'Khazana', type: 'root', gender: 'f' }, // Treasury
  
  // Qualities / Abstract
  { id: 'Salam', ar: 'سلام', rom: 'Salam', type: 'root', gender: 'm', sun: true }, // Peace
  { id: 'Nasr', ar: 'نصر', rom: 'Nasr', type: 'root', gender: 'm', sun: true }, // Victory
  { id: 'Majd', ar: 'مجد', rom: 'Majd', type: 'root', gender: 'm' }, // Glory
  { id: 'Falah', ar: 'فلاح', rom: 'Falah', type: 'root', gender: 'm' }, // Success/Salvation
  { id: 'Amal', ar: 'أمل', rom: 'Amal', type: 'root', gender: 'f' }, // Hope
  { id: 'Huda', ar: 'هدى', rom: 'Huda', type: 'root', gender: 'f' }, // Guidance
  { id: 'Baraka', ar: 'بركة', rom: 'Baraka', type: 'root', gender: 'f' }, // Blessing
  { id: 'Rahma', ar: 'رحمة', rom: 'Rahma', type: 'root', gender: 'f', sun: true }, // Mercy
  { id: 'Karama', ar: 'كرامة', rom: 'Karama', type: 'root', gender: 'f' }, // Dignity
  { id: 'Hurriya', ar: 'حرية', rom: 'Hurriya', type: 'root', gender: 'f' }, // Freedom
  { id: 'Hikma', ar: 'حكمة', rom: 'Hikma', type: 'root', gender: 'f' }, // Wisdom
  { id: 'Qudra', ar: 'قدرة', rom: 'Qudra', type: 'root', gender: 'f' }, // Power/Ability
  { id: 'Hubb', ar: 'حب', rom: 'Hubb', type: 'root', gender: 'm' }, // Love
  { id: 'Ishq', ar: 'عشق', rom: 'Ishq', type: 'root', gender: 'm' }, // Passion
  { id: 'Shawq', ar: 'شوق', rom: 'Shawq', type: 'root', gender: 'm', sun: true }, // Longing
  { id: 'Hanz', ar: 'حظ', rom: 'Hanz', type: 'root', gender: 'm' }, // Luck
  { id: 'Qadar', ar: 'قدر', rom: 'Qadar', type: 'root', gender: 'm' }, // Fate
  { id: 'Ruh', ar: 'روح', rom: 'Ruh', type: 'root', gender: 'f', sun: true }, // Soul
  { id: 'Nafs', ar: 'نفس', rom: 'Nafs', type: 'root', gender: 'f', sun: true }, // Self
  { id: 'Aql', ar: 'عقل', rom: 'Aql', type: 'root', gender: 'm' }, // Mind
  { id: 'Ilm', ar: 'علم', rom: 'Ilm', type: 'root', gender: 'm' }, // Knowledge
  { id: 'Zalam', ar: 'ظلام', rom: 'Zalam', type: 'root', gender: 'm', sun: true }, // Darkness
  { id: 'Haqq', ar: 'حق', rom: 'Haqq', type: 'root', gender: 'm' }, // Truth
  { id: 'Batil', ar: 'باطل', rom: 'Batil', type: 'root', gender: 'm' }, // Falsehood
  { id: 'Khayr', ar: 'خير', rom: 'Khayr', type: 'root', gender: 'm' }, // Good
  { id: 'Sharr', ar: 'شر', rom: 'Sharr', type: 'root', gender: 'm', sun: true }, // Evil
  { id: 'Adl', ar: 'عدل', rom: 'Adl', type: 'root', gender: 'm' }, // Justice
  { id: 'Harb', ar: 'حرب', rom: 'Harb', type: 'root', gender: 'f' }, // War
  { id: 'Jihad', ar: 'جهاد', rom: 'Jihad', type: 'root', gender: 'm' }, // Struggle
  { id: 'Fath', ar: 'فتح', rom: 'Fath', type: 'root', gender: 'm' }, // Conquest
  { id: 'Hukm', ar: 'حكم', rom: 'Hukm', type: 'root', gender: 'm' }, // Rule
  { id: 'Mulk', ar: 'ملك', rom: 'Mulk', type: 'root', gender: 'm' }, // Kingdom
  { id: 'Dawla', ar: 'دولة', rom: 'Dawla', type: 'root', gender: 'f', sun: true }, // State
  { id: 'Umma', ar: 'أمة', rom: 'Umma', type: 'root', gender: 'f' }, // Nation
  { id: 'Qabila', ar: 'قبيلة', rom: 'Qabila', type: 'root', gender: 'f' }, // Tribe
  
  // Titles / People
  { id: 'Malik', ar: 'ملك', rom: 'Malik', type: 'root', gender: 'm' }, // King
  { id: 'Amir', ar: 'أمير', rom: 'Amir', type: 'root', gender: 'm' }, // Prince
  { id: 'Sheikh', ar: 'شيخ', rom: 'Sheikh', type: 'root', gender: 'm', sun: true }, // Elder/Leader
  { id: 'Sultan', ar: 'سلطان', rom: 'Sultan', type: 'root', gender: 'm', sun: true }, // Sultan
  { id: 'Imam', ar: 'إمام', rom: 'Imam', type: 'root', gender: 'm' }, // Leader
  { id: 'Wazir', ar: 'وزير', rom: 'Wazir', type: 'root', gender: 'm' }, // Minister
];

export const AR_ADJECTIVES: ArabicComponent[] = [
  // Colors
  { id: 'Ahmar', ar: 'أحمر', rom: 'Ahmar', type: 'adjective' }, // Red
  { id: 'Abyad', ar: 'أبيض', rom: 'Abyad', type: 'adjective' }, // White
  { id: 'Aswad', ar: 'أسود', rom: 'Aswad', type: 'adjective' }, // Black
  { id: 'Akhdar', ar: 'أخضر', rom: 'Akhdar', type: 'adjective' }, // Green
  { id: 'Azraq', ar: 'أزرق', rom: 'Azraq', type: 'adjective' }, // Blue
  { id: 'Asfar', ar: 'أصفر', rom: 'Asfar', type: 'adjective' }, // Yellow
  { id: 'Bunni', ar: 'بني', rom: 'Bunni', type: 'adjective' }, // Brown
  { id: 'Ramadi', ar: 'رمادي', rom: 'Ramadi', type: 'adjective', sun: true }, // Grey
  { id: 'Wardi', ar: 'وردي', rom: 'Wardi', type: 'adjective' }, // Pink
  { id: 'Burtuqali', ar: 'برتقالي', rom: 'Burtuqali', type: 'adjective' }, // Orange
  { id: 'Banafsaji', ar: 'بنفسجي', rom: 'Banafsaji', type: 'adjective' }, // Purple
  { id: 'Dhahabi', ar: 'ذهبي', rom: 'Dhahabi', type: 'adjective', sun: true }, // Golden
  { id: 'Fiddi', ar: 'فضي', rom: 'Fiddi', type: 'adjective' }, // Silver
  
  // Dimensions
  { id: 'Kabir', ar: 'كبير', rom: 'Kabir', type: 'adjective' }, // Big
  { id: 'Saghir', ar: 'صغير', rom: 'Saghir', type: 'adjective', sun: true }, // Small
  { id: 'Tawil', ar: 'طويل', rom: 'Tawil', type: 'adjective', sun: true }, // Long/Tall
  { id: 'Qasir', ar: 'قصير', rom: 'Qasir', type: 'adjective' }, // Short
  { id: 'Ali', ar: 'عالي', rom: 'Ali', type: 'adjective' }, // High
  { id: 'Wasi', ar: 'واسع', rom: 'Wasi', type: 'adjective' }, // Wide
  { id: 'Dayyiq', ar: 'ضيق', rom: 'Dayyiq', type: 'adjective', sun: true }, // Narrow
  { id: 'Thaqil', ar: 'ثقيل', rom: 'Thaqil', type: 'adjective', sun: true }, // Heavy
  { id: 'Khafif', ar: 'خفيف', rom: 'Khafif', type: 'adjective' }, // Light
  { id: 'Arid', ar: 'عريض', rom: 'Arid', type: 'adjective' }, // Wide/Broad
  
  // Qualities
  { id: 'Jamil', ar: 'جميل', rom: 'Jamil', type: 'adjective' }, // Beautiful
  { id: 'Jadid', ar: 'جديد', rom: 'Jadid', type: 'adjective' }, // New
  { id: 'Qadim', ar: 'قديم', rom: 'Qadim', type: 'adjective' }, // Old
  { id: 'Said', ar: 'سعيد', rom: 'Said', type: 'adjective', sun: true }, // Happy
  { id: 'Aziz', ar: 'عزيز', rom: 'Aziz', type: 'adjective' }, // Dear/Precious
  { id: 'Karim', ar: 'كريم', rom: 'Karim', type: 'adjective' }, // Generous/Noble
  { id: 'Majid', ar: 'مجيد', rom: 'Majid', type: 'adjective' }, // Glorious
  { id: 'Salim', ar: 'سليم', rom: 'Salim', type: 'adjective', sun: true }, // Safe/Sound
  { id: 'Amin', ar: 'أمين', rom: 'Amin', type: 'adjective' }, // Trustworthy
  { id: 'Zaki', ar: 'زكي', rom: 'Zaki', type: 'adjective', sun: true }, // Pure/Intelligent
  { id: 'Munawwar', ar: 'منور', rom: 'Munawwar', type: 'adjective' }, // Illuminated
  { id: 'Mukarram', ar: 'مكرم', rom: 'Mukarram', type: 'adjective' }, // Honored
  { id: 'Muqaddas', ar: 'مقدس', rom: 'Muqaddas', type: 'adjective' }, // Holy
  { id: 'Qawi', ar: 'قوي', rom: 'Qawi', type: 'adjective' }, // Strong
  { id: 'Daif', ar: 'ضعيف', rom: 'Daif', type: 'adjective', sun: true }, // Weak
  { id: 'Sari', ar: 'سريع', rom: 'Sari', type: 'adjective', sun: true }, // Fast
  { id: 'Bati', ar: 'بطيء', rom: 'Bati', type: 'adjective' }, // Slow
  { id: 'Har', ar: 'حار', rom: 'Har', type: 'adjective' }, // Hot
  { id: 'Barid', ar: 'بارد', rom: 'Barid', type: 'adjective' }, // Cold
  { id: 'Ratb', ar: 'رطب', rom: 'Ratb', type: 'adjective', sun: true }, // Wet
  { id: 'Jaf', ar: 'جاف', rom: 'Jaf', type: 'adjective' }, // Dry
  { id: 'Qasi', ar: 'قاسي', rom: 'Qasi', type: 'adjective' }, // Hard
  { id: 'Layyin', ar: 'لين', rom: 'Layyin', type: 'adjective', sun: true }, // Soft
  { id: 'Qabih', ar: 'قبيح', rom: 'Qabih', type: 'adjective' }, // Ugly
  { id: 'Nazif', ar: 'نظيف', rom: 'Nazif', type: 'adjective', sun: true }, // Clean
  { id: 'Wasikh', ar: 'وسخ', rom: 'Wasikh', type: 'adjective' }, // Dirty
  { id: 'Hazin', ar: 'حزين', rom: 'Hazin', type: 'adjective' }, // Sad
  { id: 'Ghani', ar: 'غني', rom: 'Ghani', type: 'adjective' }, // Rich
  { id: 'Faqir', ar: 'فقير', rom: 'Faqir', type: 'adjective' }, // Poor
  { id: 'Bakhil', ar: 'بخيل', rom: 'Bakhil', type: 'adjective' }, // Stingy
  { id: 'Shuja', ar: 'شجاع', rom: 'Shuja', type: 'adjective', sun: true }, // Brave
  { id: 'Sadiq', ar: 'صادق', rom: 'Sadiq', type: 'adjective', sun: true }, // Truthful
  { id: 'Hakim', ar: 'حكيم', rom: 'Hakim', type: 'adjective' }, // Wise
  { id: 'Dhaki', ar: 'ذكي', rom: 'Dhaki', type: 'adjective', sun: true }, // Smart
  { id: 'Mashhur', ar: 'مشهور', rom: 'Mashhur', type: 'adjective' }, // Famous
  { id: 'Majhul', ar: 'مجهول', rom: 'Majhul', type: 'adjective' }, // Unknown
  { id: 'Zahir', ar: 'ظاهر', rom: 'Zahir', type: 'adjective', sun: true }, // Apparent
  { id: 'Batin', ar: 'باطن', rom: 'Batin', type: 'adjective' }, // Hidden
  { id: 'Awwal', ar: 'أول', rom: 'Awwal', type: 'adjective' }, // First
  { id: 'Akhir', ar: 'آخر', rom: 'Akhir', type: 'adjective' }, // Last
  { id: 'Wahid', ar: 'وحيد', rom: 'Wahid', type: 'adjective' }, // Sole/Lonely
  { id: 'Farid', ar: 'فريد', rom: 'Farid', type: 'adjective' }, // Unique
  { id: 'Kathir', ar: 'كثير', rom: 'Kathir', type: 'adjective' }, // Many
  { id: 'Qalil', ar: 'قليل', rom: 'Qalil', type: 'adjective' }, // Few
  { id: 'Baid', ar: 'بعيد', rom: 'Baid', type: 'adjective' }, // Far
  { id: 'Qarib', ar: 'قريب', rom: 'Qarib', type: 'adjective' }, // Near
  { id: 'Safi', ar: 'صافي', rom: 'Safi', type: 'adjective', sun: true }, // Pure/Clear
  { id: 'Kuder', ar: 'كدر', rom: 'Kuder', type: 'adjective' }, // Turbid/Dark
  
  // Directions / Locations
  { id: 'Shamali', ar: 'شمالي', rom: 'Shamali', type: 'adjective', sun: true }, // Northern
  { id: 'Janubi', ar: 'جنوبي', rom: 'Janubi', type: 'adjective' }, // Southern
  { id: 'Sharqi', ar: 'شرقي', rom: 'Sharqi', type: 'adjective', sun: true }, // Eastern
  { id: 'Gharbi', ar: 'غربي', rom: 'Gharbi', type: 'adjective' }, // Western
  { id: 'Wusta', ar: 'وسطى', rom: 'Wusta', type: 'adjective' }, // Central
  { id: 'Fawqa', ar: 'فوقا', rom: 'Fawqa', type: 'adjective' }, // Upper
];

export const AR_COUNTRY_SUFFIXES: ArabicComponent[] = [
  { id: 'iya', ar: 'ية', rom: 'iya', type: 'country_suffix' }, // e.g. Saudia, Syria
  { id: 'stan', ar: 'ستان', rom: 'stan', type: 'country_suffix' }, // Persian influence but common
];

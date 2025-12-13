export interface AustronesianComponent {
  val: string;
  type: 'prefix' | 'root' | 'suffix' | 'adjective';
  lang?: 'id' | 'ms' | 'jv';
  tags?: string[];
}

export const AUSTRONESIAN_DATA: AustronesianComponent[] = [
  // ============================
  // GEOGRAPHIC PREFIXES (HEADS)
  // ============================
  { val: 'Gunung', type: 'prefix' }, // Mountain
  { val: 'Bukit', type: 'prefix' }, // Hill
  { val: 'Sungai', type: 'prefix' }, // River
  { val: 'Danau', type: 'prefix', lang: 'id' }, // Lake (ID)
  { val: 'Tasik', type: 'prefix', lang: 'ms' }, // Lake (MS)
  { val: 'Tanjung', type: 'prefix' }, // Cape
  { val: 'Teluk', type: 'prefix' }, // Bay
  { val: 'Pulau', type: 'prefix' }, // Island
  { val: 'Kuala', type: 'prefix' }, // Estuary/Confluence (Very common in MS)
  { val: 'Muara', type: 'prefix', lang: 'id' }, // Estuary (ID)
  { val: 'Pantai', type: 'prefix' }, // Beach
  { val: 'Kali', type: 'prefix', lang: 'id' }, // River (Javanese/ID)
  { val: 'Air', type: 'prefix' }, // Water/Falls
  { val: 'Batang', type: 'prefix' }, // River (Sumatra/Malay)
  { val: 'Batu', type: 'prefix' }, // Stone/Mile
  { val: 'Kota', type: 'prefix' }, // City/Fort
  { val: 'Bandar', type: 'prefix', lang: 'ms' }, // City (MS)
  { val: 'Kampung', type: 'prefix' }, // Village
  { val: 'Desa', type: 'prefix', lang: 'id' }, // Village (ID)
  { val: 'Dusun', type: 'prefix', lang: 'id' }, // Hamlet
  { val: 'Pekan', type: 'prefix', lang: 'ms' }, // Town (MS)
  { val: 'Taman', type: 'prefix' }, // Garden/Park
  { val: 'Jalan', type: 'prefix' }, // Road
  { val: 'Lorong', type: 'prefix' }, // Lane
  { val: 'Simpang', type: 'prefix' }, // Junction
  { val: 'Lubuk', type: 'prefix' }, // Deep pool
  { val: 'Rantau', type: 'prefix' }, // Reach/Coast
  { val: 'Pematang', type: 'prefix', lang: 'id' }, // Ridge
  { val: 'Tanah', type: 'prefix' }, // Land
  { val: 'Pasir', type: 'prefix' }, // Sand
  { val: 'Hutan', type: 'prefix' }, // Forest
  { val: 'Rimba', type: 'prefix' }, // Jungle
  { val: 'Padang', type: 'prefix' }, // Field
  { val: 'Sawah', type: 'prefix', lang: 'id' }, // Rice field
  { val: 'Bendang', type: 'prefix', lang: 'ms' }, // Rice field
  { val: 'Lembah', type: 'prefix' }, // Valley
  { val: 'Gua', type: 'prefix' }, // Cave
  { val: 'Ujung', type: 'prefix', lang: 'id' }, // End/Tip
  { val: 'Hulu', type: 'prefix' }, // Upstream
  { val: 'Hilir', type: 'prefix' }, // Downstream
  { val: 'Gili', type: 'prefix', lang: 'id' }, // Island (Lombok/Bali)
  { val: 'Nusa', type: 'prefix', lang: 'id' }, // Island (Sanskrit/Old Javanese)
  { val: 'Wai', type: 'prefix', lang: 'id' }, // Water (Eastern Indo)
  { val: 'Ci', type: 'prefix', lang: 'id' }, // Water (Sundanese prefix, e.g. Cianjur)

  // Javanese Specific Prefixes (Heads)
  { val: 'Karang', type: 'prefix', lang: 'jv' }, // Coral/Limestone/Estate (Very Common)
  { val: 'Kedung', type: 'prefix', lang: 'jv' }, // Deep Pool
  { val: 'Gondang', type: 'prefix', lang: 'jv' }, // Meeting Place / Tree
  { val: 'Tegal', type: 'prefix', lang: 'jv' }, // Dry Field
  { val: 'Wono', type: 'prefix', lang: 'jv' }, // Forest (Jav spelling of Wana)
  { val: 'Alas', type: 'prefix', lang: 'jv' }, // Forest (Low Javanese)
  { val: 'Giri', type: 'prefix', lang: 'jv' }, // Mountain (Sanskrit/Jav)
  { val: 'Kulik', type: 'prefix', lang: 'jv' }, // Small place
  { val: 'Simo', type: 'prefix', lang: 'jv' }, // Tiger (Old Jav)
  { val: 'Banyu', type: 'prefix', lang: 'jv' }, // Water
  { val: 'Sumber', type: 'prefix', lang: 'jv' }, // Source/Spring
  { val: 'Grogol', type: 'prefix', lang: 'jv' }, // Trap/Area
  { val: 'Curug', type: 'prefix', lang: 'jv' }, // Waterfall (Sundanese/Jav border)

  // ============================
  // ROOTS (NOUNS)
  // ============================
  // Nature
  { val: 'Api', type: 'root' }, // Fire
  { val: 'Awan', type: 'root' }, // Cloud
  { val: 'Langit', type: 'root' }, // Sky
  { val: 'Bintang', type: 'root' }, // Star
  { val: 'Surya', type: 'root', lang: 'id' }, // Sun (Sanskrit)
  { val: 'Matahari', type: 'root' }, // Sun
  { val: 'Bulan', type: 'root' }, // Moon
  { val: 'Angin', type: 'root' }, // Wind
  { val: 'Hujan', type: 'root' }, // Rain
  { val: 'Petir', type: 'root' }, // Lightning
  { val: 'Guntur', type: 'root' }, // Thunder
  { val: 'Pelangi', type: 'root' }, // Rainbow
  { val: 'Kabut', type: 'root' }, // Mist
  { val: 'Ombak', type: 'root' }, // Wave
  { val: 'Karang', type: 'root' }, // Coral/Reef
  
  // Materials/Flora
  { val: 'Mas', type: 'root' }, // Gold
  { val: 'Emas', type: 'root' }, // Gold
  { val: 'Perak', type: 'root' }, // Silver
  { val: 'Intan', type: 'root' }, // Diamond
  { val: 'Mutiara', type: 'root' }, // Pearl
  { val: 'Besi', type: 'root' }, // Iron
  { val: 'Timah', type: 'root' }, // Tin
  { val: 'Tembaga', type: 'root' }, // Copper
  { val: 'Kaca', type: 'root' }, // Glass
  { val: 'Kayu', type: 'root' }, // Wood
  { val: 'Bambu', type: 'root' }, // Bamboo
  { val: 'Buluh', type: 'root', lang: 'ms' }, // Bamboo
  { val: 'Rotan', type: 'root' }, // Rattan
  { val: 'Kelapa', type: 'root' }, // Coconut
  { val: 'Nyiur', type: 'root' }, // Coconut (Poetic)
  { val: 'Sawit', type: 'root' }, // Palm
  { val: 'Pinang', type: 'root' }, // Areca nut
  { val: 'Bakau', type: 'root' }, // Mangrove
  { val: 'Cengkeh', type: 'root', lang: 'id' }, // Clove
  { val: 'Pala', type: 'root', lang: 'id' }, // Nutmeg
  { val: 'Lada', type: 'root' }, // Pepper
  { val: 'Padi', type: 'root' }, // Rice plant
  { val: 'Bunga', type: 'root' }, // Flower
  { val: 'Kembang', type: 'root', lang: 'id' }, // Flower
  { val: 'Melati', type: 'root' }, // Jasmine
  { val: 'Mawar', type: 'root' }, // Rose
  { val: 'Teratai', type: 'root' }, // Lotus
  { val: 'Anggrek', type: 'root' }, // Orchid
  { val: 'Cempaka', type: 'root' }, // Magnolia
  { val: 'Kenanga', type: 'root' }, // Ylang-ylang
  { val: 'Raya', type: 'root' }, // Great/Hibiscus
  { val: 'Waringin', type: 'root' }, // Banyan
  { val: 'Beringin', type: 'root' }, // Banyan
  { val: 'Jati', type: 'root' }, // Teak
  { val: 'Cendana', type: 'root' }, // Sandalwood
  { val: 'Meranti', type: 'root' }, // Meranti wood
  
  // Fauna
  { val: 'Harimau', type: 'root' }, // Tiger
  { val: 'Macan', type: 'root', lang: 'id' }, // Tiger/Leopard
  { val: 'Gajah', type: 'root' }, // Elephant
  { val: 'Badak', type: 'root' }, // Rhinoceros
  { val: 'Banteng', type: 'root', lang: 'id' }, // Wild bull
  { val: 'Seladang', type: 'root', lang: 'ms' }, // Wild ox
  { val: 'Rusa', type: 'root' }, // Deer
  { val: 'Kijang', type: 'root' }, // Barking Deer
  { val: 'Kancil', type: 'root' }, // Mouse deer
  { val: 'Buaya', type: 'root' }, // Crocodile
  { val: 'Penyu', type: 'root' }, // Turtle
  { val: 'Ular', type: 'root' }, // Snake
  { val: 'Naga', type: 'root' }, // Dragon
  { val: 'Garuda', type: 'root' }, // Mythical bird
  { val: 'Rajawali', type: 'root' }, // Eagle/Hawk
  { val: 'Elang', type: 'root', lang: 'id' }, // Eagle
  { val: 'Helang', type: 'root', lang: 'ms' }, // Eagle
  { val: 'Merpati', type: 'root' }, // Dove
  { val: 'Bayan', type: 'root' }, // Parakeet
  { val: 'Cenderawasih', type: 'root' }, // Bird of paradise
  { val: 'Merak', type: 'root' }, // Peacock
  { val: 'Ikan', type: 'root' }, // Fish
  { val: 'Udang', type: 'root' }, // Prawn
  { val: 'Kuda', type: 'root' }, // Horse
  
  // Abstract / Sanskrit / Titles
  { val: 'Jaya', type: 'root' }, // Victory/Glorious
  { val: 'Wijaya', type: 'root' }, // Victory
  { val: 'Sakti', type: 'root' }, // Magic/Power
  { val: 'Bakti', type: 'root' }, // Devotion
  { val: 'Mulia', type: 'root' }, // Noble
  { val: 'Agung', type: 'root' }, // Great
  { val: 'Sari', type: 'root' }, // Essence
  { val: 'Raja', type: 'root' }, // King
  { val: 'Ratu', type: 'root' }, // Queen
  { val: 'Putri', type: 'root' }, // Princess
  { val: 'Putra', type: 'root' }, // Prince/Son
  { val: 'Indra', type: 'root' }, // God Indra
  { val: 'Dewa', type: 'root' }, // God
  { val: 'Dewi', type: 'root' }, // Goddess
  { val: 'Kusuma', type: 'root' }, // Flower (Sanskrit)
  { val: 'Darma', type: 'root' }, // Duty
  { val: 'Wira', type: 'root' }, // Hero
  { val: 'Pahlawan', type: 'root' }, // Hero
  { val: 'Sejahtera', type: 'root' }, // Prosperous
  { val: 'Makmur', type: 'root' }, // Prosperous
  { val: 'Sentosa', type: 'root' }, // Peaceful
  { val: 'Aman', type: 'root' }, // Safe/Peaceful
  { val: 'Damai', type: 'root' }, // Peace
  { val: 'Harapan', type: 'root' }, // Hope
  { val: 'Kasih', type: 'root' }, // Love
  { val: 'Sayang', type: 'root' }, // Love/Dear
  { val: 'Suka', type: 'root' }, // Like/Joy
  { val: 'Bahagia', type: 'root' }, // Happy

  // Javanese/Sanskrit Roots (High Register & Compounding Stems)
  { val: 'Suro', type: 'root', lang: 'jv' }, // Shark/Brave (Sura)
  { val: 'Purwo', type: 'root', lang: 'jv' }, // First/Beginning (Purwa)
  { val: 'Margo', type: 'root', lang: 'jv' }, // Road/Way (Marga)
  { val: 'Soco', type: 'root', lang: 'jv' }, // Gem/Eye
  { val: 'Karto', type: 'root', lang: 'jv' }, // Work/Prosperous (Karta)
  { val: 'Yogya', type: 'root', lang: 'jv' }, // Suitable/Fit
  { val: 'Asta', type: 'root', lang: 'jv' }, // Hand/Eight
  { val: 'Cipto', type: 'root', lang: 'jv' }, // Create (Cipta)
  { val: 'Duto', type: 'root', lang: 'jv' }, // Messenger (Duta)
  { val: 'Wiro', type: 'root', lang: 'jv' }, // Hero (Wira)
  { val: 'Tirto', type: 'root', lang: 'jv' }, // Water (Tirta)
  { val: 'Argo', type: 'root', lang: 'jv' }, // Mountain (Arga)
  { val: 'Buwono', type: 'root', lang: 'jv' }, // World/Universe
  { val: 'Hamengku', type: 'root', lang: 'jv' }, // Holder/Ruler
  { val: 'Pakis', type: 'root', lang: 'jv' }, // Fern
  { val: 'Rejo', type: 'root', lang: 'jv' }, // Crowded/Prosperous (Raja)
  { val: 'Hardjo', type: 'root', lang: 'jv' }, // Prosperous
  { val: 'Mulyo', type: 'root', lang: 'jv' }, // Noble
  { val: 'Santoso', type: 'root', lang: 'jv' }, // Peaceful
  { val: 'Puro', type: 'root', lang: 'jv' }, // Palace/Temple
  
  // ============================
  // ADJECTIVES (MODIFIERS)
  // ============================
  { val: 'Besar', type: 'adjective' }, // Big
  { val: 'Kecil', type: 'adjective' }, // Small
  { val: 'Agung', type: 'adjective' }, // Great/Grand
  { val: 'Baru', type: 'adjective' }, // New
  { val: 'Lama', type: 'adjective' }, // Old
  { val: 'Tua', type: 'adjective' }, // Old (Age)
  { val: 'Muda', type: 'adjective' }, // Young
  { val: 'Indah', type: 'adjective' }, // Beautiful
  { val: 'Cantik', type: 'adjective' }, // Pretty
  { val: 'Permai', type: 'adjective' }, // Scenic
  { val: 'Molek', type: 'adjective' }, // Lovely
  { val: 'Elok', type: 'adjective' }, // Fine/Good
  { val: 'Bagus', type: 'adjective' }, // Good
  { val: 'Baik', type: 'adjective' }, // Good
  { val: 'Buruk', type: 'adjective' }, // Bad
  { val: 'Jahat', type: 'adjective' }, // Evil
  { val: 'Suci', type: 'adjective' }, // Holy
  { val: 'Keramat', type: 'adjective' }, // Sacred
  { val: 'Sakti', type: 'adjective' }, // Powerful
  { val: 'Tinggi', type: 'adjective' }, // High
  { val: 'Rendah', type: 'adjective' }, // Low
  { val: 'Panjang', type: 'adjective' }, // Long
  { val: 'Pendek', type: 'adjective' }, // Short
  { val: 'Luas', type: 'adjective' }, // Wide
  { val: 'Sempit', type: 'adjective' }, // Narrow
  { val: 'Dalam', type: 'adjective' }, // Deep
  { val: 'Dangkal', type: 'adjective' }, // Shallow
  { val: 'Kering', type: 'adjective' }, // Dry
  { val: 'Basah', type: 'adjective' }, // Wet
  { val: 'Panas', type: 'adjective' }, // Hot
  { val: 'Dingin', type: 'adjective' }, // Cold
  { val: 'Sejuk', type: 'adjective' }, // Cool
  { val: 'Hangat', type: 'adjective' }, // Warm
  { val: 'Terang', type: 'adjective' }, // Bright
  { val: 'Gelap', type: 'adjective' }, // Dark
  { val: 'Sunyi', type: 'adjective' }, // Quiet
  { val: 'Ramai', type: 'adjective' }, // Crowded/Busy
  { val: 'Sepi', type: 'adjective' }, // Quiet/Lonely
  { val: 'Bersih', type: 'adjective' }, // Clean
  { val: 'Kotor', type: 'adjective' }, // Dirty
  { val: 'Putih', type: 'adjective' }, // White
  { val: 'Hitam', type: 'adjective' }, // Black
  { val: 'Merah', type: 'adjective' }, // Red
  { val: 'Biru', type: 'adjective' }, // Blue
  { val: 'Hijau', type: 'adjective' }, // Green
  { val: 'Kuning', type: 'adjective' }, // Yellow
  { val: 'Jingga', type: 'adjective' }, // Orange
  { val: 'Ungu', type: 'adjective' }, // Purple
  { val: 'Kelabu', type: 'adjective' }, // Grey
  { val: 'Emas', type: 'adjective' }, // Gold
  { val: 'Perak', type: 'adjective' }, // Silver
  { val: 'Utara', type: 'adjective' }, // North
  { val: 'Selatan', type: 'adjective' }, // South
  { val: 'Barat', type: 'adjective' }, // West
  { val: 'Timur', type: 'adjective' }, // East
  { val: 'Tengah', type: 'adjective' }, // Center/Middle
  { val: 'Pusat', type: 'adjective' }, // Center
  { val: 'Hulu', type: 'adjective' }, // Upstream
  { val: 'Hilir', type: 'adjective' }, // Downstream
  { val: 'Laut', type: 'adjective' }, // Sea/Seaward
  { val: 'Darat', type: 'adjective' }, // Land/Inland
  { val: 'Atas', type: 'adjective' }, // Upper
  { val: 'Bawah', type: 'adjective' }, // Lower
  { val: 'Maju', type: 'adjective' }, // Advanced/Forward
  { val: 'Makmur', type: 'adjective' }, // Prosperous
  { val: 'Sentosa', type: 'adjective' }, // Peaceful
  { val: 'Abadi', type: 'adjective' }, // Eternal
  { val: 'Lestari', type: 'adjective' }, // Everlasting

  // Javanese Specific Adjectives
  { val: 'Ageng', type: 'adjective', lang: 'jv' }, // Great
  { val: 'Alit', type: 'adjective', lang: 'jv' }, // Small
  { val: 'Asri', type: 'adjective', lang: 'jv' }, // Beautiful/Green
  { val: 'Anyar', type: 'adjective', lang: 'jv' }, // New
  { val: 'Lawas', type: 'adjective', lang: 'jv' }, // Old
  { val: 'Kidul', type: 'adjective', lang: 'jv' }, // South
  { val: 'Lor', type: 'adjective', lang: 'jv' }, // North
  { val: 'Wetan', type: 'adjective', lang: 'jv' }, // East
  { val: 'Kulon', type: 'adjective', lang: 'jv' }, // West
  { val: 'Manis', type: 'adjective', lang: 'jv' }, // Sweet/Cute
  { val: 'Gede', type: 'adjective', lang: 'jv' }, // Big (Low Jav)
  
  // ============================
  // SUFFIXES / COMPOUNDS (Mostly Javanese/Sanskrit influence for ID)
  // ============================
  { val: 'rejo', type: 'suffix', lang: 'id' }, // Prosperous (Javanese)
  { val: 'sari', type: 'suffix', lang: 'id' }, // Essence/Flower
  { val: 'karta', type: 'suffix', lang: 'id' }, // Work/Prosperous
  { val: 'jakarta', type: 'suffix', lang: 'id' }, // (Special case)
  { val: 'pura', type: 'suffix', lang: 'id' }, // City/Temple
  { val: 'puri', type: 'suffix', lang: 'id' }, // Castle
  { val: 'baya', type: 'suffix', lang: 'id' }, // Fear/Danger (Surabaya)
  { val: 'baru', type: 'suffix' }, // New (Pekanbaru)
  { val: 'lama', type: 'suffix' }, // Old
  { val: 'an', type: 'suffix' }, // Generic suffix (Pasuruan)
  { val: 'mas', type: 'suffix' }, // Gold (Banyumas)
  { val: 'wangi', type: 'suffix' }, // Fragrant (Banyuwangi)
  { val: 'bumi', type: 'suffix', lang: 'id' }, // Earth (Sukabumi)
  { val: 'negara', type: 'suffix' }, // Country (Jatinagara)
  { val: 'harjo', type: 'suffix', lang: 'id' }, // Prosperous (Javanese variant of rejo)
  { val: 'mulyo', type: 'suffix', lang: 'id' }, // Noble (Javanese)
  { val: 'kusuma', type: 'suffix', lang: 'id' }, // Flower
  { val: 'goro', type: 'suffix', lang: 'id' }, // Mountain (Bojsonegoro - giri)
  { val: 'giri', type: 'suffix', lang: 'id' }, // Mountain (Wonogiri)
  { val: 'wono', type: 'suffix', lang: 'id' }, // Forest (often prefix but can be suffix stem)

  // Javanese Specific Suffixes/Stems
  { val: 'kerto', type: 'suffix', lang: 'jv' }, // Karta in Jav
  { val: 'puro', type: 'suffix', lang: 'jv' }, // Pura in Jav
  { val: 'harjo', type: 'suffix', lang: 'jv' }, // Prosperous
  { val: 'mulyo', type: 'suffix', lang: 'jv' }, // Noble
  { val: 'kusumo', type: 'suffix', lang: 'jv' }, // Flower
  { val: 'goro', type: 'suffix', lang: 'jv' }, // Mountain
  { val: 'toro', type: 'suffix', lang: 'jv' }, 
  { val: 'suro', type: 'suffix', lang: 'jv' }, // Brave/Shark
  { val: 'progo', type: 'suffix', lang: 'jv' }, // River name
  { val: 'binangun', type: 'suffix', lang: 'jv' }, // Built up
  { val: 'winangun', type: 'suffix', lang: 'jv' }, 
  { val: 'dadi', type: 'suffix', lang: 'jv' }, // Become
];
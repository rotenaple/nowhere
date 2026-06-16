export type RomanceEntry = string | readonly [string, string] | readonly [string, 'm' | 'f' | 'n']; 

export interface RomanceComponent {
  def: string; 
  // Granular Types
  type: 
    | 'geo_major'   // Mountains, Rivers, Seas, Forests (Primary Features)
    | 'geo_minor'   // Caves, Rocks, Paths (Secondary Features)
    | 'settlement'  // Cities, Buildings, Infrastructure
    | 'bio_flora'   // Plants, Trees
    | 'bio_fauna'   // Animals
    | 'abstract'    // Concepts, Titles, Materials, Time, Weather
    | 'adj_color'   // Colors
    | 'adj_geo'     // Physical descriptors (Rocky, Deep, High)
    | 'adj_quality' // Subjective/Status (Royal, New, Good, Saint)
    | 'root'        // Fallback
    | 'suffix' 
    | 'prefix' 
    | 'country_suffix';
  
  es?: RomanceEntry; 
  it?: RomanceEntry; 
  fr?: RomanceEntry; 
  pt?: RomanceEntry; 
  ro?: RomanceEntry; 
  
  tags?: string[]; 
}

export const getRomData = (entry: RomanceEntry | undefined): { val: string, gender?: string } => {
  if (!entry) return { val: '' };
  if (typeof entry === 'string') return { val: entry };
  return { val: entry[0], gender: entry[1] };
};


export const ROMANCE_DATA: RomanceComponent[] = [
  // ==========================
  // 1. ADJECTIVES - QUALITY (Subjective, Status, Age, Goodness)
  // ==========================
  { def: 'New', type: 'adj_quality', tags: ['pre'], es: 'Nuevo', it: 'Nuovo', fr: ['Nouveau', 'Nouvelle'], pt: 'Novo', ro: 'Nou' },
  { def: 'Old', type: 'adj_quality', tags: ['pre'], es: 'Viejo', it: 'Vecchio', fr: ['Vieux', 'Vieille'], pt: 'Velho', ro: 'Vechi' },
  { def: 'Good', type: 'adj_quality', tags: ['pre'], es: 'Buen', it: 'Buon', fr: ['Bon', 'Bonne'], pt: 'Bom', ro: 'Bun' },
  { def: 'Bad', type: 'adj_quality', tags: ['pre'], es: 'Mal', it: 'Mal', fr: 'Mauvais', pt: 'Mau', ro: 'Rău' },
  { def: 'Beautiful', type: 'adj_quality', tags: ['pre'], es: 'Bello', it: 'Bello', fr: ['Beau', 'Belle'], pt: 'Belo', ro: 'Frumos' },
  { def: 'Great', type: 'adj_quality', tags: ['pre'], es: 'Gran', it: 'Gran', fr: 'Grand', pt: 'Grande', ro: 'Mare' },
  { def: 'Small', type: 'adj_quality', tags: ['pre'], es: 'Pequeño', it: 'Piccolo', fr: 'Petit', pt: 'Pequeno', ro: 'Mic' },
  { def: 'Big', type: 'adj_quality', tags: ['pre'], es: 'Grande', it: 'Grande', fr: ['Gros', 'Grosse'], pt: 'Grande', ro: 'Mare' },
  { def: 'Saint', type: 'adj_quality', tags: ['pre'], es: 'Santo', it: 'Santo', fr: 'Saint', pt: 'Santo', ro: 'Sfânt' },
  { def: 'Royal', type: 'adj_quality', es: 'Real', it: 'Reale', fr: 'Royal', pt: 'Real', ro: 'Regal' },
  { def: 'Imperial', type: 'adj_quality', es: 'Imperial', it: 'Imperiale', fr: 'Impérial', pt: 'Imperial', ro: 'Imperial' },
  { def: 'Noble', type: 'adj_quality', es: 'Noble', it: 'Nobile', fr: ['Noble', 'Noble'], pt: 'Nobre', ro: 'Nobil' },
  { def: 'Divine', type: 'adj_quality', es: 'Divino', it: 'Divino', fr: 'Divin', pt: 'Divino', ro: 'Divin' },
  { def: 'Public', type: 'adj_quality', es: 'Público', it: 'Pubblico', fr: ['Public', 'Publique'], pt: 'Público', ro: 'Public' },
  { def: 'Private', type: 'adj_quality', es: 'Privado', it: 'Privato', fr: 'Privé', pt: 'Privado', ro: 'Privat' },
  { def: 'Happy', type: 'adj_quality', es: 'Feliz', it: 'Felice', fr: ['Heureux', 'Heureuse'], pt: 'Feliz', ro: 'Fericit' },
  { def: 'Sad', type: 'adj_quality', es: 'Triste', it: 'Triste', fr: ['Triste', 'Triste'], pt: 'Triste', ro: 'Trist' },
  { def: 'Brave', type: 'adj_quality', es: 'Valiente', it: 'Coraggioso', fr: ['Brave', 'Brave'], pt: 'Valente', ro: 'Curajos' },
  { def: 'True', type: 'adj_quality', es: 'Verdadero', it: 'Vero', fr: 'Vrai', pt: 'Verdadeiro', ro: 'Adevărat' },
  { def: 'False', type: 'adj_quality', es: 'Falso', it: 'Falso', fr: ['Faux', 'Fausse'], pt: 'Falso', ro: 'Fals' },
  { def: 'Rich', type: 'adj_quality', es: 'Rico', it: 'Ricco', fr: ['Riche', 'Riche'], pt: 'Rico', ro: 'Bogat' },
  { def: 'Poor', type: 'adj_quality', es: 'Pobre', it: 'Povero', fr: ['Pauvre', 'Pauvre'], pt: 'Pobre', ro: 'Sărac' },
  { def: 'Sweet', type: 'adj_quality', es: 'Dulce', it: 'Dolce', fr: ['Doux', 'Douce'], pt: 'Doce', ro: 'Dulce' },
  { def: 'Free', type: 'adj_quality', es: 'Libre', it: 'Libero', fr: ['Libre', 'Libre'], pt: 'Livre', ro: 'Liber' },
  { def: 'Wild', type: 'adj_quality', es: 'Salvaje', it: 'Selvaggio', fr: ['Sauvage', 'Sauvage'], pt: 'Selvagem', ro: 'Sălbatic' },
  { def: 'Sacred', type: 'adj_quality', es: 'Sagrado', it: 'Sacro', fr: 'Sacré', pt: 'Sagrado', ro: 'Sacru' },

  // ==========================
  // 2. ADJECTIVES - GEOGRAPHICAL (Physical description)
  // ==========================
  { def: 'High', type: 'adj_geo', tags: ['pre'], es: 'Alto', it: 'Alto', fr: 'Haut', pt: 'Alto', ro: 'Înalt' },
  { def: 'Low', type: 'adj_geo', tags: ['pre'], es: 'Bajo', it: 'Basso', fr: ['Bas', 'Basse'], pt: 'Baixo', ro: 'Jos' },
  { def: 'Long', type: 'adj_geo', es: 'Largo', it: 'Lungo', fr: ['Long', 'Longue'], pt: 'Longo', ro: 'Lung' },
  { def: 'North', type: 'adj_geo', es: 'Norte', it: 'Nord', fr: ['Nord', 'Nord'], pt: 'Norte', ro: 'Nord' },
  { def: 'South', type: 'adj_geo', es: 'Sur', it: 'Sud', fr: ['Sud', 'Sud'], pt: 'Sul', ro: 'Sud' },
  { def: 'East', type: 'adj_geo', es: 'Este', it: 'Est', fr: ['Est', 'Est'], pt: 'Leste', ro: 'Est' },
  { def: 'West', type: 'adj_geo', es: 'Oeste', it: 'Ovest', fr: ['Ouest', 'Ouest'], pt: 'Oeste', ro: 'Vest' },
  { def: 'Cold', type: 'adj_geo', es: 'Frío', it: 'Freddo', fr: 'Froid', pt: 'Frio', ro: 'Rece' },
  { def: 'Warm', type: 'adj_geo', es: 'Caliente', it: 'Caldo', fr: 'Chaud', pt: 'Quente', ro: 'Cald' },
  { def: 'Dry', type: 'adj_geo', es: 'Seco', it: 'Secco', fr: ['Sec', 'Sèche'], pt: 'Seco', ro: 'Sec' },
  { def: 'Wet', type: 'adj_geo', es: 'Húmedo', it: 'Umido', fr: ['Humide', 'Humide'], pt: 'Úmido', ro: 'Umed' },
  { def: 'Clear', type: 'adj_geo', es: 'Claro', it: 'Chiaro', fr: 'Clair', pt: 'Claro', ro: 'Clar' },
  { def: 'Dark', type: 'adj_geo', es: 'Oscuro', it: 'Scuro', fr: ['Sombre', 'Sombre'], pt: 'Escuro', ro: 'Întunecat' },
  { def: 'Upper', type: 'adj_geo', es: 'Alto', it: 'Sopra', fr: 'Supérieur', pt: 'Alto', ro: 'Sus' },
  { def: 'Lower', type: 'adj_geo', es: 'Bajo', it: 'Sotto', fr: ['Bas', 'Basse'], pt: 'Baixo', ro: 'Jos' },
  { def: 'Broad', type: 'adj_geo', es: 'Ancho', it: 'Largo', fr: ['Large', 'Large'], pt: 'Largo', ro: 'Lat' },
  { def: 'Narrow', type: 'adj_geo', es: 'Estrecho', it: 'Stretto', fr: 'Étroit', pt: 'Estreito', ro: 'Îngust' },
  { def: 'Deep', type: 'adj_geo', es: 'Profundo', it: 'Profondo', fr: 'Profond', pt: 'Profundo', ro: 'Adânc' },
  { def: 'Sharp', type: 'adj_geo', es: 'Agudo', it: 'Acuto', fr: ['Aigu', 'Aiguë'], pt: 'Agudo', ro: 'Ascuțit' },
  { def: 'Round', type: 'adj_geo', es: 'Redondo', it: 'Rotondo', fr: 'Rond', pt: 'Redondo', ro: 'Rotund' },
  { def: 'Flat', type: 'adj_geo', es: 'Llano', it: 'Piatto', fr: 'Plat', pt: 'Plano', ro: 'Plat' },
  { def: 'Steep', type: 'adj_geo', es: 'Empinado', it: 'Ripido', fr: ['Raide', 'Raide'], pt: 'Íngreme', ro: 'Abrupt' },
  { def: 'Rocky', type: 'adj_geo', es: 'Rocoso', it: 'Roccioso', fr: ['Rocheux', 'Rocheuse'], pt: 'Rochoso', ro: 'Stâncos' },
  { def: 'Sandy', type: 'adj_geo', es: 'Arenoso', it: 'Sabbioso', fr: ['Sableux', 'Sableuse'], pt: 'Arenoso', ro: 'Nisipos' },
  { def: 'Sunny', type: 'adj_geo', es: 'Soleado', it: 'Soleggiato', fr: 'Ensoleillé', pt: 'Ensolarado', ro: 'Însorit' },
  { def: 'Windy', type: 'adj_geo', es: 'Ventoso', it: 'Ventoso', fr: ['Venteux', 'Venteuse'], pt: 'Ventoso', ro: 'Vântos' },
  { def: 'Inner', type: 'adj_geo', es: 'Interior', it: 'Interiore', fr: 'Intérieur', pt: 'Interior', ro: 'Interior' },
  { def: 'Outer', type: 'adj_geo', es: 'Exterior', it: 'Esteriore', fr: 'Extérieur', pt: 'Exterior', ro: 'Exterior' },
  { def: 'Strong', type: 'adj_geo', es: 'Fuerte', it: 'Forte', fr: 'Fort', pt: 'Forte', ro: 'Tare' },
  { def: 'Weak', type: 'adj_geo', es: 'Débil', it: 'Debole', fr: ['Faible', 'Faible'], pt: 'Fraco', ro: 'Slab' },
  { def: 'Fast', type: 'adj_geo', es: 'Rápido', it: 'Rapido', fr: ['Rapide', 'Rapide'], pt: 'Rápido', ro: 'Rapid' },
  { def: 'Slow', type: 'adj_geo', es: 'Lento', it: 'Lento', fr: 'Lent', pt: 'Lento', ro: 'Lent' },
  { def: 'Silent', type: 'adj_geo', es: 'Silencioso', it: 'Silenzioso', fr: ['Silencieux', 'Silencieuse'], pt: 'Silencioso', ro: 'Tăcut' },
  { def: 'Loud', type: 'adj_geo', es: 'Ruidoso', it: 'Rumoroso', fr: 'Bruyant', pt: 'Barulhento', ro: 'Zgomotos' },
  { def: 'Empty', type: 'adj_geo', es: 'Vacío', it: 'Vuoto', fr: ['Vide', 'Vide'], pt: 'Vazio', ro: 'Gol' },
  { def: 'Full', type: 'adj_geo', es: 'Lleno', it: 'Pieno', fr: 'Plein', pt: 'Cheio', ro: 'Plin' },

  // ==========================
  // 3. ADJECTIVES - COLORS
  // ==========================
  { def: 'Golden', type: 'adj_color', es: 'Dorado', it: 'Doro', fr: 'Doré', pt: 'Dourado', ro: 'Aurit' },
  { def: 'Silver', type: 'adj_color', es: 'Plateado', it: 'Argenteo', fr: 'Argenté', pt: 'Prateado', ro: 'Argintiu' },
  { def: 'White', type: 'adj_color', es: 'Blanco', it: 'Bianco', fr: ['Blanc', 'Blanche'], pt: 'Branco', ro: 'Alb' },
  { def: 'Black', type: 'adj_color', es: 'Negro', it: 'Nero', fr: 'Noir', pt: 'Preto', ro: 'Negru' },
  { def: 'Red', type: 'adj_color', es: 'Rojo', it: 'Rosso', fr: ['Rouge', 'Rouge'], pt: 'Vermelho', ro: 'Roșu' },
  { def: 'Green', type: 'adj_color', es: 'Verde', it: 'Verde', fr: 'Vert', pt: 'Verde', ro: 'Verde' },
  { def: 'Blue', type: 'adj_color', es: 'Azul', it: 'Blu', fr: 'Bleu', pt: 'Azul', ro: 'Albastru' },
  { def: 'Yellow', type: 'adj_color', es: 'Amarillo', it: 'Giallo', fr: ['Jaune', 'Jaune'], pt: 'Amarelo', ro: 'Galben' },
  { def: 'Grey', type: 'adj_color', es: 'Gris', it: 'Grigio', fr: 'Gris', pt: 'Cinza', ro: 'Gri' },

  // ==========================
  // 4. NOUNS - GEO MAJOR (Regions, Big Features)
  // ==========================
  { def: 'River', type: 'geo_major', tags: ['common_prefix'], es: ['Río', 'm'], it: ['Fiume', 'm'], fr: ['Rivière', 'f'], pt: ['Rio', 'm'], ro: ['Râu', 'n'] },
  { def: 'Valley', type: 'geo_major', tags: ['common_prefix'], es: ['Valle', 'm'], it: ['Valle', 'f'], fr: ['Vallée', 'f'], pt: ['Vale', 'm'], ro: ['Valea', 'f'] },
  { def: 'Dale', type: 'geo_major', es: ['Cañada', 'f'], it: ['Conca', 'f'], fr: ['Vallon', 'm'], pt: ['Várzea', 'f'], ro: ['Vâlcea', 'f'] },
  { def: 'Mountain', type: 'geo_major', tags: ['common_prefix'], es: ['Montaña', 'f'], it: ['Montagna', 'f'], fr: ['Montagne', 'f'], pt: ['Serra', 'f'], ro: ['Munte', 'm'] },
  { def: 'Mount', type: 'geo_major', tags: ['common_prefix'], es: ['Monte', 'm'], it: ['Monte', 'm'], fr: ['Mont', 'm'], pt: ['Monte', 'm'], ro: ['Munte', 'm'] },
  { def: 'Peak', type: 'geo_major', es: ['Pico', 'm'], it: ['Picco', 'm'], fr: ['Pic', 'm'], pt: ['Pico', 'm'], ro: ['Vârf', 'n'] },
  { def: 'Ridge', type: 'geo_major', es: ['Cresta', 'f'], it: ['Crinale', 'm'], fr: ['Crête', 'f'], pt: ['Crista', 'f'], ro: ['Creastă', 'f'] },
  { def: 'Hill', type: 'geo_major', es: ['Colina', 'f'], it: ['Colle', 'm'], fr: ['Colline', 'f'], pt: ['Colina', 'f'], ro: ['Deal', 'n'] },
  { def: 'Forest', type: 'geo_major', es: ['Bosque', 'm'], it: ['Bosco', 'm'], fr: ['Forêt', 'f'], pt: ['Mata', 'f'], ro: ['Pădure', 'f'] },
  { def: 'Woods', type: 'geo_major', es: ['Monte', 'm'], it: ['Selva', 'f'], fr: ['Bois', 'm'], pt: ['Bosque', 'm'], ro: ['Codru', 'm'] },
  { def: 'Lake', type: 'geo_major', es: ['Lago', 'm'], it: ['Lago', 'm'], fr: ['Lac', 'm'], pt: ['Lago', 'm'], ro: ['Lac', 'n'] },
  { def: 'Sea', type: 'geo_major', es: ['Mar', 'm'], it: ['Mare', 'm'], fr: ['Mer', 'f'], pt: ['Mar', 'm'], ro: ['Mare', 'f'] },
  { def: 'Island', type: 'geo_major', tags: ['common_prefix'], es: ['Isla', 'f'], it: ['Isola', 'f'], fr: ['Île', 'f'], pt: ['Ilha', 'f'], ro: ['Insulă', 'f'] },
  { def: 'Coast', type: 'geo_major', tags: ['common_prefix'], es: ['Costa', 'f'], it: ['Costa', 'f'], fr: ['Côte', 'f'], pt: ['Costa', 'f'], ro: ['Coastă', 'f'] },
  { def: 'Beach', type: 'geo_major', tags: ['common_prefix'], es: ['Playa', 'f'], it: ['Spiaggia', 'f'], fr: ['Plage', 'f'], pt: ['Praia', 'f'], ro: ['Plajă', 'f'] },
  { def: 'Cape', type: 'geo_major', tags: ['common_prefix'], es: ['Cabo', 'm'], it: ['Capo', 'm'], fr: ['Cap', 'm'], pt: ['Cabo', 'm'], ro: ['Cap', 'n'] },
  { def: 'Bay', type: 'geo_major', es: ['Bahía', 'f'], it: ['Baia', 'f'], fr: ['Baie', 'f'], pt: ['Baía', 'f'], ro: ['Golf', 'n'] },
  { def: 'Strait', type: 'geo_major', es: ['Estrecho', 'm'], it: ['Stretto', 'm'], fr: ['Détroit', 'm'], pt: ['Estreito', 'm'], ro: ['Strâmtoare', 'f'] },
  { def: 'Delta', type: 'geo_major', es: ['Delta', 'm'], it: ['Delta', 'm'], fr: ['Delta', 'm'], pt: ['Delta', 'm'], ro: ['Delta', 'f'] },
  { def: 'Lagoon', type: 'geo_major', es: ['Laguna', 'f'], it: ['Laguna', 'f'], fr: ['Lagune', 'f'], pt: ['Lagoa', 'f'], ro: ['Lagună', 'f'] },
  { def: 'Peninsula', type: 'geo_major', es: ['Península', 'f'], it: ['Penisola', 'f'], fr: ['Péninsule', 'f'], pt: ['Península', 'f'], ro: ['Peninsulă', 'f'] },
  { def: 'Swamp', type: 'geo_major', es: ['Pantano', 'm'], it: ['Palude', 'f'], fr: ['Marais', 'm'], pt: ['Pântano', 'm'], ro: ['Mlaștină', 'f'] },
  { def: 'Marsh', type: 'geo_major', es: ['Marisma', 'f'], it: ['Acquitrino', 'm'], fr: ['Marécage', 'm'], pt: ['Pau', 'm'], ro: ['Baltă', 'f'] },
  { def: 'Plain', type: 'geo_major', es: ['Llanura', 'f'], it: ['Pianura', 'f'], fr: ['Plaine', 'f'], pt: ['Planície', 'f'], ro: ['Câmpie', 'f'] },
  { def: 'Desert', type: 'geo_major', es: ['Desierto', 'm'], it: ['Deserto', 'm'], fr: ['Désert', 'm'], pt: ['Deserto', 'm'], ro: ['Deșert', 'n'] },
  { def: 'Field', type: 'geo_major', tags: ['common_prefix'], es: ['Campo', 'm'], it: ['Campo', 'm'], fr: ['Champ', 'm'], pt: ['Campo', 'm'], ro: ['Câmp', 'n'] },
  { def: 'Meadow', type: 'geo_major', es: ['Prado', 'm'], it: ['Prato', 'm'], fr: ['Pré', 'm'], pt: ['Prado', 'm'], ro: ['Luncă', 'f'] },

  // ==========================
  // 5. NOUNS - GEO MINOR (Objects, Small Features)
  // ==========================
  { def: 'Stream', type: 'geo_minor', es: ['Arroyo', 'm'], it: ['Ruscello', 'm'], fr: ['Ruisseau', 'm'], pt: ['Córrego', 'm'], ro: ['Pârâu', 'n'] },
  { def: 'Creek', type: 'geo_minor', es: ['Riachuelo', 'm'], it: ['Torrente', 'm'], fr: ['Crique', 'f'], pt: ['Riacho', 'm'], ro: ['Gârlă', 'f'] },
  { def: 'Pond', type: 'geo_minor', es: ['Estanque', 'm'], it: ['Stagno', 'm'], fr: ['Étang', 'm'], pt: ['Lagoa', 'f'], ro: ['Baltă', 'f'] },
  { def: 'Rock', type: 'geo_minor', es: ['Roca', 'f'], it: ['Roccia', 'f'], fr: ['Roche', 'f'], pt: ['Rocha', 'f'], ro: ['Piatră', 'f'] },
  { def: 'Stone', type: 'geo_minor', tags: ['common_prefix'], es: ['Piedra', 'f'], it: ['Pietra', 'f'], fr: ['Pierre', 'f'], pt: ['Pedra', 'f'], ro: ['Piatră', 'f'] },
  { def: 'Spring', type: 'geo_minor', es: ['Manantial', 'm'], it: ['Sorgente', 'f'], fr: ['Source', 'f'], pt: ['Nascente', 'f'], ro: ['Izvor', 'n'] },
  { def: 'Cliff', type: 'geo_minor', es: ['Acantilado', 'm'], it: ['Scogliera', 'f'], fr: ['Falaise', 'f'], pt: ['Penhasco', 'm'], ro: ['Stâncă', 'f'] },
  { def: 'Cave', type: 'geo_minor', es: ['Cueva', 'f'], it: ['Grotta', 'f'], fr: ['Grotte', 'f'], pt: ['Caverna', 'f'], ro: ['Peșteră', 'f'] },
  { def: 'Grove', type: 'geo_minor', es: ['Arboleda', 'f'], it: ['Boschetto', 'm'], fr: ['Bosquet', 'm'], pt: ['Bosque', 'm'], ro: ['Dumbravă', 'f'] },
  { def: 'Path', type: 'geo_minor', es: ['Senda', 'f'], it: ['Sentiero', 'm'], fr: ['Sentier', 'm'], pt: ['Caminho', 'm'], ro: ['Potecă', 'f'] },
  { def: 'Summit', type: 'geo_minor', es: ['Cumbre', 'f'], it: ['Cima', 'f'], fr: ['Sommet', 'm'], pt: ['Cume', 'm'], ro: ['Vârf', 'n'] },
  { def: 'Slope', type: 'geo_minor', es: ['Ladera', 'f'], it: ['Pendio', 'm'], fr: ['Pente', 'f'], pt: ['Encosta', 'f'], ro: ['Pantă', 'f'] },
  { def: 'Gorge', type: 'geo_minor', es: ['Garganta', 'f'], it: ['Gola', 'f'], fr: ['Gorge', 'f'], pt: ['Garganta', 'f'], ro: ['Chei', 'f'] },
  { def: 'Dune', type: 'geo_minor', es: ['Duna', 'f'], it: ['Duna', 'f'], fr: ['Dune', 'f'], pt: ['Duna', 'f'], ro: ['Dună', 'f'] },
  { def: 'Reef', type: 'geo_minor', es: ['Arrecife', 'm'], it: ['Scoglio', 'm'], fr: ['Récif', 'm'], pt: ['Recife', 'm'], ro: ['Recif', 'n'] },
  { def: 'Ford', type: 'geo_minor', es: ['Vado', 'm'], it: ['Guado', 'm'], fr: ['Gué', 'm'], pt: ['Vau', 'm'], ro: ['Vad', 'n'] },
  { def: 'Pass', type: 'geo_minor', es: ['Paso', 'm'], it: ['Passo', 'm'], fr: ['Col', 'm'], pt: ['Passo', 'm'], ro: ['Pas', 'n'] },

  // ==========================
  // 6. NOUNS - SETTLEMENT (Civic, Built)
  // ==========================
  { def: 'Fountain', type: 'settlement', tags: ['civic'], es: ['Fuente', 'f'], it: ['Fontana', 'f'], fr: ['Fontaine', 'f'], pt: ['Fonte', 'f'], ro: ['Fântână', 'f'] },
  { def: 'City', type: 'settlement', tags: ['civic', 'common_prefix'], es: ['Ciudad', 'f'], it: ['Città', 'f'], fr: ['Ville', 'f'], pt: ['Cidade', 'f'], ro: ['Oraș', 'n'] },
  { def: 'Town', type: 'settlement', tags: ['civic'], es: ['Pueblo', 'm'], it: ['Borgo', 'm'], fr: ['Bourg', 'm'], pt: ['Vila', 'f'], ro: ['Târg', 'n'] },
  { def: 'Village', type: 'settlement', tags: ['civic', 'common_prefix'], es: ['Aldea', 'f'], it: ['Paese', 'm'], fr: ['Village', 'm'], pt: ['Aldeia', 'f'], ro: ['Sat', 'n'] },
  { def: 'Castle', type: 'settlement', tags: ['civic', 'common_prefix'], es: ['Castillo', 'm'], it: ['Castello', 'm'], fr: ['Château', 'm'], pt: ['Castelo', 'm'], ro: ['Castel', 'n'] },
  { def: 'Tower', type: 'settlement', tags: ['civic'], es: ['Torre', 'f'], it: ['Torre', 'f'], fr: ['Tour', 'f'], pt: ['Torre', 'f'], ro: ['Turn', 'n'] },
  { def: 'Bridge', type: 'settlement', tags: ['civic', 'common_prefix'], es: ['Puente', 'm'], it: ['Ponte', 'm'], fr: ['Pont', 'm'], pt: ['Ponte', 'f'], ro: ['Pod', 'n'] },
  { def: 'Port', type: 'settlement', tags: ['civic', 'common_prefix'], es: ['Puerto', 'm'], it: ['Porto', 'm'], fr: ['Port', 'm'], pt: ['Porto', 'm'], ro: ['Port', 'n'] },
  { def: 'Harbor', type: 'settlement', tags: ['civic'], es: ['Dársena', 'f'], it: ['Porto', 'm'], fr: ['Havre', 'm'], pt: ['Cais', 'm'], ro: ['Port', 'n'] },
  { def: 'Fort', type: 'settlement', tags: ['civic', 'common_prefix'], es: ['Fuerte', 'm'], it: ['Forte', 'm'], fr: ['Fort', 'm'], pt: ['Forte', 'm'], ro: ['Cetate', 'f'] },
  { def: 'Church', type: 'settlement', tags: ['civic'], es: ['Iglesia', 'f'], it: ['Chiesa', 'f'], fr: ['Église', 'f'], pt: ['Igreja', 'f'], ro: ['Biserică', 'f'] },
  { def: 'Chapel', type: 'settlement', tags: ['civic'], es: ['Capilla', 'f'], it: ['Cappella', 'f'], fr: ['Chapelle', 'f'], pt: ['Capela', 'f'], ro: ['Capelă', 'f'] },
  { def: 'Market', type: 'settlement', tags: ['civic'], es: ['Mercado', 'm'], it: ['Mercato', 'm'], fr: ['Marché', 'm'], pt: ['Mercado', 'm'], ro: ['Piață', 'f'] },
  { def: 'Wall', type: 'settlement', tags: ['civic'], es: ['Muro', 'm'], it: ['Muro', 'm'], fr: ['Mur', 'm'], pt: ['Muralha', 'f'], ro: ['Zid', 'n'] },
  { def: 'House', type: 'settlement', tags: ['civic'], es: ['Casa', 'f'], it: ['Casa', 'f'], fr: ['Maison', 'f'], pt: ['Casa', 'f'], ro: ['Casă', 'f'] },
  { def: 'Garden', type: 'settlement', tags: ['civic'], es: ['Jardín', 'm'], it: ['Giardino', 'm'], fr: ['Jardin', 'm'], pt: ['Jardim', 'm'], ro: ['Grădină', 'f'] },
  { def: 'Court', type: 'settlement', tags: ['civic'], es: ['Corte', 'f'], it: ['Corte', 'f'], fr: ['Cour', 'f'], pt: ['Corte', 'f'], ro: ['Curte', 'f'] },
  { def: 'Mill', type: 'settlement', tags: ['civic'], es: ['Molino', 'm'], it: ['Mulino', 'm'], fr: ['Moulin', 'm'], pt: ['Moinho', 'm'], ro: ['Moară', 'f'] },
  { def: 'Mine', type: 'settlement', tags: ['civic'], es: ['Mina', 'f'], it: ['Miniera', 'f'], fr: ['Mine', 'f'], pt: ['Mina', 'f'], ro: ['Mină', 'f'] },
  { def: 'Palace', type: 'settlement', tags: ['civic'], es: ['Palacio', 'm'], it: ['Palazzo', 'm'], fr: ['Palais', 'm'], pt: ['Palácio', 'm'], ro: ['Palat', 'n'] },
  { def: 'Square', type: 'settlement', tags: ['civic'], es: ['Plaza', 'f'], it: ['Piazza', 'f'], fr: ['Place', 'f'], pt: ['Praça', 'f'], ro: ['Piață', 'f'] },
  { def: 'Road', type: 'settlement', tags: ['civic'], es: ['Camino', 'm'], it: ['Strada', 'f'], fr: ['Route', 'f'], pt: ['Estrada', 'f'], ro: ['Drum', 'n'] },
  { def: 'Street', type: 'settlement', tags: ['civic'], es: ['Calle', 'f'], it: ['Via', 'f'], fr: ['Rue', 'f'], pt: ['Rua', 'f'], ro: ['Stradă', 'f'] },
  { def: 'Gate', type: 'settlement', tags: ['civic'], es: ['Puerta', 'f'], it: ['Porta', 'f'], fr: ['Porte', 'f'], pt: ['Porta', 'f'], ro: ['Poartă', 'f'] },
  { def: 'Arch', type: 'settlement', tags: ['civic'], es: ['Arco', 'm'], it: ['Arco', 'm'], fr: ['Arc', 'm'], pt: ['Arco', 'm'], ro: ['Arc', 'n'] },
  { def: 'Farm', type: 'settlement', tags: ['civic'], es: ['Granja', 'f'], it: ['Fattoria', 'f'], fr: ['Ferme', 'f'], pt: ['Fazenda', 'f'], ro: ['Fermă', 'f'] },
  { def: 'Barn', type: 'settlement', tags: ['civic'], es: ['Granero', 'm'], it: ['Granaio', 'm'], fr: ['Grange', 'f'], pt: ['Celeiro', 'm'], ro: ['Hambar', 'n'] },
  { def: 'Inn', type: 'settlement', tags: ['civic'], es: ['Posada', 'f'], it: ['Locanda', 'f'], fr: ['Auberge', 'f'], pt: ['Pousada', 'f'], ro: ['Han', 'n'] },
  { def: 'Camp', type: 'settlement', tags: ['civic'], es: ['Campo', 'm'], it: ['Campo', 'm'], fr: ['Camp', 'm'], pt: ['Campo', 'm'], ro: ['Tabără', 'f'] },
  { def: 'Well', type: 'settlement', tags: ['civic'], es: ['Pozo', 'm'], it: ['Pozzo', 'm'], fr: ['Puits', 'm'], pt: ['Poço', 'm'], ro: ['Puț', 'n'] },
  { def: 'Cross', type: 'settlement', tags: ['civic'], es: ['Cruz', 'f'], it: ['Croce', 'f'], fr: ['Croix', 'f'], pt: ['Cruz', 'f'], ro: ['Cruce', 'f'] },
  { def: 'Abbey', type: 'settlement', tags: ['civic'], es: ['Abadía', 'f'], it: ['Abbazia', 'f'], fr: ['Abbaye', 'f'], pt: ['Abadia', 'f'], ro: ['Abație', 'f'] },
  { def: 'Monastery', type: 'settlement', tags: ['civic'], es: ['Monasterio', 'm'], it: ['Monastero', 'm'], fr: ['Monastère', 'm'], pt: ['Mosteiro', 'm'], ro: ['Mănăstire', 'f'] },
  { def: 'Hermitage', type: 'settlement', tags: ['civic'], es: ['Ermita', 'f'], it: ['Eremo', 'm'], fr: ['Ermitage', 'm'], pt: ['Ermida', 'f'], ro: ['Schit', 'n'] },
  { def: 'School', type: 'settlement', tags: ['civic'], es: ['Escuela', 'f'], it: ['Scuola', 'f'], fr: ['École', 'f'], pt: ['Escola', 'f'], ro: ['Școală', 'f'] },
  { def: 'Hospital', type: 'settlement', tags: ['civic'], es: ['Hospital', 'm'], it: ['Ospedale', 'm'], fr: ['Hôpital', 'm'], pt: ['Hospital', 'm'], ro: ['Spital', 'n'] },
  { def: 'Station', type: 'settlement', tags: ['civic'], es: ['Estación', 'f'], it: ['Stazione', 'f'], fr: ['Gare', 'f'], pt: ['Estação', 'f'], ro: ['Gară', 'f'] },
  { def: 'Shrine', type: 'settlement', tags: ['civic'], es: ['Santuario', 'm'], it: ['Santuario', 'm'], fr: ['Sanctuaire', 'm'], pt: ['Santuário', 'm'], ro: ['Sanctuar', 'n'] },
  { def: 'Temple', type: 'settlement', tags: ['civic'], es: ['Templo', 'm'], it: ['Tempio', 'm'], fr: ['Temple', 'm'], pt: ['Templo', 'm'], ro: ['Templu', 'n'] },
  { def: 'Cemetery', type: 'settlement', tags: ['civic'], es: ['Cementerio', 'm'], it: ['Cimitero', 'm'], fr: ['Cimetière', 'm'], pt: ['Cemitério', 'm'], ro: ['Cimitir', 'n'] },
  { def: 'Tomb', type: 'settlement', tags: ['civic'], es: ['Tumba', 'f'], it: ['Tomba', 'f'], fr: ['Tombe', 'f'], pt: ['Tumba', 'f'], ro: ['Mormânt', 'n'] },
  { def: 'Villa', type: 'settlement', tags: ['civic', 'common_prefix', 'fem_head'], es: ['Villa', 'f'], it: ['Villa', 'f'], fr: ['Ville', 'f'], pt: ['Vila', 'f'], ro: ['Vilă', 'f'] },
  { def: 'Manor', type: 'settlement', tags: ['civic'], es: ['Mansión', 'f'], it: ['Maniero', 'm'], fr: ['Manoir', 'm'], pt: ['Mansão', 'f'], ro: ['Conac', 'n'] },
  { def: 'Cabin', type: 'settlement', tags: ['civic'], es: ['Cabaña', 'f'], it: ['Capanna', 'f'], fr: ['Cabane', 'f'], pt: ['Cabana', 'f'], ro: ['Cabană', 'f'] },
  { def: 'Hut', type: 'settlement', tags: ['civic'], es: ['Choza', 'f'], it: ['Baita', 'f'], fr: ['Hutte', 'f'], pt: ['Palhoça', 'f'], ro: ['Colibă', 'f'] },
  { def: 'Shelter', type: 'settlement', tags: ['civic'], es: ['Refugio', 'm'], it: ['Rifugio', 'm'], fr: ['Refuge', 'm'], pt: ['Abrigo', 'm'], ro: ['Adăpost', 'n'] },
  { def: 'Dock', type: 'settlement', tags: ['civic'], es: ['Muelle', 'm'], it: ['Molo', 'm'], fr: ['Quai', 'm'], pt: ['Doca', 'f'], ro: ['Doc', 'n'] },
  { def: 'Orchard', type: 'settlement', tags: ['nature'], es: ['Huerto', 'm'], it: ['Frutteto', 'm'], fr: ['Verger', 'm'], pt: ['Pomar', 'm'], ro: ['Livadă', 'f'] },

  // ==========================
  // 7. NOUNS - BIO FAUNA (Animals)
  // ==========================
  { def: 'Wolf', type: 'bio_fauna', tags: ['animal'], es: ['Lobo', 'm'], it: ['Lupo', 'm'], fr: ['Loup', 'm'], pt: ['Lobo', 'm'], ro: ['Lup', 'm'] },
  { def: 'Bear', type: 'bio_fauna', tags: ['animal'], es: ['Oso', 'm'], it: ['Orso', 'm'], fr: ['Ours', 'm'], pt: ['Urso', 'm'], ro: ['Urs', 'm'] },
  { def: 'Fox', type: 'bio_fauna', tags: ['animal'], es: ['Zorro', 'm'], it: ['Volpe', 'f'], fr: ['Renard', 'm'], pt: ['Raposa', 'f'], ro: ['Vulpe', 'f'] },
  { def: 'Eagle', type: 'bio_fauna', tags: ['animal'], es: ['Águila', 'f'], it: ['Aquila', 'f'], fr: ['Aigle', 'm'], pt: ['Águia', 'f'], ro: ['Vultur', 'm'] },
  { def: 'Lion', type: 'bio_fauna', tags: ['animal'], es: ['León', 'm'], it: ['Leone', 'm'], fr: ['Lion', 'm'], pt: ['Leão', 'm'], ro: ['Leu', 'm'] },
  { def: 'Deer', type: 'bio_fauna', tags: ['animal'], es: ['Ciervo', 'm'], it: ['Cervo', 'm'], fr: ['Cerf', 'm'], pt: ['Veado', 'm'], ro: ['Cerb', 'm'] },
  { def: 'Horse', type: 'bio_fauna', tags: ['animal'], es: ['Caballo', 'm'], it: ['Cavallo', 'm'], fr: ['Cheval', 'm'], pt: ['Cavalo', 'm'], ro: ['Cal', 'm'] },
  { def: 'Bird', type: 'bio_fauna', tags: ['animal'], es: ['Ave', 'f'], it: ['Uccello', 'm'], fr: ['Oiseau', 'm'], pt: ['Ave', 'f'], ro: ['Pasăre', 'f'] },
  { def: 'Falcon', type: 'bio_fauna', tags: ['animal'], es: ['Halcón', 'm'], it: ['Falco', 'm'], fr: ['Faucon', 'm'], pt: ['Falcão', 'm'], ro: ['Șoim', 'm'] },
  { def: 'Fish', type: 'bio_fauna', tags: ['animal'], es: ['Pez', 'm'], it: ['Pesce', 'm'], fr: ['Poisson', 'm'], pt: ['Peixe', 'm'], ro: ['Pește', 'm'] },
  { def: 'Bull', type: 'bio_fauna', tags: ['animal'], es: ['Toro', 'm'], it: ['Toro', 'm'], fr: ['Taureau', 'm'], pt: ['Touro', 'm'], ro: ['Taur', 'm'] },
  { def: 'Cow', type: 'bio_fauna', tags: ['animal'], es: ['Vaca', 'f'], it: ['Mucca', 'f'], fr: ['Vache', 'f'], pt: ['Vaca', 'f'], ro: ['Vaca', 'f'] },
  { def: 'Lamb', type: 'bio_fauna', tags: ['animal'], es: ['Cordero', 'm'], it: ['Agnello', 'm'], fr: ['Agneau', 'm'], pt: ['Cordeiro', 'm'], ro: ['Miel', 'm'] },
  { def: 'Boar', type: 'bio_fauna', tags: ['animal'], es: ['Jabalí', 'm'], it: ['Cinghiale', 'm'], fr: ['Sanglier', 'm'], pt: ['Javali', 'm'], ro: ['Mistreț', 'm'] },
  { def: 'Raven', type: 'bio_fauna', tags: ['animal'], es: ['Cuervo', 'm'], it: ['Corvo', 'm'], fr: ['Corbeau', 'm'], pt: ['Corvo', 'm'], ro: ['Corb', 'm'] },
  { def: 'Swan', type: 'bio_fauna', tags: ['animal'], es: ['Cisne', 'm'], it: ['Cigno', 'm'], fr: ['Cygne', 'm'], pt: ['Cisne', 'm'], ro: ['Lebădă', 'f'] },
  { def: 'Dove', type: 'bio_fauna', tags: ['animal'], es: ['Paloma', 'f'], it: ['Colomba', 'f'], fr: ['Colombe', 'f'], pt: ['Pomba', 'f'], ro: ['Porumbel', 'm'] },
  { def: 'Snake', type: 'bio_fauna', tags: ['animal'], es: ['Serpiente', 'f'], it: ['Serpente', 'm'], fr: ['Serpent', 'm'], pt: ['Serpente', 'f'], ro: ['Șarpe', 'm'] },
  { def: 'Dragon', type: 'bio_fauna', tags: ['animal'], es: ['Dragón', 'm'], it: ['Drago', 'm'], fr: ['Dragon', 'm'], pt: ['Dragão', 'm'], ro: ['Dragon', 'm'] },
  { def: 'Goat', type: 'bio_fauna', tags: ['animal'], es: ['Cabra', 'f'], it: ['Capra', 'f'], fr: ['Chèvre', 'f'], pt: ['Cabra', 'f'], ro: ['Capră', 'f'] },
  { def: 'Sheep', type: 'bio_fauna', tags: ['animal'], es: ['Oveja', 'f'], it: ['Pecora', 'f'], fr: ['Mouton', 'm'], pt: ['Ovelha', 'f'], ro: ['Oaie', 'f'] },
  { def: 'Pig', type: 'bio_fauna', tags: ['animal'], es: ['Cerdo', 'm'], it: ['Maiale', 'm'], fr: ['Cochon', 'm'], pt: ['Porco', 'm'], ro: ['Porc', 'm'] },
  { def: 'Rooster', type: 'bio_fauna', tags: ['animal'], es: ['Gallo', 'm'], it: ['Gallo', 'm'], fr: ['Coq', 'm'], pt: ['Galo', 'm'], ro: ['Cocoș', 'm'] },
  { def: 'Hen', type: 'bio_fauna', tags: ['animal'], es: ['Gallina', 'f'], it: ['Gallina', 'f'], fr: ['Poule', 'f'], pt: ['Galinha', 'f'], ro: ['Găină', 'f'] },
  { def: 'Duck', type: 'bio_fauna', tags: ['animal'], es: ['Pato', 'm'], it: ['Anatra', 'f'], fr: ['Canard', 'm'], pt: ['Pato', 'm'], ro: ['Rață', 'f'] },
  { def: 'Goose', type: 'bio_fauna', tags: ['animal'], es: ['Ganso', 'm'], it: ['Oca', 'f'], fr: ['Oie', 'f'], pt: ['Ganso', 'm'], ro: ['Gâscă', 'f'] },
  { def: 'Owl', type: 'bio_fauna', tags: ['animal'], es: ['Búho', 'm'], it: ['Gufo', 'm'], fr: ['Hibou', 'm'], pt: ['Coruja', 'f'], ro: ['Bufniță', 'f'] },
  { def: 'Frog', type: 'bio_fauna', tags: ['animal'], es: ['Rana', 'f'], it: ['Rana', 'f'], fr: ['Grenouille', 'f'], pt: ['Rã', 'f'], ro: ['Broască', 'f'] },
  { def: 'Butterfly', type: 'bio_fauna', tags: ['animal'], es: ['Mariposa', 'f'], it: ['Farfalla', 'f'], fr: ['Papillon', 'm'], pt: ['Borboleta', 'f'], ro: ['Fluture', 'm'] },

  // ==========================
  // 8. NOUNS - BIO FLORA (Plants, Trees)
  // ==========================
  { def: 'Oak', type: 'bio_flora', tags: ['tree'], es: ['Roble', 'm'], it: ['Quercia', 'f'], fr: ['Chêne', 'm'], pt: ['Carvalho', 'm'], ro: ['Stejar', 'm'] },
  { def: 'Pine', type: 'bio_flora', tags: ['tree'], es: ['Pino', 'm'], it: ['Pino', 'm'], fr: ['Pin', 'm'], pt: ['Pinheiro', 'm'], ro: ['Brad', 'm'] },
  { def: 'Birch', type: 'bio_flora', tags: ['tree'], es: ['Abedul', 'm'], it: ['Betulla', 'f'], fr: ['Bouleau', 'm'], pt: ['Bétula', 'f'], ro: ['Mesteacăn', 'm'] },
  { def: 'Willow', type: 'bio_flora', tags: ['tree'], es: ['Sauce', 'm'], it: ['Salice', 'm'], fr: ['Saule', 'm'], pt: ['Salgueiro', 'm'], ro: ['Salcie', 'f'] },
  { def: 'Apple', type: 'bio_flora', tags: ['tree'], es: ['Manzano', 'm'], it: ['Melo', 'm'], fr: ['Pommier', 'm'], pt: ['Macieira', 'f'], ro: ['Măr', 'm'] },
  { def: 'Olive', type: 'bio_flora', tags: ['tree'], es: ['Olivo', 'm'], it: ['Olivo', 'm'], fr: ['Olivier', 'm'], pt: ['Oliveira', 'f'], ro: ['Măslin', 'm'] },
  { def: 'Rose', type: 'bio_flora', tags: ['tree'], es: ['Rosa', 'f'], it: ['Rosa', 'f'], fr: ['Rose', 'f'], pt: ['Rosa', 'f'], ro: ['Trandafir', 'm'] },
  { def: 'Palm', type: 'bio_flora', tags: ['tree'], es: ['Palma', 'f'], it: ['Palma', 'f'], fr: ['Palme', 'f'], pt: ['Palma', 'f'], ro: ['Palmier', 'm'] },
  { def: 'Elm', type: 'bio_flora', tags: ['tree'], es: ['Olmo', 'm'], it: ['Olmo', 'm'], fr: ['Orme', 'm'], pt: ['Olmo', 'm'], ro: ['Ulm', 'm'] },
  { def: 'Ash', type: 'bio_flora', tags: ['tree'], es: ['Fresno', 'm'], it: ['Frassino', 'm'], fr: ['Frêne', 'm'], pt: ['Freixo', 'm'], ro: ['Frasin', 'm'] },
  { def: 'Cedar', type: 'bio_flora', tags: ['tree'], es: ['Cedro', 'm'], it: ['Cedro', 'm'], fr: ['Cèdre', 'm'], pt: ['Cedro', 'm'], ro: ['Cedru', 'm'] },
  { def: 'Poplar', type: 'bio_flora', tags: ['tree'], es: ['Álamo', 'm'], it: ['Pioppo', 'm'], fr: ['Peuplier', 'm'], pt: ['Álamo', 'm'], ro: ['Plop', 'm'] },
  { def: 'Lily', type: 'bio_flora', tags: ['tree'], es: ['Lirio', 'm'], it: ['Giglio', 'm'], fr: ['Lys', 'm'], pt: ['Lírio', 'm'], ro: ['Crin', 'm'] },
  { def: 'Vine', type: 'bio_flora', tags: ['tree'], es: ['Viña', 'f'], it: ['Vigna', 'f'], fr: ['Vigne', 'f'], pt: ['Vinha', 'f'], ro: ['Vie', 'f'] },
  { def: 'Wheat', type: 'bio_flora', tags: ['tree'], es: ['Trigo', 'm'], it: ['Grano', 'm'], fr: ['Blé', 'm'], pt: ['Trigo', 'm'], ro: ['Grâu', 'n'] },
  { def: 'Flower', type: 'bio_flora', tags: ['tree'], es: ['Flor', 'f'], it: ['Fiore', 'm'], fr: ['Fleur', 'f'], pt: ['Flor', 'f'], ro: ['Floare', 'f'] },
  { def: 'Pear', type: 'bio_flora', tags: ['tree'], es: ['Peral', 'm'], it: ['Pero', 'm'], fr: ['Poirier', 'm'], pt: ['Pereira', 'f'], ro: ['Păr', 'm'] },
  { def: 'Cherry', type: 'bio_flora', tags: ['tree'], es: ['Cerezo', 'm'], it: ['Ciliegio', 'm'], fr: ['Cerisier', 'm'], pt: ['Cerejeira', 'f'], ro: ['Cireș', 'm'] },
  { def: 'Beech', type: 'bio_flora', tags: ['tree'], es: ['Haya', 'f'], it: ['Faggio', 'm'], fr: ['Hêtre', 'm'], pt: ['Faia', 'f'], ro: ['Fag', 'm'] },
  { def: 'Maple', type: 'bio_flora', tags: ['tree'], es: ['Arce', 'm'], it: ['Acero', 'm'], fr: ['Érable', 'm'], pt: ['Bordo', 'm'], ro: ['Arțar', 'm'] },
  { def: 'LimeTree', type: 'bio_flora', tags: ['tree'], es: ['Tilo', 'm'], it: ['Tiglio', 'm'], fr: ['Tilleul', 'm'], pt: ['Tília', 'f'], ro: ['Tei', 'm'] },
  { def: 'Chestnut', type: 'bio_flora', tags: ['tree'], es: ['Castaño', 'm'], it: ['Castagno', 'm'], fr: ['Châtaignier', 'm'], pt: ['Castanheiro', 'm'], ro: ['Castan', 'm'] },
  { def: 'Walnut', type: 'bio_flora', tags: ['tree'], es: ['Nogal', 'm'], it: ['Noce', 'm'], fr: ['Noyer', 'm'], pt: ['Nogueira', 'f'], ro: ['Nuc', 'm'] },
  { def: 'Fig', type: 'bio_flora', tags: ['tree'], es: ['Higuera', 'f'], it: ['Fico', 'm'], fr: ['Figuier', 'm'], pt: ['Figueira', 'f'], ro: ['Smochin', 'm'] },
  { def: 'Almond', type: 'bio_flora', tags: ['tree'], es: ['Almendro', 'm'], it: ['Mandorlo', 'm'], fr: ['Amandier', 'm'], pt: ['Amendoeira', 'f'], ro: ['Migdal', 'm'] },
  { def: 'Laurel', type: 'bio_flora', tags: ['tree'], es: ['Laurel', 'm'], it: ['Alloro', 'm'], fr: ['Laurier', 'm'], pt: ['Loureiro', 'm'], ro: ['Laur', 'm'] },
  { def: 'Thorn', type: 'bio_flora', es: ['Espina', 'f'], it: ['Spina', 'f'], fr: ['Épine', 'f'], pt: ['Espinho', 'm'], ro: ['Spin', 'm'] },
  { def: 'Grape', type: 'bio_flora', es: ['Uva', 'f'], it: ['Uva', 'f'], fr: ['Raisin', 'm'], pt: ['Uva', 'f'], ro: ['Strugure', 'm'] },
  { def: 'Lemon', type: 'bio_flora', es: ['Limón', 'm'], it: ['Limone', 'm'], fr: ['Citron', 'm'], pt: ['Limão', 'm'], ro: ['Lămâie', 'f'] },

  // ==========================
  // 9. NOUNS - ABSTRACT (Concepts, Materials, Titles, Time, Weather)
  // ==========================
  { def: 'View', type: 'abstract', tags: ['common_prefix'], es: ['Vista', 'f'], it: ['Vista', 'f'], fr: ['Vue', 'f'], pt: ['Vista', 'f'], ro: ['Vedere', 'f'] },
  { def: 'Light', type: 'abstract', es: ['Luz', 'f'], it: ['Luce', 'f'], fr: ['Lumière', 'f'], pt: ['Luz', 'f'], ro: ['Lumină', 'f'] },
  { def: 'Sun', type: 'abstract', es: ['Sol', 'm'], it: ['Sole', 'm'], fr: ['Soleil', 'm'], pt: ['Sol', 'm'], ro: ['Soare', 'm'] },
  { def: 'Moon', type: 'abstract', es: ['Luna', 'f'], it: ['Luna', 'f'], fr: ['Lune', 'f'], pt: ['Lua', 'f'], ro: ['Lună', 'f'] },
  { def: 'Star', type: 'abstract', es: ['Estrella', 'f'], it: ['Stella', 'f'], fr: ['Étoile', 'f'], pt: ['Estrela', 'f'], ro: ['Stea', 'f'] },
  { def: 'Wind', type: 'abstract', es: ['Viento', 'm'], it: ['Vento', 'm'], fr: ['Vent', 'm'], pt: ['Vento', 'm'], ro: ['Vânt', 'n'] },
  { def: 'Rain', type: 'abstract', es: ['Lluvia', 'f'], it: ['Pioggia', 'f'], fr: ['Pluie', 'f'], pt: ['Chuva', 'f'], ro: ['Ploaie', 'f'] },
  { def: 'Snow', type: 'abstract', es: ['Nieve', 'f'], it: ['Neve', 'f'], fr: ['Neige', 'f'], pt: ['Neve', 'f'], ro: ['Zăpadă', 'f'] },
  { def: 'Ice', type: 'abstract', es: ['Hielo', 'm'], it: ['Ghiaccio', 'm'], fr: ['Glace', 'f'], pt: ['Gelo', 'm'], ro: ['Gheață', 'f'] },
  { def: 'Fog', type: 'abstract', es: ['Niebla', 'f'], it: ['Nebbia', 'f'], fr: ['Brouillard', 'm'], pt: ['Nevoeiro', 'm'], ro: ['Ceață', 'f'] },
  { def: 'Mist', type: 'abstract', es: ['Neblina', 'f'], it: ['Foschia', 'f'], fr: ['Brume', 'f'], pt: ['Bruma', 'f'], ro: ['Negură', 'f'] },
  { def: 'Storm', type: 'abstract', es: ['Tormenta', 'f'], it: ['Tempesta', 'f'], fr: ['Tempête', 'f'], pt: ['Tempestade', 'f'], ro: ['Furtună', 'f'] },
  { def: 'Thunder', type: 'abstract', es: ['Trueno', 'm'], it: ['Tuono', 'm'], fr: ['Tonnerre', 'm'], pt: ['Trovão', 'm'], ro: ['Tunet', 'n'] },
  { def: 'Lightning', type: 'abstract', es: ['Rayo', 'm'], it: ['Fulmine', 'm'], fr: ['Éclair', 'm'], pt: ['Relâmpago', 'm'], ro: ['Fulger', 'n'] },
  { def: 'Winter', type: 'abstract', es: ['Invierno', 'm'], it: ['Inverno', 'm'], fr: ['Hiver', 'm'], pt: ['Inverno', 'm'], ro: ['Iarnă', 'f'] },
  { def: 'Summer', type: 'abstract', es: ['Verano', 'm'], it: ['Estate', 'm'], fr: ['Été', 'm'], pt: ['Verão', 'm'], ro: ['Vară', 'f'] },
  { def: 'SpringSeason', type: 'abstract', es: ['Primavera', 'f'], it: ['Primavera', 'f'], fr: ['Printemps', 'm'], pt: ['Primavera', 'f'], ro: ['Primăvară', 'f'] },
  { def: 'Autumn', type: 'abstract', es: ['Otoño', 'm'], it: ['Autunno', 'm'], fr: ['Automne', 'm'], pt: ['Outono', 'm'], ro: ['Toamnă', 'f'] },
  { def: 'Morning', type: 'abstract', es: ['Mañana', 'f'], it: ['Mattina', 'f'], fr: ['Matin', 'm'], pt: ['Manhã', 'f'], ro: ['Dimineață', 'f'] },
  { def: 'Night', type: 'abstract', es: ['Noche', 'f'], it: ['Notte', 'f'], fr: ['Nuit', 'f'], pt: ['Noite', 'f'], ro: ['Noapte', 'f'] },
  { def: 'Shadow', type: 'abstract', es: ['Sombra', 'f'], it: ['Ombra', 'f'], fr: ['Ombre', 'f'], pt: ['Sombra', 'f'], ro: ['Umbră', 'f'] },
  { def: 'King', type: 'abstract', es: ['Rey', 'm'], it: ['Re', 'm'], fr: ['Roi', 'm'], pt: ['Rei', 'm'], ro: ['Rege', 'm'] },
  { def: 'Queen', type: 'abstract', es: ['Reina', 'f'], it: ['Regina', 'f'], fr: ['Reine', 'f'], pt: ['Rainha', 'f'], ro: ['Regină', 'f'] },
  { def: 'Prince', type: 'abstract', es: ['Príncipe', 'm'], it: ['Principe', 'm'], fr: ['Prince', 'm'], pt: ['Príncipe', 'm'], ro: ['Prinț', 'm'] },
  { def: 'Lady', type: 'abstract', es: ['Dama', 'f'], it: ['Donna', 'f'], fr: ['Dame', 'f'], pt: ['Dama', 'f'], ro: ['Doamnă', 'f'] },
  { def: 'Knight', type: 'abstract', es: ['Caballero', 'm'], it: ['Cavaliere', 'm'], fr: ['Chevalier', 'm'], pt: ['Cavaleiro', 'm'], ro: ['Cavaler', 'm'] },
  { def: 'Bishop', type: 'abstract', es: ['Obispo', 'm'], it: ['Vescovo', 'm'], fr: ['Évêque', 'm'], pt: ['Bispo', 'm'], ro: ['Episcop', 'm'] },
  { def: 'Monk', type: 'abstract', es: ['Monje', 'm'], it: ['Monaco', 'm'], fr: ['Moine', 'm'], pt: ['Monge', 'm'], ro: ['Călugăr', 'm'] },
  { def: 'Gold', type: 'abstract', es: ['Oro', 'm'], it: ['Oro', 'm'], fr: ['Or', 'm'], pt: ['Ouro', 'm'], ro: ['Aur', 'n'] },
  { def: 'Silver', type: 'abstract', es: ['Plata', 'f'], it: ['Argento', 'm'], fr: ['Argent', 'm'], pt: ['Prata', 'f'], ro: ['Argint', 'n'] },
  { def: 'Iron', type: 'abstract', es: ['Hierro', 'm'], it: ['Ferro', 'm'], fr: ['Fer', 'm'], pt: ['Ferro', 'm'], ro: ['Fier', 'n'] },
  { def: 'Salt', type: 'abstract', es: ['Sal', 'f'], it: ['Sale', 'm'], fr: ['Sel', 'm'], pt: ['Sal', 'm'], ro: ['Sare', 'f'] },
  { def: 'Copper', type: 'abstract', es: ['Cobre', 'm'], it: ['Rame', 'm'], fr: ['Cuivre', 'm'], pt: ['Cobre', 'm'], ro: ['Cupru', 'n'] },
  { def: 'Clay', type: 'abstract', es: ['Barro', 'm'], it: ['Argilla', 'f'], fr: ['Argile', 'f'], pt: ['Barro', 'm'], ro: ['Lut', 'n'] },
  { def: 'Marble', type: 'abstract', es: ['Mármol', 'm'], it: ['Marmo', 'm'], fr: ['Marbre', 'm'], pt: ['Mármore', 'm'], ro: ['Marmură', 'f'] },
  { def: 'Glass', type: 'abstract', es: ['Cristal', 'm'], it: ['Vetro', 'm'], fr: ['Verre', 'm'], pt: ['Vidro', 'm'], ro: ['Sticlă', 'f'] },
  { def: 'Honey', type: 'abstract', es: ['Miel', 'f'], it: ['Miele', 'm'], fr: ['Miel', 'm'], pt: ['Mel', 'm'], ro: ['Miere', 'f'] },
  { def: 'Wine', type: 'abstract', es: ['Vino', 'm'], it: ['Vino', 'm'], fr: ['Vin', 'm'], pt: ['Vinho', 'm'], ro: ['Vin', 'n'] },
  { def: 'Bread', type: 'abstract', es: ['Pan', 'm'], it: ['Pane', 'm'], fr: ['Pain', 'm'], pt: ['Pão', 'm'], ro: ['Pâine', 'f'] },
  { def: 'Milk', type: 'abstract', es: ['Leche', 'f'], it: ['Latte', 'm'], fr: ['Lait', 'm'], pt: ['Leite', 'm'], ro: ['Lapte', 'm'] },
  { def: 'Cheese', type: 'abstract', es: ['Queso', 'm'], it: ['Formaggio', 'm'], fr: ['Fromage', 'm'], pt: ['Queijo', 'm'], ro: ['Brânză', 'f'] },
  { def: 'War', type: 'abstract', es: ['Guerra', 'f'], it: ['Guerra', 'f'], fr: ['Guerre', 'f'], pt: ['Guerra', 'f'], ro: ['Război', 'n'] },
  { def: 'Peace', type: 'abstract', es: ['Paz', 'f'], it: ['Pace', 'f'], fr: ['Paix', 'f'], pt: ['Paz', 'f'], ro: ['Pace', 'f'] },
  { def: 'Victory', type: 'abstract', es: ['Victoria', 'f'], it: ['Vittoria', 'f'], fr: ['Victoire', 'f'], pt: ['Vitória', 'f'], ro: ['Victorie', 'f'] },
  { def: 'Glory', type: 'abstract', es: ['Gloria', 'f'], it: ['Gloria', 'f'], fr: ['Gloire', 'f'], pt: ['Glória', 'f'], ro: ['Glorie', 'f'] },
  { def: 'Freedom', type: 'abstract', es: ['Libertad', 'f'], it: ['Libertà', 'f'], fr: ['Liberté', 'f'], pt: ['Liberdade', 'f'], ro: ['Libertate', 'f'] },
  { def: 'Hope', type: 'abstract', es: ['Esperanza', 'f'], it: ['Speranza', 'f'], fr: ['Espoir', 'm'], pt: ['Esperança', 'f'], ro: ['Speranță', 'f'] },
  { def: 'Love', type: 'abstract', es: ['Amor', 'm'], it: ['Amore', 'm'], fr: ['Amour', 'm'], pt: ['Amor', 'm'], ro: ['Iubire', 'f'] },
  { def: 'Soul', type: 'abstract', es: ['Alma', 'f'], it: ['Anima', 'f'], fr: ['Âme', 'f'], pt: ['Alma', 'f'], ro: ['Suflet', 'n'] },
  { def: 'Life', type: 'abstract', es: ['Vida', 'f'], it: ['Vita', 'f'], fr: ['Vie', 'f'], pt: ['Vida', 'f'], ro: ['Viață', 'f'] },
  { def: 'Hunter', type: 'abstract', es: ['Cazador', 'm'], it: ['Cacciatore', 'm'], fr: ['Chasseur', 'm'], pt: ['Caçador', 'm'], ro: ['Vânător', 'm'] },
  { def: 'Fisher', type: 'abstract', es: ['Pescador', 'm'], it: ['Pescatore', 'm'], fr: ['Pêcheur', 'm'], pt: ['Pescador', 'm'], ro: ['Pescar', 'm'] },
  { def: 'Smith', type: 'abstract', es: ['Herrero', 'm'], it: ['Fabbro', 'm'], fr: ['Forgeron', 'm'], pt: ['Ferreiro', 'm'], ro: ['Fierar', 'm'] },
  { def: 'Miller', type: 'abstract', es: ['Molinero', 'm'], it: ['Mugnaio', 'm'], fr: ['Meunier', 'm'], pt: ['Moleiro', 'm'], ro: ['Morar', 'm'] },

  // ==========================
  // 10. PREFIXES & HONORIFICS
  // ==========================
  { def: 'San', type: 'prefix', tags: ['fem_head'], es: 'San', it: 'San', fr: ['Saint', 'Sainte'], pt: 'São', ro: 'Sân' },
  { def: 'Santa', type: 'prefix', tags: ['fem_head'], es: 'Santa', it: 'Santa', fr: 'Sainte', pt: 'Santa', ro: 'Sfânta' },
  { def: 'Santo', type: 'prefix', es: 'Santo', it: 'Santo', pt: 'Santo' },
  { def: 'Las', type: 'prefix', tags: ['fem_head', 'plural'], es: 'Las', fr: 'Les' },
  { def: 'Los', type: 'prefix', tags: ['plural'], es: 'Los' },
  { def: 'El', type: 'prefix', es: 'El' },
  { def: 'The', type: 'prefix', es: 'El', fr: ['Le', 'La'], it: 'Il' }, 
  { def: 'Il', type: 'prefix', it: 'Il' },
  { def: 'Don', type: 'prefix', es: 'Don', it: 'Don' },
  { def: 'Ca', type: 'prefix', it: 'Ca\'', pt: 'Cá' },
  { def: 'Notre', type: 'prefix', fr: 'Notre' },
  { def: 'Dame', type: 'prefix', tags: ['fem_head'], fr: 'Dame' },
  { def: 'Mont', type: 'prefix', fr: 'Mont', it: 'Monte', es: 'Monte' },
  
  // ==========================
  // 11. SUFFIXES
  // ==========================
  // Spanish
  { def: 'suf_ez', type: 'suffix', es: 'ez' },
  { def: 'suf_al', type: 'suffix', es: 'al', pt: 'al' },
  { def: 'suf_ar', type: 'suffix', es: 'ar' },
  { def: 'suf_co', type: 'suffix', es: 'co' },
  { def: 'suf_go', type: 'suffix', es: 'go' },
  { def: 'suf_iles', type: 'suffix', es: 'iles' },
  { def: 'suf_eda', type: 'suffix', es: 'eda' },
  { def: 'suf_edo', type: 'suffix', es: 'edo' },
  { def: 'suf_ona', type: 'suffix', es: 'ona' },
  { def: 'suf_ano', type: 'suffix', es: 'ano', it: 'ano' },
  { def: 'suf_eria', type: 'suffix', es: 'ería' },
  { def: 'suf_ario', type: 'suffix', es: 'ario' },
  { def: 'suf_ero', type: 'suffix', es: 'ero' },
  { def: 'suf_era', type: 'suffix', es: 'era' },
  { def: 'suf_illo', type: 'suffix', es: 'illo' },
  { def: 'suf_illa', type: 'suffix', es: 'illa' },
  
  // Italian
  { def: 'suf_ate', type: 'suffix', it: 'ate' },
  { def: 'suf_ago', type: 'suffix', it: 'ago' },
  { def: 'suf_asco', type: 'suffix', it: 'asco' },
  { def: 'suf_eto', type: 'suffix', it: 'eto' },
  { def: 'suf_poli', type: 'suffix', it: 'poli', ro: 'poli' },
  { def: 'suf_enza', type: 'suffix', it: 'enza' },
  { def: 'suf_ese', type: 'suffix', it: 'ese' },
  { def: 'suf_elli', type: 'suffix', it: 'elli' },
  { def: 'suf_accio', type: 'suffix', it: 'accio' },
  { def: 'suf_one', type: 'suffix', it: 'one' },
  { def: 'suf_ino', type: 'suffix', it: 'ino' },
  { def: 'suf_ina', type: 'suffix', it: 'ina' },
  { def: 'suf_ello', type: 'suffix', it: 'ello' },
  
  // French
  { def: 'suf_ville', type: 'suffix', fr: 'ville', pt: 'ville', es: 'villa' },
  { def: 'suf_court', type: 'suffix', fr: 'court' },
  { def: 'suf_ac', type: 'suffix', fr: 'ac' },
  { def: 'suf_ay', type: 'suffix', fr: 'ay' },
  { def: 'suf_y', type: 'suffix', fr: 'y' },
  { def: 'suf_gny', type: 'suffix', fr: 'gny' },
  { def: 'suf_euil', type: 'suffix', fr: 'euil' },
  { def: 'suf_iers', type: 'suffix', fr: 'iers' },
  { def: 'suf_ans', type: 'suffix', fr: 'ans' },
  { def: 'suf_ette', type: 'suffix', fr: 'ette' },
  { def: 'suf_elle', type: 'suffix', fr: 'elle' },
  { def: 'suf_eau', type: 'suffix', fr: 'eau' },
  { def: 'suf_eux', type: 'suffix', fr: 'eux' },
  { def: 'suf_igny', type: 'suffix', fr: 'igny' },
  
  // Portuguese
  { def: 'suf_opolis', type: 'suffix', pt: 'ópolis', ro: 'opolis' },
  { def: 'suf_land', type: 'suffix', pt: 'lândia', ro: 'land' },
  { def: 'suf_inhos', type: 'suffix', pt: 'inhos' },
  { def: 'suf_as', type: 'suffix', pt: 'as', es: 'as' },
  { def: 'suf_os', type: 'suffix', pt: 'os', es: 'os' },
  { def: 'suf_eiro', type: 'suffix', pt: 'eiro' },
  { def: 'suf_eira', type: 'suffix', pt: 'eira' },
  { def: 'suf_ais', type: 'suffix', pt: 'ais' },
  { def: 'suf_oes', type: 'suffix', pt: 'ões' },
  { def: 'suf_inho', type: 'suffix', pt: 'inho' },
  { def: 'suf_inha', type: 'suffix', pt: 'inha' },
  
  // Romanian
  { def: 'suf_esti', type: 'suffix', ro: 'ești' },
  { def: 'suf_eni', type: 'suffix', ro: 'eni' },
  { def: 'suf_ove', type: 'suffix', ro: 'ove' },
  { def: 'suf_oi', type: 'suffix', ro: 'oi' },
  { def: 'suf_ani', type: 'suffix', ro: 'ani' },
  { def: 'suf_inti', type: 'suffix', ro: 'inți' },
  { def: 'suf_ea', type: 'suffix', ro: 'ea' },
  { def: 'suf_oaia', type: 'suffix', ro: 'oaia' },
  { def: 'suf_is', type: 'suffix', ro: 'iș' },
  
  // ==========================
  // 12. COUNTRY SUFFIXES
  // ==========================
  { def: 'ia', type: 'country_suffix', es: 'ia', it: 'ia', fr: 'ie', pt: 'ia', ro: 'ia' },
  { def: 'land', type: 'country_suffix', es: 'landia', it: 'landia', fr: 'lande', pt: 'lândia', ro: 'landa' },
  { def: 'stan', type: 'country_suffix', es: 'istán', it: 'istan', fr: 'istan', pt: 'istão', ro: 'stan' },
  { def: 'mark', type: 'country_suffix', es: 'marca', it: 'marca', fr: 'marque', pt: 'marca', ro: 'marca' },
  { def: 'ania', type: 'country_suffix', es: 'ania', it: 'ania', fr: 'anie', pt: 'ânia', ro: 'ania' },
];
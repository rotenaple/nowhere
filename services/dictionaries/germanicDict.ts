export type GermanicEntry = string | readonly [string, 'm' | 'f' | 'n' | 'c']; 

export interface GermanicComponent {
  def: string; 
  type: 'root' | 'suffix' | 'prefix' | 'country_suffix' | 'adjective' | 'connector';
  de?: GermanicEntry; 
  nl?: GermanicEntry; 
  da?: GermanicEntry; 
  sv?: GermanicEntry; 
  tags?: string[];
}

export const getGenData = (entry: GermanicEntry | undefined): { val: string, gender?: string } => {
  if (!entry) return { val: '' }; // Handle missing translations gracefully
  
  if (typeof entry === 'string') {
    return { val: entry };
  }
  
  return { val: entry[0], gender: entry[1] };
};

export const GERMANIC_DATA: GermanicComponent[] = [
  // ==========================
  // 1. ADJECTIVES (PREFIXES)
  // ==========================
  { def: 'New', type: 'prefix', de: 'Neu', da: 'Ny', nl: 'Nieuw', sv: 'Ny' },
  { def: 'Old', type: 'prefix', de: 'Alt', da: 'Gammel', nl: 'Oud', sv: 'Gammal' },
  { def: 'Great', type: 'prefix', de: 'Groß', da: 'Store', nl: 'Groot', sv: 'Stor' },
  { def: 'Small', type: 'prefix', de: 'Klein', da: 'Lille', nl: 'Lill', sv: 'Lill' },
  { def: 'High', type: 'prefix', de: 'Hoch', da: 'Høje', nl: 'Hoog', sv: 'Hög' },
  { def: 'Low', type: 'prefix', de: 'Nieder', da: 'Nedre', nl: 'Laag', sv: 'Låg' },
  { def: 'Upper', type: 'prefix', de: 'Ober', da: 'Øvre', nl: 'Boven', sv: 'Övre' },
  { def: 'Lower', type: 'prefix', de: 'Unter', da: 'Nedre', nl: 'Beneden', sv: 'Nedre' },
  { def: 'North', type: 'prefix', de: 'Nord', da: 'Nørre', nl: 'Noord', sv: 'Norr' },
  { def: 'South', type: 'prefix', de: 'Süd', da: 'Sønder', nl: 'Zuid', sv: 'Söder' },
  { def: 'East', type: 'prefix', de: 'Ost', da: 'Øster', nl: 'Oost', sv: 'Öster' },
  { def: 'West', type: 'prefix', de: 'West', da: 'Vester', nl: 'West', sv: 'Väster' },
  { def: 'Long', type: 'prefix', de: 'Lang', da: 'Lang', nl: 'Lang', sv: 'Lång' },
  { def: 'Short', type: 'prefix', de: 'Kurz', da: 'Kort', nl: 'Kort', sv: 'Kort' },
  { def: 'Deep', type: 'prefix', de: 'Tief', da: 'Dyb', nl: 'Diep', sv: 'Djup' },
  { def: 'Broad', type: 'prefix', de: 'Breit', da: 'Bred', nl: 'Breed', sv: 'Bred' },
  { def: 'Middle', type: 'prefix', de: 'Mittel', da: 'Mellem', nl: 'Midden', sv: 'Mellan' },
  { def: 'Beautiful', type: 'prefix', de: 'Schön', da: 'Skøn', nl: 'Mooi', sv: 'Skön' },
  { def: 'Green', type: 'prefix', de: 'Grün', da: 'Grøn', nl: 'Groen', sv: 'Grön' },
  { def: 'Black', type: 'prefix', de: 'Schwarz', da: 'Sort', nl: 'Zwart', sv: 'Svart' },
  { def: 'White', type: 'prefix', de: 'Weiß', da: 'Hvid', nl: 'Wit', sv: 'Vit' },
  { def: 'Red', type: 'prefix', de: 'Rot', da: 'Rød', nl: 'Rood', sv: 'Röd' },
  { def: 'Blue', type: 'prefix', de: 'Blau', da: 'Blå', nl: 'Blauw', sv: 'Blå' },
  { def: 'Yellow', type: 'prefix', de: 'Gelb', da: 'Gul', nl: 'Geel', sv: 'Gul' },
  { def: 'Grey', type: 'prefix', de: 'Grau', da: 'Grå', nl: 'Grijs', sv: 'Grå' },
  { def: 'King (adj)', type: 'prefix', de: 'Königs', da: 'Konge', nl: 'Konings', sv: 'Kungs' },
  { def: 'Prince (adj)', type: 'prefix', de: 'Prinzen', da: 'Prins', nl: 'Prinsen', sv: 'Prins' },
  { def: 'Saint', type: 'prefix', de: 'Sankt', da: 'Sankt', nl: 'Sint', sv: 'Sankt' },
  { def: 'Good', type: 'prefix', de: 'Gut', da: 'God', nl: 'Goed', sv: 'God' },
  { def: 'Bad', type: 'prefix', de: 'Böse', da: 'Dårlig', nl: 'Kwaad', sv: 'Ond' },
  { def: 'Bright', type: 'prefix', de: 'Licht', da: 'Lys', nl: 'Licht', sv: 'Ljus' },
  { def: 'Dark', type: 'prefix', de: 'Dunkel', da: 'Mørk', nl: 'Donker', sv: 'Mörk' },
  { def: 'Cold', type: 'prefix', de: 'Kalt', da: 'Kold', nl: 'Koud', sv: 'Kall' },
  { def: 'Warm', type: 'prefix', de: 'Warm', da: 'Varm', nl: 'Warm', sv: 'Varm' },
  { def: 'Rich', type: 'prefix', de: 'Reich', da: 'Rig', nl: 'Rijk', sv: 'Rik' },
  { def: 'Free', type: 'prefix', de: 'Frei', da: 'Fri', nl: 'Vrij', sv: 'Fri' },
  { def: 'Hard', type: 'prefix', de: 'Hart', da: 'Hård', nl: 'Hard', sv: 'Hård' },
  { def: 'Soft', type: 'prefix', de: 'Weich', da: 'Blød', nl: 'Zacht', sv: 'Mjuk' },
  { def: 'Wet', type: 'prefix', de: 'Nass', da: 'Våd', nl: 'Nat', sv: 'Våt' },
  { def: 'Dry', type: 'prefix', de: 'Trocken', da: 'Tør', nl: 'Droog', sv: 'Torr' },
  { def: 'Fat', type: 'prefix', de: 'Dick', da: 'Tyk', nl: 'Dik', sv: 'Tjock' },
  { def: 'Thin', type: 'prefix', de: 'Dünn', da: 'Tynd', nl: 'Dun', sv: 'Tunn' },
  { def: 'Sharp', type: 'prefix', de: 'Scharf', da: 'Skarp', nl: 'Scherp', sv: 'Skarp' },
  { def: 'Round', type: 'prefix', de: 'Rund', da: 'Rund', nl: 'Rond', sv: 'Rund' },
  { def: 'Flat', type: 'prefix', de: 'Flach', da: 'Flad', nl: 'Vlak', sv: 'Flat' },
  { def: 'Steep', type: 'prefix', de: 'Steil', da: 'Stejl', nl: 'Steil', sv: 'Brant' },
  { def: 'Narrow', type: 'prefix', de: 'Eng', da: 'Snæver', nl: 'Nauw', sv: 'Trång' },
  { def: 'Wide', type: 'prefix', de: 'Weit', da: 'Vid', nl: 'Wijd', sv: 'Vid' },
  { def: 'Straight', type: 'prefix', de: 'Gerade', da: 'Lige', nl: 'Recht', sv: 'Rak' },
  { def: 'Crooked', type: 'prefix', de: 'Krumm', da: 'Krum', nl: 'Krom', sv: 'Krokig' },
  { def: 'Sweet', type: 'prefix', de: 'Süß', da: 'Sød', nl: 'Zoet', sv: 'Söt' },
  { def: 'Sour', type: 'prefix', de: 'Sauer', da: 'Sur', nl: 'Zuur', sv: 'Sur' },
  { def: 'Bitter', type: 'prefix', de: 'Bitter', da: 'Bitter', nl: 'Bitter', sv: 'Bitter' },
  { def: 'Salty', type: 'prefix', de: 'Salzig', da: 'Salt', nl: 'Zout', sv: 'Salt' },
  { def: 'Loud', type: 'prefix', de: 'Laut', da: 'Høj', nl: 'Luid', sv: 'Hög' },
  { def: 'Quiet', type: 'prefix', de: 'Still', da: 'Stille', nl: 'Stil', sv: 'Stilla' },
  { def: 'Wild', type: 'prefix', de: 'Wild', da: 'Vild', nl: 'Wild', sv: 'Vild' },
  { def: 'Tame', type: 'prefix', de: 'Zahm', da: 'Tam', nl: 'Tam', sv: 'Tam' },
  { def: 'Fresh', type: 'prefix', de: 'Frisch', da: 'Frisk', nl: 'Vers', sv: 'Frisk' },
  { def: 'Holy', type: 'prefix', de: 'Heilig', da: 'Hellig', nl: 'Heilig', sv: 'Helig' },
  { def: 'True', type: 'prefix', de: 'Wahr', da: 'Sand', nl: 'Waar', sv: 'Sann' },
  { def: 'False', type: 'prefix', de: 'Falsch', da: 'Falsk', nl: 'Vals', sv: 'Falsk' },
  
  // Specific Prefixes
  { def: 'Hohen (High)', type: 'prefix', de: 'Hohen', nl: 'Hoge', da: 'Højen', sv: 'Hög' },
  { def: 'Hinter (Behind)', type: 'prefix', de: 'Hinter', nl: 'Achter', da: 'Bag', sv: 'Bak' },
  { def: 'Vorder (Front)', type: 'prefix', de: 'Vorder', nl: 'Voor', da: 'For', sv: 'Fram' },
  { def: 'Frieden', type: 'prefix', de: 'Fried', nl: 'Vrede', sv: 'Frid', da: 'Fred' },
  { def: 'Magle (Great)', type: 'prefix', da: 'Magle', de: 'Groß', nl: 'Groot', sv: 'Stor' },
  { def: 'Inner', type: 'prefix', sv: 'Inner', nl: 'Binnen', de: 'Inner', da: 'Indre' },
  { def: 'Outer', type: 'prefix', sv: 'Ytter', nl: 'Buiten', de: 'Äußere', da: 'Ydre' },
  { def: 'Main', type: 'prefix', sv: 'Huvud', da: 'Hoved', de: 'Haupt', nl: 'Hoofd' },
  { def: 'Chalk', type: 'prefix', sv: 'Kalk', da: 'Kalk', de: ['Kalk', 'm'], nl: 'Kalk' },

  // ==========================
  // 2. ROOTS (Nouns)
  // ==========================
  
  // -- TERRAIN & NATURE --
  { def: 'Brook', type: 'root', de: ['Bach', 'm'], da: ['Bæk', 'c'], nl: ['Beek', 'f'], sv: ['Bäck', 'm'] },
  { def: 'Mountain', type: 'root', de: ['Berg', 'm'], da: ['Bjerg', 'n'], nl: ['Berg', 'm'], sv: ['Berg', 'n'] },
  { def: 'Valley', type: 'root', de: ['Tal', 'n'], da: ['Dal', 'c'], nl: ['Dal', 'n'], sv: ['Dal', 'm'] },
  { def: 'Field', type: 'root', de: ['Feld', 'n'], da: ['Mark', 'c'], nl: ['Veld', 'n'], sv: ['Fält', 'n'] }, 
  { def: 'Meadow', type: 'root', de: ['Wiese', 'f'], da: ['Eng', 'c'], nl: ['Weide', 'f'], sv: ['Äng', 'm'] },
  { def: 'Forest', type: 'root', de: ['Wald', 'm'], da: ['Skov', 'c'], nl: ['Woud', 'n'], sv: ['Skog', 'm'] },
  { def: 'Stone', type: 'root', de: ['Stein', 'm'], da: ['Sten', 'c'], nl: ['Steen', 'm'], sv: ['Sten', 'm'] },
  { def: 'Lake', type: 'root', de: ['See', 'm'], da: ['Sø', 'c'], nl: ['Meer', 'n'], sv: ['Sjö', 'm'] },
  { def: 'Sea', type: 'root', de: ['Meer', 'n'], da: ['Hav', 'n'], nl: ['Zee', 'f'], sv: ['Hav', 'n'] },
  { def: 'Heath', type: 'root', de: ['Heide', 'f'], da: ['Hede', 'c'], nl: ['Heide', 'f'], sv: ['Hed', 'm'] },
  { def: 'Wood', type: 'root', de: ['Holz', 'n'], da: ['Holt', 'n'], nl: ['Hout', 'n'], sv: ['Trä', 'n'] },
  { def: 'Bush', type: 'root', de: ['Busch', 'm'], da: ['Busk', 'c'], nl: ['Bos', 'n'], sv: ['Buske', 'm'] },
  { def: 'Sand', type: 'root', de: ['Sand', 'm'], da: ['Sand', 'n'], nl: ['Zand', 'n'], sv: ['Sand', 'm'] },
  { def: 'Moor', type: 'root', de: ['Moor', 'n'], da: ['Mose', 'c'], nl: ['Moer', 'n'], sv: ['Mosse', 'm'] },
  { def: 'Swamp', type: 'root', de: ['Sumpf', 'm'], da: ['Sump', 'c'], nl: ['Broek', 'n'], sv: ['Träsk', 'n'] },
  { def: 'Rock', type: 'root', de: ['Fels', 'm'], da: ['Klippe', 'c'], nl: ['Rots', 'f'], sv: ['Klippa', 'm'] },
  { def: 'Corner', type: 'root', de: ['Eck', 'n'], da: ['Hjørne', 'n'], nl: ['Hoek', 'f'], sv: ['Hörn', 'n'] },
  { def: 'Spring', type: 'root', de: ['Born', 'm'], da: ['Kilde', 'c'], nl: ['Bron', 'f'], sv: ['Källa', 'm'] },
  { def: 'Source', type: 'root', de: ['Quelle', 'f'], da: ['Væld', 'n'], nl: ['Wel', 'f'], sv: ['Käll', 'm'] },
  { def: 'Pond', type: 'root', de: ['Teich', 'm'], da: ['Dam', 'c'], nl: ['Vijver', 'm'], sv: ['Damm', 'm'] },
  { def: 'River', type: 'root', de: ['Strom', 'm'], da: ['Flod', 'c'], nl: ['Stroom', 'm'], sv: ['Älv', 'm'] },
  { def: 'Island', type: 'root', de: ['Insel', 'f'], da: ['Ø', 'c'], nl: ['Eiland', 'n'], sv: ['Ö', 'm'] },
  { def: 'Cape', type: 'root', de: ['Kap', 'n'], da: ['Næs', 'n'], nl: ['Kaap', 'f'], sv: ['Udde', 'm'] },
  { def: 'Bay', type: 'root', de: ['Bucht', 'f'], da: ['Bugt', 'c'], nl: ['Baai', 'f'], sv: ['Vik', 'm'] },
  { def: 'Sound', type: 'root', de: ['Sund', 'm'], da: ['Sund', 'n'], nl: ['Sond', 'n'], sv: ['Sund', 'n'] },
  { def: 'Dune', type: 'root', de: ['Düne', 'f'], da: ['Klit', 'c'], nl: ['Duin', 'n'], sv: ['Dyn', 'm'] },
  { def: 'Cliff', type: 'root', de: ['Klippe', 'f'], da: ['Klint', 'c'], nl: ['Klif', 'n'], sv: ['Klint', 'm'] },
  { def: 'Headland', type: 'root', de: ['Landzunge', 'f'], da: ['Odde', 'c'], nl: ['Landtong', 'f'], sv: ['Udde', 'm'] },
  { def: 'Fjord', type: 'root', de: ['Förde', 'f'], da: ['Fjord', 'c'], nl: ['Fjord', 'n'], sv: ['Fjord', 'm'] },
  { def: 'Ridge', type: 'root', de: ['Rücken', 'm'], da: ['Ryg', 'c'], nl: ['Rug', 'm'], sv: ['Ås', 'm'] },
  { def: 'Slope', type: 'root', de: ['Hang', 'm'], da: ['Lien', 'c'], nl: ['Helling', 'f'], sv: ['Lid', 'n'] },
  { def: 'Grave', type: 'root', de: ['Grab', 'n'], da: ['Grav', 'c'], nl: ['Graf', 'n'], sv: ['Grav', 'm'] },
  { def: 'Earth', type: 'root', de: ['Erde', 'f'], da: ['Jord', 'c'], nl: ['Aarde', 'f'], sv: ['Jord', 'm'] },
  { def: 'Mud', type: 'root', de: ['Schlamm', 'm'], da: ['Mudder', 'n'], nl: ['Modder', 'm'], sv: ['Gyttja', 'm'] },
  { def: 'Cloud', type: 'root', de: ['Wolke', 'f'], da: ['Sky', 'c'], nl: ['Wolk', 'f'], sv: ['Moln', 'n'] },
  { def: 'Star', type: 'root', de: ['Stern', 'm'], da: ['Stjerne', 'c'], nl: ['Ster', 'm'], sv: ['Stjärna', 'm'] },
  { def: 'Sun', type: 'root', de: ['Sonne', 'f'], da: ['Sol', 'c'], nl: ['Zon', 'f'], sv: ['Sol', 'm'] },
  { def: 'Moon', type: 'root', de: ['Mond', 'm'], da: ['Måne', 'c'], nl: ['Maan', 'm'], sv: ['Måne', 'm'] },
  { def: 'Rain', type: 'root', de: ['Regen', 'm'], da: ['Regn', 'c'], nl: ['Regen', 'm'], sv: ['Regn', 'n'] },
  { def: 'Wind', type: 'root', de: ['Wind', 'm'], da: ['Vind', 'c'], nl: ['Wind', 'm'], sv: ['Vind', 'm'] },
  { def: 'Snow', type: 'root', de: ['Schnee', 'm'], da: ['Sne', 'c'], nl: ['Sneeuw', 'f'], sv: ['Snö', 'm'] },
  { def: 'Ice', type: 'root', de: ['Eis', 'n'], da: ['Is', 'c'], nl: ['IJs', 'n'], sv: ['Is', 'm'] },
  { def: 'Fire', type: 'root', de: ['Feuer', 'n'], da: ['Ild', 'c'], nl: ['Vuur', 'n'], sv: ['Eld', 'm'] },
  { def: 'Ash', type: 'root', de: ['Asche', 'f'], da: ['Aske', 'c'], nl: ['As', 'f'], sv: ['Aska', 'm'] },
  { def: 'Smoke', type: 'root', de: ['Rauch', 'm'], da: ['Røg', 'c'], nl: ['Rook', 'm'], sv: ['Rök', 'm'] },
  { def: 'Mist', type: 'root', de: ['Nebel', 'm'], da: ['Tåge', 'c'], nl: ['Mist', 'm'], sv: ['Dimma', 'm'] },
  { def: 'Clay', type: 'root', de: ['Lehm', 'm'], da: ['Ler', 'n'], nl: ['Klei', 'm'], sv: ['Lera', 'm'] },
  { def: 'Dust', type: 'root', de: ['Staub', 'm'], da: ['Støv', 'n'], nl: ['Stof', 'f'], sv: ['Damm', 'n'] },
  { def: 'Path', type: 'root', de: ['Pfad', 'm'], da: ['Sti', 'c'], nl: ['Pad', 'n'], sv: ['Stig', 'm'] },
  { def: 'Road', type: 'root', de: ['Straße', 'f'], da: ['Vej', 'c'], nl: ['Straat', 'f'], sv: ['Väg', 'm'] },
  { def: 'Cross', type: 'root', de: ['Kreuz', 'n'], da: ['Kors', 'n'], nl: ['Kruis', 'n'], sv: ['Kors', 'n'] },
  { def: 'Circle', type: 'root', de: ['Ring', 'm'], da: ['Ring', 'c'], nl: ['Ring', 'm'], sv: ['Ring', 'm'] },
  { def: 'Light', type: 'root', de: ['Licht', 'n'], da: ['Lys', 'n'], nl: ['Licht', 'n'], sv: ['Ljus', 'n'] },
  { def: 'Summer', type: 'root', de: ['Sommer', 'm'], da: ['Sommer', 'c'], nl: ['Zomer', 'm'], sv: ['Sommar', 'm'] },
  { def: 'Winter', type: 'root', de: ['Winter', 'm'], da: ['Vinter', 'c'], nl: ['Winter', 'm'], sv: ['Vinter', 'm'] },
  { def: 'Shore', type: 'root', de: ['Ufer', 'n'], da: ['Bred', 'c'], nl: ['Oever', 'f'], sv: ['Strand', 'm'] },
  { def: 'Beach', type: 'root', de: ['Strand', 'm'], da: ['Strand', 'c'], nl: ['Strand', 'n'], sv: ['Strand', 'm'] },
  { def: 'Ship', type: 'root', de: ['Schiff', 'n'], da: ['Skib', 'n'], nl: ['Schip', 'n'], sv: ['Skepp', 'n'] },
  { def: 'Boat', type: 'root', de: ['Boot', 'n'], da: ['Båd', 'c'], nl: ['Boot', 'f'], sv: ['Båt', 'm'] },
  { def: 'Sail', type: 'root', de: ['Segel', 'n'], da: ['Sejl', 'n'], nl: ['Zeil', 'n'], sv: ['Segel', 'n'] },
  { def: 'Net', type: 'root', de: ['Netz', 'n'], da: ['Net', 'n'], nl: ['Net', 'n'], sv: ['Nät', 'n'] },
  { def: 'Anchor', type: 'root', de: ['Anker', 'm'], da: ['Anker', 'n'], nl: ['Anker', 'n'], sv: ['Ankare', 'n'] },
  { def: 'Plain', type: 'root', sv: ['Slätt', 'm'], da: ['Slette', 'c'], de: ['Ebene', 'f'], nl: ['Vlakte', 'f'] },
  { def: 'Hill', type: 'root', sv: ['Kulle', 'm'], da: ['Bakke', 'c'], de: ['Hügel', 'm'], nl: ['Heuvel', 'm'] },
  { def: 'Mound', type: 'root', sv: ['Hög', 'm'], da: ['Høj', 'c'], de: ['Höhe', 'f'], nl: ['Hoogte', 'f'] },
  { def: 'Skerry', type: 'root', sv: ['Skär', 'n'], da: ['Skær', 'n'], de: ['Schäre', 'f'], nl: ['Scheren', 'mv'] }, // 'mv' for plural
  { def: 'Alley', type: 'root', sv: ['Gränd', 'm'], da: ['Gyde', 'c'], de: ['Gasse', 'f'], nl: ['Steeg', 'f'] },
  { def: 'Street', type: 'root', sv: ['Gata', 'm'], da: ['Gade', 'c'], de: ['Gasse', 'f'], nl: ['Straat', 'f'] },
  
  // -- FLORA --
  { def: 'Oak', type: 'root', de: ['Eiche', 'f'], da: ['Eg', 'c'], nl: ['Eik', 'f'], sv: ['Ek', 'm'] },
  { def: 'Beech', type: 'root', de: ['Buche', 'f'], da: ['Bøg', 'c'], nl: ['Beuk', 'f'], sv: ['Bok', 'm'] },
  { def: 'Fir', type: 'root', de: ['Tanne', 'f'], da: ['Gran', 'c'], nl: ['Den', 'm'], sv: ['Gran', 'm'] },
  { def: 'Pine', type: 'root', de: ['Kiefer', 'f'], da: ['Fyr', 'n'], nl: ['Pijn', 'm'], sv: ['Tall', 'm'] },
  { def: 'Lime-tree', type: 'root', de: ['Linde', 'f'], da: ['Lind', 'c'], nl: ['Linde', 'f'], sv: ['Lind', 'm'] },
  { def: 'Rose', type: 'root', de: ['Rose', 'f'], da: ['Rosen', 'c'], nl: ['Rozen', 'f'], sv: ['Ros', 'm'] },
  { def: 'Birch', type: 'root', de: ['Birke', 'f'], da: ['Birk', 'c'], nl: ['Berken', 'f'], sv: ['Björk', 'm'] },
  { def: 'Willow', type: 'root', de: ['Weide', 'f'], da: ['Pil', 'c'], nl: ['Wilg', 'f'], sv: ['Pil', 'm'] },
  { def: 'Elm', type: 'root', de: ['Ulme', 'f'], da: ['Elm', 'c'], nl: ['Iep', 'f'], sv: ['Alm', 'm'] },
  { def: 'Ash-tree', type: 'root', de: ['Esche', 'f'], da: ['Ask', 'c'], nl: ['Es', 'f'], sv: ['Ask', 'm'] },
  { def: 'Apple', type: 'root', de: ['Apfel', 'm'], da: ['Æble', 'n'], nl: ['Appel', 'm'], sv: ['Äpple', 'n'] },
  { def: 'Pear', type: 'root', de: ['Birne', 'f'], da: ['Pære', 'c'], nl: ['Peer', 'f'], sv: ['Päron', 'n'] },
  { def: 'Corn', type: 'root', de: ['Korn', 'n'], da: ['Korn', 'n'], nl: ['Koren', 'n'], sv: ['Korn', 'n'] },
  { def: 'Wheat', type: 'root', de: ['Weizen', 'm'], da: ['Hvede', 'c'], nl: ['Tarwe', 'f'], sv: ['Vete', 'n'] },
  { def: 'Rye', type: 'root', de: ['Roggen', 'm'], da: ['Rug', 'c'], nl: ['Rogge', 'm'], sv: ['Råg', 'm'] },
  { def: 'Hay', type: 'root', de: ['Heu', 'n'], da: ['Hø', 'n'], nl: ['Hooi', 'n'], sv: ['Hö', 'n'] },
  { def: 'Reed', type: 'root', de: ['Rohr', 'n'], da: ['Rør', 'n'], nl: ['Riet', 'n'], sv: ['Vass', 'm'] },
  { def: 'Thorn', type: 'root', de: ['Dorn', 'm'], da: ['Tjørn', 'c'], nl: ['Doorn', 'm'], sv: ['Törne', 'n'] },
  { def: 'Maple', type: 'root', de: ['Ahorn', 'm'], da: ['Ahorn', 'c'], nl: ['Esdoorn', 'm'], sv: ['Lönn', 'm'] },
  { def: 'Hazel', type: 'root', de: ['Hasel', 'f'], da: ['Hassel', 'c'], nl: ['Hazelnoot', 'f'], sv: ['Hassel', 'm'] },
  { def: 'Yew', type: 'root', de: ['Eibe', 'f'], da: ['Taks', 'c'], nl: ['Taxus', 'm'], sv: ['Idegran', 'm'] },
  { def: 'Juniper', type: 'root', de: ['Wacholder', 'm'], da: ['Ene', 'c'], nl: ['Jeneverbes', 'f'], sv: ['En', 'm'] },
  { def: 'Grass', type: 'root', de: ['Gras', 'n'], da: ['Græs', 'n'], nl: ['Gras', 'n'], sv: ['Gräs', 'n'] },
  { def: 'Flower', type: 'root', de: ['Blume', 'f'], da: ['Blomst', 'c'], nl: ['Bloem', 'f'], sv: ['Blomma', 'm'] },
  { def: 'Leaf', type: 'root', de: ['Laub', 'n'], da: ['Løv', 'n'], nl: ['Loof', 'n'], sv: ['Löv', 'n'] },
  { def: 'Root', type: 'root', de: ['Wurzel', 'f'], da: ['Rod', 'c'], nl: ['Wortel', 'f'], sv: ['Rot', 'm'] },
  { def: 'Branch', type: 'root', de: ['Zweig', 'm'], da: ['Gren', 'c'], nl: ['Tak', 'm'], sv: ['Gren', 'm'] },
  { def: 'Berry', type: 'root', de: ['Beere', 'f'], da: ['Bær', 'n'], nl: ['Bes', 'f'], sv: ['Bär', 'n'] },
  { def: 'Nut', type: 'root', de: ['Nuss', 'f'], da: ['Nød', 'c'], nl: ['Noot', 'f'], sv: ['Nöt', 'm'] },
  { def: 'Barley', type: 'root', de: ['Gerste', 'f'], da: ['Byg', 'c'], nl: ['Gerst', 'f'], sv: ['Korn', 'n'] }, // Changed sv to Korn for barley
  { def: 'Oats', type: 'root', de: ['Hafer', 'm'], da: ['Havre', 'c'], nl: ['Haver', 'm'], sv: ['Havre', 'm'] },
  { def: 'Flax', type: 'root', de: ['Flachs', 'm'], da: ['Hør', 'c'], nl: ['Vlas', 'n'], sv: ['Lin', 'm'] },
  { def: 'Hemp', type: 'root', de: ['Hanf', 'm'], da: ['Hamp', 'c'], nl: ['Hennep', 'f'], sv: ['Hampa', 'm'] },
  { def: 'Moss', type: 'root', de: ['Moos', 'n'], da: ['Mos', 'n'], nl: ['Mos', 'n'], sv: ['Mossa', 'm'] },
  { def: 'Aspen', type: 'root', sv: ['Asp', 'm'], da: ['Asp', 'c'], de: ['Espe', 'f'], nl: ['Esp', 'f'] },
  { def: 'Rowan', type: 'root', sv: ['Rönn', 'm'], da: ['Røn', 'c'], de: ['Eberesche', 'f'], nl: ['Lijsterbes', 'f'] },
  { def: 'Herb', type: 'root', sv: ['Ört', 'm'], da: ['Urt', 'c'], de: ['Kraut', 'n'], nl: ['Kruid', 'n'] },
  { def: 'Brush', type: 'root', sv: ['Ris', 'n'], da: ['Ris', 'n'], de: ['Reis', 'n'], nl: ['Rijshout', 'n'] }, // Changed NL to Rijshout
  
  // -- FAUNA --
  { def: 'Deer', type: 'root', de: ['Hirsch', 'm'], da: ['Hjort', 'c'], nl: ['Hert', 'n'], sv: ['Hjort', 'm'] },
  { def: 'Wolf', type: 'root', de: ['Wolf', 'm'], da: ['Ulv', 'c'], nl: ['Wolf', 'm'], sv: ['Varg', 'm'] },
  { def: 'Fox', type: 'root', de: ['Fuchs', 'm'], da: ['Ræv', 'c'], nl: ['Vos', 'm'], sv: ['Räv', 'm'] },
  { def: 'Bird', type: 'root', de: ['Vogel', 'm'], da: ['Fugl', 'c'], nl: ['Vogel', 'm'], sv: ['Fågel', 'm'] },
  { def: 'Swine', type: 'root', de: ['Schwein', 'n'], da: ['Svin', 'n'], nl: ['Zwijn', 'n'], sv: ['Svin', 'n'] },
  { def: 'Bear', type: 'root', de: ['Bär', 'm'], da: ['Bjørn', 'c'], nl: ['Beer', 'm'], sv: ['Björn', 'm'] }, // Changed da to Bjørn
  { def: 'Swan', type: 'root', de: ['Schwan', 'm'], da: ['Svane', 'c'], nl: ['Zwaan', 'f'], sv: ['Svan', 'm'] },
  { def: 'Raven', type: 'root', de: ['Rabe', 'm'], da: ['Ravn', 'c'], nl: ['Raaf', 'm'], sv: ['Korp', 'm'] },
  { def: 'Dove', type: 'root', de: ['Taube', 'f'], da: ['Due', 'c'], nl: ['Duif', 'f'], sv: ['Duva', 'm'] },
  { def: 'Lamb', type: 'root', de: ['Lamm', 'n'], da: ['Lam', 'n'], nl: ['Lam', 'n'], sv: ['Lamm', 'n'] },
  { def: 'Cow', type: 'root', de: ['Kuh', 'f'], da: ['Ko', 'c'], nl: ['Koe', 'f'], sv: ['Ko', 'm'] },
  { def: 'Horse', type: 'root', de: ['Ross', 'n'], da: ['Hest', 'c'], nl: ['Paard', 'n'], sv: ['Häst', 'm'] },
  { def: 'Goose', type: 'root', de: ['Gans', 'f'], da: ['Gås', 'c'], nl: ['Gans', 'f'], sv: ['Gås', 'm'] },
  { def: 'Fish', type: 'root', de: ['Fisch', 'm'], da: ['Fisk', 'c'], nl: ['Vis', 'm'], sv: ['Fisk', 'm'] },
  { def: 'Eagle', type: 'root', de: ['Adler', 'm'], da: ['Ørn', 'c'], nl: ['Arend', 'm'], sv: ['Örn', 'm'] },
  { def: 'Falcon', type: 'root', de: ['Falke', 'm'], da: ['Falk', 'c'], nl: ['Valk', 'm'], sv: ['Falk', 'm'] },
  { def: 'Owl', type: 'root', de: ['Eule', 'f'], da: ['Ugle', 'c'], nl: ['Uil', 'f'], sv: ['Uggla', 'm'] },
  { def: 'Hawk', type: 'root', de: ['Habicht', 'm'], da: ['Høg', 'c'], nl: ['Havik', 'm'], sv: ['Hök', 'm'] },
  { def: 'Salmon', type: 'root', de: ['Lachs', 'm'], da: ['Laks', 'c'], nl: ['Zalm', 'm'], sv: ['Lax', 'm'] },
  { def: 'Elk', type: 'root', de: ['Elch', 'm'], da: ['Elg', 'c'], nl: ['Eland', 'm'], sv: ['Älg', 'm'] },
  { def: 'Badger', type: 'root', de: ['Dachs', 'm'], da: ['Grævling', 'c'], nl: ['Das', 'm'], sv: ['Grävling', 'm'] },
  { def: 'Beaver', type: 'root', de: ['Biber', 'm'], da: ['Bæver', 'c'], nl: ['Bever', 'm'], sv: ['Bäver', 'm'] },
  { def: 'Otter', type: 'root', de: ['Otter', 'm'], da: ['Odder', 'c'], nl: ['Otter', 'm'], sv: [' utter', 'm'] }, // Spacing correction for sv
  { def: 'Seal', type: 'root', de: ['Robbe', 'f'], da: ['Sæl', 'c'], nl: ['Zeehond', 'm'], sv: ['Säl', 'm'] },
  { def: 'Lynx', type: 'root', de: ['Luchs', 'm'], da: ['Los', 'c'], nl: ['Lynx', 'm'], sv: ['Lo', 'm'] },
  { def: 'Crane', type: 'root', de: ['Kranich', 'm'], da: ['Trane', 'c'], nl: ['Kraanvogel', 'm'], sv: ['Trana', 'm'] }, // Changed NL to Kraanvogel
  { def: 'Heron', type: 'root', de: ['Reiher', 'm'], da: ['Hejre', 'c'], nl: ['Reiger', 'm'], sv: ['Häger', 'm'] },
  { def: 'Toad', type: 'root', de: ['Kröte', 'f'], da: ['Tudse', 'c'], nl: ['Pad', 'f'], sv: ['Padda', 'm'] },
  { def: 'Snake', type: 'root', de: ['Schlange', 'f'], da: ['Slange', 'c'], nl: ['Slang', 'f'], sv: ['Orm', 'm'] },
  { def: 'Dragon', type: 'root', de: ['Drache', 'm'], da: ['Drage', 'c'], nl: ['Draak', 'm'], sv: ['Drake', 'm'] },
  { def: 'Bull', type: 'root', de: ['Stier', 'm'], da: ['Tyr', 'c'], nl: ['Stier', 'm'], sv: ['Tjur', 'm'] },
  { def: 'Cat', type: 'root', de: ['Katze', 'f'], da: ['Kat', 'c'], nl: ['Kat', 'f'], sv: ['Katt', 'm'] },
  { def: 'Dog', type: 'root', de: ['Hund', 'm'], da: ['Hund', 'c'], nl: ['Hond', 'm'], sv: ['Hund', 'm'] },
  { def: 'Mouse', type: 'root', de: ['Maus', 'f'], da: ['Mus', 'c'], nl: ['Muis', 'f'], sv: ['Mus', 'm'] },
  { def: 'Rat', type: 'root', de: ['Ratte', 'f'], da: ['Rotte', 'c'], nl: ['Rat', 'f'], sv: ['Råtta', 'm'] },
  { def: 'Bee', type: 'root', de: ['Biene', 'f'], da: ['Bi', 'c'], nl: ['Bij', 'f'], sv: ['Bi', 'n'] },
  { def: 'Fly', type: 'root', de: ['Fliege', 'f'], da: ['Flue', 'c'], nl: ['Vlieg', 'f'], sv: ['Fluga', 'm'] },

  // -- CIVIC & SETTLEMENT --
  { def: 'Church', type: 'root', de: ['Kirche', 'f'], da: ['Kirke', 'c'], nl: ['Kerk', 'f'], sv: ['Kyrka', 'm'] },
  { def: 'Mill', type: 'root', de: ['Mühle', 'f'], da: ['Mølle', 'c'], nl: ['Molen', 'm'], sv: ['Kvarn', 'm'] },
  { def: 'Court', type: 'root', de: ['Hof', 'm'], da: ['Gård', 'c'], nl: ['Hof', 'm'], sv: ['Hov', 'm'] },
  { def: 'House', type: 'root', de: ['Haus', 'n'], da: ['Hus', 'n'], nl: ['Huis', 'n'], sv: ['Hus', 'n'] },
  { def: 'Castle', type: 'root', de: ['Schloss', 'n'], da: ['Slot', 'n'], nl: ['Kasteel', 'n'], sv: ['Slott', 'n'] }, // Changed NL to Kasteel
  { def: 'Fort', type: 'root', de: ['Burg', 'f'], da: ['Borg', 'c'], nl: ['Burcht', 'f'], sv: ['Borg', 'm'] },
  { def: 'City', type: 'root', de: ['Stadt', 'f'], da: ['Stad', 'c'], nl: ['Stad', 'f'], sv: ['Stad', 'm'] },
  { def: 'Village', type: 'root', de: ['Dorf', 'n'], da: ['Landsby', 'c'], nl: ['Dorp', 'n'], sv: ['By', 'm'] },
  { def: 'Bridge', type: 'root', de: ['Brücke', 'f'], da: ['Bro', 'c'], nl: ['Brug', 'f'], sv: ['Bro', 'm'] },
  { def: 'Way', type: 'root', de: ['Weg', 'm'], da: ['Vej', 'c'], nl: ['Weg', 'm'], sv: ['Väg', 'm'] },
  { def: 'Gate', type: 'root', de: ['Tor', 'n'], da: ['Port', 'c'], nl: ['Poort', 'f'], sv: ['Port', 'm'] },
  { def: 'Tower', type: 'root', de: ['Turm', 'm'], da: ['Tårn', 'n'], nl: ['Toren', 'm'], sv: ['Torn', 'n'] },
  { def: 'Harbor', type: 'root', de: ['Hafen', 'm'], da: ['Havn', 'c'], nl: ['Haven', 'm'], sv: ['Hamn', 'm'] },
  { def: 'Wall', type: 'root', de: ['Wall', 'm'], da: ['Vold', 'c'], nl: ['Wal', 'm'], sv: ['Vall', 'm'] },
  { def: 'Market', type: 'root', de: ['Markt', 'm'], da: ['Torv', 'n'], nl: ['Markt', 'm'], sv: ['Torg', 'n'] },
  { def: 'Dam', type: 'root', de: ['Damm', 'm'], da: ['Dæmning', 'c'], nl: ['Dam', 'm'], sv: ['Damm', 'm'] },
  { def: 'Dike', type: 'root', de: ['Deich', 'm'], da: ['Dige', 'n'], nl: ['Dijk', 'm'], sv: ['Dike', 'm'] },
  { def: 'Lock', type: 'root', de: ['Schleuse', 'f'], da: ['Sluse', 'c'], nl: ['Sluis', 'f'], sv: ['Sluss', 'm'] },
  { def: 'Home', type: 'root', de: ['Heim', 'n'], da: ['Hjem', 'n'], nl: ['Heem', 'n'], sv: ['Hem', 'n'] },
  { def: 'Hall', type: 'root', de: ['Halle', 'f'], da: ['Hal', 'c'], nl: ['Hal', 'f'], sv: ['Hall', 'm'] },
  { def: 'Thorp', type: 'root', de: ['Trup', 'm'], da: ['Torp', 'n'], nl: ['Dorp', 'n'], sv: ['Torp', 'n'] }, // Changed da to Torp
  { def: 'Barn', type: 'root', de: ['Scheune', 'f'], da: ['Lade', 'c'], nl: ['Schuur', 'f'], sv: ['Lada', 'm'] },
  { def: 'Garden', type: 'root', de: ['Garten', 'm'], da: ['Have', 'c'], nl: ['Tuin', 'm'], sv: ['Hage', 'm'] },
  { def: 'Well', type: 'root', de: ['Brunnen', 'm'], da: ['Brønd', 'c'], nl: ['Bron', 'f'], sv: ['Brunn', 'm'] },
  { def: 'Baker', type: 'root', de: ['Bäcker', 'm'], da: ['Bager', 'c'], nl: ['Bakker', 'm'], sv: ['Bagare', 'm'] },
  { def: 'Butcher', type: 'root', de: ['Metzger', 'm'], da: ['Slagter', 'c'], nl: ['Slager', 'm'], sv: ['Slaktare', 'm'] },
  { def: 'Shoemaker', type: 'root', de: ['Schuster', 'm'], da: ['Skomager', 'c'], nl: ['Schoenmaker', 'm'], sv: ['Skomakare', 'm'] },
  { def: 'Tailor', type: 'root', de: ['Schneider', 'm'], da: ['Skrædder', 'c'], nl: ['Kleermaker', 'm'], sv: ['Skräddare', 'm'] },
  { def: 'Carpenter', type: 'root', de: ['Zimmerer', 'm'], da: ['Tømrer', 'c'], nl: ['Timmerman', 'm'], sv: ['Timmerman', 'm'] },
  { def: 'Mason', type: 'root', de: ['Maurer', 'm'], da: ['Murer', 'c'], nl: ['Metselaar', 'm'], sv: ['Murare', 'm'] },
  { def: 'Tanner', type: 'root', de: ['Gerber', 'm'], da: ['Garver', 'c'], nl: ['Leerlooier', 'm'], sv: ['Garvare', 'm'] },
  { def: 'Dyer', type: 'root', de: ['Färber', 'm'], da: ['Farver', 'c'], nl: ['Verver', 'm'], sv: ['Färgare', 'm'] },
  { def: 'Brewer', type: 'root', de: ['Brauer', 'm'], da: ['Brygger', 'c'], nl: ['Brouwer', 'm'], sv: ['Bryggare', 'm'] },
  { def: 'Cook', type: 'root', de: ['Koch', 'm'], da: ['Kok', 'c'], nl: ['Kok', 'm'], sv: ['Kock', 'm'] },
  { def: 'Shepherd', type: 'root', de: ['Schäfer', 'm'], da: ['Hyrde', 'c'], nl: ['Herder', 'm'], sv: ['Herde', 'm'] },
  { def: 'Innkeeper', type: 'root', de: ['Wirt', 'm'], da: ['Vært', 'c'], nl: ['Waard', 'm'], sv: ['Värd', 'm'] },
  { def: 'Merchant', type: 'root', de: ['Händler', 'm'], da: ['Købmand', 'c'], nl: ['Koopman', 'm'], sv: ['Köpman', 'm'] },
  { def: 'Mayor', type: 'root', de: ['Schultheiß', 'm'], da: ['Borgmester', 'c'], nl: ['Schout', 'm'], sv: ['Borgmästare', 'm'] }, // Changed DE to Schultheiß and DA/SV to reflect modern usage

  // -- PEOPLE & TITLES --
  { def: 'King', type: 'root', de: ['König', 'm'], da: ['Konge', 'c'], nl: ['Koning', 'm'], sv: ['Kung', 'm'] },
  { def: 'Queen', type: 'root', de: ['Königin', 'f'], da: ['Dronning', 'c'], nl: ['Koningin', 'f'], sv: ['Drottning', 'm'] },
  { def: 'Prince', type: 'root', de: ['Prinz', 'm'], da: ['Prins', 'c'], nl: ['Prins', 'm'], sv: ['Prins', 'm'] },
  { def: 'Knight', type: 'root', de: ['Ritter', 'm'], da: ['Ridder', 'c'], nl: ['Ridder', 'm'], sv: ['Riddare', 'm'] },
  { def: 'Monk', type: 'root', de: ['Mönch', 'm'], da: ['Munk', 'c'], nl: ['Monnik', 'm'], sv: ['Munk', 'm'] },
  { def: 'Priest', type: 'root', de: ['Priester', 'm'], da: ['Præst', 'c'], nl: ['Priester', 'm'], sv: ['Präst', 'm'] }, // Changed DE from Pfaffe
  { def: 'Bishop', type: 'root', de: ['Bischof', 'm'], da: ['Biskop', 'c'], nl: ['Bisschop', 'm'], sv: ['Biskop', 'm'] },
  { def: 'Smith', type: 'root', de: ['Schmied', 'm'], da: ['Smed', 'c'], nl: ['Smid', 'm'], sv: ['Smed', 'm'] },
  { def: 'Miller', type: 'root', de: ['Müller', 'm'], da: ['Møller', 'c'], nl: ['Molenaar', 'm'], sv: ['Möller', 'm'] },
  { def: 'Fisher', type: 'root', de: ['Fischer', 'm'], da: ['Fisker', 'c'], nl: ['Visser', 'm'], sv: ['Fiskare', 'm'] },
  { def: 'Count', type: 'root', de: ['Graf', 'm'], da: ['Greve', 'c'], nl: ['Graaf', 'm'], sv: ['Greve', 'm'] },
  { def: 'Duke', type: 'root', de: ['Herzog', 'm'], da: ['Hertug', 'c'], nl: ['Hertog', 'm'], sv: ['Hertig', 'm'] },
  { def: 'Emperor', type: 'root', de: ['Kaiser', 'm'], da: ['Kejser', 'c'], nl: ['Keizer', 'm'], sv: ['Kejsare', 'm'] },
  { def: 'Pope', type: 'root', de: ['Papst', 'm'], da: ['Pave', 'c'], nl: ['Paus', 'm'], sv: ['Påve', 'm'] },
  { def: 'Abbot', type: 'root', de: ['Abt', 'm'], da: ['Abbed', 'c'], nl: ['Abt', 'm'], sv: ['Abbot', 'm'] },
  { def: 'Nun', type: 'root', de: ['Nonne', 'f'], da: ['Nonne', 'c'], nl: ['Non', 'f'], sv: ['Nunna', 'm'] },
  { def: 'Brother', type: 'root', de: ['Bruder', 'm'], da: ['Broder', 'c'], nl: ['Broeder', 'm'], sv: ['Broder', 'm'] },
  { def: 'Sister', type: 'root', de: ['Schwester', 'f'], da: ['Søster', 'c'], nl: ['Zuster', 'f'], sv: ['Syster', 'm'] },
  { def: 'Son', type: 'root', de: ['Sohn', 'm'], da: ['Søn', 'c'], nl: ['Zoon', 'm'], sv: ['Son', 'm'] },
  { def: 'Daughter', type: 'root', de: ['Tochter', 'f'], da: ['Datter', 'c'], nl: ['Dochter', 'f'], sv: ['Dotter', 'm'] },
  { def: 'Child', type: 'root', de: ['Kind', 'n'], da: ['Barn', 'n'], nl: ['Kind', 'n'], sv: ['Barn', 'n'] },
  { def: 'Man', type: 'root', de: ['Mann', 'm'], da: ['Mand', 'c'], nl: ['Man', 'm'], sv: ['Man', 'm'] },
  { def: 'Woman', type: 'root', de: ['Frau', 'f'], da: ['Kvinde', 'c'], nl: ['Vrouw', 'f'], sv: ['Kvinna', 'm'] }, // Changed DA to Kvinde, SV to Kvinna
  { def: 'Boy', type: 'root', de: ['Junge', 'm'], da: ['Dreng', 'c'], nl: ['Jongen', 'm'], sv: ['Pojke', 'm'] }, // Changed DE to Junge
  { def: 'Servant', type: 'root', de: ['Knecht', 'm'], da: ['Karl', 'c'], nl: ['Knecht', 'm'], sv: ['Dräng', 'm'] },
  { def: 'Maid', type: 'root', de: ['Magd', 'f'], da: ['Pige', 'c'], nl: ['Meid', 'f'], sv: ['Piga', 'm'] },
  { def: 'Guest', type: 'root', de: ['Gast', 'm'], da: ['Gæst', 'c'], nl: ['Gast', 'm'], sv: ['Gäst', 'm'] },
  { def: 'Stranger', type: 'root', de: ['Fremde', 'f'], da: ['Fremmed', 'c'], nl: ['Vreemdeling', 'm'], sv: ['Främling', 'm'] }, // Changed NL/SV to be more specific
  { def: 'Friend', type: 'root', de: ['Freund', 'm'], da: ['Ven', 'c'], nl: ['Vriend', 'm'], sv: ['Vän', 'm'] },
  { def: 'Enemy', type: 'root', de: ['Feind', 'm'], da: ['Fjende', 'c'], nl: ['Vijand', 'm'], sv: ['Fiende', 'm'] },
  { def: 'Neighbor', type: 'root', de: ['Nachbar', 'm'], da: ['Nabo', 'c'], nl: ['Buur', 'm'], sv: ['Granne', 'm'] },
  { def: 'Citizen', type: 'root', de: ['Bürger', 'm'], da: ['Borger', 'c'], nl: ['Burger', 'm'], sv: ['Borgare', 'm'] },
  { def: 'Farmer', type: 'root', de: ['Bauer', 'm'], da: ['Bonde', 'c'], nl: ['Boer', 'm'], sv: ['Bonde', 'm'] },
  { def: 'Soldier', type: 'root', de: ['Soldat', 'm'], da: ['Soldat', 'c'], nl: ['Soldaat', 'm'], sv: ['Soldat', 'm'] },
  { def: 'Warrior', type: 'root', de: ['Krieger', 'm'], da: ['Kriger', 'c'], nl: ['Krijger', 'm'], sv: ['Krigare', 'm'] },
  { def: 'Hero', type: 'root', de: ['Held', 'm'], da: ['Helt', 'c'], nl: ['Held', 'm'], sv: ['Hjälte', 'm'] },
  { def: 'Giant', type: 'root', de: ['Riese', 'm'], da: ['Kæmpe', 'c'], nl: ['Reus', 'm'], sv: ['Jätte', 'm'] },
  { def: 'Dwarf', type: 'root', de: ['Zwerg', 'm'], da: ['Dværg', 'c'], nl: ['Dwerg', 'm'], sv: ['Dvärg', 'm'] }, // Changed SV to Dvärg
  { def: 'Elf', type: 'root', de: ['Elf', 'm'], da: ['Alf', 'c'], nl: ['Elf', 'm'], sv: ['Alv', 'm'] }, // Changed SV to Alv
  { def: 'Ghost', type: 'root', de: ['Geist', 'm'], da: ['Ånd', 'c'], nl: ['Geest', 'm'], sv: ['Ande', 'm'] },
  { def: 'Devil', type: 'root', de: ['Teufel', 'm'], da: ['Djævel', 'c'], nl: ['Duivel', 'm'], sv: ['Djävul', 'm'] },
  { def: 'Angel', type: 'root', de: ['Engel', 'm'], da: ['Engel', 'c'], nl: ['Engel', 'm'], sv: ['Ängel', 'm'] },
  { def: 'Works/Mill', type: 'root', sv: ['Bruk', 'n'], da: ['Brug', 'n'], de: ['Werk', 'n'], nl: ['Werk', 'n'] },
  { def: 'Mine', type: 'root', sv: ['Gruva', 'm'], da: ['Grube', 'c'], de: ['Grube', 'f'], nl: ['Mijn', 'f'] },
  { def: 'Foundry', type: 'root', sv: ['Hytta', 'm'], de: ['Hütte', 'f'], nl: ['Hut', 'f'], da: ['Hytte', 'c'] }, // Added da
  { def: 'Saw', type: 'root', sv: ['Såg', 'm'], da: ['Sav', 'c'], de: ['Säge', 'f'], nl: ['Zaag', 'f'] },
  { def: 'Spire', type: 'root', sv: ['Spira', 'm'], da: ['Spir', 'c'], de: ['Spitze', 'f'], nl: ['Spits', 'f'] },
  
  // -- MATERIALS --
  { def: 'Salt', type: 'root', de: ['Salz', 'n'], da: ['Salt', 'n'], nl: ['Zout', 'n'], sv: ['Salt', 'n'] },
  { def: 'Iron', type: 'root', de: ['Eisen', 'n'], da: ['Jern', 'n'], nl: ['IJzer', 'n'], sv: ['Järn', 'n'] },
  { def: 'Gold', type: 'root', de: ['Gold', 'n'], da: ['Guld', 'n'], nl: ['Goud', 'n'], sv: ['Guld', 'n'] },
  { def: 'Silver', type: 'root', de: ['Silber', 'n'], da: ['Sølv', 'n'], nl: ['Zilver', 'n'], sv: ['Silver', 'n'] },
  { def: 'Copper', type: 'root', de: ['Kupfer', 'n'], da: ['Kobber', 'n'], nl: ['Koper', 'n'], sv: ['Koppar', 'm'] },
  { def: 'Coal', type: 'root', de: ['Kohle', 'f'], da: ['Kul', 'n'], nl: ['Kool', 'f'], sv: ['Kol', 'm'] },
  { def: 'Glass', type: 'root', de: ['Glas', 'n'], da: ['Glas', 'n'], nl: ['Glas', 'n'], sv: ['Glas', 'n'] },
  
  // -- ABSTRACT --
  { def: 'Peace', type: 'root', de: ['Friede', 'm'], da: ['Fred', 'c'], nl: ['Vrede', 'f'], sv: ['Frid', 'm'] },
  { def: 'God', type: 'root', de: ['Gott', 'm'], da: ['Gud', 'c'], nl: ['God', 'm'], sv: ['Gud', 'm'] },
  { def: 'Victory', type: 'root', de: ['Sieg', 'm'], da: ['Sejr', 'c'], nl: ['Zege', 'f'], sv: ['Seger', 'm'] },
  { def: 'Battle', type: 'root', de: ['Schlacht', 'f'], da: ['Slag', 'n'], nl: ['Slag', 'm'], sv: ['Slag', 'n'] },

  // ==========================
  // 3. SUFFIXES
  // ==========================
  { def: 'Heim', type: 'suffix', de: ['heim', 'n'], da: ['hjem', 'n'], nl: ['heem', 'n'], sv: ['hem', 'n'] },
  { def: 'Dorf', type: 'suffix', de: ['dorf', 'n'], da: ['trup', 'n'], nl: ['dorp', 'n'], sv: ['torp', 'n'] }, // Changed DA & SV to torp as a suffix
  { def: 'Burg', type: 'suffix', de: ['burg', 'f'], da: ['borg', 'c'], nl: ['burg', 'f'], sv: ['borg', 'm'] },
  { def: 'Stadt (suf)', type: 'suffix', de: ['stadt', 'f'], da: ['stad', 'c'], nl: ['stad', 'f'], sv: ['stad', 'm'] },
  { def: 'Ingen', type: 'suffix', de: 'ingen', da: 'inge', nl: 'ingen', sv: 'inge' },
  { def: 'Hausen', type: 'suffix', de: 'hausen', nl: 'huizen', sv: 'husen', da: 'husene' }, // Added da
  { def: 'Kirch (suf)', type: 'suffix', de: ['kirchen', 'f'], da: ['kirke', 'c'], nl: ['kerke', 'f'], sv: ['kyrka', 'm'] },
  { def: 'Hagen', type: 'suffix', de: ['hagen', 'm'], da: ['have', 'c'], nl: ['haag', 'm'], sv: ['haga', 'm'] },
  { def: 'Hof (suf)', type: 'suffix', de: ['hof', 'm'], da: ['gård', 'c'], nl: ['hof', 'm'], sv: ['hov', 'm'] },
  { def: 'Rode (Clearing)', type: 'suffix', de: 'rode', da: 'rød', nl: 'rade', sv: 'ryd' },
  { def: 'Au', type: 'suffix', de: ['au', 'f'], nl: ['a', 'f'], sv: ['å', 'm'], da: ['å', 'c'] }, // Added da
  { def: 'Furt (Ford)', type: 'suffix', de: ['furt', 'f'], da: ['fjord', 'c'], nl: ['voort', 'f'], sv: ['fors', 'm'] },
  { def: 'Bad', type: 'suffix', de: ['bad', 'n'], sv: ['bad', 'n'], da: ['bad', 'n'], nl: ['bad', 'n'] }, // Added da, nl
  { def: 'Berg (suf)', type: 'suffix', de: ['berg', 'm'], da: ['bjerg', 'n'], nl: ['berg', 'm'], sv: ['berg', 'n'] },
  { def: 'Tal (suf)', type: 'suffix', de: ['tal', 'n'], da: ['dal', 'c'], nl: ['dal', 'n'], sv: ['dal', 'm'] },
  { def: 'Feld (suf)', type: 'suffix', de: ['feld', 'n'], nl: ['veld', 'n'], da: ['mark', 'c'], sv: ['fält', 'n'] }, // Added da, sv
  { def: 'Stein (suf)', type: 'suffix', de: ['stein', 'm'], da: ['sten', 'c'], nl: ['steen', 'm'], sv: ['sten', 'm'] },
  { def: 'Zell', type: 'suffix', de: ['zell', 'f'], nl: ['cel', 'f'], sv: ['cell', 'm'], da: ['celle', 'c'] }, // Added da, sv, changed NL
  { def: 'Brueck (Bridge)', type: 'suffix', de: ['brück', 'f'], da: ['bro', 'c'], nl: ['brug', 'f'], sv: ['bro', 'm'] },
  { def: 'Wald (suf)', type: 'suffix', de: ['wald', 'm'], da: ['skov', 'c'], nl: ['woud', 'n'], sv: ['skog', 'm'] },
  { def: 'Bach (suf)', type: 'suffix', de: ['bach', 'm'], da: ['bæk', 'c'], nl: ['beek', 'f'], sv: ['bäck', 'm'] },
  { def: 'Lust', type: 'suffix', de: ['lust', 'f'], da: ['lyst', 'c'], nl: ['lust', 'f'], sv: ['lust', 'm'] }, // Added sv
  { def: 'Dam (suf)', type: 'suffix', de: ['damm', 'm'], da: ['dam', 'c'], nl: ['dam', 'm'], sv: ['damm', 'm'] },
  { def: 'Dijk', type: 'suffix', de: ['deich', 'm'], da: ['dige', 'n'], nl: ['dijk', 'm'], sv: ['dike', 'm'] },
  { def: 'Polder', type: 'suffix', nl: ['polder', 'm'], de: ['Polder', 'm'], da: ['kog', 'c'], sv: ['polder', 'm'] }, // Added de, da, sv
  { def: 'Sluis', type: 'suffix', de: ['schleuse', 'f'], nl: ['sluis', 'f'], sv: ['sluss', 'm'], da: ['sluse', 'c'] }, // Added da
  { def: 'Recht', type: 'suffix', nl: ['recht', 'n'], de: ['Recht', 'n'], da: ['ret', 'c'], sv: ['rätt', 'm'] }, // Added de, da, sv
  { def: 'Koping', type: 'suffix', sv: 'köping', da: 'købing', de: 'kaufung', nl: 'koopstad' }, // Added de, nl
  { def: 'Holm', type: 'suffix', sv: 'holm', da: 'holm', de: ['holm', 'm'], nl: ['hom', 'm'] }, // Added nl
  { def: 'Nas', type: 'suffix', sv: ['näs', 'n'], da: ['næs', 'n'], nl: ['nes', 'n'], de: ['Nase', 'f'] }, // Added de
  { def: 'Vik', type: 'suffix', sv: ['vik', 'm'], da: ['vig', 'c'], nl: ['wijk', 'm'], de: ['Wiek', 'f'] }, // Added de
  { def: 'Lund', type: 'suffix', sv: ['lund', 'm'], da: ['lund', 'c'], de: ['Lund', 'f'], nl: ['lund', 'n'] }, // Added de, nl
  { def: 'Bo', type: 'suffix', sv: ['bo', 'n'], da: ['bo', 'n'], de: ['buh', 'f'], nl: ['boe', 'f'] }, // Added de, nl
  { def: 'Tuna', type: 'suffix', sv: ['tuna', 'm'], da: ['tun', 'n'], de: ['Zaun', 'm'], nl: ['tuin', 'm'] }, // Added da, de, nl
  { def: 'Torp', type: 'suffix', sv: ['torp', 'n'], da: ['trup', 'n'], de: ['Trup', 'm'], nl: ['dorp', 'n'] },
  { def: 'Hult', type: 'suffix', sv: ['hult', 'n'], da: ['holt', 'n'], nl: ['hout', 'n'], de: ['holz', 'n'] },
  { def: 'Lo', type: 'suffix', nl: ['lo', 'n'], de: ['loh', 'n'], da: ['lav', 'c'], sv: ['löv', 'n'] }, // Added da, sv
  { def: 'Laar', type: 'suffix', nl: ['laar', 'f'], de: ['Lar', 'n'], da: ['lyre', 'c'], sv: ['låre', 'n'] }, // Added da, sv
  { def: 'Donk', type: 'suffix', nl: ['donk', 'f'], de: ['Dunk', 'm'], da: ['banke', 'c'], sv: ['bank', 'm'] }, // Added de, da, sv
  { def: 'Veen', type: 'suffix', nl: ['veen', 'n'], de: ['Fehn', 'n'], da: ['ven', 'n'], sv: ['myr', 'm'] }, // Added sv
  { def: 'Geest', type: 'suffix', nl: ['geest', 'f'], de: ['Geest', 'f'], da: ['gest', 'c'], sv: ['gäst', 'm'] }, // Added de, da, sv
  { def: 'Ster', type: 'suffix', nl: ['ster', 'f'], de: ['Stern', 'm'], da: ['stjerne', 'c'], sv: ['stjärna', 'm'] }, // Added de, da, sv
  { def: 'Boda', type: 'suffix', sv: ['boda', 'm'], da: ['boder', 'c'], de: ['Bode', 'm'], nl: ['bode', 'm'] }, // Added de, da, nl
  { def: 'As (suf)', type: 'suffix', sv: ['ås', 'm'], da: ['ås', 'c'], de: ['Aas', 'n'], nl: ['aas', 'n'] }, // Added da, de, nl
  { def: 'Sund (suf)', type: 'suffix', sv: ['sund', 'n'], da: ['sund', 'n'], de: ['Sund', 'm'], nl: ['sund', 'n'] },
  { def: 'O (Island suf)', type: 'suffix', sv: ['ö', 'm'], da: ['ø', 'c'], nl: ['oog', 'n'], de: ['Aue', 'f'] }, // Changed DE to Aue
  { def: 'Mala', type: 'suffix', sv: ['måla', 'm'], da: ['mal', 'c'], de: ['Mal', 'n'], nl: ['maal', 'n'] }, // Added da, de, nl
  { def: 'Sater', type: 'suffix', sv: ['säter', 'm'], nl: ['zate', 'f'], da: ['sæter', 'c'], de: ['Satar', 'm'] }, // Added da, de
  { def: 'Valla', type: 'suffix', sv: ['valla', 'm'], de: ['wall', 'm'], da: ['vold', 'c'], nl: ['wal', 'm'] }, // Added da, nl
  { def: 'Sala', type: 'suffix', sv: ['sala', 'm'], de: ['Saal', 'm'], da: ['sal', 'c'], nl: ['zaal', 'f'] }, // Added da, nl
  { def: 'Rum', type: 'suffix', sv: ['rum', 'n'], da: ['rum', 'n'], de: ['Raum', 'm'], nl: ['ruimte', 'f'] }, // Changed NL to Ruimte
  { def: 'Lov', type: 'suffix', sv: ['löv', 'n'], da: ['løn', 'c'], de: ['Laub', 'n'], nl: ['loof', 'n'] }, // Changed DA & DE to match leaf/foliage
  { def: 'Um', type: 'suffix', sv: 'um', da: 'um', de: 'um', nl: 'um' },
  { def: 'Red (Clearing)', type: 'suffix', sv: 'red', da: 'rød', de: 'reuth', nl: 'roode' }, // Added de, nl
  { def: 'Rud', type: 'suffix', sv: 'rud', da: 'rud', de: 'rode', nl: 'roden' }, // Added da, de, nl
  { def: 'Hage', type: 'suffix', sv: ['hage', 'm'], da: ['have', 'c'], nl: ['haag', 'm'], de: ['Hag', 'm'] }, // Added de
  { def: 'Kulla', type: 'suffix', sv: ['kulla', 'm'], da: ['kulle', 'c'], de: ['Kugel', 'f'], nl: ['kuil', 'm'] }, // Added da, de, nl
  { def: 'Skuv', type: 'suffix', sv: ['skuv', 'm'], da: ['skov', 'c'], de: ['Schub', 'm'], nl: ['schuif', 'm'] }, // Added da, de, nl

  // ==========================
  // 4. COUNTRY SUFFIXES
  // ==========================
  { def: 'Land', type: 'country_suffix', de: ['Land', 'n'], da: ['land', 'n'], nl: ['land', 'n'], sv: ['land', 'n'] },
  { def: 'Reich', type: 'country_suffix', de: ['Reich', 'n'], da: ['rige', 'n'], nl: ['rijk', 'n'], sv: ['rike', 'n'] },
  { def: 'Ien', type: 'country_suffix', de: 'ien', da: 'ien', nl: 'ië', sv: 'ien' },
  { def: 'Mark', type: 'country_suffix', de: ['Mark', 'f'], da: ['mark', 'c'], nl: ['mark', 'f'], sv: ['mark', 'm'] },
  { def: 'Stan', type: 'country_suffix', de: 'stan', da: 'stan', nl: 'stan', sv: 'stan' },
  { def: 'Ia', type: 'country_suffix', de: 'ia', da: 'ia', nl: 'ia', sv: 'ia' },
  { def: 'Gau', type: 'country_suffix', de: ['Gau', 'm'], nl: ['gouw', 'f'], da: ['herred', 'n'], sv: ['göing', 'm'] }, // Added da, sv
  
  // ==========================
  // 5. CONNECTORS
  // ==========================
  { def: 'conn_s', type: 'connector', de: 's', da: 's', nl: 's', sv: 's' },
  { def: 'conn_en', type: 'connector', de: 'en', nl: 'en', da: 'ene', sv: 'en' }, // Added da, sv
  { def: 'conn_e', type: 'connector', de: 'e', da: 'e', nl: 'e', sv: 'e' },
];
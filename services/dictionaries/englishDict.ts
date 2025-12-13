
export const EN_SUFFIXES_PHONETIC = [
  'ton', 'ham', 'ley', 'ford', 'field', 'bury', 'chester', 'mouth', 'well', 
  'wood', 'port', 'side', 'wick', 'worth', 'ridge', 'brook', 'dale', 'gate', 'stow',
  'stead', 'don', 'ing', 'thorpe', 'by', 'minster', 'mere', 'pool', 'thwaite', 'sey',
  'ombe', 'over', 'hall', 'bridge', 'castle', 'market', 'end', 'land'
];

export const EN_ROOTS_ANGLO = [
  'Ash', 'Oak', 'Thorn', 'Whit', 'Black', 'Green', 'Red', 'Gold', 'Silver',
  'Fox', 'Ox', 'Hart', 'Swine', 'Ram', 'Ewe', 'Lamb', 'Hen', 'Cock',
  'Wulf', 'Raven', 'Crow', 'Finch', 'Lark', 'Swan', 'Fish', 'Eel', 'Crab',
  'Sand', 'Mud', 'Clay', 'Stone', 'Rock', 'Flint', 'Chalk', 'Salt', 'Iron',
  'Rush', 'Sedge', 'Moss', 'Fern', 'Grass', 'Weed', 'Tree', 'Bush', 'Wood',
  'Field', 'Mead', 'Moor', 'Fen', 'Bog', 'Marsh', 'Mere', 'Pool', 'Lake',
  'River', 'Brook', 'Beck', 'Burn', 'Well', 'Spring', 'Ford', 'Bridge', 'Mill',
  'Hill', 'Down', 'Combe', 'Dale', 'Vale', 'Valley', 'Ridge', 'Edge', 'End',
  'Kings', 'Queens', 'Bishops', 'Monks', 'Abbots', 'Earls', 'Knights',
  'North', 'South', 'East', 'West', 'High', 'Low', 'Nether', 'Upper',
  'New', 'Old', 'Great', 'Little', 'Long', 'Broad', 'Deep', 'Shallow',
  'Cold', 'Warm', 'Fair', 'Foul', 'Dry', 'Wet', 'Rough', 'Smooth',
  'Winter', 'Summer', 'Spring', 'Fall', 'Snow', 'Rain', 'Wind', 'Storm',
  'Sun', 'Moon', 'Star', 'Cloud', 'Sky', 'Light', 'Dark', 'Day', 'Night',
  'White', 'Brown', 'Grey', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink',
  'Hard', 'Soft', 'Sharp', 'Dull', 'Heavy', 'Light', 'Fast', 'Slow',
  'Good', 'Bad', 'Rich', 'Poor', 'Strong', 'Weak', 'Young', 'Old',
  'Barrow', 'Burgh', 'Cliff', 'Crag', 'Delph', 'Dene', 'Fell', 'Force',
  'Garth', 'Gill', 'Haugh', 'Head', 'Helm', 'Holm', 'Hope', 'Howe',
  'Hurst', 'Keld', 'Knott', 'Kyle', 'Law', 'Linn', 'Low', 'Nab',
  'Ness', 'Pen', 'Pike', 'Platt', 'Rigg', 'Scar', 'Shaw', 'Slack',
  'Slade', 'Syke', 'Tarn', 'Thwait', 'Toft', 'Tor', 'Wath', 'Wold'
];

export const EN_SUFFIXES_ANGLO = [
  'ton', 'ham', 'bury', 'borough', 'ford', 'field', 'ley', 'lea', 'wood', 
  'worth', 'wick', 'stead', 'stow', 'ing', 'ings', 'don', 'den', 'combe',
  'hurst', 'holt', 'shaw', 'grove', 'thwaite', 'thorpe', 'by', 'toft',
  'ness', 'land', 'water', 'mouth', 'port', 'haven', 'bridge', 'well',
  'hill', 'dale', 'side', 'view', 'park', 'green', 'common', 'heath',
  'acre', 'bank', 'barn', 'beck', 'bottom', 'brook', 'burn', 'camp',
  'carr', 'chase', 'cliff', 'close', 'copse', 'corner', 'cot', 'cott',
  'court', 'croft', 'cross', 'dene', 'down', 'drift', 'drove', 'end',
  'farm', 'fen', 'fold', 'gap', 'garth', 'gate', 'glade', 'glen',
  'grange', 'ground', 'hatch', 'hay', 'head', 'hedge', 'hoe', 'hold',
  'hole', 'hollow', 'hook', 'horn', 'house', 'how', 'hyde', 'isle',
  'knoll', 'lake', 'lane', 'lawn', 'leaze', 'lock', 'lodge', 'loop'
];

export const EN_COUNTRY_SUFFIXES = [
  'ia', 'land', 'ea', 'on', 'ary', 'is', 'as', 'ra', 'or', 'th', 'gard', 
  'heim', 'reich', 'mark', 'dor', 'dom', 'nia', 'sia', 'dor', 'mont'
];

// Phonotactics
export const EN_ONSETS_NEUTRAL = [
  { val: 'b', weight: 5 }, { val: 'd', weight: 5 }, { val: 'f', weight: 4 }, 
  { val: 'h', weight: 4 }, { val: 'l', weight: 5 }, { val: 'm', weight: 4 }, 
  { val: 'n', weight: 4 }, { val: 'p', weight: 4 }, { val: 'r', weight: 4 }, 
  { val: 's', weight: 6 }, { val: 't', weight: 6 }, { val: 'v', weight: 3 }, 
  { val: 'w', weight: 3 }, { val: 'y', weight: 1 }, { val: 'z', weight: 1 },
  { val: 'br', weight: 3 }, { val: 'dr', weight: 2 }, { val: 'tr', weight: 2 },
  { val: 'st', weight: 4 }, { val: 'sp', weight: 2 }, { val: 'sh', weight: 3 },
  { val: 'th', weight: 4 }, { val: 'wh', weight: 2 }
];

export const EN_ONSETS_HARD = [
  { val: 'c', weight: 5 }, { val: 'g', weight: 4 }, 
  { val: 'cl', weight: 3 }, { val: 'cr', weight: 3 }, 
  { val: 'gl', weight: 3 }, { val: 'gr', weight: 3 }
];

export const EN_ONSETS_K = [
  { val: 'k', weight: 4 }, { val: 'sk', weight: 3 }
];

export const EN_NUC_BACK = [ 
  { val: 'a', weight: 10 }, { val: 'o', weight: 10 }, { val: 'u', weight: 5 }, 
  { val: 'ou', weight: 2 }, { val: 'oa', weight: 2 }, { val: 'au', weight: 1 } 
];

export const EN_NUC_FRONT = [ 
  { val: 'e', weight: 10 }, { val: 'i', weight: 10 }, 
  { val: 'ea', weight: 3 }, { val: 'ee', weight: 3 }, { val: 'ei', weight: 1 } 
];

export const EN_CODAS_HEAVY = [
  { val: 'rn', weight: 3 }, { val: 'l', weight: 5 }, { val: 'r', weight: 5 }, 
  { val: 's', weight: 4 }, { val: 'n', weight: 5 }, { val: 'm', weight: 4 }, 
  { val: 'ck', weight: 3 }, { val: 'sh', weight: 2 }, { val: 'st', weight: 3 },
  { val: 'nd', weight: 3 }, { val: 'nt', weight: 3 }, { val: 'ft', weight: 2 }
];

export const EN_CODAS_LIGHT = [
  { val: '', weight: 10 }, 
  { val: 'n', weight: 4 }, { val: 'm', weight: 3 }, { val: 'r', weight: 4 },
  { val: 'l', weight: 4 }, { val: 's', weight: 3 }
];

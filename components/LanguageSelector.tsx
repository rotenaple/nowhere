import React, { useState } from 'react';
import { Language } from '../types';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';

// Imported from constants
export const LANGUAGE_GROUPS: Record<string, Language[]> = {
  "Germanic": [Language.English, Language.German, Language.Dutch, Language.Swedish, Language.Danish],
  "Romance": [Language.Spanish, Language.French, Language.Italian, Language.Portuguese, Language.Romanian],
  "Slavic": [Language.Russian, Language.Polish, Language.Ukrainian, Language.Czech, Language.Slovak, Language.Bulgarian],
  "East Asian": [Language.Chinese, Language.Japanese, Language.Korean, Language.Vietnamese],
  "Austronesian": [Language.Indonesian, Language.Malay, Language.Tagalog],
  "Semitic": [Language.Arabic],
  "Celtic": [Language.Irish]
};

interface LanguageSelectorProps {
  selected: Language;
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderButton = (lang: Language) => {
    const isSelected = selected === lang;
    return (
      <button
        key={lang}
        onClick={() => onSelect(lang)}
        className={`
          flex-none relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border whitespace-nowrap
          ${isSelected 
            ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/30' 
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
          }
        `}
      >
        <div className="flex items-center gap-1.5">
          {lang === Language.All && <Globe size={12} className={isSelected ? "text-white" : "text-brand-500"} />}
          {lang}
        </div>
      </button>
    );
  };

  return (
    <div className="w-full relative">
      <div 
        className={`
          flex gap-2 items-center transition-all duration-300 ease-in-out
          ${isExpanded 
            ? 'flex-wrap pr-8' // Wrap mode
            : 'overflow-x-auto no-scrollbar flex-nowrap pr-10 md:pr-0 md:flex-wrap'
          }
        `}
      >
        {/* Global Button (Always first) */}
        {renderButton(Language.All)}

        {/* Render Groups */}
        {Object.entries(LANGUAGE_GROUPS).map(([groupName, langs]) => {
          if (langs.length === 0) return null;

          const firstLang = langs[0];
          const restLangs = langs.slice(1);

          return (
            <React.Fragment key={groupName}>
              
              {/* 
                 STICKY GROUPING:
                 We wrap the Label and the First Language in a div. 
                 This treats them as one unit, preventing the label from 
                 being stranded at the end of a line.
              */}
              <div className="flex items-center gap-2 flex-none">
                
                {/* Group Label */}
                <div className={`
                    items-center
                    ${isExpanded ? 'flex' : 'hidden md:flex'} 
                `}>
                  {/* Divider */}
                  <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 mx-2" />
                  {/* Text */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 whitespace-nowrap">
                    {groupName}
                  </span>
                </div>

                {/* First Button of the Group */}
                {renderButton(firstLang)}
              </div>

              {/* Render the rest of the buttons normally */}
              {restLangs.map(lang => renderButton(lang))}

            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Toggle Button */}
      <div className={`md:hidden absolute right-0 top-0 z-10 h-full flex items-start pt-0.5 pointer-events-none`}>
         {!isExpanded && (
           <div className="absolute inset-0 bg-gradient-to-l from-slate-50 via-slate-50 to-transparent dark:from-slate-950 dark:via-slate-950 w-12 pointer-events-none" />
         )}
         
         <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative pointer-events-auto p-1.5 ml-auto mr-0 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-brand-600 transition-colors"
            title={isExpanded ? "Collapse" : "Show All"}
         >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
         </button>
      </div>
    </div>
  );
};

export default LanguageSelector;

import React, { useState } from 'react';
import { Language } from '../types';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface LanguageSelectorProps {
  selected: Language;
  onSelect: (lang: Language) => void;
}

const LANGUAGES = [
  Language.All,
  Language.English, Language.German, Language.French, Language.Spanish, 
  Language.Italian, Language.Portuguese, Language.Romanian, 
  Language.Dutch, Language.Swedish, Language.Danish, Language.Irish,
  Language.Polish, Language.Czech, Language.Slovak, Language.Russian, Language.Ukrainian, Language.Bulgarian,
  Language.Japanese, Language.Chinese, Language.Korean, Language.Vietnamese,
  Language.Indonesian, Language.Malay, Language.Tagalog, Language.Arabic
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full relative">
      {/* Mobile: Horizontal Scroll by default, Wrap when expanded. Desktop: Always Wrap */}
      <div 
        className={`
          flex gap-2 items-center transition-all duration-300 ease-in-out
          ${isExpanded 
            ? 'flex-wrap pr-8' // Add right padding for the toggle button
            : 'overflow-x-auto no-scrollbar flex-nowrap pr-10 md:pr-0 md:flex-wrap'
          }
        `}
      >
        {LANGUAGES.map(lang => {
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
        })}
      </div>

      {/* Expand/Collapse Toggle (Mobile Only) */}
      <div className={`md:hidden absolute right-0 top-0 z-10 h-full flex items-start pt-0.5 pointer-events-none transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-100'}`}>
         {/* Gradient Background only when collapsed to fade out list */}
         <div className={`absolute inset-0 bg-gradient-to-l from-slate-50 via-slate-50 to-transparent dark:from-slate-950 dark:via-slate-950 w-12 pointer-events-none ${isExpanded ? 'hidden' : 'block'}`} />
         
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


import React from 'react';
import { PlaceName } from '../types';

interface WordCardProps {
  wordData: PlaceName;
}

const WordCard: React.FC<WordCardProps> = ({ wordData }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(wordData.ascii);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const isDifferent = wordData.word !== wordData.ascii;

  return (
    <button 
      onClick={handleCopy}
      className={`group w-full text-left relative rounded px-3 py-1.5 transition-all duration-200 border flex flex-col justify-center
        ${copied 
          ? 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800' 
          : 'bg-white hover:bg-brand-50/50 border-slate-200 hover:border-brand-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600'
        }`}
    >
      <div className="flex justify-between items-baseline w-full gap-2">
        <span className={`text-sm font-semibold truncate ${copied ? 'text-green-700 dark:text-green-400' : 'text-slate-700 dark:text-slate-200'}`}>
          {wordData.word}
        </span>
        <span className="text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-tighter">
          {wordData.language}
        </span>
      </div>
      
      {isDifferent && (
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate -mt-0.5">
          {wordData.ascii}
        </span>
      )}
    </button>
  );
};

export default WordCard;

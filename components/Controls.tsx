
import React, { useState } from 'react';
import { Language, GenerationParams } from '../types';
import { Database, Sliders, Settings2 } from 'lucide-react';
import { getCapacity } from '../services/generator';
import MixConfigModal from './MixConfigModal';
import { DEFAULT_MIX_SETTINGS, DEFAULT_CHINESE_MIX, DEFAULT_ARABIC_MIX, DEFAULT_ENGLISH_MIX, LANGUAGE_GROUPS } from '../constants';

interface ControlsProps {
  params: GenerationParams;
  setParams: React.Dispatch<React.SetStateAction<GenerationParams>>;
  onGenerate: () => void;
  onDownload: (format: 'raw' | 'ascii') => void;
  isLoading: boolean;
  hasResults: boolean;
}

type ModalType = 'global' | 'chinese' | 'arabic' | 'english' | null;

const Controls: React.FC<ControlsProps> = ({ params, setParams }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const capacity = getCapacity(params);

  const handleGlobalMixUpdate = (lang: string, val: number) => {
     setParams(p => ({
       ...p,
       mixSettings: {
         ...p.mixSettings,
         [lang]: val
       }
     }));
  };

  const handleGlobalMixReset = () => {
    setParams(p => ({
      ...p,
      mixSettings: { ...DEFAULT_MIX_SETTINGS }
    }));
  };

  const handleChineseMixUpdate = (key: string, val: number) => {
    setParams(p => ({
      ...p,
      chineseMixSettings: {
        ...p.chineseMixSettings,
        [key]: val
      }
    }));
  };

  const handleChineseMixReset = () => {
    setParams(p => ({
      ...p,
      chineseMixSettings: { ...DEFAULT_CHINESE_MIX }
    }));
  };

  const handleArabicMixUpdate = (key: string, val: number) => {
    setParams(p => ({
      ...p,
      arabicMixSettings: {
        ...p.arabicMixSettings,
        [key]: val
      }
    }));
  };

  const handleArabicMixReset = () => {
    setParams(p => ({
      ...p,
      arabicMixSettings: { ...DEFAULT_ARABIC_MIX }
    }));
  };

  const handleEnglishMixUpdate = (key: string, val: number) => {
    setParams(p => ({
      ...p,
      englishMixSettings: {
        ...p.englishMixSettings,
        [key]: val
      }
    }));
  };

  const handleEnglishMixReset = () => {
    setParams(p => ({
      ...p,
      englishMixSettings: { ...DEFAULT_ENGLISH_MIX }
    }));
  };

  return (
    <div className="space-y-5">
      {/* Modals */}
      <MixConfigModal 
        isOpen={activeModal === 'global'}
        onClose={() => setActiveModal(null)}
        title="Language Distribution"
        mixSettings={params.mixSettings}
        onUpdate={handleGlobalMixUpdate}
        onReset={handleGlobalMixReset}
        groups={LANGUAGE_GROUPS}
      />
      <MixConfigModal 
        isOpen={activeModal === 'chinese'}
        onClose={() => setActiveModal(null)}
        title="Chinese Dialect Distribution"
        mixSettings={params.chineseMixSettings}
        onUpdate={handleChineseMixUpdate}
        onReset={handleChineseMixReset}
      />
      <MixConfigModal 
        isOpen={activeModal === 'arabic'}
        onClose={() => setActiveModal(null)}
        title="Arabic Dialect Distribution"
        mixSettings={params.arabicMixSettings}
        onUpdate={handleArabicMixUpdate}
        onReset={handleArabicMixReset}
      />
      <MixConfigModal 
        isOpen={activeModal === 'english'}
        onClose={() => setActiveModal(null)}
        title="English Style Distribution"
        mixSettings={params.englishMixSettings}
        onUpdate={handleEnglishMixUpdate}
        onReset={handleEnglishMixReset}
      />

      {/* Info Panel */}
      <div className="flex justify-between items-baseline px-1 border-b border-slate-100 dark:border-slate-800 pb-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Capacity</label>
        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
            <Database size={10} /> {capacity}
        </span>
      </div>

      {/* Dynamic Sub-Configuration based on Language */}
      {params.language === Language.All && (
        <button 
            onClick={() => setActiveModal('global')}
            className="w-full text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg"
        >
            <Settings2 size={14} />
            Adjust Global Mix
        </button>
      )}

      {params.language === Language.Chinese && (
         <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800 animate-fade-in">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Regional Script</label>
            <select 
               value={params.romanizationStyle}
               onChange={(e) => setParams(p => ({...p, romanizationStyle: e.target.value as any}))}
               className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-xs py-1.5 px-2 focus:ring-1 focus:ring-brand-500 outline-none"
            >
               <option value="mixed">Mixed (Configurable)</option>
               <option value="pinyin">Mainland (Pinyin)</option>
               <option value="wadegiles">Taiwan (Wade-Giles)</option>
               <option value="cantonese">Hong Kong (Cantonese)</option>
            </select>
            {params.romanizationStyle === 'mixed' && (
                <button 
                   onClick={() => setActiveModal('chinese')}
                   className="w-full mt-2 text-[10px] font-medium text-brand-600 hover:text-brand-700 flex items-center justify-center gap-1"
                >
                   <Sliders size={10} />
                   Configure Weights
                </button>
            )}
         </div>
      )}

      {params.language === Language.English && (
         <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800 animate-fade-in">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Algorithm</label>
            <select 
               value={params.englishStyle}
               onChange={(e) => setParams(p => ({...p, englishStyle: e.target.value as any}))}
               className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-xs py-1.5 px-2 focus:ring-1 focus:ring-brand-500 outline-none"
            >
               <option value="mixed">Mixed</option>
               <option value="modern">Phonetic</option>
               <option value="old">Dictionary</option>
            </select>
            {params.englishStyle === 'mixed' && (
                <button 
                   onClick={() => setActiveModal('english')}
                   className="w-full mt-2 text-[10px] font-medium text-brand-600 hover:text-brand-700 flex items-center justify-center gap-1"
                >
                   <Sliders size={10} />
                   Configure Weights
                </button>
            )}
         </div>
      )}

      {params.language === Language.Arabic && (
         <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800 animate-fade-in">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Dialect</label>
            <select 
               value={params.arabicStyle}
               onChange={(e) => setParams(p => ({...p, arabicStyle: e.target.value as any}))}
               className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-xs py-1.5 px-2 focus:ring-1 focus:ring-brand-500 outline-none"
            >
               <option value="mixed">Mixed</option>
               <option value="standard">Standard (Fusha)</option>
               <option value="egyptian">Egyptian (Masri)</option>
               <option value="levantine">Levantine (Shami)</option>
               <option value="gulf">Gulf (Khaleeji)</option>
               <option value="maghrebi">Maghrebi (Darija)</option>
            </select>
            {params.arabicStyle === 'mixed' && (
                <button 
                   onClick={() => setActiveModal('arabic')}
                   className="w-full mt-2 text-[10px] font-medium text-brand-600 hover:text-brand-700 flex items-center justify-center gap-1"
                >
                   <Sliders size={10} />
                   Configure Weights
                </button>
            )}
         </div>
      )}

      {/* Base Parameters */}
      <div className="space-y-5 pb-2">
          <div className="space-y-2">
            <div className="flex justify-between px-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Count</label>
               <span className="text-xs font-mono text-slate-600 dark:text-slate-300">{params.count}</span>
            </div>
            <input 
               type="range" 
               min="12" 
               max="300" 
               step="12"
               value={params.count}
               onChange={(e) => setParams(p => ({...p, count: parseInt(e.target.value)}))}
               className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600 block"
            />
          </div>

          <div className="space-y-2">
             <div className="flex justify-between px-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Word Length</label>
            </div>
            <div className="flex gap-2">
               <div className="relative w-1/2">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono uppercase">Min</span>
                  <input 
                    type="number"
                    min="2"
                    max="20"
                    value={params.minLength}
                    onChange={(e) => setParams(p => ({...p, minLength: parseInt(e.target.value)}))}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md text-xs py-1.5 pl-8 pr-1 text-center focus:ring-1 focus:ring-brand-500 outline-none"
                  />
               </div>
               <div className="relative w-1/2">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono uppercase">Max</span>
                  <input 
                    type="number"
                    min="5"
                    max="40"
                    value={params.maxLength}
                    onChange={(e) => setParams(p => ({...p, maxLength: parseInt(e.target.value)}))}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md text-xs py-1.5 pl-8 pr-1 text-center focus:ring-1 focus:ring-brand-500 outline-none"
                  />
               </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Controls;

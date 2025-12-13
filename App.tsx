
import React, { useState, useCallback } from 'react';
import { PlaceName, GenerationParams, Language } from './types';
import { generateNonceWords } from './services/generator';
import Controls from './components/Controls';
import LanguageSelector from './components/LanguageSelector';
import { DEFAULT_MIX_SETTINGS, DEFAULT_CHINESE_MIX, DEFAULT_ARABIC_MIX, DEFAULT_ENGLISH_MIX } from './constants';
import WordCard from './components/WordCard';
import { Map, Github, Layout, Loader2, SlidersHorizontal, FileText, FileCode, ChevronDown, ChevronUp, Play } from 'lucide-react';

const App: React.FC = () => {
  const [words, setWords] = useState<PlaceName[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(true);
  
  // Default Mix
  const [params, setParams] = useState<GenerationParams>({
    language: Language.All,
    count: 48,
    minLength: 5,
    maxLength: 40,
    romanizationStyle: 'mixed',
    arabicStyle: 'mixed',
    englishStyle: 'mixed',
    mixSettings: { ...DEFAULT_MIX_SETTINGS },
    chineseMixSettings: { ...DEFAULT_CHINESE_MIX },
    arabicMixSettings: { ...DEFAULT_ARABIC_MIX },
    englishMixSettings: { ...DEFAULT_ENGLISH_MIX }
  });

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setWords([]); 
    
    try {
      const results = await generateNonceWords(params);
      setWords(results);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during generation.');
    } finally {
      setLoading(false);
    }
  }, [params]);

  const handleDownload = (format: 'raw' | 'ascii') => {
    if (words.length === 0) return;

    const content = words.map(w => format === 'raw' ? w.word : w.ascii).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nowhere_${params.language.toLowerCase()}_${format}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleScroll = () => {
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden relative">
      
      {/* Header */}
      <header className="h-16 flex-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 z-20 shadow-sm relative">
         <div className="flex items-center gap-3">
           <div className="bg-brand-600 text-white p-1.5 rounded-lg shadow-lg shadow-brand-500/20">
             <Map size={20} strokeWidth={2.5} />
           </div>
           <div className="flex flex-col">
             <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">nowhere</h1>
             <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Procedural Nomenclature</p>
           </div>
         </div>

         {/* Right Actions */}
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
               <button 
                 onClick={() => handleDownload('raw')} 
                 disabled={words.length === 0} 
                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed" 
                 title="Export Native Script"
               >
                 <FileText size={14} />
                 <span className="hidden sm:inline">Native</span>
               </button>
               <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
               <button 
                 onClick={() => handleDownload('ascii')} 
                 disabled={words.length === 0} 
                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed" 
                 title="Export ASCII/Romanized"
               >
                 <FileCode size={14} />
                 <span className="hidden sm:inline">ASCII</span>
               </button>
            </div>
            
            <a 
              href="#" 
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors hidden sm:block"
            >
              <Github size={20} />
            </a>
         </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden flex flex-col relative z-0">
          
          {/* Scrollable Results */}
          <div 
            className="flex-grow overflow-y-auto scroll-smooth pb-48 md:pb-32"
            onScroll={handleScroll}
          >
            <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-50 via-slate-50 to-transparent dark:from-slate-950 dark:via-slate-950 pt-4 px-4 pb-8">
               <div className="max-w-6xl mx-auto">
                 <LanguageSelector 
                   selected={params.language} 
                   onSelect={(lang) => setParams(p => ({ ...p, language: lang }))} 
                 />
               </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8">
              
              {/* Context Header */}
              {words.length > 0 && (
                <div className="mb-6 flex items-baseline gap-3 animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                    Generated Results
                  </h2>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    {words.length} items
                  </span>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-xl text-sm font-medium mb-6 animate-fade-in">
                  {error}
                </div>
              )}

              {/* Loading State */}
              {loading && words.length === 0 && (
                 <div className="h-64 flex flex-col items-center justify-center text-slate-400 animate-pulse">
                    <Loader2 className="animate-spin mb-4" size={32} />
                    <p className="text-sm font-medium">Synthesizing words...</p>
                 </div>
              )}

              {/* Empty State */}
              {!loading && words.length === 0 && !error && (
                <div className="h-[50vh] flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl opacity-60">
                   <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-full mb-6">
                     <Layout className="text-slate-300 dark:text-slate-600" size={48} />
                   </div>
                   <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Ready</h3>
                   <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                     Configure settings and press generate to begin.
                   </p>
                 </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-20">
                 {words.map((word, index) => (
                   <div key={`${word.word}-${index}`} className="opacity-0 animate-fade-in" style={{ animationDelay: `${Math.min(index * 5, 500)}ms`, animationFillMode: 'forwards' }}>
                      <WordCard wordData={word} />
                   </div>
                 ))}
              </div>
            </div>
          </div>
      </main>

      {/* Floating Controls Window (Mobile: Stacked above button, Desktop: Bottom Left) */}
      <div 
        className="fixed z-30 flex flex-col bottom-20 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:w-96"
      >
         <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden flex flex-col">
            {/* Window Header */}
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shrink-0 z-10 relative border-b border-transparent"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
               <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                  <div className={`p-1.5 rounded-md transition-colors ${isSettingsOpen ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                    <SlidersHorizontal size={16} />
                  </div>
                  <span>Configuration</span>
               </div>
               <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  {isSettingsOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
               </button>
            </div>

            {/* Window Content with Grid Transition */}
            <div 
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isSettingsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
               <div className="overflow-hidden">
                  <div className="overflow-y-auto custom-scrollbar p-5 pt-0 max-h-[50vh] md:max-h-[60vh]">
                     <Controls 
                        params={params} 
                        setParams={setParams} 
                        onGenerate={() => {}} 
                        onDownload={() => {}} 
                        isLoading={loading}
                        hasResults={words.length > 0}
                      />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Floating Generate Button (Mobile: Bottom Center Fullish, Desktop: Bottom Center Floating) */}
      <div className="fixed z-40 transition-all duration-200 bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:bottom-8">
         <button
            onClick={handleGenerate}
            disabled={loading}
            className="group w-full md:w-auto flex justify-center items-center gap-3 pl-6 pr-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl md:rounded-full shadow-2xl shadow-slate-900/30 dark:shadow-white/10 hover:shadow-slate-900/50 dark:hover:shadow-white/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 dark:bg-slate-900/10 ${loading ? 'animate-spin' : ''}`}>
               {loading ? <Loader2 size={18} /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </div>
            <span className="text-lg font-bold tracking-tight">Generate</span>
         </button>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
        }
        /* Mobile Horizontal Scroll Hide */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default App;
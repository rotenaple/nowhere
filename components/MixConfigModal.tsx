
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, RotateCcw, Check, BarChart3, Info } from 'lucide-react';

interface MixConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mixSettings: Record<string, number>;
  onUpdate: (lang: string, value: number) => void;
  onReset: () => void;
  groups?: Record<string, string[]>;
}

const PALETTE = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', 
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
  '#14b8a6', '#d946ef', '#f43f5e', '#eab308', '#a855f7'
];

const LABEL_MAP: Record<string, string> = {
  'modern': 'Phonetic',
  'old': 'Dictionary',
  'tw': 'Taiwan (Wade-Giles)',
  'cn': 'China (Pinyin)',
  'hk': 'Hong Kong (Cantonese)',
  'standard': 'Standard',
  'egyptian': 'Egyptian',
  'levantine': 'Levantine',
  'gulf': 'Gulf',
  'maghrebi': 'Maghrebi'
};

const MixConfigModal: React.FC<MixConfigModalProps> = ({ isOpen, onClose, title, mixSettings, onUpdate, onReset, groups }) => {
  if (!isOpen) return null;

  // Calculate totals and percentages
  const { totalWeight, distribution } = useMemo(() => {
    const total = Object.values(mixSettings).reduce((acc: number, val: number) => acc + val, 0);
    const safeTotal = total === 0 ? 1 : total; 
    
    const dist = Object.entries(mixSettings)
      .map(([lang, weight]) => ({
        lang,
        weight: Number(weight),
        percentage: (Number(weight) / safeTotal) * 100
      }))
      .filter(d => d.weight > 0)
      .sort((a, b) => b.weight - a.weight); 

    return { totalWeight: safeTotal, distribution: dist };
  }, [mixSettings]);

  const getEffectivePercentage = (lang: string) => {
    const weight = mixSettings[lang] || 0;
    if (totalWeight === 0) return "0.0";
    return ((weight / totalWeight) * 100).toFixed(1);
  };

  const getLabel = (key: string) => {
    return LABEL_MAP[key] || key.replace(/_/g, ' ');
  };

  // If no groups provided, create a single "General" group with all keys
  const displayGroups: Record<string, string[]> = groups || { "General": Object.keys(mixSettings) };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BarChart3 size={20} className="text-brand-500" />
              {title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              Set the <strong>relative weight</strong> for each variant. These values do not need to sum to 100. 
              Higher weights increase generation frequency.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Reset to Defaults"
            >
              <RotateCcw size={18} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Live Visualization Bar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
           <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Output Mix</label>
              <span className="text-xs text-slate-500 font-mono">
                {distribution.length > 0 
                  ? `Dominant: ${getLabel(distribution[0].lang)} (${distribution[0].percentage.toFixed(0)}%)` 
                  : 'No options selected'}
              </span>
           </div>
           <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800">
              {distribution.map((item, idx) => (
                <div 
                  key={item.lang}
                  style={{ 
                    width: `${item.percentage}%`, 
                    backgroundColor: PALETTE[idx % PALETTE.length] 
                  }}
                  className="h-full transition-all duration-300 relative group first:rounded-l-full last:rounded-r-full"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-10 whitespace-nowrap bg-slate-800 text-white text-xs py-1 px-2 rounded shadow-lg pointer-events-none">
                    {getLabel(item.lang)}: {item.percentage.toFixed(1)}%
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Scrollable Sliders */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar bg-white dark:bg-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {Object.entries(displayGroups).map(([groupName, items]) => (
              <div key={groupName} className="space-y-4">
                <h3 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">
                  {groupName}
                </h3>
                <div className="space-y-5">
                  {(items as string[]).map(key => {
                    const weight = mixSettings[key] || 0;
                    const effectivePct = getEffectivePercentage(key);
                    const isZero = weight === 0;

                    return (
                      <div key={key} className={`transition-opacity ${isZero ? 'opacity-50 hover:opacity-100' : 'opacity-100'}`}>
                        <div className="flex justify-between items-end mb-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize">
                            {getLabel(key)}
                          </label>
                          <div className="text-right">
                            <div className="text-xs font-mono text-slate-500">
                              Weight: <span className="font-bold text-slate-900 dark:text-white">{weight}</span>
                            </div>
                            <div className="text-[10px] text-brand-600 dark:text-brand-400 font-medium">
                              ≈ {effectivePct}%
                            </div>
                          </div>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={weight}
                          onChange={(e) => onUpdate(key, parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600 hover:accent-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Info size={14} />
            <span>Higher weights increase generation probability.</span>
          </div>
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all active:scale-[0.98] flex items-center gap-2"
          >
            <Check size={18} strokeWidth={3} />
            Apply Settings
          </button>
        </div>
      </div>
      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: currentColor;
          margin-top: -6px; /* align with track */
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        input[type=range]::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 2px;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default MixConfigModal;
    
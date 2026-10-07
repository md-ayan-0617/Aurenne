import React, { useEffect } from 'react';
import { useUiStore } from '../../store/useUiStore';

export interface FilterState {
  category: string;
  material: string;
  stone: string;
  collection: string;
  availability: string;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, val: string) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const { setCursor, resetCursor } = useUiStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Filter Collection"
      className="fixed inset-0 z-[9996] flex justify-end"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#08090A]/70 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-[460px] h-full bg-[#111214] border-l border-[rgba(199,166,106,0.15)] text-[#F1EDE5] flex flex-col justify-between shadow-2xl animate-fade-in overflow-y-auto">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <span className="font-['Bodoni_Moda'] text-[18px] uppercase tracking-[0.2em] text-[#C7A66A]">
            FILTER ARCHIVE
          </span>
          <button
            onClick={onClose}
            onMouseEnter={() => setCursor('default', 'CLOSE')}
            onMouseLeave={resetCursor}
            className="text-[11px] uppercase tracking-[0.2em] hover:text-[#C7A66A] transition-colors"
          >
            CLOSE
          </button>
        </div>

        {/* Filter Sections */}
        <div className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          {/* Category Filter */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] block">
              OBJECT TYPE
            </span>
            <div className="space-y-1">
              {['All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets', 'High Jewellery'].map((item) => {
                const isSelected = filters.category === item || (item === 'All' && !filters.category);
                return (
                  <button
                    key={item}
                    onClick={() => onFilterChange('category', item === 'All' ? '' : item)}
                    className={`w-full py-2.5 px-3 flex items-center justify-between text-[13px] font-['Space_Grotesk'] border-b transition-colors ${
                      isSelected
                        ? 'border-[#C7A66A] text-[#F1EDE5] bg-[#1A1C20]'
                        : 'border-[rgba(255,255,255,0.04)] text-[#777774] hover:text-[#F1EDE5]'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collection Filter */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] block">
              COLLECTION
            </span>
            <div className="space-y-1">
              {['All', 'Nocturne', 'Verde Notte', 'Solar', 'Linea', 'High Jewellery'].map((item) => {
                const isSelected = filters.collection === item || (item === 'All' && !filters.collection);
                return (
                  <button
                    key={item}
                    onClick={() => onFilterChange('collection', item === 'All' ? '' : item)}
                    className={`w-full py-2.5 px-3 flex items-center justify-between text-[13px] font-['Space_Grotesk'] border-b transition-colors ${
                      isSelected
                        ? 'border-[#C7A66A] text-[#F1EDE5] bg-[#1A1C20]'
                        : 'border-[rgba(255,255,255,0.04)] text-[#777774] hover:text-[#F1EDE5]'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Material Filter */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] block">
              PRECIOUS METAL
            </span>
            <div className="space-y-1">
              {['All', '18K Yellow Gold', 'Platinum 950', '18K Blackened Gold', '18K White Gold'].map((item) => {
                const isSelected = filters.material === item || (item === 'All' && !filters.material);
                return (
                  <button
                    key={item}
                    onClick={() => onFilterChange('material', item === 'All' ? '' : item)}
                    className={`w-full py-2.5 px-3 flex items-center justify-between text-[13px] font-['Space_Grotesk'] border-b transition-colors ${
                      isSelected
                        ? 'border-[#C7A66A] text-[#F1EDE5] bg-[#1A1C20]'
                        : 'border-[rgba(255,255,255,0.04)] text-[#777774] hover:text-[#F1EDE5]'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-8 border-t border-[rgba(199,166,106,0.15)] bg-[#0B0C0E] flex items-center justify-between gap-4">
          <button
            onClick={onReset}
            className="text-[11px] uppercase tracking-[0.2em] text-[#777774] hover:text-[#F1EDE5]"
          >
            RESET ALL
          </button>

          <button
            onClick={onClose}
            className="btn-solid-luxury py-2.5 px-6 text-[11px]"
          >
            VIEW ({totalResults}) PIECES →
          </button>
        </div>
      </div>
    </div>
  );
};

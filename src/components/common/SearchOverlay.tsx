import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUiStore } from '../../store/useUiStore';
import { products } from '../../data/products';
import { collections } from '../../data/collections';
import { journalArticles } from '../../data/journal';
import { SafeImage } from './SafeImage';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, closeSearch, setCursor, resetCursor } = useUiStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const normalized = query.trim().toLowerCase();

  const filteredProducts = normalized
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(normalized) ||
          p.collection.toLowerCase().includes(normalized) ||
          p.category.toLowerCase().includes(normalized) ||
          p.stones.some((s) => s.toLowerCase().includes(normalized)) ||
          p.materials.some((m) => m.toLowerCase().includes(normalized))
      )
    : [];

  const filteredCollections = normalized
    ? collections.filter(
        (c) =>
          c.name.toLowerCase().includes(normalized) ||
          c.tagline.toLowerCase().includes(normalized) ||
          c.description.toLowerCase().includes(normalized)
      )
    : [];

  const filteredArticles = normalized
    ? journalArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(normalized) ||
          a.category.toLowerCase().includes(normalized) ||
          a.subtitle.toLowerCase().includes(normalized)
      )
    : [];

  const hasResults =
    filteredProducts.length > 0 ||
    filteredCollections.length > 0 ||
    filteredArticles.length > 0;

  const handleSelect = (url: string) => {
    closeSearch();
    navigate(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Aurenne Collections and Objects"
      className="fixed inset-0 z-[9995] bg-[#F8F5EF] text-[#111214] flex flex-col overflow-y-auto animate-fade-in"
    >
      {/* Search Header Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12 py-8 flex items-center justify-between border-b border-[rgba(17,18,20,0.08)]">
        <span className="font-['Bodoni_Moda'] text-[16px] tracking-[0.4em] uppercase text-[#98743F]">
          A U R E N N E
        </span>

        <button
          onClick={closeSearch}
          onMouseEnter={() => setCursor('default', 'CLOSE')}
          onMouseLeave={resetCursor}
          className="text-[11px] font-medium tracking-[0.25em] uppercase hover:text-[#98743F] transition-colors flex items-center gap-2"
        >
          <span>CLOSE [ESC]</span>
        </button>
      </div>

      {/* Input Field Section */}
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 pt-14 pb-10">
        <div className="relative border-b-2 border-[#111214]/20 focus-within:border-[#98743F] transition-colors pb-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PIECES, EMERALDS, GOLD..."
            className="w-full bg-transparent font-['Bodoni_Moda'] text-[28px] sm:text-[44px] md:text-[62px] text-[#111214] outline-none placeholder:text-[#111214]/25 uppercase tracking-[-0.01em]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.2em] text-[#777774] hover:text-[#111214]"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills when empty */}
        {!query && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#777774] font-mono mr-2">
              SUGGESTED:
            </span>
            {['Arc Ring', 'Emerald', 'Nocturne', 'Solis Cuff', 'Bespoke', 'White Gold'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] border border-[rgba(17,18,20,0.12)] hover:border-[#98743F] hover:bg-[#98743F]/5 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Results Display */}
      {query && (
        <div className="flex-1 w-full max-w-[1280px] mx-auto px-6 md:px-12 pb-20">
          {hasResults ? (
            <div className="space-y-16">
              {/* Products / Pieces */}
              {filteredProducts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[rgba(17,18,20,0.1)] mb-8">
                    <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.25em] text-[#98743F]">
                      OBJECTS OF LIGHT ({filteredProducts.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((piece) => (
                      <div
                        key={piece.id}
                        onClick={() => handleSelect(`/piece/${piece.slug}`)}
                        onMouseEnter={() => setCursor('view', 'VIEW')}
                        onMouseLeave={resetCursor}
                        className="group cursor-pointer flex flex-col gap-3"
                      >
                        <div className="aspect-[4/5] bg-[#EAE5DA] overflow-hidden relative">
                          <SafeImage
                            src={piece.images[0]}
                            alt={piece.name}
                            luxuryLabel={piece.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex justify-between items-baseline pt-2">
                          <div>
                            <span className="block font-['Bodoni_Moda'] text-[18px] text-[#111214] group-hover:text-[#98743F] transition-colors">
                              {piece.name}
                            </span>
                            <span className="text-[11px] text-[#656668] uppercase tracking-[0.15em]">
                              {piece.materials[0]}
                            </span>
                          </div>
                          <span className="font-mono text-[13px] text-[#111214]">
                            {piece.currency}{piece.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Collections */}
              {filteredCollections.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[rgba(17,18,20,0.1)] mb-8">
                    <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.25em] text-[#98743F]">
                      COLLECTIONS ({filteredCollections.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCollections.map((col) => (
                      <div
                        key={col.id}
                        onClick={() => handleSelect(`/collections/${col.slug}`)}
                        className="p-8 bg-[#EFEBE1] border border-[rgba(17,18,20,0.06)] hover:border-[#98743F] cursor-pointer transition-all group"
                      >
                        <span className="font-['Italiana'] text-[36px] block text-[#111214] group-hover:text-[#98743F] transition-colors">
                          {col.name}
                        </span>
                        <p className="font-['Newsreader'] italic text-[16px] text-[#656668] mt-2">
                          "{col.tagline}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Journal Stories */}
              {filteredArticles.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[rgba(17,18,20,0.1)] mb-8">
                    <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.25em] text-[#98743F]">
                      JOURNAL ESSAYS ({filteredArticles.length})
                    </span>
                  </div>
                  <div className="space-y-4">
                    {filteredArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleSelect(`/journal/${art.slug}`)}
                        className="p-6 border-b border-[rgba(17,18,20,0.08)] hover:bg-[#EFEBE1] cursor-pointer flex justify-between items-center transition-colors group"
                      >
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#98743F]">
                            {art.category}
                          </span>
                          <h4 className="font-['Newsreader'] text-[24px] text-[#111214] group-hover:text-[#98743F] transition-colors">
                            {art.title}
                          </h4>
                        </div>
                        <span className="font-mono text-[11px] text-[#777774]">
                          {art.readTime} →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Aesthetic No Results State */
            <div className="py-24 text-center max-w-md mx-auto">
              <span className="font-mono text-[12px] uppercase tracking-[0.25em] text-[#98743F] block mb-3">
                NO CORRESPONDING OBJECT
              </span>
              <h3 className="font-['Bodoni_Moda'] text-[28px] text-[#111214] mb-4">
                The piece you seek remains uncatalogued.
              </h3>
              <p className="font-['Space_Grotesk'] text-[14px] text-[#656668] mb-8 leading-relaxed">
                Our bespoke atelier crafts private commissions tailored to personal stone specifications.
              </p>
              <button
                onClick={() => handleSelect('/bespoke')}
                className="btn-luxury inline-flex"
              >
                DISCUSS A BESPOKE COMMISSION →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

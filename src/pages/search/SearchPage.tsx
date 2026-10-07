import React, { useState, useEffect } from 'react';
import { products } from '../../data/products';
import { collections } from '../../data/collections';
import { ProductCard } from '../../components/product/ProductCard';
import { useUiStore } from '../../store/useUiStore';
import { Link } from 'react-router-dom';

export const SearchPage: React.FC = () => {
  const { setActiveTheme } = useUiStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setActiveTheme('warm-white');
  }, [setActiveTheme]);

  const query = searchTerm.toLowerCase().trim();

  const matchedProducts = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.collection.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.materials.some((m) => m.toLowerCase().includes(query)) ||
          p.stones.some((s) => s.toLowerCase().includes(query))
      )
    : products;

  return (
    <div className="w-full bg-[#F8F5EF] text-[#111214] pt-32 pb-40 min-h-screen">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="border-b border-[#111214]/15 pb-8 mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-2">
            CATALOGUE INVENTORY
          </span>
          <h1 className="font-['Italiana'] text-[48px] sm:text-[76px] lg:text-[96px] uppercase leading-[0.92]">
            Search Archive.
          </h1>

          <div className="mt-8 max-w-2xl border-b-2 border-[#111214] focus-within:border-[#98743F] transition-colors pb-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="QUERY BY STONE, METAL OR FORM..."
              className="w-full bg-transparent font-['Space_Grotesk'] text-[24px] sm:text-[36px] outline-none placeholder:text-[#111214]/20 uppercase"
            />
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-baseline mb-8 font-mono text-[12px] text-[#777774]">
            <span>FOUND {matchedProducts.length} OBJECTS</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="hover:text-[#111214] uppercase tracking-[0.1em]"
              >
                CLEAR FILTER ✕
              </button>
            )}
          </div>

          {matchedProducts.length === 0 ? (
            <div className="py-24 text-center max-w-lg mx-auto space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#98743F] block">
                NO CORRESPONDING OBJECTS FOUND
              </span>
              <p className="font-['Newsreader'] italic text-[22px] text-[#58595C]">
                "No archived piece matches &lsquo;{searchTerm}&rsquo;. Refine your inquiry by stone, material, or silhouette."
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-2">
                {['Emerald', 'Diamond', '18K Gold', 'Ring', 'Necklace', 'Nocturne'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="px-3 py-1 text-[11px] font-mono uppercase tracking-[0.1em] border border-[#111214]/15 hover:border-[#98743F] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {matchedProducts.map((p) => (
                <ProductCard key={p.id} product={p} cardTheme="light" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

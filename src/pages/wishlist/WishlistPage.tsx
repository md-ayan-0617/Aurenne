import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useBagStore } from '../../store/useBagStore';
import { ProductCard } from '../../components/product/ProductCard';
import { useUiStore } from '../../store/useUiStore';

export const WishlistPage: React.FC = () => {
  const { items, clearWishlist } = useWishlistStore();
  const { addToBag } = useBagStore();
  const { setActiveTheme } = useUiStore();

  useEffect(() => {
    setActiveTheme('obsidian');
  }, [setActiveTheme]);

  return (
    <div className="w-full bg-[#08090A] text-[#F1EDE5] pt-32 pb-40 min-h-screen">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="border-b border-[rgba(255,255,255,0.08)] pb-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
              PERSONAL CURATION
            </span>
            <h1 className="font-['Bodoni_Moda'] text-[48px] sm:text-[76px] lg:text-[96px] uppercase leading-[0.92]">
              Objects <br />
              You Kept.
            </h1>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] text-[#777774]">
            <span>[{items.length} SAVED PIECES]</span>
            {items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="hover:text-[#C7A66A] transition-colors uppercase tracking-[0.1em]"
              >
                CLEAR ALL ✕
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#777774] block">
              NO PIECES PRESERVED
            </span>
            <p className="font-['Newsreader'] italic text-[22px] text-[#9B9A96]">
              "When you encounter a piece whose tension resonates with you, keep it here."
            </p>
            <Link to="/collections" className="btn-luxury inline-flex mt-6">
              EXPLORE COLLECTIONS →
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {items.map((piece) => (
                <div key={piece.id} className="space-y-4">
                  <ProductCard product={piece} cardTheme="dark" />
                  <button
                    onClick={() => addToBag(piece)}
                    className="w-full btn-solid-luxury py-2.5 text-[10px]"
                  >
                    TRANSFER TO BAG →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

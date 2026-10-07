import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useBagStore } from '../../store/useBagStore';
import { useUiStore } from '../../store/useUiStore';
import { SafeImage } from './SafeImage';

export const WishlistDrawer: React.FC = () => {
  const { items, isWishlistOpen, closeWishlist, removeFromWishlist } = useWishlistStore();
  const { addToBag } = useBagStore();
  const { setCursor, resetCursor } = useUiStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWishlistOpen) closeWishlist();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWishlistOpen, closeWishlist]);

  if (!isWishlistOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist Drawer"
      className="fixed inset-0 z-[9998] flex justify-end"
    >
      <div
        onClick={closeWishlist}
        className="fixed inset-0 bg-[#08090A]/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="relative z-10 w-full max-w-[480px] h-full bg-[#0E0F12] border-l border-[rgba(199,166,106,0.15)] text-[#F1EDE5] flex flex-col justify-between shadow-2xl animate-fade-in">
        <div className="p-6 md:p-8 border-b border-[rgba(199,166,106,0.12)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-['Bodoni_Moda'] text-[18px] uppercase tracking-[0.2em] text-[#C7A66A]">
              WISHLIST
            </span>
            <span className="font-mono text-[12px] text-[#777774]">
              [{items.length}]
            </span>
          </div>

          <button
            onClick={closeWishlist}
            onMouseEnter={() => setCursor('default', 'CLOSE')}
            onMouseLeave={resetCursor}
            className="text-[11px] uppercase tracking-[0.2em] hover:text-[#C7A66A] transition-colors"
          >
            CLOSE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#777774] block">
                NO SAVED OBJECTS
              </span>
              <p className="font-['Newsreader'] italic text-[18px] text-[#9B9A96]">
                "Items marked with a heart will be safely preserved here."
              </p>
              <button
                onClick={() => {
                  closeWishlist();
                  navigate('/collections');
                }}
                className="btn-luxury inline-flex mt-4"
              >
                EXPLORE COLLECTIONS →
              </button>
            </div>
          ) : (
            items.map((piece) => (
              <div
                key={piece.id}
                className="flex gap-4 pb-6 border-b border-[rgba(255,255,255,0.06)]"
              >
                <div
                  onClick={() => {
                    closeWishlist();
                    navigate(`/piece/${piece.slug}`);
                  }}
                  className="w-20 h-24 bg-[#141518] overflow-hidden flex-shrink-0 cursor-pointer border border-[rgba(199,166,106,0.1)]"
                >
                  <SafeImage
                    src={piece.images[0]}
                    alt={piece.name}
                    luxuryLabel={piece.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4
                        onClick={() => {
                          closeWishlist();
                          navigate(`/piece/${piece.slug}`);
                        }}
                        className="font-['Bodoni_Moda'] text-[16px] text-[#F1EDE5] cursor-pointer hover:text-[#C7A66A] transition-colors"
                      >
                        {piece.name}
                      </h4>
                      <button
                        onClick={() => removeFromWishlist(piece.id)}
                        className="text-[#777774] hover:text-[#C7A66A] text-[12px]"
                      >
                        ✕
                      </button>
                    </div>
                    <span className="block text-[11px] font-mono text-[#9B9A96] mt-0.5">
                      {piece.materials[0]}
                    </span>
                    <span className="block font-mono text-[13px] text-[#C7A66A] mt-1">
                      {piece.currency}{piece.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        addToBag(piece);
                        removeFromWishlist(piece.id);
                      }}
                      className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-[0.16em] bg-[#C7A66A] text-[#08090A] hover:bg-[#E5CA92] transition-colors"
                    >
                      MOVE TO BAG
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 md:p-8 border-t border-[rgba(199,166,106,0.15)] bg-[#0A0B0D]">
            <button
              onClick={() => {
                closeWishlist();
                navigate('/wishlist');
              }}
              className="w-full btn-outline-luxury text-center justify-center"
            >
              VIEW FULL WISHLIST GALLERY →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

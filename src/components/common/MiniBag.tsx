import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBagStore } from '../../store/useBagStore';
import { useUiStore } from '../../store/useUiStore';
import { SafeImage } from './SafeImage';

export const MiniBag: React.FC = () => {
  const { items, isBagOpen, closeBag, updateQuantity, removeFromBag, getSubtotal } = useBagStore();
  const { setCursor, resetCursor } = useUiStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBagOpen) closeBag();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBagOpen, closeBag]);

  if (!isBagOpen) return null;

  const subtotal = getSubtotal();

  const handleCheckout = () => {
    closeBag();
    navigate('/bag');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-[9998] flex justify-end"
    >
      {/* Dim Backdrop */}
      <div
        onClick={closeBag}
        className="fixed inset-0 bg-[#08090A]/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide-out Drawer */}
      <div className="relative z-10 w-full max-w-[480px] h-full bg-[#0E0F12] border-l border-[rgba(199,166,106,0.15)] text-[#F1EDE5] flex flex-col justify-between shadow-2xl animate-fade-in">
        {/* Drawer Header */}
        <div className="p-6 md:p-8 border-b border-[rgba(199,166,106,0.12)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-['Bodoni_Moda'] text-[18px] uppercase tracking-[0.2em] text-[#C7A66A]">
              SHOPPING BAG
            </span>
            <span className="font-mono text-[12px] text-[#777774]">
              [{items.length}]
            </span>
          </div>

          <button
            onClick={closeBag}
            onMouseEnter={() => setCursor('default', 'CLOSE')}
            onMouseLeave={resetCursor}
            className="text-[11px] uppercase tracking-[0.2em] hover:text-[#C7A66A] transition-colors"
          >
            CLOSE
          </button>
        </div>

        {/* Bag Items List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#777774] block">
                YOUR BAG IS EMPTY
              </span>
              <p className="font-['Newsreader'] italic text-[18px] text-[#9B9A96]">
                "No objects have been chosen for your personal collection."
              </p>
              <button
                onClick={() => {
                  closeBag();
                  navigate('/collections');
                }}
                className="btn-luxury inline-flex mt-4"
              >
                EXPLORE COLLECTIONS →
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedMaterial}-${idx}`}
                className="flex gap-4 pb-6 border-b border-[rgba(255,255,255,0.06)]"
              >
                <div className="w-20 h-24 bg-[#141518] overflow-hidden flex-shrink-0 border border-[rgba(199,166,106,0.1)]">
                  <SafeImage
                    src={item.product.images[0]}
                    alt={item.product.name}
                    luxuryLabel={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-['Bodoni_Moda'] text-[16px] text-[#F1EDE5]">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() =>
                          removeFromBag(
                            item.product.id,
                            item.selectedSize,
                            item.selectedMaterial
                          )
                        }
                        className="text-[#777774] hover:text-[#C7A66A] text-[12px]"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                    <span className="block text-[11px] font-mono text-[#9B9A96] mt-0.5">
                      {item.selectedMaterial} / {item.selectedSize}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[rgba(255,255,255,0.1)] font-mono text-[12px]">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedMaterial,
                            item.quantity - 1
                          )
                        }
                        className="px-2 py-0.5 hover:text-[#C7A66A]"
                      >
                        -
                      </button>
                      <span className="px-3 py-0.5 text-[#F1EDE5]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedMaterial,
                            item.quantity + 1
                          )
                        }
                        className="px-2 py-0.5 hover:text-[#C7A66A]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-[13px] text-[#C7A66A]">
                      {item.product.currency}
                      {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-6 md:p-8 border-t border-[rgba(199,166,106,0.15)] bg-[#0A0B0D] space-y-4">
            <div className="flex justify-between items-center text-[12px] font-mono uppercase tracking-[0.2em] text-[#9B9A96]">
              <span>INSURED DELIVERY</span>
              <span className="text-[#C7A66A]">COMPLIMENTARY</span>
            </div>

            <div className="flex justify-between items-baseline pt-2">
              <span className="font-['Space_Grotesk'] text-[12px] uppercase tracking-[0.22em] text-[#F1EDE5]">
                SUBTOTAL
              </span>
              <span className="font-mono text-[18px] text-[#C7A66A] font-semibold">
                €{subtotal.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              onMouseEnter={() => setCursor('default', 'BUY')}
              onMouseLeave={resetCursor}
              className="w-full btn-solid-luxury mt-2"
            >
              PROCEED TO SECURE CHECKOUT →
            </button>

            <p className="text-[10px] text-center text-[#777774] font-mono tracking-[0.1em]">
              CERTIFIED ARMORED COURIER • SIGNATURE UPON DELIVERY
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

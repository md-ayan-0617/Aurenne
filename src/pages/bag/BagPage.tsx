import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBagStore } from '../../store/useBagStore';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

export const BagPage: React.FC = () => {
  const { items, updateQuantity, removeFromBag, getSubtotal, clearBag } = useBagStore();
  const { setActiveTheme } = useUiStore();
  const [checkoutStep, setCheckoutStep] = useState(false);

  useEffect(() => {
    setActiveTheme('obsidian');
  }, [setActiveTheme]);

  const subtotal = getSubtotal();

  return (
    <div className="w-full bg-[#08090A] text-[#F1EDE5] pt-32 pb-40 min-h-screen">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="border-b border-[rgba(255,255,255,0.08)] pb-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
              ACQUISITIONS
            </span>
            <h1 className="font-['Bodoni_Moda'] text-[48px] sm:text-[76px] lg:text-[96px] uppercase leading-[0.92]">
              Shopping Bag.
            </h1>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] text-[#777774]">
            <span>[{items.length} DISTINCT OBJECTS]</span>
            {items.length > 0 && (
              <button
                onClick={clearBag}
                className="hover:text-[#C7A66A] transition-colors uppercase tracking-[0.1em]"
              >
                EMPTY BAG ✕
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#777774] block">
              YOUR BAG IS CURRENTLY EMPTY
            </span>
            <p className="font-['Newsreader'] italic text-[22px] text-[#9B9A96]">
              "Each object is forged to outlive occasions. Discover our collections to begin."
            </p>
            <Link to="/collections" className="btn-luxury inline-flex mt-6">
              EXPLORE COLLECTIONS →
            </Link>
          </div>
        ) : !checkoutStep ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Items List (Left 8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="divide-y divide-[rgba(255,255,255,0.06)] border-y border-[rgba(255,255,255,0.06)]">
                {items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedMaterial}-${idx}`}
                    className="py-8 flex flex-col sm:flex-row gap-6 items-start justify-between"
                  >
                    <div className="flex gap-6">
                      <div className="w-28 h-36 bg-[#111214] border border-[rgba(199,166,106,0.15)] overflow-hidden flex-shrink-0">
                        <SafeImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          luxuryLabel={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C7A66A]">
                          {item.product.collection}
                        </span>
                        <h3 className="font-['Bodoni_Moda'] text-[24px] text-[#F1EDE5]">
                          {item.product.name}
                        </h3>
                        <p className="font-mono text-[12px] text-[#9B9A96]">
                          {item.selectedMaterial} // Size: {item.selectedSize}
                        </p>
                        <p className="font-mono text-[14px] text-[#C7A66A] pt-2">
                          {item.product.currency}{item.product.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col justify-between items-end gap-4 w-full sm:w-auto">
                      <div className="flex items-center border border-[rgba(255,255,255,0.15)] font-mono text-[12px]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedMaterial,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-1 hover:text-[#C7A66A]"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-[#F1EDE5] font-bold">
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
                          className="px-3 py-1 hover:text-[#C7A66A]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[16px] text-[#F1EDE5] font-semibold block">
                          €{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() =>
                            removeFromBag(
                              item.product.id,
                              item.selectedSize,
                              item.selectedMaterial
                            )
                          }
                          className="text-[11px] font-mono text-[#777774] hover:text-[#C7A66A] mt-1"
                        >
                          REMOVE ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary & Checkout (Right 4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-[#111214] border border-[rgba(199,166,106,0.15)] p-8 space-y-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] block">
                  ORDER SUMMARY
                </span>

                <div className="space-y-3 font-mono text-[12px]">
                  <div className="flex justify-between text-[#9B9A96]">
                    <span>ESTIMATED SUBTOTAL:</span>
                    <span className="text-[#F1EDE5]">€{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#9B9A96]">
                    <span>INSURED ARMORED COURIER:</span>
                    <span className="text-[#C7A66A]">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between text-[#9B9A96]">
                    <span>AUTHENTICITY ARCHIVE PACKAGING:</span>
                    <span className="text-[#C7A66A]">INCLUDED</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-[rgba(255,255,255,0.08)] text-[16px]">
                    <span className="text-[#F1EDE5] font-['Space_Grotesk']">TOTAL</span>
                    <span className="text-[#C7A66A] font-bold">€{subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep(true)}
                  className="w-full btn-solid-luxury py-4 text-[12px]"
                >
                  PROCEED TO ACQUISITION PROTOCOL →
                </button>

                <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] font-mono text-[10px] text-[#777774] space-y-1">
                  <div>• FRENCH REPUBLIC STATE HALLMARK CERTIFICATE</div>
                  <div>• COMPLIMENTARY 90-DAY BESPOKE RESIZING</div>
                  <div>• ENCRYPTED VAULT ESCROW PROTOCOL</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Acquisition Protocol / Checkout Step */
          <div className="max-w-2xl mx-auto bg-[#111214] border border-[rgba(199,166,106,0.2)] p-8 md:p-14 text-center space-y-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block">
              ACQUISITION ESCROW // PLACE VENDÔME
            </span>
            <h2 className="font-['Bodoni_Moda'] text-[32px] sm:text-[44px] uppercase text-[#F1EDE5]">
              Private Purchase Protocol
            </h2>
            <p className="font-['Space_Grotesk'] text-[14px] text-[#9B9A96] leading-relaxed">
              In accordance with Haute Joaillerie standard practices, all purchases over €4,000 are coordinated through a dedicated Maison liaison to verify delivery insurance and certificate registration.
            </p>
            <div className="p-6 bg-[#08090A] border border-[rgba(199,166,106,0.15)] font-mono text-[12px] text-left space-y-2">
              <div className="flex justify-between text-[#777774]">
                <span>ITEMS RESERVED:</span>
                <span className="text-[#F1EDE5]">{items.length} Objects</span>
              </div>
              <div className="flex justify-between text-[#777774]">
                <span>ORDER VALUE:</span>
                <span className="text-[#C7A66A]">€{subtotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-solid-luxury py-3 px-8 text-[11px]">
                CONNECT WITH CLIENT DIRECTOR →
              </Link>
              <button
                onClick={() => setCheckoutStep(false)}
                className="btn-outline-luxury text-[11px]"
              >
                RETURN TO BAG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

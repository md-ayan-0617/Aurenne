import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { Product3DViewer } from '../../components/three/Product3DViewer';
import { Accordion } from '../../components/product/Accordion';
import { ProductCard } from '../../components/product/ProductCard';
import { SafeImage } from '../../components/common/SafeImage';
import { useBagStore } from '../../store/useBagStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useUiStore } from '../../store/useUiStore';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0] || '18K Yellow Gold');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedStone, setSelectedStone] = useState(product.stones[0] || 'VS Diamond');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const { addToBag } = useBagStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { setActiveTheme, openAppointmentDrawer, setCursor, resetCursor } = useUiStore();

  const isFavorited = isInWishlist(product.id);

  useEffect(() => {
    setActiveTheme('obsidian');
    setSelectedMaterial(product.materials[0] || '18K Yellow Gold');
    setSelectedSize(product.sizes[0] || 'Standard');
    setSelectedStone(product.stones[0] || 'VS Diamond');
  }, [product.id, setActiveTheme]);

  const handleAdd = () => {
    addToBag(product, selectedSize, `${selectedMaterial} • ${selectedStone}`);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const relatedPieces = products
    .filter((p) => p.id !== product.id && (p.collection === product.collection || product.relatedProductSlugs.includes(p.slug)))
    .slice(0, 3);

  const accordionItems = [
    {
      id: 'details',
      title: 'SPECIFICATIONS & CARATS',
      content: (
        <div className="space-y-2 font-mono text-[12px] text-[#9B9A96]">
          <div className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.04)]">
            <span>DIMENSIONS:</span>
            <span className="text-[#F1EDE5]">{product.specs.dimensions}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.04)]">
            <span>SETTING:</span>
            <span className="text-[#F1EDE5]">{product.specs.setting}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.04)]">
            <span>GOLD WEIGHT:</span>
            <span className="text-[#F1EDE5]">{product.goldWeight || 'Solid 18K'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.04)]">
            <span>CERTIFICATION:</span>
            <span className="text-[#F1EDE5]">{product.specs.hallmark}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'delivery',
      title: 'INSURED ARMORED COURIER',
      content:
        'Dispatched via secured armored courier with required biometric signature. Complimentary global delivery in 2–4 business days. Discreet unmarked packaging with wax seal.',
    },
    {
      id: 'craft',
      title: 'PLACE VENDÔME CRAFTSMANSHIP',
      content: `${product.craftHours} hours of uninterrupted benchwork by master goldsmiths in Paris. Every curve is hand-filed and cold-forged from solid drawn wire.`,
    },
    {
      id: 'sizing',
      title: 'BESPOKE SIZING & FIT SERVICE',
      content:
        'Complimentary bespoke sizing adjustments within 90 days. A Maison sizing gauge can be dispatched upon request to your private residence.',
    },
  ];

  return (
    <div className="w-full bg-[#08090A] text-[#F1EDE5] pt-24 sm:pt-28 pb-32 sm:pb-40 overflow-hidden">
      {/* ====================================================
          PDP INITIAL VIEW: Desktop Split (Left 58% 3D, Right 42% Info)
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* LEFT COLUMN: Sticky 3D Stage & Macro Angles (58%) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="lg:sticky lg:top-28">
            <Product3DViewer product={product} />

            {/* Gallery Angle Thumbnails */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
              {product.images.map((imgUrl, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] bg-[#121316] overflow-hidden border border-[rgba(199,166,106,0.1)] group cursor-pointer"
                >
                  <SafeImage
                    src={imgUrl}
                    alt={`${product.name} angle ${i + 1}`}
                    luxuryLabel={`${product.name} angle ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Information & Purchase (42%) */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C7A66A]">
                {product.collection.toUpperCase()} COLLECTION
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#777774]">
                REF: {product.id.toUpperCase()}
              </span>
            </div>

            <h1 className="font-['Bodoni_Moda'] text-[32px] sm:text-[44px] md:text-[54px] text-[#F1EDE5] leading-tight mt-2">
              {product.name}
            </h1>

            <div className="mt-2 sm:mt-3 flex items-baseline justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
              <span className="font-mono text-[20px] sm:text-[24px] text-[#C7A66A]">
                {product.currency}{product.price.toLocaleString()}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#9B9A96] uppercase tracking-[0.15em]">
                {product.availability}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="font-['Space_Grotesk'] text-[14px] sm:text-[15px] text-[#9B9A96] leading-relaxed">
            {product.description}
          </p>

          {/* Material Selector */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em]">
              <span className="text-[#777774]">PRECIOUS METAL:</span>
              <span className="text-[#F1EDE5]">{selectedMaterial}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-3 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] border transition-colors ${
                    selectedMaterial === mat
                      ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-semibold'
                      : 'border-[rgba(255,255,255,0.1)] text-[#DCD8CF] hover:border-[#C7A66A]'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Stone Selector */}
          {product.stones && product.stones.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em]">
                <span className="text-[#777774]">STONE SETTING:</span>
                <span className="text-[#F1EDE5]">{selectedStone}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.stones.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStone(st)}
                    className={`px-3 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] border transition-colors ${
                      selectedStone === st
                        ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-semibold'
                        : 'border-[rgba(255,255,255,0.1)] text-[#DCD8CF] hover:border-[#C7A66A]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em]">
                <span className="text-[#777774]">SELECT SIZE:</span>
                <span className="text-[#C7A66A]">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-mono uppercase border text-center transition-colors ${
                      selectedSize === sz
                        ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-semibold'
                        : 'border-[rgba(255,255,255,0.1)] text-[#DCD8CF] hover:border-[#C7A66A]'
                    }`}
                  >
                    {sz.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-3 pt-2 sm:pt-4">
            <button
              onClick={handleAdd}
              onMouseEnter={() => setCursor('add', 'ADD')}
              onMouseLeave={resetCursor}
              className="w-full btn-solid-luxury text-[11px] sm:text-[12px] py-3.5 sm:py-4"
              aria-label={`Add ${product.name} to bag`}
            >
              {addedAnimation ? 'ADDED TO YOUR BAG ✓' : 'ADD TO BAG →'}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  openAppointmentDrawer({
                    service: 'Private Collection Viewing',
                    productName: product.name,
                  })
                }
                onMouseEnter={() => setCursor('book', 'BOOK')}
                onMouseLeave={resetCursor}
                className="btn-outline-luxury text-[10px] sm:text-[11px] justify-center"
              >
                BOOK A VIEWING ↗
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`btn-outline-luxury text-[10px] sm:text-[11px] justify-center ${
                  isFavorited ? 'border-[#C7A66A] text-[#C7A66A]' : ''
                }`}
              >
                {isFavorited ? 'IN WISHLIST ♥' : 'SAVE TO WISHLIST ♡'}
              </button>
            </div>
          </div>

          {/* Accordions */}
          <div className="pt-4 sm:pt-6">
            <Accordion items={accordionItems} defaultOpenId="details" />
          </div>
        </div>
      </section>

      {/* ====================================================
          PRODUCT CRAFTSMANSHIP EDITORIAL (Macro Detail)
          ==================================================== */}
      <section className="mt-28 sm:mt-40 max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12">
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-[#111214] overflow-hidden border border-[rgba(199,166,106,0.15)] flex items-center justify-center text-center p-6 sm:p-8">
          <SafeImage
            src={product.macroImage || product.images[0]}
            alt={`${product.name} extreme macro setting`}
            luxuryLabel="Extreme Macro Setting"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/40 to-[#08090A]" />

          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block">
              HAUTE JOAILLERIE ARCHIVE
            </span>
            <h2 className="font-['Bodoni_Moda'] text-[32px] sm:text-[48px] md:text-[68px] leading-tight uppercase">
              {product.craftHours} Hours <br />
              <span className="font-['Newsreader'] italic font-normal text-[#C7A66A]">
                For One Curve.
              </span>
            </h2>
            <p className="font-['Space_Grotesk'] text-[13px] sm:text-[15px] text-[#DCD8CF] leading-relaxed">
              Every facet is inspected under forty-power optical magnification. No solder line is visible to the human eye.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          RELATED PIECES (In The Same Language)
          ==================================================== */}
      <section className="mt-24 sm:mt-36 max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12">
        <div className="flex justify-between items-baseline pb-4 sm:pb-6 border-b border-[rgba(255,255,255,0.08)] mb-8 sm:mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] block">
              HARMONIOUS OBJECTS
            </span>
            <h3 className="font-['Bodoni_Moda'] text-[26px] sm:text-[36px] md:text-[44px] uppercase mt-1">
              In The Same Language.
            </h3>
          </div>
          <Link
            to="/collections"
            className="text-[10px] sm:text-[11px] uppercase font-mono tracking-[0.2em] text-[#777774] hover:text-[#C7A66A]"
          >
            DISCOVER ALL →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {relatedPieces.map((p) => (
            <ProductCard key={p.id} product={p} cardTheme="dark" />
          ))}
        </div>
      </section>

      {/* Mobile Sticky Add to Bag Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-[#08090A]/95 backdrop-blur-md border-t border-[rgba(199,166,106,0.2)] p-3 sm:p-4 flex items-center justify-between gap-4">
        <div>
          <span className="font-['Bodoni_Moda'] text-[14px] text-[#F1EDE5] block leading-tight truncate max-w-[150px]">
            {product.name}
          </span>
          <span className="font-mono text-[12px] text-[#C7A66A]">
            {product.currency}{product.price.toLocaleString()}
          </span>
        </div>
        <button
          onClick={handleAdd}
          className="btn-solid-luxury py-2.5 px-6 text-[10px] flex-1 max-w-[180px]"
        >
          {addedAnimation ? 'ADDED ✓' : 'ADD TO BAG →'}
        </button>
      </div>
    </div>
  );
};

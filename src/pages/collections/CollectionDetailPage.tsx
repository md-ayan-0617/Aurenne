import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collections } from '../../data/collections';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

export const CollectionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setActiveTheme, setCursor, resetCursor } = useUiStore();
  const [scrollSharpen, setScrollSharpen] = useState(0);

  const collection = collections.find((c) => c.slug === slug) || collections[0];
  const collectionProducts = products.filter(
    (p) => p.collection.toLowerCase() === collection.name.toLowerCase()
  );
  const displayProducts = collectionProducts.length > 0 ? collectionProducts : products.slice(0, 4);

  useEffect(() => {
    if (collection.themeClass) {
      setActiveTheme(collection.themeClass.replace('theme-', ''));
    }

    const handleScroll = () => {
      const p = Math.min(window.scrollY / 400, 1);
      setScrollSharpen(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [collection, setActiveTheme]);

  return (
    <div className={`w-full min-h-screen ${collection.themeClass} overflow-hidden`}>
      {/* ====================================================
          COLLECTION HERO (100svh Blur-to-Sharp Scroll Progression)
          ==================================================== */}
      <section className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between p-6 md:p-12 overflow-hidden">
        {/* Hero Background Image with Blur -> Sharp transition */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={collection.editorialImage}
            alt={collection.name}
            luxuryLabel={collection.name}
            style={{
              filter: `blur(${(1 - scrollSharpen) * 8}px) contrast(${1 + scrollSharpen * 0.25})`,
              transform: `scale(${1.08 - scrollSharpen * 0.08})`,
            }}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-[var(--bg-primary)]/40" />
        </div>

        {/* Top Spacer */}
        <div className="w-full h-12" />

        {/* Hero Title & Subtitle */}
        <div className="relative z-10 max-w-[1720px] mx-auto w-full">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)] block mb-4">
              COLLECTION // {collection.year}
            </span>
            <h1 className="font-['Italiana'] text-[62px] sm:text-[96px] md:text-[130px] leading-[0.9] uppercase text-[var(--text-primary)]">
              {collection.name}
            </h1>
            <p className="font-['Newsreader'] italic text-[22px] md:text-[28px] text-[var(--text-secondary)] mt-4">
              "{collection.tagline}"
            </p>
          </div>
        </div>

        {/* Bottom Bar Indicator */}
        <div className="relative z-10 max-w-[1720px] mx-auto w-full flex justify-between items-end font-mono text-[11px] text-[var(--text-secondary)] tracking-[0.2em]">
          <span>{collectionProducts.length} CATALOGUED OBJECTS</span>
          <span className="text-[var(--accent)]">SCROLL FOR MANIFESTO ↓</span>
        </div>
      </section>

      {/* ====================================================
          COLLECTION MANIFESTO (3-Line Poetic Statement)
          ==================================================== */}
      <section className="py-32 md:py-48 max-w-[1280px] mx-auto px-6 md:px-12 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] block mb-6">
          THE MANIFESTO
        </span>

        <div className="space-y-6">
          {collection.manifesto.map((line, idx) => (
            <p
              key={idx}
              className="font-['Italiana'] text-[32px] sm:text-[48px] md:text-[62px] leading-[1.1] text-[var(--text-primary)]"
            >
              {line}
            </p>
          ))}
        </div>

        <p className="mt-12 font-['Space_Grotesk'] text-[15px] text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          {collection.description}
        </p>
      </section>

      {/* ====================================================
          PRODUCT GRID WITH ALTERNATING EDITORIAL INTERLUDES
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 pb-40">
        <div className="flex justify-between items-baseline pb-6 border-b border-[var(--border-subtle)] mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
            THE WORKS ({displayProducts.length})
          </span>
          <Link
            to="/collections"
            className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--accent)] font-mono"
          >
            ← ALL COLLECTIONS
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {displayProducts.map((p) => (
            <ProductCard key={p.id} product={p} cardTheme="dark" />
          ))}

          {/* Editorial Insert Card */}
          <div className="relative aspect-[4/5] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-8 flex flex-col justify-between overflow-hidden">
            <SafeImage
              src={collection.heroImage}
              alt={collection.name}
              luxuryLabel="Atelier Note"
              className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale"
            />
            <div className="relative z-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
                ATELIER LOG // {collection.name.toUpperCase()}
              </span>
            </div>
            <div className="relative z-10">
              <blockquote className="font-['Newsreader'] italic text-[24px] text-[var(--text-primary)] leading-snug">
                "We hold the diamond without clasping it; we give the stone freedom to breathe."
              </blockquote>
              <span className="block font-mono text-[11px] text-[var(--text-secondary)] mt-4">
                — Master Goldsmith, 2026
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../../data/collections';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { FilterDrawer, FilterState } from '../../components/product/FilterDrawer';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

export const CollectionsPage: React.FC = () => {
  const { setActiveTheme, setCursor, resetCursor, setActiveSectionNumber } = useUiStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    category: '',
    material: '',
    stone: '',
    collection: '',
    availability: '',
  });

  useEffect(() => {
    setActiveTheme('warm-white');
    setActiveSectionNumber('02');
  }, [setActiveTheme, setActiveSectionNumber]);

  // Filtering products
  const filteredProducts = products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.collection && p.collection !== filters.collection) return false;
    if (filters.material && !p.materials.some((m) => m.includes(filters.material))) return false;
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    return 0;
  });

  const categoryRows = [
    { num: '01', name: 'RINGS', count: '12 PIECES', cat: 'Rings', img: '/images/hero-ring.jpg' },
    { num: '02', name: 'EARRINGS', count: '8 PIECES', cat: 'Earrings', img: '/images/gold-earrings.jpg' },
    { num: '03', name: 'NECKLACES', count: '14 PIECES', cat: 'Necklaces', img: '/images/emerald-necklace.jpg' },
    { num: '04', name: 'BRACELETS', count: '6 PIECES', cat: 'Bracelets', img: '/images/gold-cuff.jpg' },
    { num: '05', name: 'HIGH JEWELLERY', count: '8 PIECES', cat: 'High Jewellery', img: '/images/sapphire-ring.jpg' },
  ];

  return (
    <div className="w-full bg-[#F8F5EF] text-[#111214] pt-28 sm:pt-36 pb-28 sm:pb-36">
      {/* ====================================================
          COLLECTIONS HERO
          ==================================================== */}
      <section className="container-luxury mb-16 sm:mb-24 lg:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-4">
              THE COLLECTIONS // 2026
            </span>
            <h1 className="text-collection-hero leading-[0.92]">
              Forms Worth <br />
              Keeping.
            </h1>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="relative w-48 sm:w-60 aspect-[3/4] overflow-hidden bg-[#EAE5DA] shadow-xl">
              <SafeImage
                src="/images/editorial-model.jpg"
                alt="Model wearing sculptural gold jewellery"
                luxuryLabel="Collections Editorial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          COLLECTION CATEGORY INDEX (Interactive Full-Width Rows)
          ==================================================== */}
      <section className="container-luxury mb-20 sm:mb-28 lg:mb-32">
        <div className="border-t border-[#111214]/15">
          {categoryRows.map((cat, idx) => (
            <div
              key={cat.num}
              onMouseEnter={() => {
                setHoveredCategoryIndex(idx);
                setCursor('default', 'FILTER');
              }}
              onMouseLeave={() => {
                setHoveredCategoryIndex(null);
                resetCursor();
              }}
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: cat.cat }));
                const gridEl = document.getElementById('discovery-grid');
                gridEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group cursor-pointer py-6 sm:py-8 md:py-10 border-b border-[#111214]/10 flex flex-col md:flex-row md:items-baseline justify-between transition-colors hover:bg-[#EFEBE1] px-2 sm:px-4 relative overflow-hidden"
            >
              <div className="flex items-baseline gap-4 sm:gap-8 md:gap-12">
                <span className="font-mono text-[12px] md:text-[14px] text-[#777774] group-hover:text-[#98743F]">
                  {cat.num}
                </span>
                <span className="font-['Italiana'] text-[32px] sm:text-[46px] md:text-[60px] text-[#111214] group-hover:text-[#98743F] transition-colors">
                  {cat.name}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 mt-2 md:mt-0">
                <span className="font-mono text-[11px] md:text-[13px] text-[#777774] tracking-[0.15em]">
                  {cat.count}
                </span>
                <span className="text-[#98743F] transform transition-transform group-hover:translate-x-2">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          FEATURED COLLECTION UNIVERSES
          ==================================================== */}
      <section className="container-luxury mb-20 sm:mb-28 lg:mb-32">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-2">
              CURATED CHAPTERS
            </span>
            <h2 className="font-['Italiana'] text-[34px] sm:text-[44px] md:text-[54px]">
              Collection Stories
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              onMouseEnter={() => setCursor('enter', 'VIEW')}
              onMouseLeave={resetCursor}
              className="group block bg-[#EFEBE1] border border-[rgba(17,18,20,0.08)] overflow-hidden transition-all duration-500 hover:shadow-xl"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <SafeImage
                  src={col.heroImage}
                  alt={col.name}
                  luxuryLabel={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#98743F] block">
                  CHAPTER {col.year}
                </span>
                <h3 className="font-['Italiana'] text-[28px] text-[#111214] group-hover:text-[#98743F] transition-colors mt-1">
                  {col.name}
                </h3>
                <p className="font-['Newsreader'] italic text-[14px] text-[#656668] mt-2 line-clamp-2">
                  "{col.tagline}"
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====================================================
          PRODUCT DISCOVERY GRID WITH ASYMMETRIC SCALE
          ==================================================== */}
      <section id="discovery-grid" className="container-luxury">
        {/* Filter and Sort Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 sm:mb-14 border-b border-[#111214]/15">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="btn-outline-luxury text-[#111214] border-[#111214]/20 hover:border-[#98743F]"
            >
              FILTER ARCHIVE {filters.category ? `(${filters.category})` : ''} ⚙
            </button>

            {filters.category && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: '' }))}
                className="text-[11px] font-mono text-[#777774] hover:text-[#111214] uppercase tracking-[0.1em]"
              >
                CLEAR FILTER ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 font-mono text-[12px]">
            <span className="text-[#777774]">SORT:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-transparent border-b border-[#111214]/20 pb-0.5 outline-none font-mono text-[12px] uppercase text-[#111214]"
            >
              <option value="featured">Featured Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 4-Column Responsive Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {sortedProducts.map((product, idx) => {
            // Asymmetric scale: every 5th product spans 2 columns on large screens
            const isSpan2 = idx % 5 === 0;
            return (
              <ProductCard
                key={product.id}
                product={product}
                cardTheme="light"
                className={isSpan2 ? 'lg:col-span-2' : ''}
              />
            );
          })}
        </div>
      </section>

      {/* Filter Side Panel Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={(key, val) => setFilters((prev) => ({ ...prev, [key]: val }))}
        onReset={() =>
          setFilters({
            category: '',
            material: '',
            stone: '',
            collection: '',
            availability: '',
          })
        }
        totalResults={filteredProducts.length}
      />
    </div>
  );
};

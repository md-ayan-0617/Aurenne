import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { journalArticles } from '../../data/journal';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

export const JournalPage: React.FC = () => {
  const { setActiveTheme, setCursor, resetCursor, setActiveSectionNumber } = useUiStore();

  useEffect(() => {
    setActiveTheme('warm-white');
    setActiveSectionNumber('06');
  }, [setActiveTheme, setActiveSectionNumber]);

  const featured = journalArticles[0];
  const remaining = journalArticles.slice(1);

  return (
    <div className="w-full bg-[#F8F5EF] text-[#111214] pt-32 pb-40 overflow-hidden">
      {/* ====================================================
          JOURNAL HERO
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 mb-24">
        <div className="border-b border-[#111214]/15 pb-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-2">
              PERIODICAL // AUTUMN 2026
            </span>
            <h1 className="font-['Newsreader'] text-[60px] sm:text-[92px] md:text-[124px] leading-[0.92] tracking-[-0.02em]">
              Aurenne Review.
            </h1>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#656668] text-left md:text-right">
            <span>VOL. VI // ESSAYS IN GOLD & LIGHT</span>
          </div>
        </div>

        {/* Feature Article Hero Layout */}
        <Link
          to={`/journal/${featured.slug}`}
          onMouseEnter={() => setCursor('default', 'READ')}
          onMouseLeave={resetCursor}
          className="group block grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#EFEBE1] border border-[#111214]/10 p-6 md:p-12 hover:shadow-2xl transition-all duration-500"
        >
          <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#E5DFD4]">
            <SafeImage
              src={featured.heroImage}
              alt={featured.title}
              luxuryLabel={featured.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#98743F]">
              {featured.issueNumber} // {featured.category.toUpperCase()}
            </span>

            <h2 className="font-['Newsreader'] text-[36px] sm:text-[48px] text-[#111214] group-hover:text-[#98743F] transition-colors leading-[1.05]">
              {featured.title}
            </h2>

            <p className="font-['Newsreader'] italic text-[18px] text-[#58595C]">
              "{featured.subtitle}"
            </p>

            <div className="pt-4 flex items-center justify-between font-mono text-[11px] text-[#777774] border-t border-[#111214]/10">
              <span>{featured.author}</span>
              <span className="text-[#98743F]">{featured.readTime} →</span>
            </div>
          </div>
        </Link>
      </section>

      {/* ====================================================
          MIXED EDITORIAL GRID
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="border-b border-[#111214]/15 pb-4 mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#98743F]">
            CRITICAL DISPATCHES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {remaining.map((art) => (
            <Link
              key={art.slug}
              to={`/journal/${art.slug}`}
              onMouseEnter={() => setCursor('default', 'READ')}
              onMouseLeave={resetCursor}
              className="group block space-y-4 bg-[#EFEBE1] p-6 border border-[#111214]/10 hover:shadow-xl transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#E5DFD4]">
                <SafeImage
                  src={art.heroImage}
                  alt={art.title}
                  luxuryLabel={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#98743F]">
                  {art.issueNumber} // {art.category.toUpperCase()}
                </span>
                <h3 className="font-['Newsreader'] text-[30px] sm:text-[36px] text-[#111214] group-hover:text-[#98743F] transition-colors leading-tight">
                  {art.title}
                </h3>
                <p className="font-['Space_Grotesk'] text-[14px] text-[#58595C] line-clamp-2">
                  {art.paragraphs[0]}
                </p>
                <div className="pt-4 flex justify-between font-mono text-[11px] text-[#777774] border-t border-[#111214]/10">
                  <span>{art.date}</span>
                  <span className="text-[#98743F]">{art.readTime} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Studio Quote Block */}
        <div className="mt-20 p-12 md:p-20 bg-[#111214] text-[#F1EDE5] text-center border border-[rgba(199,166,106,0.2)]">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-4">
            MAISON ARCHIVE NOTE
          </span>
          <blockquote className="font-['Newsreader'] italic text-[28px] sm:text-[40px] max-w-3xl mx-auto leading-snug">
            "A ring should behave like a modernist pavilion: balancing weight, tension, and light without begging for attention."
          </blockquote>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9B9A96] block mt-6">
            — Hélène Vaneau, Architecture & Fine Art Critic
          </span>
        </div>
      </section>
    </div>
  );
};

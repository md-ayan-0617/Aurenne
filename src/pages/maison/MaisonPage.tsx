import React, { useEffect, useState } from 'react';
import { timelineMilestones } from '../../data/timeline';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

export const MaisonPage: React.FC = () => {
  const { setActiveTheme, setCursor, resetCursor, setActiveSectionNumber } = useUiStore();
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  useEffect(() => {
    setActiveTheme('ivory-archive');
    setActiveSectionNumber('03');
  }, [setActiveTheme, setActiveSectionNumber]);

  return (
    <div className="w-full bg-[#F1EDE5] text-[#111214] pt-28 pb-40 overflow-hidden">
      {/* ====================================================
          MAISON HERO (Archival Film Aesthetic)
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 mb-28">
        <div className="border-b border-[#111214]/15 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-2">
              HERITAGE // ARCHIVE
            </span>
            <h1 className="text-editorial-h1">
              The Maison.
            </h1>
          </div>
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#58595C]">
            PARIS / SINCE 1964
          </span>
        </div>

        {/* Full-Width Archival Photograph */}
        <div className="relative w-full h-[540px] md:h-[720px] bg-[#E5DFD4] overflow-hidden border border-[#111214]/10 shadow-2xl">
          <SafeImage
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1800&auto=format&fit=crop"
            alt="Maison Aurenne 1964 workshop"
            luxuryLabel="Paris Archive"
            className="w-full h-full object-cover grayscale contrast-110"
          />
          <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#F1EDE5] bg-[#111214]/85 px-4 py-2">
            ATELIER ORIGINAL // RUE DE LA PAIX, PARIS 1964
          </div>
        </div>
      </section>

      {/* ====================================================
          OPENING EDITORIAL STORY (Narrow Column)
          ==================================================== */}
      <section className="max-w-[840px] mx-auto px-6 md:px-12 py-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#98743F] block mb-6 text-center">
          ORIGINS OF THE LINE
        </span>

        <div className="space-y-8 font-['Newsreader'] text-[20px] md:text-[23px] text-[#111214] leading-[1.7]">
          <p className="first-letter:font-['Bodoni_Moda'] first-letter:text-[72px] first-letter:float-left first-letter:mr-4 first-letter:leading-[0.8] first-letter:text-[#98743F]">
            In the winter of 1964, master artisan Henri d’Aurenne opened a second-floor workshop overlooking Place Vendôme. Where surrounding houses pursued baroque ornamentation, he was consumed by a different question: How much metal can be removed before a diamond falls?
          </p>
          <p>
            He forged his rings from heavy drawn wire, cold-hammered until the gold developed the structural resilience of spring steel. This tension cradle meant gemstones could hover between opposing gold crests without visible claws—allowing museum light to flood the pavilion from all angles.
          </p>
          <p>
            Today, six decades later, our bench goldsmiths still work beneath the same northern Paris daylight, utilizing hand files, beeswax, and optical loupes to preserve the human breath in every piece.
          </p>
        </div>
      </section>

      {/* ====================================================
          HERITAGE TIMELINE (1964 – 2026 Archive)
          ==================================================== */}
      <section className="py-28 bg-[#E5DFD4] border-y border-[#111214]/15 overflow-hidden">
        <div className="max-w-[1720px] mx-auto px-6 md:px-12 mb-16 flex justify-between items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-2">
              CHRONOLOGY
            </span>
            <h2 className="font-['Newsreader'] text-[42px] md:text-[60px]">
              Six Decades of Hand Forging.
            </h2>
          </div>

          <div className="flex gap-2">
            {timelineMilestones.map((m, idx) => (
              <button
                key={m.year}
                onClick={() => setActiveTimelineIndex(idx)}
                className={`px-3 py-1 text-[11px] font-mono tracking-[0.1em] transition-colors ${
                  activeTimelineIndex === idx
                    ? 'bg-[#111214] text-[#F1EDE5]'
                    : 'text-[#58595C] hover:text-[#111214]'
                }`}
              >
                {m.year}
              </button>
            ))}
          </div>
        </div>

        {/* Milestone Detail Card */}
        <div className="max-w-[1720px] mx-auto px-6 md:px-12">
          {(() => {
            const m = timelineMilestones[activeTimelineIndex];
            return (
              <div className="bg-[#F1EDE5] border border-[#111214]/10 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl animate-fade-in">
                <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-between space-y-8">
                  <div>
                    <span className="font-['Bodoni_Moda'] text-[72px] sm:text-[110px] leading-none text-[#98743F]/30 block -mb-6">
                      {m.year}
                    </span>
                    <h3 className="font-['Newsreader'] text-[32px] sm:text-[44px] text-[#111214] leading-tight">
                      {m.title}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#98743F] block mt-2">
                      {m.location}
                    </span>
                  </div>

                  <p className="font-['Newsreader'] text-[18px] md:text-[20px] text-[#58595C] leading-relaxed">
                    {m.description}
                  </p>

                  <div className="p-4 bg-[#E5DFD4] border-l-2 border-[#98743F] font-mono text-[11px] text-[#111214]">
                    <span className="text-[#98743F] font-semibold block mb-0.5">MUSEUM ARTEFACT:</span>
                    {m.artefact}
                  </div>
                </div>

                <div className="lg:col-span-5 aspect-[4/5] bg-[#DFD9CE] overflow-hidden">
                  <SafeImage
                    src={m.image}
                    alt={m.title}
                    luxuryLabel={m.year}
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ====================================================
          FOUNDING PHILOSOPHY
          ==================================================== */}
      <section className="py-36 max-w-[1280px] mx-auto px-6 md:px-12 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-6">
          FOUNDING PHILOSOPHY
        </span>

        <h2 className="font-['Bodoni_Moda'] text-[46px] sm:text-[72px] md:text-[96px] leading-[0.98] uppercase">
          Make Fewer Things. <br />
          <span className="font-['Newsreader'] italic font-normal text-[#98743F]">
            Make Them Worth Keeping.
          </span>
        </h2>
      </section>

      {/* ====================================================
          MAISON PORTRAITS (Contact Sheet Aesthetic)
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 pb-24">
        <div className="border-t border-[#111214]/15 pt-12 mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-2">
            CONTACT SHEET // THE HANDS BEHIND AURENNE
          </span>
          <h3 className="font-['Newsreader'] text-[36px]">
            Master Goldsmiths & Curators
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Laurent Vaneau',
              role: 'Master of the Bench (34 Years)',
              note: 'Specialist in tension cradles & high-carat forging',
              img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop',
            },
            {
              name: 'Dr. Céleste Morel',
              role: 'Chief Gemmological Scholar',
              note: 'Curator of Colombian emeralds & unheated sapphires',
              img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
            },
            {
              name: 'Arthur Saint-Germain',
              role: 'Master Lapidary & Setter',
              note: 'Microscope claw placement under 40x magnification',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
            },
            {
              name: 'Élise d’Aurenne',
              role: 'Creative Director & Sculptor',
              note: 'Third generation guardian of the architectural line',
              img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
            },
          ].map((person) => (
            <div
              key={person.name}
              className="bg-[#E5DFD4] p-4 border border-[#111214]/10 space-y-3"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#DFD9CE]">
                <SafeImage
                  src={person.img}
                  alt={person.name}
                  luxuryLabel={person.name}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
              <div>
                <h4 className="font-['Bodoni_Moda'] text-[18px] text-[#111214]">
                  {person.name}
                </h4>
                <span className="font-mono text-[10px] uppercase text-[#98743F] block">
                  {person.role}
                </span>
                <p className="font-['Newsreader'] italic text-[13px] text-[#58595C] mt-2">
                  "{person.note}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

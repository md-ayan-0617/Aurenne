import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroRingViewer } from '../../components/three/HeroRingViewer';
import { TypingEffect } from '../../components/motion/TypingEffect';
import { MaskReveal } from '../../components/motion/MaskReveal';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';
import { products } from '../../data/products';

export const HomePage: React.FC = () => {
  const { setCursor, resetCursor, setActiveTheme, openAppointmentDrawer, setActiveSectionNumber } = useUiStore();
  const [activeFilmModal, setActiveFilmModal] = useState(false);

  useEffect(() => {
    setActiveTheme('obsidian');
    setActiveSectionNumber('01');
  }, [setActiveTheme, setActiveSectionNumber]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeFilmModal) {
        setActiveFilmModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFilmModal]);

  const verdePieces = products.filter((p) => p.collection === 'Verde Notte' || p.id === 'p-01').slice(0, 3);

  return (
    <div className="w-full bg-[#08090A] text-[#F1EDE5] selection:bg-[#C7A66A] selection:text-[#08090A] overflow-hidden">
      {/* ====================================================
          HOME 01 — HERO (100svh, 3D Hero Ring, Architectural Darkness)
          ==================================================== */}
      <section className="relative w-full h-[100svh] min-h-[640px] sm:min-h-[680px] bg-[#08090A] overflow-hidden flex flex-col justify-between p-4 sm:p-8 md:p-12">
        {/* 3D WebGL Hero Canvas */}
        <HeroRingViewer />

        {/* Top Spacer for Header */}
        <div className="w-full h-12" />

        {/* Hero Typography: Overlapping & Depth Layering */}
        <div className="relative z-20 max-w-[1720px] w-full mx-auto pointer-events-none">
          <div className="max-w-3xl">
            <MaskReveal delay={0.2}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 sm:w-8 h-[1px] bg-[#C7A66A]" />
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C7A66A]">
                  MAISON DE JOAILLERIE
                </span>
              </div>
            </MaskReveal>

            <MaskReveal delay={0.4}>
              <h1 className="text-hero text-[#F1EDE5] pointer-events-auto">
                OBJECTS <br />
                OF <span className="font-['Newsreader'] italic font-normal text-[#C7A66A]">LIGHT.</span>
              </h1>
            </MaskReveal>

            <MaskReveal delay={0.6}>
              <p className="mt-4 sm:mt-6 text-[13px] sm:text-[16px] text-[#9B9A96] font-['Space_Grotesk'] max-w-md leading-relaxed pointer-events-auto">
                Sculptural 18k gold jewellery and rare Colombian emeralds emerging from architectural darkness.
              </p>
            </MaskReveal>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 pointer-events-auto">
              <Link
                to="/collections"
                onMouseEnter={() => setCursor('default', 'ENTER')}
                onMouseLeave={resetCursor}
                className="btn-luxury text-[11px]"
              >
                ENTER THE EXHIBITION <span className="arrow-icon">→</span>
              </Link>

              <button
                onClick={() => openAppointmentDrawer()}
                onMouseEnter={() => setCursor('default', 'BOOK')}
                onMouseLeave={resetCursor}
                className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-[#777774] hover:text-[#C7A66A] transition-colors py-2"
              >
                PRIVATE SALON VIEWING
              </button>
            </div>
          </div>
        </div>

        {/* Hero Microcopy Grid */}
        <div className="relative z-20 container-luxury flex items-end justify-between font-mono text-[9px] sm:text-[11px] tracking-[0.22em] text-[#777774] pt-6">
          <div>
            <span>PARIS // MMXXVI</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 animate-bounce">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]" />
            <span>SCROLL TO ENTER</span>
          </div>

          <div>
            <span className="text-[#C7A66A]">01 / 10</span>
          </div>
        </div>
      </section>

      {/* ====================================================
          HOME 02 — THE STATEMENT (Ivory Editorial Section)
          ==================================================== */}
      <section className="section-luxury bg-[#F1EDE5] text-[#111214] overflow-hidden">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Statement Typography */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-4 sm:mb-6">
              MANIFESTO // 02
            </span>

            <h2 className="font-['Bodoni_Moda'] text-[40px] sm:text-[68px] lg:text-[92px] leading-[0.98] tracking-[-0.02em] uppercase">
              Jewellery <br />
              Should Not <br />
              Decorate You.
            </h2>

            <h2 className="font-['Newsreader'] italic font-normal text-[44px] sm:text-[74px] lg:text-[104px] text-[#98743F] leading-[0.96]">
              It Should Reveal You.
            </h2>

            <p className="font-['Space_Grotesk'] text-[15px] sm:text-[16px] text-[#58595C] max-w-lg pt-4 sm:pt-6 leading-relaxed">
              We sculpt not for superficial ornament, but for the intimate silhouette created when metal meets skin under evening light.
            </p>
          </div>

          {/* Right Column: Editorial Neck Crop Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              onMouseEnter={() => setCursor('view', 'VIEW')}
              onMouseLeave={resetCursor}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] overflow-hidden bg-[#E5DFD4] shadow-2xl"
            >
              <SafeImage
                src="/images/editorial-model.jpg"
                alt="Model neck wearing minimal architectural gold piece"
                luxuryLabel="Aurenne Editorial"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[#F1EDE5] bg-[#111214]/80 px-2.5 py-1">
                CAMPAIGN // PLACE VENDÔME
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          HOME 03 — FEATURED COLLECTION: VERDE NOTTE (Deep Emerald)
          ==================================================== */}
      <section className="section-luxury bg-[#0D2620] text-[#F1EDE5] border-y border-[rgba(199,166,106,0.2)] overflow-hidden">
        <div className="container-luxury mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
              COLLECTION 01
            </span>
            <h2 className="font-['Italiana'] text-[44px] sm:text-[68px] md:text-[84px] uppercase leading-none tracking-[-0.01em]">
              Verde Notte
            </h2>
            <p className="font-['Newsreader'] italic text-[18px] sm:text-[20px] text-[#C4D6D1] mt-2">
              Emeralds after midnight.
            </p>
          </div>

          <Link
            to="/collections/verde-notte"
            onMouseEnter={() => setCursor('default', 'EXPLORE')}
            onMouseLeave={resetCursor}
            className="btn-luxury self-start md:self-auto"
          >
            VIEW COLLECTION STUDY →
          </Link>
        </div>

        {/* Horizontal Visual Showcase */}
        <div className="container-luxury grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {verdePieces.map((item) => (
            <Link
              key={item.slug}
              to={`/piece/${item.slug}`}
              onMouseEnter={() => setCursor('view', 'VIEW')}
              onMouseLeave={resetCursor}
              className="group block relative bg-[#081B16] border border-[rgba(199,166,106,0.15)] overflow-hidden transition-all duration-500 hover:border-[#C7A66A]"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <SafeImage
                  src={item.images[0]}
                  alt={item.name}
                  luxuryLabel={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B16] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-5 sm:p-6 relative z-10 flex justify-between items-end">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C7A66A] block">
                    {item.caratWeight || item.goldWeight}
                  </span>
                  <h3 className="font-['Bodoni_Moda'] text-[18px] sm:text-[20px] text-[#F1EDE5] group-hover:text-[#C7A66A] transition-colors mt-1">
                    {item.name}
                  </h3>
                </div>
                <span className="font-mono text-[12px] sm:text-[13px] text-[#C7A66A]">
                  €{item.price.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====================================================
          HOME 04 — OBJECT / DETAIL (Architectural Blueprint Macro)
          ==================================================== */}
      <section className="section-luxury bg-[#F8F5EF] text-[#111214] overflow-hidden">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-2">
                STUDY IN PROPORTION // 04
              </span>
              <h2 className="font-['Bodoni_Moda'] text-[36px] sm:text-[52px] md:text-[64px] uppercase tracking-[-0.01em]">
                Millimeter By Millimeter.
              </h2>
            </div>
            <p className="font-['Space_Grotesk'] text-[13px] sm:text-[14px] text-[#656668] max-w-sm mt-3 md:mt-0">
              Examining the cold-forged crest of the Solis Cuff under 20x magnification.
            </p>
          </div>

          {/* Macro Image Stage with SVG Leader Lines */}
          <div className="relative w-full h-[360px] sm:h-[480px] md:h-[620px] bg-[#EAE5DA] overflow-hidden border border-[rgba(17,18,20,0.1)]">
            <SafeImage
              src="/images/gold-cuff.jpg"
              alt="Macro gold bracelet architectural detail"
              luxuryLabel="18K Brushed Gold Macro"
              className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
            />

            {/* Architectural Annotations Overlay on Desktop */}
            <div className="hidden md:block absolute top-12 left-12 bg-[#F8F5EF]/90 backdrop-blur-sm p-4 border-l-2 border-[#98743F] font-mono text-[11px] space-y-1 shadow-lg">
              <span className="text-[#98743F] font-bold block">18K SOLID GOLD</span>
              <span className="text-[#58595C] block">ALLOY RATIO: 750/1000 Au</span>
              <span className="text-[#58595C] block">DENSITY: 15.5 g/cm³</span>
            </div>

            <div className="hidden md:block absolute bottom-12 left-12 bg-[#F8F5EF]/90 backdrop-blur-sm p-4 border-l-2 border-[#98743F] font-mono text-[11px] space-y-1 shadow-lg">
              <span className="text-[#98743F] font-bold block">TOLERANCE ±0.01 MM</span>
              <span className="text-[#58595C] block">SWISS VALLORBE NEEDLE FILE</span>
              <span className="text-[#58595C] block">MIRROR BEVEL ANGLE: 45°</span>
            </div>

            <div className="hidden md:block absolute top-12 right-12 bg-[#F8F5EF]/90 backdrop-blur-sm p-4 border-r-2 border-[#98743F] font-mono text-[11px] text-right space-y-1 shadow-lg">
              <span className="text-[#98743F] font-bold block">68 BENCH HOURS</span>
              <span className="text-[#58595C] block">HAND-PLANED COLD FORGE</span>
              <span className="text-[#58595C] block">EAGLE HEAD HALLMARK PUNCH</span>
            </div>
          </div>

          {/* Mobile Annotations Drawer/Grid */}
          <div className="md:hidden grid grid-cols-2 gap-3 mt-4 font-mono text-[10px]">
            <div className="p-3 bg-[#EAE5DA] border-l-2 border-[#98743F]">
              <span className="text-[#98743F] font-bold block">18K SOLID GOLD</span>
              <span className="text-[#58595C] block">750/1000 Au Alloy</span>
            </div>
            <div className="p-3 bg-[#EAE5DA] border-l-2 border-[#98743F]">
              <span className="text-[#98743F] font-bold block">TOLERANCE ±0.01MM</span>
              <span className="text-[#58595C] block">Swiss Hand File</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          HOME 05 — TYPING INSTALLATION (Crafted in Time)
          ==================================================== */}
      <TypingEffect />

      {/* ====================================================
          HOME 06 — COLLECTION PORTALS (3 Enormous Gateways)
          ==================================================== */}
      <section className="section-luxury bg-[#08090A] text-[#F1EDE5]">
        <div className="container-luxury mb-12 sm:mb-16 text-center">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2 sm:mb-3">
            CURATED UNIVERSES
          </span>
          <h2 className="font-['Italiana'] text-[40px] sm:text-[58px] md:text-[76px] uppercase">
            Collection Gateways
          </h2>
        </div>

        <div className="container-luxury space-y-6 sm:space-y-8">
          {/* Portal 01: SOLAR */}
          <Link
            to="/collections/solar"
            onMouseEnter={() => setCursor('enter', 'SOLAR')}
            onMouseLeave={resetCursor}
            className="group relative h-[50vh] sm:h-[65vh] min-h-[380px] w-full block overflow-hidden border border-[rgba(199,166,106,0.15)]"
          >
            <SafeImage
              src="/images/gold-cuff.jpg"
              alt="Solar Collection Gold Necklace"
              luxuryLabel="Solar Gateway"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090A]/90 via-[#08090A]/40 to-transparent flex items-center p-6 sm:p-12 md:p-16">
              <div className="max-w-xl">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
                  GATEWAY 01 // YELLOW GOLD
                </span>
                <h3 className="font-['Italiana'] text-[44px] sm:text-[72px] md:text-[92px] leading-none text-[#F1EDE5] group-hover:text-[#C7A66A] transition-colors">
                  SOLAR
                </h3>
                <p className="font-['Newsreader'] italic text-[16px] sm:text-[20px] text-[#DCD8CF] mt-3 sm:mt-4">
                  Brushed yellow gold forged under Mediterranean heat.
                </p>
                <span className="inline-block mt-6 sm:mt-8 font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C7A66A] border-b border-[#C7A66A] pb-1">
                  ENTER SOLAR →
                </span>
              </div>
            </div>
          </Link>

          {/* Portal 02: NOCTURNE */}
          <Link
            to="/collections/nocturne"
            onMouseEnter={() => setCursor('enter', 'NOCTURNE')}
            onMouseLeave={resetCursor}
            className="group relative h-[50vh] sm:h-[65vh] min-h-[380px] w-full block overflow-hidden border border-[rgba(199,166,106,0.15)]"
          >
            <SafeImage
              src="/images/diamond-ring.jpg"
              alt="Nocturne Collection Blackened Gold"
              luxuryLabel="Nocturne Gateway"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090A]/90 via-[#08090A]/40 to-transparent flex items-center p-6 sm:p-12 md:p-16">
              <div className="max-w-xl">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
                  GATEWAY 02 // DIAMONDS & RUTHENIUM
                </span>
                <h3 className="font-['Italiana'] text-[44px] sm:text-[72px] md:text-[92px] leading-none text-[#F1EDE5] group-hover:text-[#C7A66A] transition-colors">
                  NOCTURNE
                </h3>
                <p className="font-['Newsreader'] italic text-[16px] sm:text-[20px] text-[#DCD8CF] mt-3 sm:mt-4">
                  Jewellery for the hours after light disappears.
                </p>
                <span className="inline-block mt-6 sm:mt-8 font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C7A66A] border-b border-[#C7A66A] pb-1">
                  ENTER NOCTURNE →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ====================================================
          HOME 07 — MAISON STORY (Archival Aesthetics 1964)
          ==================================================== */}
      <section className="section-luxury bg-[#ECE6DB] text-[#111214] overflow-hidden">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#98743F] block">
              HERITAGE // PARIS 1964
            </span>

            <h2 className="font-['Newsreader'] text-[40px] sm:text-[58px] md:text-[68px] leading-[1.02]">
              A House Built <br />
              By <span className="italic text-[#98743F]">Hand.</span>
            </h2>

            <p className="font-['Newsreader'] text-[16px] sm:text-[18px] text-[#58595C] leading-relaxed max-w-lg">
              Founded on Rue de la Paix by master goldsmith Henri d’Aurenne, the Maison has rejected commercial mass-production for six decades. Every arch is forged from drawn wire; every gem is seated without industrial compromise.
            </p>

            <div className="pt-2 sm:pt-4">
              <Link to="/maison" className="btn-luxury text-[#111214] border-[#111214]/20">
                DISCOVER THE ARCHIVE (1964–2026) →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-[#DFD9CE] overflow-hidden shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <SafeImage
                src="/images/atelier-workbench.jpg"
                alt="Archival atelier workbench"
                luxuryLabel="Paris Archive 1964"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="aspect-[3/4] bg-[#DFD9CE] overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500 mt-6 sm:mt-8">
              <SafeImage
                src="/images/bespoke-sketch.jpg"
                alt="Goldsmith precision tool setting"
                luxuryLabel="Craft Tools"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          HOME 08 — ATELIER FILM (Cinematic Workshop Experience)
          ==================================================== */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] min-h-[460px] bg-[#0A0B0D] overflow-hidden flex items-center justify-center text-center p-6">
        <SafeImage
          src="/images/atelier-workbench.jpg"
          alt="Atelier Goldsmith sparks and metal finish"
          luxuryLabel="Atelier Film"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[#08090A]/60" />

        <div className="relative z-10 space-y-4 sm:space-y-6 max-w-xl">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block">
            CINEMATOGRAPHY // ATELIER
          </span>

          <h2 className="font-['Bodoni_Moda'] text-[36px] sm:text-[54px] md:text-[62px] text-[#F1EDE5] uppercase leading-tight">
            The Silent Bench
          </h2>

          <p className="font-['Space_Grotesk'] text-[13px] sm:text-[14px] text-[#9B9A96]">
            Watch forty-two hours of manual precision distilled into silent motion.
          </p>

          <button
            onClick={() => setActiveFilmModal(true)}
            onMouseEnter={() => setCursor('play', 'PLAY')}
            onMouseLeave={resetCursor}
            className="btn-solid-luxury mt-2 sm:mt-4 text-[11px]"
            aria-label="Play Atelier documentary film"
          >
            PLAY FILM [02:40] ▶
          </button>
        </div>
      </section>

      {/* Video Modal Simulation */}
      {activeFilmModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Atelier Film Player"
          className="fixed inset-0 z-[99999] bg-[#08090A]/95 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <button
            onClick={() => setActiveFilmModal(false)}
            className="absolute top-6 right-6 text-[11px] sm:text-[12px] uppercase font-mono tracking-[0.2em] text-[#C7A66A] hover:text-[#F1EDE5]"
            aria-label="Close film player"
          >
            CLOSE [ESC]
          </button>
          <div className="w-full max-w-4xl aspect-video bg-[#111214] border border-[rgba(199,166,106,0.2)] flex flex-col items-center justify-center p-6 sm:p-8 text-center">
            <span className="font-['Bodoni_Moda'] text-[20px] sm:text-[24px] text-[#F1EDE5] mb-2">
              THE ATELIER ARCHIVE
            </span>
            <p className="font-mono text-[11px] sm:text-[12px] text-[#9B9A96] mb-6">
              Muted Documentary Stream: Place Vendôme Goldsmith Bench
            </p>
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full border border-[#C7A66A] flex items-center justify-center text-[#C7A66A] animate-pulse">
              ▶
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          HOME 09 — PRIVATE APPOINTMENT (Deep Ruby Salon)
          ==================================================== */}
      <section className="section-luxury bg-[#3E141B] text-[#F1EDE5] overflow-hidden border-t border-[rgba(199,166,106,0.2)]">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-5 aspect-[4/5] bg-[#2C0C12] overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
            <SafeImage
              src="/images/gold-earrings.jpg"
              alt="Model wearing statement earrings in low light"
              luxuryLabel="Salon Private Viewing"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block">
              SALON PRIVÉ // PARIS & MILAN
            </span>

            <h2 className="font-['Bodoni_Moda'] text-[38px] sm:text-[62px] lg:text-[84px] uppercase leading-[0.98]">
              Some Pieces <br />
              Should Be <br />
              Seen In <span className="font-['Newsreader'] italic text-[#C7A66A]">Private.</span>
            </h2>

            <p className="font-['Space_Grotesk'] text-[15px] sm:text-[16px] text-[#DFCECE] max-w-lg leading-relaxed">
              Experience the weight, balance, and optical dispersion of high jewellery under controlled gallery lighting in our private salons.
            </p>

            <div className="pt-2 sm:pt-4">
              <button
                onClick={() => openAppointmentDrawer()}
                onMouseEnter={() => setCursor('book', 'BOOK')}
                onMouseLeave={resetCursor}
                className="btn-solid-luxury text-[11px]"
              >
                BOOK A PRIVATE VIEWING →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          HOME 10 — JOURNAL (Editorial Stories)
          ==================================================== */}
      <section className="section-luxury bg-[#F8F5EF] text-[#111214] overflow-hidden">
        <div className="container-luxury mb-12 sm:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#98743F] block mb-2">
              PUBLICATIONS
            </span>
            <h2 className="font-['Newsreader'] text-[40px] sm:text-[60px] md:text-[72px]">
              The Aurenne Journal.
            </h2>
          </div>

          <Link to="/journal" className="btn-luxury text-[#111214] border-[#111214]/20 self-start md:self-auto">
            VIEW ALL ESSAYS →
          </Link>
        </div>

        <div className="container-luxury grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              slug: 'when-gold-becomes-architecture',
              issue: 'ISSUE XII',
              title: 'When Gold Becomes Architecture',
              img: '/images/editorial-model.jpg',
            },
            {
              slug: 'emerald-after-dark',
              issue: 'ISSUE XI',
              title: 'Emerald After Dark: The Nocturne Studies',
              img: '/images/emerald-necklace.jpg',
            },
            {
              slug: 'the-forty-two-hour-curve',
              issue: 'ISSUE X',
              title: 'Inside the Atelier: The Forty-Two Hour Curve',
              img: '/images/atelier-workbench.jpg',
            },
          ].map((story) => (
            <Link
              key={story.slug}
              to={`/journal/${story.slug}`}
              className="group block space-y-3 sm:space-y-4"
            >
              <div className="aspect-[3/2] overflow-hidden bg-[#EAE5DA]">
                <SafeImage
                  src={story.img}
                  alt={story.title}
                  luxuryLabel={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#98743F]">
                  {story.issue}
                </span>
                <h3 className="font-['Newsreader'] text-[20px] sm:text-[24px] text-[#111214] group-hover:text-[#98743F] transition-colors mt-1">
                  {story.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

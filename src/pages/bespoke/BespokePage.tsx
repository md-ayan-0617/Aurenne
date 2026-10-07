import React, { useEffect, useState } from 'react';
import { GemstoneViewer } from '../../components/three/GemstoneViewer';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

export const BespokePage: React.FC = () => {
  const { setActiveTheme, openAppointmentDrawer, setCursor, resetCursor, setActiveSectionNumber } = useUiStore();
  const [selectedStoneType, setSelectedStoneType] = useState<'diamond' | 'emerald' | 'sapphire' | 'ruby'>('emerald');

  // Configurator preferences
  const [configType, setConfigType] = useState('Sculptural Ring');
  const [configMetal, setConfigMetal] = useState('18K Yellow Gold');
  const [configMood, setConfigMood] = useState('Architectural');

  useEffect(() => {
    setActiveTheme('ruby-bespoke');
    setActiveSectionNumber('05');
  }, [setActiveTheme, setActiveSectionNumber]);

  const stonesData = {
    diamond: {
      name: 'Diamond (Type IIa)',
      character: 'Pure crystalline carbon with extreme fire and exceptional optical dispersion.',
      hardness: '10.0 Mohs Scale',
      origins: 'Botswana, Northern Canada, Namibia (Direct Provenance)',
      tone: 'Colorless (D–F Grade), Flawless to VVS1',
    },
    emerald: {
      name: 'Colombian Muzo Emerald',
      character: 'Untreated beryl infused with deep nocturnal botanical life and natural jardin inclusions.',
      hardness: '7.5 – 8.0 Mohs Scale',
      origins: 'Muzo & Chivor Mines, Colombia',
      tone: 'Vivid deep forest green with high transparency',
    },
    sapphire: {
      name: 'Ceylonese Royal Sapphire',
      character: 'Unheated corundum with oceanic depth that retains indigo luminescence in evening low light.',
      hardness: '9.0 Mohs Scale',
      origins: 'Ratnapura, Sri Lanka & Montana, USA',
      tone: 'Royal blue to velvety midnight violet',
    },
    ruby: {
      name: 'Mozambique Pigeon Blood Ruby',
      character: 'Crimson corundum with natural red fluorescence that pulses under candlelight.',
      hardness: '9.0 Mohs Scale',
      origins: 'Montepuez, Mozambique & Burma (Old Stock)',
      tone: 'Intense saturated crimson red',
    },
  };

  const currentStone = stonesData[selectedStoneType];

  return (
    <div className="w-full bg-[#3E141B] text-[#F1EDE5] pt-28 pb-40 overflow-hidden">
      {/* ====================================================
          BESPOKE HERO (Deep Ruby Atmosphere)
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 mb-28">
        <div className="border-b border-[#F1EDE5]/15 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
              COMMISSIONS PRIVÉES
            </span>
            <h1 className="font-['Bodoni_Moda'] text-[48px] sm:text-[76px] lg:text-[104px] uppercase leading-[0.92]">
              Made <br />
              Only <span className="font-['Ballet'] lowercase text-[#C7A66A] text-[58px] sm:text-[92px] lg:text-[120px] tracking-normal">once.</span>
            </h1>
          </div>

          <p className="font-['Space_Grotesk'] text-[15px] text-[#DFCECE] max-w-sm text-left md:text-right">
            A private process for pieces that begin with a person rather than a collection.
          </p>
        </div>

        <div className="relative w-full h-[520px] md:h-[660px] bg-[#2C0C12] overflow-hidden border border-[#F1EDE5]/15 shadow-2xl">
          <SafeImage
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1800&auto=format&fit=crop"
            alt="Jewellery designer hand-drawing bespoke concept on vellum"
            luxuryLabel="Bespoke Design Drawing"
            className="w-full h-full object-cover grayscale-[15%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E141B] via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[#F1EDE5] bg-[#2C0C12]/85 px-4 py-2 border border-[#C7A66A]/30">
            PRIVATE COMMISSION ARCHIVE // UNIQUE REPERTOIRE
          </div>
        </div>
      </section>

      {/* ====================================================
          INTERACTIVE STONE TABLE WITH 3D GEMSTONE ROTATION
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 mb-36">
        <div className="border-b border-[#F1EDE5]/15 pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-1">
              THE MINERAL TABLE
            </span>
            <h2 className="font-['Bodoni_Moda'] text-[36px] md:text-[52px] uppercase">
              Stone Exploration
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {(['emerald', 'diamond', 'sapphire', 'ruby'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedStoneType(type)}
                className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] border transition-colors ${
                  selectedStoneType === type
                    ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-bold'
                    : 'border-[#F1EDE5]/15 text-[#DFCECE] hover:border-[#F1EDE5]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Gemstone Stage Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#2C0C12] border border-[#F1EDE5]/15 p-8 md:p-16 items-center shadow-2xl">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C7A66A] block">
              MINERAL PROFILE // {selectedStoneType.toUpperCase()}
            </span>

            <h3 className="font-['Bodoni_Moda'] text-[36px] sm:text-[48px] uppercase text-[#F1EDE5]">
              {currentStone.name}
            </h3>

            <p className="font-['Space_Grotesk'] text-[16px] text-[#DFCECE] leading-relaxed">
              {currentStone.character}
            </p>

            <div className="pt-4 border-t border-[#F1EDE5]/10 space-y-3 font-mono text-[12px]">
              <div className="flex justify-between py-1 border-b border-[#F1EDE5]/05">
                <span className="text-[#B38F95]">MOHS HARDNESS:</span>
                <span className="text-[#F1EDE5] font-bold">{currentStone.hardness}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1EDE5]/05">
                <span className="text-[#B38F95]">DIRECT ORIGIN:</span>
                <span className="text-[#F1EDE5]">{currentStone.origins}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1EDE5]/05">
                <span className="text-[#B38F95]">COLOR SPECIFICATION:</span>
                <span className="text-[#C7A66A]">{currentStone.tone}</span>
              </div>
            </div>
          </div>

          {/* Right: Real-time 3D Gemstone Viewer */}
          <div className="lg:col-span-6 bg-[#1A070B] border border-[#F1EDE5]/10 h-[400px] flex items-center justify-center relative overflow-hidden shadow-inner">
            <GemstoneViewer stoneType={selectedStoneType} />
            <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[#C7A66A]">
              DRAG OR OBSERVE FACET REFRACTION
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          BESPOKE CONFIGURATOR / CONVERSATION INITIATOR
          ==================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 bg-[#2C0C12] border border-[#F1EDE5]/15">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
            PRELIMINARY INQUIRY
          </span>
          <h2 className="font-['Bodoni_Moda'] text-[32px] sm:text-[44px] uppercase text-[#F1EDE5]">
            Define The Silhouette
          </h2>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#DFCECE] mt-2">
            Share your preliminary aesthetic parameters to begin a private consultation with our creative director.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Type */}
          <div className="space-y-3">
            <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
              01 OBJECT FORM
            </label>
            <div className="space-y-1.5">
              {['Sculptural Ring', 'Architectural Collar', 'Linear Earrings', 'Monolithic Cuff'].map((t) => (
                <button
                  key={t}
                  onClick={() => setConfigType(t)}
                  className={`w-full p-3 text-[12px] font-mono uppercase text-left border transition-colors ${
                    configType === t
                      ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-bold'
                      : 'border-[#F1EDE5]/10 text-[#DFCECE] hover:border-[#C7A66A]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Metal */}
          <div className="space-y-3">
            <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
              02 PRECIOUS METAL
            </label>
            <div className="space-y-1.5">
              {['18K Yellow Gold', 'Platinum 950', '18K Blackened Gold', '18K Rose Gold'].map((m) => (
                <button
                  key={m}
                  onClick={() => setConfigMetal(m)}
                  className={`w-full p-3 text-[12px] font-mono uppercase text-left border transition-colors ${
                    configMetal === m
                      ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-bold'
                      : 'border-[#F1EDE5]/10 text-[#DFCECE] hover:border-[#C7A66A]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Mood */}
          <div className="space-y-3">
            <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
              03 AESTHETIC INTENT
            </label>
            <div className="space-y-1.5">
              {['Architectural & Brutalist', 'Minimal & Pure', 'Organic & Monolithic', 'Nocturne High Contrast'].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setConfigMood(mood)}
                  className={`w-full p-3 text-[12px] font-mono uppercase text-left border transition-colors ${
                    configMood === mood
                      ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-bold'
                      : 'border-[#F1EDE5]/10 text-[#DFCECE] hover:border-[#C7A66A]'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center pt-8 border-t border-[#F1EDE5]/10">
          <button
            onClick={() =>
              openAppointmentDrawer({
                service: `Bespoke Commission (${configType} in ${configMetal})`,
              })
            }
            onMouseEnter={() => setCursor('book', 'BEGIN')}
            onMouseLeave={resetCursor}
            className="btn-solid-luxury py-4 px-10 text-[12px]"
          >
            BEGIN A CONVERSATION →
          </button>
        </div>
      </section>
    </div>
  );
};

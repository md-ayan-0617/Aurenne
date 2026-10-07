import React, { useEffect, useState } from 'react';
import { atelierStages } from '../../data/atelierSteps';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

export const AtelierPage: React.FC = () => {
  const { setActiveTheme, setCursor, resetCursor, setActiveSectionNumber } = useUiStore();
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    setActiveTheme('graphite-atelier');
    setActiveSectionNumber('04');
  }, [setActiveTheme, setActiveSectionNumber]);

  const currentStage = atelierStages[activeStageIndex];

  return (
    <div className="w-full bg-[#292A2C] text-[#F8F5EF] pt-28 pb-40 overflow-hidden">
      {/* ====================================================
          ATELIER HERO (Technical Workbench)
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 mb-28">
        <div className="border-b border-[#F8F5EF]/15 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
              PRECISION LAB // PLACE VENDÔME
            </span>
            <h1 className="font-['Bodoni_Moda'] text-[48px] sm:text-[76px] lg:text-[104px] uppercase leading-[0.92]">
              Made <br />
              Millimeter <br />
              By Millimeter.
            </h1>
          </div>

          <div className="font-mono text-[11px] text-[#C5C7C7] text-right space-y-1">
            <div>ACCURACY: ±0.01 MM</div>
            <div>GOLD ALLOY: 750/1000 Au</div>
            <div>AVERAGE BENCH TIME: 42–84 HRS</div>
          </div>
        </div>

        {/* Workbench Photographic Stage */}
        <div className="relative w-full h-[540px] md:h-[680px] bg-[#1F2022] overflow-hidden border border-[#F8F5EF]/15 shadow-2xl">
          <SafeImage
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1800&auto=format&fit=crop"
            alt="Goldsmith workbench tools and metal"
            luxuryLabel="Atelier Workbench"
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292A2C] via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[#F8F5EF] bg-[#111214]/85 px-4 py-2 border border-[#C7A66A]/30">
            BENCH STATION NO. 03 // VENDÔME ARCHIVES
          </div>
        </div>
      </section>

      {/* ====================================================
          SEVEN-STAGE CRAFTSMANSHIP PROGRESSION
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 mb-36">
        <div className="border-b border-[#F8F5EF]/15 pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-1">
              THE SEVEN TRANSFORMATIONS
            </span>
            <h2 className="font-['Bodoni_Moda'] text-[36px] md:text-[52px] uppercase">
              Sequential Precision
            </h2>
          </div>

          {/* Stage Selector Pills */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {atelierStages.map((stage, idx) => (
              <button
                key={stage.step}
                onClick={() => setActiveStageIndex(idx)}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] border transition-colors ${
                  activeStageIndex === idx
                    ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-bold'
                    : 'border-[#F8F5EF]/15 text-[#C5C7C7] hover:border-[#F8F5EF]'
                }`}
              >
                {stage.step} {stage.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Stage Split Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#1F2022] border border-[#F8F5EF]/15 p-8 md:p-16 items-center shadow-2xl">
          {/* Left Column: Number & Descriptions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[64px] sm:text-[96px] text-[#C7A66A] font-bold leading-none">
                {currentStage.step}
              </span>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C5C7C7] block">
                  {currentStage.frenchTitle}
                </span>
                <h3 className="font-['Bodoni_Moda'] text-[32px] sm:text-[44px] uppercase text-[#F8F5EF] leading-tight">
                  {currentStage.name}
                </h3>
              </div>
            </div>

            <p className="font-['Space_Grotesk'] text-[16px] text-[#C5C7C7] leading-relaxed">
              {currentStage.description}
            </p>

            {/* Technical Annotations Grid (DM Mono) */}
            <div className="pt-4 border-t border-[#F8F5EF]/10 grid grid-cols-2 gap-4 font-mono text-[11px]">
              {currentStage.specs.temperature && (
                <div className="p-3 bg-[#292A2C] border-l-2 border-[#C7A66A]">
                  <span className="text-[#777774] block">TEMPERATURE:</span>
                  <span className="text-[#F8F5EF] font-bold">{currentStage.specs.temperature}</span>
                </div>
              )}
              {currentStage.specs.tolerance && (
                <div className="p-3 bg-[#292A2C] border-l-2 border-[#C7A66A]">
                  <span className="text-[#777774] block">TOLERANCE:</span>
                  <span className="text-[#F8F5EF] font-bold">{currentStage.specs.tolerance}</span>
                </div>
              )}
              {currentStage.specs.hours && (
                <div className="p-3 bg-[#292A2C] border-l-2 border-[#C7A66A]">
                  <span className="text-[#777774] block">BENCH TIME:</span>
                  <span className="text-[#F8F5EF] font-bold">{currentStage.specs.hours}</span>
                </div>
              )}
              {currentStage.specs.weight && (
                <div className="p-3 bg-[#292A2C] border-l-2 border-[#C7A66A]">
                  <span className="text-[#777774] block">SPECIFICATION:</span>
                  <span className="text-[#F8F5EF] font-bold">{currentStage.specs.weight}</span>
                </div>
              )}
            </div>

            {/* Step Controls */}
            <div className="flex gap-4 pt-4">
              <button
                disabled={activeStageIndex === 0}
                onClick={() => setActiveStageIndex((s) => s - 1)}
                className="btn-outline-luxury text-[10px] disabled:opacity-30"
              >
                ← PREVIOUS STAGE
              </button>
              <button
                disabled={activeStageIndex === atelierStages.length - 1}
                onClick={() => setActiveStageIndex((s) => s + 1)}
                className="btn-solid-luxury text-[10px] py-2 px-6 disabled:opacity-30"
              >
                NEXT STAGE →
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage Macro */}
          <div className="lg:col-span-6 aspect-[4/3] bg-[#17181A] overflow-hidden border border-[#F8F5EF]/10 relative shadow-inner">
            <SafeImage
              src={currentStage.image}
              alt={currentStage.name}
              luxuryLabel={currentStage.name}
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUiStore } from '../../store/useUiStore';

export const NotFoundPage: React.FC = () => {
  const { setActiveTheme } = useUiStore();

  useEffect(() => {
    setActiveTheme('obsidian');
  }, [setActiveTheme]);

  return (
    <div className="w-full h-[100svh] min-h-[640px] bg-[#08090A] text-[#F1EDE5] flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden relative">
      {/* Subtle Slow Rotating Ring Silhouette in SVG/Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[380px] h-[380px] rounded-full border border-[#C7A66A] animate-[spin_40s_linear_infinite] flex items-center justify-center">
          <div className="w-[300px] h-[300px] rounded-full border border-dashed border-[#C7A66A]/40" />
        </div>
      </div>

      <div className="relative z-10 max-w-xl space-y-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block">
          ERROR 404 // VOID SPACE
        </span>

        <h1 className="font-['Bodoni_Moda'] text-[42px] sm:text-[64px] leading-tight uppercase">
          The Object <br />
          You Seek <br />
          <span className="font-['Newsreader'] italic font-normal text-[#C7A66A]">
            Isn’t Here.
          </span>
        </h1>

        <p className="font-['Space_Grotesk'] text-[15px] text-[#777774] max-w-md mx-auto leading-relaxed">
          The coordinates you entered do not correspond to any catalogued jewel in the Maison archive.
        </p>

        <div className="pt-6">
          <Link to="/collections" className="btn-solid-luxury">
            RETURN TO COLLECTIONS →
          </Link>
        </div>
      </div>
    </div>
  );
};

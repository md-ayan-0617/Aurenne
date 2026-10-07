import React, { useEffect, useState } from 'react';
import { useUiStore } from '../../store/useUiStore';

export const Preloader: React.FC = () => {
  const { hasPreloaderFinished, setPreloaderFinished } = useUiStore();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'drawing' | 'sweep' | 'compress' | 'split' | 'done'>('drawing');

  useEffect(() => {
    // If user prefers reduced motion, skip preloader immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPreloaderFinished(true);
      return;
    }

    // If user already saw it in this session, provide quick reveal
    const sessionSeen = sessionStorage.getItem('aurenne_preloader_seen');
    const intervalTime = sessionSeen ? 10 : 25;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + 1;
        if (next >= 65 && phase === 'drawing') {
          setPhase('sweep');
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [phase, setPreloaderFinished]);

  useEffect(() => {
    if (progress === 100) {
      setPhase('compress');
      const t1 = setTimeout(() => {
        setPhase('split');
      }, 300);

      const t2 = setTimeout(() => {
        setPhase('done');
        setPreloaderFinished(true);
        sessionStorage.setItem('aurenne_preloader_seen', 'true');
      }, 950);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress, setPreloaderFinished]);

  if (hasPreloaderFinished || phase === 'done') return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Exhibition Initializing"
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden"
    >
      {/* Upper Split Panel */}
      <div
        className={`absolute top-0 left-0 w-full h-1/2 bg-[#08090A] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          phase === 'split' ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Lower Split Panel */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1/2 bg-[#08090A] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          phase === 'split' ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Center Gemstone & Counter Animation Stage */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
          phase === 'split' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="relative flex flex-col items-center">
          {/* Gemstone SVG Contour */}
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${
              phase === 'compress' ? 'scale-y-[0.02] scale-x-150' : 'scale-100'
            }`}
          >
            <svg
              className="w-24 h-24 md:w-32 md:h-32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Outer Gem Facets */}
              <polygon
                points="50,6 88,28 68,90 32,90 12,28"
                stroke="#C7A66A"
                strokeWidth="1.2"
                strokeDasharray="300"
                strokeDashoffset={300 - (progress / 100) * 300}
                className="transition-all duration-75"
              />
              {/* Inner Table & Pavilion lines */}
              <line
                x1="12"
                y1="28"
                x2="88"
                y2="28"
                stroke="#C7A66A"
                strokeWidth="0.8"
                strokeOpacity={progress > 30 ? 0.8 : 0.1}
              />
              <line
                x1="32"
                y1="28"
                x2="32"
                y2="90"
                stroke="#C7A66A"
                strokeWidth="0.8"
                strokeOpacity={progress > 50 ? 0.8 : 0.1}
              />
              <line
                x1="68"
                y1="28"
                x2="68"
                y2="90"
                stroke="#C7A66A"
                strokeWidth="0.8"
                strokeOpacity={progress > 50 ? 0.8 : 0.1}
              />
              <polygon
                points="50,6 32,28 68,28"
                stroke="#F1EDE5"
                strokeWidth="0.8"
                strokeOpacity={progress > 40 ? 0.6 : 0.1}
              />

              {/* Light Sweep Across Gem around 65% */}
              {progress >= 65 && progress < 90 && (
                <line
                  x1="0"
                  y1={progress}
                  x2="100"
                  y2={progress - 20}
                  stroke="#FFF3D4"
                  strokeWidth="2.5"
                  strokeOpacity="0.85"
                  className="filter drop-shadow-[0_0_8px_#C7A66A]"
                />
              )}
            </svg>
          </div>

          {/* Expanding Line at Compression */}
          {phase === 'compress' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[1px] bg-[#C7A66A] shadow-[0_0_12px_#C7A66A] animate-pulse" />
          )}

          {/* Progress Metrics & Brand */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="font-mono text-[12px] tracking-[0.25em] text-[#C7A66A]">
              {String(progress).padStart(2, '0')} — 100
            </span>
            <span className="font-['Bodoni_Moda'] text-[13px] tracking-[0.38em] uppercase text-[#F1EDE5] mt-1">
              A U R E N N E
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#777774] font-['Space_Grotesk']">
              Maison de Joaillerie
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

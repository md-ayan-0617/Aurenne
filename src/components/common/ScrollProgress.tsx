import React, { useState, useEffect } from 'react';
import { useUiStore } from '../../store/useUiStore';

export const ScrollProgress: React.FC = () => {
  const { activeSectionNumber } = useUiStore();
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollFraction(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-40 pointer-events-none select-none"
    >
      <span className="font-mono text-[11px] tracking-[0.2em] text-[#C7A66A]">
        {activeSectionNumber}
      </span>

      <div className="w-[1px] h-20 bg-[rgba(199,166,106,0.18)] relative overflow-hidden">
        <div
          style={{ transform: `scaleY(${scrollFraction})` }}
          className="w-full h-full bg-[#C7A66A] origin-top transition-transform duration-100 ease-out"
        />
      </div>

      <span className="font-mono text-[9px] tracking-[0.15em] text-[#777774]">
        ARCH
      </span>
    </div>
  );
};

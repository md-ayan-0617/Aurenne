import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const getRouteLabel = (pathname: string): { title: string; subtitle: string } => {
  if (pathname === '/') return { title: 'OBJECTS OF LIGHT', subtitle: 'EXHIBITION ROOM 01' };
  if (pathname === '/collections') return { title: 'THE COLLECTIONS', subtitle: 'FORMS WORTH KEEPING' };
  if (pathname.startsWith('/collections/')) {
    const slug = pathname.replace('/collections/', '').replace('-', ' ').toUpperCase();
    return { title: slug, subtitle: 'CURATED CHAPTER' };
  }
  if (pathname.startsWith('/piece/')) {
    const slug = pathname.replace('/piece/', '').replace('-', ' ').toUpperCase();
    return { title: slug, subtitle: 'PRIVATE VIEWING ROOM' };
  }
  if (pathname === '/maison') return { title: 'THE MAISON', subtitle: 'PARIS ARCHIVE 1964' };
  if (pathname === '/atelier') return { title: 'THE ATELIER', subtitle: 'PRECISION BENCH' };
  if (pathname === '/bespoke') return { title: 'BESPOKE COMMISSIONS', subtitle: 'MADE ONLY ONCE' };
  if (pathname === '/journal') return { title: 'AURENNE REVIEW', subtitle: 'PERIODICAL NO. XII' };
  if (pathname.startsWith('/journal/')) return { title: 'CRITICAL ESSAY', subtitle: 'AURENNE REVIEW' };
  if (pathname === '/appointments') return { title: 'SALON PRIVÉ', subtitle: 'PLACE VENDÔME' };
  if (pathname === '/contact') return { title: 'SPEAK WITH AURENNE', subtitle: 'CONCIERGE LIAISON' };
  if (pathname === '/wishlist') return { title: 'WISHLIST', subtitle: 'OBJECTS YOU KEPT' };
  if (pathname === '/bag') return { title: 'SHOPPING BAG', subtitle: 'ACQUISITION PROTOCOL' };
  if (pathname === '/search') return { title: 'CATALOGUE INVENTORY', subtitle: 'SEARCH ARCHIVE' };
  return { title: 'AURENNE', subtitle: 'MAISON DE JOAILLERIE' };
};

export const RouteTransition: React.FC = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayMeta, setDisplayMeta] = useState(getRouteLabel(location.pathname));

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const meta = getRouteLabel(location.pathname);
    setDisplayMeta(meta);
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 550);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99990] pointer-events-none select-none overflow-hidden"
    >
      {/* Top Split Panel */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#08090A] border-b border-[#C7A66A]/40 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

      {/* Bottom Split Panel */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#08090A] border-t border-[#C7A66A]/40 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

      {/* Center Reveal Marker */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 animate-fade-in">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
          {displayMeta.subtitle}
        </span>
        <h2 className="font-['Bodoni_Moda'] text-[24px] sm:text-[36px] uppercase tracking-[0.1em] text-[#F1EDE5]">
          {displayMeta.title}
        </h2>
        <div className="w-16 h-[1px] bg-[#C7A66A] mt-4" />
      </div>
    </div>
  );
};

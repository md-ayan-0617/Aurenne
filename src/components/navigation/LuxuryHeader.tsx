import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUiStore } from '../../store/useUiStore';
import { useBagStore } from '../../store/useBagStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export const LuxuryHeader: React.FC = () => {
  const location = useLocation();
  const { openMenu, openSearch, setCursor, resetCursor } = useUiStore();
  const { toggleBag, getTotalCount } = useBagStore();
  const { items: wishlistItems } = useWishlistStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if current route is predominantly light theme (Collections, Journal, Maison, Atelier)
  const isLightRoute =
    location.pathname === '/collections' ||
    location.pathname === '/journal' ||
    location.pathname === '/maison' ||
    location.pathname === '/atelier';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide when scrolling rapidly down (>15px delta), show when scrolling up
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY + 8) {
          setIsVisible(false); // scrolling down
        } else if (currentScrollY < lastScrollY - 6) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const bagCount = getTotalCount();
  const wishlistCount = wishlistItems.length;

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'h-[72px] bg-[#08090A]/85 backdrop-blur-md border-b border-[rgba(199,166,106,0.12)] text-[#F1EDE5]'
          : isLightRoute
          ? 'h-[84px] md:h-[92px] bg-transparent text-[#111214]'
          : 'h-[84px] md:h-[92px] bg-transparent text-[#F1EDE5]'
      }`}
    >
      <div className="w-full h-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
        {/* LEFT: Menu Trigger */}
        <div className="flex items-center gap-6">
          <button
            onClick={openMenu}
            onMouseEnter={() => setCursor('default', 'OPEN')}
            onMouseLeave={resetCursor}
            className="group flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase hover:text-[#C7A66A] transition-colors focus-visible:ring-1 focus-visible:ring-[#C7A66A] rounded-none py-1"
            aria-label="Open Fullscreen Navigation Menu"
          >
            <span className="w-4 sm:w-5 flex flex-col gap-1 items-start" aria-hidden="true">
              <span className="w-full h-[1px] bg-current transition-all duration-300 group-hover:w-2.5" />
              <span className="w-2.5 sm:w-3 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="inline">MENU</span>
          </button>
        </div>

        {/* CENTER: Maison Wordmark */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <Link
            to="/"
            onMouseEnter={() => setCursor('default', 'HOME')}
            onMouseLeave={resetCursor}
            className="brand-wordmark text-[13px] sm:text-[19px] md:text-[22px] tracking-[0.28em] sm:tracking-[0.42em] uppercase font-['Bodoni_Moda'] text-current hover:text-[#C7A66A] transition-all duration-500 focus-visible:ring-1 focus-visible:ring-[#C7A66A] whitespace-nowrap"
            aria-label="Aurenne Maison de Joaillerie — Home"
          >
            A U R E N N E
          </Link>
          <span className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.32em] opacity-60 font-['Space_Grotesk'] mt-0.5 hidden md:block">
            Maison de Joaillerie
          </span>
        </div>

        {/* RIGHT: Search, Wishlist, Bag */}
        <div className="flex items-center gap-3.5 sm:gap-6 md:gap-8">
          <button
            onClick={openSearch}
            onMouseEnter={() => setCursor('default', 'FIND')}
            onMouseLeave={resetCursor}
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase hover:text-[#C7A66A] transition-colors flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-[#C7A66A]"
            aria-label="Search Collection"
          >
            <span className="hidden sm:inline">SEARCH</span>
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link
            to="/wishlist"
            onMouseEnter={() => setCursor('default', 'SAVED')}
            onMouseLeave={resetCursor}
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase hover:text-[#C7A66A] transition-colors relative hidden sm:flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-[#C7A66A]"
            aria-label={`View Wishlist with ${wishlistCount} items`}
          >
            <span>SAVED</span>
            {wishlistCount > 0 && (
              <span className="text-[10px] text-[#C7A66A] font-mono">
                [{wishlistCount}]
              </span>
            )}
          </Link>

          <button
            onClick={toggleBag}
            onMouseEnter={() => setCursor('default', 'BAG')}
            onMouseLeave={resetCursor}
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase hover:text-[#C7A66A] transition-colors flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-[#C7A66A]"
            aria-label={`Open Bag with ${bagCount} items`}
          >
            <span>BAG</span>
            <span className="text-[10px] text-[#C7A66A] font-mono">
              [{bagCount}]
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

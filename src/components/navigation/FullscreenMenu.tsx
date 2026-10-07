import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUiStore } from '../../store/useUiStore';
import { SafeImage } from '../common/SafeImage';

interface MenuItem {
  num: string;
  label: string;
  subtitle: string;
  path: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    num: '01',
    label: 'Collections',
    subtitle: 'Forms Worth Keeping',
    path: '/collections',
    image: '/images/emerald-necklace.jpg',
  },
  {
    num: '02',
    label: 'High Jewellery',
    subtitle: 'One-of-a-Kind Creations',
    path: '/collections/high-jewellery',
    image: '/images/hero-ring.jpg',
  },
  {
    num: '03',
    label: 'Maison',
    subtitle: 'The House of Aurenne (1964)',
    path: '/maison',
    image: '/images/editorial-model.jpg',
  },
  {
    num: '04',
    label: 'Atelier',
    subtitle: 'Craftsmanship & Millimeter Tolerance',
    path: '/atelier',
    image: '/images/atelier-workbench.jpg',
  },
  {
    num: '05',
    label: 'Bespoke',
    subtitle: 'Private Commission — Made Only Once',
    path: '/bespoke',
    image: '/images/bespoke-sketch.jpg',
  },
  {
    num: '06',
    label: 'Journal',
    subtitle: 'Essays in Gold & Light',
    path: '/journal',
    image: '/images/gold-cuff.jpg',
  },
  {
    num: '07',
    label: 'Appointments',
    subtitle: 'Private Salon Consultations',
    path: '/appointments',
    image: '/images/sapphire-ring.jpg',
  },
  {
    num: '08',
    label: 'Contact',
    subtitle: 'Paris & Milan Boutiques',
    path: '/contact',
    image: '/images/diamond-ring.jpg',
  },
];

export const FullscreenMenu: React.FC = () => {
  const { isMenuOpen, closeMenu, setCursor, resetCursor } = useUiStore();
  const [activeItem, setActiveItem] = useState<MenuItem>(menuItems[0]);
  const navigate = useNavigate();

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Lock background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  if (!isMenuOpen) return null;

  const handleNavigate = (path: string) => {
    closeMenu();
    navigate(path);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[9990] bg-[#08090A] text-[#F1EDE5] flex flex-col justify-between overflow-hidden animate-fade-in"
    >
      {/* Top Bar inside Menu */}
      <div className="container-luxury py-6 sm:py-8 flex items-center justify-between border-b border-[rgba(199,166,106,0.1)]">
        <span className="brand-wordmark text-[14px] sm:text-[16px] tracking-[0.4em] uppercase font-['Bodoni_Moda'] text-[#C7A66A]">
          A U R E N N E
        </span>

        <button
          onClick={closeMenu}
          onMouseEnter={() => setCursor('default', 'CLOSE')}
          onMouseLeave={resetCursor}
          className="group flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase hover:text-[#C7A66A] transition-colors focus-visible:ring-1 focus-visible:ring-[#C7A66A] p-1"
          aria-label="Close navigation menu"
        >
          <span>CLOSE</span>
          <span className="w-4 h-4 relative flex items-center justify-center" aria-hidden="true">
            <span className="absolute w-full h-[1px] bg-current rotate-45 transition-transform group-hover:rotate-90" />
            <span className="absolute w-full h-[1px] bg-current -rotate-45 transition-transform group-hover:rotate-0" />
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 container-luxury py-6 sm:py-8 flex items-center justify-between overflow-y-auto">
        {/* Left Side: Navigation Links (approx 65%) */}
        <nav className="w-full lg:w-[62%] flex flex-col gap-1.5 sm:gap-2 md:gap-3 py-2" aria-label="Main menu">
          {menuItems.map((item) => {
            const isHovered = activeItem.num === item.num;
            return (
              <div
                key={item.num}
                onMouseEnter={() => {
                  setActiveItem(item);
                  setCursor('default', 'SELECT');
                }}
                onMouseLeave={resetCursor}
                onClick={() => handleNavigate(item.path)}
                className="group cursor-pointer flex items-baseline gap-3 sm:gap-6 md:gap-8 py-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A66A]"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavigate(item.path);
                  }
                }}
                role="link"
                aria-label={`${item.num} ${item.label} — ${item.subtitle}`}
              >
                {/* Index Number */}
                <span className="font-mono text-[11px] sm:text-[12px] md:text-[14px] tracking-[0.18em] text-[#777774] transition-colors group-hover:text-[#C7A66A]">
                  {item.num}
                </span>

                {/* Primary Link Title with 8px shift on hover */}
                <div className="flex items-baseline gap-3 sm:gap-4 transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2">
                  <span className="font-['Bodoni_Moda'] text-[26px] sm:text-[38px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.01em] text-[#F1EDE5] group-hover:text-[#C7A66A] transition-colors">
                    {item.label}
                  </span>

                  {/* Dynamic Subtitle entering smoothly */}
                  <span
                    className={`hidden sm:inline font-['Newsreader'] italic text-[14px] lg:text-[18px] text-[#98743F] transition-all duration-400 ${
                      isHovered
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-3'
                    }`}
                  >
                    — {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right Side: Visual Preview with vertical clip-path reveal (approx 35%) */}
        <div className="hidden lg:flex w-[35%] h-[540px] relative items-center justify-center p-6 border-l border-[rgba(199,166,106,0.12)]">
          <div className="w-full h-full relative overflow-hidden bg-[#111214]">
            {menuItems.map((item) => {
              const isCurrent = activeItem.num === item.num;
              return (
                <div
                  key={item.num}
                  className="absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  style={{
                    clipPath: isCurrent
                      ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                      : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                    zIndex: isCurrent ? 2 : 1,
                  }}
                >
                  <SafeImage
                    src={item.image}
                    alt={item.label}
                    luxuryLabel={item.label}
                    className="w-full h-full object-cover grayscale-[25%] hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090A]/90 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A66A]">
                        {item.num} // ARCHIVE PREVIEW
                      </span>
                      <span className="font-['Bodoni_Moda'] text-[20px] text-[#F1EDE5]">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Salon Cities & Press Inquiries */}
      <div className="container-luxury py-5 sm:py-6 border-t border-[rgba(199,166,106,0.1)] flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-['Space_Grotesk'] tracking-[0.2em] text-[#777774] gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-[#C7A66A]">SALONS:</span>
          <span>PARIS</span>
          <span>MILAN</span>
          <span>ATHENS</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F1EDE5] transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F1EDE5] transition-colors"
          >
            PINTEREST
          </a>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="hover:text-[#F1EDE5] transition-colors"
          >
            EDITORIAL ENQUIRIES
          </Link>
        </div>
      </div>
    </div>
  );
};

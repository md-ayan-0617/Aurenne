import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUiStore } from '../../store/useUiStore';

export const LuxuryFooter: React.FC = () => {
  const { setCursor, resetCursor, openAppointmentDrawer } = useUiStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [parisTime, setParisTime] = useState('');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Update Paris local time continuously
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setParisTime(timeStr);
      } catch {
        setParisTime('21:48:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  const handleMouseMoveWordmark = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: relX * 4, y: relY * 3 }); // Subtle 2-4px displacement
  };

  const handleMouseLeaveWordmark = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <footer className="w-full bg-[#08090A] text-[#F1EDE5] border-t border-[rgba(199,166,106,0.15)] relative overflow-hidden">
      {/* Top Transition Statement */}
      <div className="pt-24 pb-16 text-center border-b border-[rgba(255,255,255,0.06)] px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-4">
          MAISON DE JOAILLERIE
        </span>
        <h2 className="font-['Bodoni_Moda'] text-[36px] sm:text-[52px] md:text-[68px] leading-[1.05] tracking-[-0.01em]">
          Objects Outlive <span className="font-['Newsreader'] italic font-normal text-[#C7A66A]">Occasions.</span>
        </h2>
      </div>

      {/* Newsletter Section: Private Letters From Aurenne */}
      <div className="max-w-[720px] mx-auto px-6 py-20 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#777774] block mb-2">
          CORRESPONDENCE
        </span>
        <h3 className="font-['Bodoni_Moda'] text-[24px] md:text-[32px] tracking-[0.05em] uppercase text-[#F1EDE5] mb-3">
          Private Letters from Aurenne
        </h3>
        <p className="font-['Space_Grotesk'] text-[14px] text-[#9B9A96] mb-8 leading-relaxed">
          Rare previews of high jewellery acquisitions, salon dates in Paris and Milan, and gemmological dispatches.
        </p>

        {isSubscribed ? (
          <div className="p-4 border border-[#C7A66A]/40 bg-[#111214] inline-block font-mono text-[12px] text-[#C7A66A] tracking-[0.15em]">
            ✓ YOU ARE NOW INSCRIBED IN THE PRIVATE MAISON ARCHIVE.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
            <div className="relative w-full border-b border-[rgba(199,166,106,0.3)] focus-within:border-[#C7A66A] transition-colors pb-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                required
                className="w-full bg-transparent text-[13px] font-['Space_Grotesk'] text-[#F1EDE5] placeholder:text-[#5A5B5E] outline-none uppercase tracking-[0.1em] py-2"
              />
            </div>
            <button
              type="submit"
              onMouseEnter={() => setCursor('default', 'JOIN')}
              onMouseLeave={resetCursor}
              className="btn-luxury whitespace-nowrap text-[11px]"
            >
              SUBSCRIBE →
            </button>
          </form>
        )}
      </div>

      {/* Main Link Columns */}
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 border-t border-[rgba(255,255,255,0.06)] text-[12px]">
        {/* Col 1 */}
        <div className="space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C7A66A] block">
            COLLECTIONS
          </span>
          <ul className="space-y-2.5 text-[#9B9A96] font-['Space_Grotesk']">
            <li>
              <Link to="/collections" className="hover:text-[#F1EDE5] transition-colors">
                All Collections
              </Link>
            </li>
            <li>
              <Link to="/collections/nocturne" className="hover:text-[#F1EDE5] transition-colors">
                Nocturne
              </Link>
            </li>
            <li>
              <Link to="/collections/verde-notte" className="hover:text-[#F1EDE5] transition-colors">
                Verde Notte (Emeralds)
              </Link>
            </li>
            <li>
              <Link to="/collections/solar" className="hover:text-[#F1EDE5] transition-colors">
                Solar (Forged Gold)
              </Link>
            </li>
            <li>
              <Link to="/collections/high-jewellery" className="hover:text-[#F1EDE5] transition-colors">
                High Jewellery
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 2 */}
        <div className="space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C7A66A] block">
            MAISON
          </span>
          <ul className="space-y-2.5 text-[#9B9A96] font-['Space_Grotesk']">
            <li>
              <Link to="/maison" className="hover:text-[#F1EDE5] transition-colors">
                Heritage & Story (1964)
              </Link>
            </li>
            <li>
              <Link to="/atelier" className="hover:text-[#F1EDE5] transition-colors">
                Atelier & Craftsmanship
              </Link>
            </li>
            <li>
              <Link to="/bespoke" className="hover:text-[#F1EDE5] transition-colors">
                Bespoke Commissions
              </Link>
            </li>
            <li>
              <Link to="/journal" className="hover:text-[#F1EDE5] transition-colors">
                Aurenne Review (Journal)
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C7A66A] block">
            CLIENT SERVICES
          </span>
          <ul className="space-y-2.5 text-[#9B9A96] font-['Space_Grotesk']">
            <li>
              <button
                onClick={() => openAppointmentDrawer()}
                className="hover:text-[#F1EDE5] transition-colors text-left"
              >
                Book Private Viewing
              </button>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#F1EDE5] transition-colors">
                Armored Courier & Delivery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#F1EDE5] transition-colors">
                Ring Sizing & Fit Guide
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#F1EDE5] transition-colors">
                Care & Gemmological Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C7A66A] block">
            SALONS & CONTACT
          </span>
          <ul className="space-y-2.5 text-[#9B9A96] font-['Space_Grotesk']">
            <li>
              <span className="text-[#F1EDE5]">Paris:</span> 12 Rue de la Paix, 75001
            </li>
            <li>
              <span className="text-[#F1EDE5]">Milan:</span> Via Montenapoleone 18
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#F1EDE5] transition-colors">
                concierge@aurenne.com
              </Link>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F1EDE5] transition-colors">
                Instagram
              </a>{' '}
              / {' '}
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#F1EDE5] transition-colors">
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Massive Responsive Wordmark with micro cursor response */}
      <div
        onMouseMove={handleMouseMoveWordmark}
        onMouseLeave={handleMouseLeaveWordmark}
        className="w-full py-6 md:py-12 border-t border-[rgba(255,255,255,0.04)] overflow-hidden flex items-center justify-center select-none"
      >
        <span
          style={{
            transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="font-['Bodoni_Moda'] text-[15vw] leading-none uppercase tracking-[0.16em] text-[rgba(199,166,106,0.18)] hover:text-[rgba(199,166,106,0.35)] transition-colors pointer-events-auto"
        >
          AURENNE
        </span>
      </div>

      {/* Bottom Bar with Live Paris Local Time */}
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 py-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row items-center justify-between text-[11px] font-mono tracking-[0.15em] text-[#777774] gap-4">
        <div>
          © 2026 AURENNE MAISON DE JOAILLERIE. ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          <Link to="/contact" className="hover:text-[#F1EDE5] transition-colors">
            PRIVACY
          </Link>
          <Link to="/contact" className="hover:text-[#F1EDE5] transition-colors">
            TERMS
          </Link>
          <Link to="/contact" className="hover:text-[#F1EDE5] transition-colors">
            ACCESSIBILITY
          </Link>
        </div>

        <div className="text-[#C7A66A]">
          LOCAL TIME / PARIS / <span className="text-[#F1EDE5]">{parisTime || '21:48:00'}</span>
        </div>
      </div>
    </footer>
  );
};

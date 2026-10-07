import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

import { useUiStore } from '../../store/useUiStore';
import { useBagStore } from '../../store/useBagStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export const scrollPageToTop = () => {
  if (typeof window !== 'undefined') {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }
};

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  const isMenuOpen = useUiStore((s) => s.isMenuOpen);
  const isSearchOpen = useUiStore((s) => s.isSearchOpen);
  const isAppointmentDrawerOpen = useUiStore((s) => s.isAppointmentDrawerOpen);
  const isBagOpen = useBagStore((s) => s.isBagOpen);
  const isWishlistOpen = useWishlistStore((s) => s.isWishlistOpen);

  const isAnyOverlayActive =
    isMenuOpen || isSearchOpen || isAppointmentDrawerOpen || isBagOpen || isWishlistOpen;

  useEffect(() => {
    // Disable on reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  // Lock or unlock scroll smoothly when modal/drawer overlays are active
  useEffect(() => {
    if (lenisRef.current) {
      if (isAnyOverlayActive) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isAnyOverlayActive]);

  return <>{children}</>;
};

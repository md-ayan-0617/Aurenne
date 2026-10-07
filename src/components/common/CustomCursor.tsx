import React, { useEffect, useState, useRef } from 'react';
import { useUiStore } from '../../store/useUiStore';

export const CustomCursor: React.FC = () => {
  const { cursorState, cursorText } = useUiStore();
  const [isVisible, setIsVisible] = useState(false);
  const [glintActive, setGlintActive] = useState(false);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: -100, y: -100 });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check coarse pointer or reduced motion
    const checkEnvironment = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isNarrow = window.innerWidth < 1024;
      setIsTouchOrReduced(isTouch || isReduced || isNarrow);
    };

    checkEnvironment();
    window.addEventListener('resize', checkEnvironment);

    const updateCursorPositions = () => {
      const x = posRef.current.x;
      const y = posRef.current.y;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (glintRef.current) {
        glintRef.current.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0) scale(1) rotate(45deg)`;
      }

      rafIdRef.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateCursorPositions);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkEnvironment);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isVisible]);

  // Trigger brief 120ms gem glint when entering a product or jewel target
  useEffect(() => {
    if (cursorState === 'view' || cursorState === 'add') {
      setGlintActive(true);
      const timer = setTimeout(() => setGlintActive(false), 140);
      return () => clearTimeout(timer);
    }
  }, [cursorState]);

  if (isTouchOrReduced || !isVisible) return null;

  const isExpanded = cursorState !== 'default';
  const displayText = cursorText || (cursorState !== 'default' ? cursorState.toUpperCase() : '');

  return (
    <>
      {/* 4px Center Gold Point (GPU translate3d via RAF) */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          opacity: isExpanded ? 0 : 1,
        }}
      />

      {/* Outer Ring / Interaction Capsule (GPU translate3d via RAF) */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isExpanded ? 'is-hovered' : ''}`}
      >
        {isExpanded && (
          <span className="select-none tracking-[0.2em] uppercase font-semibold text-[9px] text-[#C7A66A] animate-fade-in">
            {displayText}
          </span>
        )}
      </div>

      {/* Gem Glint Flash */}
      {glintActive && (
        <div
          ref={glintRef}
          className="gem-glint"
          style={{
            opacity: 1,
          }}
        />
      )}
    </>
  );
};

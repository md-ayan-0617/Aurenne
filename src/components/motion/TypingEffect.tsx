import React, { useState, useEffect, useRef } from 'react';

const words = ['GOLD.', 'LIGHT.', 'STONE.', 'TIME.'];

export const TypingEffect: React.FC = () => {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sparse floating spotlight particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{ x: number; y: number; size: number; speedY: number; opacity: number }> = [];
    for (let i = 0; i < 24; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.25 + 0.08),
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y < 0) p.y = height;
        ctx.fillStyle = `rgba(199, 166, 106, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Elegant typing rhythm
  useEffect(() => {
    if (isFinal) return;

    const targetWord = words[currentWordIdx];
    const typingSpeed = isDeleting ? 45 : 85;
    let deleteTimer: any = null;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayText(targetWord.slice(0, displayText.length + 1));
        if (displayText.length + 1 === targetWord.length) {
          if (currentWordIdx === words.length - 1) {
            // Reached final word: TIME. Stop deleting!
            setIsFinal(true);
          } else {
            // Pause before deleting
            deleteTimer = setTimeout(() => setIsDeleting(true), 800);
          }
        }
      } else {
        // Deleting
        setDisplayText(targetWord.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIdx((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => {
      clearTimeout(timer);
      if (deleteTimer) clearTimeout(deleteTimer);
    };
  }, [displayText, isDeleting, currentWordIdx, isFinal]);

  return (
    <section className="relative w-full py-36 md:py-48 bg-[#08090A] text-[#F1EDE5] overflow-hidden flex items-center justify-center select-none border-y border-[rgba(199,166,106,0.1)]">
      {/* Ambient Sparse Particle Dust Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Radial soft exhibition spotlight behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(199,166,106,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#777774] block mb-4">
          ART INSTALLATION 04 // TIME
        </span>

        <h2 className="font-['Bodoni_Moda'] text-[42px] sm:text-[68px] md:text-[96px] leading-[1.05] tracking-[-0.01em]">
          <span className="block text-[#9B9A96]">CRAFTED IN</span>
          <span className="inline-block mt-2 font-['Bodoni_Moda'] text-[#C7A66A]">
            {isFinal ? (
              <span className="font-['Newsreader'] italic font-normal text-[#F1EDE5]">
                TIME.
              </span>
            ) : (
              displayText
            )}
            {/* Elegant ultra-thin champagne cursor line */}
            <span className="inline-block w-[1.5px] h-[0.85em] bg-[#C7A66A] ml-2 align-middle animate-pulse" />
          </span>
        </h2>

        <p className="mt-8 font-['Space_Grotesk'] text-[13px] uppercase tracking-[0.22em] text-[#5A5B5E] max-w-md mx-auto">
          Gold, interrupted by light. Sculpted slowly to outlive generations.
        </p>
      </div>
    </section>
  );
};

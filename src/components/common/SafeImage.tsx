import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  luxuryFallbackCategory?: 'jewellery' | 'editorial' | 'atelier' | 'macro' | 'archive' | 'architecture';
  luxuryLabel?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  alt = 'Aurenne Joaillerie',
  className = '',
  luxuryFallbackCategory = 'jewellery',
  luxuryLabel,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // SVG Luxury procedurally generated fallbacks if network fails or images are blocked
  const getProceduralFallback = () => {
    const label = (luxuryLabel || alt || 'AURENNE').toUpperCase();
    const encodedSvg = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
        <defs>
          <radialGradient id="luxGlow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stop-color="#1B1C20"/>
            <stop offset="60%" stop-color="#0E0F12"/>
            <stop offset="100%" stop-color="#08090A"/>
          </radialGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E5CA92"/>
            <stop offset="50%" stop-color="#C7A66A"/>
            <stop offset="100%" stop-color="#98743F"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#luxGlow)"/>
        
        <!-- Architectural framing lines -->
        <line x1="40" y1="40" x2="760" y2="40" stroke="rgba(199,166,106,0.15)" stroke-width="1"/>
        <line x1="40" y1="960" x2="760" y2="960" stroke="rgba(199,166,106,0.15)" stroke-width="1"/>
        <line x1="40" y1="40" x2="40" y2="960" stroke="rgba(199,166,106,0.15)" stroke-width="1"/>
        <line x1="760" y1="40" x2="760" y2="960" stroke="rgba(199,166,106,0.15)" stroke-width="1"/>

        <!-- Central luxury jewellery silhouette -->
        <g transform="translate(400, 480)">
          <!-- Geometric Gem Outline -->
          <polygon points="0,-120 90,-40 60,110 -60,110 -90,-40" fill="none" stroke="url(#goldGradient)" stroke-width="1.8"/>
          <line x1="-90" y1="-40" x2="90" y2="-40" stroke="rgba(199,166,106,0.3)" stroke-width="1"/>
          <polygon points="0,-120 50,-40 30,110 -30,110 -50,-40" fill="none" stroke="rgba(199,166,106,0.4)" stroke-width="1"/>
          <circle cx="0" cy="-40" r="3" fill="#F1EDE5"/>
        </g>

        <!-- Brand Text -->
        <text x="50%" y="820" text-anchor="middle" font-family="'Bodoni Moda', serif" font-size="18" letter-spacing="7" fill="#C7A66A">AURENNE</text>
        <text x="50%" y="855" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="10" letter-spacing="3" fill="#777774">${label.slice(0, 32)}</text>
      </svg>
    `);
    return `data:image/svg+xml;utf8,${encodedSvg}`;
  };

  const imageSrc = hasError ? (fallbackSrc || getProceduralFallback()) : (src || getProceduralFallback());

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (!hasError) setHasError(true);
      }}
      onLoad={() => setIsLoaded(true)}
      className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-80'}`}
      {...props}
    />
  );
};

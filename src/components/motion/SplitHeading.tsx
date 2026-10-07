import React from 'react';
import { MaskReveal } from './MaskReveal';

interface SplitHeadingProps {
  primaryText: string;
  italicText?: string;
  secondaryText?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  accentColor?: string;
}

export const SplitHeading: React.FC<SplitHeadingProps> = ({
  primaryText,
  italicText,
  secondaryText,
  className = '',
  as = 'h2',
  accentColor = '#C7A66A',
}) => {
  const Component = as;

  return (
    <Component className={`tracking-[-0.015em] leading-[0.98] ${className}`}>
      <MaskReveal delay={0.05}>
        <span className="block font-['Bodoni_Moda'] uppercase text-current">
          {primaryText}
        </span>
      </MaskReveal>

      {italicText && (
        <MaskReveal delay={0.15}>
          <span
            style={{ color: accentColor }}
            className="block font-['Newsreader'] italic font-normal lowercase tracking-normal"
          >
            {italicText}
          </span>
        </MaskReveal>
      )}

      {secondaryText && (
        <MaskReveal delay={0.25}>
          <span className="block font-['Bodoni_Moda'] uppercase text-current">
            {secondaryText}
          </span>
        </MaskReveal>
      )}
    </Component>
  );
};

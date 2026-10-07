import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useUiStore } from '../../store/useUiStore';
import { SafeImage } from '../common/SafeImage';

interface ProductCardProps {
  product: Product;
  cardTheme?: 'dark' | 'light' | 'stone';
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cardTheme = 'dark',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { setCursor, resetCursor } = useUiStore();

  const isFavorited = isInWishlist(product.id);

  const getBgColor = () => {
    switch (cardTheme) {
      case 'light':
        return 'bg-[#F2EFE8]';
      case 'stone':
        return 'bg-[#E5DFD4]';
      default:
        return 'bg-[#121316]';
    }
  };

  return (
    <div
      className={`group relative flex flex-col has-glint ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursor('view', 'VIEW');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        resetCursor();
      }}
    >
      {/* Product Image Stage */}
      <Link
        to={`/piece/${product.slug}`}
        className={`relative aspect-[4/5] w-full overflow-hidden ${getBgColor()} transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1 border border-[rgba(199,166,106,0.1)]`}
      >
        {/* Primary Image */}
        <SafeImage
          src={product.images[0]}
          alt={product.name}
          luxuryLabel={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isHovered && product.altAngleImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Alternate Angle Image on Hover */}
        {product.altAngleImage && (
          <SafeImage
            src={product.altAngleImage}
            alt={`${product.name} alternate view`}
            luxuryLabel={`${product.name} alt`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
            }`}
          />
        )}

        {/* Gem Glint Flash Effect */}
        <div className="gem-glint top-6 right-6" />

        {/* Availability Tag */}
        {product.availability !== 'Available' && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[9px] uppercase font-mono tracking-[0.18em] bg-[#08090A]/80 text-[#C7A66A] backdrop-blur-sm border border-[rgba(199,166,106,0.2)]">
            {product.availability}
          </span>
        )}
      </Link>

      {/* Heart / Wishlist Toggle */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-[#08090A]/40 hover:bg-[#08090A] text-[#F1EDE5]"
      >
        <svg
          className={`w-4 h-4 transition-all ${
            isFavorited
              ? 'fill-[#C7A66A] stroke-[#C7A66A]'
              : 'fill-transparent stroke-current hover:stroke-[#C7A66A]'
          }`}
          viewBox="0 0 24 24"
          strokeWidth="1.6"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Product Metadata */}
      <div className="pt-4 flex flex-col gap-1">
        <div className="flex justify-between items-baseline">
          <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.24em] text-[#C7A66A]">
            AURENNE
          </span>
          <span className="font-mono text-[11px] text-[#777774]">
            {product.collection}
          </span>
        </div>

        <Link
          to={`/piece/${product.slug}`}
          className="font-['Bodoni_Moda'] text-[18px] md:text-[20px] text-current group-hover:text-[#C7A66A] transition-colors leading-tight"
        >
          {product.name}
        </Link>

        <div className="flex justify-between items-baseline pt-1">
          <span className="text-[12px] font-['Space_Grotesk'] text-[#777774]">
            {product.materials[0]} {product.stones[0] ? `• ${product.stones[0].slice(0, 16)}` : ''}
          </span>
          <span className="font-mono text-[13px] text-current font-medium">
            {product.currency}
            {product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

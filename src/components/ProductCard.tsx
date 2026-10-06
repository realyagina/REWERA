import React, { useState } from 'react';
import { Heart, Plus, Sparkles, Eye } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { formatIDR } from '../utils/format';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateToProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct
  } = useShop();

  const [imageError, setImageError] = useState(false);
  const isSaved = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to the first size and color
    const defaultSize = product.sizes[0] || 'One Size';
    const defaultColor = product.colors[0]?.name || 'Natural';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigateToProduct(product)}
      className="group cursor-pointer flex flex-col h-full transition-all duration-300"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full bg-[#F3EFE9] overflow-hidden rounded-sm transition-transform duration-500 ease-out">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F5EFE6] to-[#ECE5D8] text-[#615A50]">
            <Sparkles size={28} className="mb-2 text-[#7A8C74]" />
            <span className="font-serif text-lg italic text-[#2C2926]">{product.name}</span>
            <span className="text-xs uppercase tracking-wider mt-1 text-[#8C8477]">{product.material}</span>
          </div>
        )}

        {/* Subtle Text Tag (Zero-Pill discipline: quiet unboxed text) */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#24211E] text-[11px] uppercase tracking-widest font-medium px-2.5 py-1">
            Bestseller
          </div>
        )}
        {!product.isBestSeller && product.isNew && (
          <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#5D6B57] text-[11px] uppercase tracking-widest font-medium px-2.5 py-1">
            New Arrival
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isSaved
              ? 'bg-[#24211E] text-white shadow-sm'
              : 'bg-white/80 backdrop-blur-xs text-[#2C2926] hover:bg-white'
          }`}
        >
          <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={1.75} />
        </button>

        {/* Quick Actions Hover Drawer (Desktop) */}
        <div className="absolute bottom-0 inset-x-0 p-3 flex gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-[#24211E] text-[#FAF8F5] text-xs uppercase tracking-wider py-2.5 px-3 font-medium hover:bg-[#3B3632] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus size={14} />
            Quick Add
          </button>
          <button
            onClick={handleQuickView}
            className="w-10 bg-white/90 backdrop-blur-xs text-[#24211E] py-2.5 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            aria-label="Quick preview"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Product Metadata (Quiet, elegant typographic hierarchy) */}
      <div className="pt-3.5 pb-2 flex flex-col flex-grow">
        {/* Category & Materials note (Unboxed text with typographic dot) */}
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#7A746B] font-medium mb-1 truncate">
          <span>{product.category}</span>
          <span aria-hidden="true" className="text-[#B5ACA0]">·</span>
          <span className="truncate text-[#5D6B57]">{product.wasteDivertedKg}kg fabric saved</span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-[17px] text-[#24211E] font-medium group-hover:text-[#5D6B57] transition-colors leading-snug line-clamp-1">
          {product.name}
        </h3>

        {/* Pricing with Tabular Numerals */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[14px] font-medium text-[#24211E] tabular-nums tracking-tight">
            {formatIDR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] text-[#8C8477] line-through tabular-nums">
              {formatIDR(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Available Sizes List (Quiet inline dots) */}
        <div className="mt-2 text-[11px] text-[#8C8477] flex items-center gap-1.5">
          <span>Sizes:</span>
          <span className="font-medium text-[#504A41]">{product.sizes.join(' · ')}</span>
        </div>
      </div>
    </div>
  );
};

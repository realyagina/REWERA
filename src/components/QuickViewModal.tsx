import React, { useState } from 'react';
import { X, Heart, Plus, Minus, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatIDR } from '../utils/format';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    navigateToProduct
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0] || 'One Size';
  const currentColor = selectedColor || quickViewProduct.colors[0]?.name || 'Natural';
  const isSaved = wishlist.includes(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentSize, currentColor, quantity);
    setQuickViewProduct(null);
  };

  const handleFullView = () => {
    navigateToProduct(quickViewProduct);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1E1B18]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-sm shadow-2xl border border-[#2C2926]/10 overflow-hidden relative">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#24211E] rounded-full transition-colors"
          aria-label="Close preview"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-[#ECE5D8] overflow-hidden">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/90 px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#5D6B57] font-medium">
              {quickViewProduct.wasteDivertedKg}kg waste diverted
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#7A746B] font-medium">
                {quickViewProduct.category}
              </div>

              <h2 className="font-serif text-2xl text-[#24211E] mt-1 font-medium leading-snug">
                {quickViewProduct.name}
              </h2>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-semibold text-[#24211E] tabular-nums">
                  {formatIDR(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-[#8C8477] line-through tabular-nums">
                    {formatIDR(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#666057] mt-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Material */}
              <div className="mt-4 p-3 bg-[#F4EFE7] rounded-xs text-xs text-[#504A41]">
                <strong className="text-[#24211E] font-medium block mb-0.5">Material & Provenance</strong>
                {quickViewProduct.material}
              </div>

              {/* Colors */}
              {quickViewProduct.colors.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs text-[#504A41] mb-2 font-medium">
                    Tone: <span className="font-semibold text-[#24211E]">{currentColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          currentColor === c.name ? 'border-[#24211E] scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              <div className="mt-4">
                <div className="text-xs text-[#504A41] mb-2 font-medium">Select Size</div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs px-3.5 py-1.5 border transition-all ${
                        currentSize === s
                          ? 'border-[#24211E] bg-[#24211E] text-white font-medium'
                          : 'border-[#2C2926]/20 bg-white text-[#24211E] hover:border-[#24211E]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#2C2926]/20 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-2 text-[#504A41] hover:text-[#1E1B18]"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-xs font-semibold px-2 tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-2 text-[#504A41] hover:text-[#1E1B18]"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#24211E] text-[#FAF8F5] py-2.5 px-4 text-xs uppercase tracking-wider font-medium hover:bg-[#3B3632] transition-colors"
                >
                  Add to Bag
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-2.5 border border-[#2C2926]/20 transition-colors ${
                    isSaved ? 'bg-[#24211E] text-white' : 'bg-white text-[#24211E] hover:bg-[#F3EFE9]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button
                onClick={handleFullView}
                className="w-full text-center text-xs text-[#7A746B] hover:text-[#24211E] underline pt-1"
              >
                View Full Product Details & Sustainability Story →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

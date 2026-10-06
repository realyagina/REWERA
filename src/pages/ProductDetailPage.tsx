import React, { useState } from 'react';
import { ArrowLeft, Heart, Plus, Minus, ShieldCheck, Droplets, Recycle, Sparkles, Share2, Ruler } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { formatIDR } from '../utils/format';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC<{ onOpenSizeGuide: () => void }> = ({ onOpenSizeGuide }) => {
  const {
    selectedProduct,
    setCurrentPage,
    addToCart,
    wishlist,
    toggleWishlist,
    showToast
  } = useShop();

  const product = selectedProduct || PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'One Size');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Natural');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'sustainability' | 'care'>('details');

  const isSaved = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on REWERA Sustainable Fashion`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  // Related products from same category or featured
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between border-b border-[#2C2926]/10 pb-4 text-xs text-[#7A746B]">
        <button
          onClick={() => setCurrentPage('shop')}
          className="flex items-center gap-1.5 hover:text-[#24211E] transition-colors font-medium uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          <span>Back to Collection</span>
        </button>

        <div className="flex items-center gap-2">
          <span>Home</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-[#24211E] font-medium truncate max-w-[150px]">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid: Gallery Left, Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Large Gallery Stage */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] bg-[#F3EFE9] overflow-hidden rounded-xs border border-[#2C2926]/8">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Impact Metric Float */}
            <div className="absolute bottom-4 left-4 bg-[#FAF8F5]/95 backdrop-blur-xs px-3.5 py-2 text-xs border border-[#2C2926]/10 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[#5D6B57] font-semibold">
                <Recycle size={14} />
                {product.wasteDivertedKg}kg waste diverted
              </span>
              <span className="text-[#8C8477]">·</span>
              <span className="flex items-center gap-1.5 text-[#5D6B57] font-semibold">
                <Droplets size={14} />
                {product.waterSavedLiters}L water saved
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div>
            {/* Category kicker */}
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold mb-2">
              <span>{product.category}</span>
              <button
                onClick={handleShare}
                className="text-[#7A746B] hover:text-[#24211E] flex items-center gap-1 lowercase tracking-normal text-[11px]"
              >
                <Share2 size={13} />
                <span>share</span>
              </button>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl text-[#24211E] font-normal leading-tight">
              {product.name}
            </h1>

            {/* Price with Tabular Numerals */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-semibold text-[#24211E] tabular-nums">
                {formatIDR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#8C8477] line-through tabular-nums">
                  {formatIDR(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-[#5D6B57] font-medium bg-[#E8EDE6] px-2 py-0.5">
                Handcrafted Deadstock
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-[#504A41]">
                <span className="font-medium">
                  Natural Tone: <strong className="text-[#24211E] font-semibold">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor === c.name ? 'border-[#24211E] scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={`Select ${c.name}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-[#504A41]">
              <span className="font-medium">
                Size: <strong className="text-[#24211E] font-semibold">{selectedSize}</strong>
              </span>
              <button
                onClick={onOpenSizeGuide}
                className="text-[#24211E] underline hover:text-[#5D6B57] flex items-center gap-1 font-medium"
              >
                <Ruler size={13} />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`text-xs px-4 py-2.5 border transition-all ${
                    selectedSize === s
                      ? 'border-[#24211E] bg-[#24211E] text-white font-medium'
                      : 'border-[#2C2926]/20 bg-white text-[#24211E] hover:border-[#24211E]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Actions */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#2C2926]/20 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3.5 text-[#504A41] hover:text-[#1E1B18]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="text-xs font-semibold px-3 tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3.5 text-[#504A41] hover:text-[#1E1B18]"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#24211E] hover:bg-[#38332E] text-[#FAF8F5] py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-sm"
              >
                Add to Bag
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 border border-[#2C2926]/20 transition-colors ${
                  isSaved ? 'bg-[#24211E] text-white' : 'bg-white text-[#24211E] hover:bg-[#F3EFE9]'
                }`}
                aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Delivery & Sustainability Guarantee Box */}
          <div className="p-4 bg-[#F2EDE5] rounded-xs border border-[#2C2926]/8 space-y-2 text-xs text-[#504A41]">
            <div className="flex items-center gap-2 font-medium text-[#24211E]">
              <ShieldCheck size={16} className="text-[#5D6B57]" />
              <span>Complimentary Carbon-Neutral Shipping on orders over Rp 500.000</span>
            </div>
            <p className="text-[11px] text-[#666057] pl-6">
              Packaged in 100% biodegradable cassava polybags with post-consumer recycled paper tape.
            </p>
          </div>

          {/* Informational Tabs: Details, Sustainability, Care */}
          <div className="border-t border-[#2C2926]/10 pt-4">
            <div className="flex border-b border-[#2C2926]/10 text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 mr-6 transition-colors ${
                  activeTab === 'details'
                    ? 'border-b-2 border-[#24211E] text-[#24211E]'
                    : 'text-[#7A746B] hover:text-[#24211E]'
                }`}
              >
                Design & Fit
              </button>
              <button
                onClick={() => setActiveTab('sustainability')}
                className={`pb-2 mr-6 transition-colors ${
                  activeTab === 'sustainability'
                    ? 'border-b-2 border-[#24211E] text-[#24211E]'
                    : 'text-[#7A746B] hover:text-[#24211E]'
                }`}
              >
                Circularity Story
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 transition-colors ${
                  activeTab === 'care'
                    ? 'border-b-2 border-[#24211E] text-[#24211E]'
                    : 'text-[#7A746B] hover:text-[#24211E]'
                }`}
              >
                Garment Care
              </button>
            </div>

            <div className="pt-4 text-xs text-[#504A41] leading-relaxed">
              {activeTab === 'details' && (
                <ul className="space-y-2 list-disc list-inside">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                  <li>Material composition: {product.material}</li>
                </ul>
              )}

              {activeTab === 'sustainability' && (
                <div className="space-y-3">
                  <p>{product.sustainabilityNote}</p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#FAF8F5] border border-[#2C2926]/10">
                      <span className="block text-[11px] text-[#7A746B]">Water Conserved</span>
                      <strong className="text-sm text-[#5D6B57]">{product.waterSavedLiters} Liters</strong>
                    </div>
                    <div className="p-3 bg-[#FAF8F5] border border-[#2C2926]/10">
                      <span className="block text-[11px] text-[#7A746B]">Fabric Rescued</span>
                      <strong className="text-sm text-[#5D6B57]">{product.wasteDivertedKg} Kilograms</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-2">
                  <p>{product.careInstructions}</p>
                  <p className="text-[11px] text-[#7A746B]">
                    Proper care extends the lifespan of upcycled natural fibers, keeping textile waste out of landfills for generations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Recommendation */}
      <div className="pt-12 border-t border-[#2C2926]/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold block mb-1">
              Complete the Look
            </span>
            <h2 className="font-serif text-3xl text-[#24211E]">
              You May Also Like
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

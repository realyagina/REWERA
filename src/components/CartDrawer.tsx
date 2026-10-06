import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatIDR } from '../utils/format';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
    navigateToProduct
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500000;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progressPercent = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    if (promoCode.trim().toUpperCase() === 'REWERA10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Sustainable First Order discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'BALI20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Resort Season discount applied!');
    } else {
      setPromoError('Invalid code. Try "REWERA10" for 10% off.');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#1E1B18]/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col h-full border-l border-[#2C2926]/10">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#2C2926]/10 flex items-center justify-between bg-[#F5EFE6]">
            <div>
              <h2 className="font-serif text-xl text-[#24211E] tracking-wide">Your Shopping Bag</h2>
              <p className="text-xs text-[#7A746B] mt-0.5">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} · Rescuing textiles
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#464139] hover:text-[#1E1B18] transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Tier */}
          <div className="bg-[#EFEAE1] px-6 py-3 border-b border-[#2C2926]/10 text-xs">
            <div className="flex items-center justify-between mb-1.5 text-[#504A41]">
              <span>
                {amountToFreeShipping === 0 ? (
                  <strong className="text-[#4E5C49] font-medium">✓ Complimentary Indonesia shipping unlocked!</strong>
                ) : (
                  <>Add <span className="font-semibold text-[#24211E]">{formatIDR(amountToFreeShipping)}</span> for free courier delivery</>
                )}
              </span>
              <span className="font-medium tabular-nums">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#DDD6C8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#5D6B57] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#7A746B]">
                <Sparkles size={36} className="text-[#8F877B] mb-3 stroke-[1.25]" />
                <h3 className="font-serif text-xl text-[#24211E] mb-1">Your bag is empty</h3>
                <p className="text-xs max-w-xs mb-6 text-[#6B655C]">
                  Discover our upcycled resort dresses and deadstock essentials crafted for your next chapter.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#24211E] text-white text-xs uppercase tracking-widest px-6 py-3 font-medium hover:bg-[#3B3632] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 pb-4 border-b border-[#2C2926]/8 group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xs bg-[#ECE5D8] shrink-0 cursor-pointer"
                    onClick={() => {
                      navigateToProduct(item.product);
                      setIsCartOpen(false);
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            navigateToProduct(item.product);
                            setIsCartOpen(false);
                          }}
                          className="font-serif text-[15px] font-medium text-[#24211E] hover:text-[#5D6B57] transition-colors cursor-pointer leading-snug line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-[#968E82] hover:text-[#A96F57] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7A746B] mt-1 space-x-2">
                        <span>Size: <strong className="text-[#24211E] font-medium">{item.selectedSize}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>Tone: <strong className="text-[#24211E] font-medium">{item.selectedColor}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#2C2926]/15 rounded-xs bg-[#F5EFE6]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                          className="p-1 px-2 text-[#504A41] hover:text-[#1E1B18] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-semibold px-2 tabular-nums text-[#24211E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                          className="p-1 px-2 text-[#504A41] hover:text-[#1E1B18] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-xs font-medium text-[#24211E] tabular-nums">
                        {formatIDR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="px-6 py-5 bg-[#F5EFE6] border-t border-[#2C2926]/10 space-y-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. REWERA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 bg-[#FAF8F5] border border-[#2C2926]/15 rounded-xs uppercase tracking-wider text-[#24211E] placeholder-[#9C9487] focus:outline-none focus:border-[#2C2926]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs uppercase tracking-wider bg-[#3B3632] text-white hover:bg-[#24211E] transition-colors font-medium rounded-xs"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-[#A96F57]">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] text-[#5D6B57] font-medium">{promoSuccess}</p>}

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 pt-2 text-xs text-[#666057]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#24211E] tabular-nums">{formatIDR(cartTotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#5D6B57]">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">- {formatIDR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Domestic Courier</span>
                  <span className="font-medium text-[#24211E] tabular-nums">
                    {amountToFreeShipping === 0 ? 'Complimentary' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#2C2926]/10 text-sm font-semibold text-[#24211E]">
                  <span>Total Due</span>
                  <span className="font-serif text-lg tabular-nums">{formatIDR(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#24211E] hover:bg-[#36322E] text-[#FAF8F5] py-3.5 px-4 text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A746B] pt-1">
                <ShieldCheck size={14} className="text-[#5D6B57]" />
                <span>Zero-waste packaging · 14-day free returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

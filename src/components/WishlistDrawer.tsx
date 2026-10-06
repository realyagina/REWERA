import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { formatIDR } from '../utils/format';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    navigateToProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-[#1E1B18]/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col h-full border-l border-[#2C2926]/10">
          <div className="px-6 py-5 border-b border-[#2C2926]/10 flex items-center justify-between bg-[#F5EFE6]">
            <div>
              <h2 className="font-serif text-xl text-[#24211E]">Saved Pieces</h2>
              <p className="text-xs text-[#7A746B] mt-0.5">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-[#464139] hover:text-[#1E1B18] transition-colors"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#7A746B]">
                <h3 className="font-serif text-xl text-[#24211E] mb-1">No saved items yet</h3>
                <p className="text-xs max-w-xs mb-6 text-[#6B655C]">
                  Click the heart icon on any piece you love to save it for your next outfit curation.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-[#24211E] text-white text-xs uppercase tracking-widest px-6 py-3 font-medium hover:bg-[#3B3632]"
                >
                  Browse Pieces
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div key={product.id} className="flex gap-4 pb-4 border-b border-[#2C2926]/8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-xs bg-[#ECE5D8] shrink-0 cursor-pointer"
                    onClick={() => {
                      navigateToProduct(product);
                      setIsWishlistOpen(false);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            navigateToProduct(product);
                            setIsWishlistOpen(false);
                          }}
                          className="font-serif text-sm font-medium text-[#24211E] hover:text-[#5D6B57] cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[#968E82] hover:text-[#A96F57] p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-xs font-medium text-[#24211E] mt-1 tabular-nums">
                        {formatIDR(product.price)}
                      </p>
                      <p className="text-[11px] text-[#7A746B] mt-0.5 line-clamp-1">
                        {product.material}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          addToCart(product, product.sizes[0], product.colors[0]?.name || 'Natural', 1);
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs uppercase tracking-wider text-[#24211E] font-medium hover:text-[#5D6B57] flex items-center gap-1.5"
                      >
                        <ShoppingBag size={13} />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

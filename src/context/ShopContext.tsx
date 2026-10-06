import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, PageView, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  navigateToProduct: (product: Product) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateQuantity: (productId: string, size: string, color: string, delta: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Global Promo & Discount
  promoCode: string;
  discountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  discountAmount: number;
  finalTotal: number;
  
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  
  // Filter & Search helpers for Shop
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rewera_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rewera_wishlist');
      return saved ? JSON.parse(saved) : ['rew-001', 'rew-002'];
    } catch {
      return ['rew-001', 'rew-002'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global promo state
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'REWERA10') {
      setPromoCode('REWERA10');
      setDiscountPercent(10);
      showToast('Kupon diskon 10% berhasil diterapkan!');
      return { success: true, message: 'Diskon 10% pesanan berkelanjutan berhasil diterapkan!' };
    } else if (clean === 'BALI20') {
      setPromoCode('BALI20');
      setDiscountPercent(20);
      showToast('Kupon diskon 20% berhasil diterapkan!');
      return { success: true, message: 'Diskon 20% musim resort berhasil diterapkan!' };
    } else {
      return { success: false, message: 'Kode kupon tidak valid. Gunakan "REWERA10" untuk diskon 10%.' };
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    showToast('Kupon diskon dihapus');
  };

  useEffect(() => {
    try {
      localStorage.setItem('rewera_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('rewera_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, size: string, color: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size && item.selectedColor === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved items');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        navigateToProduct,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        discountPercent,
        applyPromoCode,
        removePromoCode,
        discountAmount,
        finalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PageView } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    setActiveCategory
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Our Story', page: 'story' },
    { label: 'Sustainability', page: 'sustainability' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('shop');
      setShowSearchInput(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#2C2926]/8 transition-all">
      {/* Slim Brand Announcement Banner */}
      {!bannerDismissed && (
        <div className="bg-[#2C2926] text-[#FAF8F5] text-[11px] sm:text-xs tracking-wider uppercase py-2 px-4 flex items-center justify-between">
          <div className="mx-auto flex items-center gap-2 text-center truncate">
            <span className="font-medium tracking-widest text-[#E6DFD5]">Rewear. Reimagine. Recreate.</span>
            <span className="hidden sm:inline text-white/40">·</span>
            <span className="hidden sm:inline text-white/80">Complimentary carbon-neutral courier on orders over Rp 500.000</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-white/60 hover:text-white p-0.5 ml-2 transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Main Top Bar: One-Row, Three-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Brand Title (Single Text Element Wordmark) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2C2926] hover:text-[#5D6B57] transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button
            onClick={() => handleNavClick('home')}
            className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-normal text-[#24211E] uppercase hover:opacity-85 transition-opacity"
          >
            REWERA
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean text with subtle underline) */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.14em] uppercase font-medium text-[#504B45]">
          {navLinks.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative py-1 transition-colors hover:text-[#1E1B18] ${
                  isActive ? 'text-[#1E1B18] font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1E1B18] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Search, Saved, Bag) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Bar / Icon */}
          <div className="relative">
            {showSearchInput ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search pieces, linen, dresses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-36 sm:w-56 text-xs px-3 py-1.5 bg-[#F3EFE9] border border-[#2C2926]/15 rounded-full text-[#24211E] placeholder-[#8F877B] focus:outline-none focus:border-[#2C2926]"
                />
                <button
                  type="button"
                  onClick={() => setShowSearchInput(false)}
                  className="p-1.5 ml-1 text-[#666057] hover:text-[#1E1B18]"
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-[#464139] hover:text-[#1E1B18] transition-colors"
                aria-label="Search collection"
              >
                <Search size={19} strokeWidth={1.75} />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-[#464139] hover:text-[#1E1B18] transition-colors relative"
            aria-label="View saved pieces"
          >
            <Heart size={19} strokeWidth={1.75} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7A8C74] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 pl-2.5 pr-3 text-[#1E1B18] bg-[#F2EDE5] hover:bg-[#EAE2D7] rounded-full flex items-center gap-2 text-xs font-medium tracking-wide transition-colors"
            aria-label="View shopping bag"
          >
            <ShoppingBag size={18} strokeWidth={1.75} />
            <span className="text-xs font-semibold tabular-nums">{cartCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2C2926]/10 bg-[#FAF8F5] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left text-base uppercase tracking-wider py-2 font-medium flex items-center justify-between border-b border-[#2C2926]/5 ${
                  currentPage === item.page ? 'text-[#1E1B18] font-semibold' : 'text-[#666057]'
                }`}
              >
                {item.label}
                <ArrowRight size={16} className="text-[#8F877B]" />
              </button>
            ))}
          </nav>

          <div className="pt-2 text-xs text-[#7A746B] space-y-2">
            <p className="font-serif italic text-sm text-[#464139]">“Fashion deserves a second life.”</p>
            <div className="flex gap-4 pt-1">
              <button
                onClick={() => {
                  setActiveCategory('Resort Wear');
                  handleNavClick('shop');
                }}
                className="text-[#2C2926] underline text-xs font-medium"
              >
                Resort Wear Edit
              </button>
              <button
                onClick={() => {
                  setActiveCategory('Dresses');
                  handleNavClick('shop');
                }}
                className="text-[#2C2926] underline text-xs font-medium"
              >
                Upcycled Dresses
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

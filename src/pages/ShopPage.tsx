import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCategory, Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'bestselling'>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');

  const categories: ProductCategory[] = [
    'All',
    'Tops',
    'Dresses',
    'Bottoms',
    'Resort Wear',
    'Accessories'
  ];

  const allSizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'One Size'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const categoryMatch =
        activeCategory === 'All' ||
        product.category === activeCategory ||
        (product.secondaryCategories && product.secondaryCategories.includes(activeCategory));

      // Search match
      const searchMatch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase());

      // Size match
      const sizeMatch =
        selectedSizeFilter === 'All' ||
        product.sizes.includes(selectedSizeFilter);

      return categoryMatch && searchMatch && sizeMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'bestselling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // featured default
    });
  }, [activeCategory, searchQuery, selectedSizeFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-[#2C2926]/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold block mb-2">
            The Conscious Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#24211E] font-normal tracking-tight">
            Shop the Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#666057] mt-2 max-w-xl">
            Each garment is individually crafted from salvaged deadstock bolts, surplus suiting cuts, and botanical dyes. Limited quantities per textile run.
          </p>
        </div>

        {/* Live Filter Counter */}
        <div className="text-xs text-[#7A746B] tabular-nums">
          Showing <span className="font-semibold text-[#24211E]">{filteredProducts.length}</span> pieces
        </div>
      </div>

      {/* Filter and Category Controls */}
      <div className="space-y-4">
        {/* Category Tabs (Segmented controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-all rounded-xs ${
                  isActive
                    ? 'bg-[#24211E] text-white shadow-xs'
                    : 'bg-[#F2EDE5] text-[#504A41] hover:bg-[#E8E1D5]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Search, Size, Sorting */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          {/* Active Search & Clear */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search materials or styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-7 py-2 bg-white border border-[#2C2926]/15 rounded-xs text-[#24211E] placeholder-[#8F877B] focus:outline-none focus:border-[#24211E]"
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-[#8F877B]" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-[#8F877B] hover:text-[#24211E]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Size Filter Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-[#666057]">
              <span className="hidden sm:inline">Size:</span>
              <select
                value={selectedSizeFilter}
                onChange={(e) => setSelectedSizeFilter(e.target.value)}
                className="bg-white border border-[#2C2926]/15 text-xs px-2.5 py-2 rounded-xs focus:outline-none focus:border-[#24211E] text-[#24211E]"
              >
                {allSizes.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Sizes' : `Size ${s}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-[#666057]">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#2C2926]/15 text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-[#24211E] text-[#24211E] font-medium"
            >
              <option value="featured">Featured Curations</option>
              <option value="bestselling">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#F5EFE6] rounded-xs border border-[#2C2926]/10">
          <h3 className="font-serif text-2xl text-[#24211E]">No garments found</h3>
          <p className="text-xs text-[#7A746B] max-w-sm mx-auto">
            Try adjusting your search criteria or explore other categories in our upcycled archive.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
              setSelectedSizeFilter('All');
            }}
            className="text-xs uppercase tracking-wider bg-[#24211E] text-white px-5 py-2.5 font-medium hover:bg-[#3B3632]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Sustainable Craft Note */}
      <div className="mt-16 p-8 bg-[#F0EAE1] rounded-xs border border-[#2C2926]/8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#5D6B57] font-semibold block mb-1">
            Zero-Overproduction Promise
          </span>
          <h3 className="font-serif text-2xl text-[#24211E]">Can’t find your exact size?</h3>
          <p className="text-xs text-[#666057] mt-1 max-w-xl">
            Because we use salvaged deadstock fabrics, runs are limited to the meterage of each rescued roll. Sign up for waitlist notifications or explore custom atelier sizing.
          </p>
        </div>
        <button
          onClick={() => setActiveCategory('All')}
          className="bg-[#24211E] text-white text-xs uppercase tracking-wider px-6 py-3 font-medium hover:bg-[#3B3632] shrink-0"
        >
          Explore All Available Pieces
        </button>
      </div>
    </div>
  );
};

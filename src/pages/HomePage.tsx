import React from 'react';
import { ArrowRight, Sparkles, Droplets, Recycle, ShieldCheck, Heart, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, TESTIMONIALS, WHY_REWERA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { IMAGES } from '../assets/images';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setActiveCategory, navigateToProduct } = useShop();

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 3);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center bg-[#F3EFE9] overflow-hidden">
        {/* Background Editorial Image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.heroEditorial}
            alt="REWERA Sustainable Resort Collection in Bali"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_35%] scale-100"
          />
          {/* Measured Scrim for Media Overlays (WCAG contrast compliant) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1C19]/80 via-[#1F1C19]/40 to-transparent sm:bg-gradient-to-r sm:from-[#1F1C19]/85 sm:via-[#1F1C19]/45 sm:to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
          <div className="max-w-2xl text-white space-y-6">
            {/* Tagline kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6DFD5] font-medium">
              <span>Rewear</span>
              <span aria-hidden="true">·</span>
              <span>Reimagine</span>
              <span aria-hidden="true">·</span>
              <span>Recreate</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white drop-shadow-sm text-balance">
              FASHION DESERVES A SECOND LIFE.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#EAE4DC] font-light leading-relaxed max-w-lg">
              REWERA transforms forgotten fabrics into pieces made for your next chapter. Modern everyday and resort-inspired fashion engineered for conscious Gen Z women.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setCurrentPage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#FAF8F5] text-[#24211E] hover:bg-[#ECE4D8] px-8 py-4 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-200 text-center shadow-lg"
              >
                SHOP COLLECTION
              </button>

              <button
                onClick={() => {
                  setCurrentPage('story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="border border-white/60 text-white hover:bg-white hover:text-[#24211E] px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 text-center backdrop-blur-xs"
              >
                OUR STORY
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs text-[#EAE4DC]/80 font-light">
              <span className="flex items-center gap-1.5">
                <Recycle size={14} className="text-[#B5C2B1]" />
                100% Upcycled Deadstock
              </span>
              <span className="flex items-center gap-1.5">
                <Droplets size={14} className="text-[#B5C2B1]" />
                Non-Toxic Botanical Dyes
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#B5C2B1]" />
                Bali Artisan Stitched
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#2C2926]/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold block mb-1">
              Curated Edit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211E]">
              Featured Collection
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveCategory('All');
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs uppercase tracking-[0.15em] font-medium text-[#24211E] hover:text-[#5D6B57] flex items-center gap-1.5 group self-start md:self-auto"
          >
            <span>View All Pieces</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. SUSTAINABILITY STATEMENT & WHY REWERA */}
      <section className="bg-[#F2EDE5] py-16 sm:py-24 border-y border-[#2C2926]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Statement & Editorial Photo */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#5D6B57] font-semibold block">
                The REWERA Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#24211E] leading-tight text-balance">
                Textile waste isn’t trash. It’s an unfinished story.
              </h2>
              <p className="text-xs sm:text-sm text-[#5A544A] leading-relaxed">
                Every year, billions of meters of high-grade fabrics are discarded before ever reaching a hanger. We partner with small mills and garment makers across Indonesia to rescue deadstock rolls, unbleached linens, and vintage denim — turning neglected materials into sculpted silhouettes for your sunny days.
              </p>

              <div className="relative aspect-[4/3] rounded-xs overflow-hidden shadow-sm">
                <img
                  src={IMAGES.fabricsSustainability}
                  alt="Artisan studio fabrics and botanical dyes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/90 px-3 py-1 text-[11px] text-[#24211E] font-medium tracking-wide">
                  Atelier Archive · Gianyar, Bali
                </div>
              </div>
            </div>

            {/* Right Column: “Why REWERA?” Pillars */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <h3 className="font-serif text-2xl text-[#24211E] font-medium">Why REWERA?</h3>
                <p className="text-xs text-[#7A746B] mt-1">
                  How our slow fashion model creates radical beauty without taking from tomorrow.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {WHY_REWERA.map((item, idx) => (
                  <div
                    key={item.title}
                    className="p-6 bg-[#FAF8F5] rounded-xs border border-[#2C2926]/8 space-y-2 hover:border-[#2C2926]/20 transition-colors"
                  >
                    <div className="text-xs text-[#5D6B57] font-semibold tracking-wider uppercase">
                      0{idx + 1}. {item.subtitle}
                    </div>
                    <h4 className="font-serif text-xl text-[#24211E] font-medium">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#666057] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#2C2926]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-[#504A41]">
                  <ShieldCheck size={18} className="text-[#5D6B57]" />
                  <span>Verified 100% deadstock & post-consumer origin</span>
                </div>
                <button
                  onClick={() => {
                    setCurrentPage('sustainability');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs uppercase tracking-wider text-[#24211E] font-medium underline hover:text-[#5D6B57]"
                >
                  Read our full Sustainability Report →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#2C2926]/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold block mb-1">
              Most Loved
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211E]">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveCategory('Resort Wear');
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs uppercase tracking-[0.15em] font-medium text-[#24211E] hover:text-[#5D6B57] flex items-center gap-1.5 group self-start md:self-auto"
          >
            <span>Explore Resort Wear</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4-Column Grid for Bestsellers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL CAMPAIGN BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#24211E] text-[#FAF8F5] overflow-hidden rounded-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="p-8 sm:p-14 lg:col-span-7 space-y-5">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B5C2B1] font-medium">
                The Resort Edit
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                Designed for sun-drenched days, crafted from rescued threads.
              </h2>
              <p className="text-xs sm:text-sm text-[#C9BFB1] leading-relaxed max-w-lg">
                From airy wrap dresses to sculpted halter tops and wide-leg palazzos, our resort wear pairs timeless island ease with Gen Z architectural cuts.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveCategory('Resort Wear');
                    setCurrentPage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#FAF8F5] text-[#24211E] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#EAE4DC] transition-colors"
                >
                  Explore Resort Collection
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden">
              <img
                src={IMAGES.productLinenDress}
                alt="Aura Linen Resort Dress"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold block mb-1">
            Community Love
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#24211E]">
            What Conscious Women Say
          </h2>
          <p className="text-xs text-[#7A746B] mt-2">
            Real stories from our Gen Z community across Indonesia who choose to rewear and reimagine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-7 bg-[#F6F2EB] rounded-xs border border-[#2C2926]/8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-[#5D6B57]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="font-serif italic text-base text-[#24211E] leading-relaxed">
                  {t.text}
                </p>
              </div>

              <div className="pt-6 border-t border-[#2C2926]/10 mt-6 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-medium text-[#24211E]">{t.name}, {t.age}</h4>
                  <p className="text-[11px] text-[#7A746B]">{t.city}</p>
                </div>
                <span className="text-[11px] text-[#5D6B57] bg-[#E8EDE6] px-2 py-0.5 font-medium">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

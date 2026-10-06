import React from 'react';
import { ArrowRight, Recycle, Sparkles, Heart, Users, MapPin, Feather } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { IMAGES } from '../assets/images';

export const OurStoryPage: React.FC = () => {
  const { setCurrentPage } = useShop();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Header Banner */}
      <section className="bg-[#F2EDE5] border-b border-[#2C2926]/10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#5D6B57] font-semibold block">
            Rewear · Reimagine · Recreate
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#24211E] font-normal leading-tight text-balance">
            The Story Behind REWERA
          </h1>
          <p className="text-sm sm:text-base text-[#615A50] leading-relaxed max-w-2xl mx-auto font-light">
            The global fashion system discards millions of tons of pristine textiles every year. We believe that fashion should never cost the earth — and that every forgotten fabric deserves a second life.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Section 1: Our Beginning */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold block">
              01. Provenance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211E]">
              Our Beginning
            </h2>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
              REWERA was conceived when our founder walked through the back alleys of garment warehouses in West Java and Bali. Mountains of unused fabric bolts — cancelled fashion orders, over-dyed linen runs, pristine suiting offcuts — were boxed up, destined for open burning or overflowing landfills.
            </p>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
              At the same time, young Gen Z women were searching for elevated resort silhouettes and stylish everyday pieces that aligned with their environmental values without feeling like unshaped sackcloth.
            </p>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed font-medium text-[#24211E]">
              We started with a single sewing table in Gianyar, turning 15 meters of reclaimed linen into sculpted wrap dresses. That was the spark of REWERA.
            </p>
          </div>

          <div className="md:col-span-6 relative aspect-[4/3] rounded-xs overflow-hidden shadow-sm">
            <img
              src={IMAGES.heroEditorial}
              alt="REWERA Founders in Bali"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/90 px-3 py-1 text-[11px] text-[#24211E] font-medium">
              Gianyar, Bali · Where it began
            </div>
          </div>
        </section>

        {/* Section 2: Our Materials */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 md:order-2 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold block">
              02. Fabric Sourcing
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211E]">
              Our Materials
            </h2>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
              We never produce or purchase virgin textiles. Every single thread in a REWERA piece falls into three conscious categories:
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-[#F5EFE6] rounded-xs border border-[#2C2926]/8">
                <strong className="text-xs font-semibold text-[#24211E] block mb-1">
                  1. Mill Deadstock & End-of-Rolls
                </strong>
                <p className="text-xs text-[#666057]">
                  Surplus luxury fabrics abandoned when commercial fashion labels cancel orders or order excess safety margins.
                </p>
              </div>

              <div className="p-4 bg-[#F5EFE6] rounded-xs border border-[#2C2926]/8">
                <strong className="text-xs font-semibold text-[#24211E] block mb-1">
                  2. Atelier Cutting Scraps
                </strong>
                <p className="text-xs text-[#666057]">
                  Precision pieces rescued from Indonesian tailoring houses and bridal studios, engineered into corsets, hair scarves, and accessories.
                </p>
              </div>

              <div className="p-4 bg-[#F5EFE6] rounded-xs border border-[#2C2926]/8">
                <strong className="text-xs font-semibold text-[#24211E] block mb-1">
                  3. Upcycled Post-Consumer Textiles
                </strong>
                <p className="text-xs text-[#666057]">
                  Pre-loved vintage denim and heritage cotton shirts disassembled, hand-cleaned, and reconstructed into modern mini skirts and vests.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 md:order-1 relative aspect-[4/3] rounded-xs overflow-hidden shadow-sm">
            <img
              src={IMAGES.fabricsSustainability}
              alt="Reclaimed deadstock fabrics and natural dyes"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/90 px-3 py-1 text-[11px] text-[#24211E] font-medium">
              100% Zero Virgin Fabrics
            </div>
          </div>
        </section>

        {/* Section 3: Our Mission */}
        <section className="bg-[#24211E] text-[#FAF8F5] p-8 sm:p-14 rounded-xs">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B5C2B1] font-semibold">
              03. Purpose
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              Our Mission
            </h2>
            <blockquote className="font-serif italic text-lg sm:text-2xl text-[#EAE4DC] leading-relaxed">
              “To make circular fashion the indisputable first choice for the next generation, by delivering silhouettes so captivating that customers choose them for their beauty first, and their sustainable soul forever.”
            </blockquote>
            <p className="text-xs sm:text-sm text-[#A8A196] leading-relaxed max-w-xl mx-auto">
              We reject the false compromise between looking chic and living sustainably. Through intelligent zero-waste pattern-cutting and artisanal Balinese craftsmanship, we show that the most beautiful clothes on earth can heal the earth.
            </p>
          </div>
        </section>

        {/* Section 4: Our Impact */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold block mb-1">
              04. Accountability
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211E]">
              Our Real-World Impact
            </h2>
            <p className="text-xs text-[#7A746B] mt-2">
              Every garment sold represents measurable metric diversion from Indonesian landfills.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-6 bg-[#F6F2EB] rounded-xs border border-[#2C2926]/8">
              <span className="font-serif text-3xl sm:text-4xl text-[#24211E] block font-medium tabular-nums">
                2,480+
              </span>
              <span className="text-xs uppercase tracking-wider text-[#5D6B57] font-semibold block mt-1">
                Kilograms Rescued
              </span>
              <span className="text-[11px] text-[#7A746B] mt-1 block">
                Of high-grade fabric diverted from landfills
              </span>
            </div>

            <div className="p-6 bg-[#F6F2EB] rounded-xs border border-[#2C2926]/8">
              <span className="font-serif text-3xl sm:text-4xl text-[#24211E] block font-medium tabular-nums">
                184,000L
              </span>
              <span className="text-xs uppercase tracking-wider text-[#5D6B57] font-semibold block mt-1">
                Freshwater Saved
              </span>
              <span className="text-[11px] text-[#7A746B] mt-1 block">
                Zero virgin cotton agricultural irrigation
              </span>
            </div>

            <div className="p-6 bg-[#F6F2EB] rounded-xs border border-[#2C2926]/8">
              <span className="font-serif text-3xl sm:text-4xl text-[#24211E] block font-medium tabular-nums">
                32
              </span>
              <span className="text-xs uppercase tracking-wider text-[#5D6B57] font-semibold block mt-1">
                Artisan Livelihoods
              </span>
              <span className="text-[11px] text-[#7A746B] mt-1 block">
                Empowered female tailors in Bali with fair wages
              </span>
            </div>

            <div className="p-6 bg-[#F6F2EB] rounded-xs border border-[#2C2926]/8">
              <span className="font-serif text-3xl sm:text-4xl text-[#24211E] block font-medium tabular-nums">
                100%
              </span>
              <span className="text-xs uppercase tracking-wider text-[#5D6B57] font-semibold block mt-1">
                Plastic-Free
              </span>
              <span className="text-[11px] text-[#7A746B] mt-1 block">
                Cassava polybags and coconut husk buttons
              </span>
            </div>
          </div>
        </section>

        {/* Story CTA */}
        <div className="p-8 sm:p-12 bg-[#F2EDE5] rounded-xs text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#24211E]">
            Wear clothes that write a better future.
          </h3>
          <p className="text-xs sm:text-sm text-[#666057] max-w-md mx-auto">
            Explore our curated collections of upcycled linen dresses, corsets, and resort wear.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#24211E] text-white px-8 py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#3B3632]"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Droplets, Recycle, Leaf, Users, RefreshCw, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SustainabilityPage: React.FC = () => {
  const { setCurrentPage } = useShop();

  // Interactive Impact Calculator state
  const [piecesPurchased, setPiecesPurchased] = useState<number>(3);

  // Estimations based on REWERA life-cycle analysis
  const calculatedWater = piecesPurchased * 1150; // liters
  const calculatedWaste = (piecesPurchased * 0.52).toFixed(1); // kg
  const calculatedCarbon = (piecesPurchased * 3.8).toFixed(1); // kg CO2e

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Header */}
      <section className="bg-[#EDE7DE] border-b border-[#2C2926]/10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#5D6B57] font-semibold block">
            Regenerative Living
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#24211E] font-normal leading-tight text-balance">
            Our Sustainability Architecture
          </h1>
          <p className="text-sm sm:text-base text-[#615A50] leading-relaxed max-w-2xl mx-auto font-light">
            We don’t believe in buzzwords or offsetting excuses. True sustainability is radical reduction at the source: transforming unwanted deadstock and closing the textile loop permanently.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Interactive Impact Estimator */}
        <section className="bg-[#FAF8F5] p-6 sm:p-10 rounded-xs border border-[#2C2926]/12 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#5D6B57] font-semibold block mb-1">
              Interactive Tool
            </span>
            <h2 className="font-serif text-3xl text-[#24211E]">
              Calculate Your Upcycled Footprint
            </h2>
            <p className="text-xs text-[#7A746B] mt-1">
              See the real environmental savings of choosing REWERA over virgin fast-fashion items.
            </p>
          </div>

          {/* Slider */}
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs text-[#504A41] font-medium">
              <span>If you choose REWERA for:</span>
              <span className="font-serif text-xl font-semibold text-[#24211E] tabular-nums">
                {piecesPurchased} {piecesPurchased === 1 ? 'Garment' : 'Garments'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={piecesPurchased}
              onChange={(e) => setPiecesPurchased(parseInt(e.target.value, 10))}
              className="w-full accent-[#5D6B57] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#8C8477]">
              <span>1 item (starter)</span>
              <span>6 items (wardrobe edit)</span>
              <span>12 items (full season)</span>
            </div>
          </div>

          {/* Metrics Output */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 bg-[#F4EFE7] rounded-xs border border-[#2C2926]/8 text-center space-y-1">
              <Droplets size={22} className="text-[#5D6B57] mx-auto mb-1" />
              <div className="font-serif text-3xl font-semibold text-[#24211E] tabular-nums">
                {calculatedWater.toLocaleString('id-ID')} L
              </div>
              <div className="text-xs font-medium text-[#24211E]">Freshwater Conserved</div>
              <div className="text-[11px] text-[#7A746B]">Equal to {Math.round(calculatedWater / 2)} days of drinking water</div>
            </div>

            <div className="p-5 bg-[#F4EFE7] rounded-xs border border-[#2C2926]/8 text-center space-y-1">
              <Recycle size={22} className="text-[#5D6B57] mx-auto mb-1" />
              <div className="font-serif text-3xl font-semibold text-[#24211E] tabular-nums">
                {calculatedWaste} kg
              </div>
              <div className="text-xs font-medium text-[#24211E]">Textile Scrap Diverted</div>
              <div className="text-[11px] text-[#7A746B]">Prevented from polluting Bali waterways</div>
            </div>

            <div className="p-5 bg-[#F4EFE7] rounded-xs border border-[#2C2926]/8 text-center space-y-1">
              <Leaf size={22} className="text-[#5D6B57] mx-auto mb-1" />
              <div className="font-serif text-3xl font-semibold text-[#24211E] tabular-nums">
                {calculatedCarbon} kg
              </div>
              <div className="text-xs font-medium text-[#24211E]">CO₂e Emissions Prevented</div>
              <div className="text-[11px] text-[#7A746B]">By skipping virgin fiber manufacturing</div>
            </div>
          </div>
        </section>

        {/* Pillar 1: Upcycling & Deadstock */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#5D6B57] font-semibold">
              <Recycle size={15} />
              <span>Rescued Textiles</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211E]">
              Deadstock & Upcycled Sourcing
            </h2>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
              When international fast-fashion brands cancel purchase orders or over-estimate dye batches, rolls of first-quality linen, modal, and cupro are frequently discarded. We intercept these textiles directly from Indonesian mills.
            </p>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
              Because deadstock yardage is strictly limited, each release is an exclusive micro-batch. Once a fabric roll is exhausted, that exact print or weave is retired forever.
            </p>
          </div>

          <div className="md:col-span-6 p-6 bg-[#F5EFE6] rounded-xs border border-[#2C2926]/10 space-y-3">
            <h4 className="font-serif text-lg text-[#24211E]">Our Sourcing Rules</h4>
            <div className="space-y-2 text-xs text-[#504A41]">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#5D6B57] shrink-0 mt-0.5" />
                <span>Zero virgin petroleum synthetics (virgin polyester, acrylic, or nylon).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#5D6B57] shrink-0 mt-0.5" />
                <span>Prioritize natural fibers: linen, organic cotton, TENCEL™, and cupro.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#5D6B57] shrink-0 mt-0.5" />
                <span>Transparent origin mapping for every individual batch.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pillar 2: Zero-Waste Pattern Engineering */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 md:order-2 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#5D6B57] font-semibold">
              <Sparkles size={15} />
              <span>Precision Cutting</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211E]">
              Zero-Waste Pattern Cutting
            </h2>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
              In conventional clothing manufacturing, up to 15% of fabric is tossed straight onto the floor as cutting room waste. At REWERA, our pattern engineers design garments like interlocking geometric tessellations.
            </p>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
              Any unavoidable micro-scraps left over are immediately sorted into our micro-collection: sewn into our Ayu Silk Scrunchies, interior garment bias bindings, pocket linings, and seedling pouches.
            </p>
          </div>

          <div className="md:col-span-6 md:order-1 relative aspect-[4/3] rounded-xs overflow-hidden">
            <img
              src="/src/assets/images/editorial_sustainability_fabrics_1791265896549.jpg"
              alt="Pattern cutting and fabric rolls"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Pillar 3: The Rewear Loop */}
        <section className="bg-[#24211E] text-white p-8 sm:p-12 rounded-xs space-y-8">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B5C2B1] font-medium">
              <RefreshCw size={15} />
              <span>Circularity Program</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              The Rewear Loop
            </h2>
            <p className="text-xs sm:text-sm text-[#D4CCC0] leading-relaxed">
              When you’re ready for your next style chapter, your REWERA piece shouldn’t sit in a closet. Return any pre-loved REWERA garment to receive 15% credit toward your next purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-5 bg-[#2E2A27] rounded-xs border border-[#3E3834] space-y-2">
              <span className="text-xs font-semibold text-[#B5C2B1] block">Step 01</span>
              <h4 className="font-serif text-lg text-white">Send It Back</h4>
              <p className="text-xs text-[#A8A196]">
                Ship your gently worn REWERA garment back with our complimentary prepaid shipping label.
              </p>
            </div>

            <div className="p-5 bg-[#2E2A27] rounded-xs border border-[#3E3834] space-y-2">
              <span className="text-xs font-semibold text-[#B5C2B1] block">Step 02</span>
              <h4 className="font-serif text-lg text-white">Reimagined</h4>
              <p className="text-xs text-[#A8A196]">
                Our Gianyar studio cleans, repairs, botanically over-dyes, or reconstructs the piece for our vintage archive.
              </p>
            </div>

            <div className="p-5 bg-[#2E2A27] rounded-xs border border-[#3E3834] space-y-2">
              <span className="text-xs font-semibold text-[#B5C2B1] block">Step 03</span>
              <h4 className="font-serif text-lg text-white">15% Reward</h4>
              <p className="text-xs text-[#A8A196]">
                You receive instant store credit to invest in another piece crafted for your next journey.
              </p>
            </div>
          </div>
        </section>

        {/* Pillar 4: Botanical Dyes & Bali Artisan Community */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#F5EFE6] rounded-xs border border-[#2C2926]/8 space-y-3">
            <Leaf size={24} className="text-[#5D6B57]" />
            <h3 className="font-serif text-2xl text-[#24211E]">
              Botanical Plant Dyes
            </h3>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
              We replace petroleum synthetic dyes with natural extracts from indigenous Indonesian flora: fallen Ketapang leaves, indigofera plants, and mahogany bark. This zero-toxic bath water is safely returned to nourish banana groves.
            </p>
          </div>

          <div className="p-8 bg-[#F5EFE6] rounded-xs border border-[#2C2926]/8 space-y-3">
            <Users size={24} className="text-[#5D6B57]" />
            <h3 className="font-serif text-2xl text-[#24211E]">
              Bali Artisan Partnerships
            </h3>
            <p className="text-xs sm:text-sm text-[#504A41] leading-relaxed">
              Our clothes are hand-assembled by cooperative studios in Gianyar and Tabanan. Every maker receives transparent living wages (2.5x regional minimum wage), health coverage, and flexible childcare-friendly hours.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#24211E] text-white px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#3B3632] transition-colors"
          >
            Shop the Upcycled Collection
          </button>
        </div>
      </div>
    </div>
  );
};

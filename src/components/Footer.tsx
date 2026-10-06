import React, { useState } from 'react';
import { ArrowRight, Instagram, Mail, MapPin, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PageView } from '../types';

export const Footer: React.FC<{ onOpenSizeGuide: () => void }> = ({ onOpenSizeGuide }) => {
  const { setCurrentPage, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      showToast('Welcome to REWERA. Check your inbox for 10% off your first upcycled piece.');
      setNewsletterEmail('');
    }
  };

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24211E] text-[#FAF8F5] pt-16 pb-12 border-t border-[#36322E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#36322E]">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-3xl tracking-[0.25em] font-normal uppercase block text-white">
              REWERA
            </span>
            <p className="font-serif italic text-base text-[#D4CCC0] max-w-sm">
              “Fashion deserves a second life.”
            </p>
            <p className="text-xs text-[#A39B8F] leading-relaxed max-w-md">
              REWERA transforms forgotten deadstock textiles and garment mill ends into modern everyday and resort pieces for conscious Gen Z women. Ethically hand-crafted with Bali artisan studios.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#C2B9AC]">
              <MapPin size={14} className="text-[#8F9B88]" />
              <span>Studio & Atelier: Gianyar & Denpasar, Bali, Indonesia</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#E6DFD5]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#A39B8F]">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors"
                >
                  Shop Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('story')}
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sustainability')}
                  className="hover:text-white transition-colors"
                >
                  Sustainability & Impact
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors"
                >
                  Sizing Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Consciousness / Values (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#E6DFD5]">
              Circularity
            </h4>
            <ul className="space-y-2 text-xs text-[#A39B8F]">
              <li>
                <button
                  onClick={() => navigateTo('sustainability')}
                  className="hover:text-white transition-colors text-left"
                >
                  The Rewear Loop
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sustainability')}
                  className="hover:text-white transition-colors text-left"
                >
                  Deadstock Sourcing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sustainability')}
                  className="hover:text-white transition-colors text-left"
                >
                  Zero-Waste Cutting
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('story')}
                  className="hover:text-white transition-colors text-left"
                >
                  Artisan Livelihoods
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#E6DFD5]">
              Conscious Dispatch
            </h4>
            <p className="text-xs text-[#A39B8F] leading-relaxed">
              Receive private drop invites for limited deadstock runs, upcycling stories, and exclusive subscriber perks.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#323630] border border-[#5D6B57]/40 text-xs text-[#B5C2B1] rounded-xs">
                ✓ You’re on the guest list. Check your email for code <strong>REWERA10</strong>.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#1A1816] border border-[#3E3934] px-3 py-2 text-xs text-white placeholder-[#787167] focus:outline-none focus:border-[#FAF8F5]"
                  />
                  <button
                    type="submit"
                    className="bg-[#FAF8F5] text-[#24211E] px-3.5 hover:bg-[#EAE4DC] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
                <span className="text-[10px] text-[#7A746B] block">
                  Zero spam. Only intentional releases.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A746B] gap-4">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} REWERA Fashion Ltd.</span>
            <span>·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[#A39B8F]">
            <span className="tracking-widest uppercase text-[11px] text-[#8F9B88]">
              Rewear. Reimagine. Recreate.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

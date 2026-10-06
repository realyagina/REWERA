import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { Check } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, toastMessage } = useShop();
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#24211E] selection:bg-[#E2D9CC] selection:text-[#1F1D1A]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'pdp' && (
          <ProductDetailPage onOpenSizeGuide={() => setSizeGuideOpen(true)} />
        )}
        {currentPage === 'story' && <OurStoryPage />}
        {currentPage === 'sustainability' && <SustainabilityPage />}
      </main>

      {/* Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      {/* Footer */}
      <Footer onOpenSizeGuide={() => setSizeGuideOpen(true)} />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#24211E] text-[#FAF8F5] px-4 py-3 text-xs tracking-wide shadow-xl flex items-center gap-2.5 border border-[#3E3934] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-4 h-4 rounded-full bg-[#5D6B57] flex items-center justify-center shrink-0">
            <Check size={10} className="text-white" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

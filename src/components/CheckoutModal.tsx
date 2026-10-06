import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, QrCode, Building2, Package, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatIDR } from '../utils/format';
import { ReweraLogoMark } from './ReweraLogo';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    clearCart,
    setCurrentPage
  } = useShop();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [orderId, setOrderId] = useState('');
  
  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Denpasar',
    province: 'Bali',
    postalCode: '',
    courier: 'jne_eco',
    paymentMethod: 'qris',
    notes: ''
  });

  if (!isCheckoutOpen) return null;

  const shippingCost = cartTotal >= 500000 ? 0 : 25000;
  const grandTotal = cartTotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `RWR-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newOrderId);
    setStep('success');
    clearCart();
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setStep('details');
    setCurrentPage('home');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1E1B18]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-sm shadow-2xl border border-[#2C2926]/10 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-[#F5EFE6] border-b border-[#2C2926]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ReweraLogoMark size={22} />
            <span className="font-serif text-lg tracking-widest uppercase font-semibold text-[#24211E]">REWERA</span>
            <span className="text-xs text-[#7A746B]">·</span>
            <span className="text-xs tracking-wider uppercase text-[#7A746B]">
              {step === 'details' ? 'Eco-Checkout' : 'Order Receipt'}
            </span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#504A41] hover:text-[#1E1B18] transition-colors"
            aria-label="Close checkout"
          >
            <X size={18} />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            {/* Order Items Preview */}
            <div className="bg-[#F3EFE9] p-4 rounded-xs border border-[#2C2926]/5 space-y-2">
              <div className="text-xs font-medium text-[#7A746B] uppercase tracking-wider">
                Order Summary ({cart.length} unique pieces)
              </div>
              <div className="max-h-36 overflow-y-auto divide-y divide-[#2C2926]/5 pr-1">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-medium text-[#24211E]">{item.product.name}</span>
                      <span className="text-[#7A746B] ml-2">({item.selectedSize} · x{item.quantity})</span>
                    </div>
                    <span className="tabular-nums font-medium text-[#24211E]">
                      {formatIDR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#2C2926]/10 flex items-center justify-between text-sm font-semibold text-[#24211E]">
                <span>Total Amount</span>
                <span className="font-serif text-base tabular-nums">{formatIDR(grandTotal)}</span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-semibold text-[#24211E] border-b border-[#2C2926]/10 pb-1">
                1. Delivery Destination
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#504A41] font-medium mb-1">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Maya Indah"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#2C2926]"
                  />
                </div>
                <div>
                  <label className="block text-[#504A41] font-medium mb-1">WhatsApp / Phone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+62 812-3456-7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#2C2926]"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-[#504A41] font-medium mb-1">Email Address (for tracking) *</label>
                <input
                  required
                  type="email"
                  placeholder="maya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#2C2926]"
                />
              </div>

              <div className="text-xs">
                <label className="block text-[#504A41] font-medium mb-1">Street Address & Villa/Apartment *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Jl. Pantai Batu Bolong No. 42, Canggu"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#2C2926]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[#504A41] font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#2C2926]"
                  />
                </div>
                <div>
                  <label className="block text-[#504A41] font-medium mb-1">Province</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#2C2926]"
                  />
                </div>
                <div>
                  <label className="block text-[#504A41] font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    placeholder="80361"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#2C2926]"
                  />
                </div>
              </div>
            </div>

            {/* Courier Selection */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-semibold text-[#24211E] border-b border-[#2C2926]/10 pb-1">
                2. Carbon-Neutral Shipping
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <label className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between ${
                  formData.courier === 'jne_eco' ? 'border-[#24211E] bg-[#F3EFE9]' : 'border-[#2C2926]/15 bg-white'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="courier"
                      checked={formData.courier === 'jne_eco'}
                      onChange={() => setFormData({ ...formData, courier: 'jne_eco' })}
                      className="accent-[#24211E]"
                    />
                    <span className="font-medium text-[#24211E]">JNE Eco Green</span>
                  </div>
                  <span className="text-[#7A746B] text-[11px]">2–3 days delivery</span>
                </label>

                <label className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between ${
                  formData.courier === 'sicepat' ? 'border-[#24211E] bg-[#F3EFE9]' : 'border-[#2C2926]/15 bg-white'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="courier"
                      checked={formData.courier === 'sicepat'}
                      onChange={() => setFormData({ ...formData, courier: 'sicepat' })}
                      className="accent-[#24211E]"
                    />
                    <span className="font-medium text-[#24211E]">SiCepat Best</span>
                  </div>
                  <span className="text-[#7A746B] text-[11px]">1–2 days delivery</span>
                </label>

                <label className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between ${
                  formData.courier === 'gosend' ? 'border-[#24211E] bg-[#F3EFE9]' : 'border-[#2C2926]/15 bg-white'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="courier"
                      checked={formData.courier === 'gosend'}
                      onChange={() => setFormData({ ...formData, courier: 'gosend' })}
                      className="accent-[#24211E]"
                    />
                    <span className="font-medium text-[#24211E]">GoSend Bali</span>
                  </div>
                  <span className="text-[#7A746B] text-[11px]">Same-day (Bali area)</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-semibold text-[#24211E] border-b border-[#2C2926]/10 pb-1">
                3. Payment Method
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'qris', label: 'QRIS Instant', icon: QrCode },
                  { id: 'bca', label: 'BCA Virtual', icon: Building2 },
                  { id: 'mandiri', label: 'Mandiri VA', icon: Building2 },
                  { id: 'card', label: 'Credit Card', icon: CreditCard }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: item.id })}
                      className={`p-3 border rounded-xs flex flex-col items-center justify-center gap-1.5 transition-colors ${
                        formData.paymentMethod === item.id
                          ? 'border-[#24211E] bg-[#24211E] text-white'
                          : 'border-[#2C2926]/15 bg-white text-[#504A41] hover:bg-[#F3EFE9]'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-[11px] font-medium tracking-wide">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#24211E] text-[#FAF8F5] py-4 text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#3B3632] transition-colors flex items-center justify-center gap-2"
              >
                <span>Confirm & Place Order ({formatIDR(grandTotal)})</span>
                <ArrowRight size={15} />
              </button>
              <p className="text-center text-[11px] text-[#7A746B] mt-2">
                By placing this order, you support circular fashion & fair Indonesian artisan livelihoods.
              </p>
            </div>
          </form>
        ) : (
          /* Confirmation Receipt View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#E8EDE6] text-[#5D6B57] rounded-full mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#5D6B57] font-semibold">Payment Verified</span>
              <h2 className="font-serif text-3xl text-[#24211E] mt-1">Thank You, {formData.fullName || 'Conscious Shopper'}</h2>
              <p className="text-xs text-[#7A746B] mt-2 max-w-md mx-auto">
                Your order has been recorded. Our Gianyar atelier is preparing your upcycled pieces inside 100% biodegradable cassava packaging.
              </p>
            </div>

            <div className="bg-[#F5EFE6] p-5 rounded-xs border border-[#2C2926]/10 text-xs text-left max-w-md mx-auto space-y-2.5">
              <div className="flex justify-between border-b border-[#2C2926]/8 pb-2">
                <span className="text-[#7A746B]">Order Number:</span>
                <span className="font-mono font-semibold text-[#24211E]">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-[#2C2926]/8 pb-2">
                <span className="text-[#7A746B]">Delivery Destination:</span>
                <span className="font-medium text-[#24211E] text-right truncate max-w-[220px]">
                  {formData.address || 'Denpasar, Bali'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#2C2926]/8 pb-2">
                <span className="text-[#7A746B]">Carbon Offset:</span>
                <span className="font-medium text-[#5D6B57]">100% Offset via EcoBali</span>
              </div>
              <div className="flex justify-between pt-1 font-semibold text-sm text-[#24211E]">
                <span>Total Settled:</span>
                <span className="tabular-nums font-serif text-base">{formatIDR(grandTotal)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleFinish}
                className="w-full bg-[#24211E] text-white py-3 px-6 text-xs uppercase tracking-wider font-medium hover:bg-[#3B3632] transition-colors"
              >
                Continue Exploring REWERA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

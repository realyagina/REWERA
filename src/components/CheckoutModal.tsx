import React, { useState, useEffect, useRef } from 'react';
import {
  X, CheckCircle2, ShieldCheck, Truck, CreditCard, QrCode,
  Building2, Package, ArrowRight, ArrowLeft, Copy, Check, Clock,
  AlertCircle, Download, Printer, Phone, Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatIDR } from '../utils/format';
import { ReweraLogoMark } from './ReweraLogo';
import { ProductImageWithColor } from './ProductImageWithColor';
import { OrderSnapshot, CartItem } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    discountAmount,
    discountPercent,
    promoCode,
    clearCart,
    setCurrentPage,
    showToast
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 minutes for QRIS/VA
  const [lastOrder, setLastOrder] = useState<OrderSnapshot | null>(null);

  // Form reference for error scrolling
  const formRef = useRef<HTMLFormElement>(null);

  // Shipping form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Denpasar',
    province: 'Bali',
    postalCode: '80361',
    courier: 'jne_eco',
    paymentMethod: 'qris',
    notes: ''
  });

  // Credit card form fields
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [validationError, setValidationError] = useState('');

  // Reset step to 'shipping' whenever modal is opened with items in cart
  useEffect(() => {
    if (isCheckoutOpen) {
      if (cart.length > 0 && step === 'success') {
        setStep('shipping');
      }
      setValidationError('');
    }
  }, [isCheckoutOpen]);

  // Countdown timer for pending payment in step 2
  useEffect(() => {
    let interval: any;
    if (step === 'payment' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timerSeconds]);

  if (!isCheckoutOpen) return null;

  // Courier pricing
  const courierMap: Record<string, { name: string; cost: number; time: string }> = {
    jne_eco: { name: 'JNE Eco Green', cost: 25000, time: '2–3 hari kerja' },
    sicepat: { name: 'SiCepat Best Eco', cost: 30000, time: '1–2 hari kerja' },
    gosend: { name: 'GoSend Bali Instant', cost: 40000, time: 'Same-day (Hari ini)' }
  };

  const isFreeShipping = (cartTotal - discountAmount) >= 500000;
  const currentCourierCost = isFreeShipping ? 0 : (courierMap[formData.courier]?.cost ?? 25000);
  const currentSubtotal = Math.max(0, cartTotal - discountAmount);
  const currentGrandTotal = currentSubtotal + currentCourierCost;

  // Autofill demo data helper for easy testing
  const handleAutofillDemo = () => {
    setFormData((prev) => ({
      ...prev,
      fullName: 'Maya Indah Lestari',
      email: 'maya.lestari@gmail.com',
      phone: '081234567890',
      address: 'Jl. Pantai Batu Bolong No. 42, Banjar Canggu',
      city: 'Badung / Canggu',
      province: 'Bali',
      postalCode: '80361',
      notes: 'Tolong titipkan di pos satpam bila rumah kosong'
    }));
    setValidationError('');
    showToast('Data pengiriman demo otomatis terisi');
  };

  // Autofill card demo helper
  const handleAutofillCard = () => {
    setCardData({
      number: '4242 4242 4242 4242',
      expiry: '12/28',
      cvv: '888',
      name: formData.fullName.toUpperCase() || 'MAYA INDAH LESTARI'
    });
    showToast('Data kartu demo berhasil diisi');
  };

  // Step 1 Validation & Proceed to Payment
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setValidationError('Silakan isi Nama Lengkap Anda dengan benar.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setValidationError('Silakan masukkan Nomor WhatsApp/Telepon yang valid (minimal 9 digit).');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Silakan masukkan alamat Email yang valid untuk konfirmasi resi.');
      return;
    }

    if (!formData.address.trim() || formData.address.trim().length < 6) {
      setValidationError('Silakan isi Alamat Pengiriman lengkap (jalan, nomor rumah, RT/RW).');
      return;
    }

    if (!formData.city.trim() || !formData.province.trim()) {
      setValidationError('Silakan lengkapi Kota dan Provinsi pengiriman.');
      return;
    }

    setStep('payment');
    // Scroll to top of modal for payment view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Finalize payment simulation
  const handleConfirmPayment = () => {
    setValidationError('');

    if (formData.paymentMethod === 'card') {
      const cleanCard = cardData.number.replace(/\s/g, '');
      if (cleanCard.length < 15) {
        setValidationError('Silakan masukkan nomor kartu kredit/debit 16 digit yang valid.');
        return;
      }
      if (!cardData.expiry || !cardData.expiry.includes('/') || cardData.expiry.length < 5) {
        setValidationError('Silakan masukkan masa berlaku kartu yang valid (format MM/YY).');
        return;
      }
      if (!cardData.cvv || cardData.cvv.length < 3) {
        setValidationError('Silakan masukkan 3 digit kode CVV di belakang kartu.');
        return;
      }
      if (!cardData.name.trim()) {
        setValidationError('Silakan masukkan nama pemilik kartu.');
        return;
      }
    }

    setIsProcessingPayment(true);

    const generatedId = `RWR-${Math.floor(10000 + Math.random() * 90000)}`;

    const methodNames: Record<string, string> = {
      qris: 'QRIS Instant (GoPay, OVO, Dana, BCA Mobile)',
      bca: 'BCA Virtual Account',
      mandiri: 'Mandiri Virtual Account',
      bri: 'BRI / BNI Virtual Account',
      card: 'Kartu Kredit / Debit (Visa / Mastercard)',
      cod: 'COD (Bayar di Tempat saat barang tiba)'
    };

    // Save snapshot of current order BEFORE clearing the cart
    const orderSnapshot: OrderSnapshot = {
      orderId: generatedId,
      items: [...cart],
      subtotal: cartTotal,
      discountAmount,
      discountPercent,
      promoCode,
      shippingFee: currentCourierCost,
      courier: formData.courier,
      courierName: courierMap[formData.courier]?.name || 'JNE Eco Green',
      grandTotal: currentGrandTotal,
      customerName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      postalCode: formData.postalCode,
      paymentMethod: formData.paymentMethod,
      paymentMethodName: methodNames[formData.paymentMethod] || 'QRIS Instant',
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setTimeout(() => {
      setIsProcessingPayment(false);
      setLastOrder(orderSnapshot);
      setStep('success');
      clearCart();
      showToast(`Pesanan #${generatedId} berhasil dikonfirmasi!`);
    }, 1200);
  };

  const handleCopyVA = (vaNumber: string) => {
    navigator.clipboard?.writeText(vaNumber);
    setCopiedVA(true);
    showToast('Nomor Virtual Account disalin ke clipboard');
    setTimeout(() => setCopiedVA(false), 2500);
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopiedOrderId(true);
    showToast('Nomor pesanan disalin ke clipboard');
    setTimeout(() => setCopiedOrderId(false), 2500);
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setStep('shipping');
    setCurrentPage('shop');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1E1B18]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-sm shadow-2xl border border-[#2C2926]/10 overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#F5EFE6] border-b border-[#2C2926]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ReweraLogoMark size={24} />
            <span className="font-serif text-lg tracking-widest uppercase font-semibold text-[#24211E]">REWERA</span>
            <span className="text-xs text-[#7A746B]">·</span>
            <span className="text-xs tracking-wider uppercase text-[#7A746B] font-medium">
              {step === 'shipping' && '1. Alamat Pengiriman'}
              {step === 'payment' && '2. Proses Pembayaran'}
              {step === 'success' && 'Bukti Pembayaran / Invoice'}
            </span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#504A41] hover:text-[#1E1B18] transition-colors cursor-pointer"
            aria-label="Tutup pembayaran"
          >
            <X size={18} />
          </button>
        </div>

        {/* Empty Cart Safeguard (Only when not viewing success receipt) */}
        {cart.length === 0 && step !== 'success' ? (
          <div className="p-10 text-center space-y-4">
            <Package size={36} className="text-[#8C8477] mx-auto mb-2" />
            <h3 className="font-serif text-2xl text-[#24211E]">Keranjang Belanja Anda Kosong</h3>
            <p className="text-xs text-[#7A746B] max-w-xs mx-auto">
              Silakan tambahkan pakaian ramah lingkungan ke tas belanja Anda terlebih dahulu untuk melanjutkan pembayaran.
            </p>
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setCurrentPage('shop');
              }}
              className="bg-[#24211E] text-white text-xs uppercase tracking-wider px-6 py-3 font-medium hover:bg-[#3B3632] cursor-pointer"
            >
              Jelajahi Koleksi REWERA
            </button>
          </div>
        ) : (
          <>
            {/* STEP 1: SHIPPING & CONTACT DETAILS */}
            {step === 'shipping' && (
              <form ref={formRef} onSubmit={handleProceedToPayment} className="p-6 space-y-6">
                
                {/* Order Summary Box with Item Previews */}
                <div className="bg-[#F3EFE9] p-4 rounded-xs border border-[#2C2926]/8 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-medium text-[#7A746B] uppercase tracking-wider">
                    <span>Ringkasan Tas Belanja ({cart.length} model)</span>
                    {promoCode && (
                      <span className="text-[#5D6B57] font-semibold">Kupon {promoCode} (-{discountPercent}%)</span>
                    )}
                  </div>
                  
                  <div className="max-h-40 overflow-y-auto divide-y divide-[#2C2926]/8 pr-1">
                    {cart.map((item) => {
                      const colorObj = item.product.colors.find(c => c.name === item.selectedColor);
                      return (
                        <div
                          key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                          className="py-2 flex items-center justify-between text-xs gap-3"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <div className="w-9 h-11 rounded-xs overflow-hidden shrink-0 border border-black/10">
                              <ProductImageWithColor
                                src={item.product.image}
                                alt={item.product.name}
                                colorHex={colorObj?.hex}
                                className="w-full h-full"
                              />
                            </div>
                            <div className="truncate">
                              <span className="font-medium text-[#24211E] truncate block">{item.product.name}</span>
                              <span className="text-[11px] text-[#7A746B] flex items-center gap-1.5 mt-0.5">
                                <span>Size: <strong>{item.selectedSize}</strong></span>
                                <span>·</span>
                                <span className="flex items-center gap-1">
                                  {colorObj && (
                                    <span className="w-2 h-2 rounded-full border border-black/20" style={{ backgroundColor: colorObj.hex }} />
                                  )}
                                  <strong>{item.selectedColor}</strong>
                                </span>
                                <span>·</span>
                                <span>x{item.quantity}</span>
                              </span>
                            </div>
                          </div>
                          <span className="tabular-nums font-medium text-[#24211E] shrink-0 text-right">
                            {formatIDR(item.product.price * item.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-[#2C2926]/10 space-y-1 text-xs">
                    <div className="flex justify-between text-[#666057]">
                      <span>Subtotal Produk</span>
                      <span className="tabular-nums font-medium text-[#24211E]">{formatIDR(cartTotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#5D6B57]">
                        <span>Diskon Kupon ({promoCode})</span>
                        <span className="tabular-nums font-medium">- {formatIDR(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#666057]">
                      <span>Ongkir Kurir ({courierMap[formData.courier]?.name})</span>
                      <span className="tabular-nums font-medium text-[#24211E]">
                        {isFreeShipping ? (
                          <span className="text-[#5D6B57] font-semibold">Gratis Ongkir (Order &gt; Rp500k)</span>
                        ) : (
                          formatIDR(currentCourierCost)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-[#2C2926]/10 text-sm font-semibold text-[#24211E]">
                      <span>Total Perkiraan Biaya</span>
                      <span className="font-serif text-base tabular-nums">{formatIDR(currentGrandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Validation Error Banner */}
                {validationError && (
                  <div className="p-3 bg-[#FDF2F0] border border-[#D98A77] rounded-xs flex items-center gap-2 text-xs text-[#9B3822] animate-in fade-in">
                    <AlertCircle size={16} className="shrink-0" />
                    <span className="font-medium">{validationError}</span>
                  </div>
                )}

                {/* Destination Inputs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#2C2926]/10 pb-1">
                    <h3 className="font-serif text-base font-semibold text-[#24211E]">
                      1. Tujuan Pengiriman &amp; Data Pembeli
                    </h3>
                    <button
                      type="button"
                      onClick={handleAutofillDemo}
                      className="text-[11px] text-[#5D6B57] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Sparkles size={12} />
                      <span>Isi Data Demo Otomatis</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#504A41] font-medium mb-1">Nama Lengkap Penerima *</label>
                      <input
                        type="text"
                        placeholder="cth. Maya Indah Lestari"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (validationError) setValidationError('');
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#24211E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#504A41] font-medium mb-1">Nomor WhatsApp / HP Aktif *</label>
                      <input
                        type="tel"
                        placeholder="0812-3456-7890"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (validationError) setValidationError('');
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#24211E]"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block text-[#504A41] font-medium mb-1">Alamat Email (untuk nomor resi &amp; invoice) *</label>
                    <input
                      type="email"
                      placeholder="maya@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (validationError) setValidationError('');
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#24211E]"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="block text-[#504A41] font-medium mb-1">Alamat Lengkap Pengiriman *</label>
                    <textarea
                      rows={2}
                      placeholder="Jl. Pantai Batu Bolong No. 42, Banjar Canggu"
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (validationError) setValidationError('');
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#24211E]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-[#504A41] font-medium mb-1">Kota / Kabupaten</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#24211E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#504A41] font-medium mb-1">Provinsi</label>
                      <input
                        type="text"
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#24211E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#504A41] font-medium mb-1">Kode Pos</label>
                      <input
                        type="text"
                        placeholder="80361"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#2C2926]/15 rounded-xs focus:outline-none focus:border-[#24211E]"
                      />
                    </div>
                  </div>
                </div>

                {/* Courier Selection */}
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-semibold text-[#24211E] border-b border-[#2C2926]/10 pb-1">
                    2. Pilihan Kurir Karbon-Netral
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    {Object.entries(courierMap).map(([id, info]) => {
                      const isSelected = formData.courier === id;
                      return (
                        <label
                          key={id}
                          className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-colors ${
                            isSelected ? 'border-[#24211E] bg-[#F3EFE9] ring-1 ring-[#24211E]' : 'border-[#2C2926]/15 bg-white hover:border-[#2C2926]/40'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <input
                              type="radio"
                              name="courier"
                              checked={isSelected}
                              onChange={() => setFormData({ ...formData, courier: id })}
                              className="accent-[#24211E]"
                            />
                            <span className="font-medium text-[#24211E]">{info.name}</span>
                          </div>
                          <span className="text-[#7A746B] text-[11px]">
                            {info.time} · {isFreeShipping ? 'Gratis' : formatIDR(info.cost)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button to Step 2 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#24211E] text-[#FAF8F5] py-4 text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#3B3632] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Lanjut ke Proses Pembayaran ({formatIDR(currentGrandTotal)})</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT METHOD & INTERACTIVE PAYMENT SCREEN */}
            {step === 'payment' && (
              <div className="p-6 space-y-6">
                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="flex items-center gap-1.5 text-xs text-[#7A746B] hover:text-[#24211E] font-medium cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Ubah Alamat Pengiriman</span>
                </button>

                {/* Payment Selection Tabs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#2C2926]/10 pb-2">
                    <h3 className="font-serif text-lg font-semibold text-[#24211E]">
                      Pilih Cara Pembayaran
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#8A5A44] font-medium">
                      <Clock size={13} />
                      <span className="tabular-nums">Berlaku: {formatTimer(timerSeconds)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'qris', label: 'QRIS Instant', icon: QrCode },
                      { id: 'bca', label: 'BCA Virtual Account', icon: Building2 },
                      { id: 'mandiri', label: 'Mandiri VA', icon: Building2 },
                      { id: 'bri', label: 'BRI / BNI VA', icon: Building2 },
                      { id: 'card', label: 'Kartu Kredit / Debit', icon: CreditCard },
                      { id: 'cod', label: 'COD (Bayar di Tempat)', icon: Truck }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = formData.paymentMethod === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, paymentMethod: item.id });
                            setValidationError('');
                          }}
                          className={`p-3 border rounded-xs flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-[#24211E] bg-[#24211E] text-white shadow-xs'
                              : 'border-[#2C2926]/15 bg-white text-[#504A41] hover:bg-[#F3EFE9]'
                          }`}
                        >
                          <Icon size={18} />
                          <span className="text-[11px] font-medium tracking-wide text-center">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Error message */}
                {validationError && (
                  <div className="p-3 bg-[#FDF2F0] border border-[#D98A77] rounded-xs flex items-center gap-2 text-xs text-[#9B3822] animate-in fade-in">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Total To Pay Highlight */}
                <div className="p-4 bg-[#F2EDE5] rounded-xs border border-[#2C2926]/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#7A746B] block">Total yang Harus Dibayar:</span>
                    <span className="font-serif text-2xl font-bold text-[#24211E] tabular-nums">
                      {formatIDR(currentGrandTotal)}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-[#5D6B57]">
                    <span>✓ Bebas Biaya Layanan &amp; Pajak</span>
                  </div>
                </div>

                {/* METHOD SPECIFIC INTERFACE */}
                {/* 1. QRIS Screen */}
                {formData.paymentMethod === 'qris' && (
                  <div className="p-5 bg-white border border-[#2C2926]/15 rounded-xs space-y-4 text-center">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#5D6B57] font-semibold">QRIS Nasional</span>
                      <h4 className="font-serif text-lg text-[#24211E]">Scan Kode QR untuk Membayar</h4>
                      <p className="text-[11px] text-[#7A746B]">
                        Mendukung GoPay, OVO, Dana, BCA Mobile, ShopeePay, LinkAja, Livin', dll.
                      </p>
                    </div>

                    {/* QR Code Graphic Box */}
                    <div className="w-56 h-56 mx-auto bg-white p-3 border-2 border-[#24211E] rounded-xs shadow-sm flex flex-col items-center justify-center relative">
                      <div className="absolute top-2 left-2 text-[10px] font-bold text-[#24211E]">QRIS</div>
                      <div className="w-44 h-44 bg-[#F8F6F2] p-2 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Corner registration squares */}
                          <rect x="5" y="5" width="25" height="25" fill="#24211E" />
                          <rect x="10" y="10" width="15" height="15" fill="#F8F6F2" />
                          <rect x="14" y="14" width="7" height="7" fill="#24211E" />

                          <rect x="70" y="5" width="25" height="25" fill="#24211E" />
                          <rect x="75" y="10" width="15" height="15" fill="#F8F6F2" />
                          <rect x="79" y="14" width="7" height="7" fill="#24211E" />

                          <rect x="5" y="70" width="25" height="25" fill="#24211E" />
                          <rect x="10" y="75" width="15" height="15" fill="#F8F6F2" />
                          <rect x="14" y="79" width="7" height="7" fill="#24211E" />

                          {/* Data pattern modules */}
                          <rect x="36" y="8" width="5" height="10" fill="#24211E" />
                          <rect x="46" y="15" width="12" height="5" fill="#24211E" />
                          <rect x="36" y="26" width="24" height="6" fill="#24211E" />
                          <rect x="8" y="38" width="18" height="5" fill="#24211E" />
                          <rect x="32" y="38" width="12" height="12" fill="#5D6B57" />
                          <rect x="50" y="38" width="18" height="6" fill="#24211E" />
                          <rect x="74" y="38" width="18" height="8" fill="#24211E" />
                          <rect x="15" y="48" width="10" height="14" fill="#24211E" />
                          <rect x="34" y="56" width="8" height="16" fill="#24211E" />
                          <rect x="48" y="50" width="22" height="8" fill="#24211E" />
                          <rect x="76" y="52" width="16" height="10" fill="#24211E" />
                          <rect x="40" y="70" width="10" height="10" fill="#24211E" />
                          <rect x="56" y="66" width="8" height="20" fill="#24211E" />
                          <rect x="70" y="72" width="22" height="8" fill="#24211E" />
                          <rect x="42" y="86" width="20" height="8" fill="#24211E" />
                          <rect x="72" y="86" width="18" height="8" fill="#24211E" />
                        </svg>
                      </div>
                      <div className="text-[10px] text-[#7A746B] mt-1 font-semibold">PT REWERA FASHION INDONESIA</div>
                    </div>

                    <p className="text-xs text-[#504A41]">
                      Setelah memindai dan mentransfer, klik tombol <strong>"Saya Sudah Bayar / Konfirmasi"</strong> di bawah.
                    </p>
                  </div>
                )}

                {/* 2. BCA Virtual Account Screen */}
                {formData.paymentMethod === 'bca' && (
                  <div className="p-5 bg-white border border-[#2C2926]/15 rounded-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#5D6B57] font-semibold">Bank Transfer</span>
                        <h4 className="font-serif text-lg text-[#24211E]">BCA Virtual Account</h4>
                      </div>
                      <span className="px-2.5 py-1 bg-[#005E9E] text-white text-xs font-bold rounded-xs">BCA</span>
                    </div>

                    <div className="p-3 bg-[#F5EFE6] border border-[#2C2926]/10 rounded-xs flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-[#7A746B] block">Nomor Virtual Account:</span>
                        <span className="font-mono text-base font-bold text-[#24211E] tracking-wider">
                          8271 0812 3456 7890
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyVA('8271081234567890')}
                        className="px-3 py-1.5 bg-white border border-[#2C2926]/20 text-xs font-medium text-[#24211E] hover:bg-[#F0EAE1] flex items-center gap-1.5 transition-colors rounded-xs cursor-pointer"
                      >
                        {copiedVA ? <Check size={14} className="text-[#5D6B57]" /> : <Copy size={14} />}
                        <span>{copiedVA ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <div className="text-xs text-[#666057] space-y-1">
                      <p className="font-medium text-[#24211E]">Cara Pembayaran via m-BCA:</p>
                      <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-[#7A746B]">
                        <li>Buka aplikasi BCA mobile &gt; Pilih m-Transfer</li>
                        <li>Pilih BCA Virtual Account</li>
                        <li>Masukkan nomor VA <strong>8271081234567890</strong></li>
                        <li>Nama Penerima: <strong>REWERA OFFICIAL</strong></li>
                        <li>Masukkan PIN m-BCA Anda untuk konfirmasi</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* 3. Mandiri Virtual Account Screen */}
                {formData.paymentMethod === 'mandiri' && (
                  <div className="p-5 bg-white border border-[#2C2926]/15 rounded-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#5D6B57] font-semibold">Bank Transfer</span>
                        <h4 className="font-serif text-lg text-[#24211E]">Mandiri Virtual Account</h4>
                      </div>
                      <span className="px-2.5 py-1 bg-[#003875] text-white text-xs font-bold rounded-xs">MANDIRI</span>
                    </div>

                    <div className="p-3 bg-[#F5EFE6] border border-[#2C2926]/10 rounded-xs flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-[#7A746B] block">Kode Perusahaan / VA:</span>
                        <span className="font-mono text-base font-bold text-[#24211E] tracking-wider">
                          88708 0812 3456 7890
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyVA('88708081234567890')}
                        className="px-3 py-1.5 bg-white border border-[#2C2926]/20 text-xs font-medium text-[#24211E] hover:bg-[#F0EAE1] flex items-center gap-1.5 transition-colors rounded-xs cursor-pointer"
                      >
                        {copiedVA ? <Check size={14} className="text-[#5D6B57]" /> : <Copy size={14} />}
                        <span>{copiedVA ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <div className="text-xs text-[#666057] space-y-1">
                      <p className="font-medium text-[#24211E]">Cara Pembayaran via Livin' by Mandiri:</p>
                      <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-[#7A746B]">
                        <li>Buka Livin' by Mandiri &gt; Pilih menu Bayar / Pembayaran</li>
                        <li>Penyedia Jasa: <strong>REWERA E-COMMERCE (88708)</strong></li>
                        <li>Masukkan nomor VA <strong>88708081234567890</strong></li>
                        <li>Konfirmasi nominal pembayaran &amp; masukkan PIN</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* 4. BRI / BNI Virtual Account Screen */}
                {formData.paymentMethod === 'bri' && (
                  <div className="p-5 bg-white border border-[#2C2926]/15 rounded-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#5D6B57] font-semibold">Bank Transfer</span>
                        <h4 className="font-serif text-lg text-[#24211E]">BRI / BNI Virtual Account</h4>
                      </div>
                      <div className="flex gap-1">
                        <span className="px-2 py-0.5 bg-[#00529C] text-white text-[11px] font-bold rounded-xs">BRI</span>
                        <span className="px-2 py-0.5 bg-[#F15A24] text-white text-[11px] font-bold rounded-xs">BNI</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#F5EFE6] border border-[#2C2926]/10 rounded-xs flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-[#7A746B] block">Nomor Virtual Account BRI / BNI:</span>
                        <span className="font-mono text-base font-bold text-[#24211E] tracking-wider">
                          1280 0812 3456 7890
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyVA('1280081234567890')}
                        className="px-3 py-1.5 bg-white border border-[#2C2926]/20 text-xs font-medium text-[#24211E] hover:bg-[#F0EAE1] flex items-center gap-1.5 transition-colors rounded-xs cursor-pointer"
                      >
                        {copiedVA ? <Check size={14} className="text-[#5D6B57]" /> : <Copy size={14} />}
                        <span>{copiedVA ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <div className="text-xs text-[#666057] space-y-1">
                      <p className="font-medium text-[#24211E]">Cara Pembayaran via BRImo / BNI Mobile:</p>
                      <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-[#7A746B]">
                        <li>Buka aplikasi BRImo / BNI Mobile &gt; Pilih Pembayaran / BRIVA</li>
                        <li>Masukkan nomor <strong>1280081234567890</strong></li>
                        <li>Konfirmasi atas nama <strong>REWERA ECO FASHION</strong></li>
                        <li>Selesaikan pembayaran dengan PIN</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* 5. Credit / Debit Card Form */}
                {formData.paymentMethod === 'card' && (
                  <div className="p-5 bg-white border border-[#2C2926]/15 rounded-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#5D6B57] font-semibold">Enkripsi 256-bit SSL</span>
                        <h4 className="font-serif text-lg text-[#24211E]">Kartu Kredit / Debit</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleAutofillCard}
                          className="text-[11px] text-[#5D6B57] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                        >
                          <Sparkles size={12} />
                          <span>Gunakan Kartu Demo</span>
                        </button>
                        <div className="flex gap-1 text-xs text-[#666057]">
                          <span className="px-1.5 py-0.5 bg-[#FAF8F5] border border-[#2C2926]/20 rounded-xs font-bold text-[10px]">VISA</span>
                          <span className="px-1.5 py-0.5 bg-[#FAF8F5] border border-[#2C2926]/20 rounded-xs font-bold text-[10px]">MC</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#504A41] font-medium mb-1">Nomor Kartu (16 Digit)</label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4123 4567 8901 2345"
                          value={cardData.number}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                            setCardData({ ...cardData, number: val });
                          }}
                          className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#2C2926]/15 rounded-xs font-mono focus:outline-none focus:border-[#24211E]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#504A41] font-medium mb-1">Masa Berlaku (MM/YY)</label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="12/28"
                            value={cardData.expiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[^\d/]/g, '');
                              if (val.length === 2 && !val.includes('/')) {
                                val = `${val}/`;
                              }
                              setCardData({ ...cardData, expiry: val });
                            }}
                            className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#2C2926]/15 rounded-xs font-mono focus:outline-none focus:border-[#24211E]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#504A41] font-medium mb-1">Kode CVV (3-4 Angka)</label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#2C2926]/15 rounded-xs font-mono focus:outline-none focus:border-[#24211E]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#504A41] font-medium mb-1">Nama Pemilik Kartu Sesuai Kartu</label>
                        <input
                          type="text"
                          placeholder="MAYA INDAH LESTARI"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                          className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#2C2926]/15 rounded-xs uppercase focus:outline-none focus:border-[#24211E]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. COD Screen */}
                {formData.paymentMethod === 'cod' && (
                  <div className="p-5 bg-white border border-[#2C2926]/15 rounded-xs space-y-3">
                    <div className="flex items-center gap-2 text-[#5D6B57]">
                      <Truck size={20} />
                      <h4 className="font-serif text-lg text-[#24211E]">Bayar Tunai di Tempat (COD)</h4>
                    </div>
                    <p className="text-xs text-[#666057] leading-relaxed">
                      Anda dapat membayar tunai sebesar <strong>{formatIDR(currentGrandTotal)}</strong> langsung kepada kurir saat paket tiba di alamat Anda.
                    </p>
                    <div className="p-3 bg-[#F5EFE6] text-[11px] text-[#7A746B] rounded-xs space-y-1">
                      <p>✓ Siapkan uang pas saat kurir mengantarkan pesanan.</p>
                      <p>✓ Paket dikemas dalam kantong biodegradable bersegel REWERA.</p>
                    </div>
                  </div>
                )}

                {/* Confirm & Execute Payment Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    disabled={isProcessingPayment}
                    className="w-full bg-[#24211E] text-[#FAF8F5] py-4 text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#3B3632] transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 cursor-pointer"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Memverifikasi Pembayaran Anda...</span>
                      </>
                    ) : (
                      <>
                        <span>Saya Sudah Bayar / Konfirmasi Pembayaran</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[#7A746B] mt-2">
                    Transaksi dilindungi enkripsi SSL 256-bit dan garansi penukaran 14 hari REWERA.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: ORDER RECEIPT & CONFIRMATION SCREEN (Using persistent order snapshot) */}
            {step === 'success' && lastOrder && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-[#E8EDE6] text-[#5D6B57] rounded-full mx-auto flex items-center justify-center shadow-xs">
                    <CheckCircle2 size={36} />
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#5D6B57] font-semibold">
                      Pembayaran Berhasil &amp; Terverifikasi
                    </span>
                    <h2 className="font-serif text-3xl text-[#24211E] mt-1">
                      Terima Kasih, {lastOrder.customerName}
                    </h2>
                    <p className="text-xs text-[#7A746B] mt-1.5 max-w-md mx-auto">
                      Pesanan Anda telah kami terima dan langsung dipersiapkan oleh atelier REWERA di Gianyar, Bali menggunakan kemasan cassava bag 100% biodegradable.
                    </p>
                  </div>
                </div>

                {/* Itemized Order Receipt Details */}
                <div className="bg-[#F5EFE6] p-5 rounded-xs border border-[#2C2926]/10 text-xs space-y-3 max-w-lg mx-auto">
                  {/* Order Metadata */}
                  <div className="flex items-center justify-between border-b border-[#2C2926]/10 pb-2.5">
                    <div>
                      <span className="text-[#7A746B] block text-[11px]">Nomor Invoice / Pesanan:</span>
                      <span className="font-mono font-bold text-base text-[#24211E]">{lastOrder.orderId}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyOrderId(lastOrder.orderId)}
                      className="px-2.5 py-1 bg-white border border-[#2C2926]/20 text-[11px] font-medium text-[#24211E] hover:bg-[#F0EAE1] flex items-center gap-1 rounded-xs cursor-pointer"
                    >
                      {copiedOrderId ? <Check size={12} className="text-[#5D6B57]" /> : <Copy size={12} />}
                      <span>{copiedOrderId ? 'Tersalin' : 'Salin ID'}</span>
                    </button>
                  </div>

                  {/* List of Purchased Items */}
                  <div className="space-y-2 border-b border-[#2C2926]/10 pb-3">
                    <span className="text-[11px] text-[#7A746B] uppercase tracking-wider font-semibold block">
                      Daftar Produk yang Dipesan ({lastOrder.items.length} item):
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {lastOrder.items.map((item) => {
                        const colorObj = item.product.colors.find(c => c.name === item.selectedColor);
                        return (
                          <div
                            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <div className="w-8 h-10 rounded-xs overflow-hidden shrink-0 border border-black/10">
                                <ProductImageWithColor
                                  src={item.product.image}
                                  alt={item.product.name}
                                  colorHex={colorObj?.hex}
                                  className="w-full h-full"
                                />
                              </div>
                              <div className="truncate">
                                <span className="font-medium text-[#24211E] truncate block">{item.product.name}</span>
                                <span className="text-[11px] text-[#7A746B]">
                                  Size {item.selectedSize} · {item.selectedColor} · x{item.quantity}
                                </span>
                              </div>
                            </div>
                            <span className="tabular-nums font-semibold text-[#24211E] shrink-0">
                              {formatIDR(item.product.price * item.quantity)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-1.5 text-xs border-b border-[#2C2926]/10 pb-3">
                    <div className="flex justify-between">
                      <span className="text-[#7A746B]">Metode Pembayaran:</span>
                      <span className="font-medium text-[#24211E] text-right">{lastOrder.paymentMethodName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A746B]">Kurir Pengiriman:</span>
                      <span className="font-medium text-[#24211E] text-right">{lastOrder.courierName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A746B]">Tujuan Pengiriman:</span>
                      <span className="font-medium text-[#24211E] text-right truncate max-w-[200px]" title={lastOrder.address}>
                        {lastOrder.address}, {lastOrder.city}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A746B]">Kontak Penerima:</span>
                      <span className="font-medium text-[#24211E] text-right">{lastOrder.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A746B]">Waktu Transaksi:</span>
                      <span className="font-medium text-[#24211E] text-right">{lastOrder.createdAt}</span>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[#666057]">
                      <span>Subtotal Produk:</span>
                      <span className="tabular-nums">{formatIDR(lastOrder.subtotal)}</span>
                    </div>
                    {lastOrder.discountAmount > 0 && (
                      <div className="flex justify-between text-[#5D6B57]">
                        <span>Diskon Kupon ({lastOrder.promoCode}):</span>
                        <span className="tabular-nums">- {formatIDR(lastOrder.discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#666057]">
                      <span>Ongkir Kurir:</span>
                      <span className="tabular-nums">
                        {lastOrder.shippingFee === 0 ? 'Gratis' : formatIDR(lastOrder.shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#2C2926]/10 font-bold text-sm text-[#24211E]">
                      <span>Total Telah Dibayar:</span>
                      <span className="tabular-nums font-serif text-base text-[#24211E]">{formatIDR(lastOrder.grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Receipt Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto pt-2">
                  <button
                    type="button"
                    onClick={handlePrintReceipt}
                    className="flex-1 bg-white border border-[#2C2926]/20 text-[#24211E] py-3 px-4 text-xs uppercase tracking-wider font-medium hover:bg-[#F3EFE9] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer size={15} />
                    <span>Cetak / Simpan Invoice</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFinish}
                    className="flex-1 bg-[#24211E] text-white py-3 px-4 text-xs uppercase tracking-wider font-medium hover:bg-[#3B3632] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Lanjut Belanja</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                <div className="text-center text-[11px] text-[#7A746B] pt-2">
                  <span>Butuh bantuan terkait pesanan? Hubungi kami via WhatsApp: <strong>+62 812-REWERA-99</strong></span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export type ProductCategory = 'All' | 'Tops' | 'Dresses' | 'Bottoms' | 'Resort Wear' | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Tops' | 'Dresses' | 'Bottoms' | 'Resort Wear' | 'Accessories';
  secondaryCategories?: ('Tops' | 'Dresses' | 'Bottoms' | 'Resort Wear' | 'Accessories')[];
  price: number; // in IDR
  originalPrice?: number;
  image: string;
  gallery?: string[];
  description: string;
  details: string[];
  material: string;
  sustainabilityNote: string;
  waterSavedLiters: number;
  wasteDivertedKg: number;
  sizes: string[];
  colors: ProductColor[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  careInstructions: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface OrderSnapshot {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  promoCode?: string;
  shippingFee: number;
  courier: string;
  courierName: string;
  grandTotal: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  paymentMethod: string;
  paymentMethodName: string;
  createdAt: string;
}

export type PageView = 'home' | 'shop' | 'story' | 'sustainability' | 'pdp';

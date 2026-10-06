export type ProductCategory = 'All' | 'Tops' | 'Dresses' | 'Bottoms' | 'Resort Wear' | 'Accessories';

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
  colors: { name: string; hex: string }[];
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

export type PageView = 'home' | 'shop' | 'story' | 'sustainability' | 'pdp';

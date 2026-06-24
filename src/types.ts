/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'electronics' | 'fashion' | 'beauty' | 'home' | 'toys' | 'pet';
  subCategory?: string;
  price: number;
  listPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  isBestSeller?: boolean;
  savePercent?: number;
  brand: string;
  sizes?: string[];
  colors?: string[];
  isSustainable?: boolean;
  isLimitedEdition?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  checked: boolean;
}

export type ViewState = 'home' | 'electronics' | 'fashion' | 'beauty' | 'cart' | 'checkout' | 'login';

export interface FilterState {
  category?: string;
  subCategory?: string;
  rating?: number;
  brands: string[];
  sizes: string[];
  genders: string[];
  minPrice: number | '';
  maxPrice: number | '';
  skinTypes: string[];
}

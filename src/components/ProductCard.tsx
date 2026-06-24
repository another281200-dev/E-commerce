/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Percent } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  // Render star ratings helper
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-3.5 h-3.5 text-slate-300">
            <Star className="absolute top-0 left-0 w-3.5 h-3.5 text-slate-300" />
            <div className="absolute top-0 left-0 w-[50%] h-full overflow-hidden">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-3.5 h-3.5 text-slate-300" />);
      }
    }
    return stars;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-slate-200/85 hover:border-indigo-400/50 hover:shadow-lg transition-all"
      id={`product-card-₹{product.id}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="inline-flex items-center rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Best Seller
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="inline-flex items-center rounded-full bg-pink-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Limited Edition
            </span>
          )}
          {product.savePercent && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              <Percent className="w-2.5 h-2.5" />
              <span>Save {product.savePercent}%</span>
            </span>
          )}
        </div>

        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Hover quick add action overlay */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 px-4">
          <button
            onClick={() => onAddToCart(product, product.sizes?.[0], product.colors?.[0])}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs py-2 px-3 rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
            type="button"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Content info */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 font-mono">
          {product.brand}
        </span>

        {/* Title */}
        <h3 className="mt-1 font-medium text-sm text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>

        {/* Description Snippet */}
        <p className="mt-1 flex-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Reviews and Ratings */}
        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-[10px] font-medium text-slate-500">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Pricing block */}
        <div className="mt-3.5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-slate-900 font-sans">
              ₹{product.price.toFixed(2)}
            </span>
            {product.listPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.listPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Quick-add button fallback for mobile tap */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, product.sizes?.[0], product.colors?.[0]);
            }}
            className="sm:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
            type="button"
            aria-label="Add item to shopping cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
